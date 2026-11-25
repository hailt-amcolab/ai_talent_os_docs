# Review yêu cầu phi chức năng của khách hàng

Ngày review: **25/11/2026**. Người thực hiện: **Codex**. Tài liệu được review: **AI育成OS_要件定義書, bản 0.3 ngày 24/11/2026**, tập trung vào chương 3 và phần nghiệm thu liên quan ở chương 4.

**Tài liệu đã nêu các nhóm yêu cầu cần thiết, nhưng chưa đủ rõ để chốt nghiệm thu phần phi chức năng.** Nhiều thông số còn để “quyết định khi thiết kế”; một số nội dung chưa cập nhật theo Q&A và chưa có cách kiểm tra đạt hay không đạt.

Đây là bản làm việc nội bộ, chưa qua người review độc lập và chưa được khách duyệt. Những phần ghi **Đề xuất bổ sung** là đề nghị của đội, chưa phải yêu cầu đã chốt.

## 1. Các nội dung cần cập nhật hoặc đối chiếu

### 1.1. Cập nhật nơi lưu dữ liệu theo câu trả lời mới

**Tài liệu đang ghi:** Mục 2-5 vẫn ghi thông tin tài năng, mục tiêu, bí quyết, thành tích, ảnh và video lưu trong OneDrive.

**Điểm cần sửa:** QA No.101 đã xác nhận AI đọc và ghi dữ liệu trong Supabase, đồng thời yêu cầu cập nhật bản yêu cầu. Riêng ảnh và video, QA No.8 đã có trả lời ngày 19/11 rằng có thể lưu ở cả Supabase và OneDrive. Vì vậy cần phân biệt dữ liệu nào lưu ở đâu, tránh hiểu rằng toàn bộ dữ liệu đều nằm trong OneDrive hoặc toàn bộ ảnh/video đều chuyển vào cơ sở dữ liệu.

**Đề xuất bổ sung:** Đội lập bảng nơi lưu cho từng nhóm dữ liệu, rồi cập nhật phần sao lưu, mã hóa và cung cấp dữ liệu cho dịch vụ ngoài theo bảng đó.

**Bên xử lý:** Đội thiết kế hệ thống; chỉ chuyển khách quyết định phần chính sách hoặc phạm vi còn thiếu sau khi đối chiếu câu trả lời hiện có.

*Căn cứ: bản 0.3, mục 2-5 (p885); QA!G101 và QA!G9:H9, No.8.*

### 1.2. Ghi rõ cam kết sao lưu đã được xác nhận

**Tài liệu đang ghi:** Mục 3-3 đã nhắc sao lưu, nhưng để đối tượng, tần suất và thời gian giữ cho giai đoạn thiết kế.

**Điểm cần bổ sung:** QA No.101 đã xác nhận dữ liệu hệ thống có bản sao lưu. Hai nội dung này không mâu thuẫn; bản yêu cầu cần ghi rõ phần đã xác nhận và phần chi tiết còn phải quyết định. Chưa thể coi việc có bản sao lưu là bằng chứng khôi phục được dữ liệu khi có sự cố.

**Đề xuất bổ sung:** Ghi loại dữ liệu được sao lưu, lịch sao lưu, thời gian giữ, người phụ trách và cách thử khôi phục. Phần chưa chốt cần có người xử lý và thời hạn hoàn thành.

**Bên xử lý:** Đội kỹ thuật đề xuất; Adesso/chủ dự án xác nhận mức mất dữ liệu và thời gian ngừng sử dụng có thể chấp nhận. Tiếp tục theo dõi tại FND-0037 / QA No.29, liên kết No.101; không hỏi lại việc có sao lưu hay không.

*Căn cứ: bản 0.3, mục 3-3 (p911–913); QA!G101.*

### 1.3. Đối chiếu thanh toán sau khi khách chọn Square

**Tài liệu đang ghi:** Phần nghiệp vụ 11-4 còn để GMO là ứng viên và yêu cầu thanh toán qua nhà mạng lẫn thẻ. Mục 3-8 ghi thanh toán qua nhà mạng có thể không dùng được tùy điều kiện.

**Điểm cần kiểm tra:** Bảng hành động ghi khách chọn Square qua điện thoại sau cuộc họp. Chưa có đủ bằng chứng trong đợt review này để kết luận Square đáp ứng hoặc không đáp ứng các hình thức thanh toán đang yêu cầu; ngày cuộc gọi và việc ký hợp đồng cũng chưa rõ.

