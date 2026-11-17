import { t } from '@/lib/messages'

// Trang chung khi mất mạng. Service worker lưu sẵn trang này; KHÔNG được có dữ liệu của tài năng.
export default function OfflinePage() {
  return (
    <main>
      <h1>{t.offline.title}</h1>
      <p>{t.offline.body}</p>
    </main>
  )
}
