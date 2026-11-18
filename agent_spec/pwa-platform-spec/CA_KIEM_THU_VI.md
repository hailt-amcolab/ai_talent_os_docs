# Ca kiểm thử PWA và thông báo đẩy

Bản 2.0 · 18/11/2026 · Đi kèm [HUONG_DAN_TICH_HOP_VI.md](HUONG_DAN_TICH_HOP_VI.md) (viết tắt HD).

Loại kiểm thử:
- **ĐV** (đơn vị): `npm test` trong `apps/web` (`node --test 'lib/**/*.test.ts'`) và `apps/api`; chạy được không cần mạng.
- **TH** (tích hợp BE): `node:test` + PostgreSQL cục bộ (cách dựng ở `../supabase-db-auth-spec/CA_KIEM_THU_VI.md` §1) + bộ gửi push **giả**.
- **MT** (máy thật): iPhone thật iOS 16.4+ và Android thật với Chrome, qua HTTPS (HD §7). Ghi kết quả kèm máy, phiên bản hệ điều hành, trình duyệt, ngày giờ.

"Máy chủ đẩy nhận" (HTTP 201) **không** chứng minh thông báo đã hiện trên máy. Ca MT phải nhìn thấy thông báo thật. Ca nào chưa chạy thì ghi `CHƯA CHẠY` kèm lý do.

---

## 1. Ca đơn vị (ĐV)

| Mã | Kiểm | Kết quả mong đợi | Đã có test (18/11/2026) |
|---|---|---|---|
| PW-U01 | `installGuide` với user agent Instagram, LINE, TikTok trên iPhone và Android | `in-app` | `apps/web/lib/pwa/platform.test.ts` |
| PW-U02 | iPhone Safari / Chrome trên iPhone (`CriOS`) / iPad giả Mac (`maxTouchPoints` > 1) | `ios-safari` / `ios-other` / `ios-safari` | như trên |
| PW-U03 | `standalone: true` | `installed` | như trên |
| PW-U04 | `iosTooOldForPush` với iOS 16.3 / 16.4 / 17.0 | true / false / false | như trên |
| PW-U05 | Service worker nhận điều hướng `/pwa/home` khi có mạng | Trả từ mạng; cache không ghi gì | `apps/web/lib/pwa/sw.test.ts` |
| PW-U06 | Service worker nhận `/admin`, `/api/v1/...`, `?_rsc=1`, request có `Authorization` | Không chặn (để trình duyệt tự xử lý), không ghi cache | như trên |
| PW-U07 | Mất mạng, điều hướng `/pwa/home` | Trả trang mất mạng, không phải nội dung cũ | như trên |
| PW-U08 | Sự kiện `push` với dữ liệu hỏng (không phải JSON) | Vẫn hiện đúng 1 thông báo mặc định | như trên |
| PW-U09 | `notificationclick` với `url` = `https://evil.test/…`, `/admin`, URL sai cú pháp | Mở `/pwa/home` | như trên |
| PW-U10 | Sự kiện `install` | Không gọi `skipWaiting`; chỉ gọi khi nhận tin `SKIP_WAITING` | như trên |
| PW-U11 | `classifyStatus(201/404/410/413/429/500/400/403)` | sent / gone / gone / payload-too-large / retry / retry / config-error / config-error | `apps/api/src/infra/push/push.test.ts` |
| PW-U12 | `isAllowedPushEndpoint` với `https://fcm.googleapis.com/…`, `https://web.push.apple.com/…`, `http://…`, `https://evil.test/…`, cổng lạ, URL có `user:pass@` | Chỉ hai URL đầu được chấp nhận | như trên |
| PW-U13 | `apiFetch` khi `API_URL` là tên miền ngrok / không phải ngrok | Có / không có header `ngrok-skip-browser-warning` | **Chưa có** |

