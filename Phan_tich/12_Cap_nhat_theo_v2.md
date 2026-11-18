# Cập nhật theo bản yêu cầu v2

Bản v2 của 概要要件定義書 (bản định nghĩa yêu cầu tổng quát) thay đổi 3 điểm lớn:

- Tài năng **tự đăng ký trên ứng dụng** và quản lý duyệt, thay cho việc quản lý đăng ký hộ.
- **Bỏ hẳn loại tài năng miễn phí**: mọi tài năng đều trả phí. Tài khoản công ty (事務所アカウント) thành một loại riêng, không thu phí.
- **Toàn bộ số 確認 (mục cần xác nhận) được đánh lại**, từ 1–37 thành 1–56. Mỗi tình huống sử dụng UC nay có thêm phần 前提 (tiền đề).

Các tab phân tích còn lại viết theo v1. Những điểm dưới đây thay thế nội dung tương ứng trong các tab đó.

**Nguồn:**

- [YK2] = AI育成OS_概要要件定義書_v2.docx. Trang bìa vẫn ghi "0.1版 2026年11月13日", và mục 改訂履歴 (lịch sử sửa đổi) không ghi thay đổi.
- [YK1] = bản v1.
- Số 確認 trong tab này theo **đánh số của v2**.

## 1. Bảng thay đổi

Ký hiệu cột "Tab bị ảnh hưởng": 01 Bối cảnh, 02 Phạm vi, 03 Vai trò, 04 Chức năng, 05 Quy tắc, 06 Workflow, 07 Dữ liệu, 08 Tích hợp, 09 Phi chức năng, 10 Giao diện, 11 Edge case, 00 Báo cáo.

