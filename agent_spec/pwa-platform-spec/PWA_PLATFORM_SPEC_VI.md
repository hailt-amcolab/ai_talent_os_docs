> Bổ sung triển khai demo 18/11/2026: [hợp đồng đã kiểm chứng](../auth-pwa-demo/IMPLEMENTATION.md), [AC](../auth-pwa-demo/AC.md), [test/evidence](../auth-pwa-demo/VALIDATION.md). Trong scope demo, Bearer theo TECH_STACK và PWA scope `/pwa/` ưu tiên hơn ví dụ cookie SSR/root scope cũ bên dưới. Các ca cũ không tự được chuyển thành PASS.

# Đặc tả nền tảng PWA cho ứng dụng tài năng

Bản 1.0 · 17/11/2026 · Dành cho lập trình viên và AI coding agent.

Tài liệu này **chỉ** nói cách biến ứng dụng web của tài năng thành PWA (ứng dụng web cài lên màn hình chính):
- cài lên màn hình chính như một ứng dụng;
- nhận thông báo đẩy;
- service worker, cập nhật phiên bản, trang mất mạng.

Các màn và nghiệp vụ (đăng nhập, AI coach, bản nháp, tải ảnh…) **không** nằm ở đây; xem `SCD/` theo từng chức năng. Bộ cũ `agent_spec/AI_Talent_OS_PWA_Agent_Spec_v1/` trộn cả nghiệp vụ, chỉ dùng để tham khảo.

Ký hiệu: **[Chốt]** có trong tài liệu khách hoặc đã quyết; **[Đề xuất]** đội đề xuất; **[Kiểm chứng]** phải thử trên máy thật trước khi coi là đúng.

## 1. Căn cứ và mục tiêu

| Căn cứ | Nội dung |
|---|---|
| [YK2] §6-12 chức năng 6-8 | Ứng dụng tài năng là PWA, thêm vào màn hình chính, không qua kho ứng dụng [Chốt] |
| [YK2] §6-12 chức năng 6-1 | Tin nhắn trong ứng dụng và thông báo đẩy [Chốt] |
| [YK2] §6-1 chức năng 6-2 | Sau lần đăng nhập đầu, hướng dẫn lần lượt: thêm vào màn hình chính → cho phép thông báo → đăng ký thanh toán → kết nối mạng xã hội [Chốt] |
| [YK2] §11 | Thông báo đẩy trên iPhone cần iOS 16.4 trở lên [Chốt] |
| [YK2] §6-14 | Dùng tên, logo, màu của ứng dụng アデッソ hiện có (khách cung cấp) [Chốt] |
| SCD 6-8, 6-1, 6-2 | Đặc tả chức năng; câu hỏi C6 (Web Push), S09-04 (máy hỗ trợ), B13 (màn mở đầu) |

**Định nghĩa "đạt PWA" cho dự án này** (tiêu chí nghiệm thu chung):
1. Android, Chrome: hiện được nút cài; sau khi cài, mở từ biểu tượng ở chế độ toàn màn hình (không có thanh địa chỉ).
2. iPhone, Safari (iOS 16.4 trở lên): thêm được vào màn hình chính; mở ở chế độ toàn màn hình với tên và biểu tượng của ứng dụng.
3. Trên cả hai: cho phép thông báo, nhận được thông báo đẩy khi ứng dụng đang đóng, bấm vào thì mở đúng màn.
4. Có bản mới: ứng dụng báo và tải lại khi tài năng đồng ý.
5. Mất mạng: mở được ứng dụng và thấy trang báo mất mạng, không lộ dữ liệu cũ.

## 2. Máy và trình duyệt hỗ trợ

[Đề xuất, chờ S09-04]

