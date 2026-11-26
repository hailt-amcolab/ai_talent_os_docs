import { z } from 'zod'
import { AppError } from '../../core/errors.ts'
import { canonical, sha256 } from '../../core/hash.ts'
import { INSTRUCTION_MAX, PROFILE_FIELD_MAX, SITUATIONS, type Situation } from '../../modules/coach-config/model.ts'
import { instructionHistory, managerInstructions, readTalentContext, searchTalents } from '../../modules/coach-config/reader.ts'
import type { InstructionInput, ProfileInput } from '../../modules/coach-config/handlers.ts'
import { defineTool, type AppRunContext } from './define.ts'

// Tool catalogue (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §2.4). No change_commit / confirm tool: a person confirms (ADR-04).
const uuid = z.uuid(), version = z.string().regex(/^\d{1,18}$/), text = (max: number) => z.string().trim().min(1).max(max)
const situation = z.enum(Object.keys(SITUATIONS) as [Situation, ...Situation[]])
// Same logical call inside one run → same proposal (AI_RUNTIME_DESIGN.md §6.3).
// MCP has no run: the same call from the same grant within 10 minutes is the same proposal (a ChatGPT retry).
const keyOf = (ctx: AppRunContext, tool: string, args: unknown) => sha256(`${ctx.runId ?? `mcp:${ctx.grantId}:${Math.floor(Date.now() / 600_000)}`}|${tool}|${canonical(args)}`)
const manager = (ctx: AppRunContext) => { if (ctx.actor.kind !== 'manager') throw new AppError('ACTION_NOT_ALLOWED', 403); return ctx.actor }

const contextRead = defineTool({
  name: 'context_read', capability: 'context.read', channels: ['talent', 'manager_ui', 'manager_mcp'], writes: false, ready: true,
  description: 'タレントのプロフィール・AIへの指示・フォロワー目標を読む。タレントは自分の情報だけ(talentId は省略)。マネージャーは talentId を指定する。全タレント共通の指示だけを見るときは talentId を省略し sections=["instructions"]。',
  parameters: z.object({ talentId: uuid.optional(), sections: z.array(z.enum(['profile', 'instructions', 'goals'])).min(1).max(3) }).strict(),
  async run(a, ctx) {
    const db = ctx.services.db
    let talentId: string
    if (ctx.actor.kind === 'talent') {
      if (a.talentId && a.talentId !== ctx.actor.talentId) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404) // the server decides "me"
      talentId = ctx.actor.talentId
    } else if (!a.talentId) {
      // Manager without a Talent: the global instructions (ids + versions), needed to prepare a global change (eval 26/11).
      if (a.sections.some(x => x !== 'instructions')) throw new AppError('INPUT_INVALID', 422)
      return { instructions: await managerInstructions(db, null) }
    } else talentId = a.talentId
    const t = await readTalentContext(db, talentId)
    if (!t) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
    if (ctx.actor.kind === 'manager') await db.$executeRaw`INSERT INTO public.manager_view_logs(manager_id,talent_id,screen) VALUES(${ctx.actor.managerId}::uuid,${talentId}::uuid,'talent_info')`
    const out: Record<string, unknown> = { talent: { talentId, displayName: t.displayName, isMinor: t.isMinor } }
    if (a.sections.includes('profile')) out.profile = { version: t.profileVersion, ready: t.profileReady, fields: t.profile ?? {} }
    if (a.sections.includes('instructions')) out.instructions = ctx.actor.kind === 'manager' ? await managerInstructions(db, talentId) : t.instructions.map(i => ({ situation: i.situation, scope: i.scope, text: i.text }))
    if (a.sections.includes('goals')) out.goals = t.goals
    return out
  },
})
const talentSearch = defineTool({
  name: 'talent_search', capability: 'talent.search', channels: ['manager_ui', 'manager_mcp'], writes: false, ready: true,
  description: 'タレントを名前で検索する(部分一致)。', parameters: z.object({ query: text(50), limit: z.number().int().min(1).max(20).optional() }).strict(),
  run: async (a, ctx) => ({ items: await searchTalents(ctx.services.db, a.query, a.limit ?? 10) }),
})
const history = defineTool({
  name: 'instruction_history', capability: 'instruction.history', channels: ['manager_ui', 'manager_mcp'], writes: false, ready: true,
  description: '指示の過去バージョンを新しい順に読む。戻すときは instruction_prepare の change.kind=restore を使う。',
  parameters: z.object({ instructionId: uuid, limit: z.number().int().min(1).max(20).optional() }).strict(),
  run: async (a, ctx) => ({ items: await instructionHistory(ctx.services.db, a.instructionId, a.limit ?? 10) }),
})
const field = text(PROFILE_FIELD_MAX).optional()
const profilePrepare = defineTool({
  name: 'profile_prepare', capability: 'talent_profile.prepare', channels: ['manager_ui', 'manager_mcp'], writes: true, ready: true,
  description: 'タレントのプロフィール変更案を作る(まだ保存しない)。expectedVersion は context_read で見たプロフィールの version(まだないときは "0")。マネージャーが画面のカードで確認して保存すると、システムが保存する。',
  parameters: z.object({ talentId: uuid, expectedVersion: version, patch: z.object({ profile: field, direction: field, hobbiesSkills: field, futureGoal: field, tone: field }).strict() }).strict(),
  run: (a, ctx) => ctx.services.proposals.prepare<ProfileInput>(manager(ctx), ctx.channel, 'talent_profile.update',
    { talentId: a.talentId, expectedVersion: a.expectedVersion, patch: Object.fromEntries(Object.entries(a.patch).filter(([, v]) => v != null)) }, { idempotencyKey: keyOf(ctx, 'profile_prepare', a), runId: ctx.runId, clientGrantId: ctx.grantId }),
})
const instructionPrepare = defineTool({
  name: 'instruction_prepare', capability: 'ai_instruction.prepare', channels: ['manager_ui', 'manager_mcp'], writes: true, ready: true,
  description: 'AIへの指示の変更案を作る(まだ保存しない)。scope.kind=global は全タレント共通(id なし)、talent は id 必須。situation は8つの場面のどれか。expectedVersion は context_read で見た version、まだない指示を新しく作るときは "0"。',
  parameters: z.object({ scope: z.object({ kind: z.enum(['global', 'talent', 'category']), id: uuid.optional() }).strict(), situation, expectedVersion: version,
    change: z.object({ kind: z.enum(['write', 'set_enabled', 'restore']), text: text(INSTRUCTION_MAX).optional(), enabled: z.boolean().optional(), version: version.optional() }).strict() }).strict(),
  run(a, ctx) {
    const c = a.change, bad = () => { throw new AppError('INPUT_INVALID', 422) }
    const change: InstructionInput['change'] = c.kind === 'write' ? (c.text && c.enabled != null ? { kind: 'write', text: c.text, enabled: c.enabled } : bad())
      : c.kind === 'set_enabled' ? (c.enabled != null ? { kind: 'set_enabled', enabled: c.enabled } : bad()) : (c.version ? { kind: 'restore', version: c.version } : bad())
    const scope = a.scope.id ? { kind: a.scope.kind, id: a.scope.id } : { kind: a.scope.kind }
    return ctx.services.proposals.prepare<InstructionInput>(manager(ctx), ctx.channel, 'ai_instruction.write', { scope, situation: a.situation, expectedVersion: a.expectedVersion, change },
      { idempotencyKey: keyOf(ctx, 'instruction_prepare', a), runId: ctx.runId, clientGrantId: ctx.grantId })
  },
})

export const TOOLS = [contextRead, talentSearch, history, profilePrepare, instructionPrepare]
