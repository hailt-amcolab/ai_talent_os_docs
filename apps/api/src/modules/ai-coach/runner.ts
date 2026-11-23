import { classifyModelError, DAILY_TASK, MAX_REPLY, type Generate, type GenerateDaily } from './coach.ts'
import { contextRevision, dailyTask, hasProfile, morningMessage, NO_FILES, numbersAreKnown, systemPrompt, type ContextSource, type Results, type TalentFiles, type Trends } from './context.ts'
import { collectInputs, type AuditRecord } from './audit.ts'
import type { AiCoachStore, Claim, Outcome } from './store.ts'

// One BullMQ job = one look at an outbox event (report §4.6 steps 3–5, §9).
// Claim → read context → heartbeat → mark 'calling' → single model call → fenced commit. Never holds a DB transaction across a call.
export type RunConfig = { provider: string; model: string; timeoutMs: number; heartbeatMs: number }
export type RunDeps = {
  generate: Generate
  generateDaily: GenerateDaily
  context: ContextSource | null // OneDrive (SCD 3-1 items 2–4); null when OneDrive is not configured
  trends?: (day: string) => Promise<Trends | null> // shared daily web search (CR-05); null = not available today
  notify?: (userId: string, message: { title: string; body: string; url: string }) => Promise<unknown> // 毎朝の声かけ push
  audit?: (record: AuditRecord) => Promise<void> // AI_INPUT_AUDIT (development only)
  // Demo "no AI call" switch: replaces the models, and trends come only from what is already saved (no web search).
  simulated?: { generate: Generate; generateDaily: GenerateDaily; savedTrends: (day: string) => Promise<Trends | null> }
}
type Store = Pick<AiCoachStore, 'claim' | 'heartbeat' | 'markCalling' | 'complete' | 'results'>
const jstToday = () => new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10)

export async function runEvent(store: Store, realDeps: RunDeps, realCfg: RunConfig, eventId: string): Promise<string> {
  const claim = await store.claim(eventId)
  if (claim === 'busy' || claim === 'nothing') return claim // redelivered/out-of-order job: DB decides, job just ends
  const sim = claim.simulated ? realDeps.simulated : undefined
  if (claim.simulated && !sim) { await store.complete(claim, { kind: 'failed', code: 'SIMULATION_UNAVAILABLE', called: false }, realCfg.model); return 'failed' }
  const deps: RunDeps = sim ? { ...realDeps, generate: sim.generate, generateDaily: sim.generateDaily, trends: sim.savedTrends } : realDeps
  const cfg: RunConfig = sim ? { ...realCfg, provider: 'simulated', model: 'simulated' } : realCfg
  const lost = new AbortController()
  const beat = setInterval(() => { void store.heartbeat(claim).then(ok => { if (!ok) lost.abort() }, () => lost.abort()) }, cfg.heartbeatMs)
  const audit: AuditRecord = { claim, model: cfg.model, inputs: [], prompts: {}, notes: [] }
  let result = 'failed'
  try {
    // Context is read before 'calling': a failure here never reached the model, so the attempt is failed/not_called, not unknown.
    let files: TalentFiles, results: Results, trends: Trends | null = null
    try {
      files = claim.folderId && deps.context ? await deps.context(claim.folderId) : NO_FILES
      results = await store.results(claim.talent.talentId, claim.day ?? jstToday())
    } catch (e) {
      audit.notes.push(`context read failed: ${e instanceof Error ? e.message : String(e)}`)
      result = await store.complete(claim, { kind: 'failed', code: 'CONTEXT_UNAVAILABLE', called: false }, cfg.model) ? 'failed' : 'lease_lost'
      return result
    }
    if (claim.task === DAILY_TASK.key && deps.trends) {
      // Themes still work without news (4-1: a failed source never blocks the morning message).
      try { trends = await deps.trends(claim.day!) } catch (e) { audit.notes.push(`trends unavailable: ${e instanceof Error ? e.message : String(e)}`) }
    }
    const folderNote = !claim.folderId ? 'talents.onedrive_folder_id is NULL' : !deps.context ? 'OneDrive not configured (ONEDRIVE_AUTH_MODE)' : `OneDrive talent folder item ${claim.folderId}`
    audit.inputs = collectInputs(claim, files, results, trends, folderNote)
    const outcome = claim.task === DAILY_TASK.key
      ? await daily(store, deps, cfg, claim, files, results, trends, lost.signal, audit)
      : await chat(store, deps, cfg, claim, files, results, lost.signal, audit)
    if (outcome === 'lease_lost') return result = outcome
    // false = lease lost meanwhile: the reconciler marks it unknown; this worker must not publish anything.
    if (!await store.complete(claim, outcome, cfg.model)) return result = 'lease_lost'
    if (outcome.kind === 'succeeded') audit.message = outcome.text
    else audit.notes.push(`outcome ${outcome.kind}: ${outcome.code}`)
    if (outcome.kind === 'succeeded' && claim.task === DAILY_TASK.key && deps.notify) {
      await deps.notify(claim.userId, { title: 'AIコーチ', body: outcome.text.split('\n')[0], url: '/pwa/coach' }).catch(() => undefined) // push is best effort
    }
    return result = outcome.kind
  } finally {
    clearInterval(beat)
    if (deps.audit) { audit.result = result; await deps.audit(audit).catch(() => undefined) } // never breaks the run
  }
}

