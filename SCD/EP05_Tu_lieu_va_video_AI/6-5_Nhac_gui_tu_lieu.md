# 6-5 Nhắc gửi tư liệu

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | 6-7 |
| Màn hình [AG] | T-14 |
| Tên trong mã nguồn | Media Reminder |
| Mức sẵn sàng | 🟡 Vàng |

## Mục đích

Nhắc gửi tư liệu

## Tác nhân

Xử lý tự động

## Đầu vào

Giờ đăng, tình trạng đã có tư liệu chưa, giờ nhắc đã cài đặt

## Điều kiện trước

Trước giờ đăng 2 tiếng (mặc định) mà chưa có tư liệu

## Luồng chính

1. Gửi nhắc một lần mỗi ngày

## Đầu ra và kết quả sau

- Đầu ra: Thông báo nhắc
- Kết quả mong đợi: Tài năng gửi tư liệu kịp giờ

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
| Khách | Nhiều bài trong ngày thì nhắc mấy lần |
| Kiểm chứng | — |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- giờ đăng do AI chọn (8-1), nên giờ nhắc thay đổi theo từng tài năng. Có nhiều bài trong ngày thì nhắc cho từng bài hay một lần.

## Nguồn

- [YK2] 6-7, UC-05, UC-06, 確認27, 32.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP05.
