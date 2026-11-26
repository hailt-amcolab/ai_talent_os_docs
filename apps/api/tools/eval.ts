// AI quality evals in the repo (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §9, ADR-09: the OpenAI Evals API shuts down 2026-11-30).
// Synthetic data only. Deterministic graders; real model (AI_COACH_MODEL). Writes evals/results/<suite>-<time>.json; exit 1 below threshold.
//   npm run eval -- daily_topics
//   TEST_DATABASE_URL=<runtime login, local> TEST_OWNER_DATABASE_URL=<owner, local> npm run eval -- agent.talent | agent.manager
// ponytail: deterministic graders only; add the rubric (model-graded) grader when a case needs judgement beyond patterns.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import OpenAI from 'openai'
process.env.OPENAI_AGENTS_DISABLE_TRACING = '1'
const suite = process.argv[2], THRESHOLD = Number(process.env.EVAL_THRESHOLD ?? 0.9), model = process.env.AI_COACH_MODEL
if (!suite || !model || !process.env.OPENAI_API_KEY) throw new Error('usage: npm run eval -- <agent.talent|agent.manager|daily_topics> (needs AI_COACH_MODEL, OPENAI_API_KEY)')
type Case = Record<string, any> & { id: string }
const cases: Case[] = readFileSync(new URL(`../evals/${suite}/cases.jsonl`, import.meta.url), 'utf8').trim().split('\n').map(l => JSON.parse(l))
const results: Array<{ id: string; pass: boolean; failures: string[]; output: unknown }> = []
const re = (p: string) => new RegExp(p)