**Đề xuất bổ sung:** Đội kiểm tra các hình thức thanh toán, thu phí tháng và phí video với nhà cung cấp, rồi cập nhật tài liệu theo kết quả. Chưa nên kết luận câu ở mục 3-8 sai hoặc xóa câu này.

**Bên xử lý:** Đội tích hợp và nhà cung cấp; khách quyết định nếu phải thay đổi hình thức thanh toán hoặc phạm vi.

*Căn cứ: bản 0.3, mục 11-4 và 3-8 (p946); KS, sheet アクション一覧, No.16, D17:G17.*

### 1.4. Tách yêu cầu kỹ thuật khỏi phần cần thống nhất về phạm vi và chi phí

Có ba điểm cần đối chiếu với điều kiện ước tính:

| Nội dung | Bản yêu cầu đang ghi | Ghi chú đối chiếu ước tính |
|---|---|---|
| Quy mô | Mục tiêu 200–300 người, tương lai 1.000 người | Khoảng 150 tài năng và 8 tài khoản văn phòng |
| Màn quản lý trên điện thoại | Màn duyệt và màn chỉ thị AI phải thao tác được | Chưa gồm màn quản lý dành cho điện thoại |
| Nhật ký | Ghi thao tác và kết quả xử lý | Chỉ nêu nhật ký xem |

**Đánh giá:** Đây là các chênh lệch cần thống nhất phạm vi và chi phí. Chưa có bản báo giá/SOW ký độc lập trong bộ nguồn để kết luận bên nào đã cam kết phần nào. Không tự giảm quy mô xuống 150 người hoặc bỏ các yêu cầu đang ghi.

**Bên xử lý:** Chủ dự án và đầu mối thương mại đối chiếu văn bản có thẩm quyền; đội kỹ thuật cung cấp đánh giá tác động.

*Căn cứ: bản 0.3, mục 3-1, 3-2, 3-4; các ghi chú đối chiếu ước tính trong QA. Đây là ghi chú dẫn lại ước tính, không thay bản ký.*

## 2. Các nội dung còn thiếu hoặc chưa đủ rõ

Mức ưu tiên dưới đây là đánh giá nội bộ. “Cao” nghĩa là cần xử lý trước khi chốt điều kiện nghiệm thu liên quan; “Trung bình” nghĩa là cần cụ thể hóa trong thiết kế và kế hoạch kiểm thử.

### 2.1. Hiệu năng và quy mô sử dụng — ưu tiên cao

**Đã có:** Các mốc 30, 100, 200–300 và 1.000 người; yêu cầu chuẩn bị xong nội dung trước giờ nhắn buổi sáng. Tài liệu chỉ yêu cầu kiểm tra xử lý sáng ở số người bắt đầu sử dụng.

**Còn thiếu:** Quy mô phải hỗ trợ ở lần bàn giao, số người dùng đồng thời, lượng dữ liệu dùng để thử và thời gian đáp ứng chấp nhận được. Thử ở khoảng 30 người chưa chứng minh hệ thống đáp ứng ở 300 hoặc 1.000 người.

**Đề xuất bổ sung:** Đội và QA lập điều kiện thử tải, cách đo và ngưỡng đạt. Chủ dự án chốt quy mô bàn giao, phân biệt với mục tiêu mở rộng sau này. Chưa tự đặt số giây hoặc cam kết hỗ trợ 1.000 người.

*Căn cứ: mục 3-2, p906–909.*

### 2.2. Vận hành khi có sự cố — ưu tiên cao

**Đã có:** Khi dịch vụ ngoài lỗi, dừng chức năng bị ảnh hưởng và giữ các chức năng khác hoạt động. Biên bản 19/11 giao FCP và AMCOLAB rà các điểm lỗi và cách vận hành.

**Còn thiếu:** Cách phát hiện lỗi, người nhận cảnh báo, chức năng bị ảnh hưởng, việc người dùng làm tiếp và cách phục hồi. Một dịch vụ dùng chung có thể làm nhiều chức năng bị ảnh hưởng cùng lúc.

**Đề xuất bổ sung:** Đội lập danh sách tình huống lỗi và cách xử lý cho từng tình huống; xác định thời gian gián đoạn chấp nhận được và kiểm thử phục hồi. Phần sao lưu tiếp tục xử lý theo mục 1.2.

*Căn cứ: mục 3-3, p911–913; biên bản GJ19, mục18 và hành động7. Theo dõi cùng FND-0037.*

### 2.3. Tránh đăng bài hoặc tính tiền trùng khi thử lại — ưu tiên cao

