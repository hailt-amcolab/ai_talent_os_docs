> Bổ sung triển khai demo 18/11/2026: [hợp đồng đã kiểm chứng](../auth-pwa-demo/IMPLEMENTATION.md), [AC](../auth-pwa-demo/AC.md), [test/evidence](../auth-pwa-demo/VALIDATION.md). Trong scope demo, Bearer theo TECH_STACK và PWA scope `/pwa/` ưu tiên hơn ví dụ cookie SSR/root scope cũ bên dưới. Các ca cũ không tự được chuyển thành PASS.

# Supabase Database và Auth với Authenticator và SMS

Phiên bản1.3 ngày17/11/2026. **Quyết định:** đợt đầu chỉ code Authenticator TOTP; SMS giữ đặc tả để bàn với khách, chưa code; không làm OTP qua email; khóa 5 lần sai mật khẩu làm ở BE (AU05). **Authenticator TOTP6 số/QR là phương án mặc định. SMS được giữ như tùy chọn cấu hình.** Manager chỉ cần một MFA đã verified và được policy cho phép; không bắt cả hai trong một lần login.

## Đọc theo thứ tự

1. MFA_POLICY_AND_REQUIREMENTS_VI.md: nghĩa đoạn trích, CR-MFA-02, mặc định TOTP và điều kiện SMS.
2. SUPABASE_DATABASE_AUTH_IMPLEMENTATION_VI.md: Database/Auth/session/provisioning/RLS.
3. AUTHENTICATOR_TOTP_IMPLEMENTATION_VI.md: QR, login, đổi/mất Authenticator và recovery.
4. SMS_MFA_IMPLEMENTATION_VI.md: nhánh SMS tùy chọn, gửi lại/timeout/đổi số/provider/chi phí.
5. AUTH_GUARD_ALGORITHM_VI.md / DATA_DICTIONARY_VI.md: proof theo method, quyền và dữ liệu.
6. API_ENDPOINTS.md / API_CONTRACTS.schema.json / CONTRACT_EXAMPLES.json: 29 schema, contract chọn method rõ ràng và dữ liệu mock.
7. examples/*.ts / sql/0001_core_reference.sql: mẫu SDK cả hai phương thức và DB core, chưa build/migrate thật.
8. CONFIGURATION_RUNBOOK_VI.md / .env.example / RLS_PERMISSION_MATRIX.json: cấu hình, default SMS tắt tới khi được duyệt/cấu hình.
9. TEST_CASES_VI.md / TEST_CASES.json / FEATURE_CASE_MATRIX.json: 158 ca, tất cả NOT_RUN.
10. CHANGELOG_VI.md / COMPATIBILITY_NOTES.md / SOURCE_MANIFEST.json / VALIDATION.md.

## Giao việc cho coding agent

Đọc policy trước. Đợt đầu chỉ code TOTP qua adapter; chưa triển khai phone_sms. Tài liệu SMS chỉ để thảo luận và phải được duyệt riêng trước khi triển khai. Không xóa TOTP hoặc ép phone proof sau TOTP. Enroll/challenge phân nhánh method; verify lấy method/factor từ server. Mỗi admin use case kiểm JWT, role, registry, idle và proof thuộc allowedMethods. Không auto-enroll hoặc fallback email/password-only khi mất yếu tố. Không log QR/secret/code/token; QR chỉ hiển thị một lần. Giữ limiter/cooldown/budget của SMS và không gửi tin thật từ ví dụ.

Đoạn trích người dùng nói SMS sẽ trao đổi ở giai đoạn yêu cầu; có spec/SDK SMS không đồng nghĩa đã bật production hoặc khách duyệt chi phí. BảnZIP giữ tên v1, nội dung là1.2. Chưa chạy Supabase/Auth/SMTP/SMS integration.
