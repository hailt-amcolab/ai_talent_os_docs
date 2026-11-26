import { AppError } from '../core/errors.ts'
import { sha256 } from '../core/hash.ts'
import type { Tx } from './tx.ts'

// Fixed-window counter in app_private.auth_rate_buckets (same SQL as the Auth module), keyed by a hash so no user id is stored
// in clear. ponytail: fixed window (a burst at the window edge can reach 2× limit); a sliding window if that ever matters.
export async function rateLimit(db: Tx, key: string, limit: number, seconds: number) {
  const [r] = await db.$queryRaw<Array<{ count: number }>>`INSERT INTO app_private.auth_rate_buckets(bucket_key,count) VALUES (${sha256(key)},1)
    ON CONFLICT(bucket_key) DO UPDATE SET count=CASE WHEN auth_rate_buckets.window_started_at<now()-make_interval(secs=>${seconds}) THEN 1 ELSE LEAST(auth_rate_buckets.count+1,10000) END,
    window_started_at=CASE WHEN auth_rate_buckets.window_started_at<now()-make_interval(secs=>${seconds}) THEN now() ELSE auth_rate_buckets.window_started_at END RETURNING count`
  if (r.count > limit) throw new AppError('RATE_LIMITED', 429)
}
