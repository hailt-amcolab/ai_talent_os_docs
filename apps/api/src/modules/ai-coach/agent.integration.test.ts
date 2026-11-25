import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { APICallError } from 'ai'
import { createDatabase } from '../../infra/database/client.ts'
import { loadEnv } from '../../config/env.ts'
import { createApp } from '../../http/app.ts'
import { agentServices, type AppDeps } from '../../container.ts'
import { AppError } from '../../core/errors.ts'
import type { AuthService } from '../auth/service.ts'
import { runEvent, type RunnerDeps } from './runner.ts'
import { runEffects } from './effects.ts'
import { toolsFor } from './tools.ts'
import type { ModelGateway, StepIn, StepOut } from './model.ts'
import type { RunStore, RunView } from './store.ts'

// End-to-end on a real disposable Postgres (all migrations, runtime role): HTTP API (app.request) → outbox → worker loop
// (scripted fake model, the real executor/services) → DB → OneDrive export effect (fake exporter). No Redis: drain() plays the
// dispatcher + BullMQ hand-off. Covers report §13 AIC-T01–T09, T11–T13 at the level this code can prove.
// App + worker use TEST_DATABASE_URL (runtime role, so grants are tested); fixtures use TEST_OWNER_DATABASE_URL (auth.users stub).
const url = process.env.TEST_DATABASE_URL, ownerUrl = process.env.TEST_OWNER_DATABASE_URL ?? url
const local = url && ['localhost', '127.0.0.1'].includes(new URL(url).hostname)
const ORIGIN = 'http://agent.test'

