# Đánh giá khả thi chương 3 theo tài liệu và tech stack khách cung cấp

Ngày đánh giá: **25/11/2026**. Người thực hiện: **Codex, tác giả phân tích kỹ thuật**. Phạm vi: **3-1 đến 3-8** của bản yêu cầu0.3 ngày 24/11/2026.

**Bản này thay thế cách đánh giá dựa trên code ở bản trước.** Chỉ dùng tài liệu trong bộ nguồn khách cung cấp để xác định yêu cầu, phương án dịch vụ và các điều kiện còn thiếu. Không dùng code demo, kết quả test, Docker hoặc kiến trúc nội bộ để kết luận khả thi, mức hoàn thành hay chặn release.

**Kết luận:** Chưa thấy mâu thuẫn buộc phải thay toàn bộ nhóm dịch vụ được đề xuất. Phần lớn yêu cầu có hướng đáp ứng, nhưng tài liệu chưa mô tả đủ cách phối hợp dịch vụ và điều kiện vận hành để cam kết đạt. Một số câu quá rộng nếu hiểu là bảo đảm tuyệt đối. Không có căn cứ từ tài liệu để nói hệ thống đã đạt hoặc chưa triển khai một chức năng cụ thể.

## 1. Tài liệu và phương án dùng để đánh giá

| Mã | Nguồn | Phạm vi sử dụng |
|---|---|---|
| YK3 | `source_requiments/24112026/AI育成OS_要件定義書.docx`, bản 0.3 ngày 24/11/2026 | Chương 3, đoạn XML p899–951; mục 2-5 chỉ dùng đối chiếu nơi lưu dữ liệu |
| EXT24 | `source_requiments/24112026/AI育成OS_外部サービスの比較_20261124.pptx`,14 slide, ngày 24/11/2026 | Phương án dịch vụ, khả năng và chi phí mà bên lập tài liệu đã trình bày |

Đã mở lại chữ trong hai tệp gốc. `p` là thứ tự đoạn XML trong DOCX, tính cả đoạn trống, không phải trang in. Không dùng ảnh minh họa chưa kiểm trực quan làm bằng chứng. Hash nguồn và phạm vi đọc tại [hồ sơ đối chiếu](technical-design-review-2026-11-25.json).

EXT24 do **FutureCore Partners lập để trình Adesso**. Việc có trong bộ nguồn không có nghĩa mọi thông số, điều khoản provider hoặc phạm vi thương mại đã được khách duyệt. Giá, dung lượng và khả năng dịch vụ dưới đây là **nội dung slide tại thời điểm lập**, không phải xác minh độc lập với nhà cung cấp trong đợt này.

### Tech stack có căn cứ trong bộ nguồn

| Thành phần | Phương án trong tài liệu | Vị trí |
|---|---|---|
| Hạ tầng | Vercel, Supabase, Xserver VPS; dùng VPS đã có | EXT24 slide 2,11–12 |
| Lịch xử lý sáng | Nâng Vercel lên gói trả phí để chạy tự động đúng thời điểm | EXT24 slide 11 |
| Tách khỏi app DM | Supabase được ký riêng với app Instagram DM | EXT24 slide 11 |
| AI | OpenAI cho hội thoại, viết bài, tìm chủ đề; Manager dùng ChatGPT Business kết nối hệ thống | EXT24 slide 2,9–10 |
| Video | fal.ai, với Kling/MiniMax H3 và lựa chọn model sau khi thử | EXT24 slide 4–6 |
| SNS | Upload-Post cho Instagram, TikTok, YouTube và lấy thành tích | EXT24 slide 2,7–8 |
| Lưu dữ liệu | Mục 2-5 có OneDrive; slide hạ tầng nêu khả năng lưu ảnh/video ở Tokyo | YK3 p885; EXT24 slide 11–12 |

Tài liệu dịch vụ này không đủ để khẳng định framework backend, queue, cấu hình VPS, số worker hoặc phân bố mọi tác vụ. Vì vậy không mặc định Hono, Redis/BullMQ, một máy chạy chung hay cấu hình 4 vCPU/8 GB là phương án khách đưa.

## 2. Đánh giá từng mục phi chức năng

### 3-1. Thiết bị và môi trường

**Đánh giá: có hướng đáp ứng; chưa thấy yêu cầu quá mức ở phần giao diện.** Khách yêu cầu app trình duyệt thêm vào màn hình chính; Manager dùng web, ưu tiên máy tính, hai màn cần thao tác trên điện thoại. Khách cũng không yêu cầu giao diện giống từng chi tiết trên mọi thiết bị. Những yêu cầu này không mâu thuẫn với phương án dịch vụ trong EXT24. [YK3 p901–902; EXT24 slide 2]

