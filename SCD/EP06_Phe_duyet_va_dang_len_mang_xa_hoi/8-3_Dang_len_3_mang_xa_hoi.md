# 8-3 Đăng lên 3 mạng xã hội

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-10 |
| Màn hình [AG] | — |
| Tên trong mã nguồn | Multi-platform Publishing |
| Mức sẵn sàng | 🟡 Vàng |

## Mục đích

Đăng lên cả 3 mạng, ghi thành công hay lỗi theo từng mạng. Không có video thì không đăng YouTube

## Tác nhân

Xử lý tự động, Upload-Post

## Đầu vào

Bài đã hẹn giờ (ảnh hoặc video, chú thích)

## Điều kiện trước

Đến giờ đăng. Bài đã 採用 (đã duyệt nếu cần). Mạng xã hội đã kết nối

## Luồng chính

1. Đăng cùng một nội dung lên Instagram, TikTok, YouTube.
2. Bài không có video thì không đăng YouTube.
3. Mạng chưa kết nối thì bỏ qua.
4. Ghi kết quả cho từng mạng

## Đầu ra và kết quả sau

- Đầu ra: Kết quả đăng trên từng mạng xã hội
- Kết quả mong đợi: Bài xuất hiện trên mạng xã hội mà tài năng không cần thao tác (UC-08)

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
| Khách | B3 (tiêu đề YouTube) |
| Kiểm chứng | Lệnh đăng và kết quả theo từng mạng |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- tiêu đề YouTube lấy từ đâu. Upload-Post lỗi toàn bộ thì xử lý thế nào.

## Nguồn

- [YK2] 6-10, UC-03 前提, UC-08, UC-08 前提, UC-12 前提, 確認9–11, 37, 38, 52.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP06.
