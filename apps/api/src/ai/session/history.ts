import type { AgentInputItem, SessionInputCallback } from '@openai/agents'

// History cut (agent_spec/ai-core/AI_RUNTIME_DESIGN.md §4.3): newest items within an item and character budget, never a
// function call without its result (or a result without its call), whatever the cut point. The kept history starts at a
// user message, so a turn is never split (a reasoning item must stay with the item that follows it).
export function trimHistory(limits: { items: number; chars: number }): SessionInputCallback {
  return (history, newItems) => {
    const kept: AgentInputItem[] = []
    let chars = 0
    for (let i = history.length - 1; i >= 0 && kept.length < limits.items; i--) {
      const size = JSON.stringify(history[i]).length
      if (chars + size > limits.chars) break
      chars += size; kept.unshift(history[i])
    }
    const firstUser = kept.findIndex(i => (!('type' in i) || i.type === 'message') && 'role' in i && i.role === 'user')
    kept.splice(0, firstUser < 0 ? kept.length : firstUser)
    const callId = (i: AgentInputItem) => (i as { callId?: string }).callId
    const calls = new Set(kept.filter(i => 'type' in i && i.type === 'function_call').map(callId))
    const results = new Set(kept.filter(i => 'type' in i && i.type === 'function_call_result').map(callId))
    const paired = kept.filter(i => !('type' in i) || (i.type !== 'function_call' && i.type !== 'function_call_result')
      || (i.type === 'function_call' ? results.has(callId(i)) : calls.has(callId(i))))
    return [...paired, ...newItems]
  }
}
