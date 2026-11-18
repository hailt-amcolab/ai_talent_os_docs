# Phân tích tài liệu アプリ画面案_AI育成OS.pdf (phương án màn hình ứng dụng)

Viết ngày 16/11/2026. Ký hiệu nguồn trong file này:

- **[AG]** = アプリ画面案_AI育成OS.pdf, 12 trang, ghi ngày tạo 12/11/2026, đơn vị tạo FutureCore Partners.
- **[YK2]** = AI育成OS_概要要件定義書_v2.docx (bản định nghĩa yêu cầu khái quát, v2).
- **[TK-T]**, **[TK-M]** = hai file thiết kế của khách trong thư mục Design style (ứng dụng tài năng L-00〜L-09; màn hình quản trị M-01〜M-11).
- **[SD]** = 画面遷移図と画面案_AI育成OS.pdf (sơ đồ chuyển màn hình và phương án màn hình, ngày 11/11/2026).

Từ hay gặp trong tài liệu: 要確認 (cần xác nhận), 確認N (mục cần xác nhận số N trong bảng xác nhận), 目的 (mục đích), 操作と移り先 (thao tác và màn hình chuyển tới), 概要要件定義書 (bản định nghĩa yêu cầu khái quát).

Lưu ý: file này phân tích theo phần chữ trích từ PDF. Ngày 16/11/2026 đã đối chiếu lại toàn bộ chữ của 12 trang và xem hình các trang 2–10. Các bổ sung từ lần đối chiếu này nằm ở dòng T-11, M-08, M-11, M-15, ở mục 1 (quan hệ với [SD]) và ở mục 3.2 (điểm 7–11).

## 1. Đây là loại tài liệu gì

**Là tài liệu phương án màn hình (画面案), mức bản vẽ phác (wireframe có màu).** Mỗi màn hình có hình minh họa và ba ô chú thích: 目的 (mục đích), 操作と移り先 (bấm gì thì sang màn nào), 概要要件定義書 (mục nguồn trong bản yêu cầu). [AG] trang 1.

| Đặc điểm | Nội dung | Nguồn |
| --- | --- | --- |
| Ai làm | FutureCore Partners (phía mình), không phải khách. Khách chỉ cung cấp hai bản thiết kế gốc | [AG] chân mọi trang |
| Làm từ đâu | Lấy màu, hình dáng và nhân vật モモ (Momo) từ hai bản thiết kế của khách, rồi sửa **nội dung** cho khớp với bản yêu cầu | [AG] trang 1 |
| Khớp với bản yêu cầu nào | Ghi "bản 0.1", nhưng số 確認 dùng theo đánh số của [YK2] (ví dụ 確認47 là nhóm tài năng, 確認53 là rời đi), nên thực chất khớp với [YK2]. Mình đã đối chiếu các con số 30 ngày, 30 phút, 48 giờ, 2 loại video, mức ưu tiên chỉ dẫn AI: đều có trong [YK2] | [AG] trang 1–12; [YK2] 6-1, 6-2, 6-8, 6-10, 確認6 |
| Phạm vi | 34 màn hình: 15 màn hình ứng dụng tài năng (T-01〜T-15), 19 màn hình quản trị (M-01〜M-19), kèm 3 ví dụ màn hình quản trị trên điện thoại | [AG] trang 1 |
| Quy ước trong hình | Chữ đỏ 【要確認】 (cần xác nhận) = điểm đang hỏi khách. Khung đỏ = mục chỉ thêm vào nếu khách đồng ý. Số tiền ghi "¥—" vì chưa có giá. Chữ, số, tên trong hình là ví dụ | [AG] trang 1–2 |
| Mục đích | Cho khách xem màn hình để xác nhận yêu cầu. [YK2] mục 1-5 nói khách sẽ "xem màn hình thật" trước khi chốt bản yêu cầu và 画面定義 (định nghĩa màn hình) | [AG] trang 1; [YK2] 1-5 |

**Quan hệ với các tài liệu cũ:**

- So với [TK-T] và [TK-M]: [AG] giữ phong cách nhưng **thay nội dung** những chỗ còn theo phương án cũ (LINE, tài năng miễn phí, 12 lượt video miễn phí…). Trang 12 liệt kê từng chỗ đã đổi. Việc này đúng với [YK2] 6-14: thiết kế của khách khác bản yêu cầu thì theo bản yêu cầu.
- So với [SD] (11/11): [AG] mới hơn một ngày. [SD] chỉ có 8 trang, dùng T-01〜T-12 và M-01〜M-10, nhưng **cùng mã lại chỉ màn khác**: ví dụ [SD] T-01 là ログイン (đăng nhập), còn [AG] T-01 là 利用の申し込み (đăng ký dùng); [SD] M-02 là danh sách tài năng, còn [AG] M-02 là danh sách thông báo. [SD] không có màn đăng ký và vẫn ghi chức năng 1-3 (đổi loại trả phí / miễn phí), tức là làm theo bản yêu cầu cũ. Vì vậy nhiều khả năng [AG] thay thế [SD], nhưng tài liệu không nói thẳng, nên vẫn ghi là **chưa rõ**.

