import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { createDatabase } from '../../infra/database/client.ts'
import type { TaskClient } from '../../ai/tasks/define.ts'
import { DailyTopicsService } from './service.ts'

// AI Task Mode end-to-end on a disposable Postgres with the runtime role, fake Responses client (IMPLEMENTATION_PLAN.md T3.2, AIC-T41).
const url = process.env.TEST_DATABASE_URL, ownerUrl = process.env.TEST_OWNER_DATABASE_URL
const local = !!url && !!ownerUrl && url !== ownerUrl && [url, ownerUrl].every(u => ['localhost', '127.0.0.1'].includes(new URL(u).hostname))
const at = (date: string, hhmm: string) => new Date(`${date}T${hhmm}:00+09:00`)

test('daily topics: schedule → task → three themes, idempotent, window, invalid output, retry', { skip: !local && 'needs local TEST_DATABASE_URL (runtime login) + TEST_OWNER_DATABASE_URL' }, async t => {
  const db = createDatabase(url!), owner = createDatabase(ownerUrl!)
  const replies: Array<(body: Record<string, unknown>) => unknown> = [], seen: Array<Record<string, unknown>> = []
  const client: TaskClient = { responses: { async parse(body) {
    seen.push(body); const r = replies.shift(); if (!r) throw new Error('no fake reply')
    const out = r(body); if (out instanceof Error) throw out
    return { id: 'resp_' + randomUUID().slice(0, 8), output_parsed: out, usage: { input_tokens: 500, output_tokens: 120, input_tokens_details: { cached_tokens: 100 }, output_tokens_details: { reasoning_tokens: 0 } } }
  } } }
  const svc = new DailyTopicsService(db, client, { prepHourJst: 6, deadlineHourJst: 8, model: 'fake-model', timeoutMs: 5000, price: null })
  const good = () => ({ greeting: 'おはよう！', topics: [1, 2, 3].map(i => ({ title: `テーマ${i}`, angle: `撮り方${i}`, reason: `理由${i}` })) })
  const drain = async (now: Date) => { const out: string[] = []; for (const e of await svc.leaseDue(10)) { await svc.releaseDispatch(e.eventId, e.token, 'enqueued'); out.push(await svc.run(e.eventId, now)) } return out }

  const login = async (kind: string) => { const u = randomUUID(); await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${u}::uuid)`; await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${u}::uuid,${kind})`; return u }
  const mu = await login('manager'), [m] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${mu}::uuid) RETURNING id::text`
  const talent = async (profile: string | null) => {
    const u = await login('talent'), name = 'D' + randomUUID().slice(0, 6)
    const [a] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES(${name},${u + '@example.test'},'2000-01-01','approved',${m.id}::uuid,now()) RETURNING id::text`
    const [r] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status) VALUES(${u}::uuid,'talent',${name},'2000-01-01','in_use',${a.id}::uuid,'approved') RETURNING id::text`
    if (profile !== null) await db.$executeRaw`INSERT INTO app_private.talent_profiles(talent_id,profile,updated_by) VALUES(${r.id}::uuid,${JSON.stringify({ profile })}::jsonb,${mu}::uuid)`
    return r.id
  }
  const year = 2031 + Math.floor(Math.random() * 60), day = (i: number) => `${year}-03-${String(10 + i).padStart(2, '0')}`

  await t.test('only ready Talents, only inside the window; once per Talent and date (AIC-T41)', async () => {
    const ready = await talent('ダンスが得意'), notReady = await talent('   '), d = day(1), mine = [ready, notReady]
    assert.equal(await svc.schedule(at(d, '05:59'), mine), 0)
    assert.equal(await svc.schedule(at(d, '06:05'), mine), 1) // the Talent without a profile gets nothing (PROFILE_NOT_READY)
    assert.equal(await svc.schedule(at(d, '06:06'), mine), 0) // already scheduled
    replies.push(() => good())
    assert.deepEqual(await drain(at(d, '06:10')), ['succeeded'])
    const themes = await db.$queryRaw<Array<{ position: number; content: string }>>`SELECT position,content FROM public.theme_suggestions WHERE talent_id=${ready}::uuid AND suggested_on=${d}::date ORDER BY position`
    assert.deepEqual(themes.map(x => x.position), [1, 2, 3]); assert.equal(themes[0].content, 'テーマ1|撮り方1')
    const [run] = await db.$queryRaw<Array<{ state: string; prompt_version: string; id: string }>>`SELECT state,prompt_version,id::text FROM app_private.ai_task_runs WHERE talent_id=${ready}::uuid AND input->>'date'=${d}`
    assert.equal(run.state, 'succeeded'); assert.equal(run.prompt_version, 'task.daily_topics@1')
    const [u] = await db.$queryRaw<Array<{ n: number; cached: number; payer: string }>>`SELECT count(*)::int n,max(cached_input_tokens) cached,max(payer) payer FROM public.ai_usage_events WHERE task_run_id=${run.id}::uuid`
    assert.deepEqual(u, { n: 1, cached: 100, payer: 'adesso' })
    const body = seen.at(-1)!
    assert.equal(body.store, false); assert.match(String(body.input), /ダンスが得意/); assert.equal((body.text as { format: { type: string } }).format.type, 'json_schema')
    assert.deepEqual(await drain(at(d, '06:20')), []) // a finished task is never redone
    assert.equal((await db.$queryRaw<unknown[]>`SELECT 1 FROM app_private.ai_task_runs WHERE talent_id=${notReady}::uuid`).length, 0)
  })

  await t.test('too late for the morning → MISSED_WINDOW, no themes', async () => {
    const id = await talent('写真が好き'), d = day(2)
    assert.equal(await svc.schedule(at(d, '07:59'), [id]), 1)
    assert.deepEqual(await drain(at(d, '08:01')), ['MISSED_WINDOW'])
    assert.equal((await db.$queryRaw<unknown[]>`SELECT 1 FROM public.theme_suggestions WHERE talent_id=${id}::uuid AND suggested_on=${d}::date`).length, 0)
  })

  await t.test('invalid output twice → TASK_OUTPUT_INVALID (final); provider error → back to pending for a later retry', async () => {
    const id = await talent('歌が好き'), d = day(3), d2 = day(4)
    assert.equal(await svc.schedule(at(d, '06:30'), [id]), 1)
    replies.push(() => ({ greeting: 'x', topics: [] }), () => ({ greeting: 'x', topics: [] }))
    assert.deepEqual(await drain(at(d, '06:31')), ['TASK_OUTPUT_INVALID'])
    assert.equal(await svc.schedule(at(d2, '06:30'), [id]), 1)
    replies.push(() => Object.assign(new Error('503'), { status: 503 }))
    assert.deepEqual(await drain(at(d2, '06:31')), ['retry'])
    const [r] = await db.$queryRaw<Array<{ state: string; attempts: number }>>`SELECT state,attempts FROM app_private.ai_task_runs WHERE talent_id=${id}::uuid AND input->>'date'=${d2}`
    assert.deepEqual(r, { state: 'pending', attempts: 1 })
  })

  await db.$disconnect(); await owner.$disconnect()
})
