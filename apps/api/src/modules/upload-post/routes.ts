import { createRoute, z } from '@hono/zod-openapi'
import type { AppDeps } from '../../container.ts'
import { AppError } from '../../core/errors.ts'
import { apiModule } from '../../http/module.ts'
import { bearer } from '../../http/auth.ts'

// Upload-Post connect demo: /api/v1/dev/upload-post/*. Mounted with the Auth demo (never in production).
const errors = { 401: { description: 'Authentication required' }, 403: { description: 'Origin not allowed' }, 404: { description: 'Not found' }, 409: { description: 'Conflict' }, 422: { description: 'Invalid input' }, 503: { description: 'Upload-Post unavailable, not configured or plan limit' } }
const ok = (schema: z.ZodType) => ({ 200: { description: 'Success', content: { 'application/json': { schema } } }, ...errors })
const Platform = z.enum(['instagram', 'tiktok', 'youtube'])
const Account = z.object({ platform: Platform, status: z.enum(['not_connected', 'connected', 'reauth_required']), handle: z.string().optional(), displayName: z.string().optional() }).openapi('SnsAccount')
const Accounts = z.object({ profile: z.boolean(), accounts: z.array(Account) }).openapi('SnsAccounts')
const Start = z.object({ authorizeUrl: z.url(), expiresInSeconds: z.number() }).openapi('SnsConnectStart')
// The social login always comes back to this fixed page inside the /pwa/ scope (spec §6.2).
export const RETURN_PATH = '/pwa/sns/return'

export function uploadPostModule(deps: AppDeps) {
  const app = apiModule(), auth = deps.auth!
  type Ctx = Parameters<typeof bearer>[0]
  const actor = (c: Ctx) => auth.authenticate(bearer(c), true)
  const demo = () => { if (!deps.uploadPost) throw new AppError('UPLOAD_POST_NOT_CONFIGURED', 503); return deps.uploadPost }
  const base = '/api/v1/dev/upload-post'

  app.openapi(createRoute({ method: 'get', path: `${base}/accounts`, responses: ok(Accounts) }), async c => {
    const a = await actor(c)
    return c.json(await demo().accounts(a.userId), 200)
  })
  app.openapi(createRoute({ method: 'post', path: `${base}/connect`, request: { body: { required: true, content: { 'application/json': { schema: z.object({ platform: Platform }).strict() } } } }, responses: ok(Start) }), async c => {
    const a = await actor(c)
    // requireOrigin (http/app.ts) already checked Origin against CORS_ORIGINS for this POST.
    const origin = c.req.header('Origin')!
    return c.json(await demo().connect(a.userId, c.req.valid('json').platform, origin + RETURN_PATH), 200)
  })
  return app
}
