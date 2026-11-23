import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { createDatabase } from '../../infra/database/client.ts'
import { AiCoachStore, type Claim } from './store.ts'

// Real PostgreSQL with every migration applied, runtime role (talent_runtime member). TEST_DATABASE_URL must be localhost.
const url = process.env.TEST_DATABASE_URL
const local = url && ['localhost', '127.0.0.1'].includes(new URL(url).hostname)

test('AI Core outbox/execution contract on Postgres', { skip: !local }, async t => {
  const db = createDatabase(url!)
  const store = new AiCoachStore(db, { inputPerMTok: 1, outputPerMTok: 2, currency: 'USD' })
  const login = async () => { const id = randomUUID(); await db.$executeRaw`INSERT INTO auth.users(id) VALUES(${id}::uuid)`; return id }
  // Same rows as tools/ai-talent.ts.
  const manager = await login()
  await db.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${manager}::uuid,'manager')`
  const [m] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${manager}::uuid) RETURNING id::text`
  const talentLogin = async () => {
    const u = await login()
    await db.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${u}::uuid,'talent')`
    const [app] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES('Momo',${u + '@example.test'},'2010-01-01','approved',${m.id}::uuid,now()) RETURNING id::text`
    await db.$executeRaw`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status) VALUES(${u}::uuid,'talent','Momo','2010-01-01','in_use',${app.id}::uuid,'approved')`
    return u
  }
  const eventOf = async (execId: string) => (await db.$queryRaw<Array<{ event_id: string }>>`SELECT event_id::text FROM app_private.ai_executions WHERE id=${execId}::uuid`)[0].event_id
  const expire = (id: string) => db.$executeRaw`UPDATE app_private.ai_executions SET lease_until=now()-interval '1 second',version=version+1 WHERE id=${id}::uuid`
  const states = async (execId: string) => (await db.$queryRaw<Array<{ e: string; o: string; ev: string }>>`
    SELECT e.state AS e,o.state AS o,ev.state AS ev FROM app_private.ai_executions e JOIN app_private.domain_operations o ON o.id=e.operation_id JOIN app_private.outbox_events ev ON ev.id=e.event_id WHERE e.id=${execId}::uuid`)[0]

  try {
    await t.test('a login without a Talent is refused', async () => {
      await assert.rejects(store.submit(await login(), randomUUID(), 'hi'), { code: 'TALENT_REQUIRED' })
    })

    const u = await talentLogin()
    let firstId = ''
    await t.test('submit is idempotent per request key', async () => {
      const key = randomUUID()
      firstId = (await store.submit(u, key, 'おはよう')).id
      assert.equal((await store.submit(u, key, 'おはよう')).id, firstId)
      await assert.rejects(store.submit(u, key, 'other'), { code: 'REQUEST_KEY_REUSED' })
    })

    await t.test('oldest first, one at a time, fenced commit, usage once', async () => {
      const second = await store.submit(u, randomUUID(), '二つ目')
      // Other runs may leave due rows in the shared test DB: only look at this Talent's events.
      const mine = new Set([await eventOf(firstId), await eventOf(second.id)])
      const due = (await store.leaseDue(100)).filter(d => mine.has(d.eventId))
      assert.equal(due.length, 2)
      // A job for the SECOND event still runs the oldest pending request of the Talent.
      const c = await store.claim(await eventOf(second.id)) as Claim
      assert.equal(c.executionId, firstId)
      assert.equal(c.talent.isMinor, true)
      assert.equal(await store.claim(await eventOf(second.id)), 'busy')
      assert.ok(await store.markCalling(c, 'openai', 'm', 'rev'))
      assert.ok(await store.complete(c, { kind: 'succeeded', text: 'おはようございます', inputTokens: 1000, outputTokens: 500 }, 'm'))
      assert.equal(await store.complete(c, { kind: 'succeeded', text: 'dup', inputTokens: 1, outputTokens: 1 }, 'm'), false)
      assert.deepEqual(await states(c.executionId), { e: 'succeeded', o: 'completed', ev: 'done' })
      // The dispatcher releasing its lease after the worker finished must not write the event back.
      for (const d of due) await store.releaseDispatch(d.eventId, d.token, 'enqueued')
      assert.deepEqual(await states(c.executionId), { e: 'succeeded', o: 'completed', ev: 'done' })
      const [usage] = await db.$queryRaw<Array<{ n: bigint; cost: string }>>`SELECT count(*) AS n,sum(cost_amount)::text AS cost FROM public.ai_usage_events WHERE execution_attempt_id=${c.attemptId}::uuid`
      assert.equal(usage.n, 1n)
      assert.equal(Number(usage.cost), 0.002)
      assert.deepEqual((await store.conversation(u)).messages.map(x => x.sender), ['talent', 'coach', 'talent'])
    })

    await t.test('expired lease: not called → new attempt; called → unknown, old worker cannot commit', async () => {
      const ex = (await store.conversation(u)).executions.find(e => e.state === 'pending')!
      const ev = await eventOf(ex.id)
      const first = await store.claim(ev) as Claim
      await expire(first.executionId)
      assert.equal(await store.heartbeat(first), false)
      assert.ok((await store.reconcile()).released >= 1)
      assert.equal((await store.execution(u, first.executionId)).state, 'pending')
      assert.equal(await store.markCalling(first, 'openai', 'm', 'rev'), false)
      const second = await store.claim(ev) as Claim
      assert.equal(second.attemptNo, 2)
      assert.ok(await store.markCalling(second, 'openai', 'm', 'rev'))
      await expire(second.executionId)
      assert.ok((await store.reconcile()).unknown >= 1)
      assert.equal(await store.complete(second, { kind: 'succeeded', text: 'late', inputTokens: 1, outputTokens: 1 }, 'm'), false)
      assert.deepEqual(await states(ex.id), { e: 'unknown', o: 'unknown', ev: 'unknown' })
      // unknown blocks the Talent until a person closes it; closing never re-calls the model.
      const next = await store.submit(u, randomUUID(), '三つ目')
      assert.equal(await store.claim(await eventOf(next.id)), 'busy')
      assert.equal((await store.closeUnknown(u, ex.id)).state, 'failed')
      assert.equal(((await store.claim(await eventOf(next.id))) as Claim).executionId, next.id)
    })

    await t.test('morning run: one per Talent per day, 3 themes, no-profile path without a model call', async () => {
      const v = await talentLogin()
      const due = await store.morningDue()
      assert.match(due.day, /^\d{4}-\d{2}-\d{2}$/)
      const [first] = await store.scheduleDaily('2030-01-07', v)
      const [again] = await store.scheduleDaily('2030-01-07', v)
      assert.equal(again.id, first.id)
      assert.equal(first.inputMessageId, null)
      const c = await store.claim(await eventOf(first.id)) as Claim
      assert.equal(c.task, 'coach.daily_themes')
      assert.equal(c.day, '2030-01-07')
      const r = await store.results(c.talent.talentId, '2030-01-07')
      assert.deepEqual([r.yesterday, r.yesterdayPosts.length, r.followers.length], ['2030-01-06', 0, 0])
      assert.ok(await store.markCalling(c, 'openai', 'm', 'rev'))
      assert.ok(await store.complete(c, { kind: 'succeeded', text: 'おはようございます', themes: ['A', 'B', 'C'], inputTokens: 10, outputTokens: 5 }, 'm'))
      const t1 = await store.latestThemes(v)
      assert.deepEqual([t1.day, t1.themes.map(x => x.content)], ['2030-01-07', ['A', 'B', 'C']])
      // No profile: succeeded without calling the model (attempt usage not_called).
      const [second] = await store.scheduleDaily('2030-01-08', v)
      const c2 = await store.claim(await eventOf(second.id)) as Claim
      assert.ok(await store.complete(c2, { kind: 'succeeded', called: false, text: 'プロフィールを準備中です', inputTokens: undefined, outputTokens: undefined }, 'm'))
      const [a2] = await db.$queryRaw<Array<{ phase: string; usage_state: string }>>`SELECT phase,usage_state FROM app_private.ai_execution_attempts WHERE id=${c2.attemptId}::uuid`
      assert.deepEqual(a2, { phase: 'succeeded', usage_state: 'not_called' })
      assert.deepEqual(await states(second.id), { e: 'succeeded', o: 'completed', ev: 'done' })
    })

    await t.test('daily trends: one shared row per day, the first write wins', async () => {
      const day = `2031-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`
      const before = await store.trends(day)
      const first = await store.saveTrends(day, { content: '- A', sources: [{ url: 'https://example.com/a', title: 'A' }], provider: 'openai', model: 'm', inputTokens: 5, outputTokens: 3 })
      const again = await store.saveTrends(day, { content: '- B', sources: [], provider: 'openai', model: 'm' })
      assert.equal(again!.content, first!.content, 'second write is ignored')
      if (!before) { assert.equal(first!.content, '- A'); assert.deepEqual(again!.sources, [{ url: 'https://example.com/a', title: 'A' }]) }
      assert.match(again!.source, /app_private\.ai_daily_trends day=2031-/)
    })

    await t.test('demo reset of a day: runs, messages, themes gone; trends kept; the day can run again (simulated flag kept)', async () => {
      const v = await talentLogin(), day = `2032-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`
      await store.saveTrends(day, { content: '- keep me', sources: [], provider: 'openai', model: 'm' })
      const [run] = await store.scheduleDaily(day, v, true)
      const c = await store.claim(await eventOf(run.id)) as Claim
      assert.equal(c.simulated, true)
      assert.ok(await store.markCalling(c, 'simulated', 'simulated', 'rev'))
      assert.ok(await store.complete(c, { kind: 'succeeded', text: '模擬', themes: ['A', 'B', 'C'], inputTokens: 0, outputTokens: 0, simulated: true }, 'simulated'))
      const [{ n: usage }] = await db.$queryRaw<Array<{ n: bigint }>>`SELECT count(*) AS n FROM public.ai_usage_events WHERE execution_attempt_id=${c.attemptId}::uuid`
      assert.equal(usage, 0n, 'a simulated run writes no usage/cost row')
      const r = await store.resetDay(day)
      assert.ok(r.runs >= 1 && r.messages >= 1 && r.themes >= 3)
      assert.equal((await store.latestThemes(v)).themes.length, 0)
      assert.equal((await store.trends(day))!.content, '- keep me')
      const [again] = await store.scheduleDaily(day, v)
      assert.notEqual(again.id, run.id)
      assert.equal(again.state, 'pending')
    })

    await t.test('dispatcher: a previous job still queued means no new hand-off (sequence goes back)', async () => {
      const v = await talentLogin()
      const [run] = await store.scheduleDaily('2033-03-03', v, true)
      const ev = await eventOf(run.id)
      const seq = async () => (await db.$queryRaw<Array<{ s: bigint }>>`SELECT delivery_sequence AS s FROM app_private.outbox_events WHERE id=${ev}::uuid`)[0].s
      const first = (await store.leaseDue(500)).find(d => d.eventId === ev)!
      await store.releaseDispatch(ev, first.token, 'enqueued')
      assert.equal(await seq(), 1n)
      await db.$executeRaw`UPDATE app_private.outbox_events SET next_dispatch_at=now() WHERE id=${ev}::uuid`
      const second = (await store.leaseDue(500)).find(d => d.eventId === ev)!
      assert.equal(second.sequence, 2n)
      await store.releaseDispatch(ev, second.token, 'still_queued')
      assert.equal(await seq(), 1n, 'no hand-off happened')
    })

    await t.test('another Talent cannot read the execution', async () => {
      const other = await talentLogin()
      await assert.rejects(store.execution(other, firstId), { code: 'EXECUTION_NOT_FOUND' })
    })
  } finally {
    await db.$disconnect()
  }
})
