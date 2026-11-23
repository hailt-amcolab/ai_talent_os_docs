# Đối chiếu QA/KS tiếp nhận23/11/2026

Người kiểm: Codex — đối chiếu nguồn, không reviewer độc lập. Thời điểm: `2026-11-23T09:11:28+07:00`. So với commit `62d4bbd461a9d6f4807f4b6f1dcb7b7a89cf29ed` và kiểm kê20/11; hai hash HEAD khớp kiểm kê trước. Không sửa tệp nguồn hoặc workbook15.

## Kết quả kiểm kê

| Nguồn | Thay đổi | Giới hạn |
|---|---|---|
| QA |79ô giá trị; chỉ sheet Q&A đổi. Có98câu:52Close/46Open; No.50 ở bảo lưu riêng còn Open. Thêm No.93–99 đều Open, G/H trống; No.87/88 Close→Open. Bốn sheet còn lại không đổi giá trị/bình luận. | G/H ở No.56/62/66/83/86/87/88 chứa câu hỏi thêm và đề xuất của AMCOLAB, không là phản hồi khách mới. |
| KS |18ô quyết địnhK, tiêu đềK1;33ô trả lờiF ở sheet20261120; thêm No.40/41 chưa trả lời; sửa đề xuấtF72/F86; bỏ sheet費用と利用の規模, thêm sheetプロジェクトを進めるために決める事項. | CộtK ghi ngày20/11; ngày23/11 là ngày tiếp nhận. Không xác định độc lập người trả lời/người duyệt từng ô; không cấp G7 PASS. |

QA gồm5sheet, KS gồm3sheet, đã đọc giá trị/công thức/bình luận trực tiếp từ OOXML; KS giữ19bình luận (1ở確認事項,18ở20261120). Không coi định dạng/màu/OK là bằng chứng phê duyệt; không có ảnh mới được dùng để xác nhận hành vi.14nguồn còn lại hash không đổi.

## Thay đổi và phần còn mở

