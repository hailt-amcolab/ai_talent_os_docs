import { test } from 'node:test'
import assert from 'node:assert/strict'
import { APICallError } from 'ai'
import { runEvent, type RunDeps } from './runner.ts'
import type { Claim, Outcome } from './store.ts'
import type { Results, TalentFiles } from './context.ts'
import { morningMessage, numbersAreKnown } from './context.ts'
import { renderAudit, type AuditRecord } from './audit.ts'
import { simulatedModels } from './simulated.ts'

const base: Claim = { executionId: 'e', operationId: 'o', eventId: 'ev', task: 'coach.respond', day: null, simulated: false, userId: 'u', folderId: 'f', token: 't', attemptId: 'a', attemptNo: 1, turns: [{ sender: 'talent', body: 'こんにちは' }], talent: { talentId: 'tl', displayName: 'Momo', isMinor: false, version: 1 } }
const dailyClaim: Claim = { ...base, task: 'coach.daily_themes', day: '2026-11-24', turns: [] }
const cfg = { provider: 'openai', model: 'm', timeoutMs: 1000, heartbeatMs: 50 }
const noResults: Results = { yesterday: '2026-11-23', yesterdayPosts: [], average7d: {}, recentPosts: [], followers: [], goals: [] }
const withPost: Results = { ...noResults, yesterdayPosts: [{ platform: 'instagram', publishedAt: '2026-11-23T10:00:00Z', caption: 'カフェ', metrics: { views: 1240, likes: 86 } }], followers: [{ platform: 'instagram', count: 1500, delta: 12, capturedOn: '2026-11-23' }] }
const file = (name: string, text: string) => ({ name, eTag: 'e1', text, source: `OneDrive test/${name} (item i-${name})` })
const profileFiles: TalentFiles = { agency: [file('Knowhow.md', '月曜はカフェ特集')], profile: file('Profile.md', '## 方向性\n\nカフェ巡り'), memo: null }

const withGoal: Results = { ...noResults, goals: [{ platform: 'instagram', targetFollowers: 10000, deadlineOn: '2027-03-31', achieved: false }] }
function fake(over: Partial<{ claim: Claim | 'busy' | 'nothing'; calling: boolean; results: Results }> = {}) {
  const calls: string[] = [], outcomes: Outcome[] = []
  const store = {
    claim: async () => { calls.push('claim'); return over.claim ?? base },
    heartbeat: async () => true,
    markCalling: async (_c: Claim, provider: string, model: string) => { calls.push(`calling:${provider}/${model}`); return over.calling ?? true },
    complete: async (_c: Claim, o: Outcome) => { calls.push('complete'); outcomes.push(o); return true },
    results: async () => over.results ?? noResults,
  }
  return { store, calls, outcomes }
}
const deps = (over: Partial<RunDeps> = {}): RunDeps => ({
  generate: async () => ({ text: ' はい ', inputTokens: 10, outputTokens: 5 }),
  generateDaily: async () => ({ output: { comment: '86いいねは平均より良い結果です', themes: [{ title: 'A', reason: 'r', source: 'profile' }, { title: 'B', reason: 'r', source: 'metrics' }, { title: 'C', reason: 'r', source: 'agency_rule' }], mission: 'ストーリーを1本' }, inputTokens: 100, outputTokens: 50 }),
  context: async () => profileFiles,
  ...over,
})

test('chat: claim → context → calling → one model call → fenced commit; prompt carries the OneDrive context', async () => {
  const f = fake({ results: withGoal }); let system = ''
  assert.equal(await runEvent(f.store, deps({ generate: async a => { system = a.system; return { text: 'はい', inputTokens: 1, outputTokens: 1 } } }), cfg, 'ev'), 'succeeded')
  assert.deepEqual(f.calls, ['claim', 'calling:openai/m', 'complete'])
  assert.match(system, /月曜はカフェ特集/)
  assert.match(system, /カフェ巡り/)
  assert.match(system, /instagram: 10000人\(期限 2027-03-31\)/) // follower goal from the DB, not a OneDrive file
  assert.ok(system.indexOf('アデッソからの指示') < system.indexOf('タレント情報'), '3-1 order: agency before talent')
})

