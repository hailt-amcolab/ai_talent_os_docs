# 1-2 Loại tài khoản

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP08 – Thu phí |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-3 |
| Màn hình [AG] | M-12 |
| Tên trong mã nguồn | Account Type (Paid / Office) |
| Mức sẵn sàng | 🟡 Vàng |

## Mục đích

**Phân loại tài khoản trả phí và tài khoản công ty** (không có miễn phí)

## Tác nhân

Quản lý (tạo tài khoản công ty), hệ thống

## Đầu vào

Thông tin tài khoản công ty ⚠ chưa nêu các trường

## Điều kiện trước

—

## Luồng chính

1. Người đăng ký qua ứng dụng đều là tài năng có trả phí.
2. Quản lý tạo tài khoản công ty trên màn hình quản trị: không hiện bước đăng ký thanh toán, không thu phí tháng.
3. Tài năng không tự chọn hay đổi loại

## Đầu ra và kết quả sau

- Đầu ra: Loại tài khoản được lưu
- Kết quả mong đợi: Tài khoản công ty dùng đủ chức năng như tài năng, không bị thu phí tháng

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
| Khách | A1 (tài khoản công ty thao tác ở đâu) |
| Kiểm chứng | — |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- [YK2] còn giữ tên chức năng cũ. Nên đổi tên hoặc bỏ 1-3 để khớp nội dung.

## Nguồn

- [YK2] 5-4, 6-3 (1-1, 1-2, 1-3, 5-4), UC-11, UC-12 前提, 確認48–51.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP08.