| Chủ đề | FACT: nguồn ghi | Giới hạn / tiếp tục theo dõi | Nguồn chính xác |
|---|---|---|---|
| Ảnh và YouTube | Bài ảnh đăng Instagram/TikTok, không gửi YouTube; video Talent tạo có thể đăng YouTube. | Đây là hành vi nêu trong nguồn, không phải xác minh năng lực API của nhà cung cấp. | `KS 20261120!F2`; `EV-0962` |
| Email duyệt đơn và từ chối | Manager duyệt/từ chối thì tự gửi email; email duyệt có mật khẩu tạm. Adesso cung cấp câu chữ, đội chuẩn bị bảng điền. Từ chối dùng cho người ngoài nhận được link; nguồn nói không trao đổi với người bị từ chối. | Không suy từ đây quy tắc nộp lại hoặc quyền đảo quyết định; No.65/78 còn phải đối chiếu. | `KS 20261120!F3:F4`; `EV-0963` |
| Tạm dừng Talent | Thêm trạng thái 一時停止 bên cạnh trước dùng/đang dùng/kết thúc. Tạm dừng vẫn tiếp tục tính phí; dừng các chức năng như lời nhắn AI, mở lại thì khôi phục. | Chưa có ma trận quyền AI/video/đăng nhập, xử lý lịch đang có và ai được khôi phục. Tạm dừng khác kết thúc sử dụng và dừng riêng việc đăng. | `KS 確認事項!K116;20261120!F5;20261120!F32`; `EV-0964` |
| Khởi tạo PWA | Đăng nhập bằng mật khẩu tạm → đổi mật khẩu → đăng ký phương thức thanh toán → thêm vào màn hình chính; hướng dẫn rõ bước tiếp theo, gồm iPhone. | Không mặc định trình duyệt có thể tự cài PWA hoặc tự nhảy vào ứng dụng. Office giữ ngoại lệ thanh toán theo nguồn hiện có. | `KS 20261120!F7`; `EV-0965` |
| Ảnh/video trước, chữ sau | Talent gửi ảnh/video trước; AI đọc tư liệu rồi tạo văn bản và hashtag. Có ảnh hợp chủ đề thì dùng, nếu không thì dùng tư liệu đang có. | Không dùng luồng cũ tạo chữ trước như mặc định cho cùng nhánh. | `KS 確認事項!K60;20261120!F8`; `EV-0966` |
| Ngày thiếu tư liệu | Không gửi ảnh mới thì dùng ảnh đã lưu; ảnh không hợp chủ đề thì đổi chủ đề theo ảnh; không có ảnh thì hướng dẫn chức năng tạo ảnh/video. | Chưa mặc định phạm vi chức năng tạo ảnh đã được duyệt; QA No.56/83 vẫn có đề xuất dừng ngày đó, hạn tái dùng, nhắc còn2ngày và tự chạy ngày sau chưa được chốt. | `KS 確認事項!K62;20261120!F9`; `EV-0967` |
| Duyệt bài công việc | Chỉ bài liên quan công việc cần Manager duyệt. Với tự động, không thêm bước duyệt để phòng dùng nhầm ảnh công việc. | Giữ hai phạm vi riêng; không suy mọi bài công việc được tự động bỏ duyệt. No.71/84 cần phản ánh ngoại lệ đã ghi; nhận diện bài công việc và chuyển nhánh chưa đủ chi tiết. | `KS 確認事項!K74;20261120!F10;20261120!F15`; `EV-0968` |
| Manager nhận yêu cầu duyệt | Gán Manager phụ trách theo từng Talent; yêu cầu duyệt gửi người phụ trách. Mọi Manager vẫn xem dữ liệu Talent; trả bài có lý do để Talent sửa. | Không suy mọi loại thông báo cùng người nhận. No.87/88 mở lại: người nhận thông báo chung, cách gán, chuyển phụ trách khi vô hiệu hóa và nhắc quá hạn chưa chốt. | `KS 確認事項!K77;確認事項!K93;20261120!F11`; `EV-0969` |
| Talent được hủy lịch | Talent được hủy bài mình đã đặt lịch; Manager cũng kiểm tra và hủy trên quản trị; phải hủy lịch tương ứng ở dịch vụ đăng. | Thay quy tắc cũ chỉ Manager hủy. Thời điểm không thể hủy, bài đang gửi và thông báo/tái dùng còn No.61 và thiết kế đội. | `KS 確認事項!K84;20261120!F12`; `EV-0970` |
| Talent đăng lại bài lỗi | Lỗi lúc tới giờ đăng thì thông báo Talent; Talent đợi rồi đăng lại. Lỗi SNS hoặc mạng của Talent không cần thông báo Adesso. | Không đồng nhất Adesso với mọi tài khoản Manager nếu chưa rõ. Không tự đặt thời gian chờ, số lần thử hoặc đích SNS; No.59 còn mở. Quyền Manager đăng lại trong bản19/11 chưa bị xóa bằng suy luận. | `KS 確認事項!K87;20261120!F13`; `EV-0971` |
| Hai chế độ đăng | Nguồn tiếp tục nêu có đăng trước xác nhận và đăng không cần xác nhận từng bài. | Câu về quy định SNS là lời ghi trong nguồn, chưa phải kiểm chứng điều khoản nền tảng. | `KS 20261120!F14`; `EV-0972` |
| Chủ đề và kỳ tự động | Talent chọn chủ đề qua hội thoại AI, được đổi giữa kỳ; chỉ định ngày bắt đầu/kết thúc, có thể bắt đầu trong tương lai; hết kỳ AI báo Talent. | Chưa chốt bài đã tạo/đặt lịch khi đổi chủ đề hoặc đổi chế độ; giữ QA No.70/83, không tạo câu hỏi thay thế. | `KS 20261120!F16:F17`; `EV-0973` |
| Nguồn media cho tự động | Tự động không sinh ảnh/video AI; dùng video trả phí đã tạo hoặc video tự làm đã lưu. Chọn ảnh/video hợp chủ đề thay vì thứ tự lưu. | Không mặc định một bài/ngày hoặc dùng FIFO; tần suất tại KS No.40 còn trống. | `KS 確認事項!K73;20261120!F18:F19`; `EV-0974` |
| Tư liệu Manager gửi | Talent xem bản nháp AI tạo từ tư liệu Manager gửi trong màn AI coach, có thể dùng để đăng Instagram/TikTok; không xem danh sách tư liệu Manager lưu. | Không suy thành thư viện media chung được Talent truy cập hoặc phủ nhận video YouTube ở nhánh khác. | `KS 20261120!F20`; `EV-0975` |
| Đếm ngày đăng tự động | Ngày có đăng tự động được tính là ngày đã đăng; trong thời gian vẫn có bài tự động thì không nhắc hoặc báo lâu không đăng. | Không suy cả kỳ tự động đều được miễn nhắc khi thực tế không đăng; ngưỡng3/7 vẫn chưa được nguồn trả lời riêng. | `KS 20261120!F21`; `EV-0976` |
| Không báo tâm sự nghiêm trọng | Không làm chức năng báo Manager khi có tâm sự nghiêm trọng. Hội thoại phục vụ tăng follower, tập trung hoạt động nghệ thuật/công việc và cảm quan; không tư vấn tình yêu. Ban đầu chưa đặt ranh giới quá chi tiết. | No.93 còn Open, không tự chọn trọn phương ánB vì nguồn chỉ loại thông báo, chưa quy định đầy đủ cách tiếp nhận/chuyển hướng. Không suy số lượt chat không giới hạn từ đây. | `KS 20261120!F22;確認事項!K56;20261120!F28:F29`; `EV-0977` |
| Trả trước và quá hạn | Phí tháng theo hướng trả trước; nguồn ghi đang xem xét dừng sử dụng nếu1tháng chưa thanh toán. | “検討します” chưa chốt tự khóa sau1tháng. Chu kỳ cụ thể, khả năng cổng và No.46/49/86 còn mở; không tự xây retry hay thu sau. | `KS 確認事項!K104;20261120!F24`; `EV-0978` |
| Cổng thanh toán và đầu việc provider | Có thanh toán nhà mạng; GMO là ứng viên, cần quyết sớm. Nhà mạng không hỗ trợ thì dùng thẻ hoặc PayPay theo nguồn. Đội tổng hợp câu hỏi cổng về trả trước, phí biến đổi, giữa kỳ và chưa thanh toán, đổi phương thức/lịch sử. | GMO chưa được chọn/ký; không suy PayPay đã được duyệt toàn bộ hoặc tích hợp đã hoạt động. | `KS 確認事項!K100;確認事項!K105;20261120!F25:F27`; `EV-0979` |
| Thử thách do AI tạo theo Talent | Danh sách thử thách cũ là mẫu; AI tạo dựa trên thông tin/mục tiêu từng Talent. Manager có thể thêm thử thách qua chỉ thị AI. | Không mặc định chỉ chọn từ catalog cố định; màn riêng, độ khó/đạt/chấm điểm chưa được duyệt từ đây. | `KS 確認事項!K27;20261120!F30:F31`; `EV-0980` |
| Bỏ dừng đăng toàn hệ thống | Không có chức năng dừng tự động toàn hệ thống; vẫn dừng theo từng Talent. Khi cần dừng toàn bộ thì vận hành dừng hệ thống. | Thay đề xuất giữ nút toàn bộ ở QA No.77/91; không suy người thao tác, cơ chế hạ tầng hay SLA dừng. Cách xử lý lịch đã gửi còn cần thiết kế/provider. | `KS 確認事項!K85;20261120!F33`; `EV-0981` |
| Nội dung và hình minh họa | Adesso cung cấp tài liệu hướng dẫn đăng ký/biểu thị giao dịch và câu chữ email tự động; đội chuẩn bị bảng điền theo tình huống. Nếu có đổi nhân vật thì Adesso cung cấp tranh. | Câu điều kiện về nhân vật không tự xác nhận cho đổi tên hoặc làm chức năng mới; KS No.34 còn thiếu một phần. | `KS 20261120!F6;20261120!F35;20261120!F39`; `EV-0982` |
| AI tự sửa từ cấm | Phát hiện từ cấm thì AI viết lại và đặt lịch; không theo luồng Manager tự sửa. | Thay vai trò sửa ở GJ19§12/QA No.40/90/CR-06. Chưa chốt số lượt tự sửa, trường hợp không sạch, duyệt công việc và quá giờ. No.96 chỉ hỏi hiệu lực danh sách đổi sau kiểm, không tự cho quét lại hàng loạt. | `KS 確認事項!K59`; `EV-0983` |
| Viết lại không giới hạn | Không giới hạn số lượt nhờ AI viết lại; nguồn ghi rõ đổi quyết định2lần ngày17/11. | Khớp DEC-0001 đã có; không cấp quyết định trùng, không dùng số2cũ ở PDF/QA để chặn. | `KS 確認事項!K65`; `EV-0984` |
| Phí video office | Nguồn quyết định20/11 ghi không tính tiền tạo video của tài khoản văn phòng. | Không thu tiền tài khoản office không đồng nghĩa chi phí provider bằng0. Đối chiếu QA No.48 cũ về quyết toán nội bộ; chưa tự xóa thống kê lượt. | `KS 確認事項!K112`; `EV-0985` |
| Video ngắn và slideshow | Câu hỏi/đề xuất chỉnh còn video ngắn, bỏ mô tả chọn slideshow và ước tính chi phí slideshow. | Đây là cột đề xuấtF, chưa có quyết địnhK cho việc xóa slideshow. Giữ khác biệt với QA No.36/CR-04; không ghi giảm phạm vi đã chốt. | `KS 確認事項!F72;確認事項!F86`; `EV-0986` |
| Điều kiện để tiến hành dự án | Sheet mới nêu3việc: chốt cổng/đăng ký xét duyệt; đội trình so sánh dịch vụ dự kiến24/11 rồi Adesso ký sau đồng ý; chốt người/SNS/số bài và tài khoản thử cho UAT. | Cột trả lời E2:E4 trống. Dự kiến họp24/11 và mục tiêu cuối2/2027 không là lịch được duyệt mới. Sheet chi phí/quy mô cũ đã bỏ không có nghĩa quy mô/trầnAI đã được quyết. | `KS プロジェクトを進めるために決める事項!A2:E4`; `EV-0987` |

