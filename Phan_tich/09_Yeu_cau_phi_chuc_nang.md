# Yêu cầu phi chức năng

> ⚠ File này viết theo bản yêu cầu v1. Bản v2 đã đổi một số nội dung và đánh lại toàn bộ số 確認 (mục cần xác nhận). Đọc [12_Cap_nhat_theo_v2.md](12_Cap_nhat_theo_v2.md) trước khi dùng nội dung bên dưới.

Trong 7 nhóm yêu cầu phi chức năng, chỉ có bảo mật là được nêu tương đối đầy đủ. Các nhóm còn lại chủ yếu ghi "設計の中で決め、最終版に書きます" (sẽ quyết khi thiết kế và ghi vào bản cuối). Nguồn chính là [YK] mục 9 (hiệu năng, vận hành, nhật ký), 10 (bảo mật), 11 (điều kiện tiền đề và ràng buộc) và 12 (nghiệm thu).

**Cách đọc:**

- **Nêu rõ:** tài liệu ghi cụ thể. Các con số được chép nguyên từ tài liệu.
- **Cần xác nhận:** tài liệu chưa ghi, hoặc ghi sẽ quyết sau. Theo yêu cầu của bạn, mình **không đặt chỉ tiêu kỹ thuật** nào, chỉ nêu câu hỏi cần hỏi.

| Nhóm | Mức độ rõ ràng | Nguồn [YK] |
| --- | --- | --- |
| Hiệu năng | Thấp. Chỉ có một mốc thời gian (xử lý buổi sáng xong trước giờ nhắn tin), không có thời gian phản hồi | 9-2 |
| Khả năng mở rộng | Trung bình. Có số người dùng theo từng giai đoạn, chưa có dung lượng lưu trữ | 9-2 |
| Tính sẵn sàng | Thấp. Khung giờ hoạt động "sẽ quyết". Có nguyên tắc xử lý khi dịch vụ ngoài lỗi | 9-3 |
| Bảo mật | Cao. Có đăng nhập, mã hóa, khóa kết nối, dữ liệu cá nhân, nhật ký xem | 10, 6-1, 6-2 |
| Sao lưu | Rất thấp. Đối tượng, tần suất, thời gian giữ đều "sẽ quyết" | 9-3 |
| Nhật ký | Trung bình. Có 3 loại nhật ký, chưa có thời gian lưu | 9-4 |
| Khả năng bảo trì | Trung bình. Có các cài đặt đổi được mà không cần lập trình. Bảo trì sau phát hành nằm ở hợp đồng khác | 5-6, 7-5, 11 |

## 1. Hiệu năng

| Yêu cầu | Loại | Nguồn [YK] |
| --- | --- | --- |
| Xử lý buổi sáng (đọc thông tin tài năng và số liệu, tạo bản nháp) phải xong trước giờ nhắn tin buổi sáng (mặc định 8:00, mọi tài năng cùng một giờ) | Nêu rõ | 9-2, 5-2, 確認24 |
| Số tài năng dùng để kiểm tra yêu cầu trên sẽ quyết khi biết số tài năng bắt đầu dùng | Nêu rõ (cách kiểm tra), cần xác nhận (con số) | 9-2 |
| Tạo video mất vài phút, xong thì báo tài năng | Nêu rõ (chỉ là mô tả, không phải chỉ tiêu) | 6-8 (5-1), [SM] tr.9 |
| Thông báo đẩy có thể đến trễ hoặc không đến, không đảm bảo | Nêu rõ (nằm ngoài cam kết) | 11 |
| Số liệu lấy mỗi ngày một lần | Nêu rõ | 6-11 (8-7) |
| Thời gian phản hồi của màn hình, của câu trả lời từ AI, của việc tải ảnh và video lên | Cần xác nhận (tài liệu không nêu) | — |
| Độ lệch cho phép giữa giờ hẹn và giờ bài thực sự xuất hiện trên mạng xã hội | Cần xác nhận | — |
| Số người dùng đồng thời | Cần xác nhận | — |

## 2. Khả năng mở rộng

