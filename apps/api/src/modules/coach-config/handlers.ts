import { AppError } from '../../core/errors.ts'
import type { Actor } from '../../control/actor.ts'
import type { Applied } from '../../control/commands.ts'
import type { Change, Plan, ProposalHandler, ProposalRow } from '../../control/proposals.ts'
import type { Tx } from '../../control/tx.ts'
import { PROFILE_FIELDS, SITUATIONS, type Profile, type ProfileField, type Situation } from './model.ts'

// Command handlers of Coach Configuration (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §2.4): profile and AI instructions.
// Data lives in talent_profiles / ai_instructions (+ _versions) until the ai_core migration renames them.
const notFound = () => new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
const str = (x: unknown) => x === undefined || x === null ? null : typeof x === 'boolean' ? (x ? '有効' : '無効') : String(x)

export type ProfileInput = { talentId: string; expectedVersion: string; patch: Profile }
export const talentProfileUpdate: ProposalHandler<ProfileInput> = {
  type: 'talent_profile.update', capability: 'talent_profile.prepare',
  async plan(tx, input): Promise<Plan> {
    const [t] = await tx.$queryRaw<Array<{ display_name: string; profile: Profile | null; version: bigint | null }>>`
      SELECT t.display_name,p.profile,p.version FROM public.talents t LEFT JOIN app_private.talent_profiles p ON p.talent_id=t.id WHERE t.id=${input.talentId}::uuid`
    if (!t) throw notFound()
    const before = t.profile ?? {}
    const patch = Object.fromEntries(Object.entries(input.patch).filter(([k, v]) => k in PROFILE_FIELDS && v !== undefined && before[k as ProfileField] !== v))
    if (!Object.keys(patch).length) throw new AppError('NO_CHANGE', 422)
    return { target: { kind: 'talent', id: input.talentId, label: `${t.display_name} / プロフィール` }, before: t.profile, patch, currentVersion: t.version ?? 0n }
  },
  async lock(tx, p) { await tx.$queryRaw`SELECT 1 FROM public.talents WHERE id=${p.target_id}::uuid FOR NO KEY UPDATE` },
  async apply(tx, actor, p): Promise<Applied> {
    const patch = JSON.stringify(p.patch)
    const [row] = p.base_version === 0n
      ? await tx.$queryRaw<Array<{ version: bigint; profile: unknown }>>`
          INSERT INTO app_private.talent_profiles(talent_id,profile,updated_by) VALUES(${p.target_id}::uuid,${patch}::jsonb,${actor.userId}::uuid)
          ON CONFLICT DO NOTHING RETURNING version,profile`
      : await tx.$queryRaw<Array<{ version: bigint; profile: unknown }>>`
          UPDATE app_private.talent_profiles SET profile=profile||${patch}::jsonb,version=version+1,updated_by=${actor.userId}::uuid
          WHERE talent_id=${p.target_id}::uuid AND version=${p.base_version} RETURNING version,profile`
    if (!row) return null
    await tx.$executeRaw`INSERT INTO app_private.talent_profile_versions(talent_id,version,profile,actor_user_id) VALUES(${p.target_id}::uuid,${row.version},${JSON.stringify(row.profile)}::jsonb,${actor.userId}::uuid)`
    // OneDrive Profile.md is an export of this version (one-way, retried by the effect worker).
    return { version: row.version, changed: true, effects: [{ eventType: 'talent_profile.export', talentId: p.target_id!, generation: row.version }] }
  },
  changes(before, patch): Change[] {
    return (Object.keys(PROFILE_FIELDS) as ProfileField[]).filter(k => k in patch).map(k => ({ field: PROFILE_FIELDS[k], before: str(before?.[k]), after: str(patch[k]) }))
  },
}

export type InstructionChange = { kind: 'write'; text: string; enabled: boolean } | { kind: 'set_enabled'; enabled: boolean } | { kind: 'restore'; version: string }
export type InstructionInput = { scope: { kind: 'global' | 'talent' | 'category'; id?: string }; situation: Situation; expectedVersion: string; change: InstructionChange }
type Current = { id: string; text: string; enabled: boolean; version: bigint }
const current = async (tx: Tx, kind: 'global' | 'talent', scopeId: string | null, situation: Situation) => (await tx.$queryRaw<Current[]>`
  SELECT id::text,text,enabled,version FROM app_private.ai_instructions WHERE scope_kind=${kind} AND scope_id IS NOT DISTINCT FROM ${scopeId}::uuid AND situation=${situation}`)[0] ?? null

