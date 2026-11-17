# Thay đổi bản1.3 ngày17/11/2026

- Bỏ OTP qua email: xóa EM01, EM02, 3 endpoint `/auth/email-otp/*`, schema EmailOtpSend và EmailAttempt, ví dụ SDK, biến môi trường, 11 ca kiểm thử (EM01, EM02, SEC17).
- Ưu tiên Authenticator TOTP; nhánh SMS giữ đặc tả để bàn với khách, chưa code ở đợt đầu.
- Khóa 5 lần sai/15 phút làm ở BE qua `POST /auth/login` (AU05), vì Password Verification Hook chỉ có ở gói Team/Enterprise. Ghi rủi ro gọi thẳng Auth; sửa AU05-T01, AU05-T03.
- Sửa các chỗ sót từ bản1.1 (SMS bắt buộc), cập nhật tham chiếu Q&A bản 15/11 (xem `../KET_QUA_KIEM_CHUNG_17-11.md` §8).

# Thay đổi bản1.2 ngày17/11/2026

- CR-MFA-02: giữ Authenticator TOTP mặc định6 số/QR và SMS như tùy chọn cấu hình; không bắt cả hai mỗi login.
- Khôi phục TOTP SDK/schema/cases; thêm MFA policy/options và contract oneOf tách method.
- Guard dùng proof method theo allowedMethods, bỏ yêu cầu phone proof chung sau TOTP.
- Giữ nội dung SMS/provider/cost/resend/đổi số/recovery; không ép migration user TOTP sang SMS.
- Ghi nguyên nghĩa đoạn trích người dùng: SMS sẽ trao đổi, chưa khẳng định khách duyệt production SMS.
- Chưa chạy ứng dụng/Supabase thật, chưa bật add-on/gửi SMS.

## Lịch sử bản1.1 Đã thay SMS-only bằng CR-MFA-02

# Thay đổi bản1.1 ngày17/11/2026

- CR-SMS-01: người dùng chốt Manager password + OTP qua SMS, thay TOTP Authenticator của bản1.0/v2 gốc.
- Viết lại luồng enroll/challenge/verify, resend/timeout/đổi số/mất số/migration; bỏ DTO QR và SDK enrollTotp.
- Thêm approved phone, E.164, sendRequestId/cooldown/budget, dispatch_unknown và bằng chứng phone-specific theo session.
- Bổ sung API send-attempt/resend, schema và payload; cập nhật tests và ma trận.
- Ghi rõ code cũ có thể còn hiệu lực tới expiry; không hứa resend vô hiệu mọi mã cũ ngay.
- Ghi chi phí Advanced MFA Phone ngoài phí tin và điều kiện cấu hình provider. Chưa bật dịch vụ hoặc gửi SMS thật.
- Giữ tên ZIP hiện có để cập nhật cùng tài liệu; phiên bản nội dung là1.1. Không tự sửa ZIP PWA/OneDrive/Upload-Post khác.