**Đã có:** Các thông báo và ghi nhận kết quả khi đăng bài, tạo video hoặc thanh toán thất bại.

**Còn thiếu:** Cách xử lý khi dịch vụ ngoài đã hoàn thành nhưng hệ thống không nhận được phản hồi. Nếu coi đó là thất bại rồi gửi lại, hệ thống có thể đăng hoặc tính tiền hai lần.

**Đề xuất bổ sung:** Đội xác định cách kiểm tra lại kết quả, khi nào được thử lại và cách tránh xử lý trùng. QA bổ sung tình huống mất kết nối hoặc không nhận được phản hồi vào kiểm thử.

*Căn cứ: mục 3-3 p912, mục 3-4 p917 và phụ lụcB p1316–1335. Đây là đề xuất thiết kế từ khoảng trống xử lý lỗi, chưa phải quy tắc đã duyệt.*

### 2.4. Kiểm tra quyền truy cập, gồm cả thao tác của AI — ưu tiên cao

**Đã có:** Dẫn chiếu quy tắc đăng nhập, yêu cầu mã hóa và bảo vệ khóa kết nối.

**Còn thiếu:** Cách chứng minh quyền truy cập được áp dụng khi AI đọc/ghi dữ liệu và khi dữ liệu nằm ở các nơi lưu khác nhau. Đợt review này không kết luận toàn bộ tài liệu thiếu phân quyền.

**Đề xuất bổ sung:** Đội và QA lập bảng quyền từ yêu cầu chức năng hiện có; kiểm tra tài năng không xem/sửa dữ liệu của người khác, tài khoản bị vô hiệu hóa không tiếp tục thao tác trái quyền và AI chỉ truy cập dữ liệu được phép.

*Căn cứ: mục 3-5 p920–923; mục 2-5 p885; QA!G101 về việc AI đọc/ghi dữ liệu.*

### 2.5. Dữ liệu gửi cho dịch vụ AI — ưu tiên cao

**Đã có:** Chỉ gửi thông tin cần thiết cho hội thoại và tạo bài; không để dịch vụ AI dùng dữ liệu đó để huấn luyện. Khi kiểm thử bằng dữ liệu thật phải có chấp thuận bằng văn bản.

**Còn thiếu:** Danh sách dữ liệu gửi cho từng dịch vụ và bằng chứng dịch vụ đáp ứng cam kết. Việc không dùng để huấn luyện chưa trả lời dịch vụ giữ dữ liệu bao lâu hoặc xóa lúc nào.

**Đề xuất bổ sung:** Đội kiểm tra với từng nhà cung cấp và ghi rõ dữ liệu gửi, thời gian lưu, cách xóa và bằng chứng đáp ứng. Adesso xác nhận phạm vi đồng ý cung cấp dữ liệu ra ngoài.

*Căn cứ: mục 3-5 p923 và mục 3-6 p925–928. Đây là review độ rõ của yêu cầu, chưa phải đánh giá tuân thủ pháp luật.*

### 2.6. Điều kiện nghiệm thu phần phi chức năng — ưu tiên cao

**Đã có:** Chương 4 nêu kiểm tra nghiệp vụ, chức năng và màn hình; tiêu chí theo từng chức năng sẽ bổ sung vào phụ lụcA. Dịch vụ chưa hoàn thành hợp đồng hoặc xét duyệt có thể được tách khỏi nghiệm thu.

**Còn thiếu:** Cách kiểm tra các cam kết chương 3, ví dụ hiệu năng, phục hồi dữ liệu và bảo mật. Việc tách một dịch vụ còn có thể ảnh hưởng đến cả luồng nghiệp vụ chính.

**Đề xuất bổ sung:** BA và QA liên kết từng cam kết cần kiểm chứng với điều kiện thử, kết quả đạt, bằng chứng và người xác nhận. Chủ dự án chốt phần loại trừ cùng tác động đến các chức năng phụ thuộc trước khi duyệt nghiệm thu.

Khách yêu cầu tiêu chí theo chức năng; có thể gắn các kiểm tra phi chức năng vào chức năng liên quan hoặc kế hoạch kiểm thử chung. Đợt này chưa soạn tiêu chí cho toàn bộ chức năng.

*Căn cứ: mục 4-1 p954–956 và mục 4-3 p963.*

### 2.7. Thiết bị, trình duyệt và hệ thống đang chạy — ưu tiên trung bình

