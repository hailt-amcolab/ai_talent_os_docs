-- AI Core (agent_spec/ai-core/): Business Control Plane + Agents SDK runtime + AI Task runs + Coach Configuration.
-- Replaces the never-applied 20261125000000_agent_core / 20261126000000_control_plane / 20261126000100_agent_runtime
-- (ADR-13: 20261123* ARE applied on Supabase dev, so they are not touched; their demo tables are dropped by a later contract migration).
--   agent_conversations, agent_session_items, agent_runs = Agent Mode (SDK session in Postgres, run-level lease, no step ledger)
--   ai_task_runs                                         = AI Task Mode (one Responses API call per task, idempotent per operation)
--   business_proposals, business_commands, idempotency_requests = Business Control Plane
--   talent_profiles(+_versions), ai_instructions(+_versions), talent_profile_exports = Coach Configuration (QA101: DB is the source)
BEGIN;
SET LOCAL lock_timeout='5s';

ALTER TABLE app_private.domain_operations DROP CONSTRAINT domain_operations_kind_check,
  ADD CONSTRAINT domain_operations_kind_check CHECK (kind IN ('application.provision','manager.provision','office.provision','media.transfer','talent.notify','coach.respond','coach.daily_themes','agent.run','control.command','ai.task'));
ALTER TABLE app_private.outbox_events DROP CONSTRAINT outbox_events_event_type_check,
  ADD CONSTRAINT outbox_events_event_type_check CHECK (event_type IN ('auth.provision','media.transfer','notification.push','coach.respond','coach.daily_themes','agent.run.requested','talent_profile.export','ai.task.requested'));

-- ---- Conversations (Talent or Manager M-17)
CREATE TABLE app_private.agent_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  channel text NOT NULL CHECK (channel IN ('talent','manager_ui')),
  talent_id uuid REFERENCES public.talents(id) ON DELETE RESTRICT,
  request_key uuid NOT NULL,
  next_sequence bigint NOT NULL DEFAULT 1 CHECK (next_sequence>0),
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (actor_user_id,request_key),
  UNIQUE (id,actor_user_id),
  CHECK ((channel='talent')=(talent_id IS NOT NULL))
);

-- ---- Coach Configuration
CREATE TABLE app_private.talent_profiles (
  talent_id uuid PRIMARY KEY REFERENCES public.talents(id) ON DELETE RESTRICT,
  profile jsonb NOT NULL CHECK (jsonb_typeof(profile)='object'
    AND profile - ARRAY['profile','direction','hobbiesSkills','futureGoal','tone'] = '{}'::jsonb),
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  updated_by uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE app_private.talent_profile_versions (
  talent_id uuid NOT NULL REFERENCES app_private.talent_profiles(talent_id) ON DELETE RESTRICT,
  version bigint NOT NULL CHECK (version>0),
  profile jsonb NOT NULL,
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (talent_id,version)
);
CREATE TABLE app_private.ai_instructions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scope_kind text NOT NULL CHECK (scope_kind IN ('global','category','talent')),
  scope_id uuid,
  talent_id uuid REFERENCES public.talents(id) ON DELETE RESTRICT,
  situation text NOT NULL CHECK (situation IN ('daily_greeting','theme_suggestions','post_writing','post_results','challenge_suggestions','media_reminder','posting_window_frequency','conversation_limits')),
  text text NOT NULL CHECK (length(text) BETWEEN 1 AND 1000),
  enabled boolean NOT NULL,
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  updated_by uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  -- no canonical category table yet: the scope is declared, writes are refused (FEATURE_NOT_READY in the service)
  CONSTRAINT chk_ai_instructions_category_not_ready CHECK (scope_kind<>'category'),
  CHECK ((scope_kind='global' AND scope_id IS NULL AND talent_id IS NULL) OR (scope_kind='talent' AND scope_id IS NOT NULL AND talent_id=scope_id) OR scope_kind='category')
);
CREATE UNIQUE INDEX uq_ai_instructions_global ON app_private.ai_instructions(situation) WHERE scope_kind='global';
CREATE UNIQUE INDEX uq_ai_instructions_scoped ON app_private.ai_instructions(scope_kind,scope_id,situation) WHERE scope_kind<>'global';
CREATE TABLE app_private.ai_instruction_versions (
  instruction_id uuid NOT NULL REFERENCES app_private.ai_instructions(id) ON DELETE RESTRICT,
  version bigint NOT NULL CHECK (version>0),
  text text NOT NULL,
  enabled boolean NOT NULL,
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (instruction_id,version)
);
-- What was last written to OneDrive Profile.md (one-way export, never read back).
CREATE TABLE app_private.talent_profile_exports (
  talent_id uuid PRIMARY KEY REFERENCES app_private.talent_profiles(talent_id) ON DELETE RESTRICT,
  version bigint NOT NULL CHECK (version>0),
  item_ref text NOT NULL CHECK (length(item_ref) BETWEEN 1 AND 200),
  exported_at timestamptz NOT NULL DEFAULT now()
);

