import { createRoute, z } from '@hono/zod-openapi'
import type { AppDeps } from '../../container.ts'
import { AppError } from '../../core/errors.ts'
import { apiModule } from '../../http/module.ts'
import { bearer } from '../../http/auth.ts'

// OneDrive technology demo: /api/v1/dev/onedrive/*. Mounted with the Auth demo (never in production).
const errors = { 400: { description: 'OAuth state or code rejected' }, 401: { description: 'Authentication required' }, 403: { description: 'OneDrive denied access' }, 404: { description: 'Not found or outside the demo tree' }, 409: { description: 'Name taken, eTag mismatch, not connected or reconnect required' }, 429: { description: 'Rate limited' }, 422: { description: 'Invalid input' }, 502: { description: 'OneDrive permission' }, 503: { description: 'OneDrive unavailable or not configured' } }
const json = <S extends z.ZodType>(schema: S) => ({ required: true, content: { 'application/json': { schema } } })
const ok = (schema: z.ZodType) => ({ 200: { description: 'Success', content: { 'application/json': { schema } } }, ...errors })
const Item = z.object({ id: z.string(), name: z.string(), eTag: z.string(), size: z.number(), modifiedAt: z.string(), kind: z.enum(['folder', 'file']), mimeType: z.string().optional() }).openapi('DriveItem')
const Talent = Item.extend({ displayName: z.string() }).openapi('TalentFolder')
const ID = /^[A-Za-z0-9!_.-]{1,200}$/
const params = { params: z.object({ id: z.string().regex(ID) }) }
const eTag = z.string().min(1).max(200)
const content = z.string().max(60_000) // fits the 64 KiB JSON body limit

