# AI育成OS (hệ thống đào tạo tài năng bằng AI) – Phân tích bối cảnh kinh doanh và các điểm chưa rõ

## Cập nhật ngày 17/11/2026 theo Q&A bản 15/11 và các quyết định nội bộ

Chi tiết ở [19_Doi_chieu_QA_bao_gia.md](19_Doi_chieu_QA_bao_gia.md) (Q&A No.x, CR-xx) và [20_Rui_ro_ky_thuat.md](20_Rui_ro_ky_thuat.md). Nội dung bên dưới khối này chưa được viết lại; chỗ nào khác khối này thì làm theo khối này. File này xuất từ tab Claude Doc; **tab Claude Doc cũng cần thêm khối này**.

- CR-17〜CR-25 (nhóm tài năng M-10, màn chỉ thị cho AI M-11, duyệt theo nhóm, nhiều tài khoản trên một mạng, sửa chữ trực tiếp, màn thử thách, video tự làm thành bản nháp mỗi ngày, hội thoại riêng tư, AMCOLAB làm 画面定義書) là thay đổi ngoài báo giá, **chưa làm** tới khi khách trả lời Q&A No.50. Áp cho các dòng 確認6–8, 47 (màn chỉ dẫn AI, nhóm tài năng) và 確認41, 42 (riêng tư hội thoại: Q&A No.7 còn mở, CR-24).
- Tin tức trong ngày (確認16): đã chốt làm (Q&A No.38, CR-05), dùng chức năng tìm web của AI, 1 lần mỗi ngày.


2026-11-13 · hoahn-hocnao

Tab này viết theo bản yêu cầu v2 (AI育成OS_概要要件定義書_v2.docx). Những gì đã đổi so với v1 nằm ở tab Cập nhật theo v2.

## 1. Bối cảnh dự án

AI育成OS là ứng dụng có huấn luyện viên AI (AIコーチ) giúp tài năng của công ty quản lý アデッソ (Adesso) đăng bài đều đặn lên Instagram, TikTok và YouTube. Mục tiêu vận hành chính thức vào cuối tháng 2/2027.

| Hạng mục | Nội dung |
| --- | --- |
| Khách hàng | アデッソ, một 芸能事務所 (công ty quản lý tài năng) tại Nhật Bản |
| Bên thực hiện | FutureCore Partners: thiết kế, phát triển, kiểm thử, phát hành |
| Giai đoạn | 概要要件定義書 (bản định nghĩa yêu cầu khái quát) v2. Trang bìa vẫn ghi bản 0.1, ngày 13/11/2026. Có 56 mục 確認 (mục cần xác nhận) gửi kèm 確認シート (bảng các mục cần xác nhận) |
| Cách chốt yêu cầu | Khách trả lời bảng xác nhận, xem màn hình thật, rồi chúng ta nộp bản yêu cầu và định nghĩa màn hình. Khách xác nhận trong 5 ngày làm việc, quá hạn coi như đã xác nhận. Câu hỏi trong bảng xác nhận được trả lời trong 3 ngày làm việc |
| Lịch | Kiểm thử nghiệm thu của khách từ khoảng giữa tháng 1/2027 (ngày cụ thể còn điều chỉnh). 検収 (nghiệm thu) khoảng tuần 2–3 tháng 2/2027. Vận hành chính thức cuối tháng 2/2027 |
| Cách làm | Chốt yêu cầu song song với thiết kế, phát triển và kiểm thử. Từ tuần 17/11/2026 đến hết năm họp định kỳ thứ Ba (sau 16 giờ) và thứ Sáu (11–15 giờ). Liên lạc qua Chatwork, tài liệu trên Google Docs, file qua Google Drive, câu hỏi qua Google Sheets |
| Tên và logo | Dùng tên, logo, màu của ứng dụng アデッソ hiện có. Không dùng hệ thống cũ |

Nguồn: [YK2] trang bìa, mục 1-5 (cách chốt yêu cầu), 2-6 (tên và logo), 6-12 (màu), 12-1, 14-1 (lịch), 14-2 (họp và liên lạc).

