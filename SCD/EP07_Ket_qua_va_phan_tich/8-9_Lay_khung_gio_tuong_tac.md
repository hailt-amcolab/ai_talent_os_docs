# 8-9 Lấy khung giờ tương tác

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 低 (thấp) |
| Mục [YK2] | 6-11 |
| Màn hình [AG] | — |
| Tên trong mã nguồn | Engagement Time Collection |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Lấy khung giờ bài được xem và được tương tác

## Tác nhân

Xử lý tự động, Upload-Post

## Đầu vào

Khung giờ bài được xem và được tương tác

## Điều kiện trước

Upload-Post có cung cấp số liệu này

## Luồng chính

1. Lấy về trong phạm vi Upload-Post cung cấp

## Đầu ra và kết quả sau

- Đầu ra: Số liệu theo khung giờ
- Kết quả mong đợi: Đầu vào cho 8-1

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
| Khách | — |
| Kiểm chứng | Upload-Post có số liệu theo khung giờ không |
| Đội | — |

## Nguồn

- [YK2] 6-11, UC-08, UC-09, UC-09 前提, 確認30, 40.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP07.
