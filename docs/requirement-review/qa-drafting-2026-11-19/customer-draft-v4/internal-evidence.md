# Internal Evidence — V4 full QA re-audit

Đây là kiểm tra lại của Analyst, không ký independent review hoặc phê duyệt Q&A. Kết quả finding/G5 cũ không bị sửa; việc giữ/loại câu hỏi là trục khác. Nguyên văn nguồn mở lại, vị trí/hash ở [source-audit.csv](source-audit.csv). Tất cả44 câu trước được kiểm, không chỉ071-01.

## IE-WQA-071-02

Q&A WQA-071-02; Finding FND-0002; review finding tham chiếu REV-0065. Hash finding `da414554169516a8dfd419ea7b84e7b8f1da1a92c95718f0ee1809f057ce7a98`.

Đối chiếu câu: REWRITE; T-10 đã mô tả bài công việc và Talent chọn xin duyệt; M-11 đã có sửa rồi đặt lịch. Chỉ giữ giao điểm chưa rõ trên đường không cần Talent xác nhận, không hỏi lại có kiểm từ cấm.

Nguồn đọc lại: T:12;T:14;M:8;M:14;Q:71; bằng chứng QREV-0005;QREV-0006;QREV-0007;QREV-0008;QREV-0009. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-057-01

Q&A WQA-057-01; Finding FND-0003; review finding tham chiếu REV-0066. Hash finding `8a1edb541b9fd70e607a22a77f20cf69fdf4409bc38ccf71a3918690f240e77e`.

Đối chiếu câu: KEEP; T-10 cho sửa tay nói chung; M-11 giao Manager sửa bài chặn. QA57H vẫn hỏi riêng Talent có sửa đúng loại bài này được không. Không hỏi lại quyền sửa tay chung.

Nguồn đọc lại: T:14;M:14;K:64;Q:57; bằng chứng QREV-0010;QREV-0011;QREV-0012;QREV-0013. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-057-02

Q&A WQA-057-02; Finding FND-0003; review finding tham chiếu REV-0066. Hash finding `8a1edb541b9fd70e607a22a77f20cf69fdf4409bc38ccf71a3918690f240e77e`.

Đối chiếu câu: REWRITE; M-11 đã có nút sửa và đặt lịch, không hỏi lại ai bấm hay thứ tự mặc định. QA57 chưa có quyết định khách về Talent xem lại bản do Manager sửa.

Nguồn đọc lại: M:14;T:14;Q:57; bằng chứng QREV-0014;QREV-0015;QREV-0016. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-056-03

Q&A WQA-056-03; Finding FND-0006; review finding tham chiếu REV-0069. Hash finding `1b81c1be9b9b0224a558aaf2a830a95d480b577c545144fbeedda2a457218c27`.

Đối chiếu câu: REWRITE; M-05 đã quy định bài chưa được duyệt đúng giờ thì hủy và báo hai bên. Không gộp vào câu về ảnh/video đến muộn. Chỉ giữ tư liệu hoàn tất sau giờ dự kiến theo QA56H.

Nguồn đọc lại: M:8;T:14;Q:56; bằng chứng QREV-0027;QREV-0028;QREV-0029. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-006-01

Q&A WQA-006-01; Finding FND-0009; review finding tham chiếu REV-0072. Hash finding `5b81e9b4f3af0db87539cd2f94fd63903168f3b91dc24f2d67570f4d70f640e4`.

Đối chiếu câu: REWRITE; M-06/M-10 vẫn ghi cần xác nhận cách đăng ký phụ trách. QA7H có đề xuất cơ sở theo từng Talent, còn nhóm nếu dùng cùng; không hỏi như quyền mọi Manager xem còn mở.

Nguồn đọc lại: M:9;M:13;Q:7;K:77;K:93; bằng chứng QREV-0030;QREV-0031;QREV-0032;QREV-0033;QREV-0034. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-006-02

