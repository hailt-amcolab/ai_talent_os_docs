import { Runner, MaxTurnsExceededError, ModelRefusalError, ModelTimeoutError, InputGuardrailTripwireTriggered, OutputGuardrailTripwireTriggered, type Model, type Usage as SdkUsage } from '@openai/agents'
import type { Database } from '../../infra/database/client.ts'
import type { ProposalService } from '../../control/proposals.ts'
import type { ConversationStore, Claim, Outcome, Usage } from '../../modules/coach-conversation/store.ts'
import { agentFor } from '../agents.ts'
import { buildContext, promptOf } from '../context/builder.ts'
import { LeaseLostError, PrismaSession } from '../session/prisma-session.ts'
import { trimHistory } from '../session/history.ts'
import type { AppRunContext, ToolEvent } from '../tools/define.ts'

// One BullMQ job = one agent run on the Agents SDK (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §2.3, §6). The SDK runs the
// model/tool loop; this file only owns lease, cancel, timeout, usage, and the backend-built text of action runs.
export type RuntimeConfig = { model: string | Model; modelName: string; maxTurns: number; computeMs: number; heartbeatMs: number; maxOutputTokens: number
  reasoningEffort: 'none' | 'low' | 'medium'; writesEnabled: boolean; history: { items: number; chars: number }
  price: { inputPerMTok: number; outputPerMTok: number; currency: string } | null }
export type RuntimeDeps = { db: Database; store: ConversationStore; proposals: ProposalService; cfg: RuntimeConfig; onDelta?: (runId: string, text: string) => void }
type Abort = 'cancel' | 'lease' | 'timeout'

// Traces go to OpenAI (ADR-10): spans only, never prompts, tool arguments/results or model output — the SDK default is
// traceIncludeSensitiveData=true, so it is set here for every run. OPENAI_AGENTS_DISABLE_TRACING=1 turns tracing off (tests, ZDR).
export const traceConfig = (c: { channel: string; conversationId: string; runId: string }, promptVersion: string) => ({
  traceIncludeSensitiveData: false, workflowName: c.channel === 'talent' ? 'agent.talent' : 'agent.manager',
  groupId: c.conversationId, traceMetadata: { runId: c.runId, promptVersion },
})

export async function runAgentEvent(d: RuntimeDeps, eventId: string): Promise<string> {
  const c = await d.store.claim(eventId)
  if (c === 'nothing') return 'nothing'
  const ac = new AbortController()
  let reason: Abort | null = null
  const stop = (r: Abort) => { if (!reason) { reason = r; ac.abort() } }
  const beat = setInterval(() => { void d.store.heartbeat(c).then(s => { if (s === 'lost') stop('lease'); if (s === 'cancel') stop('cancel') }, () => stop('lease')) }, d.cfg.heartbeatMs)
  const timer = setTimeout(() => stop('timeout'), d.cfg.computeMs)
  let result: Counted | undefined
  const events: ToolEvent[] = []
  try {
    const { pack, manifest } = await buildContext(d.db, c.actor)
    if (!await d.store.markStarted(c, { manifest, promptVersion: promptOf(pack), model: d.cfg.modelName })) return 'lease_lost'
    const ctx: AppRunContext = { actor: c.actor, channel: c.channel, runId: c.runId, conversationId: c.conversationId, pack, services: { db: d.db, proposals: d.proposals }, events }
    const streamed = await new Runner(traceConfig(c, promptOf(pack))).run(agentFor(c.channel, d.cfg), c.inputText, {
      stream: true, context: ctx, maxTurns: d.cfg.maxTurns, signal: ac.signal,
      session: new PrismaSession(d.db, c.conversationId, { runId: c.runId, token: c.token }),
      sessionInputCallback: trimHistory(d.cfg.history),
      toolExecution: { maxFunctionToolConcurrency: 1 }, toolNotFoundBehavior: 'return_error_to_model',
    })
    result = streamed
    for await (const delta of streamed.toTextStream()) d.onDelta?.(c.runId, delta)
    await streamed.completed
    // An aborted stream may end WITHOUT an error (no final output): the abort reason of this runtime decides.
    if (reason || streamed.cancelled) throw new Error('ABORTED')
    if (streamed.error) throw streamed.error
    const text = String(streamed.finalOutput ?? '').trim()
    const outcome: Outcome = !text && !events.length ? { state: 'failed', code: 'OUTPUT_INVALID' } : await finalOutcome(d, c, text, events)
    return await d.store.finish(c, outcome, usageOf(d.cfg, streamed), null) ? outcome.state : 'lease_lost'
  } catch (e) {
    if (e instanceof LeaseLostError || reason === 'lease') return 'lease_lost'
    const code = reason === 'cancel' ? 'CANCELLED' : reason === 'timeout' ? 'TIMEOUT' : classify(e)
    // Partial usage of a failed run is still charged by the provider: record what the SDK counted.
    return await d.store.finish(c, { state: code === 'CANCELLED' ? 'cancelled' : 'failed', code }, result ? usageOf(d.cfg, result) : [], null) ? code : 'lease_lost'
  } finally { clearInterval(beat); clearTimeout(timer) }
}

