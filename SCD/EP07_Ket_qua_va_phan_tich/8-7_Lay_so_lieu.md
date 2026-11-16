# 8-7 Lấy số liệu

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP07 – Kết quả và phân tích |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-11 |
| Màn hình [AG] | — |
| Tên trong mã nguồn | Metrics Collection |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Mỗi ngày lấy kết quả từng bài và số người theo dõi. Lấy lỗi thì thử lại lần sau

## Tác nhân

Xử lý tự động, Upload-Post

## Đầu vào

Số liệu từng bài đăng (lượt xem, lượt thích…) và số người theo dõi trên từng mạng xã hội

## Điều kiện trước

Mỗi ngày một lần

## Luồng chính

1. Lấy số liệu từ Upload-Post (chỉ những chỉ số dịch vụ này cung cấp).
2. Lấy lỗi thì lấy lại ở lần sau.
3. Bài tài năng tự đăng ngoài hệ thống cũng được tính nếu Upload-Post đọc được (UC-09)

## Đầu ra và kết quả sau

- Đầu ra: Số liệu đã lấy về
- Kết quả mong đợi: Có số liệu mới nhất cho xử lý buổi sáng

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
| Khách | C5 |
| Kiểm chứng | Upload-Post trả về những chỉ số nào (quyết định cấu trúc dữ liệu) |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- các chỉ số cụ thể chưa có, chỉ biết là "trong phạm vi Upload-Post lấy được" (UC-09 前提). Lấy số liệu lúc mấy giờ. Nếu chạy sau xử lý buổi sáng thì số liệu bị chậm một ngày. Lấy số liệu của bài trong bao nhiêu ngày.

## Nguồn

- [YK2] 6-11, UC-08, UC-09, UC-09 前提, 確認30, 40.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP07.
