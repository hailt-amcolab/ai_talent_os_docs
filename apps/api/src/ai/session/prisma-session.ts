import type { AgentInputItem, Session } from '@openai/agents'
import type { Database } from '../../infra/database/client.ts'
import { appendItems } from '../../modules/coach-conversation/items.ts'

// Agents SDK session on Postgres (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §4.4, ADR-05). P0: the SDK writes a run's items once,
// when the run ends; so addItems is one transaction, fenced on the run's lease (a worker that lost its lease writes nothing).
export class LeaseLostError extends Error { constructor() { super('LEASE_LOST') } }
export type Fence = { runId: string; token: string }

export class PrismaSession implements Session {
  private readonly db: Database; private readonly conversationId: string; private readonly fence: Fence
  constructor(db: Database, conversationId: string, fence: Fence) { this.db = db; this.conversationId = conversationId; this.fence = fence }
  async getSessionId() { return this.conversationId }
  async getItems(limit?: number): Promise<AgentInputItem[]> {
    const n = limit ?? 10_000
    const rows = await this.db.$queryRaw<Array<{ item: AgentInputItem }>>`SELECT item FROM app_private.agent_session_items
      WHERE conversation_id=${this.conversationId}::uuid AND discarded_at IS NULL ORDER BY sequence DESC LIMIT ${n}`
    return rows.map(r => r.item).reverse()
  }
  async addItems(items: AgentInputItem[]) {
    await this.db.$transaction(async tx => {
      const [own] = await tx.$queryRaw<unknown[]>`SELECT 1 FROM app_private.agent_runs WHERE id=${this.fence.runId}::uuid AND state='running' AND lease_token=${this.fence.token}::uuid FOR SHARE`
      if (!own) throw new LeaseLostError()
      await appendItems(tx, this.conversationId, this.fence.runId, items)
    })
  }
  async popItem(): Promise<AgentInputItem | undefined> {
    const [r] = await this.db.$queryRaw<Array<{ item: AgentInputItem }>>`UPDATE app_private.agent_session_items SET discarded_at=now() WHERE id=(SELECT id FROM app_private.agent_session_items
      WHERE conversation_id=${this.conversationId}::uuid AND discarded_at IS NULL ORDER BY sequence DESC LIMIT 1) RETURNING item`
    return r?.item
  }
  async clearSession() { throw new Error('clearSession is not used in the product') }
}
