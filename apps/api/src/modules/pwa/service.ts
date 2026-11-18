import { ECDH, randomUUID } from 'node:crypto'
import type { Database } from '../../infra/database/client.ts'
import type { DemoIdentity } from '../../core/auth.ts'
import { AppError } from '../../core/errors.ts'
import { isAllowedPushEndpoint } from '../../infra/push/endpoint.ts'
import { sendPush, type VapidConfig } from '../../infra/push/sender.ts'
export interface PushInput { endpoint: string; keys: { p256dh: string; auth: string }; label?: string }
type Device = { id: string; endpoint: string; p256dh_key: string; auth_secret: string; session_id: string }
export class PwaService {
  readonly db: Database
  readonly vapid: VapidConfig | null
  readonly sender: typeof sendPush
  constructor(db: Database, vapid: VapidConfig | null, sender: typeof sendPush = sendPush) { this.db = db; this.vapid = vapid; this.sender = sender }
  async subscribe(a: DemoIdentity, input: PushInput) {
    if (!this.vapid) throw new AppError('PUSH_NOT_CONFIGURED', 503)
    if (!isAllowedPushEndpoint(input.endpoint)) throw new AppError('PUSH_ENDPOINT_INVALID', 422)
    try {
      if (Buffer.from(input.keys.auth, 'base64url').length !== 16 || Buffer.from(input.keys.p256dh, 'base64url').length !== 65) throw new Error('Invalid key')
      ECDH.convertKey(Buffer.from(input.keys.p256dh, 'base64url'), 'prime256v1')
    } catch { throw new AppError('PUSH_KEY_INVALID', 422) }
    await this.db.$transaction(async tx => {
      // Same lock as logout, before touching subscriptions: a stale in-flight
      // subscribe cannot recreate an active device after logout has detached it.
      const sessions = await tx.$queryRaw<Array<{ active: boolean }>>`SELECT revoked_at IS NULL AS active FROM app_private.tech_demo_sessions WHERE session_id=${a.sessionId}::uuid AND auth_user_id=${a.userId}::uuid FOR UPDATE`
      if (!sessions[0]?.active) throw new AppError('SESSION_REVOKED', 401)
      const n = await tx.$executeRaw`INSERT INTO app_private.tech_demo_push_subscriptions(auth_user_id,session_id,endpoint,p256dh_key,auth_secret,label)
       VALUES (${a.userId}::uuid,${a.sessionId}::uuid,${input.endpoint},${input.keys.p256dh},${input.keys.auth},${input.label ?? 'Browser'})
       ON CONFLICT(endpoint) DO UPDATE SET session_id=EXCLUDED.session_id,auth_user_id=EXCLUDED.auth_user_id,p256dh_key=EXCLUDED.p256dh_key,auth_secret=EXCLUDED.auth_secret,label=EXCLUDED.label,is_active=true,updated_at=now()
       WHERE tech_demo_push_subscriptions.auth_user_id=EXCLUDED.auth_user_id OR NOT tech_demo_push_subscriptions.is_active`
      if (n !== 1) throw new AppError('DEVICE_ALREADY_BOUND', 409)
    })
    return { active: true }
  }
  async subscription(a: DemoIdentity, endpoint: string) {
    const rows = await this.db.$queryRaw<Array<{ active: boolean }>>`SELECT is_active AS active FROM app_private.tech_demo_push_subscriptions WHERE auth_user_id=${a.userId}::uuid AND session_id=${a.sessionId}::uuid AND endpoint=${endpoint}`
    return { active: rows[0]?.active ?? false }
  }
  async unsubscribe(a: DemoIdentity, endpoint: string) {
    await this.db.$executeRaw`UPDATE app_private.tech_demo_push_subscriptions SET is_active=false,updated_at=now() WHERE auth_user_id=${a.userId}::uuid AND session_id=${a.sessionId}::uuid AND endpoint=${endpoint}`
  }
  async devices(a: DemoIdentity) {
    const items = await this.db.$queryRaw<Array<{ id: string; label: string; updated_at: Date; current: boolean }>>`SELECT p.id,p.label,p.updated_at,p.session_id=${a.sessionId}::uuid AS current FROM app_private.tech_demo_push_subscriptions p JOIN app_private.tech_demo_sessions s ON s.session_id=p.session_id WHERE p.auth_user_id=${a.userId}::uuid AND p.is_active AND s.revoked_at IS NULL ORDER BY p.updated_at DESC LIMIT 50`
    return { items: items.map(d => ({ id: d.id, label: d.label, updatedAt: d.updated_at.toISOString(), current: d.current })), configured: !!this.vapid }
  }
  async testPush(a: DemoIdentity, recipientUserId: string) {
    if (!this.vapid) throw new AppError('PUSH_NOT_CONFIGURED', 503)
    const devices = await this.db.$queryRaw<Device[]>`SELECT p.id,p.endpoint,p.p256dh_key,p.auth_secret,p.session_id FROM app_private.tech_demo_push_subscriptions p JOIN app_private.tech_demo_sessions s ON s.session_id=p.session_id WHERE p.auth_user_id=${recipientUserId}::uuid AND p.is_active AND s.revoked_at IS NULL ORDER BY p.id LIMIT 51`
    if (!devices.length) throw new AppError('NO_PUSH_DEVICES', 409)
    if (devices.length > 50) throw new AppError('DEMO_DEVICE_LIMIT', 409)
    const result = { targeted: devices.length, accepted: 0, gone: 0, failed: 0 }, tag = randomUUID()
    // Small demo: synchronous bounded fanout, no domain operation/outbox/worker.
    for (let i = 0; i < devices.length; i += 5) await Promise.all(devices.slice(i, i + 5).map(async d => {
      const active = await this.db.$queryRaw<Array<{ active: boolean }>>`SELECT p.is_active AND s.revoked_at IS NULL AS active FROM app_private.tech_demo_push_subscriptions p JOIN app_private.tech_demo_sessions s ON s.session_id=p.session_id WHERE p.id=${d.id}::uuid AND p.auth_user_id=${recipientUserId}::uuid`
      if (!active[0]?.active) { result.failed++; return }
      const sent = isAllowedPushEndpoint(d.endpoint) ? await this.sender(this.vapid!, { endpoint: d.endpoint, keys: { p256dh: d.p256dh_key, auth: d.auth_secret } }, { title: 'PWA test notification', body: 'A test notification sent from another device.', url: '/pwa/home', tag }) : { outcome: 'gone' as const }
      if (sent.outcome === 'sent') result.accepted++
      else if (sent.outcome === 'gone') {
        result.gone++
        await this.db.$executeRaw`UPDATE app_private.tech_demo_push_subscriptions SET is_active=false,updated_at=now() WHERE id=${d.id}::uuid AND session_id=${d.session_id}::uuid`
      } else result.failed++
    }))
    return result // Accepted by push provider does not prove OS displayed it.
  }
}
