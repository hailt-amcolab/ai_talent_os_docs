<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Kích hoạt tài khoản và hồ sơ

Talent được duyệt nhưng chưa đăng ký phương thức thanh toán vẫn ở 利用前; mỗi lần đăng nhập mở hướng dẫn khởi tạo. Đăng ký phương thức thanh toán xong tự chuyển 利用中, tạo thư mục riêng và báo Manager. Manager bấm 「登録完了」 để đánh dấu hoàn tất hồ sơ và bắt đầu AI coach; không tự kiểm đủ trường bắt buộc. M-08 của YK3 có hồ sơ, định hướng, sở thích/sở trường, mục tiêu tương lai, giọng điệu; không trường nào bắt buộc.

**Phần còn mở/giới hạn:** Ngày bắt đầu thu và cách xử lý khởi đầu giữa tháng vẫn theo No.49; đăng ký phương thức thanh toán không tự chứng minh đã thu tiền.

Căn cứ: QA `Q&A!A52:J52 (No.52); Q&A!A53:J53 (No.53); Q&A!A54:J54 (No.54); Q&A!A92:J92 (No.92)`; `EV-1331` / `DEC-0015`.

### Ngắt hoặc đổi SNS còn lịch

Chặn ngắt kết nối hoặc đổi tài khoản của đúng SNS còn bài đã đặt lịch. Hiện danh sách bài liên quan để Talent tự huỷ trước rồi mới ngắt; không bắt buộc chỉ Manager huỷ. T-07 có nút 「接続を解除」. SNS không có lịch không chịu chặn này.

**Phần còn mở/giới hạn:** Không áp dụng thao tác người dùng này để suy cách xử lý SNS tự hết hạn/mất kết nối; cơ chế phát hiện do đội/provider.

Căn cứ: QA `Q&A!A95:J95 (No.95)`; `EV-1346` / `DEC-0030`.

