import type { ModelMessage } from 'ai'
import type { Database } from '../../infra/database/client.ts'
import { AppError } from '../../core/errors.ts'
import { decisionResult, type ChangeService } from './changes.ts'
import { systemPrompt } from './context.ts'
import { classifyModelError, type ModelGateway, type StepOut, type ToolCallOut } from './model.ts'
import { LeaseLost, type Claim, type Finish, type RunStore, type StepRow } from './store.ts'
import { execute, toolLabel, toolsFor, WRITE_TOOLS } from './tools.ts'

// One BullMQ job = one look at a wake event (report §5.1). The loop persists each model output BEFORE running its tools,
// each tool result with its command, and resumes from the ledger after a crash, a lease loss or a confirmation.
export type RunnerConfig = { maxModelSteps: number; maxToolCalls: number; computeMs: number; modelTimeoutMs: number; maxOutputTokens: number; heartbeatMs: number
  writesEnabled: boolean; price: { inputPerMTok: number; outputPerMTok: number; currency: string } | null }
export type RunnerDeps = { db: Database; store: RunStore; changes: ChangeService; gateway: ModelGateway; cfg: RunnerConfig }
type Saved = { messages: ModelMessage[]; text: string; toolCalls: ToolCallOut[] }
export const MAX_REPLY = 4000
const PROBLEM = new Set(['denied', 'invalid', 'conflict', 'unavailable', 'failed'])

export async function runEvent(d: RunnerDeps, eventId: string): Promise<string> {
  const c = await d.store.claim(eventId)
  if (c === 'nothing') return 'nothing' // stale/redelivered job: the DB decides, the job just ends
  const lost = new AbortController()
  let cancel = false
  const beat = setInterval(() => { void d.store.heartbeat(c).then(s => { if (s === 'lost') lost.abort(); if (s === 'cancel') cancel = true }, () => lost.abort()) }, d.cfg.heartbeatMs)
  try { return await loop(d, c, lost.signal, () => cancel) }
  catch (e) { if (e instanceof LeaseLost) return 'lease_lost'; throw e }
  finally { clearInterval(beat) }
}

async function loop(d: RunnerDeps, c: Claim, lost: AbortSignal, cancelled: () => boolean): Promise<string> {
  const steps = [...c.steps], deadline = Date.now() + d.cfg.computeMs
  const end = async (o: Finish) => (await d.store.finish(c, o)) ? o.kind : 'lease_lost'
  const nextSeq = () => (steps.at(-1)?.sequence ?? 0) + 1
  for (;;) {
    if (lost.aborted) return 'lease_lost'
    if (cancelled()) return end({ kind: 'cancelled', code: 'CANCELLED' })
    if (Date.now() > deadline) return end({ kind: 'failed', code: 'MODEL_LIMIT_REACHED' })
    const last = steps.filter(s => s.kind === 'model').at(-1)
    if (last?.state === 'succeeded') {
      const out = last.output as Saved
      for (const call of out.toolCalls) {
        const done = steps.find(s => s.kind === 'tool' && s.sourceModelStepId === last.id && s.callId === call.id)
        if (done?.state === 'waiting') { // claimed again while a proposal was open (e.g. requeued): decide from the proposal, never prepare twice
          const id = (done.output as { proposalId: string }).proposalId, p = await d.store.proposalState(id)
          if (p.state === 'prepared' && !p.expired) return (await d.store.resuspend(c, id)) ? 'waiting_confirmation' : 'lease_lost'
          const output = decisionResult(id, p.state === 'confirmed' || p.state === 'consumed' ? 'confirmed' : p.state === 'rejected' ? 'rejected' : 'expired')
          if (!await d.store.resolveStep(c, done.id, output)) return 'lease_lost'
          Object.assign(done, { state: 'succeeded', output })
        }
        if (done && confirmedNotSaved(done)) { // report §2.3 step 6: after the person confirmed, the SERVICE commits (not the model)
          if (!await commitConfirmed(d, c, done)) return 'lease_lost'
          continue
        }
        if (done) continue // committed before a crash: reuse its result, never run it again
        if (steps.filter(s => s.kind === 'tool').length >= d.cfg.maxToolCalls) return end({ kind: 'failed', code: 'MODEL_LIMIT_REACHED' })
        const r = await execute(call, { c, db: d.db, store: d.store, changes: d.changes, sequence: nextSeq(), sourceModelStepId: last.id, writesEnabled: d.cfg.writesEnabled })
        steps.push(r.step)
        if (r.waiting) return 'waiting_confirmation'
        if (r.stop) return end({ kind: 'failed', code: r.stop }) // actor disabled: the model may not continue calling tools
      }
      if (!out.toolCalls.length) return end(await final(d, c, steps, out.text))
    }
    // New model step. Every call counts, also failed/unknown ones (each may have been charged).
    if (steps.filter(s => s.kind === 'model').length >= d.cfg.maxModelSteps) return end({ kind: 'failed', code: 'MODEL_LIMIT_REACHED' })
    const seq = nextSeq(), id = await d.store.beginModelStep(c, seq, d.gateway.provider, d.gateway.model)
    if (!id) return 'lease_lost'
    let out: StepOut
    try {
      out = await d.gateway.step({ system: systemPrompt(c.snapshot), messages: continuation(c, steps), tools: toolsFor(c.channel, d.cfg.writesEnabled),
        signal: AbortSignal.any([lost, AbortSignal.timeout(d.cfg.modelTimeoutMs)]), maxOutputTokens: d.cfg.maxOutputTokens })
    } catch (e) {
      if (lost.aborted) return 'lease_lost' // the reconciler turns the 'calling' step into unknown
      const k = classifyModelError(e)
      if (!await d.store.endModelStep(c, id, { state: k.kind, errorCode: k.code })) return 'lease_lost'
      return end({ kind: k.kind, code: k.code }) // no automatic re-call after 'calling' (report §5.2)
    }
    const saved: Saved = { messages: out.messages, text: out.text, toolCalls: out.toolCalls }
    const p = d.cfg.price, cost = p && out.inputTokens !== undefined && out.outputTokens !== undefined
      ? { amount: (out.inputTokens * p.inputPerMTok + out.outputTokens * p.outputPerMTok) / 1_000_000, currency: p.currency } : null
    if (!await d.store.endModelStep(c, id, { state: 'succeeded', output: saved, requestRef: out.requestId, inputTokens: out.inputTokens, outputTokens: out.outputTokens, cachedTokens: out.cachedTokens, cost })) return 'lease_lost'
    steps.push({ id, sequence: seq, kind: 'model', state: 'succeeded', sourceModelStepId: null, callId: null, toolName: null, input: null, output: saved, errorCode: null })
  }
}

