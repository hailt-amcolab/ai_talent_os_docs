# Vai trò người dùng và phân quyền

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **1-5** — Talent chỉ xem dữ liệu của mình; mọi Manager xem mọi Talent và toàn bộ hội thoại. Phạm vi nhận thông báo khác phạm vi xem dữ liệu. Còn mở: Không phát sinh quyết định nghiệp vụ mới từ phần nguồn này; các đề xuất kỹ thuật cũ vẫn là đề xuất. Căn cứ: `T19:11,23;M19:1,10,13`.
- **7-4** — Bỏ nút đánh dấu xử lý; mở dòng thông báo sang màn liên quan thì đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Lọc mặc định chưa mở, bỏ lọc xem cả đã mở. Yêu cầu duyệt nằm danh sách M-04 riêng. Thông báo và email gửi Manager phụ trách, không mọi người. Còn mở: Phân công category/cá nhân và fallback vẫn No.6; email loại nào và câu chữ còn cần rà mẫu. Không tự chốt đã xử lý chung hay riêng từng Manager. Căn cứ: `M19:6,8;BF19:14;GJ19:6,7`.
- **9-1** — Office nhập tên/email ở M-12; tạo folder ngay; Manager login app Talent bằng office, tự nối SNS; không thanh toán/không phí tháng/không duyệt; phí video nội bộ. Unit là office, hiện cùng Talent list. Còn mở: Vòng đời kết thúc/xóa office cần No.66; không suy ngoại lệ streak/nhắc ngày không đăng từ việc miễn phí. Căn cứ: `T19:5,9,25,30;M19:10,17;BF19:20`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

Tab này đã viết lại theo bản yêu cầu v2. [YK2] = AI育成OS_概要要件定義書_v2.docx. Số 確認 (mục cần xác nhận) theo đánh số của v2. **So với v1:** thêm vai trò người đăng ký (chưa duyệt), bỏ vai trò tài năng miễn phí, quản lý có thêm quyền duyệt đơn, tạo tài khoản công ty, hủy bài trên màn hình quản trị và dừng đăng tự động theo từng tài năng.

## 1. Danh sách vai trò

Tài liệu định nghĩa ba loại người dùng: tài năng, tài khoản công ty và quản lý ([YK2] mục 3-1). Khi đối chiếu các chức năng, có thêm ba loại tác nhân cần phân quyền: người đăng ký chưa được duyệt, huấn luyện viên AI và các xử lý tự động.

