-- Contract step of the AI Core change (agent_spec/ai-core/DATABASE_DESIGN.md §7): drop the 11/23 coach-demo tables, now replaced by
-- app_private.agent_runs / ai_task_runs. Nothing in the app reads them any more. Their data (demo rows only on Supabase dev) is discarded,
-- approved by the user on 2026-11-26. Kept on purpose: the coach.* values in the domain_operations / outbox CHECKs (existing rows use them),
-- public.coach_messages and public.theme_suggestions (still used), the 20261123 indexes/grants on shared tables.
BEGIN;
SET LOCAL lock_timeout = '5s';
ALTER TABLE public.ai_usage_events
  DROP CONSTRAINT fk_ai_usage_events_attempt,
  DROP CONSTRAINT uq_ai_usage_events_attempt,
  DROP COLUMN execution_attempt_id;
DROP TABLE app_private.ai_execution_attempts;
DROP TABLE app_private.ai_executions;
DROP TABLE app_private.ai_daily_trends;
COMMIT;
