import { createRoute, z } from '@hono/zod-openapi'
import type { AppDeps } from '../../container.ts'
import { apiModule } from '../../http/module.ts'
import { bearer } from '../../http/auth.ts'
const errors = { 401: { description: 'Authentication required' }, 403: { description: 'Forbidden' }, 409: { description: 'Conflict' }, 422: { description: 'Invalid input' }, 429: { description: 'Rate limited' }, 503: { description: 'Provider unavailable' } }
const json = <S extends z.ZodType>(schema: S) => ({ required: true, content: { 'application/json': { schema } } })
export function pwaModule(deps: AppDeps) {
  const app = apiModule(), pwa = deps.pwa!, auth = deps.auth!
  const response = (schema: z.ZodType) => ({ 200: { description: 'Success', content: { 'application/json': { schema } } }, ...errors })
  const actor = async (c: Parameters<typeof bearer>[0]) => auth.authenticate(bearer(c), true)
  const endpoint = z.object({ endpoint: z.url().max(2048) }).strict()
  const subscription = endpoint.extend({ label: z.string().trim().min(1).max(80).optional(), keys: z.object({ p256dh: z.string().regex(/^[A-Za-z0-9_-]{87}$/), auth: z.string().regex(/^[A-Za-z0-9_-]{22}$/) }).strict() }).strict().openapi('PushSubscription')
  app.openapi(createRoute({ method: 'post', path: '/api/v1/me/push-subscriptions', request: { body: json(subscription) }, responses: response(z.object({ active: z.boolean() })) }), async c => c.json(await pwa.subscribe(await actor(c), c.req.valid('json')), 200))
  app.openapi(createRoute({ method: 'post', path: '/api/v1/me/push-subscriptions/state', request: { body: json(endpoint) }, responses: response(z.object({ active: z.boolean() })) }), async c => c.json(await pwa.subscription(await actor(c), c.req.valid('json').endpoint), 200))
  app.openapi(createRoute({ method: 'delete', path: '/api/v1/me/push-subscriptions', request: { body: json(endpoint) }, responses: { 204: { description: 'Disabled' }, ...errors } }), async c => { await pwa.unsubscribe(await actor(c), c.req.valid('json').endpoint); return c.body(null, 204) })
  app.openapi(createRoute({ method: 'get', path: '/api/v1/me/push-devices', responses: response(z.object({ items: z.array(z.object({ id: z.uuid(), label: z.string(), updatedAt: z.string(), current: z.boolean() })), configured: z.boolean() }).openapi('PushDeviceList')) }), async c => c.json(await pwa.devices(await actor(c)), 200))
  app.openapi(createRoute({ method: 'post', path: '/api/v1/dev/push-test', request: { body: json(z.object({ recipientUserId: z.uuid() }).strict()) }, responses: response(z.object({ targeted: z.number(), accepted: z.number(), gone: z.number(), failed: z.number() }).openapi('PushTestResult')) }), async c => { const a=await actor(c); const recipient = c.req.valid('json').recipientUserId; await auth.limitPush(a, recipient); return c.json(await pwa.testPush(a, recipient), 200) })
  return app
}