## 2. Vấn đề cần giải quyết

Vấn đề gốc là thiếu người kèm cặp liên tục để tài năng giữ thói quen đăng bài. Số tài năng tăng thì số quản lý không tăng kịp.

| Hiện trạng | Hệ quả |
| --- | --- |
| Khoảng 5 quản lý phụ trách khoảng 80 tài năng (mỗi người khoảng 16) | Không đủ sức kèm từng người đăng bài mỗi ngày |
| Nhiều tài năng không tự đăng bài lên mạng xã hội | Ít người biết tới, số người theo dõi không tăng |
| Có người không tự làm được video | Bỏ lỡ video ngắn |
| Không ai phân tích số liệu để cải thiện bài sau | Đăng bài theo cảm tính |

Sau khi đưa hệ thống vào dùng: huấn luyện viên AI nhắn tin cho từng tài năng mỗi ngày, quản lý chỉ xử lý khi có thông báo. Số tài năng dùng hệ thống bắt đầu từ khoảng 30, mỗi tháng thêm 10, sớm lên khoảng 100.

Nguồn: [YK2] mục 2-2 (hiện trạng, quy mô bắt đầu) và 2-1. Dòng "không ai phân tích số liệu" là mình suy ra từ mục 2-1 và 6-5 (chức năng 3-2, 3-6), tài liệu không ghi trực tiếp.

## 3. Mục tiêu

[YK2] mục 2-1 nêu ba mục tiêu. Chỉ mục tiêu thứ nhất có con số.

1. **Kinh doanh:** đạt 10.000 người theo dõi trên mỗi nền tảng (Instagram, TikTok, YouTube) và có thêm việc. Con số này là giá trị ban đầu, quản lý sửa được theo từng tài năng (⚠ 確認3).
2. **Hành vi:** cả những người vốn không hay đăng cũng duy trì việc đăng. AI chuẩn bị nội dung, tài năng chỉ cần chụp và gửi.
3. **Vận hành:** quản lý đăng ký ban đầu, còn việc nhắn tin, viết bản nháp và đăng bài hằng ngày do hệ thống làm.

[YK2] nhấn mạnh trung tâm là huấn luyện viên AI. Tạo video chỉ là phương tiện để tăng người theo dõi, không phải mục đích.

Ngoài ra, hệ thống cũng là sản phẩm thu tiền: mọi tài năng đăng ký đều trả phí tháng cố định cộng phí tạo video. Đây là mình suy ra từ mục 3-1 và 確認49, không phải mục tiêu được nêu.

Nguồn: [YK2] mục 2-1, 3-1, 確認3, 49; [SM] trang 3.

## 4. Đối tượng sử dụng

Người dùng thật là tài năng và quản lý. Huấn luyện viên AI đóng vai một "người dùng ảo" chủ động nhắn tin. Bản v2 bỏ loại "tài năng miễn phí" của v1.

| Đối tượng | Số lượng | Thiết bị | Đặc điểm |
| --- | --- | --- | --- |
| Tài năng | Bắt đầu khoảng 30, mỗi tháng thêm 10, sớm khoảng 100. Mục tiêu 200–300, tương lai 1.000 | Điện thoại iPhone, Android (PWA – ứng dụng web cài lên màn hình chính) | Tự đăng ký trên ứng dụng, được quản lý duyệt. Tất cả đều trả phí. Có cả người vị thành niên: hệ thống tính từ ngày sinh và hiện để tham khảo |
| 事務所アカウント (tài khoản công ty) | Chưa nêu | Quản lý đăng nhập vào | Quản lý tạo trên màn hình quản trị. Dùng chức năng như tài năng. Không tính phí tháng |
| Quản lý | Khoảng 5 | Máy tính là chính, điện thoại vẫn đọc được (管理画面 – màn hình quản trị), và ChatGPT | Một loại quyền, xem được mọi tài năng (⚠ 確認41), đăng nhập hai bước. Không trả phí |
| Huấn luyện viên AI (AIコーチ) | Mỗi tài năng một huấn luyện viên | Không áp dụng | Nhắn tin theo lịch, gợi ý chủ đề, viết bản nháp, phân tích kết quả. Chỉ làm việc khi quản lý đã nhập hồ sơ tài năng |

