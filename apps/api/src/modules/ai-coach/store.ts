import { randomUUID } from 'node:crypto'
import type { Database } from '../../infra/database/client.ts'
import { AppError } from '../../core/errors.ts'
import { managerActor, talentActor, type Actor } from './access.ts'
import { wake, type Receipt, type Tx } from './changes.ts'
import { managerSnapshot, revisionOf, sha256, talentSnapshot, type Profile, type Snapshot } from './context.ts'

// Agent runs on Postgres (report §4, §10.1). Redis/BullMQ only carries event IDs; this store decides who may run what.
// Lock order: conversation → operation → outbox event → run → attempt/step. Every write after a claim is fenced by
// lease_token + attempt_no + lease_until > now() (DB clock); a worker that lost its lease writes nothing.
export type Channel = 'talent' | 'manager_ui'
export type RunState = 'pending' | 'running' | 'waiting_confirmation' | 'succeeded' | 'failed' | 'unknown' | 'cancelled'
export type EntryView = { id: string; sequence: string; role: 'user' | 'assistant'; body: string; createdAt: string }
export type RunView = { id: string; operationId: string; conversationId: string; completionKind: 'answer_only' | 'action_result' | null; state: RunState; version: string
  outputEntryId: string | null; proposalId: string | null; errorCode: string | null; receipts: Receipt[]; retryAfterMs: number | null }
export type StepRow = { id: string; sequence: number; kind: 'model' | 'tool'; state: string; sourceModelStepId: string | null; callId: string | null; toolName: string | null; input: unknown; output: unknown; errorCode: string | null }
export type Claim = { runId: string; operationId: string; eventId: string; channel: Channel; actor: Actor; token: string; attemptId: string; attemptNo: number
  snapshot: Snapshot; history: Array<{ role: 'user' | 'assistant'; body: string }>; steps: StepRow[] }
export type Finish = { kind: 'succeeded'; body: string; completion: 'answer_only' | 'action_result' } | { kind: 'failed' | 'unknown' | 'cancelled'; code: string }

export const LEASE_SECONDS = 60 // report §4.4 staging defaults: lease 60 s, heartbeat 5 s
const DISPATCH_LEASE_SECONDS = 15
const REDISPATCH_SECONDS = 30
const EFFECT_LEASE_SECONDS = 60
const HISTORY = 30
export const BODY_MAX = 1000
const TASK = { talent: { key: 'agent.talent', revision: 'agent.talent@1' }, manager_ui: { key: 'agent.manager', revision: 'agent.manager@1' } } as const

type StepDb = { id: string; sequence: number; kind: 'model' | 'tool'; state: string; source_model_step_id: string | null; call_id: string | null; tool_name: string | null; input: unknown; output: unknown; error_code: string | null }
const toStep = (r: StepDb): StepRow => ({ id: r.id, sequence: r.sequence, kind: r.kind, state: r.state, sourceModelStepId: r.source_model_step_id, callId: r.call_id, toolName: r.tool_name, input: r.input, output: r.output, errorCode: r.error_code })
type ReceiptDb = { id: string; kind: Receipt['action']; target_label: string; resource_version: bigint }
const toReceipt = (c: ReceiptDb): Receipt => ({ commandId: c.id, action: c.kind, targetLabel: c.target_label, changed: true, resourceVersion: String(c.resource_version) })

export class RunStore {
  private readonly db: Database
  constructor(db: Database) { this.db = db }

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