Q&A WQA-006-02; Finding FND-0009; review finding tham chiếu REV-0072. Hash finding `5b81e9b4f3af0db87539cd2f94fd63903168f3b91dc24f2d67570f4d70f640e4`.

Đối chiếu câu: KEEP; Không nguồn nào đã chốt đầu mối thay thế khi thiếu/vắng phụ trách; QA7H nêu rõ còn xác nhận.

Nguồn đọc lại: Q:7;M:9;M:13; bằng chứng QREV-0035;QREV-0036;QREV-0037. Phụ thuộc câu: WQA-006-01.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-054-01

Q&A WQA-054-01; Finding FND-0010; review finding tham chiếu REV-0073. Hash finding `75e209537a79a8649c91c96537412842ecb3f407722ae003b0ed8c712171a679`.

Đối chiếu câu: REWRITE; M-20 có lưu và lịch sử, chưa có thao tác xác nhận đủ. Không mặc định bổ sung vai trò/người hoặc nút xác nhận; chỉ hỏi tiêu chí hồ sơ đủ theo nghiệp vụ.

Nguồn đọc lại: M:23;M:30;K:9;K:15;Q:54; bằng chứng QREV-0038;QREV-0039;QREV-0040;QREV-0041;QREV-0042. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-076-01

Q&A WQA-076-01; Finding FND-0014; review finding tham chiếu REV-0077. Hash finding `21a6a898b70a9572783b97d82514bd48d59e0f99eda68c8399abfb660a866b93`.

Đối chiếu câu: KEEP; T-09 trang13 ghi 要確認 nội dung hạn chế lượt/chủ đề; No.76 là diễn giải đội chứ chưa có trả lời. Có căn cứ hỏi chính sách giới hạn.

Nguồn đọc lại: T:13;K:56;Q:76; bằng chứng QREV-0043;QREV-0044;QREV-0045. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-063-01

Q&A WQA-063-01; Finding FND-0022; review finding tham chiếu REV-0085. Hash finding `dea756cbdd96e3cf8cc66e4af78059f2c1538fac96af7e801a892c2362d316f1`.

Đối chiếu câu: REWRITE; M-10 định nghĩa kết thúc là không đăng nhập, dừng phí và không mở lại. Câu phải phân biệt dừng vì nợ còn chưa chốt với chấm dứt đã định nghĩa; không hỏi lại quyền ở tài khoản đã nghỉ.

Nguồn đọc lại: M:13;M:31;Q:63;Y:626;K:119; bằng chứng QREV-0046;QREV-0047;QREV-0048;QREV-0049;QREV-0050. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-063-02

Q&A WQA-063-02; Finding FND-0022; review finding tham chiếu REV-0085. Hash finding `dea756cbdd96e3cf8cc66e4af78059f2c1538fac96af7e801a892c2362d316f1`.

Đối chiếu câu: KEEP; Phí khi dừng vì nợ chưa được quyết; không đồng nhất với quy tắc thu trọn tháng khi nghỉ. Phụ thuộc định nghĩa dừng ở063-01.

Nguồn đọc lại: Q:63;M:13;T:20; bằng chứng QREV-0051;QREV-0052;QREV-0053. Phụ thuộc câu: WQA-063-01.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-063-03

Q&A WQA-063-03; Finding FND-0022; review finding tham chiếu REV-0085. Hash finding `dea756cbdd96e3cf8cc66e4af78059f2c1538fac96af7e801a892c2362d316f1`.

Đối chiếu câu: REWRITE; Không đặt câu chung về mở lại tài khoản đã kết thúc vốn bị cấm. Chỉ xét trường hợp công ty chọn tạm dừng vì nợ ở063-01; quyền Manager đồng nhất, không tạo phân cấp người mở lại.

Nguồn đọc lại: Q:63;M:13;M:4;K:119; bằng chứng QREV-0054;QREV-0055;QREV-0056;QREV-0057. Phụ thuộc câu: WQA-063-01.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-069-01

Q&A WQA-069-01; Finding FND-0024; review finding tham chiếu REV-0087. Hash finding `25acdc3290f7ff4e134929d4c9309fdc2827b68efac8c6f481e77f77fa233862`.