Chưa rõ: [YK2] không nói rõ người ngoài công ty có được đăng ký không. 確認2 chỉ nói "với tài năng thuộc công ty, アデッソ tự biết tuổi", ngụ ý có thể có người không thuộc công ty.

Giai đoạn sau ([YK2] mục 13, sẽ bàn thêm): X (Twitter cũ), phát trực tiếp TikTok, công ty cùng hệ thống, người hâm mộ, mạng xã hội của doanh nghiệp đối tác, nhà tài trợ và công ty tiếp thị, bảng xếp hạng, trò chuyện bằng giọng nói.

Nguồn: [YK2] mục 2-2, 3-1, 3-2, 9-1 (thiết bị), 9-2 (quy mô), 13, UC-01 前提 (tiền đề), 6-2 chức năng 1-6, 確認2, 41; [TK-T] trang 1 (nhân vật huấn luyện viên モモ – Momo).

## 5. Kết quả mong đợi

Khi vận hành chính thức, tài năng nhận tin nhắn từ huấn luyện viên AI mỗi sáng, chọn chủ đề, gửi ảnh hoặc video, chấp nhận bản nháp, và bài tự đăng lên 3 mạng xã hội theo giờ hệ thống chọn.

**Khi vận hành chính thức** (các chức năng ưu tiên 高 (cao) và 中 (trung bình), [YK2] 12-3):

- Tài năng tự đăng ký trên ứng dụng, quản lý duyệt, tài năng đăng ký thanh toán rồi mới dùng huấn luyện viên.
- Huấn luyện viên AI nhắn tin hằng ngày và hằng tuần, viết bản nháp (chú thích, hashtag, hướng dẫn chụp, kịch bản), cải thiện dựa trên số liệu.
- Bài được hẹn giờ lên Instagram, TikTok, YouTube. Kết quả ghi riêng cho từng mạng.
- AI tạo video ngắn từ ảnh.
- Thu phí hằng tháng (phí cố định cộng phí video) qua cước nhà mạng hoặc thẻ.
- Màn hình quản trị: duyệt đơn đăng ký, thông báo, duyệt bài, danh sách tài năng, dừng đăng tự động cho tất cả hoặc từng tài năng, hủy bài đã hẹn giờ, nhật ký xem, thao tác và xử lý.
- Bàn giao: kết quả kiểm thử, sách hướng dẫn cho quản lý (8 nhóm thao tác), danh sách từ cấm mẫu (khách phải tự xem lại).

Dịch vụ bên ngoài nào chưa xong thẩm định hoặc hợp đồng trước đợt kiểm thử nghiệm thu thì chức năng đó bị tách khỏi nghiệm thu và phát hành sau. Có phát hành từng phần hay không thì bàn theo tiến độ.

**Về lâu dài:** tài năng đăng bài đều hơn, số người theo dõi tiến tới 10.000 trên mỗi nền tảng, và tài năng có thêm việc.

**Hệ thống không đảm bảo** ([YK2] mục 11):

- Thông báo đẩy luôn tới nơi.
- Tài khoản mạng xã hội không bị khóa.
- Độ chính xác và chất lượng của nội dung AI tạo ra.

Nguồn: [YK2] mục 2-5 (một ngày sử dụng), UC-01, 6-3, 6-5, 6-6, 6-8, 6-10, 6-2, 6-9, 6-12, 9-4, 11, 12-1, 12-3, 12-5.

## 6. Thông tin chưa rõ

Có 56 mục 確認 (mục cần xác nhận) đang chờ khách trả lời, 11 hạng mục để "quyết khi thiết kế hoặc ở bản cuối", và 13 điểm tài liệu chưa nêu.

