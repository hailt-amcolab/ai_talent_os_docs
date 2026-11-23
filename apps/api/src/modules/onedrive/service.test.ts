import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DriveClient, Graph, CHUNK, type TokenSource } from '../../infra/onedrive/graph.ts'
import { AppError } from '../../core/errors.ts'
import { OneDriveDemo } from './service.ts'

// In-memory Graph: just the endpoints the demo calls.
function fakeGraph() {
  type Node = { id: string; name: string; parent?: string; folder?: boolean; body?: string; v: number }
  const items = new Map<string, Node>([['root', { id: 'root', name: 'root', folder: true, v: 1 }], ['secret', { id: 'secret', name: 'secret.md', parent: 'root', body: 'x', v: 1 }]])
  const ranges: string[] = []; let cancelled = 0, n = 0, pending: { parent: string; name: string } | null = null
  const out = (i: Node) => Response.json({ id: i.id, name: i.name, eTag: `e${i.v}`, size: i.body?.length ?? 0, lastModifiedDateTime: '2026-11-18T00:00:00Z', ...(i.folder ? { folder: { childCount: 0 } } : { file: { mimeType: 'x' } }), parentReference: i.parent ? { id: i.parent } : {} })
  const add = (parent: string, name: string, folder: boolean, body?: string) => {
    if ([...items.values()].some(i => i.parent === parent && i.name === name)) return Response.json({ error: { code: 'nameAlreadyExists' } }, { status: 409 })
    const i = { id: 'i' + ++n, name, parent, folder, body, v: 1 }; items.set(i.id, i); return out(i)
  }
  const http = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = new URL(String(input)), method = init.method ?? 'GET', h = (init.headers ?? {}) as Record<string, string>
    if (url.host === 'download.test') { assert.equal(h.Authorization, undefined); return new Response(items.get(url.pathname.slice(1))!.body) }
    if (url.host === 'upload.test') {
      if (method === 'DELETE') { cancelled++; return new Response(null, { status: 204 }) }
      assert.equal(h.Authorization, undefined) // pre-authenticated URL: no bearer token
      ranges.push(h['Content-Range'])
      const [end, total] = h['Content-Range'].match(/-(\d+)\/(\d+)$/)!.slice(1).map(Number)
      return end === total - 1 ? add(pending!.parent, pending!.name, false, '') : new Response(null, { status: 202 })
    }
    const p = decodeURIComponent(url.pathname.replace('/v1.0/drives/d', ''))
    let m: RegExpMatchArray | null
    if ((m = p.match(/^\/items\/([^/:]+)\/children$/))) {
      const parent = m[1]
      return method === 'POST' ? add(parent, JSON.parse(String(init.body)).name, true) : Response.json({ value: await Promise.all([...items.values()].filter(i => i.parent === parent).map(i => out(i).json())) })
    }
    if ((m = p.match(/^\/items\/([^/:]+):\/(.+):\/content$/))) return add(m[1], m[2], false, String(init.body))
    if ((m = p.match(/^\/items\/([^/:]+):\/(.+):\/createUploadSession$/))) { pending = { parent: m[1], name: m[2] }; return Response.json({ uploadUrl: 'https://upload.test/s' }) }
    if ((m = p.match(/^\/items\/([^/:]+)\/content$/))) {
      const i = items.get(m[1])!
      if (method === 'GET') return new Response(null, { status: 302, headers: { Location: `https://download.test/${i.id}` } })
      if (h['If-Match'] !== `e${i.v}`) return Response.json({ error: { code: 'resourceModified' } }, { status: 412 })
      i.body = String(init.body); i.v++; return out(i)
    }
    if ((m = p.match(/^\/root:\/(.+)$/))) {
      let cur: Node | undefined = items.get('root')
      for (const name of m[1].split('/')) cur = [...items.values()].find(i => i.parent === cur?.id && i.name === name)
      return cur ? out(cur) : Response.json({ error: { code: 'itemNotFound' } }, { status: 404 })
    }
    if ((m = p.match(/^\/items\/([^/:]+)$/))) {
      const i = items.get(m[1])
      if (i && method === 'DELETE') { items.delete(i.id); return new Response(null, { status: 204 }) }
      return i ? out(i) : Response.json({ error: { code: 'itemNotFound' } }, { status: 404 })
    }
    throw new Error('unhandled ' + method + ' ' + p)
  }) as typeof fetch
  return { http, ranges, cancelled: () => cancelled }
}
async function* bytes(total: number, head: number[]) { const b = new Uint8Array(total); b.set(head); for (let i = 0; i < total; i += 1_000_000) yield b.subarray(i, i + 1_000_000) }
const MP4 = [0, 0, 0, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d] // ....ftypisom