Đối chiếu câu: KEEP; Giữ đăng ký mới cùng email trong6tháng, không yêu cầu phục hồi trạng thái; xung đột điều kiện email với No.69 chưa có phản hồi.

Nguồn đọc lại: Q:69;Q:65;Y:644;M:13;G:5; bằng chứng QREV-0058;QREV-0059;QREV-0060;QREV-0061;QREV-0062. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-037-01

Q&A WQA-037-01; Finding FND-0025; review finding tham chiếu REV-0088. Hash finding `bfee052d1171d222802344f2c2bb0537a7c8be31fd009fdeb75e08273c652743`.

Đối chiếu câu: KEEP; T-11 ghi rõ hàng video tự làm theo thứ tự mỗi ngày là 要確認; chưa đồng nghĩa chức năng đã duyệt vì có màn upload.

Nguồn đọc lại: T:15;K:73;Q:38; bằng chứng QREV-0068;QREV-0069;QREV-0070. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-075-01

Q&A WQA-075-01; Finding FND-0028; review finding tham chiếu REV-0091. Hash finding `cd6766ddd945e65f7025543f2c592b6eb9a45e3060fcec1489712e0ee778ee85`.

Đối chiếu câu: REWRITE; M-03 đã mô tả email báo có đơn đăng ký; không hỏi toàn bộ phạm vi như chưa có mô tả nào. QA75 vẫn chưa chốt các loại khác.

Nguồn đọc lại: M:6;M:5;K:97;Q:75; bằng chứng QREV-0071;QREV-0072;QREV-0073;QREV-0074. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-075-02

Q&A WQA-075-02; Finding FND-0028; review finding tham chiếu REV-0091. Hash finding `cd6766ddd945e65f7025543f2c592b6eb9a45e3060fcec1489712e0ee778ee85`.

Đối chiếu câu: KEEP; Nội dung email Manager ngoài các thư mẫu đã nêu chưa chốt; QA75 phân biệt tiêu đề/link và nội dung, không lấy đề xuất an toàn thành quyết định khách.

Nguồn đọc lại: Q:75;M:5;M:6; bằng chứng QREV-0075;QREV-0076;QREV-0077. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-075-03

Q&A WQA-075-03; Finding FND-0028; review finding tham chiếu REV-0091. Hash finding `cd6766ddd945e65f7025543f2c592b6eb9a45e3060fcec1489712e0ee778ee85`.

Đối chiếu câu: KEEP; Quyền mọi Manager xem thông báo không tự xác định người nhận email. Hỏi phạm vi nhận thư, không quyết lại cách phân công ởNo.6.

Nguồn đọc lại: Q:75;M:5;Q:7; bằng chứng QREV-0078;QREV-0079;QREV-0080. Phụ thuộc câu: WQA-006-01.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-070-01

Q&A WQA-070-01; Finding FND-0001; review finding tham chiếu REV-0064. Hash finding `3e2a48dbc25d2da1793e8479989c9907775f093dc55ba4c0bca4cc70cfea562f`.

Đối chiếu câu: REWRITE; Ghép ảnh và dùng lại ảnh là hai cách diễn đạt cùng nguyên tắc sử dụng tư liệu; làm cụ thể theo lựa chọn của Talent, không bắt chọn cách AI sinh bài.

Nguồn đọc lại: T:12;T:23;Q:70;G:1; bằng chứng QREV-0081;QREV-0082;QREV-0083;QREV-0084. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-070-02

Q&A WQA-070-02; Finding FND-0001; review finding tham chiếu REV-0064. Hash finding `3e2a48dbc25d2da1793e8479989c9907775f093dc55ba4c0bca4cc70cfea562f`.

Đối chiếu câu: KEEP; Kỳ/tư liệu có trongT-08, hết tư liệu chưa có kết quả xác định; không tự yêu cầu AI tạo ảnh hoặc mặc định dùng lại. Đây là hành vi độc lập với nhịp sinh đội đề xuất.