**Cách đọc nguồn.** Các ký hiệu [YK2], [YK1], [SM], [SD], [TK-T], [TK-M] được giải thích ở bảng "Tài liệu nguồn" cuối trang. File Word không có số dòng cố định, nên nguồn ghi theo mục, mã chức năng và số 確認. File PDF ghi theo số trang.

### A. Đang chờ khách hàng trả lời (các mục ảnh hưởng thiết kế nhiều nhất)

| 確認 | Nội dung | Ảnh hưởng | Nguồn [YK2] |
| --- | --- | --- | --- |
| 1, 2 | Đồng ý điều khoản trên ứng dụng; tuổi tính từ ngày sinh chỉ để tham khảo | Người vị thành niên và người ngoài công ty tự đăng ký | UC-01, 3-1 |
| 6–8, 47 | Màn hình chỉ dẫn AI, thử chỉ dẫn, nhóm tài năng (theo thiết kế của khách) | Phạm vi có thể nở thêm, chưa có mã chức năng | UC-02, 6-13 |
| 16 | Đưa tin tức trong ngày vào gợi ý chủ đề | Lấy tin từ nguồn nào, chi phí bao nhiêu | UC-04, 6-5 |
| 18 | Mọi tài năng nhận tin buổi sáng trong cùng khung 8 giờ | Tải tăng đột biến lúc xử lý buổi sáng | UC-04, 9-2 |
| 23, 29 | Không giới hạn số lần trò chuyện và viết lại bản nháp | Chi phí AI không có trần | UC-04, UC-05 |
| 27 | Quản lý gửi ảnh và tạo video thay tài năng | Phí video tính vào hóa đơn của ai | UC-05 |
| 30 | Tài năng không đổi được giờ đăng | Luồng đăng lại sau khi lỗi | UC-05, 6-10 |
| 34–36 | Người duyệt đầu tiên quyết; trả lại có lý do; quá giờ chưa duyệt thì hủy | Luồng duyệt bài | UC-07 |
| 37 | Bỏ giới hạn 1 ảnh + 1 video mỗi ngày | Biện pháp chống khóa tài khoản chưa có | UC-08, 9-5 |
| 41, 42 | Mọi quản lý xem được mọi tài năng và đọc toàn bộ hội thoại với AI | Quyền riêng tư | UC-10, 3-2 |
| 45 | Thông báo cho quản lý chỉ hiện trên màn hình quản trị, kể cả việc gấp | Việc gấp ngoài giờ làm có thể bị bỏ lỡ | UC-10, 6-12 |
| 48–51 | Cách tính phí tháng đầu, tháng rời đi; hóa đơn = phí cố định + phí video | Mô hình thu phí và cổng thanh toán | UC-11, 6-3 |
| 52 | Bài của tài khoản công ty không cần duyệt | Mâu thuẫn với chức năng 7-4 | UC-12 |
| 53–56 | Rời đi qua quản lý, khóa đăng nhập, thời gian giữ dữ liệu, cho quay lại | Trạng thái tài năng và dữ liệu | UC-13 |

### B. Tài liệu ghi "sẽ quyết khi thiết kế hoặc ở bản cuối"

| Hạng mục chưa có nội dung | Nguồn [YK2] |
| --- | --- |
| Các trạng thái của bài đăng: nói có 6 trạng thái. Trạng thái của tài năng, video, kết nối mạng xã hội và hóa đơn để bản cuối | mục 5-1 |
| 受入基準 (tiêu chí nghiệm thu) cho từng chức năng | mục 6 (đoạn mở đầu), 12-1 |
| Định dạng và dung lượng tối đa mỗi file ảnh, video; tổng dung lượng lưu | mục 6-7, 9-2 |
| Biện pháp chống khóa tài khoản (ví dụ giới hạn tần suất đăng) | mục 6-10, 9-5 |
| Các chỉ số lấy được từ Upload-Post (kiểm tra với tài khoản thật rồi ghi) | mục 6-11 |
| Hệ điều hành và trình duyệt được hỗ trợ | mục 9-1 |
| Khung giờ hoạt động, sao lưu dữ liệu | mục 9-3 |
| Thời gian lưu nhật ký | mục 9-4 |
| Cách gửi thông báo đẩy đến điện thoại | mục 8 |
| Cách kiểm tra bản quyền nội dung và hình ảnh | mục 11 |
| Ngày bắt đầu kiểm thử nghiệm thu, môi trường kiểm thử, cách kiểm thử thanh toán | mục 12-4, 14-1 |

