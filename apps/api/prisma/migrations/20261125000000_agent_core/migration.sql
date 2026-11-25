-- Agent core (agent_spec/AI_Talent_OS_AI_Core_Architecture_Report_v2.md §4.1–§4.4, §6.1, §7.2).
-- Expand-only: legacy coach.* rows keep their old meaning and constraints; agent.* runs use the new columns.
--   agent_conversations / agent_entries   = Talent / Manager M-17 conversations (UI messages only)
--   ai_executions (agent.talent|agent.manager) = one run per user message; waits for a Manager without lease/compute
--   agent_steps                            = model/tool step ledger (checkpoint, usage per model call)
--   agent_change_proposals / agent_commands = prepare → confirm (person) → commit (one use)
--   agent_talent_profiles(+_versions), agent_instructions(+_versions) = business context in Postgres (QA101)
--   agent_profile_exports                  = what was last written to OneDrive Profile.md (export, never read back)
BEGIN;
SET LOCAL lock_timeout='5s';

ALTER TABLE app_private.domain_operations DROP CONSTRAINT domain_operations_kind_check,
  ADD CONSTRAINT domain_operations_kind_check CHECK (kind IN ('application.provision','manager.provision','office.provision','media.transfer','talent.notify','coach.respond','coach.daily_themes','agent.run','agent.change.commit'));
ALTER TABLE app_private.outbox_events DROP CONSTRAINT outbox_events_event_type_check,
  ADD CONSTRAINT outbox_events_event_type_check CHECK (event_type IN ('auth.provision','media.transfer','notification.push','coach.respond','coach.daily_themes','agent.run.wake','agent.profile.export'));

-- ---- Conversations
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
  -- A Talent conversation is about that Talent only; a Manager conversation picks targets per tool call.
  CHECK ((channel='talent')=(talent_id IS NOT NULL))
);
CREATE TABLE app_private.agent_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES app_private.agent_conversations(id) ON DELETE RESTRICT,
  sequence bigint NOT NULL CHECK (sequence>0),
  role text NOT NULL CHECK (role IN ('user','assistant')),
  body text NOT NULL CHECK (length(body) BETWEEN 1 AND 8000),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (conversation_id,sequence),
  UNIQUE (id,conversation_id)
);

