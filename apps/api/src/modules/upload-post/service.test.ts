import { test } from 'node:test'
import assert from 'node:assert/strict'
import { UploadPostClient, UploadPostError } from '../../infra/upload-post/client.ts'
import { UploadPostDemo, profileName } from './service.ts'

type Call = { method: string; url: string; headers: Record<string, string>; body?: unknown }
function fake(responses: Array<[number, unknown]>) {
  const calls: Call[] = []
  const http = (async (url: URL, init: RequestInit) => {
    calls.push({ method: init.method!, url: url.toString(), headers: init.headers as Record<string, string>, body: init.body ? JSON.parse(init.body as string) : undefined })
    const [status, body] = responses.shift() ?? [500, {}]
    return new Response(JSON.stringify(body), { status })
  }) as unknown as typeof fetch
  const demo = new UploadPostDemo(new UploadPostClient({ apiBase: 'https://api.upload-post.com', settingsBase: 'https://app.upload-post.com', apiKey: 'test-key', timeoutMs: 1000 }, http))
  return { demo, calls }
}
const USER = '0f1e2d3c-4b5a-6978-8796-a5b4c3d2e1f0'

test('profile name is stable and uses only allowed characters', () => {
  assert.equal(profileName(USER), 'demo_t_0f1e2d3c4b5a69788796a5b4c3d2e1f0')
})

test('no profile yet: every network is not connected', async () => {
  const { demo, calls } = fake([[404, { success: false, message: 'Profile not found' }]])
  const r = await demo.accounts(USER)
  assert.equal(r.profile, false)
  assert.deepEqual(r.accounts.map(a => a.status), ['not_connected', 'not_connected', 'not_connected'])
  assert.equal(calls[0].headers.Authorization, 'Apikey test-key')
})

test('connected, expired and empty networks are read from the profile', async () => {
  const { demo } = fake([[200, { success: true, profile: { social_accounts: {
    youtube: { username: 'UC123', handle: '@momo', display_name: 'Momo ch' },
    instagram: { username: 'ig1', reauth_required: true },
    tiktok: '',
  } } }]])
  const r = await demo.accounts(USER)
  assert.deepEqual(r.accounts, [
    { platform: 'instagram', status: 'reauth_required', handle: undefined, displayName: undefined },
    { platform: 'tiktok', status: 'not_connected' },
    { platform: 'youtube', status: 'connected', handle: '@momo', displayName: 'Momo ch' },
  ])
})

test('connect creates the profile (409 = already there) then opens the hosted page for that network', async () => {
  const { demo, calls } = fake([[409, { success: false, message: 'Username already in use' }], [200, { success: true, access_url: 'https://app.upload-post.com/connect?token=abc', duration: '48h' }]])
  const r = await demo.connect(USER, 'youtube', 'https://localhost:3000/pwa/sns/return')
  assert.equal(r.authorizeUrl, 'https://app.upload-post.com/connect?token=abc')
  assert.equal(r.expiresInSeconds, 48 * 60 * 60)
  assert.equal(calls[0].url, 'https://api.upload-post.com/api/uploadposts/users')
  assert.equal(calls[1].url, 'https://api.upload-post.com/api/uploadposts/users/generate-jwt')
  assert.deepEqual(calls[1].body, {
    username: profileName(USER),
    redirect_url: 'https://localhost:3000/pwa/sns/return',
    platforms: ['youtube'],
    show_calendar: false,
    redirect_button_text: 'Back to AI Talent OS',
  })
})

test('plan limit on profile creation stops before starting OAuth', async () => {
  const { demo, calls } = fake([[403, { success: false, error_code: 'PROFILE_LIMIT_REACHED' }]])
  await assert.rejects(demo.connect(USER, 'youtube', 'https://localhost:3000/pwa/sns/return'), (e: unknown) => e instanceof Error && 'code' in e && e.code === 'UPLOAD_POST_PROFILE_LIMIT')
  assert.equal(calls.length, 1)
})

test('another plan refusal on profile creation keeps the generic plan error', async () => {
  const { demo } = fake([[403, { success: false, error_code: 'TEAM_SEAT_SUSPENDED' }]])
  await assert.rejects(demo.connect(USER, 'instagram', 'https://localhost:3000/pwa/sns/return'), (e: unknown) => e instanceof UploadPostError && e.code === 'UPLOAD_POST_PLAN')
})

test('a hosted page URL outside app.upload-post.com is rejected', async () => {
  const { demo } = fake([[201, { success: true }], [200, { access_url: 'https://accounts.google.com/o/oauth2/auth?x=1' }]])
  await assert.rejects(demo.connect(USER, 'youtube', 'https://localhost:3000/pwa/sns/return'), (e: unknown) => e instanceof UploadPostError && e.kind === 'unavailable')
})
