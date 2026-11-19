# 8-6 Thông báo khi mất kết nối

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | §6-10, chức năng 8-6; 別紙A (SNS の接続切れ) |
| Màn hình [AG] | T-05 (接続切れ), T-14; M-02, M-06, M-08 (biểu tượng đỏ) |
| Tên trong mã nguồn | SNS Disconnection Notification |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; cách Upload-Post báo mất kết nối phải kiểm chứng |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ✅ | ✅ | ⚠ kiểm chứng | ⚠ đội đề xuất | ⚠ 8-2 |

## Mục đích

Kết nối với một mạng bị mất thì báo tài năng kết nối lại, và hiện trên màn hình quản trị (§6-10 chức năng 8-6).

## Luồng chính

1. Phát hiện mất kết nối (S06-08): khi Upload-Post báo (webhook nếu có), khi kiểm tra hằng ngày cùng lúc lấy kết quả (8-7), và ngay trước khi gửi lịch đăng.
2. Trạng thái mạng chuyển sang `disconnected` (8-2).
3. Báo tài năng **một lần cho mỗi lần mất**: thông báo SNS の接続切れ, mở vào T-05.
4. Màn hình quản trị: biểu tượng đỏ ở M-06, M-08; thông báo ở M-02 ([AG] M-02 có loại này; 7-4 trong [YK2] thiếu, xem A6).
5. Tài năng kết nối lại ở T-05 (8-2), trạng thái về `connected`.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Mất rồi có lại, rồi mất tiếp | Mỗi lần mất báo một lần | [Đề xuất nội bộ] |
| Mất kết nối trước giờ đăng | Bài vẫn đăng các mạng còn lại; mạng mất ghi lỗi (8-5) | §6-10 |

## Dữ liệu

`sns_connections` (8-2) thêm `disconnected_at`, `notified_at`.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho YouTube mất kết nối, thì tài năng nhận đúng một thông báo, T-05 hiện 接続切れ, M-06 có biểu tượng YouTube màu đỏ.
2. Cho kết nối lại thành công, thì biểu tượng về màu xanh.

## Phụ thuộc

8-2, 8-7, 7-4, 6-1.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-08 | Phát hiện mất kết nối lúc nào | Không | Hằng ngày và trước mỗi lần đăng |
| A6 | 7-4 thiếu loại "mất kết nối" | Không | Theo [AG] M-02 |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-10 (8-6), §6-12 (7-4), 別紙A. [AG] trang 3 (T-05), trang 5 (T-14), trang 6 (M-02).

## Bổ sung từ tài liệu Upload-Post (17/11/2026)

- Các lỗi mất kết nối của Upload-Post chủ yếu là chuỗi chữ ("session has expired", "Token expired and refresh failed"…), chỉ TikTok có mã `tiktok_reconnect_required`. Phân loại theo mẫu chuỗi đã kiểm trong POC.
- **Instagram `account_checkpoint_required`:** chủ tài khoản phải mở Instagram để xử lý cảnh báo bảo mật; kết nối lại không giải quyết được. Câu thông báo cho tài năng phải khác với câu "kết nối lại".
- Chi tiết: bộ Upload-Post §9 (U26).
