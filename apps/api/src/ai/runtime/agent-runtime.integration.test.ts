import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { Usage, type Model, type ModelRequest, type ModelResponse, type StreamEvent } from '@openai/agents'
import { createDatabase } from '../../infra/database/client.ts'
import { loadEnv } from '../../config/env.ts'
import { controlServices } from '../../container.ts'
import type { ManagerActor, TalentActor } from '../../control/actor.ts'
import { ConversationStore } from '../../modules/coach-conversation/store.ts'
import { runAgentEvent, type RuntimeDeps } from './run-agent.ts'

// Agent runtime on the real Agents SDK loop with a scripted Model, on a disposable Postgres with the runtime role
// (IMPLEMENTATION_PLAN.md P2: AIC-T02, T05, T06, T07, T08, T10, T12, T13, T17, T36). No Redis: drive() plays dispatcher + BullMQ.
process.env.OPENAI_AGENTS_DISABLE_TRACING = '1'
const url = process.env.TEST_DATABASE_URL, ownerUrl = process.env.TEST_OWNER_DATABASE_URL
const local = !!url && !!ownerUrl && url !== ownerUrl && [url, ownerUrl].every(u => ['localhost', '127.0.0.1'].includes(new URL(u).hostname))

type Out = Record<string, unknown>
type Script = (req: ModelRequest) => Out[] | Promise<Out[]>
let n = 0
const id = (p: string) => `${p}_${++n}_${randomUUID().slice(0, 6)}`
const call = (name: string, args: unknown): Out => ({ type: 'function_call', id: id('fc'), callId: id('call'), name, arguments: typeof args === 'string' ? args : JSON.stringify(args), status: 'completed' })
const say = (text: string): Out => ({ type: 'message', id: id('msg'), role: 'assistant', status: 'completed', content: [{ type: 'output_text', text }] })
const sleep = (ms: number, signal?: AbortSignal) => new Promise<void>((res, rej) => { const t = setTimeout(res, ms); signal?.addEventListener('abort', () => { clearTimeout(t); rej(Object.assign(new Error('aborted'), { name: 'AbortError' })) }) })

// Scripted model: each request takes the next script; it sees the real request the SDK built (instructions, input, tools).
class FakeModel implements Model {
  queue: Script[] = []; seen: ModelRequest[] = []; delayMs = 0
  async getResponse(req: ModelRequest): Promise<ModelResponse> {
    this.seen.push(req)
    if (this.delayMs) await sleep(this.delayMs, req.signal)
    const s = this.queue.shift()
    if (!s) throw new Error('no scripted response left')
    const output = await s(req)
    return { usage: new Usage({ requests: 1, inputTokens: 100, outputTokens: 20, totalTokens: 120, inputTokensDetails: { cached_tokens: 40 }, outputTokensDetails: { reasoning_tokens: 0 } }), output: output as never, responseId: id('resp') }
  }
  async *getStreamedResponse(req: ModelRequest): AsyncIterable<StreamEvent> {
    const r = await this.getResponse(req)
    yield { type: 'response_started' } as StreamEvent
    for (const o of r.output as unknown as Out[]) if (o.type === 'message') yield { type: 'output_text_delta', delta: String((o.content as Array<{ text: string }>)[0].text) } as StreamEvent
    yield { type: 'response_done', response: { id: r.responseId!, usage: { requests: 1, inputTokens: 100, outputTokens: 20, totalTokens: 120, inputTokensDetails: { cached_tokens: 40 }, outputTokensDetails: { reasoning_tokens: 0 } }, output: r.output } } as StreamEvent
  }
}
const inputText = (req: ModelRequest) => JSON.stringify(req.input)
const toolNames = (req: ModelRequest) => req.tools.map(t => (t as { name: string }).name)
const lastToolResult = (req: ModelRequest): any => {
  const items = (Array.isArray(req.input) ? req.input : []) as Array<Record<string, any>>
  const r = items.filter(i => i.type === 'function_call_result').at(-1)
  const out = r?.output
  const text = typeof out === 'string' ? out : out?.text ?? (Array.isArray(out) ? out.map((p: any) => p.text).join('') : JSON.stringify(out))
  try { return JSON.parse(text) } catch { return text }
}