**Đã có:** Dùng app qua trình duyệt và thêm vào màn hình chính; iPhone cần iOS16.4 trở lên để nhận thông báo. Có môi trường thật/kiểm thử và yêu cầu không ảnh hưởng app Instagram DM đang chạy.

**Còn thiếu:** Danh sách thiết bị, hệ điều hành, trình duyệt phải hỗ trợ; cách kiểm tra việc cài đặt, nhận thông báo và không ảnh hưởng hệ thống cũ.

**Đề xuất bổ sung:** Đội và QA chốt danh sách môi trường thử, kiểm tra các tài nguyên dùng chung và thử lại chức năng Instagram DM liên quan. Điều kiện iOS16.4 trong tài liệu không có nghĩa mọi thông báo đều đến nơi.

*Căn cứ: mục 3-1, p901–904; giới hạn thông báo tại mục 3-8, p942.*

### 2.8. Dung lượng và thời gian giữ dữ liệu — ưu tiên trung bình

**Đã có:** Giới hạn từng tệp, tổng dung lượng và thời gian giữ nhật ký sẽ quyết định khi thiết kế.

**Còn thiếu:** Cách xử lý khi đầy kho và vòng đời dữ liệu khi kết thúc sử dụng: giữ gì, xóa gì, khi nào xóa và xử lý bản sao thế nào.

**Đề xuất bổ sung:** Đội lập bảng theo từng loại dữ liệu. Adesso quyết định chính sách nghiệp vụ còn mở. Chưa tự hiểu rằng kết thúc sử dụng là xóa ngay toàn bộ dữ liệu.

*Căn cứ: mục 3-2 p908, mục 3-4 p918 và phạm vi dữ liệu cá nhân tại mục 3-6.*

### 2.9. Nội dung và quyền xem nhật ký — ưu tiên trung bình

**Đã có:** Ghi việc xem dữ liệu, duyệt, đổi trạng thái, dừng/mở lại đăng, đổi cài đặt và kết quả xử lý. Không để lộ khóa kết nối trong nhật ký.

**Còn thiếu:** Thông tin tối thiểu cần ghi để điều tra sự cố và ai được xem nhật ký.

**Đề xuất bổ sung:** Đội và QA xác định người thao tác, thời điểm, dữ liệu liên quan, kết quả và mã để nối các bước xử lý. Giới hạn quyền xem và tránh ghi thông tin nhạy cảm không cần thiết. Phần phạm vi/chi phí đối chiếu riêng theo mục1.4.

*Căn cứ: mục 3-4 p915–918; mục 3-5 p922.*

### 2.10. Rủi ro TikTok và giới hạn của AI — ưu tiên trung bình

**Đã có:** Giới hạn tần suất đăng, cảnh báo TikTok có thể hạn chế bài/tài khoản và không bảo đảm nội dung hoặc phán đoán AI luôn đúng. Mục 3-8 vẫn cam kết sửa khi chức năng không chạy đúng thỏa thuận.

**Còn thiếu:** Liên kết rõ giữa các giới hạn này với cách hệ thống xử lý khi bị hạn chế hoặc phát sinh lỗi. Giới hạn tần suất không giải quyết toàn bộ rủi ro TikTok đã ghi ở mục3-8.

**Đề xuất bổ sung:** Đội và QA nối các tình huống bị hạn chế với trạng thái, thông báo và tiêu chí kiểm thử chức năng. Giữ quyết định TikTok hiện có; không hỏi lại nội dung đã được trả lời. Việc dịch vụ khác đang hoạt động chưa chứng minh nhà cung cấp cho phép cách sử dụng này.

*Căn cứ: mục 3-7 p930; mục 3-8 p943–945; KS, sheet20261122, G20:H24.*

## 3. Những nội dung có thể giữ về hướng yêu cầu

Qua phần đã đọc, chưa có căn cứ yêu cầu thay đổi các hướng sau. Đội vẫn cần cụ thể hóa cách kiểm chứng:

- Tách môi trường thật và môi trường kiểm thử; bảo vệ app Instagram DM đang chạy.
- Màn quản lý lấy máy tính làm chính; màn duyệt và màn chỉ thị AI thao tác được trên điện thoại. Phạm vi thương mại cần đối chiếu riêng.
- Mã hóa đường truyền và dữ liệu lưu, giấu khóa kết nối và giới hạn dữ liệu gửi AI.
- Không lưu số thẻ trong hệ thống. Nội dung này nằm ở mục2-5, không bị xóa khỏi bản yêu cầu.
- Adesso lấy đồng ý phụ huynh bên ngoài hệ thống; hệ thống không lưu hồ sơ đồng ý. Nội dung mục3-6 khớp trả lời ngày24/11 trong KS, sheet20261122, G18:H18.