**Cần bổ sung vào thiết kế:** danh sách OS/browser và màn cần hỗ trợ; điều kiện cài đặt, nhận thông báo; HTTPS và cách kiểm trên thiết bị mục tiêu. Chưa có căn cứ chọn phiên bản framework hoặc bắt làm ứng dụng native.

**Môi trường thật và kiểm thử:** YK3 yêu cầu cả hai; EXT24 slide 14 nói dùng dịch vụ thật để phát triển/kiểm thử sau khi ký hợp đồng. Cần làm rõ môi trường nào dùng project, dữ liệu, tài khoản và khóa nào để việc thử không gửi bài hoặc tính phí ngoài dự kiến. “Dùng dịch vụ thật” không có nghĩa dùng chung dữ liệu production. [YK3 p903; EXT24 slide 14]

**Không ảnh hưởng app DM:** Slide11 đã nêu biện pháp tách hợp đồng Supabase. Đây là điểm có sẵn, không được mô tả như tài liệu chưa có phương án cô lập. Tuy nhiên tách Supabase chưa chứng minh Vercel, VPS hoặc các tài nguyên còn lại được tách. [YK3 p904; EXT24 slide 11]

**Cần bổ sung:** sơ đồ phân bổ dịch vụ và phần dùng chung với app DM; ranh giới cấu hình/quyền, tài nguyên và cách kiểm không ảnh hưởng. Chưa có căn cứ kết luận đang dùng chung một VPS hoặc phải mua VPS mới.

### 3-2. Hiệu năng và quy mô

**Đánh giá: mục tiêu 30→100→200–300→1.000 người không tự nó vô lý.** Nhưng tên dịch vụ và mức phí cơ bản không đủ chứng minh đáp ứng quy mô. Slide13 chỉ tính các mốc 50/100/150 người, với giả định một bài/người/ngày; chưa phải sizing hoặc cam kết hiệu năng cho 300/1.000 người. [YK3 p906; EXT24 slide 13]

**Cần bổ sung:** quy mô phải hỗ trợ ở lần bàn giao, số người dùng đồng thời, số lượt hội thoại/model/video, khối lượng dữ liệu, quota và tiêu chí thử tải. Mốc tương lai 1.000 người cần tách khỏi điều kiện nghiệm thu ban đầu. Khách chỉ yêu cầu kiểm xử lý sáng ở số người bắt đầu, không yêu cầu chứng minh 1.000 người ngay. [YK3 p907]

**Xử lý sáng:** Slide11 đã chọn nâng Vercel lên gói trả phí cho việc kích hoạt đúng giờ. Đây là hướng xử lý lịch; chưa chứng minh toàn bộ đọc thông tin, lấy thành tích và tạo chủ đề sẽ hoàn tất trước giờ nhắn. [YK3 p907; EXT24 slide 11]

**Cần bổ sung:** lịch bắt đầu, cửa sổ hoàn thành, nơi thực thi công việc, giới hạn thời lượng tác vụ của gói được chọn, xử lý đồng thời và hành vi khi provider chậm/lỗi. Kích hoạt đúng giờ khác hoàn tất đúng giờ. Chưa có dữ liệu đủ để kết luận phải đổi Vercel hoặc thêm queue cụ thể.

**Dung lượng:** Slide12 nêu 100 GB lưu trữ và 250 GB truyền tải trong lượng tính phí cơ bản, đồng thời nói dùng thêm thì trả thêm. YK3 chưa chốt giới hạn từng tệp/tổng kho. Hai phần không mâu thuẫn, nhưng chưa đủ lập ngân sách theo quy mô. [YK3 p908–909; EXT24 slide 11–13]

**Cần bổ sung:** nơi lưu từng nhóm dữ liệu, dung lượng trung bình/tối đa, thời gian giữ, số bản sao và lượng tải xuống/provider đọc file. Dự toán có thể dùng `số người × số tệp/người × dung lượng/tệp × thời gian giữ`; phải nêu giả định, chưa tự đặt hạn mức. Không suy “lưu được video vài trăm MB” nghĩa là mọi đường upload trong hệ thống đều đáp ứng.

### 3-3. Thời gian hoạt động, sự cố và sao lưu

