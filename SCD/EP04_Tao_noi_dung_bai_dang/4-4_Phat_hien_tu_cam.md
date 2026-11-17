# 4-4 Phát hiện từ cấm

| Mục | Giá trị |
|---|---|
| Module | EP04 – Tạo nội dung bài đăng |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-6, chức năng 4-4; §5-3; UC-02 前提; UC-05 前提; §11 |
| Màn hình [AG] | M-11 (xem và sửa bài dính từ cấm), M-17 (danh sách từ cấm), M-02 (thông báo), T-09 hoặc T-13 (lý do cho tài năng) |
| Tên trong mã nguồn | Forbidden Words Check |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Luồng sau khi quản lý sửa là đề xuất (B5) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ B5 | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ⚠ M-11 có 予約しない | ✅ OpenAI | ⚠ cần bộ câu thử | ⚠ 4-3, 7-4 |

## Mục đích

Khi tài năng chấp nhận bài, AI kiểm tra chú thích và hashtag có từ trong danh sách cấm, hoặc cách nói tương đương, xét cả ngữ cảnh. Có thì không hẹn giờ, báo lý do cho tài năng và báo quản lý. Quản lý sửa xong thì hẹn giờ được. Danh sách do quản lý thêm, sửa, xóa; dùng chung cho mọi tài năng (§6-6 chức năng 4-4).

## Tác nhân và quyền

- Hệ thống: kiểm tra.
- Quản lý: quản lý danh sách ở M-17; xem và sửa bài ở M-11.
- Tài năng: chỉ thấy lý do.

## Luồng chính

**A. Kiểm tra (gọi từ 4-3)**
1. Gửi AI: chú thích, hashtag, tiêu đề YouTube (B3), cùng toàn bộ danh sách từ cấm. Yêu cầu trả về: có hay không, các đoạn bị trúng, từ trong danh sách tương ứng, lý do ngắn.
2. Không có: trả "sạch" cho 4-3.
3. Có: bài sang "dính từ cấm". Báo tài năng: lý do và đoạn bị trúng (S04-07). Tạo thông báo 使ってはいけない言葉の検出 cho mọi quản lý (7-4).

**B. Quản lý xử lý (M-11)**
4. Quản lý mở M-11: ảnh, video, chú thích (sửa được), đoạn bị trúng tô màu, giờ đăng dự kiến.
5. Bấm 直して予約する (sửa và hẹn giờ): lưu bản sửa → **kiểm tra lại từ cấm** → sạch thì hẹn giờ như 4-3 bước 6 → báo tài năng nội dung đã được sửa (B5).
6. Bấm 予約しない (không đăng): bài sang "đã hủy", báo tài năng ([AG] M-11; [YK2] không ghi, xem S04-08).

**C. Danh sách (M-17)**
7. Quản lý thêm, sửa, xóa từ hoặc cách nói. Áp dụng ngay cho lần kiểm tra sau. Ghi nhật ký thao tác (C-03).

**D. Phòng ngừa**
8. Danh sách cũng được đưa vào lời nhắc tạo bản nháp (4-1, 4-2) để AI tránh ngay từ đầu (UC-05).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Gọi AI kiểm tra lỗi | Không hẹn giờ; thử lại qua hàng đợi. Vẫn lỗi thì coi như "dính từ cấm" để quản lý xem tay (an toàn hơn đăng nhầm) | S04-06, §9-3 |
| Quản lý sửa xong mà vẫn dính | Báo ngay trên M-11, không hẹn giờ | B5 |
| Quản lý sửa khi đã qua giờ đăng dự kiến | Hẹn theo quy tắc chấp nhận trễ (S04-01) | S04-08 |
| Không quản lý nào xử lý | Bài nằm ở "dính từ cấm" tới khi có người xử lý; không tự hủy | [Đề xuất nội bộ] |
| Hai quản lý cùng sửa | Người lưu trước thắng; người sau thấy "đã được xử lý" | [Đề xuất nội bộ], cùng nguyên tắc 確認34 |
| AI bỏ sót | Có thể xảy ra; [YK2] đã ghi rõ | §6-6, §11 |
| Danh sách rỗng | Vẫn kiểm tra các biểu hiện vi phạm quy định mạng xã hội trong mẫu đội đưa | UC-02 前提 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Một danh sách chung cho mọi tài năng | Chốt | §6-6, UC-02 前提 |
| AI xét cả ngữ cảnh, có thể bỏ sót | Chốt | §6-6 |
| Có từ cấm thì không hẹn giờ, báo tài năng và quản lý | Chốt | §6-6, §5-3 |
| Đội đưa danh sách mẫu, アデッソ xem lại | Chốt | UC-02 前提, §11 |
| Kiểm tra lại sau khi quản lý sửa | Đề xuất | B5 |

