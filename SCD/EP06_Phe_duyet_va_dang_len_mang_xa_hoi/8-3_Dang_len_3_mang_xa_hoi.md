<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Giờ đăng và tư liệu đến muộn

Giờ đăng chốt khi tạo nháp; bài thứ hai trở đi dùng khung tiếp theo, cách bài trước ít nhất 3 giờ theo đề xuất được chấp thuận. AI chọn giờ trong khoảng chỉ thị, lệch vài phút giữa Talent và tách khung theo SNS; 採用 quá giờ chuyển khung tiếp theo. Nếu chưa có tư liệu mới, AI chọn tư liệu đã lưu phù hợp bài. Không có thì không đăng, báo Talent trước và sau giờ dự kiến; gửi bổ sung sau đó chuyển khung tiếp theo. Không giới hạn số lần dùng lại tư liệu cho luồng này, AI chọn theo độ phù hợp, không bắt buộc chọn ảnh lâu chưa dùng nhất.

**Phần còn mở/giới hạn:** Auto theo kỳ có giới hạn riêng tại No.83: không dùng cùng ảnh/video hai lần trong kỳ; không áp quy tắc tái sử dụng của No.56 để bỏ giới hạn đó. Thuật toán giờ chi tiết thuộc thiết kế đội.

Căn cứ: QA `Q&A!A56:J56 (No.56)`; `EV-1335` / `DEC-0019`.

### Đăng lại bài lỗi

Không tự đăng lại bài đã thất bại. Talent bấm T-17 ❹「投稿し直す」, Manager bấm M-09 ❹「予約し直す」. Chỉ đăng lại SNS lỗi; giờ mới là khung tiếp theo do AI quyết, giữ kết quả đã thành công của SNS khác.

**Phần còn mở/giới hạn:** Retry kỹ thuật/unknown chống trùng do đội và provider kiểm chứng, không được coi timeout là chắc chắn chưa đăng.

Căn cứ: QA `Q&A!A59:J59 (No.59)`; `EV-1339` / `DEC-0023`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### Giờ đăng

Giờ đăng lệch vài phút giữa Talent và chia khung theo SNS; Manager ghi khoảng giờ trong chỉ thị, AI dùng thực tích để chọn giờ. G16 nói Talent chỉ hủy lịch.

**Còn mở/giới hạn:** H16 không lặp riêng quyền hủy. Không tự chốt thuật toán, jitter cụ thể hoặc thời điểm đổi lịch đang có. Căn cứ: `KS 20261122!G16:I16 (No.15)`; `EV-1319`; QA No.61;QA No.70;TR-8-1;TR-8-3.

### TikTok: giữ đăng trực tiếp

Nguồn ghi tiếp tục đăng trực tiếp qua Upload-Post, không gửi nháp; giữ lịch/autopost và không thêm ô Talent chọn phạm vi công khai từng bài. Nguồn đồng thời ghi câu trả lời TikTok và Upload-Post khác nhau.

**Còn mở/giới hạn:** Đây là hướng đi và lời thuật lại của nguồn, không chứng minh TikTok duyệt mô hình. Giữ rủi ro hạn chế bài/tài khoản và kiểm provider; không ghi tuân thủ đã xác minh. Căn cứ: `KS 20261122!G20:H24 (No.19–23)`; `EV-1320`; QA No.70;QA No.71;TR-8-2;TR-8-3;TR-8-4.

<!-- /DELIVERY24112026 -->

# 8-3 Đăng lên 3 mạng xã hội

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**TikTok: tách gửi nháp và đăng công khai — PROPOSAL của nguồn:** Đề nghị gửi TikTok vào inbox/nháp để Talent hoàn tất trong app, thay nhánh tự động không xác nhận; nguồn đề nghị Instagram/YouTube giữ hai chế độ. **Giới hạn:** Chưa chọn phương án thay thế quyết định hai chế độ đã có. Gửi nháp chưa phải đã đăng; cần kiểm đồng ý trước khi gửi, quyền upload, ảnh/video, lịch, caption và đối soát. Draft không tự giải quyết điều kiện sử dụng cho agency. Nguồn `ISS22-P PDFtrang2; ISS22-P PDFtrang3; ADV22 PDFtrang5; ADV22 PDFtrang10`; EV `EV-1242;EV-1243;EV-1256;EV-1261`.

**Âm nhạc và hoàn tất trong ứng dụng SNS — PROPOSAL của nguồn:** Đề nghị hai đường: đăng qua API với nhạc gốc/đủ quyền và hoàn tất trong app SNS khi cần nhạc thịnh hành hoặc chỉnh sửa đặc biệt; video AI dùng nhạc phù hợp quyền sử dụng. **Giới hạn:** Không coi nhãn copyright-free là bảo đảm quyền thương mại. Chưa xác minh thao tác bàn giao Instagram/TikTok, tài khoản áp dụng và quyền từng bản nhạc. Nguồn `ISS22-P PDFtrang4; ISS22-P PDFtrang6; ADV22 PDFtrang6`; EV `EV-1244;EV-1246;EV-1257`.

