import { writeFileSync } from 'node:fs'
import OpenAI from 'openai'
import { Queue, Worker } from 'bullmq'
import { Redis } from 'ioredis'
import { loadEnv } from './config/env.ts'
import { connectDatabase } from './infra/database/client.ts'
import { agentServices, controlServices, runEventsFor } from './container.ts'
import { createOneDrive } from './modules/onedrive/connections.ts'
import { reclaimExports, runProfileExports, type ProfileExporter } from './modules/coach-config/export.ts'
import { DailyTopicsService } from './modules/coach-daily/service.ts'
import { runAgentEvent, type RuntimeDeps } from './ai/runtime/run-agent.ts'

// Worker process (agent_spec/ai-core/AI_CORE_ARCHITECTURE.md §10): outbox dispatchers + BullMQ consumers 'agent-interactive'
// (Agents SDK runs) and 'ai-tasks' (AI Task Mode) + scheduler + reconciler + OneDrive profile export. No HTTP server.
const env = loadEnv()
const missing: string[] = (['REDIS_URL', 'OPENAI_API_KEY', 'AI_COACH_MODEL'] as const).filter(k => !env[k])
if (!env.ENABLE_AGENT_CORE) missing.push('ENABLE_AGENT_CORE=true')
if (missing.length) { console.error(JSON.stringify({ level: 'error', code: 'WORKER_CONFIG_MISSING', missing })); process.exit(1) }
const log = (level: 'info' | 'warn' | 'error', code: string, extra: Record<string, unknown> = {}) => console.log(JSON.stringify({ level, code, ...extra }))
const prefix = env.AI_QUEUE_PREFIX ?? `talentos-${env.NODE_ENV}`

// ponytail: one pool (talent_runtime) for dispatchers + workers + effects.
const db = await connectDatabase(env.DATABASE_URL)
const events = runEventsFor(env), { proposals } = controlServices(env, db), { conversations } = agentServices(db, env, events)
const price = env.AI_PRICE_INPUT_PER_MTOK !== undefined && env.AI_PRICE_OUTPUT_PER_MTOK !== undefined
  ? { inputPerMTok: env.AI_PRICE_INPUT_PER_MTOK, outputPerMTok: env.AI_PRICE_OUTPUT_PER_MTOK, currency: env.AI_PRICE_CURRENCY } : null
// Trace settings (no sensitive data, ADR-10): traceConfig in ai/runtime/run-agent.ts.
const runtime: RuntimeDeps = { db, store: conversations, proposals, cfg: {
  model: env.AI_COACH_MODEL!, modelName: env.AI_COACH_MODEL!, maxTurns: env.AGENT_MODEL_MAX_STEPS, computeMs: env.AGENT_COMPUTE_TIMEOUT_MS, heartbeatMs: 5_000,
  maxOutputTokens: 1200, reasoningEffort: 'low', writesEnabled: env.ENABLE_AGENT_WRITES, history: { items: 30, chars: 16_000 }, price },
  onDelta: (runId, text) => events?.publish(runId, text) }
const daily = new DailyTopicsService(db, new OpenAI({ apiKey: env.OPENAI_API_KEY, baseURL: env.OPENAI_BASE_URL }) as never,
  { prepHourJst: 6, deadlineHourJst: 8, model: env.AI_COACH_MODEL!, timeoutMs: env.AGENT_MODEL_TIMEOUT_MS, price })
const onedrive = createOneDrive(env, db)
const exporter: ProfileExporter | null = onedrive ? async (folderId, name, md) => (await onedrive.demo()).writeText(folderId, name, md) : null

