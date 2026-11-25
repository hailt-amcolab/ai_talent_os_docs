# Đối chiếu tài liệu24/11 — cập nhật25/11/2026

Người lập: Codex, tác giả đối chiếu; chưa có reviewer độc lập. Phạm vi: ba tệp mới trong `source_requiments/24112026/`, hai workbook đang sống trong `Q&A/`, đối chiếu nội dung cũ tại git HEAD và kiểm kê23/11. Không sửa nguồn, workbook15, code hoặc schema. Không soạn/gửi Q&A mới.

## Nguồn và mức độ đã kiểm

| Nguồn | Kết quả |
|---|---|
| YK3 — `AI育成OS_要件定義書.docx` | Bản0.3 ngày24/11, FutureCore Partners 白川;1411đoạn XML kể cả trống;57ảnh nhúng. Đọc phần yêu cầu/16luồng, phi chức năng, nghiệm thu, phụ lụcA–D. Đã xem57ảnh ở contact sheet; chữ nhỏ/chú thích hình cần xem lại nguyên cỡ trước duyệt AC. |
| EXT24 — `AI育成OS_外部サービスの比較_20261124.pptx` |14slide; đọc chữ toàn bộ slide và xem13ảnh minh họa nhúng. Chưa render bố cục14slide; không dùng bố cục làm bằng chứng quyết định. FCP đề xuất fal.ai/Kling/H3, Upload-Post, OpenAI/ChatGPT, Vercel/Supabase/VPS; chưa tự xác nhận giá, điều khoản hoặc thử nghiệm được thuật lại. |
| KS24 — workbook trong24112026 | Trùng SHA-256 và byte với KS trongQ&A;5sheet, không tính là hai xác nhận độc lập. |
| QA đang sống |5sheet;296ô giá trị/công thức thay: Q&A18,保留7,追加要件271. Hai sheet thiết kế/nội dung thông báo không đổi giá trị. Có100câu chính:53Close/47Open; thêm No.100Open/101Close. No.50 bị xóa khỏi bảo lưu, không có phản hồi đóng. |
| KS đang sống |5sheet;482ô đổi:20261120 có88ô, thêm20261122 có289ô vàアクション一覧 có105ô.確認事項 và sheet ba điều kiện dự án không đổi giá trị. Chuyển hàng trong20261120 không được đếm thành88quyết định mới. |

Đã trích giá trị/công thức toàn bộ các sheet và lưu XML bình luận; không dùng màu/OK làm phê duyệt. Nguồn cũ không đổi hash được giữ;18tệp trước không đổi,2workbook đổi,3tệp mới →23tệp. Ngày tiếp nhận/kiểm25/11 khác ngày nội dung24/11 và ngày thư mục. Ngày cuộc gọi chọn Square chưa được ghi rõ.

[Kiểm kê hiện hành](../source-inventory-current.json), [snapshot trước](source-inventory-before-24112026.json), [intake/hash](delivery-24112026-intake.json), [delta và toàn bộ sheet](delivery-24112026-workbooks.json), [chữ DOCX](delivery-24112026-docx-text.txt), [chữ PPTX](delivery-24112026-pptx-text.txt).

## Thay đổi áp dụng theo chủ đề

Các dòng dưới là **FACT về nội dung nguồn**, không là chữ ký G7 hoặc phê duyệt thiết kế/thương mại/phát hành. J101 và các chỉ dẫn vận hành nội bộ giữ đúng thẩm quyền nội bộ. Mỗi dòng có hash và EV trong [bản đồ tác động](delivery-24112026-impact.csv); không tạo ID requirement/Q&A thay mã cũ.