## 2. Giải thích từng trang

### Trang 1 – Giới thiệu và danh sách màn hình

- Giải thích tài liệu (như mục 1 ở trên) và cách đọc.
- **Cấu trúc:** ứng dụng tài năng ở trang 2–5, chạy trên điện thoại. Từ マイページ (Trang của tôi) đi tới các màn khác. Thanh menu dưới có 5 mục: ホーム (Trang chủ), チャット (Trò chuyện), 送る (Gửi), 予定 (Lịch), マイページ (Trang của tôi). Màn hình quản trị ở trang 6–10, dùng máy tính, menu bên trái. Trang 11 là ví dụ hiển thị trên điện thoại.
- **Bảng đối chiếu mã màn hình:** mã được đánh lại theo thứ tự sử dụng. Ví dụ T-08 Trò chuyện = L-00 của khách, T-05 Kết nối mạng xã hội = L-02, T-06 = Trang của tôi (thiết kế của khách không đánh số màn này). Thiết kế của khách không có L-08. Màn mới thêm: T-01 (đăng ký), T-03, T-04, T-11 (tạo video), T-14 (thông báo).
- **Ba thao tác làm ngoài hệ thống:** kết nối mạng xã hội (trên trang kết nối của Upload-Post), đăng ký và đổi phương thức thanh toán, xem lịch sử hóa đơn (trên trang của 決済代行会社 – công ty trung gian thanh toán), nhập hồ sơ tài năng (quản lý trò chuyện với ChatGPT).
- **19 màn hình quản trị:** M-03, M-09, M-11, M-12, M-17 là màn mới. M-13〜M-15 (nhóm tài năng, chỉ dẫn AI) lấy nguyên từ thiết kế của khách.

⚠ **Mã màn hình bị trùng nghĩa:** M-10 trong [AG] là "Cài đặt tài năng", nhưng M-10 trong [TK-M] là "Quản lý nhóm tài năng". M-11 trong [AG] là "Bài dính từ cấm", còn trong [TK-M] là "Chỉ dẫn AI". [SD] còn là bộ mã thứ ba (xem mục 1). Tab Giao diện (file 10) đang dùng mã [TK] làm cột chính; bảng đối chiếu ba bộ mã nằm ở mục 8 của file đó. Cần thống nhất dùng bộ mã nào (câu A10 trong file 15).

### Trang 2 – Ứng dụng tài năng: đăng ký, đăng nhập, lần đầu

| Màn hình | Nội dung | Nguồn [YK2] và 確認 |
| --- | --- | --- |
| **T-01** 利用の申し込み (đăng ký dùng) | Nhập tên (nghệ danh hoặc tên thật), email, ngày sinh, tích "đã đọc và đồng ý điều khoản". Bấm 申し込む (đăng ký) thì hiện thông báo đã nhận đơn; quản lý duyệt xong sẽ gửi mật khẩu tạm qua email | UC-01, chức năng 1-4, 2-2; 確認1 |
| **T-02** ログイン (đăng nhập) | Email và mật khẩu. Sai 5 lần liên tiếp thì khóa 15 phút. Có link "quên mật khẩu" và "đăng ký dùng". Lần đầu chuyển sang T-03, các lần sau sang T-06. Giữ đăng nhập 30 ngày trên cùng máy | UC-03, chức năng 1-4 |
| **T-03** パスワードの設定 (đặt mật khẩu lần đầu) | Đặt mật khẩu mới (ít nhất 8 ký tự, có chữ và số). Có ô thông báo "quản lý xem được hội thoại của bạn với huấn luyện viên AI" và nút 確認しました (đã hiểu) | UC-03, 1-4, 3-2; 確認13 |
| **T-04** はじめに行うこと (việc cần làm đầu tiên) | 4 bước: thêm vào màn hình chính, cho phép thông báo, đăng ký thanh toán (mở trang công ty thanh toán; xong mới dùng được huấn luyện viên AI), kết nối mạng xã hội. Đóng giữa chừng thì lần sau hướng dẫn tiếp. Tài khoản công ty không hiện bước 3 | UC-03, chức năng 6-2; 確認12 (không cho phép thông báo vẫn dùng được) |

### Trang 3 – Ứng dụng tài năng: kết nối, Trang của tôi, Trang chủ, Trò chuyện

