# Vai trò người dùng và phân quyền

> ⚠ File này viết theo bản yêu cầu v1. Bản v2 đã đổi một số nội dung và đánh lại toàn bộ số 確認 (mục cần xác nhận). Đọc [12_Cap_nhat_theo_v2.md](12_Cap_nhat_theo_v2.md) trước khi dùng nội dung bên dưới.

## 1. Danh sách vai trò

Tài liệu chỉ định nghĩa hai loại người dùng là tài năng và quản lý ([YK] mục 3-1). Khi đối chiếu các chức năng, có thêm ba loại tác nhân cần phân quyền: tài khoản công ty, huấn luyện viên AI và các xử lý tự động.

| Vai trò | Loại | Cách truy cập | Ghi chú | Nguồn |
| --- | --- | --- | --- | --- |
| Tài năng có trả phí (タレント（有償）) | Người dùng | Ứng dụng tài năng (PWA – ứng dụng web cài lên màn hình chính), email và mật khẩu, giữ đăng nhập 30 ngày | Phải đăng ký thanh toán mới dùng được huấn luyện viên AI | [YK] mục 3-1, 6-1 (chức năng 1-4), 確認8 |
| Tài năng miễn phí (タレント（無償）) | Người dùng | Giống tài năng có trả phí | Chức năng giống hệt, không có bước thanh toán. Do アデッソ quyết, số lượng ít | [YK] mục 3-1, 6-3 (chức năng 1-2), 確認2 |
| Quản lý (マネージャー) | Người dùng | Màn hình quản trị trên máy tính, đăng nhập hai bước, tự đăng xuất sau 30 phút không thao tác. Ngoài ra dùng ChatGPT để nhập thông tin tài năng | Chỉ có một mức quyền, mọi quản lý làm được như nhau. Khoảng 5 người, không trả phí | [YK] mục 3-1, 6-2 (chức năng 1-6), 6-4 (chức năng 2-3) |
| Tài khoản công ty (事務所アカウント) | Tài khoản do quản lý vận hành | Quản lý đăng nhập vào từng tài khoản công ty, dùng các chức năng như tài năng. Có thể có nhiều tài khoản | Không phải duyệt bài (確認21) | [YK] mục 3-1, 4 (UC-12), 6-10 (chức năng 9-1) |
| Huấn luyện viên AI (AIコーチ) | Tác nhân hệ thống | Không đăng nhập. Mỗi tài năng có một huấn luyện viên, chỉ được dùng dữ liệu của tài năng đó | Đọc và ghi dữ liệu thay mặt hệ thống | [YK] mục 5-5, 6-1 (chức năng 1-5), 6-5 |
| Xử lý tự động của hệ thống | Tác nhân hệ thống | Chạy theo lịch hoặc theo sự kiện: xử lý buổi sáng, đăng bài, lấy số liệu, thu phí | Tài liệu không đặt tên vai trò này, nhưng các chức năng tự động cần quyền riêng | [YK] mục 6-4 (chức năng 2-2), 6-10, 6-11, 6-3 |

**Bên ngoài hệ thống** (không đăng nhập nhưng có nhận dữ liệu hoặc ra quyết định):

- **アデッソ (công ty khách hàng):** quyết định ai dùng, ai có trả phí. Lấy đồng ý về dữ liệu cá nhân. Quản lý tài khoản các dịch vụ ngoài ([YK] mục 2-3, 8, 10-3).
- **Dịch vụ ngoài:** OpenAI, Upload-Post, fal.ai (Kling), cổng thanh toán (GMO), Microsoft 365 (OneDrive), ChatGPT. Các dịch vụ này nhận hoặc lưu dữ liệu thay hệ thống ([YK] mục 8, 7-2).

**Người vị thành niên** không phải một vai trò riêng. Đây chỉ là một thuộc tính của tài năng, được nhập lúc đăng ký ([YK] mục 3-1, 6-4 chức năng 2-2).

## 2. Trách nhiệm và chức năng sử dụng

Tài năng tự lo việc đăng bài của mình. Quản lý thiết lập ban đầu và xử lý ngoại lệ. Phần việc hằng ngày do huấn luyện viên AI và xử lý tự động đảm nhận. Mã chức năng theo file "02_Pham_vi".

