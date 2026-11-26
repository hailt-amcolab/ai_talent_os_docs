<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Nhập thông tin và ưu tiên chỉ thị

Manager nhập/sửa 5 nhóm thông tin tại M-08 (YK3 bản 0.3), có lịch sử thay đổi; ChatGPT cũng xem/sửa cùng thông tin. Thông tin ngoài M-08 như sinh nhật/lịch xuất hiện được truyền qua hội thoại M-17 và lưu MD trong thư mục Talent trên OneDrive; không có thao tác sửa file OneDrive trực tiếp. Khi thông tin Talent mâu thuẫn chỉ thị AI, ưu tiên chỉ thị AI.

**Phần còn mở/giới hạn:** No.74 là đối chiếu YK3 ngày25/11; No.92 là trả lời FCP26/11. Giữ QA101 về DB và backup: không suy toàn bộ dữ liệu chuyển về OneDrive; phạm vi đồng bộ DB/MD là thiết kế đội cần làm rõ. Phạm vi/chi phí màn mới chưa tự được duyệt thương mại.

Căn cứ: QA `Q&A!A74:J74 (No.74); Q&A!A92:J92 (No.92)`; `EV-1332` / `DEC-0016`.

### Quyền, phân công và khôi phục Manager

Mọi Manager có thể duyệt và cập nhật mọi Talent. Mỗi Talent có một Manager phụ trách, gán thủ công tại M-11 ❺, không gán theo category. Trước khi vô hiệu hoá Manager phải chuyển Talent sang người khác; chặn tự vô hiệu hoá và vô hiệu hoá Manager cuối. Quên mật khẩu đặt lại qua email; mất thiết bị xác thực thì Manager khác đặt lại 2FA. Lần đăng nhập đầu M-01: sau kiểm mật khẩu hiện QR và ô mã 6 số. M-02/M-04 mặc định chỉ hiện Talent phụ trách, có lọc xem tất cả.

**Phần còn mở/giới hạn:** Yêu cầu duyệt gửi Manager phụ trách; dự phòng khi nghỉ/bỏ sót và nơi nhận các thông báo khác vẫn chờ Adesso tại No.87/88, KS20261122 No.35. Quyền thao tác mọi Talent không đồng nghĩa gửi thông báo cho mọi Manager. FCP còn phải bổ sung màn QR.

Căn cứ: QA `Q&A!A7:J7 (No.6); Q&A!A67:J67 (No.67); Q&A!A87:J87 (No.87); Q&A!A88:J88 (No.88); Q&A!A89:J89 (No.89)`; `EV-1333` / `DEC-0017`.

### Phạm vi ranking và video xếp tuần tự

Ranking không làm ở giai đoạn1: bỏ màn がんばっているタレント và nút menu/home khỏi phạm vi thiết kế giai đoạn này.

**Phần còn mở/giới hạn:** Không đồng nghĩa đã duyệt mọi cách lọc/sắp xếp mới của danh sách Talent hoặc chi phí giai đoạn sau.

Căn cứ: QA `Q&A!A38:J38 (No.37); Q&A!A100:J100 (No.100)`; `EV-1351` / `DEC-0035`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

# 7-1 Xem thông tin tài năng

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Nhiều category và phân công Manager — FACT của nguồn:** M-13 cho gán nhiều category, M-19 hiện category Manager, M-10 có Manager phụ trách; M-14 nhắc ưu tiên Talent > category > toàn hệ thống. **Giới hạn:** UI vẫn thể hiện nhiều category trong khi QA No.99 hỏi lựa chọn và xử lý xung đột. Không tự chốt một category hoặc dùng category Manager làm rào cản quyền chung. Nguồn `UI-M20 PDFtrang17; UI-M20 PDFtrang20; UI-M20 PDFtrang21; UI-M20 PDFtrang22; UI-M20 PDFtrang25`; EV `EV-1227;EV-1230;EV-1231;EV-1232;EV-1235`.

**Manager responsive và phạm vi tablet — PROPOSAL của nguồn:** Đề xuất PC đầy đủ, smartphone bốn tab Home/duyệt/Talent/menu, tablet có danh sách và chi tiết cạnh nhau, menu bên trái và home chia ưu tiên. **Giới hạn:** Trang 29 vẫn hỏi xác nhận bốn tab và phạm vi tablet. Giữ quyết định PC là chính, duyệt/chỉ thị AI dùng trên smartphone; chưa coi hình là UX đã duyệt hoặc chọn breakpoint. Nguồn `UI-M20 PDFtrang1; UI-M20 PDFtrang2; UI-M20 PDFtrang3; UI-M20 PDFtrang5; UI-M20 PDFtrang6; UI-M20 PDFtrang29`; EV `EV-1211;EV-1212;EV-1213;EV-1215;EV-1216;EV-1239`.

