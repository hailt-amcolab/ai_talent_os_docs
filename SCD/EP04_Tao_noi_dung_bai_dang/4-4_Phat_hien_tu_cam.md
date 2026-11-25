<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### Từ cấm sau AI sửa

Quyết định24/11: AI viết lại rồi đặt lịch; không thêm bước Talent xác nhận lại, không chuyển Manager sửa.

**Còn mở/giới hạn:** Không tự chốt số lần sửa khi vẫn lỗi, thất bại hoặc tương tác với duyệt bài công việc; No.96 vẫn theo dõi hiệu lực danh sách đổi. Căn cứ: `KS 20261122!G4:I4 (No.3)`; `EV-1313`; QA No.40;QA No.90;QA No.96;TR-4-4.

<!-- /DELIVERY24112026 -->

# 4-4 Phát hiện từ cấm

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Xác nhận lại bài AI sửa từ cấm — PROPOSAL của nguồn:** Đề nghị bài có từ cấm phải được Talent xem lại sau AI sửa dù đang chọn không xác nhận từng bài. UI-M20 M-11 vẫn vẽ Manager sửa rồi AI kiểm lại. **Giới hạn:** Có ba nhánh: KS K59 AI sửa/đặt lịch; báo cáo 22/11 thêm Talent xác nhận; UI M-11 Manager sửa. Không tự chọn hoặc đóng No.57/71/90/96 bằng hình minh họa. Nguồn `ISS22-P PDFtrang7; ADV22 PDFtrang7; ADV22 PDFtrang10; UI-M20 PDFtrang18`; EV `EV-1247;EV-1258;EV-1261;EV-1228`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **AI tự sửa từ cấm:** Phát hiện từ cấm thì AI viết lại và đặt lịch; không theo luồng Manager tự sửa. **Còn mở/giới hạn:** Thay vai trò sửa ở GJ19§12/QA No.40/90/CR-06. Chưa chốt số lượt tự sửa, trường hợp không sạch, duyệt công việc và quá giờ. No.96 chỉ hỏi hiệu lực danh sách đổi sau kiểm, không tự cho quét lại hàng loạt. Nguồn `KS 確認事項!K59`; bằng chứng `EV-0983`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Manager sửa bài bị từ cấm, AI kiểm lại; sạch thì đặt lịch, còn từ cấm thì giữ ở màn xử lý. Không cần trả bản Manager sửa cho Talent xác nhận lại theo GJ19§12.

Quyền Talent tự sửa chính bài đã bị chặn chưa được mô tả rõ như quyền sửa bản nháp thường; chỉ giữ phần này ở No.57.

Căn cứ: `M19:16,23;BF19:17;GJ19:12` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0601;EV-0608;EV-0629;EV-0645`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

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

1. Khi Talent chấp nhận, AI kiểm văn bản/hashtag theo ngữ cảnh; có thể bỏ sót. Có từ cấm thì không đặt lịch và báo Manager phụ trách.
2. Manager mở M-11 (SD-M19 trang16), xem đoạn tô màu/lý do và sửa.
3. Bấm sửa và đặt lịch: AI kiểm lại; còn từ cấm thì giữ bài ở màn này, không đặt lịch. Sạch thì đặt lịch và về M-08. Theo GJ19§12 không cần trả bản Manager sửa cho Talent xác nhận lại.
4. Nút không đặt lịch trở về M-08; không suy mọi trường hợp thành enum hủy.
5. Danh sách từ cấm ở M-18 (SD-M19 trang23), dùng chung.
6. Quyền Talent tự sửa bài đã bị chặn còn No.57; khác quyền sửa bản nháp thường. Giao điểm phê duyệt bài tự động còn No.71.

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

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認4.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| B5 | Sau khi quản lý sửa: kiểm tra lại, tự hẹn giờ, báo tài năng | Không | Như B5 |
| S04-07 | Tài năng thấy lý do gì | Không | Đoạn bị trúng và câu "quản lý sẽ xem và sửa" |
| S04-06 | AI kiểm tra lỗi thì coi như dính từ cấm | Không | Như đề xuất |
| S04-08 | Nút 予約しない của M-11; sửa sau giờ đăng | Không | Giữ nút; hẹn theo S04-01 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP04: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-3, §6-6 (4-4), §11, UC-02 前提, UC-05, UC-05 前提, 確認4.
- [AG] trang 8 (M-11), trang 10 (M-17). [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) B5.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.40, CR-06 (đã chốt): màn của quản lý cho bài dính từ cấm là **màn tối thiểu: sửa chữ, hẹn giờ, hủy**.
- Q&A No.57 (đang hỏi): kiểm tra từ cấm trước khi gửi duyệt; quản lý sửa xong bấm "予約する" thì coi như đã duyệt; quá giờ thì dời sang khung kế tiếp; báo tài năng là chữ đã được sửa.
- Mẫu danh sách từ cấm do FutureCore đưa (Q&A No.13, No.27).


</details>