| Vai trò | Trách nhiệm | Chức năng sử dụng | Nguồn |
| --- | --- | --- | --- |
| Tài năng (có trả phí và miễn phí) | Chọn chủ đề, chụp và gửi ảnh, video, duyệt bản nháp. Tự kết nối tài khoản mạng xã hội, tự chuyển Instagram sang tài khoản doanh nghiệp hoặc nhà sáng tạo. Xin duyệt với bài cho công việc cần khách hàng cho phép. Người có trả phí thì phải đăng ký và duy trì phương thức thanh toán | 1-1 (chỉ người có trả phí), 1-4, 3-4, 3-10, 4-1, 4-2, 4-3, 5-1, 5-3, 6-1, 6-2, 6-3, 6-4, 6-6, 6-7, 8-2 | [YK] mục 2-3, 3-2, 4 (UC-03 đến UC-09, UC-11) |
| Quản lý | Trước khi dùng: đăng ký tài năng, nhập hồ sơ và mục tiêu, nhập kinh nghiệm đăng bài và danh sách từ cấm, kiểm tra huấn luyện viên AI, gửi hướng dẫn đăng nhập. Trong khi dùng: duyệt bài, sửa bài dính từ cấm, kiểm tra bài lỗi, liên hệ tài năng lâu không đăng hoặc có chuyện nghiêm trọng. Định kỳ: xem số liệu, chỉnh mục tiêu và kinh nghiệm đăng bài. Quản trị: đổi trạng thái tài năng, thêm hoặc vô hiệu hóa quản lý, dừng toàn bộ việc đăng tự động | 1-2, 1-3, 1-6, 2-2, 2-3, 2-4, 3-5, 4-4 (sửa bài), 5-4 (xem), 6-3 (thay tài năng), 7-1 đến 7-7, 9-1 | [YK] mục 2-4, 3-2, 4 (UC-01, 02, 07, 08, 10–13), 12-5 |
| Tài khoản công ty (do quản lý thao tác) | Đăng bài cho tài khoản mạng xã hội của công ty theo cùng luồng với tài năng | Giống tài năng: 3-4, 4-1 đến 4-3, 5-1, 5-3, 6-3, 8-2, 8-3 (qua 9-1) | [YK] mục 4 (UC-12), 6-10 (chức năng 9-1) |
| Huấn luyện viên AI | Nhắn tin buổi sáng, nhắc nhở, chúc mừng, tổng kết tuần. Gợi ý chủ đề và viết bản nháp. Kiểm tra từ cấm. Giới hạn chủ đề và báo quản lý khi có chuyện nghiêm trọng. Ghi thêm điều đã hiểu về tài năng vào file của tài năng | 3-1 đến 3-9, 4-1, 4-2, 4-4, 6-5 | [YK] mục 5-5, 6-5, 6-6 |
| Xử lý tự động | Tạo thư mục và đăng ký tài năng với Upload-Post khi quản lý thêm tài năng. Đọc dữ liệu mỗi sáng. Đăng bài đúng giờ và giới hạn số bài. Lấy và ghi số liệu. Tính phí và gửi yêu cầu thu tiền. Hủy bài đã hẹn và dừng thu phí khi tài năng kết thúc sử dụng. Gửi thông báo. Ghi nhật ký | 1-1, 2-1, 2-2, 5-4, 6-1, 7-3 (phần tự động), 8-1, 8-3 đến 8-9 | [YK] mục 4 (UC-01, UC-08, UC-13), 6-3, 6-10, 6-11, 9-4 |

## 3. Ma trận vai trò – quyền thao tác

Quản lý có toàn quyền trên mọi tài năng. Tài năng chỉ thao tác được trên dữ liệu của mình. Tài năng có trả phí và miễn phí chỉ khác nhau ở phần thanh toán.

**Chú thích:** **Có** = được phép. **Không** = tài liệu ghi rõ là không được, hoặc vai trò này không vào được màn hình đó. **Của mình** = chỉ trên dữ liệu của chính mình. **⚠** = dựa trên 確認 (mục cần xác nhận) hoặc chưa rõ, xem mục 5. **–** = không áp dụng. Cột "Tài khoản công ty" là thao tác của quản lý khi đăng nhập vào tài khoản công ty. Cột Nguồn ghi mục và mã chức năng trong [YK].

