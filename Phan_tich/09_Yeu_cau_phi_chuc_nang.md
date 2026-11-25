<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### Đồng ý phụ huynh

Adesso lấy đồng ý khi ký với Talent; H18 ghi đã lấy đầy đủ; ứng dụng không giữ hồ sơ đồng ý.

**Còn mở/giới hạn:** Thay đề nghị lưu hồ sơ phụ huynh tại ISS22/ADV22 đúng chủ đề này; không tự kết luận đủ điều kiện pháp lý. Căn cứ: `KS 20261122!G18:H18 (No.17)`; `EV-1317`; QA No.69;TR-1-4.

### YK3: giới hạn và nghiệm thu

Ưu tiên cao/trung/thấp và số giới hạn là phương án/giả định FCP. Phụ lụcC còn確認57 (điều khoản),61 (dài/chất lượng video),62 (số ảnh). Mục tiêu go-live cuối02/2027; AC từng chức năng còn chờ thêm; provider chưa ký/xét duyệt có thể tách release theo văn bản nguồn.

**Còn mở/giới hạn:** Không suy chỉ còn3vấn đề toàn dự án: QA/CR/provider vẫn mở. Quy mô300/1000 trong YK3 chưa thay giới hạn150 ở CR-09. Chưa duyệt baseline, lịch hoặc điều khoản nghiệm thu/thương mại. Căn cứ: `YK3 w:p101–105; §3-2/3-3; §4-1–4-3; phụ lụcC`; `EV-1328`; YK3 §3;YK3 §4;CR-09.

<!-- /DELIVERY24112026 -->

> **Đợt23112026:** Đã đối chiếu nguồn mới; TikTok nháp/consent, ranking, lưu đồng ý phụ huynh và giọng nói là đề nghị chưa chốt. Không khôi phục Manager sửa, cảnh báo tâm sự hoặc trần phí từ hình/nhận định hồi tố. [Đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md). Mã màn phải kèm UI-M20/ngày20/11/trangPDF; không đổi mã AG/SD18/SD19.

# Yêu cầu phi chức năng

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **6-8** — Bắt buộc đăng ký phương thức thanh toán và mở từ biểu tượng màn hình chính; thêm biểu tượng bằng hướng dẫn thủ công theo máy. SNS và cho phép thông báo có thể làm sau. Thanh toán đăng ký xong tự kích hoạt, tạo folder và báo Manager; sau khởi tạo mở Mypage T-08, không phải Home T-09. Office bỏ bước thanh toán. Còn mở: Cần kiểm thiết bị/PWA quay lại sau kết nối, không coi hình minh họa là kiểm chứng tương thích. Căn cứ: `T19:5,6,8,9,11,26,33;BF19:4`.
- **C-04** — Lỗi video hiển thị câu dễ hiểu cố định, không mã lỗi provider; mọi ngoại lệ và vận hành lỗi cần đội rà thành yêu cầu phi chức năng. Còn mở: Timeout/retry/kết quả muộn và đối soát chưa được nguồn chốt; không phát triển nội dung khách suy diễn. Căn cứ: `GJ19:18;T19:21;BF19:9`.
- **3-5** — Tổng hợp phí AI theo Talent/tháng và tách ChatGPT. QA No.17/CR-16 chưa đổi: chưa có trần tự dừng. Sheet chi phí mới chỉ đề xuất trần, cột trả lời trống. Còn mở: Chưa xác nhận trần tiền hoặc phạm vi dừng khi chạm trần; không đưa trần hai lần viết lại đã bỏ vào tính phí. Căn cứ: `M19:15;KS:FEE3`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

> **Quyết định20/11 — DEC-0001:** người dùng chốt áp dụng H65, không giới hạn số lần nhờ AI viết lại. Thay giới hạn hai lần trong đúng chủ đề; các điều kiện sửa/duyệt và chính sách chi phí khác giữ nguyên. Xem [bản ghi quyết định](../docs/requirement-review/corrections-2026-11-19/REPORT.md).

