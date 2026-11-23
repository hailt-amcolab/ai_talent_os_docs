-- AI Core, task coach.respond (agent_spec/AI_Talent_OS_AI_Core_Architecture_Report_v2.md §4.4–§4.7).
-- Postgres stays the source of business state; Redis/BullMQ only carries job IDs.
--   domain_operations (kind coach.respond) = command + idempotency
--   outbox_events     (event_type coach.respond) = durable intent; its lease is the DISPATCHER lease only
--   ai_executions     = one execution per event, holds the EXECUTION lease (fencing token + attempt_no)
--   ai_execution_attempts = one row per execution lease; phase 'calling' is written before the model HTTP call
--   ai_usage_events.execution_attempt_id = at most one usage row per attempt
BEGIN;
SET LOCAL lock_timeout='5s';

-- Candidate keys for the composite owner FKs below.
ALTER TABLE app_private.domain_operations ADD CONSTRAINT uq_operations_id_talent UNIQUE (id,talent_id);
ALTER TABLE app_private.outbox_events ADD CONSTRAINT uq_outbox_id_operation UNIQUE (id,operation_id);

-- §4.5 dispatch handoff. generation keeps its meaning; delivery_sequence counts Redis hand-offs (jobId = <event>-<sequence>).
ALTER TABLE app_private.outbox_events
  ADD COLUMN delivery_sequence bigint NOT NULL DEFAULT 0 CHECK (delivery_sequence>=0),
  ADD COLUMN next_dispatch_at timestamptz,
  ADD COLUMN last_dispatched_at timestamptz;
UPDATE app_private.outbox_events SET next_dispatch_at=available_at;
ALTER TABLE app_private.outbox_events ALTER COLUMN next_dispatch_at SET NOT NULL, ALTER COLUMN next_dispatch_at SET DEFAULT now();
CREATE INDEX idx_outbox_next_dispatch ON app_private.outbox_events(next_dispatch_at,id) WHERE state='pending';

CREATE TABLE app_private.ai_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id uuid NOT NULL,
  event_id uuid NOT NULL UNIQUE,
  talent_id uuid NOT NULL,
  task_key text NOT NULL CHECK (task_key IN ('coach.respond')),
  task_revision text NOT NULL CHECK (length(task_revision) BETWEEN 1 AND 50),
  input_message_id bigint NOT NULL UNIQUE,
  state text NOT NULL DEFAULT 'pending' CHECK (state IN ('pending','running','succeeded','failed','unknown','cancelled')),
  attempt_no integer NOT NULL DEFAULT 0 CHECK (attempt_no>=0),
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  lease_token uuid,
  lease_until timestamptz,
  heartbeat_at timestamptz,
  cancel_requested_at timestamptz,
  output_message_id bigint UNIQUE,
  last_error_code text CHECK (length(last_error_code)<=60),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  UNIQUE (id,talent_id),
  FOREIGN KEY (event_id,operation_id) REFERENCES app_private.outbox_events(id,operation_id) ON DELETE RESTRICT,
  FOREIGN KEY (operation_id,talent_id) REFERENCES app_private.domain_operations(id,talent_id) ON DELETE RESTRICT,
  FOREIGN KEY (input_message_id,talent_id) REFERENCES public.coach_messages(id,talent_id) ON DELETE RESTRICT,
  FOREIGN KEY (output_message_id,talent_id) REFERENCES public.coach_messages(id,talent_id) ON DELETE RESTRICT,
  CHECK ((state='running')=(lease_token IS NOT NULL AND lease_until IS NOT NULL AND heartbeat_at IS NOT NULL)),
  CHECK ((state='succeeded')=(output_message_id IS NOT NULL)),
  CHECK ((state IN ('succeeded','failed','cancelled'))=(finished_at IS NOT NULL))
);
CREATE INDEX idx_ai_executions_lease ON app_private.ai_executions(lease_until,id) WHERE state='running';
CREATE INDEX idx_ai_executions_talent ON app_private.ai_executions(talent_id,created_at DESC,id);
-- §4.6: one running/unknown execution per Talent; unknown keeps blocking until it is reconciled.
CREATE UNIQUE INDEX uq_ai_executions_active_talent ON app_private.ai_executions(talent_id) WHERE state IN ('running','unknown');

