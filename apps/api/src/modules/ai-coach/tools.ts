import { z } from 'zod'
import type { Database } from '../../infra/database/client.ts'
import { AppError } from '../../core/errors.ts'
import type { ChangeService, Prepared, Receipt, Tx } from './changes.ts'
import { INSTRUCTION_MAX, PROFILE_FIELD_MAX, SITUATIONS, talentSnapshot, type Situation } from './context.ts'
import type { ToolCallOut, ToolSpec } from './model.ts'
import { LeaseLost, type Channel, type Claim, type RunStore, type StepRow } from './store.ts'

// Tool registry (report §7.2) + executor (report §5.1). The model only gets the tools of its channel; actor, grant and
// idempotency never come from the model. Every call gets a result in the ledger, also denials and invalid input (§7.3).
export type ToolResult =
  | { kind: 'ok'; data: unknown; receipt?: { commandId: string; changed: boolean } }
  | { kind: 'waiting_confirmation'; proposalId: string; expiresAt: string; preview: Prepared }
  | { kind: 'denied' | 'invalid' | 'conflict' | 'unavailable'; code: string; messageKey: string; retryable: boolean; issues?: Array<{ path: string; message: string }> }
type Ctx = { c: Claim; db: Database; store: RunStore; changes: ChangeService; step: { sequence: number; sourceModelStepId: string; callId: string; toolName: string; input: unknown } }
type Handled = { result: ToolResult; recorded?: boolean; stepId?: string } // recorded: the step row was written inside the service transaction
type Def = { name: string; capability: string; label: string; channels: Channel[]; writes: boolean; ready: boolean; description: string; schema: z.ZodType
  run(ctx: Ctx, args: never): Promise<Handled> }

// UUID as a plain pattern: some models copy a JSON-schema 'format' keyword into the arguments as if it were a field.
const uuid = z.string().regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/).describe('UUID'), version = z.string().regex(/^\d{1,18}$/).describe('context_read が返した version(新規は "0")')
const text = (max: number) => z.string().trim().min(1).max(max)
const sectionsEnum = z.enum(['profile', 'instructions', 'goals'])
const situation = z.enum(Object.keys(SITUATIONS) as [Situation, ...Situation[]])
const ok = (data: unknown): Handled => ({ result: { kind: 'ok', data } })

async function contextOf(db: Database, changes: ChangeService, talentId: string, sections: string[], manager: boolean) {
  const [t] = await db.$queryRaw<unknown[]>`SELECT 1 FROM public.talents WHERE id=${talentId}::uuid`
  if (!t) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
  const s = await talentSnapshot(db, talentId)
  const out: Record<string, unknown> = { talent: { talentId, displayName: s.displayName, isMinor: s.isMinor }, source: 'postgres', readAt: new Date().toISOString() }
  if (sections.includes('profile')) out.profile = { version: s.profileVersion, ready: s.profileReady, fields: s.profile ?? {} }
  // Manager sees ids/versions/disabled ones (needed for prepare/history); the Talent sees what applies to it.
  if (sections.includes('instructions')) out.instructions = manager ? await changes.instructions(talentId) : s.instructions.map(i => ({ situation: i.situation, scope: i.scope, text: i.text }))
  if (sections.includes('goals')) out.goals = s.goals
  return out
}

async function prepare(ctx: Ctx, input: Parameters<ChangeService['prepare']>[1]): Promise<Handled> {
  if (ctx.c.actor.kind !== 'manager') throw new AppError('ACTION_NOT_ALLOWED', 403)
  let stepId = ''
  const p = await ctx.changes.prepare(ctx.c.actor, input, { executionId: ctx.c.runId, inTx: async (tx, r) => {
    const result: ToolResult = { kind: 'waiting_confirmation', proposalId: r.proposalId, expiresAt: r.expiresAt, preview: r }
    stepId = await ctx.store.toolStep(tx, ctx.c, { ...ctx.step, state: 'waiting', output: result })
    await ctx.store.suspend(tx, ctx.c, r.proposalId, stepId)
  } })
  return { result: { kind: 'waiting_confirmation', proposalId: p.proposalId, expiresAt: p.expiresAt, preview: p }, recorded: true, stepId }
}