Trong 7 nhóm yêu cầu phi chức năng, chỉ có bảo mật là được nêu tương đối đầy đủ. Các nhóm còn lại chủ yếu ghi "設計の中で決め、最終版に書きます" (sẽ quyết khi thiết kế và ghi vào bản cuối). Nguồn chính là [YK2] mục 9 (hiệu năng, vận hành, nhật ký), 10 (bảo mật), 11 (điều kiện tiền đề và ràng buộc), 12 (nghiệm thu) và phần 前提 (tiền đề) của các UC. Tab này đã viết lại theo bản yêu cầu v2.

**So với v1:** quy mô ban đầu rõ hơn (khoảng 30 người, thêm 10 mỗi tháng). Màn hình quản trị phải dễ xem trên điện thoại. Màn hình đăng ký công khai và email trở thành điểm bảo mật và tính sẵn sàng mới. Việc đồng ý về dữ liệu của tài năng thuộc công ty đã rõ (ủy thác khi ký hợp đồng).

**Cách đọc:**

- [YK2] = AI育成OS_概要要件定義書_v2.docx. Số 確認 (mục cần xác nhận) theo đánh số của v2.
- **Nêu rõ:** tài liệu ghi cụ thể. Các con số được chép nguyên từ tài liệu.
- **Cần xác nhận:** tài liệu chưa ghi, hoặc ghi sẽ quyết sau. Theo yêu cầu của bạn, mình **không đặt chỉ tiêu kỹ thuật** nào, chỉ nêu câu hỏi cần hỏi.

| Nhóm | Mức độ rõ ràng | Nguồn [YK2] |
| --- | --- | --- |
| Hiệu năng | Thấp. Chỉ có một mốc thời gian (xử lý buổi sáng xong trước giờ nhắn tin), không có thời gian phản hồi | 9-2 |
| Khả năng mở rộng | Trung bình. Có số người dùng theo từng giai đoạn và tốc độ tăng, chưa có dung lượng lưu trữ | 2-2, 9-2 |
| Tính sẵn sàng | Thấp. Khung giờ hoạt động "sẽ quyết". Có nguyên tắc xử lý khi dịch vụ ngoài lỗi | 9-3 |
| Bảo mật | Cao. Có đăng nhập, mã hóa, khóa kết nối, dữ liệu cá nhân, nhật ký xem. Thiếu biện pháp cho màn hình đăng ký công khai | 10, 6-1, 6-2 |
| Sao lưu | Rất thấp. Đối tượng, tần suất, thời gian giữ đều "sẽ quyết" | 9-3 |
| Nhật ký | Trung bình. Có 3 loại nhật ký, chưa có thời gian lưu | 9-4 |
| Khả năng bảo trì | Trung bình. Có các cài đặt đổi được mà không cần lập trình. Bảo trì sau phát hành nằm ở hợp đồng khác | 5-6, 7-5, 11 |

## 1. Hiệu năng

| Yêu cầu | Loại | Nguồn [YK2] |
| --- | --- | --- |
| Xử lý buổi sáng (đọc thông tin tài năng và số liệu, tạo bản nháp) phải xong trước giờ nhắn tin buổi sáng (mặc định trong khoảng 8 giờ) | Nêu rõ | 9-2, 5-2 |
| Tin gửi theo khung sáng, trưa, tối; đổi giờ theo từng tài năng xem xét sau khi vận hành | Chốt | [KS] 確認18 |
| Số tài năng dùng để kiểm tra yêu cầu trên sẽ quyết khi biết số tài năng bắt đầu dùng | Nêu rõ (cách kiểm tra), cần xác nhận (con số) | 9-2 |
| Tạo video mất vài phút. Tài năng được đóng ứng dụng trong lúc chờ, xong thì được báo | Nêu rõ (chỉ là mô tả, không phải chỉ tiêu) | 6-8 (5-1), UC-06 前提, [SM] tr.9 |
| Thông báo đẩy có thể đến trễ hoặc không đến, không đảm bảo | Nêu rõ (nằm ngoài cam kết) | 11 |
| Số liệu lấy mỗi ngày một lần | Nêu rõ | 6-11 (8-7), UC-09 前提 |
| Viết lại không giới hạn số lần ([KS] 確認29); trò chuyện chưa giới hạn (khách muốn đặt giới hạn, chưa chốt), nên tải lên AI chưa có trần | Một phần chốt | [KS] 確認29, 確認23 |
| Thời gian phản hồi của màn hình, của câu trả lời từ AI, của việc tải ảnh và video lên | Cần xác nhận (tài liệu không nêu) | — |
| Độ lệch cho phép giữa giờ hẹn và giờ bài thực sự xuất hiện trên mạng xã hội | Cần xác nhận | — |
| Số người dùng đồng thời | Cần xác nhận | — |

