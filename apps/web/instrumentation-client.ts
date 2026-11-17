// Chạy trên trình duyệt trước khi ứng dụng tương tác được (Next.js instrumentation-client).
// 1) Đăng ký service worker. 2) Giữ sự kiện beforeinstallprompt của Android, vì nó có thể bắn trước khi React gắn xong.
import { rememberInstallPrompt } from '@/lib/pwa/install-prompt'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).catch(() => {
    // không chặn ứng dụng nếu đăng ký lỗi; ứng dụng vẫn chạy như web thường
  })
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  rememberInstallPrompt(e as BeforeInstallPromptEvent)
})
