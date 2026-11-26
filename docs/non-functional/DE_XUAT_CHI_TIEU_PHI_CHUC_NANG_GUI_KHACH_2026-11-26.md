# 3. Yêu cầu phi chức năng

Ngày lập: 26/11/2026. Phiên bản: 0.23.

**DỰ THẢO TRÌNH DUYỆT — chưa phê duyệt để gửi khách.**

Talent là người dùng được quản lý; trợ lý AI là trợ lý sử dụng trí tuệ nhân tạo. Hệ thống vận hành ban đầu với 150 Talent và được thiết kế để mở rộng tới 1.000 Talent. Hai bên xác nhận cấu hình, hạn mức dịch vụ ngoài và chi phí trước khi mở rộng.

Các chỉ tiêu bổ sung về tải, thời gian phản hồi, thời gian gián đoạn, sao lưu và hỗ trợ dưới đây là mức đề xuất, cần người phụ trách kỹ thuật kiểm chứng và hai bên phê duyệt trước khi cam kết nghiệm thu. Đội chưa có kết quả thử tải chứng minh đạt các mức này. Những nội dung còn cần thống nhất được nêu tại từng mục liên quan.

## 3-1. Thiết bị và môi trường sử dụng

Ứng dụng Talent: Dùng trên điện thoại iPhone và Android, có thể thêm vào màn hình chính để mở như ứng dụng.

iPhone: Đề xuất hỗ trợ hệ điều hành từ phiên bản 16.4 trở lên, dùng Safari đi kèm hệ điều hành. Để nhận thông báo, cần thêm ứng dụng vào màn hình chính và cho phép nhận thông báo.

Android: Đề xuất hỗ trợ Android từ phiên bản 10 trở lên, dùng một trong hai phiên bản chính gần nhất của Chrome tương thích với thiết bị. Cần cho phép nhận thông báo trong trình duyệt và cài đặt điện thoại.

Trình duyệt máy tính: Đề xuất hỗ trợ hai phiên bản chính gần nhất của Chrome và Edge tại thời điểm nghiệm thu. Đội kiểm các phiên bản tối thiểu và phiên bản mới thuộc phạm vi đề xuất trên máy thật; nếu phát hiện giới hạn tương thích thì báo rõ trước khi cam kết. Các trình duyệt khác chưa thuộc phạm vi hỗ trợ.

Kiểm tra thiết bị: Kiểm trên máy thật việc đăng nhập, cài vào màn hình chính, thông báo, tải ảnh/video, nhập tiếng Nhật, bố cục, kết nối lại và cập nhật ứng dụng.

Môi trường: Tách môi trường vận hành chính thức và kiểm thử; không ảnh hưởng ứng dụng tự động nhắn tin Instagram đang hoạt động.

Nhận diện ứng dụng: Dùng tên và logo của ứng dụng Adesso hiện có, không tái sử dụng hệ thống cũ.

## 3-2. Hiệu năng và khả năng mở rộng

Quy mô: Bắt đầu với khoảng tối thiểu 30 người, sau đó tăng thêm 10 người mỗi tháng. Dự kiến hệ thống sẽ sớm đạt quy mô 100 người. Mục tiêu là 200–300 người và trong tương lai là 1.000 người.

Sử dụng đồng thời: Mức thiết kế ban đầu là 30 Talent và 5 quản lý cùng thao tác. Số tài khoản đang đăng nhập không tính là số người đang thao tác.

Xử lý trợ lý AI: Tối đa 10 lượt xử lý song song trên toàn hệ thống, dùng chung cho Talent và quản lý. Yêu cầu tiếp theo được xếp hàng và hiển thị trạng thái chờ; việc xử lý buổi sáng được bố trí riêng để không chiếm các lượt này.

Thời gian xử lý chung: Ít nhất 95% yêu cầu xem, lưu, cập nhật hoặc tiếp nhận công việc được máy chủ phản hồi trong 2 giây, tính từ khi nhận yêu cầu hợp lệ. Với công việc dài, phản hồi này xác nhận đã lưu và tiếp nhận, không phải đã xử lý xong. Không tính thời gian truyền tệp hoặc chờ AI và dịch vụ ngoài.

