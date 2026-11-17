// Local demo gateway: a single HTTPS tunnel reaches both FE and BE.
// This is a CLI utility, never a Next API route or production reverse proxy.
import { createServer, request } from 'node:http'
const server = createServer((incoming, outgoing) => {
  const backend = incoming.url?.startsWith('/api/')
  const upstream = request({ hostname: '127.0.0.1', port: backend ? 8080 : 3000, path: incoming.url, method: incoming.method, headers: { ...incoming.headers, host: backend ? 'localhost:8080' : 'localhost:3000' } }, response => {
    outgoing.writeHead(response.statusCode ?? 502, response.headers)
    response.pipe(outgoing)
  })
  upstream.on('error', () => { if (!outgoing.headersSent) outgoing.writeHead(502); outgoing.end('Demo service unavailable') })
  incoming.on('aborted', () => upstream.destroy())
  outgoing.on('close', () => { if (!outgoing.writableFinished) upstream.destroy() })
  incoming.pipe(upstream)
})
server.listen(3090, '127.0.0.1', () => console.log('Demo gateway: http://localhost:3090'))