| Vai trò | Loại | Cách truy cập | Ghi chú | Nguồn [YK2] |
| --- | --- | --- | --- | --- |
| Người đăng ký (chưa duyệt) | Người dùng | Mở ứng dụng tài năng từ đường dẫn, gửi đơn (tên, email, ngày sinh, đồng ý điều khoản). Chưa đăng nhập được | Có thể là người thuộc công ty hoặc ngoài công ty ⚠ | UC-01, 6-1 (1-4), 確認1 |
| Tài năng (タレント) | Người dùng | Ứng dụng tài năng (PWA – ứng dụng web cài lên màn hình chính), email và mật khẩu, giữ đăng nhập 30 ngày | Đơn đã được duyệt. Tất cả đều trả phí, phải đăng ký thanh toán mới dùng được huấn luyện viên AI | 3-1, 5-4, 6-1 (1-4), UC-03 前提 |
| Quản lý (マネージャー) | Người dùng | Màn hình quản trị (chủ yếu trên máy tính; trên điện thoại đọc được, màn duyệt và màn chỉ dẫn cho AI thao tác được, [KS] 前提 UC-10-1), đăng nhập hai bước, tự đăng xuất sau 30 phút không thao tác. Ngoài ra dùng ChatGPT project để nhập thông tin tài năng | Chỉ có một mức quyền, mọi quản lý làm được như nhau. Khoảng 5 người, không trả phí | 3-1, 6-2 (1-6), 6-4 (2-3), 9-1, UC-10 前提  Một loại quản lý, mọi quản lý dừng được đăng tự động toàn bộ (Q&A No.5, CR-13). Người duyệt chỉ định (CR-14) bị cắt, nhưng yêu cầu duyệt gửi theo nhóm hoặc quản lý phụ trách ([KS] 確認34, CR-19) |
| Tài khoản công ty (事務所アカウント) | Tài khoản do quản lý tạo và vận hành | Quản lý đăng nhập ứng dụng tài năng bằng mã của từng tài khoản công ty (UC-12 前提). ⚠ Chức năng 9-1 lại nói thao tác trên màn hình quản trị | Không thu phí tháng, không đăng ký thanh toán. Không duyệt bài ⚠ | 3-1, UC-12 前提, 6-10 (9-1), 確認52 |
| Huấn luyện viên AI (AIコーチ) | Tác nhân hệ thống | Không đăng nhập. Mỗi tài năng có một huấn luyện viên, chỉ được dùng dữ liệu của tài năng đó | Đọc và ghi dữ liệu thay mặt hệ thống. Chưa có hồ sơ thì chưa đưa bản nháp | 5-5, 6-1 (1-5), 6-5, UC-01 前提 |
| Xử lý tự động của hệ thống | Tác nhân hệ thống | Chạy theo lịch hoặc theo sự kiện: gửi email, xử lý buổi sáng, đăng bài, lấy số liệu, thu phí | Tài liệu không đặt tên vai trò này, nhưng các chức năng tự động cần quyền riêng | 6-1 (1-4), 6-4 (2-2), 6-10, 6-11, 6-3 |

**Bên ngoài hệ thống** (không đăng nhập nhưng có nhận dữ liệu hoặc ra quyết định):

- **アデッソ (công ty khách hàng):** quyết định duyệt đơn, soạn điều khoản sử dụng, quản lý tài khoản các dịch vụ ngoài. Tài năng thuộc công ty đã ủy thác việc xử lý dữ liệu cá nhân và quyền hình ảnh khi ký hợp đồng ([YK2] 2-3, 8, 10-3).
- **Dịch vụ ngoài:** OpenAI, Upload-Post, fal.ai (Kling), cổng thanh toán (GMO), Microsoft 365 (OneDrive), ChatGPT, dịch vụ gửi email (chưa chọn) ([YK2] 8, 7-2).

**Người dưới 18 tuổi** không phải một vai trò riêng. Hệ thống tính từ ngày sinh và hiện nhãn dưới 18 tuổi trên màn hình quản trị để tham khảo ([YK2] 3-1, [KS] 確認2).

## 2. Trách nhiệm và chức năng sử dụng

Tài năng tự đăng ký và tự lo việc đăng bài. Quản lý duyệt đơn, thiết lập ban đầu và xử lý ngoại lệ. Phần việc hằng ngày do huấn luyện viên AI và xử lý tự động đảm nhận. Mã chức năng theo tab "Phạm vi".

