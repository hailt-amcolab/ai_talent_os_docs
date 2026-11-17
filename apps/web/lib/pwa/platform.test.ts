// Chạy: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { installGuide, iosTooOldForPush, pushNeedsInstall, iosVersion } from './platform.ts'

const IPHONE_SAFARI = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
const IPHONE_CHROME = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0 Mobile/15E148 Safari/604.1'
const IPHONE_IG = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 330.0.0.0'
const IPHONE_LINE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari Line/14.9.0'
const IPHONE_OLD = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Mobile/15E148 Safari/604.1'
const IPAD_AS_MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15'
const ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36'
const ANDROID_TIKTOK = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36 musical_ly_2023'

test('chọn đúng hướng dẫn cài', () => {
  assert.equal(installGuide({ ua: IPHONE_SAFARI, standalone: false }), 'ios-safari')
  assert.equal(installGuide({ ua: IPHONE_SAFARI, standalone: true }), 'installed')
  assert.equal(installGuide({ ua: IPHONE_CHROME, standalone: false }), 'ios-other')
  assert.equal(installGuide({ ua: IPHONE_IG, standalone: false }), 'in-app')
  assert.equal(installGuide({ ua: IPHONE_LINE, standalone: false }), 'in-app')
  assert.equal(installGuide({ ua: ANDROID, standalone: false }), 'android')
  assert.equal(installGuide({ ua: ANDROID_TIKTOK, standalone: false }), 'in-app')
  assert.equal(installGuide({ ua: IPAD_AS_MAC, standalone: false, maxTouchPoints: 5 }), 'ios-safari')
  assert.equal(installGuide({ ua: IPAD_AS_MAC, standalone: false, maxTouchPoints: 0 }), 'desktop')
})

test('điều kiện thông báo đẩy trên iPhone', () => {
  assert.equal(iosVersion(IPHONE_SAFARI), 17.05)
  assert.equal(pushNeedsInstall({ ua: IPHONE_SAFARI, standalone: false }), true)
  assert.equal(pushNeedsInstall({ ua: IPHONE_SAFARI, standalone: true }), false)
  assert.equal(pushNeedsInstall({ ua: ANDROID, standalone: false }), false)
  assert.equal(iosTooOldForPush({ ua: IPHONE_OLD, standalone: true }), true)
  assert.equal(iosTooOldForPush({ ua: IPHONE_SAFARI, standalone: true }), false)
})