## Điểm chưa đồng nhất cần giữ mở

- **Từ cấm:** K59 đổi sang AI tự sửa, trong khi QA No.40/90/CR-06 và GJ19§12 vẫn mô tả Manager sửa. Dùng quyết địnhK có ngày mới cho đúng vai trò sửa; chưa tự thiết kế vòng lặp, duyệt lại hay xử lý thất bại. Theo dõi FND/No.57/71/90/96 hiện có.
- **Thông báo:** K77/K93 đã chỉ rõ người nhận yêu cầu duyệt theo từng Talent; QA No.87/88 vẫn Open cho thông báo chung và chuyển phụ trách. Không mở rộng kết luận yêu cầu duyệt sang mọi loại thông báo.
- **Tâm sự nghiêm trọng:** F22 loại chức năng thông báo; QA No.93 đề xuấtA có thông báo chưa được trả lời. Không chọn toàn bộA/B hoặc ghi đã có chức năng cảnh báo.
- **Tạm dừng:** K116/F5/F32 thêm trạng thái vẫn tính phí, khác kết thúc và dừng đăng. Chưa có ma trận chức năng/lịch đang có.
- **Tư liệu/ảnh AI:** F9 hướng dẫn tạo ảnh/video khi thiếu; F18 cấm tự sinh media trong tự động. Không tự bổ sung chức năng tạo ảnh hay tự động trả phí.
- **Thanh toán:** K104 ghi trả trước nhưng dừng sau1tháng vẫn “検討します”; No.86 còn mô tả không tự dừng. Chưa chốt auto-lock/retry/provider; đầu việc kiểm khả năng thuộc đội và cổng.
- **Slideshow/quy mô:** F72/F86 sửa đề xuất, sheet chi phí/quy mô bị bỏ. Không coi đây là quyết định xóa slideshow, chốt tải hay duyệt trầnAI; giữ QA No.36/CR-04 và các giả định quy mô cũ ở trạng thái chưa xác nhận.