| Thao tác | Tài năng có trả phí | Tài năng miễn phí | Quản lý | Tài khoản công ty | Huấn luyện viên AI | Xử lý tự động | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Tài khoản và đăng nhập** |  |  |  |  |  |  |  |
| Đăng nhập ứng dụng tài năng | Có | Có | Chỉ vào tài khoản công ty | Có | – | – | 3-1, 1-4 |
| Đăng nhập màn hình quản trị | Không | Không | Có (hai bước) | – | – | – | 3-2, 1-6 |
| Đăng ký tài năng mới | Không | Không | Có | – | – | Tạo thư mục, đăng ký với Upload-Post | 3-2, 2-2, UC-01 |
| Thêm hoặc vô hiệu hóa quản lý | Không | Không | Có ⚠ | – | – | – | 1-6, UC-13 |
| Đổi trạng thái tài năng (利用前 – trước khi dùng / 利用中 – đang dùng / 利用終了 – đã kết thúc) | Không | Không | Có | – | – | Khi kết thúc: hủy bài đã hẹn, dừng nhắn tin, dừng thu phí, chặn đăng nhập | 3-2, 7-3 |
| **Thông tin tài năng và cài đặt** |  |  |  |  |  |  |  |
| Nhập hoặc sửa hồ sơ, mục tiêu của tài năng | Không | Không | Có (qua ChatGPT và màn hình quản trị) | – | Chỉ ghi thêm vào file bộ nhớ | – | 3-2, 2-3, 2-4, 3-2 (chức năng) |
| Sửa kinh nghiệm đăng bài, chỉ dẫn cho AI, giọng điệu (file trên OneDrive) | Không | Không | Có | – | Chỉ đọc | – | 7-1, 7-5 |
| Sửa danh sách từ cấm | Không | Không | Có | – | Chỉ dùng để kiểm tra | – | 4-4, 5-6 |
| Đổi cài đặt chung (giờ nhắn tin, giờ nhắc, số ngày không đăng) | Không | Không | Có | – | – | – | 5-6 |
| Bật hoặc tắt việc duyệt bài cho từng tài năng | Không | Không | Có | – | – | – | 5-6, 7-7 |
| Chuyển có trả phí sang miễn phí | Không | – | Có | – | – | – | 1-3 |
| Chuyển miễn phí sang có trả phí | – | Không | Không (hệ thống không hỗ trợ) | – | – | – | 5-4 |
| **Hội thoại và bài đăng** |  |  |  |  |  |  |  |
| Trò chuyện với huấn luyện viên AI | Của mình (sau khi đăng ký thanh toán) | Của mình | ⚠ thay tài năng: chưa rõ | Có | Trả lời, chủ động nhắn | – | 3-4, UC-12, 確認8 |
| Chọn chủ đề, yêu cầu sửa, 採用 (chấp nhận bản nháp) | Của mình | Của mình | Chỉ với tài khoản công ty | Có | Tạo và viết lại bản nháp | – | 3-2 (bảng), 4-1 đến 4-3 |
| Tự sửa chú thích, hashtag | Của mình | Của mình | Chỉ khi bài dính từ cấm ⚠ | Có | – | – | 4-2, 4-4 |
| Gửi ảnh, video, yêu cầu tạo video | Của mình | Của mình | Có, thay tài năng ⚠ | Có | – | Gọi fal.ai, đếm số lần | 3-2 (bảng), 6-3, 5-1, 確認16 |
| Gửi yêu cầu duyệt bài | Của mình (nếu được bật duyệt) | Của mình (nếu được bật duyệt) | – | Không duyệt ⚠ | – | – | 4-3, 確認21, 37 |
| Duyệt hoặc trả lại bài | Không | Không | Có | – | – | Không duyệt kịp thì không đăng | 3-2 (bảng), 7-7 |
| Hủy bài đã hẹn giờ | Không | Không | Có, chỉ trên màn hình Upload-Post ⚠ | ⚠ | – | Khi tài năng kết thúc sử dụng | 3-2 (bảng), 7-2, 確認28 |
| Đăng bài lên mạng xã hội | Không trực tiếp | Không trực tiếp | Không trực tiếp | Không trực tiếp | Không | Có (đúng giờ, có giới hạn số bài) | 8-3, 8-4 |
| Dừng hoặc chạy lại toàn bộ việc đăng tự động | Không | Không | Có | – | – | – | 3-2 (bảng), 7-5 |
| Kết nối tài khoản mạng xã hội | Của mình | Của mình | Chỉ xem trạng thái | Có ⚠ | – | Tạo màn hình kết nối (hạn 48 giờ) | 8-2, UC-03, 確認7 |
| **Thanh toán** |  |  |  |  |  |  |  |
| Đăng ký hoặc đổi phương thức thanh toán | Của mình | Không | Không | – | – | – | 3-2 (bảng), 1-1 |
| Xem số lần tạo video và phí trong tháng | Của mình | Của mình ⚠ | Có, theo từng tài năng | ⚠ | – | Tính phí, thu tiền | 5-4 |
| Quyết định dừng sử dụng khi thanh toán lỗi | Không | – | Có ⚠ | – | – | Không tự dừng | 1-1, 確認20 |
| **Theo dõi** |  |  |  |  |  |  |  |
| Xem số liệu, số người theo dõi, mức đạt mục tiêu | Của mình | Của mình | Mọi tài năng ⚠ | Có | Đọc để nhận xét | Lấy và ghi số liệu | 3-10, 6-7, 8-7, 8-8 |
| Xem thông báo | Của mình (trong ứng dụng và thông báo đẩy) | Của mình | Mọi thông báo dành cho quản lý ⚠ | Có | – | Gửi thông báo | 6-1, 7-4, 確認3 |
| Xem chi phí AI theo tài năng | Không (nằm trên màn hình quản trị) | Không | Có | – | – | Tổng hợp | 3-5 |
| Xem nhật ký việc quản lý xem thông tin | Không | Không | Có (không sửa được) | – | – | Ghi nhật ký | 7-6 |
| Xem nhật ký thao tác và nhật ký xử lý | Không | Không | ⚠ | – | – | Ghi nhật ký | 9-4 |

