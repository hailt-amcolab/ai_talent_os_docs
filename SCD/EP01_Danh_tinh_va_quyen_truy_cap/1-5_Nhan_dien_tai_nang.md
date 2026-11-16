# 1-5 Nhận diện tài năng

| Mục | Giá trị |
|---|---|
| Module | EP01 – Danh tính và quyền truy cập |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-1, chức năng 1-5; §3-2; §10-1 |
| Màn hình [AG] | Không có màn riêng. Áp dụng cho mọi màn của tài năng |
| Tên trong mã nguồn | Talent Identification & Data Isolation |
| Mức sẵn sàng | 🟢 Xanh – chỉ cần đội chốt thiết kế, không chờ khách |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ⚠ đội đề xuất | ✅ không cần màn | ✅ | ⚠ đội đề xuất | ⚠ cần 1-4, 2-2 |

## Mục đích

Hệ thống luôn biết đang phục vụ tài năng nào. Mọi câu trả lời của AIコーチ và mọi bản nháp chỉ dùng dữ liệu của đúng tài năng đó. Nhiều tài năng dùng cùng lúc cũng không lộ thông tin của nhau (§6-1 chức năng 1-5).

## Tác nhân và quyền

- Hệ thống (API và worker): xác định tài năng, chỉ đọc và ghi dữ liệu của tài năng đó.
- Tài năng: chỉ thấy bản nháp, hội thoại, kết quả của mình (§3-2, §10-1).
- Quản lý: thấy mọi tài năng (§3-2, 確認41). Quyền của quản lý do chức năng 1-6 lo.

## Điều kiện trước, kết quả sau

- **Trước:** tài năng đã đăng nhập (1-4). Thư mục OneDrive của tài năng đã được gắn với bản ghi tài năng (2-2).
- **Sau:** mỗi yêu cầu, mỗi việc nền đều gắn đúng một tài năng.

## Luồng chính

1. **Yêu cầu từ ứng dụng:** lấy người dùng từ phiên đăng nhập, tìm bản ghi tài năng tương ứng. Mọi truy vấn chạy với quyền của người dùng đó, và RLS (bảo mật theo dòng) của Postgres lọc dữ liệu.
2. **Việc nền trên worker:** mỗi việc mang theo đúng một mã tài năng. Worker chỉ đọc thư mục OneDrive ghi trong bản ghi của tài năng đó, chỉ đọc dữ liệu của tài năng đó trong cơ sở dữ liệu.
3. **Gọi OpenAI:** mỗi lần gọi chỉ đưa dữ liệu của một tài năng. Không dùng chung luồng hội thoại hay bộ nhớ đệm giữa các tài năng.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Không có phiên đăng nhập, hoặc phiên hết hạn | Trả lỗi chưa đăng nhập, về T-02 | [Đề xuất nội bộ] |
| Tài năng gọi API với mã dữ liệu của tài năng khác | RLS trả về rỗng, hoặc lỗi không có quyền. Không tiết lộ dữ liệu có tồn tại hay không | §10-1 |
| Tài năng chưa có thư mục, hoặc quản lý chưa nhập hồ sơ | Không gọi AI để tạo bản nháp | UC-01 前提 |
| Việc nền không có mã tài năng, hoặc thư mục không khớp | Dừng việc, ghi nhật ký xử lý, không chạy tiếp | [Đề xuất nội bộ] |
| Tài khoản công ty | Đối xử như một tài năng | §3-1 |

## Quy tắc và giá trị

| Quy tắc | Nguồn |
|---|---|
| Tài năng chỉ thấy dữ liệu của mình | §3-2, §10-1 |
| Mọi quản lý thấy mọi tài năng | §3-2, 確認41 |
| Chỉ gửi AI phần dữ liệu cần cho lần trả lời hoặc lần tạo bản nháp đó | §10-2 |

## Dữ liệu [Đề xuất nội bộ]

- Mọi bảng chứa dữ liệu tài năng có cột `talent_id` bắt buộc, kèm chính sách RLS: tài năng chỉ đọc và ghi dòng có `talent_id` của mình; quản lý (vai trò `manager`) đọc mọi dòng.
- `talents.onedrive_folder_id`: thư mục duy nhất worker được đọc cho tài năng đó (chức năng 2-2 ghi giá trị này).
- Khóa quản trị (service role) chỉ dùng trên worker và máy chủ, không bao giờ xuống trình duyệt (file 18 mục 7).

## Màn hình

Không có màn riêng.

## Tích hợp

- **Microsoft Graph:** chỉ đọc theo `onedrive_folder_id` của tài năng, không duyệt cả cây thư mục.
- **OpenAI:** mỗi lần gọi một tài năng.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng A và B, khi A gọi API đọc hội thoại, bản nháp, kết quả bằng mã của B, thì không nhận được dữ liệu nào của B.
2. Cho mọi bảng có cột `talent_id`, thì đều có chính sách RLS. Kiểm thử tự động liệt kê bảng thiếu chính sách và báo lỗi.
3. Cho A và B trò chuyện với AIコーチ cùng lúc, thì câu trả lời cho A không chứa thông tin trong hồ sơ của B, và ngược lại.
4. Cho một việc nền của A, khi chạy, thì worker chỉ đọc thư mục OneDrive của A.
5. Cho quản lý đã đăng nhập, thì đọc được dữ liệu của mọi tài năng.

## Ngoài phạm vi của chức năng này

- Đăng nhập (1-4, 1-6). Ghi nhật ký quản lý xem thông tin (7-6).

## Phụ thuộc

- 1-4 (phiên đăng nhập của tài năng). 2-2 (gắn thư mục OneDrive). Viết mã được trước, dùng thư mục giả.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| 確認41 | Mọi quản lý thấy mọi tài năng | Không | Đúng như [YK2] |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP01: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §3-2, §6-1 (1-5), §10-1, §10-2, UC-01 前提, 確認41.
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 1. [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 4 và 7.