**Đánh giá: sao lưu và cô lập lỗi là mục tiêu hợp lý, nhưng mô tả cô lập lỗi quá rộng nếu áp dụng cho mọi dịch vụ.** OpenAI, fal.ai, Upload-Post đảm nhiệm các nhóm chức năng khác nhau nên có thể thiết kế giảm ảnh hưởng chéo. Với dịch vụ hạ tầng dùng chung, phạm vi ảnh hưởng tùy cách phân bổ mà tài liệu chưa mô tả. Không thể từ danh sách stack kết luận mọi lỗi đều chỉ làm dừng một chức năng. [YK3 p911–913; EXT24 slide 2,11]

**Cần bổ sung:** bảng phụ thuộc chức năng–dịch vụ; trạng thái khi lỗi, chức năng còn dùng được, người được báo, việc khôi phục và kết quả chưa rõ khi mất phản hồi. Việc thử lại đăng bài hoặc thanh toán cần tránh tạo tác động trùng; cơ chế cụ thể là thiết kế của đội, không mặc định công nghệ queue.

**Sao lưu:** YK3 đã nhắc đối tượng/tần suất/thời gian giữ sẽ chốt khi thiết kế. Tài liệu chưa đủ để xác nhận backup bao phủ DB, ảnh/video, OneDrive hay các cấu hình cần dựng lại hệ thống. Cũng chưa đủ để kết luận nhà cung cấp hiện không có backup.

**Cần bổ sung:** bản đồ dữ liệu và phạm vi backup từng kho; tần suất, thời gian giữ, mức mất dữ liệu chấp nhận được, thời gian khôi phục và cách thử phục hồi. Không đồng nhất sao lưu DB với sao lưu toàn bộ file. Chỉ quyết định gói/biện pháp backup sau khi có mức cam kết cần đạt.

**Cam kết nên thu hẹp:** “dịch vụ ngoài lỗi thì các chức năng khác vẫn dùng” nên áp dụng theo bảng phụ thuộc. YK3 chưa yêu cầu zero downtime hoặc 24/7, nên không tự thêm hệ thống dự phòng nhiều máy vào phạm vi.

### 3-4. Ghi thao tác và kết quả xử lý

**Đánh giá: hợp lý và không có mâu thuẫn rõ với stack đề xuất.** Khách yêu cầu ghi lượt xem, thao tác duyệt/thay đổi và kết quả đăng bài/lấy thành tích/video/thu phí. Tài liệu chưa mô tả việc ghi, truy xuất và lưu giữ các bản ghi này. [YK3 p915–918]

**Cần bổ sung:** ai làm, lúc nào, đối tượng nào, kết quả gì; cách liên kết yêu cầu của hệ thống với kết quả provider; người được xem và thời gian giữ. Phải phân biệt lỗi chắc chắn với chưa biết kết quả. Chưa có căn cứ yêu cầu thêm một dịch vụ log trả phí riêng hoặc kết luận nhật ký đã/ chưa triển khai.

### 3-5. Bảo mật

**Đánh giá: mã hóa, bảo vệ khóa và giới hạn dữ liệu gửi AI là yêu cầu hợp lý.** Danh sách dịch vụ có thể là đầu vào thiết kế, nhưng chưa chỉ ra ranh giới phân quyền, đường truyền và kho nào nằm trong cam kết. [YK3 p920–923; EXT24 slide 2,9,11]

**Cần bổ sung:** sơ đồ dữ liệu đi qua từng dịch vụ; quyền của Talent/Manager/AI; nơi giữ khóa; yêu cầu mã hóa đường truyền, dữ liệu lưu và bản sao; kiểm quyền ở mọi đường truy cập, gồm kết nối ChatGPT. Không suy dùng Supabase là ứng dụng tự có đầy đủ phân quyền, cũng không suy phải mã hóa riêng từng cột.

**Không dùng dữ liệu để huấn luyện:** EXT24 slide 9 nói dữ liệu gửi OpenAI không dùng để học; slide 4 nói fal.ai sẽ cấu hình không lưu ảnh/video. Đây là các tuyên bố trong nguồn, chưa phải bằng chứng hợp đồng/cấu hình cụ thể của từng endpoint/model. “Không huấn luyện” và “không lưu” là hai cam kết khác nhau. [YK3 p923; EXT24 slide 4,6,9–10]

