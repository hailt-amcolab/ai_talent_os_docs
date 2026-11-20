# Cập nhật kiến thức tài liệu nguồn ngày 19/11/2026

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **C-06** — T19 có 19 màn, M19 có 21 màn; đăng nhập xong mở Mypage; thanh điều hướng 5 mục Home/AI/tư liệu/lịch/Mypage; chuông ở Home/Mypage. Số/chữ/tên trong hình là minh họa. Còn mở: Mục lục các PDF và KS có số trang cũ; trích trang PDF thực tế, không dùng số màn AG/18 thay cho 19. Căn cứ: `T19:1,32,33;M19:1,4`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

## 1. Nguồn chính thức và thay đổi lần này

Theo chỉ định mới của người dùng, [source_requiments/](../source_requiments/) tập hợp nguồn đầu vào ban đầu, tài liệu bổ sung qua thời gian và nhật ký Q&A. Danh mục hiện hành là [TAI_LIEU_NGUON.md](../TAI_LIEU_NGUON.md); không còn giới hạn ở chín tệp ngày 18/11.

Kiểm kê hiện có **12 tệp / năm thư mục con**. Đối chiếu SHA-256 với bảng hash của [báo cáo26 ngày 18/11](26_Doi_chieu_9_nguon_va_cau_hoi_khach.md): cả chín tệp cũ giữ nguyên nội dung, đã chuyển sang đường dẫn mới. DOCX ban đầu nay được ghi nhận trong danh mục lịch sử; hai PDF định nghĩa màn hình 18/11 là hai tài liệu bổ sung so với bộ chín tệp cũ. “Chưa có trong danh mục cũ” không đồng nghĩa nội dung DOCX ban đầu mới phát sinh ngày 19/11.

Bản kiểm kê đầy đủ tên/đường dẫn, kích thước, SHA-256, số trang hoặc sheet: [28_Kiem_ke_nguon_19-11-2026.json](28_Kiem_ke_nguon_19-11-2026.json).

| Nhóm | Số tệp | Vai trò |
|---|---:|---|
| `base/` | 5 | DOCX ban đầu; tài liệu giải thích; sơ đồ cũ; hai bản thiết kế trực quan. Giữ để truy lịch sử. |
| `16112026/` | 2 | YK2 và phương án màn [AG]. Bìa DOCX ghi bản 0.1 ngày 13/11; [AG] ngày 12/11, không lấy ngày thư mục làm ngày ban hành. |
| `17112026/` | 1 | Biên bản quyết định và việc được giao ngày 17/11 [GJ]. |
| `18112026/` | 2 | Định nghĩa Talent [SD-T18] 28 trang và Manager [SD-M18] 34 trang, đều ghi ngày lập 18/11. |
| `Q&A/` | 2 | Nhật ký [QA] và bảng xác nhận [KS]; đọc lại phiên bản hiện hành cho mỗi lần xử lý câu hỏi. |

Hai DOCX YK1/YK2 đều có bìa ghi bản 0.1 ngày 13/11 nhưng hash khác, số tệp ảnh nhúng khác (25/26). Không dùng bìa trùng để kết luận chúng là một phiên bản. Tệp nguồn không bị sửa trong lần cập nhật này.

## 2. Cách hiểu hai bản định nghĩa màn hình mới

Nguồn: [SD-T18, trang 1–2](../source_requiments/18112026/画面定義書_タレントのアプリ_AI育成OS.pdf) và [SD-M18, trang 1–2](../source_requiments/18112026/画面定義書_管理画面_AI育成OS.pdf).

- Cả hai ghi FutureCore Partners lập ngày 18/11, phản ánh yêu cầu và nội dung đến họp 17/11; gồm giải thích từng màn và các luồng nghiệp vụ ở phần sau.
- Phần **hình minh họa màn hình** dùng chữ, tên, số tạm; không biến giá trị minh họa thành giới hạn nghiệp vụ. Mô tả trường/điều kiện phải đọc riêng và đối chiếu quyết định.
- `要確認` (cần xác nhận), viết đỏ, là nội dung còn phải quyết định. Có bản PDF mới không tự đóng Q&A hoặc xác nhận toàn bộ giá/tiến độ.
- Bộ mã mới phải kèm mã tài liệu. Không đổi nghĩa các trích dẫn `[AG] T-08`, `[AG] M-15` trong tài liệu lịch sử sang bản mới chỉ vì cùng số.