  // Report §4.3 Submit: user entry + operation + pending run + wake outbox in ONE transaction. Same key+body → same run.
  async submit(a: Actor, channel: Channel, conversationId: string, requestKey: string, body: string): Promise<RunView> {
    const text = body.trim()
    if (!text || text.length > BODY_MAX) throw new AppError('INPUT_INVALID', 422)
    const key = `agent.run:${conversationId}:${requestKey}`, hash = sha256(text)
    const runId = await this.db.$transaction(async tx => {
      const [conv] = await tx.$queryRaw<Array<{ next_sequence: bigint }>>`
        SELECT next_sequence FROM app_private.agent_conversations WHERE id=${conversationId}::uuid AND actor_user_id=${a.userId}::uuid AND channel=${channel} FOR UPDATE`
      if (!conv) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
      const [old] = await tx.$queryRaw<Array<{ id: string; payload_hash: string }>>`
        SELECT e.id::text,o.payload_hash FROM app_private.domain_operations o JOIN app_private.ai_executions e ON e.operation_id=o.id WHERE o.operation_key=${key}`
      if (old) { if (old.payload_hash !== hash) throw new AppError('REQUEST_KEY_REUSED', 409); return old.id }
      if (a.kind === 'talent' && a.status !== 'in_use') throw new AppError('TALENT_NOT_ACTIVE', 409)
      const [busy] = await tx.$queryRaw<unknown[]>`SELECT 1 FROM app_private.ai_executions WHERE conversation_id=${conversationId}::uuid AND state IN ('pending','running','waiting_confirmation','unknown')`
      if (busy) throw new AppError('RUN_BUSY', 409) // nothing written yet: no orphan user entry
      const [entry] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.agent_entries(conversation_id,sequence,role,body) VALUES(${conversationId}::uuid,${conv.next_sequence},'user',${text}) RETURNING id::text`
      await tx.$executeRaw`UPDATE app_private.agent_conversations SET next_sequence=next_sequence+1,version=version+1 WHERE id=${conversationId}::uuid`
      const talentId = a.kind === 'talent' ? a.talentId : null, task = TASK[channel]
      const [op] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.domain_operations(actor_auth_user_id,operation_key,kind,talent_id,payload_hash) VALUES(${a.userId}::uuid,${key},'agent.run',${talentId}::uuid,${hash}) RETURNING id::text`
      const [ev] = await tx.$queryRaw<Array<{ id: string }>>`INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES(${op.id}::uuid,1,'agent.run.wake') RETURNING id::text`
      const [run] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.ai_executions(operation_id,event_id,talent_id,task_key,task_revision,actor_user_id,channel,scope_kind,scope_id,conversation_id,input_entry_id)
        VALUES(${op.id}::uuid,${ev.id}::uuid,${talentId}::uuid,${task.key},${task.revision},${a.userId}::uuid,${channel},${talentId ? 'talent' : 'global'},${talentId}::uuid,${conversationId}::uuid,${entry.id}::uuid)
        RETURNING id::text`
      return run.id
    })
    return this.runView(a, channel, runId)
  }

  async entries(a: Actor, channel: Channel, conversationId: string, after: bigint, limit: number) {
    await this.owned(conversationId, a, channel)
    const rows = await this.db.$queryRaw<Array<{ id: string; sequence: bigint; role: 'user' | 'assistant'; body: string; created_at: Date }>>`
      SELECT id::text,sequence,role,body,created_at FROM app_private.agent_entries WHERE conversation_id=${conversationId}::uuid AND sequence>${after} ORDER BY sequence LIMIT ${limit + 1}`
    const items: EntryView[] = rows.slice(0, limit).map(r => ({ id: r.id, sequence: String(r.sequence), role: r.role, body: r.body, createdAt: r.created_at.toISOString() }))
    return { items, nextAfter: items.at(-1)?.sequence ?? String(after), hasMore: rows.length > limit }
  }
  // Latest runs of a conversation, so a reloaded page finds what is still pending/waiting (report §10.1 polling).
  async runs(a: Actor, channel: Channel, conversationId: string) {
    await this.owned(conversationId, a, channel)
    const ids = await this.db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM app_private.ai_executions WHERE conversation_id=${conversationId}::uuid ORDER BY created_at DESC LIMIT 20`
    return Promise.all(ids.map(r => this.runView(a, channel, r.id)))
  }

  async runView(a: Actor, channel: Channel, runId: string): Promise<RunView> {
    const [r] = await this.db.$queryRaw<Array<{ id: string; operation_id: string; conversation_id: string; completion_kind: RunView['completionKind']; state: RunState; version: bigint
      output_entry_id: string | null; waiting_proposal_id: string | null; last_proposal_id: string | null; last_error_code: string | null }>>`
      SELECT e.id::text,e.operation_id::text,e.conversation_id::text,e.completion_kind,e.state,e.version,e.output_entry_id::text,e.waiting_proposal_id::text,e.last_error_code,
        (SELECT p.id::text FROM app_private.agent_change_proposals p WHERE p.execution_id=e.id ORDER BY p.created_at DESC LIMIT 1) AS last_proposal_id
      FROM app_private.ai_executions e JOIN app_private.agent_conversations c ON c.id=e.conversation_id
      WHERE e.id=${runId}::uuid AND c.actor_user_id=${a.userId}::uuid AND c.channel=${channel}`
    if (!r) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
    return {
      id: r.id, operationId: r.operation_id, conversationId: r.conversation_id, completionKind: r.completion_kind, state: r.state, version: String(r.version),
      outputEntryId: r.output_entry_id, proposalId: r.waiting_proposal_id ?? r.last_proposal_id, errorCode: r.last_error_code,
      receipts: await this.receipts(runId), retryAfterMs: r.state === 'pending' || r.state === 'running' ? 1000 : null,
    }
  }

  // Pending/waiting → cancelled now; running → cancel request, checked by the runner before its next step (no effect is recalled).
  async cancel(a: Actor, channel: Channel, runId: string): Promise<RunView> {
    await this.runView(a, channel, runId) // owner check
    await this.db.$transaction(async tx => {
      const [r] = await tx.$queryRaw<Array<{ state: RunState; operation_id: string; event_id: string; waiting_proposal_id: string | null }>>`
        SELECT state,operation_id::text,event_id::text,waiting_proposal_id::text FROM app_private.ai_executions WHERE id=${runId}::uuid`
      if (!r || !['pending', 'running', 'waiting_confirmation'].includes(r.state)) return
      const ids = { runId, operationId: r.operation_id, eventId: r.event_id }
      await lockChain(tx, ids)
      if (r.state === 'running') { await tx.$executeRaw`UPDATE app_private.ai_executions SET cancel_requested_at=now(),version=version+1 WHERE id=${runId}::uuid AND state='running' AND cancel_requested_at IS NULL`; return }
      if (r.waiting_proposal_id) {
        await tx.$executeRaw`UPDATE app_private.agent_change_proposals SET state='rejected',decided_at=now(),version=version+1 WHERE id=${r.waiting_proposal_id}::uuid AND state='prepared'`
        await tx.$executeRaw`UPDATE app_private.agent_steps s SET state='failed',error_code='CANCELLED',finished_at=now() FROM app_private.agent_change_proposals p WHERE p.id=${r.waiting_proposal_id}::uuid AND s.id=p.tool_step_id AND s.state='waiting'`
        await tx.$executeRaw`UPDATE app_private.ai_executions SET waiting_proposal_id=NULL,state='pending',version=version+1 WHERE id=${runId}::uuid`
      }
      await finishIn(tx, ids, { kind: 'cancelled', code: 'CANCELLED' })
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
      WHERE o.id IN (
        SELECT o2.id FROM app_private.outbox_events o2 JOIN app_private.ai_executions e ON e.event_id=o2.id AND e.state='pending'
        WHERE o2.state='pending' AND o2.event_type='agent.run.wake' AND o2.available_at<=now() AND o2.next_dispatch_at<=now()
        ORDER BY o2.next_dispatch_at,o2.id LIMIT ${limit} FOR UPDATE OF o2 SKIP LOCKED)
      RETURNING o.id::text,o.delivery_sequence,o.lease_token::text`
    return rows.map(r => ({ eventId: r.id, sequence: r.delivery_sequence, token: r.lease_token }))
  }
  async releaseDispatch(eventId: string, token: string, outcome: 'enqueued' | 'failed' | 'still_queued') {
    await this.db.$executeRaw`
      UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,updated_at=now(),
        delivery_sequence=delivery_sequence-${outcome === 'still_queued' ? 1 : 0}::int,
        last_dispatched_at=CASE WHEN ${outcome === 'enqueued'} THEN now() ELSE last_dispatched_at END,
        next_dispatch_at=now()+(${outcome === 'failed' ? 5 : REDISPATCH_SECONDS}::int * interval '1 second')
      WHERE id=${eventId}::uuid AND state='leased' AND lease_token=${token}::uuid`
  }

  // ---- Worker claim (report §4.4 pending → running). Re-checks the actor; builds the context snapshot once per run.
  async claim(eventId: string): Promise<Claim | 'nothing'> {
    const [peek] = await this.db.$queryRaw<Array<{ id: string; operation_id: string; state: RunState }>>`SELECT id::text,operation_id::text,state FROM app_private.ai_executions WHERE event_id=${eventId}::uuid`
    if (!peek || peek.state !== 'pending') return 'nothing' // redelivered / stale job: no lock taken
    return this.db.$transaction(async tx => {
      const ids = { runId: peek.id, operationId: peek.operation_id, eventId }
      await lockChain(tx, ids)
      const [r] = await tx.$queryRaw<Array<{ state: RunState; event_id: string; channel: Channel; actor_user_id: string; talent_id: string | null; conversation_id: string; input_entry_id: string; context_manifest: Snapshot | null; cancel: boolean }>>`
        SELECT state,event_id::text,channel,actor_user_id::text,talent_id::text,conversation_id::text,input_entry_id::text,context_manifest,cancel_requested_at IS NOT NULL AS cancel
        FROM app_private.ai_executions WHERE id=${ids.runId}::uuid`
      if (r.state !== 'pending' || r.event_id !== eventId) return 'nothing'
      if (r.cancel) { await finishIn(tx, ids, { kind: 'cancelled', code: 'CANCELLED' }); return 'nothing' }
      let actor: Actor | null = null
      try { actor = r.channel === 'talent' ? await talentActor(tx, r.actor_user_id) : await managerActor(tx, r.actor_user_id) } catch { /* disabled below */ }
      if (!actor || (actor.kind === 'talent' && (actor.status !== 'in_use' || actor.talentId !== r.talent_id))) {
        await finishIn(tx, ids, { kind: 'failed', code: 'ACTOR_DISABLED' }); return 'nothing'
      }
      // Manifest is fixed at the first claim; a resume keeps the context it started with (report §6.1).
      const snapshot = r.context_manifest ?? (actor.kind === 'talent' ? await talentSnapshot(tx, actor.talentId) : managerSnapshot())
      const token = randomUUID()
      const [ex] = await tx.$queryRaw<Array<{ attempt_no: number }>>`
        UPDATE app_private.ai_executions SET state='running',attempt_no=attempt_no+1,lease_token=${token}::uuid,lease_until=now()+(${LEASE_SECONDS}::int * interval '1 second'),heartbeat_at=now(),
          context_manifest=${JSON.stringify(snapshot)}::jsonb,context_revision=${revisionOf(snapshot)},version=version+1
        WHERE id=${ids.runId}::uuid AND state='pending' RETURNING attempt_no`
      const [att] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.ai_execution_attempts(execution_id,talent_id,attempt_no,lease_token,phase,step_ledger,context_revision)
        VALUES(${ids.runId}::uuid,${r.talent_id}::uuid,${ex.attempt_no},${token}::uuid,'executing',true,${revisionOf(snapshot)}) RETURNING id::text`
      await tx.$executeRaw`UPDATE app_private.domain_operations SET state='running',step='running',version=version+1,updated_at=now() WHERE id=${ids.operationId}::uuid AND state IN ('accepted','running','unknown')`
      const history = await tx.$queryRaw<Array<{ role: 'user' | 'assistant'; body: string }>>`
        SELECT role,body FROM (SELECT role,body,sequence FROM app_private.agent_entries WHERE conversation_id=${r.conversation_id}::uuid
          AND sequence<=(SELECT sequence FROM app_private.agent_entries WHERE id=${r.input_entry_id}::uuid) ORDER BY sequence DESC LIMIT ${HISTORY}) h ORDER BY sequence`
      const steps = await tx.$queryRaw<StepDb[]>`
        SELECT id::text,sequence,kind,state,source_model_step_id::text,call_id,tool_name,input,output,error_code FROM app_private.agent_steps WHERE execution_id=${ids.runId}::uuid ORDER BY sequence`
      return { ...ids, channel: r.channel, actor, token, attemptId: att.id, attemptNo: ex.attempt_no, snapshot, history, steps: steps.map(toStep) }
    })
  }

  async heartbeat(c: Claim): Promise<'ok' | 'lost' | 'cancel'> {
    const [r] = await this.db.$queryRaw<Array<{ cancel: boolean }>>`
      UPDATE app_private.ai_executions SET lease_until=now()+(${LEASE_SECONDS}::int * interval '1 second'),heartbeat_at=now(),version=version+1
      WHERE id=${c.runId}::uuid AND state='running' AND lease_token=${c.token}::uuid AND attempt_no=${c.attemptNo} AND lease_until>now() RETURNING cancel_requested_at IS NOT NULL AS cancel`
    return !r ? 'lost' : r.cancel ? 'cancel' : 'ok'
  }

  // Model step: 'calling' committed BEFORE the provider HTTP call. From here a crash means "may have been called/charged" → unknown.
  async beginModelStep(c: Claim, sequence: number, provider: string, model: string): Promise<string | null> {
    return this.db.$transaction(async tx => {
      if (!await holds(tx, c)) return null
      const [s] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.agent_steps(execution_id,attempt_id,sequence,kind,state,provider,model,usage_state) VALUES(${c.runId}::uuid,${c.attemptId}::uuid,${sequence},'model','calling',${provider},${model},'unknown') RETURNING id::text`
      return s.id
    })
  }
  // Response persisted (all items needed to continue + usage) BEFORE any tool of it runs.
  async endModelStep(c: Claim, stepId: string, r: { state: 'succeeded' | 'failed' | 'unknown'; output?: unknown; requestRef?: string; inputTokens?: number; outputTokens?: number; cachedTokens?: number; errorCode?: string; cost?: { amount: number; currency: string } | null }): Promise<boolean> {
    return this.db.$transaction(async tx => {
      if (!await holds(tx, c)) return false
      const known = r.inputTokens !== undefined && r.outputTokens !== undefined
      await tx.$executeRaw`
        UPDATE app_private.agent_steps SET state=${r.state},output=${r.output === undefined ? null : JSON.stringify(r.output)}::jsonb,provider_request_ref=${r.requestRef ?? null},
          input_tokens=${r.inputTokens ?? null},output_tokens=${r.outputTokens ?? null},cached_tokens=${r.cachedTokens ?? null},usage_state=${known ? 'known' : 'unknown'},
          cost_amount=${known && r.cost ? r.cost.amount : null},currency=${known && r.cost ? r.cost.currency : null},error_code=${r.errorCode ?? null},finished_at=now()
        WHERE id=${stepId}::uuid AND state='calling'`
      return true
    })
  }
  // Tool step with its result. Called inside the service transaction for writes (prepare/commit), alone for reads/denials.
  async toolStep(tx: Tx | null, c: Claim, s: { sequence: number; sourceModelStepId: string; callId: string; toolName: string; input: unknown; state: string; output: unknown; errorCode?: string }): Promise<string> {
    const run = async (t: Tx) => {
      if (!await holds(t, c)) throw new LeaseLost()
      const [row] = await t.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.agent_steps(execution_id,attempt_id,sequence,kind,state,source_model_step_id,call_id,tool_name,input,output,error_code,finished_at)
        VALUES(${c.runId}::uuid,${c.attemptId}::uuid,${s.sequence},'tool',${s.state},${s.sourceModelStepId}::uuid,${s.callId},${s.toolName},${JSON.stringify(s.input ?? null)}::jsonb,
          ${JSON.stringify(s.output)}::jsonb,${s.errorCode ?? null},CASE WHEN ${s.state}='waiting' THEN NULL ELSE now() END) RETURNING id::text`
      return row.id
    }
    return tx ? run(tx) : this.db.$transaction(run)
  }
  // Inside the prepare transaction: link proposal ↔ waiting step, release lease and compute (report §4.3 Wait/resume).
  async suspend(tx: Tx, c: Claim, proposalId: string, stepId: string) {
    await tx.$executeRaw`UPDATE app_private.agent_change_proposals SET tool_step_id=${stepId}::uuid,version=version+1 WHERE id=${proposalId}::uuid`
    await this.toWaiting(tx, c, proposalId)
  }
  // A run claimed again while its proposal is still open (e.g. reconciler requeued it): back to waiting, no new proposal.
  async resuspend(c: Claim, proposalId: string): Promise<boolean> {
    return this.db.$transaction(async tx => {
      if (!await holds(tx, c)) return false
      await this.toWaiting(tx, c, proposalId)
      return true
    })
  }
  private async toWaiting(tx: Tx, c: Claim, proposalId: string) {
    await tx.$executeRaw`
      UPDATE app_private.ai_executions SET state='waiting_confirmation',waiting_proposal_id=${proposalId}::uuid,lease_token=NULL,lease_until=NULL,heartbeat_at=NULL,version=version+1
      WHERE id=${c.runId}::uuid AND state='running' AND lease_token=${c.token}::uuid`
    await tx.$executeRaw`UPDATE app_private.ai_execution_attempts SET phase='waiting',finished_at=now() WHERE id=${c.attemptId}::uuid`
    await tx.$executeRaw`UPDATE app_private.outbox_events SET state='done',lease_token=NULL,lease_until=NULL,updated_at=now() WHERE id=${c.eventId}::uuid`
  }
  async proposalState(id: string) {
    const [p] = await this.db.$queryRaw<Array<{ state: string; expired: boolean }>>`SELECT state,expires_at<=now() AS expired FROM app_private.agent_change_proposals WHERE id=${id}::uuid`
    return p
  }
  async resolveStep(c: Claim, stepId: string, output: unknown): Promise<boolean> {
    return this.db.$transaction(async tx => {
      if (!await holds(tx, c)) return false
      await tx.$executeRaw`UPDATE app_private.agent_steps SET state='succeeded',output=${JSON.stringify(output)}::jsonb,finished_at=now() WHERE id=${stepId}::uuid AND state='waiting'`
      return true
    })
  }
  // The confirmed prepare step gets the commit result, in the commit transaction (tx) or alone after a refusal.
  async setToolResult(tx: Tx | null, c: Claim, stepId: string, state: string, output: unknown, errorCode: string | null = null) {
    const run = async (t: Tx) => {
      if (!await holds(t, c)) throw new LeaseLost()
      await t.$executeRaw`UPDATE app_private.agent_steps SET state=${state},output=${JSON.stringify(output)}::jsonb,error_code=${errorCode},finished_at=COALESCE(finished_at,now()) WHERE id=${stepId}::uuid AND kind='tool'`
    }
    return tx ? run(tx) : this.db.$transaction(run)
  }
  async receipts(runId: string): Promise<Receipt[]> {
    return (await this.db.$queryRaw<ReceiptDb[]>`SELECT id::text,kind,target_label,resource_version FROM app_private.agent_commands WHERE execution_id=${runId}::uuid ORDER BY created_at`).map(toReceipt)
  }
  async proposalsOf(runId: string) {
    return this.db.$queryRaw<Array<{ target_label: string; state: string }>>`SELECT target_label,state FROM app_private.agent_change_proposals WHERE execution_id=${runId}::uuid ORDER BY created_at`
  }

  // Terminal (or unknown) state + assistant entry, all in one fenced transaction. false = lease lost, nothing written.
  async finish(c: Claim, o: Finish): Promise<boolean> {
    return this.db.$transaction(async tx => {
      const [conv] = await tx.$queryRaw<Array<{ id: string }>>`
        SELECT c.id::text FROM app_private.agent_conversations c JOIN app_private.ai_executions e ON e.conversation_id=c.id WHERE e.id=${c.runId}::uuid FOR UPDATE OF c`
      await lockChain(tx, c)
      if (!await holds(tx, c)) return false
      await finishIn(tx, c, o, conv.id, c.attemptId)
      return true
    })
  }

  // ---- Reconciler (report §4.4): expired dispatch leases; expired run leases (calling → unknown, else requeue).
  async reconcile(limit = 20): Promise<{ requeued: number; unknown: number; dispatch: number }> {
    const dispatch = await this.db.$executeRaw`
      UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,next_dispatch_at=now(),updated_at=now()
      WHERE state='leased' AND lease_until<now() AND event_type IN ('agent.run.wake','agent.profile.export')`
    const expired = await this.db.$queryRaw<Array<{ id: string; operation_id: string; event_id: string }>>`
      SELECT id::text,operation_id::text,event_id::text FROM app_private.ai_executions WHERE state='running' AND lease_until<now() AND task_key LIKE 'agent.%' ORDER BY lease_until LIMIT ${limit}`
    let requeued = 0, unknown = 0
    for (const e of expired) await this.db.$transaction(async tx => {
      const ids = { runId: e.id, operationId: e.operation_id, eventId: e.event_id }
      await lockChain(tx, ids)
      const [still] = await tx.$queryRaw<Array<{ attempt_id: string }>>`
        SELECT a.id::text AS attempt_id FROM app_private.ai_executions x JOIN app_private.ai_execution_attempts a ON a.execution_id=x.id AND a.attempt_no=x.attempt_no
        WHERE x.id=${e.id}::uuid AND x.state='running' AND x.lease_until<now()`
      if (!still) return
      const calling = await tx.$executeRaw`UPDATE app_private.agent_steps SET state='unknown',usage_state='unknown',error_code='LEASE_EXPIRED_AFTER_CALL',finished_at=now() WHERE execution_id=${e.id}::uuid AND state='calling'`
      if (calling) { await finishIn(tx, ids, { kind: 'unknown', code: 'LEASE_EXPIRED_AFTER_CALL' }, null, still.attempt_id); unknown++; return }
      // Nothing in flight: everything done so far is committed in the ledger, a new attempt resumes from it.
      await tx.$executeRaw`UPDATE app_private.ai_execution_attempts SET phase='failed',error_code='LEASE_EXPIRED',finished_at=now() WHERE id=${still.attempt_id}::uuid`
      await tx.$executeRaw`UPDATE app_private.ai_executions SET state='pending',lease_token=NULL,lease_until=NULL,heartbeat_at=NULL,version=version+1 WHERE id=${e.id}::uuid`
      await tx.$executeRaw`UPDATE app_private.outbox_events SET state='pending',lease_token=NULL,lease_until=NULL,next_dispatch_at=now(),updated_at=now() WHERE id=${e.event_id}::uuid`
      requeued++
    })
    return { requeued, unknown, dispatch }
  }

  // Operator decision on an unknown run (report §4.4 "keep unknown and reconcile"). retry = a new model call may be charged again.
  async resolveUnknown(runId: string, action: 'retry' | 'fail'): Promise<RunState> {
    return this.db.$transaction(async tx => {
      const [r] = await tx.$queryRaw<Array<{ operation_id: string; event_id: string; wake_sequence: bigint }>>`
        SELECT operation_id::text,event_id::text,wake_sequence FROM app_private.ai_executions WHERE id=${runId}::uuid AND state='unknown' AND task_key LIKE 'agent.%'`
      if (!r) throw new AppError('RUN_NOT_UNKNOWN', 409)
      const ids = { runId, operationId: r.operation_id, eventId: r.event_id }
      await lockChain(tx, ids)
      if (action === 'fail') { await finishIn(tx, ids, { kind: 'failed', code: 'UNKNOWN_CLOSED_BY_OPERATOR' }); return 'failed' }
      await tx.$executeRaw`UPDATE app_private.domain_operations SET state='running',step='operator_retry',last_error_code=NULL,version=version+1,updated_at=now() WHERE id=${r.operation_id}::uuid`
      await wake(tx, { id: runId, operation_id: r.operation_id, wake_sequence: r.wake_sequence })
      return 'pending'
    })
  }

  // ---- Provider effect: OneDrive Profile.md export (outbox agent.profile.export). Idempotent: always writes the LATEST version.
  async leaseEffects(limit: number): Promise<Array<{ eventId: string; token: string; attempts: number; talentId: string }>> {
    return (await this.db.$queryRaw<Array<{ id: string; lease_token: string; attempts: number; talent_id: string }>>`
      UPDATE app_private.outbox_events o SET state='leased',lease_token=gen_random_uuid(),lease_until=now()+(${EFFECT_LEASE_SECONDS}::int * interval '1 second'),attempts=o.attempts+1,updated_at=now()
      FROM app_private.domain_operations d
      WHERE d.id=o.operation_id AND o.id IN (SELECT id FROM app_private.outbox_events WHERE state='pending' AND event_type='agent.profile.export' AND available_at<=now() ORDER BY available_at,id LIMIT ${limit} FOR UPDATE SKIP LOCKED)
      RETURNING o.id::text,o.lease_token::text,o.attempts,d.talent_id::text`).map(r => ({ eventId: r.id, token: r.lease_token, attempts: r.attempts, talentId: r.talent_id }))
  }
  async exportJob(talentId: string) {
    const [r] = await this.db.$queryRaw<Array<{ display_name: string; folder: string | null; profile: Profile; version: bigint; exported: bigint | null }>>`
      SELECT t.display_name,t.onedrive_folder_id AS folder,p.profile,p.version,x.version AS exported FROM public.talents t
      JOIN app_private.agent_talent_profiles p ON p.talent_id=t.id LEFT JOIN app_private.agent_profile_exports x ON x.talent_id=t.id WHERE t.id=${talentId}::uuid`
    return r
  }
  // done: written (or a newer export already covers it). retry: back to pending after a backoff. failed: give up, keep the reason.
  async endEffect(e: { eventId: string; token: string; talentId: string }, outcome: 'done' | 'retry' | 'failed', code: string | null, written?: { version: bigint; itemRef: string }, retryInSeconds = 30) {
    await this.db.$transaction(async tx => {
      if (written) await tx.$executeRaw`
        INSERT INTO app_private.agent_profile_exports(talent_id,version,item_ref) VALUES(${e.talentId}::uuid,${written.version},${written.itemRef})
        ON CONFLICT (talent_id) DO UPDATE SET version=EXCLUDED.version,item_ref=EXCLUDED.item_ref,exported_at=now() WHERE agent_profile_exports.version<EXCLUDED.version`
      await tx.$executeRaw`
        UPDATE app_private.outbox_events SET state=${outcome === 'retry' ? 'pending' : outcome},lease_token=NULL,lease_until=NULL,last_error_code=${code},updated_at=now(),
          available_at=CASE WHEN ${outcome === 'retry'} THEN now()+(${retryInSeconds}::int * interval '1 second') ELSE available_at END
        WHERE id=${e.eventId}::uuid AND state='leased' AND lease_token=${e.token}::uuid`
    })
  }
}

export class LeaseLost extends Error { constructor() { super('LEASE_LOST') } }

async function lockChain(tx: Tx, ids: { operationId: string; eventId: string; runId: string }) {
  await tx.$queryRaw`SELECT 1 FROM app_private.domain_operations WHERE id=${ids.operationId}::uuid FOR UPDATE`
  await tx.$queryRaw`SELECT 1 FROM app_private.outbox_events WHERE id=${ids.eventId}::uuid FOR UPDATE`
  await tx.$queryRaw`SELECT 1 FROM app_private.ai_executions WHERE id=${ids.runId}::uuid FOR UPDATE`
}
export async function holds(tx: Tx, c: Claim): Promise<boolean> {
  const rows = await tx.$queryRaw<unknown[]>`
    SELECT 1 FROM app_private.ai_executions WHERE id=${c.runId}::uuid AND state='running' AND lease_token=${c.token}::uuid AND attempt_no=${c.attemptNo} AND lease_until>now() FOR UPDATE`
  return rows.length === 1
}

// Run → operation / outbox mapping (report §4.4). Operation has no 'cancelled': failed + CANCELLED.
async function finishIn(tx: Tx, ids: { operationId: string; eventId: string; runId: string }, o: Finish, conversationId: string | null = null, attemptId: string | null = null) {
  let entry: string | null = null
  if (o.kind === 'succeeded') {
    const [e] = await tx.$queryRaw<Array<{ id: string }>>`
      INSERT INTO app_private.agent_entries(conversation_id,sequence,role,body)
      SELECT id,next_sequence,'assistant',${o.body} FROM app_private.agent_conversations WHERE id=${conversationId}::uuid RETURNING id::text`
    await tx.$executeRaw`UPDATE app_private.agent_conversations SET next_sequence=next_sequence+1,version=version+1 WHERE id=${conversationId}::uuid`
    entry = e.id
  }
  const code = o.kind === 'succeeded' ? null : o.code
  const op = o.kind === 'succeeded' ? 'completed' : o.kind === 'unknown' ? 'unknown' : 'failed'
  const ev = o.kind === 'succeeded' || o.kind === 'cancelled' ? 'done' : o.kind
  await tx.$executeRaw`UPDATE app_private.domain_operations SET state=${op},step=NULL,last_error_code=${code},version=version+1,updated_at=now() WHERE id=${ids.operationId}::uuid`
  await tx.$executeRaw`UPDATE app_private.outbox_events SET state=${ev},lease_token=NULL,lease_until=NULL,last_error_code=${code},updated_at=now() WHERE id=${ids.eventId}::uuid`
  await tx.$executeRaw`
    UPDATE app_private.ai_executions SET state=${o.kind},output_entry_id=${entry}::uuid,completion_kind=${o.kind === 'succeeded' ? o.completion : null},last_error_code=${code},
      lease_token=NULL,lease_until=NULL,heartbeat_at=NULL,finished_at=CASE WHEN ${o.kind !== 'unknown'} THEN now() END,version=version+1
    WHERE id=${ids.runId}::uuid`
  if (attemptId) await tx.$executeRaw`UPDATE app_private.ai_execution_attempts SET phase=${o.kind},error_code=${code},finished_at=now() WHERE id=${attemptId}::uuid`
}