Nguồn đọc lại: T:12;T:23;Q:70; bằng chứng QREV-0085;QREV-0086;QREV-0087. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-070-03

Q&A WQA-070-03; Finding FND-0001; review finding tham chiếu REV-0064. Hash finding `3e2a48dbc25d2da1793e8479989c9907775f093dc55ba4c0bca4cc70cfea562f`.

Đối chiếu câu: KEEP; T-08 chỉ nêu bắt đầu kỳ, không chốt hiệu lực sửa/kết thúc với bài chuẩn bị. Khác dừng vận hànhManager ở60/61/77.

Nguồn đọc lại: T:12;T:23;Q:70;M:19; bằng chứng QREV-0088;QREV-0089;QREV-0090;QREV-0091. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-059-01

Q&A WQA-059-01; Finding FND-0007; review finding tham chiếu REV-0070. Hash finding `969677f26bdca1a5c2abeaa78c9f49d7b84f6509fb8278c91b0ffddf03582b56`.

Đối chiếu câu: KEEP; T-14/M-08 đã có nút/màn đặt lịch lại và hiển thị SNS lỗi; chưa chỉ rõ lần đặt lại nhắm mạng lỗi hay mọi mạng. Không hỏi lại thao tác đã mô tả.

Nguồn đọc lại: T:18;M:11;Q:59;Y:755; bằng chứng QREV-0096;QREV-0097;QREV-0098;QREV-0099. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-060-01

Q&A WQA-060-01; Finding FND-0008; review finding tham chiếu REV-0071. Hash finding `3d817eb90246141aeaf91251232e6170aa8914e2b3738127c5c0ee7c728fc0f4`.

Đối chiếu câu: KEEP; M-10/M-16 mô tả dừng/hủy, chưa xác định bài mới được chấp nhận khi dừng. Không coi thiếu nhánh là hệ thống chắc lỗi.

Nguồn đọc lại: M:13;M:19;M:32;Q:60; bằng chứng QREV-0100;QREV-0101;QREV-0102;QREV-0103. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-061-01

Q&A WQA-061-01; Finding FND-0008; review finding tham chiếu REV-0071. Hash finding `3d817eb90246141aeaf91251232e6170aa8914e2b3738127c5c0ee7c728fc0f4`.

Đối chiếu câu: SPLIT; Câu cũ gộp thông báo hủy và quyền dùng lại bài. Giữ ID này cho quyết định thông báo; phần dùng lại tiếp tục dưới061-02, không phải quyết định mới.

Nguồn đọc lại: M:11;T:19;Q:61; bằng chứng QREV-0104;QREV-0105;QREV-0106. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-077-01

Q&A WQA-077-01; Finding FND-0008; review finding tham chiếu REV-0071. Hash finding `3d817eb90246141aeaf91251232e6170aa8914e2b3738127c5c0ee7c728fc0f4`.

Đối chiếu câu: REWRITE; SD-M18 p19/p32 có 要確認 cho hủy và không phục hồi; hỏi xác nhận đúng nội dung bảo lưu, không tả như chính sách đã chốt rồi chỉ hỏi phạm vi mơ hồ.

Nguồn đọc lại: M:19;M:32;Q:77;K:85; bằng chứng QREV-0107;QREV-0108;QREV-0109;QREV-0110. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-052-01

Q&A WQA-052-01; Finding FND-0011; review finding tham chiếu REV-0074. Hash finding `e06119baa0815ec1fc6c7a278269f6348ca628c142872136252351a2baa4275c`.

Đối chiếu câu: REWRITE; M-10 đã có chuyển bằng tay. Không nói hai cơ chế đang tồn tại; tự chuyển chỉ là đề xuất chưa được khách trả lời tạiNo.52.

Nguồn đọc lại: M:13;T:8;Q:52;Y:616; bằng chứng QREV-0111;QREV-0112;QREV-0113;QREV-0114. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-074-01

