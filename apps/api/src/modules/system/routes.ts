import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import type { AppDeps } from '../../container.ts'
import { isDatabaseReachable } from '../../infra/database/client.ts'

// Module mẫu. Mỗi module: routes.ts (khai báo API bằng createRoute + zod, chỉ kiểm đầu vào và gọi service),
// service.ts (nghiệp vụ, nhận phụ thuộc qua constructor), schemas.ts nếu dùng chung schema. Module này đủ nhỏ nên không cần service.
const Health = z.object({ ok: z.boolean(), database: z.enum(['up', 'down']) }).openapi('Health')

const health = createRoute({
  method: 'get',
  path: '/health',
  tags: ['system'],
  summary: 'Kiểm tiến trình và kết nối DB (Docker healthcheck dùng)',
  responses: {
    200: { description: 'Sẵn sàng', content: { 'application/json': { schema: Health } } },
    503: { description: 'Không kết nối được DB', content: { 'application/json': { schema: Health } } },
  },
})

export function systemModule({ db }: Pick<AppDeps, 'db'>) {
  const app = new OpenAPIHono()
  app.openapi(health, async (c) => {
    const up = await isDatabaseReachable(db)
    return up ? c.json({ ok: true, database: 'up' as const }, 200) : c.json({ ok: false, database: 'down' as const }, 503)
  })
  return app
}
