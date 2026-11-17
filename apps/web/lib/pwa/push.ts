import { VAPID_PUBLIC_KEY } from '../config.ts'

// Xin quyền và đăng ký thông báo đẩy trên trình duyệt (đặc tả PWA §6.2, §6.3).
// Tệp này chỉ làm việc với trình duyệt. Gửi đăng ký lên BE để lưu là việc của tính năng thông báo (6-1),
// gọi qua lib/api: POST /api/v1/me/push-subscriptions, và chỉ báo "đã bật" khi BE lưu xong.

function urlBase64ToUint8Array(base64: string) {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(raw, (c) => c.charCodeAt(0))
}

function sameKey(current: ArrayBuffer | null | undefined, wanted: Uint8Array) {
  if (!current) return false
  const bytes = new Uint8Array(current)
  return bytes.length === wanted.length && bytes.every((b, i) => b === wanted[i])
}

export type SubscribeResult =
  | { status: 'subscribed'; subscription: PushSubscription }
  | { status: 'denied' | 'unsupported' }

export async function currentSubscription(): Promise<PushSubscription | null> {
  if (!('serviceWorker' in navigator) || !('Notification' in window) || Notification.permission !== 'granted') return null
  const reg = await navigator.serviceWorker.getRegistration('/pwa/')
  return (await reg?.pushManager.getSubscription()) ?? null
}

// Phải gọi TRỰC TIẾP trong onClick: iPhone chỉ cho xin quyền khi người dùng vừa thao tác.
export async function subscribePush(): Promise<SubscribeResult> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !VAPID_PUBLIC_KEY) return { status: 'unsupported' }
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return { status: 'denied' }
  const reg = await navigator.serviceWorker.ready
  const wanted = urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  let sub = await reg.pushManager.getSubscription()
  // Đăng ký cũ làm bằng khóa VAPID khác (đổi khóa) thì không gửi được nữa: hủy và đăng ký lại.
  if (sub && !sameKey(sub.options.applicationServerKey, wanted)) {
    await sub.unsubscribe()
    sub = null
  }
  sub ??= await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: wanted })
  return { status: 'subscribed', subscription: sub }
}

// Đăng xuất hoặc tắt. Khi đã lưu ở BE: báo BE xóa TRƯỚC, rồi mới gọi hàm này.
export async function unsubscribePush(): Promise<void> {
  const sub = await currentSubscription()
  if (sub && !(await sub.unsubscribe())) throw new Error('UNSUBSCRIBE_FAILED')
}
