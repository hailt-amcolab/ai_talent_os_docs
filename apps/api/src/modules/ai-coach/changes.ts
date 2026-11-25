import type { Database } from '../../infra/database/client.ts'
import { AppError } from '../../core/errors.ts'
import type { ManagerActor } from './access.ts'
import { stillActive } from './access.ts'
import { canonical, PROFILE_FIELDS, sha256, SITUATIONS, type Profile, type ProfileField, type Situation } from './context.ts'

// Proposal → confirmation (a person, through an authenticated UI action) → commit (one use). Report §4.3, §7.1, §7.2.
// One service for M-17 tools, REST and (later) MCP. Lock order: resource → proposal → run → step → command/audit/outbox.
export type Tx = Pick<Database, '$queryRaw' | '$executeRaw'>
export type CommandType = 'profile.update' | 'instruction.write'
export type InstructionChange = { kind: 'write'; text: string; enabled: boolean } | { kind: 'set_enabled'; enabled: boolean } | { kind: 'restore'; version: string }
export type ProposalInput =
  | { type: 'profile.update'; talentId: string; expectedVersion: string; patch: Profile }
  | { type: 'instruction.write'; scope: { kind: 'global' | 'talent' | 'category'; id?: string }; situation: Situation; expectedVersion: string; change: InstructionChange }
export type Change = { field: string; before: string | null; after: string | null }
export type Prepared = { proposalId: string; targetLabel: string; changes: Change[]; baseVersion: string; expiresAt: string; proposalHash: string }
export type ProposalView = Prepared & { state: string; commandType: CommandType; allowedActions: Array<'confirm' | 'reject' | 'commit'>; runId: string | null }
export type Receipt = { commandId: string; action: CommandType; targetLabel: string; changed: boolean; resourceVersion: string | null }
// The run's work that must land in the SAME transaction (fence check + tool step row), report §4.3 "Commit tool".
export type InTx<T> = (tx: Tx, result: T) => Promise<void>

type Row = { id: string; actor_user_id: string; execution_id: string | null; tool_step_id: string | null; command_type: CommandType; scope_kind: 'talent' | 'global'; scope_id: string | null
  target_label: string; before: Record<string, unknown> | null; patch: Record<string, unknown>; payload_hash: string; base_version: bigint; expires_at: Date; state: string; expired: boolean }
const fail = (code: string, status: 403 | 404 | 409 | 410 | 422 | 503) => new AppError(code, status)
const asVersion = (s: string) => { if (!/^\d{1,18}$/.test(s)) throw fail('INPUT_INVALID', 422); return BigInt(s) }

export class ChangeService {
  private readonly db: Database
  private readonly ttlSeconds: number
  private readonly writes: boolean
  constructor(db: Database, cfg: { ttlSeconds: number; writes: boolean }) { this.db = db; this.ttlSeconds = cfg.ttlSeconds; this.writes = cfg.writes }

  private gate() { if (!this.writes) throw fail('FEATURE_NOT_READY', 503) } // ENABLE_AGENT_WRITES=false (report §11.1)
  private async active(tx: Tx, a: ManagerActor) { if (!await stillActive(tx, a)) throw fail('ACTOR_DISABLED', 403) }