Khung test service worker (đã chạy): chạy `public/sw.js` trong `node:vm` với `self`, `caches`, `fetch` giả, rồi gọi thẳng các trình xử lý sự kiện. Bản đầy đủ: `apps/web/lib/pwa/sw.test.ts`.

```ts
import vm from 'node:vm'
import { readFileSync } from 'node:fs'
const events = new Map<string, (e: any) => void>(), shown: unknown[] = [], opened: string[] = []
const self = {
  addEventListener: (n: string, f: (e: any) => void) => events.set(n, f), skipWaiting: () => {}, navigator: {},
  clients: { claim: async () => {}, matchAll: async () => [], openWindow: async (u: string) => { opened.push(u) } },
  registration: { showNotification: async (...a: unknown[]) => { shown.push(a) } },
}
const caches = { keys: async () => [], delete: async () => true, open: async () => ({ addAll: async () => {}, put: async () => {} }), match: async () => new Response('OFFLINE') }
vm.runInNewContext(readFileSync(new URL('../../public/sw.js', import.meta.url), 'utf8'),
  { self, caches, location: { origin: 'https://example.test' }, URL, fetch: async () => new Response('private') })

let wait = Promise.resolve()
events.get('push')!({ data: { json: () => { throw new Error('bad') } }, waitUntil: (p: Promise<void>) => { wait = p } })
await wait; assert.equal(shown.length, 1)                       // PW-U08
```

---

## 2. Ca tích hợp BE (TH)

Bộ gửi giả thay `sendPush` (service nhận `sender` qua hàm khởi tạo), ghi lại endpoint đã gửi và trả kết quả do ca chọn.

| Mã | Bước | Kết quả mong đợi |
|---|---|---|
| PW-B01 | Tài năng đăng nhập, gửi đăng ký hợp lệ | `{ active: true }`; dòng `push_subscriptions` có `talent_id`, `owner_session_id` đúng phiên, `is_active=true`, `deactivated_at` NULL |
| PW-B02 | Gửi lại cùng endpoint, cùng người, phiên mới | Cập nhật dòng cũ sang phiên mới; không tạo dòng thứ hai |
| PW-B03 | Người B gửi endpoint đang bật của người A | 409 `DEVICE_ALREADY_BOUND`; dòng của A không đổi |
| PW-B04 | Endpoint ngoài danh sách (`https://evil.test/x`) | 422 `PUSH_ENDPOINT_INVALID`; không có dòng nào |
| PW-B05 | `p256dh` sai độ dài hoặc không phải điểm P-256 | 422 `PUSH_KEY_INVALID` |
| PW-B06 | Đăng xuất phiên → kiểm dòng đăng ký | `is_active=false`, `deactivated_at` có giá trị (trigger `trg_sessions_detach_push`) |
| PW-B07 | Request đăng ký đến sau khi phiên đã thu hồi | 401 `SESSION_REVOKED`; dòng không bật lại |
| PW-B08 | Thiếu biến VAPID | 503 `PUSH_NOT_CONFIGURED`; các route khác vẫn chạy |
| PW-B09 | Gửi tới đăng ký, bộ gửi giả trả 410 | Đăng ký bị tắt |
| PW-B10 | Tài năng có 2 máy đang bật, gửi một thông báo | Bộ gửi nhận đúng 2 endpoint của tài năng đó, không có máy của người khác |
| PW-B11 | Nội dung gửi đi | Chỉ có `title`, `body`, `url`, `tag`, `badgeCount`; không có email, tên, nội dung bài |
| PW-B12 | Worker chạy lại cùng sự kiện outbox (khi đã dựng worker) | Không tạo thêm dòng `push_deliveries`, không gửi lần hai |
| PW-B13 | Body có trường lạ (`talentId`) | 422 `INPUT_INVALID` |

Khung test đã chạy cho bản demo: `apps/api/src/modules/auth/technology.integration.test.ts` (hai tài khoản, ba máy, đăng xuất một máy, bộ gửi trả 410). Viết lại cho `public.push_subscriptions`.

