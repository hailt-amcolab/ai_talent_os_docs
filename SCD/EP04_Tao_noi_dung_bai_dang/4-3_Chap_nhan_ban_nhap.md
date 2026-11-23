# 4-3 Chấp nhận bản nháp (採用)

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**TikTok: tách gửi nháp và đăng công khai — PROPOSAL của nguồn:** Đề nghị gửi TikTok vào inbox/nháp để Talent hoàn tất trong app, thay nhánh tự động không xác nhận; nguồn đề nghị Instagram/YouTube giữ hai chế độ. **Giới hạn:** Chưa chọn phương án thay thế quyết định hai chế độ đã có. Gửi nháp chưa phải đã đăng; cần kiểm đồng ý trước khi gửi, quyền upload, ảnh/video, lịch, caption và đối soát. Draft không tự giải quyết điều kiện sử dụng cho agency. Nguồn `ISS22-P PDFtrang2; ISS22-P PDFtrang3; ADV22 PDFtrang5; ADV22 PDFtrang10`; EV `EV-1242;EV-1243;EV-1256;EV-1261`.

**Đồng ý và quyền riêng tư theo từng SNS — PROPOSAL của nguồn:** Đề nghị hiện tài khoản TikTok, cho người dùng chọn mức công khai không chọn sẵn, cấu hình tương tác/nội dung thương mại và ghi nhận nội dung, media, SNS, thời điểm đồng ý. **Giới hạn:** OAuth kết nối không đồng nghĩa đồng ý cho từng nội dung. Cần UI và phiên bản nội dung được xác nhận; chưa tự thêm schema/API hoặc quyền Manager xác nhận thay. Nguồn `ISS22-P PDFtrang3; ISS22-P PDFtrang7; ISS22-P PDFtrang10`; EV `EV-1243;EV-1247;EV-1250`.

**Xác nhận lại bài AI sửa từ cấm — PROPOSAL của nguồn:** Đề nghị bài có từ cấm phải được Talent xem lại sau AI sửa dù đang chọn không xác nhận từng bài. UI-M20 M-11 vẫn vẽ Manager sửa rồi AI kiểm lại. **Giới hạn:** Có ba nhánh: KS K59 AI sửa/đặt lịch; báo cáo 22/11 thêm Talent xác nhận; UI M-11 Manager sửa. Không tự chọn hoặc đóng No.57/71/90/96 bằng hình minh họa. Nguồn `ISS22-P PDFtrang7; ADV22 PDFtrang7; ADV22 PDFtrang10; UI-M20 PDFtrang18`; EV `EV-1247;EV-1258;EV-1261;EV-1228`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Ngày thiếu tư liệu:** Không gửi ảnh mới thì dùng ảnh đã lưu; ảnh không hợp chủ đề thì đổi chủ đề theo ảnh; không có ảnh thì hướng dẫn chức năng tạo ảnh/video. **Còn mở/giới hạn:** Chưa mặc định phạm vi chức năng tạo ảnh đã được duyệt; QA No.56/83 vẫn có đề xuất dừng ngày đó, hạn tái dùng, nhắc còn2ngày và tự chạy ngày sau chưa được chốt. Nguồn `KS 確認事項!K62;20261120!F9`; bằng chứng `EV-0967`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Chấp nhận yêu cầu có ảnh/video; xin duyệt chỉ hiện cho Talent bật tính năng. Đang chờ Manager duyệt thì không sửa; trả lại có lý do thì sửa rồi xin duyệt lại.

Thiếu tư liệu trong chế độ kiểm tra còn KS No.8; bài đến muộn còn No.56; không chốt mọi giao điểm duyệt/từ cấm cho tự động.

