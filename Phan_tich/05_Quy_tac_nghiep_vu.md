# Quy tắc nghiệp vụ

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
| BR-A10 (mới) | Vị thành niên được tính từ ngày sinh | Khi có đơn đăng ký | Hệ thống tính từ ngày sinh và hiện trên màn hình quản trị để tham khảo ⚠. Huấn luyện viên AI dùng ngày sinh để biết tuổi | Chỉ để tham khảo | — | 3-1, UC-01 前提, 確認2 |
| BR-A11 (mới) | Loại tài khoản không đổi được | Mọi tài khoản | Có hai loại: tài năng (đăng ký qua ứng dụng, có trả phí) và tài khoản công ty (quản lý tạo, không thu phí). Tài năng không tự chọn hay đổi loại | Không chuyển qua lại giữa hai loại | Tài khoản công ty muốn trả phí thì đăng ký mới như tài năng | 5-4, 6-3 (1-2, 1-3) |

## B. Thời gian và cài đặt

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-B01 | Giờ nhắn tin buổi sáng | Mỗi ngày, kể cả cuối tuần và ngày lễ ⚠, mọi tài năng đang dùng | Mọi tài năng nhận trong cùng một khung giờ. Xử lý buổi sáng phải xong trước giờ này | Mặc định 8:00 ⚠. Gửi cùng một lúc cho mọi người hay không sẽ quyết sau khi thử tải | — | 5-2, 9-2, 確認18, 21 |
| BR-B02 | Nhắc gửi tư liệu | Chưa có ảnh hoặc video trước giờ đăng | Gửi lời nhắc | Mặc định trước giờ đăng 2 tiếng. Tối đa 1 lần mỗi ngày | — | 5-2, 6-7 (6-5) |
| BR-B03 | Ngưỡng số ngày không đăng bài | Số ngày liên tục không đăng bài | Đủ ngưỡng thứ nhất thì AI hỏi han tài năng. Đủ ngưỡng thứ hai thì báo quản lý | Mặc định 3 ngày và 7 ngày ⚠ | Bài tài năng tự đăng ngoài hệ thống vẫn tính là có đăng, nếu Upload-Post đọc được | 5-2, 6-5 (3-9), UC-09, 確認19 |
| BR-B04 | Ngày tổng kết tuần | Mỗi tuần | Gửi bản tổng kết tuần và còn bao nhiêu tới mục tiêu | Mặc định thứ Hai | — | 5-2, 6-5 (3-8), 確認14 |
| BR-B05 | Các giá trị quản lý được tự đổi, không cần lập trình | Quản lý đổi trên màn hình quản trị hoặc sửa file trên OneDrive | Theo từng tài năng: có dùng duyệt bài không, dừng hoặc chạy lại đăng tự động, mục tiêu và hạn. Chung cho tất cả: từ cấm, giờ nhắn tin, giờ nhắc, ngưỡng số ngày, dừng toàn bộ đăng tự động. Qua file: giọng điệu, hồ sơ, ngày riêng, kế hoạch nội dung, kinh nghiệm đăng bài, チャレンジ (thử thách) ⚠ | Sửa file thì có tác dụng từ sáng hôm sau | Chỉ quản lý đổi được hồ sơ và mục tiêu. Tài năng không đổi được | 5-6, 7-5, UC-02 前提, UC-04 前提, 確認5 |

