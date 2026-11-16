# 7-4 Danh sách thông báo cho quản lý

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP09 – Thông báo và nền tảng PWA |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-12 |
| Màn hình [AG] | M-02 |
| Tên trong mã nguồn | Manager Notification Center |
| Mức sẵn sàng | 🟡 Vàng |

## Mục đích

Danh sách thông báo cho quản lý, lọc theo loại và theo đã xử lý hay chưa

## Tác nhân

Quản lý

## Đầu vào

8 loại thông báo: có người đăng ký, yêu cầu duyệt, phát hiện từ cấm, đăng lỗi, lâu không đăng, chuyện nghiêm trọng, đạt mục tiêu, thanh toán lỗi

## Điều kiện trước

Quản lý đã đăng nhập

## Luồng chính

1. Xem danh sách, lọc theo loại và theo đã xử lý hay chưa.
2. Mở thông báo thì đi đến màn hình của tài năng liên quan.
3. Xử lý xong thì đánh dấu 対応済み (đã xử lý), danh sách chỉ còn việc chưa xử lý ⚠ (確認46). Có thể lọc theo nhóm tài năng ⚠ (確認47)

## Đầu ra và kết quả sau

- Đầu ra: Danh sách thông báo
- Kết quả mong đợi: Quản lý chỉ cần xử lý việc có trong danh sách. Thông báo chỉ hiện trên màn hình quản trị ⚠ (確認45)

## Luồng lỗi và trường hợp biên

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Quy tắc và giá trị

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Dữ liệu

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Tích hợp

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Tiêu chí chấp nhận

⚠ Chưa viết. Đội viết khi làm chi tiết chức năng này (xem mẫu trong [README](../README.md#3-mẫu-đặc-tả-một-chức-năng)).

## Chỗ còn thiếu

| Ai phải lấp | Nội dung |
|---|---|
| Khách | 確認45, 46; A6 |
| Kiểm chứng | — |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- không có email hay thông báo điện thoại cho quản lý, kể cả với yêu cầu duyệt có hạn giờ và chuyện nghiêm trọng. Một quản lý đánh dấu đã xử lý thì có áp dụng cho mọi quản lý không. UC-10 chỉ liệt kê 6 loại, thiếu "có người đăng ký" và "thanh toán lỗi". 別紙A nói mất kết nối mạng xã hội "hiện trên màn hình quản trị", nhưng 7-4 không có loại này.

## Nguồn

- [YK2] 6-12, 6-13, 6-14, UC-03 前提, UC-10, 確認12, 45–47.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP09.
