# AI育成OS (hệ thống đào tạo tài năng bằng AI) – Phân tích bối cảnh kinh doanh và các điểm chưa rõ

> ⚠ File này viết theo bản yêu cầu v1. Bản v2 đã đổi một số nội dung và đánh lại toàn bộ số 確認 (mục cần xác nhận). Đọc [12_Cap_nhat_theo_v2.md](12_Cap_nhat_theo_v2.md) trước khi dùng nội dung bên dưới.

Ngày: 13/11/2026

## 1. Bối cảnh dự án

AI育成OS là ứng dụng có huấn luyện viên AI giúp tài năng của công ty quản lý アデッソ (Adesso) đăng bài đều đặn lên Instagram, TikTok và YouTube. Mục tiêu vận hành chính thức vào cuối tháng 2/2027.

| Hạng mục | Nội dung |
| --- | --- |
| Khách hàng | アデッソ, một công ty quản lý nghệ sĩ (芸能事務所 – công ty quản lý tài năng) tại Nhật Bản |
| Bên thực hiện | FutureCore Partners: thiết kế, phát triển, kiểm thử, phát hành |
| Giai đoạn | 概要要件定義書 (bản định nghĩa yêu cầu khái quát) bản 0.1, ngày 13/11/2026. Đang chờ khách trả lời 確認シート (bảng các mục cần xác nhận) |
| Lịch | Kiểm thử nghiệm thu của khách từ khoảng giữa tháng 1/2027. Vận hành chính thức cuối tháng 2/2027 (còn khoảng 3,5 tháng) |
| Cách làm | Chốt yêu cầu song song với thiết kế, phát triển và kiểm thử. Họp định kỳ 1–2 lần mỗi tuần, liên lạc qua Chatwork |

Nguồn: [YK] trang bìa và 改訂履歴 (lịch sử sửa đổi), mục 1-5 (cách chốt yêu cầu), mục 14-1 (lịch), mục 14-2 (họp và liên lạc). "Còn khoảng 3,5 tháng" là mình tính từ ngày của tài liệu tới cuối tháng 2/2027.

## 2. Vấn đề cần giải quyết

Vấn đề gốc là thiếu người kèm cặp liên tục để tài năng giữ thói quen đăng bài. Số tài năng tăng thì số quản lý không tăng kịp.

| Hiện trạng | Hệ quả |
| --- | --- |
| Khoảng 5 quản lý phụ trách khoảng 80 tài năng (mỗi người khoảng 16) | Không đủ sức kèm từng người đăng bài mỗi ngày |
| Phần lớn tài năng không tự đăng bài lên mạng xã hội | Ít người biết tới, số người theo dõi không tăng |
| Nhiều người không tự làm được video | Bỏ lỡ video ngắn, định dạng đang được thuật toán ưu tiên |
| Không ai phân tích số liệu để cải thiện bài sau | Đăng bài theo cảm tính |

Nguồn: [YK] mục 2-2 (hiện trạng: khoảng 5 quản lý, khoảng 80 tài năng, không tự đăng, không tự làm video) và mục 2-1. Dòng "không ai phân tích số liệu" là mình suy ra từ mục 2-1 và mục 6-5 (chức năng 3-2, 3-6), tài liệu không ghi trực tiếp.

## 3. Mục tiêu

Chỉ có một chỉ số được định lượng: 10.000 người theo dõi trên mỗi nền tảng. Các mục tiêu còn lại chưa có chỉ số đo.

1. **Kinh doanh:** tăng độ nhận diện và số người theo dõi để có việc từ nhà tài trợ hoặc từ công ty. Chỉ số mục tiêu: 10.000 người theo dõi trên mỗi nền tảng (Instagram, TikTok, YouTube), chỉnh được theo từng người và có hạn đạt.
2. **Hành vi:** cả những người vốn không hay đăng cũng duy trì việc đăng mỗi ngày. AI chuẩn bị nội dung, tài năng chỉ cần chụp và gửi.
3. **Vận hành:** quản lý chỉ thiết lập ban đầu, AI làm việc hằng ngày, con người chỉ xử lý trường hợp ngoại lệ.
4. **Doanh thu (ẩn trong thiết kế):** thu phí thuê bao tháng cộng phí theo số lần tạo video. Hệ thống vì vậy cũng là một sản phẩm thu tiền, không chỉ là công cụ nội bộ.