Q&A WQA-074-01; Finding FND-0012; review finding tham chiếu REV-0075. Hash finding `420db66e02c10ceee93966f404d3805ebeef3a4a5ff4675ff41eec4756935633`.

Đối chiếu câu: REWRITE; M-20 đã có danh sách trường và ghi 要確認. Hỏi xác nhận danh sách cụ thể, không hỏi thêm màn/đườngnhập hoặc mọi thôngtin từđầu.

Nguồn đọc lại: M:23;M:30;K:30;Q:74; bằng chứng QREV-0115;QREV-0116;QREV-0117;QREV-0118. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-073-01

Q&A WQA-073-01; Finding FND-0015; review finding tham chiếu REV-0078. Hash finding `145991e9e65a8391d1ea87f46c5d06b80008a504f5e2acdfd94f1fa4d91d1787`.

Đối chiếu câu: REWRITE; Ba khung đã chốt và M-17 có trường giờ. Thu hẹp về giờ; không hỏi lại toàn bộ loại lời nhắn đã mô tả tạiT-09/YK2 hoặc tự đồng nhất mọi nhắc với ba khung.

Nguồn đọc lại: M:20;T:13;G:4;Q:73; bằng chứng QREV-0119;QREV-0120;QREV-0121;QREV-0122. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-073-02

Q&A WQA-073-02; Finding FND-0015; review finding tham chiếu REV-0078. Hash finding `145991e9e65a8391d1ea87f46c5d06b80008a504f5e2acdfd94f1fa4d91d1787`.

Đối chiếu câu: REWRITE; M-17 đã hiển thị giá trị ban đầu3/7; KS52I vẫn hẹn xác nhận. Không coi chưa có giá trị, cũng không tự coi số mẫu đã được duyệt.

Nguồn đọc lại: M:20;K:52;Q:73; bằng chứng QREV-0123;QREV-0124;QREV-0125. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-002-01

Q&A WQA-002-01; Finding FND-0018; review finding tham chiếu REV-0081. Hash finding `ae412eb8783bba5f81896e013773a7bd9a830085001b48400c97113eb3adc4d7`.

Đối chiếu câu: KEEP; T-12/KS67 giao khách quyết đơn giá; chưa có mức cuối được ghi. Không hỏi lại cách đếm lượt thành công/thất bại.

Nguồn đọc lại: T:16;K:67;Q:3; bằng chứng QREV-0126;QREV-0127;QREV-0128. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-062-02

Q&A WQA-062-02; Finding FND-0018; review finding tham chiếu REV-0081. Hash finding `ae412eb8783bba5f81896e013773a7bd9a830085001b48400c97113eb3adc4d7`.

Đối chiếu câu: KEEP; YK2 đếm khi yêu cầu; giá tham khảo không giải quyết hiệu lực giá khi đổi. QA62 hỏi lượt trước/sau đổi; phần sai/lỗi không được gộp vào.

Nguồn đọc lại: Y:636-639;T:16;Q:62;K:68; bằng chứng QREV-0134;QREV-0135;QREV-0136;QREV-0137. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-053-01

Q&A WQA-053-01; Finding FND-0021; review finding tham chiếu REV-0084. Hash finding `96e11c07c6fe41cfbe652db9b7658130286931bcb9871379ba2898651d81c9ec`.

Đối chiếu câu: REWRITE; T-04 cho dùngAI sau thanh toán không tự xác định ngày thu. QA53H là đề xuất lấy ngày đăng ký thanh toán, không phải phản hồi đã duyệt; hỏi xác nhận đúng đề xuất thay hỏi lại mở rộng mọi sự kiện.

Nguồn đọc lại: T:8;T:20;Q:53;G:6; bằng chứng QREV-0138;QREV-0139;QREV-0140;QREV-0141. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-066-02

Q&A WQA-066-02; Finding FND-0023; review finding tham chiếu REV-0086. Hash finding `97d179fd9aca9992ea41b67515cae30bbafb5960eabb85b0ab214dd1445927ee`.

