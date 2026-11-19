# Rà lại toàn bộ Q&A — V4

Đây là kiểm tra/sửa của Analyst theo phản hồi người dùng, không thay review độc lập hoặc phê duyệt G6. Phạm vi44 câu hiện hành trước sửa, đọc lại nguồn khách và hai bản màn18/11, đối chiếu nguồn phản hồi/đề xuất tại QA/KS/GJ.

Kết quả44 câu gốc: {'REMOVE_FROM_CUSTOMER_DRAFT': 1, 'REWRITE': 18, 'KEEP': 16, 'HOLD_INTERNAL': 7, 'SPLIT': 1, 'HOLD_PROVIDER_AND_TEAM': 1}. Sau loại/giữ chờ và tách một quyết định có sẵn: **36 câu từ21 finding** ở bản hiện hành.

## Sai sót và cách sửa

WQA-071-01 đã biến mô tả “tự động/đăng một lần” ở biên bản thành lựa chọn thứ hai trên view. T-08 chỉ có có/không xác nhận trước đăng. Câu này bị loại khỏi tập khách đọc, giữ ID/lịch sử và không tự đóng toàn bộNo.71. Các lượt review finding trước chưa bảo đảm câu viết ra có đúng tiền đề; lần này kiểm trực tiếp từng câu, không dùng ACCEPT như chứng minh thay nguồn.

Câu066-01 cần đội đối chiếu đường app/quản trị theo bản18/11 thay vì yêu cầu khách chọn lại như chưa có màn. Các câu về mốc/rải giờ, hiển thị lịch sử, quyền đổi giá, ranh giới kỳ thu và phạm vi xóa cần phương án/đối chiếu đội trước; không tự coi các chủ đề đã được khách trả lời. Câu067-01 chờ quy trình khôi phục mà review đã giao đội chuẩn bị.

## Câu bị loại hoặc giữ chờ

| ID | Xử lý | Lý do |
|---|---|---|
| WQA-071-01 | REMOVE_FROM_CUSTOMER_DRAFT | T-08 chỉ có lựa chọn xác nhận trước đăng. Câu cũ tự biến mô tả biên bản17/11 thành lựa chọn thứ hai đang tồn tại trên view. Loại câu hỏi sai tiền đề; khác biệt lịch sử để đội đối chiếu, không tự tuyên bố toàn No.71 đã đóng. |
| WQA-056-01 | HOLD_INTERNAL | T-10 đã hiển thị giờ AI quyết trước khi chấp nhận; khách không đổi giờ. Mốc tính/chốt giờ là thiết kế cần đội đối chiếu với nhắc tư liệu trước; chưa chứng minh còn phương án hành vi cần khách chọn. Không tự coi QA56 Open là đủ để hỏi lại mốc triển khai. |
| WQA-056-02 | HOLD_INTERNAL | Không có trần bài đã chốt; giờ theo chỉ thị AI và nhịp tạo được giao FutureCore đề xuất. Đội cần đưa phương án và chỉ rõ phần vượt chỉ thị có sẵn trước khi hỏi khách thiết kế rải giờ. Chưa đóng phần còn mở trong No.56. |
| WQA-069-02 | HOLD_INTERNAL | KS/GJ/M-10 đã nêu thông tin Talent gồm thực tích/ảnh được giữ6tháng rồi xóa. Câu cũ hỏi phạm vi từ đầu và gợi ngoại lệ giữ lại chưa có nhu cầu cụ thể. Đội lập inventory dữ liệu/đối chiếu nghĩa vụ giữ trước, chỉ trình khách khác biệt có căn cứ; No.69 vẫn mở đúng phần chưa kiểm. |
| WQA-058-01 | HOLD_INTERNAL | M-05/T-14 đã cho xem lý do, sửa và gửi lại; chưa có bản đối chiếu đội về lịch sử hiện có và nhu cầu xem nhiều phiên bản. Hỏi mở mọi lịch sử có thể tạo yêu cầu mới. Đội đề xuất phần hiển thị còn thiếu trước; No.58 không tự đóng và không hỏi chọn ID bản ghi. |
| WQA-062-01 | HOLD_INTERNAL | M-01/M-18 quy định Manager cùng quyền; không có màn quản trị đổi giá đã chỉ rõ. Đội cần xác định thao tác/đề xuất trong quyền hiện hành, không đẩy câu chọn người thành yêu cầu tạo phân quyền mới. Không đóngNo.62 về giá hiệu lực. |
| WQA-049-01 | HOLD_PROVIDER_AND_TEAM | Cần biết chu kỳ/khả năng thu biến đổi từ provider theoKS104/105 và SD-T16 trước, đội map kỳ video/kỳthuêbao rồi chỉ ra quyết định còn cần khách. Câu cũ chuyển việc ghép kỳ chưa có phương án sang khách. |
| WQA-066-01 | HOLD_INTERNAL | SD-M18 p33 đã mô tả dùng app; M-12 đã có email và p9 đã có danh sách. Không bắt khách chọn lại đường app/quản trị chỉ vì nguồn cũ P767 khác. Đội đối chiếu lịch sử/phạm vi trước; chỉ hỏi khác biệt hành vi chưa giải quyết được. Không tự tuyên bố toànNo.66đóng. |
| WQA-067-01 | HOLD_INTERNAL | Review hiện hành yêu cầu đội đề xuất quy trình khôi phục trước. Chưa có hồ sơ quytrình/bằngchứng ngoại lệ ngườiquảntrịcuối để khách chỉ định đầu mối trên phương án cụthể; chưa gửi câu tình huống rộng này. Không coi No.67đãđáp. |

