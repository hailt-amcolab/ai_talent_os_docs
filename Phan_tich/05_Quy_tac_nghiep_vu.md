<!-- QA26112026 -->
## Nội dung hiện hành theo Q&A — 26/11/2026

Áp dụng các trả lời và phần chấp thuận được nêu dưới đây theo yêu cầu cập nhật tài liệu của người dùng. Đây là FACT về phản hồi nguồn; chưa tự cấp G7/G8, phê duyệt thiết kế hoặc thương mại. Phần lịch sử chỉ còn hiệu lực ở chủ đề không bị thay. Mã màn trong trả lời25–26/11 theo YK3 bản0.3, không đổi mã SD18/SD19.

### Kích hoạt tài khoản và hồ sơ

Talent được duyệt nhưng chưa đăng ký phương thức thanh toán vẫn ở 利用前; mỗi lần đăng nhập mở hướng dẫn khởi tạo. Đăng ký phương thức thanh toán xong tự chuyển 利用中, tạo thư mục riêng và báo Manager. Manager bấm 「登録完了」 để đánh dấu hoàn tất hồ sơ và bắt đầu AI coach; không tự kiểm đủ trường bắt buộc. M-08 của YK3 có hồ sơ, định hướng, sở thích/sở trường, mục tiêu tương lai, giọng điệu; không trường nào bắt buộc.

**Phần còn mở/giới hạn:** Ngày bắt đầu thu và cách xử lý khởi đầu giữa tháng vẫn theo No.49; đăng ký phương thức thanh toán không tự chứng minh đã thu tiền.

Căn cứ: QA `Q&A!A52:J52 (No.52); Q&A!A53:J53 (No.53); Q&A!A54:J54 (No.54); Q&A!A92:J92 (No.92)`; `EV-1331` / `DEC-0015`.

### Nhập thông tin và ưu tiên chỉ thị

Manager nhập/sửa 5 nhóm thông tin tại M-08 (YK3 bản 0.3), có lịch sử thay đổi; ChatGPT cũng xem/sửa cùng thông tin. Thông tin ngoài M-08 như sinh nhật/lịch xuất hiện được truyền qua hội thoại M-17 và lưu MD trong thư mục Talent trên OneDrive; không có thao tác sửa file OneDrive trực tiếp. Khi thông tin Talent mâu thuẫn chỉ thị AI, ưu tiên chỉ thị AI.

**Phần còn mở/giới hạn:** No.74 là đối chiếu YK3 ngày25/11; No.92 là trả lời FCP26/11. Giữ QA101 về DB và backup: không suy toàn bộ dữ liệu chuyển về OneDrive; phạm vi đồng bộ DB/MD là thiết kế đội cần làm rõ. Phạm vi/chi phí màn mới chưa tự được duyệt thương mại.

Căn cứ: QA `Q&A!A74:J74 (No.74); Q&A!A92:J92 (No.92)`; `EV-1332` / `DEC-0016`.

### Quyền, phân công và khôi phục Manager

Mọi Manager có thể duyệt và cập nhật mọi Talent. Mỗi Talent có một Manager phụ trách, gán thủ công tại M-11 ❺, không gán theo category. Trước khi vô hiệu hoá Manager phải chuyển Talent sang người khác; chặn tự vô hiệu hoá và vô hiệu hoá Manager cuối. Quên mật khẩu đặt lại qua email; mất thiết bị xác thực thì Manager khác đặt lại 2FA. Lần đăng nhập đầu M-01: sau kiểm mật khẩu hiện QR và ô mã 6 số. M-02/M-04 mặc định chỉ hiện Talent phụ trách, có lọc xem tất cả.

**Phần còn mở/giới hạn:** Yêu cầu duyệt gửi Manager phụ trách; dự phòng khi nghỉ/bỏ sót và nơi nhận các thông báo khác vẫn chờ Adesso tại No.87/88, KS20261122 No.35. Quyền thao tác mọi Talent không đồng nghĩa gửi thông báo cho mọi Manager. FCP còn phải bổ sung màn QR.

Căn cứ: QA `Q&A!A7:J7 (No.6); Q&A!A67:J67 (No.67); Q&A!A87:J87 (No.87); Q&A!A88:J88 (No.88); Q&A!A89:J89 (No.89)`; `EV-1333` / `DEC-0017`.

### Vòng đời chủ đề và nháp

Chủ đề cũ hết hạn khi có 3 chủ đề mới sáng hôm sau. Nháp chưa 採用 giữ 7 ngày rồi ẩn khỏi màn hình; không suy ẩn đồng nghĩa xoá vật lý. Ảnh/video giữ theo thời hạn dữ liệu sau kết thúc sử dụng: 6 tháng.

**Phần còn mở/giới hạn:** Thời gian giữ bản ghi thu tiền là vấn đề riêng No.98; không áp thời hạn media cho mọi loại nhật ký.

Căn cứ: QA `Q&A!A55:J55 (No.55)`; `EV-1334` / `DEC-0018`.

### Giờ đăng và tư liệu đến muộn

Giờ đăng chốt khi tạo nháp; bài thứ hai trở đi dùng khung tiếp theo, cách bài trước ít nhất 3 giờ theo đề xuất được chấp thuận. AI chọn giờ trong khoảng chỉ thị, lệch vài phút giữa Talent và tách khung theo SNS; 採用 quá giờ chuyển khung tiếp theo. Nếu chưa có tư liệu mới, AI chọn tư liệu đã lưu phù hợp bài. Không có thì không đăng, báo Talent trước và sau giờ dự kiến; gửi bổ sung sau đó chuyển khung tiếp theo. Không giới hạn số lần dùng lại tư liệu cho luồng này, AI chọn theo độ phù hợp, không bắt buộc chọn ảnh lâu chưa dùng nhất.

**Phần còn mở/giới hạn:** Auto theo kỳ có giới hạn riêng tại No.83: không dùng cùng ảnh/video hai lần trong kỳ; không áp quy tắc tái sử dụng của No.56 để bỏ giới hạn đó. Thuật toán giờ chi tiết thuộc thiết kế đội.

Căn cứ: QA `Q&A!A56:J56 (No.56)`; `EV-1335` / `DEC-0019`.

### Đăng hằng ngày, tự động theo kỳ và cài đặt xác nhận

Đăng hằng ngày luôn dùng được; đăng tự động theo kỳ chỉ chạy khi bắt đầu ở T-10; hai cách dùng đồng thời, không có cài đặt chuyển độc quyền giữa hai cách. T-08 ❺ chọn xác nhận trước khi đăng hay không và áp dụng cả hai. Auto lấy chủ đề qua hội thoại, tư liệu thêm tại T-10 ❹, nhịp theo chỉ thị. AI chọn ảnh hợp chủ đề rồi tạo chữ/hashtag; không dùng thứ tự tải lên và không dùng lại cùng ảnh/video hai lần trong kỳ. Tạo bài hằng ngày trước ngày đăng, không tạo tất cả từ đầu. Chủ đề đổi qua hội thoại trong kỳ. Báo khi còn tư liệu cho 2 ngày; ngày thiếu bỏ qua, thêm tư liệu thì chạy tiếp từ hôm sau. Hết kỳ kết thúc và báo Talent đặt kỳ mới. Đổi cài đặt xác nhận giữ lịch đã có, áp cài đặt mới từ bài chưa đặt lịch. Talent chưa xác nhận tới giờ thì không đăng và báo Talent.

**Phần còn mở/giới hạn:** Mã T-08/T-10 ở đây theo YK3 được câu trả lời26/11 dẫn chiếu, không đổi mã lịch sử SD18/SD19. Auto không có Manager duyệt theo No.71/84; xác nhận Talent và duyệt Manager là hai việc khác nhau.

Căn cứ: QA `Q&A!A70:J70 (No.70); Q&A!A71:J71 (No.71); Q&A!A83:J83 (No.83)`; `EV-1336` / `DEC-0020`.

### Kiểm và sửa từ cấm

Kiểm từ cấm trước khi đặt lịch; phát hiện thì AI viết lại rồi đặt lịch. Không dùng nhánh Manager sửa, không thông báo Manager vì phát hiện này và không bắt Talent xác nhận lại sau AI sửa. Danh sách từ cấm mới chỉ áp dụng từ lần kiểm tiếp theo; bài đã kiểm và đặt lịch giữ nguyên, Manager muốn dừng thì huỷ lịch. Không tự quét lại toàn bộ lịch khi sửa danh sách.

**Phần còn mở/giới hạn:** Quy tắc26/11 thay đề nghị22/11 yêu cầu xác nhận lại và nhánh Manager sửa tại QA90/GJ19 trên đúng chủ đề. Số vòng tự sửa nếu vẫn không sạch/lỗi AI là thiết kế lỗi còn cần đội xác định; không tự đặt bảo đảm AI sửa luôn thành công.

Căn cứ: QA `Q&A!A57:J57 (No.57); Q&A!A71:J71 (No.71); Q&A!A96:J96 (No.96)`; `EV-1337` / `DEC-0021`.

### Duyệt bài và trả lại

Auto theo kỳ không có bước Manager duyệt. Với bài hằng ngày của Talent chọn không cần xác nhận, vẫn mở lịch T-16 → chi tiết T-12 rồi tick T-12 ❼ để chuyển từ đặt lịch sang chờ Manager duyệt. Duyệt xong đăng giờ đã định; trả lại có lý do, Talent sửa và gửi lại. Gửi duyệt lại là cùng một bài, giữ lịch sử; giữ giờ nếu còn kịp, quá giờ chuyển khung tiếp theo.