| Màn hình | Nội dung | Nguồn [YK2] và 確認 |
| --- | --- | --- |
| **T-05** SNS の接続 (kết nối mạng xã hội) | Trạng thái từng mạng: đã nối, chưa nối, bị ngắt. Nhắc Instagram phải là tài khoản doanh nghiệp hoặc nhà sáng tạo. Nút mở trang kết nối của Upload-Post, trang này dùng được 48 giờ | UC-03, chức năng 8-2, 8-6; 確認10 (mỗi mạng 1 tài khoản), 確認11 (không cần nối đủ 3 mạng) |
| **T-06** マイページ (Trang của tôi) | Số bài, số ngày đăng liên tục, số người theo dõi so với mục tiêu **cho từng mạng** (ví dụ Instagram 3.100/10.000). Các ô đi tới: Momo (T-08), Bản nháp hôm nay (T-07), Video (T-11), Lịch (T-13), Tư liệu (T-10), Kết nối (T-05), Phí (T-15), chuông thông báo (T-14) | 6-14, 3-10, 6-7; 確認3 |
| **T-07** ホーム (Trang chủ) | Việc của hôm nay: ミッション (nhiệm vụ trong ngày, ví dụ "chụp 1 ảnh trước giờ tập"), チャレンジ (thử thách, ví dụ "đăng 7 ngày liên tục: còn 2 ngày"), 3 chủ đề gợi ý có nút chọn, hoặc tự nêu chủ đề. Bản nháp hôm nay hiện **giờ đăng dự kiến** và dòng "gửi ảnh thì mới chấp nhận được". Báo có bài chờ duyệt | UC-04, UC-05, 5-3, 6-8; 確認15, 16, 5, 20 |
| **T-08** AIコーチとの会話 (trò chuyện với huấn luyện viên AI) | Ví dụ tin 8:00: kết quả bài hôm qua (1.240 lượt xem, 86 lượt thích, 5 ngày liên tục) và 3 chủ đề. Tài năng chọn, AI làm bản nháp và dặn chụp gì. Nút "xem bản nháp", "gửi ảnh/video". Mỗi tin tối đa 1.000 ký tự. Kéo lên xem hội thoại cũ | UC-04, chức năng 3-4, 3-3; 確認18, 14, 23 |

### Trang 4 – Ứng dụng tài năng: bản nháp, gửi tư liệu, video

| Màn hình | Nội dung | Nguồn [YK2] và 確認 |
| --- | --- | --- |
| **T-09** 投稿案の詳細 (chi tiết bản nháp) | Xem trước bài (ảnh/video và chú thích), "chụp gì", giờ đăng dự kiến. Nút: この案で投稿する（採用）(đăng bản này – chấp nhận), 直しを依頼 (nhờ sửa, quay về T-08), gửi ảnh, tạo video. Ô "nhờ quản lý duyệt vì là bài công việc" **chỉ hiện với tài năng bật chế độ duyệt**. Dòng "giờ đăng do hệ thống quyết". Không có ảnh/video thì không chấp nhận được; dính từ cấm thì không hẹn giờ và hiện lý do | UC-05, UC-07, chức năng 4-3, 4-4, 6-6; 確認28, 30, 33 |
| **T-10** 写真・動画の送付 (gửi ảnh, video) | Chọn từ máy hoặc chụp ngay, chọn nhiều tấm, xem tư liệu đã gửi trước đó. Ô "lưu làm video tự làm": mỗi ngày AI lấy 1 video theo thứ tự lưu để làm bản nháp. Mất mạng thì báo và cho gửi lại; quá dung lượng thì báo lý do | UC-05, UC-06, chức năng 6-3, 6-4; 確認32 |
| **T-11** 動画の作成 (tạo video) | Chọn loại: ショート動画 (video ngắn, người trong ảnh chuyển động) hoặc スライド動画 (video trình chiếu ảnh). Chọn ảnh, độ dài khoảng 15 giây, **giá mỗi lần tạo (ước tính) ¥—**, số lần đã tạo trong tháng. Tạo lại cũng tính 1 lần. Không có lượt miễn phí, không có trần tháng. Vẫn giữ dòng 「請求額が表示の金額と変わる場合があります」 (số tiền thu có thể khác số hiện trên màn hình), xem câu B9 trong file 15 | UC-06, 5-7, chức năng 5-1, 5-4; 確認31 |
| **T-12** 動画の確認 (xem video đã tạo) | Phát video có nhãn "do AI tạo". Ba lựa chọn: dùng cho bài đăng, tạo lại (tính 1 lần), không dùng. Tạo hỏng thì hiện lý do và **không tính lần** | UC-06, chức năng 5-3, 5-5, 5-4 |

### Trang 5 – Ứng dụng tài năng: lịch đăng, thông báo, phí