## Kiểm từng ID

| ID | Kết quả | Lý do |
|---|---|---|
| WQA-071-01 | REMOVE_FROM_CUSTOMER_DRAFT | T-08 chỉ có lựa chọn xác nhận trước đăng. Câu cũ tự biến mô tả biên bản17/11 thành lựa chọn thứ hai đang tồn tại trên view. Loại câu hỏi sai tiền đề; khác biệt lịch sử để đội đối chiếu, không tự tuyên bố toàn No.71 đã đóng. |
| WQA-071-02 | REWRITE | T-10 đã mô tả bài công việc và Talent chọn xin duyệt; M-11 đã có sửa rồi đặt lịch. Chỉ giữ giao điểm chưa rõ trên đường không cần Talent xác nhận, không hỏi lại có kiểm từ cấm. |
| WQA-057-01 | KEEP | T-10 cho sửa tay nói chung; M-11 giao Manager sửa bài chặn. QA57H vẫn hỏi riêng Talent có sửa đúng loại bài này được không. Không hỏi lại quyền sửa tay chung. |
| WQA-057-02 | REWRITE | M-11 đã có nút sửa và đặt lịch, không hỏi lại ai bấm hay thứ tự mặc định. QA57 chưa có quyết định khách về Talent xem lại bản do Manager sửa. |
| WQA-056-01 | HOLD_INTERNAL | T-10 đã hiển thị giờ AI quyết trước khi chấp nhận; khách không đổi giờ. Mốc tính/chốt giờ là thiết kế cần đội đối chiếu với nhắc tư liệu trước; chưa chứng minh còn phương án hành vi cần khách chọn. Không tự coi QA56 Open là đủ để hỏi lại mốc triển khai. |
| WQA-056-02 | HOLD_INTERNAL | Không có trần bài đã chốt; giờ theo chỉ thị AI và nhịp tạo được giao FutureCore đề xuất. Đội cần đưa phương án và chỉ rõ phần vượt chỉ thị có sẵn trước khi hỏi khách thiết kế rải giờ. Chưa đóng phần còn mở trong No.56. |
| WQA-056-03 | REWRITE | M-05 đã quy định bài chưa được duyệt đúng giờ thì hủy và báo hai bên. Không gộp vào câu về ảnh/video đến muộn. Chỉ giữ tư liệu hoàn tất sau giờ dự kiến theo QA56H. |
| WQA-006-01 | REWRITE | M-06/M-10 vẫn ghi cần xác nhận cách đăng ký phụ trách. QA7H có đề xuất cơ sở theo từng Talent, còn nhóm nếu dùng cùng; không hỏi như quyền mọi Manager xem còn mở. |
| WQA-006-02 | KEEP | Không nguồn nào đã chốt đầu mối thay thế khi thiếu/vắng phụ trách; QA7H nêu rõ còn xác nhận. |
| WQA-054-01 | REWRITE | M-20 có lưu và lịch sử, chưa có thao tác xác nhận đủ. Không mặc định bổ sung vai trò/người hoặc nút xác nhận; chỉ hỏi tiêu chí hồ sơ đủ theo nghiệp vụ. |
| WQA-076-01 | KEEP | T-09 trang13 ghi 要確認 nội dung hạn chế lượt/chủ đề; No.76 là diễn giải đội chứ chưa có trả lời. Có căn cứ hỏi chính sách giới hạn. |
| WQA-063-01 | REWRITE | M-10 định nghĩa kết thúc là không đăng nhập, dừng phí và không mở lại. Câu phải phân biệt dừng vì nợ còn chưa chốt với chấm dứt đã định nghĩa; không hỏi lại quyền ở tài khoản đã nghỉ. |
| WQA-063-02 | KEEP | Phí khi dừng vì nợ chưa được quyết; không đồng nhất với quy tắc thu trọn tháng khi nghỉ. Phụ thuộc định nghĩa dừng ở063-01. |
| WQA-063-03 | REWRITE | Không đặt câu chung về mở lại tài khoản đã kết thúc vốn bị cấm. Chỉ xét trường hợp công ty chọn tạm dừng vì nợ ở063-01; quyền Manager đồng nhất, không tạo phân cấp người mở lại. |
| WQA-069-01 | KEEP | Giữ đăng ký mới cùng email trong6tháng, không yêu cầu phục hồi trạng thái; xung đột điều kiện email với No.69 chưa có phản hồi. |
| WQA-069-02 | HOLD_INTERNAL | KS/GJ/M-10 đã nêu thông tin Talent gồm thực tích/ảnh được giữ6tháng rồi xóa. Câu cũ hỏi phạm vi từ đầu và gợi ngoại lệ giữ lại chưa có nhu cầu cụ thể. Đội lập inventory dữ liệu/đối chiếu nghĩa vụ giữ trước, chỉ trình khách khác biệt có căn cứ; No.69 vẫn mở đúng phần chưa kiểm. |
| WQA-037-01 | KEEP | T-11 ghi rõ hàng video tự làm theo thứ tự mỗi ngày là 要確認; chưa đồng nghĩa chức năng đã duyệt vì có màn upload. |
| WQA-075-01 | REWRITE | M-03 đã mô tả email báo có đơn đăng ký; không hỏi toàn bộ phạm vi như chưa có mô tả nào. QA75 vẫn chưa chốt các loại khác. |
| WQA-075-02 | KEEP | Nội dung email Manager ngoài các thư mẫu đã nêu chưa chốt; QA75 phân biệt tiêu đề/link và nội dung, không lấy đề xuất an toàn thành quyết định khách. |
| WQA-075-03 | KEEP | Quyền mọi Manager xem thông báo không tự xác định người nhận email. Hỏi phạm vi nhận thư, không quyết lại cách phân công ởNo.6. |
| WQA-070-01 | REWRITE | Ghép ảnh và dùng lại ảnh là hai cách diễn đạt cùng nguyên tắc sử dụng tư liệu; làm cụ thể theo lựa chọn của Talent, không bắt chọn cách AI sinh bài. |
| WQA-070-02 | KEEP | Kỳ/tư liệu có trongT-08, hết tư liệu chưa có kết quả xác định; không tự yêu cầu AI tạo ảnh hoặc mặc định dùng lại. Đây là hành vi độc lập với nhịp sinh đội đề xuất. |
| WQA-070-03 | KEEP | T-08 chỉ nêu bắt đầu kỳ, không chốt hiệu lực sửa/kết thúc với bài chuẩn bị. Khác dừng vận hànhManager ở60/61/77. |
| WQA-058-01 | HOLD_INTERNAL | M-05/T-14 đã cho xem lý do, sửa và gửi lại; chưa có bản đối chiếu đội về lịch sử hiện có và nhu cầu xem nhiều phiên bản. Hỏi mở mọi lịch sử có thể tạo yêu cầu mới. Đội đề xuất phần hiển thị còn thiếu trước; No.58 không tự đóng và không hỏi chọn ID bản ghi. |
| WQA-059-01 | KEEP | T-14/M-08 đã có nút/màn đặt lịch lại và hiển thị SNS lỗi; chưa chỉ rõ lần đặt lại nhắm mạng lỗi hay mọi mạng. Không hỏi lại thao tác đã mô tả. |
| WQA-060-01 | KEEP | M-10/M-16 mô tả dừng/hủy, chưa xác định bài mới được chấp nhận khi dừng. Không coi thiếu nhánh là hệ thống chắc lỗi. |
| WQA-061-01 | SPLIT | Câu cũ gộp thông báo hủy và quyền dùng lại bài. Giữ ID này cho quyết định thông báo; phần dùng lại tiếp tục dưới061-02, không phải quyết định mới. |
| WQA-077-01 | REWRITE | SD-M18 p19/p32 có 要確認 cho hủy và không phục hồi; hỏi xác nhận đúng nội dung bảo lưu, không tả như chính sách đã chốt rồi chỉ hỏi phạm vi mơ hồ. |
| WQA-052-01 | REWRITE | M-10 đã có chuyển bằng tay. Không nói hai cơ chế đang tồn tại; tự chuyển chỉ là đề xuất chưa được khách trả lời tạiNo.52. |
| WQA-074-01 | REWRITE | M-20 đã có danh sách trường và ghi 要確認. Hỏi xác nhận danh sách cụ thể, không hỏi thêm màn/đườngnhập hoặc mọi thôngtin từđầu. |
| WQA-073-01 | REWRITE | Ba khung đã chốt và M-17 có trường giờ. Thu hẹp về giờ; không hỏi lại toàn bộ loại lời nhắn đã mô tả tạiT-09/YK2 hoặc tự đồng nhất mọi nhắc với ba khung. |
| WQA-073-02 | REWRITE | M-17 đã hiển thị giá trị ban đầu3/7; KS52I vẫn hẹn xác nhận. Không coi chưa có giá trị, cũng không tự coi số mẫu đã được duyệt. |
| WQA-002-01 | KEEP | T-12/KS67 giao khách quyết đơn giá; chưa có mức cuối được ghi. Không hỏi lại cách đếm lượt thành công/thất bại. |
| WQA-062-01 | HOLD_INTERNAL | M-01/M-18 quy định Manager cùng quyền; không có màn quản trị đổi giá đã chỉ rõ. Đội cần xác định thao tác/đề xuất trong quyền hiện hành, không đẩy câu chọn người thành yêu cầu tạo phân quyền mới. Không đóngNo.62 về giá hiệu lực. |
| WQA-062-02 | KEEP | YK2 đếm khi yêu cầu; giá tham khảo không giải quyết hiệu lực giá khi đổi. QA62 hỏi lượt trước/sau đổi; phần sai/lỗi không được gộp vào. |
| WQA-053-01 | REWRITE | T-04 cho dùngAI sau thanh toán không tự xác định ngày thu. QA53H là đề xuất lấy ngày đăng ký thanh toán, không phải phản hồi đã duyệt; hỏi xác nhận đúng đề xuất thay hỏi lại mở rộng mọi sự kiện. |
| WQA-049-01 | HOLD_PROVIDER_AND_TEAM | Cần biết chu kỳ/khả năng thu biến đổi từ provider theoKS104/105 và SD-T16 trước, đội map kỳ video/kỳthuêbao rồi chỉ ra quyết định còn cần khách. Câu cũ chuyển việc ghép kỳ chưa có phương án sang khách. |
| WQA-066-01 | HOLD_INTERNAL | SD-M18 p33 đã mô tả dùng app; M-12 đã có email và p9 đã có danh sách. Không bắt khách chọn lại đường app/quản trị chỉ vì nguồn cũ P767 khác. Đội đối chiếu lịch sử/phạm vi trước; chỉ hỏi khác biệt hành vi chưa giải quyết được. Không tự tuyên bố toànNo.66đóng. |
| WQA-066-02 | KEEP | M-12/p33 mô tả tạo/dùng office và miễnphí; không chốt chính sách kết thúc/xóa tài khoản office. Không tự áp cách nghỉTalent sangoffice. |
| WQA-055-01 | KEEP | T-07 chỉ nêu hôm sau3chủđềmới, không chốt việc xem/dùng lại nháp cũ. QA55vẫn đềxuất. Không gộp dọn kho/phânquyềnxóa. |
| WQA-067-01 | HOLD_INTERNAL | Review hiện hành yêu cầu đội đề xuất quy trình khôi phục trước. Chưa có hồ sơ quytrình/bằngchứng ngoại lệ ngườiquảntrịcuối để khách chỉ định đầu mối trên phương án cụthể; chưa gửi câu tình huống rộng này. Không coi No.67đãđáp. |
| WQA-065-01 | REWRITE | M-03 có 要確認 về tạm giữ/traođổi trước từ chối. Không mặc định hệthống có chức năng hỏi thêm. Hỏi quy trình thực tế côngty cần trước. |
| WQA-065-02 | REWRITE | Chặn email trùng theoYK2 chưa giải quyết đơn từ chối. Thu hẹp đúng email cũ; không hỏi lại nộp sau khi đã nghỉ ở69. |
| WQA-065-03 | REWRITE | M-01/M-18 có một quyềnManager; không hỏi lại ai như cần phân quyền. Chỉ hỏi quyền nghiệp vụ có được đổi kết quả từchối, khác với nộplại đơnmới. |