| STT | Chủ đề | v1 | v2 | Nguồn [YK2] | Tab bị ảnh hưởng |
| --- | --- | --- | --- | --- | --- |
| 1 | Cách bắt đầu dùng | Quản lý đăng ký tài năng, hệ thống gửi đường dẫn mời hạn 7 ngày | Tài năng tự đăng ký trên ứng dụng: tên (nghệ danh hoặc tên thật), email, ngày sinh, đồng ý 利用規約 (điều khoản sử dụng). Quản lý duyệt hoặc từ chối. Hệ thống gửi email: duyệt thì kèm mật khẩu tạm, từ chối thì gửi mẫu cố định, không nêu lý do | UC-01, 6-1 (1-4), 確認1 | 01, 02, 03, 04, 05, 06, 07, 10, 11, 00 |
| 2 | Đăng nhập lần đầu | Mở đường dẫn mời rồi đặt mật khẩu | Đăng nhập bằng mật khẩu tạm trong email, rồi tự đặt mật khẩu. Bỏ đường dẫn mời hạn 7 ngày | UC-03 前提, 6-1 (1-4) | 04, 06, 07, 10 |
| 3 | Quên mật khẩu | Không nêu | Tài năng tự đặt lại qua email đã đăng ký | UC-03 前提, 6-1 (1-4) | 04, 10 |
| 4 | Đối tượng được dùng | Chỉ tài năng thuộc công ty. Tài năng ngoài công ty để sau | Người ngoài công ty cũng đăng ký theo cùng luồng, quản lý duyệt. "Tài năng" gồm người thuộc công ty và người ngoài công ty đã được duyệt | UC-01, 確認1, 別紙E | 01, 02, 03, 11 |
| 5 | Có trả phí / miễn phí | Có 2 loại, quản lý chuyển từ trả phí sang miễn phí | Bỏ phân loại: mọi người đăng ký qua ứng dụng đều trả phí. Tài khoản công ty do quản lý tạo, không thu phí tháng, không đăng ký thanh toán. Chức năng 1-3 (đổi loại) không còn dùng | 3-1, 5-4, 6-3 (1-2, 1-3), UC-11 | 01, 02, 03, 04, 05, 06, 07, 08, 11, 00 |
| 6 | Phí tạo video của tài khoản công ty | Chưa rõ | Không thu qua cổng thanh toán. アデッソ quyết toán nội bộ. Hệ thống đếm số lần và hiện trên màn hình quản trị | UC-12 前提, 6-3 (5-4) | 04, 05, 07, 08 |
| 7 | Vị thành niên | Quản lý đánh dấu khi đăng ký | Hệ thống tự tính từ ngày sinh, hiện trên màn hình quản trị để tham khảo | 3-1, 確認2 | 03, 04, 07 |
| 8 | Lúc tạo thư mục OneDrive | Khi quản lý đăng ký tài năng | Khi tài năng đăng ký thanh toán xong. Tài khoản công ty: khi quản lý tạo tài khoản. Sau đó quản lý tạo một ChatGPT project cho tài năng và gắn với thư mục | UC-01 前提, 6-4 (2-2) | 04, 06, 07, 08 |
| 9 | Huấn luyện viên AI trước khi có hồ sơ | Quản lý kiểm tra huấn luyện viên AI chạy đúng rồi mới gửi hướng dẫn | Bỏ bước kiểm tra. Huấn luyện viên AI không đưa bản nháp cho tới khi quản lý nhập thông tin tài năng | UC-01 前提 | 04, 06 |
| 10 | Đồng ý về dữ liệu cá nhân | アデッソ lấy đồng ý trước khi gửi dữ liệu ra dịch vụ ngoài | Tài năng thuộc công ty đã ủy thác việc xử lý dữ liệu cá nhân và 肖像権 (quyền hình ảnh) khi ký hợp đồng. Bỏ việc lấy đồng ý riêng khỏi danh sách việc của アデッソ | 2-3, 10-3, 14-4 | 01, 03, 09, 11 |
| 11 | Quy mô | Bắt đầu ít, mở rộng lên 80–150 | Bắt đầu tối thiểu khoảng 30 người, mỗi tháng thêm 10, sớm lên khoảng 100. Mục tiêu 200–300, tương lai 1.000 | 2-2, UC-01 前提, 9-2, 12-6 | 01, 09, 00 |
| 12 | Mục tiêu | Số người theo dõi (mặc định 1 vạn mỗi mạng) | Thêm **hạn đạt mục tiêu**, và **チャレンジ (thử thách)**: mục tiêu nhỏ có thời hạn và số lần, ví dụ đăng 7 ngày liền. Hoàn thành thì huấn luyện viên AI chúc mừng | UC-02 前提, 確認3, 確認5, 確認39 | 04, 05, 07 |
| 13 | Màn hình "AIへの指示" (chỉ dẫn cho AI) | Quản lý chỉ dẫn qua ChatGPT và file OneDrive | Thiết kế của khách có màn hình này: chọn phạm vi (toàn bộ / nhóm / tài năng), ưu tiên tài năng > nhóm > toàn bộ, nút "試してみる" (chạy thử) để xem trước, lưu lịch sử và quay lại bản cũ, các mẫu câu lệnh có sẵn. Bên phát triển ghi **"cần kiểm chứng kỹ thuật"** và đang hỏi khách | UC-02 前提, 確認6, 7, 8 | 02, 04, 08, 10 |
| 14 | Nhóm tài năng (カテゴリー) | Không có | Đang hỏi khách: quản lý tạo nhóm (tên, màu, thứ tự), một tài năng thuộc nhiều nhóm, lọc danh sách, thông báo và bài chờ duyệt theo nhóm | 確認47 | 02, 04, 07, 10 |
| 15 | Danh sách từ cấm | Bên phát triển gửi mẫu chung | Như cũ, và nói rõ quản lý đăng ký danh sách trên màn hình quản trị. Hỏi khách các từ riêng của công ty | UC-02 前提, 確認4 | 04, 05 |
| 16 | Kết nối mạng xã hội | Kết nối cả 3 mạng | Hỏi khách: kết nối thiếu mạng vẫn được dùng, chỉ đăng lên mạng đã kết nối | 確認9, 10, 11 | 04, 06, 08 |
| 17 | Thông báo cho tài năng biết quản lý đọc hội thoại | Thông báo trên màn hình | Hiện lần đầu mở ứng dụng, tài năng phải bấm nút xác nhận | 確認13 | 04, 10 |
| 18 | Số bản nháp mỗi ngày | Cơ bản 1 bài/ngày | Tài năng yêu cầu bao nhiêu thì tạo bấy nhiêu | 5-3, UC-05 前提 | 04, 05, 06 |
| 19 | Sửa chú thích | Tài năng tự sửa được | Hỏi khách: tài năng không tự sửa, mà nói cho huấn luyện viên AI sửa. Không giới hạn số lần viết lại, mỗi lần khoảng 0,2–3 yên | 6-6 (4-2), 確認28, 確認29 | 04, 05, 10 |
| 20 | Giờ đăng | AI chọn | Hỏi khách: tài năng không đổi được giờ đăng trên ứng dụng | 確認30 | 04, 06, 10 |
| 21 | Duyệt bài | Một quản lý duyệt hoặc trả lại, có lý do | Hỏi khách: quản lý bấm trước thì quyết định. Trả lại thì tài năng sửa và gửi duyệt lại. Quá giờ chưa duyệt thì hủy lịch đăng, tài năng 採用 (chấp nhận) lại nếu muốn đăng | 確認34, 35, 36 | 03, 05, 06 |
| 22 | Giới hạn số bài mỗi ngày | 1 ảnh + 1 video mỗi tài khoản mỗi ngày | Bỏ con số. Biện pháp chống khóa tài khoản sẽ quyết theo quy định từng mạng. Đề xuất không giới hạn số bài vì lý do chi phí, kèm ước tính chi phí từng loại bài | 8-4, UC-08 前提, 確認37 | 04, 05, 06, 11 |
| 23 | Hủy bài đã hẹn | Quản lý hủy trên màn hình Upload-Post | Quản lý hủy trên màn hình quản trị, hệ thống hủy bên Upload-Post | 6-10 (7-2), UC-08 前提 | 02, 03, 04, 06, 08, 10 |
| 24 | Dừng toàn bộ đăng tự động | Bài đến giờ khi đang dừng thì bỏ qua, chạy lại cũng không đăng bù | Khi dừng: không đặt lịch mới và hủy luôn các bài đã đặt lịch. Chạy lại cũng không đăng các bài đã hủy | 6-10 (7-5), UC-08 前提 | 04, 05, 06 |
| 25 | Dừng đăng tự động theo từng tài năng | Không có | Chức năng mới: quản lý dừng hoặc chạy lại cho từng tài năng, cách xử lý như dừng toàn bộ | 3-2, 5-6, 6-10 (7-5) | 02, 03, 04, 05, 07, 10 |
| 26 | Phí Upload-Post | Không nêu | Trả theo tháng, tính theo số tài năng đã đăng ký, không tính theo số bài | UC-08 前提 | 08, 09 |
| 27 | Thông báo khi đạt mốc người theo dõi | Báo tài năng ở từng mốc, báo cả quản lý khi đạt mục tiêu | Chỉ báo tài năng và quản lý khi đạt mục tiêu | 6-5 (3-7), 確認39 | 04, 05  Cập nhật: mốc 25%, 50%, 75% mục tiêu (Q&A No.14). |
| 28 | Quản lý góp ý cho tài năng | Qua kênh liên lạc hiện có, không qua hệ thống | Hỏi khách: quản lý ghi vào chỉ dẫn cho AI, huấn luyện viên AI chuyển lời. Chuyện nghiêm trọng hoặc gấp thì quản lý liên hệ trực tiếp | 確認43 | 01, 03, 06 |
| 29 | Thông báo cho quản lý | Chỉ trên màn hình quản trị | Như cũ, nay hỏi lại rõ. Thông báo đã xử lý thì đánh dấu "対応済み" (đã xử lý) và biến khỏi danh sách | 確認45, 確認46 | 04, 10 |
| 30 | Màn hình quản trị trên điện thoại | Mở được nhưng không tối ưu | Chủ yếu dùng trên máy tính, nhưng thiết kế dễ xem trên trình duyệt điện thoại. Mâu thuẫn với thiết kế [TK-M] đã được giải quyết | UC-10 前提, 9-1 | 09, 10, 11 |
| 31 | Thanh toán | Tài năng xem tổng tiền trên ứng dụng | Thêm: xem lịch sử hóa đơn bằng cách chuyển qua trang của cổng thanh toán. Hỏi khách: kết thúc giữa tháng vẫn thu trọn tháng đó | 6-3 (1-1), 確認50, 確認51 | 04, 05, 08 |
| 32 | Kết thúc sử dụng | Chuyển 退会 (rời đi) thì hủy bài đã hẹn, dừng thu phí | Như cũ. Hỏi thêm: chặn đăng nhập, thời gian giữ dữ liệu, được chuyển lại 利用中 (đang dùng) không | 確認53–56 | 05, 06, 07 |
| 33 | Đổi điện thoại, vô hiệu hóa quản lý | Không nêu | Đăng nhập trên máy mới thì dùng tiếp. Quản lý bị vô hiệu hóa thì không đăng nhập được và không nhận thông báo | UC-13 前提, 6-1 (1-4) | 04, 05 |
| 34 | Loại thông báo | 15 loại | 17 loại. Thêm "kết quả đăng ký" (email cho người đăng ký) và "có người đăng ký" (thông báo cho quản lý) | 6-12 (7-4), 6-13, 別紙A | 04, 10 |
| 35 | Thiết kế | Không nói tới bản thiết kế của khách | Lấy bản thiết kế của アデッソ làm tham khảo. Những chỗ còn sót từ bản cũ (LINE, số lần tạo video miễn phí, hạn mức tiền video mỗi tháng, không có bước trả lại bài, quyền dừng toàn bộ đăng tự động) theo [YK2] và sẽ sửa trong 画面定義書 (bản định nghĩa màn hình). Giao diện giống Instagram, Trang của tôi là trung tâm, nhân vật モモ (Momo), có thể cho chọn nhân vật | 6-14 | 10, 11 |
| 36 | Giọng điệu huấn luyện viên AI | Chọn 1 trong 3 câu mẫu | Ghi trong chỉ dẫn cho AI | 5-5 | 04, 05 |
| 37 | Màn hình chính | Chọn 1 trong 3 phương án | Bỏ câu hỏi chọn phương án | 6-14 | 10 |
| 38 | Phạm vi sau này | Tài năng ngoài công ty, X, TikTok Live… | Bỏ "tài năng ngoài công ty" (đã vào luồng đăng ký). Thêm "suất cho công ty trong tập đoàn" và "người hâm mộ dùng". Mức làm trong đợt này sẽ bàn sau | UC-01 前提, 13 | 02 |
| 39 | Lịch và liên lạc | Họp 1–2 lần/tuần | Nghiệm thu khoảng tuần 2–3 tháng 2/2027. Từ tuần 17/11/2026 đến hết năm họp thứ Ba (sau 16:00) và thứ Sáu (11:00–15:00). Dùng một nhóm chat Chatwork mới. File trao đổi qua Google Drive | 14-1, 14-2 | 01, 00 |

