-- REFERENCE ONLY: fresh disposable Supabase database; NOT a production migration.
-- Requires Supabase-managed auth schema/roles. Run after review; not executed here.
begin;
create schema if not exists app_private;
revoke all on schema app_private from public, anon, authenticated;
create table app_private.organizations (
 id uuid primary key default gen_random_uuid(), name text not null,
 created_at timestamptz not null default now()
);
create table app_private.app_users (
 auth_user_id uuid primary key references auth.users(id),
 enabled boolean not null default false,
 must_change_password boolean not null default true,
 security_version bigint not null default 1 check (security_version>0),
 created_at timestamptz not null default now()
);
create table app_private.memberships (
 organization_id uuid not null references app_private.organizations(id),
 user_id uuid not null references app_private.app_users(auth_user_id),
 role text not null check (role in ('manager','talent')),
 enabled boolean not null default false,
 primary key(organization_id,user_id)
);
create index memberships_user_idx on app_private.memberships(user_id,organization_id);
create table app_private.talent_accounts (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references app_private.organizations(id),
 owner_user_id uuid not null unique references app_private.app_users(auth_user_id),
 account_kind text not null check (account_kind in ('talent','office')),
 business_state text not null default 'before_use' check (business_state in ('before_use','in_use','ended')),
 version bigint not null default 1 check(version>0),
 unique(id,organization_id),
 foreign key(organization_id,owner_user_id) references app_private.memberships(organization_id,user_id)
);
create table app_private.auth_session_registry (
 session_id uuid primary key, -- verified JWT session_id, never caller-supplied unverified
 user_id uuid not null references app_private.app_users(auth_user_id),
 security_version_at_issue bigint not null check(security_version_at_issue>0),
 auth_time timestamptz not null,
 absolute_expires_at timestamptz not null,
 admin_last_activity_at timestamptz,
 revoked_at timestamptz,
 check(absolute_expires_at>auth_time)
);
create index session_user_idx on app_private.auth_session_registry(user_id,revoked_at);
create table app_private.audit_events (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid references app_private.organizations(id),
 actor_user_id uuid references app_private.app_users(auth_user_id),
 action text not null, resource_kind text not null, resource_id uuid,
 outcome text not null, request_id uuid not null, created_at timestamptz not null default now()
);
create index audit_org_time_idx on app_private.audit_events(organization_id,created_at,id);
create table app_private.outbox_events (
 event_id uuid primary key default gen_random_uuid(),
 aggregate_id uuid not null, aggregate_generation bigint not null,
 event_type text not null, payload_refs jsonb not null default '{}'::jsonb,
 state text not null default 'pending' check(state in ('pending','leased','done','failed','unknown')),
 next_attempt_at timestamptz not null default now(), created_at timestamptz not null default now(),
 unique(aggregate_id,aggregate_generation,event_type)
);
create index outbox_due_idx on app_private.outbox_events(next_attempt_at,event_id) where state='pending';
create table public.talent_preferences (
 talent_id uuid primary key,
 organization_id uuid not null,
 locale text not null default 'ja' check(locale in ('ja','vi')),
 version bigint not null default 1 check(version>0),
 updated_at timestamptz not null default now(),
 foreign key(talent_id,organization_id) references app_private.talent_accounts(id,organization_id)
);
alter table public.talent_preferences enable row level security;
alter table public.talent_preferences force row level security;
revoke all on public.talent_preferences from public,anon,authenticated;
grant select(talent_id,organization_id,locale,version,updated_at) on public.talent_preferences to authenticated;

-- Definer owner must remain a trusted migration role; never grant membership to runtime users.
-- This helper intentionally allows owner Talent reads only. Manager reads use audited BFF.
create function app_private.can_read_own_talent(p_org uuid,p_talent uuid)
returns boolean language sql stable security definer set search_path=''
as $$
 select auth.uid() is not null and exists (
   select 1
   from app_private.talent_accounts t
   join app_private.app_users u on u.auth_user_id=t.owner_user_id
   join app_private.memberships m on m.organization_id=t.organization_id and m.user_id=u.auth_user_id
   join app_private.auth_session_registry s on s.user_id=u.auth_user_id
   where t.id=p_talent and t.organization_id=p_org
     and u.auth_user_id=auth.uid() and u.enabled and not u.must_change_password
     and m.enabled and m.role='talent' and t.business_state in ('before_use','in_use')
     and s.session_id::text=auth.jwt()->>'session_id'
     and s.security_version_at_issue=u.security_version
     and s.revoked_at is null and s.absolute_expires_at>now()
 );
$$;
revoke all on function app_private.can_read_own_talent(uuid,uuid) from public,anon;
grant usage on schema app_private to authenticated;
grant execute on function app_private.can_read_own_talent(uuid,uuid) to authenticated;
create policy talent_owner_select on public.talent_preferences for select to authenticated
 using(app_private.can_read_own_talent(organization_id,talent_id));
-- No INSERT/UPDATE/DELETE grants or policies for clients: service use cases implement commands.
-- Private tables: RLS on + no client grants, defense in depth. Backend privilege review still required.
alter table app_private.organizations enable row level security;
alter table app_private.app_users enable row level security;
alter table app_private.memberships enable row level security;
alter table app_private.talent_accounts enable row level security;
alter table app_private.auth_session_registry enable row level security;
alter table app_private.audit_events enable row level security;
alter table app_private.outbox_events enable row level security;
revoke all on all tables in schema app_private from public,anon,authenticated;
-- No grants to service_role/custom worker here: allocate explicit least-privilege grants after review.
-- Do not expose app_private in Data API schemas. Implement provisioning/commands separately.
commit;
