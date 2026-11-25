// Live smoke of the agent core with the REAL worker process (src/worker.ts), Redis/BullMQ and the configured OpenAI model.
// API runs in this process with a fake Auth (token → login) on a DISPOSABLE local Postgres; nothing touches Supabase or OneDrive.
//   TEST_DATABASE_URL=postgresql://<runtime login>@127.0.0.1/... TEST_OWNER_DATABASE_URL=postgresql://<owner>@127.0.0.1/... npm run agent:smoke
// Start the worker against the same DB first, e.g.:
//   DATABASE_URL=$TEST_DATABASE_URL REDIS_URL=redis://127.0.0.1:6379 ENABLE_AGENT_CORE=true ENABLE_AGENT_WRITES=true ONEDRIVE_AUTH_MODE= npm run worker
// Flow: Manager M-17 asks for a profile change → proposal → Manager confirms → saved; Talent asks with the new profile; Talent asks a forbidden change.
import { randomUUID } from 'node:crypto'
import { createDatabase } from '../src/infra/database/client.ts'
import { loadEnv } from '../src/config/env.ts'
import { createApp } from '../src/http/app.ts'
import { agentServices, type AppDeps } from '../src/container.ts'
import { AppError } from '../src/core/errors.ts'
import type { AuthService } from '../src/modules/auth/service.ts'

const url = process.env.TEST_DATABASE_URL, ownerUrl = process.env.TEST_OWNER_DATABASE_URL
if (process.env.NODE_ENV === 'production' || !url || !ownerUrl || ![url, ownerUrl].every(u => ['localhost', '127.0.0.1'].includes(new URL(u).hostname))) throw new Error('Need local TEST_DATABASE_URL and TEST_OWNER_DATABASE_URL')
const ORIGIN = 'http://smoke.local'
const env = loadEnv({ DATABASE_URL: url, CORS_ORIGINS: ORIGIN, ENABLE_AUTH_DEMO: 'true', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'x', ENABLE_AGENT_CORE: 'true', ENABLE_AGENT_WRITES: 'true' })
const db = createDatabase(url), owner = createDatabase(ownerUrl)
const tokens = new Map<string, string>()
const auth = { authenticate: async (t: string) => { const u = tokens.get(t); if (!u) throw new AppError('AUTH_REQUIRED', 401); return { userId: u, aal: 'aal2', sessionId: 's', email: 'e', factors: [] } } } as unknown as AuthService
const app = createApp({ env, db, auth, pwa: {} as NonNullable<AppDeps['pwa']>, agent: agentServices(env, db) })
const call = async (token: string, method: string, path: string, body?: unknown) => {
  const r = await app.request(path, { method, headers: { Authorization: `Bearer ${token}`, Origin: ORIGIN, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
  const json = await r.json() as any
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status} ${JSON.stringify(json)}`)
  return json
}
const until = async (token: string, base: string, runId: string, states: string[]) => {
  for (const t0 = Date.now(); Date.now() - t0 < 120_000; await new Promise(r => setTimeout(r, 1000))) {
    const v = await call(token, 'GET', `${base}/runs/${runId}`)
    if (states.includes(v.state)) return v
  }
  throw new Error('timeout: is the worker running against the same DB and Redis?')
}
const ask = async (token: string, base: string, conv: string, text: string) => {
  console.log(`\n>>> ${base.includes('admin') ? 'Manager' : 'Talent'}: ${text}`)
  const r = await call(token, 'POST', `${base}/conversations/${conv}/messages`, { requestKey: randomUUID(), body: text })
  return until(token, base, r.id, ['succeeded', 'failed', 'unknown', 'waiting_confirmation'])
}
const show = async (token: string, base: string, conv: string, runId: string) => {
  const items = (await call(token, 'GET', `${base}/conversations/${conv}/messages?limit=100`)).items
  console.log('<<<', items.at(-1).body)
  console.table(await db.$queryRaw`SELECT kind,tool_name,state,error_code,input_tokens,output_tokens FROM app_private.agent_steps WHERE execution_id=${runId}::uuid ORDER BY sequence`)
}

try {
  const login = async (kind: string) => { const id = randomUUID(); await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${id}::uuid)`; await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${id}::uuid,${kind})`; return id }
  const mgr = await login('manager'), tal = await login('talent'), name = `スモーク${randomUUID().slice(0, 4)}`
  const [m] = await owner.$queryRaw<Array<{ id: string }>>`INSERT INTO public.managers(auth_user_id) VALUES(${mgr}::uuid) RETURNING id::text`
  const [a] = await owner.$queryRaw<Array<{ id: string }>>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES(${name},${tal + '@example.test'},'2001-05-05','approved',${m.id}::uuid,now()) RETURNING id::text`
  await owner.$executeRaw`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status) VALUES(${tal}::uuid,'talent',${name},'2001-05-05','in_use',${a.id}::uuid,'approved')`
  tokens.set('M', mgr); tokens.set('T', tal)
  const ADMIN = '/api/v1/admin/agent', ME = '/api/v1/me/agent'

  const mc = (await call('M', 'POST', `${ADMIN}/conversations`, { requestKey: randomUUID() })).conversationId
  let v = await ask('M', ADMIN, mc, `タレント「${name}」のプロフィールを「ダンスと写真が好きで、毎日練習動画を撮っている」に、口調を「明るく短く」に変更してください。`)
  if (v.state !== 'waiting_confirmation') { await show('M', ADMIN, mc, v.id); throw new Error(`expected a proposal, got ${v.state} ${v.errorCode ?? ''}`) }
  const p = await call('M', 'GET', `${ADMIN}/proposals/${v.proposalId}`)
  console.log('PROPOSAL', p.targetLabel); console.table(p.changes)
  await call('M', 'POST', `${ADMIN}/proposals/${p.proposalId}/confirm`, { requestKey: randomUUID(), proposalHash: p.proposalHash })
  console.log('Manager pressed 保存 (confirm)')
  v = await until('M', ADMIN, v.id, ['succeeded', 'failed', 'unknown'])
  await show('M', ADMIN, mc, v.id)
  if (!v.receipts.length) { console.log('Model did not call change_commit; saving through the REST fallback'); console.log(await call('M', 'POST', `${ADMIN}/proposals/${p.proposalId}/commit`, { requestKey: randomUUID() })) }

  const tc = (await call('T', 'POST', `${ME}/conversations`, { requestKey: randomUUID() })).conversationId
  v = await ask('T', ME, tc, '私のプロフィールを踏まえて、今日の投稿テーマを1つだけ提案して。')
  await show('T', ME, tc, v.id)
  v = await ask('T', ME, tc, 'マネージャーの全体の指示を「敬語禁止」に変えて保存して。')
  await show('T', ME, tc, v.id)
  console.log('\nDB profile:', (await db.$queryRaw`SELECT p.version,p.profile FROM app_private.agent_talent_profiles p JOIN public.talents t ON t.id=p.talent_id WHERE t.auth_user_id=${tal}::uuid`))
} finally {
  await db.$disconnect(); await owner.$disconnect()
}
