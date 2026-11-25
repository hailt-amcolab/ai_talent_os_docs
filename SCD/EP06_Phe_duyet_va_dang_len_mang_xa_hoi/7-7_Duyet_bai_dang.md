<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### PR

Talent tự thêm PR vào bài; OS không tự phân loại bài công việc hoặc xác định bài cần PR. Nguồn báo đã thử nhãn video AI qua provider.

**Còn mở/giới hạn:** Không dùng nguồn này để tự xác nhận kết quả thử hoặc tuân thủ pháp lý; duyệt bài công việc vẫn do Talent yêu cầu. Căn cứ: `KS 20261122!G33:I33 (No.32)`; `EV-1322`; TR-7-7;TR-5-5.

<!-- /DELIVERY24112026 -->

# 7-7 Duyệt bài đăng

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Manager sửa và xác nhận TikTok — PROPOSAL của nguồn:** Đề nghị chỉ Talent xác nhận bài TikTok; Manager vẫn hủy lịch được; nội dung Manager sửa hoặc xác nhận thay cần Talent đồng ý lại. **Giới hạn:** Khác GJ19§12/QA No.90 về Manager sửa rồi đi tiếp; phải xét tài khoản office. Không tự xóa các quyền Manager đã nêu trong nguồn khác. Nguồn `ISS22-P PDFtrang3; ADV22 PDFtrang6`; EV `EV-1243;EV-1257`.

**Xác nhận lại bài AI sửa từ cấm — PROPOSAL của nguồn:** Đề nghị bài có từ cấm phải được Talent xem lại sau AI sửa dù đang chọn không xác nhận từng bài. UI-M20 M-11 vẫn vẽ Manager sửa rồi AI kiểm lại. **Giới hạn:** Có ba nhánh: KS K59 AI sửa/đặt lịch; báo cáo 22/11 thêm Talent xác nhận; UI M-11 Manager sửa. Không tự chọn hoặc đóng No.57/71/90/96 bằng hình minh họa. Nguồn `ISS22-P PDFtrang7; ADV22 PDFtrang7; ADV22 PDFtrang10; UI-M20 PDFtrang18`; EV `EV-1247;EV-1258;EV-1261;EV-1228`.

**Nhiều category và phân công Manager — FACT của nguồn:** M-13 cho gán nhiều category, M-19 hiện category Manager, M-10 có Manager phụ trách; M-14 nhắc ưu tiên Talent > category > toàn hệ thống. **Giới hạn:** UI vẫn thể hiện nhiều category trong khi QA No.99 hỏi lựa chọn và xử lý xung đột. Không tự chốt một category hoặc dùng category Manager làm rào cản quyền chung. Nguồn `UI-M20 PDFtrang17; UI-M20 PDFtrang20; UI-M20 PDFtrang21; UI-M20 PDFtrang22; UI-M20 PDFtrang25`; EV `EV-1227;EV-1230;EV-1231;EV-1232;EV-1235`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Duyệt bài công việc:** Chỉ bài liên quan công việc cần Manager duyệt. Với tự động, không thêm bước duyệt để phòng dùng nhầm ảnh công việc. **Còn mở/giới hạn:** Giữ hai phạm vi riêng; không suy mọi bài công việc được tự động bỏ duyệt. No.71/84 cần phản ánh ngoại lệ đã ghi; nhận diện bài công việc và chuyển nhánh chưa đủ chi tiết. Nguồn `KS 確認事項!K74;20261120!F10;20261120!F15`; bằng chứng `EV-0968`.

- **Manager nhận yêu cầu duyệt:** Gán Manager phụ trách theo từng Talent; yêu cầu duyệt gửi người phụ trách. Mọi Manager vẫn xem dữ liệu Talent; trả bài có lý do để Talent sửa. **Còn mở/giới hạn:** Không suy mọi loại thông báo cùng người nhận. No.87/88 mở lại: người nhận thông báo chung, cách gán, chuyển phụ trách khi vô hiệu hóa và nhắc quá hạn chưa chốt. Nguồn `KS 確認事項!K77;確認事項!K93;20261120!F11`; bằng chứng `EV-0969`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Duyệt bài công việc khi Talent xin duyệt; trả lại phải có lý do; chờ duyệt không sửa theoGJ19§13. Quá giờ chưa duyệt thì không đăng/hủy và báo cả hai bên.