// The abort reason of THIS runtime wins over the SDK error class (P0: an aborted stream may surface as ModelBehaviorError).
function classify(e: unknown): string {
  if (e instanceof MaxTurnsExceededError) return 'MODEL_LIMIT_REACHED'
  if (e instanceof ModelRefusalError) return 'MODEL_REFUSED'
  if (e instanceof ModelTimeoutError) return 'MODEL_TIMEOUT'
  if (e instanceof InputGuardrailTripwireTriggered || e instanceof OutputGuardrailTripwireTriggered) return 'GUARDRAIL_TRIPPED'
  const status = (e as { status?: number })?.status
  if (status === 401 || status === 403) return 'MODEL_AUTH'
  if (status === 429) return 'MODEL_RATE_LIMITED'
  if (typeof status === 'number' && status >= 500) return 'MODEL_UNAVAILABLE'
  return (e as { name?: string })?.name === 'ModelBehaviorError' ? 'MODEL_BEHAVIOR' : 'RUN_FAILED'
}

// A run that wrote, proposed or was refused shows a backend template built from the DB, never the model's own claim
// (AI_RUNTIME_DESIGN.md §2.6). A read-only run shows the model text.
async function finalOutcome(d: RuntimeDeps, c: Claim, text: string, events: ToolEvent[]): Promise<Outcome> {
  if (!events.some(e => e.writes || !e.ok)) return text.length <= 8000 ? { state: 'succeeded', text, completion: 'answer_only' } : { state: 'failed', code: 'OUTPUT_INVALID' }
  const lines: string[] = []
  for (const r of await d.db.$queryRaw<Array<{ target_label: string; result_version: bigint }>>`SELECT target_label,result_version FROM app_private.business_commands WHERE run_id=${c.runId}::uuid ORDER BY created_at`)
    lines.push(`✅ 保存しました: ${r.target_label}(バージョン ${r.result_version})`)
  for (const p of await d.db.$queryRaw<Array<{ target_label: string }>>`SELECT target_label FROM app_private.business_proposals WHERE run_id=${c.runId}::uuid AND state='prepared' ORDER BY created_at`)
    lines.push(`📝 変更案を作りました: ${p.target_label} — 下のカードで内容を確認し、「保存」を押すと保存されます`)
  // An invalid call the model corrected later (same tool succeeded afterwards) is not reported.
  events.forEach((e, i) => { if (!e.ok && !events.slice(i + 1).some(n => n.tool === e.tool && n.ok)) lines.push(`⚠ 実行できませんでした: ${e.tool}(${e.code})`) })
  if (!lines.length) lines.push('変更はありませんでした。')
  return { state: 'succeeded', text: lines.join('\n'), completion: 'action_result' }
}

// What the SDK counted, from a finished or a failed run (both shapes expose these two fields).
type Counted = { runContext: { usage: SdkUsage }; rawResponses: Array<{ responseId?: string }> }
function usageOf(cfg: RuntimeConfig, r: Counted): Usage[] {
  const u = r.runContext.usage, refs = r.rawResponses.map(x => x.responseId ?? null)
  return (u.requestUsageEntries ?? []).map((e, i) => {
    const cached = Number((e.inputTokensDetails as { cached_tokens?: number })?.cached_tokens ?? 0), reasoning = Number((e.outputTokensDetails as { reasoning_tokens?: number })?.reasoning_tokens ?? 0)
    const p = cfg.price
    return { model: cfg.modelName, requestRef: refs[i] ?? null, inputTokens: e.inputTokens, outputTokens: e.outputTokens, cachedTokens: cached, reasoningTokens: reasoning,
      cost: p ? { amount: (e.inputTokens * p.inputPerMTok + e.outputTokens * p.outputPerMTok) / 1_000_000, currency: p.currency } : null }
  })
}