const confirmedNotSaved = (s: StepRow) => s.state === 'succeeded' && (s.output as { data?: { decision?: string; receipt?: unknown } })?.data?.decision === 'confirmed' && !(s.output as { data: { receipt?: unknown } }).data.receipt
// Separate transaction that consumes the approval once (idempotent per proposal); the step now holds the receipt the model reads.
async function commitConfirmed(d: RunnerDeps, c: Claim, s: StepRow): Promise<boolean> {
  if (c.actor.kind !== 'manager') return true
  const proposalId = (s.output as { data: { proposalId: string } }).data.proposalId
  try {
    await d.changes.commit(c.actor, proposalId, { inTx: async (tx, r) => {
      const output = { kind: 'ok', data: { proposalId, decision: 'confirmed', saved: true, receipt: r }, receipt: { commandId: r.commandId, changed: r.changed } }
      await d.store.setToolResult(tx, c, s.id, 'succeeded', output); Object.assign(s, { output })
    } })
  } catch (e) {
    if (e instanceof LeaseLost) return false
    const code = e instanceof AppError ? e.code : 'TOOL_FAILED'
    const output = { kind: code === 'ACTOR_DISABLED' ? 'denied' : 'conflict', code, messageKey: 'agent.tool.' + code.toLowerCase(), retryable: false }
    await d.store.setToolResult(null, c, s.id, output.kind, output, code); Object.assign(s, { output, state: output.kind, errorCode: code })
  }
  return true
}

// History + every succeeded model step's items + a result for EVERY tool call id (report §5.1 continuation).
export function continuation(c: Pick<Claim, 'history'>, steps: StepRow[]): ModelMessage[] {
  const msgs: ModelMessage[] = c.history.map(h => ({ role: h.role, content: h.body }))
  for (const m of steps.filter(s => s.kind === 'model' && s.state === 'succeeded')) {
    const out = m.output as Saved
    msgs.push(...out.messages)
    if (out.toolCalls.length) msgs.push({ role: 'tool', content: out.toolCalls.map(call => {
      const s = steps.find(t => t.kind === 'tool' && t.sourceModelStepId === m.id && t.callId === call.id)
      return { type: 'tool-result' as const, toolCallId: call.id, toolName: call.name, output: { type: 'json' as const, value: (s?.output ?? { kind: 'unavailable', code: 'NO_RESULT' }) as never } }
    }) })
  }
  return msgs
}

// Report §5.1: a run that prepared/wrote or met a denial shows a backend template built from receipts, never the model's own
// sentence about what was saved. A run with reads only is answer_only and shows the model text.
async function final(d: RunnerDeps, c: Claim, steps: StepRow[], text: string): Promise<Finish> {
  const tools = steps.filter(s => s.kind === 'tool')
  if (!tools.some(s => WRITE_TOOLS.has(s.toolName!) || PROBLEM.has(s.state))) {
    const t = text.trim()
    return t && t.length <= MAX_REPLY ? { kind: 'succeeded', body: t, completion: 'answer_only' } : { kind: 'failed', code: 'OUTPUT_INVALID' }
  }
  const receipts = await d.store.receipts(c.runId), saved = new Set(receipts.map(r => r.targetLabel))
  const lines = receipts.map(r => `✅ 保存しました: ${r.targetLabel}(バージョン ${r.resourceVersion})`)
  const why: Record<string, string> = { rejected: 'マネージャーが保存しませんでした', expired: '確認の期限が切れました', conflicted: 'ほかの変更が先に保存されました。最新の内容を確認してください', confirmed: '確認済みですが未保存です。画面の「保存」から保存できます', prepared: '確認待ちです' }
  for (const p of await d.store.proposalsOf(c.runId)) if (p.state !== 'consumed' && !saved.has(p.target_label)) lines.push(`⏸ 保存していません: ${p.target_label}(${why[p.state] ?? p.state})`)
  // An invalid call the model corrected (same tool succeeded later) is not reported as a failure.
  const fixed = (s: StepRow) => s.state === 'invalid' && tools.some(t => t.toolName === s.toolName && t.sequence > s.sequence && (t.state === 'succeeded' || t.state === 'waiting'))
  for (const s of tools.filter(t => PROBLEM.has(t.state) && !fixed(t))) lines.push(`⚠ 実行できませんでした: ${toolLabel(s.toolName!)}(${s.errorCode ?? s.state})`)
  if (!lines.length) lines.push('変更はありませんでした。')
  return { kind: 'succeeded', body: lines.join('\n'), completion: 'action_result' }
}