## 2. Khả năng mở rộng

| Yêu cầu | Loại | Nguồn [YK2] |
| --- | --- | --- |
| Số tài năng: bắt đầu tối thiểu khoảng 30 người, mỗi tháng thêm 10, sớm lên khoảng 100. Mục tiêu 200–300, tương lai 1.000 | Nêu rõ | 2-2, 9-2, 12-6, UC-01 前提 |
| Số quản lý: khoảng 5 | Nêu rõ | 2-2, 8 |
| Chi phí dịch vụ ngoài hằng tháng khi số tài năng tăng sẽ được ước tính và gửi riêng. Phí Upload-Post tăng theo số tài năng đã đăng ký, không theo số bài | Nêu rõ (sẽ gửi sau) | 9-2, 8, UC-08 前提 |
| Chi phí tham khảo mỗi bài: bài ảnh vài yên trở xuống, bài video trình chiếu ảnh khoảng 2–18 yên, cao hơn nếu ảnh cũng do AI tạo Nay video trình chiếu ghép ảnh ở máy chủ, không trả phí dịch vụ; con số 2–18 yên theo cách tính cũ (CR-04). | Nêu rõ (ước tính trong 確認) | 確認37 |
| Upload-Post cần gói đủ cho số tài năng. Vercel và Supabase phải là gói trả phí | Nêu rõ | 8 |
| Dung lượng tối đa của mỗi ảnh hoặc video, và tổng dung lượng lưu | Cần xác nhận ("sẽ quyết khi thiết kế") | 9-2, 6-7 (6-3) |
| Phạm vi mở rộng sau này: suất cho công ty trong tập đoàn, người hâm mộ dùng, doanh nghiệp đối tác, X, TikTok Live | Nêu rõ là để sau, mức làm trong đợt này sẽ bàn | 13, UC-01 前提 |
| Khả năng mở rộng của OneDrive, OpenAI, Upload-Post (giới hạn tốc độ, giới hạn số lần gọi) khi lên 1.000 tài năng | Cần xác nhận (tài liệu không nêu) | — |
| Việc làm tay của quản lý (duyệt đơn, tạo ChatGPT project, nhập hồ sơ) có theo kịp tốc độ thêm 10 tài năng mỗi tháng không | Cần xác nhận | UC-01 前提, 2-2 |

## 3. Tính sẵn sàng

| Yêu cầu | Loại | Nguồn [YK2] |
| --- | --- | --- |
| Dịch vụ ngoài lỗi thì chỉ dừng chức năng đó, các chức năng khác vẫn dùng được. Đăng bài lỗi thì báo | Nêu rõ | 9-3, 確認38 |
| Dịch vụ AI lỗi thì báo trên màn hình, cho gửi lại sau | Nêu rõ | 6-5 (3-4) |
| Có môi trường thật và môi trường kiểm thử | Nêu rõ | 9-1 |
| Không được làm ảnh hưởng ứng dụng tự động nhắn tin Instagram đang chạy | Nêu rõ | 9-1 |
| Có nút dừng đăng tự động toàn bộ hoặc từng tài năng khi có sự cố. Dừng thì hủy luôn bài đã đặt lịch | Nêu rõ | 6-10 (7-5), UC-08 前提 |
| Lỗi nghiêm trọng (hệ thống dừng, chức năng chủ yếu không dùng được, không có cách thay thế) phải sửa trước khi phát hành | Nêu rõ | 12-2 |
| Email (kết quả đăng ký, mật khẩu tạm, đặt lại mật khẩu) phải tới được người dùng. Tài liệu không nêu cách xử lý khi email không tới | Cần xác nhận | 6-1 (1-4), UC-01 |
| Khung giờ hoạt động | Cần xác nhận ("sẽ quyết khi thiết kế") | 9-3 |
| Tỷ lệ hoạt động cam kết, thời gian khắc phục, cách thông báo bảo trì | Cần xác nhận (tài liệu không nêu) | — |
| Ai theo dõi hệ thống sau khi phát hành, ai xử lý sự cố | Cần xác nhận (bảo trì là hợp đồng khác) | 11 |

