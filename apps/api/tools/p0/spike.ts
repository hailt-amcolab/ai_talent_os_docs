// P0 spikes (agent_spec/ai-core/TECHNICAL_RISK_REGISTER.md §3): VT-01..VT-05 against the real OpenAI API.
// Usage: node --env-file=.env tools/p0/spike.ts <vt01|vt04|vt05|all>   (model = AI_COACH_MODEL)
// ponytail: throwaway verification script, not production code; promote pieces into src/ai/ at P2.
import { Agent, run, tool, MaxTurnsExceededError, type Session, type AgentInputItem } from '@openai/agents'
import { z } from 'zod'

const MODEL = process.env.AI_COACH_MODEL
if (!MODEL || !process.env.OPENAI_API_KEY) throw new Error('AI_COACH_MODEL and OPENAI_API_KEY required')
process.env.OPENAI_AGENTS_DISABLE_TRACING = '1' // spikes use fake data; keep traces out of the dashboard
const t0 = Date.now(), ms = () => String(Date.now() - t0).padStart(6)
const log = (...a: unknown[]) => console.log(`[${ms()}]`, ...a)
const kindOf = (i: AgentInputItem) => (('type' in i && i.type) ? i.type : 'message') + (('role' in i && i.role) ? ':' + i.role : '')

// Session that keeps items in memory and logs WHEN the SDK writes (VT-05).
export class RecordingSession implements Session {
  items: AgentInputItem[] = []
  writes: Array<{ at: number; types: string[] }> = []
  private id: string
  constructor(id = 'spike') { this.id = id }
  async getSessionId() { return this.id }
  async getItems(limit?: number) { const c = structuredClone(this.items); return limit ? c.slice(-limit) : c }
  async addItems(items: AgentInputItem[]) {
    const types = items.map(kindOf)
    this.writes.push({ at: Date.now() - t0, types }); log('  session.addItems', types.join(', '))
    this.items.push(...structuredClone(items))
  }
  async popItem() { return this.items.pop() }
  async clearSession() { this.items = [] }
}