test('agent core end-to-end: Manager M-17 + Talent chat, permissions, confirmation, recovery', { skip: !local }, async t => {
  const db = createDatabase(url!), owner = createDatabase(ownerUrl!)
  const env = loadEnv({ DATABASE_URL: url, NODE_ENV: 'test', CORS_ORIGINS: ORIGIN, ENABLE_AUTH_DEMO: 'true', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'x',
    ENABLE_AGENT_CORE: 'true', ENABLE_AGENT_WRITES: 'true', AGENT_APPROVAL_TTL_SECONDS: '600' })
  const services = agentServices(env, db)
  // Fake Auth: token → verified identity. aal decides the Manager MFA gate.
  const tokens = new Map<string, { userId: string; aal: 'aal1' | 'aal2' }>()
  const auth = { authenticate: async (token: string) => { const id = tokens.get(token); if (!id) throw new AppError('AUTH_REQUIRED', 401); return { ...id, sessionId: 's', email: 'e', factors: [] } } } as unknown as AuthService
  const app = createApp({ env, db, auth, pwa: {} as NonNullable<AppDeps['pwa']>, agent: services })
  const call = async (token: string, method: string, path: string, body?: unknown) => {
    const r = await app.request(path, { method, headers: { Authorization: `Bearer ${token}`, Origin: ORIGIN, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined })
    return { status: r.status, body: await r.json() as any }
  }

  // ---- Scripted model: each step sees the real continuation (system + messages + tools) and returns tool calls or text.
  type Script = (i: StepIn) => StepOut | Promise<StepOut>
  const queue: Script[] = [], seen: StepIn[] = []
  const gateway: ModelGateway = { provider: 'fake', model: 'scripted', async step(i) { seen.push(i); const s = queue.shift(); if (!s) throw new Error('no scripted step left'); return s(i) } }
  const calls = (...cs: Array<{ name: string; input: unknown }>): StepOut => {
    const toolCalls = cs.map((c, n) => ({ id: `call_${randomUUID().slice(0, 8)}_${n}`, name: c.name, input: c.input }))
    return { messages: [{ role: 'assistant', content: toolCalls.map(c => ({ type: 'tool-call' as const, toolCallId: c.id, toolName: c.name, input: c.input })) }], text: '', toolCalls, finishReason: 'tool-calls', inputTokens: 100, outputTokens: 20 }
  }
  const say = (text: string): StepOut => ({ messages: [{ role: 'assistant', content: [{ type: 'text', text }] }], text, toolCalls: [], finishReason: 'stop', inputTokens: 120, outputTokens: 30 })
  // Result of the latest tool call with that name, as the model reads it.
  const resultOf = (i: StepIn, name: string): any => i.messages.filter(m => m.role === 'tool').flatMap(m => m.content as any[]).filter(p => p.toolName === name).at(-1)?.output.value
  const deps: RunnerDeps = { db, store: services.store, changes: services.changes, gateway,
    cfg: { maxModelSteps: 8, maxToolCalls: 16, computeMs: 60_000, modelTimeoutMs: 10_000, maxOutputTokens: 4000, heartbeatMs: 60_000, writesEnabled: true, price: { inputPerMTok: 1, outputPerMTok: 2, currency: 'USD' } } }
  // Dispatcher + Redis hand-off + worker, until nothing is due.
  const drain = async (d: RunnerDeps = deps) => {
    for (let i = 0; i < 20; i++) {
      const due = await services.store.leaseDue(10)
      if (!due.length) return
      for (const e of due) { await services.store.releaseDispatch(e.eventId, e.token, 'enqueued'); await runEvent(d, e.eventId) }
      await db.$executeRaw`UPDATE app_private.outbox_events SET next_dispatch_at=now() WHERE state='pending' AND event_type='agent.run.wake'`
    }
  }

  // ---- Fixtures (same rows as tools/ai-talent.ts): 2 Managers, Talents A (with a OneDrive folder) and B.
  const login = async (kind: 'manager' | 'talent') => {
    const id = randomUUID()
    await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${id}::uuid)`
    await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${id}::uuid,${kind})`
    return id
  }
  const mgr = await login('manager'), mgr2 = await login('manager')
  const [m] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${mgr}::uuid) RETURNING id::text`
  await db.$executeRaw`INSERT INTO public.managers(auth_user_id) VALUES(${mgr2}::uuid)`
  const tag = randomUUID().slice(0, 6)
  const talent = async (name: string, folder: string | null) => {
    const u = await login('talent')
    const [a] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES(${name},${u + '@example.test'},'2000-01-01','approved',${m.id}::uuid,now()) RETURNING id::text`
    const [r] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status,onedrive_folder_id)
      VALUES(${u}::uuid,'talent',${name},'2000-01-01','in_use',${a.id}::uuid,'approved',${folder}) RETURNING id::text`
    return { userId: u, talentId: r.id }
  }
  const A = await talent(`Momo${tag}`, `folder-${tag}`), B = await talent(`Hana${tag}`, null)
  tokens.set('mgr', { userId: mgr, aal: 'aal2' }); tokens.set('mgr-aal1', { userId: mgr, aal: 'aal1' }); tokens.set('mgr2', { userId: mgr2, aal: 'aal2' })
  tokens.set('A', { userId: A.userId, aal: 'aal1' }); tokens.set('A-aal2', { userId: A.userId, aal: 'aal2' }); tokens.set('B', { userId: B.userId, aal: 'aal1' })
  const profileOf = async (id: string) => (await db.$queryRaw<Array<{ version: bigint; profile: any }>>`SELECT version,profile FROM app_private.agent_talent_profiles WHERE talent_id=${id}::uuid`)[0]
  const newConversation = async (token: string, base: string) => (await call(token, 'POST', `${base}/conversations`, { requestKey: randomUUID() })).body.conversationId as string
  const send = (token: string, base: string, conv: string, text: string) => call(token, 'POST', `${base}/conversations/${conv}/messages`, { requestKey: randomUUID(), body: text })
  const run = async (token: string, base: string, id: string) => (await call(token, 'GET', `${base}/runs/${id}`)).body as RunView
  const lastEntry = async (token: string, base: string, conv: string) => (await call(token, 'GET', `${base}/conversations/${conv}/messages?limit=100`)).body.items.at(-1)
  const ADMIN = '/api/v1/admin/agent', ME = '/api/v1/me/agent'
  const mgrActor = { kind: 'manager' as const, userId: mgr, managerId: m.id }

  let mConv = '', proposalId = '', proposalHash = '', commandId = ''
  try {
    await t.test('M-17: conversation is idempotent; MFA and role are enforced by route', async () => {
      const key = randomUUID()
      const c1 = await call('mgr', 'POST', `${ADMIN}/conversations`, { requestKey: key }), c2 = await call('mgr', 'POST', `${ADMIN}/conversations`, { requestKey: key })
      assert.equal(c1.status, 201); assert.equal(c2.status, 200); assert.equal(c2.body.conversationId, c1.body.conversationId)
      mConv = c1.body.conversationId
      assert.equal((await call('mgr-aal1', 'POST', `${ADMIN}/conversations`, { requestKey: randomUUID() })).body.error.code, 'MFA_REQUIRED')
      assert.equal((await call('A', 'POST', `${ADMIN}/conversations`, { requestKey: randomUUID() })).body.error.code, 'MFA_REQUIRED')
      assert.equal((await call('A-aal2', 'POST', `${ADMIN}/conversations`, { requestKey: randomUUID() })).body.error.code, 'MANAGER_REQUIRED')
      assert.equal((await call('mgr', 'POST', `${ME}/conversations`, { requestKey: randomUUID() })).body.error.code, 'TALENT_REQUIRED')
      assert.equal((await call('nobody', 'GET', `${ADMIN}/runs/${randomUUID()}`)).status, 401)
    })

    await t.test('AIC-T01: same key+body → same run; same key other body → 409; busy conversation → 409 without orphan entry', async () => {
      const conv = await newConversation('mgr', ADMIN), key = randomUUID()
      const [r1, r2] = await Promise.all([1, 2].map(() => call('mgr', 'POST', `${ADMIN}/conversations/${conv}/messages`, { requestKey: key, body: 'こんにちは' })))
      assert.deepEqual([r1.status, r2.status], [202, 202]); assert.equal(r1.body.id, r2.body.id)
      assert.equal((await call('mgr', 'POST', `${ADMIN}/conversations/${conv}/messages`, { requestKey: key, body: '別の内容' })).body.error.code, 'REQUEST_KEY_REUSED')
      assert.equal((await send('mgr', ADMIN, conv, '二通目')).body.error.code, 'RUN_BUSY')
      const [{ n }] = await db.$queryRaw<Array<{ n: number }>>`SELECT count(*)::int AS n FROM app_private.agent_entries WHERE conversation_id=${conv}::uuid`
      assert.equal(n, 1)
      assert.equal((await call('mgr', 'POST', `${ADMIN}/runs/${r1.body.id}/cancel`, { requestKey: randomUUID() })).body.state, 'cancelled')
    })

    await t.test('§2.3 Manager: read → prepare → WAIT (no mutation, no lease) → proposal view', async () => {
      const r = await send('mgr', ADMIN, mConv, `Momo${tag} のプロフィールを「ダンスと写真が好き」、口調を「明るく短く」にして`)
      assert.equal(r.status, 202); assert.equal(r.body.state, 'pending')
      queue.push(
        () => calls({ name: 'talent_search', input: { query: `Momo${tag}` } }),
        i => calls({ name: 'context_read', input: { talentId: resultOf(i, 'talent_search').data.items[0].talentId, sections: ['profile'] } }),
        i => { const c = resultOf(i, 'context_read').data; return calls({ name: 'profile_prepare', input: { talentId: c.talent.talentId, expectedVersion: c.profile.version, patch: { profile: 'ダンスと写真が好き', tone: '明るく短く' } } }) },
      )
      await drain()
      assert.deepEqual(seen.at(-1)!.tools.map(x => x.name).sort(), ['change_commit', 'context_read', 'instruction_history', 'instruction_prepare', 'profile_prepare', 'talent_search'])
      const v = await run('mgr', ADMIN, r.body.id)
      assert.equal(v.state, 'waiting_confirmation'); assert.ok(v.proposalId)
      proposalId = v.proposalId!
      assert.equal(await profileOf(A.talentId), undefined) // nothing written before confirmation
      const [ex] = await db.$queryRaw<Array<{ lease_token: string | null; phase: string; ev: string }>>`
        SELECT e.lease_token::text,a.phase,o.state AS ev FROM app_private.ai_executions e JOIN app_private.ai_execution_attempts a ON a.execution_id=e.id AND a.attempt_no=e.attempt_no
        JOIN app_private.outbox_events o ON o.id=e.event_id WHERE e.id=${r.body.id}::uuid`
      assert.deepEqual(ex, { lease_token: null, phase: 'waiting', ev: 'done' }) // no lease/worker slot held while a person decides
      const p = await call('mgr', 'GET', `${ADMIN}/proposals/${proposalId}`)
      assert.equal(p.status, 200); assert.equal(p.body.targetLabel, `Momo${tag} / プロフィール`)
      assert.deepEqual(p.body.changes.map((c: any) => [c.field, c.before, c.after]), [['プロフィール', null, 'ダンスと写真が好き'], ['口調・話し方', null, '明るく短く']])
      assert.deepEqual(p.body.allowedActions, ['confirm', 'reject'])
      proposalHash = p.body.proposalHash
    })

    await t.test('AIC-T03: approval is bound to actor + hash; commit before confirm is refused', async () => {
      assert.equal((await call('mgr2', 'GET', `${ADMIN}/proposals/${proposalId}`)).status, 404) // another Manager: not found (no probing)
      assert.equal((await call('mgr2', 'POST', `${ADMIN}/proposals/${proposalId}/confirm`, { requestKey: randomUUID(), proposalHash })).status, 404)
      assert.equal((await call('A', 'POST', `${ADMIN}/proposals/${proposalId}/confirm`, { requestKey: randomUUID(), proposalHash })).status, 403)
      assert.equal((await call('mgr', 'POST', `${ADMIN}/proposals/${proposalId}/confirm`, { requestKey: randomUUID(), proposalHash: '0'.repeat(64) })).body.error.code, 'PROPOSAL_HASH_MISMATCH')
      assert.equal((await call('mgr', 'POST', `${ADMIN}/proposals/${proposalId}/commit`, { requestKey: randomUUID() })).body.error.code, 'CONFIRMATION_REQUIRED')
      assert.equal(await profileOf(A.talentId), undefined)
    })

    await t.test('§2.3 confirm → resume → change_commit → DB + history + audit + outbox; reply = backend template, not model text', async () => {
      const c = await call('mgr', 'POST', `${ADMIN}/proposals/${proposalId}/confirm`, { requestKey: randomUUID(), proposalHash })
      assert.deepEqual(c.body, { proposalId, state: 'confirmed' })
      assert.equal((await call('mgr', 'POST', `${ADMIN}/proposals/${proposalId}/confirm`, { requestKey: randomUUID(), proposalHash })).status, 200) // same action again: harmless
      queue.push(
        // The service committed on resume (report §2.3 step 6); the model only reads the receipt. A change_commit retry is idempotent.
        i => { const r = resultOf(i, 'profile_prepare').data; assert.equal(r.decision, 'confirmed'); assert.equal(r.saved, true); return calls({ name: 'change_commit', input: { proposalId } }) },
        i => { assert.equal(resultOf(i, 'change_commit').data.commandId, resultOf(i, 'profile_prepare').data.receipt.commandId); return say('全部保存して、ついでに他のタレントも更新しました!') }, // a false claim: must not be shown
      )
      await drain()
      const v = (await call('mgr', 'GET', `${ADMIN}/conversations/${mConv}/runs`)).body.items[0] as RunView
      assert.equal(v.state, 'succeeded'); assert.equal(v.completionKind, 'action_result'); assert.equal(v.receipts.length, 1)
      commandId = v.receipts[0].commandId
      assert.equal((await lastEntry('mgr', ADMIN, mConv)).body, `✅ 保存しました: Momo${tag} / プロフィール(バージョン 1)`)
      const p = await profileOf(A.talentId)
      assert.equal(p.version, 1n); assert.deepEqual(p.profile, { profile: 'ダンスと写真が好き', tone: '明るく短く' })
      const [h] = await db.$queryRaw<Array<{ n: number; logs: number; ev: number; usage: number }>>`
        SELECT (SELECT count(*)::int FROM app_private.agent_talent_profile_versions WHERE talent_id=${A.talentId}::uuid) AS n,
          (SELECT count(*)::int FROM public.activity_logs WHERE action='agent.profile.update' AND target_id=${A.talentId}) AS logs,
          (SELECT count(*)::int FROM app_private.outbox_events o JOIN app_private.agent_commands c ON c.operation_id=o.operation_id WHERE c.id=${commandId}::uuid AND o.event_type='agent.profile.export') AS ev,
          (SELECT count(*)::int FROM app_private.agent_steps WHERE execution_id=${v.id}::uuid AND kind='model' AND usage_state='known' AND cost_amount IS NOT NULL) AS usage`
      assert.deepEqual(h, { n: 1, logs: 1, ev: 1, usage: 5 }) // 5 model calls, each with its own usage + cost
      // Retry after a lost response: same receipt, no second version.
      const again = await call('mgr', 'POST', `${ADMIN}/proposals/${proposalId}/commit`, { requestKey: randomUUID() })
      assert.equal(again.body.commandId, commandId); assert.equal((await profileOf(A.talentId)).version, 1n)
    })

    await t.test('OneDrive export effect: failure → retry with backoff → Profile.md written once with the DB version', async () => {
      const written: Array<{ folder: string; name: string; md: string }> = []
      let fail = true
      const exporter = async (folder: string, name: string, md: string) => { if (fail) { fail = false; throw new Error('graph 503') } written.push({ folder, name, md }); return 'item-' + tag }
      assert.ok(((await runEffects(services.store, exporter)).retry ?? 0) >= 1) // other leftover events of the shared disposable DB may be due too
      const [ev] = await db.$queryRaw<Array<{ state: string; code: string; later: boolean }>>`
        SELECT o.state,o.last_error_code AS code,o.available_at>now() AS later FROM app_private.outbox_events o JOIN app_private.agent_commands c ON c.operation_id=o.operation_id WHERE c.id=${commandId}::uuid AND o.event_type='agent.profile.export'`
      assert.deepEqual(ev, { state: 'pending', code: 'ONEDRIVE_EXPORT_FAILED', later: true })
      await db.$executeRaw`UPDATE app_private.outbox_events SET available_at=now() WHERE event_type='agent.profile.export' AND state='pending'`
      assert.equal((await runEffects(services.store, exporter)).exported, 1)
      assert.equal(written.length, 1); assert.equal(written[0].folder, `folder-${tag}`); assert.equal(written[0].name, 'Profile.md')
      assert.match(written[0].md, /## プロフィール\nダンスと写真が好き/); assert.match(written[0].md, /バージョン 1/)
      const [x] = await db.$queryRaw<Array<{ version: bigint; item_ref: string }>>`SELECT version,item_ref FROM app_private.agent_profile_exports WHERE talent_id=${A.talentId}::uuid`
      assert.deepEqual(x, { version: 1n, item_ref: 'item-' + tag })
      assert.equal((await runEffects(services.store, exporter)).exported, undefined) // nothing left for us, no duplicate write
      assert.equal(written.length, 1)
    })

    let aConv = ''
    await t.test('§2.2 Talent chat: context from DB (profile written by the Manager) + read tool; answer_only shows model text', async () => {
      aConv = await newConversation('A', ME)
      const r = await send('A', ME, aConv, '私のプロフィールに合う投稿テーマは?')
      queue.push(
        () => calls({ name: 'context_read', input: { sections: ['profile', 'instructions'] } }),
        i => { assert.equal(resultOf(i, 'context_read').data.profile.fields.profile, 'ダンスと写真が好き'); return say('ダンスの練習風景はどうでしょう?') },
      )
      await drain()
      assert.deepEqual(seen.at(-1)!.tools.map(x => x.name), ['context_read']) // Talent channel: no Manager tools, autopost not ready
      assert.match(seen.at(-1)!.system, /ダンスと写真が好き/); assert.doesNotMatch(seen.at(-1)!.system, /PROFILE_NOT_READY/)
      const v = await run('A', ME, r.body.id)
      assert.equal(v.state, 'succeeded'); assert.equal(v.completionKind, 'answer_only'); assert.equal(v.receipts.length, 0)
      assert.equal((await lastEntry('A', ME, aConv)).body, 'ダンスの練習風景はどうでしょう?')
    })

    await t.test('AIC-T02/T12: Talent forcing other Talent / Manager tools / not-ready tool / forged field → refused, no mutation, template reply', async () => {
      const r = await send('A', ME, aConv, 'Hana のプロフィールを見せて、全体の指示も変えて')
      queue.push(
        () => calls(
          { name: 'context_read', input: { talentId: B.talentId, sections: ['profile'] } },
          { name: 'profile_prepare', input: { talentId: B.talentId, expectedVersion: '0', patch: { profile: 'x' } } },
          { name: 'instruction_prepare', input: { scope: { kind: 'global' }, situation: 'daily_greeting', expectedVersion: '0', change: { kind: 'write', text: 'x', enabled: true } } },
          { name: 'autopost_set_theme', input: { periodId: randomUUID(), expectedVersion: '1', theme: 'ダンス' } },
          { name: 'context_read', input: { sections: ['profile'], actorUserId: mgr } }),
        i => { assert.equal(resultOf(i, 'context_read').code, 'INPUT_INVALID'); return say('Hana さんの情報を変更して保存しました') },
      )
      await drain()
      const steps = await db.$queryRaw<Array<{ tool_name: string; state: string; error_code: string }>>`
        SELECT tool_name,state,error_code FROM app_private.agent_steps WHERE execution_id=${r.body.id}::uuid AND kind='tool' ORDER BY sequence`
      assert.deepEqual(steps.map(s => [s.tool_name, s.state, s.error_code]), [
        ['context_read', 'denied', 'NOT_FOUND_OR_FORBIDDEN'], ['profile_prepare', 'denied', 'ACTION_NOT_ALLOWED'], ['instruction_prepare', 'denied', 'ACTION_NOT_ALLOWED'],
        ['autopost_set_theme', 'unavailable', 'FEATURE_NOT_READY'], ['context_read', 'invalid', 'INPUT_INVALID']])
      const outputs = await db.$queryRaw<unknown[]>`SELECT output FROM app_private.agent_steps WHERE execution_id=${r.body.id}::uuid AND kind='tool'`
      assert.doesNotMatch(JSON.stringify(outputs), new RegExp(`Hana${tag}`)) // no leak of the other Talent
      const e = await lastEntry('A', ME, aConv)
      assert.doesNotMatch(e.body, /保存しました/); assert.ok(e.body.includes('⚠ 実行できませんでした: 情報の確認(NOT_FOUND_OR_FORBIDDEN)'))
      assert.equal(await profileOf(B.talentId), undefined)
      const [{ n }] = await db.$queryRaw<Array<{ n: number }>>`SELECT count(*)::int AS n FROM app_private.agent_change_proposals WHERE scope_id=${B.talentId}::uuid`
      assert.equal(n, 0)
      // Cross-actor HTTP reads: a Manager's run is not visible to a Talent, A's conversation not to B.
      const mRun = (await call('mgr', 'GET', `${ADMIN}/conversations/${mConv}/runs`)).body.items[0].id
      assert.equal((await call('A', 'GET', `${ME}/runs/${mRun}`)).status, 404)
      assert.equal((await call('B', 'GET', `${ME}/conversations/${aConv}/messages`)).status, 404)
    })

    await t.test('AIC-T04: two writers on the same base version → one commit, the other VERSION_CONFLICT, one history row', async () => {
      const base = (await services.changes.instructions(null)).find(i => i.scope === 'global' && i.situation === 'conversation_limits')?.version ?? '0'
      const input = (text: string) => ({ type: 'instruction.write' as const, scope: { kind: 'global' as const }, situation: 'conversation_limits' as const, expectedVersion: base, change: { kind: 'write' as const, text, enabled: true } })
      const p1 = await services.changes.prepare(mgrActor, input(`短く答える ${tag}`)), p2 = await services.changes.prepare(mgrActor, input(`丁寧に答える ${tag}`))
      await services.changes.confirm(mgrActor, p1.proposalId, p1.proposalHash); await services.changes.confirm(mgrActor, p2.proposalId, p2.proposalHash)
      const results = await Promise.allSettled([services.changes.commit(mgrActor, p1.proposalId), services.changes.commit(mgrActor, p2.proposalId)])
      assert.equal(results.filter(r => r.status === 'fulfilled').length, 1)
      assert.equal((results.find(r => r.status === 'rejected') as PromiseRejectedResult).reason.code, 'VERSION_CONFLICT')
      const [h] = await db.$queryRaw<Array<{ n: number }>>`SELECT count(*)::int AS n FROM app_private.agent_instruction_versions v JOIN app_private.agent_instructions i ON i.id=v.instruction_id WHERE i.scope_kind='global' AND i.situation='conversation_limits'`
      assert.equal(h.n, Number(base) + 1)
      const states = await db.$queryRaw<Array<{ state: string }>>`SELECT state FROM app_private.agent_change_proposals WHERE id IN (${p1.proposalId}::uuid,${p2.proposalId}::uuid) ORDER BY state`
      assert.deepEqual(states.map(s => s.state), ['conflicted', 'consumed'])
      // The new global instruction reaches the Talent's NEXT run context (DB, no OneDrive needed).
      const conv = await newConversation('A', ME)
      await send('A', ME, conv, 'こんにちは')
      queue.push(() => say('こんにちは'))
      await drain()
      assert.match(seen.at(-1)!.system, /会話の範囲\n(短く|丁寧に)答える/)
    })

    await t.test('reject and expiry wake the run; the template says nothing was saved; cancel while waiting', async () => {
      const ask = async (text: string) => {
        const r = await send('mgr', ADMIN, mConv, text)
        queue.push(() => calls({ name: 'profile_prepare', input: { talentId: A.talentId, expectedVersion: '1', patch: { futureGoal: text } } }))
        await drain()
        return run('mgr', ADMIN, r.body.id)
      }
      let v = await ask('将来の目標をダンサーに')
      assert.equal((await call('mgr', 'POST', `${ADMIN}/proposals/${v.proposalId}/reject`, { requestKey: randomUUID() })).body.state, 'rejected')
      queue.push(i => { assert.equal(resultOf(i, 'profile_prepare').data.decision, 'rejected'); return say('保存しました') })
      await drain()
      assert.match((await lastEntry('mgr', ADMIN, mConv)).body, /⏸ 保存していません: .*マネージャーが保存しませんでした/)

      v = await ask('将来の目標を写真家に')
      const hash = (await call('mgr', 'GET', `${ADMIN}/proposals/${v.proposalId}`)).body.proposalHash
      await db.$executeRaw`UPDATE app_private.agent_change_proposals SET expires_at=now()-interval '1 second',version=version+1 WHERE id=${v.proposalId}::uuid`
      assert.equal((await call('mgr', 'POST', `${ADMIN}/proposals/${v.proposalId}/confirm`, { requestKey: randomUUID(), proposalHash: hash })).status, 410)
      queue.push(i => { assert.equal(resultOf(i, 'profile_prepare').data.decision, 'expired'); return say('期限切れでした') })
      await drain()
      assert.match((await lastEntry('mgr', ADMIN, mConv)).body, /確認の期限が切れました/)

      v = await ask('将来の目標を歌手に')
      assert.equal((await call('mgr', 'POST', `${ADMIN}/runs/${v.id}/cancel`, { requestKey: randomUUID() })).body.state, 'cancelled')
      assert.equal((await call('mgr', 'GET', `${ADMIN}/proposals/${v.proposalId}`)).body.state, 'rejected')
      assert.equal((await profileOf(A.talentId)).version, 1n)
    })

    await t.test('AIC-T05: crash after tool 1 of 2 → resume reuses tool 1, runs tool 2 once, no new model call for that step', async () => {
      const conv = await newConversation('mgr', ADMIN), r = await send('mgr', ADMIN, conv, '2人を探して')
      let inserts = 0
      const crashing = Object.assign(Object.create(Object.getPrototypeOf(services.store)), services.store, {
        toolStep: async (...a: Parameters<RunStore['toolStep']>) => { if (++inserts === 2) throw new Error('process killed'); return services.store.toolStep(...a) } }) as RunStore
      const before = seen.length
      queue.push(() => calls({ name: 'talent_search', input: { query: `Momo${tag}` } }, { name: 'talent_search', input: { query: `Hana${tag}` } }))
      const [due] = await services.store.leaseDue(10)
      await services.store.releaseDispatch(due.eventId, due.token, 'enqueued')
      await assert.rejects(runEvent({ ...deps, store: crashing }, due.eventId), /process killed/)
      // Lease runs out (worker died) → reconciler: no model call in flight → requeue; a new attempt resumes from the ledger.
      await db.$executeRaw`UPDATE app_private.ai_executions SET lease_until=now()-interval '1 second',version=version+1 WHERE id=${r.body.id}::uuid`
      assert.deepEqual(await services.store.reconcile(), { requeued: 1, unknown: 0, dispatch: 0 })
      queue.push(i => { assert.equal(i.messages.filter(x => x.role === 'tool').flatMap(x => x.content as any[]).length, 2); return say('見つかりました') })
      await drain()
      assert.equal(seen.length - before, 2) // step 1 once + final; never re-asked the model for the persisted step
      const [x] = await db.$queryRaw<Array<{ n: number; attempts: number }>>`
        SELECT (SELECT count(*)::int FROM app_private.agent_steps WHERE execution_id=${r.body.id}::uuid AND kind='tool') AS n,(SELECT attempt_no FROM app_private.ai_executions WHERE id=${r.body.id}::uuid) AS attempts`
      assert.deepEqual(x, { n: 2, attempts: 2 })
      assert.equal((await run('mgr', ADMIN, r.body.id)).state, 'succeeded')
    })

    await t.test('AIC-T06/T08: crash while calling the model → unknown (blocks the conversation) → operator retry; stale worker writes nothing', async () => {
      const conv = await newConversation('mgr', ADMIN), r = await send('mgr', ADMIN, conv, 'こんにちは')
      const [due] = await services.store.leaseDue(10)
      await services.store.releaseDispatch(due.eventId, due.token, 'enqueued')
      const c = await services.store.claim(due.eventId)
      if (c === 'nothing') throw new Error('claim failed')
      const stepId = await services.store.beginModelStep(c, 1, 'fake', 'scripted') // HTTP sent, then the process dies
      await db.$executeRaw`UPDATE app_private.ai_executions SET lease_until=now()-interval '1 second',version=version+1 WHERE id=${r.body.id}::uuid`
      assert.equal((await services.store.reconcile()).unknown, 1)
      const v = await run('mgr', ADMIN, r.body.id)
      assert.deepEqual([v.state, v.errorCode], ['unknown', 'LEASE_EXPIRED_AFTER_CALL'])
      assert.equal((await send('mgr', ADMIN, conv, 'まだ?')).body.error.code, 'RUN_BUSY') // never re-called blindly
      // The old worker comes back late: fenced, nothing written.
      assert.equal(await services.store.endModelStep(c, stepId!, { state: 'succeeded', output: say('late') }), false)
      assert.equal(await services.store.finish(c, { kind: 'succeeded', body: 'late', completion: 'answer_only' }), false)
      assert.equal(await services.store.resolveUnknown(r.body.id, 'retry'), 'pending')
      queue.push(() => say('こんにちは!'))
      await drain()
      assert.equal((await run('mgr', ADMIN, r.body.id)).state, 'succeeded')
      const usage = await db.$queryRaw<Array<{ state: string; usage_state: string }>>`SELECT state,usage_state FROM app_private.agent_steps WHERE execution_id=${r.body.id}::uuid ORDER BY sequence`
      assert.deepEqual(usage.map(u => [u.state, u.usage_state]), [['unknown', 'unknown'], ['succeeded', 'known']]) // unknown cost kept, not 0
    })

    await t.test('model HTTP error → failed with a code; dispatcher re-sends a job lost in Redis (AIC-T07)', async () => {
      const conv = await newConversation('A', ME)
      let r = await send('A', ME, conv, 'テスト')
      queue.push(() => { throw new APICallError({ message: 'x', url: 'u', requestBodyValues: {}, statusCode: 500 }) })
      await drain()
      const f = await run('A', ME, r.body.id)
      assert.deepEqual([f.state, f.errorCode], ['failed', 'MODEL_PROVIDER_ERROR'])
      r = await send('A', ME, conv, 'もう一度')
      const [lostJob] = await services.store.leaseDue(10)
      await services.store.releaseDispatch(lostJob.eventId, lostJob.token, 'enqueued') // Redis accepted it, then lost it
      await db.$executeRaw`UPDATE app_private.outbox_events SET next_dispatch_at=now() WHERE id=${lostJob.eventId}::uuid`
      const [again] = await services.store.leaseDue(10)
      assert.equal(again.eventId, lostJob.eventId); assert.equal(again.sequence, lostJob.sequence + 1n)
      await services.store.releaseDispatch(again.eventId, again.token, 'enqueued')
      queue.push(() => say('OK'))
      assert.equal(await runEvent(deps, again.eventId), 'succeeded')
      assert.equal(await runEvent(deps, lostJob.eventId), 'nothing') // the old job showing up late does nothing
    })

    await t.test('actor disabled between submit and claim → failed ACTOR_DISABLED, model never called; writes off → tools hidden + 503', async () => {
      const conv = await newConversation('mgr2', ADMIN), r = await send('mgr2', ADMIN, conv, 'こんにちは')
      await db.$executeRaw`UPDATE public.managers SET is_active=false,deactivated_at=now(),updated_at=now() WHERE auth_user_id=${mgr2}::uuid`
      const before = seen.length
      await drain()
      assert.equal(seen.length, before)
      const [s] = await db.$queryRaw<Array<{ state: string; last_error_code: string }>>`SELECT state,last_error_code FROM app_private.ai_executions WHERE id=${r.body.id}::uuid`
      assert.deepEqual(s, { state: 'failed', last_error_code: 'ACTOR_DISABLED' })
      assert.equal((await call('mgr2', 'GET', `${ADMIN}/runs/${r.body.id}`)).body.error.code, 'MANAGER_REQUIRED')
      const off = agentServices(loadEnv({ DATABASE_URL: url, ENABLE_AGENT_WRITES: 'false' }), db)
      await assert.rejects(off.changes.confirm(mgrActor, proposalId, proposalHash), { code: 'FEATURE_NOT_READY' })
      assert.deepEqual(toolsFor('manager_ui', false).map(x => x.name).sort(), ['context_read', 'instruction_history', 'talent_search'])
    })
  } finally {
    await db.$disconnect(); await owner.$disconnect()
  }
})