| Màn hình | Nội dung | Nguồn [YK2] và 確認 |
| --- | --- | --- |
| **T-13** 投稿の予定と結果 (lịch và kết quả đăng) | Lọc: tất cả, sắp tới, đã đăng. Mỗi bài có trạng thái: chờ duyệt, đã hẹn, bị trả lại (xem lý do của quản lý), đã đăng (lượt xem, thích, bình luận), lỗi (ghi mạng nào lỗi). Ví dụ "không có video nên không lên YouTube". Tài năng **không tự hủy lịch**, phải liên hệ quản lý. Bị trả lại thì sửa và gửi duyệt lại | UC-08, UC-09, chức năng 8-3, 8-5, 6-7; 確認40, 35 |
| **T-14** お知らせ (thông báo) | Danh sách thông báo: video xong, nhắc gửi ảnh (17:00 cho bài 19:00), đăng thành công, đã được duyệt, đăng lỗi, mất kết nối, thanh toán lỗi, đạt mục tiêu. Bấm vào thì sang màn liên quan. Máy không cho phép thông báo đẩy vẫn xem được ở đây | Chức năng 6-1, 別紙A (phụ lục A); 確認38, 39 |
| **T-15** ご利用とお支払い (sử dụng và thanh toán) | Phí dự kiến tháng này = phí tháng + phí video (số lần). Nút đổi phương thức thanh toán, xem lịch sử hóa đơn (đều mở trang công ty thanh toán). Thanh toán qua cước nhà mạng và thẻ. Không có nút hủy dịch vụ: muốn ngừng thì báo quản lý. Tài khoản công ty không hiện phần thanh toán | UC-11, UC-13, chức năng 1-1, 5-4; 確認51, 53 |

### Trang 6 – Màn hình quản trị: đăng nhập, thông báo, duyệt đơn, chờ duyệt

| Màn hình | Nội dung | Nguồn [YK2] và 確認 |
| --- | --- | --- |
| **M-01** ログイン（二段階認証）(đăng nhập hai bước) | Bước 1 email và mật khẩu, bước 2 mã 6 số từ ứng dụng xác thực. Lần đầu quét mã QR. Không thao tác 30 phút thì phải đăng nhập lại | Chức năng 1-6 |
| **M-02** お知らせ一覧 (danh sách thông báo) | Màn đầu tiên sau đăng nhập. 9 loại: đơn đăng ký, yêu cầu duyệt, dính từ cấm, đăng lỗi, nhiều ngày không đăng, chuyện nghiêm trọng, đạt mục tiêu, thanh toán lỗi, mất kết nối. Lọc theo loại, theo nhóm tài năng, hiện cả mục đã xử lý. Nút 対応済みにする (đánh dấu đã xử lý) | UC-10, chức năng 7-4, 別紙A; 確認45, 46, 47 |
| **M-03** 申し込みの確認 (xem đơn đăng ký) | Tên, email, ngày sinh kèm tuổi và nhãn "vị thành niên (tham khảo)" ([KS] 確認2: đổi thành nhãn dưới 18 tuổi), thời điểm đăng ký, đã đồng ý điều khoản. Dặn "từ chối người lạ hoặc tài năng đã nghỉ". **Chọn bật chế độ duyệt bài ngay lúc duyệt đơn** (sau đổi ở M-10). Nút duyệt hoặc từ chối; email soạn sẵn, từ chối không ghi lý do. Duyệt xong tài năng vào danh sách với trạng thái 利用前 (trước khi dùng) | UC-01, chức năng 1-4, 2-2; 確認2 |
| **M-04** 承認待ち一覧 (danh sách chờ duyệt) | Bài tài năng gửi duyệt: thời điểm gửi, giờ đăng (cũng là hạn duyệt), mạng đăng, có dính từ cấm không. Ghi rõ "quá giờ đăng chưa duyệt thì không đăng" | UC-07, chức năng 7-7; 確認34 |

### Trang 7 – Màn hình quản trị: duyệt bài, danh sách tài năng, chi tiết tài năng

