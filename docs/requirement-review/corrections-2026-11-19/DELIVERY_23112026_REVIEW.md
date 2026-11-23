# Review tài liệu khách giao trong23112026

**Kết luận:** Bộ mới bổ sung yêu cầu và đề nghị quan trọng, nhưng chưa có căn cứ coi toàn bộ là thay đổi phạm vi đã được phê duyệt. Giữ các quyết định cụ thể trong QA/KS ngày20/11; ghi riêng đề nghị22/11, phương án giao diện20/11, phần kỹ thuật cần kiểm và phần thương mại cần duyệt. Không triển khai code/DB hoặc soạn/gửi Q&A mới trong đợt này.

**Người kiểm:** Codex — review tác giả, không independent reviewer. **Thời điểm:** `2026-11-23T10:30:04+07:00`. Bốn tệp nhận trong thư mục23/11 có ngày nội dung20/11 hoặc22/11; ngày thư mục không là ngày quyết định.

## 1. Phạm vi đọc và phiên bản

| Mã | Tệp | Ngày trong nội dung | Đã đọc | Vai trò |
|---|---|---|---|---|
| UI-M20 | [AI育成OS_管理画面_全画面案1.pdf](../../../source_requiments/23112026/AI育成OS_管理画面_全画面案1.pdf) | 2026-11-20 | 29 trang PDF: chữ và hình | Đề xuất màn Manager, không là screen definition đã duyệt |
| ISS22-D | [AI育成OS_開発に向けた問題点と確認事項.docx](../../../source_requiments/23112026/AI育成OS_開発に向けた問題点と確認事項.docx) | 2026-11-22 | 356 đoạn OOXML, gồm bảng; không ảnh nhúng | Đề nghị/đánh giá và câu hỏi trước họp24/11, DOCX |
| ISS22-P | [AI育成OS_開発に向けた問題点と確認事項.pdf](../../../source_requiments/23112026/AI育成OS_開発に向けた問題点と確認事項.pdf) | 2026-11-22 | 11 trang PDF: chữ và hình | Bản PDF cùng báo cáo đề nghị; không tính như xác nhận thứ hai |
| ADV22 | [★ｎ11.22AI育成OS_問題点の整理と確認事項.pdf](../../../source_requiments/23112026/★ｎ11.22AI育成OS_問題点の整理と確認事項.pdf) | 2026-11-22 | 12 trang PDF: chữ và hình | Slide9lời khuyên,7vấn đề và8ưu tiên; đề nghị chuẩn bị24/11 |

Đã kiểm tra **52 trang PDF** bằng chữ và hình, xem riêng ảnh M-11/M-21/màn xếp hạng; đọc toàn bộ356 đoạn DOCX. Cặp ISS22-D/ISS22-P cùng cấu trúc mục1–7 và18 mục xác nhận; độ giống chữ sau chuẩn hóa khoảng97,64%, sai khác do trật tự trích bảng, ngắt trang, bullet và header. Không gọi hai tệp là giống byte hoặc hai lần khách xác nhận độc lập.

Đã mở lại QA đủ5 sheet và KS đủ3 sheet;16 nguồn trước giữ nguyên SHA-256 so với snapshot sau cập nhật QA/KS23/11. Đọc lại nguồn phản chứng ở KS/QA, GJ17/GJ19 và các trang SD-M19/SD-T19 liên quan. Tra ID hiện có trong finding, RV23, TR24, FL25 và hồ sơ workbook15. Không sửa workbook15 hoặc tệp nguồn.

Giới hạn hình: một số nhãn/caption ở mép slide bị chật/cắt; không suy phần không đọc được từ hình. Các tên, số, thời điểm và tài khoản trên hình là minh họa theo bìa UI-M20. Không dùng X trong hình mẫu để thêm mạng xã hội mới vào phạm vi.

Hash và phạm vi chi tiết: [kiểm kê20 nguồn](../source-inventory-current.json), [tiếp nhận](delivery-23112026-intake.json), [coverage từng trang/đoạn](delivery-23112026-coverage.csv).

## 2. Những điểm phải xử lý trước khi coi đặc tả đã chốt

