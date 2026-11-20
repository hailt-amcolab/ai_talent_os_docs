import { webManifest } from '@/lib/pwa/web-manifest'

export function GET() {
  return Response.json(webManifest('/pwa/icons'), {
    headers: { 'Content-Type': 'application/manifest+json', 'Cache-Control': 'no-store' },
  })
}
