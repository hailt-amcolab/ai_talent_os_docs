# 2-1 Đọc thông tin tài năng

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Ảnh chân dung và liên kết profile Adesso — PROPOSAL của nguồn:** M-21 thêm một ảnh cận mặt, trường URL profile Adesso và nút mở profile; vẫn có năm nhóm thông tin, lịch sử và chỉnh qua ChatGPT. **Giới hạn:** SD-M19 p26 chưa nêu hai đầu vào này. Chưa chốt tính bắt buộc, định dạng/quyền ảnh, nơi lưu, URL chỉ mở hay được AI đọc. Không tự fetch/crawl URL hoặc mở quyền ghi ảnh qua MCP. Nguồn `UI-M20 PDFtrang27`; EV `EV-1237`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Đối chiếu nguồn hiện hành — 20/11/2026

Folder Talent tạo tự động khi đăng ký thanh toán; folder office tạo ngay khi tạo tài khoản. Chưa nhập hồ sơ thì AI không tạo bài. Hồ sơ/chỉ thị đọc từ nguồn tương ứng; không yêu cầu Manager tạo folder thủ công.

Định dạng, chống ghi lặp/đồng thời và khôi phục là việc đội; chưa tự thay kiến trúc OneDrive.

Căn cứ: `T19:9;M19:7,17;BF19:4,18` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0561;EV-0592;EV-0602;EV-0616;EV-0630`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP02 – Thông tin tài năng và nguồn dữ liệu cho AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-4, chức năng 2-1; §7-5; §9-2 |
| Màn hình [AG] | Không có |
| Tên trong mã nguồn | Talent Data Loading |
| Mức sẵn sàng | 🟡 Vàng – luồng rõ. Chưa chạy thật được tới khi có quyền Microsoft Graph (S02-02); tốc độ đọc cho 1.000 người phải đo |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ giờ bắt đầu là tham số | ⚠ đội đề xuất | ✅ không cần màn | ⚠ S02-02, đo tốc độ | ⚠ đội đề xuất | ⚠ 2-2, 8-8 |

## Mục đích

Mỗi sáng, trước giờ AIコーチ nhắn tin, đọc các file trong thư mục của tài năng và thư mục chung. Nội dung sửa đến hôm trước được dùng cho tin nhắn và bản nháp hôm nay (§6-4 chức năng 2-1, §7-5).

## Tác nhân

Hệ thống (worker, lô buổi sáng).

## Luồng chính

1. Lô buổi sáng bắt đầu ở giờ cài đặt (đề xuất 5:00, file 18 mục 6), sau khi đã lấy và ghi kết quả (8-7, 8-8).
2. Đọc thư mục chung (`共通/`) một lần cho cả lô.
3. Với mỗi tài năng ở trạng thái 利用中 (đang dùng): đọc `プロフィール.md`, `目標.md`, `AIメモ.md` và phần tóm tắt kết quả. Chỉ tải file đã đổi kể từ lần trước (so phiên bản eTag).
4. Lưu nội dung đã đọc vào bảng ảnh chụp ngữ cảnh, kèm thời điểm đọc.
5. Chuyển ngữ cảnh cho phần tạo tin nhắn và bản nháp (3-1, 3-6, 4-1).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Đọc một file lỗi | Thử lại. Vẫn lỗi thì dùng bản đọc gần nhất, ghi nhật ký xử lý (C-03) | §9-3; S02-07 |
| Chưa có bản nào và chưa có hồ sơ | Không tạo bản nháp cho tài năng này hôm nay | UC-01 前提 |
| Microsoft Graph lỗi cho cả lô | Dùng bản đọc gần nhất cho mọi người, cảnh báo đội vận hành | §9-3 |
| File quá dài | Cắt theo giới hạn ký tự mỗi file, ghi cảnh báo. M-07 hiện "hồ sơ quá dài" | [Đề xuất nội bộ] |
| Quản lý sửa file trong lúc lô đang chạy | Dùng nội dung tại lúc đọc. Phần sửa sau áp dụng ngày mai | §6-4 ("前日までに書き換えた内容") |
| Quản lý sửa `AIメモ.md` | Cho phép, nhưng AI ghi thêm vào file có kiểm tra phiên bản để không đè mất | [Đề xuất nội bộ] |
| Lô không xong trước giờ nhắn | Cảnh báo đội vận hành. Tài năng chưa xử lý vẫn được làm tiếp, nhắn trễ | §9-2; file 18 mục 8 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Đọc trước giờ nhắn | Khung sáng mặc định 8:00; trưa, tối theo [KS] 確認18 (giờ chưa có) | Tham số | §5-6, §6-4 |
| Giờ bắt đầu lô | 5:00 | Tham số [Đề xuất nội bộ] | — |
| Giới hạn độ dài mỗi file | 20.000 ký tự | Tham số [Đề xuất nội bộ] | — |
| Nội dung sửa đến hôm trước dùng cho hôm nay | — | Chốt | §6-4 |

## Dữ liệu [Đề xuất nội bộ]

`talent_context_snapshots`: `talent_id`, `file_name`, `etag`, `content`, `truncated`, `fetched_at`. Thư mục chung lưu với `talent_id` trống.

## Tích hợp

Microsoft Graph: đọc file theo mã thư mục, dùng eTag hoặc truy vấn thay đổi (delta) để chỉ tải file đã đổi. Đo tốc độ với 1.000 tài năng trước khi chốt giờ bắt đầu (§9-2).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho quản lý sửa `プロフィール.md` lúc 22:00, thì tin nhắn 8:00 hôm sau dùng nội dung mới.
2. Cho file không đổi từ hôm trước, thì lô không tải lại file đó.
3. Cho Microsoft Graph lỗi khi đọc tài năng A, thì A vẫn nhận tin nhắn dựa trên bản đọc gần nhất, và có một dòng nhật ký xử lý.
4. Cho tài năng chưa có hồ sơ, thì không có bản nháp cho tài năng đó.
5. Cho tài năng ở trạng thái 利用終了, thì lô không đọc thư mục của tài năng đó.

## Ngoài phạm vi của chức năng này

- Tạo tin nhắn và bản nháp (EP03, EP04). Ghi kết quả vào thư mục (8-8). AI ghi `AIメモ.md` (3-2).

## Phụ thuộc

- 2-2 (thư mục). 8-7, 8-8 (kết quả ghi trước khi đọc). Lô buổi sáng của worker (EP10, file 18).

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S02-02 | Quyền Microsoft Graph và vị trí thư mục | Có (chạy thật) | OneDrive giả |
| S02-07 | Đọc lỗi thì dùng bản gần nhất | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP02: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-6, §6-4 (2-1), §7-5, §9-2, §9-3, UC-01 前提.
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 4. [File 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 6.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.22 (đã chốt): file đọc lỗi định dạng hoặc thiếu thông tin là lỗi trong thiết kế của mình. **Hiện tình trạng đọc file ở màn chi tiết tài năng** (lần đọc gần nhất, thành công hay lỗi, file nào lỗi). Tài năng chưa có thông tin thì AIコーチ không đưa bản nháp ([YK2] UC-01 前提). Đóng S02-07.
- Mẫu file (ひな形) do khách (FutureCore) đưa; S02-04 không cần đề xuất mẫu của mình.
- Q&A No.54 (đang hỏi): có thể thêm nút "đã đăng ký xong" ở màn chi tiết tài năng thay cho việc tự kiểm tra file. Chờ trả lời.
