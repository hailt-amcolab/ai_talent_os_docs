import { serve } from '@hono/node-server'
import { loadEnv } from './config/env.ts'
import { createContainer } from './container.ts'
import { createApp } from './http/app.ts'

const env = loadEnv()
const { deps, dispose } = await createContainer(env)
const app = createApp(deps)

const server = serve({ fetch: app.fetch, port: env.PORT, hostname: '0.0.0.0' }, (info) => {
  console.log(JSON.stringify({ level: 'info', message: `api listening on :${info.port}`, env: env.NODE_ENV }))
})

// PM2 và Docker gửi SIGINT/SIGTERM khi dừng: đóng server cho xong request đang chạy, rồi đóng DB.
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    server.close(() => void dispose().finally(() => process.exit(0)))
    setTimeout(() => process.exit(1), 10_000).unref() // khớp kill_timeout trong ecosystem.config.cjs
  })
}
