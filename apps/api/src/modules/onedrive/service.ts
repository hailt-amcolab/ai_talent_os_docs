import { randomUUID, createHash } from 'node:crypto'
import { AppError, notFound } from '../../core/errors.ts'
import type { DriveClient, DriveItem } from '../../infra/onedrive/graph.ts'
import { AGENCY_FILES, ONEDRIVE_FOLDERS as F, TALENT_FILES, type ContextFile, type TalentFiles } from '../ai-coach/context.ts'

// OneDrive technology demo (agent_spec/onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md §2, §7).
// Tree: <root>/Talents/<uuid>_<display name>/{Profile.md, AI_Memo.md}; <root>/Common/{Knowhow.md, Algorithm.md, AI_Instructions.md}
// (names: ai-coach/context.ts). Only the AI documents live here (storage doc §3); other folders users made are left alone.
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

// Magic bytes, so a renamed .exe never lands in OneDrive as "photo.jpg".
export function sniff(type: string, head: Uint8Array) {
  const hex = Buffer.from(head.subarray(0, 8)).toString('hex'), ftyp = Buffer.from(head.subarray(4, 8)).toString('latin1') === 'ftyp'
  const ok = type === 'image/jpeg' ? hex.startsWith('ffd8ff') : type === 'image/png' ? hex === '89504e470d0a1a0a' : ftyp
  if (!ok) throw new AppError('MEDIA_TYPE_MISMATCH', 422)
}
export interface Item { id: string; name: string; eTag: string; size: number; modifiedAt: string; kind: 'folder' | 'file'; mimeType?: string }
const dto = (i: DriveItem): Item => ({ id: i.id, name: i.name, eTag: i.eTag, size: i.size ?? 0, modifiedAt: i.lastModifiedDateTime, kind: i.folder ? 'folder' : 'file', mimeType: i.file?.mimeType })
const talentDto = (i: DriveItem) => ({ ...dto(i), displayName: i.name.slice(PREFIX) })

type Homes = Map<string, { item: Promise<DriveItem>; at: number }>
// ponytail: per-process cache of the Common/ files (one worker); edits there show up within COMMON_TTL_MS.
const COMMON_CACHE = new Map<string, { at: number; files: Promise<ContextFile[]> }>()
const COMMON_TTL_MS = 60_000
const HOME_TTL_MS = 60_000

// One instance per request; `homes` (shared) caches each drive's Talents/ folder for a minute.
export class OneDriveDemo {
  private readonly drive: DriveClient
  private readonly root: string
  private readonly homes: Homes
  constructor(drive: DriveClient, root: string, homes: Homes = new Map()) { this.drive = drive; this.root = root; this.homes = homes }