## Dữ liệu [Đề xuất nội bộ]

- `forbidden_words`: `id`, `expression`, `note`, `created_by`, `updated_at`.
- `ng_checks`: `post_id`, `result` (`clean`, `hit`, `error`), `hits` (đoạn trúng, từ tương ứng, lý do), `checked_at`, `trigger` (`adopt`, `manager_edit`).

## Màn hình

- M-11: "見つかった表現" tô màu, chú thích sửa được, nút 直して予約する, 予約しない ([AG] trang 8).
- M-17: bảng "使ってはいけない言葉の一覧", nút 追加する, 変更, 削除 ([AG] trang 10).
- Phía tài năng: lý do hiện ở T-09 hoặc T-13 và thông báo trong ứng dụng.

## Tích hợp

OpenAI qua lớp gọi chung (3-5).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

Đội soạn bộ câu thử tiếng Nhật (có từ trong danh sách, cách nói tương đương, câu sạch dễ nhầm) và đo trước mỗi lần đổi lời nhắc.

1. Cho chú thích "絶対にやせます" và danh sách có "絶対にやせる", thì bài bị chặn và M-02 có thông báo.
2. Cho chú thích sạch, thì bài đi tiếp sang hẹn giờ.
3. Cho quản lý sửa thành câu sạch rồi bấm 直して予約する, thì bài được hẹn giờ và tài năng nhận thông báo kèm nội dung mới.
4. Cho quản lý sửa nhưng vẫn còn từ cấm, thì không hẹn giờ.
5. Cho quản lý thêm từ mới ở M-17, thì lần kiểm tra sau dùng từ đó.
6. Cho gọi AI lỗi liên tục, thì bài không được hẹn giờ.

## Ngoài phạm vi của chức năng này

- Danh sách từ cấm riêng cho từng tài năng: không có (một danh sách chung). Muốn khác cho từng người thì アデッソ tự đổi danh sách (UC-02 前提).
- Kiểm tra hình ảnh, video: [YK2] chỉ nói chú thích và hashtag.

## Phụ thuộc

4-3, 7-4 (thông báo), 1-6 (quản lý), C-02 (danh sách là cài đặt chung).

## Câu hỏi mở

Các 確認 liên quan (không xử lý ở đây): 確認4.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| B5 | Sau khi quản lý sửa: kiểm tra lại, tự hẹn giờ, báo tài năng | Không | Như B5 |
| S04-07 | Tài năng thấy lý do gì | Không | Đoạn bị trúng và câu "quản lý sẽ xem và sửa" |
| S04-06 | AI kiểm tra lỗi thì coi như dính từ cấm | Không | Như đề xuất |
| S04-08 | Nút 予約しない của M-11; sửa sau giờ đăng | Không | Giữ nút; hẹn theo S04-01 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP04: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-3, §6-6 (4-4), §11, UC-02 前提, UC-05, UC-05 前提, 確認4.
- [AG] trang 8 (M-11), trang 10 (M-17). [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) B5.

## Cập nhật theo Q&A (bản ngày 15/11/2026)

- Q&A No.40, CR-06 (đã chốt): màn của quản lý cho bài dính từ cấm là **màn tối thiểu: sửa chữ, hẹn giờ, hủy**.
- Q&A No.57 (đang hỏi): kiểm tra từ cấm trước khi gửi duyệt; quản lý sửa xong bấm "予約する" thì coi như đã duyệt; quá giờ thì dời sang khung kế tiếp; báo tài năng là chữ đã được sửa.
- Mẫu danh sách từ cấm do FutureCore đưa (Q&A No.13, No.27).
