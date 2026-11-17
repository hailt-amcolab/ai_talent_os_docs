# C-02 Cài đặt do quản lý tự chỉnh

| Mục | Giá trị |
|---|---|
| Module | EP10 – Nền tảng chung và quản trị hệ thống |
| Mã | C-02 (mã nội bộ) |
| Mục [YK2] | §5-2, §5-6; §6-6 chức năng 4-4 |
| Màn hình [AG] | M-17 (全体の設定), M-10 (cài đặt từng tài năng) |
| Mức sẵn sàng | 🟢 Xanh – giao agent được |

## Mục đích

Những giá trị quản lý tự đổi trên màn hình quản trị mà không cần sửa mã (§5-6), cùng các tham số kỹ thuật chỉ đội vận hành đổi.

## 1. Quản lý đổi trên màn hình [Chốt, §5-6]

| Cài đặt | Mặc định | Màn | Dùng ở |
|---|---|---|---|
| Giờ AIコーチ nhắn buổi sáng | 8:00 | M-17 | 3-4 |
| Nhắc gửi tư liệu, trước giờ đăng | 2 giờ | M-17 | 6-5 |
| Số ngày không đăng thì AIコーチ hỏi han | 3 | M-17 | 3-9 |
| Số ngày không đăng thì báo quản lý | 7 | M-17 | 3-9 |
| Ngày gửi tổng kết tuần | Thứ Hai | M-17 | 3-8 |
| Danh sách từ cấm | Mẫu của đội | M-17 | 4-4 |
| Dừng toàn bộ đăng tự động | Đang chạy | M-16 | 7-5 |
| Có duyệt bài (từng tài năng) | Tắt | M-10 | 7-7 |
| Dừng đăng tự động (từng tài năng) | Đang chạy | M-10 | 7-5 |
| Mục tiêu người theo dõi (từng tài năng) | 10.000 mỗi mạng | M-10 | 2-4 |
| Đơn giá tạo video | Chưa có | M-17 (đề xuất S08-06) | 5-4 |
| Phí tháng (nếu mỗi tài năng một mức) | Chưa có | M-10 (đề xuất S08-01) | 1-1 |

## 2. Tham số kỹ thuật (không có trên màn hình) [Đề xuất nội bộ]

Ví dụ: giờ bắt đầu lô buổi sáng (5:00), giờ lấy số liệu (4:00), các giới hạn chống khóa tài khoản (8-4), giới hạn tệp (6-3), thời gian giữ thông báo và bản tạm, mô hình OpenAI. Lưu trong bảng cấu hình, đổi bởi đội vận hành, có nhật ký.

## Luồng chính

1. Quản lý sửa ở M-17 hoặc M-10, bấm 保存する (lưu).
2. Kiểm tra giá trị (giờ hợp lệ, số nguyên dương, mốc 2 lớn hơn mốc 1).
3. Lưu, ghi nhật ký thao tác (C-03): ai, giá trị cũ, giá trị mới.
4. Áp dụng từ lần chạy tiếp theo của việc liên quan; không gửi bù trong ngày (3-9, 6-5).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho đổi giờ nhắn buổi sáng thành 9:00, thì hôm sau tin buổi sáng đến lúc 9:00.
2. Cho nhập mốc báo quản lý nhỏ hơn mốc hỏi han, thì không lưu được.
3. Mỗi lần lưu có một dòng nhật ký với giá trị cũ và mới.

## Dữ liệu [Đề xuất nội bộ]

`settings`: `key`, `value`, `scope` (`ui`, `ops`), `updated_by`, `updated_at`. Cài đặt từng tài năng nằm ở `talents` và `talent_goals`.

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP10: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-2, §5-6, §6-6 (4-4), §6-10 (7-5). [AG] trang 8 (M-10), trang 9 (M-16), trang 10 (M-17).

## Cập nhật theo Q&A (bản ngày 15/11/2026)

- Q&A No.41, CR-07 (đã chốt): màn cài đặt chung có giờ nhắn, giờ nhắc, số ngày không đăng, danh sách từ cấm. Q&A No.2, No.62: thêm **đơn giá video**. Q&A No.25 (đang hỏi): giờ nhắn buổi sáng chung hay theo từng tài năng; [YK2] 5-2 là chung.