**Phần còn mở/giới hạn:** Không mặc định mọi bài công việc auto phải qua Manager. Fallback người nhận khi Manager vắng mặt vẫn No.87.

Căn cứ: QA `Q&A!A58:J58 (No.58); Q&A!A71:J71 (No.71); Q&A!A84:J84 (No.84)`; `EV-1338` / `DEC-0022`.

### Đăng lại bài lỗi

Không tự đăng lại bài đã thất bại. Talent bấm T-17 ❹「投稿し直す」, Manager bấm M-09 ❹「予約し直す」. Chỉ đăng lại SNS lỗi; giờ mới là khung tiếp theo do AI quyết, giữ kết quả đã thành công của SNS khác.

**Phần còn mở/giới hạn:** Retry kỹ thuật/unknown chống trùng do đội và provider kiểm chứng, không được coi timeout là chắc chắn chưa đăng.

Căn cứ: QA `Q&A!A59:J59 (No.59)`; `EV-1339` / `DEC-0023`.

### Dừng đăng, mở lại và huỷ lịch

Manager dừng/mở lại việc đặt lịch theo từng Talent; dừng huỷ lịch đã có. Không có nút dừng toàn hệ thống; vận hành dừng hệ thống phải xử lý huỷ lịch ngoài theo KS20261122 No.29/34. Trong lúc chỉ dừng đăng, AI coach vẫn chạy, Talent vẫn 採用 được; bài mới ở 停止中のため保留. Mở lại: bài giữ còn kịp thì đặt lịch, bài quá giờ cần Talent 採用 lại. Bài đã huỷ không tự phục hồi; báo Talent trong app và đưa về nháp để 採用 lại. T-10 có nút Talent dừng kỳ auto, huỷ lịch theo kỳ đó.

**Phần còn mở/giới hạn:** Chỉ dừng đăng khác 支払い待ち (No.63/86: dừng cả AI/video) và khác kết thúc sử dụng. No.77/91 là đối chiếu0.3 ngày25/11, không áp phần câu hỏi cũ về nút dừng toàn bộ.

Căn cứ: QA `Q&A!A60:J60 (No.60); Q&A!A61:J61 (No.61); Q&A!A70:J70 (No.70); Q&A!A77:J77 (No.77); Q&A!A91:J91 (No.91)`; `EV-1340` / `DEC-0024`.

### Chờ thanh toán và khôi phục

Khi Square thanh toán lại mà vẫn chưa xác nhận được thanh toán, báo Talent và Manager rồi tự chuyển 支払い待ち (Chờ thanh toán). Dừng AI coach, tạo video và đăng bài; vẫn thu phí tháng. Talent vẫn đăng nhập để đổi phương thức thanh toán. Xác nhận đã thanh toán thì tự trở lại 利用中. Trong lúc dừng không đăng; các bài lỡ giờ không tự đăng bù sau mở lại. Dùng cơ chế thu lại của cổng nếu có, không làm cơ chế thu lại riêng.

**Phần còn mở/giới hạn:** Thay đúng câu trả lời No.46 về không tự dừng. Không tự đặt số lần/ngày thu lại vì No.4/49 còn chờ kiểm Square. H86 bản Việt nói rõ bài tương lai tiếp tục; G86 không mô tả riêng chi tiết đó, không suy phục hồi các bài đã huỷ vì lý do khác.

Căn cứ: QA `Q&A!A63:J63 (No.63); Q&A!A86:J86 (No.86)`; `EV-1341` / `DEC-0025`.

### Đơn giá, ghi lượt và điều chỉnh phí video

Manager đặt một đơn giá video chung tại cài đặt toàn hệ thống M-18 ❺; Adesso quyết giá cụ thể sau kiểm Kling. Lượt tính theo giá tại thời điểm 依頼, đổi giá không tính lại lượt cũ. Lỗi dịch vụ trừ lượt ngay khi báo lỗi; nếu đã tổng hợp thì trừ vào kỳ sau. Yêu cầu sau ngày chốt kỳ vào kỳ sau, theo ngày 依頼. Tổng hợp phí video tháng vào cuối hoặc đầu tháng để chuyển Square.

**Phần còn mở/giới hạn:** No.2 vẫn Open về số tiền; No.4/49 còn chờ khả năng Square và ngày chốt cụ thể. Không đồng nhất đơn giá thu Talent với chi phí provider.

Căn cứ: QA `Q&A!A3:J3 (No.2); Q&A!A62:J62 (No.62)`; `EV-1342` / `DEC-0026`.

### Chu kỳ và nhà cung cấp còn mở

Square là hướng tích hợp đang được FCP xem xét theo trả lời26/11; phí tháng cố định trả trước, không chia theo ngày. Ngày thu tháng, ngày bắt đầu thu và ngày tổng hợp phí video chưa chốt; xác định sau kiểm khả năng cổng.

**Phần còn mở/giới hạn:** Không chốt GMO, không khẳng định Square hỗ trợ carrier hoặc phí video hậu trả. No.4/49 vẫn Open; việc kiểm kỹ thuật thuộc FCP/provider. No.53 Close không đồng nghĩa đã chốt ngày bắt đầu thu.

Căn cứ: QA `Q&A!A5:J5 (No.4); Q&A!A50:J50 (No.49); Q&A!A53:J53 (No.53)`; `EV-1343` / `DEC-0027`.

### Tài khoản office và lưu dữ liệu

Manager nhập email khi tạo office, đăng nhập app office để nối SNS; hiện trong danh sách Talent với nhãn 事務所. Manager sửa email ở quản trị, mật khẩu đặt lại qua Quên mật khẩu. Kết thúc office huỷ lịch, khoá đăng nhập, gỡ SNS. Giữ dữ liệu 6 tháng rồi tự xoá như Talent theo phương án A của No.94; FCP sẽ bổ sung yêu cầu12-4.

**Phần còn mở/giới hạn:** Office là loại riêng miễn phí tháng; không áp 支払い待ち chỉ vì các trạng thái tài khoản dùng chung. Phần dữ liệu thu tiền giữ riêng vẫn No.98.

Căn cứ: QA `Q&A!A66:J66 (No.66); Q&A!A67:J67 (No.67); Q&A!A94:J94 (No.94)`; `EV-1344` / `DEC-0028`.

### Kết thúc sử dụng và khoản phí cuối

Talent đã 利用終了 không trở lại 利用中 trực tiếp; email còn đăng ký không được đăng ký lại trong thời gian giữ dữ liệu. Dữ liệu Talent/office giữ 6 tháng rồi tự xoá. Có phí đã phát sinh chưa thu vẫn được kết thúc ngay; thu khoản cuối (phí tháng cuối và video) một lần ở lần thu tiếp theo, sau đó ngừng thu.

**Phần còn mở/giới hạn:** No.98 mới chấp thuận việc kết thúc và khoản thu cuối; có lưu lịch sử thu tiền riêng trong OS và giữ bao lâu còn chờ Adesso (KS20261122 No.36). Không tự xoá hoặc giữ vô hạn dữ liệu tài chính.

Căn cứ: QA `Q&A!A69:J69 (No.69); Q&A!A94:J94 (No.94); Q&A!A98:J98 (No.98)`; `EV-1345` / `DEC-0029`.

### Ngắt hoặc đổi SNS còn lịch

Chặn ngắt kết nối hoặc đổi tài khoản của đúng SNS còn bài đã đặt lịch. Hiện danh sách bài liên quan để Talent tự huỷ trước rồi mới ngắt; không bắt buộc chỉ Manager huỷ. T-07 có nút 「接続を解除」. SNS không có lịch không chịu chặn này.

**Phần còn mở/giới hạn:** Không áp dụng thao tác người dùng này để suy cách xử lý SNS tự hết hạn/mất kết nối; cơ chế phát hiện do đội/provider.

Căn cứ: QA `Q&A!A95:J95 (No.95)`; `EV-1346` / `DEC-0030`.

### Thử thách và chuỗi ngày

Chấp thuận cả ba điểm: chỉ tự xác định đạt cho thử thách đếm được bằng số (ngày liên tục, số bài, follower tăng); loại khác là lời nhắn, không tự chúc mừng đạt. Trạng thái: đề xuất/đã nhận/từ chối/đang thực hiện/đạt/hết hạn; AI đặt hạn khi đề xuất, chỉ một thử thách đang thực hiện. Chuỗi ngày đếm ngày có ít nhất một bài thành công trên một SNS đã nối; ngắt ngày thì lần tiếp theo về ngày1. FCP cho tiếp tục mà không chờ văn bản của Nonaka.

**Phần còn mở/giới hạn:** FCP vẫn xác nhận với Adesso ngày27/11 việc prompt đã nhận có đúng quan điểm thử thách của Nonaka. Không coi câu đó chặn ba quy tắc đã được chấp thuận; không tuyên bố prompt đã được Adesso xác nhận. QA101 về agent ghi tiến độ vẫn giữ.

Căn cứ: QA `Q&A!A72:J72 (No.72)`; `EV-1347` / `DEC-0031`.

### Khung lời nhắn hằng ngày