| Chủ đề | Nội dung hiện hành | Phần còn mở / giới hạn | Locator |
|---|---|---|---|
| AI agent và dữ liệu | G/H ghi xác nhận24/11: AI Coach là agent đọc/ghi Supabase; nhận chỉ thị, khen, đề xuất và ghi tiến độ Challenge, nhập chỉ thị qua hội thoại M-17 trong phạm vi; dữ liệu trong DB có backup; Adesso trả token và chỉnh prompt; không bảo đảm phán đoán đúng. J101 là phân vai NỘI BỘ25/11: OS nhập dữ liệu dịch vụ ngoài; agent quyết định giờ rồi ghi lịch để OS thực thi. | YK3 §2-5/3-3/3-8/AC chưa đồng bộ. Không suy agent được SQL tùy ý hoặc bỏ kiểm quyền. Vị trí byte media và vai trò OneDrive chưa chốt lại toàn bộ. | Q&A!G101:J101 (No.101); EV-1311 |
| Cổng thanh toán | G17 ghi khách thông báo qua điện thoại sau họp sẽ chọn Square; GMO trong YK3 §2-4-11 và sheet dự án là ứng viên cũ. | Ngày cuộc điện thoại chưa rõ; chưa chứng minh đã ký/xét duyệt. Đội/provider kiểm Square đáp ứng nhà mạng, trả trước, phí biến đổi, giữa kỳ, quá hạn và lịch sử. Không mặc định Square hỗ trợ các yêu cầu này. | アクション一覧!B17:G17 (No.16); EV-1312 |
| Từ cấm sau AI sửa | Quyết định24/11: AI viết lại rồi đặt lịch; không thêm bước Talent xác nhận lại, không chuyển Manager sửa. | Không tự chốt số lần sửa khi vẫn lỗi, thất bại hoặc tương tác với duyệt bài công việc; No.96 vẫn theo dõi hiệu lực danh sách đổi. | 20261122!G4:I4 (No.3); EV-1313 |
| Ảnh AI và gửi trong chat | Không làm chức năng AI tạo ảnh; đặt nút ảnh/camera trong chat để đưa ảnh chụp vào hội thoại. | Không đồng nhất chức năng tạo video theo yêu cầu với tự sinh media trong autopost. CR-11 ghi làm trong giá hợp đồng hiện tại, không thêm phí. | 20261122!G10:I10 (No.9); EV-1314 |
| Video và âm nhạc | Nhạc chỉ dùng loại không bản quyền theo cách gọi của nguồn; video cơ bản làm ảnh Talent chuyển động, một dạng cố định; video cầu kỳ làm ngoài rồi nhập vào. Khi provider không nhận ảnh trẻ em thì dùng video Talent tự quay. | Độ dài/chất lượng 確認61 và số ảnh 確認62 vẫn chưa quyết. Nhạc thịnh hành do Talent thêm ở app SNS. Không xác nhận điều khoản bản quyền/provider độc lập trong đợt này. | 20261122!G3:I9 (No.2,5–8); EV-1315 |
| Giới hạn chi tiêu dưới18 | Nguồn ghi quyết định24/11: không đặt trần chi tiêu riêng cho Talent dưới18. | Không suy bỏ kiểm soát sử dụng kỹ thuật hoặc điều kiện tuổi của SNS/provider; không phải xác nhận pháp lý. | 20261122!G5:I5 (No.4); EV-1316 |
| Đồng ý phụ huynh | Adesso lấy đồng ý khi ký với Talent; H18 ghi đã lấy đầy đủ; ứng dụng không giữ hồ sơ đồng ý. | Thay đề nghị lưu hồ sơ phụ huynh tại ISS22/ADV22 đúng chủ đề này; không tự kết luận đủ điều kiện pháp lý. | 20261122!G18:H18 (No.17); EV-1317 |
| Tâm sự nghiêm trọng | Không làm thông báo Manager về tâm sự nghiêm trọng. G17 nói chỉ dẫn AI có thể hướng dẫn tìm hỗ trợ; toàn bộ hội thoại được lưu và Manager đọc được. | H/I chỉ chốt không thông báo, không chọn trọn mọi phương án của QA No.93 hoặc bảo đảm AI phát hiện đúng. | 20261122!G17:I17 (No.16); EV-1318 |
| Giờ đăng | Giờ đăng lệch vài phút giữa Talent và chia khung theo SNS; Manager ghi khoảng giờ trong chỉ thị, AI dùng thực tích để chọn giờ. G16 nói Talent chỉ hủy lịch. | H16 không lặp riêng quyền hủy. Không tự chốt thuật toán, jitter cụ thể hoặc thời điểm đổi lịch đang có. | 20261122!G16:I16 (No.15); EV-1319 |
| TikTok: giữ đăng trực tiếp | Nguồn ghi tiếp tục đăng trực tiếp qua Upload-Post, không gửi nháp; giữ lịch/autopost và không thêm ô Talent chọn phạm vi công khai từng bài. Nguồn đồng thời ghi câu trả lời TikTok và Upload-Post khác nhau. | Đây là hướng đi và lời thuật lại của nguồn, không chứng minh TikTok duyệt mô hình. Giữ rủi ro hạn chế bài/tài khoản và kiểm provider; không ghi tuân thủ đã xác minh. | 20261122!G20:H24 (No.19–23); EV-1320 |
| Dừng hệ thống và lịch ngoài | Sau họp24/11 xác nhận không làm nút hủy toàn bộ lịch; dừng từng Talent vẫn có. Dừng hệ thống phải hủy cả lịch đã gửi Upload-Post, vì tắt OS không tự hủy lịch ngoài. | Đội thiết kế trình tự hủy/đối soát trước shutdown và xử lý thất bại, không hứa tắt VPS là dừng được mọi bài. | 20261122!G30:H30;G35:I35 (No.29,34); EV-1321 |
| PR | Talent tự thêm PR vào bài; OS không tự phân loại bài công việc hoặc xác định bài cần PR. Nguồn báo đã thử nhãn video AI qua provider. | Không dùng nguồn này để tự xác nhận kết quả thử hoặc tuân thủ pháp lý; duyệt bài công việc vẫn do Talent yêu cầu. | 20261122!G33:I33 (No.32); EV-1322 |
| Ranking | Thêm No.100 còn Open: hỏi phạm vi màn ranking mới ở UI-M20 p28–29. YK3 §1-3 tiếp tục ghi ranking ngoài giai đoạn này; action No.15 yêu cầu đội đề xuất cách xem Talent nỗ lực. | Không coi đề xuất lọc/sắp xếp là đã duyệt ranking; không sinh câu hỏi mới trùng No.100. | Q&A!A100:J100 (No.100); EV-1323 |
| CR hiện hành và đổi nghĩa ID | Danh sách hiện hành còn14 CR; mười mục01–04,06,10–14 ghi đồng ý trong hợp đồng hiện tại, không thêm phí. CR-05/07/08/09 vẫn chờ quyết định. Mã CR cũ đã đổi nghĩa: CR-04 nay màn chỉ thị, CR-06 nay lưu video, không dùng tên cũ để tra bản mới. | CR-07/08 ghi I là trong phạm vi nhưng J là CR và M vẫn chờ; CR-09 vận hành thiết kế phương ánA, chưa là khách duyệt300người. Chưa có hợp đồng/SOW/báo giá ký độc lập. No.50 bị xóa ở 保留, không suy là đã chốt toàn bộ. | 追加要件!A2:N15 (CR-01–14); EV-1324 |
| Nhân vật và mobile Manager | CR-13 ghi làm mobile cho hai nhóm màn: M-04/M-05 duyệt và M-15/M-16 chỉ thị; màn khác dùng hiển thị PC có cuộn ngang. CR-14 ghi chọn từ nhân vật do Adesso chuẩn bị, gồm hình/cách nói; không thêm phí. | Không hiểu “2 màn” thành chỉ hai mã màn. Đổi tên nhân vật còn mở; YK3 §2-3 ghi cố định Momo phải sửa phần bị thay. | 追加要件!D14:N15 (CR-13/14); EV-1325 |
| Chi phí dịch vụ và hợp đồng | H34 ghi đã giải thích24/11 và khách thấy mức phí tháng ngoài video không vấn đề; phí video do Talent trả. Slide EXT24 p13 tách phí video khỏi tổng và tính50/100/150người. | Chỉ là xác nhận mức ước tính theo nguồn; không là ký hợp đồng dịch vụ, phí duy trì hoặc bảo đảm giá. Square/provider và mức lưu/truyền vẫn cần kiểm. | 20261122!G34:H34 (No.33); EV-1326 |
| YK3: luồng và mã màn | Bản0.3 ngày24/11 có16luồng nghiệp vụ, T-01–T-19 và M-01–M-21; đây là bộ mã của YK3. Ví dụ T-08 My Page, T-10 autopost, T-11 chat, M-08 nhập Talent, M-15 danh sách chỉ thị, M-16 nhập, M-17 chat, M-21 audit. | Không đổi mã AG/SD18/SD19 theo số trùng. YK3 dẫn screen/flow20/11 nhưng chưa có bộ độc lập đó trong24112026. Hình nhúng chỉ xem ở mức tổng quan, không đủ ký AC chi tiết. | §2-4; w:p96–110; §2-5; phụ lụcA–D; EV-1327 |
| YK3: giới hạn và nghiệm thu | Ưu tiên cao/trung/thấp và số giới hạn là phương án/giả định FCP. Phụ lụcC còn確認57 (điều khoản),61 (dài/chất lượng video),62 (số ảnh). Mục tiêu go-live cuối02/2027; AC từng chức năng còn chờ thêm; provider chưa ký/xét duyệt có thể tách release theo văn bản nguồn. | Không suy chỉ còn3vấn đề toàn dự án: QA/CR/provider vẫn mở. Quy mô300/1000 trong YK3 chưa thay giới hạn150 ở CR-09. Chưa duyệt baseline, lịch hoặc điều khoản nghiệm thu/thương mại. | w:p101–105; §3-2/3-3; §4-1–4-3; phụ lụcC; EV-1328 |
| YK3: không tự đăng lại | Khi đăng lỗi, OS không tự đăng lại; Talent thử lại sau, Manager vẫn có đặt lịch lại tại M-09. Hủy lịch do cả Talent/Manager. | Retry kỹ thuật trước khi xác định kết quả khác việc tự đăng lại bài đã thất bại; cần thiết kế chống trùng và kiểm provider. | §2-4-6 w:p386–431; EV-1329 |
| YK3: video tính lượt | Nguồn vừa nói thời điểm tính lượt còn chờ kiểm chứng, vừa mô tả nút tạo tính1lượt lúc yêu cầu; mục thanh toán loại video tạo lỗi khỏi số lượt. | Giữ điểm chưa nhất quán về ghi nhận/đảo lượt/phí khi lỗi; không tự chọn lúc request hay thành công. Tiếp tục No.60 và thiết kế provider. | §2-4-8 w:p475,485; §2-4-11 w:p644; EV-1330 |