1. **Luồng TikTok:** Hai báo cáo22/11 đề nghị chuyển sang nháp/inbox và Talent hoàn tất trong TikTok. Đây là thay đổi kết quả người dùng nhận được so với tự đăng đã mô tả. Không đồng nhất “đã gửi nháp” với “đã đăng”; chưa tự thay hai chế độ bằng đề nghị này.
2. **Từ cấm có ba cách xử lý:** KS確認事項 K59 ngày20/11: AI sửa rồi đặt lịch; ISS22-P p7/ADV22 p7: thêm Talent xác nhận sau sửa; UI-M20 p18 M-11: Manager sửa rồi AI kiểm lại. Giữ các nguồn và phần cần chốt, không lấy hình làm quyết định mới.
3. **Đồng ý phụ huynh:** ISS22-P p6 đề nghị lưu liên hệ/đồng ý trong hệ thống, khác KS確認事項 F38 hiện hành: Adesso lấy ngoài hệ thống và app không lưu. Chưa tự thêm trường hoặc quy trình lưu.
4. **Xếp hạng:** UI-M20 p28 có màn Manager mới; KPI/trọng số còn hỏi ởp29. Không tự thêm ranking trong app Talent hoặc cho rằng nằm trong giai đoạn1; QA bảo lưu No.50/CR-22 cần đối chiếu phạm vi thương mại.
5. **Trần phí và thanh toán:** ISS22-P p7 ghi “có trần video tháng”, khác QA No.3/17 và CR-12/16. Mô tả hồi tố này không là quyết định mới đặt trần. Trang2 nói giải quyết bằng thẻ không chứng minh GMO đã ký hoặc tích hợp.
6. **Tâm sự nghiêm trọng:** KS20261120 F22 đã loại thông báo Manager. Hai báo cáo22/11 đề nghị hướng dẫn liên hệ và ghi nhận tối thiểu, còn hình UI-M20 p5/p9 vẫn có cảnh báo cũ. Không phục hồi thông báo bằng hình minh họa.
7. **Dừng hệ thống:** Dừng API/worker chưa chứng minh hủy lịch ở Upload-Post. Nguồn vẫn giữ không có nút global; cơ chế dừng/hủy bên ngoài cần đội/provider kiểm và ghi giới hạn.
8. **Phạm vi mở rộng:** Hội thoại giọng nói, so chéo nội dung200 Talent, KPI hợp đồng/doanh thu, ghép nhãn hiệu, ranking và ENTAMA phải được phân tích dữ liệu, chi phí, quyền và phê duyệt riêng; không coi là chi tiết prompt đã nằm sẵn trong phạm vi.

## 3. Bản đồ25 chủ đề và tác động

Nhãn **FACT** chỉ xác nhận nguồn có nhận định/khác biệt được nêu; không khẳng định mọi nhận định đó đúng ở môi trường thật. Nhãn **PROPOSAL** chỉ phần yêu cầu/đề nghị chưa được xác nhận thay thế hoặc duyệt phạm vi.

