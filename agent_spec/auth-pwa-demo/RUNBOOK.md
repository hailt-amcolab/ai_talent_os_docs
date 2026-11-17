# Chạy demo công nghệ gọn

## Cấu hình / khởi động

Node22.18+. `npm ci` trong từng app. API `.env`: runtime DATABASE_URL, owner DIRECT_URL chỉ cho migration, `ENABLE_AUTH_DEMO=true`, `NODE_ENV=development`, Supabase URL/publishable key, VAPID public/private/subject. `DEMO_AUTO_CONFIRM_EMAIL=true` + secret key BE cho demo tự đăng ký dùng ngay không SMTP; false dùng native signUp/email confirmation. Không bật demo trong production.

Web `.env`: Supabase public URL/key, VAPID public giống BE, `NEXT_PUBLIC_API_URL=` rỗng để gọi `/api` cùng origin qua gateway. Public env đổi phải build lại. Không cần `.env.demo.local`/Manager CLI/worker nữa; credential file cũ không được đọc.

```sh
# apps/api
npm run db:migrate
npm run dev
# terminal khác trong apps/api
npm run demo:proxy
# apps/web
npm run build
npm start -- --hostname 127.0.0.1
```

Mở **http://localhost:3090/pwa/login**. Gateway CLI chuyển `/api/*` sang Hono8080, còn lại Next3000. Không phải Next API route. Nếu muốn chạy trực tiếp FE3000, đặt API_URL=http://localhost:8080 rồi build lại.

## HTTPS / thiết bị khác

```sh
cloudflared tunnel --config /dev/null --url http://localhost:3090 --no-autoupdate --protocol http2
```

Lấy URL HTTPS từ log; thêm origin chính xác vào API `CORS_ORIGINS`, restart API. Cấu hình trống tránh ingress cloudflared có sẵn chuyển nhầm 404. Quick tunnel URL chỉ tồn tại khi tiến trình/máy đang chạy, không phải hosting cố định. Không cần hai URL riêng FE/BE.

## Thử gửi giữa hai tài khoản / thiết bị thật

1. Điện thoại B mở URL HTTPS `/pwa/register`, tự đăng ký tài khoản B. iPhone: Safari → Share → Add to Home Screen, rồi mở icon và login lại. iOS16.4+ mới nhận push qua PWA đã cài.
2. B bấm **通知を許可**, đồng ý permission; màn phải báo đã bật. Copy **あなたの受信コード** (mã nhận).
3. Máy tính/điện thoại A mở cùng URL, đăng ký hoặc login tài khoản A. Nhập mã B vào **相手の受信コード**, bấm **通知を送る**.
4. B đóng trang/app (giữ quyền notification và kết nối mạng), kiểm tra thông báo hệ điều hành. Bấm thông báo mở Home. Ghi nhận máy/OS/browser/thời điểm/counters + thực tế nhận, không dùng accepted làm bằng chứng OS hiển thị.
5. Thêm thiết bị C login B, bật notification → gửi lại từ A, cả B/C nhận. Logout trên B → lần sau chỉ C nhận. Thử account khác để phát hiện gửi nhầm.

Sender không cần bật nhận notification. Receiver phải có native subscription thật; gọi `showNotification()` local không chứng minh Web Push từ server.

## Kiểm thử

API `npm run typecheck`, `npm test` với `TEST_DATABASE_URL` local đã bootstrap+migrate; không trỏ TEST_DATABASE_URL tới Supabase. Web `npm run api:types`, `npm test`, `npm run lint`, `npm run build`, `npm run typecheck:e2e`.

E2E dev-only: `RUN_SUPABASE_DEMO_E2E=1 node e2e/auth-pwa-demo.mts` (cài Chromium qua Playwright, hoặc `BROWSER_EXECUTABLE`). Script tạo hai account test riêng rồi xóa đúng account của run đó; không dùng operator credential. Nếu native push không được Chromium hỗ trợ, report NOT_RUN, không giả PASS.

Supabase history giữ nguyên; không reset/xóa bảng nghiệp vụ cũ. Hai bảng tech demo có RLS/private ACL. Muốn dừng demo: dừng tunnel/API hoặc tắt ENABLE_AUTH_DEMO. Không cần worker, outbox hay cron. Chưa làm retention/recovery/production anti-spam.

Kiểm tra HTTPS FE/API/CORS mà không tạo account: trong API chạy `npm run demo:smoke -- https://URL-DEMO`.
