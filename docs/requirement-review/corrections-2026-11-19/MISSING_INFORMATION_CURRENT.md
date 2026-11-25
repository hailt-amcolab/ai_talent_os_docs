> **Hiện hành — nguồn24/11, kiểm25/11/2026:** 23 tệp; QA đủ5sheet, KS đủ5sheet. YK3 bản0.3 và14slide EXT24; KS24 trùng byte KS đang sống. QA No.101 xác nhận agent/DB/backup; actionKS No.16 ghi Square sau họp. CR hiện hành01–14 đổi nghĩa so với snapshot cũ. [Kết quả, phần còn mở và tác động](DELIVERY_24112026_REVIEW.md). G1 BLOCKED, phần phụ thuộc G2–G4 STALE, G5/G6 BLOCKED; chưa cấp G7/G8 PASS. Những thông báo “hiện hành” cũ bên dưới là lịch sử ở phần đã thay.

**Cập nhật cụ thể24/11:** không hỏi lại agent/DB/backup (QA101), nơi giữ đồng ý phụ huynh (KS20261122 No.17), AI sửa không xác nhận lại (No.3), không làm ảnh AI (No.9). Tiếp tục ranking tại QA100; Square được thuật lại chọn sau họp, năng lực thuộc đội/provider. CR05/07/08/09 vẫn chờ, độ dài/chất lượng và sốảnh video vẫn確認61/62. Các mục thiếu cũ bên dưới chưa được tái xác minh toàn bộ.

> **Hiện hành — đợt23112026:** Có 20 tệp nguồn; đã đọc bốn tệp mới gồm 52 trang PDF và DOCX 356 đoạn. UI-M20 lập20/11; báo cáo/slide lập22/11 để chuẩn bị24/11. TikTok nháp, xác nhận lại bài AI sửa, ranking, lưu đồng ý phụ huynh và pilot là các đề nghị chưa được duyệt phạm vi. [Kết quả, locator và giới hạn](DELIVERY_23112026_REVIEW.md). G1 BLOCKED chờ duyệt phạm vi; G2–G4 STALE ở nhánh bị ảnh hưởng, G5/G6 BLOCKED; chưa có G7/G8 PASS. Các đợt trước giữ làm lịch sử.

> **Hiện hành — tiếp nhận23/11/2026:** đã rà QA đủ5sheet và KS đủ3sheet, so với kiểm kê20/11. QA thêm No.93–99; No.87/88 mở lại; KS thêm18ô quyết địnhK và33ô trả lời ở20261120. [Kết quả và giới hạn](QA_KS_UPDATE_2026-11-23.md). Bốn câu nội bộ đã có tại No.93–96, không xuất câu hỏi trùng. G1 BLOCKED chờ duyệt snapshot mới; G2–G4 STALE, G5/G6 BLOCKED; chưa cấp G7/G8 PASS. Các số liệu/phát biểu hiện hành20/11 bên dưới là lịch sử cho phần bị thay.

# Thông tin còn thiếu — bản hiện hành sau sửa

**Đã đối chiếu nguồn19/11/QA20/11.** Các kết luận còn thiếu bên dưới chỉ áp dụng phần chưa được nguồn mới giải đáp. Xem [phân tuyến từng câu và nguồn mới](NEW_DELIVERY_IMPACT.md) và chỉ mục30luồng hiện hành. Không hỏi lại H65, tự kích hoạt sau đăng ký phương thức, đơn chờ không hạn, đườngoffice dùng app, hay Manager sửa từcấm có cần trảTalent xác nhận.

> **Đã giải quyết số lượt — DEC-0001:** không giới hạn số lần AI viết lại. Không hỏi lại H65 hoặc cách đếm để chặn lần3; xử lý lỗi/gửi lặp còn là việc đội. Các mục khác dưới đây giữ phạm vi riêng.

Không phải Q&A mới; phần có nguồn và phần chưa chốt đã được tách. Snapshot extraction cũ giữ nguyên.