test('OneDrive demo: tree, scope, eTag, chunked upload, MIME check', async () => {
  const g = fakeGraph(), source: TokenSource = { token: async () => 't', unauthorized: async () => new AppError('X', 401) }
  const demo = new OneDriveDemo(new DriveClient(new Graph(source, g.http), 'd'), 'AI_Talent_OS_test')
  const t = await demo.createTalent('花子')
  assert.equal(t.displayName, '花子')
  assert.deepEqual((await demo.children(t.id)).map(i => i.name).sort(), ['AI_Memo.md', 'Profile.md'])
  assert.equal((await demo.talents()).length, 1)

  // Outside Talents/ → 404, even with a valid drive item ID.
  await assert.rejects(demo.readText('secret'), { code: 'NOT_FOUND' })

  const f = await demo.createText(t.id, 'note.md', 'v1')
  const v2 = await demo.updateText(f.id, 'v2', f.eTag)
  assert.notEqual(v2.eTag, f.eTag)
  await assert.rejects(demo.updateText(f.id, 'stale', f.eTag), { code: 'VERSION_CONFLICT' })
  assert.equal((await demo.readText(f.id)).content, 'v2') // via 302 → pre-authenticated URL without bearer
  await assert.rejects(demo.createText(t.id, 'x.exe', ''), { code: 'FILE_TYPE_NOT_ALLOWED' })
  await assert.rejects(demo.createText(t.id, '../a.md', ''), { code: 'NAME_INVALID' })

  const media = t, size = CHUNK * 2 + 123 // the demo uploads into any folder under Talents/; no Media/ is created any more
  await demo.uploadMedia(media.id, 'clip.mp4', 'video/mp4', size, bytes(size, MP4))
  assert.deepEqual(g.ranges, [`bytes 0-${CHUNK - 1}/${size}`, `bytes ${CHUNK}-${2 * CHUNK - 1}/${size}`, `bytes ${2 * CHUNK}-${size - 1}/${size}`])

  // A .jpg that is not a JPEG, or a body shorter than declared: no fragment sent, session cancelled.
  await assert.rejects(demo.uploadMedia(media.id, 'fake.jpg', 'image/jpeg', 100, bytes(100, MP4)), { code: 'MEDIA_TYPE_MISMATCH' })
  await assert.rejects(demo.uploadMedia(media.id, 'short.mp4', 'video/mp4', 200, bytes(100, MP4)), { code: 'MEDIA_SIZE_MISMATCH' })
  assert.equal(g.cancelled(), 2)
  assert.equal(g.ranges.length, 3)
})

test('Graph: 401 → one forced token refresh; Retry-After honoured; SPO licence error is named', async () => {
  const seen: string[] = []; let refreshes = 0, calls = 0
  const source: TokenSource = { token: async stale => { if (stale) refreshes++; return stale ? 'fresh' : 'old' }, unauthorized: async () => new AppError('ONEDRIVE_RECONNECT_REQUIRED', 409) }
  const http = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const auth = (init.headers as Record<string, string>).Authorization, path = new URL(String(input)).pathname
    seen.push(`${path} ${auth}`); calls++
    if (path.endsWith('/expired')) return auth === 'Bearer fresh' ? Response.json({ ok: 1 }) : new Response(null, { status: 401 })
    if (path.endsWith('/revoked')) return new Response(null, { status: 401 })
    if (path.endsWith('/busy')) return calls % 2 ? new Response(null, { status: 429, headers: { 'Retry-After': '0' } }) : Response.json({ ok: 1 })
    if (path.endsWith('/slow')) return new Response(null, { status: 429, headers: { 'Retry-After': '120' } })
    return Response.json({ error: { code: 'BadRequest', message: 'Tenant does not have a SPO license.' } }, { status: 400 })
  }) as typeof fetch
  const g = new Graph(source, http)
  assert.deepEqual(await g.json('t', 'https://graph.test/expired'), { ok: 1 })
  assert.equal(refreshes, 1)
  await assert.rejects(g.request('t', 'https://graph.test/revoked'), { code: 'ONEDRIVE_RECONNECT_REQUIRED' })
  calls = 0; assert.deepEqual(await g.json('t', 'https://graph.test/busy'), { ok: 1 })
  await assert.rejects(g.request('t', 'https://graph.test/slow'), { code: 'ONEDRIVE_THROTTLED' }) // too long to wait inside a request
  await assert.rejects(g.request('t', 'https://graph.test/spo'), { code: 'ONEDRIVE_DRIVE_UNSUPPORTED' })
})

