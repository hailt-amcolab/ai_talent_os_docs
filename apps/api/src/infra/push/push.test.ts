import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isAllowedPushEndpoint } from './endpoint.ts'
import { classifyStatus } from './status.ts'

test('chỉ cho phép máy chủ đẩy thật', () => {
  assert.equal(isAllowedPushEndpoint('https://web.push.apple.com/QGuQyavXutnMH...'), true)
  assert.equal(isAllowedPushEndpoint('https://fcm.googleapis.com/fcm/send/abc'), true)
  assert.equal(isAllowedPushEndpoint('https://updates.push.services.mozilla.com/wpush/v2/abc'), true)
  assert.equal(isAllowedPushEndpoint('https://wns2-par02p.notify.windows.com/w/?token=abc'), true)
  assert.equal(isAllowedPushEndpoint('http://fcm.googleapis.com/fcm/send/abc'), false) // không phải https
  assert.equal(isAllowedPushEndpoint('https://fcm.googleapis.com:8443/x'), false) // cổng lạ
  assert.equal(isAllowedPushEndpoint('https://evil.com/fcm.googleapis.com'), false)
  assert.equal(isAllowedPushEndpoint('https://fcm.googleapis.com.evil.com/x'), false)
  assert.equal(isAllowedPushEndpoint('https://169.254.169.254/latest'), false)
  assert.equal(isAllowedPushEndpoint('không phải url'), false)
})

test('phân loại mã trả về của máy chủ đẩy', () => {
  assert.equal(classifyStatus(201), 'sent')
  assert.equal(classifyStatus(410), 'gone')
  assert.equal(classifyStatus(404), 'gone')
  assert.equal(classifyStatus(413), 'payload-too-large')
  assert.equal(classifyStatus(429), 'retry')
  assert.equal(classifyStatus(503), 'retry')
  assert.equal(classifyStatus(403), 'config-error')
})
