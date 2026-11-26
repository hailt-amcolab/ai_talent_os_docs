import { randomUUID } from 'node:crypto'
import type { Database } from '../../infra/database/client.ts'
import { AppError } from '../../core/errors.ts'
import { sha256 } from '../../core/hash.ts'
import { managerActor, talentActor, type Actor } from '../../control/actor.ts'
import type { Tx } from '../../control/tx.ts'
import { rateLimit } from '../../control/rate-limit.ts'

// Conversations and agent runs (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §6, ADR-07). Run-level recovery: lease on the run,
// no step ledger. API side writes run + operation + outbox in ONE transaction; the worker claims, heartbeats, finishes.
export type Channel = 'talent' | 'manager_ui'
export type RunState = 'pending' | 'running' | 'succeeded' | 'failed' | 'cancelled'
export const BODY_MAX = 1000
export const LEASE_SECONDS = 60
const DISPATCH_LEASE_SECONDS = 15, REDISPATCH_SECONDS = 30, MAX_CLAIMS = 2
export const EVENT = 'agent.run.requested'

export type Receipt = { commandId: string; commandType: string; targetLabel: string; changed: boolean; resultVersion: string | null; createdAt: string }
export type ProposalSummary = { id: string; commandType: string; targetLabel: string; state: string; expiresAt: string }
export type RunView = { id: string; conversationId: string; version: string; state: RunState; completionKind: 'answer_only' | 'action_result' | null
  finalText: string | null; receipts: Receipt[]; proposals: ProposalSummary[]; errorCode: string | null; retryAfterMs: number | null }
export type MessageView = { id: string; sequence: string; role: 'user' | 'assistant'; text: string; createdAt: string; runId: string | null; source: 'sdk' | 'control_receipt' | 'pending' }
export type Claim = { runId: string; operationId: string; eventId: string; conversationId: string; channel: Channel; actor: Actor; inputText: string; token: string }
export type Usage = { model: string; requestRef: string | null; inputTokens: number; outputTokens: number; cachedTokens: number; reasoningTokens: number
  cost: { amount: number; currency: string } | null }
export type Outcome = { state: 'succeeded'; text: string; completion: 'answer_only' | 'action_result' } | { state: 'failed' | 'cancelled'; code: string }

export class ConversationStore {
  private readonly db: Database; private readonly limits: { perMinute: number; perDay: number }
  constructor(db: Database, limits = { perMinute: 10, perDay: 200 }) { this.db = db; this.limits = limits }

  // ---- API side
  async createConversation(a: Actor, channel: Channel, requestKey: string) {
    const talentId = a.kind === 'talent' ? a.talentId : null
    const [row] = await this.db.$queryRaw<Array<{ id: string; version: bigint; channel: Channel; created: boolean }>>`
      WITH ins AS (INSERT INTO app_private.agent_conversations(actor_user_id,channel,talent_id,request_key) VALUES(${a.userId}::uuid,${channel},${talentId}::uuid,${requestKey}::uuid)
        ON CONFLICT (actor_user_id,request_key) DO NOTHING RETURNING id,version,channel)
      SELECT id::text,version,channel,true AS created FROM ins
      UNION ALL SELECT id::text,version,channel,false FROM app_private.agent_conversations WHERE actor_user_id=${a.userId}::uuid AND request_key=${requestKey}::uuid AND NOT EXISTS (SELECT 1 FROM ins)`
    if (row.channel !== channel) throw new AppError('REQUEST_KEY_REUSED', 409)
    return { conversationId: row.id, version: String(row.version), created: row.created }
  }