**Cần bổ sung:** bảng cam kết theo OpenAI API, ChatGPT Business, fal.ai và model video được chọn; xác nhận phạm vi dữ liệu, điều kiện hợp đồng/cấu hình và bên kiểm tra. Chưa kết luận phải mua zero-retention hoặc mọi model trên fal.ai đều có chính sách như nhau. Các kiểm tra provider này thuộc đội/provider, không phải câu hỏi kỹ thuật đẩy sang khách.

### 3-6. Thông tin cá nhân

**Đánh giá: phân vai trong tài liệu có thể thực hiện được.** Adesso lấy đồng ý về cung cấp dữ liệu ra ngoài và đồng ý phụ huynh; hệ thống không lưu hồ sơ đồng ý. Thiết kế không cần tự thêm chức năng quản lý hồ sơ phụ huynh. [YK3 p925–928]

**Cần bổ sung:** danh sách dữ liệu/dịch vụ nhận để Adesso đối chiếu phạm vi đồng ý; quy trình chỉ đưa dữ liệu đủ điều kiện vào hệ thống; môi trường thử dùng dữ liệu giả hoặc dữ liệu thật được chấp thuận bằng văn bản.

**Điểm cần phân biệt:** Slide11–12 nói có thể lưu ảnh/video ở Tokyo. Điều đó không chứng minh mọi dữ liệu xử lý tại OpenAI, ChatGPT, fal.ai và Upload-Post cũng chỉ nằm tại Nhật. YK3 mục 3-6 chưa nêu nghĩa vụ toàn bộ xử lý phải ở Nhật, nên không tự thêm nghĩa vụ đó; nếu hai bên muốn cam kết như vậy thì phải kiểm từng dịch vụ. [EXT24 slide 2,11–12]

### 3-7. Chống khóa tài khoản SNS

**Đánh giá: giới hạn tần suất là biện pháp hợp lý; không thể từ đó bảo đảm tài khoản không bị khóa.** Khách đã nêu giới hạn bảo đảm tại 3-8. Không có căn cứ gọi yêu cầu này vô lý nếu hiểu là giảm rủi ro. [YK3 p930,p943]

**Cần bổ sung:** phạm vi giới hạn theo SNS/tài khoản, bên thực thi giữa hệ thống và Upload-Post, xử lý khi chạm hạn mức và cách dừng/hủy lịch. Phải phân biệt gửi yêu cầu cho Upload-Post với bài thực sự được SNS đăng. Chưa tự đặt con số hoặc mặc định giới hạn tần suất của một SNS áp dụng cho SNS khác. [EXT24 slide 7–8]

### 3-8. Điều kiện tiên quyết và ràng buộc

**TikTok: có rủi ro đã được tài liệu thừa nhận.** YK3 ghi đặt lịch, không xác nhận, tự động đăng và chỉ định công khai khác câu trả lời TikTok. EXT24 nói dùng Upload-Post để không cần tự xét duyệt SNS. Hai nội dung có thể cùng tồn tại: giảm thủ tục tích hợp không chứng minh mọi hành vi nghiệp vụ được nền tảng chấp nhận. [YK3 p943; EXT24 slide 7–8]

**Cần bổ sung:** căn cứprovider cho đúng cách sử dụng, chủ sở hữu rủi ro và cách vận hành khi bị hạn chế. Không dùng việc dịch vụ khác đang vận hành làm bảo đảm; không tự đổi quyết định sang đăng nháp. Đây là rủi ro mô hình tích hợp, không thể xử lý hết bằng tăng cấu hình máy hoặc giới hạn tần suất.

**Thông báo và chất lượng AI:** Cảnh báo push có thể chậm/mất và AI có thể sai là cách giới hạn cam kết thực tế. Vẫn cần xác định phần lỗi hệ thống phải sửa; không dùng miễn bảo đảm chất lượng AI để bỏ qua chức năng chạy sai. [YK3 p942–945]

**Đề xuất về cách giao việc choAI:** Các điều kiện có dữ liệu xác định, như số followers đã vượt mục tiêu hoặc quá số ngày không đăng, nên do logic hệ thống tính;AI diễn giải và soạn lời nhắn. Dữ liệu thiếu/cũ cần có trạng thái riêng. Đây là đề xuất thiết kế từp945, không phải xác nhận khách đã chọn cách làm này.

**Thanh toán qua nhà mạng:** EXT24 không có lựa chọn cổng thanh toán đủ chi tiết để đánh giáp946. Chưa kết luận đáp ứng/không đáp ứng theo tên stack; đội cần kiểm dịch vụ, hình thức và hợp đồng thực tế. Không mở rộng sang review chức năng thu phí.

