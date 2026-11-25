# Review chương 3 — Yêu cầu phi chức năng

Ngày review: **25/11/2026**. Người thực hiện: **Codex**. Tài liệu: **AI育成OS_要件定義書, bản 0.3 ngày 24/11/2026**.

**Phạm vi review: mục 3-1 đến 3-8.** Mục 2-5, chương 4, Q&A và biên bản chỉ dùng để đối chiếu hoặc giải thích ảnh hưởng. Việc sửa các chương khác nằm ngoài phạm vi bản review này.

**Chương 3 đã có các nhóm yêu cầu cần thiết, nhưng nhiều điều kiện còn để “quyết định khi thiết kế” và chưa có cách kiểm tra đạt hay không đạt.** Các điểm dưới đây phân biệt nội dung khách đã viết, đánh giá của người review và đề xuất bổ sung.

Đây là bản làm việc nội bộ, chưa qua người review độc lập và chưa được khách duyệt. Đề xuất bổ sung chưa phải yêu cầu đã chốt. Mức ưu tiên là đánh giá nội bộ, chưa phải quyết định bắt buộc hoàn thành toàn bộ trước release.

## 1. Mục 3-1: Thiết bị và môi trường

**Đã có:** Dùng app qua trình duyệt và thêm vào màn hình chính; iPhone cần iOS16.4 trở lên để nhận thông báo. Có môi trường thật/kiểm thử và yêu cầu không ảnh hưởng app Instagram DM đang chạy.

**Còn thiếu:** Danh sách thiết bị, hệ điều hành, trình duyệt phải hỗ trợ; cách kiểm tra việc cài đặt, nhận thông báo và không ảnh hưởng hệ thống cũ.

**Đề xuất bổ sung:** Đội và QA chốt danh sách môi trường thử, kiểm tra các tài nguyên dùng chung và thử lại chức năng Instagram DM liên quan. Điều kiện iOS16.4 trong tài liệu không có nghĩa mọi thông báo đều đến nơi.

*Căn cứ: mục 3-1, p901–904; giới hạn thông báo tại mục 3-8, p942.*

## 2. Mục 3-2: Hiệu năng và quy mô

**Đã có:** Các mốc 30, 100, 200–300 và 1.000 người; yêu cầu chuẩn bị xong nội dung trước giờ nhắn buổi sáng. Tài liệu chỉ yêu cầu kiểm tra xử lý sáng ở số người bắt đầu sử dụng.

**Còn thiếu:** Quy mô phải hỗ trợ ở lần bàn giao, số người dùng đồng thời, lượng dữ liệu dùng để thử và thời gian đáp ứng chấp nhận được. Thử ở khoảng 30 người chưa chứng minh hệ thống đáp ứng ở 300 hoặc 1.000 người.

**Đề xuất bổ sung:** Đội và QA lập điều kiện thử tải, cách đo và ngưỡng đạt. Chủ dự án chốt quy mô bàn giao, phân biệt với mục tiêu mở rộng sau này. Chưa tự đặt số giây hoặc cam kết hỗ trợ 1.000 người.

*Căn cứ: mục 3-2, p906–909.*

**Dung lượng:** Mục 3-2 còn để giới hạn từng tệp và tổng dung lượng cho thiết kế. Đề xuất đội xác định các giới hạn này cùng cách xử lý khi đầy kho; chưa tự đặt con số trong bản review. Căn cứ: p908.

**Đối chiếu phạm vi:** Mục 3-2 ghi mục tiêu 200–300 và tương lai 1.000 người; ghi chú trong QA dẫn điều kiện ước tính khoảng 150 tài năng và 8 tài khoản văn phòng. Chủ dự án/đầu mối thương mại cần đối chiếu văn bản có thẩm quyền. Chưa có bản báo giá/SOW ký độc lập trong bộ nguồn để kết luận nghĩa vụ thương mại; không tự hạ yêu cầu xuống150 người.

## 3. Mục 3-3: Thời gian hoạt động, sự cố và sao lưu

### Vận hành khi có sự cố — ưu tiên cao