  // Submit: run + operation + outbox in one transaction. Same key + same text → the same run; same key, other text → 409.
  async submit(a: Actor, channel: Channel, conversationId: string, requestKey: string, body: string): Promise<RunView> {
    const text = body.trim()
    if (!text || text.length > BODY_MAX) throw new AppError('INPUT_INVALID', 422)
    const hash = sha256(text)
    const runId = await this.db.$transaction(async tx => {
      const [conv] = await tx.$queryRaw<unknown[]>`SELECT 1 FROM app_private.agent_conversations WHERE id=${conversationId}::uuid AND actor_user_id=${a.userId}::uuid AND channel=${channel} FOR UPDATE`
      if (!conv) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
      const [old] = await tx.$queryRaw<Array<{ id: string; input_hash: string }>>`SELECT id::text,input_hash FROM app_private.agent_runs WHERE conversation_id=${conversationId}::uuid AND actor_user_id=${a.userId}::uuid AND request_key=${requestKey}::uuid`
      if (old) { if (old.input_hash !== hash) throw new AppError('REQUEST_KEY_REUSED', 409); return old.id }
      if (a.kind === 'talent' && a.status !== 'in_use') throw new AppError('ACCOUNT_NOT_ACTIVE', 409)
      // Counted only for a new message (an idempotent retry returned above). Same transaction: a refused message costs nothing.
      await rateLimit(tx, `agent.msg.minute:${a.userId}`, this.limits.perMinute, 60)
      await rateLimit(tx, `agent.msg.day:${a.userId}`, this.limits.perDay, 86_400)
      const [busy] = await tx.$queryRaw<unknown[]>`SELECT 1 FROM app_private.agent_runs WHERE conversation_id=${conversationId}::uuid AND state IN ('pending','running')`
      if (busy) throw new AppError('RUN_BUSY', 409)
      const talentId = a.kind === 'talent' ? a.talentId : null
      const [op] = await tx.$queryRaw<Array<{ id: string }>>`INSERT INTO app_private.domain_operations(actor_auth_user_id,operation_key,kind,talent_id,payload_hash)
        VALUES(${a.userId}::uuid,${`agent.run:${conversationId}:${requestKey}`},'agent.run',${talentId}::uuid,${hash}) RETURNING id::text`
      const [ev] = await tx.$queryRaw<Array<{ id: string }>>`INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES(${op.id}::uuid,1,${EVENT}) RETURNING id::text`
      const [run] = await tx.$queryRaw<Array<{ id: string }>>`INSERT INTO app_private.agent_runs(operation_id,event_id,conversation_id,actor_user_id,channel,talent_id,request_key,input_hash,input_text)
        VALUES(${op.id}::uuid,${ev.id}::uuid,${conversationId}::uuid,${a.userId}::uuid,${channel},${talentId}::uuid,${requestKey}::uuid,${hash},${text}) RETURNING id::text`
      return run.id
    })
    return this.runView(a, channel, runId)
  }

  // Messages = user/assistant session items + inputs of runs the SDK has not written yet (pending, or failed before writing).
  async messages(a: Actor, channel: Channel, conversationId: string, after: bigint, limit: number) {
    await this.owned(conversationId, a, channel)
    const rows = await this.db.$queryRaw<Array<{ id: string; sequence: bigint; role: 'user' | 'assistant'; text: string; created_at: Date; run_id: string | null; source: 'sdk' | 'control_receipt' }>>`
      SELECT id::text,sequence,role,display_text AS text,created_at,run_id::text,source FROM app_private.agent_session_items
      WHERE conversation_id=${conversationId}::uuid AND discarded_at IS NULL AND kind='message' AND role IN ('user','assistant') AND coalesce(display_text,'')<>''
        AND sequence>${after} ORDER BY sequence LIMIT ${limit + 1}`
    // A run that wrote/proposed/was refused shows the backend text (final_text), never the model's own claim (AI_RUNTIME_DESIGN.md §2.6):
    // its last assistant item carries final_text, earlier assistant items of that run are hidden.
    const actionRuns = new Map((await this.db.$queryRaw<Array<{ id: string; final_text: string }>>`SELECT id::text,final_text FROM app_private.agent_runs
      WHERE conversation_id=${conversationId}::uuid AND completion_kind='action_result'`).map(r => [r.id, r.final_text]))
    const page = rows.slice(0, limit), lastOf = new Map<string, string>()
    for (const r of page) if (r.role === 'assistant' && r.run_id && actionRuns.has(r.run_id)) lastOf.set(r.run_id, r.id)
    const items: MessageView[] = page.filter(r => !(r.role === 'assistant' && r.run_id && actionRuns.has(r.run_id) && lastOf.get(r.run_id) !== r.id))
      .map(r => ({ id: r.id, sequence: String(r.sequence), role: r.role, text: r.role === 'assistant' && r.run_id && actionRuns.has(r.run_id) ? actionRuns.get(r.run_id)! : r.text,
        createdAt: r.created_at.toISOString(), runId: r.run_id, source: r.source }))
    const pending = await this.db.$queryRaw<Array<{ id: string; input_text: string; created_at: Date }>>`
      SELECT r.id::text,r.input_text,r.created_at FROM app_private.agent_runs r WHERE r.conversation_id=${conversationId}::uuid
        AND NOT EXISTS (SELECT 1 FROM app_private.agent_session_items s WHERE s.run_id=r.id AND s.kind='message' AND s.role='user') ORDER BY r.created_at DESC LIMIT 5`
    return { items, nextAfter: page.at(-1) ? String(page.at(-1)!.sequence) : String(after), hasMore: rows.length > limit,
      pending: pending.reverse().map(p => ({ id: p.id, sequence: '', role: 'user' as const, text: p.input_text, createdAt: p.created_at.toISOString(), runId: p.id, source: 'pending' as const })) }
  }