**Quyền nội dung bên thứ ba:** p950 để cách kiểm tra cho giai đoạn thiết kế. Chưa có phương án trong hai tài liệu để cam kết tự động phát hiện mọi vi phạm. Có thể đề xuất quy trình xem duyệt/xác nhận nguồn tư liệu, rồi chốt phạm vi; không tự đưa hệ thống nhận diện bản quyền vào release.

**Chi phí và bảo trì:** Slide11 nêu giá cơ bản và khả năng chặn dùng quá mức; slide 12–13 đồng thời nói có phí vượt lượng và phí video riêng. Vì vậy không hiểu các giá cơ bản là tổng phí cố định khi tăng người dùng. Nếu chặn chi để giữ ngân sách, cần chỉ rõ chức năng nào bị ảnh hưởng khi hết quota. [YK3 p909,p940,p951; EXT24 slide 11–14]

**Cần bổ sung:** lượng sử dụng làm căn cứ dự toán, ngưỡng cảnh báo/chặn, đầu vào khách chuẩn bị và đầu mối vận hành từ go-live. Bảo trì bằng hợp đồng riêng không tự tạo cam kết hỗ trợ 24/7 hoặc chứng minh đã có người trực.

## 3. Những điểm cần làm rõ trước khi cam kết

| Điểm | Đánh giá theo tài liệu | Đầu ra cần bổ sung / bên xử lý |
|---|---|---|
| Lỗi một dịch vụ không ảnh hưởng phần khác | Quá rộng nếu không tách phụ thuộc | Bảng phụ thuộc và mức phục vụ suy giảm — đội thiết kế |
| Hoàn tất buổi sáng trước giờ nhắn | Cần điều kiện tải/provider, không chỉ lịch kích hoạt | Thiết kế tác vụ, cửa sổ chạy và phép thử — đội/QA; khách chốt ảnh hưởng nghiệp vụ còn mở |
| Không ảnh hưởng app DM | Tách Supabase đã có; phần còn lại chưa đủ mô tả | Sơ đồ phân bổ và ranh giới dùng chung — đội hạ tầng |
| Mục tiêu1.000 người | Không vô lý; chưa được sizing/chi phí hiện có chứng minh | Hồ sơ tải và kế hoạch mở rộng — đội; phạm vi/chi phí do chủ dự án chốt |
| Chỉ lưu/xử lý tại Nhật | Chưa phải cam kết toàn hệ thống trong nguồn | Nếu muốn cam kết rộng hơn, kiểm từng dịch vụ; không tự thêm yêu cầu |
| Không học/không lưu dữ liệu AI | Hai cam kết khác nhau | Ma trận provider/model và bằng chứng điều kiện áp dụng — đội/provider |
| Chống khóa TikTok | Có biện pháp nhưng còn rủi ro đã ghi | Bằngchứng mô hình tích hợp và phương án vận hành — đội/provider, chủ sở hữu rủi ro |
| Giá cơ bản và chặn vượt chi | Chặn chi có thể hạn chế dịch vụ | Chính sách ngân sách và hành vi khi hết quota — đội đề xuất, khách quyết định phần nghiệp vụ |

## 4. Phạm vi kết luận và lịch sử

Đây là **đánh giá khả thi trên tài liệu**, không đánh giá mức hoàn thành sản phẩm. Không kết luận thiếu Auth production, thiếu batch worker, thiếu audit writer hoặc một VPS không đủ tải từ code demo. Các kết luận loại đó của bản trước không áp dụng cho yêu cầu review hiện tại.

Chưa cần từ tài liệu này quyết định thêm Redis, queue cụ thể, GPU, microservices hay máy dự phòng. Cần đội bổ sung thiết kế phân bổ dịch vụ, điều kiện tải, bảo vệ dữ liệu và phương án vận hành trước khi lựa chọn biện pháp cụ thể.

Bản review dựa trên code trước đó và snapshot được giữ trong `history/03_review_dua_tren_code_da_thay_the_2026-11-25.md` và `history/03_review_dua_tren_code_snapshot_2026-11-25.json`, chỉ để truy vết; không dùng làm kết luận hiện hành.

Chưa có reviewer độc lập hoặc phê duyệt của khách. Không cấp G5/G8, không tạo Customer Q&A, không suy đã được duyệt thương mại hoặc release. Hồ sơ provider thực tế và sơ đồ triển khai chưa có trong phạm vi đã đọc thì kết luận tương ứng giữ ở mức chưa đủ căn cứ.