## Q&A và truy vết

Bốn mục nội bộ WQA-076-01/WQA-066-02/WQA-081-01/WQA-013-01 đã có tại QA No.93/94/95/96: chuyển TRACK_EXISTING_SOURCE_ITEM, bản xuất độc lập còn0câu. No.97/98/99 lần lượt hỏi trạng thái thông báo, kết thúc khi còn phí, nhiều category; giữ nguyên số nguồn, không soạn/gửi câu mới. Không coi Open/Close là quyết định trọn phạm vi.

KS20261120 các mục22,33,35,36,37,39,40,41 chưa có trả lờiF; mục34 chỉ trả lời người cung cấp tranh, chưa trả lời quyền đổi tên. Sheet việc cần quyết có3mục, E2:E4 trống. Không hỏi lại phần đã có trả lời; chỉ tiếp tục phần còn thiếu theo ID đang có.

## Tài liệu đã đồng bộ

- Sổ nguồn và kiểm kê16tệp; delta giá trị/bình luận và hash cũ/mới trong [hồ sơ tiếp nhận23/11](qa-ks-update-2026-11-23.json).
- Sổ requirement/rule, flow index và metadatafinding theo các mã hiện có; [changes.csv](changes.csv) giữ giá trị trước/sau. Bằng chứng cũ QA/KS đánh STALE; successor chỉ trích lại nguồn, không kế thừa VERIFIED mệnh đề cũ.
- SCD thêm phần cập nhật tại chức năng liên quan; phần cũ giữ trong mục lịch sử, AC/màu cũ không là baseline hiện hành. Không sửa mã nguồn ứng dụng hoặc thiết kế DB.
- Bản chính Q&A và CSV đồng bộ về theo dõi nhật ký nguồn; giữ bản nháp cũ để truy vết.