## Các sửa đổi khác cần lưu ý

-056-03 chỉ hỏi tư liệu đến muộn; bài chưa duyệt đúng giờ đã có hủy/báo trong M-05.
-054-01 chỉ hỏi trường bắt buộc, không tự thêm nút/người xác nhận hoàn tất.
-073-01 chỉ hỏi giờ chung;073-02 nêu rõ3/7 là giá trị dự kiến trên M-17 còn phải xác nhận, không tả như chưa có.
-052-01 phân biệt thao tác chuyển tay đang có với đề xuất tự chuyển, không nói cả hai đã tồn tại.
-063-01/02/03 phân biệt tạm dừng vì nợ với kết thúc không phục hồi; hai câu sau phụ thuộc định nghĩa câu đầu.
-065-03 hỏi có được sửa kết quả đơn từ chối, không hỏi chọn người có quyền mới khi Manager cùng quyền.
-061-01 được tách:061-01 thông báo hủy,061-02 quyền dùng lại; cả hai ý đã có trong câu cũ/No.61, không thêm yêu cầu mới.

## Lịch sử, phạm vi và giới hạn

Không đổi Finding ID/kết quả Independent Review/reviews/gate-runs hoặc nguồn. Những reasoning finding cần đối chiếu lại được ghi trong lý do, không tự rút G5 hoặc tự tái duyệt finding. Toàn bộ câu giữ DRAFT_UNAPPROVED; Tech Lead cần kiểm bản sửa trước gửi. Không đóngNo.cũ chỉ vì màn mới có mô tả; các bảo lưu vẫn giữ mở. Chỉ kiểm phần chữ và bảng mô tả nguồn, không tuyên bố đã kiểm mọi hình/connector hoặc chạy dịch vụ thật.

Bản Markdown/CSV/báo cáo chất lượng trước được giữ trong before. reviews gốc và manifest lịch sử không bị sửa ngược. source-audit.csv có nguyên văn/hash/vị trí cho từng kết luận. review-results.csv giữ trước/sau của44 câu; all-question-records.csv giữ cả câu bị loại, giữ chờ và câu tách mới.

Báo cáo docs/qa trước còn nói bộ Q&A rỗng; bản đó là snapshot lịch sử, được lưu trước khi thay bằng báo cáo hiện hành này.
