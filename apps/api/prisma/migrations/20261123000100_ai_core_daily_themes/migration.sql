-- AI Core task coach.daily_themes: the morning message (SCD 3-4 B, 3-6, 4-1 A; report AI Core §4.3 "own kind, not the chat label").
-- One operation per Talent per JST day: operation_key = 'coach.daily_themes:<talent_id>:<YYYY-MM-DD>' (UNIQUE already).
-- Output: one coach_messages row (the morning message) + 3 theme_suggestions rows for that day, written in the same fenced transaction.
BEGIN;
SET LOCAL lock_timeout='5s';

ALTER TABLE app_private.domain_operations DROP CONSTRAINT domain_operations_kind_check,
  ADD CONSTRAINT domain_operations_kind_check CHECK (kind IN ('application.provision','manager.provision','office.provision','media.transfer','talent.notify','coach.respond','coach.daily_themes'));
ALTER TABLE app_private.outbox_events DROP CONSTRAINT outbox_events_event_type_check,
  ADD CONSTRAINT outbox_events_event_type_check CHECK (event_type IN ('auth.provision','media.transfer','notification.push','coach.respond','coach.daily_themes'));
ALTER TABLE app_private.ai_executions DROP CONSTRAINT ai_executions_task_key_check,
  ADD CONSTRAINT ai_executions_task_key_check CHECK (task_key IN ('coach.respond','coach.daily_themes'));

-- A morning run has no talent message as input; chat always has one.
ALTER TABLE app_private.ai_executions ALTER COLUMN input_message_id DROP NOT NULL,
  ADD CONSTRAINT chk_ai_executions_input CHECK ((task_key='coach.respond')=(input_message_id IS NOT NULL));

-- No profile yet (UC-01 前提): the morning message is a fixed text, the model is never called. Such an attempt may succeed with usage not_called.
ALTER TABLE app_private.ai_execution_attempts DROP CONSTRAINT ai_execution_attempts_check,
  ADD CONSTRAINT ai_execution_attempts_check CHECK (phase='claimed'
    OR (phase IN ('failed','cancelled','succeeded') AND call_started_at IS NULL)
    OR (provider IS NOT NULL AND model IS NOT NULL AND context_revision IS NOT NULL AND call_started_at IS NOT NULL));

-- 3-6 / 8-7 inputs: the morning run READS yesterday's deliveries, metric snapshots and follower snapshots.
-- Read-only grants; the deferred-write triggers on these tables stay in force (EP06/8-7 still write-blocked).
GRANT SELECT ON public.social_accounts,public.post_deliveries,public.post_metric_snapshots,public.follower_snapshots TO talent_runtime;
CREATE POLICY backend_runtime_read ON public.social_accounts FOR SELECT TO talent_runtime USING (true);
CREATE POLICY backend_runtime_read ON public.post_deliveries FOR SELECT TO talent_runtime USING (true);
CREATE POLICY backend_runtime_read ON public.post_metric_snapshots FOR SELECT TO talent_runtime USING (true);
CREATE POLICY backend_runtime_read ON public.follower_snapshots FOR SELECT TO talent_runtime USING (true);
COMMIT;