## 4. Bảo mật

| Yêu cầu | Loại | Nguồn [YK2] |
| --- | --- | --- |
| Chỉ người được quản lý duyệt mới đăng nhập được, vì đường dẫn ứng dụng có thể lộ ra ngoài. Mật khẩu tạm gửi qua email | Nêu rõ | UC-01, 6-1 (1-4) |
| Tài năng đăng nhập bằng email và mật khẩu. Mật khẩu ít nhất 8 ký tự, có cả chữ và số. Sai 5 lần thì khóa 15 phút. Giữ đăng nhập 30 ngày. Quên mật khẩu thì tự đặt lại qua email  Khóa 5 lần sai làm ở BE; gọi thẳng Supabase Auth không bị đếm (rủi ro RT12 đã chấp nhận). | Nêu rõ | 6-1 (1-4), UC-03 前提 |
| Quản lý đăng nhập hai bước (mã 6 số từ ứng dụng xác thực). 30 phút không thao tác thì phải đăng nhập lại. Quản lý bị vô hiệu hóa thì không đăng nhập được | Nêu rõ | 6-2 (1-6), 10-1, UC-13 前提 |
| Tài năng chỉ xem dữ liệu của mình. AI chỉ dùng thư mục của tài năng đang trò chuyện | Nêu rõ | 10-1, 6-1 (1-5) |
| Mã hóa đường truyền và dữ liệu lưu trữ | Nêu rõ (chưa nêu chuẩn mã hóa) | 10-2 |
| Khóa kết nối dịch vụ ngoài không hiện trên màn hình hay trong nhật ký | Nêu rõ | 10-2 |
| Chỉ gửi cho AI phần thông tin cần thiết. Cài đặt không cho AI dùng dữ liệu để huấn luyện | Nêu rõ | 10-2, 8 |
| Không lưu thông tin thẻ, cổng thanh toán giữ | Nêu rõ | 10-2, UC-03 前提 |
| Tài năng thuộc công ty đã ủy thác việc xử lý dữ liệu cá nhân và quyền hình ảnh khi ký hợp đồng. アデッソ lấy đồng ý của phụ huynh với người vị thành niên khi ký hợp đồng. Hệ thống không lưu bằng chứng đồng ý | Nêu rõ | 2-3, 10-3, UC-03 前提 |
| Người đăng ký đồng ý điều khoản sử dụng trên màn hình đăng ký | Nêu rõ ⚠ (確認1) | UC-01 |
| Ngày sinh là dữ liệu mới, dùng để AI biết tuổi và để hiện nhãn dưới 18 tuổi | Chốt ([KS] 確認2) | UC-01 前提, 3-1 |
| Kiểm thử cơ bản dùng dữ liệu giả. Dùng dữ liệu thật thì phải có đồng ý bằng văn bản trước | Nêu rõ | 10-3 |
| Lần đầu mở ứng dụng, báo tài năng biết quản lý đọc được hội thoại và cho bấm xác nhận. Ghi nhật ký mỗi lần quản lý xem thông tin | Nêu rõ ⚠ (確認13, 44) | 3-2 |
| Biện pháp cho màn hình đăng ký công khai: chống đăng ký rác, xác minh email, giới hạn số lần gửi đơn | Cần xác nhận (tài liệu không nêu) | UC-01 |
| Đồng ý về dữ liệu, quyền hình ảnh, đồng ý của phụ huynh với người ngoài công ty tự đăng ký | Cần xác nhận | 2-3, 10-3, 確認1 |
| Thời hạn của mật khẩu tạm, chuẩn mã hóa, cách lưu mật khẩu | Cần xác nhận | — |
| Kiểm thử bảo mật (dò lỗ hổng) có nằm trong phạm vi không | Cần xác nhận | — |
| Quyền trên OneDrive và ChatGPT project (nằm ngoài hệ thống) được kiểm soát thế nào | Cần xác nhận | 7-2, 6-4 (2-3), UC-01 前提 |
| Xử lý khi quản lý mất điện thoại xác thực | Cần xác nhận | — |
| Quy định pháp lý về dữ liệu cá nhân của Nhật mà hệ thống phải tuân thủ | Cần xác nhận | 10-3 |

