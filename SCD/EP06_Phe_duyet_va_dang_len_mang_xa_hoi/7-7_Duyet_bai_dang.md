# 7-7 Duyệt bài đăng

> **Bản khung:** sinh tự động từ [file 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md), [file 16](../../Phan_tich/16_Chia_module_phat_trien.md) và bảng đánh giá trong [README](../README.md). Chưa đủ để giao agent: còn thiếu luồng lỗi, quy tắc và giá trị, dữ liệu, tích hợp, tiêu chí chấp nhận. Khi viết đầy đủ thì xóa dòng này.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | 6-9 |
| Màn hình [AG] | M-04, M-05, M-10 |
| Tên trong mã nguồn | Post Approval |
| Mức sẵn sàng | 🔴 Đỏ |

## Mục đích

Duyệt bài: bật hoặc tắt theo từng tài năng, trả lại kèm lý do, quá giờ đăng mà chưa duyệt thì không đăng

## Tác nhân

Quản lý, tài năng (gửi yêu cầu), xử lý tự động (hết hạn)

## Đầu vào

Cài đặt dùng duyệt bài cho từng tài năng. Yêu cầu duyệt (chú thích, ảnh hoặc video). Quyết định duyệt hoặc trả lại, kèm lý do khi trả lại

## Điều kiện trước

Tài năng được cài dùng duyệt bài và đã chọn gửi duyệt khi 採用 (chỉ với bài cho công việc cần khách hàng cho phép, ⚠ 確認33)

## Luồng chính

1. Tài năng gửi yêu cầu, mọi quản lý được báo.
2. Quản lý xem nội dung trên màn hình quản trị.
3. Quản lý bấm trước thì quyết ⚠ (確認34).
4. Duyệt thì bài được đăng đúng giờ đã hẹn.
5. Trả lại thì bắt buộc nhập lý do. Tài năng thấy lý do, nhờ AI sửa rồi gửi duyệt lại ⚠ (確認35).
6. Hết giờ đăng mà chưa duyệt thì hệ thống hủy lịch, báo cả tài năng và quản lý. Tài năng 採用 lại nếu muốn đăng ⚠ (確認36)

## Đầu ra và kết quả sau

- Đầu ra: Kết quả duyệt, lý do trả lại, thông báo
- Kết quả mong đợi: Chỉ bài đã duyệt mới được đăng (UC-07)

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
| Khách | 確認33–36; A2 |
| Kiểm chứng | Bài chờ duyệt đã đặt lịch trên Upload-Post chưa |
| Đội | — |

## Điểm chưa rõ (từ file 04)

- Gửi lại sau khi bị trả lại thì giờ đăng có giữ nguyên không, có giới hạn số lần không, có kiểm tra từ cấm lại không.
- Quản lý có được sửa nội dung hoặc đổi giờ đăng khi duyệt không, hay chỉ được duyệt hoặc trả lại.
- Có nhắc quản lý khi sắp đến giờ đăng mà bài vẫn chưa duyệt không. Thông báo chỉ hiện trên màn hình quản trị (確認45).
- Bài chờ duyệt đã được đặt lịch trên Upload-Post hay chưa (確認36 nói "hủy lịch").
- Tài khoản công ty: 確認52 đề xuất không duyệt, nhưng mục 7-4 lại ghi có duyệt.
- Tài năng có rút lại yêu cầu duyệt được không.

## Nguồn

- [YK2] 6-9 (7-7), 5-3, UC-07, UC-07 前提, 確認33–36, 52.
- Câu hỏi liên quan: [file 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv), lọc cột Module = EP06.