## 3. Chỉ mục màn Talent — SD-T18

Nguồn: SD-T18 trang 2 (chỉ mục), từng màn ở trang 5–20. T-01–T-07 có tên tương ứng bộ [AG]; T-08 là màn thiết lập tự động, các màn từ hội thoại trở đi cần đối chiếu lại mã.

| Mã trong SD-T18 | Nội dung | Trang PDF |
|---|---|---:|
| T-01 | Đơn đăng ký sử dụng | 5 |
| T-02 | Đăng nhập | 6 |
| T-03 | Đặt mật khẩu lần đầu | 7 |
| T-04 | Các bước bắt đầu sử dụng | 8 |
| T-05 | Kết nối mạng xã hội | 9 |
| T-06 | Trang cá nhân | 10 |
| T-07 | Trang chủ | 11 |
| T-08 | Thiết lập đăng tự động | 12 |
| T-09 | Hội thoại với AI coach | 13 |
| T-10 | Chi tiết bản nháp | 14 |
| T-11 | Gửi ảnh/video | 15 |
| T-12 | Tạo video | 16 |
| T-13 | Kiểm tra video | 17 |
| T-14 | Lịch và kết quả đăng | 18 |
| T-15 | Thông báo | 19 |
| T-16 | Sử dụng và thanh toán | 20 |

Tám luồng nghiệp vụ: bắt đầu sử dụng (trang 21); đăng hằng ngày (22); tự động đăng (23); tạo video AI (24); xem kết quả/mục tiêu (25); xử lý thông báo (26); thanh toán hằng tháng (27); ngừng sử dụng (28).

## 4. Chỉ mục màn Manager — SD-M18

Nguồn: SD-M18 trang 2 (chỉ mục), từng màn ở trang 4–23.

| Mã trong SD-M18 | Nội dung | Trang PDF |
|---|---|---:|
| M-01 | Đăng nhập hai bước | 4 |
| M-02 | Danh sách thông báo | 5 |
| M-03 | Xét đơn đăng ký | 6 |
| M-04 | Danh sách chờ duyệt | 7 |
| M-05 | Duyệt bài đăng | 8 |
| M-06 | Danh sách Talent | 9 |
| M-07 | Thông tin Talent | 10 |
| M-08 | Bài đăng của Talent | 11 |
| M-09 | Hội thoại của Talent | 12 |
| M-10 | Cài đặt Talent | 13 |
| M-11 | Kiểm tra bài có từ cấm | 14 |
| M-12 | Tạo tài khoản công ty | 15 |
| M-13 | Quản lý nhóm | 16 |
| M-14 | Danh sách chỉ thị AI | 17 |
| M-15 | Nhập chỉ thị AI | 18 |
| M-16 | Dừng toàn bộ đăng tự động | 19 |
| M-17 | Cài đặt chung | 20 |
| M-18 | Quản lý Manager | 21 |
| M-19 | Nhật ký xem | 22 |
| M-20 | Nhập thông tin Talent | 23 |

11 luồng nghiệp vụ: bắt đầu sử dụng (trang 24); đăng hằng ngày (25); xem kết quả/mục tiêu (26); thông báo (27); thanh toán (28); phát hiện từ cấm (29); chỉ thị/cài đặt AI (30); ngừng sử dụng (31); dừng/mở lại đăng tự động (32); tài khoản công ty (33); sử dụng Manager/nhật ký xem (34).

## 5. Các điểm cần đối chiếu trước khi dùng lại câu hỏi/đặc tả cũ

Các đầu việc dưới đây là nhận diện đối chiếu nội bộ, **không phải kết luận khách đã chốt**.