- **REQ-0004 — Đăng nhập bằng email và mật khẩu:** Cơ chế đăng nhập có mô tả; giới hạn và thời gian phiên trong chương 6 vẫn là giả định, không tự lấy Close No.25 để xác nhận toàn bộ. Nguồn: Y:591-598; K:2; T:6.
- **REQ-0007 — Chính sách mật khẩu và khóa đăng nhập:** Các số là giả định FutureCore; câu trả lời No.25 ngày 15/11 là hướng thiết kế của đội, không phải quyết định khách mới. Nguồn: Y:583; Y:593-594; Y:609; Q:26.
- **REQ-0008 — Giữ phiên và tiếp tục trên thiết bị mới:** Tiếp tục dữ liệu trên máy mới được khách OK; 30 ngày vẫn là giá trị giả định chương 6. Tách phê duyệt hai ý. Nguồn: Y:597; K:114.
- **REQ-0009 — Cách ly dữ liệu từng Talent:** Quyền chỉ xem kết quả cá nhân có OK; bảo đảm cách ly hội thoại/đồng thời được YK2 mô tả nhưng chưa có phê duyệt riêng toàn bộ. Nguồn: Y:598-601; K:91.
- **REQ-0010 — Hướng dẫn khởi tạo và tiếp tục khi gián đoạn:** Thứ tự trong YK2 khác thứ tự trình bày SD; bước bắt buộc là thanh toán theo KS; đường vào app còn 要確認 (cần xác nhận). Nguồn: Y:603-605; T:8.
- **REQ-0013 — Manager đăng nhập xác thực hai bước:** Nguồn mô tả rõ nhưng không lấy lựa chọn kỹ thuật TOTP-only của nội bộ làm xác nhận khách. Nguồn: Y:608-609; M:4.
- **REQ-0014 — Hết phiên quản trị khi không thao tác:** 30 phút là giả định chương 6, chưa có quyết định khách riêng. Nguồn: Y:583; Y:610; M:4.
- **REQ-0015 — Thêm hoặc vô hiệu hóa Manager:** Chặn tự vô hiệu hóa và Manager cuối; khôi phục khi mất xác thực: QA No.67. Hành vi vô hiệu hóa được KS xác nhận; thêm người chỉ mô tả. Nguồn: Y:611; Y:490; K:115; M:21.
- **REQ-0016 — Quyền Manager và ngăn Talent vào quản trị:** KS tiền đề nút dừng toàn bộ chưa OK; QA No.77 còn mở. Close No.5 ngày 15/11 là lựa chọn thiết kế của đội. Nguồn: Y:612-613; Q:6; M:4.
- **REQ-0020 — Điều kiện chuyển từ chưa dùng sang đang dùng:** SD-T19 trang8–9 đã mô tả tự cho phép sử dụng sau đăng ký phương thức; không hỏi lại lựa chọn tự chuyển. Mốc bắt đầu thu phí vẫn No.53, độc lập trạng thái. Nguồn: Y:615-616;Q:52;M:13;Q:53.
- **REQ-0022 — Tra cứu nhật ký xem bất biến:** Nhật ký cần ghi đã được xác nhận; bộ lọc và tính bất biến là mô tả yêu cầu/chỉ dẫn thiết kế, chưa có xác nhận khách riêng. Nguồn: Y:621; Q:22; M:22.
- **REQ-0024 — Không nhận đăng ký trùng email:** Đơn sau từ chối nộp mới đã có ởSD-M19 trang7; chỉ giữ thay kết quả chính đơn từ chối và đăng ký lại sau nghỉ/xóa dữ liệu tại No.65/69. Nguồn: Y:644; Q:65; Q:69.
- **REQ-0027 — Xác nhận đích trước khi ghi thông tin:** Chưa có quyết định khách riêng về bước xác nhận và tình huống ghi đè/đồng thời. Nguồn: Y:647-648.
- **REQ-0029 — Phản ánh ngay mục tiêu vừa sửa:** Chưa có xác nhận riêng tiêu chí tức thời hoặc tính toán phần trăm. Nguồn: Y:651; M:13.
- **REQ-0034 — Danh sách Talent và bộ lọc:** SD có thêm lọc category/người phụ trách và office trong cùng danh sách; QA No.6/66 còn mở cho chi tiết. Nguồn: Y:657-658; M:9.
- **REQ-0035 — Cá nhân hóa từ hồ sơ và kết quả:** Chưa có tiêu chí đánh giá mức cá nhân hóa hoặc phân xử các chỉ thị mâu thuẫn đầy đủ. Nguồn: Y:560-562; Y:661-662; K:15; K:19.
- **REQ-0036 — Ưu tiên chỉ thị nghiệp vụ của công ty:** Không ghi nhận thiếu thông tin trực tiếp cho mệnh đề này; chi tiết/AC chưa được đánh giá ở bước extraction. Nguồn: Y:523; Y:662; K:19.
- **REQ-0037 — Dùng lịch sử để cải thiện lần sau:** Quy tắc kiểm soát nội dung AI ghi thêm và hiệu lực khi Manager sửa chưa rõ. Nguồn: Y:678-679; Y:561.
- **REQ-0038 — Giới hạn chủ đề hội thoại:** KS xác nhận23 ghi cần giới hạn nhưng không rõ giới hạn lượt hay chủ đề; QA No.76 còn mở. Không tự coi chat không giới hạn là đã chốt. Nguồn: Y:670-672; K:56; Q:76; T:13.
- **REQ-0040 — Hội thoại bằng chữ và xem lịch sử:** Giới hạn 1.000 ký tự tách thành quy tắc PARTIAL, không thuộc phạm vi xác nhận của dòng này. Nguồn: Y:664; Y:667; K:44.
- **REQ-0041 — Xử lý AI tạm không hoạt động:** Chưa mô tả chi tiết thời gian chờ, giữ nội dung hoặc kết quả không rõ. Nguồn: Y:668.
- **REQ-0043 — Chúc mừng khi đăng bài và báo chuỗi ngày:** Cách đếm chuỗi ngày còn để quyết khi vận hành; QA No.72. Nguồn: Y:666; K:47; K:55.
- **REQ-0044 — Hiển thị chi phí AI theo Talent và tháng:** Không dùng lựa chọn thiết kế No.17 ngày 15/11 để xác nhận khách đã chốt toàn bộ quy tắc chi phí. Nguồn: Y:688-689; Q:18.
- **REQ-0045 — Tổng kết bài hôm trước và gợi ý cải thiện:** Lịch cụ thể và xử lý thiếu kết quả chưa hoàn chỉnh; không cố định 8:00 từ mô tả cũ. Nguồn: Y:681; K:47.
- **REQ-0047 — Chúc mừng đạt thử thách:** Cách xác định đạt và trạng thái thử thách: QA No.72. Nguồn: Y:686; K:90; Q:72.
- **REQ-0048 — Tổng kết tuần:** Chưa có xác nhận riêng thứ Hai và xử lý thiếu dữ liệu. Nguồn: Y:683; K:47.
- **REQ-0049 — Nhắc Talent lâu không đăng và báo Manager:** KS nói số ngày sẽ xác nhận sau; không coi 3 ngày/7 ngày là giá trị đã chốt. Nguồn: Y:674-676; K:52.
- **REQ-0052 — Nội dung bài nháp và giới hạn dùng chung SNS:** Ghi chú KS xác nhận24 nói tạo văn bản/hashtag theo ảnh; cách hiểu ảnh→bài đang được hỏi No.70, không tự chốt toàn bộ cơ chế. Nguồn: Y:693-695; K:60; Q:70.
- **REQ-0056 — Không chấp nhận bài không có tư liệu:** KS xác nhận26 còn để xác nhận ngày không nhận tư liệu trong chế độ kiểm tra; giữ riêng giới hạn nút và quy tắc ngày không tư liệu. Nguồn: Y:701; T:14; K:62.
- **REQ-0057 — AI kiểm từ cấm theo ngữ cảnh:** SD-T18 p22 đã vẽ chấp nhận → kiểm từ cấm → duyệt công việc khi Talent xin duyệt → đặt lịch; SD-M18 p29 có Manager sửa → đặt lịch. GJ19§12/SD-M19 trang16 đã mô tả không trả Talent xác nhận bảnManager sửa; chỉ quyền Talent sửa chính bài bị chặn chưa rõ, và giao điểm kiểm/duyệt ở chế độ tự động; tiếp tục No.57/71. Không coi mọi thứ tự đều chưa mô tả. Nguồn: Y:704-706;K:24;K:59;Q:14;Q:41;Q:57;M:14;Y:704-705;M:29;T:22;Q:71.
- **REQ-0059 — Xem trước hình và chữ của bài:** Chưa có xác nhận riêng về độ giống bài thực trên từng SNS. Nguồn: Y:708; T:14.
- **REQ-0060 — Gửi ảnh hoặc video từ thiết bị:** Định dạng, dung lượng và quy tắc chọn nhiều file chưa chốt. Nguồn: Y:711; T:15.
- **REQ-0061 — Phản hồi lỗi gửi tư liệu:** Giới hạn cụ thể, khôi phục gửi dở và chống trùng chưa mô tả; không tự thêm từ technical spec. Nguồn: Y:712-713.
- **REQ-0062 — Lưu và dùng lại tư liệu trên OneDrive:** QA No.8 còn mở cho chia sẻ file và giới hạn dung lượng; yêu cầu lưu OneDrive có trong YK2 nhưng không suy quyết định kỹ thuật đã duyệt. Chủ đề/nháp chưa chấp nhận và tư liệu chưa dùng còn vấn đề thời hạn tại QA No.55. Nguồn: Y:716-717; Y:813; Q:9; T:15; Q:55.
- **REQ-0063 — Tạo bài theo thứ tự video tự làm đã lưu:** KS xác nhận32 chưa OK; QA No.37 vẫn Open; không coi đây là chức năng đã chốt. Nguồn: Y:369; Y:717; K:73; Q:38; T:15.
- **REQ-0064 — Nhắc gửi tư liệu:** Giá trị ban đầu và liên hệ ba khung giờ/chế độ tự động chưa xác nhận đầy đủ. Nguồn: Y:719-720; K:47.
- **REQ-0066 — Hiển thị chi phí trước khi tạo video:** Đơn giá thực, nơi cài đặt và thay giá giữa kỳ chưa chốt: QA No.2/62. Nguồn: Y:724; K:67; K:68; T:16; Q:3; Q:62.
- **REQ-0068 — Video thất bại không tính lượt:** Hành vi có trong nguồn, nhưng QA No.1 là thông báo cách đội thiết kế; thời điểm hoàn/trừ lượt chưa chốt No.62. Nguồn: Y:726; Y:637; Q:2; T:17.
- **REQ-0069 — Định dạng video dọc dùng chung ba SNS:** Chưa chốt độ dài, độ phân giải, codec từ khách; không lấy thông số nhà cung cấp làm yêu cầu khách. Nguồn: Y:728; Y:576; T:16.
- **REQ-0070 — Xem và quyết định dùng video:** Các thao tác được mô tả; cách hủy/xóa/tính lượt khi lỗi chưa đủ. Nguồn: Y:730; Y:544; T:17.
- **REQ-0072 — Manager bật yêu cầu duyệt theo Talent:** Bật tính năng theo Talent được OK; phạm vi diễn giải xác nhận33 và tác động chế độ tự động còn hỏi No.76/71. Nguồn: Y:735-736; K:74; K:75; K:76; T:14; M:7.
- **REQ-0075 — Phân người nhận yêu cầu duyệt:** Đã chốt phân theo phụ trách; chưa chọn category hay từng Talent, chưa có fallback khi trống/vắng; QA No.6. Nguồn: Y:234; K:77; K:93; Q:7; G:7; M:5.
- **REQ-0076 — Đăng ký Talent ở dịch vụ đăng bài:** Thời điểm đăng ký: lúc duyệt, đăng ký thanh toán hay trạng thái đang dùng chưa rõ; không lấy code/demo suy ra. Nguồn: Y:741; Q:52; T:9.
- **REQ-0078 — Cơ chế trang kết nối và hạn dùng:** Đội/FutureCore đối chiếu màn riêng48 giờ với đường SNS trực tiếp và xác định phạm vi thời hạn thật. Chỉ trình khách nếu có thay đổi hành vi/quyền dùng cần thẩm quyền; không dùng technical spec để tự xác nhận hoặc phục hồi FND-0033 bị REJECT. Nguồn: Y:304;Y:742-743;T:9.
- **REQ-0080 — Đăng cùng nội dung và lưu kết quả từng SNS:** Cùng nội dung và bỏ YouTube khi không video được KS OK; kết quả/trạng thái đầy đủ và SNS thành công một phần chưa chốt No.51/59. Nguồn: Y:747-750; K:57; K:82; M:11.
- **REQ-0083 — Định nghĩa chống khóa tài khoản:** Chưa xác định nội dung/hạn chế cụ thể; không khôi phục trần cũ để tự điền. Nguồn: Y:752; Y:887; K:83.
- **REQ-0085 — Không tự đăng lại khi thất bại:** Không tự đăng lại được nguồn mô tả nhưng bản Close No.15 là hướng đội thiết kế; đối tượng SNS lỗi, giờ và thao tác đang hỏi No.59. Nguồn: Y:755; Q:16; T:18; M:11; Q:59.
- **REQ-0086 — Thông báo kết nối SNS bị mất:** Chưa mô tả phân biệt hết hạn quyền/tạm lỗi và bài đã lên lịch. Nguồn: Y:757; T:9.
- **REQ-0087 — Dừng và mở lại đăng tự động theo Talent:** Tác động đến bài được chấp nhận trong lúc dừng và sau mở lại chưa rõ: QA No.60/61. Nguồn: Y:761; Q:13; M:13; Q:60.
- **REQ-0088 — Dừng toàn bộ và hủy lịch đang có:** Tiền đề UC-08-6 chưa OK, không có ghi chú; SD vẫn 要確認 (cần xác nhận); QA No.77. Không tự CONFIRMED. Nguồn: Y:759-760; Y:415; K:85; Q:77; M:19.
- **REQ-0089 — Manager xem và hủy bài đã đặt lịch:** Quyền hủy từ quản trị được KS xác nhận; bộ trạng thái, thông báo và khôi phục bài hủy chưa chốt No.51/61. Nguồn: Y:763-764; K:84; Q:17; M:11; Q:61.
- **REQ-0090 — Tạo và dùng tài khoản công ty:** SD-M18 p15 đã có tên và email đăng nhập khi tạo office, p9 có office cùng danh sách Talent, p33 có Manager dùng app và nối SNS. No.66 vẫn mở về xác nhận phạm vi, trạng thái/ngừng/xóa, điều kiện email/trùng tài khoản; không mô tả các trường/actor/list này như hoàn toàn chưa có. Nguồn: Y:631;K:108;K:113;M:15;K:109;M:9;M:33;Y:767;Q:66.
- **REQ-0092 — Đường thao tác tài khoản công ty:** Đã có mô tả app, người nối SNS, email và danh sách tại SD-M18 p9/p15/p33. Chỉ giữ phần xác nhận cuối đường thao tác và vòng đời office còn mở No.66; không tự đóng câu hỏi bằng tài liệu màn. Nguồn: Y:767;K:109;K:110;Q:21;Q:44;Q:66;M:33;T:23;M:30;M:9;M:15.
- **REQ-0094 — Ghi kết quả để AI đọc lần sau:** Chưa có mẫu dữ liệu/tiêu chí hoàn tất ghi trong nguồn đã xác nhận. Nguồn: Y:774;K:15;Y:821;M:30.
- **REQ-0095 — Hiển thị follower và tiến độ từng SNS:** Mục tiêu từng SNS được xác nhận; cách tổng hợp và mốc dữ liệu hiển thị cần chi tiết. Nguồn: Y:776; K:25; T:10; M:10.
- **REQ-0097 — Hiển thị kết quả và chuỗi ngày:** Cách đếm chuỗi và xử lý thiếu dữ liệu chưa đủ; QA No.72. Nguồn: Y:778; Q:32; T:10.
- **REQ-0098 — AI chọn giờ đăng từ chỉ thị và kết quả:** Quyền AI chọn theo chỉ thị đã chốt; ngưỡng đủ dữ liệu/thời điểm chốt giờ/bài đến trễ chưa chốt QA No.56. Nguồn: Y:406; Y:780-781; K:66; Q:56; G:1.
- **REQ-0099 — Lấy dữ liệu khung giờ tương tác nếu có:** Không khẳng định mọi SNS hỗ trợ; chưa có quyết định final về trường thay thế. Nguồn: Y:783.
- **REQ-0102 — Chu kỳ thu theo ngày đăng ký:** QA No.4/49/53: cổng chính thức, ngày bắt đầu, chu kỳ tháng và phí video biến động; không chốt theo tháng dương lịch hay ngày thanh toán. Nguồn: Y:625; K:104; K:105; Q:50; Q:53; G:6.
- **REQ-0103 — Báo khi thu tiền không thành công:** Cột I xác nhận48 chủ yếu hỏi cổng; trạng thái dừng vì chưa trả và nợ kỳ sau còn mở QA No.63. Nguồn: Y:626; Y:457; K:104; Q:47; Q:63.
- **REQ-0104 — Phí tháng khi nghỉ giữa kỳ:** Khách ghi thu một tháng tại G106; chi tiết kỳ theo ngày đăng ký và diễn giải No.76 chưa trả lời, không tự chốt cách tính kết thúc kỳ. Nguồn: Y:469; K:106; Q:76; T:20.
- **REQ-0107 — Tính lượt video khi gửi yêu cầu và làm lại:** QA No.1 đóng bằng cách đội thiết kế theo YK2; chưa dùng Close đó làm xác nhận khách riêng, thời điểm hoàn/trừ No.62 còn mở. Nguồn: Y:636-637; Q:2.
- **REQ-0108 — Thu video từ lượt đầu và không miễn phí:** Từ lượt đầu/video tự làm được KS OK; bỏ miễn phí/trần có trong nguồn và QA thông báo cách làm, chưa đối chiếu SOW độc lập. Nguồn: Y:541; K:67; K:70; Q:4.
- **REQ-0109 — Tổng hợp và hiển thị phí tháng với phí video:** Quyền xem được OK; chu kỳ và khả năng thu tiền biến động chưa chốt No.4/49. Nguồn: Y:638-639; K:107; K:105; T:20.
- **REQ-0111 — Thông báo trong app và đến thiết bị được phép:** Không cản dùng khi từ chối đã chốt; cơ chế đẩy và toàn bộ nội dung/routing chưa xác nhận theo nguồn khách. Nguồn: Y:786-788; K:42; T:19.
- **REQ-0113 — Màn đầu cho biết việc cần làm:** YK2 §6-12 và SD-T18 mô tả Home là màn đầu; §6-14 dùng My Page làm nơi điều hướng, chưa đủ căn cứ coi đây là hai yêu cầu mâu thuẫn. Bố cục chưa có xác nhận riêng của khách. Nguồn: Y:794; Y:799; T:11; T:10.
- **REQ-0114 — Manager quản lý danh sách thông báo:** KS xác nhận46 ghi lọc chưa xử lý; diễn giải ẩn/hiện đã xử lý đang hỏi No.76. Không coi mọi thông báo gửi mọi Manager. Nguồn: Y:790-791; K:98; M:5.
- **REQ-0115 — Gửi email thông báo cho Manager:** Loại thông báo, ai nhận và nội dung email chưa chốt; QA No.75. Nguồn: Y:449; K:97; Q:75; M:5.
- **REQ-0117 — Tự động tạo và đăng bài trong kỳ:** Hành vi khung đã quyết; số bài, ghép tư liệu–bài, thời điểm tạo, đổi/dừng giữa kỳ, hết tư liệu, kiểm từ cấm/duyệt chưa chốt: QA No.70/71. Nguồn: K:61;K:62;G:1;T:12;T:23;M:33;M:30.
- **REQ-0118 — Điều chỉnh nhịp tạo bài bằng chỉ thị AI:** Đây là định hướng kèm việc phải đề xuất, không phải tần suất cố định đã hoàn tất xác nhận. Nguồn: K:47;K:48;G:1;T:11;T:23;M:33;M:30.
- **REQ-0120 — Thời điểm và tiến độ thử thách:** Đã có ý tưởng tổng thể ở KS G27, gồm AI dựa dữ liệu SNS/hoạt động, Talent báo cáo khi thiếu dữ liệu và Manager thêm/sửa; không yêu cầu khách viết lại như chưa cung cấp. Cần đối chiếu ý tưởng với I27/GJ §2 và CR-22 để tách tiêu chí đạt/nguồn đánh giá/phạm vi chưa được chốt; No.72 và FND-0016 NEED_MORE_EVIDENCE giữ nguyên. Nguồn: K:27;G:2;Q:72;T:13;CR:23.
- **REQ-0121 — Quản lý category và gán Talent:** Việc có category và thêm/sửa được quyết; toàn bộ chi tiết nhiều nhóm/xóa/sắp xếp và tác động thương mại cần phân biệt, không xác nhận trọn gói từ một OK. Nguồn: Y:451; K:99; Q:45; M:16.
- **REQ-0125 — Màn nhập thông tin Talent cho AI:** SD-M18 p23/p30 đã mô tả nhập/xem/sửa qua quản trị hoặc ChatGPT, lưu vào thư mục Talent trên OneDrive và không sửa file trực tiếp. Các trường dự kiến có 要確認 (cần xác nhận); tiêu chí đủ hồ sơ ở No.54 và đồng bộ do đội thiết kế. No.74 chưa tự đóng; không coi thiếu toàn bộ đường cập nhật. Nguồn: K:30;Q:74;M:23;M:30;M:33;T:23.
- **REQ-0126 — Khôi phục Manager khi mất thông tin đăng nhập:** Màn SD-M18 có liên kết quên mật khẩu nhưng không đủ giải quyết toàn bộ No.67; không tự đưa quy trình nội bộ thành yêu cầu. Nguồn: Q:67; M:4.
- **REQ-0127 — Không ảnh hưởng ứng dụng Instagram DM đang chạy:** Ranh giới chia sẻ máy chủ/tài khoản/SNS chưa trả lời No.24; không quyết định từ .env hoặc demo. Nguồn: Y:871; Q:25.
- **REQ-0128 — Bộ trạng thái bài và chuyển trạng thái:** Chưa có danh sách chuyển trạng thái cuối sau chế độ tự động; hình cũ đã xem trực quan nhưng không coi là enum cuối. Nguồn: Y:504-507; Q:51; Q:70; Q:71; T:18; M:11; F:505.
- **REQ-0129 — Bộ trạng thái video, kết nối và thanh toán:** Không lấy enum từ DB/SCD để điền thiếu của khách. Nguồn: Y:507; Q:29; Q:51.
- **REQ-0130 — Manager tự đổi cấu hình không cần phát triển:** Phạm vi chung được mô tả; giá trị/thẩm quyền/ngày hiệu lực từng cấu hình chưa đầy đủ, xem No.62/73/77. Nguồn: Y:569-571; K:46; Q:42; M:20.
- **REQ-0131 — Ghi nhật ký thao tác và xử lý:** Thời hạn giữ log chưa chốt; QA No.29 xác định là việc đội thiết kế, không phải hỏi nghiệp vụ mới. Nguồn: Y:882-885.
- **REQ-0132 — Cô lập phần lỗi dịch vụ ngoài:** Chưa mô tả chính xác phạm vi ảnh hưởng từng dịch vụ và khôi phục. Nguồn: Y:879.
- **REQ-0133 — Danh mục thông báo sự kiện:** Nội dung, người nhận theo phân công và email chưa hoàn chỉnh; tạo video xong và hết hạn duyệt có mô tả ở chỗ khác, không tự coi con số17 là danh mục cuối. Nguồn: Y:796; Y:981-1054; K:97; Q:75.
- **REQ-0134 — Thông báo tải dữ liệu, lỗi và rỗng:** Chưa có ma trận trạng thái màn và thông điệp cuối từ khách. Nguồn: Y:801.
- **REQ-0135 — Tên, logo và thiết kế nhân vật:** Chưa có tài sản thương hiệu cuối/phê duyệt màn; chọn nhân vật còn là ý xem xét, không thêm chức năng chọn mascot. Nguồn: Y:798-800; Y:1191; Q:27; Q:31.
- **REQ-0136 — Môi trường Talent trên smartphone:** Chưa có ma trận thiết bị/trình duyệt được xác nhận; thông số iOS là điều nguồn nói, không phải kiểm chứng nền tảng mới. Nguồn: Y:868.
- **REQ-0138 — Quy mô tăng trưởng và hoàn tất xử lý theo giờ:** 30/tăng10/sớm100 là kế hoạch được OK; chưa có tải đồng thời/SLA hoặc số kiểm hiệu năng cuối. Không suy1000 là nghiệm thu giai đoạn1. Nguồn: Y:873-876; K:5.
- **REQ-0139 — Tách môi trường sản xuất và thử nghiệm:** Chi tiết hạ tầng nội bộ không làm bằng chứng khách duyệt môi trường. Nguồn: Y:870.
- **REQ-0140 — Giờ hoạt động và sao lưu:** Đây là việc đội thiết kế và trình bày, không tạo Customer Q&A hoặc tự đặt SLA. Nguồn: Y:878; Y:880; Q:30.
- **REQ-0141 — Bảo vệ dữ liệu và thông tin kết nối:** Chưa có phạm vi dữ liệu/tiêu chí mã hóa được khách xác nhận; không lấy lựa chọn trong technical spec làm yêu cầu. Nguồn: Y:894-895.
- **REQ-0142 — Giảm dữ liệu đưa vào AI và không dùng huấn luyện:** Cần bằng chứng thiết lập nhà cung cấp theo phạm vi, không khẳng định đã kiểm chứng chỉ từ tài liệu. Nguồn: Y:841; Y:896.
- **REQ-0145 — Chỉ dùng dữ liệu Talent thật khi có đồng ý bằng văn bản:** Chưa có bản cho phép dữ liệu thật trong bộ nguồn, không tự coi đã được cấp. Nguồn: Y:901.
- **REQ-0146 — Hợp đồng dịch vụ và tài khoản thử do công ty chuẩn bị:** Tên/gói/khả năng chính thức cần đối chiếu; không lấy cấu hình môi trường thực làm quyết định khách. Nguồn: Y:831; Y:862; Y:974-975.
- **REQ-0147 — Dịch vụ dự kiến và phương án thay thế:** Đây là giả định dịch vụ trong nguồn, không phải tất cả nhà cung cấp đã được khách chốt hoặc đã kiểm chứng. Nguồn: Y:832-861; Q:5.
- **REQ-0148 — Không bảo đảm khả năng tuyệt đối của dịch vụ và AI:** Đây là giới hạn nêu trong yêu cầu, chưa thay bằng điều khoản hợp đồng ký độc lập. Nguồn: Y:903-905.
- **REQ-0149 — Quyền nội dung và điều khoản sử dụng:** Thiếu nội dung cuối, quy trình quyền tư liệu; tài khoản phải phù hợp điều kiện tuổi SNS theo nguồn, không tự tạo quy tắc pháp lý mới. Nguồn: Y:907-909; Y:977; K:11.
- **REQ-0150 — Lưu dữ liệu theo nơi và người được xem:** Kho lưu đã nêu; phân quyền file/chia sẻ cần đối chiếu, không thêm schema từ DB. Nguồn: Y:812-815.
- **REQ-0151 — Đăng ký dữ liệu ban đầu trước vận hành:** Nguồn hẹn bổ sung từ cấm khi triển khai, chưa có bộ nội dung cuối. Nguồn: Y:819; Y:979; K:21; K:26.
- **REQ-0152 — Hướng dẫn thao tác cho Manager:** Phân công được nhật ký ghi; chưa có xác nhận bộ hướng dẫn cuối/tiêu chí chấp nhận. Nguồn: Y:937-945; Q:28.
- **REQ-0153 — Kiểm thử chấp nhận và bàn giao kết quả:** Tiêu chí từng chức năng, số tài khoản/bài/SNS và ngày bắt đầu chưa có bản chốt; không dùng AC nội bộ thay. Nguồn: Y:588; Y:916; Y:931-935.
- **REQ-0154 — Xử lý lỗi trước phát hành:** Phân loại và quyền quyết định cuối cần đối chiếu điều khoản ký; không tự tuyên bố được phát hành. Nguồn: Y:925-927.
- **REQ-0155 — Phát hành từng phần và phụ thuộc hợp đồng dịch vụ:** Chưa có văn bản duyệt loại trừ, phạm vi phát hành từng phần hoặc dùng trước nghiệm thu. Nguồn: Y:921-923.
- **REQ-0156 — Mốc dự kiến triển khai và phạm vi chức năng:** Đây là mục tiêu/ước lượng; chưa có lịch/phiên bản báo giá cuối được chốt. Không tính ngày thư mục là ngày khách duyệt. Nguồn: Y:929; Y:956-959; Q:35.
- **REQ-0157 — Phê duyệt thương mại và thay đổi sau chốt:** Thiếu bản ký và chưa rõ báo giá28/10 hay29/10; không dùng “không phản hồi” làm phê duyệt thực tế từ các điều khoản được trích. Nguồn: Y:104-106; Y:966-969; Q:35; H:2.
- **REQ-0158 — Yêu cầu về mặc nhiên nghiệm thu trong nguồn:** Chưa đối chiếu hợp đồng ký/thời điểm giao; không được dùng để đóng yêu cầu hay suy khách đồng ý vì im lặng. Nguồn: Y:126; Y:919; Q:35.
- **REQ-0159 — Nhóm chức năng chưa chốt phạm vi và cách tiến hành:** Còn phải quyết phạm vi/lịch/giá; không coi mọi đề nghị trong G27 là tự thuộc giai đoạn1. Nguồn: Y:949-953;K:10;C:23;CR:23.
- **REQ-0160 — Cá nhân hóa điều kiện gợi ý thử thách:** Cần đối chiếu phạm vi chi tiết với quyết định I27 và các phần còn chờ, không tạo Q&A mới. Nguồn: K:27; C:23; G:2; Q:72.
- **REQ-0161 — Các mức độ khó của thử thách:** Cần đối chiếu phạm vi chi tiết với quyết định I27 và các phần còn chờ, không tạo Q&A mới. Nguồn: K:27; C:23; G:2; Q:72.
- **REQ-0162 — Manager trực tiếp quản lý thử thách:** Cần đối chiếu phạm vi chi tiết với quyết định I27 và các phần còn chờ, không tạo Q&A mới. Nguồn: K:27; C:23; G:2; Q:72.
- **REQ-0163 — Dữ liệu và thay thế khi thiếu kết quả SNS:** Cần đối chiếu phạm vi chi tiết với quyết định I27 và các phần còn chờ, không tạo Q&A mới. Nguồn: K:27; C:23; G:2; Q:72.
- **REQ-0164 — Điểm kinh nghiệm và trò chơi:** Cần đối chiếu phạm vi chi tiết với quyết định I27 và các phần còn chờ, không tạo Q&A mới. Nguồn: K:27; C:23; G:2; Q:72.
- **REQ-0167 — Nội dung thúc đẩy tiếp tục hoạt động:** Chưa có điều kiện đạt nhiệm vụ/thử thách và nội dung cuối, không thêm hệ thống điểm từ đề xuất. Nguồn: Y:324; K:53; K:47.
- **REQ-0169 — Sửa file chỉ thị thay hành vi AI mà không phát triển:** Giữ mốc đọc file sáng hôm sau của YK2. Hiệu lực của các đường cập nhật trực tiếp, nội dung đã tạo/tác vụ đang chạy và đồng bộ hai đường chưa đủ quy tắc; không coi đã thiếu toàn bộ đường nhập hoặc cho sửa file tay. Nguồn: Y:821-829;K:45;Y:774;Y:821;K:15;M:30.
- **REQ-0173 — Cơ sở dự tính phí dịch vụ đăng bài:** Đây là tiền đề dự tính được chấp nhận, không chứng minh hợp đồng/gói/giá nhà cung cấp còn đúng hoặc đã ký. Nguồn: K:80; K:81; Y:410-411.
- **REQ-0174 — Tài liệu màn hình do FutureCore chuẩn bị:** Biên bản giao việc không phải bằng chứng toàn bộ màn đã được duyệt; QA No.68 là cách hiểu phân công tài liệu, không xác nhận thương mại. Nguồn: Y:123; Y:145-147; Q:68; T:1; M:1.
- **REQ-0175 — Kênh trao đổi và thời hạn phản hồi dự kiến:** Đây là quy định tiến hành được mô tả, không chứng minh người nhận đã trả lời hoặc duyệt nội dung; không tự gửi liên lạc ngoài repository. Nguồn: Y:961-964.