| Vai trò | Trách nhiệm | Chức năng sử dụng | Nguồn [YK2] |
| --- | --- | --- | --- |
| Người đăng ký | Điền đơn và đồng ý điều khoản | 1-4 (phần đăng ký) | UC-01 |
| Tài năng | Đăng nhập bằng mật khẩu tạm và đặt mật khẩu. Đăng ký và duy trì phương thức thanh toán. Tự kết nối tài khoản mạng xã hội, tự chuyển Instagram sang tài khoản doanh nghiệp hoặc nhà sáng tạo. Chọn hoặc nói chủ đề, chụp và gửi ảnh, video, nhờ AI viết lại, 採用 bản nháp. Xin duyệt với bài công việc cần khách hàng cho phép | 1-1, 1-4, 3-4, 3-10, 4-1, 4-2, 4-3, 5-1, 5-3, 6-1, 6-2, 6-3, 6-4, 6-6, 6-7, 8-2 | 2-3, 3-2, UC-03 đến UC-09, UC-11 |
| Quản lý | Trước khi dùng: duyệt đơn và cài duyệt bài, tạo ChatGPT project cho tài năng, nhập hồ sơ và mục tiêu, nhập kinh nghiệm đăng bài, đăng ký danh sách từ cấm, tạo tài khoản công ty. Trong khi dùng: duyệt bài, sửa bài dính từ cấm, kiểm tra bài lỗi, hủy bài đã hẹn, góp ý qua chỉ dẫn cho AI hoặc liên hệ trực tiếp khi gấp. Quản trị: đổi trạng thái tài năng, thêm hoặc vô hiệu hóa quản lý, dừng đăng tự động toàn bộ hoặc từng tài năng | 1-2, 1-4 (duyệt đơn), 1-6, 2-3, 2-4, 3-5, 4-4 (sửa bài), 5-4 (xem), 6-3 (thay tài năng ⚠), 7-1 đến 7-7, 9-1 | 2-4, 3-2, UC-01, 02, 07, 08, 10–13, 12-5, 確認43 |
| Tài khoản công ty (do quản lý thao tác) | Đăng bài cho tài khoản mạng xã hội của công ty theo cùng luồng với tài năng | Giống tài năng, trừ thanh toán: 3-4, 4-1 đến 4-3, 5-1, 5-3, 6-3, 8-2, 8-3 (qua 9-1) | UC-12 前提, 6-10 (9-1) |
| Huấn luyện viên AI | Nhắn tin buổi sáng, nhắc nhở, chúc mừng, tổng kết tuần, báo tiến độ thử thách. Gợi ý chủ đề và viết bản nháp. Kiểm tra từ cấm. Giới hạn chủ đề và báo quản lý khi có chuyện nghiêm trọng. Chuyển lời góp ý của quản lý ⚠. Ghi thêm điều đã hiểu về tài năng | 3-1 đến 3-9, 4-1, 4-2, 4-4, 6-5 | 5-5, 6-5, 6-6, 確認14, 43 |
| Xử lý tự động | Gửi email kết quả đăng ký. Tạo thư mục khi thanh toán xong. Đăng ký tài năng với Upload-Post (thời điểm chưa rõ). Đọc dữ liệu mỗi sáng. Đăng bài đúng giờ. Lấy và ghi số liệu. Tính phí và gửi yêu cầu thu tiền. Hủy bài đã hẹn khi dừng đăng tự động, khi quá giờ chưa duyệt, khi tài năng kết thúc sử dụng. Gửi thông báo. Ghi nhật ký | 1-1, 1-4, 2-1, 2-2, 5-4, 6-1, 7-3 (phần tự động), 7-5, 8-1, 8-3 đến 8-9 | UC-01, UC-08 前提, UC-13, 6-3, 6-10, 6-11, 9-4, 確認36 |

## 3. Ma trận vai trò – quyền thao tác

Quản lý có toàn quyền trên mọi tài năng. Tài năng chỉ thao tác được trên dữ liệu của mình, và không đổi được hồ sơ, mục tiêu. Người đăng ký chỉ gửi được đơn.

**Chú thích:** **Có** = được phép. **Không** = tài liệu ghi rõ là không được, hoặc vai trò này không vào được màn hình đó. **Của mình** = chỉ trên dữ liệu của chính mình. **⚠** = dựa trên 確認 hoặc chưa rõ, xem mục 5. **–** = không áp dụng. Cột "Tài khoản công ty" là thao tác của quản lý khi dùng tài khoản công ty. Cột nguồn ghi mục và mã chức năng trong [YK2].