async function call<T>(store: Store, cfg: RunConfig, claim: Claim, revision: string, fn: () => Promise<T>): Promise<T | Outcome | 'lease_lost'> {
  if (!await store.markCalling(claim, cfg.provider, cfg.model, revision)) return 'lease_lost'
  try { return await fn() } catch (e) {
    const c = classifyModelError(e)
    return c.kind === 'failed' ? { kind: 'failed', code: c.code } : { kind: 'unknown', code: c.code }
  }
}
const isOutcome = (x: unknown): x is Outcome => typeof x === 'object' && x !== null && 'kind' in x

async function chat(store: Store, deps: RunDeps, cfg: RunConfig, claim: Claim, files: TalentFiles, results: Results, lost: AbortSignal, audit: AuditRecord): Promise<Outcome | 'lease_lost'> {
  const system = systemPrompt(claim.talent, files, results)
  audit.prompts = { system, messages: claim.turns.map(m => `${m.sender === 'talent' ? 'user' : 'assistant'}: ${m.body}`).join('\n') }
  const r = await call(store, cfg, claim, contextRevision(claim.task, files, results, claim.talent), () =>
    deps.generate({ system, turns: claim.turns, signal: AbortSignal.any([lost, AbortSignal.timeout(cfg.timeoutMs)]) }))
  if (r === 'lease_lost' || isOutcome(r)) return r
  audit.output = r.text
  const text = r.text.trim()
  return text && text.length <= MAX_REPLY
    ? { kind: 'succeeded', text, inputTokens: r.inputTokens, outputTokens: r.outputTokens, requestId: r.requestId, simulated: claim.simulated }
    : { kind: 'failed', code: 'OUTPUT_INVALID', usage: r } // provider charged; no reply is published
}

// SCD 3-4 B / 3-6 / 4-1 A. Without a profile (UC-01 前提) no themes are made and the model is not called.
async function daily(store: Store, deps: RunDeps, cfg: RunConfig, claim: Claim, files: TalentFiles, results: Results, trends: Trends | null, lost: AbortSignal, audit: AuditRecord): Promise<Outcome | 'lease_lost'> {
  const day = claim.day!
  if (!hasProfile(files)) {
    audit.notes.push('Profile.md is missing or has only the template headings (UC-01 前提): no themes, model not called')
    return { kind: 'succeeded', called: false, text: morningMessage(day, results, null, false), inputTokens: undefined, outputTokens: undefined }
  }
  const system = systemPrompt(claim.talent, files, results), prompt = dailyTask(day, claim.turns, trends)
  audit.prompts = { system, prompt }
  const r = await call(store, cfg, claim, contextRevision(claim.task, files, results, claim.talent, trends), () =>
    deps.generateDaily({ system, prompt, signal: AbortSignal.any([lost, AbortSignal.timeout(cfg.timeoutMs)]) }))
  if (r === 'lease_lost' || isOutcome(r)) return r
  audit.output = r.output
  const commentOk = numbersAreKnown(r.output.comment, results)
  if (!commentOk) audit.notes.push('comment contained a number not in the data: replaced by the generic sentence (3-6 acceptance 3)')
  const text = morningMessage(day, results, r.output, commentOk)
  return { kind: 'succeeded', text, themes: r.output.themes.map(t => t.title), inputTokens: r.inputTokens, outputTokens: r.outputTokens, requestId: r.requestId, simulated: claim.simulated }
}
