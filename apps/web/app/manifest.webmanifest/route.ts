import { webManifest } from '@/lib/pwa/web-manifest'

// Upstream copy fetched by the service worker. The page links /pwa/manifest, inside the worker scope.
export function GET() {
  return Response.json(webManifest('/icons'), {
    headers: { 'Content-Type': 'application/manifest+json', 'Cache-Control': 'no-store' },
  })
}