-- ---- Agent Mode

CREATE TABLE app_private.agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id uuid NOT NULL UNIQUE REFERENCES app_private.domain_operations(id) ON DELETE RESTRICT,
  event_id uuid UNIQUE REFERENCES app_private.outbox_events(id) ON DELETE RESTRICT,
  conversation_id uuid NOT NULL REFERENCES app_private.agent_conversations(id) ON DELETE RESTRICT,
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  channel text NOT NULL CHECK (channel IN ('talent','manager_ui')),
  talent_id uuid REFERENCES public.talents(id) ON DELETE RESTRICT,
  request_key uuid NOT NULL,
  input_hash text NOT NULL CHECK (input_hash ~ '^[0-9a-f]{64}$'),
  input_text text NOT NULL CHECK (length(input_text) BETWEEN 1 AND 1000),
  state text NOT NULL DEFAULT 'pending' CHECK (state IN ('pending','running','succeeded','failed','cancelled')),
  error_code text CHECK (error_code ~ '^[A-Z][A-Z0-9_]{1,63}$'),
  final_text text CHECK (length(final_text)<=8000),
  completion_kind text CHECK (completion_kind IN ('answer_only','action_result')),
  prompt_version text,
  model text,
  context_manifest jsonb,
  trace_id text,
  lease_token uuid,
  lease_until timestamptz,
  heartbeat_at timestamptz,
  model_started_at timestamptz,
  cancel_requested_at timestamptz,
  claims integer NOT NULL DEFAULT 0 CHECK (claims>=0),
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  UNIQUE (conversation_id,actor_user_id,request_key),
  CHECK ((channel='talent')=(talent_id IS NOT NULL)),
  CHECK ((state='running')=(lease_token IS NOT NULL AND lease_until IS NOT NULL)),
  CHECK ((state IN ('succeeded','failed','cancelled'))=(finished_at IS NOT NULL)),
  CHECK (state<>'succeeded' OR (completion_kind IS NOT NULL AND final_text IS NOT NULL)),
  CHECK (state NOT IN ('failed','cancelled') OR error_code IS NOT NULL),
  -- the conversation belongs to the run's actor (composite FK on the UNIQUE (id,actor_user_id) of agent_conversations)
  FOREIGN KEY (conversation_id,actor_user_id) REFERENCES app_private.agent_conversations(id,actor_user_id) ON DELETE RESTRICT
);
-- One active run per conversation (busy → 409 RUN_BUSY).
CREATE UNIQUE INDEX uq_agent_runs_active ON app_private.agent_runs(conversation_id) WHERE state IN ('pending','running');
CREATE INDEX idx_agent_runs_lease ON app_private.agent_runs(lease_until) WHERE state='running';
CREATE INDEX idx_agent_runs_conversation ON app_private.agent_runs(conversation_id,created_at DESC);

CREATE TABLE app_private.agent_session_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES app_private.agent_conversations(id) ON DELETE RESTRICT,
  sequence bigint NOT NULL CHECK (sequence>0),
  run_id uuid REFERENCES app_private.agent_runs(id) ON DELETE RESTRICT,
  kind text NOT NULL CHECK (kind IN ('message','function_call','function_call_result','reasoning','other')),
  role text CHECK (role IN ('user','assistant','system')),
  item jsonb NOT NULL,
  display_text text,
  source text NOT NULL DEFAULT 'sdk' CHECK (source IN ('sdk','control_receipt')),
  discarded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (conversation_id,sequence),
  CHECK ((kind='message')=(role IS NOT NULL))
);
CREATE INDEX idx_agent_session_items_live ON app_private.agent_session_items(conversation_id,sequence) WHERE discarded_at IS NULL;

