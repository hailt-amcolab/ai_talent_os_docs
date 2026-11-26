import type { Actor } from './actor.ts'
import type { Channel } from './access.ts'
import type { Tx } from './tx.ts'

// CommandBus (agent_spec/ai-core/ARCHITECTURE_DECISIONS.md ADR-11): one transaction = business write (handler, with CAS) +
// command receipt + audit + outbox. Same idempotency key → the stored receipt, never a second write.
export type CommandType = 'talent_profile.update' | 'ai_instruction.write'
export type Target = { kind: 'talent' | 'global' | 'category'; id: string | null; label: string }
// The only effect today is the OneDrive profile export.
export type Effect = { eventType: 'talent_profile.export'; talentId: string; generation: bigint }
export type Applied = { version: bigint; changed: boolean; effects?: Effect[] } | null
export type Receipt = { commandId: string; commandType: CommandType; targetLabel: string; changed: boolean; resultVersion: string | null; createdAt: string }
export type CommandInput = { commandType: CommandType; channel: Channel; idempotencyKey: string; payloadHash: string; target: Target; runId?: string | null; proposalId?: string | null }

export async function execute(tx: Tx, actor: Actor, cmd: CommandInput, apply: (tx: Tx) => Promise<Applied>): Promise<{ receipt: Receipt } | { conflict: true }> {
  const [done] = await tx.$queryRaw<Array<{ receipt: Receipt }>>`SELECT receipt FROM app_private.business_commands WHERE idempotency_key=${cmd.idempotencyKey}`
  if (done) return { receipt: done.receipt }
  const applied = await apply(tx)
  if (!applied) return { conflict: true } // CAS lost: someone saved first; never overwrite
  const talentId = cmd.target.kind === 'talent' ? cmd.target.id : null
  let operationId: string | null = null
  if (applied.effects?.length) {
    const [op] = await tx.$queryRaw<Array<{ id: string }>>`
      INSERT INTO app_private.domain_operations(actor_auth_user_id,operation_key,kind,talent_id,payload_hash,state)
      VALUES(${actor.userId}::uuid,${'control.command:' + cmd.idempotencyKey},'control.command',${talentId}::uuid,${cmd.payloadHash},'completed') RETURNING id::text`
    operationId = op.id
    for (const e of applied.effects) await tx.$executeRaw`
      INSERT INTO app_private.outbox_events(operation_id,generation,event_type) VALUES(${op.id}::uuid,${e.generation},${e.eventType})`
  }
  // Append-only table (no UPDATE grant): build the receipt from a DB-generated id/time, then insert once.
  const [row] = await tx.$queryRaw<Array<{ id: string; created_at: Date }>>`SELECT gen_random_uuid()::text AS id, now() AS created_at`
  const receipt: Receipt = { commandId: row.id, commandType: cmd.commandType, targetLabel: cmd.target.label, changed: applied.changed, resultVersion: String(applied.version), createdAt: row.created_at.toISOString() }
  await tx.$executeRaw`
    INSERT INTO app_private.business_commands(id,command_type,actor_kind,actor_user_id,channel,run_id,proposal_id,operation_id,idempotency_key,target_kind,target_id,target_label,payload_hash,result_version,changed,receipt,created_at)
    VALUES(${row.id}::uuid,${cmd.commandType},${actor.kind},${actor.userId}::uuid,${cmd.channel},${cmd.runId ?? null}::uuid,${cmd.proposalId ?? null}::uuid,${operationId}::uuid,${cmd.idempotencyKey},
      ${cmd.target.kind},${cmd.target.id}::uuid,${cmd.target.label},${cmd.payloadHash},${applied.version},${applied.changed},${JSON.stringify(receipt)}::jsonb,${row.created_at})`
  const managerId = actor.kind === 'manager' ? actor.managerId : null, actorTalentId = actor.kind === 'talent' ? actor.talentId : null
  await tx.$executeRaw`
    INSERT INTO public.activity_logs(actor_type,actor_manager_id,actor_talent_id,action,target_type,target_id,result,details)
    VALUES(${actor.kind},${managerId}::uuid,${actorTalentId}::uuid,${'control.' + cmd.commandType},${cmd.target.kind},${cmd.target.id ?? 'global'},'succeeded',
      ${JSON.stringify({ commandId: row.id, proposalId: cmd.proposalId ?? null, version: String(applied.version), channel: cmd.channel })}::jsonb)`
  return { receipt }
}
