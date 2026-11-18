import type { Metadata, Viewport } from 'next'
import { APP } from '@/lib/config'
import './globals.css'

export const metadata: Metadata = {
  title: APP.name,
  description: APP.description,
  // iPhone: tên dưới biểu tượng và thanh trạng thái khi mở từ màn hình chính. Biểu tượng lấy từ app/apple-icon.png.
  appleWebApp: { capable: true, title: APP.shortName, statusBarStyle: 'default' },
}

export const viewport: Viewport = {
  themeColor: APP.themeColor,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