  async runs(a: Actor, channel: Channel, conversationId: string) {
    await this.owned(conversationId, a, channel)
    const ids = await this.db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM app_private.agent_runs WHERE conversation_id=${conversationId}::uuid ORDER BY created_at DESC,id DESC LIMIT 20`
    return Promise.all(ids.map(r => this.runView(a, channel, r.id)))
  }

  async runView(a: Actor, channel: Channel, runId: string): Promise<RunView> {
    const [r] = await this.db.$queryRaw<Array<{ id: string; conversation_id: string; version: bigint; state: RunState; completion_kind: RunView['completionKind']; final_text: string | null; error_code: string | null }>>`
      SELECT id::text,conversation_id::text,version,state,completion_kind,final_text,error_code FROM app_private.agent_runs
      WHERE id=${runId}::uuid AND actor_user_id=${a.userId}::uuid AND channel=${channel}`
    if (!r) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
    const receipts = (await this.db.$queryRaw<Array<{ receipt: Receipt }>>`SELECT receipt FROM app_private.business_commands WHERE run_id=${runId}::uuid ORDER BY created_at`).map(x => x.receipt)
    const proposals = (await this.db.$queryRaw<Array<{ id: string; command_type: string; target_label: string; state: string; expires_at: Date; expired: boolean }>>`
      SELECT id::text,command_type,target_label,state,expires_at,expires_at<=now() AS expired FROM app_private.business_proposals WHERE run_id=${runId}::uuid ORDER BY created_at`)
      .map(p => ({ id: p.id, commandType: p.command_type, targetLabel: p.target_label, state: p.state === 'prepared' && p.expired ? 'expired' : p.state, expiresAt: p.expires_at.toISOString() }))
    return { id: r.id, conversationId: r.conversation_id, version: String(r.version), state: r.state, completionKind: r.completion_kind, finalText: r.final_text,
      receipts, proposals, errorCode: r.error_code, retryAfterMs: r.state === 'pending' || r.state === 'running' ? 1000 : null }
  }

  // Pending → cancelled now; running → a cancel request the worker sees on its next heartbeat (no committed command is undone).
  async cancel(a: Actor, channel: Channel, runId: string): Promise<RunView> {
    await this.runView(a, channel, runId)
    await this.db.$transaction(async tx => {
      const [r] = await tx.$queryRaw<Array<{ state: RunState; operation_id: string; event_id: string }>>`SELECT state,operation_id::text,event_id::text FROM app_private.agent_runs WHERE id=${runId}::uuid FOR UPDATE`
      if (r.state === 'running') await tx.$executeRaw`UPDATE app_private.agent_runs SET cancel_requested_at=now(),version=version+1 WHERE id=${runId}::uuid AND cancel_requested_at IS NULL`
      else if (r.state === 'pending') await close(tx, { runId, operationId: r.operation_id, eventId: r.event_id }, { state: 'cancelled', code: 'CANCELLED' })
    })
    return this.runView(a, channel, runId)
  }

  private async owned(conversationId: string, a: Actor, channel: Channel) {
    const [c] = await this.db.$queryRaw<unknown[]>`SELECT 1 FROM app_private.agent_conversations WHERE id=${conversationId}::uuid AND actor_user_id=${a.userId}::uuid AND channel=${channel}`
    if (!c) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
  }

  // ---- Dispatcher (outbox → BullMQ). Holds only the outbox lease; Redis accepting a job is not completion.
  async leaseDue(limit: number): Promise<Array<{ eventId: string; sequence: bigint; token: string }>> {
    const rows = await this.db.$queryRaw<Array<{ id: string; delivery_sequence: bigint; lease_token: string }>>`
      UPDATE app_private.outbox_events o SET state='leased',lease_token=gen_random_uuid(),lease_until=now()+(${DISPATCH_LEASE_SECONDS}::int * interval '1 second'),
        delivery_sequence=o.delivery_sequence+1,attempts=o.attempts+1,updated_at=now()
      WHERE o.id IN (SELECT o2.id FROM app_private.outbox_events o2 JOIN app_private.agent_runs r ON r.event_id=o2.id AND r.state='pending'
        WHERE o2.state='pending' AND o2.event_type=${EVENT} AND o2.available_at<=now() AND o2.next_dispatch_at<=now() ORDER BY o2.next_dispatch_at,o2.id LIMIT ${limit} FOR UPDATE OF o2 SKIP LOCKED)
      RETURNING o.id::text,o.delivery_sequence,o.lease_token::text`
    return rows.map(r => ({ eventId: r.id, sequence: r.delivery_sequence, token: r.lease_token }))
  }
  async releaseDispatch(eventId: string, token: string, outcome: 'enqueued' | 'failed' | 'still_queued') {
    await this.db.$executeRaw`UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,updated_at=now(),
        delivery_sequence=delivery_sequence-${outcome === 'still_queued' ? 1 : 0}::int, last_dispatched_at=CASE WHEN ${outcome === 'enqueued'} THEN now() ELSE last_dispatched_at END,
        next_dispatch_at=now()+(${outcome === 'failed' ? 5 : REDISPATCH_SECONDS}::int * interval '1 second')
      WHERE id=${eventId}::uuid AND state='leased' AND lease_token=${token}::uuid`
  }

  // ---- Worker
  async claim(eventId: string): Promise<Claim | 'nothing'> {
    return this.db.$transaction(async tx => {
      const [r] = await tx.$queryRaw<Array<{ id: string; operation_id: string; state: RunState; conversation_id: string; channel: Channel; actor_user_id: string; talent_id: string | null; input_text: string; cancel: boolean }>>`
        SELECT id::text,operation_id::text,state,conversation_id::text,channel,actor_user_id::text,talent_id::text,input_text,cancel_requested_at IS NOT NULL AS cancel
        FROM app_private.agent_runs WHERE event_id=${eventId}::uuid FOR UPDATE`
      if (!r || r.state !== 'pending') return 'nothing' // stale / redelivered job: the DB decides
      const ids = { runId: r.id, operationId: r.operation_id, eventId }
      if (r.cancel) { await close(tx, ids, { state: 'cancelled', code: 'CANCELLED' }); return 'nothing' }
      let actor: Actor | null = null
      try { actor = r.channel === 'talent' ? await talentActor(tx, r.actor_user_id) : await managerActor(tx, r.actor_user_id) } catch { /* refused below */ }
      if (!actor || (actor.kind === 'talent' && (actor.status !== 'in_use' || actor.talentId !== r.talent_id))) { await close(tx, ids, { state: 'failed', code: 'ACTOR_DISABLED' }); return 'nothing' }
      const token = randomUUID()
      await tx.$executeRaw`UPDATE app_private.agent_runs SET state='running',lease_token=${token}::uuid,lease_until=now()+(${LEASE_SECONDS}::int * interval '1 second'),heartbeat_at=now(),
        claims=claims+1,version=version+1 WHERE id=${r.id}::uuid`
      await tx.$executeRaw`UPDATE app_private.domain_operations SET state='running',step='running',version=version+1,updated_at=now() WHERE id=${r.operation_id}::uuid AND state IN ('accepted','running')`
      return { ...ids, conversationId: r.conversation_id, channel: r.channel, actor, inputText: r.input_text, token }
    })
  }
  // Recorded BEFORE the first model call: from here a lost worker means "the model may have been called" → no requeue.
  async markStarted(c: Claim, meta: { manifest: unknown; promptVersion: string; model: string }): Promise<boolean> {
    return 1 === await this.db.$executeRaw`UPDATE app_private.agent_runs SET model_started_at=now(),context_manifest=${JSON.stringify(meta.manifest)}::jsonb,prompt_version=${meta.promptVersion},model=${meta.model},version=version+1
      WHERE id=${c.runId}::uuid AND state='running' AND lease_token=${c.token}::uuid`
  }
  async heartbeat(c: Claim): Promise<'ok' | 'lost' | 'cancel'> {
    const [r] = await this.db.$queryRaw<Array<{ cancel: boolean }>>`UPDATE app_private.agent_runs SET lease_until=now()+(${LEASE_SECONDS}::int * interval '1 second'),heartbeat_at=now(),version=version+1
      WHERE id=${c.runId}::uuid AND state='running' AND lease_token=${c.token}::uuid RETURNING cancel_requested_at IS NOT NULL AS cancel`
    return !r ? 'lost' : r.cancel ? 'cancel' : 'ok'
  }
  // Fenced: a worker that lost its lease cannot finish. Usage rows land with the outcome in one transaction.
  async finish(c: Claim, o: Outcome, usage: Usage[], traceId: string | null): Promise<boolean> {
    return this.db.$transaction(async tx => {
      const [own] = await tx.$queryRaw<unknown[]>`SELECT 1 FROM app_private.agent_runs WHERE id=${c.runId}::uuid AND state='running' AND lease_token=${c.token}::uuid FOR UPDATE`
      if (!own) return false
      const talentId = c.actor.kind === 'talent' ? c.actor.talentId : null, task = c.channel === 'talent' ? 'agent.talent' : 'agent.manager'
      // Agent tokens are paid by Adesso (QA101); the Talent is kept for attribution when there is one.
      for (const u of usage) await tx.$executeRaw`INSERT INTO public.ai_usage_events(talent_id,model,input_tokens,output_tokens,cost_amount,cost_currency,run_id,request_ref,cached_input_tokens,reasoning_tokens,payer,task_key)
        VALUES(${talentId}::uuid,${u.model},${u.inputTokens},${u.outputTokens},${u.cost?.amount ?? null},${u.cost?.currency ?? null},${c.runId}::uuid,${u.requestRef},${u.cachedTokens},${u.reasoningTokens},'adesso',${task})`
      if (traceId) await tx.$executeRaw`UPDATE app_private.agent_runs SET trace_id=${traceId},version=version+1 WHERE id=${c.runId}::uuid`
      await close(tx, c, o)
      return true
    })
  }

  // Reconciler: lost leases. Never started the model → back to pending (at most MAX_CLAIMS claims); started → WORKER_LOST.
  async reconcile(limit = 20): Promise<{ requeued: number; lost: number; dispatch: number }> {
    const dispatch = await this.db.$executeRaw`UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,next_dispatch_at=now(),updated_at=now()
      WHERE state='leased' AND lease_until<now() AND event_type=${EVENT}`
    const expired = await this.db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM app_private.agent_runs WHERE state='running' AND lease_until<now() ORDER BY lease_until LIMIT ${limit}`
    let requeued = 0, lost = 0
    for (const e of expired) await this.db.$transaction(async tx => {
      const [r] = await tx.$queryRaw<Array<{ operation_id: string; event_id: string; started: boolean; claims: number }>>`
        SELECT operation_id::text,event_id::text,model_started_at IS NOT NULL AS started,claims FROM app_private.agent_runs WHERE id=${e.id}::uuid AND state='running' AND lease_until<now() FOR UPDATE`
      if (!r) return
      if (!r.started && r.claims < MAX_CLAIMS) {
        await tx.$executeRaw`UPDATE app_private.agent_runs SET state='pending',lease_token=NULL,lease_until=NULL,heartbeat_at=NULL,version=version+1 WHERE id=${e.id}::uuid`
        await tx.$executeRaw`UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,next_dispatch_at=now(),updated_at=now() WHERE id=${r.event_id}::uuid`
        requeued++
      } else { await close(tx, { runId: e.id, operationId: r.operation_id, eventId: r.event_id }, { state: 'failed', code: 'WORKER_LOST' }); lost++ }
    })
    return { requeued, lost, dispatch }
  }
}

async function close(tx: Tx, ids: { runId: string; operationId: string; eventId: string }, o: Outcome) {
  const code = o.state === 'succeeded' ? null : o.code
  await tx.$executeRaw`UPDATE app_private.agent_runs SET state=${o.state},error_code=${code},final_text=${o.state === 'succeeded' ? o.text : null},completion_kind=${o.state === 'succeeded' ? o.completion : null},
    lease_token=NULL,lease_until=NULL,finished_at=now(),version=version+1 WHERE id=${ids.runId}::uuid`
  await tx.$executeRaw`UPDATE app_private.domain_operations SET state=${o.state === 'succeeded' ? 'completed' : 'failed'},step=NULL,last_error_code=${code},version=version+1,updated_at=now() WHERE id=${ids.operationId}::uuid`
  await tx.$executeRaw`UPDATE app_private.outbox_events SET state=${o.state === 'succeeded' ? 'done' : 'failed'},lease_token=NULL,lease_until=NULL,last_error_code=${code},updated_at=now() WHERE id=${ids.eventId}::uuid`
}
