-- Additive correction. Do not edit applied migrations 00000..00200.
-- Scope and contracts: database-design/10_confirmed_scope_and_remediation.md.
-- Fail on incompatible legacy data; never delete or silently repair business data.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';
DO $$ BEGIN
  IF to_regclass('auth.users') IS NULL THEN
    RAISE EXCEPTION 'auth.users required: use Supabase, or explicit local/test bootstrap';
  END IF;
END $$;

-- Do not quarantine in-flight side effects without resolving them first.
DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM public.post_deliveries WHERE provider_state IN ('submitted','cancel_requested','cancel_failed'))
 OR EXISTS (SELECT 1 FROM public.video_generations WHERE status IN ('requested','processing'))
 OR EXISTS (SELECT 1 FROM public.posts WHERE status IN ('scheduled','awaiting_approval')) THEN
   RAISE EXCEPTION 'resolve active publishing/video operations before applying confirmed-scope migration';
 END IF;
END $$;

-- F03: restore genuine referential integrity, including concurrent parent deletion.
DROP TRIGGER IF EXISTS trg_auth_users_block_referenced_delete ON auth.users;
DROP FUNCTION public.block_referenced_auth_user_delete();
ALTER TABLE public.managers ADD CONSTRAINT fk_managers_auth_user_id
  FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE RESTRICT;
ALTER TABLE public.talents ADD CONSTRAINT fk_talents_auth_user_id
  FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE RESTRICT;

-- F11: reject partial provenance (the old Boolean equivalence did not).
ALTER TABLE public.talent_applications DROP CONSTRAINT chk_talent_applications_decision;
ALTER TABLE public.talent_applications ADD CONSTRAINT chk_talent_applications_decision CHECK (
  (status = 'pending' AND decided_by_manager_id IS NULL AND decided_at IS NULL) OR
  (status IN ('approved','rejected') AND decided_by_manager_id IS NOT NULL AND decided_at IS NOT NULL));
ALTER TABLE public.posts DROP CONSTRAINT chk_posts_cancelled;
ALTER TABLE public.posts ADD CONSTRAINT chk_posts_cancelled CHECK (
  (status = 'cancelled' AND cancel_reason IS NOT NULL AND cancelled_at IS NOT NULL) OR
  (status <> 'cancelled' AND cancel_reason IS NULL AND cancelled_at IS NULL));

-- F04: scoped candidate keys and FKs protect all writers and parent updates.
ALTER TABLE public.posts ADD CONSTRAINT uq_posts_id_talent UNIQUE (id,talent_id);
ALTER TABLE public.media_assets ADD CONSTRAINT uq_media_assets_id_talent UNIQUE (id,talent_id);
ALTER TABLE public.video_generations ADD CONSTRAINT uq_video_generations_id_talent UNIQUE (id,talent_id);
ALTER TABLE public.theme_suggestions ADD CONSTRAINT uq_theme_suggestions_id_talent UNIQUE (id,talent_id);
ALTER TABLE public.coach_messages ADD CONSTRAINT uq_coach_messages_id_talent UNIQUE (id,talent_id);
ALTER TABLE public.social_accounts ADD CONSTRAINT uq_social_accounts_identity_scope UNIQUE (id,talent_id,platform);
ALTER TABLE public.post_media ADD COLUMN talent_id uuid;
UPDATE public.post_media c SET talent_id=p.talent_id FROM public.posts p WHERE p.id=c.post_id;
ALTER TABLE public.post_media ALTER COLUMN talent_id SET NOT NULL;
ALTER TABLE public.post_media ADD CONSTRAINT fk_post_media_owner FOREIGN KEY (post_id,talent_id)
  REFERENCES public.posts(id,talent_id) ON DELETE CASCADE;
ALTER TABLE public.video_generation_inputs ADD COLUMN talent_id uuid;
UPDATE public.video_generation_inputs c SET talent_id=p.talent_id FROM public.video_generations p WHERE p.id=c.video_generation_id;
ALTER TABLE public.video_generation_inputs ALTER COLUMN talent_id SET NOT NULL;
ALTER TABLE public.video_generation_inputs ADD CONSTRAINT fk_video_generation_inputs_owner FOREIGN KEY (video_generation_id,talent_id)
  REFERENCES public.video_generations(id,talent_id) ON DELETE CASCADE;