| Màn hình | Nội dung | Nguồn [YK2] và 確認 |
| --- | --- | --- |
| **M-05** 投稿の承認 (duyệt bài) | Xem trước bài, mạng đăng, kết quả kiểm tra từ cấm, giờ đăng. Nút 承認する (duyệt) và 差し戻す (trả lại, phải nhập lý do) | UC-07, chức năng 7-7; 確認35, 36 |
| **M-06** タレント一覧 (danh sách tài năng) | Tìm theo tên, lọc theo trạng thái, số ngày không đăng, nhóm. Cột: trạng thái, có duyệt bài không, đăng tự động đang chạy hay dừng, kết nối từng mạng, người theo dõi từng mạng, bài cuối, số ngày không đăng. Tài khoản công ty cũng nằm trong danh sách. Nút tạo tài khoản công ty | UC-09, UC-10, chức năng 7-1, 3-10; 確認41, 47 |
| **M-07** タレントの詳細（情報）(chi tiết – thông tin) | Hồ sơ (tuổi, tính cách, định hướng, sở thích, mục tiêu tương lai, thử thách), người theo dõi so với mục tiêu và hạn (ví dụ hết 3/2027), mức tăng 7 ngày, kết nối. **Chỉ xem, không sửa ở đây**: dữ liệu là thứ quản lý nhập qua ChatGPT vào thư mục OneDrive. Mở màn này thì ghi nhật ký xem. Có 4 thẻ: Thông tin, Bài đăng, Hội thoại, Cài đặt | UC-02, UC-10, chức năng 7-1, 2-3, 3-10; 確認5, 44 |
| **M-08** タレントの詳細（投稿）(chi tiết – bài đăng) | Danh sách bài theo trạng thái: chờ duyệt, đã hẹn, dính từ cấm, đã đăng, lỗi. Nút: đi duyệt, 取り消す (hủy lịch, hủy cả ở Upload-Post), sửa chú thích, 予約し直す (hẹn lại bài lỗi). Màu biểu tượng mạng: xanh là được, đỏ là lỗi hoặc ngắt, xám là chưa nối. Quản lý gửi ảnh và tạo video thay tài năng từ đây; hai nút này nằm trong **khung đỏ**, tức chỉ làm nếu khách đồng ý (確認27). Chỉ quản lý có nút 予約し直す; ứng dụng tài năng (T-13) không có | UC-08, UC-09, chức năng 7-2, 8-5; 確認27 |

### Trang 8 – Màn hình quản trị: hội thoại, cài đặt, từ cấm, tài khoản công ty

| Màn hình | Nội dung | Nguồn [YK2] và 確認 |
| --- | --- | --- |
| **M-09** タレントの詳細（会話）(chi tiết – hội thoại) | Đọc hội thoại giữa tài năng và huấn luyện viên AI, chỉ xem. Ví dụ tài năng nói "dạo này hơi mệt", hệ thống ghi "đã báo là chuyện nghiêm trọng". Mở xem thì ghi nhật ký | UC-10, 3-2, chức năng 3-3; 確認42, 17, 43 |
| **M-10** タレントの詳細（設定）(chi tiết – cài đặt) | Đổi trạng thái (利用前, 利用中, 利用終了 – trước khi dùng, đang dùng, đã kết thúc), bật/tắt duyệt bài, dừng hoặc chạy đăng tự động, mục tiêu người theo dõi từng mạng và hạn, gắn nhóm, số lần tạo video và chi phí AI tháng này. Chuyển sang "đã kết thúc" thì ngừng nhắn tin, ngừng thu phí, hủy bài đã hẹn, khóa đăng nhập | UC-13, 5-6, chức năng 7-3, 2-4, 7-5, 5-4, 3-5; 確認53, 54, 56, 47 |
| **M-11** 使ってはいけない言葉が入っていた投稿の確認 (bài dính từ cấm) | Bài bị dừng vì có từ cấm. Hiện cụm từ bị phát hiện và lý do (ví dụ "chắc chắn giảm cân"). Quản lý **sửa được chú thích** rồi bấm 直して予約する (sửa và hẹn giờ, hẹn đúng giờ đăng đã định), hoặc 予約しない (không đăng). Lựa chọn 予約しない không có trong [YK2] 4-4. Màn này không nói có kiểm tra từ cấm lại sau khi sửa không, và tài năng có được báo nội dung đã sửa không | UC-05, 5-3, chức năng 4-4  Làm ở mức tối thiểu: sửa chữ, hẹn giờ, hủy (CR-06). |
| **M-12** 事務所アカウントの作成 (tạo tài khoản công ty) | Nhập tên và email đăng nhập. Không thu phí tháng, không hướng dẫn thanh toán. Tạo xong là tạo thư mục OneDrive. Quản lý đăng nhập **ứng dụng tài năng** bằng tài khoản này để đăng bài. Số lần tạo video hiện ở danh sách và cài đặt; アデッソ tự quyết toán nội bộ | UC-12, 3-1, 5-4, chức năng 1-2, 9-1; 確認52 |

### Trang 9 – Màn hình quản trị: nhóm tài năng, chỉ dẫn AI, dừng toàn bộ

