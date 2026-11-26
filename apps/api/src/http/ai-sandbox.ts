import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'
import type { AppDeps } from '../container.ts'
import { apiModule } from './module.ts'
import { bearer } from './auth.ts'
import { AppError } from '../core/errors.ts'
import { managerActor } from '../control/actor.ts'
import { once } from '../control/idempotency.ts'
import { ref } from '../ai/prompts/registry.ts'
import { runTask } from '../ai/tasks/define.ts'
import { dailyTopics } from '../ai/tasks/daily-topics.ts'
import { INSTRUCTION_MAX } from '../modules/coach-config/model.ts'
import { readTalentContext } from '../modules/coach-config/reader.ts'

// Instruction sandbox (agent_spec/ai-core/API_DESIGN.md §4, CR in scope): try a CANDIDATE instruction on a sample Talent and see
// the AI output. Synchronous, writes no business data (no themes, posts, schedules, videos); only usage (payer adesso) and the
// stored idempotent response. ponytail: only the situations of the one AI task that exists (daily_topics).
const errors = { 401: { description: 'Authentication required' }, 403: { description: 'Manager with MFA only' }, 404: { description: 'Talent not found' },
  409: { description: 'Request key reused' }, 422: { description: 'Invalid input' }, 503: { description: 'AI not configured' } }
const Body = z.object({ requestKey: z.uuid(), talentId: z.uuid(), situation: z.enum(['theme_suggestions', 'daily_greeting']), candidateText: z.string().trim().min(1).max(INSTRUCTION_MAX) }).strict()
const Out = z.object({ output: z.unknown(), promptVersion: z.string(), usage: z.object({ inputTokens: z.number(), outputTokens: z.number() }) }).openapi('InstructionTest')

export function aiSandboxModule(deps: AppDeps) {
  const app = apiModule(), auth = deps.auth!, db = deps.db
  const manager = async (c: Context) => { const id = await auth.authenticate(bearer(c), true); if (id.aal !== 'aal2') throw new AppError('MFA_REQUIRED', 403); return managerActor(db, id.userId) }
  app.openapi(createRoute({ method: 'post', path: '/api/v1/admin/ai/instruction-tests', request: { body: { required: true, content: { 'application/json': { schema: Body } } } },
    responses: { 200: { description: 'Output of the AI task with the candidate instruction', content: { 'application/json': { schema: Out } } }, ...errors } }), async c => {
    const a = await manager(c), b = c.req.valid('json'), ai = deps.ai
    if (!ai) throw new AppError('AI_UNAVAILABLE', 503)
    const talent = await readTalentContext(db, b.talentId)
    if (!talent) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
    // The candidate replaces the instructions of that situation for this test only.
    const candidate = { ...talent, instructions: [...talent.instructions.filter(i => i.situation !== b.situation), { id: 'candidate', scope: 'talent' as const, situation: b.situation, text: b.candidateText, version: 'candidate' }] }
    // ponytail: the model call runs inside the idempotency transaction (≤ timeout); move it out if sandbox calls get long.
    const stored = await db.$transaction(tx => once(tx, { actorUserId: a.userId, routeKey: 'ai.instruction-test', requestKey: b.requestKey }, b, async () => {
      const r = await runTask(ai.client, dailyTopics, { talent: candidate, date: new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10), recentThemes: [] }, { model: ai.model, timeoutMs: 30_000 })
      for (const u of r.usage) await tx.$executeRaw`INSERT INTO public.ai_usage_events(talent_id,model,input_tokens,output_tokens,request_ref,cached_input_tokens,reasoning_tokens,payer,task_key)
        VALUES(NULL,${ai.model},${u.inputTokens},${u.outputTokens},${u.requestRef},${u.cachedTokens},${u.reasoningTokens},'adesso','task.instruction_sandbox')`
      return { status: 200, body: { output: r.data, promptVersion: ref(dailyTopics.prompt), usage: { inputTokens: r.usage.reduce((n, u) => n + u.inputTokens, 0), outputTokens: r.usage.reduce((n, u) => n + u.outputTokens, 0) } } }
    }), { timeout: 45_000 })
    return c.json(stored.body as never, 200)
  })
  return app
}