test('layout upgrade (ai:talent --link-onedrive): old Japanese names are reported, never duplicated; re-runnable', async () => {
  const g = fakeGraph(), source: TokenSource = { token: async () => 't', unauthorized: async () => new AppError('X', 401) }
  const drive = new DriveClient(new Graph(source, g.http), 'd')
  const demo = new OneDriveDemo(drive, 'AI_Talent_OS_dev')
  // Old root only → stop and ask for the rename (nothing is created).
  const oldRoot = await drive.ensureFolder('root', 'AI育成OS_dev')
  assert.deepEqual(await demo.legacyLayout(), ['AI育成OS_dev → AI_Talent_OS_dev (or set ONEDRIVE_ROOT_FOLDER=AI育成OS_dev)'])
  assert.equal(await drive.byPath('AI_Talent_OS_dev'), null)
  // New root but old タレント/ and 共通/ inside.
  const root = await drive.ensureFolder('root', 'AI_Talent_OS_dev')
  await drive.ensureFolder(root.id, 'タレント'); await drive.ensureFolder(root.id, '共通')
  assert.deepEqual((await demo.legacyLayout()).slice(1), ['AI_Talent_OS_dev/タレント → Talents', 'AI_Talent_OS_dev/共通 → Common'])
  assert.match((await demo.legacyLayout())[0], /both AI育成OS_dev\/ and AI_Talent_OS_dev\/ exist/)
  await drive.remove(oldRoot.id, oldRoot.eTag)
  assert.deepEqual(await demo.legacyLayout(), ['AI_Talent_OS_dev/タレント → Talents', 'AI_Talent_OS_dev/共通 → Common'])
  // A talent folder renamed only partly: プロフィール.md kept its old name.
  const talents = await drive.ensureFolder(root.id, 'Talents')
  const t = await drive.createFolder(talents.id, '0f1e2d3c-4b5a-6978-8796-a5b4c3d2e1f0_花子')
  await drive.createFile(t.id, 'プロフィール.md', '## 方向性\n\nカフェ', 'text/markdown')
  await drive.ensureFolder(t.id, '素材') // a folder AI Core does not use: left alone, not renamed or reported
  const first = await demo.ensureStructure(t.id)
  assert.deepEqual(first.created, ['AI_Memo.md'])
  assert.deepEqual(first.rename, [`${t.name}/プロフィール.md → Profile.md`])
  const names = (await demo.children(t.id)).map(i => i.name)
  assert.ok(!names.includes('Profile.md'), 'old-named items are not duplicated')
  assert.ok(names.includes('素材'), 'unused folders are kept')
  assert.deepEqual((await demo.ensureStructure(t.id)).created, [], 're-run creates nothing new')
  assert.match((await new OneDriveDemo(drive, 'AI育成OS_dev').legacyLayout())[0], /still the old name/)
  // Common/: three agency files, old name reported.
  const common = await drive.ensureFolder(root.id, 'Common')
  await drive.createFile(common.id, 'ノウハウ.md', 'x', 'text/markdown')
  const c = await demo.ensureCommon()
  assert.deepEqual(c, { created: ['Common/Algorithm.md', 'Common/AI_Instructions.md'], rename: ['Common/ノウハウ.md → Knowhow.md'] })
})
