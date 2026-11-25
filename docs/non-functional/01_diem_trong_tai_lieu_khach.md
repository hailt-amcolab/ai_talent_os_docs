# Các điểm phi chức năng trong tài liệu khách gửi

Ngày ghi: 25/11/2026. Chỉ ghi nội dung có trong tài liệu khách. Tài liệu nội bộ, mã nguồn và bản phân tích không được dùng làm lời khách.

Từ **非機能要件 (yêu cầu phi chức năng)** xuất hiện thành chương trong ba bản yêu cầu. Các tài liệu màn hình, luồng, slide so sánh dịch vụ và bảng xác nhận không có chương này. Biên bản ngày 19/11 và bảng hỏi đáp chỉ nhắc tới việc này, không viết thành chương.

## 1. Bản đang được khách nhờ kiểm tra

Tệp: `source_requiments/24112026/AI育成OS_要件定義書.docx`.

Bản 0.3, ngày 24/11/2026, FutureCore Partners. Mục lục gọi chương 3 là yêu cầu phi chức năng: thiết bị, hiệu năng và quy mô, thời gian chạy và sự cố, ghi chép, bảo mật, thông tin cá nhân, điều kiện tiên quyết và ràng buộc. Trong thân tài liệu còn có mục 3-7 về phòng tài khoản mạng xã hội bị khóa.

| Mục | Khách đã viết |
|---|---|
| 3-1 使う端末と環境 (thiết bị và môi trường) | App tài năng mở bằng trình duyệt điện thoại và thêm vào màn hình chính. iPhone cần iOS 16.4 trở lên mới nhận thông báo. Phiên bản hệ điều hành và trình duyệt chốt khi thiết kế. Màn quản lý là web, máy tính là chính. Trên điện thoại phải đọc được nội dung. Màn duyệt và màn chỉ thị cho AI phải thao tác được trên điện thoại. Không yêu cầu giao diện giống nhau từng chi tiết trên mọi máy. Có môi trường chạy thật và môi trường kiểm thử. Không làm ảnh hưởng app tự động hóa Instagram DM đang chạy. |
| 3-2 性能と規模 (hiệu năng và quy mô) | Bắt đầu khoảng 30 người, tăng 10 người mỗi tháng, sớm tới khoảng 100 người. Mục tiêu 200–300 người, sau này 1.000 người. Trước giờ gửi lời nhắn buổi sáng phải đọc xong thông tin, thành tích và tạo xong các chủ đề ứng viên. Kiểm tra thời gian này với số người lúc bắt đầu. Dung lượng mỗi ảnh hoặc video và tổng dung lượng lưu chốt khi thiết kế. Ước tính phí dịch vụ ngoài khi số người tăng được đưa riêng. |
| 3-3 稼働時間と障害時の対応 (thời gian chạy và khi có sự cố) | Khung giờ sử dụng chốt khi thiết kế. Dịch vụ ngoài bị sự cố thì chỉ tắt chức năng đó, chức năng khác vẫn dùng. Đối tượng, tần suất và thời gian giữ bản sao lưu chốt khi thiết kế. |
| 3-4 操作と処理の記録 (ghi thao tác và kết quả xử lý) | Ghi lượt xem theo yêu cầu nghiệp vụ 16-4. Ghi thao tác duyệt, đổi trạng thái, dừng và mở lại đăng, đổi cài đặt. Ghi kết quả đăng bài, lấy thành tích, tạo video và thanh toán. Thời gian giữ bản ghi chốt khi thiết kế. |
| 3-5 セキュリティ (bảo mật) | Quy tắc đăng nhập viết ở yêu cầu chức năng 2-4-2 và 2-4-16. Mã hóa đường truyền và dữ liệu lưu. Khóa kết nối dịch vụ ngoài không hiện trên màn hình hoặc trong bản ghi. Dữ liệu đưa cho AI chỉ trong phạm vi cần để hội thoại và viết bài. Cấu hình để dịch vụ AI không dùng dữ liệu đó cho việc học. |
| 3-6 個人情報の扱い (xử lý thông tin cá nhân) | Với tài năng thuộc công ty, Adesso đã nhận ủy thác thông tin cá nhân và quyền hình ảnh khi ký hợp đồng. Adesso lấy sự đồng ý trước khi đưa thông tin tài năng cho dịch vụ ngoài, kể cả AI. Nếu sự đồng ý hiện có đã bao gồm việc này thì không làm thủ tục mới. Đồng ý của phụ huynh với tài năng chưa thành niên do Adesso lấy khi ký hợp đồng. Hệ thống không lưu hồ sơ đồng ý. Phát triển và kiểm thử dùng dữ liệu thử. Dùng thông tin tài năng thật thì chỉ trong phạm vi đã được chấp thuận bằng văn bản. |
| 3-7 SNS のアカウントの凍結対策 (phòng tài khoản mạng xã hội bị khóa) | Có biện pháp như giới hạn tần suất đăng. Nội dung biện pháp theo mục chống khóa trong yêu cầu chức năng chung 2-5 và được chốt khi thiết kế. |
| 3-8 前提条件と制約事項 (điều kiện tiên quyết và ràng buộc) | Adesso chuẩn bị điều khoản sử dụng, hướng dẫn đăng ký, trang và mã QR, cách hiển thị giá, ghi chú theo luật giao dịch thương mại cụ thể, câu chữ thư và thông báo, địa chỉ thư của quản lý, logo, màu, hình nhân vật, rà danh sách từ cấm, nhập thông tin tài năng trước khi chạy thật, giá mỗi lần tạo video, hợp đồng và thủ tục xét duyệt dịch vụ ngoài đứng tên Adesso, gồm cả phí thời gian phát triển và kiểm thử. Phần không bảo đảm: thông báo điện thoại có thể chậm hoặc không tới. Biện pháp chống khóa không bảo đảm tài khoản không bị khóa. Với TikTok, đặt lịch, đăng không cần xác nhận, đăng tự động và chỉ định phạm vi công khai không khớp câu trả lời TikTok tháng 11/2026. Giữ nguyên đặc tả thì TikTok có thể hạn chế bài hoặc tài khoản. Ngoài Upload-Post còn dịch vụ khác đang chạy đăng tự động. Không bảo đảm nội dung AI đúng. Kiểm tra từ cấm và thông báo do AI phán đoán có thể sót. Thanh toán qua nhà mạng có thể không dùng được tùy công ty điện thoại và hợp đồng. Dùng tên và logo app Adesso hiện có, không dùng hệ thống cũ. Tài khoản phải đủ điều kiện tuổi của từng mạng xã hội. Cách kiểm tra nội dung và tư liệu có xâm phạm quyền người khác hay không được chốt khi thiết kế. Bảo trì sau phát hành là hợp đồng riêng. |

