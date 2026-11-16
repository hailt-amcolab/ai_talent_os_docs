# 1-1 Thu phí thuê bao tháng

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP08 – Thu phí |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-3 |
| Màn hình [AG] | T-04, T-15 |
| Tên trong mã nguồn | Monthly Subscription Billing |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Thu phí hằng tháng qua GMO. Thu lỗi thì báo, không tự khóa. Tài năng đổi được cách thanh toán; lịch sử xem ở trang của bên thanh toán

## Tác nhân

Tài năng, hệ thống, cổng thanh toán

## Đầu vào

Phương thức thanh toán (cước nhà mạng hoặc thẻ), nhập trên màn hình của cổng thanh toán

## Điều kiện trước

Mọi tài năng (trừ tài khoản công ty). Đến ngày chốt sổ

## Luồng chính

1. Tài năng đăng ký phương thức thanh toán trên màn hình của cổng thanh toán.
2. Đến ngày chốt sổ, hệ thống tính số tiền và gửi cho cổng thanh toán để thu.
3. Thu lỗi thì báo tài năng và quản lý, không tự dừng sử dụng.
4. Tài năng đổi được phương thức thanh toán trong ứng dụng.
5. Tài năng xem lịch sử hóa đơn bằng cách chuyển qua trang của cổng thanh toán

## Đầu ra và kết quả sau

- Đầu ra: Yêu cầu thu tiền, kết quả thu, thông báo khi thu lỗi
- Kết quả mong đợi: Mỗi tháng thu được phí thuê bao. Tháng bắt đầu giữa chừng vẫn thu trọn tháng ⚠ (確認48). Hệ thống không lưu thông tin thẻ

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
| Khách | 確認48, 49, 50; mức phí; ngày chốt |
| Kiểm chứng | Môi trường thử GMO, thu số tiền thay đổi |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- ngày chốt sổ, ngày thu tiền và mức phí tháng chưa có. Cổng thanh toán có thu được số tiền thay đổi theo tháng không (確認49). Thu lỗi thì có thu lại không, sau bao lâu. Phí tháng đầu tính từ lúc đăng ký thanh toán hay từ lúc có bản nháp đầu tiên.
- rời đi giữa tháng thì đề xuất thu trọn tháng đó (確認50). Phí video đã phát sinh trong tháng đó cũng thu chung?

## Nguồn

- [YK2] 5-4, 6-3 (1-1, 1-2, 1-3, 5-4), UC-11, UC-12 前提, 確認48–51.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP08.