ALTER TABLE public.post_deliveries ADD COLUMN talent_id uuid;
UPDATE public.post_deliveries c SET talent_id=p.talent_id FROM public.posts p WHERE p.id=c.post_id;
ALTER TABLE public.post_deliveries ALTER COLUMN talent_id SET NOT NULL;
ALTER TABLE public.post_deliveries ADD CONSTRAINT fk_post_deliveries_owner FOREIGN KEY (post_id,talent_id)
  REFERENCES public.posts(id,talent_id) ON DELETE RESTRICT;
ALTER TABLE public.post_media ADD CONSTRAINT fk_post_media_media_owner
  FOREIGN KEY (media_asset_id,talent_id) REFERENCES public.media_assets(id,talent_id) ON DELETE RESTRICT;
ALTER TABLE public.video_generation_inputs ADD CONSTRAINT fk_video_generation_inputs_media_owner
  FOREIGN KEY (media_asset_id,talent_id) REFERENCES public.media_assets(id,talent_id) ON DELETE RESTRICT;
ALTER TABLE public.post_deliveries ADD CONSTRAINT fk_post_deliveries_account_scope
  FOREIGN KEY (social_account_id,talent_id,platform) REFERENCES public.social_accounts(id,talent_id,platform) ON DELETE RESTRICT;
ALTER TABLE public.posts ADD CONSTRAINT fk_posts_theme_owner
  FOREIGN KEY (theme_suggestion_id,talent_id) REFERENCES public.theme_suggestions(id,talent_id) ON DELETE RESTRICT;
ALTER TABLE public.posts ADD CONSTRAINT fk_posts_revision_owner
  FOREIGN KEY (revised_from_post_id,talent_id) REFERENCES public.posts(id,talent_id) ON DELETE RESTRICT;
ALTER TABLE public.posts ADD CONSTRAINT chk_posts_not_self_revision CHECK (revised_from_post_id IS DISTINCT FROM id);
ALTER TABLE public.video_generations ADD CONSTRAINT fk_video_generations_result_owner
  FOREIGN KEY (result_media_asset_id,talent_id) REFERENCES public.media_assets(id,talent_id) ON DELETE RESTRICT;
ALTER TABLE public.manager_notifications ADD CONSTRAINT chk_manager_notifications_owned_subject CHECK (
  (post_id IS NULL AND coach_message_id IS NULL) OR talent_id IS NOT NULL);
ALTER TABLE public.manager_notifications ADD CONSTRAINT fk_manager_notifications_post_owner
  FOREIGN KEY (post_id,talent_id) REFERENCES public.posts(id,talent_id) ON DELETE RESTRICT;
ALTER TABLE public.manager_notifications ADD CONSTRAINT fk_manager_notifications_message_owner
  FOREIGN KEY (coach_message_id,talent_id) REFERENCES public.coach_messages(id,talent_id) ON DELETE RESTRICT;
ALTER TABLE public.manager_notifications ADD CONSTRAINT chk_manager_notifications_subject_family CHECK (
  talent_application_id IS NULL OR (talent_id IS NULL AND post_id IS NULL AND coach_message_id IS NULL));

-- F08: immutable discriminator keys express approved origin and non-billable office.
ALTER TABLE public.talent_applications ADD CONSTRAINT uq_applications_id_status UNIQUE (id,status);
ALTER TABLE public.talents ADD COLUMN application_status text NOT NULL DEFAULT 'approved'
  CONSTRAINT chk_talents_approved_origin CHECK (application_status='approved');
ALTER TABLE public.talents ADD CONSTRAINT fk_talents_approved_origin
  FOREIGN KEY (application_id,application_status) REFERENCES public.talent_applications(id,status) ON DELETE RESTRICT;
ALTER TABLE public.talents ADD CONSTRAINT uq_talents_id_account_type UNIQUE (id,account_type);
ALTER TABLE public.billing_accounts ADD COLUMN account_type text NOT NULL DEFAULT 'talent'
  CONSTRAINT chk_billing_accounts_talent_only CHECK (account_type='talent');
ALTER TABLE public.billing_accounts ADD CONSTRAINT fk_billing_accounts_talent_type
  FOREIGN KEY (talent_id,account_type) REFERENCES public.talents(id,account_type) ON DELETE RESTRICT;