  // ---- prepare: no business write; an immutable proposal with diff + base version.
  async prepare(a: ManagerActor, input: ProposalInput, run?: { executionId: string; inTx: InTx<Prepared> }): Promise<Prepared> {
    this.gate()
    return this.db.$transaction(async tx => {
      await this.active(tx, a)
      const base = asVersion(input.expectedVersion)
      let target: { scopeKind: 'talent' | 'global'; scopeId: string | null; label: string; before: Record<string, unknown> | null; after: Record<string, unknown>; current: bigint }
      if (input.type === 'profile.update') {
        const [t] = await tx.$queryRaw<Array<{ display_name: string; profile: Profile | null; version: bigint | null }>>`
          SELECT t.display_name,p.profile,p.version FROM public.talents t LEFT JOIN app_private.agent_talent_profiles p ON p.talent_id=t.id WHERE t.id=${input.talentId}::uuid`
        if (!t) throw fail('NOT_FOUND_OR_FORBIDDEN', 404)
        const before = t.profile ?? {}
        const patch = Object.fromEntries(Object.entries(input.patch).filter(([k, x]) => x !== undefined && before[k as ProfileField] !== x))
        if (!Object.keys(patch).length) throw fail('NO_CHANGE', 422)
        target = { scopeKind: 'talent', scopeId: input.talentId, label: `${t.display_name} / プロフィール`, before: t.profile, after: patch, current: t.version ?? 0n }
      } else {
        const s = input.scope
        if (s.kind === 'category') throw fail('FEATURE_NOT_READY', 503) // no canonical category table yet (report §4.1)
        if ((s.kind === 'global') !== (s.id === undefined)) throw fail('INPUT_INVALID', 422)
        let label = '全タレント共通'
        if (s.kind === 'talent') {
          const [t] = await tx.$queryRaw<Array<{ display_name: string }>>`SELECT display_name FROM public.talents WHERE id=${s.id!}::uuid`
          if (!t) throw fail('NOT_FOUND_OR_FORBIDDEN', 404)
          label = t.display_name
        }
        const cur = await this.instruction(tx, s.kind, s.id ?? null, input.situation)
        const ch = input.change
        let after: { text: string; enabled: boolean }
        if (ch.kind === 'write') after = { text: ch.text, enabled: ch.enabled }
        else if (!cur) throw fail('NOT_FOUND_OR_FORBIDDEN', 404)
        else if (ch.kind === 'set_enabled') after = { text: cur.text, enabled: ch.enabled }
        else {
          const [old] = await tx.$queryRaw<Array<{ text: string }>>`SELECT text FROM app_private.agent_instruction_versions WHERE instruction_id=${cur.id}::uuid AND version=${asVersion(ch.version)}`
          if (!old) throw fail('NOT_FOUND_OR_FORBIDDEN', 404)
          after = { text: old.text, enabled: true } // restore = a NEW version with the old text (history is never rewritten)
        }
        const before = cur ? { text: cur.text, enabled: cur.enabled } : null
        if (before && before.text === after.text && before.enabled === after.enabled) throw fail('NO_CHANGE', 422)
        target = { scopeKind: s.kind, scopeId: s.id ?? null, label: `${label} / ${SITUATIONS[input.situation]}`, before, after: { situation: input.situation, ...after }, current: cur?.version ?? 0n }
      }
      // CAS starts here: a proposal is built on the version the caller has seen.
      if (target.current !== base) throw fail('VERSION_CONFLICT', 409)
      const hash = sha256(canonical({ type: input.type, scope: [target.scopeKind, target.scopeId], base: String(base), patch: target.after }))
      const [p] = await tx.$queryRaw<Array<{ id: string; expires_at: Date }>>`
        INSERT INTO app_private.agent_change_proposals(actor_user_id,channel,execution_id,command_type,scope_kind,scope_id,target_label,before,patch,payload_hash,base_version,expires_at)
        VALUES(${a.userId}::uuid,'manager_ui',${run?.executionId ?? null}::uuid,${input.type},${target.scopeKind},${target.scopeId}::uuid,${target.label},
          ${target.before === null ? null : JSON.stringify(target.before)}::jsonb,${JSON.stringify(target.after)}::jsonb,${hash},${base},now()+(${this.ttlSeconds}::int * interval '1 second'))
        RETURNING id::text,expires_at`
      const out: Prepared = { proposalId: p.id, targetLabel: target.label, changes: changes(input.type, target.before, target.after), baseVersion: String(base), expiresAt: p.expires_at.toISOString(), proposalHash: hash }
      if (run) await run.inTx(tx, out)
      return out
    })
  }