// Two Redis clients: dispatchers fail fast, BullMQ workers reconnect forever (maxRetriesPerRequest: null).
const dispatchRedis = new Redis(env.REDIS_URL!, { maxRetriesPerRequest: 1, enableOfflineQueue: false })
const workerRedis = new Redis(env.REDIS_URL!, { maxRetriesPerRequest: null })
for (const r of [dispatchRedis, workerRedis]) r.on('error', () => log('warn', 'REDIS_ERROR'))
type Source = { leaseDue(n: number): Promise<Array<{ eventId: string; sequence: bigint; token: string }>>; releaseDispatch(id: string, token: string, o: 'enqueued' | 'failed' | 'still_queued'): Promise<void> }
// attempts=1: a job is only transport; recovery goes through the DB, never a blind BullMQ retry.
const lanes = [
  { name: 'agent-interactive', source: conversations as Source, handle: (id: string) => runAgentEvent(runtime, id), concurrency: env.AGENT_INTERACTIVE_CONCURRENCY },
  { name: 'ai-tasks', source: daily as Source, handle: (id: string) => daily.run(id), concurrency: 2 },
].map(l => {
  const queue = new Queue(l.name, { connection: dispatchRedis, prefix })
  const worker = new Worker(l.name, async job => { const result = await l.handle(String(job.data.eventId)); log('info', 'JOB_DONE', { queue: l.name, jobId: job.id, result }); return result },
    { connection: workerRedis, prefix, concurrency: l.concurrency, lockDuration: env.AGENT_COMPUTE_TIMEOUT_MS + 30_000 })
  worker.on('failed', (job, e) => log('error', 'JOB_FAILED', { queue: l.name, jobId: job?.id, error: e.name }))
  return { ...l, queue, worker }
})

// Dispatcher: lease due events, enqueue (jobId = <event>-<delivery_sequence>), release. A new job only when the previous one of
// that event is no longer live in Redis (lost after a Redis restart → re-sent from the DB intent).
const LIVE = new Set(['waiting', 'active', 'delayed', 'prioritized', 'waiting-children'])
async function dispatch() {
  for (const l of lanes) for (const d of await l.source.leaseDue(10)) {
    try {
      if (d.sequence > 1n && LIVE.has(await l.queue.getJobState(`${d.eventId}-${d.sequence - 1n}`))) { await l.source.releaseDispatch(d.eventId, d.token, 'still_queued'); continue }
      await l.queue.add(l.name, { eventId: d.eventId }, { jobId: `${d.eventId}-${d.sequence}`, attempts: 1, removeOnComplete: { age: 86_400, count: 1000 }, removeOnFail: { age: 7 * 86_400 } })
      await l.source.releaseDispatch(d.eventId, d.token, 'enqueued')
    } catch { log('warn', 'DISPATCH_ENQUEUE_FAILED', { queue: l.name, eventId: d.eventId }); await l.source.releaseDispatch(d.eventId, d.token, 'failed') }
  }
}
function every(ms: number, name: string, fn: () => Promise<unknown>) {
  let busy = false
  return setInterval(() => {
    if (busy) return
    busy = true
    fn().then(() => writeFileSync('/tmp/worker-alive', String(Date.now())), () => log('error', `${name}_FAILED`)).finally(() => { busy = false })
  }, ms)
}
const timers = [
  every(1_000, 'DISPATCH', dispatch),
  every(60_000, 'SCHEDULE', async () => { const n = await daily.schedule(); if (n) log('info', 'SCHEDULED', { dailyTopics: n }) }),
  every(10_000, 'RECONCILE', async () => {
    const runs = await conversations.reconcile(), tasks = await daily.reconcile(), expired = await proposals.expireDue(), exports = await reclaimExports(db)
    if (runs.requeued || runs.lost || runs.dispatch || tasks || expired || exports) log('info', 'RECONCILED', { runs, tasks, expiredProposals: expired, exports })
  }),
  every(3_000, 'EFFECTS', async () => { const r = await runProfileExports(db, exporter); if (Object.keys(r).length) log('info', 'EFFECTS', r) }),
]
log('info', 'WORKER_STARTED', { queues: lanes.map(l => l.name), prefix, model: env.AI_COACH_MODEL, writes: env.ENABLE_AGENT_WRITES, onedrive: !!exporter, usagePriced: !!price })

// Stop taking work, let running jobs finish (heartbeats keep going), then close Redis and DB. Hard deadline > model timeout.
let stopping = false
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => {
  if (stopping) return
  stopping = true
  timers.forEach(clearInterval)
  setTimeout(() => process.exit(1), env.AGENT_MODEL_TIMEOUT_MS + 40_000).unref()
  void (async () => {
    for (const l of lanes) { await l.worker.close(); await l.queue.close() }
    workerRedis.disconnect(); dispatchRedis.disconnect()
    await db.$disconnect()
    process.exit(0)
  })()
})