-- F02: one project, one principal per Auth identity. No speculative tenant model.
-- Prisma's soft-reset can keep an empty namespace between shadow replays.
CREATE SCHEMA IF NOT EXISTS app_private;
REVOKE ALL ON SCHEMA app_private FROM PUBLIC,anon,authenticated;
CREATE TABLE app_private.auth_principals (
  auth_user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE RESTRICT,
  principal_kind text NOT NULL CHECK (principal_kind IN ('manager','talent')),
  must_change_password boolean NOT NULL DEFAULT true,
  security_version bigint NOT NULL DEFAULT 1 CHECK (security_version>0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (auth_user_id,principal_kind)
);
-- Deliberately fail if a legacy identity has both roles. Existing identities are
-- restricted until Auth completion service verifies password/MFA/session facts.
INSERT INTO app_private.auth_principals(auth_user_id,principal_kind)
 SELECT auth_user_id,'manager' FROM public.managers UNION ALL
 SELECT auth_user_id,'talent' FROM public.talents;
ALTER TABLE public.managers ADD COLUMN principal_kind text NOT NULL DEFAULT 'manager'
  CONSTRAINT chk_managers_principal_kind CHECK (principal_kind='manager');
ALTER TABLE public.talents ADD COLUMN principal_kind text NOT NULL DEFAULT 'talent'
  CONSTRAINT chk_talents_principal_kind CHECK (principal_kind='talent');
ALTER TABLE public.managers ADD CONSTRAINT fk_managers_principal
  FOREIGN KEY (auth_user_id,principal_kind) REFERENCES app_private.auth_principals(auth_user_id,principal_kind) ON DELETE RESTRICT;
ALTER TABLE public.talents ADD CONSTRAINT fk_talents_principal
  FOREIGN KEY (auth_user_id,principal_kind) REFERENCES app_private.auth_principals(auth_user_id,principal_kind) ON DELETE RESTRICT;
CREATE TABLE app_private.auth_session_registry (
  session_id uuid PRIMARY KEY,
  auth_user_id uuid NOT NULL REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  purpose text NOT NULL CHECK (purpose IN ('full','first_password','recovery','mfa_setup')),
  security_version_at_issue bigint NOT NULL CHECK (security_version_at_issue>0),
  auth_time timestamptz NOT NULL,
  absolute_expires_at timestamptz NOT NULL,
  admin_last_activity_at timestamptz,
  password_verified_at timestamptz,
  mfa_factor_id text,
  mfa_verified_at timestamptz,
  mfa_policy_version text,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (absolute_expires_at>auth_time),
  CHECK ((mfa_factor_id IS NULL AND mfa_verified_at IS NULL AND mfa_policy_version IS NULL) OR
         (mfa_factor_id IS NOT NULL AND mfa_verified_at IS NOT NULL AND mfa_policy_version IS NOT NULL)),
  UNIQUE (session_id,auth_user_id)
);
CREATE INDEX idx_auth_sessions_user ON app_private.auth_session_registry(auth_user_id,revoked_at);
CREATE TABLE app_private.auth_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  auth_user_id uuid NOT NULL,
  factor_id text NOT NULL,
  provider_challenge_id text NOT NULL UNIQUE,
  purpose text NOT NULL CHECK (purpose IN ('login','enrollment','factor_change')),
  state text NOT NULL DEFAULT 'pending' CHECK (state IN ('pending','verified','expired','failed')),
  attempts_used integer NOT NULL DEFAULT 0 CHECK (attempts_used>=0),
  expires_at timestamptz NOT NULL,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (session_id,auth_user_id) REFERENCES app_private.auth_session_registry(session_id,auth_user_id) ON DELETE RESTRICT,
  CHECK ((state='verified')=(verified_at IS NOT NULL))
);
CREATE INDEX idx_auth_challenges_session ON app_private.auth_challenges(session_id,auth_user_id,state);
CREATE TABLE app_private.password_lock_state (
  auth_user_id uuid PRIMARY KEY REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  consecutive_failures integer NOT NULL DEFAULT 0 CHECK (consecutive_failures>=0),
  blocked_until timestamptz,
  last_failed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Disable/end is effective immediately and re-enabling must not resurrect old
-- sessions. The guard still checks active/ended on every authenticated request.
CREATE FUNCTION app_private.revoke_disabled_identity() RETURNS trigger
LANGUAGE plpgsql SET search_path='' AS $$ BEGIN
  UPDATE app_private.auth_principals SET security_version=security_version+1
    WHERE auth_user_id=NEW.auth_user_id;
  UPDATE app_private.auth_session_registry SET revoked_at=COALESCE(revoked_at,now())
    WHERE auth_user_id=NEW.auth_user_id;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_managers_revoke_disabled AFTER UPDATE OF is_active ON public.managers
 FOR EACH ROW WHEN (OLD.is_active AND NOT NEW.is_active)
 EXECUTE FUNCTION app_private.revoke_disabled_identity();
CREATE TRIGGER trg_talents_revoke_ended AFTER UPDATE OF status ON public.talents
 FOR EACH ROW WHEN (OLD.status<>'ended' AND NEW.status='ended')
 EXECUTE FUNCTION app_private.revoke_disabled_identity();

CREATE FUNCTION app_private.keep_session_origin() RETURNS trigger
LANGUAGE plpgsql SET search_path='' AS $$ BEGIN
 IF NEW.session_id<>OLD.session_id OR NEW.auth_user_id<>OLD.auth_user_id
    OR NEW.auth_time<>OLD.auth_time OR NEW.absolute_expires_at<>OLD.absolute_expires_at
    OR NEW.security_version_at_issue<>OLD.security_version_at_issue
    OR (OLD.revoked_at IS NOT NULL AND NEW.revoked_at IS DISTINCT FROM OLD.revoked_at) THEN
   RAISE EXCEPTION 'session origin/expiry/version/revocation is immutable; authenticate a new session'
     USING ERRCODE='23514';
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER trg_auth_sessions_immutable BEFORE UPDATE ON app_private.auth_session_registry
 FOR EACH ROW EXECUTE FUNCTION app_private.keep_session_origin();

-- F05: durable operation and outbox contract. No secrets or arbitrary request bodies.
CREATE TABLE app_private.domain_operations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_auth_user_id uuid REFERENCES app_private.auth_principals(auth_user_id) ON DELETE RESTRICT,
  operation_key text NOT NULL UNIQUE CHECK (btrim(operation_key)<>''),
  kind text NOT NULL CHECK (kind IN ('application.provision','manager.provision','office.provision','media.transfer','talent.notify','coach.respond')),
  application_id uuid REFERENCES public.talent_applications(id) ON DELETE RESTRICT,
  talent_id uuid REFERENCES public.talents(id) ON DELETE RESTRICT,
  payload_hash text NOT NULL CHECK (payload_hash ~ '^[0-9a-f]{64}$'),
  state text NOT NULL DEFAULT 'accepted' CHECK (state IN ('accepted','running','completed','failed','unknown')),
  step text,
  provider_ref text,
  version bigint NOT NULL DEFAULT 1 CHECK (version>0),
  last_error_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (kind<>'application.provision' OR application_id IS NOT NULL)
);
CREATE UNIQUE INDEX uq_operations_application_provision ON app_private.domain_operations(application_id) WHERE kind='application.provision';
CREATE INDEX idx_operations_actor ON app_private.domain_operations(actor_auth_user_id);
CREATE INDEX idx_operations_talent ON app_private.domain_operations(talent_id);
CREATE TABLE app_private.outbox_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id uuid NOT NULL REFERENCES app_private.domain_operations(id) ON DELETE RESTRICT,
  generation bigint NOT NULL CHECK (generation>0),
  event_type text NOT NULL CHECK (event_type IN ('auth.provision','media.transfer','notification.push','coach.respond')),
  state text NOT NULL DEFAULT 'pending' CHECK (state IN ('pending','leased','done','failed','unknown')),
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts>=0),
  available_at timestamptz NOT NULL DEFAULT now(),
  lease_token uuid,
  lease_until timestamptz,
  last_error_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(operation_id,generation,event_type),
  CHECK ((state='leased' AND lease_token IS NOT NULL AND lease_until IS NOT NULL) OR
         (state<>'leased' AND lease_token IS NULL AND lease_until IS NULL))
);
CREATE INDEX idx_outbox_due ON app_private.outbox_events(available_at,id) WHERE state='pending';
CREATE INDEX idx_outbox_expired_lease ON app_private.outbox_events(lease_until,id) WHERE state='leased';

