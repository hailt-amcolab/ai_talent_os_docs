import type { MetadataRoute } from 'next'
import { APP } from '@/lib/config'

// Đặc tả: agent_spec/pwa-platform-spec/HUONG_DAN_TICH_HOP_VI.md §2
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/', // không đổi sau khi phát hành
    name: APP.name,
    short_name: APP.shortName,
    description: APP.description,
    start_url: '/pwa/home', // B13
    scope: '/pwa/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'en',
    background_color: APP.backgroundColor,
    theme_color: APP.themeColor,
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
