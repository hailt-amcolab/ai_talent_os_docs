// AI Coach fixtures (/api/v1/me/coach/*). Development data only: the real path is sign-up → manager approval (EP01).
// Refuses NODE_ENV=production.
// No Talent needs a specific Manager ([KS] K77/K93: every Manager sees every Talent). The DB still needs WHO APPROVED the
// application (chk_talents_origin / chk_talent_applications_decision, BR-02), so an existing active Manager is used as approver
// (or --manager <loginUserId>; a demo approver login is created only when the DB has no Manager at all).
// Map one existing login (user ID = the "receiver code" on /pwa/home) to an in-use Talent; e-mail is read from Supabase Auth:
//   npm run ai:talent -- --talent <loginUserId> [--name 名前] [--birth 2000-01-01]
// Map EVERY login that has no role yet (e.g. the one you test with):
//   npm run ai:talent -- --all-logins
// Run the morning message now for every in-use Talent (the worker processes it; same day twice = same run).
// --simulate: no AI call (sample text after a realistic wait), for queue/load tests:
//   npm run ai:talent -- --morning [--date 2026-11-25] [--simulate]
// Queue figures of a day / remove every Talent's morning runs of a day (DEMO ONLY, keeps the shared trends):
//   npm run ai:talent -- --stats [--date …]      npm run ai:talent -- --reset-today [--date …]
// --link-onedrive --test-profile also writes a fictional profile (tools/fixtures/test-profiles.ts) into every EMPTY Profile.md.
// Or create N NEW confirmed Talent logins (needs SUPABASE_URL + SUPABASE_SECRET_KEY), passwords printed once:
//   npm run ai:talent -- --seed 3
// Bring OneDrive to the current layout for every in-use Talent: create + link a folder when missing, add a missing
// Profile.md / AI_Memo.md and the Common/ files (only the AI documents, storage doc §3). Never overwrites; reports items still under
// their old Japanese names instead of duplicating them. Re-runnable. Needs OneDrive configured (main account connected):
//   npm run ai:talent -- --link-onedrive
import { parseArgs } from 'node:util'
import { randomBytes } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import { createDatabase, type Database } from '../src/infra/database/client.ts'
import { loadEnv } from '../src/config/env.ts'
import { createOneDrive } from '../src/modules/onedrive/connections.ts'
import { AiCoachStore } from '../src/modules/ai-coach/store.ts'
import { hasProfile, TALENT_FILES } from '../src/modules/ai-coach/context.ts'
import { TEST_PROFILE_NOTE, TEST_PROFILES } from './fixtures/test-profiles.ts'

const { values: a } = parseArgs({ options: { talent: { type: 'string' }, manager: { type: 'string' }, email: { type: 'string' }, name: { type: 'string', default: 'デモタレント' }, birth: { type: 'string', default: '2000-01-01' }, seed: { type: 'string' }, 'link-onedrive': { type: 'boolean' }, 'all-logins': { type: 'boolean' }, morning: { type: 'boolean' }, date: { type: 'string' }, simulate: { type: 'boolean' }, stats: { type: 'boolean' }, 'reset-today': { type: 'boolean' }, 'test-profile': { type: 'boolean' } } })
if (process.env.NODE_ENV === 'production') throw new Error('Refusing to create Talent fixtures in production')

const supabaseAdmin = () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) throw new Error('Need SUPABASE_URL and SUPABASE_SECRET_KEY')
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
}

