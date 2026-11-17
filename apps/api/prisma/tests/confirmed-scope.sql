-- Run after all migrations on a DISPOSABLE database with the migration owner.
-- All fixtures and any trigger toggles roll back. psql must use ON_ERROR_STOP=1.
BEGIN;
CREATE FUNCTION pg_temp.expect_error(statement text, expected_state text) RETURNS void LANGUAGE plpgsql AS $$
BEGIN
 BEGIN EXECUTE statement;
 EXCEPTION WHEN OTHERS THEN
   IF SQLSTATE=expected_state THEN RETURN; END IF;
   RAISE EXCEPTION 'expected %, got %: %',expected_state,SQLSTATE,SQLERRM;
 END;
 RAISE EXCEPTION 'statement unexpectedly succeeded: %',statement;
END $$;
SELECT pg_temp.expect_error($q$INSERT INTO public.managers(auth_user_id) VALUES ('10000000-0000-0000-0000-000000000099')$q$,'23503');
INSERT INTO auth.users(id) SELECT ('10000000-0000-0000-0000-'||lpad(i::text,12,'0'))::uuid FROM generate_series(1,4) i;
INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES
 ('10000000-0000-0000-0000-000000000001','manager'),
 ('10000000-0000-0000-0000-000000000002','talent'),
 ('10000000-0000-0000-0000-000000000003','talent'),
 ('10000000-0000-0000-0000-000000000004','talent');
INSERT INTO public.managers(id,auth_user_id) VALUES
 ('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001');
SELECT pg_temp.expect_error($q$INSERT INTO public.managers(auth_user_id) VALUES ('10000000-0000-0000-0000-000000000002')$q$,'23503');
SELECT pg_temp.expect_error($q$DELETE FROM auth.users WHERE id='10000000-0000-0000-0000-000000000001'$q$,'23503');
SELECT pg_temp.expect_error($q$INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_at) VALUES ('A','bad@example.test','2000-01-01','approved',now())$q$,'23514');
INSERT INTO public.talent_applications(id,display_name,email,birth_date) VALUES
 ('30000000-0000-0000-0000-000000000001','Pending','pending@example.test','2000-01-01');
SELECT pg_temp.expect_error($q$INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,application_id) VALUES ('10000000-0000-0000-0000-000000000004','talent','Pending','2000-01-01','30000000-0000-0000-0000-000000000001')$q$,'23503');
INSERT INTO public.talents(id,auth_user_id,account_type,display_name,created_by_manager_id) VALUES
 ('40000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002','office','A','20000000-0000-0000-0000-000000000001'),
 ('40000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000003','office','B','20000000-0000-0000-0000-000000000001');
INSERT INTO public.posts(id,talent_id,caption) VALUES
 ('50000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001','A');
INSERT INTO public.media_assets(id,talent_id,kind,source,mime_type,size_bytes,temp_object_path) VALUES
 ('60000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001','photo','upload','image/jpeg',10,'a/photo'),
 ('60000000-0000-0000-0000-000000000002','40000000-0000-0000-0000-000000000002','photo','upload','image/jpeg',10,'b/photo');
SELECT pg_temp.expect_error($q$INSERT INTO public.post_media(post_id,media_asset_id,talent_id,position) VALUES ('50000000-0000-0000-0000-000000000001','60000000-0000-0000-0000-000000000002','40000000-0000-0000-0000-000000000001',1)$q$,'23503');
INSERT INTO public.post_media(post_id,media_asset_id,talent_id,position) VALUES
 ('50000000-0000-0000-0000-000000000001','60000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001',1);