**Đồng ý phụ huynh và trần phí theo tuổi — PROPOSAL của nguồn:** Đề nghị quản lý liên hệ và ghi nhận đồng ý phụ huynh cho dưới 18 tuổi, phạm vi sử dụng media, trần phí và mục tiêu khác cho dưới 16 tuổi. **Giới hạn:** Khác KS確認事項 F38: Adesso lấy đồng ý ngoài app, hệ thống không lưu. Khách/chuyên trách cần quyết quyền, retention và chính sách tuổi; chưa xác minh toàn bộ nhận định pháp lý hoặc triển khai lưu. Nguồn `ISS22-P PDFtrang6; ISS22-P PDFtrang10; ADV22 PDFtrang3; ADV22 PDFtrang10`; EV `EV-1246;EV-1250;EV-1254;EV-1261`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Manager nhận yêu cầu duyệt:** Gán Manager phụ trách theo từng Talent; yêu cầu duyệt gửi người phụ trách. Mọi Manager vẫn xem dữ liệu Talent; trả bài có lý do để Talent sửa. **Còn mở/giới hạn:** Không suy mọi loại thông báo cùng người nhận. No.87/88 mở lại: người nhận thông báo chung, cách gán, chuyển phụ trách khi vô hiệu hóa và nhắc quá hạn chưa chốt. Nguồn `KS 確認事項!K77;確認事項!K93;20261120!F11`; bằng chứng `EV-0969`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Danh sách gồm Talent và office; lọc tên/trạng thái/ngày không đăng/category/người phụ trách. M-07 có nút sang M-21 để sửa hồ sơ; không còn mô tả hồ sơ chỉ nhập qua ChatGPT.

Loại phân công theo category hay cá nhân vẫn KS 20261120 No.10/QA No.6.