Giờ sáng/trưa/tối chỉnh ở M-18 ❶, mặc định 8/12/20. Sáng có kết quả hôm trước, chuỗi ngày, gợi ý chủ đề và thử thách. Trưa AI quyết nội dung theo chỉ thị 毎日の声かけ, không mặc định trưa là nhắc gửi ảnh. Tối nhắc nhiều ngày không đăng và báo đạt mục tiêu. Nhắc ảnh/video theo M-18 ❷, trước giờ đăng2giờ. Bài đăng auto không có lời nhắn theo7-7.

**Phần còn mở/giới hạn:** Không diễn giải ngoại lệ lời nhắn của bài auto thành dừng mọi hội thoại hay mọi báo cáo của Talent dùng auto.

Căn cứ: QA `Q&A!A73:J73 (No.73)`; `EV-1348` / `DEC-0032`.

### Thông báo, email và thao tác mở

Thông báo Manager hiện trong quản trị và gửi email theo mô tả0.3; yêu cầu duyệt có danh sách chờ duyệt. Adesso cung cấp câu chữ và địa chỉ email nhận. Bấm dòng thông báo mở màn liên quan và tự đánh dấu 対応済み; bỏ tick 未対応 xem cả đã mở. Không thêm nút xử lý thủ công hoặc hai trạng thái nghiệp vụ đọc/xử lý độc lập. Đạt mục tiêu báo Talent và Manager.

**Phần còn mở/giới hạn:** No.87/88 ngày26/11 còn hỏi người nhận các loại ngoài duyệt và fallback, nên không coi mặc định Manager phụ trách ở No.75 là chốt mọi ngoại lệ. Thiết kế email rộng hơn đề xuất cũ cần xử lý thương mại riêng. Gửi thành công là trạng thái kỹ thuật khác thao tác mở.

Căn cứ: QA `Q&A!A75:J75 (No.75); Q&A!A76:J76 (No.76); Q&A!A97:J97 (No.97)`; `EV-1349` / `DEC-0033`.

### Giới hạn hội thoại và tâm sự nghiêm trọng

Không giới hạn số lượt hội thoại; yêu cầu ngoài bài đăng được chuyển về chủ đề bài đăng theo chỉ thị AI. Không có chức năng báo Manager khi Talent tâm sự nghiêm trọng; phạm vi ứng xử nằm trong phần giới hạn hội thoại của chỉ thị. Không khôi phục nhãn/cảnh báo cũ chỉ vì còn trong màn18/11.

**Phần còn mở/giới hạn:** Không suy thông báo đã có phê duyệt thương mại hoặc AI luôn phát hiện/ứng xử đúng. No.93 là đối chiếu0.3 ngày25/11, không tự gán là khách chọn toàn bộ câu chữ phương án B.

Căn cứ: QA `Q&A!A76:J76 (No.76); Q&A!A93:J93 (No.93)`; `EV-1350` / `DEC-0034`.

### Phạm vi ranking và video xếp tuần tự

Ranking không làm ở giai đoạn1: bỏ màn がんばっているタレント và nút menu/home khỏi phạm vi thiết kế giai đoạn này. Video tự làm/AI đã lưu được dùng cho auto; không làm chức năng tự lấy video theo thứ tự lưu, mỗi ngày tạo một nháp.

**Phần còn mở/giới hạn:** Không đồng nghĩa đã duyệt mọi cách lọc/sắp xếp mới của danh sách Talent hoặc chi phí giai đoạn sau.

Căn cứ: QA `Q&A!A38:J38 (No.37); Q&A!A100:J100 (No.100)`; `EV-1351` / `DEC-0035`.

### Thay danh sách từ cấm sau đặt lịch

Phương án A: danh sách sửa đổi chỉ áp dụng cho lần kiểm diễn ra sau thay đổi. Bài đã kiểm và đặt lịch không bị dừng hay tự quét lại; Manager cần dừng thì huỷ lịch.

**Phần còn mở/giới hạn:** Không khôi phục nhánh Manager sửa từ cấm của No.90; quy tắc hiện hành là No.71.

Căn cứ: QA `Q&A!A96:J96 (No.96)`; `EV-1352` / `DEC-0036`.

[Phiên bản nguồn, hash và phạm vi kiểm](../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md).
<!-- /QA26112026 -->

<details>
<summary>Nội dung trước cập nhật26/11 — giữ để truy vết; phần mâu thuẫn đã được thay ở trên</summary>

<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### AI agent và dữ liệu

G/H ghi xác nhận24/11: AI Coach là agent đọc/ghi Supabase; nhận chỉ thị, khen, đề xuất và ghi tiến độ Challenge, nhập chỉ thị qua hội thoại M-17 trong phạm vi; dữ liệu trong DB có backup; Adesso trả token và chỉnh prompt; không bảo đảm phán đoán đúng. J101 là phân vai NỘI BỘ25/11: OS nhập dữ liệu dịch vụ ngoài; agent quyết định giờ rồi ghi lịch để OS thực thi.

**Còn mở/giới hạn:** YK3 §2-5/3-3/3-8/AC chưa đồng bộ. Không suy agent được SQL tùy ý hoặc bỏ kiểm quyền. Vị trí byte media và vai trò OneDrive chưa chốt lại toàn bộ. Căn cứ: `QA Q&A!G101:J101 (No.101)`; `EV-1311`; QA No.101;TR-2-1;TR-2-2;TR-2-3;TR-2-4;TR-3-1;TR-3-2;TR-3-5;TR-8-8.

### Từ cấm sau AI sửa

Quyết định24/11: AI viết lại rồi đặt lịch; không thêm bước Talent xác nhận lại, không chuyển Manager sửa.

**Còn mở/giới hạn:** Không tự chốt số lần sửa khi vẫn lỗi, thất bại hoặc tương tác với duyệt bài công việc; No.96 vẫn theo dõi hiệu lực danh sách đổi. Căn cứ: `KS 20261122!G4:I4 (No.3)`; `EV-1313`; QA No.40;QA No.90;QA No.96;TR-4-4.

### Video và âm nhạc

Nhạc chỉ dùng loại không bản quyền theo cách gọi của nguồn; video cơ bản làm ảnh Talent chuyển động, một dạng cố định; video cầu kỳ làm ngoài rồi nhập vào. Khi provider không nhận ảnh trẻ em thì dùng video Talent tự quay.

**Còn mở/giới hạn:** Độ dài/chất lượng 確認61 và số ảnh 確認62 vẫn chưa quyết. Nhạc thịnh hành do Talent thêm ở app SNS. Không xác nhận điều khoản bản quyền/provider độc lập trong đợt này. Căn cứ: `KS 20261122!G3:I9 (No.2,5–8)`; `EV-1315`; QA No.36;QA No.60;確認61;確認62;TR-5-1;TR-5-2.

### Giới hạn chi tiêu dưới18

Nguồn ghi quyết định24/11: không đặt trần chi tiêu riêng cho Talent dưới18.

**Còn mở/giới hạn:** Không suy bỏ kiểm soát sử dụng kỹ thuật hoặc điều kiện tuổi của SNS/provider; không phải xác nhận pháp lý. Căn cứ: `KS 20261122!G5:I5 (No.4)`; `EV-1316`; QA No.60;TR-5-4.

### Tâm sự nghiêm trọng

Không làm thông báo Manager về tâm sự nghiêm trọng. G17 nói chỉ dẫn AI có thể hướng dẫn tìm hỗ trợ; toàn bộ hội thoại được lưu và Manager đọc được.

**Còn mở/giới hạn:** H/I chỉ chốt không thông báo, không chọn trọn mọi phương án của QA No.93 hoặc bảo đảm AI phát hiện đúng. Căn cứ: `KS 20261122!G17:I17 (No.16)`; `EV-1318`; QA No.93;TR-3-3.

### Giờ đăng

Giờ đăng lệch vài phút giữa Talent và chia khung theo SNS; Manager ghi khoảng giờ trong chỉ thị, AI dùng thực tích để chọn giờ. G16 nói Talent chỉ hủy lịch.

**Còn mở/giới hạn:** H16 không lặp riêng quyền hủy. Không tự chốt thuật toán, jitter cụ thể hoặc thời điểm đổi lịch đang có. Căn cứ: `KS 20261122!G16:I16 (No.15)`; `EV-1319`; QA No.61;QA No.70;TR-8-1;TR-8-3.

### PR

Talent tự thêm PR vào bài; OS không tự phân loại bài công việc hoặc xác định bài cần PR. Nguồn báo đã thử nhãn video AI qua provider.

**Còn mở/giới hạn:** Không dùng nguồn này để tự xác nhận kết quả thử hoặc tuân thủ pháp lý; duyệt bài công việc vẫn do Talent yêu cầu. Căn cứ: `KS 20261122!G33:I33 (No.32)`; `EV-1322`; TR-7-7;TR-5-5.

### YK3: không tự đăng lại

Khi đăng lỗi, OS không tự đăng lại; Talent thử lại sau, Manager vẫn có đặt lịch lại tại M-09. Hủy lịch do cả Talent/Manager.

**Còn mở/giới hạn:** Retry kỹ thuật trước khi xác định kết quả khác việc tự đăng lại bài đã thất bại; cần thiết kế chống trùng và kiểm provider. Căn cứ: `YK3 §2-4-6 w:p386–431`; `EV-1329`; QA No.59;QA No.61;TR-8-5;TR-7-2.

<!-- /DELIVERY24112026 -->