export const aiInstructionWrite: ProposalHandler<InstructionInput> = {
  type: 'ai_instruction.write', capability: 'ai_instruction.prepare',
  async plan(tx, input): Promise<Plan> {
    const s = input.scope
    if (s.kind === 'category') throw new AppError('FEATURE_NOT_READY', 503) // no canonical category table yet
    if ((s.kind === 'global') !== (s.id === undefined)) throw new AppError('INPUT_INVALID', 422)
    if (!(input.situation in SITUATIONS)) throw new AppError('INPUT_INVALID', 422)
    let label = '全タレント共通'
    if (s.kind === 'talent') {
      const [t] = await tx.$queryRaw<Array<{ display_name: string }>>`SELECT display_name FROM public.talents WHERE id=${s.id!}::uuid`
      if (!t) throw notFound()
      label = t.display_name
    }
    const cur = await current(tx, s.kind, s.id ?? null, input.situation), ch = input.change
    let after: { text: string; enabled: boolean }
    if (ch.kind === 'write') after = { text: ch.text, enabled: ch.enabled }
    else if (!cur) throw notFound()
    else if (ch.kind === 'set_enabled') after = { text: cur.text, enabled: ch.enabled }
    else {
      if (!/^\d{1,18}$/.test(ch.version)) throw new AppError('INPUT_INVALID', 422)
      const [old] = await tx.$queryRaw<Array<{ text: string }>>`SELECT text FROM app_private.ai_instruction_versions WHERE instruction_id=${cur.id}::uuid AND version=${BigInt(ch.version)}`
      if (!old) throw notFound()
      after = { text: old.text, enabled: true } // restore = a NEW version with the old text; history is never rewritten
    }
    const before = cur ? { text: cur.text, enabled: cur.enabled } : null
    if (before && before.text === after.text && before.enabled === after.enabled) throw new AppError('NO_CHANGE', 422)
    return { target: { kind: s.kind, id: s.id ?? null, label: `${label} / ${SITUATIONS[input.situation]}` }, before, patch: { situation: input.situation, ...after }, currentVersion: cur?.version ?? 0n }
  },
  async lock(tx, p) {
    await tx.$queryRaw`SELECT 1 FROM app_private.ai_instructions WHERE situation=${String(p.patch.situation)} AND scope_kind=${p.target_kind} AND scope_id IS NOT DISTINCT FROM ${p.target_id}::uuid FOR UPDATE`
  },
  async apply(tx, actor, p: ProposalRow): Promise<Applied> {
    const { situation, text, enabled } = p.patch as { situation: Situation; text: string; enabled: boolean }
    const [row] = p.base_version === 0n
      ? await tx.$queryRaw<Array<{ id: string; version: bigint }>>`
          INSERT INTO app_private.ai_instructions(scope_kind,scope_id,talent_id,situation,text,enabled,updated_by)
          VALUES(${p.target_kind},${p.target_id}::uuid,${p.target_id}::uuid,${situation},${text},${enabled},${actor.userId}::uuid) ON CONFLICT DO NOTHING RETURNING id::text,version`
      : await tx.$queryRaw<Array<{ id: string; version: bigint }>>`
          UPDATE app_private.ai_instructions SET text=${text},enabled=${enabled},version=version+1,updated_by=${actor.userId}::uuid
          WHERE scope_kind=${p.target_kind} AND scope_id IS NOT DISTINCT FROM ${p.target_id}::uuid AND situation=${situation} AND version=${p.base_version} RETURNING id::text,version`
    if (!row) return null
    await tx.$executeRaw`INSERT INTO app_private.ai_instruction_versions(instruction_id,version,text,enabled,actor_user_id) VALUES(${row.id}::uuid,${row.version},${text},${enabled},${actor.userId}::uuid)`
    return { version: row.version, changed: true }
  },
  changes(before, patch): Change[] {
    return [{ field: '指示', before: str(before?.text), after: str(patch.text) }, { field: '状態', before: str(before?.enabled), after: str(patch.enabled) }].filter(c => c.before !== c.after)
  },
}

export const coachConfigHandlers = [talentProfileUpdate, aiInstructionWrite] as const
// re-exported for callers that build inputs (tools at P2, MCP at P4)
export type { Actor }