-- F08: a declared version is now a DB-enforced compare-and-swap protocol.
CREATE FUNCTION app_private.require_next_version() RETURNS trigger
LANGUAGE plpgsql SET search_path='' AS $$ BEGIN
  IF NEW.version<>OLD.version+1 THEN
    RAISE EXCEPTION 'version must advance exactly once' USING ERRCODE='23514';
  END IF;
  RETURN NEW;
END $$;
ALTER TABLE public.talent_applications ADD CONSTRAINT chk_talent_applications_positive_version CHECK (version>0);
CREATE TRIGGER trg_talent_applications_version BEFORE UPDATE ON public.talent_applications
  FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
ALTER TABLE public.talents ADD CONSTRAINT chk_talents_positive_version CHECK (version>0);
CREATE TRIGGER trg_talents_version BEFORE UPDATE ON public.talents
  FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
ALTER TABLE public.posts ADD CONSTRAINT chk_posts_positive_version CHECK (version>0);
CREATE TRIGGER trg_posts_version BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();
CREATE TRIGGER trg_operations_version BEFORE UPDATE ON app_private.domain_operations
 FOR EACH ROW EXECUTE FUNCTION app_private.require_next_version();

-- This release implements drafts only. Keep legacy pending tables readable by
-- migration owner; even owner writes fail until an explicit future migration.
CREATE FUNCTION app_private.reject_deferred_write() RETURNS trigger
LANGUAGE plpgsql SET search_path='' AS $$ BEGIN
  RAISE EXCEPTION 'feature deferred pending confirmed design: %',TG_TABLE_NAME USING ERRCODE='55000';