type Ctx = { actor: { kind: 'talent'; talentId: string }; secretMarker: string }
const profiles: Record<string, string> = { 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa': 'ダンスが得意な高校生。目標はTikTokで1万人。' }
let toolCalls = 0
const contextRead = (delayMs = 0) => tool({
  name: 'context_read',
  description: 'タレント本人のプロフィールを読む。talentId は不要(サーバーが決める)。',
  parameters: z.object({ sections: z.array(z.enum(['profile', 'goals'])).min(1).max(2) }),
  async execute(args, rc, details) {
    toolCalls++
    const c = (rc as { context: Ctx }).context
    log('  tool context_read start', JSON.stringify(args))
    if (delayMs) await new Promise((res, rej) => { const t = setTimeout(res, delayMs); details?.signal?.addEventListener('abort', () => { clearTimeout(t); rej(new Error('aborted')) }) })
    log('  tool context_read end')
    return { profile: profiles[c.actor.talentId] ?? null, goals: { tiktok: 10000 } }
  },
})

function agent(delayMs = 0, store?: boolean) {
  return new Agent<Ctx>({
    name: 'talent_coach_spike',
    model: MODEL,
    instructions: (rc) => `あなたはタレントのAIコーチです。日本語で短く答える。プロフィールが必要なら context_read を使う。[ctx-ok:${rc.context.actor.kind}]`,
    tools: [contextRead(delayMs)],
    modelSettings: { maxTokens: 400, ...(store === undefined ? {} : { store }), reasoning: { effort: (process.env.SPIKE_EFFORT ?? 'low') as 'low' | 'medium' | 'high' } },
  })
}
const ctx: Ctx = { actor: { kind: 'talent', talentId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa' }, secretMarker: 'SECRET-DO-NOT-SEND' }

async function vt01() {
  log('VT-01/02/03: agent + dynamic instructions + one tool + usage')
  const r = await run(agent(), '私のプロフィールを読んで、一言アドバイスをください。', {
    context: ctx, maxTurns: 6, toolExecution: { maxFunctionToolConcurrency: 1 }, toolNotFoundBehavior: 'return_error_to_model',
  })
  const u = r.runContext.usage
  log('finalOutput:', String(r.finalOutput).slice(0, 120))
  log('usage: requests', u.requests, 'in', u.inputTokens, 'out', u.outputTokens, 'entries', u.requestUsageEntries?.length)
  for (const e of u.requestUsageEntries ?? []) log('  entry', JSON.stringify({ in: e.inputTokens, out: e.outputTokens, inD: e.inputTokensDetails, outD: e.outputTokensDetails, ep: e.endpoint }))
  log('rawResponses', r.rawResponses.length, 'ids', r.rawResponses.map(x => x.responseId ?? '?').join(','), 'lastResponseId', r.lastResponseId)
  log('context secret present in raw responses?', JSON.stringify(r.rawResponses).includes('SECRET-DO-NOT-SEND'))
  const ok = toolCalls >= 1 && u.requests >= 2 && (u.requestUsageEntries?.length ?? 0) === u.requests
  log(ok ? 'VT-01..03 PASS' : 'VT-01..03 CHECK OUTPUT')
}

async function vt04(store: boolean) {
  log(`VT-04: store:${store}, session, 5 turns with tool, reasoning effort low`)
  const s = new RecordingSession('vt04-' + store)
  const turns = ['私のプロフィールを読んで。合言葉は「ひまわり」と覚えておいて。', '今日は何を投稿すべき?', 'もう一度プロフィールを確認して、目標との差を教えて。', '週末のおすすめは?', '最初に伝えた合言葉は何でしたか?']
  let errors = 0
  for (const [i, q] of turns.entries()) {
    try {
      const r = await run(agent(0, store), q, { context: ctx, session: s, maxTurns: 6 })
      log(`turn ${i + 1}:`, String(r.finalOutput).replace(/\s+/g, ' ').slice(0, 90))
      if (i === 4) log('remembers passphrase?', String(r.finalOutput).includes('ひまわり'))
    } catch (e) { errors++; log(`turn ${i + 1} ERROR`, (e as Error).name, (e as Error).message.slice(0, 300)) }
  }
  const reasoning = s.items.filter(i => 'type' in i && i.type === 'reasoning')
  log('session items', s.items.length, 'types', [...new Set(s.items.map(kindOf))].join(','), 'reasoning items', reasoning.length,
    'with encrypted content', reasoning.filter(r => JSON.stringify(r).includes('ncrypted')).length)
  log(errors ? `VT-04 store:${store} FAIL (${errors} errors)` : `VT-04 store:${store} PASS (no errors)`)
}

async function vt05() {
  log('VT-05a: when does the SDK write the session (normal run with a tool)?')
  const s = new RecordingSession('vt05a')
  await run(agent(), 'プロフィールを読んでから一言。', { context: ctx, session: s, maxTurns: 6 })
  log('writes', JSON.stringify(s.writes))

  log('VT-05b: abort while the tool is running (tool sleeps 4s, abort 1.5s after tool start)')
  const s2 = new RecordingSession('vt05b'), ac = new AbortController(), before = toolCalls
  const watch = setInterval(() => { if (toolCalls > before) { clearInterval(watch); setTimeout(() => { log('  -> abort()'); ac.abort() }, 1500) } }, 50)
  try { await run(agent(4000), 'プロフィールを読んでから一言。', { context: ctx, session: s2, maxTurns: 6, signal: ac.signal }); log('  run finished (no abort?)') }
  catch (e) { log('  run threw', (e as Error).name, (e as Error).message.slice(0, 160)) }
  clearInterval(watch)
  log('  items after abort:', JSON.stringify(s2.items.map(kindOf)))
  log('VT-05c: next turn on the same session after abort')
  try { const r = await run(agent(), '続けて。一言で。', { context: ctx, session: s2, maxTurns: 6 }); log('  next turn OK:', String(r.finalOutput).slice(0, 80)) }
  catch (e) { log('  next turn ERROR', (e as Error).name, (e as Error).message.slice(0, 300)) }

  log('VT-05d: abort while the model is generating (abort 300ms after start)')
  const s3 = new RecordingSession('vt05d'), ac3 = new AbortController()
  setTimeout(() => ac3.abort(), 300)
  try { await run(agent(), '長めに自己紹介を考えて。', { context: ctx, session: s3, maxTurns: 6, signal: ac3.signal }); log('  finished before abort') }
  catch (e) { log('  run threw', (e as Error).name) }
  log('  items after model-abort:', JSON.stringify(s3.items.map(kindOf)))

  log('VT-05e: maxTurns=1 with a tool (forces MaxTurnsExceededError): what is persisted?')
  const s4 = new RecordingSession('vt05e')
  try { await run(agent(), 'プロフィールを読んで。', { context: ctx, session: s4, maxTurns: 1 }) }
  catch (e) { log('  threw', (e as Error).name, e instanceof MaxTurnsExceededError) }
  log('  items:', JSON.stringify(s4.items.map(kindOf)))
  log('VT-05f: next turn after MaxTurnsExceeded')
  try { const r = await run(agent(), '一言で。', { context: ctx, session: s4, maxTurns: 6 }); log('  next turn OK:', String(r.finalOutput).slice(0, 80)) }
  catch (e) { log('  next turn ERROR', (e as Error).name, (e as Error).message.slice(0, 300)) }
}

async function vt05s() {
  log('VT-05s1: streaming run with a tool: write timing')
  const s = new RecordingSession('vt05s1')
  const r = await run(agent(), 'プロフィールを読んでから一言。', { context: ctx, session: s, maxTurns: 6, stream: true })
  let chunks = 0
  for await (const _ of r.toTextStream()) chunks++
  await r.completed
  log('  text chunks', chunks, 'final', String(r.finalOutput).slice(0, 60), 'usage requests', r.runContext.usage.requests)
  log('  writes', JSON.stringify(s.writes))

  log('VT-05s2: streaming, abort while the model streams the final answer')
  const s2 = new RecordingSession('vt05s2'), ac = new AbortController()
  const r2 = await run(agent(), 'プロフィールを読んでから、200字で自己紹介文を考えて。', { context: ctx, session: s2, maxTurns: 6, stream: true, signal: ac.signal })
  let n = 0
  try { for await (const _ of r2.toTextStream()) { if (++n === 5) { log('  -> abort() after 5 text chunks'); ac.abort() } } await r2.completed }
  catch (e) { log('  threw', (e as Error).name) }
  log('  cancelled?', r2.cancelled, 'error?', r2.error ? (r2.error as Error).name : null)
  log('  items:', JSON.stringify(s2.items.map(kindOf)))
  log('VT-05s3: next turn after streaming abort')
  try { const r3 = await run(agent(), '一言で。', { context: ctx, session: s2, maxTurns: 6 }); log('  next turn OK:', String(r3.finalOutput).slice(0, 60)) }
  catch (e) { log('  next turn ERROR', (e as Error).name, (e as Error).message.slice(0, 300)) }
}

const which = process.argv[2] ?? 'all'
if (which === 'vt05s') await vt05s()
if (which === 'vt01' || which === 'all') await vt01()
if (which === 'vt04' || which === 'all') { await vt04(false); await vt04(true) }
if (which === 'vt05' || which === 'all') await vt05()