// The approver of the application (provenance only, not an assignment): given login, else any active Manager, else a new one.
async function approver(db: Database, managerLogin?: string): Promise<string> {
  if (managerLogin) {
    await db.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${managerLogin}::uuid,'manager') ON CONFLICT (auth_user_id) DO NOTHING`
    await db.$executeRaw`INSERT INTO public.managers(auth_user_id) VALUES(${managerLogin}::uuid) ON CONFLICT (auth_user_id) DO NOTHING`
    return (await db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM public.managers WHERE auth_user_id=${managerLogin}::uuid`)[0].id
  }
  const [m] = await db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM public.managers WHERE is_active ORDER BY created_at LIMIT 1`
  if (m) return m.id
  const { data, error } = await supabaseAdmin().auth.admin.createUser({ email: `aicoach-approver-${randomBytes(3).toString('hex')}@example.com`, password: randomBytes(18).toString('base64url'), email_confirm: true })
  if (error || !data.user) throw new Error(`Could not create the approver login: ${error?.code ?? 'unknown'}`)
  return approver(db, data.user.id)
}

async function link(db: Database, t: { talent: string; manager?: string; email?: string; name?: string; birth: string }) {
  const existing = await db.$queryRaw<Array<{ id: string }>>`SELECT id::text FROM public.talents WHERE auth_user_id=${t.talent}::uuid`
  if (existing[0]) return existing[0].id
  const email = t.email ?? (await supabaseAdmin().auth.admin.getUserById(t.talent)).data.user?.email
  if (!email) throw new Error(`No e-mail for login ${t.talent}`)
  const name = t.name ?? email.split('@')[0].slice(0, 40)
  const managerId = await approver(db, t.manager)
  return db.$transaction(async tx => {
    const m = { id: managerId }
    await tx.$executeRaw`INSERT INTO app_private.auth_principals(auth_user_id,principal_kind) VALUES(${t.talent}::uuid,'talent')`
    const [app] = await tx.$queryRaw<Array<{ id: string }>>`
      INSERT INTO public.talent_applications(display_name,email,birth_date,status,decided_by_manager_id,decided_at)
      VALUES(${name},${email},${t.birth}::date,'approved',${m.id}::uuid,now()) RETURNING id::text`
    const [row] = await tx.$queryRaw<Array<{ id: string }>>`
      INSERT INTO public.talents(auth_user_id,account_type,display_name,birth_date,status,application_id,application_status)
      VALUES(${t.talent}::uuid,'talent',${name},${t.birth}::date,'in_use',${app.id}::uuid,'approved') RETURNING id::text`
    return row.id
  })
}

const db = createDatabase(process.env.DATABASE_URL!)
try {
  if (a['link-onedrive']) {
    const runtime = createOneDrive(loadEnv(), db)
    if (!runtime) throw new Error('OneDrive is not configured (ONEDRIVE_AUTH_MODE)')
    const od = await runtime.demo()
    // Old Japanese layout still in the drive: stop before anything creates an empty Talents/ next to it.
    const legacy = await od.legacyLayout()
    if (legacy.length) {
      console.log('Rename these in OneDrive first, then run again:\n' + legacy.map(x => '  ' + x).join('\n'))
      process.exitCode = 1
    } else {
      const common = await od.ensureCommon()
      const rows = await db.$queryRaw<Array<{ id: string; display_name: string; onedrive_folder_id: string | null }>>`
        SELECT id::text,display_name,onedrive_folder_id FROM public.talents WHERE status='in_use' ORDER BY created_at`
      const report: Array<Record<string, string>> = [], rename = [...common.rename]
      if (common.created.length) report.push({ talent: '(Common)', folder: 'Common', action: 'created ' + common.created.join(', ') })
      for (const t of rows) {
        let folderId = t.onedrive_folder_id, action = 'checked'
        if (!folderId) {
          const folder = await od.createTalent(t.display_name)
          await db.$executeRaw`UPDATE public.talents SET onedrive_folder_id=${folder.id},onedrive_folder_created_at=now(),version=version+1,updated_at=now() WHERE id=${t.id}::uuid AND onedrive_folder_id IS NULL`
          folderId = folder.id; action = 'folder created and linked'
        }
        let r: { created: string[]; rename: string[] }
        try { r = await od.ensureStructure(folderId) } catch (e) {
          // Linked folder deleted, or moved outside <root>/Talents/: report, never create a second folder silently.
          report.push({ talent: t.display_name, folder: folderId, action: `NOT FOUND under ${'Talents'}/ (${e instanceof Error ? e.message : 'error'}); restore it, or clear talents.onedrive_folder_id to get a new one` })
          continue
        }
        rename.push(...r.rename)
        if (a['test-profile']) {
          // Only an empty Profile.md (template headings) gets the fictional profile; a filled one is never touched.
          const file = (await od.children(folderId)).find(i => i.name === TALENT_FILES.profile)
          const current = file ? await od.readText(file.id) : null
          if (file && current && !hasProfile({ agency: [], profile: { name: file.name, eTag: file.eTag, text: current.content.replace(/<!--[\s\S]*?-->/g, ''), source: '' }, memo: null })) {
            const names = Object.keys(TEST_PROFILES), body = TEST_PROFILES[t.display_name] ?? TEST_PROFILES[names[report.length % names.length]]
            await od.updateText(file.id, TEST_PROFILE_NOTE + body + '\n', current.eTag)
            action += '; test profile written'
          }
        }
        report.push({ talent: t.display_name, folder: folderId, action: r.created.length ? `${action}; added ${r.created.join(', ')}` : action })
      }
      console.table(report.length ? report : [{ result: 'no in-use Talent' }])
      if (rename.length) { console.log('Still under the old name (rename in OneDrive, then run again):\n' + rename.map(x => '  ' + x).join('\n')); process.exitCode = 1 }
    }
  } else if (a.seed) {
    const n = Number(a.seed)
    if (!Number.isInteger(n) || n < 1 || n > 300) throw new Error('--seed must be 1..300')
    const admin = supabaseAdmin()
    const tag = randomBytes(3).toString('hex')
    const login = async (role: string) => {
      const email = `aicoach-${tag}-${role}@example.com`, password = randomBytes(9).toString('base64url') + 'a1'
      const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true })
      if (error || !data.user) throw new Error(`Could not create ${role} login: ${error?.code ?? 'unknown'}`)
      return { role, email, password, userId: data.user.id }
    }
    const rows: Array<Record<string, string>> = []
    const people = [['モモ', '2000-04-01'], ['ハナ', '2010-08-15'], ['ユイ', '1998-12-24']] // 2010 = under 18, to show the minor label
    for (let i = 0; i < n; i++) {
      const [base, birth] = people[i % people.length], name = n > 3 ? `${base}${String(i + 1).padStart(3, '0')}` : base
      const t = await login(`talent${String(i + 1).padStart(3, '0')}`)
      rows.push({ ...t, name, birth, talentId: await link(db, { talent: t.userId, email: t.email, name, birth }) })
    }
    console.table(rows)
  } else if (a['all-logins']) {
    // Supabase Auth (admin API) lists the logins; the ones with a role (manager/talent) are left alone.
    const admin = supabaseAdmin(), users: Array<{ id: string; email?: string }> = []
    for (let page = 1; ; page++) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 })
      if (error) throw new Error(`listUsers failed: ${error.code ?? 'unknown'}`)
      users.push(...data.users); if (data.users.length < 200) break
    }
    const taken = new Set((await db.$queryRaw<Array<{ id: string }>>`SELECT auth_user_id::text AS id FROM app_private.auth_principals`).map(r => r.id))
    const rows: Array<Record<string, string>> = []
    for (const u of users.filter(u => !taken.has(u.id) && u.email)) rows.push({ login: u.email!, userId: u.id, talentId: await link(db, { talent: u.id, email: u.email, birth: a.birth! }) })
    console.table(rows.length ? rows : [{ result: 'every login already has a role' }])
  } else if (a.morning || a.stats || a['reset-today']) {
    const store = new AiCoachStore(db)
    const day = a.date ?? (await store.morningDue()).day
    if (a['reset-today']) console.log(JSON.stringify({ day, ...await store.resetDay(day) }))
    if (a.morning) {
      const t0 = Date.now(), runs = await store.scheduleDaily(day, undefined, a.simulate ?? false)
      const fresh = runs.filter(r => r.state === 'pending' && r.attemptNo === 0).length
      console.log(JSON.stringify({ day, talents: runs.length, newRuns: fresh, simulate: !!a.simulate, scheduleSeconds: (Date.now() - t0) / 1000 }))
      if (runs.length <= 20) console.table(runs.map(r => ({ execution: r.id, state: r.state, error: r.errorCode ?? '' })))
      console.log('The worker picks these up (it must be running). Same day again = same runs; --reset-today or --date to run again.')
    }
    if (a.stats) console.table([{ day, ...await store.dayStats(day) }])
  } else {
    if (!a.talent) throw new Error('Need --talent <loginUserId>, --all-logins, --seed N, --link-onedrive or --morning')
    console.log(JSON.stringify({ talentId: await link(db, { talent: a.talent, manager: a.manager, email: a.email, name: a.name === 'デモタレント' ? undefined : a.name, birth: a.birth! }) }))
  }
} finally {
  await db.$disconnect()
}