## C. Chủ đề và bản nháp

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-C01 | Mỗi sáng có 3 chủ đề gợi ý | Mỗi ngày, mỗi tài năng | Tạo từ: định hướng, sở thích, sở trường, bài cũ được tương tác tốt, thông tin quản lý ghi trong file, tin tức trong ngày ⚠ | Đúng 3 chủ đề ⚠ | Tài năng có thể không chọn mà tự nói chủ đề muốn đăng | 5-3, 確認15, 16 |
| BR-C02 | Chỉ dẫn của công ty được ưu tiên hơn gợi ý của AI | Khi アデッソ có chỉ dẫn, ví dụ chủ đề theo thứ trong tuần | Theo chỉ dẫn của công ty | — | — | 5-3, 6-5 (3-1) |
| BR-C03 | Nội dung của bản nháp | Khi tài năng đã chọn chủ đề | Chú thích, hashtag, hướng dẫn chụp (ví dụ: một ảnh nghiêng mặt lúc tập). Thêm kịch bản nếu là video | Độ dài và số hashtag phải nằm trong giới hạn của cả 3 mạng xã hội | — | 5-3, 6-6 (4-1), 確認24 |
| BR-C04 | Số bản nháp mỗi ngày | Mỗi tài năng | Tài năng yêu cầu bao nhiêu thì AI tạo bấy nhiêu | Không có con số cố định. V1 là 1 bài mỗi ngày | — | 5-3, UC-05 前提 |
| BR-C05 | Chỉ đăng bài đã 採用 (chấp nhận) và có ảnh hoặc video | Mọi bài | Không 採用 thì không đăng ⚠. Không có ảnh hay video thì không 採用 được, vì cả 3 mạng xã hội đều không đăng chữ suông ⚠ | — | Video tự làm đã lưu thì AI tự làm bản nháp, mỗi ngày một cái theo thứ tự lưu ⚠, nhưng tài năng vẫn phải 採用 | 6-6 (4-3), UC-05, UC-06, 確認25, 26, 32 |
| BR-C06 | Bản nháp sửa qua AI | Trước khi 採用 | Tài năng nói điểm muốn sửa hoặc đưa câu chữ muốn dùng để AI viết lại. Không tự sửa trực tiếp ⚠ | Không giới hạn số lần viết lại ⚠. Mỗi lần tạo bản nháp tốn khoảng 0,2–3 yên | — | 6-6 (4-2), 確認28, 29 |
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
| BR-D07 (mới) | Quản lý bấm trước thì quyết | Bài chờ duyệt, nhiều quản lý cùng nhận yêu cầu | Kết quả của quản lý bấm "duyệt" hoặc "không duyệt" đầu tiên là kết quả cuối ⚠ | — | — | 確認34 |

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
| BR-F03 | Tháng đầu thu trọn tháng | Bắt đầu dùng giữa tháng | Thu đủ phí tháng đầu ⚠ | — | — | 5-4, 確認48 |
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
| BR-G01 | Hai loại video AI | Khi tạo video | Tài năng chọn video ngắn (người trong ảnh chuyển động, khung dọc) hoặc video trình chiếu nhiều ảnh ⚠ | Chỉ 2 loại | — | 5-7, 確認31 |
| BR-G02 | Video AI được tạo từ ảnh tài năng chụp | Khi tạo video | Dùng ảnh của tài năng | — | Quản lý có thể tạo thay, nhưng chưa rõ cho tài năng hay chỉ cho tài khoản công ty ⚠ | 5-7, UC-06, 確認27 |
| BR-G03 | Video dọc dùng chung cho 3 mạng xã hội | Mọi video | Tạo video dọc. YouTube cũng dùng dạng video ngắn | Độ dài tùy nội dung | — | 5-7, UC-06 |
| BR-G04 | Video do AI tạo phải ghi rõ | Khi đăng video AI | Gắn nhãn theo quy định của từng mạng xã hội | — | — | 5-7, 6-8 (5-5), UC-06 前提 |
| BR-G05 | Video tự làm được dùng theo thứ tự, không tính phí | Tài năng lưu video tự làm | Mỗi ngày một video theo thứ tự lưu, AI thêm chú thích và hashtag thành bản nháp ⚠ | 1 video mỗi ngày | — | UC-06, 6-7 (6-4), 確認32 |
| BR-G06 (mới) | Không cần mở ứng dụng khi đang tạo video | Trong lúc AI tạo video | Tài năng được đóng ứng dụng. Xong thì hệ thống báo | — | — | UC-06 前提, 6-8 (5-1) |

