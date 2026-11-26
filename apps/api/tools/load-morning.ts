// VT-09 morning load (agent_spec/ai-core/TEST_RUNBOOK.md §3.6): N synthetic Talents with a profile → daily_topics scheduled → C parallel
// task runners (the worker's ai-tasks lane) → p50/p95 per task, total time vs the 06:00–08:00 window. Synthetic data only.
//   TEST_DATABASE_URL=<runtime, local> TEST_OWNER_DATABASE_URL=<owner, local> npm run load:morning -- --talents 300 --concurrency 4 --fake-latency-ms 3000
//   (without --fake-latency-ms the real OpenAI model is called: run it on staging, it costs tokens; --allow-remote for a non-local DB)
import { parseArgs } from 'node:util'
import { randomUUID } from 'node:crypto'
import OpenAI from 'openai'
import { createDatabase } from '../src/infra/database/client.ts'
import { DailyTopicsService } from '../src/modules/coach-daily/service.ts'
import type { TaskClient } from '../src/ai/tasks/define.ts'

const { values: a } = parseArgs({ options: { talents: { type: 'string', default: '300' }, concurrency: { type: 'string', default: '4' }, 'fake-latency-ms': { type: 'string' }, 'allow-remote': { type: 'boolean', default: false } } })
const url = process.env.TEST_DATABASE_URL, ownerUrl = process.env.TEST_OWNER_DATABASE_URL, N = Number(a.talents), C = Number(a.concurrency)
if (process.env.NODE_ENV === 'production' || !url || !ownerUrl) throw new Error('needs TEST_DATABASE_URL (runtime) + TEST_OWNER_DATABASE_URL (owner); never production')
if (!a['allow-remote'] && ![url, ownerUrl].every(u => ['localhost', '127.0.0.1'].includes(new URL(u).hostname))) throw new Error('non-local DB: pass --allow-remote (staging only)')
const fake = a['fake-latency-ms'] !== undefined ? Number(a['fake-latency-ms']) : null
if (fake === null && (!process.env.OPENAI_API_KEY || !process.env.AI_COACH_MODEL)) throw new Error('real mode needs OPENAI_API_KEY and AI_COACH_MODEL')
const client: TaskClient = fake !== null
  ? { responses: { async parse() { await new Promise(r => setTimeout(r, fake * (0.5 + Math.random()))); return { id: 'fake', output_parsed: { greeting: 'おはよう', topics: [1, 2, 3].map(i => ({ title: `テーマ${i}`, angle: '撮り方', reason: '理由' })) }, usage: { input_tokens: 900, output_tokens: 200 } } } } }
  : new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: process.env.OPENAI_BASE_URL }) as unknown as TaskClient
const db = createDatabase(url), owner = createDatabase(ownerUrl)
const svc = new DailyTopicsService(db, client, { prepHourJst: 6, deadlineHourJst: 8, model: process.env.AI_COACH_MODEL ?? 'fake', timeoutMs: 60_000, price: null })
const date = `${2100 + Math.floor(Math.random() * 800)}-05-01`, at = (hhmm: string) => new Date(`${date}T${hhmm}:00+09:00`)
const pct = (xs: number[], p: number) => { const s = [...xs].sort((x, y) => x - y); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : 0 }

try {
  console.log(`creating ${N} synthetic Talents…`)
  const mu = randomUUID()
  await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${mu}::uuid)`; await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${mu}::uuid,'manager')`
  const [m] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${mu}::uuid) RETURNING id::text`
  const ids: string[] = []
  for (let i = 0; i < N; i++) {
    const u = randomUUID(), name = `Load${i}-${u.slice(0, 4)}`
    await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${u}::uuid)`; await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${u}::uuid,'talent')`
    const [ap] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES(${name},${u + '@example.test'},'2000-01-01','approved',${m.id}::uuid,now()) RETURNING id::text`
    const [t] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status) VALUES(${u}::uuid,'talent',${name},'2000-01-01','in_use',${ap.id}::uuid,'approved') RETURNING id::text`
    await db.$executeRaw`INSERT INTO app_private.talent_profiles(talent_id,profile,updated_by) VALUES(${t.id}::uuid,${JSON.stringify({ profile: `ダンスと写真が好き(負荷試験 ${i})` })}::jsonb,${mu}::uuid)`
    ids.push(t.id)
  }
  const scheduled = await svc.schedule(at('06:00'), ids)
  console.log(`scheduled ${scheduled} tasks for ${date}; running with concurrency ${C} (${fake !== null ? `fake latency ~${fake} ms` : 'REAL model'})`)
  const durations: number[] = [], results: Record<string, number> = {}, t0 = Date.now()
  const lane = async () => {
    for (;;) {
      const [e] = await svc.leaseDue(1)
      if (!e) return
      await svc.releaseDispatch(e.eventId, e.token, 'enqueued')
      const s = Date.now(), r = await svc.run(e.eventId, at('06:05'))
      durations.push(Date.now() - s); results[r] = (results[r] ?? 0) + 1
    }
  }
  await Promise.all(Array.from({ length: C }, lane))
  const total = (Date.now() - t0) / 1000, windowS = 2 * 3600
  console.log(JSON.stringify({ talents: N, concurrency: C, results, taskP50ms: pct(durations, 0.5), taskP95ms: pct(durations, 0.95), totalSeconds: Math.round(total),
    perMinute: Math.round(scheduled / (total / 60)), windowUsedPct: Math.round(100 * total / windowS), pass: total <= windowS * 0.7 && (results.succeeded ?? 0) === scheduled }, null, 2))
} finally { await db.$disconnect(); await owner.$disconnect() }