-- Usage: one row per model request (AI_RUNTIME_DESIGN.md §7). Manager/global runs have no Talent; no price → NULL, never 0.
ALTER TABLE public.ai_usage_events ALTER COLUMN talent_id DROP NOT NULL,
  ALTER COLUMN cost_amount DROP NOT NULL,
  ALTER COLUMN cost_currency DROP NOT NULL,
  ADD COLUMN run_id uuid REFERENCES app_private.agent_runs(id) ON DELETE RESTRICT,
  ADD COLUMN request_ref text,
  ADD COLUMN cached_input_tokens integer NOT NULL DEFAULT 0 CHECK (cached_input_tokens>=0),
  ADD COLUMN reasoning_tokens integer NOT NULL DEFAULT 0 CHECK (reasoning_tokens>=0),
  ADD COLUMN payer text NOT NULL DEFAULT 'talent' CHECK (payer IN ('talent','office','adesso')),
  ADD COLUMN price_revision text,
  ADD COLUMN task_key text,
  ADD CONSTRAINT chk_ai_usage_events_payer CHECK (talent_id IS NOT NULL OR payer='adesso'),
  ADD CONSTRAINT chk_ai_usage_events_cost_pair CHECK ((cost_amount IS NULL)=(cost_currency IS NULL));
CREATE INDEX idx_ai_usage_events_run ON public.ai_usage_events(run_id) WHERE run_id IS NOT NULL;

CREATE TRIGGER trg_agent_runs_version BEFORE UPDATE ON app_private.agent_runs FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
CREATE TRIGGER trg_agent_runs_updated_at BEFORE UPDATE ON app_private.agent_runs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['agent_runs','agent_session_items'] LOOP
    EXECUTE format('ALTER TABLE app_private.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE ALL ON app_private.%I FROM PUBLIC,anon,authenticated', t);
    EXECUTE format('CREATE POLICY backend_runtime ON app_private.%I TO talent_runtime USING (true) WITH CHECK (true)', t);
  END LOOP;
END $$;
GRANT SELECT,INSERT,UPDATE ON app_private.agent_runs TO talent_runtime;
GRANT SELECT,INSERT ON app_private.agent_session_items TO talent_runtime;
GRANT UPDATE (discarded_at) ON app_private.agent_session_items TO talent_runtime;
GRANT SELECT,INSERT ON public.ai_usage_events TO talent_runtime;
GRANT USAGE ON SEQUENCE public.ai_usage_events_id_seq TO talent_runtime;
-- A Manager reading a Talent's data through the agent is a view (YK3 §9-4): append-only view log.
GRANT SELECT,INSERT ON public.manager_view_logs TO talent_runtime;

-- ---- Business Control Plane

CREATE TABLE app_private.business_proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  command_type text NOT NULL CHECK (command_type IN ('talent_profile.update','ai_instruction.write')),
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  channel text NOT NULL CHECK (channel IN ('manager_ui','manager_mcp','admin_ui')),
  client_grant_id uuid,
  run_id uuid REFERENCES app_private.agent_runs(id) ON DELETE RESTRICT,
  idempotency_key text NOT NULL UNIQUE CHECK (idempotency_key ~ '^[0-9a-f]{64}$'),
  target_kind text NOT NULL CHECK (target_kind IN ('talent','global','category')),
  target_id uuid,
  target_label text NOT NULL CHECK (length(target_label) BETWEEN 1 AND 200),
  before jsonb,
  patch jsonb NOT NULL,
  payload_hash text NOT NULL CHECK (payload_hash ~ '^[0-9a-f]{64}$'),
  base_version bigint NOT NULL CHECK (base_version>=0),
  expires_at timestamptz NOT NULL,
  state text NOT NULL DEFAULT 'prepared' CHECK (state IN ('prepared','consumed','rejected','expired','conflicted')),
  decided_by uuid REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  decided_at timestamptz,
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((target_kind='global')=(target_id IS NULL)),
  CHECK ((channel='manager_mcp')=(client_grant_id IS NOT NULL)),
  CHECK ((state='prepared')=(decided_at IS NULL)),
  -- A person decided consumed/rejected; expiry is the reconciler (no person).
  CHECK (state NOT IN ('consumed','rejected') OR decided_by IS NOT NULL),
  CHECK (state<>'expired' OR decided_by IS NULL)
);
CREATE INDEX idx_business_proposals_actor ON app_private.business_proposals(actor_user_id,state,expires_at);
CREATE INDEX idx_business_proposals_due ON app_private.business_proposals(expires_at) WHERE state='prepared';
CREATE INDEX idx_business_proposals_run ON app_private.business_proposals(run_id) WHERE run_id IS NOT NULL;

