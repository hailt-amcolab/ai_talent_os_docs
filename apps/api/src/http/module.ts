import { OpenAPIHono } from '@hono/zod-openapi'

export function apiModule() {
  return new OpenAPIHono({ defaultHook: (result, c) => {
    if (!result.success) return c.json({ error: { code: 'INPUT_INVALID', requestId: c.get('requestId') } }, 422)
  } })
}