| Màn hình | Nội dung | Nguồn [YK2] và 確認 |
| --- | --- | --- |
| **M-13** カテゴリーの管理 (quản lý nhóm tài năng) | Danh sách nhóm (người mẫu, diễn viên, idol, ca sĩ, người phát trực tiếp), số người, sửa/xóa, kéo để sắp thứ tự, thêm nhóm với tên và màu. Lấy từ thiết kế của khách, **chờ khách trả lời mới làm** | UC-10; 確認47  Làm (CR-17, [KS] 確認47). |
| **M-14** AIへの指示（一覧）(danh sách chỉ dẫn AI) | Các chỉ dẫn theo phạm vi: toàn bộ, theo nhóm, theo tài năng; người sửa cuối, ngày sửa, bật/tắt. Quy tắc khi trùng: **tài năng > nhóm > toàn bộ**; luôn kiểm tra từ cấm | UC-02, 5-5, 7-5; 確認6 (cần kiểm chứng kỹ thuật)  Làm (CR-18, [KS] 確認6–8). |
| **M-15** AIへの指示（入力）(soạn chỉ dẫn AI) | Chọn phạm vi, viết chỉ dẫn (tối đa 1.000 ký tự; con số này [AG] tự đặt, [YK2] không có). Nút "phần mẫu" chèn sẵn: giọng điệu, chủ đề, số lần nhắn, giờ đăng, điều tránh. Nút 試してみる (chạy thử) xem trước câu trả lời trên một tài năng. Lưu, quay lại bản trước, lịch sử thay đổi | UC-02, UC-10, 5-5, 7-5; 確認7, 8 |
| **M-16** すべての自動投稿の停止 (dừng toàn bộ đăng tự động) | Trạng thái hiện tại, nút dừng có hộp xác nhận: "không hẹn bài mới, hủy cả bài đã hẹn; bài đã hủy không đăng lại sau khi chạy lại". Lịch sử dừng và chạy lại kèm người thao tác. Mọi quản lý đều bấm được. Dừng theo từng tài năng làm ở M-10 | UC-08, 5-6, chức năng 7-5, 1-6 |

### Trang 10 – Màn hình quản trị: cài đặt chung, quản lý, nhật ký xem

| Màn hình | Nội dung | Nguồn [YK2] và 確認 |
| --- | --- | --- |
| **M-17** 全体の設定 (cài đặt chung) | Giờ nhắn buổi sáng (8:00; [KS] 確認18: gửi theo khung sáng, trưa, tối), mốc nhắc gửi ảnh (2 giờ trước giờ đăng), số ngày không đăng để AI nhắn (3) và để báo quản lý (7), ngày tổng kết tuần (thứ Hai). Danh sách từ cấm dùng chung (ví dụ "chắc chắn có lãi", "chắc chắn khỏi bệnh"), FutureCore đưa mẫu, khách tự xem lại | 5-2, 5-6, chức năng 4-4, 3-9, 6-5; 確認18, 19, 4 |
| **M-18** マネージャーの管理 (quản lý tài khoản quản lý) | Thêm quản lý (tên, email), vô hiệu hóa. Vô hiệu hóa thì không đăng nhập được, không nhận thông báo; dữ liệu tài năng không đổi. Một loại quyền, ai cũng làm được mọi việc | UC-13, chức năng 1-6 |
| **M-19** 閲覧の記録 (nhật ký xem) | Ai xem màn nào của tài năng nào, lúc nào. Lọc theo khoảng ngày và tài năng. Ghi tự động, không sửa được | 3-2, chức năng 7-6; 確認44 |

### Trang 11 – Màn hình quản trị trên điện thoại

Ba ví dụ, các màn khác làm theo cùng kiểu: **M-02** danh sách thông báo (lọc bằng thẻ trên đầu), **M-05** duyệt bài (nút duyệt và trả lại để duyệt kịp khi ở ngoài), **M-06** danh sách tài năng dạng thẻ (ví dụ thẻ đỏ "7 ngày liên tục không đăng"). Menu nằm ở dưới. Căn cứ: [YK2] 9-1 nói quản trị chủ yếu dùng máy tính nhưng phải dễ xem trên trình duyệt điện thoại.

### Trang 12 – Những chỗ đã đổi so với thiết kế của khách

Bảng 3 cột: nội dung trong thiết kế của khách, nội dung trong [AG], mục nguồn trong bản yêu cầu. Phong cách màu, hình, nhân vật và cách bố trí menu giữ nguyên. Các thay đổi chính:

| Chỗ | Thiết kế của khách | [AG] đổi thành | Nguồn [YK2] |
| --- | --- | --- | --- |
| T-01〜T-04 | Màn đăng ký chỉ có nút đăng nhập | Tách thành đăng ký, đăng nhập, đặt mật khẩu, 4 bước đầu | UC-01, UC-03, 6-1 |
| T-06, T-07 | Người theo dõi và mức đạt tính **gộp 3 mạng** | Tách **từng mạng**, mỗi mạng mục tiêu 10.000 | 2-4, 3-10 |
| T-07, T-08 | 2 bản nháp mỗi ngày (thường và video) | Chọn 1 trong 3 chủ đề mỗi sáng, thêm nhiệm vụ và thử thách | UC-04, 5-3 |
| T-07, T-11, T-12 | Hiện 12 lượt video miễn phí và số còn lại; "tài khoản miễn phí không tạo video được" | Bỏ lượt miễn phí và phân loại miễn phí. Hiện giá ước tính trước khi tạo. Thêm màn chọn loại video | UC-06, 5-4, 5-7, 6-8 |
| T-09 | Ô xin duyệt hiện với mọi người | Chỉ hiện với tài năng bật duyệt; hiện lý do trả lại và lý do dính từ cấm | UC-07, 6-6 |
| T-10 | Chỉ chọn từ máy | Thêm chụp ngay, dùng lại tư liệu cũ, lưu video tự làm | UC-06, 6-7 |
| T-14 | Không có | Thêm màn thông báo | 6-1, 別紙A |
| T-15 | "Trả phí – đang dùng", trần phí video tháng, danh sách hóa đơn, nút hủy dịch vụ; "cước nhà mạng là chính, thẻ là tùy chọn" | Bỏ phân loại và trần. Hóa đơn xem ở trang công ty thanh toán. Muốn ngừng thì báo quản lý. "Thanh toán bằng cước nhà mạng và thẻ" | UC-11, UC-13, 5-4, 6-3 |
| M-02 | Có loại thông báo "LINE bị chặn", "dừng vì từ ngữ" | 9 loại mới, thêm nút đã xử lý, bỏ LINE | 7-4, 別紙A, 6-14 |
| M-03 | Không có | Thêm màn duyệt hoặc từ chối đơn | UC-01 |
| M-05 | Chỉ có nút duyệt | Thêm nút trả lại kèm lý do | 7-7, 6-14 |
| M-06 | Cột trả phí/miễn phí, cột LINE | Bỏ; thêm trạng thái, số ngày không đăng, tài khoản công ty | 5-4, 7-3, 7-1 |
| M-07〜M-10 | 3 thẻ: Thông tin, Bài đăng, Cài đặt | Thêm thẻ Hội thoại | 3-2, 7-1 |
| M-10 | "Đổi sang miễn phí", trần phí video, hủy đăng ký LINE, "12 lượt miễn phí, vượt 2 lượt" | Bỏ hết; thay bằng đổi trạng thái, mục tiêu và hạn từng mạng, dừng đăng từng tài năng, số lần video và chi phí AI tháng này | 5-4, 5-6, 6-2, 7-5 |
| M-11, M-12, M-17 | Không có | Thêm màn bài dính từ cấm, tạo tài khoản công ty, cài đặt chung | 4-4, UC-12, 5-6 |
| M-16 | Chỉ quản lý có "quyền dừng toàn bộ" mới bấm được | Mọi quản lý bấm được (chỉ một loại quyền) | 1-6, 6-14 |
| M-18 | Cột "quyền dừng toàn bộ", nút "xóa" | Bỏ cột quyền; "xóa" đổi thành "vô hiệu hóa" | 1-6, UC-13 |
| M-19 | Lọc theo khoảng ngày và người xem | Lọc theo khoảng ngày và tài năng | 7-6 |
| M-13〜M-15 | Nhóm tài năng và chỉ dẫn AI | Giữ nguyên như thiết kế, gắn chữ đỏ 【要確認】 (cần xác nhận) | 確認6〜8, 47 |

## 3. Những điểm đáng chú ý

### 3.1 Điểm [AG] làm rõ hơn bản yêu cầu

Điểm 2–5 có căn cứ trong [YK2], [AG] chỉ thể hiện ra màn hình. Điểm 1 là cách hiểu của [AG]: [YK2] không ghi giờ đăng được chốt từ lúc nào.

1. **Giờ đăng hiện trước khi chấp nhận** (T-07: "giờ đăng 19:00 – gửi ảnh thì chấp nhận được"; T-14: nhắc lúc 17:00 cho bài 19:00). Tức là giờ đăng được chọn từ trước, nhờ vậy mốc nhắc "2 giờ trước giờ đăng" ở [YK2] 5-2 mới tính được. Cần ghi điều này vào [YK2] (câu B1 trong file 15).
2. **Bật chế độ duyệt bài ngay khi duyệt đơn đăng ký** (M-03), sau đổi được ở M-10.
3. **Quản lý sửa được chú thích bài dính từ cấm** (M-11), và tài năng cũng tự sửa chữ bản nháp được ([KS] 確認28).
4. **Thứ tự ưu tiên chỉ dẫn AI: tài năng > nhóm > toàn bộ** (M-14). Đây là đề xuất trong 確認6, trả lời một phần cho xung đột D9 ở tab Edge case.
5. **Tài khoản công ty đăng nhập ứng dụng tài năng** để đăng bài (M-12), không đăng từ màn hình quản trị.

### 3.2 Điểm cần lưu ý hoặc cần hỏi