> **Đợt23112026:** Đã đối chiếu nguồn mới; TikTok nháp/consent, ranking, lưu đồng ý phụ huynh và giọng nói là đề nghị chưa chốt. Không khôi phục Manager sửa, cảnh báo tâm sự hoặc trần phí từ hình/nhận định hồi tố. [Đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md). Mã màn phải kèm UI-M20/ngày20/11/trangPDF; không đổi mã AG/SD18/SD19.

> **Cập nhật nguồn23/11/2026:** QA/KS đã đổi phiên bản; nội dung bên dưới giữ lịch sử, phần mâu thuẫn phải theo [đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md). Talent được hủy lịch/đăng lại bài lỗi; thêm tạm dừng vẫn tính phí; AI tự sửa từ cấm; bỏ dừng đăng toàn hệ thống và thông báo tâm sự nghiêm trọng; chọn media theo chủ đề. Không suy GMO, slideshow hoặc đề xuất đang xem xét đã được duyệt.

# Quy tắc nghiệp vụ

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **4-2** — Không giới hạn số lần AI viết lại theo DEC-0001; quyền sửa tay giữ nguyên. Các mô tả hai lượt trong PDF19/11 là lịch sử bị thay đúng chủ đề. Còn mở: Xử lý lỗi/kết quả không rõ/gửi lặp còn do đội thiết kế. Căn cứ: `T19:18,27,29;USER:DEC-0001`.
- **4-4** — Manager sửa bài bị từ cấm, AI kiểm lại; sạch thì đặt lịch, còn từ cấm thì giữ ở màn xử lý. Không cần trả bản Manager sửa cho Talent xác nhận lại theo GJ19§12. Còn mở: Quyền Talent tự sửa chính bài đã bị chặn chưa được mô tả rõ như quyền sửa bản nháp thường; chỉ giữ phần này ở No.57. Căn cứ: `M19:16,23;BF19:17;GJ19:12`.
- **7-4** — Bỏ nút đánh dấu xử lý; mở dòng thông báo sang màn liên quan thì đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Lọc mặc định chưa mở, bỏ lọc xem cả đã mở. Yêu cầu duyệt nằm danh sách M-04 riêng. Thông báo và email gửi Manager phụ trách, không mọi người. Còn mở: Phân công category/cá nhân và fallback vẫn No.6; email loại nào và câu chữ còn cần rà mẫu. Không tự chốt đã xử lý chung hay riêng từng Manager. Căn cứ: `M19:6,8;BF19:14;GJ19:6,7`.
- **1-1** — Phí tháng cộng phí video; giá AI video từ lượt đầu; tạo lại tính thêm, lỗi dịch vụ không tính. Không lưu thẻ; đổi thanh toán/lịch sử qua nhà cung cấp. Còn mở: Chưa chốt trả trước/sau, ngày bắt đầu tính phí, cổng chính thức; Square ở H105 là nhận định cần provider kiểm, không tự chọn GMO hay Square/thu ngay/ngày 1/thử lại 3 ngày. Căn cứ: `T19:9,20,21,25,26;M19:15;BF19:15;KS:20261120:23,24,25,26`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

> **Quyết định20/11 — DEC-0001:** người dùng chốt áp dụng H65, không giới hạn số lần nhờ AI viết lại. Thay giới hạn hai lần trong đúng chủ đề; các điều kiện sửa/duyệt và chính sách chi phí khác giữ nguyên. Xem [bản ghi quyết định](../docs/requirement-review/corrections-2026-11-19/REPORT.md).

Có 71 quy tắc nghiệp vụ, chia thành 10 nhóm. Một phần nằm ở mục 5 業務ルール (quy tắc nghiệp vụ) của [YK2]. Phần còn lại nằm rải rác ở mục 3, 4 (phần 前提 – tiền đề của từng UC), 6, 7, 9, 10, 11 và 14. Cuối tab có 10 điểm mâu thuẫn và 20 quy tắc còn thiếu. Tab này đã viết lại theo bản yêu cầu v2.

**Cách đọc:**

- [YK2] = AI育成OS_概要要件定義書_v2.docx. Số 確認 (mục cần xác nhận) theo đánh số của v2.
- Mỗi quy tắc có mã BR (viết tắt của Business Rule – quy tắc nghiệp vụ), đánh số theo nhóm, ví dụ BR-A01. Quy tắc mới có trong v2 ghi "(mới)".
- "Giới hạn" là các con số hoặc phạm vi mà quy tắc đặt ra. "Ngoại lệ" là trường hợp tài liệu nói rõ không áp dụng quy tắc hoặc xử lý khác.
- Ô "—" là tài liệu không nêu, không phải là không có.
- ⚠ là quy tắc chỉ dựa trên 確認, khách chưa xác nhận.
- Các giá trị số (giờ, số ngày) phần lớn là 弊社の想定 (giả định của FutureCore), sẽ chốt khi khách xem màn hình thật ([YK2] mục 5-2, 6).

| Nhóm | Nội dung | Số quy tắc |
| --- | --- | --- |
| A | Tài khoản, đăng ký, đăng nhập, quyền | 11 |
| B | Thời gian và cài đặt | 5 |
| C | Chủ đề và bản nháp | 7 |
| D | Duyệt bài và từ cấm | 7 |
| E | Đăng bài | 10 |
| F | Thu phí | 10 |
| G | Video | 6 |
| H | Huấn luyện viên AI | 8 |
| I | Dữ liệu và bảo mật | 4 |
| J | Quy tắc dự án (chốt tài liệu, thay đổi, nghiệm thu) | 3 |

## A. Tài khoản, đăng ký, đăng nhập, quyền

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-A01 | Tài năng tự đăng ký trên ứng dụng, quản lý duyệt | Mọi người muốn dùng, kể cả người ngoài công ty ⚠ | Nhập tên (nghệ danh hoặc tên thật), email, ngày sinh, đồng ý 利用規約 (điều khoản sử dụng). Quản lý duyệt hoặc từ chối. Duyệt thì gửi email mật khẩu tạm. Từ chối thì gửi email mẫu, không nêu lý do | Chỉ người được duyệt mới đăng nhập được. Quản lý từ chối người lạ và người đã rời công ty | Tài khoản công ty do quản lý tạo, không qua đơn | UC-01, 6-1 (1-4), 確認1 |
| BR-A02 | Mỗi email chỉ dùng cho một tài khoản | Khi gửi đơn đăng ký | Không nhận đơn nếu email đã có. Email là mã đăng nhập | — | — | 6-4 (2-2), UC-01 前提 |
| BR-A03 | Quy tắc mật khẩu và khóa tài khoản | Tài năng và quản lý | Lần đầu đăng nhập bằng mật khẩu tạm rồi tự đặt mật khẩu. Mật khẩu phải có cả chữ và số. Sai liên tiếp thì khóa đăng nhập | Ít nhất 8 ký tự. Sai 5 lần thì khóa 15 phút | Quên mật khẩu thì tài năng tự đặt lại qua email | 6-1 (1-4), 6-2 (1-6), UC-03 前提 |
| BR-A04 | Thời hạn của đường dẫn và phiên đăng nhập | Kết nối mạng xã hội, phiên làm việc | Đường dẫn kết nối hết hạn thì tài năng tự tạo lại trong ứng dụng | Đường dẫn kết nối mạng xã hội: 48 giờ. Phiên của tài năng: 30 ngày trên cùng thiết bị. Quản lý không thao tác 30 phút thì phải đăng nhập lại | Đổi điện thoại thì đăng nhập lại và dùng tiếp. V2 bỏ đường dẫn mời hạn 7 ngày | 6-1 (1-4), 6-2 (1-6), 6-10 (8-2), UC-13 前提 |
| BR-A05 | Quản lý đăng nhập hai bước và chỉ có một mức quyền | Mọi quản lý | Nhập thêm mã 6 số từ ứng dụng xác thực. Mọi quản lý làm được như nhau | — | Quản lý bị vô hiệu hóa thì không đăng nhập được và không nhận thông báo | 6-2 (1-6), 10-1, UC-13 前提 |
| BR-A06 | Phạm vi xem thông tin | Mọi lúc | Tài năng chỉ xem dữ liệu của mình và không vào được màn hình quản trị. Mọi quản lý xem được mọi tài năng và toàn bộ hội thoại ⚠. Lần đầu mở ứng dụng, tài năng thấy thông báo và bấm nút xác nhận ⚠ | Tài năng không thấy số liệu hay thứ hạng của người khác ⚠ | — | 3-2, 確認13, 40, 41, 42 |
| BR-A07 | Mọi lần quản lý xem thông tin tài năng đều được ghi lại | Quản lý mở màn hình thông tin, hội thoại hoặc số liệu | Ghi ngày giờ, quản lý, tài năng | Nhật ký không sửa được | — | 3-2, 6-2 (7-6), 確認44 |
| BR-A08 | Trạng thái tài năng và hậu quả khi kết thúc | Quản lý đổi trạng thái (có bước xác nhận) | Khi chuyển sang 利用終了 (đã kết thúc): dừng nhắn tin, dừng thu phí, hủy bài đã hẹn, chặn đăng nhập ⚠. Dữ liệu giữ lại một thời gian | 3 trạng thái: 利用前 (trước khi dùng), 利用中 (đang dùng), 利用終了 | Chuyển từ 利用終了 về 利用中 được ⚠ | 6-2 (7-3), UC-13, 7-3, 確認53–56 |
| BR-A09 | Tài khoản công ty là một loại tài khoản riêng | Quản lý đăng bài cho công ty | Quản lý tạo trên màn hình quản trị. Hệ thống tạo thư mục ngay lúc đó. Quản lý đăng nhập bằng mã của tài khoản công ty và dùng như tài năng | Có nhiều tài khoản thì đăng nhập lại cho từng tài khoản | Không duyệt bài ⚠. Không thu phí tháng, không đăng ký thanh toán | 3-1, UC-12 前提, 6-4 (2-2), 確認52 |
| BR-A10 (mới) | Nhãn dưới 18 tuổi tính từ ngày sinh | Khi có đơn đăng ký | Hệ thống tính từ ngày sinh và hiện nhãn **dưới 18 tuổi** trên màn hình quản trị để tham khảo ([KS] 確認2: không dùng mốc 未成年 (vị thành niên) theo luật, vì livestream TikTok cần 18 tuổi trở lên). Huấn luyện viên AI dùng ngày sinh để biết tuổi | Chỉ để tham khảo | — | 3-1, UC-01 前提, 確認2 |
| BR-A11 (mới) | Loại tài khoản không đổi được | Mọi tài khoản | Có hai loại: tài năng (đăng ký qua ứng dụng, có trả phí) và tài khoản công ty (quản lý tạo, không thu phí). Tài năng không tự chọn hay đổi loại | Không chuyển qua lại giữa hai loại | Tài khoản công ty muốn trả phí thì đăng ký mới như tài năng | 5-4, 6-3 (1-2, 1-3) |