Bật tính năng có áp mọi bài không, đích category/cá nhân và phê duyệt trên đường tự động vẫn KS 20261120 No.9,10,14.

Căn cứ: `T19:18,22,30;M19:8,9;BF19:8` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0570;EV-0574;EV-0582;EV-0593;EV-0594;EV-0620`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-9, chức năng 7-7; §5-3; UC-07, UC-07 前提 (tiền đề) |
| Màn hình [AG] | T-09 (ô xin duyệt), T-13 (承認待ち, 差し戻し); M-02, M-04 (danh sách chờ duyệt), M-05 (duyệt), M-10 (bật duyệt bài) |
| Tên trong mã nguồn | Post Approval |
| Mức sẵn sàng | 🔴 Đỏ – nơi nhận yêu cầu đã chốt theo nhóm hoặc quản lý phụ trách ([KS] 確認34), trả lại và quá hạn khách đồng ý giả định (確認35, 36); bộ trạng thái bài chưa có (C-01). Phần cài đặt, gửi yêu cầu, danh sách và duyệt làm được ngay |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ 確認35, 36 | ⚠ đội đề xuất | ✅ | ❌ C-01 | ✅ | ⚠ S06-01 | ⚠ đội đề xuất | ⚠ 4-3, 8-3, 7-4 |

## Mục đích

Bài công việc cần khách hàng của tài năng cho phép thì tài năng xin quản lý duyệt. Quản lý duyệt thì bài được đăng đúng giờ; trả lại thì phải ghi lý do. Đến giờ đăng mà chưa duyệt thì không đăng, báo cả hai bên (§6-9 chức năng 7-7).

## Tác nhân và quyền

- Quản lý: bật hoặc tắt duyệt bài cho từng tài năng (M-10, hoặc khi duyệt đơn ở M-03); duyệt hoặc trả lại (M-05). Mọi quản lý đều nhận yêu cầu (§3-3).
- Tài năng: chọn xin duyệt khi chấp nhận (4-3). AI không tự đoán bài công việc (§5-3).
- Tài khoản công ty: không duyệt (A2).

## Luồng chính

1. Tài năng chấp nhận bài có tích xin duyệt (4-3). Bài sang "chờ duyệt". **Chưa gửi sang Upload-Post** (S06-01).
2. Tạo thông báo 承認の依頼 (yêu cầu duyệt) cho quản lý của nhóm (カテゴリー) của tài năng hoặc quản lý phụ trách tài năng (7-4, [KS] 確認34). M-04 liệt kê bài chờ duyệt, xếp theo giờ đăng gần nhất, kèm kết quả kiểm tra từ cấm.
3. Quản lý mở M-05: ảnh, video, chú thích, mạng sẽ đăng, giờ đăng (cũng là hạn duyệt).
4. Bấm 承認する (duyệt): bài sang "đã hẹn giờ", gửi lịch sang Upload-Post (8-3). Báo tài năng 承認の結果 (kết quả duyệt).
5. Bấm 差し戻す (trả lại): bắt buộc nhập lý do. Bài sang "bị trả lại". Tài năng thấy lý do ở T-13, nhờ AI sửa (4-2) rồi chấp nhận và xin duyệt lại (4-3) (giả định 確認35).
6. Đến giờ đăng mà vẫn "chờ duyệt": bài sang "quá hạn duyệt" (không đăng). Báo tài năng và quản lý (giả định 確認36). Muốn đăng thì tài năng chấp nhận lại.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Hai quản lý cùng bấm | Người bấm trước quyết; người sau thấy "đã được xử lý bởi …" | [KS] 確認34 |
| Duyệt đúng lúc vừa quá hạn | Kiểm tra lại trạng thái trong cùng giao dịch; đã quá hạn thì báo không duyệt được | [Đề xuất nội bộ] |
| Duyệt nhưng Upload-Post hẹn giờ lỗi | Như 4-3: "hẹn giờ lỗi", thử lại, rồi báo như 8-5 | §9-3 |
| Quản lý tắt duyệt bài khi tài năng còn bài chờ | Bài đang chờ vẫn phải xử lý; chỉ áp dụng cho lần chấp nhận sau | [Đề xuất nội bộ] |
| Đăng tự động đang dừng khi duyệt | Bài sang "đã chấp nhận, chưa hẹn giờ" (B6) | B6 |
| Quản lý muốn sửa chú thích hay đổi giờ khi duyệt | Không có; chỉ duyệt hoặc trả lại | S06-10, [AG] M-05 |
| Sắp tới hạn mà chưa ai duyệt | Không thêm thông báo; M-04 tô màu bài còn dưới 2 giờ | S06-09 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Có duyệt hay không: cài cho từng tài năng | Chốt | §6-9, UC-07 前提 |
| Trả lại phải có lý do | Chốt | §6-9 |
| Hạn duyệt = giờ đăng; quá hạn thì không đăng | Chốt | §6-9, §5-3 |
| Quản lý của nhóm hoặc quản lý phụ trách nhận yêu cầu, người bấm trước quyết | Chốt ([KS] 確認34) | §3-3 |
| Cách gửi và khi chưa có người phụ trách | cách nào (theo nhóm hay theo quản lý phụ trách từng tài năng) và khi chưa có người phụ trách thì gửi ai: chờ Q&A No.6; AMCOLAB đề xuất lấy quản lý phụ trách từng tài năng làm cơ bản (có trong báo giá No.42, 前提条件A9) | Chưa rõ | Q&A No.6 |
| Tài khoản công ty không duyệt | Đề xuất | A2 |

## Dữ liệu [Đề xuất nội bộ]

`approval_requests`: `post_id`, `requested_at`, `deadline` (giờ đăng), `decision` (`approved`, `returned`, `expired`), `reason`, `decided_by`, `decided_at`. `talents.approval_required` (1-4). Trạng thái bài theo C-01.

## Màn hình

M-04 (danh sách: tài năng, giờ yêu cầu, giờ đăng = hạn, mạng, kết quả từ cấm, nút 確認する); M-05 (nội dung, ô lý do, 承認する, 差し戻す); M-10 (công tắc 投稿の承認を使う); T-13 (承認待ち, 差し戻し kèm lý do).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng xin duyệt, thì quản lý của nhóm hoặc quản lý phụ trách thấy bài ở M-04 và có thông báo 承認の依頼; Upload-Post chưa có lịch.
2. Cho quản lý duyệt trước hạn, thì bài được hẹn đúng giờ đăng và tài năng nhận 承認の結果.
3. Cho trả lại không ghi lý do, thì không lưu được.
4. Cho trả lại có lý do, thì T-13 hiện 差し戻し và lý do.
5. Cho quá giờ đăng chưa duyệt, thì bài không đăng, tài năng và quản lý được báo.
6. Cho hai quản lý bấm gần như cùng lúc, thì chỉ một quyết định được lưu.

## Ngoài phạm vi của chức năng này

- AI tự đoán bài công việc (§5-3 không làm). Quản lý sửa bài hoặc đổi giờ khi duyệt (S06-10).

## Phụ thuộc

4-3, 4-2, 8-3, 7-4, 6-1, C-01 (🔴).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認33, 34, 35, 36, 52.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-01 | Bài chờ duyệt chưa gửi sang Upload-Post | Không | Như đề xuất |
| S06-09 | Không thêm nhắc khi sắp tới hạn | Không | M-04 tô màu |
| S06-10 | Duyệt không sửa nội dung, không đổi giờ | Không | Như [AG] M-05 |
| A2 | Tài khoản công ty không duyệt | Không | Như A2 |
| A6 | Thông báo "quá hạn duyệt" chưa có trong 別紙A | Không | Dùng thông báo kết quả duyệt |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §3-3, §5-3, §6-9 (7-7), UC-07, UC-07 前提, 確認33–36, 52.
- [AG] trang 4 (T-09), trang 5 (T-13), trang 6 (M-04), trang 7 (M-05), trang 8 (M-10).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.35, CR-03 (đã chốt): có trả lại kèm lý do, tài năng sửa và xin duyệt lại.
- Q&A No.58 (đang hỏi): đề xuất trong Q&A là **bài xin duyệt lại vẫn là cùng một bài**, giữ lịch sử duyệt và giữ giờ cũ nếu còn kịp. Đặc tả này và C-01 đang cho bài bị trả lại sang 取り消し và tạo bài mới. Phải thống nhất trước khi làm.
- Q&A No.6, CR-19: **làm** ([KS] 確認34): yêu cầu duyệt gửi theo nhóm hoặc theo quản lý phụ trách.


</details>