## 2. Những điểm trước đây chưa rõ, nay đã rõ

| Điểm chưa rõ trước đây | Giờ ra sao | Nguồn [YK2] | Tab cũ |
| --- | --- | --- | --- |
| Có bao nhiêu tài năng miễn phí, ai trả phí video cho họ | Không còn tài năng miễn phí | 5-4 | 01, 05, 06 |
| Hủy bài trên Upload-Post thì hệ thống biết bằng cách nào | Hủy từ màn hình quản trị, hệ thống tự hủy bên Upload-Post | 6-10 (7-2) | 06 (luồng chưa rõ 10), 08 |
| Bài vượt giới hạn mỗi ngày thì hoãn hay bỏ | Bỏ giới hạn cố định. Biện pháp sẽ quyết sau | 8-4, 確認37 | 06 (luồng chưa rõ 8) |
| Màn hình quản trị trên điện thoại (thiết kế khác yêu cầu) | Thiết kế dễ xem trên điện thoại | 9-1 | 09, 10 |
| Đường dẫn mời hết hạn thì sao | Bỏ đường dẫn mời, dùng mật khẩu tạm | 6-1 (1-4) | 06 (W1) |
| Bài bị trả lại được sửa và gửi lại thế nào | Đề xuất: tài năng sửa rồi gửi duyệt lại (đang hỏi khách) | 確認35 | 06 (luồng chưa rõ 5) |
| Nhiều quản lý cùng duyệt thì ai quyết | Đề xuất: người bấm trước (đang hỏi khách) | 確認34 | 03, 06 |
| Đến giờ đăng chưa duyệt thì sao | Đề xuất: hủy lịch đăng, tài năng 採用 lại (đang hỏi khách) | 確認36 | 03 (W3), 06 |
| Thông báo trong thiết kế khác với yêu cầu | Theo [YK2]. Sửa trong 画面定義書 | 6-14 | 10 |