| Yêu cầu | Loại | Nguồn [YK] |
| --- | --- | --- |
| Số tài năng: bắt đầu ít, mở rộng lên 80–150 (chủ yếu người mới), mục tiêu 200–300, tương lai 1.000 | Nêu rõ | 9-2 |
| Số quản lý: khoảng 5 | Nêu rõ | 2-2, 8 |
| Chi phí dịch vụ ngoài hằng tháng khi số tài năng tăng sẽ được ước tính và gửi riêng | Nêu rõ (sẽ gửi sau) | 9-2, 8 |
| Upload-Post cần gói đủ cho số tài năng. Vercel và Supabase phải là gói trả phí | Nêu rõ | 8 |
| Dung lượng tối đa của mỗi ảnh hoặc video, và tổng dung lượng lưu | Cần xác nhận ("sẽ quyết khi thiết kế") | 9-2, 6-7 (6-3) |
| Phạm vi mở rộng sau này: tài năng ngoài công ty, doanh nghiệp đối tác, X, TikTok Live | Nêu rõ là để sau, chưa cam kết | 13 |
| Khả năng mở rộng của OneDrive, OpenAI, Upload-Post (giới hạn tốc độ, giới hạn số lần gọi) khi lên 1.000 tài năng | Cần xác nhận (tài liệu không nêu) | — |
| Hệ thống phải phục vụ được 1.000 tài năng ngay từ bản đầu, hay chỉ cần đủ cho giai đoạn 80–150? | Cần xác nhận | 9-2 |

## 3. Tính sẵn sàng

| Yêu cầu | Loại | Nguồn [YK] |
| --- | --- | --- |
| Dịch vụ ngoài lỗi thì chỉ dừng chức năng đó, các chức năng khác vẫn dùng được. Đăng bài lỗi thì báo | Nêu rõ | 9-3 |
| Dịch vụ AI lỗi thì báo trên màn hình, cho gửi lại sau | Nêu rõ | 6-5 (3-4) |
| Có môi trường thật và môi trường kiểm thử | Nêu rõ | 9-1 |
| Không được làm ảnh hưởng ứng dụng tự động nhắn tin Instagram đang chạy | Nêu rõ | 9-1 |
| Có nút dừng toàn bộ việc đăng tự động khi có sự cố | Nêu rõ | 6-10 (7-5) |
| Lỗi nghiêm trọng (hệ thống dừng, chức năng chủ yếu không dùng được, không có cách thay thế) phải sửa trước khi phát hành | Nêu rõ | 12-2 |
| Khung giờ hoạt động | Cần xác nhận ("sẽ quyết khi thiết kế") | 9-3 |
| Tỷ lệ hoạt động cam kết, thời gian khắc phục, cách thông báo bảo trì | Cần xác nhận (tài liệu không nêu) | — |
| Ai theo dõi hệ thống sau khi phát hành, ai xử lý sự cố | Cần xác nhận (bảo trì là hợp đồng khác) | 11 |

## 4. Bảo mật