## 4. Ma trận quyền truy cập dữ liệu

Mục 7-2 của [YK] quy định ai được xem từng loại dữ liệu. Các dòng có ⚠ là nơi tài liệu chưa nói rõ.

**Chú thích:** **Đ** = đọc, **G** = ghi hoặc sửa, **–** = không được truy cập.

| Dữ liệu | Nơi lưu | Tài năng (của mình) | Tài năng khác | Quản lý | Huấn luyện viên AI | Dịch vụ ngoài nhận dữ liệu | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Hồ sơ tài năng (profile, định hướng, sở thích, sở trường, mục tiêu tương lai) | OneDrive, thư mục riêng của tài năng | ⚠ không được nêu | – | Đ, G | Đ (chỉ tài năng của mình) | OpenAI (phần cần cho hội thoại và bản nháp) | 7-1, 7-2, 10-2 |
| Mục tiêu số người theo dõi và hạn đạt | OneDrive | Đ (qua mức đạt mục tiêu) | – | Đ, G | Đ | OpenAI | 2-4, 3-10, 7-2 |
| Ngày riêng của tài năng (sinh nhật, lịch diễn…) | OneDrive | ⚠ không được nêu | – | Đ, G | Đ | OpenAI | 7-5 |
| File bộ nhớ do AI ghi (sở thích, bài được tương tác tốt) | OneDrive | ⚠ không được nêu | – | Đ, G ⚠ | Đ, G | OpenAI | 3-2 (chức năng), 7-5 |
| Kinh nghiệm đăng bài, chỉ dẫn thuật toán, chỉ dẫn cho AI | OneDrive, thư mục riêng hoặc thư mục chung | – | – | Đ, G | Đ | OpenAI | 7-1, 7-2 |
| Số liệu bài đăng, số người theo dõi | OneDrive (ghi lại từ Upload-Post) | Đ | – | Đ | Đ | Upload-Post (nguồn số liệu) | 6-7, 7-2, 8-7, 8-8 |
| Ảnh và video | OneDrive | Đ, G | – | Đ, G (gửi thay tài năng ⚠) | ⚠ không được nêu | Upload-Post (khi đăng), fal.ai (khi tạo video) | 6-3, 6-4, 7-2 |
| Bản nháp bài đăng | Hệ thống | Đ, G | – | Đ, G (khi dính từ cấm), duyệt | Đ, G | OpenAI, Upload-Post | 3-2, 4-1 đến 4-4, 7-7 |
| Hội thoại với huấn luyện viên AI | Hệ thống | Đ, G | – | Đ (toàn bộ ⚠) | Đ, G | OpenAI | 3-2, 7-2, 確認4 |
| Thông tin đăng ký (họ tên, tên hiển thị, email, có trả phí hay không, cần duyệt hay không, vị thành niên hay không) | Hệ thống | ⚠ không được nêu | – | Đ, G | ⚠ | Upload-Post (đăng ký tài năng) | 2-2, 8-2 |
| Thông tin thẻ, thanh toán | Cổng thanh toán (hệ thống không lưu thẻ) | Đ, G (qua màn hình cổng thanh toán) | – | ⚠ trạng thái thanh toán | – | GMO | 1-1, 7-2, 10-2 |
| Số lần tạo video và phí trong tháng | Hệ thống | Đ | – | Đ | – | Cổng thanh toán (số tiền) | 5-4 |
| Chi phí AI theo tài năng | Hệ thống | – | – | Đ | – | – | 3-5 |
| Danh sách từ cấm | Hệ thống | – (chỉ thấy lý do khi bài bị chặn) | – | Đ, G | Đ | OpenAI | 4-4 |
| Nhật ký việc quản lý xem thông tin | Hệ thống | – | – | Đ (không sửa được) | – | – | 7-6, 9-4 |
| Khóa kết nối dịch vụ ngoài | Hệ thống | – | – | – (không hiện trên màn hình) | – | – | 10-2 |