## 3. Chỗ chưa rõ hoặc mâu thuẫn mới trong v2

| STT | Vấn đề | Chi tiết | Nguồn [YK2] | Ảnh hưởng |
| --- | --- | --- | --- | --- |
| N1 | Lúc đăng ký tài năng với Upload-Post | 8-2 vẫn ghi "khi đăng ký tài năng", nhưng không còn bước quản lý đăng ký. Đăng ký lúc nào: khi duyệt, khi thanh toán xong, hay khi tài năng bấm kết nối? | 6-10 (8-2) và UC-01 | Cao |
| N2 | Tài khoản công ty có cần duyệt không | 7-4 (dữ liệu ban đầu) ghi "chỉ dẫn và duyệt cho tài khoản công ty", nhưng 確認52 đề xuất không duyệt | 7-4, 確認52 | Thấp |
| N3 | Tài khoản công ty đăng bài từ đâu | 9-1: quản lý thao tác trên màn hình quản trị. UC-12 前提: quản lý đăng nhập vào ứng dụng tài năng bằng mã của tài khoản công ty | 6-10 (9-1), UC-12 | Trung bình |
| N4 | Người ngoài công ty: đồng ý về dữ liệu và đồng ý của phụ huynh | Đồng ý được lấy "khi ký hợp đồng" với người thuộc công ty. Người ngoài công ty tự đăng ký thì không có hợp đồng. Ai lấy đồng ý về dữ liệu cá nhân, quyền hình ảnh, và đồng ý của phụ huynh với người vị thành niên? | 2-3, UC-03 前提, 10-3 | Cao (pháp lý) |
| N5 | Ứng dụng mở cho mọi người, đăng ký công khai | Đường dẫn ứng dụng có thể lộ ra ngoài (UC-01 nói rõ). Chưa có biện pháp chống đăng ký rác hoặc đăng ký hàng loạt. Đơn đăng ký chưa duyệt hoặc bị từ chối giữ bao lâu? Bị từ chối thì đăng ký lại bằng email đó được không? | UC-01, 6-4 (2-2) | Trung bình |
| N6 | Khoảng trống sau khi thanh toán | Thư mục được tạo khi thanh toán xong. Sau đó quản lý mới tạo ChatGPT project và nhập hồ sơ. Trong thời gian đó tài năng đã trả phí nhưng huấn luyện viên AI chưa đưa bản nháp. Thông báo cho quản lý biết lúc nào cần nhập hồ sơ? Phí tháng đầu tính từ lúc nào? | UC-01 前提, 確認48 | Trung bình |
| N7 | Tài năng đặt lịch lại sau khi đăng lỗi | 8-5 ghi "tài năng hoặc quản lý đặt lịch lại", nhưng 確認30 đề xuất tài năng không đổi được giờ đăng | 6-10 (8-5), 確認30 | Trung bình |
| N8 | Tên chức năng còn sót | 1-2 "有償と無償の区分" (phân loại trả phí / miễn phí) và 1-3 "区分の変更" (đổi loại) vẫn còn tên trong danh sách chức năng, dù nội dung nói không còn phân loại | 6-3 | Thấp |
| N9 | Màn hình chỉ dẫn cho AI và nhóm tài năng chưa có trong danh sách chức năng | 確認6, 7, 8, 47 mô tả chức năng mới, nhưng chưa có mã chức năng hay mức ưu tiên ở mục 6. Chưa rõ có trong phạm vi không | UC-02, UC-10, mục 6 | Cao (phạm vi, chi phí)  Nay làm: CR-17, CR-18 ([KS] 確認6–8, 47). |
| N10 | Hình 4-1 (bảng đối chiếu chức năng với UC) | Là hình ảnh nên không trích được chữ. Cần xem trực tiếp trong file | 4 | — |

