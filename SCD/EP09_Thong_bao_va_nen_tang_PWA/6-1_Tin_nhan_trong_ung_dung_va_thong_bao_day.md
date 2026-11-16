# 6-1 Tin nhắn trong ứng dụng và thông báo đẩy

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP09 – Thông báo và nền tảng PWA |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-12 |
| Màn hình [AG] | T-14 |
| Tên trong mã nguồn | In-app & Push Notifications |
| Mức sẵn sàng | 🟡 Vàng |

## Mục đích

Thông báo trong ứng dụng và đẩy về điện thoại. Mở thông báo thì vào đúng màn liên quan

## Tác nhân

Xử lý tự động, tài năng

## Đầu vào

Sự kiện cần báo cho tài năng (theo 別紙A – phụ lục A)

## Điều kiện trước

Có sự kiện

## Luồng chính

1. Hiển thị trên màn hình thông báo trong ứng dụng.
2. Nếu thiết bị đã cho phép thì gửi thêm thông báo đẩy.
3. Bấm vào thông báo thì mở màn hình liên quan

## Đầu ra và kết quả sau

- Đầu ra: Thông báo
- Kết quả mong đợi: Tài năng nhận được thông tin. Không cho phép thông báo đẩy thì vẫn xem được khi mở ứng dụng (確認12)

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
| Khách | C6; 確認12 |
| Kiểm chứng | Web Push trên iOS 16.4 trở lên |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- công nghệ gửi thông báo đẩy chưa chọn (mục 8). Nội dung thông báo "sẽ xác nhận trên màn hình thật" (6-13). Email chỉ dùng cho kết quả đăng ký và đặt lại mật khẩu.

## Nguồn

- [YK2] 6-12, 6-13, 6-14, UC-03 前提, UC-10, 確認12, 45–47.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP09.
