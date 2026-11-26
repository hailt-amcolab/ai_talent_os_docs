import type { Database } from '../infra/database/client.ts'
import { AppError } from '../core/errors.ts'
import { canonical, sha256 } from '../core/hash.ts'
import type { Actor, ManagerActor } from './actor.ts'
import { assertActive, assertCapability, type Capability, type Channel } from './access.ts'
import { execute, type Applied, type CommandType, type Receipt, type Target } from './commands.ts'
import { once, type Stored } from './idempotency.ts'
import type { Tx } from './tx.ts'

// Proposals (agent_spec/ai-core/ARCHITECTURE_DECISIONS.md ADR-04): an AI/MCP/admin proposal is NOT a command. A person's
// confirm executes it in ONE transaction here (idempotency + CAS + receipt + audit + outbox); no AI run is woken.
export type Change = { field: string; before: string | null; after: string | null }
export type ProposalState = 'prepared' | 'consumed' | 'rejected' | 'expired' | 'conflicted'
export type Plan = { target: Target; before: Record<string, unknown> | null; patch: Record<string, unknown>; currentVersion: bigint }
export type ProposalRow = { id: string; command_type: CommandType; actor_user_id: string; channel: Channel; run_id: string | null; target_kind: Target['kind']; target_id: string | null
  target_label: string; before: Record<string, unknown> | null; patch: Record<string, unknown>; payload_hash: string; base_version: bigint; expires_at: Date; state: ProposalState; expired: boolean }

// One handler per command type, registered by the module that owns the data (coach-config today).
export interface ProposalHandler<I> {
  readonly type: CommandType
  readonly capability: Capability
  plan(tx: Tx, input: I): Promise<Plan>                    // read + validate, no write
  lock(tx: Tx, p: ProposalRow): Promise<void>               // resource row lock, taken BEFORE the proposal lock
  apply(tx: Tx, actor: Actor, p: ProposalRow): Promise<Applied> // CAS write on base_version; null = someone saved first
  changes(before: Record<string, unknown> | null, patch: Record<string, unknown>): Change[]
}
export type Prepared = { proposalId: string; commandType: CommandType; targetLabel: string; changes: Change[]; baseVersion: string; expiresAt: string; proposalHash: string }
export type ProposalView = Prepared & { state: ProposalState; allowedActions: Array<'confirm' | 'reject'>; origin: { channel: Channel; runId: string | null } }
export type PrepareOptions = { idempotencyKey: string; runId?: string | null; clientGrantId?: string | null }
export type DecideRequest = { requestKey: string }
// Hook in the confirm transaction, wired by the container (the Control Plane imports no module): e.g. the receipt item of the agent session.
export type AfterConfirm = (tx: Tx, p: ProposalRow, receipt: Receipt) => Promise<void>

const asVersion = (s: string) => { if (!/^\d{1,18}$/.test(s)) throw new AppError('INPUT_INVALID', 422); return BigInt(s) }
const errorBody = (code: string) => ({ error: { code } })

export class ProposalService {
  private readonly db: Database
  private readonly ttlSeconds: number
  private readonly handlers = new Map<CommandType, ProposalHandler<unknown>>()
  private readonly afterConfirm?: AfterConfirm
  constructor(db: Database, handlers: Array<ProposalHandler<never>>, cfg: { ttlSeconds: number; afterConfirm?: AfterConfirm }) {
    this.db = db; this.ttlSeconds = cfg.ttlSeconds; this.afterConfirm = cfg.afterConfirm
    for (const h of handlers) this.handlers.set(h.type, h as ProposalHandler<unknown>)
  }
  private handler(type: CommandType) { const h = this.handlers.get(type); if (!h) throw new AppError('FEATURE_NOT_READY', 503); return h }