test('agent runtime on the Agents SDK: tools, proposals, session, usage, cancel, lease, recovery', { skip: !local && 'needs local TEST_DATABASE_URL (runtime login) + TEST_OWNER_DATABASE_URL' }, async t => {
  const db = createDatabase(url!), owner = createDatabase(ownerUrl!)
  const env = loadEnv({ DATABASE_URL: url, NODE_ENV: 'test', CORS_ORIGINS: 'http://x.test', ENABLE_AUTH_DEMO: 'true', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'x', ENABLE_AGENT_CORE: 'true' })
  const { proposals } = controlServices(env, db), store = new ConversationStore(db, { perMinute: 100_000, perDay: 100_000 }), model = new FakeModel() // rate limit has its own test
  const cfg: RuntimeDeps['cfg'] = { model, modelName: 'fake-model', maxTurns: 6, computeMs: 20_000, heartbeatMs: 100, maxOutputTokens: 400, reasoningEffort: 'low', writesEnabled: true,
    history: { items: 30, chars: 16_000 }, price: { inputPerMTok: 1, outputPerMTok: 2, currency: 'USD' } }
  const deps: RuntimeDeps = { db, store, proposals, cfg }
  // Only this test's conversations: other test files on the same DB leave pending runs that no worker processes.
  const mine = new Set<string>()
  const drive = async (d: RuntimeDeps = deps) => {
    const out: string[] = []
    for (const e of await store.leaseDue(50)) {
      const [r] = await db.$queryRaw<Array<{ conversation_id: string }>>`SELECT conversation_id::text FROM app_private.agent_runs WHERE event_id=${e.eventId}::uuid`
      if (!r || !mine.has(r.conversation_id)) { await store.releaseDispatch(e.eventId, e.token, 'failed'); continue }
      await store.releaseDispatch(e.eventId, e.token, 'enqueued'); out.push(await runAgentEvent(d, e.eventId))
    }
    return out
  }

  // ---- Fixtures: a Manager, Talents A (with profile) and B.
  const login = async (kind: 'manager' | 'talent') => {
    const u = randomUUID()
    await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${u}::uuid)`
    await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${u}::uuid,${kind})`
    return u
  }
  const mu = await login('manager')
  const [m] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${mu}::uuid) RETURNING id::text`
  const tag = randomUUID().slice(0, 6)
  const talent = async (name: string): Promise<TalentActor> => {
    const u = await login('talent')
    const [a] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES(${name},${u + '@example.test'},'2000-01-01','approved',${m.id}::uuid,now()) RETURNING id::text`
    const [r] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status) VALUES(${u}::uuid,'talent',${name},'2000-01-01','in_use',${a.id}::uuid,'approved') RETURNING id::text`
    return { kind: 'talent', userId: u, talentId: r.id, status: 'in_use' }
  }
  const A = await talent(`Momo${tag}`), B = await talent(`Hana${tag}`)
  await db.$executeRaw`INSERT INTO app_private.talent_profiles(talent_id,profile,updated_by) VALUES(${A.talentId}::uuid,${JSON.stringify({ profile: 'ダンスが得意な高校生' })}::jsonb,${mu}::uuid)`
  const M: ManagerActor = { kind: 'manager', userId: mu, managerId: m.id }
  const conv = async (a: TalentActor | ManagerActor) => { const id = (await store.createConversation(a, a.kind === 'talent' ? 'talent' : 'manager_ui', randomUUID())).conversationId; mine.add(id); return id }
  const send = (a: TalentActor | ManagerActor, c: string, text: string, key = randomUUID()) => store.submit(a, a.kind === 'talent' ? 'talent' : 'manager_ui', c, key, text)
  const view = (a: TalentActor | ManagerActor, runId: string) => store.runView(a, a.kind === 'talent' ? 'talent' : 'manager_ui', runId)
  const items = async (runId: string) => (await db.$queryRaw<Array<{ kind: string; role: string | null }>>`SELECT kind,role FROM app_private.agent_session_items WHERE run_id=${runId}::uuid ORDER BY sequence`).map(r => r.role ? `${r.kind}:${r.role}` : r.kind)

  const cA = await conv(A)
  await t.test('Talent read run (answer_only): context from DB, SDK session in Postgres, usage per request, prompt version', async () => {
    model.queue.push(req => {
      assert.match(String(req.systemInstructions), /ダンスが得意な高校生/) // profile in the instructions built from the DB
      assert.deepEqual(toolNames(req), ['context_read']) // the Talent has no write tool
      return [call('context_read', { sections: ['profile', 'goals'] })]
    }, req => {
      const r = lastToolResult(req)
      assert.equal(r.kind, 'ok'); assert.equal(r.data.talent.talentId, A.talentId); assert.equal(r.data.profile.fields.profile, 'ダンスが得意な高校生')
      return [say('毎週同じ曜日に投稿しよう！')]
    })
    const r = await send(A, cA, '私のプロフィールを読んでアドバイスして')
    assert.deepEqual(await drive(), ['succeeded'])
    const v = await view(A, r.id)
    assert.equal(v.state, 'succeeded'); assert.equal(v.completionKind, 'answer_only'); assert.equal(v.finalText, '毎週同じ曜日に投稿しよう！')
    assert.deepEqual(await items(r.id), ['message:user', 'function_call', 'function_call_result', 'message:assistant'])
    const [run] = await db.$queryRaw<Array<{ prompt_version: string; model: string; manifest: any }>>`SELECT prompt_version,model,context_manifest AS manifest FROM app_private.agent_runs WHERE id=${r.id}::uuid`
    assert.equal(run.prompt_version, 'agent.talent@1'); assert.equal(run.model, 'fake-model'); assert.equal(run.manifest.profileVersion, '1')
    const usage = await db.$queryRaw<Array<{ talent_id: string; payer: string; cached: number; cost: string | null }>>`SELECT talent_id::text,payer,cached_input_tokens AS cached,cost_amount::text AS cost FROM public.ai_usage_events WHERE run_id=${r.id}::uuid`
    assert.equal(usage.length, 2) // AIC-T10: one row per model request
    assert.ok(usage.every(u => u.talent_id === A.talentId && u.payer === 'adesso' && u.cached === 40 && u.cost !== null))
    const msgs = await store.messages(A, 'talent', cA, 0n, 50)
    assert.deepEqual(msgs.items.map(i => i.role), ['user', 'assistant']); assert.equal(msgs.pending.length, 0)
  })

  await t.test('next turn sees the history from the Postgres session', async () => {
    model.queue.push(req => { assert.match(inputText(req), /私のプロフィールを読んでアドバイスして/); assert.match(inputText(req), /毎週同じ曜日/); return [say('はい、続けましょう')] })
    await send(A, cA, '続けて')
    assert.deepEqual(await drive(), ['succeeded'])
  })

  await t.test('AIC-T02: a Talent cannot read another Talent, nor use a tool it was not given; nothing is written', async () => {
    model.queue.push(() => [call('context_read', { talentId: B.talentId, sections: ['profile'] })],
      req => { assert.equal(lastToolResult(req).code, 'NOT_FOUND_OR_FORBIDDEN'); return [call('profile_prepare', { talentId: A.talentId, expectedVersion: '1', patch: { profile: 'x' } })] },
      () => [say('できません')])
    const r = await send(A, cA, 'Hanaさんのプロフィールを見せて、私のも書き換えて')
    assert.deepEqual(await drive(), ['succeeded'])
    const v = await view(A, r.id)
    assert.equal(v.completionKind, 'action_result'); assert.match(v.finalText!, /⚠ 実行できませんでした: context_read\(NOT_FOUND_OR_FORBIDDEN\)/) // AIC-T12: backend text
    assert.equal(v.proposals.length, 0)
    assert.equal(Number((await db.$queryRaw<Array<{ n: bigint }>>`SELECT count(*) n FROM app_private.business_proposals WHERE run_id=${r.id}::uuid`)[0].n), 0)
  })

  const cM = await conv(M)
  let proposalId = '', proposalHash = '', manRun = ''
  await t.test('Manager run: search → invalid call repaired by the model (AIC-T17) → same prepare twice = one proposal (AIC-T05)', async () => {
    model.queue.push(req => { assert.ok(toolNames(req).includes('profile_prepare')); assert.ok(!toolNames(req).includes('change_commit')); return [call('talent_search', { query: `Momo${tag}` })] },
      req => { assert.equal(lastToolResult(req).data.items[0].talentId, A.talentId); return [call('profile_prepare', `{"talentId":"${A.talentId}","expectedVersion":"one","patch":{"tone":"やさしく"}}`)] },
      req => { assert.ok(JSON.stringify(lastToolResult(req)).length > 0); const a = { talentId: A.talentId, expectedVersion: '1', patch: { tone: 'やさしく' } }; return [call('profile_prepare', a)] },
      () => [call('profile_prepare', { talentId: A.talentId, expectedVersion: '1', patch: { tone: 'やさしく' } })],
      () => [say('変更案を作りました。保存しました！')])
    const r = await send(M, cM, 'Momoの口調をやさしくして')
    manRun = r.id
    assert.deepEqual(await drive(), ['succeeded'])
    const v = await view(M, r.id)
    assert.equal(v.completionKind, 'action_result'); assert.equal(v.proposals.length, 1); assert.equal(v.proposals[0].state, 'prepared')
    assert.match(v.finalText!, /📝 変更案を作りました/); assert.doesNotMatch(v.finalText!, /保存しました！/) // the model's claim is never shown
    proposalId = v.proposals[0].id
    proposalHash = (await proposals.view(M, proposalId)).proposalHash
    const [vl] = await db.$queryRaw<Array<{ n: bigint }>>`SELECT count(*) n FROM public.manager_view_logs WHERE manager_id=${m.id}::uuid`
    assert.equal(vl.n, 0n) // no context_read in this run → no view logged
  })

  await t.test('confirm (no AI run) → receipt in the run view and a receipt item the next turn reads', async () => {
    const c = await proposals.confirm(M, 'manager_ui', proposalId, { requestKey: randomUUID(), proposalHash })
    assert.equal(c.status, 200)
    const v = await view(M, manRun)
    assert.equal(v.receipts.length, 1); assert.equal(v.receipts[0].resultVersion, '2'); assert.equal(v.proposals[0].state, 'consumed')
    model.queue.push(req => { assert.match(inputText(req), /マネージャーが保存しました/); return [call('context_read', { talentId: A.talentId, sections: ['profile'] })] },
      req => { assert.equal(lastToolResult(req).data.profile.fields.tone, 'やさしく'); return [say('保存済みです')] })
    await send(M, cM, '保存されたか確認して')
    assert.deepEqual(await drive(), ['succeeded'])
    const [vl] = await db.$queryRaw<Array<{ n: bigint }>>`SELECT count(*) n FROM public.manager_view_logs WHERE manager_id=${m.id}::uuid AND talent_id=${A.talentId}::uuid`
    assert.equal(vl.n, 1n) // a Manager's read is a logged view
    const usage = await db.$queryRaw<Array<{ talent_id: string | null }>>`SELECT talent_id::text FROM public.ai_usage_events WHERE run_id=${manRun}::uuid`
    assert.ok(usage.length >= 1 && usage.every(u => u.talent_id === null)) // Manager runs: no Talent is charged
  })

  await t.test('max turns: failed MODEL_LIMIT_REACHED, the proposal made before stays visible', async () => {
    const loop = () => [call('talent_search', { query: 'x' })]
    model.queue.push(() => [call('profile_prepare', { talentId: A.talentId, expectedVersion: '2', patch: { direction: 'ダンス' } })], loop, loop)
    const r = await send(M, cM, 'ずっと検索して')
    assert.deepEqual(await drive({ ...deps, cfg: { ...cfg, maxTurns: 2 } }), ['MODEL_LIMIT_REACHED'])
    const v = await view(M, r.id)
    assert.equal(v.state, 'failed'); assert.equal(v.errorCode, 'MODEL_LIMIT_REACHED'); assert.equal(v.proposals.length, 1)
    model.queue.length = 0
  })

  await t.test('submit: same key = same run; other text = 409; second message while busy = RUN_BUSY', async () => {
    const c = await conv(A), key = randomUUID()
    const r1 = await send(A, c, 'こんにちは', key), r2 = await send(A, c, 'こんにちは', key)
    assert.equal(r1.id, r2.id)
    await assert.rejects(send(A, c, '別の文', key), /REQUEST_KEY_REUSED/)
    await assert.rejects(send(A, c, '2通目'), /RUN_BUSY/)
    const msgs = await store.messages(A, 'talent', c, 0n, 50)
    assert.deepEqual(msgs.pending.map(p => p.text), ['こんにちは']) // shown before the SDK wrote anything
    await store.cancel(A, 'talent', r1.id)
    assert.equal((await view(A, r1.id)).state, 'cancelled')
  })

  await t.test('cancel while running (AIC-T13): the heartbeat sees it, the run ends cancelled', async () => {
    const c = await conv(A)
    model.delayMs = 3000; model.queue.push(() => [say('遅い返事')])
    const r = await send(A, c, 'ゆっくり答えて')
    const running = drive()
    await sleep(400)
    await store.cancel(A, 'talent', r.id)
    assert.deepEqual(await running, ['CANCELLED'])
    model.delayMs = 0; model.queue.length = 0
    assert.equal((await view(A, r.id)).state, 'cancelled')
    // The SDK keeps the user's message (lease still held when cancelled), nothing else: no half-written turn (AIC-T36).
    assert.deepEqual(await items(r.id), ['message:user'])
  })

  await t.test('lease lost (AIC-T08): the old worker cannot write or finish; the reconciler fails the run WORKER_LOST', async () => {
    const c = await conv(A)
    model.delayMs = 1500; model.queue.push(() => [say('間に合わない')])
    const r = await send(A, c, '答えて')
    const running = drive()
    await sleep(300)
    await owner.$executeRaw`UPDATE app_private.agent_runs SET lease_token=gen_random_uuid(),lease_until=now()-interval '1 second',version=version+1 WHERE id=${r.id}::uuid`
    assert.deepEqual(await running, ['lease_lost'])
    model.delayMs = 0; model.queue.length = 0
    assert.deepEqual(await items(r.id), [])
    const rec = await store.reconcile()
    assert.ok(rec.lost >= 1)
    const v = await view(A, r.id)
    assert.equal(v.state, 'failed'); assert.equal(v.errorCode, 'WORKER_LOST')
    model.queue.push(() => [say('こんどは大丈夫')]) // AIC-T36: the conversation keeps working after a lost run
    await send(A, c, 'もう一度')
    assert.deepEqual(await drive(), ['succeeded'])
  })

  await t.test('worker died before the model was called (AIC-T06/T07): requeued once, then WORKER_LOST', async () => {
    const c = await conv(A), r = await send(A, c, '再送テスト')
    const expire = () => owner.$executeRaw`UPDATE app_private.agent_runs SET lease_until=now()-interval '1 second',version=version+1 WHERE id=${r.id}::uuid`
    for (const e of await store.leaseDue(50)) { const [x] = await db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM app_private.agent_runs WHERE event_id=${e.eventId}::uuid`; if (x?.id !== r.id) { await store.releaseDispatch(e.eventId, e.token, 'failed'); continue } await store.releaseDispatch(e.eventId, e.token, 'enqueued'); assert.notEqual(await store.claim(e.eventId), 'nothing') }
    await expire()
    assert.equal((await store.reconcile()).requeued, 1)
    assert.equal((await view(A, r.id)).state, 'pending')
    for (const e of await store.leaseDue(50)) { const [x] = await db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM app_private.agent_runs WHERE event_id=${e.eventId}::uuid`; if (x?.id !== r.id) { await store.releaseDispatch(e.eventId, e.token, 'failed'); continue } await store.releaseDispatch(e.eventId, e.token, 'enqueued'); await store.claim(e.eventId) }
    await expire()
    assert.equal((await store.reconcile()).lost, 1)
    assert.equal((await view(A, r.id)).errorCode, 'WORKER_LOST')
  })

  await t.test('actor disabled before the claim → failed ACTOR_DISABLED, no model call', async () => {
    const c = await conv(A), r = await send(A, c, 'こんにちは'), before = model.seen.length
    await owner.$executeRaw`UPDATE public.talents SET status='before_use',version=version+1 WHERE id=${A.talentId}::uuid`
    assert.deepEqual(await drive(), ['nothing']) // closed at claim time
    assert.equal((await view(A, r.id)).errorCode, 'ACTOR_DISABLED'); assert.equal(model.seen.length, before)
    await owner.$executeRaw`UPDATE public.talents SET status='in_use',version=version+1 WHERE id=${A.talentId}::uuid`
  })

  await db.$disconnect(); await owner.$disconnect()
})
