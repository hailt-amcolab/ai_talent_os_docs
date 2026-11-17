import { InstallGuide } from '@/components/pwa/InstallGuide'
import { PushToggle } from '@/components/pwa/PushToggle'
import { t } from '@/lib/messages'

// Khung màn ホーム (T-07). Hiện mới có hai bước hướng dẫn lần đầu thuộc nền tảng PWA (6-2 bước 1 và 2).
export default function HomePage() {
  return (
    <main>
      <h1>{t.home.title}</h1>
      <section className="card">
        <h2>1. {t.home.installHeading}</h2>
        <InstallGuide />
      </section>
      <section className="card">
        <h2>2. {t.home.pushHeading}</h2>
        <PushToggle />
      </section>
    </main>
  )
}
