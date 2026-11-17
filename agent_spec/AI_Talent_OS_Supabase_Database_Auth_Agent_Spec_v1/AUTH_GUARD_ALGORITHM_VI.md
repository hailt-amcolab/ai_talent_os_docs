# Thuật toán kiểm tra quyền và phiên bản1.2

1. Xác minh JWT bằng SDK getClaims/getUser phù hợp, không decode không chữ ký. Lấy sub/session_id/aal từ token đã xác minh.
2. Đọc app_user/membership enabled, security_version và registry. Phiên chưa có registry hoặc thuộc recovery/first-password chỉ vào allowlist Auth completion, không dữ liệu domain.
3. Kiểm revoke/absolute expiry; không reset auth_time mỗi refresh. Manager idle30 phút theo nguồn, không polling kéo dài; quá hạn cần password + MFA hợp lệ lại.
4. Tính effective allowedMethods/preferredMethod từ policy server và cấu hình. Default totp; phone_sms tùy chọn khi được duyệt/cấu hình. Client không tự thay policy.
5. Manager cần aal2 cùng proof server-owned: last_mfa_method,last_mfa_factor_id,mfa_verified_at,mfa_policy_version,session_id. Method phải còn allowed; factor thuộc user, verified và không bị thu hồi. **TOTP hợp lệ không cần phone proof; SMS hợp lệ không cần thêm TOTP** khi policy cho cả hai.
6. Proof ghi sau verify của challenge bound đúng user/session/factor/method/purpose. Không cấp proof từ body tự khai, chỉ listFactors hoặc aal2 không rõ phương thức. Direct Auth change phải có chiến lược kiểm mới/reconcile đã POC; security_version BFF tự tăng không phát hiện mọi đổi factor bên ngoài.
7. Resolve organization/owner bằng server mapping, kiểm resource/action/version và capability/payment/state. Privileged SQL/service-role có thể bypass RLS nên phải có predicate quyền rõ.
8. Ghi audit Manager view và domain mutation/outbox theo policy trước response. Không log password/OTP/QR/secret/token. Snapshot quyền từ user_metadata không là thẩm quyền.

## Chọn phương thức và lỗi

GET /auth/mfa/options chỉ trả metadata cho chính user sau password. Nếu có TOTP được phép, gợi ý nhập mã; có SMS được phép thì cho lựa chọn. Không gửi SMS tự động khi render hoặc khi TOTP sai. Chỉ tạo challenge đúng loại factor; server đối chiếu method, không tin client nhãn.

Khi một phương thức lỗi, user có thể chuyển sang yếu tố khác đã verified và được phép. Đây là lựa chọn bình thường theo policy, không hạ xuống email/password-only. Không tự enroll yếu tố mới trong phiên bị mất yếu tố cũ để lách recovery. Khi cả hai không còn dùng được, theo runbook hỗ trợ/owner với audit và revoke trước reset.

## Hoàn tất phiên và recent authentication

Auth verify success và ghi proof DB không atomic qua hai hệ thống. Propagate cookie, lưu operation metadata không secret, đối soát nếu timeout. Nếu không chứng minh đúng method/factor thì giữ restricted và xác minh lại có hướng dẫn. Không suy từ aal2 bất kỳ.

Recent password/MFA có timestamp server-owned theo session/action; refresh token không tính là vừa nhập password. Thay policy hoặc gỡ factor làm proof cũ không hợp lệ theo guard; không xóa factor hàng loạt khi thay cấu hình. Cần kiểm với Supabase thật, không khẳng định enforcement đã chạy chỉ từ tài liệu.
