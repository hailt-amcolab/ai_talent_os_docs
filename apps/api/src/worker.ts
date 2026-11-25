import { writeFileSync } from 'node:fs'
import { Queue, Worker } from 'bullmq'
import { Redis } from 'ioredis'
import { loadEnv } from './config/env.ts'
import { connectDatabase } from './infra/database/client.ts'
import { agentServices } from './container.ts'
import { openAiGateway } from './modules/ai-coach/model.ts'
import { runEvent, type RunnerDeps } from './modules/ai-coach/runner.ts'
import { runEffects, type ProfileExporter } from './modules/ai-coach/effects.ts'
import { createOneDrive } from './modules/onedrive/connections.ts'

// Agent worker process (report §2.1, §11): outbox dispatcher + reconciler + BullMQ consumer 'agent-interactive' + OneDrive export effects.
// No HTTP server. Run: node dist/worker.js (Docker service `worker`). Never started by the API container.
const env = loadEnv()
const missing: string[] = (['REDIS_URL', 'OPENAI_API_KEY', 'AI_COACH_MODEL'] as const).filter(k => !env[k])
if (!env.ENABLE_AGENT_CORE) missing.push('ENABLE_AGENT_CORE=true')
if (missing.length) { console.error(JSON.stringify({ level: 'error', code: 'WORKER_CONFIG_MISSING', missing })); process.exit(1) }

const log = (level: 'info' | 'warn' | 'error', code: string, extra: Record<string, unknown> = {}) => console.log(JSON.stringify({ level, code, ...extra }))
const prefix = env.AI_QUEUE_PREFIX ?? `talentos-${env.NODE_ENV}`
const QUEUE = 'agent-interactive' // ponytail: one queue; add 'agent-batch' with its own concurrency when a batch task exists (report §11.1)

// ponytail: one pool (talent_runtime) for dispatcher + worker + effects (report §4.2 allows it for the first step).
const db = await connectDatabase(env.DATABASE_URL)
const { store, changes } = agentServices(env, db)
const price = env.AI_PRICE_INPUT_PER_MTOK !== undefined && env.AI_PRICE_OUTPUT_PER_MTOK !== undefined
  ? { inputPerMTok: env.AI_PRICE_INPUT_PER_MTOK, outputPerMTok: env.AI_PRICE_OUTPUT_PER_MTOK, currency: env.AI_PRICE_CURRENCY } : null
const deps: RunnerDeps = { db, store, changes, gateway: openAiGateway(env.OPENAI_API_KEY!, env.AI_COACH_MODEL!, env.OPENAI_BASE_URL), cfg: {
  maxModelSteps: env.AGENT_MODEL_MAX_STEPS, maxToolCalls: env.AGENT_MAX_TOOL_CALLS, computeMs: env.AGENT_COMPUTE_TIMEOUT_MS, modelTimeoutMs: env.AGENT_MODEL_TIMEOUT_MS,
  maxOutputTokens: 4000, heartbeatMs: 5_000, writesEnabled: env.ENABLE_AGENT_WRITES, price } }
// OneDrive export target (Profile.md in the Talent folder). Unset → effects stay pending with ONEDRIVE_NOT_CONFIGURED and retry later.
const onedrive = createOneDrive(env, db)
const exporter: ProfileExporter | null = onedrive ? async (folderId, name, md) => (await onedrive.demo()).writeText(folderId, name, md) : null

// Two Redis clients: the dispatcher fails fast, the BullMQ worker reconnects forever (maxRetriesPerRequest: null).
const dispatchRedis = new Redis(env.REDIS_URL!, { maxRetriesPerRequest: 1, enableOfflineQueue: false })
const workerRedis = new Redis(env.REDIS_URL!, { maxRetriesPerRequest: null })
for (const r of [dispatchRedis, workerRedis]) r.on('error', () => log('warn', 'REDIS_ERROR'))
const queue = new Queue(QUEUE, { connection: dispatchRedis, prefix })

// attempts=1: a job is only transport; recovery goes through the DB ledger, never a blind BullMQ retry of the agent loop.
const worker = new Worker(QUEUE, async job => {
  const result = await runEvent(deps, String(job.data.eventId))
  log('info', 'AGENT_JOB_DONE', { jobId: job.id, result })
  return result
}, { connection: workerRedis, prefix, concurrency: env.AGENT_INTERACTIVE_CONCURRENCY, lockDuration: env.AGENT_COMPUTE_TIMEOUT_MS + 30_000 })
worker.on('failed', (job, e) => log('error', 'AGENT_JOB_FAILED', { jobId: job?.id, error: e.name }))

// Dispatcher: lease due wake events, enqueue (jobId = <event>-<delivery_sequence>), release. A new job only when the previous
// one of that event is no longer live in Redis (lost after a Redis restart → re-sent from the DB intent).
const LIVE = new Set(['waiting', 'active', 'delayed', 'prioritized', 'waiting-children'])
async function dispatch() {
  for (const d of await store.leaseDue(10)) {
    try {
      if (d.sequence > 1n && LIVE.has(await queue.getJobState(`${d.eventId}-${d.sequence - 1n}`))) { await store.releaseDispatch(d.eventId, d.token, 'still_queued'); continue }
      await queue.add('agent.run.wake', { eventId: d.eventId }, { jobId: `${d.eventId}-${d.sequence}`, attempts: 1, removeOnComplete: { age: 86_400, count: 1000 }, removeOnFail: { age: 7 * 86_400 } })
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
const timers = [
  every(1_000, 'DISPATCH', dispatch),
  every(10_000, 'RECONCILE', async () => {
    const r = await store.reconcile(), expired = await changes.expireDue()
    if (r.requeued || r.unknown || r.dispatch || expired) log('info', 'RECONCILED', { ...r, expiredProposals: expired })
  }),
  every(3_000, 'EFFECTS', async () => { const r = await runEffects(store, exporter); if (Object.keys(r).length) log('info', 'EFFECTS', r) }),
]
log('info', 'WORKER_STARTED', { queue: QUEUE, prefix, model: env.AI_COACH_MODEL, concurrency: env.AGENT_INTERACTIVE_CONCURRENCY, writes: env.ENABLE_AGENT_WRITES, onedrive: !!exporter, usagePriced: !!price })

// Stop taking work, let the running job finish (heartbeat keeps going), then close Redis and DB. Hard deadline > model timeout.
let stopping = false
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => {
  if (stopping) return
  stopping = true
  timers.forEach(clearInterval)
  setTimeout(() => process.exit(1), env.AGENT_MODEL_TIMEOUT_MS + 40_000).unref()
  void (async () => {
    await worker.close()
    await queue.close()
    workerRedis.disconnect(); dispatchRedis.disconnect()
    await db.$disconnect()
    process.exit(0)
  })()
})
