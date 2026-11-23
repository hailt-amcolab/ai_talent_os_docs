import { writeFileSync } from 'node:fs'
import { Queue, Worker } from 'bullmq'
import { Redis } from 'ioredis'
import { loadEnv } from './config/env.ts'
import { connectDatabase } from './infra/database/client.ts'
import { openAiModels } from './modules/ai-coach/coach.ts'
import type { ContextSource, TalentFiles, Trends } from './modules/ai-coach/context.ts'
import { fileAudit } from './modules/ai-coach/audit.ts'
import { simulatedModels } from './modules/ai-coach/simulated.ts'
import { createOneDrive } from './modules/onedrive/connections.ts'
import { PwaService } from './modules/pwa/service.ts'
import { AiCoachStore } from './modules/ai-coach/store.ts'
import { runEvent } from './modules/ai-coach/runner.ts'

// AI Core worker process (report §2, §7.1, §11.3): morning scheduler + outbox dispatcher + reconciler + BullMQ consumer. No HTTP server.
// Run: node dist/worker.js (Docker service `worker`). Never started by the API container.
const env = loadEnv()
const missing = (['REDIS_URL', 'OPENAI_API_KEY', 'AI_COACH_MODEL'] as const).filter(k => !env[k])
if (missing.length) { console.error(JSON.stringify({ level: 'error', code: 'WORKER_CONFIG_MISSING', missing })); process.exit(1) }

const log = (level: 'info' | 'warn' | 'error', code: string, extra: Record<string, unknown> = {}) => console.log(JSON.stringify({ level, code, ...extra }))
const prefix = env.AI_QUEUE_PREFIX ?? `talentos-${env.NODE_ENV}`
const QUEUE = 'coach-interactive' // ponytail: one interactive queue; add 'batch' with its own concurrency when a batch task exists (§9.1)
const run = { provider: 'openai', model: env.AI_COACH_MODEL!, timeoutMs: 45_000, heartbeatMs: 5_000 }

// ponytail: one pool (talent_runtime) for dispatcher + worker; §7.1 wants separate roles/pools once talent_dispatcher has a LOGIN.
const db = await connectDatabase(env.DATABASE_URL)
const price = env.AI_PRICE_INPUT_PER_MTOK !== undefined && env.AI_PRICE_OUTPUT_PER_MTOK !== undefined
  ? { inputPerMTok: env.AI_PRICE_INPUT_PER_MTOK, outputPerMTok: env.AI_PRICE_OUTPUT_PER_MTOK, currency: env.AI_PRICE_CURRENCY } : null
const store = new AiCoachStore(db, price)
const models = openAiModels(env.OPENAI_API_KEY!, run.model, env.OPENAI_BASE_URL, { model: env.AI_TRENDS_MODEL, domains: env.AI_TRENDS_DOMAINS, contextSize: env.AI_TRENDS_CONTEXT_SIZE })

// SCD 3-1 items 2–4 come from OneDrive. Morning runs read fresh; chat reuses that read for the day instead of re-reading per message.
// ponytail: in-process cache (10 min) instead of the talent_context_snapshots table of 2-1; one worker process so no cross-process invalidation yet.
const onedrive = createOneDrive(env, db)
const cache = new Map<string, { at: number; files: TalentFiles }>()
const context: ContextSource | null = onedrive ? async folderId => {
  const hit = cache.get(folderId)
  if (hit && Date.now() - hit.at < 600_000) return hit.files
  const files = await (await onedrive.demo()).aiContext(folderId)
  cache.set(folderId, { at: Date.now(), files })
  return files
} : null
const freshContext: ContextSource | null = context ? async folderId => { cache.delete(folderId); return context(folderId) } : null
// 毎朝の声かけ push (SCD 3-4 step 6), only when VAPID keys are configured.
const pwa = env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY && env.VAPID_SUBJECT ? new PwaService(db, { publicKey: env.VAPID_PUBLIC_KEY, privateKey: env.VAPID_PRIVATE_KEY, subject: env.VAPID_SUBJECT }) : null
// CR-05 / Q&A No.38: today's trends, ONE web search per JST day shared by every Talent. DB first; the first run of the day searches.
// ponytail: in-process de-duplication (one worker); after a failed search, wait 10 min before paying for another try.
const trendRuns = new Map<string, Promise<Trends | null>>(), trendFailedAt = new Map<string, number>()
function trends(day: string): Promise<Trends | null> {
  if (Date.now() - (trendFailedAt.get(day) ?? 0) < 600_000) return Promise.resolve(null)
  let job = trendRuns.get(day)
  if (!job) {
    job = (async () => {
      const saved = await store.trends(day)
      if (saved) return saved
      const r = await models.generateTrends({ day, signal: AbortSignal.timeout(90_000) })
      if (!r.content) throw new Error('empty search result')
      log('info', 'TRENDS_SAVED', { day, sources: r.sources.length })
      return store.saveTrends(day, { content: r.content, sources: r.sources, provider: run.provider, model: env.AI_TRENDS_MODEL ?? run.model, inputTokens: r.inputTokens, outputTokens: r.outputTokens })
    })()
    trendRuns.set(day, job)
    job.catch(() => { trendRuns.delete(day); trendFailedAt.set(day, Date.now()); log('warn', 'TRENDS_FAILED', { day }) })
  }
  return job
}
// Development input audit (AI_INPUT_AUDIT=true): one Markdown file per run under AI_INPUT_AUDIT_DIR/<talent>/.
const audit = env.AI_INPUT_AUDIT ? fileAudit(env.AI_INPUT_AUDIT_DIR) : undefined
// Demo "no AI call" runs (task_revision +simulated): sample text after a realistic wait; trends only if already saved.
const simulated = { ...simulatedModels(env.AI_SIMULATED_DELAY_MS), savedTrends: (day: string) => store.trends(day) }
const deps = (task: string) => ({ ...models, context: task === 'coach.daily_themes' ? freshContext : context, trends, audit, simulated, notify: pwa ? (u: string, m: { title: string; body: string; url: string }) => pwa.notify(u, m) : undefined })