Mở màn hình: Ít nhất 95% lần mở màn hình thông thường không quá 2 giây, tính từ thao tác người dùng đến khi màn hình sẵn sàng sử dụng trong điều kiện mạng nêu tại mục 3-11.

Hội thoại chữ thông thường: Ít nhất 95% lượt bắt đầu trả lời trong 10 giây và hoàn tất dưới 60 giây, tính từ khi gửi và gồm thời gian chờ; áp dụng khi số lượt AI đang chờ hoặc xử lý không quá 10. Khi vượt mức này, ứng dụng báo chờ, không áp dụng hai mốc trả lời trên.

Công việc qua dịch vụ ngoài: Video được xử lý nền, cho phép đóng ứng dụng và xem lại kết quả; sau 10 phút chưa xong, hiển thị rõ trạng thái. Chỉ báo đặt lịch thành công khi dịch vụ xác nhận. Thời gian tạo xong video hoặc bài xuất hiện thực tế phụ thuộc dịch vụ; không tự gửi lại gây trùng.

Dung lượng hình ảnh và video: Các nội dung sau sẽ được quyết định trong giai đoạn thiết kế bao gồm giới hạn dung lượng cho mỗi hình ảnh hoặc video và tổng dung lượng lưu trữ.

Số liệu: Số liệu mạng xã hội được lấy ít nhất một lần/ngày và hiển thị thời điểm cập nhật.

Mất kết nối: Công việc đã tiếp nhận tiếp tục được theo dõi; khi mở lại, ứng dụng lấy trạng thái cũ, không tự gửi lại gây trùng.

Mở rộng: Tổng số 1.000 Talent không đồng nghĩa 1.000 người cùng thao tác hoặc cùng được AI trả lời ngay. Khi tăng tải đồng thời, bổ sung tài nguyên và hạn mức dịch vụ, kèm dự toán chi phí cho các mốc 150, 300, 500 và 1.000 Talent.

## 3-3. Thời gian hoạt động và xử lý sự cố

Thời gian sử dụng: Hệ thống phục vụ cả ngày, kể cả cuối tuần.

Thời gian gián đoạn: Tổng thời gian không đăng nhập, xem hoặc lưu dữ liệu được không vượt quá 5 giờ trong tháng 30 ngày, bao gồm thời gian dừng để bảo trì. Đây là mức đề xuất theo tổng tháng, không phải thời gian xử lý mỗi sự cố.

Thời gian hỗ trợ: Thứ Hai–thứ Sáu, 8:30–17:30 giờ Việt Nam (10:30–19:30 giờ Nhật), trừ ngày lễ, Tết theo lịch Việt Nam. Chi tiết tại mục 3-10; khôi phục dữ liệu tại mục 3-9.

## 3-4. Nhật ký hệ thống

1. Lịch sử truy cập (閲覧の記録)
Thực hiện theo yêu cầu nghiệp vụ 16-4 của chương 2.
2. Lịch sử thao tác (操作の記録)
Hệ thống phải ghi lại các thao tác như:
- Phê duyệt.
- Thay đổi trạng thái.
- Dừng đăng bài.
- Tiếp tục đăng bài.
- Thay đổi thiết lập.
- Các thao tác tương tự.
3. Lịch sử xử lý (処理の記録)
Hệ thống phải ghi lại kết quả xử lý của các chức năng sau:
Chức năng	Nội dung ghi lại
Đăng bài	Kết quả đăng bài
Thu thập dữ liệu	Kết quả lấy dữ liệu hoạt động
Tạo video	Kết quả tạo video
Thanh toán	Kết quả lập yêu cầu thanh toán

4. Thời gian lưu giữ log
Thời gian lưu đề xuất: 30 ngày. Chỉ người được phân quyền vận hành được truy cập; hết hạn xóa theo chính sách lưu trữ.