**Đã có:** Khi dịch vụ ngoài lỗi, dừng chức năng bị ảnh hưởng và giữ các chức năng khác hoạt động. Biên bản 19/11 giao FCP và AMCOLAB rà các điểm lỗi và cách vận hành.

**Còn thiếu:** Cách phát hiện lỗi, người nhận cảnh báo, chức năng bị ảnh hưởng, việc người dùng làm tiếp và cách phục hồi. Một dịch vụ dùng chung có thể làm nhiều chức năng bị ảnh hưởng cùng lúc.

**Đề xuất bổ sung:** Đội lập danh sách tình huống lỗi và cách xử lý cho từng tình huống; xác định thời gian gián đoạn chấp nhận được và kiểm thử phục hồi. Phần sao lưu được làm rõ dưới đây.

*Căn cứ: mục 3-3, p911–913; biên bản GJ19, mục18 và hành động7. Theo dõi cùng FND-0037.*

### Sao lưu và khôi phục — ưu tiên cao

**Tài liệu đang ghi:** Mục 3-3 đã nhắc sao lưu, nhưng để đối tượng, tần suất và thời gian giữ cho giai đoạn thiết kế.

**Điểm cần bổ sung:** QA No.101 đã xác nhận dữ liệu hệ thống có bản sao lưu. Hai nội dung này không mâu thuẫn; bản yêu cầu cần ghi rõ phần đã xác nhận và phần chi tiết còn phải quyết định. Chưa thể coi việc có bản sao lưu là bằng chứng khôi phục được dữ liệu khi có sự cố.

**Đề xuất bổ sung:** Ghi loại dữ liệu được sao lưu, lịch sao lưu, thời gian giữ, người phụ trách và cách thử khôi phục. Phần chưa chốt cần có người xử lý và thời hạn hoàn thành.

**Bên xử lý:** Đội kỹ thuật đề xuất; Adesso/chủ dự án xác nhận mức mất dữ liệu và thời gian ngừng sử dụng có thể chấp nhận. Tiếp tục theo dõi tại FND-0037 / QA No.29, liên kết No.101; không hỏi lại việc có sao lưu hay không.

*Căn cứ: bản 0.3, mục 3-3 (p911–913); QA!G101.*

### Kết quả chưa rõ khi thử lại — đề xuất bổ sung

**Đã có:** Các thông báo và ghi nhận kết quả khi đăng bài, tạo video hoặc thanh toán thất bại.

**Còn thiếu:** Cách xử lý khi dịch vụ ngoài đã hoàn thành nhưng hệ thống không nhận được phản hồi. Nếu coi đó là thất bại rồi gửi lại, hệ thống có thể đăng hoặc tính tiền hai lần.

**Đề xuất bổ sung:** Đội xác định cách kiểm tra lại kết quả, khi nào được thử lại và cách tránh xử lý trùng. QA bổ sung tình huống mất kết nối hoặc không nhận được phản hồi vào kiểm thử.

*Căn cứ: mục 3-3 p912, mục 3-4 p917 và phụ lụcB p1316–1335. Đây là đề xuất thiết kế từ khoảng trống xử lý lỗi, chưa phải quy tắc đã duyệt.*

## 4. Mục 3-4: Nhật ký thao tác và xử lý

**Đã có:** Ghi việc xem dữ liệu, duyệt, đổi trạng thái, dừng/mở lại đăng, đổi cài đặt và kết quả xử lý. Không để lộ khóa kết nối trong nhật ký.

**Còn thiếu:** Thông tin tối thiểu cần ghi để điều tra sự cố và ai được xem nhật ký.

**Đề xuất bổ sung:** Đội và QA xác định người thao tác, thời điểm, dữ liệu liên quan, kết quả và mã để nối các bước xử lý. Giới hạn quyền xem và tránh ghi thông tin nhạy cảm không cần thiết. Ghi chú trong QA dẫn điều kiện ước tính chỉ nêu nhật ký xem, trong khi mục 3-4 yêu cầu cả thao tác và kết quả xử lý. Chủ dự án/đầu mối thương mại cần đối chiếu phạm vi riêng; chưa có bản ký để kết luận nghĩa vụ.