## 4. Thứ tự xử lý đề nghị

1. **BA cập nhật tài liệu theo trả lời đã có:** nơi lưu dữ liệu, cam kết sao lưu và lựa chọn cổng thanh toán sau khi đội kiểm tra khả năng đáp ứng.
2. **Đội kỹ thuật và QA đưa phương án cụ thể:** tải cần thử, thời gian đáp ứng, sao lưu/khôi phục, vận hành khi lỗi, phân quyền, dung lượng và nhật ký.
3. **Chủ dự án/Adesso quyết định phần thuộc thẩm quyền:** quy mô bàn giao, mức gián đoạn hoặc mất dữ liệu chấp nhận được, chính sách dữ liệu và thay đổi phạm vi/chi phí.
4. **BA và QA hoàn thiện tiêu chí nghiệm thu:** ghi cách thử và kết quả đạt cho các cam kết đã chốt; làm rõ các phần loại trừ.

Các con số còn thiếu cần có phương án và người xác nhận. Bản review này chưa tự đặt ngưỡng hoặc chuyển đề xuất thành yêu cầu đã duyệt.

## 5. Nguồn, lịch sử và giới hạn review

Bản trước khi biên tập được giữ tại [history/02_review_truoc_bien_tap_2026-11-25.md](history/02_review_truoc_bien_tap_2026-11-25.md). Bản hiện tại đã gộp các hiệu chỉnh vào nội dung chính: không kết luận tài liệu thiếu hoàn toàn sao lưu, không bỏ qua trả lời về ảnh/video và không kết luận khả năng của Square khi chưa kiểm tra.

Trong phần dẫn nguồn, **p** là thứ tự đoạn XML trong tệp DOCX, tính cả đoạn trống; không phải số trang in. **QA** là bảng hỏi đáp; **KS** là bảng xác nhận. Các đánh giá “còn thiếu” áp dụng cho phần tài liệu được nêu, không khẳng định hệ thống thực tế đang có lỗi.

- YK3: `source_requiments/24112026/AI育成OS_要件定義書.docx`, bản0.3 ngày24/11/2026, SHA-256 `a44b25c8d046a41212d11a894d5fee052145ac3cc64da0fecfd6f006b6a114bf`. `p` là thứ tự `w:p` trong `word/document.xml`, tính cả đoạn trống, không phải trang in. Đã mở lại chữ chương3/4 và các đoạn liên quan §2-5; không kiểm trực quan57ảnh hoặc xác minh toàn bộ luồng/màn trong đợt này.
- QA: `source_requiments/Q&A/AI-Talent-OS_Q&A表.xlsx`, SHA-256 `388b9264fe884a25956ef56523a64d597af6a939766b826cabb31b67c16f6554`; quét văn bản cả5sheet, đối chiếu G9:H9 và G101 cùng các dòng liên quan.
- KS: `source_requiments/Q&A/要件定義確認シート_AI育成OS.xlsx`, SHA-256 `3686e10dd1e1c3a10575506c19d76f166777f480c9d7dff1706757033bc3fb03`; quét văn bản cả5sheet; `20261122!G18:H18` về phụ huynh, `G20:H24` về TikTok, `アクション一覧!D17:G17` về cổng thanh toán.
- GJ19: `source_requiments/19112926/20261119_AMCOLAB様打ち合わせ_画面定義書の確認_議事録.md`, §18/action7; đã mở lại đoạn gốc. Là phân công FCP–AMCOLAB, không tự là khách duyệt mức dịch vụ.
- Truy vết nội bộ đã đối chiếu: FND-0037; `delivery-24112026-impact.csv` (EV-1328 và ý QA101); các nội dung cũ trong thư mục này. Chưa kiểm lại trực quan workbook15 và toàn bộ SD: không tuyên bố G4 hoàn tất hoặc phát hành Q&A mới.

Không thay đổi trạng thái gate chung: G1 BLOCKED theo hồ sơ hiện hành; G2–G4 phụ thuộc còn STALE, chưa cấp PASS cho bản bổ sung này; G5 BLOCKED vì thiếu reviewer khác tác giả. Không cấp G6–G8, không gán VERIFIED hoặc phê duyệt khách. Nguồn/hash đổi thì phải kiểm lại các nhận định liên quan trước dùng.