5.  Bảo vệ thông tin: 
Không ghi mật khẩu, khóa kết nối, đường dẫn kèm quyền truy cập tệp hoặc toàn bộ hội thoại vào nhật ký kỹ thuật.
## 3-5. Bảo mật và quyền truy cập

Bảo vệ dữ liệu: Mã hóa đường truyền và dữ liệu lưu. Giữ thông tin kết nối bí mật tại máy chủ, không để lộ trên trình duyệt hoặc nhật ký.

Đăng nhập và phân quyền: Thực hiện theo chức năng đăng nhập và quyền của từng loại tài khoản. Màn hình quản lý yêu cầu đăng nhập lại sau 30 phút không thao tác. Đề xuất chặn yêu cầu mới từ phiên cũ trong 5 phút sau khi vô hiệu hóa tài khoản.

Truy cập qua ChatGPT: Đề xuất kiểm tra danh tính và quyền như khi dùng ứng dụng; vô hiệu hóa tài khoản quản lý phải chặn cả đường truy cập này. Người dùng ChatGPT không tự có quyền xem dữ liệu Talent.

Tính toàn vẹn: Phát hiện xung đột khi nhiều người cùng sửa dữ liệu quan trọng; không âm thầm ghi đè hoặc tạo giao dịch trùng khi nhận lại cùng yêu cầu.

Tệp tải lên: Kiểm quyền, loại và dung lượng tệp; chặn truy cập trái phép. Đường dẫn xem/tải có thời hạn. Phạm vi quét mã độc và chi phí cần thống nhất riêng.

Kiểm tra bảo mật: Trước vận hành, xử lý lỗ hổng nghiêm trọng hoặc cao, hoặc có người có thẩm quyền chấp nhận rủi ro. Kiểm thử xâm nhập độc lập cần thống nhất phạm vi và chi phí riêng.

## 3-6. Dữ liệu cá nhân và nơi lưu dữ liệu

Đồng ý sử dụng dữ liệu: Adesso lấy sự đồng ý về quyền sử dụng hình ảnh và cung cấp dữ liệu cho dịch vụ ngoài, kể cả đồng ý của phụ huynh khi áp dụng. Việc lưu hồ sơ đồng ý trong hệ thống thực hiện theo phạm vi chức năng đã thống nhất.

Dữ liệu gửi cho trợ lý: Chỉ gửi thông tin cần thiết. Yêu cầu không dùng dữ liệu để huấn luyện phải được đáp ứng theo đúng gói dịch vụ, hợp đồng và cài đặt của nhà cung cấp.

Dịch vụ ngoài: Ghi rõ loại dữ liệu chuyển đi, mục đích, nơi lưu, thời gian giữ và cách yêu cầu xóa. Adesso duyệt phạm vi cho phép và nội dung thông báo cho người dùng.

Nơi lưu: Dữ liệu trợ lý đọc/ghi nằm trong cơ sở dữ liệu hệ thống. Vai trò OneDrive và nơi lưu ảnh/video cần thống nhất để tránh mô tả khác nhau giữa các tài liệu; lựa chọn kèm chi phí và phương án sao lưu.

Giữ và xóa dữ liệu: Theo chức năng ngừng sử dụng, dữ liệu Talent giữ sáu tháng rồi tự xóa. Phạm vi xóa tại dịch vụ ngoài và ngoại lệ dữ liệu tính tiền vẫn cần thống nhất. Khi phục hồi bản sao lưu, không đưa dữ liệu đã yêu cầu xóa trở lại sử dụng.

Yêu cầu xem/xóa dữ liệu: Adesso tiếp nhận và xác minh; đội hỗ trợ thực hiện theo phạm vi và chính sách đã duyệt.

Dữ liệu kiểm thử: Ưu tiên dữ liệu giả. Chỉ dùng dữ liệu thật trong phạm vi đã có chấp thuận bằng văn bản, bảo vệ thông tin cá nhân và xóa theo lịch đã thống nhất.

## 3-7. Biện pháp phòng tránh khóa tài khoản mạng xã hội

