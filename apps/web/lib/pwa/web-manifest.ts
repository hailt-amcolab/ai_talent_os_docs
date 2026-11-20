import type { MetadataRoute } from 'next'
import { APP } from '@/lib/config'

// id stays "/" after release. Changing it makes the browser treat the install as a different app.
// The linked copy uses /pwa/icons so the service worker can answer Chrome's cookie-less fetches.
export function webManifest(iconBase: '/icons' | '/pwa/icons' = '/icons'): MetadataRoute.Manifest {
  return {
    id: '/',
    name: APP.name,
    short_name: APP.shortName,
    description: APP.description,
    start_url: '/pwa/home',
    scope: '/pwa/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'en',
    background_color: APP.backgroundColor,
    theme_color: APP.themeColor,
    icons: [
      { src: `${iconBase}/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${iconBase}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${iconBase}/icon-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