[Phiên bản nguồn, hash và phạm vi kiểm](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

# 6-2 Hướng dẫn lần đầu và kết nối mạng xã hội

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**PWA: kiểm tra thông báo và phương án thay thế — PROPOSAL của nguồn:** Đề nghị hướng dẫn mở Safari, thêm màn hình chính, mở từ icon, cho phép và nhận thông báo thử; không cho phép thì báo trong app hoặc email; mở lại vẫn thấy lời nhắn. **Giới hạn:** PWA cơ bản đã có trong phạm vi; email dự phòng cho Talent và bước thử cần đối chiếu. 7:30 là ví dụ, không thay lịch cấu hình sáng/trưa/tối; tài liệu hỗ trợ WebPush không chứng minh thiết bị đã được kiểm thử. Nguồn `ISS22-P PDFtrang4; ADV22 PDFtrang3`; EV `EV-1244;EV-1254`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Khởi tạo PWA:** Đăng nhập bằng mật khẩu tạm → đổi mật khẩu → đăng ký phương thức thanh toán → thêm vào màn hình chính; hướng dẫn rõ bước tiếp theo, gồm iPhone. **Còn mở/giới hạn:** Không mặc định trình duyệt có thể tự cài PWA hoặc tự nhảy vào ứng dụng. Office giữ ngoại lệ thanh toán theo nguồn hiện có. Nguồn `KS 20261120!F7`; bằng chứng `EV-0965`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Bắt buộc đăng ký phương thức thanh toán và mở từ biểu tượng màn hình chính; thêm biểu tượng bằng hướng dẫn thủ công theo máy. SNS và cho phép thông báo có thể làm sau. Thanh toán đăng ký xong tự kích hoạt, tạo folder và báo Manager; sau khởi tạo mở Mypage T-08, không phải Home T-09. Office bỏ bước thanh toán.

Cần kiểm thiết bị/PWA quay lại sau kết nối, không coi hình minh họa là kiểm chứng tương thích.

Căn cứ: `T19:5,6,8,9,11,26,33;BF19:4` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0557;EV-0558;EV-0560;EV-0561;EV-0563;EV-0578;EV-0585;EV-0616`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP01 – Danh tính và quyền truy cập |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-1, chức năng 6-2; UC-03, UC-03 前提 |
| Màn hình [AG] | T-03 (thông báo trước khi vào hướng dẫn), T-04, T-05 |
| Tên trong mã nguồn | First-time Onboarding |
| Mức sẵn sàng | 🟡 Vàng – làm được khung hướng dẫn và bước 1, 2. Bước 3 cần 1-1, bước 4 cần 8-2 (đều đỏ), nên dùng giao diện giả |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ⚠ 確認12 | ⚠ phụ thuộc GMO, Upload-Post | ⚠ đội đề xuất | ❌ 1-1, 8-2 chưa có |

## Mục đích

Sau lần đăng nhập đầu, dẫn tài năng qua 4 bước cần thiết để bắt đầu dùng. Bỏ dở thì lần sau làm tiếp đúng chỗ dở (§6-1 chức năng 6-2).

## Tác nhân và quyền

- Tài năng (cả tài khoản công ty, trừ bước 3).

## Điều kiện trước, kết quả sau

- **Trước:** đã đặt mật khẩu và đã xác nhận "quản lý đọc được hội thoại" ở T-03 (1-4, 確認13).
- **Sau:** ứng dụng đã ở màn hình chính, đã quyết cho hay không cho thông báo, đã đăng ký thanh toán, đã kết nối ít nhất các mạng tài năng muốn dùng.

## Luồng chính

1. Talent đăng nhập T-03; mật khẩu tạm dẫn T-04. Sau đặt mật khẩu quay lại T-03 để đăng nhập bằng mật khẩu riêng.
2. T-06 hướng dẫn đăng ký phương thức thanh toán tại trang nhà cung cấp; chưa xong thì lần đăng nhập sau vẫn mở T-06.
3. Đăng ký thành công: hệ thống tự cho phép sử dụng, tạo folder Talent và báo Manager. Không suy đây là thời điểm thu phí đầu tiên.
4. Hướng dẫn thủ công thêm lên màn hình chính; nút vào Mypage chỉ dùng khi thanh toán đã đăng ký và app đang mở từ biểu tượng.
5. Kết nối SNS tại T-07 và cho phép thông báo có thể làm sau. Chưa nối SNS thì chưa đăng được; không cho push vẫn đọc T-18.
6. Sau khởi tạo mở T-08 Mypage; office bỏ T-06/thanh toán và mở T-08. Căn cứ SD-T19 trang5–10, BF19 trang4.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Máy không hỗ trợ thông báo đẩy (iPhone dưới iOS 16.4, hoặc chưa thêm vào màn hình chính) | Hiện câu giải thích, cho qua bước 2 | §9-1 |
| Hủy giữa chừng ở trang thanh toán, hoặc thanh toán lỗi | Bước 3 vẫn chưa xong, hiện câu "chưa đăng ký xong" | [Đề xuất nội bộ] |
| Đường dẫn kết nối mạng xã hội hết hạn (48 giờ) | Tạo lại trong ứng dụng (chức năng 8-2) | §6-10 chức năng 8-2 |
| Tài năng vào T-06 khi chưa xong bước 3 | Cho vào, nhưng chặn các chức năng của AIコーチ và nhắc quay lại T-04 | [AG] T-04; [Đề xuất nội bộ] |
| Tài khoản công ty | Không hiện bước 3 | §6-1 chức năng 6-2, [AG] T-04 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Thứ tự 4 bước: màn hình chính → thông báo → thanh toán → mạng xã hội | Chốt | §6-1 chức năng 6-2 |
| Bỏ dở thì làm tiếp từ bước dở | Chốt | §6-1 chức năng 6-2 |
| Không cho thông báo vẫn dùng được | Giả định | 確認12 |
| Không cần nối đủ 3 mạng | Giả định | 確認11 |

## Dữ liệu [Đề xuất nội bộ]

`talent_onboarding`: `talent_id`, `home_screen_added_at`, `push_decision` (`granted`, `denied`, `unsupported`), `push_decided_at`, `payment_registered_at`. Trạng thái kết nối mạng xã hội không lưu ở đây mà đọc từ dữ liệu của 8-2. Riêng `payment_registered_at` do 1-1 ghi, đây cũng là lúc chức năng 2-2 tạo thư mục (UC-01 前提).

## Màn hình

- T-03: ô xác nhận "quản lý đọc được hội thoại" (thuộc 1-4, nằm ngay trước luồng này).
- T-04: danh sách 4 bước có dấu xong, nút mở trang thanh toán, nút "kết nối mạng xã hội", nút vào trang của tôi, câu "đóng giữa chừng thì lần sau làm tiếp".
- T-05: kết nối mạng xã hội (thuộc 8-2).

## Tích hợp

- Web Push (6-1): lưu đăng ký của trình duyệt.
- GMO (1-1) và Upload-Post (8-2): chỉ gọi qua chức năng của hai module đó. Trong lúc chưa có, dùng giao diện giả trả về "đã xong" để thử luồng.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng vừa xong T-03, thì màn tiếp theo là T-04.
2. Cho tài năng đã xong bước 1 và 2 rồi đóng ứng dụng, khi mở lại, thì về T-04 và bước 1, 2 có dấu xong.
3. Cho tài năng từ chối thông báo, thì bước 2 được tính là xong và đi tiếp được.
4. Cho tài khoản công ty, thì T-04 không có bước thanh toán.
5. Cho tài năng chưa đăng ký thanh toán, khi mở trò chuyện với AIコーチ, thì bị chặn và được nhắc quay lại T-04.
6. Cho tài năng chỉ nối Instagram, thì vẫn hoàn tất hướng dẫn.

## Ngoài phạm vi của chức năng này

- Logic thanh toán (1-1), logic kết nối mạng xã hội (8-2), gửi thông báo đẩy (6-1).

## Phụ thuộc

- 1-4 (đăng nhập lần đầu). 6-8 (PWA). 6-1 (đăng ký Web Push).
- 1-1 và 8-2: đều 🔴, dùng giao diện giả tới khi có.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| 確認11 | Không nối đủ 3 mạng vẫn dùng được | Không | Đúng như [YK2] |
| 確認12 | Không cho thông báo vẫn dùng được | Không | Đúng như [YK2] |
| 確認13 | Báo quản lý đọc được hội thoại | Không | Đặt ở T-03 |
| File 04 | Bỏ qua bước kết nối thì có nhắc lại không | Không | Chưa nhắc. Trạng thái kết nối hiện ở T-06 |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP01: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-1 (6-2), §9-1, UC-03, UC-03 前提, UC-01 前提, 確認11, 12, 13.
- [AG] trang 2 (T-03, T-04), trang 3 (T-05).
- [File 04](../../Phan_tich/04_Yeu_cau_chuc_nang.md) module 1.


</details>

</details>
