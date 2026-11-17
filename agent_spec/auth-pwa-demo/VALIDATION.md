# Kiểm chứng demo công nghệ sau khi thu gọn

- Backend: **27 PASS, 0 fail, 0 skip** trên PostgreSQL local. Có self-registration không tạo domain entity, A gửi hai devices B bằng adapter Web Push giả, logout/ownership, TOTP và strict HTTP contract.
- Frontend: **7 PASS** cho API error/platform/SW. Build production và API typecheck qua; real Supabase đã qua self-registration hai account, login browser thứ hai, TOTP, offline và login sau TOTP (5 PASS); native push NOT_RUN.
- Migration `20261118000100_technology_demo`: đã apply local và Supabase dev; safe Prisma diff **No difference detected**. Không chỉnh/xóa lịch sử migration cũ.
- HTTPS smoke: frontend, manifest, API Origin/validation và auth guard đều PASS qua tunnel công khai.
- VAPID: private/public đúng cặp, frontend public key khớp BE; kiểm bằng ECDH và web-push validation, không in keys.
- Supabase catalog: 38 bảng ứng dụng, 0 thiếu RLS, 0 browser-role grants; runtime không superuser/BYPASSRLS.
- Browser hiện tại: [browser-results.json](evidence/browser-results.json). Chỉ report `scope: technology only` áp dụng cho demo hiện hành; kết quả duyệt đơn cũ không còn được dùng.
- Native push trên Chromium tự động có thể không đăng ký được FCM; khi đó ghi **NOT_RUN**, không suy ra Android/iPhone đã nhận.
- **Chưa có bằng chứng thiết bị thật:** iPhone/Android nhận background Web Push, click/cold start và hai account/two-device. Người dùng có thể kiểm theo [RUNBOOK](RUNBOOK.md) qua HTTPS demo. Provider accepted không thay thế OS display evidence.

Không phê duyệt production bằng POC này: auto-confirm dev-only, chưa recovery/retention/production anti-spam. Mục đích là xác minh các adapter và cách lắp theo kiến trúc.
