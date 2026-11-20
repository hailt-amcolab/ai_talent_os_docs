# 7-4 Danh sách thông báo cho quản lý

## Đối chiếu nguồn hiện hành — 20/11/2026

Bỏ nút đánh dấu xử lý; mở dòng thông báo sang màn liên quan thì đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Lọc mặc định chưa mở, bỏ lọc xem cả đã mở. Yêu cầu duyệt nằm danh sách M-04 riêng. Thông báo và email gửi Manager phụ trách, không mọi người.

Phân công category/cá nhân và fallback vẫn No.6; email loại nào và câu chữ còn cần rà mẫu. Không tự chốt đã xử lý chung hay riêng từng Manager.

Căn cứ: `M19:6,8;BF19:14;GJ19:6,7` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0591;EV-0593;EV-0626;EV-0639;EV-0640`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP09 – Thông báo và nền tảng PWA |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-12, chức năng 7-4; 別紙A; UC-10 |
| Màn hình [AG] | M-02 (màn đầu tiên sau đăng nhập); số đếm ở menu trái; màn trên điện thoại (trang 11) |
| Tên trong mã nguồn | Manager Notification Center |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ✅ lọc nhóm ([KS] 確認47) | ✅ | ⚠ đội đề xuất | ⚠ C-05 |

## Mục đích

Thông báo cho quản lý hiện ở danh sách trên màn hình quản trị, lọc theo loại và theo đã xử lý hay chưa. Mở thông báo thì vào màn của tài năng liên quan (§6-12 chức năng 7-4).

## Luồng chính

1. Tạo thông báo cho Manager phụ trách Talent theo phân công; không gửi toàn bộ Manager mặc định. Category hay cá nhân và fallback còn No.6/KS20261120 No.10.
2. M-02 (SD-M19 trang6) hiển thị ngày, loại, Talent, nội dung; lọc theo loại/category. Mặc định chỉ thông báo chưa mở; bỏ lọc để xem cả đã mở.
3. Nhấn dòng để mở màn liên quan: thông báo được đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Không có nút 対応済みにする riêng.
4. Yêu cầu duyệt bài nằm M-04 riêng, không liệt kê lại ở M-02.
5. Có email tới Manager phụ trách theo BF19 trang14; loại email/câu chữ cuối tiếp tục No.75 và rà mẫu thông báo/email. Không tự chọn trạng thái đã đọc chung hay riêng từng Manager.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Hai quản lý cùng đánh dấu | Lần sau không đổi gì | [Đề xuất nội bộ] |
| Thông báo trùng (cùng tài năng, cùng loại, chưa xử lý) | Một số loại không tạo thêm (ví dụ 深刻な相談, S03-10) | C-05 |
| Danh sách dài | Phân trang; mặc định chỉ hiện chưa xử lý | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Chỉ hiện trên màn hình quản trị, không gửi thư hay thông báo đẩy cho quản lý | Giả định (確認45); khách ghi muốn thêm email, chưa chốt | 別紙A |
| Lọc theo loại và đã xử lý | Chốt | §6-12 |
| 9 loại cho quản lý | Theo C-05 ([AG] M-02 có 9 loại; 7-4 trong [YK2] liệt kê 8, thiếu mất kết nối) | A6 |

## Dữ liệu [Đề xuất nội bộ]

`manager_notifications`: `id`, `type`, `talent_id`, `ref_id` (bài, đơn…), `body`, `handled_by`, `handled_at`, `created_at`.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho có đơn xin dùng mới, thì mọi quản lý thấy một dòng 利用の申し込み ở M-02.
2. Cho quản lý A đánh dấu đã xử lý, thì quản lý B không còn thấy dòng đó khi tắt "対応済みも表示".
3. Cho bài chờ duyệt đã được duyệt, thì thông báo 承認の依頼 tương ứng tự là đã xử lý.
4. Lọc loại 投稿の失敗 thì chỉ hiện loại đó.

## Ngoài phạm vi của chức năng này

- Thư điện tử hoặc thông báo đẩy cho quản lý (giả định 確認45; khách muốn thêm email, chưa chốt). Ô 「未対応」 (chưa xử lý) như khách ghi ở 確認46: chưa chốt.

## Phụ thuộc

C-05, 1-6, các module phát thông báo.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認45, 46, 47.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S09-02 | Đánh dấu đã xử lý áp dụng cho mọi quản lý | Không | Như đề xuất |
| S09-03 | Tự đánh dấu đã xử lý khi việc xong | Không | Như đề xuất |
| A6 | 7-4 thiếu loại mất kết nối | Không | Theo [AG] M-02 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP09: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §3-3, §6-12 (7-4), 別紙A, UC-10, 確認45–47. [AG] trang 6 (M-02), trang 11.
