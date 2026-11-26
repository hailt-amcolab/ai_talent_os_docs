import type { AgentInputItem } from '@openai/agents'
import type { Tx } from '../../control/tx.ts'

// Session items of a conversation (agent_spec/ai-core/DATABASE_DESIGN.md §3.1). Written by the SDK session (one batch per run)
// and by the Control Plane after a Manager's confirm (receipt item, so the next turn of the agent knows what was saved).
export const kindOf = (i: AgentInputItem) => {
  const t = 'type' in i && i.type ? i.type : 'message'
  return (['message', 'function_call', 'function_call_result', 'reasoning'] as const).includes(t as never) ? t as 'message' : 'other'
}
export const textOf = (i: AgentInputItem): string | null => {
  if (kindOf(i) !== 'message' || !('content' in i)) return null
  const c = (i as { content: unknown }).content
  return typeof c === 'string' ? c : Array.isArray(c) ? c.map(p => (p && typeof p === 'object' && 'text' in p ? String((p as { text: unknown }).text) : '')).join('') : null
}

// Next free sequence of a conversation, under its row lock (also used by the Control Plane for receipt items).
export async function appendItems(tx: Tx, conversationId: string, runId: string | null, items: AgentInputItem[], source: 'sdk' | 'control_receipt' = 'sdk') {
  if (!items.length) return
  const [c] = await tx.$queryRaw<Array<{ next_sequence: bigint }>>`SELECT next_sequence FROM app_private.agent_conversations WHERE id=${conversationId}::uuid FOR UPDATE`
  let seq = c.next_sequence
  for (const it of items) {
    const kind = kindOf(it), role = kind === 'message' && 'role' in it ? String(it.role) : null
    await tx.$executeRaw`INSERT INTO app_private.agent_session_items(conversation_id,sequence,run_id,kind,role,item,display_text,source)
      VALUES(${conversationId}::uuid,${seq},${runId}::uuid,${kind},${role},${JSON.stringify(it)}::jsonb,${textOf(it)},${source})`
    seq++
  }
  await tx.$executeRaw`UPDATE app_private.agent_conversations SET next_sequence=${seq},version=version+1 WHERE id=${conversationId}::uuid`
}


export async function appendReceipt(tx: Tx, runId: string, text: string) {
  const [r] = await tx.$queryRaw<Array<{ conversation_id: string }>>`SELECT conversation_id::text FROM app_private.agent_runs WHERE id=${runId}::uuid`
  if (!r) return
  // role system: a fact recorded by the backend, not the assistant's own words (live smoke 26/11: as 'assistant' the model trusted its earlier "not saved").
  const item = { role: 'system', content: text } as unknown as AgentInputItem
  await appendItems(tx, r.conversation_id, null, [item], 'control_receipt')
}