  async view(a: ManagerActor, id: string): Promise<ProposalView> {
    const p = await this.row(this.db, a, id)
    const open = p.state === 'prepared' && !p.expired
    return {
      proposalId: p.id, state: p.state === 'prepared' && p.expired ? 'expired' : p.state, commandType: p.command_type, targetLabel: p.target_label, changes: changes(p.command_type, p.before, p.patch),
      baseVersion: String(p.base_version), expiresAt: p.expires_at.toISOString(), proposalHash: p.payload_hash, runId: p.execution_id,
      allowedActions: open ? ['confirm', 'reject'] : p.state === 'confirmed' && !p.expired ? ['commit'] : [],
    }
  }

  // ---- confirm / reject: a person's explicit action on the proposal they saw (hash). No business write; wakes the waiting run.
  async confirm(a: ManagerActor, id: string, proposalHash: string) { return this.decideByUser(a, id, 'confirmed', proposalHash) }
  async reject(a: ManagerActor, id: string) { return this.decideByUser(a, id, 'rejected') }
  private async decideByUser(a: ManagerActor, id: string, decision: 'confirmed' | 'rejected', hash?: string) {
    this.gate()
    const r = await this.db.$transaction(async tx => {
      await this.active(tx, a)
      const p = await this.row(tx, a, id, true)
      if (p.state === decision) return { state: decision } // retry of the same action
      if (p.state !== 'prepared') return { error: 'PROPOSAL_NOT_PENDING' as const }
      if (p.expired) { await this.decide(tx, p.id, 'expired'); return { error: 'PROPOSAL_EXPIRED' as const } }
      if (hash !== undefined && hash !== p.payload_hash) return { error: 'PROPOSAL_HASH_MISMATCH' as const }
      await this.decide(tx, p.id, decision, a.userId)
      return { state: decision }
    })
    if ('error' in r) throw fail(r.error!, r.error === 'PROPOSAL_EXPIRED' ? 410 : 409)
    return { proposalId: id, state: r.state }
  }

  // State change + wake of the run that waits on it (report §4.3 Wait/resume): new outbox generation = wake_sequence, CAS on state.
  async decide(tx: Tx, proposalId: string, decision: 'confirmed' | 'rejected' | 'expired', by?: string) {
    await tx.$executeRaw`
      UPDATE app_private.agent_change_proposals SET state=${decision},decided_at=now(),version=version+1,
        confirmed_by=CASE WHEN ${decision}='confirmed' THEN ${by ?? null}::uuid END,confirmed_at=CASE WHEN ${decision}='confirmed' THEN now() END
      WHERE id=${proposalId}::uuid AND state='prepared'`
    const [run] = await tx.$queryRaw<Array<{ id: string; operation_id: string; wake_sequence: bigint; tool_step_id: string | null }>>`
      SELECT e.id::text,e.operation_id::text,e.wake_sequence,p.tool_step_id::text FROM app_private.ai_executions e
      JOIN app_private.agent_change_proposals p ON p.id=e.waiting_proposal_id
      WHERE e.waiting_proposal_id=${proposalId}::uuid AND e.state='waiting_confirmation' FOR UPDATE OF e`
    if (!run) return
    await tx.$executeRaw`UPDATE app_private.agent_steps SET state='succeeded',output=${JSON.stringify(decisionResult(proposalId, decision))}::jsonb,finished_at=now() WHERE id=${run.tool_step_id}::uuid AND state='waiting'`
    await wake(tx, run)
  }

