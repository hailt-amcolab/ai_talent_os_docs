> **Cập nhật23/11:** Bốn ID nội bộ đã có tại QA No.93–96; không còn câu độc lập trong bản xuất. Nội dung dưới là lịch sử; xem [bản chính](../qa-draft.md) và [đối chiếu](../../corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

# Kết quả lọc trùng toàn bộ QA hiện hành

Còn WQA-076-01 (ngoại lệ tâm sự nghiêm trọng, liên quan KS No.21/27/28) và WQA-066-02 (chỉ thời hạn giữ dữ liệu văn phòng). 24 câu vừa rút có lý do trong questions.csv và bảng cuối bản Q&A. Nội dung chi tiết đợt lọc trước dưới đây là lịch sử; trạng thái hiện hành lấy internal-evidence.csv. Chưa có content ACCEPT hoặc Independent Verification.

# Internal Evidence — lọc trùng QA mới

Tác giả: Codex. Không phải Independent Verification hoặc G7. Nội dung và review lịch sử trước sửa giữ trong changes.csv và các cột lịch sử của internal-evidence.csv.

<a id="ie-wqa-071-02"></a>

## WQA-071-02

- Trạng thái: TRACK_EXISTING_SOURCE_ITEM.
- Finding: FND-0002; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.71; QA No.84.
- Nguồn/vị trí: QA!A84:J84.
- EV: EV-0953.
- Lý do: Trùng trực tiếp câu đang mở No.84 về bước chuyển duyệt trong chế độ tự động..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-057-01"></a>

## WQA-057-01

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0003; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.57.
- Nguồn/vị trí: M19:16,23;BF19:17;GJ19:12.
- EV: EV-0601;EV-0608;EV-0629;EV-0645.
- Lý do: Manager có luồng sửa và AI kiểm lại; quyền Talent sửa chính bài đang bị chặn chưa rõ. Tác động: Tránh hai bên cùng xử lý một bài mà không rõ quyền; không hỏi lại việc Talent xác nhận bản Manager đã sửa..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-057-02"></a>

## WQA-057-02

- Trạng thái: RESOLVED_BY_SOURCE.
- Finding: FND-0003; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.57.
- Nguồn/vị trí: M19:16,23;BF19:17;GJ19:12.
- EV: EV-0601;EV-0608;EV-0629;EV-0645.
- Lý do: GJ19§12 nói Manager sửa không trả Talent; SD-M19 trang16 và BF19 trang17 có kiểm lại rồi đặt lịch..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-056-03"></a>

## WQA-056-03

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0006; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.56.
- Nguồn/vị trí: T19:17,18,22,30;BF19:7,8.
- EV: EV-0569;EV-0570;EV-0574;EV-0582;EV-0619;EV-0620.
- Lý do: Bài cần ảnh hoặc video để hoàn tất nhưng tư liệu có thể đến sau giờ dự kiến. Tác động: Chốt cách xử lý bài đến muộn; các bước duyệt hoặc kiểm tra từ cấm vẫn phải áp dụng nếu có..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-006-01"></a>

## WQA-006-01

- Trạng thái: WITHDRAWN_PENDING_SOURCE_CONFLICT.
- Finding: FND-0009; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.6; QA No.87;88.
- Nguồn/vị trí: QA!A87:J87;QA!A88:J88.
- EV: EV-0956;EV-0957.
- Lý do: No.87 trả lời gửi thông báo mọi Manager, No.88 nói assign để nhận thông báo; không tiếp tục câu hỏi giả định chắc chắn phải phân công theo Talent/nhóm. Ghi nhận mâu thuẫn nguồn để đối chiếu..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-006-02"></a>

## WQA-006-02

- Trạng thái: RESOLVED_BY_SOURCE.
- Finding: FND-0009; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.6; QA No.88.
- Nguồn/vị trí: QA!A88:J88.
- EV: EV-0957.
- Lý do: No.88 ghi mọi Manager phụ trách chung và Manager nào cũng cập nhật được; rút câu hỏi ai được xử lý thay. Không suy thêm quy tắc gửi thông báo từ câu này..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-054-01"></a>

## WQA-054-01

- Trạng thái: TRACK_EXISTING_SOURCE_ITEM.
- Finding: FND-0010; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.54; QA No.92.
- Nguồn/vị trí: QA!A92:J92.
- EV: EV-0961.
- Lý do: Phần thông tin bắt buộc để AI chạy đã nằm trong No.92 đang mở..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-076-01"></a>

## WQA-076-01

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0014; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.76.
- Nguồn/vị trí: BF19:14,18;M19:6,27;T19:16.
- EV: EV-0626;EV-0630;EV-0591;EV-0612;EV-0568.
- Lý do: Có quy tắc giới hạn chuyện ngoài đăng bài, nhưng đồng thời có đề xuất báo Manager khi Talent tâm sự nghiêm trọng. Tác động: Chốt ranh giới xử lý trước khi xây thông báo tâm sự nghiêm trọng; không mặc định AI được tư vấn các chủ đề này..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-063-01"></a>

## WQA-063-01

- Trạng thái: EXCLUDED_PRICING_BY_USER.
- Finding: FND-0022; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.63.
- Nguồn/vị trí: T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26.
- EV: EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627.
- Lý do: Rút theo yêu cầu người dùng: bỏ câu liên quan giá tiền, phí và chính sách thanh toán; không coi nghiệp vụ đã được trả lời..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-063-02"></a>

## WQA-063-02

- Trạng thái: EXCLUDED_PRICING_BY_USER.
- Finding: FND-0022; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.63.
- Nguồn/vị trí: T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26.
- EV: EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627.
- Lý do: Rút theo yêu cầu người dùng: bỏ câu liên quan giá tiền, phí và chính sách thanh toán; không coi nghiệp vụ đã được trả lời..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-063-03"></a>

## WQA-063-03

- Trạng thái: EXCLUDED_PRICING_BY_USER.
- Finding: FND-0022; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.63.
- Nguồn/vị trí: T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26.
- EV: EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627.
- Lý do: Rút theo yêu cầu người dùng: bỏ câu liên quan giá tiền, phí và chính sách thanh toán; không coi nghiệp vụ đã được trả lời..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-069-01"></a>

## WQA-069-01

- Trạng thái: RESOLVED_BY_SOURCE.
- Finding: FND-0024; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.69; QA No.78.
- Nguồn/vị trí: QA!A78:J78.
- EV: EV-0947.
- Lý do: No.78 đã hỏi cả trạng thái kết thúc sử dụng và trả lời chỉ báo email đã tồn tại. Rút câu hỏi dùng email cũ, không suy có đường đăng ký lại khác..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-037-01"></a>

## WQA-037-01

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0025; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.37.
- Nguồn/vị trí: T19:19;BF19:11,18;GJ19:14.
- EV: EV-0571;EV-0623;EV-0630;EV-0647.
- Lý do: Đề xuất dùng lần lượt video đã lưu, mỗi ngày một video, vẫn đang chờ xác nhận ở mục nguồn cũ. Tác động: Tiếp tục No.37 và KS 20261120 No.18, không tạo câu mới trùng quyết định..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-075-01"></a>

## WQA-075-01

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0028; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.75.
- Nguồn/vị trí: M19:6,8;BF19:14;GJ19:6,7.
- EV: EV-0591;EV-0593;EV-0626;EV-0639;EV-0640.
- Lý do: Đã rõ gửi người phụ trách; chưa rõ loại sự kiện nào cần thêm email. Tác động: Chốt kênh cho từng loại; nội dung email được rà bằng bộ mẫu riêng, tâm sự nghiêm trọng phụ thuộc WQA-076-01..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-075-02"></a>

## WQA-075-02

- Trạng thái: AWAIT_TEMPLATE_REVIEW.
- Finding: FND-0028; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.75.
- Nguồn/vị trí: M19:6,8;BF19:14;GJ19:6,7.
- EV: EV-0591;EV-0593;EV-0626;EV-0639;EV-0640.
- Lý do: GJ19§7/SD-M19 trang6: FCP chuẩn bị bộ mẫu chung màn hình/email để khách rà. Chuyển thành việc chuẩn bị/duyệt mẫu, không hỏi mở khách phải tự thiết kế nội dung email..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-075-03"></a>

## WQA-075-03

- Trạng thái: RESOLVED_BY_SOURCE.
- Finding: FND-0028; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.75.
- Nguồn/vị trí: M19:6,8;BF19:14;GJ19:6,7.
- EV: EV-0591;EV-0593;EV-0626;EV-0639;EV-0640.
- Lý do: SD-M19 trang1,6/BF19 trang14: gửi Manager phụ trách. Loại phân công/fallback vẫn No.6; không hỏi lại mọi Manager hay phụ trách..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-070-01"></a>

## WQA-070-01

- Trạng thái: TRACK_EXISTING_SOURCE_ITEM.
- Finding: FND-0001; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.70; QA No.83.
- Nguồn/vị trí: QA!A83:J83.
- EV: EV-0952.
- Lý do: Quyền dùng lại tư liệu đã được hỏi ở No.83 đang mở..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-070-02"></a>

## WQA-070-02

- Trạng thái: TRACK_EXISTING_SOURCE_ITEM.
- Finding: FND-0001; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.70; QA No.83.
- Nguồn/vị trí: QA!A83:J83.
- EV: EV-0952.
- Lý do: Tình huống thiếu tư liệu và tái sử dụng đã được hỏi ở No.83 đang mở..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-070-03"></a>

## WQA-070-03

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0001; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.70.
- Nguồn/vị trí: T19:12,13,17,18,27,30;BF19:6,7.
- EV: EV-0564;EV-0565;EV-0569;EV-0570;EV-0579;EV-0582;EV-0618;EV-0619.
- Lý do: Kỳ đăng có thể được đổi hoặc kết thúc trong khi đã có bài chuẩn bị theo chủ đề cũ. Tác động: Tránh bài thuộc chủ đề cũ tiếp tục xuất hiện sau khi kỳ đã đổi; phần kỹ thuật hủy lịch do team xử lý..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-059-01"></a>

## WQA-059-01

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0007; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.59.
- Nguồn/vị trí: M19:12;BF19:9;GJ19:17.
- EV: EV-0597;EV-0621;EV-0650.
- Lý do: Một lần đăng có thể thành công ở mạng này nhưng thất bại ở mạng khác; nguồn mô tả thao tác đăng lại ngay. Tác động: Tránh tạo bài trùng trên mạng đã thành công; giữ nguyên phần thời điểm đăng lại đã được nguồn mô tả..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-060-01"></a>

## WQA-060-01

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0008; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.60.
- Nguồn/vị trí: M19:15,21;BF19:19;KS:20261120:32.
- EV: EV-0600;EV-0606;EV-0631.
- Lý do: Nguồn mô tả hủy lịch cũ và chặn lịch mới khi dừng; chưa rõ kết quả đối với nội dung Talent tiếp tục chấp nhận. Tác động: Chốt số phận bài mới trong thời gian dừng; không hỏi lại việc hủy và không phục hồi các lịch cũ..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-061-01"></a>

## WQA-061-01

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0008; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.61.
- Nguồn/vị trí: T19:22,31;M19:12;BF19:9.
- EV: EV-0574;EV-0583;EV-0597;EV-0621.
- Lý do: Talent không có nút tự hủy; cần biết lịch đã bị Manager hủy. Tác động: Tránh Talent tiếp tục chờ một bài sẽ không đăng; không hỏi lại quyền hủy của Manager..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-061-02"></a>

## WQA-061-02

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0008; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.61.
- Nguồn/vị trí: T19:22,31;M19:12;BF19:9.
- EV: EV-0574;EV-0583;EV-0597;EV-0621.
- Lý do: Hủy lịch không tự trả lời nội dung bài có còn được dùng. Tác động: Phân biệt hủy lần đăng với loại bỏ nội dung, tránh tự phục hồi lịch cũ..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-077-01"></a>

## WQA-077-01

- Trạng thái: TRACK_EXISTING_SOURCE_ITEM.
- Finding: FND-0008; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.77.
- Nguồn/vị trí: M19:15,21;BF19:19;KS:20261120:32.
- EV: EV-0600;EV-0606;EV-0631.
- Lý do: SD-M19 trang21/BF19 trang19 mô tả hủy lịch và không phục hồi; KS20261120 No.32 đang chờ xác nhận. Không phát sinh câu hỏi trùng; chưa đóng quyết định khách..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-052-01"></a>

## WQA-052-01

- Trạng thái: RESOLVED_BY_SOURCE.
- Finding: FND-0011; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.52.
- Nguồn/vị trí: T19:5,6,8,9,11,26,33;BF19:4.
- EV: EV-0557;EV-0558;EV-0560;EV-0561;EV-0563;EV-0578;EV-0585;EV-0616.
- Lý do: SD-T19 trang8–9/BF19 trang4 đã mô tả đăng ký thanh toán xong tự cho phép sử dụng; không suy là mốc thu phí..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-074-01"></a>

## WQA-074-01

- Trạng thái: TRACK_EXISTING_SOURCE_ITEM.
- Finding: FND-0012; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.74.
- Nguồn/vị trí: M19:11,26;BF19:18.
- EV: EV-0596;EV-0611;EV-0630.
- Lý do: Danh sách năm nhóm đã có tại SD-M19 M-21 trang26; KS20261120 No.39 đang chờ xác nhận. Theo dõi tại mục nguồn này, không gửi câu trùng; chưa coi khách trả lời..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-073-01"></a>

## WQA-073-01

- Trạng thái: DEFER_TO_CONFIGURATION.
- Finding: FND-0015; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.73.
- Nguồn/vị trí: T19:12,13,16,27;M19:22.
- EV: EV-0564;EV-0565;EV-0568;EV-0579;EV-0607.
- Lý do: SD-M19 trang22: ba giờ chung là cấu hình vận hành. Không đòi giờ cố định để đóng phân tích; xác nhận cấu hình trước vận hành, không lấy giờ trong hình làm khách đã chốt..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-073-02"></a>

## WQA-073-02

- Trạng thái: DEFER_TO_CONFIGURATION.
- Finding: FND-0015; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.73.
- Nguồn/vị trí: M19:22;BF19:11;KS:20261120:20.
- EV: EV-0607;EV-0623.
- Lý do: SD-M19 trang22 mô tả3/7 là giá trị ban đầu chỉnh được; câu hỏi chính sách còn cần là có đếm ở chế độ tự động hay không (KS20261120 No.20), không hỏi lại con số cố định..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-002-01"></a>

## WQA-002-01

- Trạng thái: EXCLUDED_PRICING_BY_USER.
- Finding: FND-0018; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.2.
- Nguồn/vị trí: T19:20;BF19:12.
- EV: EV-0572;EV-0624.
- Lý do: Rút theo yêu cầu người dùng: bỏ câu liên quan giá tiền, phí và chính sách thanh toán; không coi nghiệp vụ đã được trả lời..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-062-02"></a>

## WQA-062-02

- Trạng thái: EXCLUDED_PRICING_BY_USER.
- Finding: FND-0018; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.62.
- Nguồn/vị trí: T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26.
- EV: EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627.
- Lý do: Rút theo yêu cầu người dùng: bỏ câu liên quan giá tiền, phí và chính sách thanh toán; không coi nghiệp vụ đã được trả lời..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-053-01"></a>

## WQA-053-01

- Trạng thái: EXCLUDED_PRICING_BY_USER.
- Finding: FND-0021; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.53.
- Nguồn/vị trí: T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26.
- EV: EV-0561;EV-0572;EV-0573;EV-0577;EV-0578;EV-0600;EV-0627.
- Lý do: Rút theo yêu cầu người dùng: bỏ câu liên quan giá tiền, phí và chính sách thanh toán; không coi nghiệp vụ đã được trả lời..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-066-02"></a>

## WQA-066-02

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0023; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.66.
- Nguồn/vị trí: T19:5,9,25,30;M19:10,17;BF19:20.
- EV: EV-0557;EV-0561;EV-0577;EV-0582;EV-0595;EV-0602;EV-0632.
- Lý do: Văn phòng dùng ứng dụng Talent nhưng được miễn phí tháng; chưa rõ vòng đời kết thúc và giữ dữ liệu. Tác động: Chốt ngoại lệ vòng đời văn phòng; không hỏi lại việc miễn phí hoặc cách đăng nhập đã được nguồn mô tả..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-055-01"></a>

## WQA-055-01

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0026; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.55.
- Nguồn/vị trí: T19:12,13,17,18,27,30;BF19:6,7.
- EV: EV-0564;EV-0565;EV-0569;EV-0570;EV-0579;EV-0582;EV-0618;EV-0619.
- Lý do: Ngày mới có đề xuất mới, trong khi nháp chưa chọn của ngày trước có thể còn giá trị. Tác động: Chốt vòng đời nháp; thời gian giữ cụ thể chỉ cần hỏi tiếp nếu cho phép dùng lại..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-065-01"></a>

## WQA-065-01

- Trạng thái: RESOLVED_BY_SOURCE.
- Finding: FND-0031; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.65.
- Nguồn/vị trí: T19:3,5,6,7;M19:7;BF19:3.
- EV: EV-0555;EV-0557;EV-0558;EV-0559;EV-0592;EV-0615.
- Lý do: GJ19§3 và SD-M19 trang7: đơn chờ không hạn; trao đổi qua email ngoài app theo BF19 trang3..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-065-02"></a>

## WQA-065-02

- Trạng thái: RESOLVED_BY_SOURCE.
- Finding: FND-0031; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.65.
- Nguồn/vị trí: T19:3,5,6,7;M19:7;BF19:3.
- EV: EV-0555;EV-0557;EV-0558;EV-0559;EV-0592;EV-0615.
- Lý do: SD-M19 trang7 mô tả đơn sau từ chối tiếp nhận/thông báo như đơn mới; không thêm điều kiện hoặc hạn tùy ý..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-065-03"></a>

## WQA-065-03

- Trạng thái: DRAFT_UNAPPROVED.
- Finding: FND-0031; hash `6c6da7d8f898fa7b67a2bdd69ebe454dd56fd1183d63cf098420ec66d3cb0509`.
- QA: No.65.
- Nguồn/vị trí: T19:3,5,6,7;M19:7;BF19:3.
- EV: EV-0555;EV-0557;EV-0558;EV-0559;EV-0592;EV-0615.
- Lý do: Đã có luồng nộp lại thành đơn mới; chưa có yêu cầu rõ về sửa kết quả trên đơn cũ. Tác động: Chỉ giữ nếu công ty cần thao tác sửa quyết định; không hỏi lại quyền nộp lại đã được nguồn mô tả..
- Giới hạn: QA mới có SHA-256 `c7f6d048be795ad2b44e7ce7a560da8a7b7477b8b8855adbb533c4425deeaeda`; bằng chứng QA hash cũ không được kế thừa. NOT_REVIEWED; không tự xác nhận khách hoặc ký review.

<a id="ie-wqa-081-01"></a>

## WQA-081-01

Finding FND-0049, nguồn: QA!A81:J81, No.81; SD-T19 trang PDF10, T-07; QA No.23; EV: EV-0950;EV-0562.

FACT: No.81 trả lời có thao tác hủy kết nối; SD-T19 trang10 quy định một tài khoản cho mỗi SNS và có kết nối lại.

INFERENCE: Lịch đã có và tài khoản SNS thay đổi có thể không còn cùng đích đăng; đây là tình huống giả định cần xác định chính sách, chưa phải lỗi đã quan sát.

PROPOSAL: ĐỀ XUẤT CỦA ĐỘI — CHƯA CHỐT: chặn ngắt kết nối/đổi tài khoản của đúng SNS còn lịch đăng; hiển thị lịch liên quan và hướng dẫn liên hệ Manager xử lý trước. Không chặn các SNS khác không có lịch. Không coi cách này xử lý được việc mất kết nối ngoài ứng dụng; phần đó do team thiết kế.

Giới hạn: chưa content ACCEPT, chưa Independent Verification, chưa quyết định khách; chỉ là ứng viên được người dùng yêu cầu ghi.

<a id="ie-wqa-013-01"></a>

## WQA-013-01

Finding FND-0050, nguồn: QA!A14:J14, No.13; SD-M19 trang PDF23, M-18; SD-T19 trang PDF17–18, T-12; GJ19§12; QA No.57/71/90; EV: EV-0884;EV-0608.

FACT: SD-M19 trang23 cho thêm/sửa/xóa danh sách chung và kiểm bài khi Talent chấp nhận; GJ19§12 mô tả kiểm lại bản Manager sửa.

INFERENCE: Bài sạch theo danh sách cũ có thể chứa từ mới bị cấm; hiệu lực hồi tố và người tiếp nhận xử lý chưa được xác nhận.

PROPOSAL: CHƯA ĐỀ XUẤT CHỐT HÀNH VI: cần khách xác định hiệu lực của danh sách mới và trách nhiệm xử lý. Không mặc định Manager đã duyệt thì bài được miễn kiểm tra mới; cũng không tự buộc Talent xác nhận lại bản Manager sửa, vì GJ19§12 đã mô tả không cần trả lại Talent.

Giới hạn: chưa content ACCEPT, chưa Independent Verification, chưa quyết định khách; chỉ là ứng viên được người dùng yêu cầu ghi.
