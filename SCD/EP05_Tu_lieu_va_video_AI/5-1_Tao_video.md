# 5-1 Tạo video

## Đối chiếu nguồn hiện hành — 20/11/2026

T-14 bản 19/11 chỉ mô tả video ngắn từ ảnh; tạo khi Talent yêu cầu và xem giá trước.

CONFLICT: QA No.36/CR-04 trước có cả video ngắn và slideshow; nguồn 19/11 chỉ nêu short. Không tự xóa slideshow hoặc suy đã duyệt đổi phạm vi.

Căn cứ: `T19:20;BF19:12` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0572;EV-0624`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP05 – Tư liệu và video AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-8, chức năng 5-1; §5-7; UC-06, UC-06 前提 |
| Màn hình [AG] | T-11 (tạo video), T-12 (xem), T-14 (thông báo xong); M-08 (nút 動画を作る, chỉ cho tài khoản công ty, [KS] 確認27) |
| Tên trong mã nguồn | AI Video Generation |
| Mức sẵn sàng | 🔴 Đỏ – chưa rõ cách làm video trình chiếu ảnh (S05-05), chưa có đơn giá, chưa kiểm chứng tham số và thời gian tạo của Kling |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ S05-05 | ⚠ đội đề xuất | ❌ đơn giá | ⚠ đội đề xuất | ✅ | ❌ kiểm chứng Kling | ⚠ đội đề xuất | ⚠ 5-4, 6-3 |

## Mục đích

Tài năng chọn loại video (ショート動画: người trong ảnh chuyển động; スライド動画: các ảnh nối tiếp), chọn ảnh, xem độ dài dự kiến và đơn giá rồi yêu cầu tạo. Tạo xong thì báo. Tạo lỗi thì báo lý do và không tính lần tạo (§6-8 chức năng 5-1, §5-7).

## Tác nhân và quyền

- Tài năng: tạo video cho bài của mình.
- Quản lý: tạo thay ở M-08, **chỉ cho tài khoản công ty** ([KS] 確認27); số lần vẫn đếm cho tài khoản đó, phí do アデッソ quyết toán nội bộ.

## Luồng chính

1. Từ T-09 bấm 動画を作る, mở T-11.
2. Chọn loại: ショート動画 hoặc スライド動画 (確認31). Chọn ảnh từ tư liệu đã gửi (ショート: 1 ảnh; スライド: 2–10 ảnh, theo thứ tự).
3. Hiện độ dài dự kiến, **đơn giá mỗi lần (giá tham khảo)**, câu "số tiền thu có thể khác số hiện ở đây; tạo lại cũng tính một lần", số lần đã tạo trong tháng (5-4).
4. Bấm この内容で動画を作る (tạo video với nội dung này): tạo bản ghi lần tạo ở trạng thái "đang tạo", **tính một lần** (5-4), đưa việc vào hàng đợi. Tài năng đóng ứng dụng được (UC-06 前提).
5. Worker:
   - ショート動画: gửi ảnh và câu mô tả chuyển động sang Kling qua fal.ai. Câu mô tả do hệ thống tạo từ bản nháp (chủ đề, kịch bản), tài năng không nhập (S05-06).
   - スライド動画: cách làm chờ S05-05 (dùng Kling, hay hệ thống tự ghép ảnh).
6. Nhận kết quả qua webhook của fal.ai: chuẩn hóa định dạng (5-2), lưu (6-4, nguồn `ai_generated`), trạng thái "xong".
7. Báo tài năng: thông báo trong ứng dụng và thông báo đẩy "動画ができました" ([AG] T-14; 別紙A chưa có loại này, xem A6). Mở thông báo thì vào T-12 (5-3).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| fal.ai báo lỗi | Trạng thái "lỗi", hiện lý do, **trả lại** lần đã tính | §6-8, §6-3 chức năng 5-4 |
| Quá 15 phút không có kết quả | Coi là lỗi, trả lại lần đã tính | S05-08 |
| Bấm tạo hai lần liên tiếp | Lần hai bị chặn khi lần một đang tạo | [Đề xuất nội bộ] |
| fal.ai ngừng dịch vụ | Tắt nút tạo video, hiện "tạm thời không tạo được"; các chức năng khác vẫn chạy | §9-3 |
| Ảnh không hợp (không có người, quá nhỏ) | Kiểm tra trước khi gửi; không đạt thì báo, không tính lần | [Đề xuất nội bộ] |
| Webhook đến hai lần | Xử lý một lần (khóa theo mã yêu cầu) | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Loại video | ショート動画, スライド動画 | Giả định (確認31) | §5-7 |
| Tính lần | Khi tài năng xác nhận yêu cầu; tạo lại cũng tính; lỗi phía dịch vụ thì không tính | Chốt | §6-3 chức năng 5-4 |
| Đơn giá mỗi lần | アデッソ quyết | ❌ chưa có | UC-06 前提 |
| Không có lượt miễn phí, không có trần tháng | — | Chốt | [AG] T-11 |
| Thời gian chờ tối đa | 15 phút | Tham số | S05-08 |
| Số ảnh | Video ngắn 1 ảnh; trình chiếu 2–10 ảnh | Tham số | S05-07 |

## Dữ liệu [Đề xuất nội bộ]

`video_jobs`: `id`, `talent_id`, `draft_id`, `type` (`short`, `slide`), `source_media_ids[]`, `prompt`, `requested_by` (tài năng hoặc quản lý), `status` (`queued`, `generating`, `done`, `failed`), `fal_request_id`, `result_media_id`, `billable` (true; về false khi lỗi), `unit_price_jpy` (giá lúc yêu cầu), `error_reason`, `requested_at`, `finished_at`.

## Màn hình

T-11: hai loại, lưới ảnh, khung vàng độ dài và giá ("¥—" tới khi có đơn giá), nút この内容で動画を作る, "đóng ứng dụng được, xong sẽ báo", "今月の動画生成回数". M-08: nút 動画を作る (khung đỏ).

## Tích hợp

fal.ai (Kling): gửi theo hàng đợi, nhận kết quả qua webhook. Phải kiểm chứng: mô hình, độ dài (5 hay 10 giây), độ phân giải, thời gian tạo, chi phí thực tế mỗi lần (B9).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng xác nhận tạo ショート動画, thì số lần trong tháng tăng 1 ngay và có việc ở hàng đợi.
2. Cho fal.ai trả lỗi, thì tài năng thấy lý do và số lần trở về như trước.
3. Cho tạo xong khi tài năng đã đóng ứng dụng, thì có thông báo; mở thông báo vào T-12.
4. Cho Manager yêu cầu tạo thay, chỉ cho tài khoản công ty; đếm lượt phục vụ quyết toán nội bộ, không lập phí phải thu cho Talent thường. Yêu cầu làm thay Talent thường bị từ chối theo GJ xác nhận27/QA No.43; nơi thao tác office còn chờ No.66, không tự khẳng định màn quản trị đã chốt.
5. Cho fal.ai ngừng, thì nút tạo bị tắt và các màn khác vẫn dùng được.

## Ngoài phạm vi của chức năng này

- Tài năng tự viết câu mô tả cho AI (S05-06). Thêm nhạc nền (bản quyền; [YK2] không có).
- Gói lượt miễn phí, trần chi phí tháng: đã bỏ ở v2.

## Phụ thuộc

6-3, 6-4 (tư liệu), 5-2, 5-4 (đếm và thu phí, EP08), 6-1 (thông báo).

## Câu hỏi mở

Video do AI tạo hoặc AI chỉnh phải ghi nhãn theo điều khoản mạng xã hội khi đăng ([KS] 前提 UC-06-3).

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認27, 31.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S05-05 | Cách làm và tính phí video trình chiếu ảnh | Có | — |
| — | Đơn giá mỗi lần (アデッソ quyết) | Có (chạy thật) | Hiện "¥—" |
| B8 | Quản lý tạo thay thì tính cho tài năng | Không | Như B8 |
| B9 | Đơn giá cố định hay theo chi phí thật | Không (thuộc EP08) | Đơn giá cố định |
| S05-06 | Hệ thống tự viết câu mô tả chuyển động | Không | Như đề xuất |
| S05-07 | Số ảnh mỗi loại | Không | 1 và 2–10 |
| S05-08 | Quá 15 phút coi là lỗi | Không | Như đề xuất |
| A6 | Thông báo "video tạo xong" chưa có trong 別紙A | Không | Theo [AG] T-14 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP05: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-7, §6-3 (5-4), §6-8 (5-1), §9-3, UC-06, UC-06 前提, 確認27, 31.
- [AG] trang 4 (T-11, T-12), trang 5 (T-14), trang 7 (M-08). [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) A6, B8, B9.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.36, CR-04 (đã chốt): hai loại video. **Video trình chiếu ảnh làm ở máy chủ bằng cách ghép ảnh, không gọi thêm dịch vụ AI** (không qua fal.ai). Video ngắn vẫn qua Kling. Đóng S05-05.
- CR-09 (đã chốt làm ở SP1): quản lý tạo video thay từ màn quản trị, gọi cùng luồng với tài năng. **Bảng xác nhận 17/11 ([KS] 確認27) thu hẹp: chỉ làm thay cho tài khoản công ty**, nên phần "phí tính vào hóa đơn của tài năng" không còn dùng. Đóng B8.
- Q&A No.2, No.62: đơn giá video là một giá trị cài đặt ở màn quản trị.