test('busy or redelivered job never calls the model', async () => {
  for (const c of ['busy', 'nothing'] as const) {
    const f = fake({ claim: c })
    assert.equal(await runEvent(f.store, deps({ generate: () => assert.fail('model called') }), cfg, 'ev'), c)
  }
})

test('lease lost before the call: no model call', async () => {
  const f = fake({ calling: false })
  assert.equal(await runEvent(f.store, deps({ generate: () => assert.fail('model called') }), cfg, 'ev'), 'lease_lost')
})

test('provider HTTP error → failed; no answer → unknown; context read error → failed without a call', async () => {
  const http = fake()
  await runEvent(http.store, deps({ generate: async () => { throw new APICallError({ message: 'x', url: 'u', requestBodyValues: {}, statusCode: 429 }) } }), cfg, 'ev')
  assert.deepEqual(http.outcomes[0], { kind: 'failed', code: 'MODEL_RATE_LIMITED' })
  const net = fake()
  await runEvent(net.store, deps({ generate: async () => { throw new TypeError('fetch failed') } }), cfg, 'ev')
  assert.deepEqual(net.outcomes[0], { kind: 'unknown', code: 'MODEL_OUTCOME_UNKNOWN' })
  const od = fake()
  await runEvent(od.store, deps({ context: async () => { throw new Error('graph down') } }), cfg, 'ev')
  assert.deepEqual(od.outcomes[0], { kind: 'failed', code: 'CONTEXT_UNAVAILABLE', called: false })
  assert.ok(!od.calls.some(c => c.startsWith('calling')))
})

test('morning without a profile (UC-01 前提): no model call, no themes, "preparing" message', async () => {
  const f = fake({ claim: dailyClaim })
  await runEvent(f.store, deps({ context: async () => ({ agency: [], profile: file('Profile.md', '## 方向性\n\n## 趣味・特技\n'), memo: null }), generateDaily: () => assert.fail('model called') }), cfg, 'ev')
  const o = f.outcomes[0] as Extract<Outcome, { kind: 'succeeded' }>
  assert.equal(o.called, false)
  assert.equal(o.themes, undefined)
  assert.match(o.text, /プロフィールを準備中/)
})

test('morning with a profile: 3 themes, numbers from the DB, push sent', async () => {
  const f = fake({ claim: dailyClaim, results: withPost }); const pushed: string[] = []
  assert.equal(await runEvent(f.store, deps({ notify: async (u, m) => { pushed.push(`${u}:${m.url}`) } }), cfg, 'ev'), 'succeeded')
  const o = f.outcomes[0] as Extract<Outcome, { kind: 'succeeded' }>
  assert.deepEqual(o.themes, ['A', 'B', 'C'])
  assert.match(o.text, /views 1,240 \/ likes 86/)
  assert.match(o.text, /1,500人\(\+12\)/)
  assert.match(o.text, /86いいねは平均より良い結果です/)
  assert.match(o.text, /【今日のミッション】ストーリーを1本/)
  assert.deepEqual(pushed, ['u:/pwa/coach'])
})

test('3-6 acceptance 3: a comment with a number not in the data is replaced', () => {
  assert.equal(numbersAreKnown('86いいね、1,240回見られました', withPost), true)
  assert.equal(numbersAreKnown('2,000回見られました', withPost), false)
  const text = morningMessage('2026-11-24', withPost, { comment: '2,000回', themes: [{ title: 'A', reason: 'r', source: 'profile' }, { title: 'B', reason: 'r', source: 'profile' }, { title: 'C', reason: 'r', source: 'profile' }], mission: 'm' }, false)
  assert.doesNotMatch(text, /2,000/)
})

