// Nhận biết môi trường để chọn CÂU HƯỚNG DẪN cài đặt (đặc tả §4.3).
// Có hỗ trợ hay không thì kiểm tính năng (supportsPush), không dựa vào user agent.

export type InstallGuide =
  | 'installed'        // đã mở từ màn hình chính
  | 'in-app'           // trình duyệt trong Instagram, LINE, TikTok, Facebook: không cài được
  | 'ios-safari'       // hướng dẫn 3 bước Chia sẻ → ホーム画面に追加
  | 'ios-other'        // Chrome, Firefox, Edge trên iPhone: bảo mở bằng Safari
  | 'android'          // nút cài (beforeinstallprompt) hoặc menu ⋮
  | 'desktop'

export interface Env {
  ua: string
  standalone: boolean
  maxTouchPoints?: number // iPad iPadOS 13+ giả làm Mac
}

// ponytail: danh sách user agent của trình duyệt trong ứng dụng là hiểu biết hiện tại, phải kiểm trên máy thật (PW-04).
const IN_APP = /Instagram|FBAN|FBAV|FB_IAB|Line\/|musical_ly|BytedanceWebview|TikTok/i

export function iosVersion(ua: string): number | null {
  const m = ua.match(/OS (\d+)[_.](\d+)/)
  if (!/iPhone|iPad|iPod/.test(ua) && !m) return null
  return m ? Number(m[1]) + Number(m[2]) / 100 : null
}

export function isIOS(env: Env): boolean {
  return /iPhone|iPad|iPod/.test(env.ua) || (/Macintosh/.test(env.ua) && (env.maxTouchPoints ?? 0) > 1)
}

export function installGuide(env: Env): InstallGuide {
  if (env.standalone) return 'installed'
  if (IN_APP.test(env.ua)) return 'in-app'
  if (isIOS(env)) return /CriOS|FxiOS|EdgiOS|OPiOS/.test(env.ua) ? 'ios-other' : 'ios-safari'
  if (/Android/.test(env.ua)) return 'android'
  return 'desktop'
}

// iPhone chỉ có Web Push từ iOS 16.4 và khi đã cài lên màn hình chính.
export function pushNeedsInstall(env: Env): boolean {
  return isIOS(env) && !env.standalone
}

export function iosTooOldForPush(env: Env): boolean {
  if (!isIOS(env)) return false
  const v = iosVersion(env.ua)
  return v !== null && v < 16.04
}

// ---- chỉ chạy trên trình duyệt ----
export function currentEnv(): Env {
  return {
    ua: navigator.userAgent,
    standalone:
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true,
    maxTouchPoints: navigator.maxTouchPoints,
  }
}

export function supportsPush(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
}
