import { createRoute, z } from '@hono/zod-openapi'
import type { AppDeps } from '../../container.ts'
import { apiModule } from '../../http/module.ts'
import { bearer } from '../../http/auth.ts'
import { AppError } from '../../core/errors.ts'

// AI Coach chat (task coach.respond): /api/v1/me/coach/*. The API only writes Postgres (message + operation + outbox);
// the worker answers asynchronously and the PWA polls the execution (report §9.1). No Redis call on this path.
const errors = { 401: { description: 'Authentication required' }, 403: { description: 'Not a Talent / origin not allowed' }, 404: { description: 'Not found' }, 409: { description: 'Conflict' }, 422: { description: 'Invalid input' }, 429: { description: 'Too many pending requests' } }
const ok = (schema: z.ZodType) => ({ 200: { description: 'Success', content: { 'application/json': { schema } } }, ...errors })
const Execution = z.object({ id: z.string(), state: z.enum(['pending', 'running', 'succeeded', 'failed', 'unknown', 'cancelled']), inputMessageId: z.string().nullable(), outputMessageId: z.string().nullable(), errorCode: z.string().nullable(), attemptNo: z.number() }).openapi('CoachExecution')
const Message = z.object({ id: z.string(), sender: z.enum(['talent', 'coach']), body: z.string(), createdAt: z.string() }).openapi('CoachMessage')
const Theme = z.object({ id: z.string(), position: z.number(), content: z.string() }).openapi('CoachTheme')
const Conversation = z.object({ messages: z.array(Message), executions: z.array(Execution), themesDay: z.string().nullable(), themes: z.array(Theme) }).openapi('CoachConversation')
const jstToday = () => new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10)
const IdParam = z.object({ id: z.uuid() })

export function aiCoachModule(deps: AppDeps) {
  const app = apiModule(), auth = deps.auth!, store = deps.aiCoach!
  const actor = (c: Parameters<typeof bearer>[0]) => auth.authenticate(bearer(c), true)
  const base = '/api/v1/me/coach'

  app.openapi(createRoute({ method: 'get', path: `${base}/messages`, responses: ok(Conversation) }), async c => {
    const userId = (await actor(c)).userId
    const [r, t] = await Promise.all([store.conversation(userId), store.latestThemes(userId)])
    return c.json({ executions: r.executions, messages: r.messages.map(m => ({ ...m, createdAt: m.createdAt.toISOString() })), themesDay: t.day, themes: t.themes }, 200)
  })
  // requestKey: generated once per send by the client; resending the same key returns the same execution.
  app.openapi(createRoute({ method: 'post', path: `${base}/messages`, request: { body: { required: true, content: { 'application/json': { schema: z.object({ requestKey: z.uuid(), body: z.string().min(1).max(1000), simulate: z.boolean().optional() }).strict() } } } }, responses: ok(Execution) }), async c => {
    const a = await actor(c), b = c.req.valid('json')
    return c.json(await store.submit(a.userId, b.requestKey, b.body, b.simulate ?? false), 200)
  })
  app.openapi(createRoute({ method: 'get', path: `${base}/executions/{id}`, request: { params: IdParam }, responses: ok(Execution) }), async c => {
    return c.json(await store.execution((await actor(c)).userId, c.req.valid('param').id), 200)
  })
  app.openapi(createRoute({ method: 'post', path: `${base}/executions/{id}/close`, request: { params: IdParam }, responses: ok(Execution) }), async c => {
    return c.json(await store.closeUnknown((await actor(c)).userId, c.req.valid('param').id), 200)
  })
  // Test helper for the morning run (coach.daily_themes): run it now for my Talent instead of waiting for the M-17 time.
  // date defaults to today (JST); up to 7 days ahead so the same day can be tested again. Same day twice returns the same run.
  // The whole module is only mounted with ENABLE_AUTH_DEMO (never in production).
  app.openapi(createRoute({ method: 'post', path: `${base}/daily`, request: { body: { required: true, content: { 'application/json': { schema: z.object({ date: z.iso.date().optional(), simulate: z.boolean().optional() }).strict() } } } }, responses: ok(Execution) }), async c => {
    const userId = (await actor(c)).userId, today = jstToday(), b = c.req.valid('json'), day = b.date ?? today
    const ahead = (Date.parse(day) - Date.parse(today)) / 86_400_000
    if (ahead < 0 || ahead > 7) throw new AppError('DATE_OUT_OF_RANGE', 422)
    return c.json((await store.scheduleDaily(day, userId, b.simulate ?? false))[0], 200)
  })
  // DEMO ONLY test reset (decided with the user 2026-11-23): removes EVERY Talent's morning runs, messages and themes of that day,
  // keeps the shared trends. Mounted only with ENABLE_AUTH_DEMO (never in production); needs migration 20261123000400.
  app.openapi(createRoute({ method: 'post', path: `${base}/daily/reset`, request: { body: { required: true, content: { 'application/json': { schema: z.object({ date: z.iso.date().optional() }).strict() } } } },
    responses: ok(z.object({ day: z.string(), runs: z.number(), messages: z.number(), themes: z.number() }).openapi('CoachDailyReset')) }), async c => {
    await store.conversation((await actor(c)).userId) // must be a Talent login
    const day = c.req.valid('json').date ?? jstToday()
    return c.json({ day, ...await store.resetDay(day) }, 200)
  })
  return app
}