| Chủ đề | Nội dung nguồn mới | Giới hạn và việc còn mở | Nguồn/ID theo dõi |
|---|---|---|---|
| **Điều kiện phát triển và mục tiêu Momo** (PROPOSAL) | Nguồn yêu cầu xác định nền tảng đăng trước khi đi sâu vào AI, đặt Momo ở trung tâm và đo kết quả phục vụ công việc; tầm nhìn có kết nối ENTAMA và cung cấp cho công ty khác. | Đây là định hướng/yêu cầu mới cần đánh giá phạm vi và phụ thuộc; chưa tự đổi stack, lịch, mô hình đa công ty hoặc phê duyệt baseline. | `ISS22-P PDFtrang1; ISS22-P PDFtrang10; ISS22-P PDFtrang11`; FND-0032, FND-0038; QA 保留 No.50 |
| **TikTok: tách gửi nháp và đăng công khai** (PROPOSAL) | Đề nghị gửi TikTok vào inbox/nháp để Talent hoàn tất trong app, thay nhánh tự động không xác nhận; nguồn đề nghị Instagram/YouTube giữ hai chế độ. | Chưa chọn phương án thay thế quyết định hai chế độ đã có. Gửi nháp chưa phải đã đăng; cần kiểm đồng ý trước khi gửi, quyền upload, ảnh/video, lịch, caption và đối soát. Draft không tự giải quyết điều kiện sử dụng cho agency. | `ISS22-P PDFtrang2; ISS22-P PDFtrang3; ADV22 PDFtrang5; ADV22 PDFtrang10`; FND-0002, FND-0004, FND-0033, FND-0038; QA No.51/59/70/71/84 |
| **Đồng ý và quyền riêng tư theo từng SNS** (PROPOSAL) | Đề nghị hiện tài khoản TikTok, cho người dùng chọn mức công khai không chọn sẵn, cấu hình tương tác/nội dung thương mại và ghi nhận nội dung, media, SNS, thời điểm đồng ý. | OAuth kết nối không đồng nghĩa đồng ý cho từng nội dung. Cần UI và phiên bản nội dung được xác nhận; chưa tự thêm schema/API hoặc quyền Manager xác nhận thay. | `ISS22-P PDFtrang3; ISS22-P PDFtrang7; ISS22-P PDFtrang10`; FND-0002, FND-0033, FND-0034, FND-0038; RV-30; QA No.71/85 |
| **Manager sửa và xác nhận TikTok** (PROPOSAL) | Đề nghị chỉ Talent xác nhận bài TikTok; Manager vẫn hủy lịch được; nội dung Manager sửa hoặc xác nhận thay cần Talent đồng ý lại. | Khác GJ19§12/QA No.90 về Manager sửa rồi đi tiếp; phải xét tài khoản office. Không tự xóa các quyền Manager đã nêu trong nguồn khác. | `ISS22-P PDFtrang3; ADV22 PDFtrang6`; FND-0002, FND-0003, FND-0005, FND-0023; QA No.57/71/85/90/96; No.66 cho office |
| **Audit TikTok và quota YouTube** (FACT) | Nguồn nêu giới hạn TikTok trước audit là 5 người/24 giờ và quota YouTube mặc định 100 upload/ngày; dùng kịch bản 200–600 video/ngày cho 200 người và yêu cầu xác nhận bằng văn bản cho agency. | Giới hạn có phạm vi theo API client/project/route, không phải quota hợp đồng Upload-Post hoặc cap từng Talent. 200/600 là kịch bản, không là quy mô/tần suất đã chốt; bài ảnh không gửi YouTube. | `ISS22-P PDFtrang3; ISS22-P PDFtrang4; ISS22-P PDFtrang9; ISS22-P PDFtrang10`; FND-0038, FND-0040; QA No.4/24; nguồn ISS22-P§6No.1/2/5/6 |
| **Âm nhạc và hoàn tất trong ứng dụng SNS** (PROPOSAL) | Đề nghị hai đường: đăng qua API với nhạc gốc/đủ quyền và hoàn tất trong app SNS khi cần nhạc thịnh hành hoặc chỉnh sửa đặc biệt; video AI dùng nhạc phù hợp quyền sử dụng. | Không coi nhãn copyright-free là bảo đảm quyền thương mại. Chưa xác minh thao tác bàn giao Instagram/TikTok, tài khoản áp dụng và quyền từng bản nhạc. | `ISS22-P PDFtrang4; ISS22-P PDFtrang6; ADV22 PDFtrang6`; FND-0032, FND-0038; RV-30; ISS22-P§6No.8/16 |
| **PWA: kiểm tra thông báo và phương án thay thế** (PROPOSAL) | Đề nghị hướng dẫn mở Safari, thêm màn hình chính, mở từ icon, cho phép và nhận thông báo thử; không cho phép thì báo trong app hoặc email; mở lại vẫn thấy lời nhắn. | PWA cơ bản đã có trong phạm vi; email dự phòng cho Talent và bước thử cần đối chiếu. 7:30 là ví dụ, không thay lịch cấu hình sáng/trưa/tối; tài liệu hỗ trợ WebPush không chứng minh thiết bị đã được kiểm thử. | `ISS22-P PDFtrang4; ADV22 PDFtrang3`; FND-0015, FND-0028, FND-0038; QA No.73/75; KS20261120No.6/38 |
| **Rải giờ và tối ưu theo chu kỳ 30 ngày** (PROPOSAL) | Đề nghị rải phút theo Talent/SNS, tránh giờ tròn, thử các khung trong 30 ngày rồi dùng kết quả cho 30 ngày tiếp; mục tiêu hiệu quả, phân tải và có thời gian giao lưu. | Không coi ví dụ 19:07/20:23 hoặc chu kỳ 30 ngày là mốc đã chốt. Dữ liệu watch time chưa được kiểm; chỉ thị AI không tự bảo đảm scheduler phân tải hoặc tuân thủ cap. | `ISS22-P PDFtrang5; ADV22 PDFtrang8; ADV22 PDFtrang11`; FND-0006, FND-0015, FND-0027, FND-0038; QA No.56/73; KS20261120No.40/41 |
| **Chống giống nhau và phân tích chéo Talent** (PROPOSAL) | Đề nghị cá nhân hóa giọng/chủ đề và so nội dung/ý tưởng video của 200 Talent trước khi đăng, đề xuất khác khi giống nhau. | Cá nhân hóa đã có hướng; so chéo 200 người là phần dữ liệu/chi phí khác, không bảo đảm bằng một prompt. Không đưa dữ liệu Talent khác vào hội thoại/output hoặc tự nới quyền truy cập. | `ISS22-P PDFtrang5; ADV22 PDFtrang3; ADV22 PDFtrang11`; FND-0053; REQ-0009; QA No.7/50; KS確認事項UC-03 |
| **Nhắc tương tác sau đăng** (PROPOSAL) | Đề nghị nhắc xem phản hồi sau 30 phút, trả lời/giao lưu vài giờ sau, phân tích hôm sau và báo cáo/thử thách hằng tuần; nhắc bình luận chưa trả lời. | Nhắc chung qua chỉ thị khác chức năng phát hiện từng bình luận chưa trả lời. Không tự mở API comment/auto-like/auto-follow; các mốc nhắc chưa được duyệt. | `ISS22-P PDFtrang6; ISS22-P PDFtrang8; ADV22 PDFtrang11`; FND-0015, FND-0016, FND-0027, FND-0032; QA No.72/73; ngoài phạm vi auto-comment |
| **Đồng ý phụ huynh và trần phí theo tuổi** (PROPOSAL) | Đề nghị quản lý liên hệ và ghi nhận đồng ý phụ huynh cho dưới 18 tuổi, phạm vi sử dụng media, trần phí và mục tiêu khác cho dưới 16 tuổi. | Khác KS確認事項 F38: Adesso lấy đồng ý ngoài app, hệ thống không lưu. Khách/chuyên trách cần quyết quyền, retention và chính sách tuổi; chưa xác minh toàn bộ nhận định pháp lý hoặc triển khai lưu. | `ISS22-P PDFtrang6; ISS22-P PDFtrang10; ADV22 PDFtrang3; ADV22 PDFtrang10`; FND-0052; QA No.18; CR-12; KS確認事項F38; ISS22-P§6No.17 |
| **PR và nhãn AI theo nền tảng** (PROPOSAL) | Đề nghị gắn PR cho quảng cáo, không cho mọi bài; nhãn AI áp dụng theo yêu cầu từng SNS. | Nhãn AI đã có ở YK2/GJ/REQ-0071; slide nói chưa có không xóa yêu cầu cũ. Ghi PR trong caption không tự thay disclosure của nền tảng hoặc chứng minh tuân thủ; người xác định quảng cáo chưa đủ chính sách. | `ISS22-P PDFtrang2; ISS22-P PDFtrang7; ADV22 PDFtrang3; ADV22 PDFtrang11`; FND-0032, FND-0038; RV-30; YK2chức năng5-5; ISS22-P§6No.16 |
| **Ứng xử tối thiểu với tâm sự nghiêm trọng** (PROPOSAL) | Không đề nghị khôi phục thông báo Manager; đề nghị Momo hướng dẫn liên hệ phụ huynh/Manager/kênh hỗ trợ và lưu dấu có hội thoại. | Không tự thêm lại cảnh báo Manager đã bị loại bởi KS F22. Câu chữ, loại dấu vết, quyền xem và retention còn No.93; nguồn không cung cấp địa chỉ hỗ trợ cụ thể đã được xác minh. | `ISS22-P PDFtrang7; ADV22 PDFtrang7`; FND-0014; QA No.76/93; KS20261120F22/F28/F29 |
| **Xác nhận lại bài AI sửa từ cấm** (PROPOSAL) | Đề nghị bài có từ cấm phải được Talent xem lại sau AI sửa dù đang chọn không xác nhận từng bài. UI-M20 M-11 vẫn vẽ Manager sửa rồi AI kiểm lại. | Có ba nhánh: KS K59 AI sửa/đặt lịch; báo cáo 22/11 thêm Talent xác nhận; UI M-11 Manager sửa. Không tự chọn hoặc đóng No.57/71/90/96 bằng hình minh họa. | `ISS22-P PDFtrang7; ADV22 PDFtrang7; ADV22 PDFtrang10; UI-M20 PDFtrang18`; FND-0002, FND-0003, FND-0005, FND-0050; QA No.57/71/85/90/96; KS確認事項K59 |
| **Hàng đợi, chống trùng và ghi thao tác** (FACT) | Nguồn yêu cầu hàng đợi theo SNS, chống đăng hai lần, bảo vệ token và ghi thao tác Talent/Manager/AI; đánh dấu vài phần chưa xác nhận. | Đó là đánh giá của nguồn, không chứng minh repo thiếu hay đã có. BullMQ/Redis là quyết định kỹ thuật nội bộ đã có; retry vận chuyển/đối soát khác tự đăng lại nghiệp vụ. Chưa thay schema/code hoặc tuyên bố test đạt. | `ISS22-P PDFtrang7; ISS22-P PDFtrang8; ISS22-P PDFtrang10`; FND-0034, FND-0037, FND-0038; Quyết định kỹ thuậtBullMQ20/11; QA No.15/59 |
| **Dừng hệ thống và lịch bên dịch vụ** (FACT) | Nguồn giữ quyết định không có nút dừng toàn bộ, yêu cầu kiểm lịch đã gửi có dừng khi hệ thống ngừng không; bảng kỹ thuật vẫn liệt kê dừng toàn bộ/từng người/SNS. | Không khôi phục nút global từ bảng khái quát. Tắt API/worker không chứng minh lịch bên dịch vụ đã hủy; chưa cam kết dừng khi provider không truy cập được hoặc bài đang publish. | `ISS22-P PDFtrang2; ISS22-P PDFtrang7; ADV22 PDFtrang8; ADV22 PDFtrang10`; FND-0008, FND-0034, FND-0038; QA No.60/61/77/91; KS K85/F33 |
| **Trần phí và nhận định đã giải quyết thanh toán** (FACT) | Bảng hiện trạng mới ghi có trần video/tháng; phần so sánh ghi thanh toán đã giải quyết bằng thẻ. | QA No.3/17 và CR-12/16 nói không có trần video/AI tự dừng. Không dùng mô tả hồi tố để đảo chính sách. KS F25 chỉ ghi GMO là ứng viên; có phương thức thẻ không chứng minh cổng đã ký hoặc tích hợp. | `ISS22-P PDFtrang2; ISS22-P PDFtrang7`; FND-0018, FND-0020, FND-0021, FND-0032; QA No.3/4/17; CR-12/16; KS20261120F25 |
| **Tăng trưởng, dashboard và KPI kinh doanh** (PROPOSAL) | Đề nghị Momo phân tích điểm yếu, tạo chiến lược/thử thách cá nhân; dashboard ưu tiên vấn đề; KPI gồm tăng follower, engagement, số hợp đồng doanh nghiệp và doanh thu mỗi Talent. | Coaching/thử thách/số liệu đã có ngữ cảnh cũ; ghép nhãn hiệu, hợp đồng và doanh thu cần phạm vi/định nghĩa/nguồn mới. Không coi toàn bộ dữ liệu lấy được qua Upload-Post hoặc được duyệt giai đoạn 1. | `ISS22-P PDFtrang8; ISS22-P PDFtrang9; ISS22-P PDFtrang10`; FND-0016, FND-0027, FND-0032; QA No.72; KS確認事項K27; QA 保留 No.50 |
| **Pilot 10–20 người, mở 200 và hội thoại giọng nói** (PROPOSAL) | Báo cáo đề nghị bốn giai đoạn: nền đăng 2–4 tuần, coaching 3–4 tuần, phân tích 3–4 tuần rồi mở 200 người; slide đề nghị pilot 10–20 trong 1–2 tháng. Báo cáo có hội thoại giọng nói ở giai đoạn 2. | Hai ước lượng chưa cùng phạm vi/chưa ký. Các số này không tự thay quy mô UAT hoặc lịch cuối 2/2027; voice/xếp hạng/ghép công việc là đề nghị mở rộng, không tự vào giai đoạn 1. | `ISS22-P PDFtrang9; ADV22 PDFtrang12`; FND-0032, FND-0038; QA 保留 No.50; KS sheetプロジェクト...No.3 |
| **Manager responsive và phạm vi tablet** (PROPOSAL) | Đề xuất PC đầy đủ, smartphone bốn tab Home/duyệt/Talent/menu, tablet có danh sách và chi tiết cạnh nhau, menu bên trái và home chia ưu tiên. | Trang 29 vẫn hỏi xác nhận bốn tab và phạm vi tablet. Giữ quyết định PC là chính, duyệt/chỉ thị AI dùng trên smartphone; chưa coi hình là UX đã duyệt hoặc chọn breakpoint. | `UI-M20 PDFtrang1; UI-M20 PDFtrang2; UI-M20 PDFtrang3; UI-M20 PDFtrang5; UI-M20 PDFtrang6; UI-M20 PDFtrang29`; FND-0032, FND-0036; QA No.30/68; GJ17§3; mớiUI-M20p29 |
| **Thông báo: mở là xử lý và hình cảnh báo cũ** (FACT) | M-02 mới vẫn ghi mở thông báo là 対応済み; hình tablet/PC vẫn có cảnh báo tâm sự nghiêm trọng và từ cấm. | QA No.97 vẫn Open, không tự chọn A/B. Hình không khôi phục chức năng KS F22 đã bỏ; email và người phụ trách còn No.75/87/88. | `UI-M20 PDFtrang5; UI-M20 PDFtrang9; UI-M20 PDFtrang29`; FND-0014, FND-0028, FND-0029; QA No.75/87/88/93/97; KS20261120F22 |
| **Nhiều category và phân công Manager** (FACT) | M-13 cho gán nhiều category, M-19 hiện category Manager, M-10 có Manager phụ trách; M-14 nhắc ưu tiên Talent > category > toàn hệ thống. | UI vẫn thể hiện nhiều category trong khi QA No.99 hỏi lựa chọn và xử lý xung đột. Không tự chốt một category hoặc dùng category Manager làm rào cản quyền chung. | `UI-M20 PDFtrang17; UI-M20 PDFtrang20; UI-M20 PDFtrang21; UI-M20 PDFtrang22; UI-M20 PDFtrang25`; FND-0009, FND-0013, FND-0045; QA No.6/87/88/92/99; KS K77/K93 |
| **Ảnh chân dung và liên kết profile Adesso** (PROPOSAL) | M-21 thêm một ảnh cận mặt, trường URL profile Adesso và nút mở profile; vẫn có năm nhóm thông tin, lịch sử và chỉnh qua ChatGPT. | SD-M19 p26 chưa nêu hai đầu vào này. Chưa chốt tính bắt buộc, định dạng/quyền ảnh, nơi lưu, URL chỉ mở hay được AI đọc. Không tự fetch/crawl URL hoặc mở quyền ghi ảnh qua MCP. | `UI-M20 PDFtrang27`; FND-0010, FND-0012, FND-0035; QA No.54/74/92; KS20261120No.39 |
| **Màn Manager xếp hạng cố gắng** (PROPOSAL) | Trang 28 có màn mới chưa mã: top 3 và bảng tăng follower/ngày đăng/thử thách, tổng hợp hoặc từng chỉ số, chu kỳ 7/30 ngày; trang 29 hỏi trọng số. | Không tự cấp M-22 hoặc hiển thị ranking trong app Talent. KPI, trọng số, hòa hạng, thiếu số liệu, quyền và nghiệm thu chưa chốt; QA bảo lưu No.50 nêu ngoài phạm vi theo SOW/báo giá chưa có bản ký độc lập. | `UI-M20 PDFtrang3; UI-M20 PDFtrang28; UI-M20 PDFtrang29; ISS22-P PDFtrang9`; FND-0051; QA 保留 No.50; CR-22; UI-M20p29 |
| **Mã màn và số lượng thực tế** (FACT) | Tệp 29 trang có 20 màn mang mã M-01–M-15 và M-17–M-21, không có M-16; thêm màn chưa mã ở p28. M-20 là nhật ký xem, M-21 nhập thông tin. | Bìa ghi 20 màn không đủ để bỏ qua màn mới hoặc đánh lại mã. Dùng UI-M20/ngày 20/11 và trang PDF, không thay mã AG/SD18/SD19 theo cùng số. | `UI-M20 PDFtrang7; UI-M20 PDFtrang8; UI-M20 PDFtrang23; UI-M20 PDFtrang26; UI-M20 PDFtrang27; UI-M20 PDFtrang28`; FND-0012, FND-0032, FND-0036; UI-M20p1/p7/p28; QA No.68 |