Nguồn: mục tiêu 1–3 lấy từ [YK] mục 2-1 và 確認1 (mục cần xác nhận số 1). Mục tiêu 1 còn lấy từ mục 6-4 (chức năng 2-4) và [SM] trang 3. Mục tiêu 4 là mình suy ra từ mục 5-4 và mục 6-3.

## 4. Đối tượng sử dụng

Hệ thống có hai nhóm người dùng thật là tài năng và quản lý. Ngoài ra, huấn luyện viên AI (AIコーチ) đóng vai một "người dùng ảo" chủ động nhắn tin.

| Đối tượng | Số lượng | Thiết bị | Đặc điểm |
| --- | --- | --- | --- |
| Tài năng có trả phí | Ban đầu ít, sau 80–150, mục tiêu 200–300, tương lai 1.000 | Điện thoại (ứng dụng web cài lên màn hình chính – PWA) | Phần lớn trẻ, nhiều người mới, có cả người vị thành niên, ít kinh nghiệm mạng xã hội. Phải đăng ký phương thức thanh toán mới dùng được huấn luyện viên AI |
| Tài năng miễn phí | Ít, do công ty quyết | Điện thoại (PWA) | Chức năng giống hệt người có trả phí |
| Quản lý | Khoảng 5 | Máy tính (管理画面 – màn hình quản trị) và ChatGPT | Một loại quyền duy nhất, xem được mọi tài năng, đăng nhập hai bước |
| Tài khoản công ty (事務所アカウント) | 1 | Quản lý đăng nhập vào | Đăng bài như một tài năng. Có thể có nhiều tài khoản công ty, mỗi tài khoản đăng nhập riêng ([YK] UC-12) |
| Huấn luyện viên AI (AIコーチ) | Mỗi tài năng một huấn luyện viên | Không áp dụng | Nhắn tin theo lịch, gợi ý chủ đề, viết bản nháp, phân tích kết quả |

Giai đoạn sau (ngoài phạm vi hiện tại): tài năng ngoài công ty, mạng xã hội của doanh nghiệp đối tác, nhà tài trợ và công ty tiếp thị.

Nguồn:

- [YK] mục 3-1 (loại người dùng, người vị thành niên, tài khoản công ty)
- [YK] mục 3-2, 3-3 (phạm vi xem thông tin)
- [YK] mục 6-2, chức năng 1-6 (đăng nhập hai bước, một loại quyền)
- [YK] mục 9-1 (thiết bị)
- [YK] mục 9-2 (quy mô)
- [YK] mục 13 (giai đoạn sau)
- [TK-T] trang 1 (nhân vật huấn luyện viên "モモ" – Momo)

## 5. Kết quả mong đợi

Khi vận hành chính thức, tài năng nhận tin nhắn từ huấn luyện viên AI mỗi sáng, chọn chủ đề, gửi ảnh, và bài tự đăng lên 3 mạng xã hội theo giờ hẹn.

**Khi vận hành chính thức:**

- Huấn luyện viên AI nhắn tin hằng ngày và hằng tuần. Nó viết bản nháp (chú thích bài đăng, hashtag, hướng dẫn chụp, kịch bản) và cải thiện dựa trên số liệu.
- Bài đăng được hẹn giờ lên Instagram, TikTok, YouTube. Kết quả ghi riêng cho từng mạng xã hội.
- AI tạo video (video ngắn hoặc video trình chiếu ảnh) từ ảnh, có ghi rõ là do AI tạo.
- Thu phí hằng tháng (thuê bao cộng phí video) qua cước nhà mạng hoặc thẻ.
- Màn hình quản trị có: thông báo, duyệt bài, danh sách tài năng, dừng toàn bộ việc đăng tự động, nhật ký truy cập.
- Bàn giao: kết quả kiểm thử, tài liệu hướng dẫn cho quản lý, danh sách từ cấm mẫu.

**Về lâu dài:** tỷ lệ đăng bài đều đặn tăng, số người theo dõi tiến tới 10.000 trên mỗi nền tảng, và tài năng có thêm việc.

**Hệ thống không đảm bảo (mục 11):**

- Tài khoản mạng xã hội không bị khóa.
- Thông báo đẩy luôn tới nơi.
- Chất lượng và độ chính xác của nội dung AI tạo ra.
- Việc kiểm tra từ cấm không bỏ sót.

Nguồn:

