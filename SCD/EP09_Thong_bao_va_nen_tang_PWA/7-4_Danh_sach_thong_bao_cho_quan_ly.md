<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Quyền, phân công và khôi phục Manager

Mọi Manager có thể duyệt và cập nhật mọi Talent. Mỗi Talent có một Manager phụ trách, gán thủ công tại M-11 ❺, không gán theo category. Trước khi vô hiệu hoá Manager phải chuyển Talent sang người khác; chặn tự vô hiệu hoá và vô hiệu hoá Manager cuối. Quên mật khẩu đặt lại qua email; mất thiết bị xác thực thì Manager khác đặt lại 2FA. Lần đăng nhập đầu M-01: sau kiểm mật khẩu hiện QR và ô mã 6 số. M-02/M-04 mặc định chỉ hiện Talent phụ trách, có lọc xem tất cả.

**Phần còn mở/giới hạn:** Yêu cầu duyệt gửi Manager phụ trách; dự phòng khi nghỉ/bỏ sót và nơi nhận các thông báo khác vẫn chờ Adesso tại No.87/88, KS20261122 No.35. Quyền thao tác mọi Talent không đồng nghĩa gửi thông báo cho mọi Manager. FCP còn phải bổ sung màn QR.

Căn cứ: QA `Q&A!A7:J7 (No.6); Q&A!A67:J67 (No.67); Q&A!A87:J87 (No.87); Q&A!A88:J88 (No.88); Q&A!A89:J89 (No.89)`; `EV-1333` / `DEC-0017`.

### Thông báo, email và thao tác mở

Thông báo Manager hiện trong quản trị và gửi email theo mô tả0.3; yêu cầu duyệt có danh sách chờ duyệt. Adesso cung cấp câu chữ và địa chỉ email nhận. Bấm dòng thông báo mở màn liên quan và tự đánh dấu 対応済み; bỏ tick 未対応 xem cả đã mở. Không thêm nút xử lý thủ công hoặc hai trạng thái nghiệp vụ đọc/xử lý độc lập. Đạt mục tiêu báo Talent và Manager.

**Phần còn mở/giới hạn:** No.87/88 ngày26/11 còn hỏi người nhận các loại ngoài duyệt và fallback, nên không coi mặc định Manager phụ trách ở No.75 là chốt mọi ngoại lệ. Thiết kế email rộng hơn đề xuất cũ cần xử lý thương mại riêng. Gửi thành công là trạng thái kỹ thuật khác thao tác mở.

Căn cứ: QA `Q&A!A75:J75 (No.75); Q&A!A76:J76 (No.76); Q&A!A97:J97 (No.97)`; `EV-1349` / `DEC-0033`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

# 7-4 Danh sách thông báo cho quản lý

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Manager responsive và phạm vi tablet — PROPOSAL của nguồn:** Đề xuất PC đầy đủ, smartphone bốn tab Home/duyệt/Talent/menu, tablet có danh sách và chi tiết cạnh nhau, menu bên trái và home chia ưu tiên. **Giới hạn:** Trang 29 vẫn hỏi xác nhận bốn tab và phạm vi tablet. Giữ quyết định PC là chính, duyệt/chỉ thị AI dùng trên smartphone; chưa coi hình là UX đã duyệt hoặc chọn breakpoint. Nguồn `UI-M20 PDFtrang1; UI-M20 PDFtrang2; UI-M20 PDFtrang3; UI-M20 PDFtrang5; UI-M20 PDFtrang6; UI-M20 PDFtrang29`; EV `EV-1211;EV-1212;EV-1213;EV-1215;EV-1216;EV-1239`.

**Thông báo: mở là xử lý và hình cảnh báo cũ — FACT của nguồn:** M-02 mới vẫn ghi mở thông báo là 対応済み; hình tablet/PC vẫn có cảnh báo tâm sự nghiêm trọng và từ cấm. **Giới hạn:** QA No.97 vẫn Open, không tự chọn A/B. Hình không khôi phục chức năng KS F22 đã bỏ; email và người phụ trách còn No.75/87/88. Nguồn `UI-M20 PDFtrang5; UI-M20 PDFtrang9; UI-M20 PDFtrang29`; EV `EV-1215;EV-1219;EV-1239`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Manager nhận yêu cầu duyệt:** Gán Manager phụ trách theo từng Talent; yêu cầu duyệt gửi người phụ trách. Mọi Manager vẫn xem dữ liệu Talent; trả bài có lý do để Talent sửa. **Còn mở/giới hạn:** Không suy mọi loại thông báo cùng người nhận. No.87/88 mở lại: người nhận thông báo chung, cách gán, chuyển phụ trách khi vô hiệu hóa và nhắc quá hạn chưa chốt. Nguồn `KS 確認事項!K77;確認事項!K93;20261120!F11`; bằng chứng `EV-0969`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


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


</details>

</details>
