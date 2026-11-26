import { createRoute, z } from '@hono/zod-openapi'
import { streamSSE } from 'hono/streaming'
import type { Context } from 'hono'
import type { AppDeps } from '../container.ts'
import { apiModule } from './module.ts'
import { bearer } from './auth.ts'
import { AppError } from '../core/errors.ts'
import { managerActor, talentActor, type Actor } from '../control/actor.ts'
import { BODY_MAX, type Channel } from '../modules/coach-conversation/store.ts'

// Agent conversations (agent_spec/ai-core/API_DESIGN.md §2). The API only writes Postgres (run + operation + outbox); the
// worker runs the Agents SDK. The route decides the role: /me = Talent session, /admin = active Manager with an aal2 session.
// Proposals made by the Manager agent are confirmed at /api/v1/admin/proposals/* (http/proposals.ts).
const errors = { 401: { description: 'Authentication required' }, 403: { description: 'Wrong role / MFA required' }, 404: { description: 'Not found or not yours' },
  409: { description: 'Busy / key reused / account not active' }, 422: { description: 'Invalid input' }, 429: { description: 'Rate limited' } }
const res = (status: 200 | 201 | 202, schema: z.ZodType) => ({ [status]: { description: 'Success', content: { 'application/json': { schema } } } })
const json = (status: 200 | 201 | 202, schema: z.ZodType) => ({ ...res(status, schema), ...errors })
const body = <T extends z.ZodType>(schema: T) => ({ body: { required: true, content: { 'application/json': { schema } } } })
const Key = z.object({ requestKey: z.uuid() }).strict()
const Conversation = z.object({ conversationId: z.string(), version: z.string() }).openapi('AgentConversation')
const Receipt = z.object({ commandId: z.string(), commandType: z.string(), targetLabel: z.string(), changed: z.boolean(), resultVersion: z.string().nullable(), createdAt: z.string() }).openapi('AgentReceipt')
const ProposalSummary = z.object({ id: z.string(), commandType: z.string(), targetLabel: z.string(), state: z.string(), expiresAt: z.string() }).openapi('AgentProposalSummary')
const Run = z.object({ id: z.string(), conversationId: z.string(), version: z.string(), state: z.enum(['pending', 'running', 'succeeded', 'failed', 'cancelled']),
  completionKind: z.enum(['answer_only', 'action_result']).nullable(), finalText: z.string().nullable(), receipts: z.array(Receipt), proposals: z.array(ProposalSummary),
  errorCode: z.string().nullable(), retryAfterMs: z.number().nullable() }).openapi('AgentRun')
const Message = z.object({ id: z.string(), sequence: z.string(), role: z.enum(['user', 'assistant']), text: z.string(), createdAt: z.string(), runId: z.string().nullable(),
  source: z.enum(['sdk', 'control_receipt', 'pending']) }).openapi('AgentMessage')
const Conv = z.object({ id: z.uuid() }), RunId = z.object({ runId: z.uuid() })

export function agentModule(deps: AppDeps) {
  const app = apiModule(), auth = deps.auth!, store = deps.agent!.conversations, events = deps.agent!.events, db = deps.db
  const actorOf = async (c: Context, channel: Channel): Promise<Actor> => {
    const id = await auth.authenticate(bearer(c), true)
    if (channel === 'talent') return talentActor(db, id.userId)
    if (id.aal !== 'aal2') throw new AppError('MFA_REQUIRED', 403) // Manager MFA = TOTP (decision 2026-11-18)
    return managerActor(db, id.userId)
  }
  for (const [channel, base] of [['talent', '/api/v1/me/agent'], ['manager_ui', '/api/v1/admin/agent']] as const) {
    app.openapi(createRoute({ method: 'post', path: `${base}/conversations`, request: body(Key), responses: { ...res(200, Conversation), ...json(201, Conversation) } }), async c => {
      const r = await store.createConversation(await actorOf(c, channel), channel, c.req.valid('json').requestKey)
      return c.json({ conversationId: r.conversationId, version: r.version }, r.created ? 201 : 200)
    })
    app.openapi(createRoute({ method: 'post', path: `${base}/conversations/{id}/messages`, request: { params: Conv, ...body(z.object({ requestKey: z.uuid(), body: z.string().min(1).max(BODY_MAX) }).strict()) }, responses: json(202, Run) }), async c => {
      const b = c.req.valid('json')
      return c.json(await store.submit(await actorOf(c, channel), channel, c.req.valid('param').id, b.requestKey, b.body), 202)
    })
    app.openapi(createRoute({ method: 'get', path: `${base}/conversations/{id}/messages`, request: { params: Conv, query: z.object({ after: z.string().regex(/^\d{1,18}$/).optional(), limit: z.coerce.number().int().min(1).max(100).optional() }) },
      responses: json(200, z.object({ items: z.array(Message), pending: z.array(Message), nextAfter: z.string(), hasMore: z.boolean() })) }), async c => {
      const q = c.req.valid('query')
      return c.json(await store.messages(await actorOf(c, channel), channel, c.req.valid('param').id, BigInt(q.after ?? '0'), q.limit ?? 50), 200)
    })
    app.openapi(createRoute({ method: 'get', path: `${base}/conversations/{id}/runs`, request: { params: Conv }, responses: json(200, z.object({ items: z.array(Run) })) }), async c =>
      c.json({ items: await store.runs(await actorOf(c, channel), channel, c.req.valid('param').id) }, 200))
    app.openapi(createRoute({ method: 'get', path: `${base}/runs/{runId}`, request: { params: RunId }, responses: json(200, Run) }), async c =>
      c.json(await store.runView(await actorOf(c, channel), channel, c.req.valid('param').runId), 200))
    // SSE (API_DESIGN.md §2.2): delta = preview text, state/end = RunView from Postgres. Lost connection → the UI polls GET run.
    app.get(`${base}/runs/:runId/stream`, async c => {
      const runId = c.req.param('runId')
      if (!/^[0-9a-f-]{36}$/i.test(runId)) throw new AppError('NOT_FOUND_OR_FORBIDDEN', 404)
      const actor = await actorOf(c, channel)
      let view = await store.runView(actor, channel, runId) // owner check before any byte is sent
      if (!events) throw new AppError('STREAM_UNAVAILABLE', 503)
      return streamSSE(c, async s => {
        const done = (v: typeof view) => !['pending', 'running'].includes(v.state)
        if (done(view)) { await s.writeSSE({ event: 'end', data: JSON.stringify(view) }); return }
        const off = await events.subscribe(runId, text => { void s.writeSSE({ event: 'delta', data: JSON.stringify({ text }) }) })
        let closed = false
        s.onAbort(() => { closed = true })
        try {
          for (const t0 = Date.now(); !closed && Date.now() - t0 < deps.env.AGENT_COMPUTE_TIMEOUT_MS + 30_000; await s.sleep(1000)) {
            const v = await store.runView(actor, channel, runId)
            if (v.state !== view.state) { view = v; await s.writeSSE({ event: done(v) ? 'end' : 'state', data: JSON.stringify(v) }) }
            if (done(v)) break
          }
        } finally { off() }
      })
    })
    app.openapi(createRoute({ method: 'post', path: `${base}/runs/{runId}/cancel`, request: { params: RunId, ...body(Key) }, responses: json(202, Run) }), async c =>
      c.json(await store.cancel(await actorOf(c, channel), channel, c.req.valid('param').runId), 202))
  }
  return app
}
