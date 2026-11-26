import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { createDatabase } from '../infra/database/client.ts'
import { loadEnv } from '../config/env.ts'
import { createApp } from '../http/app.ts'
import { controlServices, type AppDeps } from '../container.ts'
import { AppError } from '../core/errors.ts'
import { sha256 } from '../core/hash.ts'
import type { AuthService } from '../modules/auth/service.ts'
import type { ManagerActor } from './actor.ts'

// Business Control Plane on a real disposable Postgres (all migrations). App uses TEST_DATABASE_URL (runtime role → grants
// are tested); fixtures that the runtime may not write use TEST_OWNER_DATABASE_URL. Covers IMPLEMENTATION_PLAN.md P1:
// AIC-T03, T04, T09, T11, T18 and the HTTP rules of API_DESIGN.md §3.
const url = process.env.TEST_DATABASE_URL, ownerUrl = process.env.TEST_OWNER_DATABASE_URL
// Two different logins are required: with the owner as runtime the ACL checks would prove nothing (AI_RUNTIME_DESIGN.md §9).
const local = !!url && !!ownerUrl && url !== ownerUrl && [url, ownerUrl].every(u => ['localhost', '127.0.0.1'].includes(new URL(u).hostname))
const ORIGIN = 'http://control.test'

test('control plane: proposals, synchronous confirm, idempotency, CAS, ACL', { skip: !local && 'needs local TEST_DATABASE_URL (runtime login) + TEST_OWNER_DATABASE_URL' }, async t => {
  const db = createDatabase(url!), owner = createDatabase(ownerUrl!)
  const [role] = await db.$queryRaw<Array<{ elevated: boolean }>>`SELECT rolsuper OR rolbypassrls AS elevated FROM pg_roles WHERE rolname=current_user`
  if (role.elevated) { t.skip('runtime login is elevated: ACL would not be tested'); await db.$disconnect(); await owner.$disconnect(); return }
  const env = loadEnv({ DATABASE_URL: url, NODE_ENV: 'test', CORS_ORIGINS: ORIGIN, ENABLE_AUTH_DEMO: 'true', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'x',
    ENABLE_AGENT_CORE: 'true', AGENT_APPROVAL_TTL_SECONDS: '600' })
  const control = controlServices(env, db), { proposals } = control
  const tokens = new Map<string, { userId: string; aal: 'aal1' | 'aal2' }>()
  const auth = { authenticate: async (token: string) => { const id = tokens.get(token); if (!id) throw new AppError('AUTH_REQUIRED', 401); return { ...id, sessionId: 's', email: 'e', factors: [] } } } as unknown as AuthService
  const app = createApp({ env, db, auth, pwa: {} as NonNullable<AppDeps['pwa']>, control })
  const call = async (token: string, method: string, path: string, body?: unknown) => {
    const r = await app.request(path, { method, headers: { Authorization: `Bearer ${token}`, Origin: ORIGIN, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined })
    return { status: r.status, body: await r.json() as any }
  }
  const login = async (kind: 'manager' | 'talent') => {
    const id = randomUUID()
    await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${id}::uuid)`
    await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${id}::uuid,${kind})`
    return id
  }
  const mgr = await login('manager'), mgr2 = await login('manager')
  const [m] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${mgr}::uuid) RETURNING id::text`
  const [m2] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${mgr2}::uuid) RETURNING id::text`
  const tu = await login('talent'), tag = randomUUID().slice(0, 6)
  const [ap] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES(${'Momo' + tag},${tu + '@example.test'},'2000-01-01','approved',${m.id}::uuid,now()) RETURNING id::text`
  const [tal] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status)
    VALUES(${tu}::uuid,'talent',${'Momo' + tag},'2000-01-01','in_use',${ap.id}::uuid,'approved') RETURNING id::text`
  tokens.set('mgr', { userId: mgr, aal: 'aal2' }); tokens.set('mgr-aal1', { userId: mgr, aal: 'aal1' }); tokens.set('mgr2', { userId: mgr2, aal: 'aal2' }); tokens.set('talent', { userId: tu, aal: 'aal2' })
  const A: ManagerActor = { kind: 'manager', userId: mgr, managerId: m.id }, B: ManagerActor = { kind: 'manager', userId: mgr2, managerId: m2.id }
  const P = '/api/v1/admin/proposals'
  const profile = (actor: ManagerActor, base: string, patch: Record<string, string>, key = randomUUID()) =>
    proposals.prepare(actor, 'manager_ui', 'talent_profile.update', { talentId: tal.id, expectedVersion: base, patch }, { idempotencyKey: sha256(key) })
  const confirm = (token: string, id: string, proposalHash: string, requestKey = randomUUID()) => call(token, 'POST', `${P}/${id}/confirm`, { requestKey, proposalHash })
  const count = async (what: 'commands' | 'outbox', id: string) => what === 'commands'
    ? Number((await db.$queryRaw<Array<{ n: bigint }>>`SELECT count(*) n FROM app_private.business_commands WHERE proposal_id=${id}::uuid`)[0].n)
    : Number((await db.$queryRaw<Array<{ n: bigint }>>`SELECT count(*) n FROM app_private.outbox_events e JOIN app_private.domain_operations o ON o.id=e.operation_id WHERE o.talent_id=${tal.id}::uuid AND e.event_type='talent_profile.export'`)[0].n)
  const profileVersion = async () => (await db.$queryRaw<Array<{ version: bigint }>>`SELECT version FROM app_private.talent_profiles WHERE talent_id=${tal.id}::uuid`)[0]?.version
  const rejects = async (p: Promise<unknown>, code: string) => { await assert.rejects(p, (e: unknown) => e instanceof AppError && e.code === code) }

  await t.test('prepare: same key → same proposal; same key, other content → REQUEST_KEY_REUSED; no business write', async () => {
    const key = randomUUID()
    const p1 = await profile(A, '0', { profile: 'ダンスが得意' }, key), p2 = await profile(A, '0', { profile: 'ダンスが得意' }, key)
    assert.equal(p1.proposalId, p2.proposalId)
    await rejects(profile(A, '0', { profile: '別の内容' }, key), 'REQUEST_KEY_REUSED')
    assert.equal(await profileVersion(), undefined)
    await rejects(profile(A, '5', { profile: 'x' }), 'VERSION_CONFLICT')
    await rejects(proposals.prepare(A, 'manager_ui', 'ai_instruction.write', { scope: { kind: 'category', id: randomUUID() }, situation: 'post_writing', expectedVersion: '0', change: { kind: 'write', text: 'x', enabled: true } }, { idempotencyKey: sha256(randomUUID()) }), 'FEATURE_NOT_READY')
    const talentActor = { kind: 'talent' as const, userId: tu, talentId: tal.id, status: 'in_use' }
    await rejects(proposals.prepare(talentActor, 'talent', 'talent_profile.update', { talentId: tal.id, expectedVersion: '0', patch: { profile: 'x' } }, { idempotencyKey: sha256(randomUUID()) }), 'ACTION_NOT_ALLOWED')
  })

  const p = await profile(A, '0', { profile: 'ダンスが得意な高校生', tone: 'やさしく' })
  await t.test('read: owner only, aal2 Manager only (AIC-T03)', async () => {
    const v = await call('mgr', 'GET', `${P}/${p.proposalId}`)
    assert.equal(v.status, 200); assert.equal(v.body.state, 'prepared'); assert.deepEqual(v.body.allowedActions, ['confirm', 'reject']); assert.equal(v.body.changes.length, 2)
    assert.equal((await call('mgr2', 'GET', `${P}/${p.proposalId}`)).status, 404)
    assert.equal((await call('mgr-aal1', 'GET', `${P}/${p.proposalId}`)).body.error.code, 'MFA_REQUIRED')
    assert.equal((await call('talent', 'GET', `${P}/${p.proposalId}`)).body.error.code, 'MANAGER_REQUIRED')
    assert.equal((await call('mgr', 'GET', `${P}?state=prepared`)).body.items.some((x: any) => x.proposalId === p.proposalId), true)
  })

  await t.test('confirm: hash mismatch writes nothing; other Manager cannot confirm', async () => {
    const r = await confirm('mgr', p.proposalId, 'f'.repeat(64))
    assert.equal(r.status, 409); assert.equal(r.body.error.code, 'PROPOSAL_HASH_MISMATCH')
    assert.equal((await confirm('mgr2', p.proposalId, p.proposalHash)).status, 404)
    assert.equal(await count('commands', p.proposalId), 0); assert.equal(await profileVersion(), undefined)
  })

  const key = randomUUID()
  await t.test('confirm = the command, in one transaction (receipt + version + audit + outbox)', async () => {
    const r = await confirm('mgr', p.proposalId, p.proposalHash, key)
    assert.equal(r.status, 200); assert.equal(r.body.proposal.state, 'consumed'); assert.equal(r.body.receipt.resultVersion, '1'); assert.equal(r.body.receipt.changed, true)
    assert.equal(await profileVersion(), 1n); assert.equal(await count('commands', p.proposalId), 1); assert.equal(await count('outbox', p.proposalId), 1)
    const [log] = await db.$queryRaw<Array<{ action: string; actor_manager_id: string }>>`SELECT action,actor_manager_id::text FROM public.activity_logs WHERE details->>'proposalId'=${p.proposalId}`
    assert.equal(log.action, 'control.talent_profile.update'); assert.equal(log.actor_manager_id, m.id)
  })

  await t.test('idempotency (AIC-T18): same key replays the stored response; other payload → 409; new key → same receipt', async () => {
    const replay = await confirm('mgr', p.proposalId, p.proposalHash, key)
    const [c] = await db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM app_private.business_commands WHERE proposal_id=${p.proposalId}::uuid`
    assert.equal(replay.status, 200); assert.equal(replay.body.receipt.commandId, c.id)
    assert.equal((await confirm('mgr', p.proposalId, 'a'.repeat(64), key)).body.error.code, 'REQUEST_KEY_REUSED')
    const again = await confirm('mgr', p.proposalId, p.proposalHash)
    assert.equal(again.status, 200); assert.equal(again.body.receipt.commandId, c.id)
    assert.equal(await count('commands', p.proposalId), 1)
  })

  await t.test('CAS (AIC-T04): two proposals on the same version → one saves, the other is conflicted', async () => {
    const x = await profile(A, '1', { futureGoal: 'TikTok 1万人' }), y = await profile(A, '1', { futureGoal: 'YouTube 1万人' })
    assert.equal((await confirm('mgr', x.proposalId, x.proposalHash)).status, 200)
    const r = await confirm('mgr', y.proposalId, y.proposalHash)
    assert.equal(r.status, 409); assert.equal(r.body.error.code, 'VERSION_CONFLICT')
    assert.equal((await call('mgr', 'GET', `${P}/${y.proposalId}`)).body.state, 'conflicted')
    assert.equal(await profileVersion(), 2n); assert.equal(await count('commands', y.proposalId), 0)
  })

  await t.test('concurrent confirms with different keys (AIC-T09) → exactly one command', async () => {
    const z = await profile(A, '2', { direction: 'ダンス動画中心' })
    const [r1, r2] = await Promise.all([confirm('mgr', z.proposalId, z.proposalHash), confirm('mgr', z.proposalId, z.proposalHash)])
    assert.deepEqual([r1.status, r2.status], [200, 200]); assert.equal(r1.body.receipt.commandId, r2.body.receipt.commandId)
    assert.equal(await count('commands', z.proposalId), 1); assert.equal(await profileVersion(), 3n)
  })

  await t.test('expiry: 410 on confirm, reconciler marks it expired', async () => {
    const e = await profile(A, '3', { hobbiesSkills: '写真' })
    await owner.$executeRaw`UPDATE app_private.business_proposals SET expires_at=now()-interval '1 second',version=version+1 WHERE id=${e.proposalId}::uuid`
    const r = await confirm('mgr', e.proposalId, e.proposalHash)
    assert.equal(r.status, 410); assert.equal(r.body.error.code, 'PROPOSAL_EXPIRED')
    assert.ok(await proposals.expireDue() >= 1)
    assert.equal((await call('mgr', 'GET', `${P}/${e.proposalId}`)).body.state, 'expired'); assert.equal(await profileVersion(), 3n)
  })

  await t.test('reject: no write; a rejected proposal cannot be confirmed', async () => {
    const j = await profile(A, '3', { hobbiesSkills: '料理' })
    const r = await call('mgr', 'POST', `${P}/${j.proposalId}/reject`, { requestKey: randomUUID(), reason: '内容が違う' })
    assert.equal(r.status, 200); assert.equal(r.body.proposal.state, 'rejected')
    assert.equal((await confirm('mgr', j.proposalId, j.proposalHash)).body.error.code, 'PROPOSAL_NOT_PENDING')
    assert.equal(await profileVersion(), 3n)
  })

  await t.test('AI instruction: write → disable → restore keeps an append-only history', async () => {
    const ins = (base: string, change: any) => proposals.prepare(A, 'manager_ui', 'ai_instruction.write', { scope: { kind: 'talent', id: tal.id }, situation: 'post_writing', expectedVersion: base, change }, { idempotencyKey: sha256(randomUUID()) })
    const w = await ins('0', { kind: 'write', text: '絵文字は1つまで', enabled: true })
    assert.equal((await confirm('mgr', w.proposalId, w.proposalHash)).body.receipt.resultVersion, '1')
    const d = await ins('1', { kind: 'set_enabled', enabled: false })
    assert.equal((await confirm('mgr', d.proposalId, d.proposalHash)).body.receipt.resultVersion, '2')
    const back = await ins('2', { kind: 'restore', version: '1' })
    assert.equal((await confirm('mgr', back.proposalId, back.proposalHash)).body.receipt.resultVersion, '3')
    const h = await db.$queryRaw<Array<{ version: bigint; enabled: boolean }>>`SELECT v.version,v.enabled FROM app_private.ai_instruction_versions v JOIN app_private.ai_instructions i ON i.id=v.instruction_id WHERE i.talent_id=${tal.id}::uuid ORDER BY v.version`
    assert.deepEqual(h.map(x => [x.version, x.enabled]), [[1n, true], [2n, false], [3n, true]])
    await rejects(ins('3', { kind: 'write', text: '絵文字は1つまで', enabled: true }), 'NO_CHANGE')
  })

  await t.test('a disabled Manager cannot confirm (re-checked inside the transaction)', async () => {
    const q = await profile(B, '3', { tone: '元気に' })
    await owner.$executeRaw`UPDATE public.managers SET is_active=false,deactivated_at=now() WHERE id=${m2.id}::uuid`
    const r = await confirm('mgr2', q.proposalId, q.proposalHash)
    assert.equal(r.status, 403); assert.ok(['ACTOR_DISABLED', 'MANAGER_REQUIRED'].includes(r.body.error.code))
    await rejects(proposals.confirm(B, 'manager_ui', q.proposalId, { requestKey: randomUUID(), proposalHash: q.proposalHash }), 'ACTOR_DISABLED')
    await owner.$executeRaw`UPDATE public.managers SET is_active=true,deactivated_at=NULL WHERE id=${m2.id}::uuid`
    assert.equal(await count('commands', q.proposalId), 0)
  })

  await t.test('ACL: runtime cannot rewrite commands or proposal content, nor remove rows', async () => {
    const denied = async (q: Promise<unknown>) => assert.rejects(q, /permission denied/)
    await denied(db.$executeRaw`UPDATE app_private.business_commands SET changed=false`)
    await denied(db.$executeRaw`UPDATE app_private.business_proposals SET patch='{}'::jsonb`)
    await denied(db.$executeRawUnsafe('DEL' + 'ETE FROM app_private.business_proposals'))
    await denied(db.$executeRawUnsafe('DEL' + 'ETE FROM app_private.idempotency_requests'))
  })

  await db.$disconnect(); await owner.$disconnect()
})