Đối chiếu câu: KEEP; M-12/p33 mô tả tạo/dùng office và miễnphí; không chốt chính sách kết thúc/xóa tài khoản office. Không tự áp cách nghỉTalent sangoffice.

Nguồn đọc lại: M:15;M:33;M:13;Q:66; bằng chứng QREV-0153;QREV-0154;QREV-0155;QREV-0156. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-055-01

Q&A WQA-055-01; Finding FND-0026; review finding tham chiếu REV-0089. Hash finding `3cd7b20045402d84ec676334f7cff4a44e9966a86151b8b9bfb77708c8d1451e`.

Đối chiếu câu: KEEP; T-07 chỉ nêu hôm sau3chủđềmới, không chốt việc xem/dùng lại nháp cũ. QA55vẫn đềxuất. Không gộp dọn kho/phânquyềnxóa.

Nguồn đọc lại: T:11;T:14;Q:55; bằng chứng QREV-0157;QREV-0158;QREV-0159. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-065-01

Q&A WQA-065-01; Finding FND-0031; review finding tham chiếu REV-0094. Hash finding `01f6b753cd1330c772f7fdbcd495ec01a96279a862997afdc769dde1282a8514`.

Đối chiếu câu: REWRITE; M-03 có 要確認 về tạm giữ/traođổi trước từ chối. Không mặc định hệthống có chức năng hỏi thêm. Hỏi quy trình thực tế côngty cần trước.

Nguồn đọc lại: M:6;Q:65; bằng chứng QREV-0164;QREV-0165. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-065-02

Q&A WQA-065-02; Finding FND-0031; review finding tham chiếu REV-0094. Hash finding `01f6b753cd1330c772f7fdbcd495ec01a96279a862997afdc769dde1282a8514`.

Đối chiếu câu: REWRITE; Chặn email trùng theoYK2 chưa giải quyết đơn từ chối. Thu hẹp đúng email cũ; không hỏi lại nộp sau khi đã nghỉ ở69.

Nguồn đọc lại: Q:65;Y:644;M:6; bằng chứng QREV-0166;QREV-0167;QREV-0168. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-065-03

Q&A WQA-065-03; Finding FND-0031; review finding tham chiếu REV-0094. Hash finding `01f6b753cd1330c772f7fdbcd495ec01a96279a862997afdc769dde1282a8514`.

Đối chiếu câu: REWRITE; M-01/M-18 có một quyềnManager; không hỏi lại ai như cần phân quyền. Chỉ hỏi quyền nghiệp vụ có được đổi kết quả từchối, khác với nộplại đơnmới.

Nguồn đọc lại: M:4;M:21;M:6;Q:65; bằng chứng QREV-0169;QREV-0170;QREV-0171;QREV-0172. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

## IE-WQA-061-02

Q&A WQA-061-02; Finding FND-0008; review finding tham chiếu REV-0071. Hash finding `3d817eb90246141aeaf91251232e6170aa8914e2b3738127c5c0ee7c728fc0f4`.

Đối chiếu câu: SPLIT_FROM_WQA-061-01; Câu cũ gộp thông báo hủy và quyền dùng lại bài. Giữ ID này cho quyết định thông báo; phần dùng lại tiếp tục dưới061-02, không phải quyết định mới.

Nguồn đọc lại: M:11;T:19;Q:61; bằng chứng QREV-0104;QREV-0105;QREV-0106. Phụ thuộc câu: không có phụ thuộc câu cần bổ sung.

FACT: nguồn và review mô tả phần đã có/còn mở. INFERENCE: cần làm rõ đúng quyết định trong câu. ASSUMPTION: không dùng để tự chọn hành vi. PROPOSAL: câu hỏi là cách biên tập, chưa phải quyết định khách.

Không thay kết quả/chữ ký finding hoặc G5; quyết định loại/giữ ở đây là đánh giá câu hỏi. Chỗ mâu thuẫn với reasoning finding được ghi để reviewer xem lại, không kế thừa APPROVED cho câu.

