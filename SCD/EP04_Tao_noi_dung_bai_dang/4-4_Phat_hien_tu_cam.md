# 4-4 Phát hiện từ cấm

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP04 – Tạo nội dung bài đăng |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-6 |
| Màn hình [AG] | M-11, M-17 |
| Tên trong mã nguồn | Forbidden Words Check |
| Mức sẵn sàng | 🟡 Vàng |

## Mục đích

AI kiểm tra từ cấm theo ngữ cảnh. Một danh sách chung cho mọi tài năng, quản lý thêm, sửa, xóa

## Tác nhân

Huấn luyện viên AI, quản lý

## Đầu vào

Chú thích và hashtag của bài được 採用. Danh sách từ cấm chung

## Điều kiện trước

Khi bài được 採用

## Luồng chính

1. AI kiểm tra có từ cấm hoặc cách nói tương đương không, xét cả ngữ cảnh.
2. Nếu có thì không hẹn giờ, báo lý do cho tài năng và báo quản lý.
3. Quản lý sửa nội dung trên màn hình quản trị.
4. Quản lý đăng ký, sửa, xóa từ trong danh sách

## Đầu ra và kết quả sau

- Đầu ra: Kết quả kiểm tra, thông báo
- Kết quả mong đợi: Bài có từ cấm không được đăng. AI có thể bỏ sót (UC-02 前提, UC-05 前提)

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
| Khách | 確認4; B5 (luồng quản lý sửa) |
| Kiểm chứng | Độ chính xác khi AI kiểm tra theo ngữ cảnh |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- quản lý sửa xong thì ai bấm hẹn giờ. Tài năng có được xem lại bản đã sửa không. Nếu quản lý không sửa kịp trước giờ đăng thì sao.

## Nguồn

- [YK2] 6-6, 5-3, UC-05, UC-05 前提, 確認15, 16, 24–30.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP04.