*Căn cứ: mục 3-4 p915–918; mục 3-5 p922.*

## 5. Mục 3-5: Bảo mật

### Kiểm chứng quyền truy cập — ưu tiên cao

**Đã có:** Dẫn chiếu quy tắc đăng nhập, yêu cầu mã hóa và bảo vệ khóa kết nối.

**Còn thiếu:** Cách chứng minh quyền truy cập được áp dụng khi AI đọc/ghi dữ liệu và khi dữ liệu nằm ở các nơi lưu khác nhau. Đợt review này không kết luận toàn bộ tài liệu thiếu phân quyền.

**Đề xuất bổ sung:** Đội và QA lập bảng quyền từ yêu cầu chức năng hiện có; kiểm tra tài năng không xem/sửa dữ liệu của người khác, tài khoản bị vô hiệu hóa không tiếp tục thao tác trái quyền và AI chỉ truy cập dữ liệu được phép.

*Căn cứ: mục 3-5 p920–923; mục 2-5 p885; QA!G101 về việc AI đọc/ghi dữ liệu.*

### Dữ liệu gửi cho AI — ưu tiên cao

**Đã có:** Chỉ gửi thông tin cần thiết cho hội thoại và tạo bài; không để dịch vụ AI dùng dữ liệu đó để huấn luyện. Khi kiểm thử bằng dữ liệu thật phải có chấp thuận bằng văn bản.

**Còn thiếu:** Danh sách dữ liệu gửi cho từng dịch vụ và bằng chứng dịch vụ đáp ứng cam kết. Việc không dùng để huấn luyện chưa trả lời dịch vụ giữ dữ liệu bao lâu hoặc xóa lúc nào.

**Đề xuất bổ sung:** Đội kiểm tra với từng nhà cung cấp và ghi rõ dữ liệu gửi, thời gian lưu, cách xóa và bằng chứng đáp ứng. Adesso xác nhận phạm vi đồng ý cung cấp dữ liệu ra ngoài.

*Căn cứ: mục 3-5 p923 và mục 3-6 p925–928. Đây là review độ rõ của yêu cầu, chưa phải đánh giá tuân thủ pháp luật.*

## 6. Mục 3-6: Thông tin cá nhân

**Đã có:** Adesso lấy đồng ý trước khi cung cấp dữ liệu cho dịch vụ ngoài; lấy đồng ý phụ huynh khi ký hợp đồng và hệ thống không lưu hồ sơ đó. Phát triển/kiểm thử dùng dữ liệu thử; nếu dùng dữ liệu thật phải có chấp thuận bằng văn bản.

**Đánh giá:** Hướng xử lý đồng ý phụ huynh khớp trả lời ngày24/11. Không cần đề xuất thêm chức năng lưu hồ sơ đồng ý hoặc hỏi lại nội dung đã trả lời.

**Đề xuất bổ sung — ưu tiên trung bình:** Làm rõ thời gian giữ, việc xóa dữ liệu và xử lý các bản sao khi kết thúc sử dụng. Đội lập phương án theo từng loại dữ liệu; Adesso quyết định chính sách nghiệp vụ còn mở. Không tự hiểu kết thúc sử dụng là xóa ngay toàn bộ dữ liệu. Danh sách dữ liệu gửi dịch vụ ngoài cần thống nhất với phần bảo mật ở mục3-5.

*Căn cứ: mục3-6 p925–928; KS, sheet20261122, G18:H18. Vòng đời dữ liệu là đề xuất bổ sung, chưa phải chính sách đã duyệt.*

## 7. Mục 3-7: Biện pháp chống khóa tài khoản SNS

**Đã có:** Áp dụng biện pháp như giới hạn tần suất đăng; nội dung cụ thể sẽ quyết định khi thiết kế.

**Còn thiếu:** Biện pháp và giới hạn cụ thể để đội triển khai, QA kiểm tra. Cần nối với cảnh báo TikTok ở mục3-8 để tránh hiểu rằng giới hạn tần suất giải quyết toàn bộ rủi ro bị hạn chế bài/tài khoản.

