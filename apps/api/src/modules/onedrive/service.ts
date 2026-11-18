import { randomUUID, createHash } from 'node:crypto'
import { AppError, notFound } from '../../core/errors.ts'
import type { DriveClient, DriveItem } from '../../infra/onedrive/graph.ts'

// OneDrive technology demo (agent_spec/onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md §2, §7).
// Tree: <root>/タレント/<uuid>_<表示名>/{プロフィール.md, AIメモ.md, 実績/, 素材/, 添付/}
// ponytail: no DB binding yet; Graph item IDs are the only keys and the drive is the registry.
// Real feature: store drive_id+item_id per talent (talents.onedrive_folder_id) and run creation in the worker.
const BAD = /["*:<>?/\\|#%\u0000-\u001f]/
export function safeName(value: string) {
  const name = value.normalize('NFC').trim()
  if (!name || name.length > 120 || BAD.test(name) || /^[.~]|[.]$/.test(name)) throw new AppError('NAME_INVALID', 422)
  return name
}
const extOf = (name: string) => name.includes('.') ? name.slice(name.lastIndexOf('.')).toLowerCase() : ''
const TEXT: Record<string, string> = { '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json' }
const MEDIA: Record<string, string[]> = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/heic': ['.heic'], 'video/mp4': ['.mp4'], 'video/quicktime': ['.mov'] }
export const MEDIA_MAX = 300 * 1024 * 1024 // ponytail: demo cap; real limit waits on Q13 / S05-01
const TEXT_MAX = 1024 * 1024
const PROFILE = ['プロフィール', '方向性', '趣味・特技', '将来の目標', 'チャレンジ', '日付', '個別の指示'].map(h => `## ${h}\n\n`).join('')
const PREFIX = 37 // "<uuid>_"

// Magic bytes, so a renamed .exe never lands in 素材/ as "photo.jpg".
export function sniff(type: string, head: Uint8Array) {
  const hex = Buffer.from(head.subarray(0, 8)).toString('hex'), ftyp = Buffer.from(head.subarray(4, 8)).toString('latin1') === 'ftyp'
  const ok = type === 'image/jpeg' ? hex.startsWith('ffd8ff') : type === 'image/png' ? hex === '89504e470d0a1a0a' : ftyp
  if (!ok) throw new AppError('MEDIA_TYPE_MISMATCH', 422)
}
export interface Item { id: string; name: string; eTag: string; size: number; modifiedAt: string; kind: 'folder' | 'file'; mimeType?: string }
const dto = (i: DriveItem): Item => ({ id: i.id, name: i.name, eTag: i.eTag, size: i.size ?? 0, modifiedAt: i.lastModifiedDateTime, kind: i.folder ? 'folder' : 'file', mimeType: i.file?.mimeType })
const talentDto = (i: DriveItem) => ({ ...dto(i), displayName: i.name.slice(PREFIX) })

type Homes = Map<string, { item: Promise<DriveItem>; at: number }>
const HOME_TTL_MS = 60_000

// One instance per request; `homes` (shared) caches each drive's タレント/ folder for a minute.
export class OneDriveDemo {
  private readonly drive: DriveClient
  private readonly root: string
  private readonly homes: Homes
  constructor(drive: DriveClient, root: string, homes: Homes = new Map()) { this.drive = drive; this.root = root; this.homes = homes }

  private talents$() {
    const key = this.drive.driveId, hit = this.homes.get(key)
    if (hit && Date.now() - hit.at < HOME_TTL_MS) return hit.item
    const path = `${this.root}/タレント`
    const item = this.drive.byPath(path).then(f => f ?? this.drive.ensureFolder('root', this.root).then(r => this.drive.ensureFolder(r.id, 'タレント')))
    item.catch(() => this.homes.delete(key))
    this.homes.set(key, { item, at: Date.now() })
    return item
  }
  // Trust boundary: the caller sends any item ID; only items under タレント/ are reachable.
  // ponytail: walks parents (≤ 4 calls at this depth); real feature checks drive_items in the DB instead.
  private async scoped(id: string) {
    const home = await this.talents$(), item = await this.drive.item(id)
    let parent = item.parentReference?.id
    for (let depth = 0; parent && parent !== home.id && depth < 8; depth++) parent = (await this.drive.item(parent)).parentReference?.id
    if (parent !== home.id) throw notFound()
    return { item, home }
  }
  private async folder(id: string) { const { item } = await this.scoped(id); if (!item.folder) throw new AppError('NOT_A_FOLDER', 422); return item }

  async talents() { return (await this.drive.children((await this.talents$()).id)).filter(i => i.folder && i.name.length > PREFIX).map(talentDto) }
  // Creation is re-runnable: subfolders use ensureFolder; a missing file is recreated on the next call.
  async createTalent(displayName: string) {
    const home = await this.talents$(), talent = await this.drive.createFolder(home.id, `${randomUUID()}_${safeName(displayName)}`)
    for (const name of ['実績', '素材', '添付']) await this.drive.ensureFolder(talent.id, name)
    await this.drive.createFile(talent.id, 'プロフィール.md', PROFILE, TEXT['.md'])
    await this.drive.createFile(talent.id, 'AIメモ.md', '', TEXT['.md'])
    return talentDto(await this.drive.item(talent.id))
  }
  async children(id: string) { return (await this.drive.children((await this.folder(id)).id)).map(dto) }
  // Talent folders keep their "<uuid>_" prefix: renaming the display name never changes identity.
  async rename(id: string, name: string, eTag: string) {
    const { item, home } = await this.scoped(id)
    const next = item.parentReference?.id === home.id ? item.name.slice(0, PREFIX) + safeName(name) : this.checkedName(safeName(name), item)
    return dto(await this.drive.rename(id, next, eTag))
  }
  private checkedName(name: string, item: DriveItem) {
    if (item.file && extOf(name) !== extOf(item.name)) throw new AppError('EXTENSION_CHANGE_NOT_ALLOWED', 422)
    return name
  }
  async remove(id: string, eTag: string) { await this.scoped(id); await this.drive.remove(id, eTag) }

  // Streams the file through the BE (no pre-authenticated Microsoft URL reaches the browser).
  async download(id: string) {
    const { item } = await this.scoped(id)
    if (!item.file) throw new AppError('NOT_A_FILE', 422)
    return { name: item.name, size: item.size, body: (await this.drive.download(id)).body }
  }

  private textType(name: string) { const type = TEXT[extOf(name)]; if (!type) throw new AppError('FILE_TYPE_NOT_ALLOWED', 422); return type }
  async readText(id: string) {
    const { item } = await this.scoped(id)
    this.textType(item.name)
    if (!item.file || item.size > TEXT_MAX) throw new AppError('FILE_TOO_LARGE', 422)
    return { ...dto(item), content: await this.drive.text(id) }
  }
  async createText(folderId: string, name: string, content: string) {
    const folder = await this.folder(folderId), file = safeName(name)
    return dto(await this.drive.createFile(folder.id, file, content, this.textType(file)))
  }
  async updateText(id: string, content: string, eTag: string) {
    const { item } = await this.scoped(id)
    return dto(await this.drive.replaceFile(id, content, this.textType(item.name), eTag))
  }

  async uploadMedia(folderId: string, rawName: string, type: string, size: number, body: AsyncIterable<Uint8Array>) {
    const name = safeName(rawName)
    if (!MEDIA[type]?.includes(extOf(name))) throw new AppError('MEDIA_TYPE_NOT_ALLOWED', 422)
    if (!Number.isSafeInteger(size) || size <= 0 || size > MEDIA_MAX) throw new AppError('MEDIA_TOO_LARGE', 413)
    const folder = await this.folder(folderId), hash = createHash('sha256')
    async function* checked() {
      let head = new Uint8Array(0)
      for await (const piece of body) {
        if (head.length < 12) { head = Buffer.concat([head, piece]); if (head.length >= 12) sniff(type, head) }
        hash.update(piece)
        yield piece
      }
      if (head.length < 12) sniff(type, head)
    }
    const item = await this.drive.upload(folder.id, name, size, checked())
    return { ...dto(item), sha256: hash.digest('hex') }
  }
}
