# Hợp đồng demo công nghệ

Theo kiến trúc sẵn có: Next.js chỉ UI; tất cả domain API gọi qua `apps/web/lib/api/client.ts` tới Hono. Composition root `apps/api/src/container.ts` inject service/provider/database. Không Next API route/server action, không FE query Supabase DB.

## Auth / TOTP

- Email + password. Mặc định adapter hỗ trợ Supabase `signUp`, trả `confirmation_required` nếu project yêu cầu email verification. Cấu hình demo hiện tại bật `DEMO_AUTO_CONFIRM_EMAIL=true`: BE dùng admin SDK tạo tài khoản đã xác nhận và đăng nhập ngay, không SMTP, không duyệt đơn. Đây là ngoại lệ dev-only minh bạch, không chứng minh quy trình email production.
- `ENABLE_AUTH_DEMO` mặc định false và bị từ chối trong production. Auto-confirm cần secret key chỉ ở BE; frontend chỉ dùng publishable key. Không tạo Manager/Talent/principal/application.
- FE SDK giữ/refresh session. BE kiểm chữ ký/issuer/audience + gọi provider user, không tin dữ liệu session FE để cấp quyền. Bảng `tech_demo_sessions` ghi session provider để logout thu hồi access tại BE ngay cả khi JWT chưa hết hạn.
- Chưa có factor: có thể dùng demo và tự chọn đăng ký TOTP ở Home. Đã có factor verified: login mới aal1 bị chặn API push cho đến verify lên aal2. Không gắn TOTP với vai trò Manager.
- Enroll/challenge/verify dùng caller JWT, không admin key. QR/secret chỉ response enroll và memory UI; options không có secret; ẩn QR khi tab hidden. Chỉ reset factor unverified khi chưa có verified factor. Không recovery/bypass.
- Challenge/verify/replay/expiry do Supabase MFA kiểm; BE kiểm factor thuộc caller, rate limit và user/session/aal của kết quả. Không xây thêm application challenge state machine cho POC.

## Web Push đa thiết bị, chéo tài khoản

1. Thiết bị B login, bấm cho phép thông báo → browser native subscription → BE persist. Chỉ báo ON sau BE thành công.
2. Home B hiển thị mã nhận là Auth user UUID, không công khai danh sách email. B chia sẻ mã cho A. Đây là địa chỉ nhận của demo, **không phải mã đăng nhập hoặc secret authorization**.
3. A nhập mã B, bấm gửi → BE xác thực A (kể cả TOTP nếu đã bật), giới hạn 5 lần/phút/sender và 10 lần/phút/recipient, gửi generic Web Push tới các subscription active của B. Có thể gửi tới chính mình.
4. Không nhập nội dung tùy ý, không broadcast toàn bộ người dùng. Việc chia sẻ mã và bật notification là opt-in cho demo; production cần thiết kế quyền liên lạc/chống spam riêng.
5. Mỗi endpoint bind với session/user bằng composite FK; endpoint active của account khác không bị chiếm. Logout giữ session lock rồi deactivate subscription; subscribe cùng lock để không tái kích hoạt sau logout.
6. Fanout synchronous, tối đa 50 devices, concurrency5; không cần worker/queue. HTTP Web Push timeout15s; không retry ngầm. 404/410 deactivate; lỗi khác đếm failed để người dùng thử lại.
7. Response `{targeted,accepted,gone,failed}`: accepted là push provider nhận request, không đảm bảo OS đã hiển thị. Payload chỉ thông báo test, không PII; tag ngẫu nhiên, click vào `/pwa/home`.

PWA `scope=/pwa/`, `start_url=/pwa/home`; login/register/mfa trong scope. Cache chỉ public static và generic offline; không API/HTML riêng tư/QR/JWT/RSC. SW mới chỉ activate khi người dùng chọn cập nhật.

## Database / contract

Migration `20261118000100_technology_demo` thêm `app_private.tech_demo_sessions` và `tech_demo_push_subscriptions`, RLS, FK tới Auth external và runtime ACL. Migration cũ đã áp không chỉnh/xóa; bảng nghiệp vụ cũ không được demo ghi thêm. Limiter dùng `auth_rate_buckets` existing. Prisma safe diff inventory toàn bộ Auth; không db push/reset.

OpenAPI sinh từ Hono; `npm run api:types` trong web sinh types FE. Hai response login/register khác nhau rõ ràng, nullable state của registration dùng union để không làm sai component ref OpenAPI.