Mục 2-5 của cùng bản, phần xử lý dữ liệu, viết thêm các điểm liên quan nhưng xếp ở yêu cầu chức năng chung: thông tin tài năng, mục tiêu, bí quyết, thành tích, ảnh và video lưu trong thư mục OneDrive theo từng tài năng. Hội thoại và nhật ký xem lưu trong hệ thống. Thông tin thanh toán do công ty trung gian giữ, hệ thống không lưu số thẻ. Thông báo điện thoại, cơ chế dùng sẽ chốt khi thiết kế.

## 2. Hai bản tổng quan trước bản 0.3

Cùng cấu trúc ở **第3部 非機能要件 (phần 3, yêu cầu phi chức năng)**, chương 9 đến 11.

| Tệp | Vị trí |
|---|---|
| `source_requiments/base/AI育成OS_概要要件定義書.docx` | Phần 3, từ mục 9 đến mục 11 |
| `source_requiments/16112026/AI育成OS_概要要件定義書_v2.docx` | Phần 3, từ mục 9 đến mục 11 |

| Mục | Nội dung chung của hai bản |
|---|---|
| 9-1 | App tài năng trên điện thoại. Phiên bản hệ điều hành và trình duyệt ghi ở bản cuối. iPhone cần iOS 16.4 để nhận thông báo. Có môi trường chạy thật và kiểm thử. Không ảnh hưởng app Instagram DM đang chạy. |
| 9-2 | Xử lý buổi sáng phải xong trước giờ gửi lời nhắn. Dung lượng ảnh và video chốt ở bản cuối. |
| 9-3 | Khung giờ sử dụng chốt ở bản cuối. Dịch vụ ngoài lỗi thì tắt riêng chức năng đó và báo khi đăng thất bại. Bản sao lưu chốt ở bản cuối. |
| 9-4 | Ghi quản lý đã xem thông tin tài năng nào và lúc nào. Ghi duyệt, đổi trạng thái, dừng và mở lại đăng tự động. Ghi kết quả đăng, lấy thành tích, tạo video và thanh toán. |
| 9-5 | Giới hạn tần suất đăng. Không bảo đảm tài khoản không bị khóa. |
| 10-1 | Quản lý đăng nhập bằng xác thực hai lớp. Cách đăng nhập của tài năng và quản lý nằm ở mục chức năng. Tài năng chỉ xem dữ liệu của mình. |
| 10-2 | Mã hóa đường truyền và dữ liệu lưu. Giấu khóa kết nối. Giới hạn dữ liệu đưa cho AI và không cho dịch vụ AI học từ dữ liệu đó. Hệ thống không lưu thông tin thẻ. |
| 10-3 | Đồng ý của phụ huynh do Adesso lấy khi ký hợp đồng. Hệ thống không lưu hồ sơ đồng ý. Kiểm thử dùng dữ liệu thử. |
| 11 | Thông báo không bảo đảm tới nơi. Không bảo đảm tài khoản không bị khóa. Không bảo đảm chất lượng chữ, ảnh và video do AI tạo. Adesso phải rà danh sách từ cấm mẫu. Cách kiểm tra quyền của người khác ghi ở bản cuối. Tài khoản phải đủ tuổi theo từng mạng xã hội. Điều khoản, cách ghi giá và ghi chú luật giao dịch do Adesso quyết định. Bảo trì sau phát hành là hợp đồng riêng. |