SELECT pg_temp.expect_error($q$UPDATE public.media_assets SET talent_id='40000000-0000-0000-0000-000000000002' WHERE id='60000000-0000-0000-0000-000000000001'$q$,'23503');
SELECT pg_temp.expect_error($q$UPDATE public.posts SET caption='no version' WHERE id='50000000-0000-0000-0000-000000000001'$q$,'23514');
UPDATE public.posts SET caption='edited',version=version+1 WHERE id='50000000-0000-0000-0000-000000000001' AND version=1;
SELECT pg_temp.expect_error($q$UPDATE public.posts SET status='scheduled',adopted_at=now(),scheduled_at=now(),version=version+1 WHERE id='50000000-0000-0000-0000-000000000001'$q$,'55000');
SELECT pg_temp.expect_error($q$INSERT INTO public.social_accounts(talent_id,platform) VALUES ('40000000-0000-0000-0000-000000000001','instagram')$q$,'55000');
-- Check dormant constraints independently of the release gate, as migration owner.
ALTER TABLE public.billing_accounts DISABLE TRIGGER trg_billing_accounts_deferred;
SELECT pg_temp.expect_error($q$INSERT INTO public.billing_accounts(talent_id,provider_member_ref,registered_at) VALUES ('40000000-0000-0000-0000-000000000001','office-bill',now())$q$,'23503');
ALTER TABLE public.posts DISABLE TRIGGER trg_posts_confirmed_scope;
SELECT pg_temp.expect_error($q$UPDATE public.posts SET cancel_reason='manager_cancelled',version=version+1 WHERE id='50000000-0000-0000-0000-000000000001'$q$,'23514');
ALTER TABLE public.social_accounts DISABLE TRIGGER trg_social_accounts_deferred;
ALTER TABLE public.post_deliveries DISABLE TRIGGER trg_post_deliveries_deferred;
INSERT INTO public.social_accounts(id,talent_id,platform) VALUES ('70000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001','instagram');
SELECT pg_temp.expect_error($q$INSERT INTO public.post_deliveries(post_id,talent_id,platform,social_account_id) VALUES ('50000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001','youtube','70000000-0000-0000-0000-000000000001')$q$,'23503');
ALTER TABLE public.video_generations DISABLE TRIGGER trg_video_generations_deferred;
ALTER TABLE public.video_generation_inputs DISABLE TRIGGER trg_video_generation_inputs_deferred;
INSERT INTO public.video_generations(id,talent_id,video_type,idempotency_key) VALUES
 ('71000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001','short','test-input-ownership');
SELECT pg_temp.expect_error($q$INSERT INTO public.video_generation_inputs(video_generation_id,media_asset_id,talent_id,position) VALUES ('71000000-0000-0000-0000-000000000001','60000000-0000-0000-0000-000000000002','40000000-0000-0000-0000-000000000001',1)$q$,'23503');
SELECT pg_temp.expect_error($q$UPDATE public.video_generations SET result_media_asset_id='60000000-0000-0000-0000-000000000002',status='succeeded',completed_at=now() WHERE id='71000000-0000-0000-0000-000000000001'$q$,'23503');
INSERT INTO public.posts(id,talent_id,caption) VALUES
 ('50000000-0000-0000-0000-000000000002','40000000-0000-0000-0000-000000000002','B');
SELECT pg_temp.expect_error($q$UPDATE public.posts SET revised_from_post_id='50000000-0000-0000-0000-000000000002',version=version+1 WHERE id='50000000-0000-0000-0000-000000000001'$q$,'23503');
ALTER TABLE public.manager_notifications DISABLE TRIGGER trg_manager_notifications_deferred;
SELECT pg_temp.expect_error($q$INSERT INTO public.manager_notifications(kind,talent_id,post_id,event_key) VALUES ('test','40000000-0000-0000-0000-000000000001','50000000-0000-0000-0000-000000000002','cross-owner')$q$,'23503');
-- Session binding and proof metadata cannot be partial.
INSERT INTO app_private.auth_session_registry(session_id,auth_user_id,purpose,security_version_at_issue,auth_time,absolute_expires_at) VALUES
 ('80000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002','first_password',1,now(),now()+interval '1 hour');