Tần suất đăng: Kiểm giới hạn của từng mạng xã hội và Upload-Post để điều phối giờ đăng, tránh gửi dồn hoặc vượt hạn mức. Không dùng nhiều khóa kết nối hoặc tài khoản để né giới hạn.

Tránh đăng trùng: Kiểm trạng thái trước khi gửi lại yêu cầu; không tự đăng lại khi chưa biết bài trước đã thành công hay chưa. Việc đăng lại và đăng bù theo quy tắc chức năng đã thống nhất.

Khi bị hạn chế: Tạm dừng gửi bài vào tài khoản bị hạn chế, báo Talent và quản lý, hướng dẫn xử lý hoặc kết nối lại theo nguyên nhân. Các chức năng không bị ảnh hưởng vẫn tiếp tục hoạt động.

Nội dung và tài khoản: Kiểm điều kiện tuổi, định dạng và nội dung theo yêu cầu từng mạng xã hội. Cách kiểm tra quyền sử dụng bài đăng và tư liệu được xác định trong thiết kế.

Giới hạn bảo đảm: Các biện pháp trên chỉ giảm rủi ro, không bảo đảm tài khoản không bị khóa. Theo phản hồi ghi trong tài liệu khách, cách đặt lịch, đăng không cần Talent xác nhận, tự động đăng và chọn phạm vi công khai dự kiến còn chưa phù hợp với yêu cầu TikTok. Kết nối qua Upload-Post không đồng nghĩa TikTok đã chấp thuận toàn bộ cách sử dụng.

Hạn mức dịch vụ: Chọn gói đủ số tài khoản, lượt gọi, lịch chờ và dung lượng; đề xuất cảnh báo ở 80% và 95% hạn mức theo kỳ có thể theo dõi. Khi vượt hạn mức hoặc lỗi tạm thời, chờ hoặc thử lại theo điều kiện dịch vụ; chuyển cho vận hành nếu không xử lý được.

Giao dịch qua dịch vụ ngoài: Với thanh toán hoặc tạo video chưa rõ kết quả, đối soát trước khi gửi lại để tránh xử lý trùng.

## 3-8. Điều kiện tiền đề và giới hạn trách nhiệm

### a. Những nội dung Adesso cần chuẩn bị

Điều khoản sử dụng: Dùng nội dung do Adesso soạn; hướng dẫn đăng ký, trang của Adesso và hình quét mở trang; nội dung giá, thu phí và thông tin công khai theo quy định về giao dịch thương mại của Nhật.

Nội dung thư và thông báo: Đội gửi danh sách nội dung cần chuẩn bị theo từng tình huống để Adesso cung cấp.

Địa chỉ email nhận thư gửi cho quản lý.

Dữ liệu hình ảnh logo, màu sắc sử dụng và hình nhân vật trợ lý AI.

Rà soát danh sách từ không được dùng: Đội cung cấp mẫu với các nội dung thông thường để Adesso rà soát.

Đăng ký thông tin Talent, mục tiêu, kinh nghiệm và chỉ dẫn cho trợ lý trước khi bắt đầu sử dụng chính thức.

Quyết định số tiền thu cho mỗi lần tạo video.

Hợp đồng và thủ tục xét duyệt dịch vụ ngoài đứng tên Adesso, bao gồm phí sử dụng trong thời gian phát triển và kiểm thử; tài khoản và thông tin kết nối phục vụ phát triển, kiểm thử.

### b. Phạm vi không bảo đảm

Thông báo trên điện thoại có thể chậm hoặc không tới tùy thiết bị, hệ điều hành, cài đặt và tình trạng kết nối.

Dù có biện pháp phòng tránh, không bảo đảm tài khoản mạng xã hội không bị khóa. Việc đặt lịch, đăng không cần xác nhận, tự động đăng và chỉ định phạm vi công khai trên TikTok không phù hợp với nội dung phản hồi TikTok tháng 11/2026 được ghi trong tài liệu khách. Tiếp tục theo cách sử dụng hiện tại có thể dẫn tới hạn chế bài đăng hoặc tài khoản theo quyết định của TikTok. Ngoài Upload-Post, thực tế cũng có các dịch vụ tự động đăng khác đang vận hành.