-- ---- Business context (QA101: the agent reads/writes Postgres). Profile fields are an allowlist (§7.2 profile.prepare).
CREATE TABLE app_private.agent_talent_profiles (
  talent_id uuid PRIMARY KEY REFERENCES public.talents(id) ON DELETE RESTRICT,
  profile jsonb NOT NULL CHECK (jsonb_typeof(profile)='object'
    AND profile - ARRAY['profile','direction','hobbiesSkills','futureGoal','tone'] = '{}'::jsonb),
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  updated_by uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE app_private.agent_talent_profile_versions (
  talent_id uuid NOT NULL REFERENCES app_private.agent_talent_profiles(talent_id) ON DELETE RESTRICT,
  version bigint NOT NULL CHECK (version>0),
  profile jsonb NOT NULL,
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (talent_id,version)
);
-- Situation keys = the eight situations of YK3 §2-4-14 (report §7.2). Category scope needs a canonical category table
-- that does not exist yet (report §4.1): refused in the DB, the service answers FEATURE_NOT_READY.
CREATE TABLE app_private.agent_instructions (
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
  CONSTRAINT chk_agent_instructions_category_not_ready CHECK (scope_kind<>'category'),
  CHECK ((scope_kind='global' AND scope_id IS NULL AND talent_id IS NULL) OR (scope_kind='talent' AND scope_id IS NOT NULL AND talent_id=scope_id) OR scope_kind='category')
);
CREATE UNIQUE INDEX uq_agent_instructions_global ON app_private.agent_instructions(situation) WHERE scope_kind='global';
CREATE UNIQUE INDEX uq_agent_instructions_scoped ON app_private.agent_instructions(scope_kind,scope_id,situation) WHERE scope_kind<>'global';
CREATE TABLE app_private.agent_instruction_versions (
  instruction_id uuid NOT NULL REFERENCES app_private.agent_instructions(id) ON DELETE RESTRICT,
  version bigint NOT NULL CHECK (version>0),
  text text NOT NULL,
  enabled boolean NOT NULL,
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (instruction_id,version)
);
CREATE TABLE app_private.agent_profile_exports (
  talent_id uuid PRIMARY KEY REFERENCES app_private.agent_talent_profiles(talent_id) ON DELETE RESTRICT,
  version bigint NOT NULL CHECK (version>0),
  item_ref text NOT NULL CHECK (length(item_ref) BETWEEN 1 AND 200),
  exported_at timestamptz NOT NULL DEFAULT now()
);

-- ---- Runs: extend ai_executions (report §4.1 "no second queue/execution system")
ALTER TABLE app_private.ai_executions ALTER COLUMN talent_id DROP NOT NULL,
  ADD COLUMN actor_user_id uuid REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  ADD COLUMN channel text CHECK (channel IN ('talent','manager_ui','system')),
  ADD COLUMN scope_kind text CHECK (scope_kind IN ('talent','category','global')),
  ADD COLUMN scope_id uuid,
  ADD COLUMN conversation_id uuid REFERENCES app_private.agent_conversations(id) ON DELETE RESTRICT,
  ADD COLUMN input_entry_id uuid,
  ADD COLUMN output_entry_id uuid UNIQUE,
  ADD COLUMN completion_kind text CHECK (completion_kind IN ('answer_only','action_result')),
  ADD COLUMN context_manifest jsonb,
  ADD COLUMN context_revision text CHECK (length(context_revision)<=100),
  ADD COLUMN wake_sequence bigint NOT NULL DEFAULT 1 CHECK (wake_sequence>0),
  ADD COLUMN waiting_proposal_id uuid,
  ADD CONSTRAINT fk_ai_executions_operation FOREIGN KEY (operation_id) REFERENCES app_private.domain_operations(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_ai_executions_input_entry FOREIGN KEY (input_entry_id,conversation_id) REFERENCES app_private.agent_entries(id,conversation_id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_ai_executions_output_entry FOREIGN KEY (output_entry_id,conversation_id) REFERENCES app_private.agent_entries(id,conversation_id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_ai_executions_conversation_actor FOREIGN KEY (conversation_id,actor_user_id) REFERENCES app_private.agent_conversations(id,actor_user_id) ON DELETE RESTRICT;
ALTER TABLE app_private.ai_executions DROP CONSTRAINT ai_executions_task_key_check,
  ADD CONSTRAINT ai_executions_task_key_check CHECK (task_key IN ('coach.respond','coach.daily_themes','agent.talent','agent.manager'));
ALTER TABLE app_private.ai_executions DROP CONSTRAINT ai_executions_state_check,
  ADD CONSTRAINT ai_executions_state_check CHECK (state IN ('pending','running','waiting_confirmation','succeeded','failed','unknown','cancelled'));
ALTER TABLE app_private.ai_executions DROP CONSTRAINT ai_executions_check1,
  ADD CONSTRAINT chk_ai_executions_output CHECK (
    (task_key LIKE 'coach.%' AND talent_id IS NOT NULL AND (state='succeeded')=(output_message_id IS NOT NULL))
    OR (task_key LIKE 'agent.%' AND (state='succeeded')=(output_entry_id IS NOT NULL) AND output_message_id IS NULL AND input_message_id IS NULL));
ALTER TABLE app_private.ai_executions ADD CONSTRAINT chk_ai_executions_agent_shape CHECK (task_key NOT LIKE 'agent.%' OR (
  actor_user_id IS NOT NULL AND conversation_id IS NOT NULL AND input_entry_id IS NOT NULL
  AND ((task_key='agent.talent' AND channel='talent' AND scope_kind='talent' AND talent_id IS NOT NULL AND scope_id=talent_id)
    OR (task_key='agent.manager' AND channel='manager_ui' AND scope_kind='global' AND scope_id IS NULL AND talent_id IS NULL))
  AND (state='waiting_confirmation')=(waiting_proposal_id IS NOT NULL)
  AND (state='succeeded')=(completion_kind IS NOT NULL)));
-- Legacy one-run-per-Talent rule stays for coach.* only; agent runs are one-active-per-conversation.
DROP INDEX app_private.uq_ai_executions_active_talent;
CREATE UNIQUE INDEX uq_ai_executions_active_talent ON app_private.ai_executions(talent_id) WHERE state IN ('running','unknown') AND task_key LIKE 'coach.%';
CREATE UNIQUE INDEX uq_ai_executions_active_conversation ON app_private.ai_executions(conversation_id)
  WHERE state IN ('pending','running','waiting_confirmation','unknown') AND conversation_id IS NOT NULL;
CREATE INDEX idx_ai_executions_conversation ON app_private.ai_executions(conversation_id,created_at DESC) WHERE conversation_id IS NOT NULL;
CREATE INDEX idx_ai_executions_waiting ON app_private.ai_executions(waiting_proposal_id) WHERE state='waiting_confirmation';

ALTER TABLE app_private.ai_execution_attempts ALTER COLUMN talent_id DROP NOT NULL,
  ADD COLUMN step_ledger boolean NOT NULL DEFAULT false,
  ADD CONSTRAINT fk_ai_execution_attempts_execution FOREIGN KEY (execution_id) REFERENCES app_private.ai_executions(id) ON DELETE RESTRICT,
  ADD CONSTRAINT uq_ai_execution_attempts_id_execution UNIQUE (id,execution_id);
ALTER TABLE app_private.ai_execution_attempts DROP CONSTRAINT ai_execution_attempts_phase_check,
  ADD CONSTRAINT ai_execution_attempts_phase_check CHECK (phase IN ('claimed','calling','response_received','executing','waiting','succeeded','failed','unknown','cancelled'));
-- Agent attempts keep provider/model/usage in agent_steps (one attempt = many model calls, §4).
ALTER TABLE app_private.ai_execution_attempts DROP CONSTRAINT ai_execution_attempts_check,
  ADD CONSTRAINT ai_execution_attempts_check CHECK (
    (step_ledger AND provider IS NULL AND model IS NULL AND call_started_at IS NULL AND usage_state='not_called')
    OR (NOT step_ledger AND phase NOT IN ('executing','waiting') AND (phase='claimed'
      OR (phase IN ('failed','cancelled','succeeded') AND call_started_at IS NULL)
      OR (provider IS NOT NULL AND model IS NOT NULL AND context_revision IS NOT NULL AND call_started_at IS NOT NULL))));
ALTER TABLE app_private.ai_execution_attempts DROP CONSTRAINT ai_execution_attempts_check2,
  ADD CONSTRAINT ai_execution_attempts_check2 CHECK ((phase IN ('claimed','calling','response_received','executing'))=(finished_at IS NULL));
DROP INDEX app_private.uq_ai_attempts_active;
CREATE UNIQUE INDEX uq_ai_attempts_active ON app_private.ai_execution_attempts(execution_id) WHERE phase IN ('claimed','calling','response_received','executing');

-- ---- Step ledger. Model step: state 'calling' is committed BEFORE the HTTP call; output (all response messages) + usage after.
-- Tool step: inserted with its result in the same transaction as the command it ran (or the proposal it prepared).
CREATE TABLE app_private.agent_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id uuid NOT NULL REFERENCES app_private.ai_executions(id) ON DELETE RESTRICT,
  attempt_id uuid NOT NULL,
  sequence integer NOT NULL CHECK (sequence>0),
  kind text NOT NULL CHECK (kind IN ('model','tool')),
  state text NOT NULL CHECK (state IN ('calling','succeeded','waiting','denied','invalid','conflict','unavailable','failed','unknown')),
  source_model_step_id uuid,
  call_id text CHECK (length(call_id) BETWEEN 1 AND 200),
  tool_name text CHECK (length(tool_name) BETWEEN 1 AND 64),
  input jsonb,
  output jsonb,
  provider text CHECK (length(provider)<=40),
  model text CHECK (length(model)<=100),
  provider_request_ref text CHECK (length(provider_request_ref)<=200),
  input_tokens integer CHECK (input_tokens>=0),
  output_tokens integer CHECK (output_tokens>=0),
  cached_tokens integer CHECK (cached_tokens>=0),
  usage_state text NOT NULL DEFAULT 'not_called' CHECK (usage_state IN ('not_called','known','unknown')),
  cost_amount numeric(20,8) CHECK (cost_amount>=0),
  currency char(3),
  error_code text CHECK (length(error_code)<=60),
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  UNIQUE (execution_id,sequence),
  UNIQUE (id,execution_id),
  UNIQUE (source_model_step_id,call_id),
  FOREIGN KEY (attempt_id,execution_id) REFERENCES app_private.ai_execution_attempts(id,execution_id) ON DELETE RESTRICT,
  FOREIGN KEY (source_model_step_id,execution_id) REFERENCES app_private.agent_steps(id,execution_id) ON DELETE RESTRICT,
  CHECK ((kind='tool')=(source_model_step_id IS NOT NULL AND call_id IS NOT NULL AND tool_name IS NOT NULL)),
  CHECK (kind='model' OR (provider IS NULL AND usage_state='not_called')),
  CHECK (kind='tool' OR (provider IS NOT NULL AND model IS NOT NULL AND usage_state<>'not_called')),
  CHECK ((state IN ('calling','waiting'))=(finished_at IS NULL)),
  CHECK (kind='model' OR state<>'calling'),
  CHECK (kind='tool' OR state IN ('calling','succeeded','failed','unknown')),
  CHECK ((cost_amount IS NULL)=(currency IS NULL))
);

-- ---- Proposal → confirmation → command (report §4.3, §7.1). Immutable content; a new patch is a new proposal.
CREATE TABLE app_private.agent_change_proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  channel text NOT NULL CHECK (channel IN ('manager_ui','manager_mcp')),
  execution_id uuid REFERENCES app_private.ai_executions(id) ON DELETE RESTRICT,
  tool_step_id uuid UNIQUE REFERENCES app_private.agent_steps(id) ON DELETE RESTRICT,
  command_type text NOT NULL CHECK (command_type IN ('profile.update','instruction.write')),
  scope_kind text NOT NULL CHECK (scope_kind IN ('talent','global')),
  scope_id uuid,
  target_label text NOT NULL CHECK (length(target_label) BETWEEN 1 AND 200),
  before jsonb,
  patch jsonb NOT NULL,
  payload_hash text NOT NULL CHECK (payload_hash ~ '^[0-9a-f]{64}$'),
  base_version bigint NOT NULL CHECK (base_version>=0),
  expires_at timestamptz NOT NULL,
  state text NOT NULL DEFAULT 'prepared' CHECK (state IN ('prepared','confirmed','consumed','rejected','expired','conflicted')),
  confirmed_by uuid REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  confirmed_at timestamptz,
  decided_at timestamptz,
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((scope_kind='global')=(scope_id IS NULL)),
  -- Only the Manager who saw the proposal can confirm it (an approval is never transferred).
  CHECK (state NOT IN ('confirmed','consumed') OR (confirmed_by=actor_user_id AND confirmed_at IS NOT NULL)),
  CHECK (state IN ('confirmed','consumed','conflicted') OR confirmed_by IS NULL),
  CHECK ((state='prepared')=(decided_at IS NULL))
);
CREATE INDEX idx_agent_proposals_actor ON app_private.agent_change_proposals(actor_user_id,state,expires_at);
ALTER TABLE app_private.ai_executions ADD CONSTRAINT fk_ai_executions_waiting_proposal
  FOREIGN KEY (waiting_proposal_id) REFERENCES app_private.agent_change_proposals(id) ON DELETE RESTRICT;
CREATE TABLE app_private.agent_commands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id uuid NOT NULL REFERENCES app_private.domain_operations(id) ON DELETE RESTRICT,
  proposal_id uuid NOT NULL UNIQUE REFERENCES app_private.agent_change_proposals(id) ON DELETE RESTRICT,
  execution_id uuid REFERENCES app_private.ai_executions(id) ON DELETE RESTRICT,
  actor_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  kind text NOT NULL CHECK (kind IN ('profile.update','instruction.write')),
  target_label text NOT NULL,
  payload_hash text NOT NULL CHECK (payload_hash ~ '^[0-9a-f]{64}$'),
  resource_version bigint NOT NULL CHECK (resource_version>0),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_agent_commands_execution ON app_private.agent_commands(execution_id) WHERE execution_id IS NOT NULL;

-- ---- Versions, timestamps
CREATE TRIGGER trg_agent_conversations_version BEFORE UPDATE ON app_private.agent_conversations FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
CREATE TRIGGER trg_agent_conversations_updated_at BEFORE UPDATE ON app_private.agent_conversations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_agent_profiles_version BEFORE UPDATE ON app_private.agent_talent_profiles FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
CREATE TRIGGER trg_agent_profiles_updated_at BEFORE UPDATE ON app_private.agent_talent_profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_agent_instructions_version BEFORE UPDATE ON app_private.agent_instructions FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
CREATE TRIGGER trg_agent_instructions_updated_at BEFORE UPDATE ON app_private.agent_instructions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_agent_proposals_version BEFORE UPDATE ON app_private.agent_change_proposals FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
CREATE TRIGGER trg_agent_proposals_updated_at BEFORE UPDATE ON app_private.agent_change_proposals FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['agent_conversations','agent_entries','agent_talent_profiles','agent_talent_profile_versions','agent_instructions',
    'agent_instruction_versions','agent_profile_exports','agent_steps','agent_change_proposals','agent_commands'] LOOP
    EXECUTE format('ALTER TABLE app_private.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE ALL ON app_private.%I FROM PUBLIC,anon,authenticated', t);
    EXECUTE format('CREATE POLICY backend_runtime ON app_private.%I TO talent_runtime USING (true) WITH CHECK (true)', t);
  END LOOP;
END $$;
-- ponytail: API, dispatcher and worker share talent_runtime (report §4.2 allows it for the first step, after Tech Lead review).
-- History, entries and commands are append-only for the runtime: no UPDATE/DELETE grant.
GRANT SELECT,INSERT ON app_private.agent_entries,app_private.agent_talent_profile_versions,app_private.agent_instruction_versions,app_private.agent_commands TO talent_runtime;
GRANT SELECT,INSERT,UPDATE ON app_private.agent_conversations,app_private.agent_talent_profiles,app_private.agent_instructions,
  app_private.agent_profile_exports,app_private.agent_steps,app_private.agent_change_proposals TO talent_runtime;
-- The coach demo and its "reset today" route are removed: take back the DEMO ONLY DELETE grants of 20261123000400.
REVOKE DELETE ON public.coach_messages,public.theme_suggestions,public.ai_usage_events,app_private.ai_execution_attempts,
  app_private.ai_executions,app_private.outbox_events,app_private.domain_operations FROM talent_runtime;
COMMIT;