CREATE TABLE app_private.business_commands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  command_type text NOT NULL CHECK (command_type IN ('talent_profile.update','ai_instruction.write')),
  actor_kind text NOT NULL CHECK (actor_kind IN ('talent','manager','system')),
  actor_user_id uuid REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  channel text NOT NULL CHECK (channel IN ('talent','manager_ui','manager_mcp','admin_ui','system')),
  run_id uuid REFERENCES app_private.agent_runs(id) ON DELETE RESTRICT,
  proposal_id uuid UNIQUE REFERENCES app_private.business_proposals(id) ON DELETE RESTRICT,
  operation_id uuid REFERENCES app_private.domain_operations(id) ON DELETE RESTRICT,
  idempotency_key text NOT NULL UNIQUE CHECK (idempotency_key ~ '^[0-9a-f]{64}$'),
  target_kind text NOT NULL CHECK (target_kind IN ('talent','global','category')),
  target_id uuid,
  target_label text NOT NULL CHECK (length(target_label) BETWEEN 1 AND 200),
  payload_hash text NOT NULL CHECK (payload_hash ~ '^[0-9a-f]{64}$'),
  result_version bigint CHECK (result_version>0),
  changed boolean NOT NULL,
  receipt jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((actor_kind='system')=(actor_user_id IS NULL)),
  CHECK ((target_kind='global')=(target_id IS NULL))
);
CREATE INDEX idx_business_commands_run ON app_private.business_commands(run_id) WHERE run_id IS NOT NULL;
CREATE INDEX idx_business_commands_target ON app_private.business_commands(target_kind,target_id,created_at);

-- Same transaction as the action it protects: a row exists only with its response (a failed action rolls the row back).
CREATE TABLE app_private.idempotency_requests (
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  route_key text NOT NULL CHECK (length(route_key) BETWEEN 1 AND 200),
  request_key uuid NOT NULL,
  payload_hash text NOT NULL CHECK (payload_hash ~ '^[0-9a-f]{64}$'),
  response_status integer CHECK (response_status BETWEEN 100 AND 599),
  response_body jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now()+interval '7 days',
  PRIMARY KEY (actor_user_id,route_key,request_key),
  CHECK ((response_status IS NULL)=(response_body IS NULL))
);
CREATE INDEX idx_idempotency_requests_expiry ON app_private.idempotency_requests(expires_at);

CREATE TRIGGER trg_business_proposals_version BEFORE UPDATE ON app_private.business_proposals FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
CREATE TRIGGER trg_business_proposals_updated_at BEFORE UPDATE ON app_private.business_proposals FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['business_proposals','business_commands','idempotency_requests'] LOOP
    EXECUTE format('ALTER TABLE app_private.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE ALL ON app_private.%I FROM PUBLIC,anon,authenticated', t);
    EXECUTE format('CREATE POLICY backend_runtime ON app_private.%I TO talent_runtime USING (true) WITH CHECK (true)', t);
  END LOOP;
END $$;
-- Commands are append-only for the runtime. Proposals change state only. Idempotency rows get their response once.
GRANT SELECT,INSERT ON app_private.business_commands TO talent_runtime;
GRANT SELECT,INSERT ON app_private.business_proposals TO talent_runtime;
GRANT UPDATE (state,decided_by,decided_at,version,updated_at) ON app_private.business_proposals TO talent_runtime;
GRANT SELECT,INSERT ON app_private.idempotency_requests TO talent_runtime;
GRANT UPDATE (response_status,response_body) ON app_private.idempotency_requests TO talent_runtime;

