-- AI Core reads the Talent's follower goals from Postgres (storage doc KIEN_TRUC_LUU_TRU_ONEDRIVE_VA_SUPABASE.md §3:
-- follower_goals is the source; 目標.md on OneDrive is only an export). Read-only grant: the deferred-write trigger stays in force.
BEGIN;
SET LOCAL lock_timeout='5s';
GRANT SELECT ON public.follower_goals TO talent_runtime;
CREATE POLICY backend_runtime_read ON public.follower_goals FOR SELECT TO talent_runtime USING (true);
COMMIT;