Điểm khác giữa hai bản:

- Bản trong `base/`: quy mô khởi đầu là 80–150 người, tập trung tài năng mới. Màn quản lý mở được trên trình duyệt điện thoại nhưng không làm thành màn dành cho điện thoại. Đây là mục 確認31 (mục cần xác nhận số 31). Trước khi đưa thông tin tài năng ra dịch vụ ngoài, Adesso phải lấy sự đồng ý.
- Bản v2 ngày 16/11: bắt đầu khoảng 30 người, tăng 10 người mỗi tháng, sớm tới khoảng 100 người. Mục tiêu 200–300, sau này 1.000. Màn quản lý phải xem được trên điện thoại. Với tài năng thuộc công ty, việc ủy thác thông tin cá nhân và quyền hình ảnh đã có lúc ký hợp đồng.

## 3. Chỗ khác có nhắc, không phải chương phi chức năng

| Nguồn | Điều đã viết |
|---|---|
| Biên bản `source_requiments/19112926/20261119_AMCOLAB様打ち合わせ_画面定義書の確認_議事録.md`, mục 18 và hành động số 7 | Cần rà mọi chỗ phát sinh lỗi, không chỉ đăng bài thất bại, rồi quyết định cách vận hành. Từ tuần sau xem việc này như yêu cầu phi chức năng. Người làm là FutureCore và AMCOLAB. |
| Bảng hỏi đáp `source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx`, câu 101, ô G101 | Ngày 24/11 khách xác nhận AIコーチ (huấn luyện viên AI) là tác nhân, đọc và ghi cơ sở dữ liệu Supabase. Dữ liệu lưu trong cơ sở dữ liệu của hệ thống và có bản sao lưu. Không bảo đảm phán đoán của tác nhân đúng. Phí token do Adesso trả. Ô này yêu cầu đưa nội dung vào bản yêu cầu, gồm mục 2-5, 3-3, 3-8 và tiêu chí nghiệm thu. |
| Cùng bảng hỏi đáp, các ghi chú đối chiếu bản ước tính | Ghi chú dẫn mục 3-1 khi nói màn duyệt và màn chỉ thị AI phải dùng được trên điện thoại, trong khi bản ước tính không gồm màn quản lý cho điện thoại. Ghi chú dẫn mục 3-2 khi nói mục tiêu 200–300 người và sau này 1.000 người, trong khi điều kiện ước tính là tối đa khoảng 150 tài năng và khoảng 8 tài khoản văn phòng. Ghi chú dẫn mục 3-4 khi nói phải ghi thao tác và kết quả xử lý, trong khi mục 17 của bản ước tính chỉ ghi nhật ký xem. |

Bảng xác nhận `source_requiments/Q&A/要件定義確認シート_AI育成OS.xlsx` không chứa từ yêu cầu phi chức năng. Quyết định ngày 24/11 về TikTok được bản yêu cầu 0.3 chép vào mục 3-8.