-- ---- AI Task Mode: one bounded Responses API call per operation (AI_RUNTIME_DESIGN.md §3). Idempotent via the operation.
CREATE TABLE app_private.ai_task_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id uuid NOT NULL UNIQUE REFERENCES app_private.domain_operations(id) ON DELETE RESTRICT,
  event_id uuid NOT NULL UNIQUE REFERENCES app_private.outbox_events(id) ON DELETE RESTRICT,
  task_key text NOT NULL CHECK (task_key IN ('task.daily_topics')),
  talent_id uuid REFERENCES public.talents(id) ON DELETE RESTRICT,
  input jsonb NOT NULL,
  output jsonb,
  prompt_version text,
  model text,
  state text NOT NULL DEFAULT 'pending' CHECK (state IN ('pending','running','succeeded','failed')),
  error_code text CHECK (error_code ~ '^[A-Z][A-Z0-9_]{1,63}$'),
  lease_token uuid,
  lease_until timestamptz,
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts>=0),
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  CHECK ((state='running')=(lease_token IS NOT NULL AND lease_until IS NOT NULL)),
  CHECK ((state IN ('succeeded','failed'))=(finished_at IS NOT NULL)),
  CHECK (state<>'succeeded' OR output IS NOT NULL),
  CHECK (state<>'failed' OR error_code IS NOT NULL)
);
CREATE INDEX idx_ai_task_runs_lease ON app_private.ai_task_runs(lease_until) WHERE state='running';
ALTER TABLE public.ai_usage_events ADD COLUMN task_run_id uuid REFERENCES app_private.ai_task_runs(id) ON DELETE RESTRICT;
CREATE TRIGGER trg_ai_task_runs_version BEFORE UPDATE ON app_private.ai_task_runs FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
CREATE TRIGGER trg_ai_task_runs_updated_at BEFORE UPDATE ON app_private.ai_task_runs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---- Manager MCP grants (API_DESIGN.md §6.1): what one OAuth client may do for one Manager. Tokens are never stored here.
CREATE TABLE app_private.mcp_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  client_id text NOT NULL CHECK (length(client_id) BETWEEN 1 AND 200),
  capabilities text[] NOT NULL CHECK (capabilities <@ ARRAY['context.read','talent.search','instruction.history','talent_profile.prepare','ai_instruction.prepare']::text[]),
  issued_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz
);
CREATE UNIQUE INDEX uq_mcp_grants_active ON app_private.mcp_grants(manager_user_id,client_id) WHERE revoked_at IS NULL;
ALTER TABLE app_private.business_proposals ADD CONSTRAINT fk_business_proposals_grant FOREIGN KEY (client_grant_id) REFERENCES app_private.mcp_grants(id) ON DELETE RESTRICT;

-- ---- Versions, timestamps, RLS, grants of the tables above (agent_runs/session/business_* have theirs in the blocks above)
DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['agent_conversations','talent_profiles','ai_instructions'] LOOP
    EXECUTE format('CREATE TRIGGER trg_%s_version BEFORE UPDATE ON app_private.%I FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version()', t, t);
    EXECUTE format('CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON app_private.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()', t, t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['agent_conversations','talent_profiles','talent_profile_versions','ai_instructions','ai_instruction_versions','talent_profile_exports','ai_task_runs','mcp_grants'] LOOP
    EXECUTE format('ALTER TABLE app_private.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE ALL ON app_private.%I FROM PUBLIC,anon,authenticated', t);
    EXECUTE format('CREATE POLICY backend_runtime ON app_private.%I TO talent_runtime USING (true) WITH CHECK (true)', t);
  END LOOP;
END $$;
-- History is append-only for the runtime.
GRANT SELECT,INSERT ON app_private.talent_profile_versions,app_private.ai_instruction_versions TO talent_runtime;
GRANT SELECT,INSERT,UPDATE ON app_private.agent_conversations,app_private.talent_profiles,app_private.ai_instructions,app_private.talent_profile_exports,app_private.ai_task_runs TO talent_runtime;
GRANT SELECT,INSERT ON public.theme_suggestions TO talent_runtime;
GRANT SELECT,INSERT ON app_private.mcp_grants TO talent_runtime;
GRANT UPDATE (revoked_at) ON app_private.mcp_grants TO talent_runtime;
-- The coach demo and its "reset today" route are removed: take back the DEMO ONLY DELETE grants of 20261123000400.
REVOKE DELETE ON public.coach_messages,public.theme_suggestions,public.ai_usage_events,app_private.ai_execution_attempts,
  app_private.ai_executions,app_private.outbox_events,app_private.domain_operations FROM talent_runtime;
COMMIT;