## B. Thời gian và cài đặt

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-B01 | Giờ nhắn tin buổi sáng | Mỗi ngày, kể cả cuối tuần và ngày lễ ⚠, mọi tài năng đang dùng | Tin gửi theo khung sáng, trưa, tối ([KS] 確認18); đổi giờ theo từng tài năng xem xét sau khi vận hành. Xử lý buổi sáng phải xong trước giờ này | Mặc định 8:00 ⚠. Gửi cùng một lúc cho mọi người hay không sẽ quyết sau khi thử tải | — | 5-2, 9-2, 確認18, 21 |
| BR-B02 | Nhắc gửi tư liệu | Chưa có ảnh hoặc video trước giờ đăng | Gửi lời nhắc | Mặc định trước giờ đăng 2 tiếng. Tối đa 1 lần mỗi ngày | — | 5-2, 6-7 (6-5) |
| BR-B03 | Ngưỡng số ngày không đăng bài | Số ngày liên tục không đăng bài | Đủ ngưỡng thứ nhất thì AI hỏi han tài năng. Đủ ngưỡng thứ hai thì báo quản lý | Mặc định 3 ngày và 7 ngày; xác nhận lại ([KS] 確認19). Chỉ áp cho cách đăng 要確認 | Bài tài năng tự đăng ngoài hệ thống vẫn tính là có đăng, nếu Upload-Post đọc được | 5-2, 6-5 (3-9), UC-09, 確認19 |
| BR-B04 | Ngày tổng kết tuần | Mỗi tuần | Gửi bản tổng kết tuần và còn bao nhiêu tới mục tiêu | Mặc định thứ Hai | — | 5-2, 6-5 (3-8), 確認14 |
| BR-B05 | Các giá trị quản lý được tự đổi, không cần lập trình | Quản lý đổi trên màn hình quản trị hoặc sửa file trên OneDrive | Theo từng tài năng: có dùng duyệt bài không, dừng hoặc chạy lại đăng tự động, mục tiêu và hạn. Chung cho tất cả: từ cấm, giờ nhắn tin, giờ nhắc, ngưỡng số ngày, dừng toàn bộ đăng tự động. Qua file: giọng điệu, hồ sơ, ngày riêng, kế hoạch nội dung, kinh nghiệm đăng bài, チャレンジ (thử thách) ⚠ | Sửa file thì có tác dụng từ sáng hôm sau | Chỉ quản lý đổi được hồ sơ và mục tiêu. Tài năng không đổi được | 5-6, 7-5, UC-02 前提, UC-04 前提, 確認5 |

## C. Chủ đề và bản nháp

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-C01 | Mỗi lần đề xuất có 3 chủ đề gợi ý | Cách đăng 要確認; nhịp (hằng ngày, vài ngày, mỗi tuần) theo chỉ thị cho AI ([KS] 確認14, 15) | Tạo từ: định hướng, sở thích, sở trường, bài cũ được tương tác tốt, thông tin quản lý ghi trong file, tin tức trong ngày ⚠ | Đúng 3 chủ đề ⚠ | Tài năng có thể không chọn mà tự nói chủ đề muốn đăng | 5-3, 確認15, 16 |
| BR-C02 | Chỉ dẫn của công ty được ưu tiên hơn gợi ý của AI | Khi アデッソ có chỉ dẫn, ví dụ chủ đề theo thứ trong tuần | Theo chỉ dẫn của công ty | — | — | 5-3, 6-5 (3-1) |
| BR-C03 | Nội dung của bản nháp | Khi tài năng đã chọn chủ đề | Chú thích, hashtag, hướng dẫn chụp (ví dụ: một ảnh nghiêng mặt lúc tập). Thêm kịch bản nếu là video | Độ dài và số hashtag phải nằm trong giới hạn của cả 3 mạng xã hội | — | 5-3, 6-6 (4-1), 確認24 |
| BR-C04 | Số bản nháp mỗi ngày | Mỗi tài năng | Tài năng yêu cầu bao nhiêu thì AI tạo bấy nhiêu | Không có con số cố định. V1 là 1 bài mỗi ngày | — | 5-3, UC-05 前提 |
| BR-C05 | Chỉ đăng bài có ảnh hoặc video; ở 要確認 phải 採用 (chấp nhận) | Mọi bài | 要確認: không 採用 thì không đăng. 自動投稿: hệ thống tự soạn và tự đăng trong khoảng tài năng đặt, dùng tư liệu đã tải lên ([KS] 確認19, 25). Không có ảnh hay video thì không 採用 được, vì cả 3 mạng xã hội đều không đăng chữ suông ⚠ | — | Video tự làm đã lưu thì AI tự làm bản nháp, mỗi ngày một cái theo thứ tự lưu ⚠, nhưng tài năng vẫn phải 採用 | 6-6 (4-3), UC-05, UC-06, 確認25, 26, 32 |
| BR-C06 | Bản nháp sửa qua AI hoặc tài năng tự sửa | Trước khi 採用 | Tài năng nói điểm muốn sửa hoặc đưa câu chữ muốn dùng để AI viết lại, hoặc tự sửa chữ trực tiếp ([KS] 確認28) | Nhờ AI viết lại không giới hạn số lần (DEC-0001 ngày20/11/2026, áp dụng H65). Mỗi lần tạo bản nháp tốn khoảng 0,2–3 yên | — | 6-6 (4-2), [KS] 確認28, 29 |
| BR-C07 (mới) | Chưa có hồ sơ thì chưa có bản nháp | Tài năng mới | Huấn luyện viên AI không đưa bản nháp cho tới khi quản lý nhập thông tin tài năng | — | — | UC-01 前提 |

## D. Duyệt bài và từ cấm

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-D01 | Việc có dùng duyệt bài được cài cho từng tài năng | Quản lý cài khi duyệt đơn đăng ký, đổi được sau | Tài năng không được cài thì không có lựa chọn gửi duyệt | — | — | 5-3, 5-6, 6-4 (2-2), 6-9 (7-7), UC-07 前提 |
| BR-D02 | Chỉ bài cho công việc cần khách hàng cho phép mới cần duyệt | Tài năng được cài dùng duyệt bài | Tài năng tự chọn gửi duyệt khi 採用 ⚠. AI không tự xác định bài nào là bài công việc, để tránh bỏ sót | — | Tài khoản công ty không duyệt ⚠ | 5-3, UC-07 前提, 確認33, 52 |
| BR-D03 | Chưa duyệt kịp thì hủy lịch | Đến giờ đăng mà bài vẫn chờ duyệt | Không đăng. Hệ thống hủy lịch ⚠, báo cả tài năng và quản lý | Giờ đăng | Muốn đăng thì tài năng 採用 lại ⚠ | 5-3, 6-9 (7-7), 確認36 |
| BR-D04 | Trả lại bài phải kèm lý do, tài năng được gửi lại | Quản lý trả lại bài | Bắt buộc nhập lý do. Tài năng thấy lý do, nhờ AI sửa rồi gửi duyệt lại ⚠ | — | — | 6-9 (7-7), 確認35 |
| BR-D05 | Bài có từ cấm không được đăng | Khi 採用. AI kiểm tra chú thích và hashtag, xét cả ngữ cảnh | Không hẹn giờ, báo lý do cho tài năng, báo quản lý. Quản lý sửa trên màn hình quản trị | AI có thể bỏ sót | — | 5-3, 6-6 (4-4), UC-05 前提, 11 |
| BR-D06 | Danh sách từ cấm dùng chung cho mọi tài năng | Luôn áp dụng | Một danh sách duy nhất. FutureCore soạn bản mẫu, アデッソ xem lại, quản lý đăng ký trên màn hình quản trị | Bản mẫu gồm cách nói vi phạm quy định của mạng xã hội và cách nói dễ gây hiểu lầm. Cách nói công ty không dùng thì アデッソ gửi thêm ⚠ | Muốn có từ cấm riêng cho từng tài năng thì アデッソ tự sửa | UC-02 前提, 6-6 (4-4), 11, 確認4 |
| BR-D07 (mới) | Quản lý bấm trước thì quyết | Bài chờ duyệt; yêu cầu gửi tới quản lý của nhóm hoặc quản lý phụ trách ([KS] 確認34) | Kết quả của quản lý bấm "duyệt" hoặc "không duyệt" đầu tiên là kết quả cuối ⚠ | — | — | 確認34 |