## Các điểm cần giữ riêng

- **QA No.101 và YK3:** G/H101 là ghi nhận xác nhận24/11; J101 là phân vai nội bộ25/11. YK3 còn đặt hồ sơ/chỉ thị/số liệu ở OneDrive (§2-5, đoạn885), chưa phản ánh DB/backup và giới hạn phán đoán của agent. Đồng bộ tài liệu dẫn xuất theo No.101; giữ việc sửa bản yêu cầu khách tại hành động đội, không sửa DOCX nguồn. Không suy toàn bộ media phải chuyển DB hoặc bỏ OneDrive.
- **Square:** action No.16/G17 mới hơn ứng viênGMO trên cùng chủ đề chọn cổng. Ghi nhận lựa chọn được thuật lại, không tự xác nhận Square có thanh toán nhà mạng, đã ký hay đủ khả năng thu phí biến đổi. Đội/provider chịu kiểm năng lực; đầu mối dự án xác nhận ngày/thẩm quyền nếu cần ký G7.
- **CR:** mười CR01–04,06,10–14 ghi đồng ý trong giá hiện tại. CR05 sửa chữ/hashtag,07 log thao tác/xử lý,08 tạm dừng/xóa tự động,09 quy mô vẫn chờ. CR07/08 có nhãn trong phạm vi và CR cùng lúc: không tự chọn một phương án. CR03/04 có phương án tối thiểuE khác phạm vi cuốiK; theo phần nguồn ghi đồng ý ởK và giữ khả năng review. Giữ lịch sử CR cũ theo hash; không dùng cùng mã để suy cùng chức năng. Chưa có bản hợp đồng/SOW/báo giá ký độc lập.
- **Ranking:** không làm giai đoạn này theo YK3; QA100 vẫnOpen cho màn mới, action15 thuộc đội đề xuất cách xem/lọc Talent nỗ lực. Không chốt trọng số, bục trao giải hay mở rộng phạm vi từ mockup.
- **Video:** nguồn yêu cầu thống nhất một dạng cơ bản; độ dài/chất lượng và sốảnh còn mở. Thời điểm ghi lượt còn mô tả chưa nhất quán: đoạn475 chờ kiểm,485 đếm khi yêu cầu,644 không đếm khi lỗi. Tiếp tục No.60; đội thiết kế vòng đời usage sau kiểm provider.
- **TikTok:** G20/G21/G23/G24 thuật lại khác biệt giữa TikTok và Upload-Post và vẫn chọn giữ cách đăng. Không thể đổi ghi nhận này thành kết luận nền tảng đã cho phép mọi luồng. Không cần tra giá/điều khoản trực tuyến để xác nhận khách đã viết gì; đợt này chưa thực hiện xác minh provider độc lập.

