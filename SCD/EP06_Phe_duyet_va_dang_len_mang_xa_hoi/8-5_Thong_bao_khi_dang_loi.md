# 8-5 Thông báo khi đăng lỗi

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-10 |
| Màn hình [AG] | T-13, T-14, M-08 |
| Tên trong mã nguồn | Publish Failure Notification |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Báo đăng lỗi. Không tự đăng lại; tài năng hoặc quản lý đặt lịch lại

## Tác nhân

Xử lý tự động, tài năng, quản lý

## Đầu vào

Kết quả đăng bị lỗi

## Điều kiện trước

Đăng lỗi trên ít nhất một mạng xã hội

## Luồng chính

1. Báo tài năng trong ứng dụng, kèm tên mạng bị lỗi và lý do.
2. Hiện cảnh báo trên màn hình quản trị ⚠ (確認38).
3. Không tự đăng lại. Tài năng hoặc quản lý hẹn giờ lại

## Đầu ra và kết quả sau

- Đầu ra: Thông báo, cảnh báo
- Kết quả mong đợi: Tài năng và quản lý biết bài chưa được đăng

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
| Khách | 確認30, 38; ai đặt lịch lại (file 14 §3.2 điểm 9) |
| Kiểm chứng | — |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- tài năng "hẹn giờ lại" bằng cách nào, khi 確認30 đề xuất tài năng không đổi được giờ. Chỉ một mạng lỗi thì đăng lại riêng mạng đó được không.

## Nguồn

- [YK2] 6-10, UC-03 前提, UC-08, UC-08 前提, UC-12 前提, 確認9–11, 37, 38, 52.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP06.