| Máy | Trình duyệt | Cài lên màn hình chính | Thông báo đẩy |
|---|---|---|---|
| iPhone, iOS 16.4 trở lên | Safari | Thủ công: nút chia sẻ → 「ホーム画面に追加」 | Có, **chỉ khi đã thêm vào màn hình chính** |
| iPhone, iOS 16.4 trở lên | Chrome, Edge… | Chỉ khi trình duyệt đó có quyền đặc biệt của Apple; không ổn định | Như trên, sau khi đã cài |
| iPhone dưới iOS 16.4 | — | Có thể thêm, nhưng không có thông báo đẩy | Không: chỉ xem thông báo trong ứng dụng (T-14) |
| Android | Chrome bản mới nhất và bản trước | Có nút cài (hộp thoại cài của Chrome) | Có, kể cả chưa cài |
| Trình duyệt trong ứng dụng (Instagram, LINE, TikTok) | — | **Không cài được** | Không |

Tài năng thường mở link từ Instagram hoặc LINE, tức là mở trong trình duyệt nằm trong ứng dụng đó. Ứng dụng phải nhận ra trường hợp này và hướng dẫn mở bằng Safari (iPhone) hoặc Chrome (Android) (mục 4.3).

## 3. Tệp mô tả ứng dụng (manifest)

Dùng tệp quy ước của Next.js App Router `app/manifest.ts` (Next.js tự phục vụ tại `/manifest.webmanifest`).

```ts
// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',                       // định danh cố định, không đổi sau khi phát hành
    name: '<tên ứng dụng アデッソ>',  // khách cung cấp (C-06)
    short_name: '<tên ngắn>',       // hiện dưới biểu tượng, khoảng 12 ký tự
    start_url: '/home',             // màn mở đầu (B13); trang này tự chuyển tới /login nếu chưa đăng nhập
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'ja',
    background_color: '#ffffff',    // tạm, theo màu của khách
    theme_color: '#ffffff',         // tạm, theo màu của khách
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
```

Quy tắc:
- **Bắt buộc để Chrome cho cài:** HTTPS; có `name` hoặc `short_name`; biểu tượng 192 px và 512 px; có `start_url`; `display` là `standalone` (hoặc `fullscreen`, `minimal-ui`); không đặt `prefer_related_applications: true`. Ngoài ra Chrome chỉ hiện gợi ý cài khi người dùng đã bấm vào trang ít nhất một lần và xem trang ít nhất 30 giây (web.dev, Install criteria).
- **Bắt buộc để iPhone mở như ứng dụng:** `display` là `standalone` hoặc `fullscreen`. Nếu không có, iPhone chỉ lưu như một dấu trang (WebKit blog 13878).
- Biểu tượng maskable phải để logo nằm trong vùng an toàn (hình tròn ở giữa, khoảng 80%), vì Android cắt theo hình của máy.
- Thêm cho iPhone trong `app/layout.tsx`:

```ts
export const metadata = {
  appleWebApp: { capable: true, title: '<tên ngắn>', statusBarStyle: 'default' },
  icons: { apple: '/icons/apple-touch-icon-180.png' },   // iPhone dùng biểu tượng này khi thêm vào màn hình chính
}
export const viewport = { themeColor: '#ffffff', viewportFit: 'cover' }
```

- **Không đổi `id`** sau khi phát hành; đổi `id` thì máy coi là ứng dụng khác.
- Biểu tượng và tên chờ khách (C-06). Trong lúc chờ dùng ảnh tạm, nhưng phải thay trước UAT (kiểm thử chấp nhận).

## 4. Cài lên màn hình chính

### 4.1. Nhận biết đã cài hay chưa

```ts
export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches
    || (navigator as any).standalone === true          // Safari iPhone
}
```

Đã cài thì không hiện hướng dẫn cài. Gửi kèm trạng thái này lên server (ví dụ header `X-Display-Mode`) để màn quản trị biết tài năng đã cài chưa (6-2: quản lý xem tiến độ hướng dẫn lần đầu).

### 4.2. Android: nút cài

```ts
let deferred: any = null
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; showInstallButton() })
async function onInstallClick() { await deferred?.prompt(); deferred = null }
window.addEventListener('appinstalled', () => markInstalled())
```

- Chỉ hiện nút khi đã nhận `beforeinstallprompt`. Không nhận được thì hiện hướng dẫn bằng chữ: menu ⋮ → 「アプリをインストール」 hoặc 「ホーム画面に追加」.
- Sự kiện này không có trên iPhone và Firefox; không được dựa vào nó làm đường duy nhất.

