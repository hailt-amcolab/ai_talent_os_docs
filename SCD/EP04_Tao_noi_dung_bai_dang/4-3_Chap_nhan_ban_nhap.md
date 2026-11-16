# 4-3 Chấp nhận bản nháp (採用)

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP04 – Tạo nội dung bài đăng |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-6 |
| Màn hình [AG] | T-09 |
| Tên trong mã nguồn | Draft Adoption |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Tài năng chấp nhận bản nháp, có thể xin quản lý duyệt. Bản nháp chưa có ảnh hoặc video thì không chấp nhận được

## Tác nhân

Tài năng

## Đầu vào

Bản nháp có kèm ảnh hoặc video. Lựa chọn có gửi duyệt hay không

## Điều kiện trước

Bắt buộc có ảnh hoặc video. Chỉ được chọn gửi duyệt khi tài năng được cài dùng duyệt bài

## Luồng chính

1. Bấm 採用.
2. Kiểm tra từ cấm (4-4).
3. Nếu chọn gửi duyệt thì chuyển sang chờ duyệt.
4. Nếu không thì hẹn đăng vào giờ đăng (nếu đăng tự động đang bật)

## Đầu ra và kết quả sau

- Đầu ra: Bài đã hẹn giờ hoặc bài chờ duyệt
- Kết quả mong đợi: Chỉ bài đã 採用 mới được đăng. Ngày không 採用 hoặc không có tư liệu thì không đăng ⚠ (確認25, 26)

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
| Khách | 確認25, 26; B1, B6; chấp nhận sau giờ đăng |
| Kiểm chứng | — |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- tài năng không hủy được bài đã hẹn trên ứng dụng (7-2). 採用 sau giờ đăng thì xử lý thế nào.

## Nguồn

- [YK2] 6-6, 5-3, UC-05, UC-05 前提, 確認15, 16, 24–30.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP04.