test('morning: shared daily trends go into the prompt; a failed search still sends the message without news', async () => {
  const f = fake({ claim: dailyClaim }); let prompt = ''
  await runEvent(f.store, deps({
    trends: async day => ({ day, content: '- 紅葉ライトアップ: 各地で見ごろ', sources: [{ url: 'https://example.com/a' }], source: 'Postgres app_private.ai_daily_trends day=' + day }),
    generateDaily: async a => { prompt = a.prompt; return deps().generateDaily(a) },
  }), cfg, 'ev')
  assert.match(prompt, /今日のニュース・トレンド[\s\S]*紅葉ライトアップ/)
  const g = fake({ claim: dailyClaim }), audits: AuditRecord[] = []
  assert.equal(await runEvent(g.store, deps({ trends: async () => { throw new Error('search down') }, audit: async a => { audits.push(a) } }), cfg, 'ev'), 'succeeded')
  assert.match(audits[0].notes.join('\n'), /trends unavailable: search down/)
})

test('input audit: every input with its source, the exact prompt and the raw output', async () => {
  const f = fake({ claim: dailyClaim, results: withPost }), audits: AuditRecord[] = []
  await runEvent(f.store, deps({ audit: async a => { audits.push(a) }, trends: async day => ({ day, content: 'トレンドA', sources: [], source: 'Postgres app_private.ai_daily_trends day=' + day }) }), cfg, 'ev')
  const a = audits[0], by = (n: string) => a.inputs.find(i => i.name === n)!
  assert.equal(a.result, 'succeeded')
  assert.equal(by('Profile.md').source, 'OneDrive test/Profile.md (item i-Profile.md)')
  assert.match(by('Profile.md').value, /カフェ巡り/)
  assert.match(by('Common/Knowhow.md').value, /月曜はカフェ特集/)
  assert.match(by('Common/Algorithm.md').source, /not found/)
  assert.match(by('昨日(2026-11-23)の投稿と指標').value, /"views": 1240/)
  assert.match(by('フォロワー数と前日比').source, /follower_snapshots/)
  assert.equal(by('今日のニュース・トレンド').source, 'Postgres app_private.ai_daily_trends day=2026-11-24')
  assert.match(a.prompts.system, /カフェ巡り/)
  assert.match(a.prompts.prompt, /トレンドA/)
  assert.deepEqual((a.output as { themes: unknown[] }).themes.length, 3)
  const md = renderAudit(a)
  assert.match(md, /### 1\.\d+ Profile\.md\n取得元: OneDrive test\/Profile\.md/)
  assert.match(md, /## 2\. AIに送ったプロンプト/)
  assert.match(md, /## 4\. 保存したメッセージ[\s\S]*今日のテーマ候補/)
})

test('simulated run: no real model or web search, realistic wait, sample text, provider recorded as simulated', async () => {
  const f = fake({ claim: { ...dailyClaim, simulated: true } }); let searched = false
  const sim = { ...simulatedModels(30), savedTrends: async (day: string) => ({ day, content: '保存済みトレンド', sources: [], source: 'saved' }) }
  const t0 = Date.now()
  assert.equal(await runEvent(f.store, deps({ simulated: sim, trends: async () => { searched = true; return null }, generateDaily: () => assert.fail('real model called') }), cfg, 'ev'), 'succeeded')
  assert.ok(Date.now() - t0 >= 30, 'waits like a call')
  assert.equal(searched, false, 'no web search in a simulated run')
  assert.deepEqual(f.calls, ['claim', 'calling:simulated/simulated', 'complete'])
  const o = f.outcomes[0] as Extract<Outcome, { kind: 'succeeded' }>
  assert.equal(o.simulated, true)
  assert.match(o.text, /【模擬】/)
  // A simulated job on a worker without the simulator never falls back to the real model.
  const g = fake({ claim: { ...base, simulated: true } })
  assert.equal(await runEvent(g.store, deps({ generate: () => assert.fail('real model called') }), cfg, 'ev'), 'failed')
  assert.deepEqual(g.outcomes[0], { kind: 'failed', code: 'SIMULATION_UNAVAILABLE', called: false })
})