// Two Redis clients (§11.2): the dispatcher fails fast, the BullMQ worker reconnects forever (maxRetriesPerRequest: null).
const dispatchRedis = new Redis(env.REDIS_URL!, { maxRetriesPerRequest: 1, enableOfflineQueue: false })
const workerRedis = new Redis(env.REDIS_URL!, { maxRetriesPerRequest: null })
for (const r of [dispatchRedis, workerRedis]) r.on('error', () => log('warn', 'REDIS_ERROR'))
const queue = new Queue(QUEUE, { connection: dispatchRedis, prefix })

const worker = new Worker(QUEUE, async job => {
  const result = await runEvent(store, deps(job.name), run, String(job.data.eventId))
  log('info', 'AI_JOB_DONE', { jobId: job.id, result })
  return result
}, { connection: workerRedis, prefix, concurrency: env.AI_WORKER_CONCURRENCY, lockDuration: 90_000 })
worker.on('failed', (job, e) => log('error', 'AI_JOB_FAILED', { jobId: job?.id, error: e.name }))

// Dispatcher: lease due outbox events, enqueue, then release the lease (Redis accepting a job is not completion, §4.5).
// A pending event is looked at again every REDISPATCH_SECONDS; a new job is added only when the previous one is no longer
// waiting/active in Redis (finished, failed or lost after a Redis restart, §4.6 step 7). Load test 2026-11-23: without this check
// 208 runs produced 331 extra jobs while waiting in a long queue.
const LIVE = new Set(['waiting', 'active', 'delayed', 'prioritized', 'waiting-children'])
async function dispatch() {
  for (const d of await store.leaseDue(10)) {
    try {
      if (d.sequence > 1n && LIVE.has(await queue.getJobState(`${d.eventId}-${d.sequence - 1n}`))) {
        await store.releaseDispatch(d.eventId, d.token, 'still_queued')
        continue
      }
      await queue.add(d.task, { eventId: d.eventId }, { jobId: `${d.eventId}-${d.sequence}`, attempts: 1, removeOnComplete: { age: 86_400, count: 1000 }, removeOnFail: { age: 7 * 86_400 } })
      await store.releaseDispatch(d.eventId, d.token, 'enqueued')
    } catch {
      log('warn', 'DISPATCH_ENQUEUE_FAILED', { eventId: d.eventId })
      await store.releaseDispatch(d.eventId, d.token, 'failed')
    }
  }
}

// Ticks never overlap; each also refreshes the healthcheck file (Docker checks its age).
function every(ms: number, name: string, fn: () => Promise<unknown>) {
  let busy = false
  return setInterval(() => {
    if (busy) return
    busy = true
    fn().then(() => writeFileSync('/tmp/worker-alive', String(Date.now())), () => log('error', `${name}_FAILED`)).finally(() => { busy = false })
  }, ms)
}
// Morning scheduler: at system_settings.morning_message_time (JST, M-17) every in-use Talent gets that day's run.
// Idempotent (one operation per Talent per day), so every tick may call it and two workers cannot double-create.
// ponytail: one sweep per day per process; a Talent that becomes in_use after the morning time starts the next day.
let sweptDay = ''
async function morning() {
  const m = await store.morningDue()
  if (!m.due || m.day === sweptDay) return
  const runs = await store.scheduleDaily(m.day)
  sweptDay = m.day
  log('info', 'MORNING_SCHEDULED', { day: m.day, talents: runs.length })
}
const timers = [
  every(30_000, 'MORNING', morning),
  every(1_000, 'DISPATCH', dispatch),
  every(10_000, 'RECONCILE', async () => { const r = await store.reconcile(); if (r.released || r.unknown || r.dispatch) log('info', 'RECONCILED', r) }),
]
log('info', 'WORKER_STARTED', { queue: QUEUE, prefix, model: run.model, concurrency: env.AI_WORKER_CONCURRENCY, usagePriced: !!price, inputAudit: audit ? env.AI_INPUT_AUDIT_DIR : false })

// §11.3: stop taking work, let the running job finish (heartbeat keeps going), then close Redis and DB. Hard deadline 85 s.
let stopping = false
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => {
  if (stopping) return
  stopping = true
  timers.forEach(clearInterval)
  setTimeout(() => process.exit(1), 85_000).unref()
  void (async () => {
    await worker.close()
    await queue.close()
    workerRedis.disconnect(); dispatchRedis.disconnect()
    await db.$disconnect()
    process.exit(0)
  })()
})