| Thao tác | Người đăng ký | Tài năng | Quản lý | Tài khoản công ty | Huấn luyện viên AI | Xử lý tự động | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Đăng ký, tài khoản và đăng nhập** |  |  |  |  |  |  |  |
| Gửi đơn đăng ký | Có | – | – | – | – | Kiểm tra email trùng, báo quản lý | UC-01, 1-4 |
| Duyệt hoặc từ chối đơn | Không | Không | Có | – | – | Gửi email mật khẩu tạm hoặc email từ chối | UC-01, 1-4 |
| Đăng nhập ứng dụng tài năng | Không | Có | Chỉ vào tài khoản công ty | Có | – | – | 3-1, 1-4, UC-12 前提 |
| Đặt lại mật khẩu qua email | Không | Của mình | ⚠ chưa nêu | ⚠ | – | Gửi email | 1-4, UC-03 前提 |
| Đăng nhập màn hình quản trị | Không | Không | Có (hai bước) | – | – | – | 3-2, 1-6 |
| Tạo tài khoản công ty | Không | Không | Có | – | – | Tạo thư mục | 3-2, UC-12 前提 |
| Thêm hoặc vô hiệu hóa quản lý | Không | Không | Có ⚠ | – | – | – | 1-6, UC-13 前提 |
| Đổi trạng thái tài năng (利用前 / 利用中 / 利用終了) | Không | Không | Có | – | – | Khi kết thúc: hủy bài đã hẹn, dừng nhắn tin, dừng thu phí, chặn đăng nhập | 3-2, 7-3, 確認53–56 |
| **Thông tin tài năng và cài đặt** |  |  |  |  |  |  |  |
| Nhập hoặc sửa hồ sơ, mục tiêu, thử thách | Không | Không | Có (qua ChatGPT project và màn hình quản trị) | – | Chỉ ghi thêm vào file bộ nhớ | – | 3-2, 2-3, 2-4, UC-02 前提 |
| Sửa kinh nghiệm đăng bài, chỉ dẫn cho AI, giọng điệu | Không | Không | Có (file OneDrive. Màn hình riêng ⚠) | – | Chỉ đọc | – | 7-1, 7-5, 確認6, 7, 8 |
| Tạo và gán nhóm tài năng, gán quản lý phụ trách | Không | Không | Có | – | – | – | [KS] 確認47, 34 |
| Đăng ký danh sách từ cấm | Không | Không | Có | – | Chỉ dùng để kiểm tra | – | 4-4, 5-6, UC-02 前提 |
| Đổi cài đặt chung (giờ nhắn tin, giờ nhắc, số ngày không đăng) | Không | Không | Có | – | – | – | 5-6 |
| Bật hoặc tắt duyệt bài cho từng tài năng | Không | Không | Có (khi duyệt đơn và về sau) | – | – | – | 5-6, 2-2, 7-7 |
| Đổi loại tài khoản | Không | Không | Không (không còn phân loại trả phí / miễn phí) | – | – | – | 5-4, 1-2, 1-3 |
| **Hội thoại và bài đăng** |  |  |  |  |  |  |  |
| Trò chuyện với huấn luyện viên AI | Không | Của mình (sau khi thanh toán; số lần chưa giới hạn, khách muốn đặt giới hạn, chưa chốt, 確認23) | ⚠ thay tài năng: chưa rõ | Có | Trả lời, chủ động nhắn | – | 3-4, UC-12, 確認23 |
| Chọn chủ đề, nhờ AI viết lại, 採用 | Không | Của mình | Chỉ với tài khoản công ty | Có | Tạo và viết lại bản nháp | – | 3-2, 4-1 đến 4-3 |
| Tự sửa chú thích, hashtag | Không | Có, bản nháp của mình ([KS] 確認28) | Chỉ khi bài dính từ cấm | Nhờ AI viết lại tối đa 2 lần ([KS] 確認29) | – | – | 4-2, 4-4, [KS] 確認28, 29 |
| Gửi ảnh, video, yêu cầu tạo video | Không | Của mình | Chỉ cho tài khoản công ty ([KS] 確認27) | Có | – | Gọi fal.ai, đếm số lần | 3-2, 6-3, 5-1, [KS] 確認27 |
| Gửi yêu cầu duyệt bài, gửi lại sau khi bị trả lại | Không | Của mình (nếu được bật duyệt) ⚠ | – | Không duyệt ⚠ | – | – | 4-3, 確認33, 35, 52 |
| Duyệt hoặc trả lại bài | Không | Không | Có: quản lý của nhóm hoặc quản lý phụ trách nhận yêu cầu, người bấm trước quyết ([KS] 確認34) | – | – | Quá giờ chưa duyệt thì hủy lịch ⚠ | 3-2, 7-7, 確認34, 36 |
| Hủy bài đã hẹn giờ | Không | Không | Có, trên màn hình quản trị | ⚠ | – | Khi dừng đăng tự động, khi tài năng kết thúc | 3-2, 7-2, 7-5, UC-08 前提 |
| Đổi giờ đăng | Không | Không ⚠ | ⚠ chưa nêu | ⚠ | – | AI chọn giờ | 8-1, 確認30 |
| Đăng bài lên mạng xã hội | Không | Không trực tiếp | Không trực tiếp | Không trực tiếp | Không | Có (đúng giờ, lên mạng đã kết nối) | 8-3, 8-4 |
| Dừng hoặc chạy lại đăng tự động (toàn bộ hoặc từng tài năng) | Không | Không | Có | – | – | Không đặt lịch mới, hủy bài đã đặt lịch | 3-2, 7-5 |
| Kết nối tài khoản mạng xã hội | Không | Của mình (không bắt buộc đủ 3 mạng ⚠) | Chỉ xem trạng thái | Có ⚠ | – | Tạo màn hình kết nối (hạn 48 giờ) | 8-2, UC-03 前提, 確認9, 11 |
| **Thanh toán** |  |  |  |  |  |  |  |
| Đăng ký hoặc đổi phương thức thanh toán | Không | Của mình | Không | Không (không thu phí) | – | – | 3-2, 1-1, UC-03 前提 |
| Xem lịch sử hóa đơn | Không | Của mình, qua trang của cổng thanh toán | ⚠ chưa nêu | – | – | – | 1-1, UC-11 前提 |
| Xem số lần tạo video và phí trong tháng | Không | Của mình ⚠ | Có, theo từng tài năng và tài khoản công ty | Chỉ đếm số lần | – | Tính phí, thu tiền | 5-4, 確認51 |
| Quyết định dừng sử dụng khi thanh toán lỗi | Không | Không | Có ⚠ | – | – | Không tự dừng | 1-1, 確認48 |
| **Theo dõi** |  |  |  |  |  |  |  |
| Xem số liệu, số người theo dõi, mức đạt mục tiêu | Không | Chỉ của mình, không xếp hạng ⚠ | Mọi tài năng ⚠ | Có | Đọc để nhận xét | Lấy và ghi số liệu | 3-10, 6-7, 8-7, 8-8, 確認40, 41 |
| Xem thông báo | Nhận email kết quả | Của mình (trong ứng dụng và thông báo đẩy) | Mọi thông báo dành cho quản lý trên màn hình quản trị; yêu cầu duyệt chỉ tới quản lý của nhóm hoặc phụ trách ([KS] 確認34). Email: khách muốn thêm, chưa chốt (確認45). Đánh dấu đã xử lý ⚠ | Có | – | Gửi thông báo | 6-1, 7-4, 確認41, 45, 46 |
| Xem chi phí AI theo tài năng | Không | Không | Có | – | – | Tổng hợp | 3-5 |
| Xem nhật ký việc quản lý xem thông tin | Không | Không | Có (không sửa được) | – | – | Ghi nhật ký | 7-6, 確認44 |
| Xem nhật ký thao tác và nhật ký xử lý | Không | Không | ⚠ | – | – | Ghi nhật ký | 9-4 |