### 4.3. iPhone: hướng dẫn thủ công

iPhone không có nút cài do ứng dụng gọi. Màn hướng dẫn (bước 1 của 6-2) gồm 3 bước có hình:
1. Bấm nút chia sẻ (ô vuông có mũi tên) ở thanh dưới của Safari.
2. Chọn 「ホーム画面に追加」.
3. Bấm 「追加」, rồi mở ứng dụng từ biểu tượng mới trên màn hình chính.

Nhận biết các trường hợp phải xử lý riêng:

| Trường hợp | Cách nhận biết | Hiện cho tài năng |
|---|---|---|
| Đang ở trình duyệt trong ứng dụng Instagram, LINE, TikTok | User agent có `Instagram`, `Line/`, `musical_ly` / `BytedanceWebview` [Kiểm chứng danh sách] | "Safari で開いてください" kèm nút sao chép link |
| iPhone nhưng không phải Safari | User agent có `CriOS`, `FxiOS`, `EdgiOS` | Hướng dẫn mở bằng Safari |
| iOS dưới 16.4 | Phiên bản trong user agent | Vẫn cài được, nhưng báo không có thông báo đẩy |

Nhận biết bằng user agent chỉ dùng để chọn **câu hướng dẫn**; việc có hỗ trợ hay không thì dùng kiểm tra tính năng (`'PushManager' in window`, `'serviceWorker' in navigator`).

### 4.4. Đăng nhập lại sau khi cài trên iPhone [Kiểm chứng]

Trên iPhone, ứng dụng đã thêm vào màn hình chính có **cookie và bộ nhớ riêng, không dùng chung với Safari**. Tài năng đã đăng nhập trong Safari thì khi mở từ màn hình chính vẫn phải đăng nhập lại.

Hệ quả cho thứ tự hướng dẫn lần đầu (6-2):
- Đăng nhập lần đầu bằng mật khẩu tạm và đặt mật khẩu mới trong Safari, rồi hướng dẫn thêm vào màn hình chính.
- Màn cuối của hướng dẫn cài ghi rõ: "ホーム画面のアイコンから開いて、もう一度ログインしてください".
- Các bước sau (cho phép thông báo, thanh toán, kết nối mạng xã hội) làm **trong ứng dụng đã cài**. Riêng thông báo đẩy trên iPhone bắt buộc phải ở trong ứng dụng đã cài.
- Thử trên iPhone thật ngay tuần đầu; nếu iOS mới đã chia sẻ đăng nhập thì bỏ câu nhắc này.

## 5. Service worker

### 5.1. Đăng ký

- Tệp `public/sw.js`, phục vụ tại `/sw.js`, phạm vi `/`. Viết tay, ngắn (mục 5.3). Chỉ dùng thư viện như Serwist khi cần lưu ngoại tuyến phức tạp hơn mục 5.2.
- Đăng ký một lần ở layout gốc, phía trình duyệt:

```ts
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' })
}
```

- Header cho `/sw.js` (trong `next.config.js`):

```js
{ source: '/sw.js', headers: [
  { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
  { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'" },
] }
```

- Màn quản trị đặt ở **tên miền riêng** (ví dụ `admin.<domain>`) để service worker của ứng dụng tài năng không chạm vào màn quản trị.

### 5.2. Lưu ngoại tuyến

Chỉ lưu những thứ công khai và không đổi:

| Lưu | Cách | Không lưu |
|---|---|---|
| `/_next/static/**` (tệp có hash) | Lấy từ bộ nhớ trước, không có thì tải | Mọi `/api/**` |
| `/icons/**`, phông chữ, hình mascot モモ | Như trên | Trang HTML đã đăng nhập, dữ liệu RSC |
| `/offline` (trang chung, không có dữ liệu người dùng) | Lưu sẵn khi cài service worker | Ảnh, video riêng của tài năng |

Khi mở trang mà mất mạng: trả trang `/offline` với câu 「オフラインです。通信できる場所でもう一度お試しください。」. Không xếp hàng gửi lại thao tác (chấp nhận bài, thanh toán…) khi có mạng trở lại.