  // ---- prepare: immutable proposal on the version the caller has seen. Same idempotency key → the same proposal.
  async prepare<I extends { expectedVersion: string }>(actor: Actor, channel: Channel, type: CommandType, input: I, opt: PrepareOptions): Promise<Prepared> {
    const h = this.handler(type)
    assertCapability(actor, channel, h.capability)
    const base = asVersion(input.expectedVersion)
    return this.db.$transaction(async tx => {
      await assertActive(tx, actor)
      const plan = await h.plan(tx, input)
      if (plan.currentVersion !== base) throw new AppError('VERSION_CONFLICT', 409)
      const hash = sha256(canonical({ type, target: [plan.target.kind, plan.target.id], base: String(base), patch: plan.patch }))
      const [p] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.business_proposals(command_type,actor_user_id,channel,client_grant_id,run_id,idempotency_key,target_kind,target_id,target_label,before,patch,payload_hash,base_version,expires_at)
        VALUES(${type},${actor.userId}::uuid,${channel},${opt.clientGrantId ?? null}::uuid,${opt.runId ?? null}::uuid,${opt.idempotencyKey},${plan.target.kind},${plan.target.id}::uuid,${plan.target.label},
          ${plan.before === null ? null : JSON.stringify(plan.before)}::jsonb,${JSON.stringify(plan.patch)}::jsonb,${hash},${base},now()+(${this.ttlSeconds}::int * interval '1 second'))
        ON CONFLICT (idempotency_key) DO NOTHING RETURNING id::text`
      const row = await this.row(tx, actor, p?.id ?? await this.idByKey(tx, opt.idempotencyKey))
      if (row.payload_hash !== hash) throw new AppError('REQUEST_KEY_REUSED', 409) // same key, different content
      return this.prepared(row)
    })
  }

  async view(actor: ManagerActor, id: string): Promise<ProposalView> { return this.toView(await this.row(this.db, actor, id)) }
  // State + receipt once saved (MCP proposal_status: ChatGPT learns the result of the person's confirm).
  async status(actor: ManagerActor, id: string) {
    const p = this.toView(await this.row(this.db, actor, id))
    const [c] = await this.db.$queryRaw<Array<{ receipt: Receipt }>>`SELECT receipt FROM app_private.business_commands WHERE proposal_id=${id}::uuid`
    return { proposalId: p.proposalId, state: p.state, targetLabel: p.targetLabel, receipt: c?.receipt ?? null }
  }
  async list(actor: ManagerActor, state: ProposalState | undefined, limit: number): Promise<ProposalView[]> {
    const rows = await this.db.$queryRaw<ProposalRow[]>`SELECT id::text,command_type,actor_user_id::text,channel,run_id::text,target_kind,target_id::text,target_label,before,patch,
      payload_hash,base_version,expires_at,state,expires_at<=now() AS expired FROM app_private.business_proposals
      WHERE actor_user_id=${actor.userId}::uuid AND (${state ?? null}::text IS NULL OR state=${state ?? null}) ORDER BY created_at DESC,id DESC LIMIT ${limit}`
    return rows.map(r => this.toView(r))
  }

  // ---- confirm: the person's action on the proposal they saw (hash) = the command. One transaction, stored response.
  async confirm(actor: Actor, channel: Channel, id: string, req: DecideRequest & { proposalHash: string }): Promise<Stored> {
    assertCapability(actor, channel, 'proposal.decide')
    return this.db.$transaction(tx => once(tx, { actorUserId: actor.userId, routeKey: `proposal.confirm:${id}`, requestKey: req.requestKey }, { proposalHash: req.proposalHash }, async () => {
      await assertActive(tx, actor)
      const peek = await this.row(tx, actor, id)
      const h = this.handler(peek.command_type)
      await h.lock(tx, peek) // lock order: resource → proposal → command/audit/outbox
      const p = await this.row(tx, actor, id, true)
      if (p.state === 'consumed') { // already saved (double click with a new key): same receipt
        const [c] = await tx.$queryRaw<Array<{ receipt: Receipt }>>`SELECT receipt FROM app_private.business_commands WHERE proposal_id=${p.id}::uuid`
        return { status: 200, body: { proposal: this.toView(p), receipt: c.receipt } }
      }
      if (p.state !== 'prepared') return { status: 409, body: errorBody('PROPOSAL_NOT_PENDING') }
      if (p.expired) return { status: 410, body: errorBody('PROPOSAL_EXPIRED') }
      if (req.proposalHash !== p.payload_hash) return { status: 409, body: errorBody('PROPOSAL_HASH_MISMATCH') }
      const r = await execute(tx, actor, { commandType: p.command_type, channel, idempotencyKey: sha256(`proposal:${p.id}`), payloadHash: p.payload_hash, runId: p.run_id, proposalId: p.id,
        target: { kind: p.target_kind, id: p.target_id, label: p.target_label } }, t => h.apply(t, actor, p))
      const state: ProposalState = 'conflict' in r ? 'conflicted' : 'consumed'
      await tx.$executeRaw`UPDATE app_private.business_proposals SET state=${state},decided_by=${actor.userId}::uuid,decided_at=now(),version=version+1 WHERE id=${p.id}::uuid`
      if ('conflict' in r) return { status: 409, body: errorBody('VERSION_CONFLICT') }
      if (this.afterConfirm) await this.afterConfirm(tx, p, r.receipt)
      return { status: 200, body: { proposal: this.toView({ ...p, state }), receipt: r.receipt } }
    }))
  }

  async reject(actor: Actor, channel: Channel, id: string, req: DecideRequest): Promise<Stored> {
    assertCapability(actor, channel, 'proposal.decide')
    return this.db.$transaction(tx => once(tx, { actorUserId: actor.userId, routeKey: `proposal.reject:${id}`, requestKey: req.requestKey }, {}, async () => {
      await assertActive(tx, actor)
      const p = await this.row(tx, actor, id, true)
      if (p.state === 'rejected') return { status: 200, body: { proposal: this.toView(p) } }
      if (p.state !== 'prepared') return { status: 409, body: errorBody('PROPOSAL_NOT_PENDING') }
      await tx.$executeRaw`UPDATE app_private.business_proposals SET state='rejected',decided_by=${actor.userId}::uuid,decided_at=now(),version=version+1 WHERE id=${p.id}::uuid AND state='prepared'`
      return { status: 200, body: { proposal: this.toView({ ...p, state: 'rejected' }) } }
    }))
  }

  // Reconciler: expiry is decided by the DB clock, not by a person.
  async expireDue(limit = 50): Promise<number> {
    return Number(await this.db.$executeRaw`UPDATE app_private.business_proposals SET state='expired',decided_at=now(),version=version+1
      WHERE id IN (SELECT id FROM app_private.business_proposals WHERE state='prepared' AND expires_at<=now() ORDER BY expires_at LIMIT ${limit} FOR UPDATE SKIP LOCKED)`)
  }

  private async idByKey(tx: Tx, key: string) {
    const [r] = await tx.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM app_private.business_proposals WHERE idempotency_key=${key}`
    return r.id
  }
  // Only the Manager who made the proposal reads/decides it; anything else looks like "not found" (no probing).
  private async row(tx: Tx | Database, actor: Actor, id: string, lock = false): Promise<ProposalRow> {
    const [r] = lock
      ? await tx.$queryRaw<ProposalRow[]>`SELECT id::text,command_type,actor_user_id::text,channel,run_id::text,target_kind,target_id::text,target_label,before,patch,
          payload_hash,base_version,expires_at,state,expires_at<=now() AS expired FROM app_private.business_proposals WHERE id=${id}::uuid FOR UPDATE`
      : await tx.$queryRaw<ProposalRow[]>`SELECT id::text,command_type,actor_user_id::text,channel,run_id::text,target_kind,target_id::text,target_label,before,patch,
          payload_hash,base_version,expires_at,state,expires_at<=now() AS expired FROM app_private.business_proposals WHERE id=${id}::uuid`
    if (!r || r.actor_user_id !== actor.userId) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
    return r
  }
  private prepared(p: ProposalRow): Prepared {
    return { proposalId: p.id, commandType: p.command_type, targetLabel: p.target_label, changes: this.handler(p.command_type).changes(p.before, p.patch),
      baseVersion: String(p.base_version), expiresAt: p.expires_at.toISOString(), proposalHash: p.payload_hash }
  }
  private toView(p: ProposalRow): ProposalView {
    const state: ProposalState = p.state === 'prepared' && p.expired ? 'expired' : p.state
    return { ...this.prepared(p), state, allowedActions: state === 'prepared' ? ['confirm', 'reject'] : [], origin: { channel: p.channel, runId: p.run_id } }
  }
}
