# C-05 Danh mục thông báo

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Ứng xử tối thiểu với tâm sự nghiêm trọng — PROPOSAL của nguồn:** Không đề nghị khôi phục thông báo Manager; đề nghị Momo hướng dẫn liên hệ phụ huynh/Manager/kênh hỗ trợ và lưu dấu có hội thoại. **Giới hạn:** Không tự thêm lại cảnh báo Manager đã bị loại bởi KS F22. Câu chữ, loại dấu vết, quyền xem và retention còn No.93; nguồn không cung cấp địa chỉ hỗ trợ cụ thể đã được xác minh. Nguồn `ISS22-P PDFtrang7; ADV22 PDFtrang7`; EV `EV-1247;EV-1258`.

**Thông báo: mở là xử lý và hình cảnh báo cũ — FACT của nguồn:** M-02 mới vẫn ghi mở thông báo là 対応済み; hình tablet/PC vẫn có cảnh báo tâm sự nghiêm trọng và từ cấm. **Giới hạn:** QA No.97 vẫn Open, không tự chọn A/B. Hình không khôi phục chức năng KS F22 đã bỏ; email và người phụ trách còn No.75/87/88. Nguồn `UI-M20 PDFtrang5; UI-M20 PDFtrang9; UI-M20 PDFtrang29`; EV `EV-1215;EV-1219;EV-1239`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Không báo tâm sự nghiêm trọng:** Không làm chức năng báo Manager khi có tâm sự nghiêm trọng. Hội thoại phục vụ tăng follower, tập trung hoạt động nghệ thuật/công việc và cảm quan; không tư vấn tình yêu. Ban đầu chưa đặt ranh giới quá chi tiết. **Còn mở/giới hạn:** No.93 còn Open, không tự chọn trọn phương ánB vì nguồn chỉ loại thông báo, chưa quy định đầy đủ cách tiếp nhận/chuyển hướng. Không suy số lượt chat không giới hạn từ đây. Nguồn `KS 20261120!F22;確認事項!K56;20261120!F28:F29`; bằng chứng `EV-0977`.

- **Manager nhận yêu cầu duyệt:** Gán Manager phụ trách theo từng Talent; yêu cầu duyệt gửi người phụ trách. Mọi Manager vẫn xem dữ liệu Talent; trả bài có lý do để Talent sửa. **Còn mở/giới hạn:** Không suy mọi loại thông báo cùng người nhận. No.87/88 mở lại: người nhận thông báo chung, cách gán, chuyển phụ trách khi vô hiệu hóa và nhắc quá hạn chưa chốt. Nguồn `KS 確認事項!K77;確認事項!K93;20261120!F11`; bằng chứng `EV-0969`.

- **Talent đăng lại bài lỗi:** Lỗi lúc tới giờ đăng thì thông báo Talent; Talent đợi rồi đăng lại. Lỗi SNS hoặc mạng của Talent không cần thông báo Adesso. **Còn mở/giới hạn:** Không đồng nhất Adesso với mọi tài khoản Manager nếu chưa rõ. Không tự đặt thời gian chờ, số lần thử hoặc đích SNS; No.59 còn mở. Quyền Manager đăng lại trong bản19/11 chưa bị xóa bằng suy luận. Nguồn `KS 確認事項!K87;20261120!F13`; bằng chứng `EV-0971`.

- **Bỏ dừng đăng toàn hệ thống:** Không có chức năng dừng tự động toàn hệ thống; vẫn dừng theo từng Talent. Khi cần dừng toàn bộ thì vận hành dừng hệ thống. **Còn mở/giới hạn:** Thay đề xuất giữ nút toàn bộ ở QA No.77/91; không suy người thao tác, cơ chế hạ tầng hay SLA dừng. Cách xử lý lịch đã gửi còn cần thiết kế/provider. Nguồn `KS 確認事項!K85;20261120!F33`; bằng chứng `EV-0981`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Bỏ nút đánh dấu xử lý; mở dòng thông báo sang màn liên quan thì đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Lọc mặc định chưa mở, bỏ lọc xem cả đã mở. Yêu cầu duyệt nằm danh sách M-04 riêng. Thông báo và email gửi Manager phụ trách, không mọi người.

Phân công category/cá nhân và fallback vẫn No.6; email loại nào và câu chữ còn cần rà mẫu. Không tự chốt đã xử lý chung hay riêng từng Manager.

