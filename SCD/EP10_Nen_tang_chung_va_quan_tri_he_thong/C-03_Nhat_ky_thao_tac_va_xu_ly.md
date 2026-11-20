# C-03 Nhật ký thao tác và xử lý

## Đối chiếu nguồn hiện hành — 20/11/2026

Ghi tự động Manager/thời điểm/màn/Talent khi xem thông tin, hội thoại, kết quả. Lọc khoảng thời gian và Talent, nhật ký xem không được sửa.

Retention nhật ký vận hành/thao tác không được nguồn mới chốt.

Căn cứ: `M19:11,13,25;BF19:21` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0596;EV-0598;EV-0610;EV-0633`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP10 – Nền tảng chung và quản trị hệ thống |
| Mã | C-03 (mã nội bộ) |
| Mục [YK2] | §9-4; §6-2 chức năng 7-6 |
| Màn hình [AG] | M-19 (chỉ phần lượt xem, thuộc 7-6). Thao tác và xử lý: không có màn (S10-02) |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; thời gian giữ chưa có |

## Mục đích

Ghi ba loại nhật ký (§9-4):
- **Lượt xem:** quản lý xem thông tin tài năng nào, lúc nào (7-6).
- **Thao tác:** duyệt, đổi trạng thái, dừng và chạy lại đăng tự động, và các thao tác khác của quản lý.
- **Xử lý:** kết quả đăng bài, lấy số liệu, tạo video, thu phí.

## Luồng chính

1. Một hàm chung `audit(kind, actor, action, target, before, after, result)`.
2. **Thao tác** được ghi: duyệt, trả lại (7-7); đổi trạng thái (7-3); dừng, chạy lại (7-5); hủy bài, hẹn lại (7-2, 8-5); sửa bài dính từ cấm (4-4); sửa cài đặt, danh sách từ cấm (C-02); thêm, vô hiệu hóa quản lý (1-6); duyệt, từ chối đơn (1-4); tạo tài khoản công ty (1-2); ghi hồ sơ qua ChatGPT (2-3).
3. **Xử lý** được ghi: hẹn giờ và kết quả từng mạng (8-3); lấy số liệu (8-7); tạo video (5-1); thu phí (1-1); đọc, ghi OneDrive lỗi (2-1, 8-8); gửi thư lỗi (1-4).
4. Bảng chỉ được thêm dòng, không sửa, không xóa (trừ việc xóa theo thời hạn giữ).

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Ba loại nhật ký | — | Chốt | §9-4 |
| Thời gian giữ | Chưa có; tạm không xóa | Tham số | §9-4 ("quyết khi thiết kế"), S01-09 |
| Màn xem nhật ký thao tác và xử lý | Không làm; đội trích xuất khi khách yêu cầu | Đề xuất | S10-02 |

## Dữ liệu [Đề xuất nội bộ]

`audit_logs`: `id`, `kind` (`view`, `operation`, `process`), `actor_type`, `actor_id`, `action`, `target_type`, `target_id`, `before`, `after`, `result`, `created_at`. Không cấp quyền sửa, xóa cho vai trò nào của ứng dụng. Không ghi khóa API hay mật khẩu (§10-2).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Mỗi thao tác trong danh sách bước 2 tạo đúng một dòng.
2. Không vai trò nào của ứng dụng sửa hay xóa được dòng nhật ký.
3. Không dòng nào chứa khóa API, mật khẩu hay mã thông báo.

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP10: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §9-4, §10-2, §6-2 (7-6). [AG] trang 10 (M-19).