  private talents$() {
    const key = this.drive.driveId, hit = this.homes.get(key)
    if (hit && Date.now() - hit.at < HOME_TTL_MS) return hit.item
    const path = `${this.root}/${F.talents}`
    const item = this.drive.byPath(path).then(f => f ?? this.drive.ensureFolder('root', this.root).then(r => this.drive.ensureFolder(r.id, F.talents)))
    item.catch(() => this.homes.delete(key))
    this.homes.set(key, { item, at: Date.now() })
    return item
  }
  // Trust boundary: the caller sends any item ID; only items under Talents/ are reachable.
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
    await this.ensureStructure(talent.id)
    return talentDto(await this.drive.item(talent.id))
  }
  // AI Core context (SCD 3-1), read-only: the Talent folder's Profile.md / AI_Memo.md and
  // <root>/Common/ Knowhow.md, Algorithm.md, AI_Instructions.md. A missing file is null, never invented.
  async aiContext(talentFolderId: string): Promise<TalentFiles> {
    const read = async (items: DriveItem[], dir: string, name: string): Promise<ContextFile | null> => {
      const i = items.find(x => x.name === name && x.file)
      return i && (i.size ?? 0) <= TEXT_MAX ? { name, eTag: i.eTag, text: await this.drive.text(i.id), source: `OneDrive ${dir}/${name} (item ${i.id}, eTag ${i.eTag})` } : null
    }
    // Common/ is the same for every Talent: read once per batch (60 s), the Talent's own files in parallel.
    // Load test 2026-11-23: reading context was ~8–10 s of a 17.5 s run, mostly these Graph calls done one after another.
    const key = `${this.drive.driveId}|${this.root}`, hit = COMMON_CACHE.get(key)
    let agency$ = hit && Date.now() - hit.at < COMMON_TTL_MS ? hit.files : undefined
    if (!agency$) {
      agency$ = (async () => {
        const common = await this.drive.byPath(`${this.root}/${F.common}`)
        const shared = common?.folder ? await this.drive.children(common.id) : []
        return (await Promise.all(AGENCY_FILES.map(n => read(shared, `${this.root}/${F.common}`, n)))).filter((x): x is ContextFile => x !== null)
      })()
      COMMON_CACHE.set(key, { at: Date.now(), files: agency$ })
      agency$.catch(() => COMMON_CACHE.delete(key))
    }
    const [folder, agency] = await Promise.all([this.folder(talentFolderId), agency$])
    const own = await this.drive.children(folder.id), mine = `${this.root}/${F.talents}/${folder.name}`
    const [profile, memo] = await Promise.all([read(own, mine, TALENT_FILES.profile), read(own, mine, TALENT_FILES.memo)])
    return { agency, profile, memo }
  }
  // Before 2026-11-23 the tree used Japanese names. Old layout left in the drive → callers must stop (the user renames by hand):
  // otherwise talents$() would create an empty Talents/ and every linked folder would fall outside it.
  // ponytail: drop LEGACY once every drive is renamed.
  static readonly LEGACY = { root: 'AI育成OS_dev', talents: 'タレント', common: '共通', [TALENT_FILES.profile]: 'プロフィール.md', [TALENT_FILES.memo]: 'AIメモ.md' } as Record<string, string>
  async legacyLayout(): Promise<string[]> {
    const L = OneDriveDemo.LEGACY, todo: string[] = []
    if (this.root === L.root) return [`ONEDRIVE_ROOT_FOLDER is still the old name ${L.root}: set ONEDRIVE_ROOT_FOLDER=AI_Talent_OS_dev in apps/api/.env and rename the folder in OneDrive`]
    const root = await this.drive.byPath(this.root), old = await this.drive.byPath(L.root)
    if (!root) {
      if (old) todo.push(`${L.root} → ${this.root} (or set ONEDRIVE_ROOT_FOLDER=${L.root})`)
      return todo
    }
    // Both roots: the data would be split between them. One of them must go before anything is linked.
    if (old) todo.push(`both ${L.root}/ and ${this.root}/ exist: keep the one with the Talent folders, rename it to ${this.root}, remove the other`)
    for (const [now, old] of [[F.talents, L.talents], [F.common, L.common]]) {
      if (!await this.drive.byPath(`${this.root}/${now}`) && await this.drive.byPath(`${this.root}/${old}`)) todo.push(`${this.root}/${old} → ${now}`)
    }
    return todo
  }
  // Brings one Talent folder (and Common/) to the current layout. Creates only what is missing, never overwrites;
  // an item still under its old Japanese name is reported for renaming instead of being duplicated.
  async ensureStructure(talentFolderId: string): Promise<{ created: string[]; rename: string[] }> {
    const folder = await this.folder(talentFolderId), own = await this.drive.children(folder.id)
    const created: string[] = [], rename: string[] = []
    const need = async (name: string, make: () => Promise<unknown>) => {
      if (own.some(i => i.name === name)) return
      const old = OneDriveDemo.LEGACY[name]
      if (old && own.some(i => i.name === old)) { rename.push(`${folder.name}/${old} → ${name}`); return }
      await make(); created.push(name)
    }
    await need(TALENT_FILES.profile, () => this.drive.createFile(folder.id, TALENT_FILES.profile, PROFILE, TEXT['.md']))
    await need(TALENT_FILES.memo, () => this.drive.createFile(folder.id, TALENT_FILES.memo, '', TEXT['.md']))
    return { created, rename }
  }
  // Common/ with the three agency files (empty when new). Same rules: never overwrite, report old names.
  async ensureCommon(): Promise<{ created: string[]; rename: string[] }> {
    const root = await this.drive.ensureFolder('root', this.root), common = await this.drive.ensureFolder(root.id, F.common)
    const shared = await this.drive.children(common.id), created: string[] = [], rename: string[] = []
    const OLD: Record<string, string> = { [AGENCY_FILES[0]]: 'ノウハウ.md', [AGENCY_FILES[1]]: 'アルゴリズム対策.md', [AGENCY_FILES[2]]: 'AIへの指示.md' }
    for (const name of AGENCY_FILES) {
      if (shared.some(i => i.name === name)) continue
      if (shared.some(i => i.name === OLD[name])) { rename.push(`${F.common}/${OLD[name]} → ${name}`); continue }
      await this.drive.createFile(common.id, name, '', TEXT['.md']); created.push(`${F.common}/${name}`)
    }
    return { created, rename }
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
  // Agent profile export (ai-coach/effects.ts): replace the file if it exists, else create it. Returns the item id.
  // A human edit between list and replace fails the If-Match; the effect worker retries with the new eTag.
  async writeText(folderId: string, name: string, content: string) {
    const folder = await this.folder(folderId), file = safeName(name)
    const old = (await this.drive.children(folder.id)).find(i => i.name === file && i.file)
    return (old ? await this.drive.replaceFile(old.id, content, this.textType(file), old.eTag) : await this.drive.createFile(folder.id, file, content, this.textType(file))).id
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
