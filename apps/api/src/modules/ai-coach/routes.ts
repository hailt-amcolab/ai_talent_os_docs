import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'
import type { AppDeps } from '../../container.ts'
import { apiModule } from '../../http/module.ts'
import { bearer } from '../../http/auth.ts'
import { AppError } from '../../core/errors.ts'
import { managerActor, talentActor, type Actor, type ManagerActor } from './access.ts'
import { BODY_MAX, type Channel } from './store.ts'

// Agent REST (report §10.1). The API only writes Postgres (entry + operation + outbox); the worker runs the agent and the UI polls.
// Middleware is fixed by the route, never by a body field: /me = Talent session, /admin = active Manager with an MFA (aal2) session.
const errors = { 401: { description: 'Authentication required' }, 403: { description: 'Wrong role / MFA required' }, 404: { description: 'Not found or not yours' },
  409: { description: 'Busy / version / key conflict' }, 410: { description: 'Proposal expired' }, 422: { description: 'Invalid input' }, 503: { description: 'Feature not ready' } }
const res = (status: 200 | 201 | 202, schema: z.ZodType) => ({ [status]: { description: 'Success', content: { 'application/json': { schema } } } })
const json = (status: 200 | 201 | 202, schema: z.ZodType) => ({ ...res(status, schema), ...errors })
const body = <T extends z.ZodType>(schema: T) => ({ body: { required: true, content: { 'application/json': { schema } } } })
const Key = z.object({ requestKey: z.uuid() }).strict()
const ConvOut = z.object({ conversationId: z.string(), version: z.string() }).openapi('AgentConversation')
const Receipt = z.object({ commandId: z.string(), action: z.string(), targetLabel: z.string(), changed: z.boolean(), resourceVersion: z.string().nullable() }).openapi('AgentReceipt')
const Run = z.object({ id: z.string(), operationId: z.string(), conversationId: z.string(), completionKind: z.enum(['answer_only', 'action_result']).nullable(),
  state: z.enum(['pending', 'running', 'waiting_confirmation', 'succeeded', 'failed', 'unknown', 'cancelled']), version: z.string(), outputEntryId: z.string().nullable(),
  proposalId: z.string().nullable(), errorCode: z.string().nullable(), receipts: z.array(Receipt), retryAfterMs: z.number().nullable() }).openapi('AgentRun')
const Entry = z.object({ id: z.string(), sequence: z.string(), role: z.enum(['user', 'assistant']), body: z.string(), createdAt: z.string() }).openapi('AgentEntry')
const Proposal = z.object({ proposalId: z.string(), state: z.string(), commandType: z.string(), targetLabel: z.string(),
  changes: z.array(z.object({ field: z.string(), before: z.string().nullable(), after: z.string().nullable() })), baseVersion: z.string(),
  expiresAt: z.string(), proposalHash: z.string(), runId: z.string().nullable(), allowedActions: z.array(z.enum(['confirm', 'reject', 'commit'])) }).openapi('AgentProposal')
const Decision = z.object({ proposalId: z.string(), state: z.string() }).openapi('AgentDecision')
const Conv = z.object({ id: z.uuid() }), RunId = z.object({ runId: z.uuid() }), Id = z.object({ id: z.uuid() })