## 4. Ma trận quyền truy cập dữ liệu

Mục 7-2 của [YK2] quy định ai được xem từng loại dữ liệu. Các dòng có ⚠ là nơi tài liệu chưa nói rõ.

**Chú thích:** **Đ** = đọc, **G** = ghi hoặc sửa, **–** = không được truy cập.

| Dữ liệu | Nơi lưu | Tài năng (của mình) | Tài năng khác | Quản lý | Huấn luyện viên AI | Dịch vụ ngoài nhận dữ liệu | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Đơn đăng ký (tên, email, ngày sinh, đồng ý điều khoản) | Hệ thống | G (khi gửi đơn) | – | Đ, duyệt | – | Dịch vụ gửi email | UC-01, 6-4 (2-2) |
| Thông tin tài khoản (tên, email, ngày sinh, loại tài khoản, dùng duyệt bài, dừng đăng tự động) | Hệ thống | ⚠ không được nêu | – | Đ, G | Tuổi hoặc ngày sinh ⚠ | Upload-Post (đăng ký tài năng) | 2-2, 8-2, UC-01 前提 |
| Hồ sơ tài năng (profile, định hướng, sở thích, sở trường, mục tiêu tương lai) | OneDrive, thư mục riêng | ⚠ Đ không được nêu. Không sửa được | – | Đ, G (qua ChatGPT project) | Đ (chỉ tài năng của mình) | OpenAI, ChatGPT | 7-1, 7-2, UC-02 前提, 10-2 |
| Mục tiêu và hạn, チャレンジ (thử thách) | OneDrive | Đ (qua mức đạt và lời nhắn). Không sửa được | – | Đ, G | Đ | OpenAI | 2-4, 3-10, 7-2, UC-02 前提 |
| Ngày riêng của tài năng | OneDrive | ⚠ không được nêu | – | Đ, G | Đ | OpenAI | 7-5 |
| File bộ nhớ do AI ghi | OneDrive | ⚠ không được nêu | – | Đ, G ⚠ | Đ, G | OpenAI | 6-5 (3-2), 7-5 |
| Kinh nghiệm đăng bài, chỉ dẫn thuật toán, chỉ dẫn cho AI | OneDrive (và cơ sở dữ liệu nếu làm màn hình chỉ dẫn ⚠) | – | – | Đ, G | Đ | OpenAI | 7-1, 7-2, 確認6 |
| Số liệu bài đăng, số người theo dõi | OneDrive (ghi lại từ Upload-Post) | Đ | – (không xếp hạng ⚠) | Đ | Đ | Upload-Post (nguồn số liệu) | 6-7, 7-2, 8-7, 8-8, 確認40 |
| Ảnh và video | OneDrive | Đ, G | – | Đ, G (gửi thay tài năng ⚠) | ⚠ không được nêu | Upload-Post (khi đăng), fal.ai (khi tạo video) | 6-3, 6-4, 7-2 |
| Bản nháp bài đăng | Hệ thống | Đ, G (tự sửa chữ, [KS] 確認28). Sửa qua AI tối đa 2 lần | – | Đ, G (khi dính từ cấm), duyệt | Đ, G | OpenAI, Upload-Post | 3-2, 4-1 đến 4-4, 7-7, 確認28 |
| Hội thoại với huấn luyện viên AI | Hệ thống | Đ, G | – | Đ (toàn bộ ⚠) | Đ, G | OpenAI | 3-2, 7-2, 確認42 |
| Thông tin thẻ, thanh toán, lịch sử hóa đơn | Cổng thanh toán (hệ thống không lưu thẻ) | Đ, G (qua trang của cổng thanh toán) | – | ⚠ trạng thái thanh toán | – | GMO | 1-1, 7-2, 10-2 |
| Số lần tạo video và phí trong tháng | Hệ thống | Đ | – | Đ | – | Cổng thanh toán (số tiền) | 5-4 |
| Chi phí AI theo tài năng | Hệ thống | – | – | Đ | – | – | 3-5 |
| Danh sách từ cấm | Hệ thống | – (chỉ thấy lý do khi bài bị chặn) | – | Đ, G | Đ | OpenAI | 4-4, UC-02 前提 |
| Nhật ký việc quản lý xem thông tin | Hệ thống | – | – | Đ (không sửa được) | – | – | 7-6, 9-4 |
| Khóa kết nối dịch vụ ngoài | Hệ thống | – | – | – (không hiện trên màn hình) | – | – | 10-2 |

