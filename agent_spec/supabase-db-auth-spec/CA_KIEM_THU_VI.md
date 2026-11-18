# Ca kiểm thử Supabase Database và Auth

Bản 2.0 · 18/11/2026 · Đi kèm [HUONG_DAN_TICH_HOP_VI.md](HUONG_DAN_TICH_HOP_VI.md) (viết tắt HD). Mỗi nhóm ca ghi mục HD tương ứng.

Loại kiểm thử:
- **TH** (tích hợp): `node:test` + PostgreSQL cục bộ thật đã chạy đủ migration + Auth **giả** (cài `AuthProvider` trong bộ nhớ). Chạy bằng `TEST_DATABASE_URL`, không bao giờ trỏ tới Supabase.
- **SB** (Supabase thật): chạy tay hoặc bằng script với project **dev**; tài khoản thử tạo riêng rồi xóa.
- **E2E**: trình duyệt thật (Playwright) với FE + BE + Supabase dev.

Ca nào chưa chạy được thì ghi `CHƯA CHẠY` kèm lý do, không ghi đạt.

---

## 1. Chuẩn bị

### 1.1. Postgres cục bộ cho TH

```bash
docker run -d --rm --name talentos-test -e POSTGRES_PASSWORD=t -p 55432:5432 postgres:17-alpine
# Tạo role anon/authenticated và bảng auth.users giả (CHỈ cục bộ, không bao giờ chạy trên Supabase)
docker exec -i talentos-test psql -U postgres < apps/api/prisma/local/bootstrap.sql
cd apps/api && DIRECT_URL=postgresql://postgres:t@localhost:55432/postgres npx prisma migrate deploy
export TEST_DATABASE_URL=postgresql://postgres:t@localhost:55432/postgres
npm test
```

TH dùng tài khoản chủ sở hữu vì phải tạo dữ liệu mẫu và thử dữ liệu sai. Các ca kiểm quyền của `talent_runtime` (DB-04…DB-07) tạo thêm một LOGIN thử trong DB cục bộ theo HD §5.1.

### 1.2. Khung test

Theo `apps/api/src/modules/auth/technology.integration.test.ts` (đã chạy với bản demo).

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import type { AuthProvider, AuthFactor, VerifiedToken } from '../../core/auth.ts'
import { AppError } from '../../core/errors.ts'
import { createDatabase } from '../../infra/database/client.ts'

const url = process.env.TEST_DATABASE_URL
const local = !!url && ['localhost', '127.0.0.1'].includes(new URL(url).hostname)

// Auth giả: token là chuỗi ngẫu nhiên ánh xạ sang claims. Mã TOTP đúng là '012345'.
function fakeAuth(db: ReturnType<typeof createDatabase>) {
  const users = new Map<string, { id: string; password: string; factors: AuthFactor[] }>()
  const tokens = new Map<string, VerifiedToken>()
  const issue = (userId: string, sessionId = randomUUID(), aal: 'aal1' | 'aal2' = 'aal1') => {
    const access_token = randomUUID(); tokens.set(access_token, { userId, sessionId, aal })
    return { access_token, refresh_token: randomUUID(), expires_at: Math.floor(Date.now() / 1000) + 3600 }
  }
  const claim = (t: string) => { const c = tokens.get(t); if (!c) throw new AppError('AUTH_REQUIRED', 401); return c }
  const owner = (t: string) => [...users.values()].find(u => u.id === claim(t).userId)!
  const provider: AuthProvider = {
    async createUser(email, password) {
      const id = randomUUID(); await db.$executeRaw`INSERT INTO auth.users(id) VALUES (${id}::uuid)`
      users.set(email, { id, password, factors: [] }); return { userId: id }
    },
    async login(email, password) { const u = users.get(email); if (!u || u.password !== password) throw new AppError('AUTH_INVALID', 401); return issue(u.id) },
    async verifyToken(t) { return claim(t) },
    async factors(t) { return owner(t).factors },
    async enrollTotp(t) { const id = randomUUID(); owner(t).factors.push({ id, factor_type: 'totp', status: 'unverified' }); return { factorId: id, qr: 'data:image/svg+xml;base64,PHN2Zy8+', secret: 'TEST' } },
    async removeFactor(t, id) { owner(t).factors = owner(t).factors.filter(f => f.id !== id) },
    async challenge() { return { id: randomUUID(), expiresAt: new Date(Date.now() + 300_000) } },
    async verify(t, factorId, _challengeId, code) {
      if (code !== '012345') throw new AppError('AUTH_INVALID', 401)
      owner(t).factors.find(f => f.id === factorId)!.status = 'verified'
      const c = claim(t); return issue(c.userId, c.sessionId, 'aal2')       // cùng session_id, aal2 (HD S1)
    },
    async updatePassword(t, p) { owner(t).password = p },
    async signOut() {},
  }
  return { provider, users, tokens, issue }
}