  // ---- commit: consumes ONE confirmed approval; mutation + version history + command + audit + outbox in one transaction.
  async commit(a: ManagerActor, id: string, run?: { inTx: InTx<Receipt> }): Promise<Receipt> {
    this.gate()
    const r = await this.db.$transaction(async tx => {
      await this.active(tx, a)
      const peek = await this.row(tx, a, id)
      // Resource first (lock order), then the proposal.
      if (peek.command_type === 'profile.update') await tx.$queryRaw`SELECT 1 FROM public.talents WHERE id=${peek.scope_id}::uuid FOR NO KEY UPDATE`
      else await tx.$queryRaw`SELECT 1 FROM app_private.agent_instructions WHERE situation=${String(peek.patch.situation)} AND scope_kind=${peek.scope_kind} AND scope_id IS NOT DISTINCT FROM ${peek.scope_id}::uuid FOR UPDATE`
      const p = await this.row(tx, a, id, true)
      const [done] = await tx.$queryRaw<Array<{ id: string; resource_version: bigint }>>`SELECT id::text,resource_version FROM app_private.agent_commands WHERE proposal_id=${p.id}::uuid`
      if (done) { // retry after a lost response: same receipt, no second version (report §9.2)
        const receipt: Receipt = { commandId: done.id, action: p.command_type, targetLabel: p.target_label, changed: true, resourceVersion: String(done.resource_version) }
        if (run) await run.inTx(tx, receipt)
        return { receipt }
      }
      if (p.state === 'prepared') return { error: 'CONFIRMATION_REQUIRED' as const }
      if (p.state !== 'confirmed') return { error: p.state === 'expired' ? 'PROPOSAL_EXPIRED' as const : 'PROPOSAL_NOT_PENDING' as const }
      if (p.expired) return { error: 'PROPOSAL_EXPIRED' as const }
      const version = p.command_type === 'profile.update' ? await this.writeProfile(tx, a, p) : await this.writeInstruction(tx, a, p)
      if (version === null) { // someone else committed first (Dashboard / another proposal): never overwrite
        await tx.$executeRaw`UPDATE app_private.agent_change_proposals SET state='conflicted',version=version+1 WHERE id=${p.id}::uuid`
        return { error: 'VERSION_CONFLICT' as const }
      }
      const talentId = p.scope_kind === 'talent' ? p.scope_id : null
      const [op] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.domain_operations(actor_auth_user_id,operation_key,kind,talent_id,payload_hash,state)
        VALUES(${a.userId}::uuid,${'agent.change.commit:' + p.id},'agent.change.commit',${talentId}::uuid,${p.payload_hash},'completed') RETURNING id::text`
      const [cmd] = await tx.$queryRaw<Array<{ id: string }>>`
        INSERT INTO app_private.agent_commands(operation_id,proposal_id,execution_id,actor_user_id,kind,target_label,payload_hash,resource_version)
        VALUES(${op.id}::uuid,${p.id}::uuid,${p.execution_id}::uuid,${a.userId}::uuid,${p.command_type},${p.target_label},${p.payload_hash},${version}) RETURNING id::text`
      await tx.$executeRaw`UPDATE app_private.agent_change_proposals SET state='consumed',version=version+1 WHERE id=${p.id}::uuid`
      await tx.$executeRaw`
        INSERT INTO public.activity_logs(actor_type,actor_manager_id,action,target_type,target_id,result,details)
        VALUES('manager',${a.managerId}::uuid,${'agent.' + p.command_type},${p.scope_kind},${p.scope_id ?? 'global'},'succeeded',
          ${JSON.stringify({ proposalId: p.id, commandId: cmd.id, version: String(version), situation: p.patch.situation ?? null })}::jsonb)`
      // OneDrive Profile.md is an export of this version (report §6), delivered by the effect worker with retries.
      if (p.command_type === 'profile.update') await tx.$executeRaw`
        INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES(${op.id}::uuid,${version},'agent.profile.export')`
      const receipt: Receipt = { commandId: cmd.id, action: p.command_type, targetLabel: p.target_label, changed: true, resourceVersion: String(version) }
      if (run) await run.inTx(tx, receipt)
      return { receipt }
    })
    if ('error' in r) throw fail(r.error!, r.error === 'PROPOSAL_EXPIRED' ? 410 : 409)
    return r.receipt
  }

  // Reconciler: proposals past their expiry wake their run with "expired" (report §4.4).
  async expireDue(limit = 20): Promise<number> {
    const due = await this.db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM app_private.agent_change_proposals WHERE state='prepared' AND expires_at<=now() ORDER BY expires_at LIMIT ${limit}`
    for (const p of due) await this.db.$transaction(async tx => {
      const [still] = await tx.$queryRaw<unknown[]>`SELECT 1 FROM app_private.agent_change_proposals WHERE id=${p.id}::uuid AND state='prepared' AND expires_at<=now() FOR UPDATE`
      if (still) await this.decide(tx, p.id, 'expired')
    })
    return due.length
  }

  // Business reads for tools (manager scope = every Talent, [KS] K77/K93).
  async searchTalents(query: string, limit: number) {
    const like = '%' + query.replace(/[\\%_]/g, m => '\\' + m) + '%'
    return (await this.db.$queryRaw<Array<{ id: string; display_name: string; status: string }>>`
      SELECT id::text,display_name,status FROM public.talents WHERE display_name ILIKE ${like} ORDER BY display_name,id LIMIT ${limit}`).map(t => ({ talentId: t.id, displayName: t.display_name, status: t.status }))
  }
  async instructionHistory(instructionId: string, limit: number) {
    return (await this.db.$queryRaw<Array<{ version: bigint; text: string; enabled: boolean; created_at: Date }>>`
      SELECT version,text,enabled,created_at FROM app_private.agent_instruction_versions WHERE instruction_id=${instructionId}::uuid ORDER BY version DESC LIMIT ${limit}`)
      .map(h => ({ version: String(h.version), text: h.text, enabled: h.enabled, createdAt: h.created_at.toISOString() }))
  }
  // Manager view of instructions: global + (optionally) one Talent's own, with ids and versions for prepare/history.
  async instructions(talentId: string | null) {
    return (await this.db.$queryRaw<Array<{ id: string; scope_kind: string; situation: Situation; text: string; enabled: boolean; version: bigint }>>`
      SELECT id::text,scope_kind,situation,text,enabled,version FROM app_private.agent_instructions
      WHERE scope_kind='global' OR (scope_kind='talent' AND talent_id=${talentId}::uuid) ORDER BY scope_kind,situation`)
      .map(i => ({ instructionId: i.id, scope: i.scope_kind, situation: i.situation, text: i.text, enabled: i.enabled, version: String(i.version) }))
  }

  private async instruction(tx: Tx, kind: 'global' | 'talent', scopeId: string | null, situation: Situation) {
    const [i] = await tx.$queryRaw<Array<{ id: string; text: string; enabled: boolean; version: bigint }>>`
      SELECT id::text,text,enabled,version FROM app_private.agent_instructions WHERE scope_kind=${kind} AND scope_id IS NOT DISTINCT FROM ${scopeId}::uuid AND situation=${situation}`
    return i ?? null
  }
  // Only the actor who prepared it may read/confirm/commit; anything else looks like "not found" (no probing).
  private async row(tx: Tx, a: ManagerActor, id: string, lock = false): Promise<Row> {
    const rows = lock
      ? await tx.$queryRaw<Row[]>`SELECT id::text,actor_user_id::text,execution_id::text,tool_step_id::text,command_type,scope_kind,scope_id::text,target_label,before,patch,payload_hash,base_version,expires_at,state,expires_at<=now() AS expired
          FROM app_private.agent_change_proposals WHERE id=${id}::uuid FOR UPDATE`
      : await tx.$queryRaw<Row[]>`SELECT id::text,actor_user_id::text,execution_id::text,tool_step_id::text,command_type,scope_kind,scope_id::text,target_label,before,patch,payload_hash,base_version,expires_at,state,expires_at<=now() AS expired
          FROM app_private.agent_change_proposals WHERE id=${id}::uuid`
    if (!rows[0] || rows[0].actor_user_id !== a.userId) throw fail('NOT_FOUND_OR_FORBIDDEN', 404)
    return rows[0]
  }
  private async writeProfile(tx: Tx, a: ManagerActor, p: Row): Promise<bigint | null> {
    const patch = JSON.stringify(p.patch)
    const [row] = p.base_version === 0n
      ? await tx.$queryRaw<Array<{ version: bigint; profile: unknown }>>`
          INSERT INTO app_private.agent_talent_profiles(talent_id,profile,updated_by) VALUES(${p.scope_id}::uuid,${patch}::jsonb,${a.userId}::uuid)
          ON CONFLICT DO NOTHING RETURNING version,profile`
      : await tx.$queryRaw<Array<{ version: bigint; profile: unknown }>>`
          UPDATE app_private.agent_talent_profiles SET profile=profile||${patch}::jsonb,version=version+1,updated_by=${a.userId}::uuid
          WHERE talent_id=${p.scope_id}::uuid AND version=${p.base_version} RETURNING version,profile`
    if (!row) return null
    await tx.$executeRaw`INSERT INTO app_private.agent_talent_profile_versions(talent_id,version,profile,actor_user_id) VALUES(${p.scope_id}::uuid,${row.version},${JSON.stringify(row.profile)}::jsonb,${a.userId}::uuid)`
    return row.version
  }
  private async writeInstruction(tx: Tx, a: ManagerActor, p: Row): Promise<bigint | null> {
    const { situation, text, enabled } = p.patch as { situation: Situation; text: string; enabled: boolean }
    const [row] = p.base_version === 0n
      ? await tx.$queryRaw<Array<{ id: string; version: bigint }>>`
          INSERT INTO app_private.agent_instructions(scope_kind,scope_id,talent_id,situation,text,enabled,updated_by)
          VALUES(${p.scope_kind},${p.scope_id}::uuid,${p.scope_id}::uuid,${situation},${text},${enabled},${a.userId}::uuid) ON CONFLICT DO NOTHING RETURNING id::text,version`
      : await tx.$queryRaw<Array<{ id: string; version: bigint }>>`
          UPDATE app_private.agent_instructions SET text=${text},enabled=${enabled},version=version+1,updated_by=${a.userId}::uuid
          WHERE scope_kind=${p.scope_kind} AND scope_id IS NOT DISTINCT FROM ${p.scope_id}::uuid AND situation=${situation} AND version=${p.base_version} RETURNING id::text,version`
    if (!row) return null
    await tx.$executeRaw`INSERT INTO app_private.agent_instruction_versions(instruction_id,version,text,enabled,actor_user_id) VALUES(${row.id}::uuid,${row.version},${text},${enabled},${a.userId}::uuid)`
    return row.version
  }
}

// What the model reads as the result of the prepare call once a person decided.
export const decisionResult = (proposalId: string, decision: 'confirmed' | 'rejected' | 'expired') =>
  ({ kind: 'ok', data: { proposalId, decision, next: decision === 'confirmed' ? 'システムが保存する' : '保存しない。マネージャーに結果を伝える' } })

// New wake for a run (resume after a decision, or an operator retry of an unknown run). Same operation, next generation.
export async function wake(tx: Tx, run: { id: string; operation_id: string; wake_sequence: bigint }) {
  const next = run.wake_sequence + 1n
  const [ev] = await tx.$queryRaw<Array<{ id: string }>>`INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES(${run.operation_id}::uuid,${next},'agent.run.wake') RETURNING id::text`
  await tx.$executeRaw`
    UPDATE app_private.ai_executions SET state='pending',waiting_proposal_id=NULL,event_id=${ev.id}::uuid,wake_sequence=${next},last_error_code=NULL,version=version+1
    WHERE id=${run.id}::uuid AND state IN ('waiting_confirmation','unknown')`
}

function changes(type: CommandType, before: Record<string, unknown> | null, after: Record<string, unknown>): Change[] {
  const s = (x: unknown) => x === undefined || x === null ? null : typeof x === 'boolean' ? (x ? '有効' : '無効') : String(x)
  // Fixed field order (jsonb does not keep key order).
  if (type === 'profile.update') return (Object.keys(PROFILE_FIELDS) as ProfileField[]).filter(k => k in after).map(k => ({ field: PROFILE_FIELDS[k], before: s(before?.[k]), after: s(after[k]) }))
  return [{ field: '指示', before: s(before?.text), after: s(after.text) }, { field: '状態', before: s(before?.enabled), after: s(after.enabled) }].filter(c => c.before !== c.after)
}
