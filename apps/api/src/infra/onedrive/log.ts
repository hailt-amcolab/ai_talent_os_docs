import { tryGetContext } from 'hono/context-storage'

// One JSON line per Microsoft failure, tagged with this system's request ID (http/app.ts contextStorage).
// Callers pass fixed labels and Microsoft error codes only: never tokens, secrets, file names or item IDs.
export const currentRequestId = () => tryGetContext<{ Variables: { requestId: string } }>()?.get('requestId')
export function msLog(fields: Record<string, unknown>) {
  console.warn(JSON.stringify({ level: 'warn', requestId: currentRequestId(), ...fields }))
}