- [YK] mục 2-5 (một ngày sử dụng)
- [YK] mục 6-5 (huấn luyện viên AI)
- [YK] mục 6-6 (bản nháp bài đăng)
- [YK] mục 5-7, 6-8 (video)
- [YK] mục 5-4, 6-3 (thu phí)
- [YK] mục 6-10 (đăng bài hẹn giờ)
- [YK] mục 6-2, 6-9, 6-12 (màn hình quản trị)
- [YK] mục 12-1, 12-5, 2-4 (bàn giao)
- [YK] mục 11 (phạm vi không đảm bảo)

## 6. Thông tin chưa rõ

Có 37 mục đang chờ khách trả lời, khoảng 15 hạng mục để "quyết khi thiết kế hoặc ở bản cuối", và 13 điểm tài liệu chưa nêu.

**Cách đọc nguồn.** Các ký hiệu [YK], [SM], [SD], [TK-T], [TK-M] được giải thích ở bảng "Tài liệu nguồn" cuối trang. File Word không có số dòng cố định, nên nguồn ghi theo mục, mã chức năng và số 確認 (mục cần xác nhận). Ví dụ: "mục 6-5, chức năng 3-4" hoặc "確認24". File PDF ghi theo số trang.

### A. Đang chờ khách hàng trả lời (các mục ảnh hưởng thiết kế nhiều nhất)

| 確認 (mục cần xác nhận) | Nội dung | Ảnh hưởng | Nguồn |
| --- | --- | --- | --- |
| 3, 4 | Mọi quản lý xem được mọi tài năng và đọc toàn bộ hội thoại với AI | Quyền riêng tư. Có cần phân quyền theo người phụ trách không | [YK] mục 3-2, 3-3 |
| 11 | Đưa tin tức trong ngày vào gợi ý chủ đề | Lấy tin từ nguồn nào, chi phí bao nhiêu | [YK] mục 4 UC-04 (tình huống sử dụng 04), mục 5-3 |
| 16 | Quản lý có gửi ảnh và tạo video thay tài năng không | Phí video tính vào hóa đơn của ai | [YK] mục 4 UC-05 |
| 20, 33 | Cổng thanh toán có thu được số tiền thay đổi theo tháng không | Rủi ro lớn: không được thì mô hình thu phí gộp không chạy | [YK] mục 4 UC-11, mục 5-4, mục 8 |
| 21 | Bài của tài khoản công ty có cần duyệt không | Luồng duyệt bài | [YK] mục 4 UC-12 |
| 24 | Mọi tài năng nhận tin buổi sáng cùng lúc 8:00 | Tải tăng đột biến (xử lý hàng loạt, gọi OpenAI, gửi thông báo) | [YK] mục 5-2, 6-5 |
| 26, 30 | Giọng điệu (chọn từ 3 câu mẫu), bố cục màn hình chính của ứng dụng (chọn từ 3 phương án) | Giao diện và câu lệnh cho AI | [YK] mục 5-5, 6-5, 6-12 |
| 28, 29 | Hủy bài đã hẹn giờ chỉ làm được trên màn hình của Upload-Post. Bài đến hạn lúc đang dừng đăng tự động thì không đăng lại | Trải nghiệm người dùng | [YK] mục 6-10 |
| 35 | Khách còn ý tưởng nào khác để tạo động lực không | Phạm vi có thể nở thêm | [YK] mục 4 UC-04 |
| 36 | Tài năng tải lên video tự làm, mỗi ngày dùng một video theo thứ tự | Logic tạo bản nháp | [YK] mục 4 UC-06 |

### B. Tài liệu ghi "sẽ quyết khi thiết kế hoặc ở bản cuối"