**Đề xuất bổ sung — ưu tiên trung bình:** Đội xác định biện pháp, tình huống áp dụng và cách kiểm chứng. Giữ quyết định TikTok hiện có, không hỏi lại nội dung đã trả lời; không ghi cam kết tài khoản sẽ không bị khóa.

*Căn cứ: mục3-7 p930; đối chiếu mục3-8 p943 và KS, sheet20261122, G20:H24.*

## 8. Mục 3-8: Điều kiện tiên quyết và ràng buộc

### Cảnh báo TikTok và giới hạn AI

**Đã có:** Cảnh báo TikTok có thể hạn chế bài/tài khoản; không bảo đảm nội dung hoặc phán đoán AI luôn đúng. Tài liệu vẫn cam kết sửa khi chức năng không chạy đúng thỏa thuận.

**Đề xuất bổ sung — ưu tiên trung bình:** Nối các giới hạn này với cách xử lý sự cố ở mục3-3 và biện pháp ở mục3-7. Đội và QA cần xác định trạng thái, thông báo và cách kiểm tra chức năng liên quan. Việc dịch vụ khác đang hoạt động chưa chứng minh nhà cung cấp cho phép cách sử dụng này.

*Căn cứ: mục3-8 p943–945.*

### Điều kiện thanh toán cần đối chiếu

**Đã có:** Mục3-8 ghi thanh toán qua nhà mạng có thể không dùng được tùy điều kiện.

**Điểm cần kiểm tra:** KS ghi khách chọn Square qua điện thoại sau cuộc họp. Đội cần kiểm tra với nhà cung cấp xem câu giới hạn ở mục3-8 còn phù hợp hay cần cập nhật. Đợt review này chưa xác minh khả năng của Square, ngày cuộc gọi hoặc việc ký hợp đồng; chưa kết luận câu hiện tại sai và chưa đề nghị xóa.

*Căn cứ: mục3-8 p946; KS, sheetアクション一覧, No.16, D17:G17. Việc sửa yêu cầu chức năng thanh toán nằm ngoài phạm vi chương3.*

### Các đầu vào do khách chuẩn bị

Mục3-8 liệt kê các đầu vào như điều khoản, câu chữ thông báo, hình ảnh, giá video, tài khoản và hợp đồng dịch vụ ngoài. Đề xuất BA/đầu mối dự án gắn người phụ trách và ngày cần có cho từng đầu vào để theo dõi phụ thuộc. Đây là đề xuất quản lý tiến độ, chưa phải kết luận khách đang thiếu đầu vào.

*Căn cứ: mục3-8 p932–940; bảo trì sau release tại p951.*

## 9. Ghi chú đối chiếu ngoài chương 3

Các nội dung dưới đây là căn cứ liên quan, không phải hạng mục review hoặc yêu cầu sửa chương khác trong đợt này.

- **Mục2-5 — nơi lưu dữ liệu:** Nội dung này và QA No.101 cần được đối chiếu khi xác định phạm vi sao lưu (3-3), mã hóa (3-5) và dữ liệu cung cấp ra ngoài (3-6). QA No.8 đã trả lời ảnh/video có thể lưu ở cả Supabase và OneDrive. Không tự suy toàn bộ media nằm trong cơ sở dữ liệu. Căn cứ: p885; QA!G101, G9:H9.
- **Mục2-5 — thông tin thẻ:** Cam kết không lưu số thẻ vẫn có ở đây; không coi việc chương3 không lặp lại là đã xóa cam kết.
- **Chương4 — nghiệm thu:** Khi hoàn thiện kế hoạch kiểm thử, BA/QA cần nối các cam kết chương3 đã chốt với điều kiện thử và kết quả đạt. Chương4 p954–956, p963 được dẫn để xem ảnh hưởng đến nghiệm thu; bản review này không đánh giá toàn bộ chương4 hoặc soạn tiêu chí từng chức năng.
- **Ghi chú ước tính trong QA:** Ngoài quy mô và nhật ký đã nêu, cần đối chiếu phạm vi màn quản lý trên điện thoại tại3-1. Ghi chú dẫn ước tính chưa gồm màn quản lý dành cho điện thoại; chúng không thay bản báo giá/SOW ký.

