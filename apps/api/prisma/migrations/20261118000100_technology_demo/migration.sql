-- Isolated technology POC. Earlier domain migrations are preserved unchanged.
BEGIN;
SET LOCAL lock_timeout='5s';
CREATE TABLE app_private.tech_demo_sessions (
 session_id uuid PRIMARY KEY,
 auth_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 revoked_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(session_id,auth_user_id)
);
CREATE INDEX idx_tech_sessions_user ON app_private.tech_demo_sessions(auth_user_id);
CREATE TABLE app_private.tech_demo_push_subscriptions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 auth_user_id uuid NOT NULL,
 session_id uuid NOT NULL,
 endpoint text NOT NULL UNIQUE CHECK(length(endpoint)<=2048),
 p256dh_key text NOT NULL,
 auth_secret text NOT NULL,
 label text NOT NULL DEFAULT 'Browser' CHECK(length(label) BETWEEN 1 AND 80),
 is_active boolean NOT NULL DEFAULT true,
 updated_at timestamptz NOT NULL DEFAULT now(),
 FOREIGN KEY(session_id,auth_user_id) REFERENCES app_private.tech_demo_sessions(session_id,auth_user_id) ON DELETE CASCADE
);
CREATE INDEX idx_tech_push_owner ON app_private.tech_demo_push_subscriptions(auth_user_id) WHERE is_active;
CREATE INDEX idx_tech_push_session ON app_private.tech_demo_push_subscriptions(session_id,auth_user_id);
ALTER TABLE app_private.tech_demo_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_private.tech_demo_push_subscriptions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_private.tech_demo_sessions,app_private.tech_demo_push_subscriptions FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON app_private.tech_demo_sessions,app_private.tech_demo_push_subscriptions TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.tech_demo_sessions TO talent_runtime USING(true) WITH CHECK(true);
CREATE POLICY backend_runtime ON app_private.tech_demo_push_subscriptions TO talent_runtime USING(true) WITH CHECK(true);
COMMIT;
