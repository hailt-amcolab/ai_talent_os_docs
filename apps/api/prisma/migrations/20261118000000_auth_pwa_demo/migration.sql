-- Demo boundary ADR: agent_spec/auth-pwa-demo/IMPLEMENTATION.md.
-- No provider-managed Auth tables/secrets/QR/JWT are stored here.
BEGIN;
SET LOCAL lock_timeout='5s';
ALTER TABLE app_private.auth_principals ADD COLUMN mfa_enrollment_allowed boolean NOT NULL DEFAULT false;
CREATE TABLE app_private.auth_login_identifiers (
 email_hash text PRIMARY KEY CHECK (email_hash ~ '^[0-9a-f]{64}$'),
 auth_user_id uuid NOT NULL UNIQUE REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT
);
CREATE TABLE app_private.auth_rate_buckets (
 bucket_key text PRIMARY KEY,
 count integer NOT NULL CHECK (count>0),
 window_started_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE app_private.auth_mfa_enrollments (
 session_id uuid PRIMARY KEY,
 auth_user_id uuid NOT NULL UNIQUE,
 factor_id text UNIQUE,
 state text NOT NULL CHECK (state IN ('creating','pending','unknown')),
 expires_at timestamptz NOT NULL,
 FOREIGN KEY (session_id,auth_user_id) REFERENCES app_private.auth_session_registry(session_id,auth_user_id) ON DELETE RESTRICT
);
CREATE TABLE app_private.demo_auth_deliveries (
 application_id uuid PRIMARY KEY REFERENCES public.talent_applications(id) ON DELETE RESTRICT,
 receipt_hash text NOT NULL UNIQUE CHECK (receipt_hash ~ '^[0-9a-f]{64}$'),
 credential_ciphertext text,
 state text NOT NULL DEFAULT 'pending' CHECK (state IN ('pending','available','claimed','failed')),
 expires_at timestamptz,
 claimed_at timestamptz,
 CHECK (state IN ('pending','available') OR credential_ciphertext IS NULL),
 CHECK (state<>'available' OR (credential_ciphertext IS NOT NULL AND expires_at IS NOT NULL)),
 CHECK ((state='claimed')=(claimed_at IS NOT NULL))
);
ALTER TABLE public.talents ADD CONSTRAINT uq_talents_id_auth UNIQUE(id,auth_user_id);
ALTER TABLE public.push_subscriptions ADD COLUMN owner_session_id uuid;
ALTER TABLE public.push_subscriptions ADD COLUMN owner_auth_user_id uuid;
-- Existing installations must re-register; no endpoint is silently rebound.
UPDATE public.push_subscriptions SET is_active=false,deactivated_at=now() WHERE is_active;
ALTER TABLE public.push_subscriptions ADD CONSTRAINT fk_push_session_owner
 FOREIGN KEY(owner_session_id,owner_auth_user_id) REFERENCES app_private.auth_session_registry(session_id,auth_user_id) ON DELETE RESTRICT;
ALTER TABLE public.push_subscriptions ADD CONSTRAINT fk_push_talent_owner
 FOREIGN KEY(talent_id,owner_auth_user_id) REFERENCES public.talents(id,auth_user_id) ON DELETE RESTRICT;
ALTER TABLE public.push_subscriptions ADD CONSTRAINT chk_push_active_binding CHECK
 (NOT is_active OR (owner_session_id IS NOT NULL AND owner_auth_user_id IS NOT NULL));
CREATE INDEX idx_push_owner_session ON public.push_subscriptions(owner_session_id);
ALTER TABLE public.talent_notifications ADD CONSTRAINT uq_notifications_id_talent UNIQUE(id,talent_id);
ALTER TABLE app_private.domain_operations ADD COLUMN notification_id uuid;
ALTER TABLE app_private.domain_operations ADD CONSTRAINT chk_operation_notification_owner CHECK(notification_id IS NULL OR talent_id IS NOT NULL);
ALTER TABLE app_private.domain_operations ADD CONSTRAINT fk_operation_notification_owner
 FOREIGN KEY(notification_id,talent_id) REFERENCES public.talent_notifications(id,talent_id) ON DELETE RESTRICT;
CREATE TABLE app_private.push_deliveries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 event_id uuid NOT NULL REFERENCES app_private.outbox_events(id) ON DELETE RESTRICT,
 subscription_id uuid NOT NULL REFERENCES public.push_subscriptions(id) ON DELETE RESTRICT,
 state text NOT NULL DEFAULT 'pending' CHECK(state IN ('pending','sent','gone','failed')),
 attempts integer NOT NULL DEFAULT 0 CHECK(attempts BETWEEN 0 AND 3),
 last_error_code text,
 UNIQUE(event_id,subscription_id)
);
ALTER TABLE app_private.auth_login_identifiers ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_private.auth_login_identifiers FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON app_private.auth_login_identifiers TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.auth_login_identifiers TO talent_runtime USING(true) WITH CHECK(true);
ALTER TABLE app_private.auth_rate_buckets ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_private.auth_rate_buckets FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON app_private.auth_rate_buckets TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.auth_rate_buckets TO talent_runtime USING(true) WITH CHECK(true);
ALTER TABLE app_private.auth_mfa_enrollments ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_private.auth_mfa_enrollments FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON app_private.auth_mfa_enrollments TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.auth_mfa_enrollments TO talent_runtime USING(true) WITH CHECK(true);
ALTER TABLE app_private.demo_auth_deliveries ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_private.demo_auth_deliveries FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON app_private.demo_auth_deliveries TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.demo_auth_deliveries TO talent_runtime USING(true) WITH CHECK(true);
ALTER TABLE app_private.push_deliveries ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON app_private.push_deliveries FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON app_private.push_deliveries TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.push_deliveries TO talent_runtime USING(true) WITH CHECK(true);
CREATE INDEX idx_push_delivery_subscription ON app_private.push_deliveries(subscription_id);
-- Atomic session revocation also detaches every device bound to that session.
CREATE FUNCTION app_private.detach_revoked_push() RETURNS trigger LANGUAGE plpgsql SET search_path='' AS $$
BEGIN
 UPDATE public.push_subscriptions SET is_active=false,deactivated_at=COALESCE(deactivated_at,now())
 WHERE owner_session_id=NEW.session_id AND is_active;
 RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION app_private.detach_revoked_push() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER trg_sessions_detach_push AFTER UPDATE OF revoked_at ON app_private.auth_session_registry
 FOR EACH ROW WHEN(OLD.revoked_at IS NULL AND NEW.revoked_at IS NOT NULL)
 EXECUTE FUNCTION app_private.detach_revoked_push();
COMMIT;