## 10. Việc cần làm sau review

1. BA làm rõ nội dung chương3 theo câu trả lời đã có, giữ phần còn chờ quyết định tách riêng.
2. Đội kỹ thuật và QA đưa phương án cho các thông số còn thiếu, cùng cách kiểm chứng.
3. Chủ dự án/Adesso quyết định phần thuộc thẩm quyền về quy mô bàn giao, mức gián đoạn, chính sách dữ liệu và phạm vi/chi phí.

Chưa tự đặt ngưỡng kỹ thuật, đổi trạng thái phê duyệt hoặc coi mọi đề xuất là điều kiện bắt buộc trước release.

## 11. Nguồn, lịch sử và giới hạn review

Bản trước khi giới hạn phạm vi được giữ tại [history/02_review_truoc_gioi_han_chuong_3_2026-11-25.md](history/02_review_truoc_gioi_han_chuong_3_2026-11-25.md). Bản trước lần biên tập đầu vẫn giữ tại [history/02_review_truoc_bien_tap_2026-11-25.md](history/02_review_truoc_bien_tap_2026-11-25.md).

Lần sửa này tổ chức lại kết quả review theo đúng3-1 đến3-8, không thực hiện vòng xác minh nguồn mới. **p** là thứ tự đoạn XML trong DOCX, không phải trang in. **QA** là bảng hỏi đáp; **KS** là bảng xác nhận. Các đánh giá khoảng trống áp dụng cho phần tài liệu được dẫn, không khẳng định hệ thống thực tế đang lỗi.

- YK3: `source_requiments/24112026/AI育成OS_要件定義書.docx`, bản0.3 ngày24/11/2026, SHA-256 `a44b25c8d046a41212d11a894d5fee052145ac3cc64da0fecfd6f006b6a114bf`. `p` là thứ tự `w:p` trong `word/document.xml`, tính cả đoạn trống, không phải trang in. Đã mở lại chữ chương3/4 và các đoạn liên quan §2-5; không kiểm trực quan57ảnh hoặc xác minh toàn bộ luồng/màn trong đợt này.
- QA: `source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx`, SHA-256 `388b9264fe884a25956ef56523a64d597af6a939766b826cabb31b67c16f6554`; quét văn bản cả5sheet, đối chiếu G9:H9 và G101 cùng các dòng liên quan.
- KS: `source_requiments/Q&A/要件定義確認シート_AI育成OS.xlsx`, SHA-256 `3686e10dd1e1c3a10575506c19d76f166777f480c9d7dff1706757033bc3fb03`; quét văn bản cả5sheet; `20261122!G18:H18` về phụ huynh, `G20:H24` về TikTok, `アクション一覧!D17:G17` về cổng thanh toán.
- GJ19: `source_requiments/19112926/20261119_AMCOLAB様打ち合わせ_画面定義書の確認_議事録.md`, §18/action7; đã mở lại đoạn gốc. Là phân công FCP–AMCOLAB, không tự là khách duyệt mức dịch vụ.
- Truy vết nội bộ đã đối chiếu: FND-0037; `delivery-24112026-impact.csv` (EV-1328 và ý QA101); các nội dung cũ trong thư mục này. Chưa kiểm lại trực quan workbook15 và toàn bộ SD: không tuyên bố G4 hoàn tất hoặc phát hành Q&A mới.

Không thay đổi trạng thái gate chung: G1 BLOCKED theo hồ sơ hiện hành; G2–G4 phụ thuộc còn STALE, chưa cấp PASS cho bản bổ sung này; G5 BLOCKED vì thiếu reviewer khác tác giả. Không cấp G6–G8, không gán VERIFIED hoặc phê duyệt khách. Nguồn/hash đổi thì phải kiểm lại các nhận định liên quan trước dùng.
