# 5-4 Đếm số lần tạo video và thu gộp với phí tháng

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP08 – Thu phí |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-3 |
| Màn hình [AG] | T-11, T-15, M-10 |
| Tên trong mã nguồn | Video Usage Billing |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Đếm số lần tạo video (tính cả tạo lại, không tính lần dịch vụ tạo lỗi) và cộng vào phí tháng

## Tác nhân

Tài năng, hệ thống, quản lý (xem)

## Đầu vào

Yêu cầu tạo video đã được xác nhận giá

## Điều kiện trước

Đã xem đơn giá mỗi lần tạo và bấm yêu cầu

## Luồng chính

1. Hiện đơn giá trên màn hình tạo video.
2. Xác nhận thì tính là một lần, tạo lại cũng tính.
3. Dịch vụ tạo video lỗi thì không tính.
4. Cuối tháng cộng phí video vào phí tháng.
5. Tài khoản công ty: chỉ đếm và hiện trên màn hình quản trị, không thu

## Đầu ra và kết quả sau

- Đầu ra: Số lần và tổng phí trong tháng: tài năng xem trong ứng dụng, quản lý xem theo từng tài năng và tài khoản công ty
- Kết quả mong đợi: Hóa đơn tháng = phí thuê bao + số lần tạo video × đơn giá. Không có lượt miễn phí và không có mức trần. Phí video của tài khoản công ty do アデッソ quyết toán nội bộ

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
| Khách | Đơn giá; 確認51; B8, B9 |
| Kiểm chứng | — |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- đơn giá mỗi lần tạo video do アデッソ quyết, chưa có. Quản lý tạo video thay tài năng thì tính vào đâu (確認27).

## Nguồn

- [YK2] 5-4, 6-3 (1-1, 1-2, 1-3, 5-4), UC-11, UC-12 前提, 確認48–51.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP08.