Đăng xuất: xóa dữ liệu trong bộ nhớ của trang; không cần xóa cache vì cache chỉ chứa tệp công khai.

### 5.3. Mã service worker tối thiểu

```js
// public/sw.js
const VERSION = 'v1'                       // tăng mỗi lần đổi danh sách tệp lưu sẵn
const CACHE = `talent-static-${VERSION}`

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['/offline'])))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k.startsWith('talent-static-') && k !== CACHE).map((k) => caches.delete(k)))))
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('/offline')))
    return
  }
  if (url.origin === location.origin && (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/'))) {
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return res
    })))
  }
  // các request khác: để trình duyệt tự xử lý (đi thẳng ra mạng)
})

self.addEventListener('message', (e) => { if (e.data === 'SKIP_WAITING') self.skipWaiting() })

// thông báo đẩy: mục 6.4
```

### 5.4. Cập nhật phiên bản

1. Trình duyệt tự kiểm `/sw.js` khi mở ứng dụng. Có bản mới thì bản mới ở trạng thái chờ (`waiting`).
2. Trang nghe `registration.onupdatefound`. Khi bản mới đã cài xong, hiện thanh 「新しいバージョンがあります」 với nút 「更新」.
3. Bấm 「更新」: gửi `SKIP_WAITING`, nghe `controllerchange` rồi tải lại trang.
4. **Không tự tải lại** khi đang gõ tin nhắn, đang tải ảnh hoặc video, đang ở màn thanh toán. Lúc đó chỉ hiện thanh, để tài năng bấm sau.
5. Server trả `minimumClientVersion` trong cấu hình chung. Bản đang chạy cũ hơn mức này thì bắt buộc cập nhật (chỉ dùng khi API thay đổi không tương thích).

## 6. Thông báo đẩy

### 6.1. Cách làm [Chốt theo đề xuất C6]

Dùng Web Push chuẩn với khóa VAPID (khóa định danh máy chủ gửi). Không cần dịch vụ ngoài và không mất phí.
- Trình duyệt đăng ký với máy chủ đẩy của chính nó: Apple (`*.push.apple.com`), Google (FCM), Mozilla.
- Worker trên VPS gửi bằng thư viện `web-push` (Node.js).
- Trên iPhone, thông báo đẩy dùng dịch vụ của Apple nhưng **không cần tài khoản Apple Developer** (WebKit blog 13878).

Biến môi trường:

```dotenv
NEXT_PUBLIC_VAPID_PUBLIC_KEY=<khóa công khai>      # trình duyệt dùng khi đăng ký
VAPID_PRIVATE_KEY=<khóa bí mật>                    # chỉ worker; không bao giờ ra trình duyệt
VAPID_SUBJECT=mailto:<email vận hành>              # hoặc https://<domain>
```

Tạo khóa một lần bằng `npx web-push generate-vapid-keys`. Mỗi môi trường (thử, chính thức) một cặp khóa. **Đổi khóa thì mọi đăng ký cũ mất hiệu lực**, tài năng phải cho phép lại.

### 6.2. Xin quyền và đăng ký

Thứ tự trong hướng dẫn lần đầu (6-2, bước 2) và màn cài đặt thông báo:

```ts
async function enablePush() {                       // gọi trực tiếp trong onClick của nút
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return showUnsupported()
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return showDeniedHelp()
  const reg = await navigator.serviceWorker.ready
  const sub = (await reg.pushManager.getSubscription())
    ?? await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!) })
  await fetch('/api/v1/me/push-subscriptions', { method: 'POST', body: JSON.stringify(sub), headers: { 'Content-Type': 'application/json' } })
}
```

Quy tắc:
- **Chỉ xin quyền khi tài năng bấm nút** (iPhone bắt buộc; Chrome cũng chặn hoặc ẩn hộp thoại xin quyền nếu tự bật khi tải trang). Trước nút có một câu giải thích vì sao cần thông báo (ví dụ "毎朝8時にモモからテーマが届きます").
- iPhone chưa cài: không hiện nút; hiện câu "ホーム画面に追加すると通知を受け取れます".
- Đã từ chối (`denied`): trình duyệt không cho hỏi lại. Hiện hướng dẫn bật trong Cài đặt của máy; không hỏi lặp.
- Chỉ báo "đã bật" khi server đã lưu đăng ký thành công.
- Mỗi máy một đăng ký. Một tài năng có thể có nhiều máy.

