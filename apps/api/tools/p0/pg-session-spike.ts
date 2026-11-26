// P0 spike for ADR-05: an Agents SDK Session backed by Postgres (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §4.4).
// Usage: P0_PG_URL=postgres://postgres@127.0.0.1:55432/p0 SPIKE_EFFORT=medium node --env-file=.env tools/p0/pg-session-spike.ts
// ponytail: prototype on a throwaway DB; the real adapter goes to src/ai/session/ at P2 (Prisma, runtime role, migration).
import { Agent, run, tool, type Session, type AgentInputItem } from '@openai/agents'
import pg from 'pg'
import { z } from 'zod'

const url = process.env.P0_PG_URL
if (!url || !/127\.0\.0\.1|localhost/.test(url)) throw new Error('P0_PG_URL must point to a local throwaway DB')
process.env.OPENAI_AGENTS_DISABLE_TRACING = '1'
const pool = new pg.Pool({ connectionString: url })

await pool.query(`CREATE TABLE IF NOT EXISTS agent_session_items (
  id bigserial PRIMARY KEY, conversation_id text NOT NULL, sequence bigint NOT NULL, run_id text,
  kind text NOT NULL, role text, item jsonb NOT NULL, display_text text, discarded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(), UNIQUE (conversation_id, sequence))`)

class PgSession implements Session {
  private conversationId: string; private runId: string
  constructor(conversationId: string, runId: string) { this.conversationId = conversationId; this.runId = runId }
  async getSessionId() { return this.conversationId }
  async getItems(limit?: number): Promise<AgentInputItem[]> {
    const r = await pool.query(`SELECT item FROM agent_session_items WHERE conversation_id=$1 AND discarded_at IS NULL
      ORDER BY sequence DESC ${limit ? 'LIMIT ' + Number(limit) : ''}`, [this.conversationId])
    return r.rows.map(x => x.item).reverse()
  }
  async addItems(items: AgentInputItem[]) {
    const c = await pool.connect()
    try {
      await c.query('BEGIN')
      // ponytail: advisory lock per conversation stands in for the row lock on agent_conversations.next_sequence
      await c.query('SELECT pg_advisory_xact_lock(hashtext($1))', [this.conversationId])
      const { rows: [{ n }] } = await c.query('SELECT coalesce(max(sequence),0) n FROM agent_session_items WHERE conversation_id=$1', [this.conversationId])
      let seq = Number(n)
      for (const it of items) {
        const kind = 'type' in it && it.type ? it.type : 'message', role = 'role' in it ? it.role : null
        const text = kind === 'message' && 'content' in it ? (typeof it.content === 'string' ? it.content
          : (it.content as Array<{ text?: string }>).map(p => p.text ?? '').join('')) : null
        await c.query('INSERT INTO agent_session_items(conversation_id,sequence,run_id,kind,role,item,display_text) VALUES($1,$2,$3,$4,$5,$6,$7)',
          [this.conversationId, ++seq, this.runId, kind, role, JSON.stringify(it), text])
      }
      await c.query('COMMIT')
    } catch (e) { await c.query('ROLLBACK'); throw e } finally { c.release() }
  }
  async popItem() {
    const r = await pool.query(`UPDATE agent_session_items SET discarded_at=now() WHERE id=(SELECT id FROM agent_session_items
      WHERE conversation_id=$1 AND discarded_at IS NULL ORDER BY sequence DESC LIMIT 1) RETURNING item`, [this.conversationId])
    return r.rows[0]?.item
  }
  async clearSession() { throw new Error('clearSession is not used in the product') }
}

const readProfile = tool({ name: 'context_read', description: 'タレント本人のプロフィールを読む。', parameters: z.object({ sections: z.array(z.enum(['profile'])).min(1).max(1) }),
  execute: async () => ({ profile: 'ダンスが得意な高校生。目標はTikTokで1万人。' }) })
const mk = () => new Agent({ name: 'pg_spike', model: process.env.AI_COACH_MODEL!, instructions: '日本語で短く答えるAIコーチ。プロフィールが必要なら context_read。',
  tools: [readProfile], modelSettings: { maxTokens: 400, store: false, reasoning: { effort: (process.env.SPIKE_EFFORT ?? 'medium') as 'medium' } } })

const conv = 'conv-' + Date.now()
const turns = ['プロフィールを読んで。合言葉は「あさがお」。', '今日のおすすめ投稿は?', '最初の合言葉は?']
let ok = true
for (const [i, q] of turns.entries()) {
  // a NEW Session object and a NEW Agent each turn = what a restarted worker process would do
  const r = await run(mk(), q, { session: new PgSession(conv, 'run-' + i), maxTurns: 6 })
  console.log(`turn ${i + 1}:`, String(r.finalOutput).replace(/\s+/g, ' ').slice(0, 80))
  if (i === 2 && !String(r.finalOutput).includes('あさがお')) ok = false
}
const rows = (await pool.query('SELECT run_id, kind, role, item FROM agent_session_items WHERE conversation_id=$1 ORDER BY sequence', [conv])).rows
console.log('rows', rows.length, rows.map(r => `${r.run_id}:${r.kind}${r.role ? ':' + r.role : ''}`).join(' | '))
const reasoning = rows.filter(r => r.kind === 'reasoning')
console.log('reasoning rows', reasoning.length, 'jsonb round-trip keeps encrypted content', reasoning.every(r => JSON.stringify(r.item).includes('ncrypted')))
const back = await new PgSession(conv, 'x').getItems()
console.log('getItems count matches rows', back.length === rows.length)
console.log(ok ? 'ADR-05 PG SESSION PASS' : 'ADR-05 PG SESSION FAIL (context lost)')
await pool.end()