Bằng chứng/hash và ánh xạ REQ/BR/FLOW/EV theo từng chủ đề nằm tại [ma trận tác động](delivery-23112026-impact.csv). Không tạo kho yêu cầu hoặc Q&A cạnh tranh với các register hiện có.

## 4. Giao diện quản lý: mã màn và các phần còn chờ

- UI-M20 là **phương án** lập20/11, không phải SD-M19 bản23/11. Có29 trang:20 màn mang mã M-01–M-15 và M-17–M-21; M-16 không xuất hiện. Trang28 thêm màn xếp hạng chưa mã. Vì vậy phải phân biệt20 màn có mã và một màn đề nghị chưa mã, không gán M-22.
- PDF p8–p22 tương ứng M-01–M-15; p23–p27 tương ứng M-17–M-21. M-20 là nhật ký xem, M-21 là nhập thông tin; không đồng nhất với mã trongAG/SD18.
- M-21 p27 thêm một ảnh cận mặt và URL profile Adesso, nút mở profile. Chưa xác nhận trường bắt buộc, quyền ảnh, nơi lưu, validation URL hoặc cho AI đọc nội dung URL; không âm thầm cấp thêm quyền MCP.
- M-13 p20 tiếp tục thể hiện một Talent có nhiều category; QA No.99 vẫn hỏi cách chọn/ưu tiên khi xung đột. Không tự chọn phương án một category vì dễ làm.
- M-02 p9 tiếp tục mô tả mở là対応済み; QA No.97 chưa có trả lời. M-11 p18 còn quy trình Manager sửa cũ. Trang29 còn hỏi bốn tab smartphone, phạm vi tablet, trọng số xếp hạng và cách xác nhận câu chữ.