| Yêu cầu | Loại | Nguồn [YK] |
| --- | --- | --- |
| Tài năng đăng nhập bằng email và mật khẩu. Mật khẩu ít nhất 8 ký tự, có cả chữ và số. Sai 5 lần thì khóa 15 phút. Giữ đăng nhập 30 ngày | Nêu rõ | 6-1 (1-4) |
| Quản lý đăng nhập hai bước (mã 6 số từ ứng dụng xác thực). 30 phút không thao tác thì phải đăng nhập lại | Nêu rõ | 6-2 (1-6), 10-1 |
| Tài năng chỉ xem dữ liệu của mình. AI chỉ dùng thư mục của tài năng đang trò chuyện | Nêu rõ | 10-1, 6-1 (1-5) |
| Mã hóa đường truyền và dữ liệu lưu trữ | Nêu rõ (chưa nêu chuẩn mã hóa) | 10-2 |
| Khóa kết nối dịch vụ ngoài không hiện trên màn hình hay trong nhật ký | Nêu rõ | 10-2 |
| Chỉ gửi cho AI phần thông tin cần thiết. Cài đặt không cho AI dùng dữ liệu để huấn luyện | Nêu rõ | 10-2, 8 |
| Không lưu thông tin thẻ, cổng thanh toán giữ | Nêu rõ | 10-2 |
| アデッソ lấy đồng ý của tài năng trước khi gửi dữ liệu ra dịch vụ ngoài, và đồng ý của phụ huynh với người vị thành niên. Hệ thống không lưu bằng chứng đồng ý | Nêu rõ ⚠ (確認32) | 10-3 |
| Kiểm thử cơ bản dùng dữ liệu giả. Dùng dữ liệu thật thì phải có đồng ý bằng văn bản trước | Nêu rõ | 10-3 |
| Báo cho tài năng biết quản lý đọc được hội thoại, và ghi nhật ký mỗi lần quản lý xem thông tin | Nêu rõ | 3-2 |
| Chuẩn mã hóa, cách lưu mật khẩu, quy tắc đổi mật khẩu định kỳ | Cần xác nhận | — |
| Kiểm thử bảo mật (dò lỗ hổng) có nằm trong phạm vi không | Cần xác nhận | — |
| Quyền trên OneDrive và ChatGPT (nằm ngoài hệ thống) được kiểm soát thế nào | Cần xác nhận | 7-2, 6-4 (2-3) |
| Xử lý khi quản lý mất điện thoại xác thực | Cần xác nhận | — |
| Quy định pháp lý về dữ liệu cá nhân của Nhật mà hệ thống phải tuân thủ | Cần xác nhận (tài liệu chỉ nói アデッソ lo việc đồng ý) | 10-3 |

## 5. Sao lưu

| Yêu cầu | Loại | Nguồn [YK] |
| --- | --- | --- |
| Sao lưu những gì, bao lâu một lần, giữ bao lâu | Cần xác nhận ("sẽ quyết khi thiết kế") | 9-3 |
| Khôi phục dữ liệu: ai được yêu cầu, chấp nhận mất dữ liệu trong bao lâu, khôi phục trong bao lâu | Cần xác nhận (tài liệu không nêu) | — |
| Dữ liệu trên OneDrive có được sao lưu riêng không, hay dựa vào Microsoft 365 của アデッソ | Cần xác nhận | 7-2 |
| Dữ liệu nằm ở Upload-Post và cổng thanh toán có cần lưu bản sao trong hệ thống không | Cần xác nhận | 8 |

## 6. Nhật ký

| Yêu cầu | Loại | Nguồn [YK] |
| --- | --- | --- |
| Nhật ký xem: quản lý nào xem thông tin tài năng nào, lúc nào. Không sửa được. Quản lý tìm theo khoảng thời gian và tài năng | Nêu rõ | 9-4, 6-2 (7-6) |
| Nhật ký thao tác: duyệt bài, đổi trạng thái, dừng và chạy lại việc đăng tự động | Nêu rõ | 9-4 |
| Nhật ký xử lý: đăng bài, lấy số liệu, tạo video, thu phí | Nêu rõ | 9-4 |
| Không ghi khóa kết nối dịch vụ ngoài vào nhật ký | Nêu rõ | 10-2 |
| Thời gian lưu nhật ký | Cần xác nhận ("sẽ quyết khi thiết kế") | 9-4 |
| Ai được xem nhật ký thao tác và nhật ký xử lý, xem trên màn hình nào | Cần xác nhận | 9-4 |
| Có ghi nhật ký lỗi kỹ thuật để phục vụ bảo trì không. Có cảnh báo tự động cho người vận hành không | Cần xác nhận | — |
| Hội thoại có nội dung nhạy cảm (sức khỏe, người vị thành niên) có được ghi vào nhật ký kỹ thuật không | Cần xác nhận | 10-2 |

## 7. Khả năng bảo trì