CREATE TABLE app_private.ai_execution_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id uuid NOT NULL,
  talent_id uuid NOT NULL,
  attempt_no integer NOT NULL CHECK (attempt_no>0),
  lease_token uuid NOT NULL,
  phase text NOT NULL DEFAULT 'claimed' CHECK (phase IN ('claimed','calling','response_received','succeeded','failed','unknown','cancelled')),
  provider text CHECK (length(provider)<=40),
  model text CHECK (length(model)<=100),
  context_revision text CHECK (length(context_revision)<=100),
  provider_request_id text CHECK (length(provider_request_id)<=200),
  provider_idempotency_key text CHECK (length(provider_idempotency_key)<=200),
  -- Never fake 0: pending/unknown until a known usage (and cost) is recorded.
  usage_state text NOT NULL DEFAULT 'not_called' CHECK (usage_state IN ('pending','recorded','unknown','not_called')),
  -- ponytail: token counts kept here because ai_usage_events needs a cost; a usage row is inserted only when AI_PRICE_* is configured.
  input_tokens integer CHECK (input_tokens>=0),
  output_tokens integer CHECK (output_tokens>=0),
  error_code text CHECK (length(error_code)<=60),
  started_at timestamptz NOT NULL DEFAULT now(),
  call_started_at timestamptz,
  call_finished_at timestamptz,
  finished_at timestamptz,
  UNIQUE (execution_id,attempt_no),
  UNIQUE (id,talent_id),
  FOREIGN KEY (execution_id,talent_id) REFERENCES app_private.ai_executions(id,talent_id) ON DELETE RESTRICT,
  CHECK (phase='claimed' OR (phase IN ('failed','cancelled') AND call_started_at IS NULL)
         OR (provider IS NOT NULL AND model IS NOT NULL AND context_revision IS NOT NULL AND call_started_at IS NOT NULL)),
  CHECK ((call_started_at IS NULL)=(usage_state='not_called')),
  CHECK ((phase IN ('claimed','calling','response_received'))=(finished_at IS NULL))
);
CREATE UNIQUE INDEX uq_ai_attempts_active ON app_private.ai_execution_attempts(execution_id) WHERE phase IN ('claimed','calling','response_received');

-- §4.4 usage link: nullable for legacy rows, one usage row per attempt.
ALTER TABLE public.ai_usage_events ADD COLUMN execution_attempt_id uuid;
ALTER TABLE public.ai_usage_events ADD CONSTRAINT uq_ai_usage_events_attempt UNIQUE (execution_attempt_id);
ALTER TABLE public.ai_usage_events ADD CONSTRAINT fk_ai_usage_events_attempt
  FOREIGN KEY (execution_attempt_id,talent_id) REFERENCES app_private.ai_execution_attempts(id,talent_id) ON DELETE RESTRICT;

CREATE TRIGGER trg_ai_executions_version BEFORE UPDATE ON app_private.ai_executions
  FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
CREATE TRIGGER trg_ai_executions_updated_at BEFORE UPDATE ON app_private.ai_executions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE app_private.ai_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_private.ai_execution_attempts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_private.ai_executions,app_private.ai_execution_attempts FROM PUBLIC,anon,authenticated;
-- ponytail: API, dispatcher and worker all use talent_runtime for now. §4.7/§7.1 target: separate worker role and
-- talent_dispatcher limited to outbox handoff; needs its own LOGIN + startup ACL check before splitting.
GRANT SELECT,INSERT,UPDATE ON app_private.ai_executions,app_private.ai_execution_attempts TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.ai_executions TO talent_runtime USING (true) WITH CHECK (true);
CREATE POLICY backend_runtime ON app_private.ai_execution_attempts TO talent_runtime USING (true) WITH CHECK (true);
COMMIT;
