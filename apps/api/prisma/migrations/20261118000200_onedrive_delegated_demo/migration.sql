-- OneDrive technology demo, delegated mode: ONE main Microsoft account (personal or work) for the whole system,
-- connected once by an allowed user via OAuth code + PKCE. Every login then works in that drive.
-- Isolated demo tables; the real feature uses app_private.onedrive_connection / onedrive_items (onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md §4).
BEGIN;
SET LOCAL lock_timeout='5s';
-- Single row (slot='primary'). Tokens are AES-256-GCM sealed by the BE (never readable by SQL alone).
CREATE TABLE app_private.tech_demo_onedrive_connections (
 slot text PRIMARY KEY CHECK(slot='primary'),
 connected_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
 ms_account_id text NOT NULL CHECK(length(ms_account_id) BETWEEN 1 AND 200),
 display_name text CHECK(length(display_name)<=200),
 drive_id text NOT NULL CHECK(length(drive_id) BETWEEN 1 AND 200),
 drive_type text NOT NULL CHECK(drive_type IN ('personal','business','documentLibrary')),
 status text NOT NULL CHECK(status IN ('connected','reconnect_required')),
 token_box bytea,
 access_expires_at timestamptz,
 version integer NOT NULL DEFAULT 1,
 connected_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK((status='connected')=(token_box IS NOT NULL))
);
-- OAuth state: stored as SHA-256, bound to the login session that started it, single use (DELETE … RETURNING).
CREATE TABLE app_private.tech_demo_onedrive_oauth_states (
 state_hash bytea PRIMARY KEY CHECK(length(state_hash)=32),
 auth_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 session_id uuid NOT NULL,
 verifier_box bytea NOT NULL,
 expires_at timestamptz NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_tech_onedrive_states_user ON app_private.tech_demo_onedrive_oauth_states(auth_user_id);
ALTER TABLE app_private.tech_demo_onedrive_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_private.tech_demo_onedrive_oauth_states ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_private.tech_demo_onedrive_connections,app_private.tech_demo_onedrive_oauth_states FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON app_private.tech_demo_onedrive_connections,app_private.tech_demo_onedrive_oauth_states TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.tech_demo_onedrive_connections TO talent_runtime USING(true) WITH CHECK(true);
CREATE POLICY backend_runtime ON app_private.tech_demo_onedrive_oauth_states TO talent_runtime USING(true) WITH CHECK(true);
COMMIT;