| Yêu cầu | Loại | Nguồn [YK] |
| --- | --- | --- |
| Quản lý tự đổi được các cài đặt trên màn hình quản trị mà không cần lập trình | Nêu rõ | 5-6 |
| Giọng điệu, hồ sơ, kế hoạch nội dung, kinh nghiệm đăng bài đổi bằng file trên OneDrive, không cần lập trình, có tác dụng từ sáng hôm sau | Nêu rõ | 7-5 |
| Bàn giao tài liệu hướng dẫn cho quản lý (8 nhóm thao tác) | Nêu rõ | 12-5 |
| Giao diện ưu tiên dễ dùng. Màn hình hiển thị rõ khi lỗi, khi không có dữ liệu, khi đang tải | Nêu rõ | 6-14 |
| Bảo trì sau phát hành và việc cập nhật khi dịch vụ ngoài đổi đặc tả, giá, điều khoản nằm trong hợp đồng bảo trì riêng | Nêu rõ (ngoài phạm vi) | 11 |
| Lỗi nhẹ được sửa theo hạn đã thống nhất, không làm trượt nghiệm thu | Nêu rõ | 12-2 |
| Bàn giao mã nguồn, tài liệu thiết kế, tài liệu vận hành cho bên bảo trì | Cần xác nhận (có thể nằm trong SOW, không có trong thư mục dự án) | 別紙D |
| Cách thay mô hình AI hoặc nhà cung cấp (ví dụ nếu Upload-Post không đáp ứng) | Cần xác nhận | 8 |

## 8. Tương thích (bổ sung)

| Yêu cầu | Loại | Nguồn [YK] |
| --- | --- | --- |
| Ứng dụng tài năng chạy trên iPhone và Android. Thông báo đẩy trên iPhone cần iOS 16.4 trở lên | Nêu rõ | 9-1 |
| Màn hình quản trị chạy trên trình duyệt máy tính. Trình duyệt điện thoại mở được nhưng không tối ưu | Nêu rõ ⚠ (確認31, mâu thuẫn với thiết kế [TK-M]) | 9-1 |
| Danh sách hệ điều hành và trình duyệt được hỗ trợ | Cần xác nhận ("sẽ ghi ở bản cuối") | 9-1 |

## 9. Câu hỏi cần khách xác nhận

Có 12 câu hỏi, gom từ các dòng "Cần xác nhận" ở trên. Mức ưu tiên là đề xuất của mình, dựa trên việc câu trả lời ảnh hưởng tới kiến trúc đến đâu. Mình không đề xuất con số nào.

- [ ] **(Cao)** Hệ thống cần đáp ứng bao nhiêu tài năng ngay khi vận hành chính thức, và bao nhiêu sau một năm?
- [ ] **(Cao)** Xử lý buổi sáng phải bắt đầu lúc nào, và được phép trễ bao lâu so với giờ nhắn tin?
- [ ] **(Cao)** Khung giờ hoạt động của hệ thống, và có cam kết tỷ lệ hoạt động hay thời gian khắc phục không?
- [ ] **(Cao)** Sao lưu những dữ liệu nào, tần suất ra sao, giữ bao lâu? Chấp nhận mất dữ liệu trong khoảng bao lâu?
- [ ] **(Cao)** Dung lượng tối đa của mỗi ảnh hoặc video và tổng dung lượng lưu trữ.
- [ ] **(Trung bình)** Thời gian phản hồi mong muốn của màn hình và của câu trả lời từ AI.
- [ ] **(Trung bình)** Thời gian lưu từng loại nhật ký. Ai xem nhật ký thao tác và nhật ký xử lý.
- [ ] **(Trung bình)** Có yêu cầu kiểm thử bảo mật, và có chuẩn bảo mật nào của アデッソ phải tuân theo không?
- [ ] **(Trung bình)** Danh sách hệ điều hành và trình duyệt được hỗ trợ. Màn hình quản trị có cần dùng trên điện thoại không.
- [ ] **(Trung bình)** Sau khi phát hành và trước khi ký hợp đồng bảo trì, ai theo dõi hệ thống và xử lý sự cố?
- [ ] **(Thấp)** Những tài liệu nào được bàn giao để bảo trì (mã nguồn, tài liệu thiết kế, tài liệu vận hành)?
- [ ] **(Thấp)** Dữ liệu trên OneDrive có cần sao lưu riêng ngoài cơ chế của Microsoft 365 không?