## 5. Sao lưu

| Yêu cầu | Loại | Nguồn [YK2] |
| --- | --- | --- |
| Sao lưu những gì, bao lâu một lần, giữ bao lâu | Cần xác nhận ("sẽ quyết khi thiết kế") | 9-3 |
| Khôi phục dữ liệu: ai được yêu cầu, chấp nhận mất dữ liệu trong bao lâu, khôi phục trong bao lâu | Cần xác nhận (tài liệu không nêu) | — |
| Dữ liệu trên OneDrive có được sao lưu riêng không, hay dựa vào Microsoft 365 của アデッソ | Cần xác nhận | 7-2 |
| Dữ liệu nằm ở Upload-Post và cổng thanh toán (kể cả lịch sử hóa đơn) có cần lưu bản sao trong hệ thống không | Cần xác nhận | 8, 6-3 (1-1) |
| Dữ liệu của tài năng đã rời đi giữ 6 tháng rồi tự xóa, không khôi phục | Chốt | 7-3, [KS] 確認55 |

## 6. Nhật ký

| Yêu cầu | Loại | Nguồn [YK2] |
| --- | --- | --- |
| Nhật ký xem: quản lý nào mở màn hình thông tin, hội thoại hoặc số liệu của tài năng nào, lúc nào. Không sửa được | Nêu rõ ⚠ (確認44) | 9-4, 6-2 (7-6) |
| Nhật ký thao tác: duyệt bài, đổi trạng thái, dừng và chạy lại việc đăng tự động | Nêu rõ | 9-4 |
| Nhật ký xử lý: đăng bài, lấy số liệu, tạo video, thu phí | Nêu rõ | 9-4 |
| Không ghi khóa kết nối dịch vụ ngoài vào nhật ký | Nêu rõ | 10-2 |
| Có ghi nhật ký duyệt hoặc từ chối đơn, tạo tài khoản công ty, hủy bài, gửi email không (các thao tác mới của v2, chưa có trong danh sách 9-4) | Cần xác nhận | 9-4, UC-01, UC-12 |
| Thời gian lưu nhật ký | Cần xác nhận ("sẽ quyết khi thiết kế") | 9-4 |
| Ai được xem nhật ký thao tác và nhật ký xử lý, xem trên màn hình nào | Cần xác nhận | 9-4 |
| Có ghi nhật ký lỗi kỹ thuật để phục vụ bảo trì không. Có cảnh báo tự động cho người vận hành không | Cần xác nhận | — |
| Hội thoại có nội dung nhạy cảm (sức khỏe, người vị thành niên) có được ghi vào nhật ký kỹ thuật không | Cần xác nhận | 10-2 |

## 7. Khả năng bảo trì

| Yêu cầu | Loại | Nguồn [YK2] |
| --- | --- | --- |
| Quản lý tự đổi được các cài đặt trên màn hình quản trị mà không cần lập trình (theo từng tài năng và chung) | Nêu rõ | 5-6 |
| Giọng điệu, hồ sơ, kế hoạch nội dung, kinh nghiệm đăng bài đổi bằng file trên OneDrive, không cần lập trình, có tác dụng từ sáng hôm sau | Nêu rõ | 7-5, 5-5 |
| Nếu làm màn hình chỉ dẫn cho AI: lưu lịch sử phiên bản và quay lại bản cũ được | Đề xuất trong 確認, cần xác nhận | 確認7 |
| Bàn giao tài liệu hướng dẫn cho quản lý (8 nhóm thao tác) | Nêu rõ | 12-5 |
| Giao diện ưu tiên dễ dùng. Màn hình hiển thị rõ khi lỗi, khi không có dữ liệu, khi đang tải | Nêu rõ | 6-14 |
| Bảo trì sau phát hành và việc cập nhật khi dịch vụ ngoài đổi đặc tả, giá, điều khoản nằm trong hợp đồng bảo trì riêng | Nêu rõ (ngoài phạm vi) | 11 |
| Lỗi nhẹ được sửa theo hạn đã thống nhất, không làm trượt nghiệm thu | Nêu rõ | 12-2 |
| Bàn giao mã nguồn, tài liệu thiết kế, tài liệu vận hành cho bên bảo trì | Cần xác nhận (có thể nằm trong SOW, không có trong thư mục dự án) | 別紙D |
| Cách thay mô hình AI hoặc nhà cung cấp (ví dụ nếu Upload-Post không đáp ứng). [YK2] gọi Upload-Post là "dịch vụ đang dự kiến" | Cần xác nhận | 8, UC-03 前提 |