### 6.3. Lưu đăng ký và hủy

Thông tin server cần giữ cho mỗi máy (cấu trúc bảng sẽ dựng sau): tài năng, `endpoint`, khóa `p256dh` và `auth`, thời điểm tạo, lần gửi thành công gần nhất, trạng thái còn dùng hay đã tắt.
- `endpoint` là duy nhất. Đăng ký lại cùng `endpoint` thì cập nhật, không tạo bản ghi mới.
- **Đăng xuất:** gọi server tắt đăng ký của máy này **trước**, rồi `subscription.unsubscribe()`. Người khác đăng nhập trên cùng máy không được nhận thông báo của người trước.
- Tài năng chuyển sang 利用終了 (đã ngừng): server tắt mọi đăng ký của tài năng đó.
- Mở ứng dụng: so `getSubscription()` với server; lệch thì gửi lại (đăng ký trên máy có thể đổi mà không báo).

### 6.4. Nhận và bấm thông báo (trong `sw.js`)

```js
self.addEventListener('push', (e) => {
  const d = e.data ? e.data.json() : {}
  const title = d.title || 'お知らせ'
  e.waitUntil(Promise.all([
    self.registration.showNotification(title, {
      body: d.body || '',
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',          // Android: biểu tượng đơn sắc trên thanh trạng thái
      tag: d.tag,                             // cùng tag thì thay thông báo cũ, không chồng
      data: { url: d.url || '/notifications' },
    }),
    d.badgeCount != null && self.navigator.setAppBadge ? self.navigator.setAppBadge(d.badgeCount) : null,
  ]))
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  const path = new URL(e.notification.data.url, location.origin)
  const target = path.origin === location.origin ? path.href : location.origin + '/notifications'   // chỉ mở trong ứng dụng
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) if ('focus' in c) { c.navigate(target); return c.focus() }
    return clients.openWindow(target)
  }))
})
```

Quy tắc:
- **Mỗi lần nhận push phải hiện một thông báo.** Safari thu hồi đăng ký của trang nhận push mà không hiện gì (WebKit blog 16535). Không dùng push để đồng bộ ngầm.
- Số trên biểu tượng ứng dụng (badge) dùng Badging API (`setAppBadge`, `clearAppBadge`). iPhone hỗ trợ cho ứng dụng đã cài, kể cả khi đang chạy nền xử lý push (WebKit blog 13878). Mở danh sách thông báo (T-14) thì cập nhật lại số.
- Nội dung lên màn khóa phải **chung chung, không có thông tin nhạy cảm** (ví dụ chuyện sức khỏe). Chi tiết chỉ hiện sau khi mở ứng dụng và đăng nhập.
- Đường dẫn trong thông báo chỉ là đường dẫn trong ứng dụng (ví dụ `/drafts/<id>`). Màn mở ra tự kiểm quyền như bình thường.

### 6.5. Gửi từ worker

```ts
import webpush from 'web-push'
webpush.setVapidDetails(process.env.VAPID_SUBJECT!, process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!)

await webpush.sendNotification(sub, JSON.stringify({ title, body, url, tag, badgeCount }), {
  TTL: 60 * 60 * 6,            // giữ tối đa 6 giờ nếu máy đang tắt; quá hạn thì bỏ
  urgency: 'normal',           // 'high' cho việc gấp (ví dụ sắp hết hạn duyệt)
  topic: tag,                  // máy đang tắt chỉ nhận bản mới nhất của cùng loại
})
```

