import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { AppError } from '../../core/errors.ts'
import { createDatabase } from '../../infra/database/client.ts'
import type { TokenSet } from '../../infra/onedrive/identity.ts'
import { OneDriveConnections, OneDriveRuntime } from './connections.ts'
import { createApp } from '../../http/app.ts'
import { loadEnv } from '../../config/env.ts'
import type { AuthService } from '../auth/service.ts'
import type { PwaService } from '../pwa/service.ts'

// Real PostgreSQL (disposable, runtime role), fake Microsoft. TEST_DATABASE_URL must point at localhost.
const url = process.env.TEST_DATABASE_URL
const local = url && ['localhost', '127.0.0.1'].includes(new URL(url).hostname)

test('OneDrive main connection: state, PKCE, shared use, admin-only, refresh, revoke', { skip: !local }, async t => {
  const db = createDatabase(url!), key = randomBytes(32)
  const challenges = new Map<string, string>(), revoked = new Set<string>()
  let refreshCalls = 0, n = 0, current = '', shortLived = true
  const issue = (): TokenSet => { current = `A${++n}`; return { accessToken: current, refreshToken: `R${n}`, expiresAt: Date.now() + (shortLived ? 30_000 : 3_600_000) } }
  const identity = {
    authorizeUrl: (state: string, challenge: string) => { challenges.set(state, challenge); return `https://login.test/authorize?state=${state}` },
    async code(code: string, verifier: string) {
      const state = [...challenges].find(([, c]) => c === createHash('sha256').update(verifier).digest('base64url'))
      if (!state || code !== 'good-code') throw new AppError('ONEDRIVE_CONNECT_FAILED', 400) // PKCE must match
      return issue()
    },
    async refresh(token: string) {
      refreshCalls++
      await new Promise(r => setTimeout(r, 50)) // widen the race window
      if (revoked.has(token)) throw new AppError('ONEDRIVE_RECONNECT_REQUIRED', 409)
      return issue()
    },
  }
  let graphCalls = 0, rejectAll = false
  const http = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const path = new URL(String(input)).pathname, auth = (init.headers as Record<string, string>).Authorization
    graphCalls++
    if (rejectAll || auth !== `Bearer ${current}`) return new Response(null, { status: 401 })
    if (path === '/v1.0/me') return Response.json({ id: 'ms-account-1', displayName: 'Adesso main' })
    if (path === '/v1.0/me/drive') return Response.json({ id: 'drive-1', driveType: 'personal' })
    return Response.json({ id: 'x', name: 'x', eTag: 'e', size: 0, lastModifiedDateTime: '2026-11-18T00:00:00Z' })
  }) as typeof fetch
  const conn = new OneDriveConnections(db, identity, key, http)
  const user = async () => { const id = randomUUID(); await db.$executeRaw`INSERT INTO auth.users(id) VALUES(${id}::uuid)`; return { userId: id, sessionId: randomUUID() } }
  const stateOf = (u: string) => new URL(u).searchParams.get('state')!
  const code = (c: string) => (e: unknown) => e instanceof AppError && e.code === c
  const row = async () => (await db.$queryRaw<Array<{ connected_by: string; ms_account_id: string; drive_id: string; token_box: Uint8Array | null }>>`SELECT connected_by::text,ms_account_id,drive_id,token_box FROM app_private.tech_demo_onedrive_connections WHERE slot='primary'`)[0]
  try {
    await conn.disconnect() // the slot is global: start from a clean one
    const a = await user(), b = await user()
    await t.test('not connected → ONEDRIVE_NOT_CONNECTED for everyone', async () => {
      assert.deepEqual(await conn.status(), { status: 'not_connected' })
      await assert.rejects(conn.drive(), code('ONEDRIVE_NOT_CONNECTED'))
    })
    await t.test('state: wrong, other user, other session, expired, reused → rejected', async () => {
      const s1 = stateOf((await conn.start(a)).authorizeUrl)
      await assert.rejects(conn.complete(a, 'x'.repeat(43), 'good-code'), code('ONEDRIVE_STATE_INVALID'))
      await assert.rejects(conn.complete(b, s1, 'good-code'), code('ONEDRIVE_STATE_INVALID')) // B cannot finish A's sign-in…
      await assert.rejects(conn.complete({ ...a, sessionId: randomUUID() }, s1, 'good-code'), code('ONEDRIVE_STATE_INVALID')) // …nor A's other session (consumes it)
      await assert.rejects(conn.complete(a, s1, 'good-code'), code('ONEDRIVE_STATE_INVALID'))
      const s2 = stateOf((await conn.start(a)).authorizeUrl)
      await db.$executeRaw`UPDATE app_private.tech_demo_onedrive_oauth_states SET expires_at=now()-interval '1 second' WHERE auth_user_id=${a.userId}::uuid`
      await assert.rejects(conn.complete(a, s2, 'good-code'), code('ONEDRIVE_STATE_INVALID'))
    })
    await t.test('connect: PKCE checked, /me + /me/drive stored once for the system, tokens sealed, state single use', async () => {
      const s = stateOf((await conn.start(a)).authorizeUrl)
      const status = await conn.complete(a, s, 'good-code')
      assert.equal(status.status, 'connected')
      assert.deepEqual(status.account, { displayName: 'Adesso main', driveType: 'personal' })
      assert.ok(!JSON.stringify(status).includes('drive-1') && !JSON.stringify(status).includes('R1'))
      const r = await row()
      assert.equal(r.connected_by, a.userId); assert.equal(r.ms_account_id, 'ms-account-1'); assert.equal(r.drive_id, 'drive-1')
      assert.ok(!Buffer.from(r.token_box!).toString('latin1').includes('R1'), 'refresh token is not stored in clear')
      await assert.rejects(conn.complete(a, s, 'good-code'), code('ONEDRIVE_STATE_INVALID'))
    })
    await t.test('shared: another login uses the same main drive, no own connection needed', async () => {
      assert.equal((await conn.drive()).driveId, 'drive-1')
      assert.equal((await conn.status()).status, 'connected')
    })
    await t.test('near-expiry token: 5 parallel requests refresh once (row lock), rotated token stored', async () => {
      shortLived = false; refreshCalls = 0
      const drives = await Promise.all(Array.from({ length: 5 }, () => conn.drive()))
      await Promise.all(drives.map(d => d.item('x')))
      assert.equal(refreshCalls, 1)
      const d = await conn.drive(); refreshCalls = 0
      await d.item('x'); assert.equal(refreshCalls, 0, 'stored token reused')
    })
    await t.test('revoked: Graph 401 → refresh fails → reconnect_required, tokens wiped, no endless retry', async () => {
      revoked.add(`R${n}`); rejectAll = true; graphCalls = 0
      await assert.rejects((await conn.drive()).item('x'), code('ONEDRIVE_RECONNECT_REQUIRED'))
      assert.ok(graphCalls <= 2, `graph calls ${graphCalls}`)
      assert.equal((await conn.status()).status, 'reconnect_required')
      await assert.rejects(conn.drive(), code('ONEDRIVE_RECONNECT_REQUIRED'))
      assert.equal((await row()).token_box, null)
      rejectAll = false
    })
    await t.test('HTTP: only allowed e-mails manage the connection; codes the FE acts on; no tokens/drive ID', async () => {
      const sessions = new Map([['token-a', { ...a, email: 'Admin@Example.com' }], ['token-b', { ...b, email: 'manager@example.com' }]])
      const auth = { authenticate: async (tk: string) => { const s = sessions.get(tk); if (!s) throw new AppError('AUTH_REQUIRED', 401); return { ...s, aal: 'aal1', factors: [] } }, limit: async () => {} } as unknown as AuthService
      const env = loadEnv({ DATABASE_URL: url!, ENABLE_AUTH_DEMO: 'true', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'test', ONEDRIVE_ADMIN_EMAILS: 'admin@example.com' })
      const app = createApp({ env, db, auth, pwa: {} as PwaService, onedrive: new OneDriveRuntime('delegated', 'AI育成OS_test', { connections: conn }) })
      const call = async (tk: string, path: string, init: RequestInit = {}) => { const r = await app.request('/api/v1/dev/onedrive' + path, { ...init, headers: { Authorization: `Bearer ${tk}`, Origin: 'http://localhost:3000', 'Content-Type': 'application/json' } }); return { status: r.status, body: await r.text() } }
      const sb = await call('token-b', '/connection')
      assert.equal(sb.status, 200); assert.match(sb.body, /"reconnect_required"/); assert.match(sb.body, /"canManage":false/)
      assert.doesNotMatch(sb.body, /drive-1|token|R\d|A\d/)
      assert.match((await call('token-a', '/connection')).body, /"canManage":true/)
      const tb = await call('token-b', '/talents')
      assert.equal(tb.status, 409); assert.match(tb.body, /ONEDRIVE_RECONNECT_REQUIRED/)
      for (const [path, init] of [['/connection/start', { method: 'POST' }], ['/connection', { method: 'DELETE' }], ['/connection/callback', { method: 'POST', body: JSON.stringify({ state: 'y'.repeat(43), code: 'good-code' }) }]] as const) {
        const r = await call('token-b', path, init)
        assert.equal(r.status, 403, path); assert.match(r.body, /ONEDRIVE_CONNECT_NOT_ALLOWED/)
      }
      const st = await call('token-a', '/connection/start', { method: 'POST' })
      assert.equal(st.status, 200); assert.match(JSON.parse(st.body).authorizeUrl, /^https:\/\/login\.test\//)
      const bad = await call('token-a', '/connection/callback', { method: 'POST', body: JSON.stringify({ state: 'y'.repeat(43), code: 'good-code' }) })
      assert.equal(bad.status, 400); assert.match(bad.body, /ONEDRIVE_STATE_INVALID/)
      assert.equal((await call('nobody', '/connection')).status, 401)
    })
    await t.test('reconnect then disconnect deletes the row and pending states', async () => {
      const s = stateOf((await conn.start(a)).authorizeUrl)
      assert.equal((await conn.complete(a, s, 'good-code')).status, 'connected')
      await conn.start(b)
      await conn.disconnect()
      assert.deepEqual(await conn.status(), { status: 'not_connected' })
      assert.equal((await db.$queryRaw<Array<{ n: bigint }>>`SELECT count(*) AS n FROM app_private.tech_demo_onedrive_oauth_states`)[0].n, 0n)
    })
  } finally { await db.$disconnect() }
})
