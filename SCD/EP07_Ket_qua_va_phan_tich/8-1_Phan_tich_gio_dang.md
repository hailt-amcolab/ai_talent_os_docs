# 8-1 Phân tích giờ đăng

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | 6-11 |
| Màn hình [AG] | — |
| Tên trong mã nguồn | Posting Time Analysis |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Chọn giờ đăng: lúc đầu theo chỉ dẫn thuật toán của công ty, đủ dữ liệu thì theo khung giờ phản hồi tốt

## Tác nhân

Xử lý tự động, huấn luyện viên AI

## Đầu vào

Số liệu theo khung giờ, chỉ dẫn thuật toán của アデッソ

## Điều kiện trước

—

## Luồng chính

1. Khi chưa đủ số liệu thì dùng giờ theo chỉ dẫn của アデッソ.
2. Đủ số liệu thì chọn giờ theo khung giờ được tương tác tốt của từng tài năng.
3. Upload-Post không cho số liệu theo giờ thì giữ giờ theo chỉ dẫn (UC-08)

## Đầu ra và kết quả sau

- Đầu ra: Giờ đăng cho từng tài năng. Tài năng không đổi được ⚠ (確認30)
- Kết quả mong đợi: Bài được đăng vào giờ có nhiều tương tác hơn

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
| Khách | 確認30; B1; thế nào là đủ số liệu |
| Kiểm chứng | Có số liệu theo khung giờ không |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- thế nào là "đủ số liệu". 8-1 là 中 (trung bình) nhưng nguồn dữ liệu của nó là 8-9 lại là 低 (thấp), mức ưu tiên không khớp. Quản lý có được đổi giờ đăng không.

## Nguồn

- [YK2] 6-11, UC-08, UC-09, UC-09 前提, 確認30, 40.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP07.