Các dịch vụ ngoài đều do アデッソ ký hợp đồng. アデッソ phải lấy đồng ý của tài năng trước khi gửi dữ liệu ra các dịch vụ này ([YK] mục 8, 10-3).

## 5. Các quyền chưa được làm rõ

Có 20 điểm. Nhóm A chờ khách trả lời 確認 (mục cần xác nhận). Nhóm B và C là những chỗ tài liệu chưa nói tới, cần hỏi thêm khách.

### A. Chờ khách trả lời 確認 (mục cần xác nhận)

| STT | 確認 | Giả định hiện tại | Câu hỏi cần làm rõ | Nguồn |
| --- | --- | --- | --- | --- |
| 1 | 3 | Mọi quản lý xem được mọi tài năng, mọi quản lý nhận mọi thông báo | Có cần giới hạn theo quản lý phụ trách không, nhất là khi lên 1.000 tài năng? Nhóm phân loại ở màn M-10 chỉ để lọc hay có dùng để phân quyền? | [YK] 3-2, 3-3, [TK-M] trang 12–13 |
| 2 | 4 | Quản lý đọc toàn bộ hội thoại, tài năng chỉ được báo trên màn hình lúc bắt đầu dùng | Có cần tài năng bấm đồng ý (và phụ huynh với người vị thành niên) không? Có cần lưu lại việc đã báo không? | [YK] 3-2 |
| 3 | 16 | Quản lý gửi ảnh và tạo video thay tài năng | Chỉ cho tài khoản công ty hay cho mọi tài năng? Phí video tính vào ai? | [YK] UC-05, UC-06, 6-3 |
| 4 | 21 | Bài của tài khoản công ty không cần duyệt | Một quản lý tạo và đăng bài mà không có ai kiểm tra chéo, có chấp nhận được không? | [YK] UC-12 |
| 5 | 28 | Hủy bài đã hẹn chỉ làm trên màn hình Upload-Post | Quản lý nào có tài khoản Upload-Post, dùng chung hay riêng? Thao tác ngoài hệ thống thì không có trong nhật ký. Tài năng có được hủy bài của chính mình không? | [YK] 7-2, UC-08 |
| 6 | 20 | Thanh toán lỗi thì quản lý quyết có dừng sử dụng không | "Dừng sử dụng" là đổi sang 利用終了 (đã kết thúc) hay có trạng thái tạm khóa riêng? | [YK] UC-11, 6-3 (chức năng 1-1) |
| 7 | 7 | Tài năng tự kết nối mạng xã hội, quản lý chỉ xem trạng thái | Với tài khoản công ty thì ai kết nối? Tài năng có tự ngắt kết nối được không? | [YK] UC-03, 8-2 |
| 8 | 32 | Hệ thống không lưu đồng ý của phụ huynh | Người vị thành niên có bị giới hạn quyền nào không (ví dụ thanh toán qua cước nhà mạng, tự tạo video có phí)? | [YK] 10-3 |

