# 9-1 Đăng bài bằng tài khoản công ty

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 中 (trung bình) |
| Mục [YK2] | 6-10 |
| Màn hình [AG] | M-12 |
| Tên trong mã nguồn | Office Account Posting |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Đăng bài cho tài khoản công ty

## Tác nhân

Quản lý

## Đầu vào

Thông tin và định hướng đăng bài của công ty (nhập qua ChatGPT như tài năng), ảnh hoặc video, chỉ dẫn đăng bài

## Điều kiện trước

Quản lý đã tạo tài khoản công ty trên màn hình quản trị

## Luồng chính

1. Tạo tài khoản công ty.
2. Chỉ dẫn, gửi tư liệu, 採用.
3. Đăng theo cùng luồng với tài năng, không duyệt ⚠ (確認52). Có nhiều tài khoản thì đăng nhập lại cho từng tài khoản

## Đầu ra và kết quả sau

- Đầu ra: Bài đăng của công ty
- Kết quả mong đợi: Bài của công ty được đăng đúng giờ. Phí video được đếm để quyết toán nội bộ

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
| Khách | A1, A2, 確認52; B10 |
| Kiểm chứng | — |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- quy trình ghi "trên màn hình quản trị", còn UC-12 前提 ghi "đăng nhập ứng dụng tài năng bằng mã của tài khoản công ty". Mục 7-4 lại ghi có duyệt cho tài khoản công ty.

## Nguồn

- [YK2] 6-10, UC-03 前提, UC-08, UC-08 前提, UC-12 前提, 確認9–11, 37, 38, 52.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP06.