const DEFS: Def[] = [
  { name: 'context_read', capability: 'context.read', label: '情報の確認', channels: ['talent', 'manager_ui'], writes: false, ready: true,
    description: 'タレントのプロフィール・AIへの指示・フォロワー目標を Postgres から読む。マネージャーは talentId が必須。タレントは自分の情報だけ(talentId は省略)。',
    schema: z.object({ talentId: uuid.optional(), sections: z.array(sectionsEnum).min(1).max(3) }).strict(),
    async run(ctx, a: { talentId?: string; sections: string[] }) {
      const actor = ctx.c.actor
      if (actor.kind === 'talent') {
        if (a.talentId && a.talentId !== actor.talentId) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404) // the server decides "me"
        return ok(await contextOf(ctx.db, ctx.changes, actor.talentId, a.sections, false))
      }
      if (!a.talentId) throw new AppError('INPUT_INVALID', 422)
      return ok(await contextOf(ctx.db, ctx.changes, a.talentId, a.sections, true))
    } },
  { name: 'talent_search', capability: 'talent.search', label: 'タレント検索', channels: ['manager_ui'], writes: false, ready: true,
    description: 'タレントを名前で検索する(部分一致)。', schema: z.object({ query: text(50), limit: z.number().int().min(1).max(20).optional() }).strict(),
    async run(ctx, a: { query: string; limit?: number }) { return ok({ items: await ctx.changes.searchTalents(a.query, a.limit ?? 10) }) } },
  { name: 'instruction_history', capability: 'instruction.history', label: '指示の履歴', channels: ['manager_ui'], writes: false, ready: true,
    description: '指示の過去バージョンを新しい順に読む。戻すときは instruction_prepare の change.kind=restore を使う。',
    schema: z.object({ instructionId: uuid, limit: z.number().int().min(1).max(20).optional() }).strict(),
    async run(ctx, a: { instructionId: string; limit?: number }) { return ok({ items: await ctx.changes.instructionHistory(a.instructionId, a.limit ?? 10) }) } },
  { name: 'profile_prepare', capability: 'profile.prepare', label: 'プロフィール変更案', channels: ['manager_ui'], writes: true, ready: true,
    description: 'タレントのプロフィール変更案を作る(まだ保存しない)。マネージャーが画面で確認してから change_commit で保存する。',
    schema: z.object({ talentId: uuid, expectedVersion: version, patch: z.object({ profile: text(PROFILE_FIELD_MAX).optional(), direction: text(PROFILE_FIELD_MAX).optional(),
      hobbiesSkills: text(PROFILE_FIELD_MAX).optional(), futureGoal: text(PROFILE_FIELD_MAX).optional(), tone: text(PROFILE_FIELD_MAX).optional() }).strict() }).strict(),
    run: (ctx, a: { talentId: string; expectedVersion: string; patch: Record<string, string> }) => prepare(ctx, { type: 'profile.update', ...a }) },
  { name: 'instruction_prepare', capability: 'instruction.prepare', label: 'AIへの指示の変更案', channels: ['manager_ui'], writes: true, ready: true,
    description: 'AIへの指示の変更案を作る(まだ保存しない)。scope.kind=global は全タレント共通、talent は id 必須。situation は8つの場面のどれか。',
    schema: z.object({ scope: z.object({ kind: z.enum(['global', 'talent', 'category']), id: uuid.optional() }).strict(), situation, expectedVersion: version,
      change: z.discriminatedUnion('kind', [
        z.object({ kind: z.literal('write'), text: text(INSTRUCTION_MAX), enabled: z.boolean() }).strict(),
        z.object({ kind: z.literal('set_enabled'), enabled: z.boolean() }).strict(),
        z.object({ kind: z.literal('restore'), version }).strict()]) }).strict(),
    run: (ctx, a: never) => prepare(ctx, { type: 'instruction.write', ...(a as object) } as Parameters<ChangeService['prepare']>[1]) },
  { name: 'change_commit', capability: 'change.commit', label: '変更の保存', channels: ['manager_ui'], writes: true, ready: true,
    description: 'マネージャーが画面で確認済みの変更案を保存する。確認されていない案は保存できない(確認はこのツールではできない)。',
    schema: z.object({ proposalId: uuid }).strict(),
    async run(ctx, a: { proposalId: string }) {
      if (ctx.c.actor.kind !== 'manager') throw new AppError('ACTION_NOT_ALLOWED', 403)
      let stepId = ''
      const receipt = await ctx.changes.commit(ctx.c.actor, a.proposalId, { inTx: async (tx: Tx, r: Receipt) => {
        stepId = await ctx.store.toolStep(tx, ctx.c, { ...ctx.step, state: 'succeeded', output: { kind: 'ok', data: r, receipt: { commandId: r.commandId, changed: r.changed } } })
      } })
      return { result: { kind: 'ok', data: receipt, receipt: { commandId: receipt.commandId, changed: receipt.changed } }, recorded: true, stepId }
    } },
  // Talent write tool of report §7.2 whose module/policy is not ready (autopost, QA70/83): declared, never offered.
  { name: 'autopost_set_theme', capability: 'autopost.setTheme', label: '自動投稿のテーマ変更', channels: ['talent'], writes: true, ready: false,
    description: '自動投稿の期間のテーマを変更する。', schema: z.object({ periodId: uuid, expectedVersion: version, theme: text(200) }).strict(),
    async run() { throw new AppError('FEATURE_NOT_READY', 503) } },
]