Căn cứ: `M19:10,11,13,15,26` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0595;EV-0596;EV-0598;EV-0600;EV-0611`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP02 – Thông tin tài năng và nguồn dữ liệu cho AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-4, chức năng 7-1; UC-10 |
| Màn hình [AG] | M-06, M-07, M-09 (hội thoại); màn hình quản trị trên điện thoại (trang 11) |
| Tên trong mã nguồn | Talent Info Dashboard |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Các cột dùng số liệu của module khác thì dùng dữ liệu giả tới khi có |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ S02-06 | ⚠ đội đề xuất | ✅ lọc theo nhóm ([KS] 確認47) | ✅ | ⚠ đội đề xuất | ⚠ 3-10, 8-2, 8-7, 3-4 |

## Mục đích

Quản lý xem danh sách tài năng, tìm, lọc, rồi mở chi tiết: thông tin đã nhập, mục tiêu, trạng thái kết nối mạng xã hội, hội thoại với AIコーチ (§6-4 chức năng 7-1).

## Tác nhân và quyền

- Quản lý: xem mọi tài năng. Chỉ xem, không sửa thông tin ở đây.
- Mỗi lần mở M-07, M-08, M-09 được ghi nhật ký xem (7-6).

## Luồng chính

1. M-06 liệt kê cả Talent và office; tìm tên và lọc trạng thái/ngày không đăng/category/phụ trách. Mọi Manager xem mọi Talent.
2. M-07 xem hồ sơ, thử thách, mục tiêu/follower từng SNS, kết nối; nút sửa mở M-21.
3. M-21 nhập năm nhóm thông tin dự kiến, lưu/hủy/lịch sử; cũng sửa được qua ChatGPT. Không ghi hồ sơ chỉ sửa bằng ChatGPT hoặc M-07 không có đường sửa.
4. M-09 chỉ đọc hội thoại, không sửa; mở thông tin/hội thoại/kết quả phải ghi nhật ký xem.
5. Căn cứ SD-M19 trang10–13,26. Trường bắt buộc để AI chạy còn No.54, danh sách dự kiến tại KS20261120 No.39 chưa có trả lời.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Đọc `プロフィール.md` từ OneDrive lỗi khi mở M-07 | Hiện bản đọc gần nhất của 2-1, kèm thời điểm đọc | [Đề xuất nội bộ] |
| Chưa có hồ sơ | Hiện "chưa có thông tin, nhập qua ChatGPT" | UC-01 前提 |
| Hồ sơ thiếu mục hoặc sai mẫu | Mục thiếu thì để trống; nội dung ngoài mẫu không hiện ở M-07 nhưng AI vẫn đọc | S02-04 |
| Tài năng chưa có số liệu (mới vào) | Hiện "—" như [AG] | [AG] M-06 |
| Danh sách lớn (1.000 tài năng) | Phân trang. Tìm và lọc chạy ở máy chủ | §9-2 |
| Ghi nhật ký xem lỗi | Không hiện dữ liệu (7-6) | 7-6 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Tìm theo tên; lọc theo trạng thái và số ngày không đăng | — | Chốt | §6-4 |
| Mốc lọc số ngày không đăng | Theo cài đặt ở M-17 (mặc định 3 và 7) | Đề xuất | S02-06, §5-6 |
| Thứ tự mặc định | Số ngày không đăng, giảm dần | Đề xuất | S02-06 |
| Số dòng mỗi trang | 50 | Tham số [Đề xuất nội bộ] | — |

## Dữ liệu

Chỉ đọc: `talents`, `talent_goals`, trạng thái kết nối (8-2), số người theo dõi (8-7), bài đăng gần nhất (7-2), hội thoại (3-4), `talent_context_snapshots` (2-1). Số ngày không đăng tính từ ngày đăng thành công gần nhất (cách đếm dùng chung với 3-9).

## Màn hình

M-06, M-07, M-09 ([AG] trang 7, 8). Màn trên điện thoại ([AG] trang 11). Bộ lọc カテゴリー (nhóm tài năng) khung đỏ **không làm** tới khi có 確認47.

## Tích hợp

Microsoft Graph: đọc `プロフィール.md` khi mở M-07.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho lọc "từ 7 ngày", thì chỉ hiện tài năng có số ngày không đăng từ 7 trở lên.
2. Cho tìm "タレントA", thì hiện tài năng có tên chứa chuỗi đó.
3. Cho tài khoản công ty, thì dòng có nhãn 事務所.
4. Cho hồ sơ có mục 趣味・特技 = "カフェ巡り、ダンス", thì M-07 hiện đúng nội dung đó ở dòng 趣味・特技.
5. Cho OneDrive lỗi khi mở M-07, thì vẫn hiện hồ sơ của lần đọc gần nhất, kèm thời điểm đọc.
6. Cho mở M-07 hoặc M-09, thì nhật ký xem có thêm một dòng (7-6).
7. Cho 1.000 tài năng, thì danh sách tải trong vòng 2 giây.

## Ngoài phạm vi của chức năng này

- Sửa thông tin (2-3, qua ChatGPT). Sửa cài đặt (M-10: 2-4, 7-3, 7-5, 7-7). Tab bài đăng M-08 (7-2).
- (Lọc theo nhóm tài năng nay **làm**: CR-17, [KS] 確認47; xem bộ lọc ở M-06.)

## Phụ thuộc

- 2-1 (bản đọc gần nhất), 2-4 (mục tiêu), 3-10 và 8-7 (số người theo dõi), 8-2 (kết nối), 3-4 (hội thoại), 7-6 (nhật ký xem). Các phần chưa có thì dùng dữ liệu giả.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認2 (nhãn dưới 18 tuổi), 確認41, 42 (xem mọi tài năng và hội thoại), 確認44 (nhật ký xem), 確認47 (lọc theo nhóm).

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S02-03 | Hiện trạng thái thư mục ở M-06, M-07 | Không | Như đề xuất |
| S02-04 | Mẫu file hồ sơ để M-07 đọc theo mục | Không | Như 2-3 |
| S02-06 | Cột, mốc lọc, thứ tự của danh sách | Không | Theo [AG] cộng đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP02: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-6, §6-4 (7-1), §9-2, UC-10, UC-01 前提, 確認2, 41, 42, 44, 47.
- [AG] trang 7 (M-06, M-07), trang 8 (M-09), trang 11.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.22: màn chi tiết tài năng có thêm ô **tình trạng đọc file OneDrive** (xem 2-1).
- Q&A No.7 (đóng 17/11): quản lý xem toàn bộ hội thoại, tài năng được báo lần đầu mở ứng dụng (確認13, 42). Không làm hội thoại riêng tư (CR-24).


</details>

</details>
