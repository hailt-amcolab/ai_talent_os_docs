import { OpenAPIHono } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { bodyLimit } from 'hono/body-limit'
import { requestId } from 'hono/request-id'
import type { AppDeps } from '../container.ts'
import { requireOrigin } from './auth.ts'
import { AppError } from '../core/errors.ts'
import { systemModule } from '../modules/system/routes.ts'
import { authModule } from '../modules/auth/routes.ts'
import { pwaModule } from '../modules/pwa/routes.ts'

// Dựng ứng dụng HTTP từ phụ thuộc đã tạo sẵn. Tách khỏi server.ts để kiểm thử bằng app.request() không cần mở cổng.
// Thêm module mới: tạo src/modules/<tên>/ rồi gắn ở mục "Modules" bên dưới.
export function createApp(deps: AppDeps) {
  const app = new OpenAPIHono({
    // Mọi lỗi kiểm đầu vào của createRoute: 422 cùng một dạng
    defaultHook: (result, c) => {
      if (!result.success) {
        const issues = result.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }))
        return c.json({ error: { code: 'INPUT_INVALID', issues, requestId: c.get('requestId') } }, 422)
      }
    },
  })

  app.use('*', requestId())
  app.use('*', secureHeaders())
  app.use('*', cors({
    origin: deps.env.CORS_ORIGINS,
    allowMethods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key'],
    exposeHeaders: ['X-Request-Id'],
    maxAge: 600,
  }))
  app.use('/api/*', async (c, next) => { c.header('Cache-Control', 'no-store'); requireOrigin(c, deps.env.CORS_ORIGINS); await next() })
  app.use('/api/*', bodyLimit({ maxSize: 64 * 1024 }))

  // Modules
  app.route('/', systemModule(deps))
  if (deps.env.ENABLE_AUTH_DEMO && deps.auth && deps.pwa) {
    app.route('/', authModule(deps))
    app.route('/', pwaModule(deps))
  }

  // Tài liệu API để FE sinh client. Không bật ở production để không lộ danh sách API.
  if (deps.env.NODE_ENV !== 'production') {
    app.doc31('/openapi.json', { openapi: '3.1.0', info: { title: 'AI育成OS API', version: '0.1.0' } })
  }

  app.notFound((c) => c.json({ error: { code: 'NOT_FOUND', requestId: c.get('requestId') } }, 404))

  app.onError((err, c) => {
    const requestId = c.get('requestId')
    if (err instanceof AppError) return c.json({ error: { code: err.code, requestId } }, err.status)
    if (err instanceof HTTPException) return c.json({ error: { code: 'HTTP_' + err.status, requestId } }, err.status)
    // Chỉ ghi code cố định, không ghi Error.message/body (có thể chứa mật khẩu, token).
    console.error(JSON.stringify({ level: 'error', requestId, code: 'UNEXPECTED_ERROR' }))
    return c.json({ error: { code: 'INTERNAL', requestId } }, 500)
  })

  return app
}

export type App = ReturnType<typeof createApp>
