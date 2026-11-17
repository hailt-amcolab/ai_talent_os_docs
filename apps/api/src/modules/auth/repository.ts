import { createHash } from 'node:crypto'
import type { Database } from '../../infra/database/client.ts'
import type { VerifiedToken } from '../../core/auth.ts'
import { AppError } from '../../core/errors.ts'
export class AuthRepository {
  readonly db: Database
  constructor(db: Database) { this.db = db }
  async session(a: VerifiedToken) {
    await this.db.$executeRaw`INSERT INTO app_private.tech_demo_sessions(session_id,auth_user_id) VALUES (${a.sessionId}::uuid,${a.userId}::uuid) ON CONFLICT(session_id) DO NOTHING`
    const rows = await this.db.$queryRaw<Array<{ valid: boolean }>>`SELECT revoked_at IS NULL AND auth_user_id=${a.userId}::uuid AS valid FROM app_private.tech_demo_sessions WHERE session_id=${a.sessionId}::uuid`
    if (!rows[0]?.valid) throw new AppError('SESSION_REVOKED', 401)
  }
  async revoke(a: VerifiedToken) {
    await this.db.$transaction(async tx => {
      await tx.$executeRaw`UPDATE app_private.tech_demo_sessions SET revoked_at=COALESCE(revoked_at,now()) WHERE session_id=${a.sessionId}::uuid AND auth_user_id=${a.userId}::uuid`
      await tx.$executeRaw`UPDATE app_private.tech_demo_push_subscriptions SET is_active=false,updated_at=now() WHERE session_id=${a.sessionId}::uuid AND auth_user_id=${a.userId}::uuid`
    })
  }
  async rateLimit(key: string, limit: number, seconds = 60) {
    const hash = createHash('sha256').update(key).digest('hex')
    const rows = await this.db.$queryRaw<Array<{ count: number }>>`INSERT INTO app_private.auth_rate_buckets(bucket_key,count) VALUES (${hash},1)
      ON CONFLICT(bucket_key) DO UPDATE SET count=CASE WHEN auth_rate_buckets.window_started_at<now()-make_interval(secs=>${seconds}) THEN 1 ELSE LEAST(auth_rate_buckets.count+1,10000) END,
      window_started_at=CASE WHEN auth_rate_buckets.window_started_at<now()-make_interval(secs=>${seconds}) THEN now() ELSE auth_rate_buckets.window_started_at END RETURNING count`
    if (rows[0]!.count > limit) throw new AppError('RATE_LIMITED', 429)
  }
}