Căn cứ: `M19:6,8;BF19:14;GJ19:6,7` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0591;EV-0593;EV-0626;EV-0639;EV-0640`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP10 – Nền tảng chung và quản trị hệ thống |
| Mã | C-05 (mã nội bộ) |
| Mục [YK2] | §6-13; 別紙A (phụ lục A, 17 loại) |
| Màn hình [AG] | T-14, M-02 |
| Mức sẵn sàng | 🟡 Vàng – 17 loại của 別紙A đã có; phần thêm và bớt chờ A6, A7 |

## Mục đích

Danh mục duy nhất các loại thông báo: gửi cho ai, khi nào, qua kênh nào, mở ra màn nào. 6-1 và 7-4 dùng danh mục này. Câu chữ cụ thể "xác nhận trên màn hình thật" (§6-13).

Ký hiệu kênh: **Ứng dụng** = T-14 cộng thông báo đẩy nếu được phép; **Quản trị** = M-02; **Thư** = thư điện tử.

## 1. 17 loại của 別紙A [Chốt]

| # | Loại | Người nhận | Khi nào | Kênh | Mở màn | Chức năng |
|---|---|---|---|---|---|---|
| 1 | 毎朝の声かけ (tin buổi sáng) | Tài năng | Giờ nhắn buổi sáng | Ứng dụng | T-08 | 3-4 |
| 2 | 達成のお祝い (chúc mừng) | Tài năng | Đăng thành công; hoàn thành thử thách | Ứng dụng | T-08 | 3-4, 3-7 |
| 3 | 写真・動画の催促 (nhắc gửi tư liệu) | Tài năng | Giờ nhắc, chưa có tư liệu | Ứng dụng | T-10 | 6-5 |
| 4 | 承認の結果 (kết quả duyệt) | Tài năng | Được duyệt hoặc bị trả lại | Ứng dụng | T-13 | 7-7 |
| 5 | 翌日・週次の振り返り (nhận xét hôm qua, tổng kết tuần) | Tài năng | Sáng sau ngày đăng; ngày tổng kết | Ứng dụng | T-08 | 3-6, 3-8 |
| 6 | フォロワーの増加 (người theo dõi tăng) | Tài năng | "Theo điều kiện đã định" | Ứng dụng | T-06 | 3-7 — **giữ mốc25/50/75% theo đề xuất QA No.14, khách xác nhận trên màn**; L23-09 theo dõi phần còn thiếu |
| 7 | 投稿がない日の声かけ (hỏi han khi không đăng) | Tài năng | Đủ mốc 1 | Ứng dụng | T-08 | 3-9 |
| 8 | 投稿の失敗 (đăng lỗi) | Tài năng, quản lý | Đăng lỗi | Ứng dụng; Quản trị | T-13; M-08 | 8-5 |
| 9 | SNS の接続切れ (mất kết nối) | Tài năng, quản lý | Mất kết nối | Ứng dụng; Quản trị | T-05; M-07 | 8-6 |
| 10 | 支払いの失敗 (thu tiền lỗi) | Tài năng, quản lý | Thu lỗi | Ứng dụng; Quản trị | T-15; M-10 | 1-1 |
| 11 | 申し込みの結果 (kết quả đơn) | Người đăng ký | Duyệt hoặc từ chối | Thư | — | 1-4 |
| 12 | 利用の申し込み (có đơn mới) | Quản lý | Có đơn | Quản trị | M-03 | 1-4 |
| 13 | 承認の依頼 (yêu cầu duyệt) | Quản lý | Tài năng xin duyệt | Quản trị | M-05 | 7-7 |
| 14 | 使ってはいけない言葉の検出 (dính từ cấm) | Quản lý | Bài dính từ cấm | Quản trị | M-11 | 4-4 |
| 15 | 深刻な相談 (chuyện nghiêm trọng) | Quản lý | AI phát hiện | Quản trị | M-09 | 3-3 |
| 16 | 投稿のない日が続いたタレント (lâu không đăng) | Quản lý | Đủ mốc 2 | Quản trị | M-07 | 3-9 |
| 17 | 目標の達成 (đạt mục tiêu) | Tài năng, quản lý | Đạt mục tiêu một mạng | Ứng dụng; Quản trị | T-06; M-07 | 3-7 |

## 2. Loại các chức năng cần nhưng 別紙A chưa có [Đề xuất, A6]

| Loại | Người nhận | Khi nào | Kênh | Chức năng |
|---|---|---|---|---|
| 動画ができました (video đã xong) | Tài năng | Tạo video xong | Ứng dụng | 5-1 ([AG] T-14 đã có) |
| 動画を作れませんでした (tạo video lỗi) | Tài năng | Tạo video lỗi | Ứng dụng | 5-1 |
| 承認の期限切れ (quá hạn duyệt) | Tài năng, quản lý | Quá giờ đăng chưa duyệt | Ứng dụng; Quản trị | 7-7 |
| 予約の取り消し (bài bị hủy) | Tài năng | Quản lý hủy, hoặc dừng đăng tự động | Ứng dụng | 7-2, 7-5 |
| 使ってはいけない言葉の検出 (phía tài năng) | Tài năng | Bài bị chặn, kèm lý do | Ứng dụng | 4-4 (S04-07) |
| パスワードの再設定 (đặt lại mật khẩu) | Tài năng, quản lý | Yêu cầu đặt lại | Thư | 1-4, 1-6 |
| マネージャーの招待 (mời quản lý) | Quản lý mới | Được thêm | Thư | 1-6 (S01-08) |

## Quy tắc

- Thông báo cho quản lý chỉ ở màn hình quản trị (giả định 確認45; khách ghi muốn thêm email, chưa chốt).
- Một số loại không tạo trùng khi đã có thông báo chưa xử lý của cùng tài năng (15: S03-10).
- Câu chữ viết bằng tiếng Nhật, khách duyệt trên màn hình thật (§6-13).

## Dữ liệu

`notification_types` (bảng hằng số trong mã): `code`, `recipients`, `channels`, `link_template`, `dedupe`.

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP10: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-13, 別紙A, 確認45. [AG] trang 5 (T-14), trang 6 (M-02). [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) A6, A7.


</details>
