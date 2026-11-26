import type { Tx } from '../../control/tx.ts'
import { profileReady, type Profile, type Situation } from './model.ts'

// Reads of Coach Configuration for the AI Core (context builder, read tools) and admin screens. Server-scoped: the caller
// decides WHICH Talent (the Talent channel always passes its own id); these functions never widen the scope.
export type Instruction = { id: string; scope: 'global' | 'talent'; situation: Situation; text: string; version: string }
export type Goal = { platform: string; targetFollowers: number; deadlineOn: string | null; achieved: boolean }
export type TalentContext = { talentId: string; displayName: string; isMinor: boolean; profile: Profile | null; profileVersion: string; profileReady: boolean
  instructions: Instruction[]; goals: Goal[] }

export async function readTalentContext(tx: Tx, talentId: string): Promise<TalentContext | null> {
  const [t] = await tx.$queryRaw<Array<{ display_name: string; minor: boolean | null }>>`
    SELECT display_name,(birth_date > current_date - interval '18 years') AS minor FROM public.talents WHERE id=${talentId}::uuid`
  if (!t) return null
  const [p] = await tx.$queryRaw<Array<{ profile: Profile; version: bigint }>>`SELECT profile,version FROM app_private.talent_profiles WHERE talent_id=${talentId}::uuid`
  // Talent > global per situation (YK3 §2-4-14); category scope is not ready (no canonical category table).
  const instructions = await tx.$queryRaw<Array<{ id: string; scope_kind: 'global' | 'talent'; situation: Situation; text: string; version: bigint }>>`
    SELECT DISTINCT ON (situation) id::text,scope_kind,situation,text,version FROM app_private.ai_instructions
    WHERE enabled AND (scope_kind='global' OR (scope_kind='talent' AND talent_id=${talentId}::uuid)) ORDER BY situation,(scope_kind='talent') DESC`
  const goals = await tx.$queryRaw<Array<{ platform: string; target_followers: number; deadline_on: string | null; achieved: boolean }>>`
    SELECT platform,target_followers,to_char(deadline_on,'YYYY-MM-DD') AS deadline_on,achieved_at IS NOT NULL AS achieved FROM public.follower_goals WHERE talent_id=${talentId}::uuid ORDER BY platform`
  const profile = p?.profile ?? null
  return { talentId, displayName: t.display_name, isMinor: !!t.minor, profile, profileVersion: String(p?.version ?? 0n), profileReady: profileReady(profile),
    instructions: instructions.map(i => ({ id: i.id, scope: i.scope_kind, situation: i.situation, text: i.text, version: String(i.version) })),
    goals: goals.map(g => ({ platform: g.platform, targetFollowers: g.target_followers, deadlineOn: g.deadline_on, achieved: g.achieved })) }
}

// Manager view of instructions (ids, versions, disabled ones): needed to prepare a change or read its history.
export async function managerInstructions(tx: Tx, talentId: string | null) {
  return (await tx.$queryRaw<Array<{ id: string; scope_kind: string; situation: Situation; text: string; enabled: boolean; version: bigint }>>`
    SELECT id::text,scope_kind,situation,text,enabled,version FROM app_private.ai_instructions
    WHERE scope_kind='global' OR (scope_kind='talent' AND talent_id=${talentId}::uuid) ORDER BY scope_kind,situation`)
    .map(i => ({ instructionId: i.id, scope: i.scope_kind, situation: i.situation, text: i.text, enabled: i.enabled, version: String(i.version) }))
}

export async function searchTalents(tx: Tx, query: string, limit: number) {
  const like = '%' + query.replace(/[\\%_]/g, m => '\\' + m) + '%'
  return (await tx.$queryRaw<Array<{ id: string; display_name: string; status: string }>>`
    SELECT id::text,display_name,status FROM public.talents WHERE display_name ILIKE ${like} ORDER BY display_name,id LIMIT ${limit}`)
    .map(t => ({ talentId: t.id, displayName: t.display_name, status: t.status }))
}

export async function instructionHistory(tx: Tx, instructionId: string, limit: number) {
  return (await tx.$queryRaw<Array<{ version: bigint; text: string; enabled: boolean; created_at: Date }>>`
    SELECT version,text,enabled,created_at FROM app_private.ai_instruction_versions WHERE instruction_id=${instructionId}::uuid ORDER BY version DESC LIMIT ${limit}`)
    .map(h => ({ version: String(h.version), text: h.text, enabled: h.enabled, createdAt: h.created_at.toISOString() }))
}