Không bảo đảm độ chính xác và chất lượng nội dung bài viết, video do AI tạo. Chức năng không hoạt động đúng mô tả vẫn được sửa như lỗi.

Việc kiểm tra từ cấm và các thông báo dựa trên phán đoán AI, như Talent lâu không đăng bài hoặc đạt mục tiêu, có thể không chính xác.

Thanh toán qua nhà mạng có thể không sử dụng được tùy nhà mạng và nội dung hợp đồng.

### c. Các điều kiện khác

Dùng tên và logo của ứng dụng Adesso hiện có; không sử dụng hệ thống cũ.

Chỉ áp dụng cho tài khoản đáp ứng điều kiện tuổi của từng mạng xã hội.

Cách kiểm tra nội dung và tư liệu có vi phạm quyền của bên thứ ba hay không được xác định trong thiết kế.

Bảo trì sau phát hành được thỏa thuận trong hợp đồng riêng. Việc xử lý khi dịch vụ ngoài thay đổi tính năng, giá hoặc điều khoản thuộc hợp đồng bảo trì.

## 3-9. Sao lưu và khôi phục dữ liệu

Cơ sở dữ liệu: Theo gói Supabase sử dụng. Gói Pro sao lưu hằng ngày, giữ 7 ngày; không bao gồm ảnh/video.

Ảnh và video: Lưu tại kho chính của hệ thống và có phương án sao lưu riêng; không dựa vào tệp tạm của dịch vụ ngoài. OneDrive có thể khôi phục trong 30 ngày nếu tài khoản Microsoft 365 đáp ứng điều kiện.

Khôi phục: Theo bản sao còn khả dụng và khả năng dịch vụ. Kiểm dữ liệu và giao dịch để tránh khôi phục sai hoặc xử lý trùng.

## 3-10. Kiểm tra và nghiệm thu

Phạm vi: Kiểm trên dữ liệu 150 Talent, 30 Talent và 5 quản lý cùng thao tác, tối đa 10 lượt AI xử lý song song. Kiểm khả năng quản lý dữ liệu 1.000 Talent riêng; số tài khoản không thay cho số người thao tác đồng thời.

Hiệu năng: Chạy tải 60 phút theo mục 3-2, lỗi kỹ thuật nội bộ không quá 1% yêu cầu hợp lệ. Thử tăng gấp đôi số người trong 5 phút, không mất công việc đã nhận hoặc tạo giao dịch trùng và trở về thời gian phản hồi mục tiêu trong 10 phút sau khi tải giảm. Thử chạy 8 giờ ở 50% tải thiết kế; khi vượt mức AI nêu ở mục 3-2, vẫn báo cáo thời gian chờ nhưng không áp dụng mốc trả lời thông thường.

Tác vụ và sự cố: Kiểm lô buổi sáng theo giờ chào đã thiết lập, mất kết nối, dịch vụ ngoài lỗi, yêu cầu lặp, khởi động lại và khôi phục dữ liệu. Kiểm kết hợp thao tác người dùng với công việc tự động; báo riêng kết quả dùng dịch vụ mô phỏng và dịch vụ thật.

Thiết bị và mạng: Dùng máy thật thuộc mục 3-1, mạng ổn định tối thiểu 20 megabit/giây tải xuống, 10 megabit/giây tải lên, thời gian truyền tới hệ thống không quá 0,1 giây.

Kết quả: Đội cung cấp phiên bản, cấu hình, dữ liệu thử, chỉ số đo và lỗi còn lại. Adesso cho quản lý và Talent thao tác xác nhận. Việc phê duyệt yêu cầu không thay kết quả kiểm thử; thay đổi cấu hình hoặc dịch vụ phải đánh giá phần cần kiểm lại.

Bàn giao: Hai bên duyệt phạm vi nghiệm thu và xử lý lỗi theo hợp đồng. Dịch vụ ngoài chưa hoàn tất hợp đồng hoặc xét duyệt không tự cho phép loại chức năng khỏi phạm vi. Việc phát hành cần phê duyệt riêng.