Giá phí tháng và đơn giá video giờ nằm trong 確認49 (nhóm A). Thời gian giữ dữ liệu sau khi rời đi giờ nằm trong 確認55.

### C. Điểm mình phát hiện khi phân tích (tài liệu chưa nêu)

| STT | Vấn đề | Căn cứ |
| --- | --- | --- |
| 1 | **Tài liệu cũ chưa cập nhật:** [SM] vẫn mô tả tài năng dùng qua LINE và n8n. Việc này đã bỏ trong cuộc họp 20/10/2026, chuyển sang PWA. Đừng dùng [SM] làm căn cứ cho giao diện tài năng | [SM] trang 3, 9, 19 ↔ [YK2] 別紙B (phụ lục B) số 17 |
| 2 | **Trạng thái tài năng không thống nhất:** chức năng 7-3 dùng 利用前 (trước khi dùng), 利用中 (đang dùng), 利用終了 (đã kết thúc); UC-13 và 確認53–56 dùng 退会 (rời khỏi hệ thống) | [YK2] 6-2 (chức năng 7-3) ↔ UC-13 |
| 3 | **Màn hình trong thiết kế chưa có mã chức năng:** M-10 (nhóm tài năng) và M-11 (chỉ dẫn AI) mới chỉ là đề xuất trong 確認6–8, 47 | [TK-M] ↔ [YK2] 6, 6-13 |
| 4 | **Luồng nhập hồ sơ bằng ChatGPT:** mỗi tài năng một ChatGPT project liên kết thư mục OneDrive. Chưa nói hệ thống đọc dữ liệu từ đâu, xác thực thế nào | [YK2] UC-01 前提, 6-4 (chức năng 2-3), 7-5 |
| 5 | **OneDrive là nơi lưu dữ liệu chính cho AI:** có thể chạm giới hạn tốc độ của Microsoft khi xử lý buổi sáng cho nhiều người. Ranh giới dữ liệu giữa cơ sở dữ liệu và OneDrive chưa rõ | [YK2] 6-4 (chức năng 2-1), 6-5, 9-2 |
| 6 | **Chi phí AI không có trần:** giới hạn 1.000 ký tự mỗi tin, không giới hạn số tin và số lần viết lại. Chỉ yêu cầu tổng hợp chi phí | [YK2] 6-5 (chức năng 3-4, 3-5), 確認23, 29 |
| 7 | **Mục tiêu thiếu chỉ số:** "duy trì đăng bài" và "có thêm việc" không có chỉ số đo | [YK2] 2-1 |
| 8 | **Thời điểm đăng ký với Upload-Post:** chức năng 8-2 và UC-01 nói khác nhau. Phí Upload-Post tăng theo số tài năng đã đăng ký | [YK2] 6-10 (chức năng 8-2), UC-01, 8 |
| 9 | **Khoảng trống sau khi thanh toán:** tài năng đã trả tiền nhưng huấn luyện viên chưa hoạt động cho tới khi quản lý nhập hồ sơ. Không có hạn cho quản lý | [YK2] UC-01 前提 |
| 10 | **YouTube cần tiêu đề riêng:** 3 mạng dùng chung một chú thích, không nói tiêu đề YouTube lấy từ đâu | [YK2] 6-6 (chức năng 4-1), 6-10 (chức năng 8-3) |
| 11 | **Đăng ký công khai:** không nói cách chặn đơn rác, không xác minh email | [YK2] UC-01 |
| 12 | **Người vị thành niên:** điều kiện tuổi của các mạng xã hội, bảo vệ trẻ khi trò chuyện với AI, đồng ý của phụ huynh khi tự đăng ký | [YK2] 10-3, 11, 確認1, 2 |
| 13 | **Thông báo đẩy trên iPhone:** cần iOS 16.4 trở lên và phải thêm ứng dụng vào màn hình chính. Không có kênh dự phòng | [YK2] 6-1, 9-1, 11, 確認12 |