## 8. Tương thích (bổ sung)

| Yêu cầu | Loại | Nguồn [YK2] |
| --- | --- | --- |
| Ứng dụng tài năng chạy trên iPhone và Android, cài từ trình duyệt. Thông báo đẩy trên iPhone cần iOS 16.4 trở lên | Nêu rõ | 9-1, UC-03 前提 |
| Màn hình quản trị chủ yếu chạy trên trình duyệt máy tính, và phải dễ xem trên trình duyệt điện thoại. (Q&A No.33; màn duyệt và màn chỉnh chỉ dẫn cho AI thao tác được trên điện thoại, [KS] 前提 UC-10-1.) Mâu thuẫn với thiết kế [TK-M] đã được giải quyết | Nêu rõ | 9-1, UC-10 前提 |
| Đổi điện thoại thì đăng nhập lại và dùng tiếp hội thoại và số liệu cũ | Nêu rõ | UC-13 前提, 6-1 (1-4) |
| Danh sách hệ điều hành và trình duyệt được hỗ trợ | Cần xác nhận ("sẽ ghi ở bản cuối") | 9-1 |

## 9. Câu hỏi cần khách xác nhận

Có 12 câu hỏi, gom từ các dòng "Cần xác nhận" ở trên. Mức ưu tiên là đề xuất của mình, dựa trên việc câu trả lời ảnh hưởng tới kiến trúc đến đâu. Mình không đề xuất con số nào.

- [ ] **(Cao)** Hệ thống cần đáp ứng bao nhiêu tài năng khi vận hành chính thức, và bao nhiêu sau một năm?
- [ ] **(Cao)** Giờ cụ thể của các khung sáng, trưa, tối ([KS] 確認18); xử lý phải bắt đầu lúc nào và được phép trễ bao lâu so với giờ nhắn?
- [ ] **(Cao)** Khung giờ hoạt động của hệ thống, và có cam kết tỷ lệ hoạt động hay thời gian khắc phục không?
- [ ] **(Cao)** Sao lưu những dữ liệu nào, tần suất ra sao, giữ bao lâu? Chấp nhận mất dữ liệu trong khoảng bao lâu?
- [ ] **(Cao)** Màn hình đăng ký công khai cần những biện pháp chống đăng ký rác nào? Đồng ý của người ngoài công ty được lấy thế nào? (確認1)
- [ ] **(Cao)** Dung lượng tối đa của mỗi ảnh hoặc video và tổng dung lượng lưu trữ.
- [ ] **(Trung bình)** Thời gian phản hồi mong muốn của màn hình và của câu trả lời từ AI. Có cần trần chi phí AI cho mỗi tài năng không? (viết lại không giới hạn số lần, [KS] 確認29; trò chuyện chưa, 確認23)
- [ ] **(Trung bình)** Thời gian lưu từng loại nhật ký. Ai xem nhật ký thao tác và nhật ký xử lý.
- [ ] **(Trung bình)** Có yêu cầu kiểm thử bảo mật, và có chuẩn bảo mật nào của アデッソ phải tuân theo không?
- [ ] **(Trung bình)** Danh sách hệ điều hành và trình duyệt được hỗ trợ.
- [ ] **(Trung bình)** Sau khi phát hành và trước khi ký hợp đồng bảo trì, ai theo dõi hệ thống và xử lý sự cố?
- [ ] **(Thấp)** Những tài liệu nào được bàn giao để bảo trì? Dữ liệu trên OneDrive có cần sao lưu riêng không?