[Danh mục theo từng màn và trang](delivery-23112026-screens.csv). Số giờ,3/7 ngày, tài khoản, lượng follower và ví dụ khác trên hình không tự trở thành giá trị đã chốt.

## 5. Kiểm thêm tài liệu chính thức — tách khỏi xác nhận provider

Các nguồn web sau được đọc để kiểm nhận định kỹ thuật, không thay nhật ký khách, hợp đồng, phản hồi riêng của Upload-Post hoặc thử nghiệm tài khoản dự án:

| Nguồn chính thức | Điều kiểm được / giới hạn |
|---|---|
| [TikTok Content Sharing Guidelines](https://developers.tiktok.com/docs/en/content-sharing-guidelines) và [Direct Post](https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post) | Có yêu cầu đồng ý rõ, quyền kiểm soát nội dung và chọn privacy; có giới hạn API client/audit và ví dụ internal-use không chấp nhận. Chưa đủ kết luận mọi lịch TikTok hoặc mọi mô hình agency qua provider đều bị cấm/được duyệt. |
| [TikTok Upload](https://developers.tiktok.com/docs/en/content-posting-api-reference-upload-video) | Có đường tải inbox để người dùng hoàn tất trong app. Đây chưa là bài công khai; nháp vẫn có điều kiện/quyền và giới hạn riêng. |
| [Upload-Post video](https://docs.upload-post.com/api/upload-video/) và [photo](https://docs.upload-post.com/api/upload-photo/) | Có mô tả MEDIA_UPLOAD; video nháp không mang caption/privacy như Direct Post. Đây là bằng chứng hỗ trợ trong tài liệu công khai, chưa có POC hoặc xác nhận cho gói/tài khoản dự án. |
| [Upload-Post status](https://docs.upload-post.com/api/upload-status/) | Success/fallback vào inbox không tự có nghĩa đã đăng công khai; cần ánh xạ trạng thái và đối soát. |
| [YouTube Quota Calculator](https://developers.google.com/youtube/data/determine_quota_cost) | Quota mặc định được mô tả là100 videos.insert/ngày/project, search có bucket riêng. Không suy quota thực của provider bằng số này. |
| [Meta Content Publishing](https://developers.facebook.com/documentation/instagram-platform/content-publishing) | Kiểm được phạm vi professional account/các cách đăng nhập; không đủ chứng minh toàn bộ khả năng nhạc thịnh hành hoặc quyền nhạc qua provider. |
| [WebKit Web Push](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) | Mô tả Home Screen web app và xin quyền từ thao tác người dùng; không chứng minh delivery100% hay thiết bị đã test. |

Hồ sơ kiểm và giới hạn: [provider-document-checks](delivery-23112026-provider-checks.json). Không xác minh toàn bộ luật/chính sách tuổi dưới16/18, bản quyền từng bài nhạc hoặc tư cách audit của client cụ thể. Không khẳng định “draft giải quyết mọi vấn đề”; đồng ý cho gửi, khả năng provider và việc người dùng hoàn tất vẫn phải được kiểm.

## 6. Phân tuyến18 mục nguồn gửi FutureCore/đội

Đây là phân tuyến nội bộ của **các mục đã có ở ISS22-P §6 p9–10 / DOCX P256–P333**, không phải18 câu Q&A mới soạn cho khách. Giữ số này kèm tên nguồn, không nhầm với QA No.1–18. Chưa liên hệ hoặc gửi cho provider.

| No. nguồn | Đầu ra cần có | Bên xử lý | Theo dõi hiện có |
|---|---|---|---|
| 1 | Tên dịch vụ, bên ký, route và bằng chứng audit TikTok | Đội/provider | FND-0038 |
| 2 | Xác nhận bằng văn bản cho mô hình agency200 tài khoản | Provider + đầu mối hợp đồng | FND-0038;FND-0032 |
| 3 | Luồng consent/preview/privacy và giới hạn qua provider | Đội/provider; khách duyệt UX | FND-0002;FND-0033 |
| 4 | Chứng minh nháp TikTok cho ảnh/video, lịch, caption và trạng thái | Đội/provider; khách chọn thay đổi trải nghiệm | FND-0002;FND-0004 |
| 5 | Quota TikTok, người/ngày, bài/ngày, gói và chi phí | Provider; đội kiểm tải | FND-0038;FND-0040 |
| 6 | Quota YouTube thực tế, dự kiến video và chi phí | Provider; đội kiểm tải | FND-0038;REQ-0138 |
| 7 | Kết nối Instagram creator và quyền cần thiết | Đội/provider | FND-0033;FND-0038 |
| 8 | Khả năng nhạc và đường hoàn tất trong SNS | Provider/đội; khách/chủ nội dung quyết quyền | FND-0038;FND-0032 |
| 9 | Quản lý200 kết nối, hết hạn và kết nối lại | Đội/provider | FND-0038 |
| 10 | Thiết kế/test hàng đợi, chống trùng, timeout và đối soát | Đội/Tech Lead | FND-0034 |
| 11 | Runbook dừng và bằng chứng lịch bên ngoài đã hủy | Đội/provider | FND-0008;FND-0034 |
| 12 | Kết quả test iPhone/Android; chính sách kênh dự phòng | Đội; khách chốt kênh | FND-0015;FND-0028;FND-0038 |
| 13 | Dữ liệu/tiêu chí Momo phân tích và thử thách | Đội dữ liệu/AI; khách chốt phạm vi/KPI | FND-0016;FND-0027 |
| 14 | Quyết định có xác nhận lại bài AI sửa hay không và nhánh lỗi | Khách chốt hành vi; đội thiết kế | FND-0002;FND-0003;QA No.57/71/96 |
| 15 | Quyền Manager và phiên bản nội dung được Talent đồng ý | Khách chốt chính sách; đội hiện thực | FND-0005;FND-0033 |
| 16 | Chính sách PR/AI, metadata và giới hạn provider | Khách/chuyên trách nội dung + đội/provider | FND-0038;REQ-0071/0149 |
| 17 | Nơi lưu đồng ý phụ huynh, phạm vi/retention và ứng xử nghiêm trọng | Khách/chuyên trách chính sách; đội đánh giá | FND-0052;FND-0014;QA No.93 |
| 18 | Ước tính tổng phí lưu trữ, lưu lượng, API theo tải/gói | Đội/provider; chủ dự án duyệt thương mại | FND-0018;FND-0032;REQ-0138 |

ADV22 còn có8 ưu tiên p10, đã gộp vào các mục trên: TikTok nháp; provider/audit/quota; vai trò Manager; nhạc; dừng/hủy lịch; xác nhận bài AI sửa; phụ huynh/tâm sự; pilot. Không nhân thành8 câu hỏi trùng.

## 7. Đánh giá9 lời khuyên và các nhận định cần phản chứng

| ADV22 p3 | Cách đọc sau đối chiếu |
|---|---|
|1. UI TikTok | Là điểm còn thiếu về consent/privacy theo route; cần đội/provider và quyết định UX. |
|2. Chọn dịch vụ | Bộ nguồn đã nhắc Upload-Post là dự kiến nhưng chưa chứng minh hợp đồng/route/audit/quota đáp ứng; tên dự kiến khác chọn chính thức. |
|3. Nội dung không giống nhau | Cá nhân hóa đã có, so chéo200 Talent là phạm vi mới cần kiểm dữ liệu/chi phí. |
|4. PWA/notification | Đã có hướng dẫn trong nguồn; test/fallback chưa có kết quả đầy đủ. Không coi “đang làm” là test đã đạt. |
|5. Phụ huynh | Chính sách cũ lấy ngoài app; đề nghị lưu trong app là thay đổi cần chốt. |
|6. PR/AI | Nhãn AI đã có nguồn cũ; PR/disclosure cụ thể chưa đủ. Không chấp nhận nhận định cả hai hoàn toàn chưa có. |
|7. Nhắc trả lời comment | Prompt nhắc chung khác phát hiện comment chưa trả lời; chưa cam kết dữ liệu API. |
|8. Dừng hệ thống | Quyết định bỏ nút global đã có; hủy lịch phía provider chưa được chứng minh. |
|9. Pilot | Đề nghị10–20 người/1–2 tháng chưa là tải UAT/lịch chính thức. |

Con số “2/9 đã vào đặc tả” trong ADV22 p2 là đánh giá của tài liệu đó, không phải tỷ lệ hoàn thành dự án đã được kiểm toán.

## 8. Finding mới — chưa review độc lập

<a id="fnd-0051"></a>
### FND-0051 — Xếp hạng Manager

Đã có màn đề nghị UI-M20 p28/p29, chưa có mã màn/KPI/trọng số hoặc phê duyệt phạm vi. Nối REQ-0096/0159/0164, CR-22 và QA bảo lưu No.50. Giữ riêng xếp hạng Manager và quyền riêng tư trên app Talent. Chủ xử lý: khách/chủ dự án về phạm vi, đội về KPI. Trạng thái DRAFT, chưa câu hỏi mới.

<a id="fnd-0052"></a>
### FND-0052 — Lưu đồng ý phụ huynh

ISS22-P p6 đề nghị lưu liên hệ/đồng ý và trần phí trẻ tuổi; KS確認事項 F38 quy định lấy ngoài hệ thống và không lưu trong app. Nối REQ-0144/0165 và QA No.18. Chủ xử lý: khách/chuyên trách chính sách, đội đánh giá dữ liệu/chi phí. Trạng thái DRAFT, không tự sửa yêu cầu cũ thành đã chốt.

<a id="fnd-0053"></a>
### FND-0053 — So chéo nội dung200 Talent

ISS22-P p5 đề nghị so toàn bộ nội dung/ý tưởng; cá nhân hóa qua chỉ thị có sẵn không tự bao phủ pipeline này. Cần phạm vi dữ liệu được phép, tiêu chí giống, chi phí và bằng chứng không lộ dữ liệu Talent khác (REQ-0009/0142). Không khẳng định mọi phân tích chéo đều bị cấm; chưa có thiết kế/đồng ý đủ căn cứ. Trạng thái DRAFT.

Các chủ đề từ cấm, TikTok, hồ sơ M-21, nhắc/giờ, retry/dừng, quota, trạng thái và phạm vi thương mại tiếp tục FND/QA hiện có; không cấp ID thay thế và không đóng câu còn mở.

## 9. Tài liệu đã đồng bộ và hiệu lực

- Catalog/Source Register và kiểm kê:20 tệp,16 hash cũ giữ nguyên; lưu ngày trong nội dung và quan hệ DOCX/PDF.
- Register: bổ sung tác động vào74 requirement,35 rule và28 flow; giữ quyết định/phê duyệt lịch sử, đánh STALE nhánh ảnh hưởng. Không tự đổi PROPOSAL thành CONFIRMED.
- SCD: cập nhật phần nguồn mới ở39 tài liệu, giữ phần QA/KS và lịch sử trước đó; không lấy màu/AC cũ làm G8.
- **Điều chỉnh theo yêu cầu người dùng:** đã gỡ phần cập nhật trong báo cáo AI Core và hướng dẫn Upload-Post/PWA/MCP, khôi phục bốn file về trước hai lượt review nguồn. Kết quả phân tích và tác động tiếp tục quản lý tại báo cáo này, SCD và sổ truy vết; chưa thay đổi thiết kế triển khai trong `agent_spec`.
- Phân tích00/04/05/06/09/10/11, sơ đồ tương tác22, rà soát23, ma trận24 và kịch bản25 có chỉ dẫn hiệu lực; chưa tái dựng mọi scenario/guard/AC.
- Q&A chính tiếp tục theo dõi No.93–99; xuất độc lập vẫn0 câu. Không soạn câu hỏi bổ sung từ18 mục kỹ thuật hoặc8 ưu tiên có sẵn trong nguồn.

**Gate:** G1 BLOCKED chờ người duyệt snapshot/phạm vi; G2–G4 STALE ở phần ảnh hưởng; G5/G6 BLOCKED cho bản mới; không cấp G7/G8 PASS hoặc baselineAPPROVED. Đây là review của tác giả, không tự ký independent review và không tự delegate.

**Việc tiếp theo:** BA/Tech Lead được chỉ định review nguồn và bản sửa; khách/chủ dự án quyết các thay đổi hành vi/phạm vi/giá/lịch; đội/provider cung cấp POC và bằng chứng riêng cho các mục kỹ thuật. Quyền duyệt nghiệp vụ, thiết kế, thương mại và phát hành tách riêng.

## 10. Kiểm tra cơ học

Kết quả lệnh và hash output được ghi trong [manifest đợt23112026](delivery-23112026-manifest.json). Kiểm cơ học không thay xác minh nghiệp vụ, phê duyệt khách hoặc G1–G8.