// Startup check (report §7.2): aliases are function-name safe and unique.
const BY_NAME = new Map(DEFS.map(d => [d.name, d]))
if (BY_NAME.size !== DEFS.length || DEFS.some(d => !/^[a-z][a-z0-9_]{0,63}$/.test(d.name))) throw new Error('TOOL_REGISTRY_INVALID')
export const toolLabel = (name: string) => BY_NAME.get(name)?.label ?? name
export const WRITE_TOOLS = new Set(DEFS.filter(d => d.writes).map(d => d.name))

// Not ready, or writes disabled → the tool is not offered at all (report §7.2).
export function toolsFor(channel: Channel, writesEnabled: boolean): ToolSpec[] {
  return DEFS.filter(d => d.channels.includes(channel) && d.ready && (writesEnabled || !d.writes)).map(d => ({ name: d.name, description: d.description, schema: d.schema }))
}

const KIND: Record<string, 'denied' | 'invalid' | 'conflict' | 'unavailable'> = {
  NOT_FOUND_OR_FORBIDDEN: 'denied', ACTION_NOT_ALLOWED: 'denied', ACTOR_DISABLED: 'denied',
  VERSION_CONFLICT: 'conflict', PROPOSAL_EXPIRED: 'conflict', PROPOSAL_NOT_PENDING: 'conflict', CONFIRMATION_REQUIRED: 'conflict', PROPOSAL_HASH_MISMATCH: 'conflict',
  FEATURE_NOT_READY: 'unavailable', PROFILE_NOT_READY: 'unavailable', INPUT_INVALID: 'invalid', NO_CHANGE: 'invalid',
}
const failure = (code: string): Extract<ToolResult, { code: string }> => ({ kind: KIND[code] ?? 'unavailable', code, messageKey: 'agent.tool.' + code.toLowerCase(), retryable: KIND[code] === 'conflict' })

export type Executed = { step: StepRow; waiting: boolean; stop: string | null }
export async function execute(call: ToolCallOut, base: Omit<Ctx, 'step'> & { sequence: number; sourceModelStepId: string; writesEnabled: boolean }): Promise<Executed> {
  const step = { sequence: base.sequence, sourceModelStepId: base.sourceModelStepId, callId: call.id, toolName: call.name.slice(0, 64) || 'unknown', input: call.input }
  const ctx: Ctx = { c: base.c, db: base.db, store: base.store, changes: base.changes, step }
  const def = BY_NAME.get(call.name)
  let out: Handled
  try {
    if (!def || !def.channels.includes(base.c.channel)) throw new AppError('ACTION_NOT_ALLOWED', 403) // e.g. a Talent run calling a Manager tool
    if (!def.ready || (def.writes && !base.writesEnabled)) throw new AppError('FEATURE_NOT_READY', 503)
    const args = def.schema.safeParse(call.input)
    // Report §7.3: INPUT_INVALID carries issues (field paths only, never values) so the model can correct the call.
    if (!args.success) out = { result: { ...failure('INPUT_INVALID'), retryable: true, issues: args.error.issues.slice(0, 10).map(i => ({ path: i.path.join('.') || '(root)', message: i.code === 'unrecognized_keys' ? `unknown field: ${i.keys.join(', ')}` : i.message })) } }
    else out = await def.run(ctx, args.data as never)
  } catch (e) {
    if (e instanceof LeaseLost) throw e
    // Unexpected errors never reach the model as text (no stack/provider message): a fixed code only.
    out = { result: failure(e instanceof AppError ? e.code : 'TOOL_FAILED') }
  }
  const r = out.result
  const state = r.kind === 'ok' ? 'succeeded' : r.kind === 'waiting_confirmation' ? 'waiting' : r.kind
  const code = 'code' in r ? r.code : null
  const id = out.recorded ? out.stepId! : await base.store.toolStep(null, base.c, { ...step, state, output: r, errorCode: code ?? undefined })
  return { step: { id, sequence: step.sequence, kind: 'tool', state, sourceModelStepId: step.sourceModelStepId, callId: step.callId, toolName: step.toolName, input: step.input, output: r, errorCode: code },
    waiting: r.kind === 'waiting_confirmation', stop: code === 'ACTOR_DISABLED' ? code : null }
}