| Điểm | Nội dung đã có trong nguồn 18/11 | Câu/nguồn phải đọc lại | Cách sử dụng |
|---|---|---|---|
| Nhập hồ sơ Talent | SD-M18 M-20, trang 23: có màn nhập, lưu lịch sử; xem/sửa qua ChatGPT cũng được mô tả; các trường nhập còn cần xác nhận. | QA No.74 `Q&A!E74:I74`; nhóm câu KH-025. | Không tiếp tục nói “chưa có màn nào được mô tả”, nhưng cũng không coi sự xuất hiện M-20 là phê duyệt thương mại hoặc trả lời No.74. |
| Đăng tự động | SD-T18 T-08 trang 12 và luồng trang 23 mô tả chủ đề/tư liệu/khoảng; cách tiến hành, số bài và trường màn còn phần sẽ đề xuất. | QA No.70/71 `Q&A!E70:I71`; GJ §1. | Giữ các ý còn mở, không hỏi lại như chưa có sơ đồ, không tự đóng vòng đời khoảng đăng. |
| Tài khoản công ty | SD-M18 M-12 trang 15 và luồng trang 33 mô tả đăng nhập app Talent bằng tài khoản công ty. | QA No.66 `E66:I66`; No.43 cập nhật tại `H44`; GJ §7 確認27 (mục xác nhận 27). | Ghi rõ cách tài liệu mới mô tả để xin xác nhận phần còn khác; không tự đóng No.66 chỉ vì No.43 là Close. |
| Phân công và email Manager | SD-M18 M-02 trang 5/M-10 trang 13 còn cần xác nhận phân công; trang 5/27 còn cần xác nhận loại và người nhận email. | QA No.6 `E7:I7`, No.75 `E75:I75`. | Không mặc định mọi Manager đều nhận mọi việc/email. |
| Dừng/mở lại | SD-M18 M-16 trang 19 và luồng trang 32 còn có điều kiện cần xác nhận đối với bài đã hẹn và bài hủy. | QA No.60 `E60:I60`, No.77 `E77:I77`. | Không coi nút đã vẽ là toàn bộ hành vi dừng/mở lại đã được duyệt. |
| Chat/thử thách | SD-T18 T-09 trang 13 còn cần xác nhận giới hạn trò chuyện và cách đề xuất thử thách. | QA No.72 `E72:I72`, phần 確認23 (mục xác nhận 23) tại No.76 `E76:I76`; GJ §2. | Không dùng hình màn hoặc kết quả AI để quyết định thay quy tắc nghiệp vụ. |
| Thu phí | SD-T18 trang 20/27 còn ghi hỏi cổng thanh toán về chu kỳ từ ngày đăng ký và tổng phí tháng + video biến đổi. | QA No.4 `E5:I5`, No.49 `E50:I50`, No.53 `E53:I53`; GJ §6/action 1. | Giữ khác biệt giữa yêu cầu/ý định thu và khả năng provider đã kiểm chứng. |

## 6. Nhật ký Q&A trong lần kiểm kê

Đã đọc cấu trúc/nội dung các sheet của file QA tại đường dẫn mới. Hash QA và KS trùng bản ghi 18/11; việc chuyển thư mục không tạo câu trả lời mới.

- `Q&A`: 76 câu, 43 Close / 33 Open.
- `保留` (bảo lưu): No.50 còn Open, không bỏ khi chỉ lọc sheet chính.
- `追加要件` (yêu cầu bổ sung): 25 dòng CR; không coi danh sách này là mọi mục đều được duyệt triển khai/phí.
- `デザインFB` (góp ý thiết kế) và `お知らせ・メール文章` (nội dung thông báo/thư) hiện chỉ có dòng tiêu đề.
- No.70, 71, 74 và 66 vẫn Open; No.43 là Close nhưng cập nhật của nó ở H44 tiếp tục dẫn phần cần hỏi tới No.66.

Đây là số liệu tại snapshot 19/11, không được chép làm trạng thái vĩnh viễn. Sau lần thay workbook tiếp theo phải đọc lại câu, trả lời, ghi chú và trạng thái.

## 7. Kiến thức đã lưu và ranh giới lần cập nhật

Đã cập nhật danh mục nguồn, quy tắc đọc trong AGENTS/CLAUDE và bàn giao TIEP_TUC; các liên kết nguồn bị hỏng do chuyển thư mục được đổi sang vị trí thực tế. Bản đối chiếu26 vẫn giữ vai trò lịch sử ngày 18/11; bộ lọc27 được nhắc đối chiếu nguồn mới trước khi sử dụng.

Không sửa 12 tệp nguồn hoặc câu trả lời khách. Không đóng Q&A, đổi bộ mã hàng loạt trong SCD, sửa phạm vi/chi phí hoặc xác nhận mọi luồng đã đủ điều kiện triển khai. Lần này cập nhật danh mục, đọc văn bản/chỉ mục/các mục cần xác nhận của hai PDF mới và lưu vị trí để tiếp tục đối chiếu; không phải đánh giá lại toàn bộ đặc tả, mọi chi tiết đồ họa hoặc trạng thái sẵn sàng của phần mềm.