## E. Đăng bài

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-E01 | Cùng một nội dung cho các mạng đã kết nối | Mọi bài đã hẹn | Đăng cùng ảnh hoặc video và cùng chú thích lên Instagram, TikTok, YouTube | — | Không có video thì không đăng YouTube. Mạng chưa kết nối thì bỏ qua, và tài năng không bắt buộc kết nối đủ 3 mạng ⚠ | 5-3, 6-10 (8-3), UC-05 前提, UC-08 前提, 確認11 |
| BR-E02 | Kết quả đăng ghi riêng cho từng mạng xã hội | Mỗi lần đăng | Ghi thành công hoặc lỗi theo từng mạng | — | — | 5-1, 6-10 (8-3) |
| BR-E03 | Giờ đăng do AI chọn cho từng tài năng | Khi hẹn giờ | Chưa đủ số liệu thì theo chỉ dẫn thuật toán của アデッソ. Đủ số liệu thì chọn theo khung giờ được tương tác tốt | Chỉ trong phạm vi số liệu Upload-Post cung cấp. Tài năng không đổi được giờ đăng trên ứng dụng ⚠ | Upload-Post không cho số liệu theo giờ thì giữ giờ theo chỉ dẫn | 5-2, 6-11 (8-1), UC-08, 確認30 |
| BR-E04 | Biện pháp chống bị khóa tài khoản | Mỗi tài khoản mạng xã hội | Giới hạn gì sẽ quyết sau khi xem quy định và ví dụ thực tế của từng mạng, ví dụ đăng dồn dập nhiều video AI trong thời gian ngắn dễ bị chặn | V2 bỏ mức 1 bài ảnh và 1 bài video mỗi ngày. Đề xuất không giới hạn số bài vì lý do chi phí ⚠ | Không đảm bảo không bị khóa | 6-10 (8-4), UC-08 前提, 11, 確認37 |
| BR-E05 | Đăng lỗi thì không tự đăng lại | Đăng lỗi trên ít nhất một mạng xã hội | Báo tài năng trong ứng dụng (kèm tên mạng và lý do), hiện cảnh báo trên màn hình quản trị ⚠. Tài năng hoặc quản lý hẹn giờ lại | — | — | 6-10 (8-5), 確認38 |
| BR-E06 | Dừng toàn bộ việc đăng tự động | Quản lý bật dừng (có bước xác nhận) | Không đặt lịch mới lên Upload-Post và hủy luôn các bài đã đặt lịch | Áp dụng cho toàn bộ hệ thống | Chạy lại cũng không đăng các bài đã hủy | 5-6, 6-10 (7-5), UC-08 前提 |
| BR-E07 | Hủy bài đã hẹn | Quản lý muốn hủy | Quản lý hủy trên màn hình quản trị, hệ thống hủy bên Upload-Post | Tài năng không hủy được trên ứng dụng | Khi tài năng chuyển sang 退会 (rời đi) thì hệ thống tự hủy | 6-10 (7-2), UC-08 前提, UC-13 |
| BR-E08 | Điều kiện về tài khoản mạng xã hội | Khi kết nối | Tài năng tự kết nối ⚠. Instagram phải là tài khoản doanh nghiệp hoặc nhà sáng tạo, tài năng tự chuyển trên ứng dụng Instagram. Tài khoản phải đủ tuổi theo quy định của từng mạng xã hội | Mỗi mạng xã hội một tài khoản ⚠ | — | UC-03 前提, 6-10 (8-2), 11, 確認9, 10 |
| BR-E09 (mới) | Dừng đăng tự động cho từng tài năng | Quản lý bật dừng cho một tài năng | Không đặt lịch mới cho tài năng đó và hủy các bài đã đặt lịch | Chỉ tài năng được chọn | — | 3-2, 5-6, 6-10 (7-5) |
| BR-E10 (mới) | Phí Upload-Post tính theo số tài năng | Mỗi tháng | Trả theo tháng. Không tính thêm theo số bài | Mức phí tăng theo số tài năng đã đăng ký. Bảng giá sẽ gửi riêng | — | UC-08 前提 |

## F. Thu phí

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-F01 | Hóa đơn tháng = phí thuê bao + phí tạo video | Mọi tài năng, mỗi tháng | Hệ thống tính tổng rồi gửi cho cổng thanh toán thu | Ngày chốt sổ và ngày thu tiền quyết sau khi chọn cổng thanh toán. Cổng có thu được số tiền đổi theo tháng không ⚠ | Quản lý và tài khoản công ty không bị thu phí tháng | 5-4, UC-11, 6-3 (1-1, 5-4), 確認49 |
| BR-F02 | Phí video tính từ lần đầu tiên | Mỗi lần tài năng xác nhận giá và gửi yêu cầu tạo | Tính một lần, tạo lại cũng tính | Không có lượt miễn phí. Không có mức trần hằng tháng | Dịch vụ tạo video lỗi thì không tính | 5-4, 6-3 (5-4), UC-06 前提, 別紙B số 12, 14 |
| BR-F03 | Tháng đầu thu trọn tháng | Bắt đầu dùng giữa tháng | Thu đủ phí tháng đầu; chu kỳ một tháng tính từ ngày đăng ký ([KS] 確認48, chờ đơn vị thanh toán) | — | — | 5-4, 確認48 |
| BR-F04 | Không có loại miễn phí | Mọi người đăng ký qua ứng dụng | Đều là tài năng có trả phí. Không chuyển sang miễn phí | Chức năng 1-3 (đổi loại) không dùng nữa | Tài khoản công ty (xem BR-A11) | 5-4, 6-3 (1-2, 1-3), UC-11 前提 |
| BR-F05 | Tài năng phải đăng ký thanh toán mới dùng được huấn luyện viên AI | Lần đầu dùng | Đăng ký qua màn hình của cổng thanh toán. Đăng ký xong thì hệ thống tạo thư mục OneDrive | 2 cách: cước nhà mạng và thẻ. Kết nối với một cổng thanh toán duy nhất. Hệ thống không lưu thông tin thẻ | Tài khoản công ty không phải đăng ký | UC-03 前提, UC-01 前提, 6-1 (6-2), 6-4 (2-2) |
| BR-F06 | Thanh toán lỗi thì không tự dừng sử dụng | Cổng thanh toán thu lỗi | Báo tài năng và quản lý. Quản lý quyết có dừng sử dụng không ⚠ | — | — | 6-3 (1-1), UC-11, 確認48 |
| BR-F07 | Hiển thị giá trước khi tạo video | Màn hình tạo video | Hiện độ dài dự kiến và đơn giá tham khảo, kèm ghi chú số tiền thực thu có thể khác | Đơn giá do アデッソ quyết | — | 5-7, UC-06 前提, 別紙B số 15 |
| BR-F08 (mới) | Phí video của tài khoản công ty quyết toán nội bộ | Tài khoản công ty tạo video | Không thu qua cổng thanh toán. Hệ thống đếm số lần và hiện trên màn hình quản trị | — | — | UC-12 前提, 6-3 (5-4) |
| BR-F09 (mới) | Rời đi giữa tháng vẫn thu trọn tháng | Tài năng chuyển sang 退会 giữa tháng | Thu đủ phí tháng đó, từ tháng sau dừng thu ⚠ | — | — | UC-13, 確認50 |
| BR-F10 (mới) | Tài năng xem chi phí và lịch sử hóa đơn | Mọi lúc | Trong ứng dụng: số lần tạo video và tổng tiền trong tháng. Lịch sử hóa đơn: chuyển qua trang của cổng thanh toán | — | — | 6-3 (1-1, 5-4), UC-11 前提, 確認51 |

## G. Video

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-G01 | Hai loại video AI | Khi tạo video | Tài năng chọn video ngắn (người trong ảnh chuyển động, khung dọc) hoặc video trình chiếu nhiều ảnh ⚠ | Chỉ 2 loại | — | 5-7, 確認31  Video trình chiếu ghép ảnh ở máy chủ (CR-04). |
| BR-G02 | Video AI được tạo từ ảnh tài năng chụp | Khi tạo video | Dùng ảnh của tài năng | — | Quản lý chỉ tạo thay cho tài khoản công ty ([KS] 確認27) | 5-7, UC-06, [KS] 確認27 |
| BR-G03 | Video dọc dùng chung cho 3 mạng xã hội | Mọi video | Tạo video dọc. YouTube cũng dùng dạng video ngắn | Độ dài tùy nội dung | — | 5-7, UC-06 |
| BR-G04 | Video do AI tạo phải ghi rõ | Khi đăng video AI | Gắn nhãn theo quy định của từng mạng xã hội | — | — | 5-7, 6-8 (5-5), UC-06 前提 |
| BR-G05 | Video tự làm được dùng theo thứ tự, không tính phí | Tài năng lưu video tự làm | Mỗi ngày một video theo thứ tự lưu, AI thêm chú thích và hashtag thành bản nháp ⚠ | 1 video mỗi ngày | — | UC-06, 6-7 (6-4), 確認32  CR-23, chưa làm. |
| BR-G06 (mới) | Không cần mở ứng dụng khi đang tạo video | Trong lúc AI tạo video | Tài năng được đóng ứng dụng. Xong thì hệ thống báo | — | — | UC-06 前提, 6-8 (5-1) |