export function onedriveModule(deps: AppDeps) {
  const app = apiModule(), auth = deps.auth!
  type Ctx = Parameters<typeof bearer>[0]
  const actor = (c: Ctx) => auth.authenticate(bearer(c), true)
  const runtime = () => { if (!deps.onedrive) throw new AppError('ONEDRIVE_NOT_CONFIGURED', 503); return deps.onedrive }
  const delegated = () => { const r = runtime(); if (!r.connections) throw new AppError('ONEDRIVE_NOT_DELEGATED', 409); return r.connections }
  // delegated: the one main connection (ONEDRIVE_NOT_CONNECTED / ONEDRIVE_RECONNECT_REQUIRED); app: the organization drive.
  const drive = async (c: Ctx) => { await actor(c); return runtime().demo() }
  // Only allowed logins manage the single main connection; everyone else just uses it.
  const canManage = (a: { email: string }) => deps.env.ONEDRIVE_ADMIN_EMAILS.includes(a.email.toLowerCase())
  const manager = async (c: Ctx) => { const a = await actor(c); if (!canManage(a)) throw new AppError('ONEDRIVE_CONNECT_NOT_ALLOWED', 403); return a }
  const base = '/api/v1/dev/onedrive'

  // Connection (delegated mode): one main account for everyone. Status never returns tokens or the drive ID.
  const Connection = z.object({ mode: z.enum(['none', 'app', 'delegated']), status: z.enum(['not_configured', 'shared', 'not_connected', 'connected', 'reconnect_required']), account: z.object({ displayName: z.string(), driveType: z.string() }).optional(), connectedAt: z.string().optional(), canManage: z.boolean() }).openapi('OneDriveConnection')
  app.openapi(createRoute({ method: 'get', path: `${base}/connection`, responses: ok(Connection) }), async c => {
    const a = await actor(c), r = deps.onedrive
    if (!r) return c.json({ mode: 'none' as const, status: 'not_configured' as const, canManage: false }, 200)
    if (!r.connections) return c.json({ mode: 'app' as const, status: 'shared' as const, canManage: false }, 200)
    return c.json({ mode: 'delegated' as const, ...await r.connections.status(), canManage: canManage(a) }, 200)
  })
  app.openapi(createRoute({ method: 'post', path: `${base}/connection/start`, responses: ok(z.object({ authorizeUrl: z.url() }).openapi('OneDriveConnectStart')) }), async c => {
    const a = await manager(c), conn = delegated()
    await auth.limit('onedrive-connect:' + a.userId, 10)
    return c.json(await conn.start(a), 200)
  })
  // Microsoft redirects the browser to the FE page (ONEDRIVE_REDIRECT_URI), which posts code + state here with the login's
  // bearer token: the state is checked against the same user AND session that started it.
  app.openapi(createRoute({ method: 'post', path: `${base}/connection/callback`, request: { body: json(z.object({ state: z.string().min(20).max(200), code: z.string().min(1).max(4096) }).strict()) }, responses: ok(Connection) }), async c => {
    const a = await manager(c), conn = delegated(), b = c.req.valid('json')
    await auth.limit('onedrive-callback:' + a.userId, 10)
    return c.json({ mode: 'delegated' as const, ...await conn.complete(a, b.state, b.code), canManage: true }, 200)
  })
  app.openapi(createRoute({ method: 'delete', path: `${base}/connection`, responses: { 204: { description: 'Disconnected; stored tokens deleted' }, ...errors } }), async c => { await manager(c); await delegated().disconnect(); return c.body(null, 204) })

  app.openapi(createRoute({ method: 'get', path: `${base}/talents`, responses: ok(z.object({ items: z.array(Talent) }).openapi('TalentFolderList')) }), async c => c.json({ items: await (await drive(c)).talents() }, 200))
  app.openapi(createRoute({ method: 'post', path: `${base}/talents`, request: { body: json(z.object({ displayName: z.string().min(1).max(80) }).strict()) }, responses: ok(Talent) }), async c => c.json(await (await drive(c)).createTalent(c.req.valid('json').displayName), 200))
  app.openapi(createRoute({ method: 'get', path: `${base}/items/{id}/children`, request: params, responses: ok(z.object({ items: z.array(Item) }).openapi('DriveItemList')) }), async c => c.json({ items: await (await drive(c)).children(c.req.valid('param').id) }, 200))
  app.openapi(createRoute({ method: 'patch', path: `${base}/items/{id}`, request: { ...params, body: json(z.object({ name: z.string().min(1).max(120), eTag }).strict()) }, responses: ok(Item) }), async c => { const b = c.req.valid('json'); return c.json(await (await drive(c)).rename(c.req.valid('param').id, b.name, b.eTag), 200) })
  app.openapi(createRoute({ method: 'delete', path: `${base}/items/{id}`, request: { ...params, body: json(z.object({ eTag }).strict()) }, responses: { 204: { description: 'Moved to the recycle bin' }, ...errors } }), async c => { await (await drive(c)).remove(c.req.valid('param').id, c.req.valid('json').eTag); return c.body(null, 204) })
  app.openapi(createRoute({ method: 'get', path: `${base}/items/{id}/text`, request: params, responses: ok(Item.extend({ content: z.string() }).openapi('DriveText')) }), async c => c.json(await (await drive(c)).readText(c.req.valid('param').id), 200))
  app.openapi(createRoute({ method: 'post', path: `${base}/items/{id}/text`, request: { ...params, body: json(z.object({ name: z.string().min(1).max(120), content }).strict()) }, responses: ok(Item) }), async c => { const b = c.req.valid('json'); return c.json(await (await drive(c)).createText(c.req.valid('param').id, b.name, b.content), 200) })
  app.openapi(createRoute({ method: 'put', path: `${base}/items/{id}/text`, request: { ...params, body: json(z.object({ content, eTag }).strict()) }, responses: ok(Item) }), async c => { const b = c.req.valid('json'); return c.json(await (await drive(c)).updateText(c.req.valid('param').id, b.content, b.eTag), 200) })

  // Download: streamed through the BE as an attachment.
  app.get(`${base}/items/:id/content`, async c => {
    const d = await drive(c), id = c.req.param('id')
    if (!ID.test(id)) throw new AppError('INPUT_INVALID', 422)
    const f = await d.download(id)
    return new Response(f.body, { headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(f.name)}`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } })
  })

  // Raw upload: body = file bytes, ?name=<file name>, Content-Type = media type, Content-Length required.
  // Streams straight into a Graph upload session (app.ts exempts this path from the 64 KiB limit).
  // ponytail: demo skips Supabase Storage; the real flow is browser → Storage (TUS) → worker → OneDrive (spec §11).
  app.post(`${base}/items/:id/media`, async c => {
    const d = await drive(c), id = c.req.param('id'), length = c.req.header('Content-Length')
    if (!ID.test(id) || !c.req.raw.body) throw new AppError('INPUT_INVALID', 422)
    if (!length) throw new AppError('LENGTH_REQUIRED', 411)
    const type = (c.req.header('Content-Type') ?? '').split(';')[0].trim().toLowerCase()
    return c.json(await d.uploadMedia(id, c.req.query('name') ?? '', type, Number(length), c.req.raw.body), 200)
  })
  return app
}