## 4. Bảng đổi số 確認 từ v1 sang v2

Dùng bảng này để đọc các tab cũ. Những số ghi "—" nay không còn là câu hỏi mà đã thành 前提 (tiền đề) hoặc bị bỏ.

| v1 | v2 | Ghi chú |
| --- | --- | --- |
| 1 | 3 | Mục tiêu 1 vạn người theo dõi |
| 2 | — | Bỏ, vì không còn tài năng miễn phí |
| 3 | 41 | Mọi quản lý xem mọi tài năng |
| 4 | 42 | Quản lý xem hội thoại |
| 5 | — | Thay bằng 確認1 (luồng đăng ký) |
| 6 | — | Thành 前提. 確認4 mới hỏi các từ riêng của công ty |
| 7 | 9 | Tài năng tự kết nối mạng xã hội |
| 8 | — | Thành 前提: thanh toán xong mới dùng huấn luyện viên AI |
| 9 | 14 | 4 việc mỗi ngày của huấn luyện viên AI, thêm チャレンジ |
| 10 | 15 | 3 chủ đề gợi ý |
| 11 | 16 | Tin tức trong ngày |
| 12 | 17 | Chuyện sức khỏe, muốn rời công ty |
| 13 | 24 | Nội dung bản nháp |
| 14 | 25 | Chỉ đăng bài đã 採用 |
| 15 | 26 | Không có tư liệu thì không đăng |
| 16 | 27 | Quản lý gửi tư liệu hộ |
| 17 | 31 | 2 loại video |
| 18 | 39 | Thông báo khi đạt mục tiêu (đổi nội dung) |
| 19 | 43 | Quản lý góp ý (đổi nội dung: qua huấn luyện viên AI) |
| 20 | 48 | Tháng đầu thu trọn tháng |
| 21 | 52 | Tài khoản công ty không duyệt |
| 22 | 53 | Chuyển 退会 |
| 23 | — | Thành quy tắc ở 6-3 (5-4) |
| 24 | 18 | Giờ nhắn buổi sáng (thêm: giờ cụ thể quyết sau khi thử tải) |
| 25 | 19 | 3 ngày / 7 ngày |
| 26 | — | Bỏ, giọng điệu ghi trong chỉ dẫn cho AI |
| 27 | 10 | Mỗi mạng một tài khoản |
| 28 | — | Đổi: hủy trên màn hình quản trị |
| 29 | — | Đổi: dừng thì hủy luôn bài đã đặt lịch |
| 30 | — | Bỏ câu hỏi chọn màn hình chính |
| 31 | — | Đổi: thiết kế dễ xem trên điện thoại |
| 32 | — | Thành 前提: hệ thống không lưu bằng chứng đồng ý |
| 33 | 49 | Cổng thanh toán thu được số tiền thay đổi theo tháng |
| 34 | — | Thành 前提 (nội dung danh sách từ cấm mẫu) |
| 35 | 20 | Ý tưởng giữ tài năng đăng bài đều |
| 36 | 32 | Video tự làm |
| 37 | 33 | Bài cần duyệt |

**Số 確認 hoàn toàn mới trong v2:** 1, 2, 4–8, 11–13, 21–23, 28–30, 34–38, 40, 44–47, 50, 51, 54–56.

## 5. Việc cần làm với các tab cũ

Cả 12 tab phân tích đã viết lại hoàn toàn theo v2 (13/11/2026): Báo cáo phân tích dự án, Tab 1 (bối cảnh), Phạm vi, Vai trò và phân quyền, Yêu cầu chức năng, Quy tắc nghiệp vụ, Workflow, Dữ liệu và ERD, Tích hợp, Yêu cầu phi chức năng, Giao diện, Edge case và rủi ro. Không tab nào còn viết theo v1. Số 確認 (mục cần xác nhận) trong mọi tab theo đánh số của v2.