---

## 3. Ca trên máy thật (MT)

| Mã | Máy | Bước | Kết quả mong đợi |
|---|---|---|---|
| PW-01 | Android | Mở trang, bấm và xem trên 30 giây | Có nút cài; cài xong mở toàn màn hình, đúng tên và biểu tượng |
| PW-02 | iPhone | Safari → Chia sẻ → Add to Home Screen | Biểu tượng đúng; mở toàn màn hình, không có thanh địa chỉ |
| PW-03 | iPhone | Đăng nhập trong Safari rồi mở từ màn hình chính | Ghi lại có phải đăng nhập lại không (HD §3.3) |
| PW-04 | iPhone, Android | Mở link từ ứng dụng Instagram, LINE, TikTok | Hiện hướng dẫn mở bằng trình duyệt thật, có nút sao chép link |
| PW-05 | iPhone chưa cài | Vào màn thông báo | Không có nút bật; có câu hướng dẫn cài |
| PW-06 | Cả hai | Bấm "Allow notifications" | Hộp thoại hệ thống hiện; cho phép xong thì BE có đăng ký (PW-B01) |
| PW-07 | Cả hai | Từ chối quyền | Ứng dụng vẫn dùng được; có hướng dẫn bật trong Cài đặt; không hỏi lặp |
| PW-08 | Cả hai | Đóng ứng dụng, BE gửi push | Thông báo hiện trên màn khóa, nội dung chung chung |
| PW-09 | Cả hai | Bấm thông báo | Mở đúng màn; ứng dụng đang mở thì chuyển màn, không mở cửa sổ mới |
| PW-10 | iPhone | Gửi push có `badgeCount` | Số hiện trên biểu tượng; mở màn thông báo thì cập nhật |
| PW-11 | Cả hai | Gỡ ứng dụng hoặc tắt quyền, rồi gửi push | Máy chủ đẩy trả 404/410; BE tắt đăng ký |
| PW-12 | Cả hai | Đăng xuất A, đăng nhập B trên cùng máy, gửi push cho A | Máy không hiện thông báo của A |
| PW-13 | Cả hai | Phát hành bản mới khi đang mở | Hiện thanh "A new version is available"; bấm thì tải lại đúng bản mới |
| PW-14 | Cả hai | Có bản mới khi đang tải video | Không tự tải lại; tải video không bị mất |
| PW-15 | Cả hai | Bật chế độ máy bay rồi mở ứng dụng | Hiện trang mất mạng; không hiện dữ liệu cũ của tài năng |
| PW-16 | Cả hai | Gửi 3 push cùng `tag` khi máy đang tắt mạng, rồi bật lại | Chỉ hiện thông báo mới nhất |
| PW-17 | Cả hai | Xem header của `/sw.js` | `Cache-Control: no-cache, no-store, must-revalidate` |
| PW-18 | Cả hai | Mở màn quản trị trên cùng máy | Màn quản trị không bị service worker của ứng dụng tài năng điều khiển |
| PW-19 | Cả hai | Đổi cặp khóa VAPID, mở lại ứng dụng | Đăng ký cũ được thay bằng đăng ký mới; push tiếp theo tới được |
| PW-20 | Cả hai | Một tài khoản trên 2 máy, gửi một push | Cả 2 máy nhận; đăng xuất máy 1 thì lần sau chỉ máy 2 nhận |

Cách gửi push để thử khi chưa có worker: dùng bản demo (`ENABLE_AUTH_DEMO=true`, không phải production), hai tài khoản; máy nhận bấm "Allow notifications", máy gửi nhập mã nhận và bấm "Send notification" (HD §7).

Tình trạng ngày 18/11/2026: nhật ký ngrok cho thấy bản demo đã đăng ký tài khoản từ iPhone và đăng nhập từ trình duyệt Windows. Chưa có ca MT nào được ghi kết quả chính thức.