## H. Huấn luyện viên AI

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-H01 | Chỉ dùng dữ liệu của chính tài năng | Mọi câu trả lời và bản nháp | Dùng hồ sơ, mục tiêu, kinh nghiệm đăng bài, hội thoại và số liệu. Chỉ dùng thư mục của tài năng đó | — | Thư mục chung vẫn được đọc (xem mâu thuẫn M3) | 5-5, 6-1 (1-5), 6-4 (2-1) |
| BR-H02 | Giới hạn chủ đề trò chuyện | Mỗi tin nhắn của tài năng | Trả lời chuyện đăng bài, mạng xã hội, hoạt động nghệ thuật, lời chào và chuyện ngắn. Nhờ viết văn hay làm video không liên quan thì từ chối và đưa về chuyện đăng bài. Chuyện riêng tư không liên quan thì hạn chế ⚠ | Mỗi tin tối đa 1.000 ký tự | — | 5-5, 6-5 (3-3, 3-4), 確認23 |
| BR-H03 | Chuyện nghiêm trọng phải báo quản lý | Tài năng nói về sức khỏe hoặc muốn rời công ty | Vẫn tiếp tục trò chuyện và báo quản lý ⚠. Quản lý liên hệ trực tiếp ngoài hệ thống | — | — | 5-5, 6-5 (3-3), 確認17, 43 |
| BR-H04 | Nhắc lại kết quả để giữ động lực | Khi đăng bài, khi người theo dõi tăng, mỗi sáng, mỗi tuần | Báo số ngày đăng liên tục và còn bao nhiêu tới mục tiêu. Giao nhiệm vụ mỗi ngày và chúc mừng khi hoàn thành. Báo tiến độ và chúc mừng khi hoàn thành チャレンジ (thử thách) ⚠. Đạt mục tiêu số người theo dõi thì báo cả tài năng và quản lý ⚠ | Không còn báo theo từng mốc, chỉ báo khi đạt mục tiêu | — | 5-5, UC-04, 6-5 (3-7), 確認14, 20, 39 |
| BR-H05 | Giọng điệu và chi phí AI | Khi cài đặt, khi tổng hợp chi phí | Giọng điệu ghi trong chỉ dẫn cho AI, quản lý đổi bằng file. Chi phí AI tách riêng khỏi phí ChatGPT | — | — | 5-5, 7-5, UC-04 前提 |
| BR-H06 (mới) | Không giới hạn số lần trò chuyện | Mỗi tài năng | Tài năng nhắn bao nhiêu cũng được ⚠ | — | — | 確認23 |
| BR-H07 (mới) | Thứ tự ưu tiên của chỉ dẫn cho AI | Khi có chỉ dẫn cho tài năng, cho nhóm và cho toàn bộ trùng nội dung | Ưu tiên chỉ dẫn cho tài năng, rồi cho nhóm, rồi cho toàn bộ. Luôn kiểm tra từ cấm ⚠ | Chỉ dẫn theo nhóm cần kiểm chứng kỹ thuật | — | 確認6, 47 |
| BR-H08 (mới) | Cách đếm số ngày đăng liên tục | Mỗi ngày | Ngày có ít nhất 1 bài thì tính. Một ngày không đăng thì đếm lại từ 1 ⚠ | — | — | 確認22 |

## I. Dữ liệu và bảo mật