*Đã bỏ so với bản v1:* "màn hình quản trị trên điện thoại" (v2 đã yêu cầu đọc được trên điện thoại) và "luồng ngoại lệ còn thiếu" (v2 đã có 確認35, 48, 50). Thêm điểm 8, 9, 11. Danh sách đầy đủ các vấn đề mới của v2 (N1–N10) nằm ở tab Cập nhật theo v2.

## 7. Rủi ro cần làm rõ sớm nhất

Nếu năm điểm dưới đây không được chốt trước đợt kiểm thử nghiệm thu (giữa tháng 1/2027), mốc vận hành chính thức sẽ bị ảnh hưởng.

| STT | Rủi ro | Vì sao gấp | Nguồn |
| --- | --- | --- | --- |
| 1 | Giá và cách thu phí, cổng thanh toán thu được số tiền thay đổi theo tháng không | Mọi người phải thanh toán trước khi dùng, nên chặn cả luồng đăng ký. Thẩm định cổng thanh toán mất thời gian; chưa xong thì chức năng bị tách khỏi nghiệm thu | [YK2] 6-3, 12-1, 14-4, 確認48–51 |
| 2 | Hệ thống đọc hồ sơ tài năng từ ChatGPT project và OneDrive thế nào | Đầu vào của toàn bộ huấn luyện viên AI, chức năng ưu tiên 高 (cao) | [YK2] UC-01 前提, 6-4 (chức năng 2-3), 7-5 |
| 3 | 受入基準 (tiêu chí nghiệm thu) | Còn khoảng 2 tháng tới đợt kiểm thử nghiệm thu mà chưa có tiêu chí | [YK2] 6, 12-1 |
| 4 | Kênh thông báo đẩy (qua PWA) | Huấn luyện viên AI chỉ có giá trị khi tin nhắn tới được tài năng | [YK2] 8, 9-1, 11 |
| 5 | Điều kiện nhận người ngoài công ty và đồng ý của phụ huynh | Đăng ký công khai là bước đầu tiên của mọi tài năng; điều khoản sử dụng do khách soạn | [YK2] UC-01, 11, 確認1, 2 |

## Tài liệu nguồn

| Ký hiệu | Tài liệu | Ghi chú |
| --- | --- | --- |
| [YK2] | AI育成OS_概要要件定義書_v2.docx (bản định nghĩa yêu cầu khái quát, v2) | Trang bìa ghi bản 0.1, 13/11/2026. Nguồn chính và mới nhất |
| [YK1] | AI育成OS_概要要件定義書.docx (bản v1) | Đã bị thay thế |
| [SM] | 要件説明資料_AI育成OS.pdf (tài liệu giải thích yêu cầu) | 42 trang, bản cũ hơn |
| [SD] | 画面遷移図と画面案_AI育成OS.pdf (sơ đồ chuyển màn hình và phương án màn hình) | Ngày 11/11/2026 |
| [TK-T] | Design style/★AI育成OS_タレントアプリ画面_かわいい版.pdf (thiết kế ứng dụng tài năng, phiên bản dễ thương) | Các màn L-00 đến L-09 |
| [TK-M] | Design style/★AI育成OS_マネージャー管理画面_PC_携帯_カテゴリー_AI指示.pdf (thiết kế màn hình quản trị cho máy tính và điện thoại) | Các màn M-01 đến M-11 |

Khi các tài liệu mâu thuẫn: hợp đồng, rồi đến SOW (bản mô tả phạm vi công việc), rồi đến báo giá; tài liệu mới hơn được ưu tiên. Thiết kế của khách khác [YK2] thì theo [YK2] ([YK2] 6-14).
