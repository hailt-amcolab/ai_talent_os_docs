# 8-2 Kết nối dịch vụ đăng bài

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-10 |
| Màn hình [AG] | T-05 |
| Tên trong mã nguồn | Posting Service Connection |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Kết nối dịch vụ đăng bài: đăng ký tài năng lên Upload-Post, đường dẫn kết nối có hạn 48 giờ, mỗi mạng một tài khoản

## Tác nhân

Xử lý tự động, tài năng, Upload-Post

## Đầu vào

Thông tin tài năng. Thao tác "kết nối mạng xã hội". Tài năng đăng nhập vào từng mạng xã hội

## Điều kiện trước

Tài năng đã có trong hệ thống (⚠ [YK2] vẫn ghi "khi đăng ký tài năng"). Instagram phải là tài khoản doanh nghiệp hoặc nhà sáng tạo

## Luồng chính

1. Tự động đăng ký tài năng với Upload-Post.
2. Tài năng bấm kết nối, hệ thống mở màn hình kết nối riêng (hạn 48 giờ, hết hạn thì tạo lại trong ứng dụng).
3. Tài năng tự đăng nhập và kết nối từng mạng ⚠ (確認9). Mỗi mạng chỉ một tài khoản ⚠ (確認10). Không bắt buộc đủ 3 mạng ⚠ (確認11)

## Đầu ra và kết quả sau

- Đầu ra: Trạng thái kết nối, hiển thị trên ứng dụng và màn hình quản trị
- Kết quả mong đợi: Đăng được lên các mạng đã kết nối

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
| Khách | 確認9, 10, 11; lúc nào đăng ký tài năng với Upload-Post |
| Kiểm chứng | Luồng kết nối, đường dẫn hạn 48 giờ |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- đăng ký tài năng với Upload-Post lúc nào (khi duyệt đơn, khi thanh toán xong hay khi tài năng bấm kết nối). Upload-Post tính phí theo số tài năng đã đăng ký (UC-08 前提), nên cũng cần biết khi nào xóa. Kiểm tra loại tài khoản Instagram bằng cách nào. Ai kết nối cho tài khoản công ty.

## Nguồn

- [YK2] 6-10, UC-03 前提, UC-08, UC-08 前提, UC-12 前提, 確認9–11, 37, 38, 52.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP06.