## H. Huấn luyện viên AI

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-H01 | Chỉ dùng dữ liệu của chính tài năng | Mọi câu trả lời và bản nháp | Dùng hồ sơ, mục tiêu, kinh nghiệm đăng bài, hội thoại và số liệu. Chỉ dùng thư mục của tài năng đó | — | Thư mục chung vẫn được đọc (xem mâu thuẫn M3) | 5-5, 6-1 (1-5), 6-4 (2-1) |
| BR-H02 | Giới hạn chủ đề trò chuyện | Mỗi tin nhắn của tài năng | Trả lời chuyện đăng bài, mạng xã hội, hoạt động nghệ thuật, lời chào và chuyện ngắn. Nhờ viết văn hay làm video không liên quan thì từ chối và đưa về chuyện đăng bài. Chuyện riêng tư không liên quan thì hạn chế ⚠ | Mỗi tin tối đa 1.000 ký tự | — | 5-5, 6-5 (3-3, 3-4), 確認23 |
| BR-H03 | Chuyện nghiêm trọng phải báo quản lý | Tài năng nói về sức khỏe hoặc muốn rời công ty | Vẫn tiếp tục trò chuyện và báo quản lý ⚠. Quản lý liên hệ trực tiếp ngoài hệ thống | — | — | 5-5, 6-5 (3-3), 確認17, 43 |
| BR-H04 | Nhắc lại kết quả để giữ động lực | Khi đăng bài, khi người theo dõi tăng, mỗi sáng, mỗi tuần | Báo số ngày đăng liên tục và còn bao nhiêu tới mục tiêu. Giao nhiệm vụ mỗi ngày và chúc mừng khi hoàn thành. Báo tiến độ và chúc mừng khi hoàn thành チャレンジ (thử thách) ⚠. Đạt mục tiêu số người theo dõi thì báo cả tài năng và quản lý ⚠ | Không còn báo theo từng mốc, chỉ báo khi đạt mục tiêu | — | 5-5, UC-04, 6-5 (3-7), 確認14, 20, 39  Báo tăng người theo dõi ở mốc 25%, 50%, 75% mục tiêu (Q&A No.14). |
| BR-H05 | Giọng điệu và chi phí AI | Khi cài đặt, khi tổng hợp chi phí | Giọng điệu ghi trong chỉ dẫn cho AI, quản lý đổi bằng file. Chi phí AI tách riêng khỏi phí ChatGPT | — | — | 5-5, 7-5, UC-04 前提 |
| BR-H06 (mới) | Không giới hạn số lần trò chuyện | Mỗi tài năng | Tài năng nhắn bao nhiêu cũng được ⚠ (khách ghi muốn đặt giới hạn, chưa chốt; 確認23) | — | — | 確認23 |
| BR-H07 (mới) | Thứ tự ưu tiên của chỉ dẫn cho AI | Khi có chỉ dẫn cho tài năng, cho nhóm và cho toàn bộ trùng nội dung | Ưu tiên chỉ dẫn cho tài năng, rồi cho nhóm, rồi cho toàn bộ. Luôn kiểm tra từ cấm ⚠ | Chỉ dẫn theo nhóm cần kiểm chứng kỹ thuật | — | 確認6, 47 |
| BR-H08 (mới) | Cách đếm số ngày đăng liên tục | Mỗi ngày | Ngày có ít nhất 1 bài thì tính. Một ngày không đăng thì đếm lại từ 1 ⚠ (quyết khi vận hành, [KS] 確認22) | — | — | 確認22 |

## I. Dữ liệu và bảo mật

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-I01 | Nơi lưu và người được xem | Mọi dữ liệu | Hồ sơ, mục tiêu, kinh nghiệm đăng bài, số liệu: OneDrive, quản lý và AI xem. Ảnh và video: OneDrive, tài năng và quản lý xem. Hội thoại: trong hệ thống, tài năng và quản lý xem. Thanh toán: cổng thanh toán giữ | Hệ thống không lưu thông tin thẻ | — | 7-2, 10-2, UC-03 前提 |
| BR-I02 | Bảo vệ dữ liệu | Luôn áp dụng | Mã hóa đường truyền và dữ liệu lưu. Khóa kết nối dịch vụ ngoài không hiện ra. Chỉ gửi cho AI phần thông tin cần thiết và cài đặt không cho AI dùng dữ liệu để huấn luyện | — | — | 10-2, 8 |
| BR-I03 | Đồng ý về dữ liệu cá nhân và quyền hình ảnh | Trước khi gửi dữ liệu tài năng cho dịch vụ ngoài | Tài năng thuộc công ty đã ủy thác việc xử lý dữ liệu cá nhân và 肖像権 (quyền hình ảnh) khi ký hợp đồng. Người vị thành niên thì アデッソ lấy đồng ý của phụ huynh khi ký hợp đồng | Hệ thống không lưu bằng chứng đồng ý | ⚠ Người ngoài công ty tự đăng ký thì không có hợp đồng. Tài liệu chưa nói xử lý thế nào | 2-3, 5-5, 10-3, UC-03 前提 |
| BR-I04 | Giữ dữ liệu, ghi nhật ký, dùng dữ liệu khi kiểm thử | Tài năng rời đi. Thao tác và xử lý của hệ thống. Giai đoạn phát triển | Dữ liệu tài năng rời đi giữ **6 tháng** rồi tự xóa, không khôi phục ([KS] 確認55). Ghi nhật ký xem, thao tác và xử lý. Khi phát triển, cơ bản dùng dữ liệu giả | Thời gian lưu nhật ký chưa có | Muốn dùng dữ liệu thật của tài năng thì phải được アデッソ đồng ý bằng văn bản trước | 7-3, 9-4, 10-3, [KS] 確認55 |

## J. Quy tắc dự án

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-J01 | Thứ tự ưu tiên giữa các tài liệu | Khi các tài liệu mâu thuẫn | Hợp đồng, rồi đến SOW (bản mô tả phạm vi công việc), rồi đến báo giá. Với yêu cầu của khách thì tài liệu ghi ngày mới hơn được ưu tiên | — | — | 関連資料 (tài liệu liên quan) |
| BR-J02 | Thời hạn khách xác nhận | Sau khi FutureCore gửi tài liệu hoặc câu hỏi | Không phản hồi trong hạn thì coi như đã xác nhận | Tài liệu: 5 ngày làm việc. Câu hỏi trong bảng xác nhận: cơ bản 3 ngày làm việc | Xin gia hạn trong thời hạn | 1-5, 14-2 |
| BR-J03 | Thay đổi sau khi chốt và điều kiện nghiệm thu | Sau khi chốt tài liệu và bản định nghĩa màn hình. Khi nghiệm thu | Thay đổi trong phạm vi SOW và báo giá thì không báo giá lại. Ngoài phạm vi thì bàn lại phạm vi, chi phí, lịch. Lỗi nghiêm trọng phải sửa trước khi phát hành. Lỗi nhẹ không phải lý do trượt nghiệm thu | Nghiệm thu khoảng tuần 2–3 tháng 2/2027 | Dịch vụ ngoài chưa xong hợp đồng trước đợt kiểm thử nghiệm thu thì chức năng đó bỏ khỏi nghiệm thu | 12-1, 12-2, 14-1, 14-3 |

## Quy tắc mâu thuẫn

Có 10 chỗ hai phần của [YK2] nói khác nhau. Mỗi chỗ cần khách chọn một cách hiểu trước khi thiết kế. Ba mâu thuẫn của bản v1 đã được v2 giải quyết: chuyển loại trả phí / miễn phí (đã bỏ loại miễn phí), giới hạn số bài mỗi ngày (đã bỏ con số), và màn hình quản trị trên điện thoại (nay thiết kế dễ xem trên điện thoại, 9-1).