### B. Quyền của quản lý tài liệu chưa nói tới

| STT | Điểm chưa rõ | Căn cứ |
| --- | --- | --- |
| 9 | **Không có vai trò quản trị cao hơn:** mọi quản lý đều thêm và vô hiệu hóa được quản lý khác. Quản lý có tự vô hiệu hóa mình được không? Có chặn việc vô hiệu hóa quản lý cuối cùng không? Ai tạo quản lý đầu tiên? | [YK] 6-2 (chức năng 1-6) |
| 10 | **Quản lý trò chuyện với AI thay tài năng:** bảng ở mục 3-2 chỉ cho quản lý 採用 (chấp nhận) bản nháp của tài khoản công ty. Không nói quản lý có được chat hay 採用 thay tài năng hay không | [YK] 3-2 (bảng quyền) |
| 11 | **Quản lý sửa bản nháp của tài năng:** tài liệu chỉ cho sửa khi bài dính từ cấm. Khi duyệt bài, quản lý có được sửa nội dung không hay chỉ được trả lại? Sau khi quản lý sửa, tài năng có phải xác nhận lại không? | [YK] 6-6 (chức năng 4-4), 6-9 (chức năng 7-7) |
| 12 | **Tài khoản công ty:** thông tin đăng nhập dùng chung giữa các quản lý hay mỗi người một tài khoản? Có đăng nhập hai bước không? Nhật ký có ghi được quản lý nào đã thao tác không? | [YK] UC-12, 6-1, 9-4 |
| 13 | **Quyền trên OneDrive nằm ngoài hệ thống:** quản lý sửa file trực tiếp trên OneDrive, nên quyền do Microsoft 365 quản lý. Việc quản lý xem file hồ sơ trên OneDrive có được ghi vào nhật ký xem thông tin (7-6) không? | [YK] 7-2, 7-5, 7-6 |
| 14 | **Quyền ghi của ChatGPT:** ChatGPT ghi được vào thư mục của mọi tài năng. Tài khoản ChatGPT dùng chung hay riêng từng quản lý? Việc ghi qua ChatGPT có nằm trong nhật ký thao tác không? | [YK] 6-4 (chức năng 2-3), 9-4 |
| 15 | **Ai được xem nhật ký thao tác và nhật ký xử lý:** mục 9-4 yêu cầu ghi, nhưng không có chức năng nào để xem | [YK] 9-4 |
| 16 | **Tài năng đã kết thúc sử dụng:** quản lý còn được xem và xuất dữ liệu không? Khi hết 一定の期間 (một khoảng thời gian nhất định) thì ai xóa dữ liệu? | [YK] 7-3, UC-13 |

### C. Quyền của tài năng và của hệ thống tài liệu chưa nói tới

| STT | Điểm chưa rõ | Căn cứ |
| --- | --- | --- |
| 17 | **Tài năng xem hồ sơ của chính mình:** mục 7-2 chỉ cho quản lý và AI xem thư mục tài năng. Tài năng có được xem hồ sơ quản lý đã nhập và điều AI đã ghi nhớ về mình không? Có được yêu cầu sửa không? | [YK] 7-2, 3-2 (chức năng) |
| 18 | **Tài năng miễn phí tạo video:** tài năng miễn phí không đăng ký thanh toán, vậy có được tạo video có phí không, và ai trả phí? | [YK] 6-3 (chức năng 1-2), 5-4 |
| 19 | **Người vận hành hệ thống:** không có vai trò nào quản lý khóa kết nối dịch vụ ngoài, cài đặt môi trường hay sao lưu. FutureCore được truy cập dữ liệu thật đến đâu, khi mà việc dùng dữ liệu tài năng cần được đồng ý bằng văn bản? | [YK] 9-3, 10-2, 10-3, 11 |
| 20 | **Huấn luyện viên AI xem ảnh và video:** tài liệu không nói AI có xem ảnh hay video để viết bản nháp hay không. Nếu có, đây là dữ liệu gửi thêm cho OpenAI và cần nằm trong phạm vi đồng ý | [YK] 6-6, 10-2, 10-3 |
