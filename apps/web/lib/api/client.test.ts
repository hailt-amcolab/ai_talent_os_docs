import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toApiError } from './client.ts'

test('đọc lỗi theo dạng chung của BE', () => {
  const e = toApiError(404, { error: { code: 'DEVICE_NOT_FOUND', requestId: 'r1' } })
  assert.equal(e.status, 404)
  assert.equal(e.code, 'DEVICE_NOT_FOUND')
  assert.equal(e.requestId, 'r1')
})

test('thân lỗi lạ hoặc rỗng vẫn có code', () => {
  assert.equal(toApiError(502, null).code, 'HTTP_502')
  assert.equal(toApiError(500, { error: { code: 42 } }).code, 'HTTP_500')
  assert.equal(toApiError(500, '<html>').code, 'HTTP_500')
})