END $$;
CREATE FUNCTION app_private.require_draft_scope() RETURNS trigger
LANGUAGE plpgsql SET search_path='' AS $$ BEGIN
  IF NEW.status<>'draft' OR NEW.adopted_at IS NOT NULL OR NEW.scheduled_at IS NOT NULL
     OR NEW.approval_requested_at IS NOT NULL OR NEW.adopted_by_manager_id IS NOT NULL
     OR NEW.ng_detected_at IS NOT NULL THEN
    RAISE EXCEPTION 'adoption, moderation and publishing workflow deferred' USING ERRCODE='55000';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_posts_confirmed_scope BEFORE INSERT OR UPDATE ON public.posts
 FOR EACH ROW EXECUTE FUNCTION app_private.require_draft_scope();
CREATE TRIGGER trg_billing_accounts_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.billing_accounts
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
CREATE TRIGGER trg_social_accounts_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.social_accounts
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
CREATE TRIGGER trg_follower_goals_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.follower_goals
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
CREATE TRIGGER trg_follower_snapshots_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.follower_snapshots
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
CREATE TRIGGER trg_post_approval_decisions_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.post_approval_decisions
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
CREATE TRIGGER trg_post_deliveries_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.post_deliveries
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
CREATE TRIGGER trg_post_metric_snapshots_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.post_metric_snapshots
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
CREATE TRIGGER trg_video_generations_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.video_generations
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
CREATE TRIGGER trg_video_generation_inputs_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.video_generation_inputs
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
CREATE TRIGGER trg_manager_notifications_deferred BEFORE INSERT OR UPDATE OR DELETE ON public.manager_notifications
 FOR EACH ROW EXECUTE FUNCTION app_private.reject_deferred_write();
-- RLS for private tables, no client grants. Functions are internal trigger helpers.
ALTER TABLE app_private.auth_principals ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_auth_principals_updated_at BEFORE UPDATE ON app_private.auth_principals
 FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE app_private.auth_session_registry ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_auth_session_registry_updated_at BEFORE UPDATE ON app_private.auth_session_registry
 FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE app_private.auth_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_private.password_lock_state ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_password_lock_state_updated_at BEFORE UPDATE ON app_private.password_lock_state
 FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE app_private.domain_operations ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_domain_operations_updated_at BEFORE UPDATE ON app_private.domain_operations
 FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE app_private.outbox_events ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_outbox_events_updated_at BEFORE UPDATE ON app_private.outbox_events
 FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
REVOKE ALL ON ALL TABLES IN SCHEMA app_private FROM PUBLIC,anon,authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA app_private FROM PUBLIC,anon,authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA app_private REVOKE ALL ON TABLES FROM PUBLIC,anon,authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA app_private REVOKE ALL ON FUNCTIONS FROM PUBLIC,anon,authenticated;

