# 7-5 Dừng đăng tự động, toàn bộ hoặc từng tài năng

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-10 |
| Màn hình [AG] | M-16, M-10 |
| Tên trong mã nguồn | Auto-posting Stop/Resume |
| Mức sẵn sàng | 🟡 Vàng |

## Mục đích

Dừng hoặc chạy lại đăng tự động, cho toàn hệ thống hoặc từng tài năng. Khi dừng thì hủy cả các bài đã hẹn giờ

## Tác nhân

Quản lý, hệ thống

## Đầu vào

Lệnh dừng hoặc chạy lại, cho toàn bộ hoặc cho một tài năng

## Điều kiện trước

Quản lý xác nhận trên màn hình xác nhận

## Luồng chính

1. Dừng: không đặt lịch mới lên Upload-Post và hủy luôn các bài đã đặt lịch.
2. Chạy lại: các bài đã hủy không được đăng.
3. Dừng riêng một tài năng thì xử lý giống vậy, chỉ cho tài năng đó

## Đầu ra và kết quả sau

- Đầu ra: Trạng thái đăng tự động (toàn bộ và từng tài năng)
- Kết quả mong đợi: Có thể dừng ngay khi có sự cố (UC-08 前提)

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
| Khách | B6 |
| Kiểm chứng | Hủy hàng loạt trên Upload-Post |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- khi đang dừng, AI có còn nhắn tin và tạo bản nháp không. Bài đã hủy có được 採用 lại sau khi chạy lại không.

## Nguồn

- [YK2] 6-10, UC-03 前提, UC-08, UC-08 前提, UC-12 前提, 確認9–11, 37, 38, 52.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP06.