| Kết quả từ máy chủ đẩy | Xử lý |
|---|---|
| 201 | Ghi lần gửi thành công |
| **404, 410** | Đăng ký đã hết: tắt bản ghi, không gửi nữa |
| 413 | Nội dung quá dài (giữ dưới khoảng 4 KB): sửa nội dung, không thử lại |
| 429, 5xx | Thử lại có giới hạn (tối đa 3 lần, giãn cách tăng dần), trong TTL |
| 400, 403 | Lỗi khóa VAPID hoặc cấu hình: báo vận hành, không thử lại từng máy |

- Thông báo nào cũng **ghi vào danh sách thông báo trong ứng dụng trước** (T-14), rồi mới đẩy. Push không đến thì tài năng vẫn thấy khi mở ứng dụng.
- Push không đảm bảo đúng giờ: giờ nhắn 8:00 do worker gửi đúng giờ, máy có thể nhận trễ.
- Danh sách loại thông báo và câu chữ: SCD C-05, 6-1, 7-4 (câu chữ tiếng Nhật do khách duyệt).

### 6.6. Declarative Web Push (iOS 18.4 trở lên)

Từ iOS và iPadOS 18.4, Safari nhận được thông báo khai báo sẵn trong nội dung push (`"web_push": 8030` và `notification` gồm `title`, `body`, `navigate`, `app_badge`) mà không cần service worker xử lý (WebKit blog 16535). Bản đầu **không dùng**, vì phải hỗ trợ iOS 16.4. Có thể thêm sau để thông báo trên iPhone ổn định hơn: máy cũ vẫn chạy qua sự kiện `push` như mục 6.4.

## 7. Phát triển và kiểm thử

### 7.1. Môi trường

- Chạy máy lập trình có HTTPS: `next dev --experimental-https`.
- Thử trên điện thoại thật cần HTTPS công khai: dùng bản xem trước (preview) của Vercel hoặc đường hầm (tunnel). Đăng ký push gắn với tên miền: đổi tên miền là phải đăng ký lại.
- Android: Chrome DevTools → Application → Manifest (xem lỗi điều kiện cài), Service Workers, Push.
- iPhone: Safari trên Mac → Develop → chọn iPhone (Web Inspector) để xem lỗi của ứng dụng đã cài.
- Lighthouse đã bỏ mục chấm điểm PWA từ bản 12, nên **không dùng điểm Lighthouse** làm tiêu chí. Dùng danh sách ở mục 7.2.

### 7.2. Ca kiểm thử trên máy thật

Máy tối thiểu: một iPhone iOS 16.4–17, một iPhone iOS mới nhất, một máy Android có Chrome bản mới nhất.

| Mã | Máy | Thao tác | Kết quả bắt buộc |
|---|---|---|---|
| PW-01 | Android | Mở trang, bấm và xem trên 30 giây | Có nút cài; cài xong mở toàn màn hình, đúng tên và biểu tượng |
| PW-02 | iPhone | Safari → chia sẻ → ホーム画面に追加 | Biểu tượng đúng; mở toàn màn hình, không có thanh địa chỉ |
| PW-03 | iPhone | Đăng nhập trong Safari rồi mở từ màn hình chính | Ghi lại có phải đăng nhập lại không (mục 4.4) |
| PW-04 | iPhone | Mở link từ ứng dụng Instagram, LINE | Hiện hướng dẫn mở bằng Safari, có nút sao chép link |
| PW-05 | iPhone chưa cài | Vào màn thông báo | Không có nút bật; có câu hướng dẫn cài |
| PW-06 | Cả hai | Bấm 「通知を許可」 | Hộp thoại hệ thống hiện; cho phép xong thì server có đăng ký |
| PW-07 | Cả hai | Từ chối quyền | Ứng dụng vẫn dùng được; có hướng dẫn bật trong Cài đặt; không hỏi lặp |
| PW-08 | Cả hai | Đóng ứng dụng, worker gửi push | Thông báo hiện trên màn khóa, nội dung chung chung |
| PW-09 | Cả hai | Bấm thông báo | Mở đúng màn trong ứng dụng; ứng dụng đang mở thì chuyển màn, không mở cửa sổ mới |
| PW-10 | iPhone | Gửi push có số badge | Số hiện trên biểu tượng; mở T-14 thì cập nhật |
| PW-11 | Cả hai | Gỡ ứng dụng hoặc tắt quyền, rồi gửi push | Máy chủ đẩy trả 404/410; server tắt đăng ký |
| PW-12 | Cả hai | Đăng xuất A, đăng nhập B trên cùng máy, gửi push cho A | Máy không hiện thông báo của A |
| PW-13 | Cả hai | Phát hành bản mới khi đang mở | Hiện thanh 「新しいバージョンがあります」; bấm thì tải lại đúng bản mới |
| PW-14 | Cả hai | Có bản mới khi đang tải video | Không tự tải lại; tải video không bị mất |
| PW-15 | Cả hai | Bật chế độ máy bay rồi mở ứng dụng | Hiện trang オフライン; không hiện dữ liệu cũ của tài năng |
| PW-16 | Cả hai | Gửi 3 push cùng `tag` khi máy đang tắt mạng, rồi bật lại | Chỉ hiện thông báo mới nhất |
| PW-17 | Cả hai | Xem header của `/sw.js` | `Cache-Control: no-cache, no-store, must-revalidate` |
| PW-18 | Cả hai | Mở màn quản trị trên cùng máy | Màn quản trị không bị service worker của ứng dụng tài năng điều khiển |

