import type { Redis } from 'ioredis'

// Live text of a running agent run (AI_RUNTIME_DESIGN.md §2.3, ADR-15): the worker publishes deltas, the API streams them as SSE.
// Only a preview: the final state always comes from Postgres. Redis pub/sub in production, an in-memory bus in tests.
export type RunEvents = { publish(runId: string, text: string): void; subscribe(runId: string, onText: (text: string) => void): Promise<() => void> }
const channel = (prefix: string, runId: string) => `${prefix}:run:${runId}`

export function redisRunEvents(pub: Redis, sub: Redis, prefix: string): RunEvents {
  const handlers = new Map<string, Set<(t: string) => void>>()
  sub.on('message', (ch: string, msg: string) => handlers.get(ch)?.forEach(h => h(msg)))
  return {
    publish: (runId, text) => { void pub.publish(channel(prefix, runId), text).catch(() => undefined) }, // best effort: SSE is optional
    async subscribe(runId, onText) {
      const ch = channel(prefix, runId)
      if (!handlers.has(ch)) { handlers.set(ch, new Set()); await sub.subscribe(ch) }
      handlers.get(ch)!.add(onText)
      return () => { const s = handlers.get(ch); s?.delete(onText); if (s && !s.size) { handlers.delete(ch); void sub.unsubscribe(ch).catch(() => undefined) } }
    },
  }
}

export function memoryRunEvents(): RunEvents {
  const handlers = new Map<string, Set<(t: string) => void>>()
  return {
    publish: (runId, text) => handlers.get(runId)?.forEach(h => h(text)),
    async subscribe(runId, onText) { if (!handlers.has(runId)) handlers.set(runId, new Set()); handlers.get(runId)!.add(onText); return () => { handlers.get(runId)?.delete(onText) } },
  }
}