Căn cứ: `T19:17,18,22,30;BF19:7,8` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0569;EV-0570;EV-0574;EV-0582;EV-0619;EV-0620`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP04 – Tạo nội dung bài đăng |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-6, chức năng 4-3; §5-3 (hình 5-2); UC-05 |
| Màn hình [AG] | T-09 (nút この案で投稿する（採用）, ô xin duyệt) |
| Tên trong mã nguồn | Draft Adoption |
| Mức sẵn sàng | 🔴 Đỏ – chưa rõ giờ đăng có từ lúc nào (B1) và chấp nhận sau giờ đăng thì làm gì (S04-01). Bộ trạng thái bài đăng chưa có (C-01) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ❌ S04-01 | ⚠ B1 | ❌ C-01 | ✅ | ⚠ hẹn giờ qua 8-3 | ⚠ đội đề xuất | ❌ 4-4, 7-7, 8-3, 7-5 |

## Mục đích

Tài năng bấm "採用" (chấp nhận) trên bản nháp đã có ảnh hoặc video. Hệ thống kiểm tra từ cấm rồi hẹn giờ đăng, hoặc chuyển sang chờ duyệt nếu tài năng xin duyệt (§6-6 chức năng 4-3, §5-3).

Chức năng này áp cho cách đăng **要確認** (xác nhận trước khi đăng). Cách **自動投稿** (đăng tự động: chọn chủ đề, tải tư liệu, đặt khoảng thời gian, hệ thống tự soạn và tự đăng) không có bước chấp nhận từng bài ([KS] 確認19, 25). Luồng chi tiết của 自動投稿 (duyệt, từ cấm, hết tư liệu, hết khoảng) **chưa có đặc tả**: [Chưa rõ], đang hỏi ở Q&A No.70, 71, 77; cần một SCD riêng khi có trả lời.

## Tác nhân và quyền

- Tài năng: chấp nhận bản nháp của mình. Chỉ tài năng được cài dùng duyệt bài mới thấy ô xin duyệt (7-7).
- Hệ thống: kiểm tra từ cấm, hẹn giờ.

## Luồng chính

1. Ở T-09, nút 採用 chỉ bấm được khi bản nháp đã gắn ảnh hoặc video (6-3, 5-3).
2. Nếu tài năng được cài dùng duyệt bài: hiện ô "仕事の投稿のため、マネージャーに承認を依頼する" (bài công việc, xin quản lý duyệt). AI không tự đoán bài công việc (§5-3).
3. Bấm 採用: khóa bản nháp (không sửa nữa, S04-09), chạy kiểm tra từ cấm (4-4).
4. Có từ cấm: bài sang trạng thái "dính từ cấm", không hẹn giờ; 4-4 xử lý tiếp.
5. Không có từ cấm, có xin duyệt: bài sang "chờ duyệt", báo quản lý (7-7).
6. Không có từ cấm, không xin duyệt:
   - đăng tự động đang chạy (7-5): gửi lịch sang Upload-Post với giờ đăng dự kiến của ngày (B1), bài sang "đã hẹn giờ" (8-3);
   - đăng tự động đang dừng: bài ở "đã chấp nhận, chưa hẹn giờ" (đề xuất B6).
7. Báo tài năng kết quả (đã hẹn lúc mấy giờ, hoặc đang chờ duyệt, hoặc bị chặn và lý do). T-13 hiện bài.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Chấp nhận **sau** giờ đăng dự kiến của ngày | Hẹn sau 15 phút nếu trước 22:00; sau 22:00 thì hẹn vào giờ đăng dự kiến hôm sau | S04-01 (đề xuất); file 13 Q1 |
| Đã có bài khác được hẹn trong ngày | Hẹn ở khung kế tiếp, cách bài trước ít nhất 3 giờ | S04-04 |
| Upload-Post lỗi khi hẹn giờ | Bài ở "hẹn giờ lỗi", thử lại qua hàng đợi; vẫn lỗi thì báo như đăng lỗi (8-5) | §9-3 |
| Bấm 採用 hai lần | Lần hai không làm gì (bản nháp đã khóa) | [Đề xuất nội bộ] |
| Tài năng không chấp nhận trong ngày | Không đăng. Bản nháp giữ theo S04-02. Đã gửi tư liệu mà chưa chấp nhận thì được nhắc cùng lời nhắc của 6-5 (S04-03) | 確認25 (giả định) |
| Không có ảnh, video | Không chấp nhận được | §6-6 |
| Mạng chưa kết nối | Vẫn chấp nhận; 8-3 chỉ đăng lên mạng đã kết nối | §6-10 chức năng 8-3 |
| Bài ảnh | YouTube không đăng (cần video) | §6-10 chức năng 8-3 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Phải có ảnh hoặc video | — | Chốt | §6-6 |
| Chỉ bài đã chấp nhận mới được đăng | Với cách đăng 要確認. Cách 自動投稿 không có bước chấp nhận từng bài, hệ thống tự đăng trong khoảng tài năng đặt | Chốt ([KS] 確認19, 25) | — |
| Giờ đăng do hệ thống quyết | AI chọn theo khung giờ hiệu quả アデッソ viết trong chỉ thị cho AI | Chốt ([KS] 確認30) | §5-2 |
| Thời gian chờ khi chấp nhận trễ | 15 phút | Tham số | S04-01 |
| Giờ chặn cuối ngày | 22:00 | Tham số | S04-01 |
| Khoảng cách giữa hai bài trong ngày | 3 giờ | Tham số | S04-04 |

## Dữ liệu [Đề xuất nội bộ]

`posts`: `id`, `talent_id`, `draft_id`, `draft_version`, `media_ids[]`, `approval_requested`, `status` (theo C-01; tạm: `ng_blocked`, `awaiting_approval`, `adopted_not_scheduled`, `scheduled`, `schedule_failed`, `cancelled`, `posted`, `failed`), `scheduled_at`, `uploadpost_job_id`, `adopted_at`. Kết quả từng mạng lưu ở 8-3. Mọi lần đổi trạng thái ghi nhật ký (C-03).

## Màn hình

T-09: nút この案で投稿する（採用）, ô xin duyệt (chỉ khi được cài), câu "投稿の時刻は AI育成OS が決めます" ([AG] trang 4).

## Tích hợp

Upload-Post: hẹn giờ qua chức năng 8-3. Chống hẹn trùng: khóa theo `post_id`.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho bản nháp chưa có ảnh, video, thì nút 採用 không bấm được.
2. Cho tài năng không được cài duyệt bài, thì không thấy ô xin duyệt.
3. Cho bản nháp sạch, không xin duyệt, đăng tự động đang chạy, thì bài ở "đã hẹn giờ" với giờ đăng dự kiến của ngày và có lịch bên Upload-Post.
4. Cho có xin duyệt, thì bài ở "chờ duyệt" và quản lý của nhóm hoặc quản lý phụ trách có thông báo 承認の依頼 ([KS] 確認34).
5. Cho chú thích có từ cấm, thì bài không được hẹn giờ và tài năng thấy lý do.
6. Cho chấp nhận lúc 20:00 khi giờ dự kiến là 19:00, thì bài được hẹn khoảng 20:15.
7. Cho đăng tự động đang dừng, thì bài ở "đã chấp nhận, chưa hẹn giờ".

## Ngoài phạm vi của chức năng này

- Tài năng hủy bài đã hẹn: không có; chỉ quản lý hủy (7-2).
- Tài năng chọn giờ đăng: không có (確認30).

## Phụ thuộc

4-4, 7-7, 8-3, 7-5, 8-1 (giờ đăng), 6-3 (tư liệu), C-01 (🔴).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認25, 26, 30, 33.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| B1 | Giờ đăng chốt lúc nào | Có | Chốt mỗi sáng |
| S04-01 | Chấp nhận sau giờ đăng | Có | Hẹn sau 15 phút, sau 22:00 thì sang hôm sau |
| C-01 | Trạng thái bài đăng | Có | Danh sách tạm ở mục Dữ liệu |
| B6 | Chấp nhận khi đang dừng đăng tự động | Không | Giữ "đã chấp nhận, chưa hẹn giờ" |
| S04-04 | Nhiều bài trong ngày | Không | Cách nhau 3 giờ |
| S04-03 | Nhắc khi đã gửi tư liệu mà chưa chấp nhận | Không | Gộp vào lời nhắc của 6-5 |
| S04-09 | Không sửa sau khi chấp nhận | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP04: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-2, §5-3, §6-6 (4-3), §6-10 (7-2, 7-5, 8-3), UC-05, 確認25, 26, 30, 33.
- [AG] trang 4 (T-09). [File 13](../../Phan_tich/13_Qua_gio_dang_chua_chap_nhan.md) Q1. [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) B1, B6.


</details>
