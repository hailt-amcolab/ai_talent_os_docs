# 7-2 Xem và hủy bài đăng

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-10 |
| Màn hình [AG] | M-08 |
| Tên trong mã nguồn | Post List & Cancellation |
| Mức sẵn sàng | 🟡 Vàng |

## Mục đích

Danh sách bài đăng theo trạng thái; quản lý hủy bài đã hẹn giờ

## Tác nhân

Quản lý, hệ thống

## Đầu vào

Tài năng và bộ lọc trạng thái: đã hẹn, chờ duyệt, đã đăng, lỗi. Bài cần hủy

## Điều kiện trước

Quản lý đã đăng nhập

## Luồng chính

1. Lọc và xem bài theo từng tài năng.
2. Hủy bài đã hẹn ngay trên màn hình quản trị. Hệ thống hủy lịch bên Upload-Post. Tài năng không hủy được trên ứng dụng

## Đầu ra và kết quả sau

- Đầu ra: Danh sách bài đăng, bài đã hủy
- Kết quả mong đợi: Quản lý nắm được và xử lý được bài đăng của tài năng mà không cần vào Upload-Post

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
| Khách | Danh sách trạng thái bài đăng (C-01) |
| Kiểm chứng | Hủy lịch qua API |
| Đội | — |

## Nguồn

- [YK2] 6-10, UC-03 前提, UC-08, UC-08 前提, UC-12 前提, 確認9–11, 37, 38, 52.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP06.