## 8. Thứ tự làm

1. Manifest, biểu tượng tạm, metadata cho iPhone; kiểm PW-01, PW-02.
2. `sw.js` tối thiểu (mục 5.3), trang `/offline`, header; kiểm PW-15, PW-17, PW-18.
3. Màn hướng dẫn cài (mục 4), nhận biết trình duyệt trong ứng dụng; kiểm PW-03, PW-04.
4. Khóa VAPID, xin quyền và đăng ký, API lưu đăng ký; kiểm PW-05 đến PW-07.
5. Worker gửi push, xử lý mã lỗi, badge, bấm thông báo; kiểm PW-08 đến PW-12, PW-16.
6. Cập nhật phiên bản; kiểm PW-13, PW-14.

Bước 1–3 không phụ thuộc nghiệp vụ, làm được ngay. Bước 4–5 cần đăng nhập (EP01) và danh sách thông báo (6-1).

## 9. Câu hỏi còn mở

| Mã | Nội dung | Giả định tạm |
|---|---|---|
| C-06 | Tên, logo, màu của ứng dụng アデッソ | Ảnh và màu tạm, thay trước UAT |
| S09-04 | Máy và trình duyệt hỗ trợ | Như mục 2 |
| B13 | Màn mở đầu (`start_url`) | `/home` (T-07) |
| C6 | Cơ chế thông báo đẩy | Web Push, không dịch vụ ngoài |
| Mới | iPhone có bắt đăng nhập lại sau khi cài không (mục 4.4) | Có; kiểm PW-03 tuần đầu |
| Mới | Danh sách user agent của trình duyệt trong Instagram, LINE, TikTok | Như mục 4.3; kiểm PW-04 |

## 10. Nguồn

- [YK2] §6-12 (6-1, 6-8), §6-1 (6-2), §6-14, §11. SCD EP09 6-8, 6-1; EP01 6-2; EP10 C-05.
- Next.js, "How to build a Progressive Web Application (PWA) with Next.js": https://nextjs.org/docs/app/guides/progressive-web-apps (manifest, web-push, khóa VAPID, header của `sw.js`, `next dev --experimental-https`).
- web.dev, "What does it take to be installable?": https://web.dev/articles/install-criteria (điều kiện cài của Chrome).
- WebKit, "Web Push for Web Apps on iOS and iPadOS": https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ (iOS 16.4, thêm vào màn hình chính, xin quyền khi người dùng thao tác, `display`, Badging API, `*.push.apple.com`).
- WebKit, "Meet Declarative Web Push": https://webkit.org/blog/16535/meet-declarative-web-push/ (iOS 18.4; thu hồi đăng ký khi push không hiện thông báo).
- MDN, Service Worker API và PushManager.subscribe.

Đọc ngày 17/11/2026. Mục 4.4 và danh sách user agent ở 4.3 là hiểu biết của đội, chưa có nguồn chính thức; phải kiểm trên máy thật.
