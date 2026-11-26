<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Dừng đăng, mở lại và huỷ lịch

Manager dừng/mở lại việc đặt lịch theo từng Talent; dừng huỷ lịch đã có. Không có nút dừng toàn hệ thống; vận hành dừng hệ thống phải xử lý huỷ lịch ngoài theo KS20261122 No.29/34. Trong lúc chỉ dừng đăng, AI coach vẫn chạy, Talent vẫn 採用 được; bài mới ở 停止中のため保留. Mở lại: bài giữ còn kịp thì đặt lịch, bài quá giờ cần Talent 採用 lại. Bài đã huỷ không tự phục hồi; báo Talent trong app và đưa về nháp để 採用 lại. T-10 có nút Talent dừng kỳ auto, huỷ lịch theo kỳ đó.

**Phần còn mở/giới hạn:** Chỉ dừng đăng khác 支払い待ち (No.63/86: dừng cả AI/video) và khác kết thúc sử dụng. No.77/91 là đối chiếu0.3 ngày25/11, không áp phần câu hỏi cũ về nút dừng toàn bộ.

Căn cứ: QA `Q&A!A60:J60 (No.60); Q&A!A61:J61 (No.61); Q&A!A70:J70 (No.70); Q&A!A77:J77 (No.77); Q&A!A91:J91 (No.91)`; `EV-1340` / `DEC-0024`.

### Ngắt hoặc đổi SNS còn lịch

Chặn ngắt kết nối hoặc đổi tài khoản của đúng SNS còn bài đã đặt lịch. Hiện danh sách bài liên quan để Talent tự huỷ trước rồi mới ngắt; không bắt buộc chỉ Manager huỷ. T-07 có nút 「接続を解除」. SNS không có lịch không chịu chặn này.

**Phần còn mở/giới hạn:** Không áp dụng thao tác người dùng này để suy cách xử lý SNS tự hết hạn/mất kết nối; cơ chế phát hiện do đội/provider.

Căn cứ: QA `Q&A!A95:J95 (No.95)`; `EV-1346` / `DEC-0030`.

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

### YK3: không tự đăng lại

Khi đăng lỗi, OS không tự đăng lại; Talent thử lại sau, Manager vẫn có đặt lịch lại tại M-09. Hủy lịch do cả Talent/Manager.

**Còn mở/giới hạn:** Retry kỹ thuật trước khi xác định kết quả khác việc tự đăng lại bài đã thất bại; cần thiết kế chống trùng và kiểm provider. Căn cứ: `YK3 §2-4-6 w:p386–431`; `EV-1329`; QA No.59;QA No.61;TR-8-5;TR-7-2.

<!-- /DELIVERY24112026 -->

# 7-2 Xem và hủy bài đăng

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Manager sửa và xác nhận TikTok — PROPOSAL của nguồn:** Đề nghị chỉ Talent xác nhận bài TikTok; Manager vẫn hủy lịch được; nội dung Manager sửa hoặc xác nhận thay cần Talent đồng ý lại. **Giới hạn:** Khác GJ19§12/QA No.90 về Manager sửa rồi đi tiếp; phải xét tài khoản office. Không tự xóa các quyền Manager đã nêu trong nguồn khác. Nguồn `ISS22-P PDFtrang3; ADV22 PDFtrang6`; EV `EV-1243;EV-1257`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Talent được hủy lịch:** Talent được hủy bài mình đã đặt lịch; Manager cũng kiểm tra và hủy trên quản trị; phải hủy lịch tương ứng ở dịch vụ đăng. **Còn mở/giới hạn:** Thay quy tắc cũ chỉ Manager hủy. Thời điểm không thể hủy, bài đang gửi và thông báo/tái dùng còn No.61 và thiết kế đội. Nguồn `KS 確認事項!K84;20261120!F12`; bằng chứng `EV-0970`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Manager hủy trên M-08, hệ thống hủy lịch dịch vụ; Talent xem hướng dẫn liên hệ Manager, không có nút hủy trong app.

T19 trang 31/BF19 trang 9 còn hỏi xác nhận phạm vi Talent không hủy; kênh thông báo khi Manager hủy và tái dùng bài còn No.61.

Căn cứ: `T19:22,31;M19:12;BF19:9` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0574;EV-0583;EV-0597;EV-0621`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-10, chức năng 7-2; UC-08 前提 |
| Màn hình [AG] | M-08 (bài đăng của tài năng); T-13 (phía tài năng chỉ xem) |
| Tên trong mã nguồn | Post List & Cancellation |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; danh sách trạng thái chờ C-01 |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ C-01 | ✅ | ⚠ hủy qua API | ⚠ đội đề xuất | ⚠ 8-3 |

## Mục đích

Quản lý xem bài của từng tài năng, lọc theo trạng thái, và hủy bài đã hẹn ngay trên màn hình quản trị; hệ thống hủy cả lịch bên Upload-Post. Tài năng không hủy được trong ứng dụng (§6-10 chức năng 7-2).

## Luồng chính

1. M-08: danh sách bài của tài năng: giờ đăng, mạng (màu theo kết quả), trạng thái, lượt xem, lượt thích, nút thao tác.
2. Lọc theo trạng thái: 予約済み (đã hẹn), 承認待ち (chờ duyệt), 投稿済み (đã đăng), 失敗 (lỗi), cộng 使ってはいけない言葉 (dính từ cấm) như [AG].
3. Nút theo trạng thái: 承認へ (sang M-05), 取り消す (hủy), 文章を直す (sang M-11), 予約し直す (8-5).
4. Hủy: xác nhận → gọi Upload-Post hủy lịch → bài sang "đã hủy" → ghi nhật ký thao tác (C-03). Báo tài năng (chờ A6).
5. T-13 (tài năng): xem lịch và kết quả của mình, câu "muốn hủy thì liên hệ quản lý".

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Hủy trên Upload-Post lỗi | Báo lỗi, bài giữ "đã hẹn"; cho thử lại | [Đề xuất nội bộ] |
| Hủy khi bài đang được đăng | Ghi theo kết quả thật | [Đề xuất nội bộ] |
| Hủy bài "chờ duyệt" | Hủy luôn, không cần gọi Upload-Post (S06-01) | S06-01 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Lọc theo trạng thái | Chốt | §6-10 |
| Chỉ quản lý hủy | Chốt | §6-10 |
| Hủy trên màn hình quản trị thì hệ thống hủy cả bên Upload-Post | Chốt | §6-10, UC-08 前提 |

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho lọc 失敗, thì chỉ hiện bài có ít nhất một mạng lỗi.
2. Cho hủy một bài đã hẹn, thì Upload-Post không còn lịch và bài là "đã hủy".
3. Cho tài khoản tài năng, khi gọi API hủy, thì bị từ chối.

## Phụ thuộc

8-3, 7-7, 4-4, 8-5, C-01, C-03.

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-10 (7-2), UC-08 前提. [AG] trang 5 (T-13), trang 7 (M-08).


</details>

</details>
