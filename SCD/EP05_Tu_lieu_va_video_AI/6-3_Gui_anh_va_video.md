# 6-3 Gửi ảnh và video

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-7 |
| Màn hình [AG] | T-10 (nút gửi thay tài năng ở M-08 đang chờ 確認27) |
| Tên trong mã nguồn | Media Upload |
| Mức sẵn sàng | 🟡 Vàng |

## Mục đích

Gửi ảnh và video

## Tác nhân

Tài năng, quản lý (thay tài năng ⚠)

## Đầu vào

Ảnh hoặc video chọn từ máy, hoặc chụp ngay

## Điều kiện trước

Đúng định dạng và dưới dung lượng tối đa (chưa quyết)

## Luồng chính

1. Chọn hoặc chụp rồi gửi.
2. Vượt giới hạn thì báo lý do.
3. Mất mạng thì báo và cho gửi lại.
4. Quản lý chọn tài năng rồi gửi từ màn hình quản trị

## Đầu ra và kết quả sau

- Đầu ra: Tư liệu đã tải lên
- Kết quả mong đợi: Có tư liệu để đăng bài

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
| Khách | 確認27; C2 |
| Kiểm chứng | — |
| Đội | Định dạng và dung lượng tối đa (§9-2) |

## Điểm chưa rõ (từ file 04)

- định dạng và dung lượng tối đa chưa có (mục 9-2). Quản lý thao tác thay tài năng hay chỉ cho tài khoản công ty (確認27). Một bài được kèm tối đa bao nhiêu ảnh.

## Nguồn

- [YK2] 6-7, UC-05, UC-06, 確認27, 32.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP05.