-- F10: capabilities are NOLOGIN groups. Provision separate LOGIN credentials out
-- of band. Runtime must never inherit migration owner, postgres or service_role.
DO $$ DECLARE role_name text; BEGIN
 FOREACH role_name IN ARRAY ARRAY['talent_runtime','talent_dispatcher'] LOOP
   IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname=role_name) THEN
     EXECUTE format('CREATE ROLE %I NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS',role_name);
   END IF;
   IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname=role_name AND
     (rolcanlogin OR rolsuper OR rolcreatedb OR rolcreaterole OR rolreplication OR rolbypassrls))
   OR EXISTS (SELECT 1 FROM pg_auth_members WHERE member=(SELECT oid FROM pg_roles WHERE rolname=role_name)) THEN
     RAISE EXCEPTION 'capability role % has incompatible privileges/memberships',role_name;
   END IF;
 END LOOP;
END $$;
GRANT USAGE ON SCHEMA public,app_private TO talent_runtime,talent_dispatcher;
REVOKE CREATE ON SCHEMA public FROM PUBLIC,anon,authenticated;
GRANT SELECT, INSERT, UPDATE ON public.managers TO talent_runtime;
CREATE POLICY backend_runtime ON public.managers TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE ON public.talent_applications TO talent_runtime;
CREATE POLICY backend_runtime ON public.talent_applications TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE ON public.talents TO talent_runtime;
CREATE POLICY backend_runtime ON public.talents TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE ON public.posts TO talent_runtime;
CREATE POLICY backend_runtime ON public.posts TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.post_media TO talent_runtime;
CREATE POLICY backend_runtime ON public.post_media TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE ON public.media_assets TO talent_runtime;
CREATE POLICY backend_runtime ON public.media_assets TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE ON public.theme_suggestions TO talent_runtime;
CREATE POLICY backend_runtime ON public.theme_suggestions TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT ON public.coach_messages TO talent_runtime;
CREATE POLICY backend_runtime ON public.coach_messages TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT ON public.ai_usage_events TO talent_runtime;
CREATE POLICY backend_runtime ON public.ai_usage_events TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE ON public.talent_notifications TO talent_runtime;
CREATE POLICY backend_runtime ON public.talent_notifications TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE ON public.push_subscriptions TO talent_runtime;
CREATE POLICY backend_runtime ON public.push_subscriptions TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ng_words TO talent_runtime;
CREATE POLICY backend_runtime ON public.ng_words TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, UPDATE ON public.system_settings TO talent_runtime;
CREATE POLICY backend_runtime ON public.system_settings TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT ON public.manager_view_logs TO talent_runtime;
CREATE POLICY backend_runtime ON public.manager_view_logs TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT, INSERT ON public.activity_logs TO talent_runtime;
CREATE POLICY backend_runtime ON public.activity_logs TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT,INSERT,UPDATE ON app_private.auth_principals TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.auth_principals TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT,INSERT,UPDATE ON app_private.auth_session_registry TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.auth_session_registry TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT,INSERT,UPDATE ON app_private.auth_challenges TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.auth_challenges TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT,INSERT,UPDATE ON app_private.password_lock_state TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.password_lock_state TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT,INSERT,UPDATE ON app_private.domain_operations TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.domain_operations TO talent_runtime USING (true) WITH CHECK (true);
GRANT SELECT,INSERT,UPDATE ON app_private.outbox_events TO talent_runtime;
CREATE POLICY backend_runtime ON app_private.outbox_events TO talent_runtime USING (true) WITH CHECK (true);
GRANT USAGE ON SEQUENCE public.coach_messages_id_seq,public.ai_usage_events_id_seq,
 public.manager_view_logs_id_seq,public.activity_logs_id_seq TO talent_runtime;
GRANT SELECT,UPDATE ON app_private.outbox_events TO talent_dispatcher;
CREATE POLICY backend_dispatcher ON app_private.outbox_events TO talent_dispatcher USING (true) WITH CHECK (true);
GRANT SELECT ON app_private.domain_operations TO talent_dispatcher;
CREATE POLICY backend_dispatcher ON app_private.domain_operations FOR SELECT TO talent_dispatcher USING (true);
-- backend policies intentionally do not authorize end users; the verified-session
-- guard and owner predicates are mandatory in each service (see scope document).
COMMIT;
