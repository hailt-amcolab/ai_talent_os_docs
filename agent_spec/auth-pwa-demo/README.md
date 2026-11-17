# Demo tích hợp công nghệ: Auth, TOTP, PWA/Web Push

**Scope hiện tại theo yêu cầu đã làm rõ:** chỉ kiểm chứng công nghệ, không mô phỏng hệ thống nghiệp vụ. Người dùng tự đăng ký email/password → dùng demo; tùy chọn đăng ký TOTP; gửi Web Push đến thiết bị của cùng tài khoản **hoặc tài khoản khác** bằng mã người nhận.

Không có duyệt đơn, Manager/Talent, cấp mật khẩu tạm, inbox nghiệp vụ, outbox hay worker. Các migration đã apply trước đó giữ nguyên lịch sử; code demo chỉ dùng hai bảng private `tech_demo_*` và limiter dùng chung.

- [RUNBOOK](RUNBOOK.md): khởi động, HTTPS, thử trên hai thiết bị/hai tài khoản.
- [IMPLEMENTATION](IMPLEMENTATION.md): hợp đồng kỹ thuật và ranh giới kiến trúc.
- [AC](AC.md) / [test cases](TEST_CASES.json): tiêu chí kiểm chứng.
- [CODE_EXAMPLES](CODE_EXAMPLES.md): mã thực thi làm ví dụ.
- [SOURCE_GAPS](SOURCE_GAPS.md): tài liệu tích hợp cần bổ sung gì.
- [VALIDATION](VALIDATION.md): kết quả thật và phần chưa kiểm chứng.

Các bằng chứng của demo duyệt đơn trước khi thu gọn không còn đại diện cho scope hiện tại. Chỉ dùng report có `scope: technology only`.