| Mã | Nội dung mâu thuẫn | Bên A | Bên B | Quy tắc liên quan |
| --- | --- | --- | --- | --- |
| M1 | Tên trạng thái khi tài năng ngừng sử dụng | Mục 6-2 (chức năng 7-3): 3 trạng thái, gồm 利用終了 (đã kết thúc) | UC-13 và 確認53: chuyển sang 退会 (rời đi) | BR-A08 |
| M2 | Ngày tổng kết tuần có do quản lý đổi không | Mục 5-2: mọi giá trị trong mục này đều do quản lý đổi, kể cả ngày tổng kết tuần | Mục 5-6 (danh sách giá trị đổi được mà không cần lập trình) không có ngày tổng kết tuần | BR-B04, BR-B05 |
| M3 | Phạm vi dữ liệu AI được dùng | Mục 5-5: chỉ dùng thư mục của tài năng đó | Mục 6-4 (chức năng 2-1), 7-1, UC-02 前提: đọc cả thư mục chung (kinh nghiệm đăng bài, chỉ dẫn thuật toán) | BR-H01 |
| M4 | Ai quyết giờ đăng | Mục 5-2: khi đã đủ số liệu thì AI chọn giờ từ số liệu | Mục 7-5: kinh nghiệm đăng bài trong file có thể ghi giờ đăng. Mục 5-3: chỉ dẫn của công ty được ưu tiên hơn AI. 確認8: mẫu câu chỉ dẫn có cả "giờ đăng" | BR-C02, BR-E03 |
| M5 | Phí tạo video thực thu | Mục 5-4, 6-3 (chức năng 5-4): phí = số lần tạo × đơn giá mỗi lần | Mục 5-7, UC-06 前提: giá hiển thị chỉ là tham khảo, số tiền thực thu có thể khác. Nếu đơn giá cố định thì không rõ vì sao số tiền lại khác | BR-F02, BR-F07 |
| M6 | Danh sách thông báo cho quản lý | Mục 6-12 (chức năng 7-4): 8 loại, có "có người đăng ký" và "thanh toán lỗi" | UC-10: 6 loại, không có hai loại đó. 別紙A (phụ lục A): mất kết nối mạng xã hội cũng hiện trên màn hình quản trị | BR-E05, BR-F06 |
| M7 (mới) | Lúc đăng ký tài năng với Upload-Post | Mục 6-10 (chức năng 8-2): "khi đăng ký tài năng" | UC-01: không còn bước quản lý đăng ký. Tài năng tự gửi đơn, quản lý duyệt, thư mục tạo khi thanh toán xong | BR-A01, BR-E10 |
| M8 (mới) | Tài khoản công ty có duyệt bài không | Mục 7-4 (dữ liệu ban đầu): có "chỉ dẫn và duyệt cho tài khoản công ty" | 確認52: không duyệt vì quản lý tự 採用 | BR-A09, BR-D02 |
| M9 (mới) | Tài khoản công ty thao tác ở đâu | Mục 6-10 (chức năng 9-1): quản lý chỉ dẫn, gửi tư liệu, 採用 trên màn hình quản trị | UC-12 前提: quản lý đăng nhập ứng dụng tài năng bằng mã của tài khoản công ty | BR-A09 |
| M10 (mới) | Ai đặt lịch lại sau khi đăng lỗi | Mục 6-10 (chức năng 8-5): tài năng hoặc quản lý đặt lịch lại | 確認30: tài năng không đổi được giờ đăng trên ứng dụng | BR-E03, BR-E05 |

## Quy tắc còn thiếu

Có 20 tình huống nghiệp vụ chắc chắn sẽ xảy ra nhưng tài liệu chưa có quy tắc. Các tình huống số 1, 3, 4, 8, 17 và 19 ảnh hưởng trực tiếp đến thiết kế dữ liệu và luồng xử lý, nên cần chốt sớm nhất. Số 18 có rủi ro pháp lý.

| STT | Tình huống chưa có quy tắc | Căn cứ |
| --- | --- | --- |
| 1 | **Các trạng thái và cách chuyển trạng thái:** bài đăng có 6 trạng thái nhưng không liệt kê. Trạng thái của tài năng, đơn đăng ký, video, kết nối mạng xã hội và hóa đơn "sẽ viết ở bản cuối" | [YK2] 5-1 |
| 2 | **Thời gian lưu và xóa dữ liệu:** dữ liệu tài năng rời đi đã chốt 6 tháng rồi tự xóa ([KS] 確認55). Còn chưa rõ: hội thoại có thuộc "dữ liệu" phải xóa không, nhật ký và đơn bị từ chối lưu bao lâu | [YK2] 7-3, 9-4 |
| 3 | **Thu phí khi trạng thái thay đổi:** phí tháng đầu tính từ lúc đăng ký thanh toán hay từ lúc có bản nháp đầu tiên. Chu kỳ đã chốt hướng: một tháng tính từ ngày đăng ký ([KS] 確認48). 利用終了 không quay lại được ([KS] 確認56) | [YK2] 5-4, 6-2 (7-3), UC-01 前提 |
| 4 | **Khi thanh toán lỗi:** có thu lại không, sau bao lâu, được nợ bao lâu? "Dừng sử dụng" cụ thể là gì? | [YK2] 6-3 (1-1), 確認48 |
| 5 | **Phí video khi quản lý tạo thay:** đã rõ, quản lý chỉ làm thay cho tài khoản công ty, phí do アデッソ quyết toán nội bộ ([KS] 確認27) | [YK2] 5-4 |
| 6 | **Bài bị trả lại:** giờ đăng có giữ nguyên khi gửi lại không? Được gửi lại bao nhiêu lần? Có kiểm tra từ cấm lại không? | [YK2] 6-9 (7-7), 確認35 |
| 7 | **Bài dính từ cấm:** quản lý sửa xong thì ai hẹn giờ? Tài năng có phải xác nhận lại không? Không sửa kịp giờ đăng thì sao? | [YK2] 5-3, 6-6 (4-4), UC-05 前提 |
| 8 | **Hẹn giờ lại sau khi đăng lỗi:** ai làm, khi tài năng không đổi được giờ. Chỉ một mạng lỗi thì đăng lại riêng mạng đó được không | [YK2] 6-10 (8-5), 確認30 |
| 9 | **Biện pháp chống khóa tài khoản:** giới hạn gì, áp dụng ở bước nào, bài vượt giới hạn thì hoãn hay bỏ | [YK2] 6-10 (8-4), UC-08 前提, 確認37 |
| 10 | **Giờ đăng:** thế nào là "đủ số liệu" để AI tự chọn giờ? Nhiều bài 採用 trong một ngày thì mỗi bài đăng giờ nào? Quản lý có được đổi giờ không? | [YK2] 5-2, 5-3, 6-11 (8-1), 確認30 |
| 11 | **チャレンジ (thử thách):** AI đề xuất theo tình hình, quản lý cũng đề xuất qua chỉ thị cho AI, tài năng nhận hoặc từ chối, không cần duyệt ([KS] 確認5). Còn chờ khái niệm アデッソ viết: gồm những loại nào, tính hoàn thành ra sao | [YK2] UC-02 前提, [KS] 確認5 |
| 12 | **Nhận biết chuyện nghiêm trọng:** tiêu chí là gì? Xử lý khẩn cấp khi có dấu hiệu tự hại hoặc nguy hiểm, nhất là với người vị thành niên? Thông báo chỉ hiện trên màn hình quản trị nên quản lý có thể không thấy kịp | [YK2] 5-5, 6-5 (3-3), 確認17, 45 |
| 13 | **Mức trần chi phí AI:** Viết lại không giới hạn số lần ([KS] 確認29); trò chuyện chưa giới hạn (khách muốn đặt giới hạn, chưa chốt, 確認23). Có mức trần chi phí cho mỗi tài năng, cảnh báo khi dùng bất thường không? | [YK2] 6-5 (3-4, 3-5), 確認23, 29 |
| 14 | **Nhiều người cùng thao tác một việc:** nhiều quản lý cùng đánh dấu đã xử lý một thông báo, cùng duyệt một đơn đăng ký. AI và quản lý cùng ghi một file trên OneDrive | [YK2] 3-3, 6-12 (7-4), 6-5 (3-2), 確認46 |
| 15 | **Giới hạn cụ thể của nội dung bài:** độ dài chú thích và số hashtag tối đa chung cho 3 mạng xã hội, tiêu đề YouTube, số ảnh tối đa mỗi bài, định dạng và dung lượng tư liệu | [YK2] 5-3, 6-6 (4-1), 6-7 (6-3), 9-2 |
| 16 | **Quyền đối với nội dung:** cách kiểm tra bài đăng và tư liệu có vi phạm quyền của bên thứ ba không, như nhạc, ảnh người khác, logo nhãn hàng. Ai gắn nhãn AI cho video tài năng tự làm bằng công cụ AI khác? | [YK2] 11, 5-7 |
| 17 (mới) | **Xử lý đơn đăng ký:** đơn chờ duyệt quá lâu thì sao, đơn bị từ chối giữ bao lâu, người bị từ chối đăng ký lại bằng email đó được không, chặn đăng ký rác ra sao (đường dẫn ứng dụng có thể lộ ra ngoài). Thanh toán bỏ dở thì tài khoản xử lý thế nào | [YK2] UC-01, 6-4 (2-2) |
| 18 (mới) | **Đồng ý của người ngoài công ty và người vị thành niên tự đăng ký:** đồng ý về dữ liệu cá nhân, quyền hình ảnh và đồng ý của phụ huynh được lấy khi nào, ai lấy. Điều khoản sử dụng có đủ thay cho hợp đồng không | [YK2] 2-3, 10-3, UC-03 前提, 確認1, 2 |
| 19 (mới) | **Đăng ký và xóa tài năng trên Upload-Post:** lúc nào đăng ký, lúc nào xóa (khi 退会, khi bỏ thanh toán). Upload-Post tính phí theo số tài năng đã đăng ký | [YK2] 6-10 (8-2), UC-08 前提 |
| 20 (mới) | **Nguồn chỉ dẫn cho AI:** màn chỉ dẫn là CR-18, **làm** ([KS] 確認6–8); chỉ dẫn còn đi qua ChatGPT (MCP) và file OneDrive (御見積書 前提条件 A4, Q&A No.45). khi có cả màn hình chỉ dẫn cho AI, ChatGPT project và file OneDrive thì nguồn nào được ưu tiên. Nhóm tài năng do ai tạo, một tài năng thuộc nhiều nhóm thì chỉ dẫn nhóm nào thắng | [YK2] UC-02 前提, 確認6, 7, 8, 47 |

</details>