## Gate và việc còn lại

G1 BLOCKED chờ người duyệt phạm vi nguồn mới; G2–G4 STALE cho phần phụ thuộc QA/KS, G5/G6 BLOCKED vì chưa có review độc lập và duyệt phiên bản mới. Không cấp G7/G8 PASS hoặc baselineAPPROVED. Đây là review của tác giả, không tự ký thay reviewer.

Tech Lead/BA reviewer cần kiểm độc lập các thay đổi vai trò, trạng thái và nhánh lỗi; đội/provider xác minh API hủy/đăng lại, lịch sau dừng và khả năng thanh toán; đầu mối khách xác nhận các ý còn mở bằng nguồn có thẩm quyền. Phê duyệt thương mại/phát hành giữ riêng.

## Kiểm tra hoàn tất

- `python3 docs/requirement-review/validate.py`: PASS —16hash nguồn,9schema CSV và liên kết workflow.
- Kiểm tra delta:14nguồn khác không đổi; workbook15 không sửa; No.93–96 đều đã liên kết ID nội bộ, bản xuất0câu; lịch sử nội dung/review giữ lại.
- Đã thêm cảnh báo tác động và sửa quy tắc liên quan trong báo cáo AI Core, hướng dẫn Upload-Post và hướng dẫn PWA; chưa sửa triển khai/DB.
- PASS ở đây chỉ là kiểm cơ học; không thay G1–G8 hoặc review độc lập.