Các dịch vụ ngoài đều do アデッソ ký hợp đồng. Với tài năng thuộc công ty, việc xử lý dữ liệu cá nhân và quyền hình ảnh đã được ủy thác khi ký hợp đồng ([YK2] 2-3, 10-3). Với người ngoài công ty tự đăng ký, tài liệu chưa nói.

## 5. Các quyền chưa được làm rõ

Có 20 điểm. Nhóm A chờ khách trả lời 確認. Nhóm B và C là những chỗ tài liệu chưa nói tới. So với bản theo v1, điểm về hủy bài trên Upload-Post và điểm về tài năng miễn phí tạo video đã không còn.

### A. Chờ khách trả lời 確認

| STT | 確認 | Đề xuất hiện tại | Câu hỏi cần làm rõ | Nguồn [YK2] |
| --- | --- | --- | --- | --- |
| 1 | 41, 47 | Mọi quản lý xem được mọi tài năng. Yêu cầu duyệt gửi theo nhóm hoặc quản lý phụ trách ([KS] 確認34); khách muốn chia cả nơi nhận thông báo khác theo người phụ trách (ý kiến ở 確認41, chưa chốt). Nhóm tài năng dùng để lọc và chia yêu cầu duyệt ([KS] 確認47) | Khi lên 1.000 tài năng có cần giới hạn theo quản lý phụ trách không? Nhóm tài năng có dùng để phân quyền không? | 3-2, 3-3, UC-10 |
| 2 | 42, 13 | Quản lý đọc toàn bộ hội thoại. (Q&A No.7 đóng 17/11: quản lý xem toàn bộ hội thoại; không làm CR-24.) Lần đầu mở ứng dụng, tài năng bấm nút xác nhận đã biết | Có cần lưu lại việc tài năng đã bấm xác nhận không? Với người vị thành niên có cần thêm phụ huynh xác nhận không? | 3-2, UC-03 |
| 3 | 27 | Quản lý gửi ảnh và tạo video thay tài năng | Chỉ cho tài khoản công ty hay cho mọi tài năng? Phí video tính vào ai? | UC-05, 6-3 |
| 4 | 52 | Tài khoản công ty không cần duyệt | Một quản lý tạo và đăng bài mà không ai kiểm tra chéo, có chấp nhận được không? Mục 7-4 lại ghi có duyệt | UC-12, 7-4 |
| 5 | 34 | Quản lý của nhóm hoặc phụ trách nhận yêu cầu; bấm trước thì quyết ([KS]) | Có ghi lại ai đã duyệt không? Hai quản lý bấm gần như cùng lúc thì sao? | UC-07, 9-4 |
| 6 | 48 | Thanh toán lỗi thì quản lý quyết có dừng sử dụng không | "Dừng sử dụng" là đổi sang 利用終了 (đã kết thúc) hay có trạng thái tạm khóa riêng? | UC-11, 6-3 (1-1) |
| 7 | 9, 11 | Tài năng tự kết nối mạng xã hội, không bắt buộc đủ 3 mạng. Quản lý chỉ xem trạng thái | Với tài khoản công ty thì ai kết nối? Tài năng có tự ngắt kết nối được không? | UC-03, 8-2 |
| 8 | 1, 2 | Người ngoài công ty đăng ký cùng luồng. Nhãn dưới 18 tuổi tính từ ngày sinh, chỉ để tham khảo ([KS] 確認2) | Người ngoài công ty và người vị thành niên có bị giới hạn quyền nào không (ví dụ thanh toán qua cước nhà mạng, tạo video có phí)? Ai lấy đồng ý của họ? | UC-01, 10-3 |