| STT | Vấn đề | Căn cứ |
| --- | --- | --- |
| 1 | **Mã màn hình trùng nghĩa với thiết kế của khách** (M-10, M-11, M-03…). Cần chọn một bộ mã dùng chung với khách, và sửa các tab phân tích đang dùng mã theo [TK-M] | [AG] trang 1 ↔ [TK-M] |
| 2 | **Tên trạng thái rời đi:** M-06 và M-10 dùng 利用終了 (đã kết thúc) theo chức năng 7-3, còn UC-13 và 確認53–56 dùng 退会 (rời khỏi hệ thống). Mâu thuẫn trong [YK2] vẫn còn | [AG] trang 7, 8 ↔ [YK2] UC-13 |
| 3 | **Chấp nhận bài sau giờ đăng** vẫn chưa có trên màn hình (T-07, T-09 không thể hiện). Câu hỏi Q1 trong file 13 vẫn mở | [AG] trang 3, 4; file 13 |
| 4 | **Bản nháp không chấp nhận** và **nhắc khi đã gửi ảnh nhưng chưa chấp nhận**: T-14 chỉ có nhắc gửi ảnh. Câu hỏi Q2, Q3 trong file 13 vẫn mở | [AG] trang 5; file 13 |
| 5 | **Quan hệ với [SD]** (11/11, cũng dùng mã T-xx, M-xx): [AG] có thay thế [SD] không thì tài liệu không nói | [AG] trang 1 |
| 6 | **Hồ sơ tài năng chỉ xem trên màn hình quản trị** (M-07). Sửa hồ sơ phải qua ChatGPT. Phù hợp với [YK2], nhưng khiến việc của quản lý phụ thuộc hoàn toàn vào ChatGPT project (rủi ro T2, R12 ở tab Edge case) | [AG] trang 7; [YK2] UC-02, 2-3 |
| 7 | **Danh sách 9 loại thông báo cho quản lý** (M-02) khớp đúng 9 dòng gửi quản lý trong 別紙A (phụ lục A), kể cả "SNS bị ngắt" (chức năng 7-4 của [YK2] lại thiếu loại này). Nhưng cả M-02 và T-14 đều **thiếu thông báo "quá giờ đăng mà chưa duyệt"**, dù chú thích của chính M-05 và chức năng 7-7 nói phải báo tài năng và quản lý. Cũng chưa có thông báo cho tài năng khi bài hẹn giờ bị quản lý hủy hoặc bị dừng đăng (câu A6 trong file 15) | [AG] trang 5, 6, 7; [YK2] 別紙A, 7-4, 7-7 |
| 8 | **Màn đầu tiên khi mở ứng dụng:** [AG] T-02 chuyển thẳng sang T-06 マイページ (Trang của tôi: người theo dõi, ô đi tới các màn). Việc của hôm nay lại nằm ở T-07 ホーム. [YK2] 6-12 chức năng 6-8 nói màn mở đầu tiên phải cho thấy ngay việc hôm nay, còn 6-14 nói đi từ Trang của tôi sang các màn khác. Chú thích T-07 cũng dẫn chức năng 6-8. Cần chốt màn nào mở đầu tiên (câu B13 trong file 15) | [AG] trang 2, 3; [YK2] 6-8, 6-14 |
| 9 | **Ai đặt lịch lại bài đăng lỗi:** [AG] chỉ cho quản lý (M-08 予約し直す). T-13 không có nút cho tài năng. [YK2] 8-5 nói "tài năng hoặc quản lý". Câu này đã có ở file 11 mục 4.2 số 3; [AG] đã chọn cách "chỉ quản lý" | [AG] trang 5, 7; [YK2] 8-5, 確認30 |
| 10 | **Bài dính từ cấm sau khi quản lý sửa:** M-11 hẹn giờ ngay, thêm lựa chọn 予約しない (không đăng) mà [YK2] không có. Chưa rõ có kiểm tra từ cấm lại và có báo tài năng không (câu B5 trong file 15) | [AG] trang 8; [YK2] 4-4 |
| 11 | **Màn đặt lại mật khẩu** (mở từ email "quên mật khẩu") chưa được vẽ, T-02 chỉ có đường dẫn. Mục nhỏ, bổ sung khi làm 画面定義 (định nghĩa màn hình) | [AG] trang 2; [YK2] 1-4 |

## 4. Gợi ý dùng tài liệu này

- Dùng [AG] làm căn cứ chính cho phần màn hình thay cho [TK-T], [TK-M] khi hai bên khác nhau, vì [AG] đã sửa theo [YK2] (đúng nguyên tắc [YK2] 6-14).
- Các mục chữ đỏ 【要確認】 trùng với các 確認 đang chờ khách trả lời. Khi khách trả lời, cập nhật luôn màn hình tương ứng.
- Tab Giao diện (file 10) đã có bảng đối chiếu ba bộ mã ([TK], [SD], [AG]) và tình trạng 17 điểm thiếu sau khi có [AG] (mục 8). Khi chốt được điểm 3.2 số 1 thì viết lại các bảng của file 10 theo mã [AG].
- Các câu hỏi phát sinh từ [AG] đã đưa vào bảng câu hỏi `15_Cau_hoi_lam_ro_luong.xlsx` (A1, A3, A6, A10, B1, B2, B5, B9, B13).