| Hạng mục chưa có nội dung | Nguồn |
| --- | --- |
| Các trạng thái của bài đăng: nói có 6 trạng thái nhưng không liệt kê. Trạng thái của tài năng, video, kết nối mạng xã hội và hóa đơn cũng chưa có | [YK] mục 5-1 (hình 5-1) |
| 受入基準 (tiêu chí nghiệm thu) cho từng chức năng | [YK] mục 6 (đoạn mở đầu), mục 12-1 |
| Định dạng và dung lượng tối đa của mỗi file ảnh, video. Tổng dung lượng lưu | [YK] mục 6-7 (chức năng 6-3), mục 9-2 |
| Số bài tối đa mỗi ngày (để tránh bị khóa tài khoản) | [YK] mục 6-10 (chức năng 8-4), mục 9-5 |
| Các chỉ số lấy được từ Upload-Post | [YK] mục 4 UC-09, mục 6-11 |
| Hệ điều hành và trình duyệt được hỗ trợ | [YK] mục 9-1 |
| Khung giờ hoạt động, sao lưu dữ liệu | [YK] mục 9-3 |
| Thời gian lưu nhật ký | [YK] mục 9-4 |
| Thời gian giữ dữ liệu sau khi tài năng rời (一定の期間 – "một khoảng thời gian nhất định") | [YK] mục 7-3 |
| Cách gửi thông báo đẩy đến điện thoại (今後検討 – "sẽ xem xét sau") | [YK] mục 8 |
| Phí thuê bao tháng, đơn giá mỗi lần tạo video, ngày chốt sổ và ngày thu tiền | [YK] mục 5-4, 5-7, mục 6-3 (chức năng 1-1) |
| Cách kiểm tra bản quyền nội dung và hình ảnh | [YK] mục 11 |
| Cách quản lý kiểm tra huấn luyện viên AI chạy đúng trước khi giao cho tài năng | [YK] mục 4 UC-01 (bước 動作の確認 – kiểm tra hoạt động) |
| Ngày bắt đầu kiểm thử nghiệm thu, hạn các việc khách cần làm | [YK] mục 14-1, 14-4 |

### C. Điểm mình phát hiện khi phân tích (tài liệu chưa nêu)

| STT | Vấn đề | Căn cứ |
| --- | --- | --- |
| 1 | **Tài liệu cũ chưa cập nhật:** [SM] vẫn mô tả tài năng dùng qua LINE và n8n. Việc này đã được chốt bỏ trong cuộc họp 20/10/2026, chuyển sang PWA. Chỉ cần lưu ý đừng dùng [SM] làm căn cứ cho phần giao diện tài năng. Việc dùng n8n thì [YK] không nhắc tới | [SM] trang 3, 9, 19 ↔ [YK] 別紙B (phụ lục B), 正式要件整理表 (bảng tổng hợp yêu cầu chính thức) số 17, 18 |
| 2 | **Trạng thái tài năng không thống nhất:** chức năng 7-3 có 3 trạng thái 利用前 (trước khi dùng), 利用中 (đang dùng), 利用終了 (đã kết thúc). UC-13 lại dùng từ 退会 (hủy đăng ký) | [YK] mục 6-2 (chức năng 7-3) ↔ mục 4 UC-13, 確認22 |
| 3 | **Thiết kế có màn hình mà yêu cầu không có:** M-10 (phân loại tài năng) và M-11 (chỉ dẫn cho AI) | [TK-M] trang 1–3, 12–15 ↔ [YK] mục 6 |
| 4 | **Màn hình quản trị trên điện thoại:** yêu cầu nói không tối ưu cho điện thoại, nhưng thiết kế lại vẽ cả bản cho điện thoại | [YK] mục 9-1, 確認31 ↔ [TK-M] trang 1, 2, 18 |
| 5 | **Luồng nhập liệu từ ChatGPT vào OneDrive chưa được thiết kế:** không nói cơ chế, cách xác thực, cách nhận diện đúng tài năng. Đây là chức năng ưu tiên 高 (cao) | [YK] mục 6-4 (chức năng 2-3), mục 7-1, mục 8 |
| 6 | **OneDrive là nơi lưu dữ liệu chính cho AI:** có thể chạm giới hạn tốc độ của Microsoft Graph API khi xử lý buổi sáng cho 1.000 người. AI và quản lý cùng ghi vào một file. Ranh giới dữ liệu giữa Supabase và OneDrive chưa rõ | [YK] mục 6-4 (chức năng 2-1), mục 6-5 (chức năng 3-2), mục 7-2, 9-2 |
| 7 | **Chi phí AI không có mức trần:** chỉ giới hạn 1.000 ký tự mỗi tin, không giới hạn số tin. Tài liệu chỉ yêu cầu tổng hợp chi phí | [YK] mục 6-5 (chức năng 3-4, 3-5), mục 5-3 |
| 8 | **Chỉ số mục tiêu lệch với mục tiêu:** "duy trì đăng bài" và "có thêm việc" không có chỉ số đo | [YK] mục 2-1, 確認1 |
| 9 | **Luồng ngoại lệ còn thiếu:** quản lý sửa bài dính từ cấm xong thì tài năng có phải duyệt lại không. Rời giữa tháng có tính phí theo ngày không (tài liệu chỉ quy định trường hợp bắt đầu giữa tháng). Thanh toán lỗi thì không tự dừng nhưng cũng không có hạn chót | [YK] mục 6-6 (chức năng 4-4), mục 5-4, mục 6-3 (chức năng 1-1), 確認20 |
| 10 | **YouTube cần tiêu đề riêng:** 3 mạng xã hội dùng chung một chú thích bài đăng, nhưng không nói tiêu đề YouTube lấy từ đâu | [YK] mục 5-3, mục 6-6 (chức năng 4-1), mục 6-10 (chức năng 8-3) |
| 11 | **Upload-Post chưa được kiểm chứng:** gói dịch vụ cho hơn 150 tài khoản, các chỉ số lấy được, cách xử lý khi mất kết nối | [YK] mục 8 |
| 12 | **Người vị thành niên:** điều kiện tuổi của các mạng xã hội, bảo vệ trẻ khi trò chuyện với AI. Hệ thống không lưu bằng chứng đồng ý của phụ huynh | [YK] mục 10-3, 11, 確認32 |
| 13 | **Thông báo đẩy trên iPhone:** phải thêm ứng dụng vào màn hình chính và cần iOS 16.4 trở lên. Không có kênh dự phòng, trong khi giá trị của huấn luyện viên AI nằm ở việc chủ động nhắn tin | [YK] mục 6-1 (chức năng 6-2), mục 9-1, 11 |

