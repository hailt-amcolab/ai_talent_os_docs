import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { createDatabase } from '../infra/database/client.ts'
import { loadEnv } from '../config/env.ts'
import { createApp } from '../http/app.ts'
import { agentServices, controlServices, type AppDeps } from '../container.ts'
import { AppError } from '../core/errors.ts'
import type { AuthService } from '../modules/auth/service.ts'
import type { TaskClient } from '../ai/tasks/define.ts'

// Manager MCP + instruction sandbox on a disposable Postgres with the runtime role (IMPLEMENTATION_PLAN.md P4: AIC-T14 without
// the real OAuth server, AIC-T40). JSON-RPC over the real MCP SDK transport through app.request().
const url = process.env.TEST_DATABASE_URL, ownerUrl = process.env.TEST_OWNER_DATABASE_URL
const local = !!url && !!ownerUrl && url !== ownerUrl && [url, ownerUrl].every(u => ['localhost', '127.0.0.1'].includes(new URL(u).hostname))
const ORIGIN = 'http://mcp.test'

test('manager MCP: auth + grant, tools, proposal → PWA confirm → status, revoke; instruction sandbox', { skip: !local && 'needs local TEST_DATABASE_URL (runtime login) + TEST_OWNER_DATABASE_URL' }, async t => {
  const db = createDatabase(url!), owner = createDatabase(ownerUrl!)
  const env = loadEnv({ DATABASE_URL: url, NODE_ENV: 'test', CORS_ORIGINS: ORIGIN, ENABLE_AUTH_DEMO: 'true', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'x',
    ENABLE_AGENT_CORE: 'true', ENABLE_MANAGER_MCP: 'true', MCP_RESOURCE_URL: 'https://api.example.test/mcp' })
  const sessions = new Map<string, { userId: string; aal: 'aal1' | 'aal2' }>(), mcpTokens = new Map<string, { managerUserId: string; clientId: string }>()
  const auth = { authenticate: async (tk: string) => { const id = sessions.get(tk); if (!id) throw new AppError('AUTH_REQUIRED', 401); return { ...id, sessionId: 's', email: 'e', factors: [] } } } as unknown as AuthService
  const taskCalls: unknown[] = []
  const fakeAi: TaskClient = { responses: { async parse(body) { taskCalls.push(body); return { id: 'resp_x', output_parsed: { greeting: 'おはよう', topics: [1, 2, 3].map(i => ({ title: `T${i}`, angle: 'a', reason: 'r' })) }, usage: { input_tokens: 300, output_tokens: 80 } } } } }
  const app = createApp({ env, db, auth, pwa: {} as NonNullable<AppDeps['pwa']>, agent: agentServices(db), control: controlServices(env, db), ai: { client: fakeAi, model: 'fake' } },
    async tk => mcpTokens.get(tk) ?? null)
  let rpcId = 0
  const mcp = async (token: string | null, method: string, params: unknown = {}) => {
    const r = await app.request('/mcp', { method: 'POST', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
      body: JSON.stringify({ jsonrpc: '2.0', id: ++rpcId, method, params }) })
    return { status: r.status, auth: r.headers.get('WWW-Authenticate'), body: r.status === 200 ? await r.json() as any : null }
  }
  const tool = async (token: string, name: string, args: unknown) => (await mcp(token, 'tools/call', { name, arguments: args })).body.result
  const rest = async (token: string, method: string, path: string, body?: unknown) => {
    const r = await app.request(path, { method, headers: { Authorization: `Bearer ${token}`, Origin: ORIGIN, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined })
    return { status: r.status, body: await r.json() as any }
  }
  const login = async (k: string) => { const u = randomUUID(); await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${u}::uuid)`; await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${u}::uuid,${k})`; return u }
  const mu = await login('manager'), [m] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${mu}::uuid) RETURNING id::text`
  const tu = await login('talent'), name = 'Mcp' + randomUUID().slice(0, 5)
  const [ap] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES(${name},${tu + '@example.test'},'2000-01-01','approved',${m.id}::uuid,now()) RETURNING id::text`
  const [tal] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status) VALUES(${tu}::uuid,'talent',${name},'2000-01-01','in_use',${ap.id}::uuid,'approved') RETURNING id::text`
  await db.$executeRaw`INSERT INTO app_private.talent_profiles(talent_id,profile,updated_by) VALUES(${tal.id}::uuid,${JSON.stringify({ profile: 'ダンスが得意' })}::jsonb,${mu}::uuid)`
  sessions.set('mgr', { userId: mu, aal: 'aal2' }); sessions.set('mgr-aal1', { userId: mu, aal: 'aal1' })
  mcpTokens.set('full', { managerUserId: mu, clientId: 'chatgpt' }); mcpTokens.set('readonly', { managerUserId: mu, clientId: 'reader' }); mcpTokens.set('nogrant', { managerUserId: mu, clientId: 'unknown' })
  const [full] = await db.$queryRaw<Array<{ id: string }>>`INSERT INTO app_private.mcp_grants(manager_user_id,client_id,capabilities,expires_at)
    VALUES(${mu}::uuid,'chatgpt',ARRAY['context.read','talent.search','instruction.history','talent_profile.prepare','ai_instruction.prepare'],now()+interval '1 hour') RETURNING id::text`
  await db.$executeRaw`INSERT INTO app_private.mcp_grants(manager_user_id,client_id,capabilities,expires_at) VALUES(${mu}::uuid,'reader',ARRAY['talent.search'],now()+interval '1 hour')`

  await t.test('no token / unknown token / no grant → 401 with resource metadata (AIC-T14)', async () => {
    for (const tk of [null, 'bogus', 'nogrant']) {
      const r = await mcp(tk, 'tools/list')
      assert.equal(r.status, 401); assert.match(r.auth!, /resource_metadata="https:\/\/api\.example\.test\/\.well-known\/oauth-protected-resource"/)
    }
    const meta = await app.request('/.well-known/oauth-protected-resource')
    assert.equal((await meta.json() as any).resource, 'https://api.example.test/mcp')
  })

  await t.test('initialize + tools/list follow the grant; no confirm tool (AIC-T40)', async () => {
    const init = await mcp('full', 'initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '1' } })
    assert.equal(init.status, 200); assert.equal(init.body.result.serverInfo.name, 'ai-talent-os')
    const names = (await mcp('full', 'tools/list')).body.result.tools.map((x: any) => x.name).sort()
    assert.deepEqual(names, ['context_read', 'instruction_history', 'instruction_prepare', 'profile_prepare', 'proposal_status', 'talent_search'])
    const ro = (await mcp('readonly', 'tools/list')).body.result.tools.map((x: any) => x.name).sort()
    assert.deepEqual(ro, ['proposal_status', 'talent_search'])
  })

  let proposalId = ''
  await t.test('search → read (view logged) → prepare (idempotent, channel manager_mcp, confirmUrl)', async () => {
    const s = await tool('full', 'talent_search', { query: name })
    assert.equal(s.structuredContent.items[0].talentId, tal.id)
    const c = await tool('full', 'context_read', { talentId: tal.id, sections: ['profile'] })
    assert.equal(c.structuredContent.profile.version, '1')
    const [vl] = await db.$queryRaw<Array<{ n: bigint }>>`SELECT count(*) n FROM public.manager_view_logs WHERE manager_id=${m.id}::uuid AND talent_id=${tal.id}::uuid`
    assert.equal(vl.n, 1n)
    const args = { talentId: tal.id, expectedVersion: '1', patch: { tone: 'やさしく' } }
    const p1 = await tool('full', 'profile_prepare', args), p2 = await tool('full', 'profile_prepare', args)
    assert.ok(!p1.isError); assert.equal(p1.structuredContent.proposalId, p2.structuredContent.proposalId)
    proposalId = p1.structuredContent.proposalId
    assert.equal(p1.structuredContent.confirmUrl, `${ORIGIN}/pwa/confirm/${proposalId}`)
    const [row] = await db.$queryRaw<Array<{ channel: string; client_grant_id: string }>>`SELECT channel,client_grant_id::text FROM app_private.business_proposals WHERE id=${proposalId}::uuid`
    assert.deepEqual(row, { channel: 'manager_mcp', client_grant_id: full.id })
    const bad = await tool('full', 'profile_prepare', { talentId: randomUUID(), expectedVersion: '0', patch: { tone: 'x' } })
    assert.equal(bad.isError, true); assert.equal(bad.structuredContent.code, 'NOT_FOUND_OR_FORBIDDEN')
    const ro = await mcp('readonly', 'tools/call', { name: 'profile_prepare', arguments: args })
    assert.ok(ro.body.result?.isError || ro.body.error) // not in this grant
  })

  await t.test('the person confirms in the PWA (aal2), ChatGPT reads the result with proposal_status', async () => {
    assert.equal((await tool('full', 'proposal_status', { proposalId })).structuredContent.state, 'prepared')
    const view = await rest('mgr', 'GET', `/api/v1/admin/proposals/${proposalId}`)
    assert.equal(view.body.origin.channel, 'manager_mcp')
    assert.equal((await rest('mgr-aal1', 'POST', `/api/v1/admin/proposals/${proposalId}/confirm`, { requestKey: randomUUID(), proposalHash: view.body.proposalHash })).status, 403)
    assert.equal((await rest('mgr', 'POST', `/api/v1/admin/proposals/${proposalId}/confirm`, { requestKey: randomUUID(), proposalHash: view.body.proposalHash })).status, 200)
    const st = (await tool('full', 'proposal_status', { proposalId })).structuredContent
    assert.equal(st.state, 'consumed'); assert.equal(st.receipt.resultVersion, '2')
  })

  await t.test('revoking the grant stops the next call at once', async () => {
    await db.$executeRaw`UPDATE app_private.mcp_grants SET revoked_at=now() WHERE id=${full.id}::uuid`
    assert.equal((await mcp('full', 'tools/list')).status, 401)
  })

  await t.test('instruction sandbox: candidate applied, nothing written but usage; idempotent; aal2 only', async () => {
    const key = randomUUID(), body = { requestKey: key, talentId: tal.id, situation: 'theme_suggestions', candidateText: '必ず屋外で撮影できるテーマにする' }
    const r1 = await rest('mgr', 'POST', '/api/v1/admin/ai/instruction-tests', body)
    assert.equal(r1.status, 200); assert.equal(r1.body.output.topics.length, 3); assert.equal(r1.body.promptVersion, 'task.daily_topics@1')
    assert.match(JSON.stringify(taskCalls.at(-1)), /必ず屋外で撮影できるテーマにする/)
    const r2 = await rest('mgr', 'POST', '/api/v1/admin/ai/instruction-tests', body)
    assert.deepEqual(r2.body, r1.body); assert.equal(taskCalls.length, 1) // replay: stored response, no second model call
    assert.equal((await rest('mgr-aal1', 'POST', '/api/v1/admin/ai/instruction-tests', { ...body, requestKey: randomUUID() })).status, 403)
    assert.equal((await db.$queryRaw<unknown[]>`SELECT 1 FROM public.theme_suggestions WHERE talent_id=${tal.id}::uuid`).length, 0)
    assert.equal((await db.$queryRaw<unknown[]>`SELECT 1 FROM app_private.ai_instructions WHERE talent_id=${tal.id}::uuid`).length, 0)
    const [u] = await db.$queryRaw<Array<{ n: number }>>`SELECT count(*)::int n FROM public.ai_usage_events WHERE task_key='task.instruction_sandbox' AND payer='adesso'`
    assert.ok(u.n >= 1)
  })

  await db.$disconnect(); await owner.$disconnect()
})
