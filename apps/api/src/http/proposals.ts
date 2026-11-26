import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'
import type { AppDeps } from '../container.ts'
import { apiModule } from './module.ts'
import { bearer } from './auth.ts'
import { AppError } from '../core/errors.ts'
import { managerActor } from '../control/actor.ts'

// Proposals of the Business Control Plane (agent_spec/ai-core/API_DESIGN.md §3). Manager with an MFA (aal2) session only.
// Confirm = the command, executed synchronously with its receipt; no AI run is involved (ADR-04).
const errors = { 401: { description: 'Authentication required' }, 403: { description: 'Wrong role / MFA required / actor disabled' }, 404: { description: 'Not found or not yours' },
  409: { description: 'Not pending / hash mismatch / version conflict / key reused' }, 410: { description: 'Proposal expired' }, 422: { description: 'Invalid input' } }
const ok = (schema: z.ZodType) => ({ 200: { description: 'Success', content: { 'application/json': { schema } } }, ...errors })
const body = <T extends z.ZodType>(schema: T) => ({ body: { required: true, content: { 'application/json': { schema } } } })
const State = z.enum(['prepared', 'consumed', 'rejected', 'expired', 'conflicted'])
const Proposal = z.object({ proposalId: z.string(), commandType: z.string(), targetLabel: z.string(),
  changes: z.array(z.object({ field: z.string(), before: z.string().nullable(), after: z.string().nullable() })), baseVersion: z.string(), expiresAt: z.string(), proposalHash: z.string(),
  state: State, allowedActions: z.array(z.enum(['confirm', 'reject'])), origin: z.object({ channel: z.string(), runId: z.string().nullable() }) }).openapi('Proposal')
const Receipt = z.object({ commandId: z.string(), commandType: z.string(), targetLabel: z.string(), changed: z.boolean(), resultVersion: z.string().nullable(), createdAt: z.string() }).openapi('CommandReceipt')
const Id = z.object({ id: z.uuid() })

export function proposalsModule(deps: AppDeps) {
  const app = apiModule(), auth = deps.auth!, proposals = deps.control!.proposals
  const manager = async (c: Context) => {
    const id = await auth.authenticate(bearer(c), true)
    if (id.aal !== 'aal2') throw new AppError('MFA_REQUIRED', 403) // Manager MFA = TOTP (decision 2026-11-18)
    return managerActor(deps.db, id.userId)
  }
  const base = '/api/v1/admin/proposals'
  app.openapi(createRoute({ method: 'get', path: base, request: { query: z.object({ state: State.optional(), limit: z.coerce.number().int().min(1).max(100).optional() }) },
    responses: ok(z.object({ items: z.array(Proposal) })) }), async c => {
    const q = c.req.valid('query')
    return c.json({ items: await proposals.list(await manager(c), q.state, q.limit ?? 20) }, 200)
  })
  app.openapi(createRoute({ method: 'get', path: `${base}/{id}`, request: { params: Id }, responses: ok(Proposal) }), async c =>
    c.json(await proposals.view(await manager(c), c.req.valid('param').id), 200))
  app.openapi(createRoute({ method: 'post', path: `${base}/{id}/confirm`, request: { params: Id, ...body(z.object({ requestKey: z.uuid(), proposalHash: z.string().regex(/^[0-9a-f]{64}$/) }).strict()) },
    responses: ok(z.object({ proposal: Proposal, receipt: Receipt })) }), async c => {
    const r = await proposals.confirm(await manager(c), 'manager_ui', c.req.valid('param').id, c.req.valid('json'))
    return c.json(r.body as never, r.status as 200)
  })
  app.openapi(createRoute({ method: 'post', path: `${base}/{id}/reject`, request: { params: Id, ...body(z.object({ requestKey: z.uuid(), reason: z.string().max(200).optional() }).strict()) },
    responses: ok(z.object({ proposal: Proposal })) }), async c => {
    const r = await proposals.reject(await manager(c), 'manager_ui', c.req.valid('param').id, c.req.valid('json'))
    return c.json(r.body as never, r.status as 200)
  })
  return app
}