### B. Quyền của quản lý tài liệu chưa nói tới

| STT | Điểm chưa rõ | Căn cứ [YK2] |
| --- | --- | --- |
| 9 | **Không có vai trò quản trị cao hơn:** mọi quản lý đều thêm và vô hiệu hóa được quản lý khác. Có chặn việc vô hiệu hóa quản lý cuối cùng không? Ai tạo quản lý đầu tiên?  Q&A No.67 đang hỏi: quản lý khác đặt lại xác thực hai bước; không cho vô hiệu hóa quản lý cuối cùng. | 6-2 (1-6) |
| 10 | **Hai quản lý cùng xử lý một đơn đăng ký:** quy tắc "người bấm trước quyết" chỉ nói cho duyệt bài. Duyệt đơn thì sao? Đơn đã từ chối có được đổi thành duyệt không? | UC-01, 確認34 |
| 11 | **Quản lý trò chuyện với AI thay tài năng:** bảng ở mục 3-2 chỉ cho quản lý 採用 bản nháp của tài khoản công ty | 3-2 |
| 12 | **Quản lý sửa bản nháp của tài năng:** tài liệu chỉ cho sửa khi bài dính từ cấm. Khi duyệt bài, quản lý có được sửa không? Sau khi quản lý sửa, tài năng có phải xác nhận lại không? | 6-6 (4-4), 6-9 (7-7) |
| 13 | **Tài khoản công ty:** mã đăng nhập dùng chung giữa các quản lý hay không? Có đăng nhập hai bước không? Nhật ký có ghi được quản lý nào đã thao tác không? | UC-12 前提, 6-1, 9-4 |
| 14 | **Quyền trên OneDrive nằm ngoài hệ thống:** việc quản lý xem file hồ sơ trực tiếp trên OneDrive không được ghi vào nhật ký xem (7-6) | 7-2, 7-5, 7-6 |
| 15 | **Quyền của ChatGPT project:** mỗi tài năng một project. Ai được vào project nào? Tài khoản ChatGPT dùng chung hay riêng từng quản lý? Việc ghi qua ChatGPT có nằm trong nhật ký thao tác không? | 6-4 (2-3), UC-01 前提, 9-4 |
| 16 | **Ai được xem nhật ký thao tác và nhật ký xử lý:** mục 9-4 yêu cầu ghi, nhưng không có chức năng nào để xem | 9-4 |
| 17 | **Tài năng đã kết thúc sử dụng:** quản lý còn được xem và xuất dữ liệu không? Hết 6 tháng thì hệ thống tự xóa, không khôi phục ([KS] 確認55). | 7-3, UC-13 |

### C. Quyền của tài năng, người đăng ký và hệ thống tài liệu chưa nói tới

| STT | Điểm chưa rõ | Căn cứ [YK2] |
| --- | --- | --- |
| 18 | **Tài năng xem hồ sơ của chính mình:** tài năng không đổi được hồ sơ và mục tiêu (UC-02 前提), nhưng có được xem hồ sơ quản lý đã nhập và điều AI đã ghi nhớ về mình không? | 7-2, UC-02 前提 |
| 19 | **Người đăng ký chưa duyệt hoặc bị từ chối:** mở ứng dụng thì thấy gì? Có xem được trạng thái đơn không? Có rút hoặc sửa đơn được không? | UC-01 |
| 20 | **Người vận hành hệ thống và AI xem ảnh:** không có vai trò nào quản lý khóa kết nối, cài đặt môi trường hay sao lưu. AI có xem ảnh, video để viết bản nháp không (nếu có thì là dữ liệu gửi thêm cho OpenAI) | 9-3, 10-2, 10-3, 6-6 |