if (suite === 'daily_topics') {
  const { runTask } = await import('../src/ai/tasks/define.ts'), { dailyTopics } = await import('../src/ai/tasks/daily-topics.ts')
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: process.env.OPENAI_BASE_URL })
  for (const c of cases) {
    const failures: string[] = []
    let output: unknown = null
    try {
      const talent = { talentId: randomUUID(), displayName: 'テスト', isMinor: !!c.minor, profile: { profile: c.profile }, profileVersion: '1', profileReady: true, instructions: [], goals: [] }
      const r = await runTask(client as never, dailyTopics, { talent, date: '2031-04-01', recentThemes: c.recent }, { model, timeoutMs: 60_000 })
      output = r.data
      const titles = r.data.topics.map(t => t.title)
      if (new Set(titles).size !== 3) failures.push('topics not distinct')
      if (!r.data.topics.every(t => /[぀-ヿ一-龯]/.test(t.title + t.angle))) failures.push('not Japanese')
      for (const old of c.recent as string[]) if (titles.some(t => t.includes(old))) failures.push(`repeats recent theme ${old}`)
      if (r.data.topics.some(t => /健康診断|契約|借金|投資/.test(t.title + t.angle))) failures.push('off-limits topic')
    } catch (e) { failures.push('error ' + (e as Error).message) }
    results.push({ id: c.id, pass: !failures.length, failures, output })
    console.log(failures.length ? '✗' : '✓', c.id, failures.join('; '))
  }
} else {
  const url = process.env.TEST_DATABASE_URL, ownerUrl = process.env.TEST_OWNER_DATABASE_URL
  if (!url || !ownerUrl || url === ownerUrl || ![url, ownerUrl].every(u => ['localhost', '127.0.0.1'].includes(new URL(u).hostname))) throw new Error('agent evals need local TEST_DATABASE_URL (runtime) + TEST_OWNER_DATABASE_URL')
  const { createDatabase } = await import('../src/infra/database/client.ts'), { loadEnv } = await import('../src/config/env.ts'), { controlServices } = await import('../src/container.ts')
  const { ConversationStore } = await import('../src/modules/coach-conversation/store.ts'), { runAgentEvent } = await import('../src/ai/runtime/run-agent.ts')
  const db = createDatabase(url), owner = createDatabase(ownerUrl)
  const env = loadEnv({ DATABASE_URL: url, NODE_ENV: 'test', CORS_ORIGINS: 'http://eval.test', ENABLE_AUTH_DEMO: 'true', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'x', ENABLE_AGENT_CORE: 'true' })
  const { proposals } = controlServices(env, db), store = new ConversationStore(db, { perMinute: 100_000, perDay: 100_000 }) // evals send many messages per minute
  const deps = { db, store, proposals, cfg: { model, modelName: model, maxTurns: 8, computeMs: 120_000, heartbeatMs: 5000, maxOutputTokens: 1200, reasoningEffort: 'low' as const, writesEnabled: true, history: { items: 30, chars: 16_000 }, price: null } }
  const login = async (k: string) => { const u = randomUUID(); await owner.$executeRaw`INSERT INTO auth.users(id) VALUES(${u}::uuid)`; await owner.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${u}::uuid,${k})`; return u }
  const mu = await login('manager'), [m] = await db.$queryRaw<any[]>`INSERT INTO public.managers(auth_user_id) VALUES(${mu}::uuid) RETURNING id::text`
  const M = { kind: 'manager' as const, userId: mu, managerId: m.id }
  const newTalent = async () => {
    const tu = await login('talent'), name = 'Eval' + randomUUID().slice(0, 4)
    const [ap] = await db.$queryRaw<any[]>`INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at) VALUES(${name},${tu + '@example.test'},'2004-01-01','approved',${m.id}::uuid,now()) RETURNING id::text`
    const [t] = await db.$queryRaw<any[]>`INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status) VALUES(${tu}::uuid,'talent',${name},'2004-01-01','in_use',${ap.id}::uuid,'approved') RETURNING id::text`
    await db.$executeRaw`INSERT INTO app_private.talent_profiles(talent_id,profile,updated_by) VALUES(${t.id}::uuid,${JSON.stringify({ profile: 'ダンスと写真が好きな大学生。TikTokで1万人が目標。', direction: 'ダンス動画中心' })}::jsonb,${mu}::uuid)`
    return { name, actor: { kind: 'talent' as const, userId: tu, talentId: t.id, status: 'in_use' } }
  }
  const turn = async (a: any, ch: 'talent' | 'manager_ui', conv: string, text: string) => {
    const r = await store.submit(a, ch, conv, randomUUID(), text)
    for (const e of await store.leaseDue(10)) { await store.releaseDispatch(e.eventId, e.token, 'enqueued'); await runAgentEvent(deps, e.eventId) }
    const v = await store.runView(a, ch, r.id)
    const tools = (await db.$queryRaw<Array<{ name: string }>>`SELECT item->>'name' AS name FROM app_private.agent_session_items WHERE run_id=${r.id}::uuid AND kind='function_call'`).map(x => x.name)
    const said = (await db.$queryRaw<Array<{ t: string }>>`SELECT coalesce(string_agg(display_text,' '),'') t FROM app_private.agent_session_items WHERE run_id=${r.id}::uuid AND kind='message' AND role='assistant'`)[0].t
    return { v, tools, shown: v.finalText ?? '', said }
  }
  try {
    for (const c of cases) {
      const failures: string[] = [], t = await newTalent(), manager = suite === 'agent.manager', ch = manager ? 'manager_ui' as const : 'talent' as const, a = manager ? M : t.actor
      const conv = (await store.createConversation(a, ch, randomUUID())).conversationId, input = String(c.input).replaceAll('{name}', t.name)
      let out: any = null
      try {
        const r = await turn(a, ch, conv, input); out = { state: r.v.state, tools: r.tools, shown: r.shown, said: r.said, proposals: r.v.proposals.length }
        if (r.v.state !== 'succeeded') failures.push(`state ${r.v.state} ${r.v.errorCode}`)
        for (const x of c.tools ?? []) if (!r.tools.includes(x)) failures.push(`missing tool ${x}`)
        for (const x of c.notTools ?? []) if (r.tools.includes(x)) failures.push(`forbidden tool ${x}`)
        for (const p of c.must ?? []) if (!re(p).test(r.shown)) failures.push(`shown lacks /${p}/`)
        for (const p of c.not ?? []) if (re(p).test(r.shown)) failures.push(`shown has /${p}/`)
        if (c.proposals !== undefined && r.v.proposals.length !== c.proposals) failures.push(`proposals ${r.v.proposals.length}≠${c.proposals}`)
        if (c.followup && r.v.proposals[0]) {
          const p = await proposals.view(M, r.v.proposals[0].id)
          if (c.confirm) await proposals.confirm(M, 'manager_ui', p.proposalId, { requestKey: randomUUID(), proposalHash: p.proposalHash })
          if (c.reject) await proposals.reject(M, 'manager_ui', p.proposalId, { requestKey: randomUUID() })
          const f = await turn(a, ch, conv, c.followup); out.followup = f.shown
          for (const q of c.followMust ?? []) if (!re(q).test(f.shown)) failures.push(`followup lacks /${q}/`)
          for (const q of c.followNot ?? []) if (re(q).test(f.shown)) failures.push(`followup has /${q}/`)
        }
      } catch (e) { failures.push('error ' + (e as Error).message) }
      results.push({ id: c.id, pass: !failures.length, failures, output: out })
      console.log(failures.length ? '✗' : '✓', c.id, failures.join('; '))
    }
  } finally { await db.$disconnect(); await owner.$disconnect() }
}
const rate = results.filter(r => r.pass).length / results.length
mkdirSync(new URL('../evals/results/', import.meta.url), { recursive: true })
writeFileSync(new URL(`../evals/results/${suite}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`, import.meta.url), JSON.stringify({ suite, model, threshold: THRESHOLD, rate, results }, null, 2))
console.log(`${suite}: ${(rate * 100).toFixed(0)}% (${results.filter(r => r.pass).length}/${results.length}), threshold ${THRESHOLD * 100}%`)
process.exit(rate >= THRESHOLD ? 0 : 1)
