# 5-1 Tạo video

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-8 |
| Màn hình [AG] | T-11 |
| Tên trong mã nguồn | AI Video Generation |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Tạo video bằng AI (Kling qua fal.ai)

## Tác nhân

Tài năng, quản lý (thay tài năng ⚠), dịch vụ tạo video (Kling qua fal.ai)

## Đầu vào

Loại video (video ngắn hoặc video trình chiếu ảnh ⚠ 確認31), ảnh gốc

## Điều kiện trước

Đã có ảnh. Đã xem độ dài dự kiến và đơn giá

## Luồng chính

1. Chọn loại và ảnh.
2. Hiện độ dài dự kiến và đơn giá (có ghi chú số tiền thực thu có thể khác).
3. Gửi yêu cầu và đếm một lần (5-4).
4. Tài năng được đóng ứng dụng trong lúc chờ. Xong thì báo tài năng.
5. Lỗi thì báo lý do và không tính phí

## Đầu ra và kết quả sau

- Đầu ra: Video đã tạo, thông báo
- Kết quả mong đợi: Có video dùng được cho bài đăng (UC-06 前提)

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
| Khách | 確認31; đơn giá; B9 |
| Kiểm chứng | Tham số Kling, thời gian tạo |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- mỗi loại video cần bao nhiêu ảnh, độ dài bao nhiêu. Có nhập câu mô tả cho AI không. Video trình chiếu ảnh cũng dùng Kling hay cách khác. Mất bao lâu thì tạo xong. Đơn giá chưa có.

## Nguồn

- [YK2] 6-8, 5-7, UC-06, UC-06 前提, 確認27, 31.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP05.
