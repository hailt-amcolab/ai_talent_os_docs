import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { createDatabase } from '../infra/database/client.ts'
import { loadEnv } from '../config/env.ts'
import { createApp } from './app.ts'
import { agentServices, controlServices, type AppDeps } from '../container.ts'
import { AppError } from '../core/errors.ts'
import type { AuthService } from '../modules/auth/service.ts'
import { memoryRunEvents, type RunEvents } from '../modules/coach-conversation/events.ts'

// P6 pieces over HTTP on a disposable Postgres with the runtime role: message rate limit (429) and SSE stream (AIC-T37).
const url = process.env.TEST_DATABASE_URL, ownerUrl = process.env.TEST_OWNER_DATABASE_URL
const local = !!url && !!ownerUrl && url !== ownerUrl && [url, ownerUrl].every(u => ['localhost', '127.0.0.1'].includes(new URL(u).hostname))
const ORIGIN = 'http://stream.test'

test('agent HTTP: rate limit per person, SSE delta/state/end', { skip: !local && 'needs local TEST_DATABASE_URL (runtime login) + TEST_OWNER_DATABASE_URL' }, async t => {
  const db = createDatabase(url!), owner = createDatabase(ownerUrl!)
  const env = loadEnv({ DATABASE_URL: url, NODE_ENV: 'test', CORS_ORIGINS: ORIGIN, ENABLE_AUTH_DEMO: 'true', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'x',
    ENABLE_AGENT_CORE: 'true', AGENT_RATE_PER_MINUTE: '2', AGENT_RATE_PER_DAY: '100' })
  const bus = memoryRunEvents(), sessions = new Map<string, string>()
  const auth = { authenticate: async (tk: string) => { const u = sessions.get(tk); if (!u) throw new AppError('AUTH_REQUIRED', 401); return { userId: u, aal: 'aal1', sessionId: 's', email: 'e', factors: [] } } } as unknown as AuthService
  const mk = (events: RunEvents | undefined) => createApp({ env, db, auth, pwa: {} as NonNullable<AppDeps['pwa']>, agent: agentServices(db, env, events), control: controlServices(env, db) })
  const app = mk(bus)
  const call = async (a: typeof app, tk: string, method: string, path: string, body?: unknown) => {
    const r = await a.request(path, { method, headers: { Authorization: `Bearer ${tk}`, Origin: ORIGIN, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined })
    return { status: r.status, body: r.headers.get('content-type')?.includes('json') ? await r.json() as any : null, res: r }
  }
  const login = async (k: string) => { const u = randomUUID(); await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${u}::uuid)`; await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${u}::uuid,${k})`; return u }
  const mu = await login('manager'), [m] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${mu}::uuid) RETURNING id::text`
  const talent = async () => {
    const tu = await login('talent'), name = 'S' + randomUUID().slice(0, 6)
    const [ap] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES(${name},${tu + '@example.test'},'2000-01-01','approved',${m.id}::uuid,now()) RETURNING id::text`
    await db.$executeRaw`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status) VALUES(${tu}::uuid,'talent',${name},'2000-01-01','in_use',${ap.id}::uuid,'approved')`
    const tk = randomUUID(); sessions.set(tk, tu); return tk
  }
  const ME = '/api/v1/me/agent'
  const conv = async (tk: string) => (await call(app, tk, 'POST', `${ME}/conversations`, { requestKey: randomUUID() })).body.conversationId as string
  // Finish / cancel a run as the worker would (this HTTP test has no worker).
  const finish = (runId: string) => owner.$executeRaw`UPDATE app_private.agent_runs SET state='succeeded',final_text='できました',completion_kind='answer_only',finished_at=now(),version=version+1 WHERE id=${runId}::uuid`
  const cancel = (runId: string) => owner.$executeRaw`UPDATE app_private.agent_runs SET state='cancelled',error_code='CANCELLED',finished_at=now(),version=version+1 WHERE id=${runId}::uuid`

  await t.test('rate limit: the 3rd new message in a minute → 429; an idempotent retry is free; per person', async () => {
    const tk = await talent(), key = randomUUID(), c1 = await conv(tk)
    const r1 = await call(app, tk, 'POST', `${ME}/conversations/${c1}/messages`, { requestKey: key, body: '1通目' })
    assert.equal(r1.status, 202)
    assert.equal((await call(app, tk, 'POST', `${ME}/conversations/${c1}/messages`, { requestKey: key, body: '1通目' })).status, 202) // retry: not counted
    await cancel(r1.body.id)
    const r2 = await call(app, tk, 'POST', `${ME}/conversations/${c1}/messages`, { requestKey: randomUUID(), body: '2通目' })
    assert.equal(r2.status, 202); await cancel(r2.body.id)
    const r3 = await call(app, tk, 'POST', `${ME}/conversations/${c1}/messages`, { requestKey: randomUUID(), body: '3通目' })
    assert.equal(r3.status, 429); assert.equal(r3.body.error.code, 'RATE_LIMITED')
    const other = await talent()
    assert.equal((await call(app, other, 'POST', `${ME}/conversations/${await conv(other)}/messages`, { requestKey: randomUUID(), body: 'こんにちは' })).status, 202)
  })

  await t.test('SSE: running run → delta from the bus, then end from the DB; finished run → end at once (AIC-T37)', async () => {
    const tk = await talent(), c = await conv(tk)
    const r = (await call(app, tk, 'POST', `${ME}/conversations/${c}/messages`, { requestKey: randomUUID(), body: 'こんにちは' })).body
    const s = await call(app, tk, 'GET', `${ME}/runs/${r.id}/stream`)
    assert.equal(s.status, 200); assert.match(s.res.headers.get('content-type') ?? '', /text\/event-stream/)
    const reader = s.res.body!.getReader(), dec = new TextDecoder()
    let text = ''
    const readUntil = async (re: RegExp) => { while (!re.test(text)) { const { value, done } = await reader.read(); if (done) break; text += dec.decode(value) } }
    setTimeout(() => bus.publish(r.id, 'こん'), 200)
    await readUntil(/event: delta/)
    assert.match(text, /"text":"こん"/)
    await finish(r.id)
    await readUntil(/event: end/)
    assert.match(text, /できました/)
    const again = await call(app, tk, 'GET', `${ME}/runs/${r.id}/stream`)
    assert.match(await again.res.text(), /event: end[\s\S]*succeeded/)
  })

  await t.test("SSE: someone else's run → 404; no event bus → 503 (the UI keeps polling)", async () => {
    const a = await talent(), b = await talent(), r = (await call(app, a, 'POST', `${ME}/conversations/${await conv(a)}/messages`, { requestKey: randomUUID(), body: 'x' })).body
    assert.equal((await call(app, b, 'GET', `${ME}/runs/${r.id}/stream`)).status, 404)
    assert.equal((await call(mk(undefined), a, 'GET', `${ME}/runs/${r.id}/stream`)).status, 503)
    await cancel(r.id)
  })

  await db.$disconnect(); await owner.$disconnect()
})
