import webpush from 'web-push'
import { classifyStatus, type SendOutcome } from './status.ts'

// Gửi một thông báo đẩy (đặc tả PWA §6.5). Worker sau này dùng lại hàm này.
export interface PushSubscriptionJSON {
  endpoint: string
  keys: { p256dh: string; auth: string }
}

export interface PushPayload {
  title: string
  body: string
  url?: string // đường dẫn trong ứng dụng, ví dụ /drafts/123
  tag?: string // cùng tag thì thay thông báo cũ
  badgeCount?: number // số trên biểu tượng ứng dụng
}

export interface VapidConfig {
  subject: string
  publicKey: string
  privateKey: string
}

export interface SendResult {
  outcome: SendOutcome
  status?: number
}

export async function sendPush(vapid: VapidConfig, sub: PushSubscriptionJSON, payload: PushPayload): Promise<SendResult> {
  try {
    const res = await webpush.sendNotification(sub, JSON.stringify(payload), {
      vapidDetails: vapid,
      TTL: 60 * 60 * 6, // máy đang tắt: giữ tối đa 6 giờ
      urgency: 'normal',
      timeout: 15_000, // shorter than the worker lease; a stalled provider must not hold a job forever
      topic: payload.tag?.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 32) || undefined, // Topic tối đa 32 ký tự base64url
    })
    return { outcome: classifyStatus(res.statusCode), status: res.statusCode }
  } catch (err) {
    if (err instanceof webpush.WebPushError) return { outcome: classifyStatus(err.statusCode), status: err.statusCode }
    return { outcome: 'retry' } // lỗi mạng
  }
}