## Nơi đã cập nhật và hiệu lực

Nội dung chủ đề được cập nhật ngay trong các tệp phân tích, SCD và hướng dẫn kỹ thuật hiện có, kèm locator/EV và giới hạn. Chi tiết tệp ở cột `impacted_paths` của bản đồ tác động; phần cũ giữ làm lịch sử. Kiến trúc lưu trữ có phần hiện hành mới theo QA101, không còn lấy OneDrive làm nguồn gốc mặc định cho toàn bộ dữ liệu agent.

Sổ EV giữ hash cũ và đánh STALE cho bằng chứng QA/KS cũ. Các record yêu cầu/quy tắc/luồng phụ thuộc được đánh STALE, không kế thừa xác nhận của hash trước; [nhật ký record](delivery-24112026-stale-records.csv) có trước/sau.20EV mới xác minh câu chữ nguồn;13bản ghi quyết định thuật lại có bốn trục phê duyệt riêng. Chưa tái trích và ký lại toàn bộ175requirement/90rule, chưa tái dựng đầy đủ guard/AC cho16luồng mới. Bản đồ tác động là đầu vào tái kiểm, không tự thay việc này.

Bộ Q&A nội bộ vẫn0câu xuất độc lập. Giữ No.93–100 đang có để theo dõi phần chưa được trả lời; không hỏi lại phần đồng ý phụ huynh, không thông báo tâm sự nghiêm trọng, AI tự sửa không duyệt lại hoặc agent/DB đã được nguồn trả lời. No.94/95/96/97/98/99 không tự đóng toàn bộ chỉ vì tài liệu mới mô tả thêm.