**Audit TikTok và quota YouTube — FACT của nguồn:** Nguồn nêu giới hạn TikTok trước audit là 5 người/24 giờ và quota YouTube mặc định 100 upload/ngày; dùng kịch bản 200–600 video/ngày cho 200 người và yêu cầu xác nhận bằng văn bản cho agency. **Giới hạn:** Giới hạn có phạm vi theo API client/project/route, không phải quota hợp đồng Upload-Post hoặc cap từng Talent. 200/600 là kịch bản, không là quy mô/tần suất đã chốt; bài ảnh không gửi YouTube. Nguồn `ISS22-P PDFtrang3; ISS22-P PDFtrang4; ISS22-P PDFtrang9; ISS22-P PDFtrang10`; EV `EV-1243;EV-1244;EV-1249;EV-1250`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Ảnh và YouTube:** Bài ảnh đăng Instagram/TikTok, không gửi YouTube; video Talent tạo có thể đăng YouTube. **Còn mở/giới hạn:** Đây là hành vi nêu trong nguồn, không phải xác minh năng lực API của nhà cung cấp. Nguồn `KS 20261120!F2`; bằng chứng `EV-0962`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Đăng cùng tư liệu/chữ tới SNS đã nối; ảnh không YouTube, video có YouTube. Kết quả từng SNS, không tự đăng lại.

Chưa chốt đích đăng lại khi lỗi một phần; không suy trần bài/ngày.

Căn cứ: `T19:23,30;M19:12;BF19:9` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0575;EV-0582;EV-0597;EV-0621`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-10, chức năng 8-3; §5-1; UC-08, UC-08 前提 |
| Màn hình [AG] | T-13 (lịch và kết quả), M-08 |
| Tên trong mã nguồn | Multi-platform Publishing |
| Mức sẵn sàng | 🟡 Vàng – luồng rõ; lệnh gọi Upload-Post phải kiểm chứng trước khi chốt |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ C-01 | ✅ | ⚠ kiểm chứng | ⚠ đội đề xuất | ⚠ 8-2, 4-3 |

## Mục đích

Đến giờ đã hẹn, đăng cùng ảnh hoặc video và cùng chú thích lên Instagram, TikTok, YouTube. Ghi thành công hay lỗi cho từng mạng. Không có video thì không đăng YouTube; mạng chưa kết nối thì bỏ qua (§6-10 chức năng 8-3).

## Luồng chính

1. **Hẹn giờ** (gọi từ 4-3, 7-7, 4-4): gửi sang Upload-Post một lịch đăng gồm tư liệu, chú thích, hashtag, tiêu đề YouTube (B3), nhãn AI (5-5), giờ đăng, danh sách mạng (mạng đã kết nối; bài ảnh bỏ YouTube). Lưu mã lịch.
2. **Đăng:** Upload-Post tự đăng đúng giờ ([SM] trang 9: việc hẹn và đăng do dịch vụ làm).
3. **Kết quả:** nhận qua webhook của Upload-Post nếu có, không thì hỏi định kỳ sau giờ đăng. Lưu cho từng mạng: thành công hay lỗi, mã bài, đường dẫn bài, lý do lỗi.
4. Ít nhất một mạng thành công: bài sang "đã đăng" (lỗi một phần vẫn ghi rõ); gửi tin "đã đăng" và số ngày liên tục (3-4).
5. Có mạng lỗi: chuyển sang 8-5.
6. T-13 và M-08 hiện kết quả từng mạng (xanh: được, đỏ: lỗi, xám: không đăng).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Bài ảnh | Không đăng YouTube; T-13 ghi "không có video nên không lên YouTube" | §6-10, [AG] T-13 |
| Mạng mất kết nối lúc đến giờ | Mạng đó lỗi; báo qua 8-5 và 8-6 | §6-10 |
| Không nhận được kết quả sau 1 giờ | Hỏi Upload-Post; vẫn không rõ thì ghi "không rõ" và cảnh báo đội vận hành | [Đề xuất nội bộ] |
| Upload-Post ngừng dịch vụ | Không hẹn được bài mới; bài sang "hẹn giờ lỗi", báo như 8-5 | §9-3 |
| Bản tạm trên Supabase đã xóa | Lấy lại từ OneDrive trước khi gửi (6-4) | S05-03 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Cùng tư liệu và chú thích cho cả 3 mạng | Chốt | UC-05 前提, §6-10 |
| Ghi kết quả cho từng mạng | Chốt | §6-10, §5-1 |
| Không có video thì không đăng YouTube | Chốt | §6-10 |
| Chỉ đăng mạng đã kết nối | Chốt | §6-10 |
| Phí Upload-Post không tăng theo số bài | Chốt | UC-08 前提 |

## Dữ liệu [Đề xuất nội bộ]

`post_platform_results`: `post_id`, `platform`, `status` (`skipped`, `scheduled`, `posted`, `failed`, `unknown`), `platform_post_id`, `url`, `error_code`, `error_message`, `ai_label_method` (5-5), `updated_at`.

## Tích hợp

Upload-Post: hẹn giờ, hủy, nhận kết quả. Chống trùng: khóa theo `post_id`; webhook đến nhiều lần chỉ xử lý một lần.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho bài video, tài năng nối cả 3 mạng, thì sau giờ đăng có 3 dòng kết quả `posted` kèm đường dẫn.
2. Cho bài ảnh, thì YouTube là `skipped`.
3. Cho TikTok lỗi, Instagram được, thì bài là "đã đăng" có ghi lỗi TikTok, và 8-5 chạy cho TikTok.
4. Cho webhook đến 2 lần, thì chỉ một lần cập nhật và một tin "đã đăng".

## Ngoài phạm vi của chức năng này

- Chú thích riêng cho từng mạng (UC-05 前提). Chọn tay mạng cho từng bài: không có, đăng mọi mạng đã nối.

## Phụ thuộc

8-2, 4-3, 7-7, 4-4, 5-5, 3-4, 8-5, C-01.

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-1, §6-10 (8-3), §9-3, UC-05 前提, UC-08, UC-08 前提. [SM] trang 9. [AG] trang 5 (T-13), trang 7 (M-08).


</details>

</details>