test('auth', { skip: !local }, async t => {
  const db = createDatabase(url!)
  try {
    // Dữ liệu mẫu: createUser → auth_principals → managers/talents → auth_login_identifiers (HD §7.5)
    await t.test('AU-L01 tài năng đăng nhập đúng', async () => { /* … */ })
  } finally { await db.$disconnect() }   // mỗi ca dùng email ngẫu nhiên; không xóa dữ liệu ngoài ca
})
```

Thử "đã qua 30 phút" mà không phải chờ: sửa thẳng dòng trong DB cục bộ (`UPDATE app_private.auth_session_registry SET admin_last_activity_at = now() - interval '31 minutes'`). Cột `absolute_expires_at` không sửa được (trigger), nên muốn thử hết hạn thì INSERT dữ liệu mẫu với `auth_time` và `absolute_expires_at` đã qua.

---

## 2. Ca tích hợp (TH)

### 2.1. DB và quyền (HD §5)

| Mã | Bước | Kết quả mong đợi |
|---|---|---|
| DB-01 | Khởi động API với `DATABASE_URL` = `postgres` | Dừng ngay với `DATABASE_RUNTIME_ROLE_REQUIRED` |
| DB-02 | Khởi động API với LOGIN thuộc `talent_runtime` | `/health` trả `{"ok":true,"database":"up"}` |
| DB-03 | Liệt kê bảng trong `public`, `app_private` | Mọi bảng bật RLS; `anon`, `authenticated` không có quyền nào |
| DB-04 | Bằng LOGIN runtime: `ALTER TABLE public.talents ADD COLUMN x int` | Lỗi 42501 (không đủ quyền) |
| DB-05 | Bằng LOGIN runtime: `UPDATE public.activity_logs …` hoặc `TRUNCATE` | Lỗi 42501 |
| DB-06 | Bằng LOGIN runtime: `INSERT` vào `public.social_accounts` | Lỗi 55000 (bảng đang chặn ghi) hoặc 42501 |
| DB-07 | Thêm bảng theo HD §5.2 nhưng bỏ `GRANT`/`POLICY` | Runtime lỗi 42501 hoặc đọc ra 0 dòng: chứng minh bước cấp quyền là bắt buộc |
| DB-08 | Tạo `managers` với `auth_user_id` không có trong `auth.users` | Lỗi 23503 (khóa ngoại) |
| DB-09 | Xóa người dùng trong `auth.users` còn `auth_principals` | Lỗi 23503 |
| DB-10 | Hai giao dịch cùng `UPDATE talent_applications … WHERE version = 1` | Đúng một giao dịch đổi 1 dòng; bên kia 0 dòng → `VERSION_CONFLICT` |

### 2.2. Guard (HD §6.3)

| Mã | Bước | Kết quả mong đợi |
|---|---|---|
| AU-G01 | Gọi route tài năng không có `Authorization` | 401 `AUTH_REQUIRED` |
| AU-G02 | Token hợp lệ nhưng `session_id` không có trong sổ phiên (đăng nhập thẳng vào Supabase) | 401 `SESSION_REVOKED` |
| AU-G03 | Phiên đã có `revoked_at` | 401 `SESSION_REVOKED` |
| AU-G04 | Phiên có `absolute_expires_at` đã qua | 401 `SESSION_REVOKED` |
| AU-G05 | Tăng `auth_principals.security_version` sau khi mở phiên | 401 `SESSION_REVOKED` |
| AU-G06 | Chuyển tài năng sang `ended` | Mọi phiên bị thu hồi (trigger); request kế tiếp 401 |
| AU-G07 | Token tài năng gọi route quản lý, và ngược lại | 403 `FORBIDDEN` |
| AU-G08 | Phiên `first_password` gọi route nghiệp vụ | 403 `PASSWORD_CHANGE_REQUIRED`; `POST /auth/password` vẫn gọi được |
| AU-G09 | Quản lý `full`, token `aal1` gọi `/admin/*` | 403 `MFA_REQUIRED` |
| AU-G10 | Quản lý `full` `aal2`, `admin_last_activity_at` lùi 31 phút | 401 `REAUTH_REQUIRED`, phiên bị thu hồi. Lùi 29 phút thì qua và mốc được cập nhật |
| AU-G11 | Đổi `MFA_POLICY_VERSION` rồi gọi bằng phiên cũ | 403 `MFA_REQUIRED` |
| AU-G12 | Body chứa `talentId` của người khác | 422 (trường lạ) hoặc bị bỏ qua; chỉ dữ liệu của người gọi được trả |

### 2.3. Đăng nhập và khóa (HD §7.2, §7.3)

| Mã | Bước | Kết quả mong đợi |
|---|---|---|
| AU-L01 | Tài năng đăng nhập đúng | 200, `next='home'`; sổ phiên có 1 dòng `purpose='full'`, hạn = bây giờ + 30 ngày |
| AU-L02 | Sai mật khẩu 4 lần rồi đúng | Đăng nhập được; bộ đếm về 0 |
| AU-L03 | Sai 5 lần liên tiếp | Lần 5 trả `AUTH_INVALID`; lần 6 (kể cả mật khẩu đúng) trả 429 `ACCOUNT_LOCKED` **mà không gọi** `provider.login` |
| AU-L04 | Đang khóa, thử thêm 3 lần | `blocked_until` không đổi |
| AU-L05 | Khóa đã hết hạn, sai 1 lần | Bộ đếm = 1, chưa khóa |
| AU-L06 | 5 request sai gửi song song | Bộ đếm = 5 và đã khóa (không mất lượt do tranh chấp) |
| AU-L07 | Auth trả 503 khi đăng nhập | 503 `AUTH_PROVIDER_UNAVAILABLE`; bộ đếm không tăng |
| AU-L08 | Người dùng Auth chưa có `auth_principals` | 403 `ACCOUNT_NOT_PROVISIONED`; không có dòng sổ phiên |
| AU-L09 | Tài năng có `must_change_password=true` | `next='change-password'`, `purpose='first_password'` |
| AU-L10 | Quản lý chưa có TOTP / đã có TOTP | `next='mfa-setup'` / `next='mfa-verify'` |
| AU-L11 | 21 lần đăng nhập trong một phút từ một IP | Lần 21 trả 429 `RATE_LIMITED` |
| AU-L12 | Body có thêm trường `role` | 422 `INPUT_INVALID` |
| AU-L13 | Lệnh ghi không có `Origin` hợp lệ | 403; header `Cache-Control: no-store` |

### 2.4. TOTP quản lý (HD §7.4)

| Mã | Bước | Kết quả mong đợi |
|---|---|---|
| AU-M01 | Phiên `mfa_setup` gọi `enroll` | Trả `qr` (data URL SVG) và `secret`; không cột nào trong DB chứa hai giá trị này |
| AU-M02 | Gọi `enroll` lần hai khi lượt đầu chưa xong | 409 `MFA_SETUP_PENDING` |
| AU-M03 | Đã có TOTP `verified` mà gọi `enroll` | 403 `MFA_ENROLLMENT_NOT_ALLOWED` |
| AU-M04 | Challenge với `factorId` của người khác | 403 `FACTOR_NOT_ALLOWED` |
| AU-M05 | Verify mã sai | 401 `AUTH_INVALID`; `attempts_used` tăng; phiên vẫn chưa qua MFA |
| AU-M06 | Verify mã đúng | Token mới `aal2`, cùng `session_id`; sổ phiên `purpose='full'`, có `mfa_factor_id`, `mfa_verified_at`, `mfa_policy_version` |
| AU-M07 | Verify cùng `challengeRef` lần hai | 409 `CHALLENGE_CONSUMED` |
| AU-M08 | Quá 5 lần thử hoặc quá hạn | 409 `CHALLENGE_EXPIRED` |
| AU-M09 | Auth giả trả token `aal2` của **phiên khác** | 401 `MFA_PROOF_INVALID`; sổ phiên không đổi |
| AU-M10 | Challenge tạo ở phiên A, verify ở phiên B cùng người | 409 `CHALLENGE_CONSUMED` (không tìm thấy theo phiên B) |
| AU-M11 | Đăng nhập lại sau khi đã có TOTP | Bắt buộc qua TOTP; không có đường bỏ qua |

### 2.5. Đổi mật khẩu, đăng xuất (HD §7.6)

| Mã | Bước | Kết quả mong đợi |
|---|---|---|
| AU-P01 | Phiên `first_password` đổi mật khẩu | 204; `must_change_password=false`; `security_version` tăng; mọi phiên của người đó bị thu hồi |
| AU-P02 | Dùng token cũ sau AU-P01 | 401 `SESSION_REVOKED` |
| AU-P03 | Đăng xuất | Phiên bị thu hồi; đăng ký thông báo đẩy của phiên đó có `is_active=false` (trigger) |
| AU-P04 | Đăng xuất khi Auth lỗi | 204; token cũ vẫn bị app từ chối |
| AU-P05 | Hai máy cùng tài khoản, đăng xuất máy 1 | Máy 2 vẫn dùng được |
| AU-P06 | Quên mật khẩu với email có và không có | Cả hai trả 202, nội dung giống nhau |

---

## 3. Ca trên Supabase dev (SB)

| Mã | Bước | Kết quả mong đợi |
|---|---|---|
| SB-01 | Đăng nhập thử bằng adapter (HD §6.2) | Nhận cặp token; `verifyToken` trả `aal1`, có `session_id` |
| SB-02 | Sửa một ký tự phần chữ ký của access token rồi `verifyToken` | Từ chối |
| SB-03 | Token của project Supabase khác | Từ chối (`iss` sai) |
| SB-04 | `enrollTotp` → quét QR bằng Google Authenticator → challenge → verify | Token mới `aal2`, cùng `session_id` |
| SB-05 | Làm mới token sau SB-04 | `session_id` giữ nguyên, `aal` vẫn `aal2` |
| SB-06 | Gọi `POST /auth/v1/signup` bằng publishable key ở staging | Bị từ chối (đã tắt tự đăng ký) |
| SB-07 | `createUser` với email đã có | 409 `EMAIL_ALREADY_REGISTERED` |
| SB-08 | Gọi `verifyToken` 100 lần | Không có lời gọi mạng tới Auth mỗi lần (khóa ký bất đối xứng, HD S4) |
| SB-09 | Dọn dữ liệu thử | Chỉ xóa đúng người dùng thử tạo trong lượt chạy |

---

## 4. Ca E2E

| Mã | Bước | Kết quả mong đợi |
|---|---|---|
| E2E-A01 | Tài năng đăng nhập trên PWA → về màn chính → tải lại trang | Vẫn đăng nhập (SDK giữ phiên) |
| E2E-A02 | Tài năng đăng nhập bằng mật khẩu tạm | Chỉ thấy màn đổi mật khẩu; đổi xong phải đăng nhập lại |
| E2E-A03 | Quản lý lần đầu: đăng nhập → quét QR → nhập mã | Vào màn quản trị |
| E2E-A04 | Quản lý để yên 31 phút rồi bấm | Về màn đăng nhập, phải nhập mật khẩu + TOTP |
| E2E-A05 | Sai mật khẩu 5 lần trên màn đăng nhập | Hiện thông báo khóa; sau 15 phút đăng nhập được |
| E2E-A06 | Đăng xuất | Về màn đăng nhập; bấm quay lại trên trình duyệt không hiện dữ liệu cũ |
| E2E-A07 | Mở DevTools → Application → Storage | Không có mật khẩu, secret TOTP; chỉ có phiên của SDK |

Khung E2E đã chạy cho demo: `apps/web/e2e/auth-pwa-demo.mts` (đăng ký, TOTP bằng mã tự sinh, đăng xuất). Dùng làm khung; đổi bước đăng ký sang đăng nhập bằng tài khoản tạo qua `createUser`.
