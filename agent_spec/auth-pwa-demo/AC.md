# Acceptance criteria cho demo

| ID | Điều kiện đạt |
|---|---|
| AC01 | Tự đăng ký email/password rồi đăng nhập được; không duyệt đơn, không tạo domain roles. Demo auto-confirm được ghi rõ và không bật production. |
| AC02 | Đăng nhập/đăng xuất qua BE, SDK giữ session. JWT sai/phiên revoked bị chặn, secret không vào FE/log/cache. |
| AC03 | TOTP tùy chọn enroll QR; verify thật aal2; login mới cần TOTP nếu đã bật; factor phải thuộc caller. |
| AC04 | Thiết bị bật thông báo, native subscription lưu BE thành công mới báo ON. |
| AC05 | A gửi bằng mã B → mọi thiết bị active của B nhận; hoạt động cả khi A/B khác tài khoản và receiver đóng trang. Không gửi nhầm tới devices của A. |
| AC06 | Có counters provider accepted/failed/gone trung thực; không có receiver device báo rõ. 404/410 deactivate, có sender/recipient rate limit. |
| AC07 | Logout chỉ detach devices của phiên đó; endpoint account khác không bị chiếm; stale subscribe sau logout không tái bật. |
| AC08 | PWA HTTPS, scope đúng, offline generic không dữ liệu cũ, update cần đồng ý. |
| AC09 | FE/BE đúng kiến trúc, OpenAPI types/build/test pass; migration + RLS/ACL/diff được kiểm. |
| AC10 | iPhone iOS16.4+ Safari cài Home Screen và Android Chrome thật: nhận Web Push khi đóng app, click mở đúng Home; thử A/B tài khoản khác nhau. Đây là kiểm chứng thiết bị thật bắt buộc trước khi báo đã nhận thành công. |