export function agentModule(deps: AppDeps) {
  const app = apiModule(), auth = deps.auth!, { store, changes } = deps.agent!, db = deps.db
  const actorOf = async (c: Context, channel: Channel): Promise<Actor> => {
    const id = await auth.authenticate(bearer(c), true)
    if (channel === 'talent') return talentActor(db, id.userId)
    // Manager MFA = TOTP (decision 2026-11-18): an aal1 session never reaches the admin agent.
    if (id.aal !== 'aal2') throw new AppError('MFA_REQUIRED', 403)
    return managerActor(db, id.userId)
  }
  const manager = async (c: Context) => (await actorOf(c, 'manager_ui')) as ManagerActor

  for (const [channel, base] of [['talent', '/api/v1/me/agent'], ['manager_ui', '/api/v1/admin/agent']] as const) {
    app.openapi(createRoute({ method: 'post', path: `${base}/conversations`, request: body(Key), responses: { ...res(200, ConvOut), ...json(201, ConvOut) } }), async c => {
      const r = await store.createConversation(await actorOf(c, channel), channel, c.req.valid('json').requestKey)
      return c.json({ conversationId: r.conversationId, version: r.version }, r.created ? 201 : 200)
    })
    app.openapi(createRoute({ method: 'post', path: `${base}/conversations/{id}/messages`, request: { params: Conv, ...body(z.object({ requestKey: z.uuid(), body: z.string().min(1).max(BODY_MAX) }).strict()) }, responses: json(202, Run) }), async c => {
      const b = c.req.valid('json')
      return c.json(await store.submit(await actorOf(c, channel), channel, c.req.valid('param').id, b.requestKey, b.body), 202)
    })
    app.openapi(createRoute({ method: 'get', path: `${base}/conversations/{id}/messages`, request: { params: Conv, query: z.object({ after: z.string().regex(/^\d{1,18}$/).optional(), limit: z.coerce.number().int().min(1).max(100).optional() }) },
      responses: json(200, z.object({ items: z.array(Entry), nextAfter: z.string(), hasMore: z.boolean() })) }), async c => {
      const q = c.req.valid('query')
      return c.json(await store.entries(await actorOf(c, channel), channel, c.req.valid('param').id, BigInt(q.after ?? '0'), q.limit ?? 20), 200)
    })
    app.openapi(createRoute({ method: 'get', path: `${base}/conversations/{id}/runs`, request: { params: Conv }, responses: json(200, z.object({ items: z.array(Run) })) }), async c => {
      return c.json({ items: await store.runs(await actorOf(c, channel), channel, c.req.valid('param').id) }, 200)
    })
    app.openapi(createRoute({ method: 'get', path: `${base}/runs/{runId}`, request: { params: RunId }, responses: json(200, Run) }), async c => {
      return c.json(await store.runView(await actorOf(c, channel), channel, c.req.valid('param').runId), 200)
    })
    app.openapi(createRoute({ method: 'post', path: `${base}/runs/{runId}/cancel`, request: { params: RunId, ...body(Key) }, responses: json(202, Run) }), async c => {
      return c.json(await store.cancel(await actorOf(c, channel), channel, c.req.valid('param').runId), 202)
    })
  }

  // Confirmation channel of M-17 (report §7.1). The model has no confirm/reject tool; only these authenticated UI actions.
  // ponytail: requestKey is required but not stored; a replay is harmless because each action is idempotent on the proposal state.
  const p = '/api/v1/admin/agent/proposals/{id}'
  app.openapi(createRoute({ method: 'get', path: p, request: { params: Id }, responses: json(200, Proposal) }), async c => c.json(await changes.view(await manager(c), c.req.valid('param').id), 200))
  app.openapi(createRoute({ method: 'post', path: `${p}/confirm`, request: { params: Id, ...body(z.object({ requestKey: z.uuid(), proposalHash: z.string().regex(/^[0-9a-f]{64}$/) }).strict()) }, responses: json(200, Decision) }), async c => {
    return c.json(await changes.confirm(await manager(c), c.req.valid('param').id, c.req.valid('json').proposalHash), 200)
  })
  app.openapi(createRoute({ method: 'post', path: `${p}/reject`, request: { params: Id, ...body(Key) }, responses: json(200, Decision) }), async c => {
    return c.json(await changes.reject(await manager(c), c.req.valid('param').id), 200)
  })
  // Same service as the change_commit tool: fallback when a run ended before saving a confirmed proposal.
  app.openapi(createRoute({ method: 'post', path: `${p}/commit`, request: { params: Id, ...body(Key) }, responses: json(200, Receipt) }), async c => {
    return c.json(await changes.commit(await manager(c), c.req.valid('param').id), 200)
  })
  return app
}