| Mã | Quy tắc | Điều kiện áp dụng | Cách xử lý | Giới hạn | Ngoại lệ | Nguồn [YK2] |
| --- | --- | --- | --- | --- | --- | --- |
| BR-I01 | Nơi lưu và người được xem | Mọi dữ liệu | Hồ sơ, mục tiêu, kinh nghiệm đăng bài, số liệu: OneDrive, quản lý và AI xem. Ảnh và video: OneDrive, tài năng và quản lý xem. Hội thoại: trong hệ thống, tài năng và quản lý xem. Thanh toán: cổng thanh toán giữ | Hệ thống không lưu thông tin thẻ | — | 7-2, 10-2, UC-03 前提 |
| BR-I02 | Bảo vệ dữ liệu | Luôn áp dụng | Mã hóa đường truyền và dữ liệu lưu. Khóa kết nối dịch vụ ngoài không hiện ra. Chỉ gửi cho AI phần thông tin cần thiết và cài đặt không cho AI dùng dữ liệu để huấn luyện | — | — | 10-2, 8 |
| BR-I03 | Đồng ý về dữ liệu cá nhân và quyền hình ảnh | Trước khi gửi dữ liệu tài năng cho dịch vụ ngoài | Tài năng thuộc công ty đã ủy thác việc xử lý dữ liệu cá nhân và 肖像権 (quyền hình ảnh) khi ký hợp đồng. Người vị thành niên thì アデッソ lấy đồng ý của phụ huynh khi ký hợp đồng | Hệ thống không lưu bằng chứng đồng ý | ⚠ Người ngoài công ty tự đăng ký thì không có hợp đồng. Tài liệu chưa nói xử lý thế nào | 2-3, 5-5, 10-3, UC-03 前提 |
| BR-I04 | Giữ dữ liệu, ghi nhật ký, dùng dữ liệu khi kiểm thử | Tài năng rời đi. Thao tác và xử lý của hệ thống. Giai đoạn phát triển | Dữ liệu tài năng rời đi được giữ 一定の期間 (một khoảng thời gian nhất định). Ghi nhật ký xem, thao tác và xử lý. Khi phát triển, cơ bản dùng dữ liệu giả | Thời gian lưu chưa có, đang hỏi khách ⚠ | Muốn dùng dữ liệu thật của tài năng thì phải được アデッソ đồng ý bằng văn bản trước | 7-3, 9-4, 10-3, 確認55 |

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
| 2 | **Thời gian lưu và xóa dữ liệu:** 一定の期間 là bao lâu? Ai xóa? Ảnh, video, hội thoại và nhật ký lưu trong bao lâu? | [YK2] 7-3, 9-4, 確認55 |
| 3 | **Thu phí khi trạng thái thay đổi:** phí tháng đầu tính từ lúc đăng ký thanh toán hay từ lúc có bản nháp đầu tiên. Quay lại từ 利用終了 (đã kết thúc) thì thu thế nào | [YK2] 5-4, 6-2 (7-3), UC-01 前提, 確認48, 56 |
| 4 | **Khi thanh toán lỗi:** có thu lại không, sau bao lâu, được nợ bao lâu? "Dừng sử dụng" cụ thể là gì? | [YK2] 6-3 (1-1), 確認48 |
| 5 | **Phí video khi quản lý tạo thay tài năng:** tính vào hóa đơn của tài năng hay quyết toán nội bộ | [YK2] 5-4, 確認27 |
| 6 | **Bài bị trả lại:** giờ đăng có giữ nguyên khi gửi lại không? Được gửi lại bao nhiêu lần? Có kiểm tra từ cấm lại không? | [YK2] 6-9 (7-7), 確認35 |
| 7 | **Bài dính từ cấm:** quản lý sửa xong thì ai hẹn giờ? Tài năng có phải xác nhận lại không? Không sửa kịp giờ đăng thì sao? | [YK2] 5-3, 6-6 (4-4), UC-05 前提 |
| 8 | **Hẹn giờ lại sau khi đăng lỗi:** ai làm, khi tài năng không đổi được giờ. Chỉ một mạng lỗi thì đăng lại riêng mạng đó được không | [YK2] 6-10 (8-5), 確認30 |
| 9 | **Biện pháp chống khóa tài khoản:** giới hạn gì, áp dụng ở bước nào, bài vượt giới hạn thì hoãn hay bỏ | [YK2] 6-10 (8-4), UC-08 前提, 確認37 |
| 10 | **Giờ đăng:** thế nào là "đủ số liệu" để AI tự chọn giờ? Nhiều bài 採用 trong một ngày thì mỗi bài đăng giờ nào? Quản lý có được đổi giờ không? | [YK2] 5-2, 5-3, 6-11 (8-1), 確認30 |
| 11 | **チャレンジ (thử thách):** ai đặt, đặt qua ChatGPT hay AI tự đề xuất, gồm những loại nào, tính hoàn thành ra sao | [YK2] UC-02 前提, 確認5, 14 |
| 12 | **Nhận biết chuyện nghiêm trọng:** tiêu chí là gì? Xử lý khẩn cấp khi có dấu hiệu tự hại hoặc nguy hiểm, nhất là với người vị thành niên? Thông báo chỉ hiện trên màn hình quản trị nên quản lý có thể không thấy kịp | [YK2] 5-5, 6-5 (3-3), 確認17, 45 |
| 13 | **Mức trần chi phí AI:** v2 đề xuất không giới hạn số lần trò chuyện và viết lại bản nháp. Có mức trần chi phí cho mỗi tài năng, cảnh báo khi dùng bất thường không? | [YK2] 6-5 (3-4, 3-5), 確認23, 29 |
| 14 | **Nhiều người cùng thao tác một việc:** nhiều quản lý cùng đánh dấu đã xử lý một thông báo, cùng duyệt một đơn đăng ký. AI và quản lý cùng ghi một file trên OneDrive | [YK2] 3-3, 6-12 (7-4), 6-5 (3-2), 確認46 |
| 15 | **Giới hạn cụ thể của nội dung bài:** độ dài chú thích và số hashtag tối đa chung cho 3 mạng xã hội, tiêu đề YouTube, số ảnh tối đa mỗi bài, định dạng và dung lượng tư liệu | [YK2] 5-3, 6-6 (4-1), 6-7 (6-3), 9-2 |
| 16 | **Quyền đối với nội dung:** cách kiểm tra bài đăng và tư liệu có vi phạm quyền của bên thứ ba không, như nhạc, ảnh người khác, logo nhãn hàng. Ai gắn nhãn AI cho video tài năng tự làm bằng công cụ AI khác? | [YK2] 11, 5-7 |
| 17 (mới) | **Xử lý đơn đăng ký:** đơn chờ duyệt quá lâu thì sao, đơn bị từ chối giữ bao lâu, người bị từ chối đăng ký lại bằng email đó được không, chặn đăng ký rác ra sao (đường dẫn ứng dụng có thể lộ ra ngoài). Thanh toán bỏ dở thì tài khoản xử lý thế nào | [YK2] UC-01, 6-4 (2-2) |
| 18 (mới) | **Đồng ý của người ngoài công ty và người vị thành niên tự đăng ký:** đồng ý về dữ liệu cá nhân, quyền hình ảnh và đồng ý của phụ huynh được lấy khi nào, ai lấy. Điều khoản sử dụng có đủ thay cho hợp đồng không | [YK2] 2-3, 10-3, UC-03 前提, 確認1, 2 |
| 19 (mới) | **Đăng ký và xóa tài năng trên Upload-Post:** lúc nào đăng ký, lúc nào xóa (khi 退会, khi bỏ thanh toán). Upload-Post tính phí theo số tài năng đã đăng ký | [YK2] 6-10 (8-2), UC-08 前提 |
| 20 (mới) | **Nguồn chỉ dẫn cho AI:** khi có cả màn hình chỉ dẫn cho AI, ChatGPT project và file OneDrive thì nguồn nào được ưu tiên. Nhóm tài năng do ai tạo, một tài năng thuộc nhiều nhóm thì chỉ dẫn nhóm nào thắng | [YK2] UC-02 前提, 確認6, 7, 8, 47 |
