import { AppError } from '../core/errors.ts'
import { canonical, sha256 } from '../core/hash.ts'
import type { Tx } from './tx.ts'

// HTTP idempotency for every state-changing POST (agent_spec/ai-core/API_DESIGN.md §1, DATABASE_DESIGN.md §3.4).
// Runs INSIDE the transaction of the action: the row and the action commit or roll back together, so a stored row always
// has its response. A concurrent request with the same key waits on the unique key, then reads the committed response.
export type Stored = { status: 200 | 201 | 202 | 409 | 410; body: unknown }
export type RequestRef = { actorUserId: string; routeKey: string; requestKey: string }

export async function once(tx: Tx, ref: RequestRef, payload: unknown, action: () => Promise<Stored>): Promise<Stored> {
  const hash = sha256(canonical(payload))
  const inserted = await tx.$queryRaw<unknown[]>`
    INSERT INTO app_private.idempotency_requests(actor_user_id,route_key,request_key,payload_hash)
    VALUES(${ref.actorUserId}::uuid,${ref.routeKey},${ref.requestKey}::uuid,${hash}) ON CONFLICT DO NOTHING RETURNING 1`
  if (!inserted.length) {
    const [r] = await tx.$queryRaw<Array<{ payload_hash: string; response_status: number; response_body: unknown }>>`
      SELECT payload_hash,response_status,response_body FROM app_private.idempotency_requests
      WHERE actor_user_id=${ref.actorUserId}::uuid AND route_key=${ref.routeKey} AND request_key=${ref.requestKey}::uuid`
    if (!r || r.payload_hash !== hash) throw new AppError('REQUEST_KEY_REUSED', 409)
    return { status: r.response_status as Stored['status'], body: r.response_body }
  }
  const out = await action()
  await tx.$executeRaw`UPDATE app_private.idempotency_requests SET response_status=${out.status},response_body=${JSON.stringify(out.body)}::jsonb
    WHERE actor_user_id=${ref.actorUserId}::uuid AND route_key=${ref.routeKey} AND request_key=${ref.requestKey}::uuid`
  return out
}
