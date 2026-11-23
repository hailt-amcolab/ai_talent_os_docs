-- DEMO ONLY: lets the API's "delete today's test data" button (POST /api/v1/me/coach/daily/reset, mounted only with
-- ENABLE_AUTH_DEMO outside production) remove a day's morning runs. Decided with the user 2026-11-23.
-- !! REVOKE BEFORE PRODUCTION: the runtime role must not delete conversations, operations or usage there
--    (database-design/07: no wider grants just to run a demo). Revert:
--    REVOKE DELETE ON public.coach_messages,public.theme_suggestions,public.ai_usage_events,app_private.ai_execution_attempts,
--      app_private.ai_executions,app_private.outbox_events,app_private.domain_operations FROM talent_runtime;
-- The existing backend_runtime policies (FOR ALL) already cover DELETE. ai_daily_trends is NOT included: trends are kept.
BEGIN;
SET LOCAL lock_timeout='5s';
GRANT DELETE ON public.coach_messages,public.theme_suggestions,public.ai_usage_events TO talent_runtime;
GRANT DELETE ON app_private.ai_execution_attempts,app_private.ai_executions,app_private.outbox_events,app_private.domain_operations TO talent_runtime;
COMMIT;