## Gate và chủ xử lý

| Gate | Hiệu lực đợt này | Việc còn lại |
|---|---|---|
| G1 | BLOCKED | Tech Lead duyệt phạm vi, giới hạn hình nhỏ, các nguồn màn/flow20/11 được nhắc nhưng chưa có bản độc lập và nguồn ký thương mại còn thiếu. |
| G2–G4 | STALE ở phần phụ thuộc | BA/QA tái trích, nối đúng mã màn, rà guard/AC/phản chứng theo bản đồ tác động. Không tự chuyển finding sang CLOSED. |
| G5/G6 | BLOCKED | Chưa có reviewer độc lập được chỉ định hoặc duyệt phiên bản mới. Không dùng review cũ cho hash mới. |
| G7/G8 | Chưa cấp PASS mới | Ghi nguồn có trả lời không đồng nghĩa đã ký gate hoặc baseline. Không phê duyệt phát hành. |

Action nguồn ghi: đội chuẩn bị bảng câu chữ, câu hỏi cổng, sửa hướng dẫn PWA, cập nhật màn/người nhận, đề xuất danh sách Talent nỗ lực, kiểm metric, nộp yêu cầu cuối và lịch phát triển; Adesso góp ýFigma/cung cấp icon (mốc nguồn27/11), kiểm yêu cầu cuối (tuần30/11). Tất cả giữ người và thời hạn như nguồn, không tự cam kết thay. Không tạo câu hỏi khách mới trong đợt cập nhật này.

## Kiểm tra

Kết quả kiểm cơ học được ghi tại `delivery-24112026-validation.json`. Validator phân biệt EV lịch sử STALE với EV hiện hành: EV cũ không được đưa qua kiểm hash như thể còn hiện hành; hash23nguồn và20EV mới vẫn được kiểm. Không coi PASS cơ học là PASS nghiệp vụ hoặc review độc lập.
