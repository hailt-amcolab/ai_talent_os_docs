import type { Tx } from '../../control/tx.ts'
import type { Actor } from '../../control/actor.ts'
import { AppError } from '../../core/errors.ts'
import { readTalentContext, type TalentContext } from '../../modules/coach-config/reader.ts'
import { managerAssistant, ref, talentCoach } from '../prompts/registry.ts'

// Context assembly (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §4.2): one short snapshot read before the model call; the
// manifest (versions actually used) is stored on the run. Conversation history comes from the session, not from here.
export type ContextPack = { kind: 'talent'; talent: TalentContext } | { kind: 'manager'; today: string }
export type Manifest = { prompt: string; profileVersion?: string; instructions?: Array<{ id: string; version: string }>; builtAt: string }

// ponytail: no per-section character budget yet — profile fields (≤4000) and instructions (≤1000) are capped when saved;
// add the budget of §4.2 when a section without a save-time cap (news, media analysis) enters the context.
export async function buildContext(tx: Tx, actor: Actor): Promise<{ pack: ContextPack; manifest: Manifest }> {
  const builtAt = new Date().toISOString()
  if (actor.kind === 'manager') return { pack: { kind: 'manager', today: new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10) }, manifest: { prompt: ref(managerAssistant), builtAt } }
  const talent = await readTalentContext(tx, actor.talentId)
  if (!talent) throw new AppError('TALENT_REQUIRED', 403)
  return { pack: { kind: 'talent', talent }, manifest: { prompt: ref(talentCoach), profileVersion: talent.profileVersion, instructions: talent.instructions.map(i => ({ id: i.id, version: i.version })), builtAt } }
}

export const instructionsFor = (pack: ContextPack) => pack.kind === 'talent' ? talentCoach.build(pack.talent) : managerAssistant.build(pack.today)
export const promptOf = (pack: ContextPack) => ref(pack.kind === 'talent' ? talentCoach : managerAssistant)