*Đã sửa so với bản trước:* điểm 1 trước ghi là "mâu thuẫn chưa rõ", nhưng 別紙B (phụ lục B) cho thấy đã chốt. Điểm 9 trước ghi "hết giờ chưa duyệt có báo tài năng không", nhưng chức năng 7-7 đã quy định báo cả tài năng và quản lý, nên đã bỏ ý đó.

## 7. Rủi ro cần làm rõ sớm nhất

Nếu bốn điểm dưới đây không được chốt trước đợt kiểm thử nghiệm thu (giữa tháng 1/2027), mốc vận hành chính thức sẽ bị ảnh hưởng.

| STT | Rủi ro | Vì sao gấp | Nguồn |
| --- | --- | --- | --- |
| 1 | Cổng thanh toán có thu được số tiền thay đổi theo tháng không | Thẩm định cổng thanh toán mất thời gian. Không được thì phải đổi mô hình thu phí | [YK] mục 5-4, 8, 14-4, 確認33 |
| 2 | Luồng nhập liệu từ ChatGPT vào OneDrive | Chức năng ưu tiên 高 (cao), là đầu vào của toàn bộ huấn luyện viên AI | [YK] mục 6-4 (chức năng 2-3) |
| 3 | 受入基準 (tiêu chí nghiệm thu) | Còn khoảng 2 tháng tới đợt kiểm thử nghiệm thu mà chưa có tiêu chí | [YK] mục 6, 12-1 |
| 4 | Kênh thông báo đẩy (qua PWA) | Huấn luyện viên AI chỉ có giá trị khi tin nhắn tới được tài năng | [YK] mục 8, 9-1, 11 |

## Tài liệu nguồn

| Ký hiệu | Tài liệu | Ghi chú |
| --- | --- | --- |
| [YK] | AI育成OS_概要要件定義書.docx (bản định nghĩa yêu cầu khái quát) | Bản 0.1, ngày 13/11/2026. Nguồn chính và mới nhất |
| [SM] | 要件説明資料_AI育成OS.pdf (tài liệu giải thích yêu cầu) | 42 trang, bản cũ hơn |
| [SD] | 画面遷移図と画面案_AI育成OS.pdf (sơ đồ chuyển màn hình và phương án màn hình) | Ngày 11/11/2026 |
| [TK-T] | Design style/★AI育成OS_タレントアプリ画面_かわいい版.pdf (thiết kế ứng dụng tài năng, phiên bản dễ thương) | Các màn L-00 đến L-09 |
| [TK-M] | Design style/★AI育成OS_マネージャー管理画面_PC_携帯_カテゴリー_AI指示.pdf (thiết kế màn hình quản trị cho máy tính và điện thoại, có phân loại và chỉ dẫn cho AI) | Các màn M-01 đến M-11 |

Khi các tài liệu mâu thuẫn, [YK] quy định thứ tự ưu tiên: hợp đồng, rồi đến SOW (bản mô tả phạm vi công việc), rồi đến báo giá. Yêu cầu ghi ngày mới hơn thì được ưu tiên ([YK] mục 関連資料 – tài liệu liên quan).