SELECT pg_temp.expect_error($q$UPDATE app_private.auth_session_registry SET absolute_expires_at=absolute_expires_at+interval '30 days' WHERE session_id='80000000-0000-0000-0000-000000000001'$q$,'23514');
INSERT INTO app_private.auth_session_registry(session_id,auth_user_id,purpose,security_version_at_issue,auth_time,absolute_expires_at) VALUES
 ('80000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001','mfa_setup',1,now(),now()+interval '1 hour');
UPDATE public.managers SET is_active=false,deactivated_at=now() WHERE id='20000000-0000-0000-0000-000000000001';
DO $$ BEGIN
 IF (SELECT security_version FROM app_private.auth_principals WHERE auth_user_id='10000000-0000-0000-0000-000000000001')<>2
 OR (SELECT revoked_at FROM app_private.auth_session_registry WHERE session_id='80000000-0000-0000-0000-000000000002') IS NULL THEN
   RAISE EXCEPTION 'disable did not atomically revoke/increment version';
 END IF;
END $$;
UPDATE public.managers SET is_active=true,deactivated_at=NULL WHERE id='20000000-0000-0000-0000-000000000001';
SELECT pg_temp.expect_error($q$UPDATE app_private.auth_session_registry SET revoked_at=NULL WHERE session_id='80000000-0000-0000-0000-000000000002'$q$,'23514');
SELECT pg_temp.expect_error($q$UPDATE app_private.auth_session_registry SET mfa_factor_id='unverified' WHERE session_id='80000000-0000-0000-0000-000000000001'$q$,'23514');
SELECT pg_temp.expect_error($q$INSERT INTO app_private.auth_challenges(session_id,auth_user_id,factor_id,provider_challenge_id,purpose,expires_at) VALUES ('80000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000003','factor','challenge','login',now()+interval '5 minutes')$q$,'23503');
-- Domain and outbox share a transaction; duplicate operation/event is rejected.
INSERT INTO app_private.domain_operations(id,operation_key,kind,talent_id,payload_hash) VALUES
 ('90000000-0000-0000-0000-000000000001','notify:test','talent.notify','40000000-0000-0000-0000-000000000001',repeat('a',64));
INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES ('90000000-0000-0000-0000-000000000001',1,'notification.push');
SELECT pg_temp.expect_error($q$INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES ('90000000-0000-0000-0000-000000000001',1,'notification.push')$q$,'23505');
SELECT pg_temp.expect_error($q$UPDATE app_private.outbox_events SET state='leased'$q$,'23514');
INSERT INTO public.activity_logs(actor_type,action) VALUES ('system','test');
SET LOCAL ROLE talent_runtime;
SELECT pg_temp.expect_error('TRUNCATE public.activity_logs','42501');
SELECT pg_temp.expect_error('UPDATE public.activity_logs SET action=''tamper''','42501');
SELECT pg_temp.expect_error('DELETE FROM public.activity_logs','42501');
SELECT pg_temp.expect_error('ALTER TABLE public.posts ADD COLUMN injected text','42501');
SELECT pg_temp.expect_error('SELECT * FROM public.billing_accounts','42501');
SELECT count(*) FROM public.posts;
INSERT INTO public.activity_logs(actor_type,action) VALUES ('system','runtime.insert.allowed');
RESET ROLE;
SET LOCAL ROLE anon;
SELECT pg_temp.expect_error('SELECT * FROM public.posts','42501');
SELECT pg_temp.expect_error('SELECT * FROM app_private.auth_session_registry','42501');
RESET ROLE;
SET LOCAL ROLE authenticated;
SELECT pg_temp.expect_error('SELECT * FROM public.posts','42501');
RESET ROLE;
DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname IN ('public','app_private') AND NOT rowsecurity) THEN RAISE EXCEPTION 'RLS missing'; END IF;
END $$;
ROLLBACK;
\echo 'confirmed-scope SQL regression: passed (fixtures rolled back)'
