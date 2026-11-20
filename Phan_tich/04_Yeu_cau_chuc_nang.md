# Yêu cầu chức năng theo module

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **6-2** — Bắt buộc đăng ký phương thức thanh toán và mở từ biểu tượng màn hình chính; thêm biểu tượng bằng hướng dẫn thủ công theo máy. SNS và cho phép thông báo có thể làm sau. Thanh toán đăng ký xong tự kích hoạt, tạo folder và báo Manager; sau khởi tạo mở Mypage T-08, không phải Home T-09. Office bỏ bước thanh toán. Còn mở: Cần kiểm thiết bị/PWA quay lại sau kết nối, không coi hình minh họa là kiểm chứng tương thích. Căn cứ: `T19:5,6,8,9,11,26,33;BF19:4`.
- **4-1** — AI tạo chữ/hashtag, dùng ảnh/video Talent gửi; không tự biến ảnh thành slideshow trong luồng bài thường. Bài ảnh không đăng YouTube. Còn mở: Thứ tự ảnh→chữ hay chữ→ảnh còn KS 20261120 No.7; hiển thị kịch bản/video-idea còn No.35,36, không coi giá hiển thị là đã tạo video. Căn cứ: `T19:12,13,17,18,27,30;BF19:6,7`.
- **4-4** — Manager sửa bài bị từ cấm, AI kiểm lại; sạch thì đặt lịch, còn từ cấm thì giữ ở màn xử lý. Không cần trả bản Manager sửa cho Talent xác nhận lại theo GJ19§12. Còn mở: Quyền Talent tự sửa chính bài đã bị chặn chưa được mô tả rõ như quyền sửa bản nháp thường; chỉ giữ phần này ở No.57. Căn cứ: `M19:16,23;BF19:17;GJ19:12`.
- **5-1** — T-14 bản 19/11 chỉ mô tả video ngắn từ ảnh; tạo khi Talent yêu cầu và xem giá trước. Còn mở: CONFLICT: QA No.36/CR-04 trước có cả video ngắn và slideshow; nguồn 19/11 chỉ nêu short. Không tự xóa slideshow hoặc suy đã duyệt đổi phạm vi. Căn cứ: `T19:20;BF19:12`.
- **7-4** — Bỏ nút đánh dấu xử lý; mở dòng thông báo sang màn liên quan thì đánh dấu đã xử lý và bỏ khỏi số chưa xử lý. Lọc mặc định chưa mở, bỏ lọc xem cả đã mở. Yêu cầu duyệt nằm danh sách M-04 riêng. Thông báo và email gửi Manager phụ trách, không mọi người. Còn mở: Phân công category/cá nhân và fallback vẫn No.6; email loại nào và câu chữ còn cần rà mẫu. Không tự chốt đã xử lý chung hay riêng từng Manager. Căn cứ: `M19:6,8;BF19:14;GJ19:6,7`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

> **Quyết định20/11 — DEC-0001:** người dùng chốt áp dụng H65, không giới hạn số lần nhờ AI viết lại. Thay giới hạn hai lần trong đúng chủ đề; các điều kiện sửa/duyệt và chính sách chi phí khác giữ nguyên. Xem [bản ghi quyết định](../docs/requirement-review/corrections-2026-11-19/REPORT.md).

54 chức năng được chia thành 12 module, theo đúng 12 nhóm ở mục 6 của [YK2]. Mỗi chức năng được phân tích theo 6 mục: tác nhân, đầu vào, điều kiện, luồng xử lý chính, đầu ra và kết quả mong đợi. Tab này đã viết lại theo bản yêu cầu v2. Mã và số chức năng không đổi, nhưng nội dung của 1-4, 1-2, 1-3, 2-2, 3-7, 4-1, 4-2, 7-2, 7-4, 7-5, 8-4 và 6-8 đã đổi.

**Cách đọc:**

- [YK2] = AI育成OS_概要要件定義書_v2.docx. Số 確認 (mục cần xác nhận) theo đánh số của v2. 前提 là phần tiền đề ở cuối mỗi UC.
- "Tác nhân" là vai trò trong tab "Vai trò và phân quyền". Ưu tiên ghi là 高 (cao), 中 (trung bình) hoặc 低 (thấp).
- Nội dung lấy từ mô tả chức năng ở mục 6. Khi mục 6 không nói tới, mình lấy từ tình huống sử dụng (UC) ở mục 4, quy tắc nghiệp vụ ở mục 5 hoặc dữ liệu ở mục 7, và ghi rõ nguồn.
- Chỗ nào tài liệu không nói thì ghi **⚠ chưa nêu**, không tự điền. Bước chỉ dựa trên một 確認 thì ghi ⚠ kèm số 確認.
- [YK2] chưa có 受入基準 (tiêu chí nghiệm thu) cho bất kỳ chức năng nào. Vì vậy "kết quả mong đợi" ở đây chỉ là trạng thái sau khi chức năng chạy xong theo mô tả, chưa phải tiêu chí để nghiệm thu.

| STT | Module (tên trong [YK2]) | Số chức năng | Mã chức năng |
| --- | --- | --- | --- |
| 1 | Đăng ký và đăng nhập (6-1 ログイン機能) | 3 | 1-4, 1-5, 6-2 |
| 2 | Phân quyền (6-2 権限管理機能) | 3 | 1-6, 7-3, 7-6 |
| 3 | Thu phí (6-3 課金機能) | 4 | 1-1, 1-2, 1-3, 5-4 |
| 4 | Thông tin tài năng (6-4 タレント情報管理機能) | 5 | 2-1, 2-2, 2-3, 2-4, 7-1 |
| 5 | Huấn luyện viên AI (6-5 AIコーチ機能) | 9 | 3-1 đến 3-9 |
| 6 | Bản nháp bài đăng (6-6 投稿案作成機能) | 5 | 4-1 đến 4-4, 6-6 |
| 7 | Tư liệu (6-7 素材管理機能) | 3 | 6-3, 6-4, 6-5 |
| 8 | Tạo video (6-8 動画生成機能) | 4 | 5-1, 5-2, 5-3, 5-5 |
| 9 | Duyệt bài (6-9 承認機能) | 1 | 7-7 |
| 10 | Đăng bài hẹn giờ (6-10 予約投稿機能) | 8 | 8-2 đến 8-6, 7-5, 7-2, 9-1 |
| 11 | Số liệu (6-11 実績分析機能) | 6 | 8-7, 8-8, 3-10, 6-7, 8-1, 8-9 |
| 12 | Thông báo và nền tảng ứng dụng (6-12 通知・アプリ基盤機能) | 3 | 6-1, 7-4, 6-8 |

Mục 6-13 (danh sách 17 loại thông báo, 別紙A – phụ lục A) và mục 6-14 (quy tắc chung cho màn hình) không phải chức năng riêng. Chúng áp dụng cho mọi module. Màn hình chỉ dẫn cho AI, nhóm tài năng và thử thách chưa có mã chức năng trong [YK2], nên ghi ở phần "Các điểm chưa rõ chung". Theo bảng xác nhận 17/11: CR-17 (nhóm tài năng: M-10 thiết kế khách = M-13 [AG]), CR-18 (màn chỉ thị cho AI: M-11 thiết kế khách = M-14, M-15 [AG]), CR-19 (duyệt theo nhóm hoặc quản lý phụ trách) và CR-21 (tài năng sửa chữ trực tiếp) **làm**; CR-20 (nhiều tài khoản trên một mạng) **không làm**; CR-22 (thử thách) đã chốt hướng, chờ khái niệm アデッソ viết; CR-23 (video tự làm thành bản nháp mỗi ngày) vẫn chờ khách (Q&A No.50); CR-24 (hội thoại riêng tư) **không làm** vì quản lý xem toàn bộ hội thoại (Q&A No.7 đóng 17/11); CR-25 **không cần** vì 画面定義書 do FutureCore làm (Q&A No.68 đóng 17/11). Ảnh hưởng tới báo giá và lịch của các CR nay làm: chưa rõ ([KS], tệp 21).

## Module 1. Đăng ký và đăng nhập (6-1 ログイン機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **1-4** Đăng ký, duyệt đơn và đăng nhập (高) | Người đăng ký, quản lý (duyệt hoặc từ chối), tài năng | Đơn: tên (nghệ danh hoặc tên thật), email, ngày sinh, đồng ý điều khoản. Đăng nhập: email, mật khẩu. Lần đầu: mật khẩu tạm và mật khẩu mới | Email chưa dùng. Đơn đã được quản lý duyệt. Trạng thái không phải 利用終了 (đã kết thúc) | 1) Người đăng ký gửi đơn trên ứng dụng. 2) Đơn hiện trong thông báo của màn hình quản trị. 3) Quản lý duyệt hoặc từ chối. 4) Hệ thống gửi email mẫu: duyệt thì kèm mật khẩu tạm, từ chối thì báo không được duyệt. 5) Lần đầu đăng nhập bằng mật khẩu tạm và đặt mật khẩu mới (ít nhất 8 ký tự, có cả chữ và số). 6) Sai 5 lần liên tiếp thì khóa 15 phút. 7) Quên mật khẩu thì tự đặt lại qua email | Đơn đăng ký, email kết quả, phiên đăng nhập giữ 30 ngày trên cùng thiết bị | Chỉ người được duyệt mới đăng nhập được. Tài năng chỉ thấy bản nháp, hội thoại và số liệu của mình. Đổi điện thoại thì đăng nhập lại và dùng tiếp (UC-01, UC-03 前提, UC-13 前提) |
| **1-5** Nhận diện tài năng (高) | Huấn luyện viên AI, hệ thống | Phiên đăng nhập của tài năng | Tài năng đã đăng nhập | Xác định tài năng từ phiên đăng nhập, rồi chỉ dùng thư mục của tài năng đó để trả lời và viết bản nháp | Câu trả lời và bản nháp dựa trên dữ liệu của đúng tài năng | Nhiều tài năng dùng cùng lúc cũng không lộ thông tin của nhau trong hội thoại hay bản nháp |
| **6-2** Hướng dẫn lần đầu và kết nối mạng xã hội (高) | Tài năng | Thao tác của tài năng trên từng bước | Đăng nhập lần đầu, hoặc lần trước làm chưa xong | Hướng dẫn lần lượt: 1) thêm ứng dụng vào màn hình chính; 2) cho phép thông báo; 3) đăng ký thanh toán (trừ tài khoản công ty); 4) kết nối mạng xã hội. Bỏ dở thì lần sau làm tiếp từ bước đang dở. Trước đó hiện thông báo "quản lý đọc được hội thoại" để tài năng bấm xác nhận ⚠ | Trạng thái hoàn thành của từng bước | Ứng dụng đã trên màn hình chính, đã có phương thức thanh toán, đã kết nối mạng xã hội. Không bật thông báo vẫn dùng được, hướng dẫn bật xem lại được trong ứng dụng |

Nguồn: [YK2] 6-1 (1-4, 1-5, 6-2), UC-01, UC-03 前提, 確認1, 12, 13.

**Điểm chưa rõ:**

- 1-4: đơn chờ duyệt quá lâu thì sao, đơn bị từ chối giữ bao lâu, người bị từ chối có đăng ký lại được không. Có chặn đăng ký rác không, vì đường dẫn ứng dụng có thể lộ ra ngoài. Mật khẩu tạm có hạn không.
- 1-4: đăng nhập một tài khoản trên nhiều thiết bị cùng lúc có được không. Đổi email thì ai làm.
- 1-4: người ngoài công ty và người vị thành niên tự đăng ký thì đồng ý về dữ liệu và đồng ý của phụ huynh lấy ở đâu (2-3, 10-3 chỉ nói tới hợp đồng). Điều khoản sử dụng do アデッソ soạn (確認1).
- 6-2: tài năng bỏ qua bước kết nối mạng xã hội thì vẫn dùng được ⚠ (確認11), nhưng chưa rõ có nhắc lại không.

## Module 2. Phân quyền (6-2 権限管理機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **1-6** Đăng nhập và quyền của quản lý (高) | Quản lý | Email, mật khẩu, mã 6 số từ ứng dụng xác thực. Khi thêm quản lý: thông tin quản lý mới ⚠ chưa nêu các trường | Quản lý đang hoạt động (chưa bị vô hiệu hóa) | 1) Đăng nhập hai bước. Quy tắc mật khẩu và khóa khi sai giống tài năng. 2) 30 phút không thao tác thì phải đăng nhập lại. 3) Thêm hoặc vô hiệu hóa quản lý trên màn hình quản trị | Phiên đăng nhập màn hình quản trị. Danh sách quản lý | Chỉ quản lý vào được màn hình quản trị. Mọi quản lý xem được mọi tài năng ⚠ (確認41). Quản lý bị vô hiệu hóa không đăng nhập được và không nhận thông báo nữa (UC-13 前提) |
| **7-3** Đổi trạng thái tài năng (高) | Quản lý. Phần hủy và dừng do hệ thống tự làm | Tài năng được chọn, trạng thái mới: 利用前 (trước khi dùng), 利用中 (đang dùng) hoặc 利用終了 (đã kết thúc) | Quản lý đã đăng nhập. Quản lý xác nhận trên màn hình xác nhận | 1) Chọn tài năng và trạng thái mới. 2) Hiện màn hình xác nhận. 3) Nếu chuyển sang 利用終了 thì dừng nhắn tin, dừng thu phí, hủy bài đã hẹn, chặn đăng nhập. 4) Có thể chuyển từ 利用終了 về 利用中 ⚠ | Trạng thái mới của tài năng | Tài năng đã kết thúc không còn bài đã hẹn, không nhận tin, không bị thu phí, không đăng nhập được. Dữ liệu được giữ 一定の期間 (một khoảng thời gian nhất định, mục 7-3) |
| **7-6** Nhật ký xem thông tin (中) | Hệ thống ghi, quản lý xem | Sự kiện quản lý mở màn hình thông tin, hội thoại hoặc số liệu của tài năng. Khi xem: khoảng thời gian và tài năng | Quản lý mở một trong ba màn hình trên | 1) Ghi lại ngày giờ, quản lý và tài năng. 2) Quản lý tìm theo khoảng thời gian và tài năng | Danh sách các lần xem | Nhật ký không sửa được, kiểm tra lại được ai đã xem gì (3-2, 確認44) |

Nguồn: [YK2] 6-2 (1-6, 7-3, 7-6), UC-13 前提, 確認41, 44, 53–56.

**Điểm chưa rõ:**

- 1-6: các trường thông tin khi thêm quản lý, cách gửi lời mời, cách đăng ký ứng dụng xác thực, cách xử lý khi mất điện thoại xác thực, ai tạo quản lý đầu tiên.
- 7-3: đơn chờ duyệt và đơn bị từ chối có phải là trạng thái không. Ai chuyển từ 利用前 sang 利用中, và lúc nào. Sơ đồ trạng thái "sẽ viết ở bản cuối" (mục 5-1). Khi chuyển từ 利用終了 về 利用中 thì thu phí lại từ khi nào. UC-13 dùng từ 退会 (rời đi) thay cho 利用終了. Thời gian giữ dữ liệu đang hỏi khách (確認55).
- 7-6: thao tác xem file trực tiếp trên OneDrive không đi qua hệ thống nên không được ghi. Thời gian lưu nhật ký chưa có (mục 9-4).

## Module 3. Thu phí (6-3 課金機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **1-1** Thu phí thuê bao tháng (高) | Tài năng, hệ thống, cổng thanh toán | Phương thức thanh toán (cước nhà mạng hoặc thẻ), nhập trên màn hình của cổng thanh toán | Mọi tài năng (trừ tài khoản công ty). Đến ngày chốt sổ | 1) Tài năng đăng ký phương thức thanh toán trên màn hình của cổng thanh toán. 2) Đến ngày chốt sổ, hệ thống tính số tiền và gửi cho cổng thanh toán để thu. 3) Thu lỗi thì báo tài năng và quản lý, không tự dừng sử dụng. 4) Tài năng đổi được phương thức thanh toán trong ứng dụng. 5) Tài năng xem lịch sử hóa đơn bằng cách chuyển qua trang của cổng thanh toán | Yêu cầu thu tiền, kết quả thu, thông báo khi thu lỗi | Mỗi tháng thu được phí thuê bao. Tháng bắt đầu giữa chừng vẫn thu trọn tháng ⚠ (確認48). Hệ thống không lưu thông tin thẻ |
| **1-2** Loại tài khoản (高). Tên trong [YK2] vẫn là 有償と無償の区分 (phân loại trả phí / miễn phí) | Quản lý (tạo tài khoản công ty), hệ thống | Thông tin tài khoản công ty ⚠ chưa nêu các trường | — | 1) Người đăng ký qua ứng dụng đều là tài năng có trả phí. 2) Quản lý tạo tài khoản công ty trên màn hình quản trị: không hiện bước đăng ký thanh toán, không thu phí tháng. 3) Tài năng không tự chọn hay đổi loại | Loại tài khoản được lưu | Tài khoản công ty dùng đủ chức năng như tài năng, không bị thu phí tháng |
| **1-3** Đổi loại (中) | — | — | — | [YK2] ghi không còn phân loại trả phí / miễn phí nên không đổi từ trả phí sang miễn phí. Chức năng còn tên nhưng không còn việc để làm | — | Tài khoản công ty muốn trả phí thì đăng ký mới như tài năng (5-4) |
| **5-4** Đếm số lần tạo video và thu gộp với phí tháng (高) | Tài năng, hệ thống, quản lý (xem) | Yêu cầu tạo video đã được xác nhận giá | Đã xem đơn giá mỗi lần tạo và bấm yêu cầu | 1) Hiện đơn giá trên màn hình tạo video. 2) Xác nhận thì tính là một lần, tạo lại cũng tính. 3) Dịch vụ tạo video lỗi thì không tính. 4) Cuối tháng cộng phí video vào phí tháng. 5) Tài khoản công ty: chỉ đếm và hiện trên màn hình quản trị, không thu | Số lần và tổng phí trong tháng: tài năng xem trong ứng dụng, quản lý xem theo từng tài năng và tài khoản công ty | Hóa đơn tháng = phí thuê bao + số lần tạo video × đơn giá. Không có lượt miễn phí và không có mức trần. Phí video của tài khoản công ty do アデッソ quyết toán nội bộ |

Nguồn: [YK2] 5-4, 6-3 (1-1, 1-2, 1-3, 5-4), UC-11, UC-12 前提, 確認48–51.

**Điểm chưa rõ:**

- 1-1: chu kỳ một tháng tính từ ngày đăng ký ([KS] 確認48, chờ đơn vị thanh toán). Ngày thu tiền và mức phí tháng chưa có. Cổng thanh toán có thu được số tiền thay đổi theo tháng không (確認49). Thu lỗi thì có thu lại không, sau bao lâu. Phí tháng đầu tính từ lúc đăng ký thanh toán hay từ lúc có bản nháp đầu tiên.
- 1-1, 7-3: rời đi giữa tháng thì thu trọn tháng đó (khách ghi đồng ý, chưa chốt; 確認50). Phí video đã phát sinh trong tháng đó cũng thu chung?
- 1-2, 1-3: [YK2] còn giữ tên chức năng cũ. Nên đổi tên hoặc bỏ 1-3 để khớp nội dung.
- 5-4: đơn giá mỗi lần tạo video do アデッソ quyết, chưa có. Quản lý chỉ tạo video thay cho tài khoản công ty ([KS] 確認27); phí do アデッソ quyết toán nội bộ.

## Module 4. Thông tin tài năng (6-4 タレント情報管理機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **2-2** Tạo thư mục riêng cho tài năng (高) | Hệ thống, quản lý (cài duyệt bài, tạo tài khoản công ty) | Đơn đăng ký (tên, email, ngày sinh). Khi duyệt: có dùng duyệt bài hay không | Tài năng: đã đăng ký thanh toán. Tài khoản công ty: vừa được quản lý tạo | 1) Quản lý duyệt đơn và cài có dùng duyệt bài hay không. 2) Tài năng đăng ký thanh toán xong thì hệ thống tạo thư mục trên OneDrive. 3) Quản lý tạo ChatGPT project cho tài năng và gắn thư mục (UC-01 前提) | Bản ghi tài năng, thư mục OneDrive | Quản lý không cần tự tạo thư mục. Tài năng sẵn sàng để nhập hồ sơ |
| **2-3** Nhập thông tin từ ChatGPT (高) | Quản lý (qua ChatGPT) | Tài năng được chỉ định, cùng hồ sơ: profile, định hướng, sở thích, sở trường, mục tiêu tương lai (viết tự do). Có thể có チャレンジ (thử thách) ⚠ | Tài năng đã có thư mục và ChatGPT project | 1) Quản lý trò chuyện với ChatGPT trong project của tài năng. 2) ChatGPT hiển thị sẽ ghi gì cho tài năng nào. 3) Quản lý xác nhận. 4) Ghi vào file trong thư mục tài năng. Bổ sung hoặc sửa cũng làm cách này | File hồ sơ trên OneDrive | Từ sáng hôm sau, huấn luyện viên AI dùng hồ sơ mới. Chưa có hồ sơ thì chưa có bản nháp (UC-01 前提, UC-02 前提) |
| **2-4** Đăng ký mục tiêu (高) | Quản lý | Mục tiêu số người theo dõi cho từng mạng xã hội (mặc định 10.000 ⚠) và hạn đạt | Tài năng đã được duyệt | Quản lý nhập trên màn hình cài đặt tài năng. Tài năng không đổi được | Mục tiêu được lưu | Mức đạt trên ứng dụng và màn hình quản trị cập nhật ngay. Thông báo đạt mục tiêu và bản tổng kết tuần dùng mục tiêu mới (確認3) |
| **2-1** Đọc thông tin tài năng (高) | Xử lý tự động, huấn luyện viên AI | File trong thư mục tài năng, thư mục chung và file bộ nhớ do AI ghi | Trước giờ nhắn tin buổi sáng | Đọc toàn bộ file mỗi sáng. Nội dung đã sửa đến hôm trước được dùng trong ngày | Dữ liệu đầu vào cho tin nhắn và bản nháp trong ngày | Thay đổi trong file có tác dụng từ sáng hôm sau, không cần lập trình lại (7-5) |
| **7-1** Xem thông tin tài năng (高) | Quản lý | Tài năng được chọn. Điều kiện tìm: họ tên. Bộ lọc: trạng thái, số ngày không đăng bài. lọc theo nhóm (CR-17, [KS] 確認47) | Quản lý đã đăng nhập | 1) Xem danh sách, tìm và lọc. 2) Chọn tài năng. 3) Hiện hồ sơ, mục tiêu, trạng thái kết nối mạng xã hội, hội thoại với AI, nhãn dưới 18 tuổi (tính từ ngày sinh, chỉ để tham khảo, [KS] 確認2). 4) Ghi nhật ký xem (7-6) | Màn hình chi tiết tài năng | Quản lý nắm tình hình tài năng để đưa lời khuyên (UC-10) |

Nguồn: [YK2] 6-4 (2-1 đến 2-4, 7-1), UC-01 前提, UC-02 前提, 確認2, 3, 5, 47.

**Điểm chưa rõ:**

- 2-2: quản lý biết lúc nào thư mục đã được tạo để tạo ChatGPT project và nhập hồ sơ. Chưa có thông báo nào cho việc này. Đăng ký tài năng với Upload-Post lúc nào (8-2 còn ghi theo luồng cũ).
- 2-3: cơ chế kết nối ChatGPT project với OneDrive, cách xác thực và cách nhận diện đúng tài năng chưa được thiết kế. Định dạng file hồ sơ chưa có (file kinh nghiệm đăng bài thì bên phát triển sẽ gửi mẫu). チャレンジ nhập qua ChatGPT hay AI tự đề xuất (確認5).
- 2-1: xử lý buổi sáng bắt đầu lúc mấy giờ. Đọc OneDrive lỗi thì làm gì. Quản lý và AI cùng ghi một file thì xử lý xung đột ra sao.
- 7-1: danh sách tài năng hiển thị những cột nào, "sẽ quyết khi xem màn hình thật" (UC-10).

## Module 5. Huấn luyện viên AI (6-5 AIコーチ機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **3-1** Hiểu tài năng và thuật toán (高) | Huấn luyện viên AI | Hồ sơ, mục tiêu, kinh nghiệm đăng bài, chỉ dẫn thuật toán, hội thoại trước đó, số liệu | Mỗi lần nhắn tin hoặc viết bản nháp | Kết hợp các nguồn trên. Nếu アデッソ có chỉ dẫn (ví dụ chủ đề theo thứ trong tuần) thì ưu tiên chỉ dẫn đó hơn gợi ý của AI | Ngữ cảnh cho tin nhắn và bản nháp | Nội dung hợp với tài năng và tuân theo chỉ dẫn của công ty |
| **3-4** Trò chuyện với huấn luyện viên AI (高) | Tài năng, huấn luyện viên AI | Tin nhắn chữ của tài năng (tối đa 1.000 ký tự). Đến giờ nhắn theo khung sáng, trưa, tối ([KS] 確認18). Sự kiện đăng bài thành công | Tài năng đã đăng ký thanh toán (UC-03 前提). Trạng thái 利用中 (đang dùng) | 1) Tài năng nhắn và AI trả lời bằng văn bản. Không giới hạn số lần ⚠ (確認23). 2) Mỗi sáng (mặc định 8:00, kể cả cuối tuần và ngày lễ ⚠) gửi kết quả hôm trước, chủ đề gợi ý và tiến độ チャレンジ ⚠. 3) Khi đăng bài xong thì báo đã đăng và số ngày đăng liên tục. 4) Nếu dịch vụ AI lỗi thì báo trên màn hình và cho gửi lại sau | Tin nhắn trả lời, lịch sử hội thoại xem lại được | Tài năng chọn được chủ đề hôm nay. Khi đăng bài thì nhận lời chúc mừng và số ngày liên tục (UC-04, 確認14, 18, 21, 22) |
| **3-3** Giới hạn chủ đề trò chuyện (高) | Huấn luyện viên AI | Tin nhắn của tài năng | Mỗi tin nhắn | 1) Trả lời các chủ đề về đăng bài, mạng xã hội, hoạt động nghệ thuật, cùng lời chào và chuyện ngắn. 2) Nhờ viết văn hay làm video không liên quan thì từ chối bằng câu cố định và kéo về chủ đề đăng bài. Chuyện riêng tư không liên quan thì hạn chế ⚠ (確認23). 3) Chuyện sức khỏe hay muốn rời công ty thì vẫn tiếp tục trò chuyện và báo quản lý (確認17) | Câu trả lời hoặc câu từ chối. Thông báo "chuyện nghiêm trọng" cho quản lý | AI không bị dùng cho việc khác. Quản lý biết kịp thời khi có chuyện nghiêm trọng |
| **3-9** Nhắc tài năng lâu không đăng bài (中) | Xử lý tự động, huấn luyện viên AI | Số ngày liên tục không đăng bài. Cài đặt số ngày (mặc định 3 và 7, xác nhận lại theo [KS] 確認19; chỉ áp cho cách đăng 要確認) | Đủ số ngày đã cài đặt | 1) Đủ 3 ngày thì AI nhắn hỏi han tài năng. 2) Đủ 7 ngày thì báo quản lý. Bài tài năng tự đăng ngoài hệ thống cũng được tính là có đăng nếu Upload-Post đọc được (UC-09) | Tin nhắn cho tài năng, thông báo cho quản lý | Quản lý góp ý qua chỉ dẫn cho AI, hoặc liên hệ trực tiếp nếu gấp ⚠ (確認19, 43) |
| **3-2** Tự cải thiện (高) | Huấn luyện viên AI | Số liệu và hội thoại đến hôm trước | Mỗi ngày | 1) Áp dụng vào tin nhắn, chủ đề gợi ý và bản nháp sáng hôm sau. 2) Ghi thêm điều đã hiểu (sở thích, bài được tương tác tốt) vào file trong thư mục tài năng | File bộ nhớ được cập nhật | Gợi ý ngày càng hợp với tài năng và với những gì được tương tác tốt |
| **3-6** Nhận xét bài hôm trước và gợi ý cải thiện (高) | Huấn luyện viên AI | Số liệu bài đăng hôm trước | Hôm trước tài năng có đăng bài | Đưa số liệu cụ thể và điểm cần cải thiện vào tin nhắn buổi sáng | Đoạn nhận xét trong tin nhắn buổi sáng | Tài năng biết kết quả và cách làm tốt hơn |
| **3-8** Tổng kết tuần (中) | Huấn luyện viên AI | Số bài, số liệu, mức tăng giảm người theo dõi trong tuần, mục tiêu | Đến ngày đã cài đặt (mặc định thứ Hai) | Gửi bản tổng kết tuần | Tin nhắn tổng kết | Tài năng biết còn cách mục tiêu bao xa |
| **3-7** Thông báo khi đạt mục tiêu (中) | Xử lý tự động, huấn luyện viên AI | Số người theo dõi trên từng mạng xã hội, mục tiêu, チャレンジ | Đạt mục tiêu số người theo dõi, hoặc hoàn thành チャレンジ | 1) Đạt mục tiêu thì báo cả tài năng và quản lý. 2) Hoàn thành チャレンジ thì huấn luyện viên AI chúc mừng trong ứng dụng. V2 bỏ việc báo theo từng mốc | Thông báo, lời chúc mừng | Tài năng có thêm động lực. Quản lý biết khi tài năng đạt mục tiêu ⚠ (確認39)  Báo tăng người theo dõi ở mốc 25%, 50%, 75% mục tiêu; đạt mục tiêu báo tài năng và quản lý (Q&A No.14, No.42). |
| **3-5** Quản lý chi phí AI (中) | Xử lý tự động, quản lý (xem) | Mức sử dụng AI của từng tài năng | — | Tổng hợp theo tài năng và theo tháng, tách riêng khỏi phí ChatGPT hằng tháng | Bảng chi phí trên màn hình quản trị | Quản lý thấy được chi phí AI cho từng tài năng  Không có trần, không tự dừng (Q&A No.17). |
Nguồn: [YK2] 6-5 (3-1 đến 3-9), 5-2, 5-5, UC-04, UC-04 前提, 確認14–23, 39, 43.

**Điểm chưa rõ:**

- 3-4: không giới hạn số tin nhắn thì chi phí AI không có trần. Nhiệm vụ mỗi ngày và việc ghi nhớ sở thích (UC-04) chưa có trong mô tả chức năng. Tài năng có gửi ảnh vào đoạn chat được không.
- 3-3: dựa vào đâu để nhận ra "chuyện nghiêm trọng", câu từ chối cố định là câu nào. Chưa có hướng dẫn khi có dấu hiệu tự hại hoặc nguy hiểm, nhất là với người vị thành niên.
- 3-7: チャレンジ do AI đề xuất theo tình hình (quản lý cũng đề xuất được qua chỉ thị cho AI); tài năng nhận hoặc từ chối, không cần quản lý duyệt ([KS] 確認5). Tính hoàn thành thế nào: chờ khái niệm アデッソ viết. Mục 5-5 vẫn nói "khi người theo dõi tăng thì báo còn bao nhiêu tới mục tiêu", tức vẫn có lời nhắn khi tăng, chỉ không phải thông báo.
- 3-9: góp ý ghi vào chỉ dẫn cho AI thì sáng hôm sau tài năng mới nhận.
- 3-2: cấu trúc file bộ nhớ chưa có. File có giới hạn dung lượng không, ai dọn khi file phình to.
- 3-5: có mức trần chi phí hay cảnh báo khi vượt không. Chi phí tìm tin tức mỗi sáng (確認16) có tính vào đây không.
- 3-6: hôm trước không đăng bài thì tin nhắn sáng ghi gì.

## Module 6. Bản nháp bài đăng (6-6 投稿案作成機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **4-1** Tự tạo bản nháp (高) | Huấn luyện viên AI, tài năng | Thông tin ở 3-1, tin tức trong ngày (tìm web của AI, 1 lần mỗi ngày; Q&A No.38, CR-05), ngày riêng của tài năng. Chủ đề tài năng chọn, hoặc chủ đề tài năng tự nói | Theo nhịp đề xuất trong chỉ thị cho AI: hằng ngày, vài ngày một lần hay mỗi tuần ([KS] 確認14, 15). Khi tài năng đã chọn chủ đề. Quản lý đã nhập hồ sơ tài năng | 1) Mỗi lần đề xuất tạo 3 chủ đề gợi ý. Với 自動投稿, chủ đề chọn một lần khi bắt đầu khoảng đăng ([KS] 確認25). 2) Tài năng chọn hoặc nói chủ đề muốn đăng. 3) Tạo chú thích, hashtag, hướng dẫn chụp, thêm kịch bản nếu là video. 4) Giữ độ dài và số hashtag trong giới hạn chung của cả 3 mạng xã hội | 3 chủ đề gợi ý, bản nháp | Tài năng yêu cầu bao nhiêu bản nháp thì tạo bấy nhiêu (5-3, UC-05 前提); mỗi bản nháp nhờ AI viết lại không giới hạn số lần ([KS] 確認29). Mỗi bản nháp dùng được cho cả 3 mạng (確認24) |
| **4-2** Yêu cầu sửa và viết lại (高) | Tài năng, huấn luyện viên AI | Điểm muốn sửa, hoặc câu chữ tài năng muốn dùng (nói trong hội thoại) | Đã có bản nháp | 1) Tài năng nói điểm muốn sửa thì AI viết lại. 2) Hoặc tài năng đưa câu chữ muốn dùng để AI viết lại. 3) Tài năng tự sửa chữ trực tiếp được ([KS] 確認28) | Bản nháp đã sửa | Bản nháp đúng ý tài năng. Nhờ AI soạn lại không giới hạn số lần; không dừng đăng chỉ vì đã dùng hai lượt (DEC-0001). Mỗi lần soạn tốn khoảng 0,2–3 yên |
| **4-3** 採用 – chấp nhận bản nháp (高) | Tài năng | Bản nháp có kèm ảnh hoặc video. Lựa chọn có gửi duyệt hay không | Bắt buộc có ảnh hoặc video. Chỉ được chọn gửi duyệt khi tài năng được cài dùng duyệt bài | 1) Bấm 採用. 2) Kiểm tra từ cấm (4-4). 3) Nếu chọn gửi duyệt thì chuyển sang chờ duyệt. 4) Nếu không thì hẹn đăng vào giờ đăng (nếu đăng tự động đang bật) | Bài đã hẹn giờ hoặc bài chờ duyệt | Áp cho cách đăng 要確認: chỉ bài đã 採用 mới được đăng; ngày không 採用 thì không đăng. Cách 自動投稿 không có bước 採用 từng bài, hệ thống tự đăng trong khoảng tài năng đặt ([KS] 確認19, 25). Ngày 要確認 không có tư liệu: xác nhận sau ([KS] 確認26) |
| **4-4** Phát hiện từ cấm (高) | Huấn luyện viên AI, quản lý | Chú thích và hashtag của bài được 採用. Danh sách từ cấm chung | Khi bài được 採用 | 1) AI kiểm tra có từ cấm hoặc cách nói tương đương không, xét cả ngữ cảnh. 2) Nếu có thì không hẹn giờ, báo lý do cho tài năng và báo quản lý. 3) Quản lý sửa nội dung trên màn hình quản trị. 4) Quản lý đăng ký, sửa, xóa từ trong danh sách | Kết quả kiểm tra, thông báo | Bài có từ cấm không được đăng. AI có thể bỏ sót (UC-02 前提, UC-05 前提)  Màn sửa của quản lý ở mức tối thiểu: sửa chữ, hẹn giờ, hủy (CR-06). |
| **6-6** Xem trước bài đăng (中) | Tài năng | Bản nháp và ảnh hoặc video | Trước khi 採用 | Hiển thị ảnh hoặc video cùng chú thích trên một màn hình | Màn hình xem trước | Tài năng thấy bài sẽ trông ra sao trước khi 採用 |

Nguồn: [YK2] 6-6, 5-3, UC-05, UC-05 前提, 確認15, 16, 24–30.

**Điểm chưa rõ:**

- 4-1: độ dài chú thích và số hashtag tối đa chung cho 3 mạng xã hội là bao nhiêu. Tiêu đề cho YouTube lấy từ đâu. Chủ đề và bản nháp không dùng thì có chuyển sang ngày sau không. Nhiều bản nháp được 採用 trong một ngày thì mỗi bài đăng giờ nào.
- 4-3: tài năng không hủy được bài đã hẹn trên ứng dụng (7-2). 採用 sau giờ đăng thì xử lý thế nào.
- 4-4: quản lý sửa xong thì ai bấm hẹn giờ. Tài năng có được xem lại bản đã sửa không. Nếu quản lý không sửa kịp trước giờ đăng thì sao.

## Module 7. Tư liệu (6-7 素材管理機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **6-3** Gửi ảnh và video (高) | Tài năng, quản lý (thay tài năng ⚠) | Ảnh hoặc video chọn từ máy, hoặc chụp ngay | Đúng định dạng và dưới dung lượng tối đa (chưa quyết) | 1) Chọn hoặc chụp rồi gửi. 2) Vượt giới hạn thì báo lý do. 3) Mất mạng thì báo và cho gửi lại. 4) Quản lý chọn tài năng rồi gửi từ màn hình quản trị | Tư liệu đã tải lên | Có tư liệu để đăng bài |
| **6-4** Lưu tư liệu (高) | Xử lý tự động, tài năng | Tư liệu đã gửi | — | 1) Lưu vào thư mục tài năng trên OneDrive. 2) Tài năng xem danh sách và dùng lại sau. 3) Video tự làm thì mỗi ngày dùng một cái theo thứ tự lưu để làm bản nháp ⚠ (確認32) | Danh sách tư liệu | Tư liệu được giữ và dùng lại được. Video tự làm tự động thành bản nháp, không mất phí  Phần video tự làm thành bản nháp mỗi ngày là CR-23, chưa làm. |
| **6-5** Nhắc gửi tư liệu (中) | Xử lý tự động | Giờ đăng, tình trạng đã có tư liệu chưa, giờ nhắc đã cài đặt | Trước giờ đăng 2 tiếng (mặc định) mà chưa có tư liệu | Gửi nhắc một lần mỗi ngày | Thông báo nhắc | Tài năng gửi tư liệu kịp giờ |

Nguồn: [YK2] 6-7, UC-05, UC-06, 確認27, 32.

**Điểm chưa rõ:**

- 6-3: định dạng và dung lượng tối đa chưa có (mục 9-2). Quản lý chỉ gửi thay cho tài khoản công ty ([KS] 確認27). Một bài được kèm tối đa bao nhiêu ảnh.
- 6-4: tổng dung lượng lưu, thời gian lưu và cách xóa tư liệu chưa có. Video tự làm dùng mỗi ngày một cái thì có thay bản nháp từ chủ đề gợi ý không, hay là thêm một bài.
- 6-5: giờ đăng do AI chọn (8-1), nên giờ nhắc thay đổi theo từng tài năng. Có nhiều bài trong ngày thì nhắc cho từng bài hay một lần.

## Module 8. Tạo video (6-8 動画生成機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **5-1** Tạo video (高) | Tài năng, quản lý (thay cho tài khoản công ty, [KS] 確認27; CR-09), dịch vụ tạo video (Kling qua fal.ai) | Loại video (video ngắn hoặc video trình chiếu ảnh ⚠ 確認31), ảnh gốc | Đã có ảnh. Đã xem độ dài dự kiến và đơn giá | 1) Chọn loại và ảnh. 2) Hiện độ dài dự kiến và đơn giá (có ghi chú số tiền thực thu có thể khác). 3) Gửi yêu cầu và đếm một lần (5-4). 4) Tài năng được đóng ứng dụng trong lúc chờ. Xong thì báo tài năng. 5) Lỗi thì báo lý do và không tính phí | Video đã tạo, thông báo | Có video dùng được cho bài đăng (UC-06 前提)  Video trình chiếu ghép ảnh ở máy chủ, không dùng Kling (CR-04). |
| **5-2** Định dạng video (高) | Hệ thống | — | — | Tạo video dọc, theo định dạng đăng được lên cả 3 mạng xã hội | Video dọc | Một video dùng cho cả 3 mạng xã hội, kể cả YouTube Shorts (UC-06) |
| **5-3** Xem và xử lý video đã tạo (高) | Tài năng | Video đã tạo | Video đã tạo xong | Tài năng xem và chọn dùng cho bài, tạo lại (tính phí), hoặc bỏ | Quyết định của tài năng | Chỉ video tài năng chọn mới được đăng |
| **5-5** Ghi rõ video do AI tạo (高) | Xử lý tự động | Video do AI tạo | Khi đăng bài | Gắn nhãn "do AI tạo" theo quy định của từng mạng xã hội | Bài đăng có nhãn | Tuân thủ quy định của các mạng xã hội |

Nguồn: [YK2] 6-8, 5-7, UC-06, UC-06 前提, 確認27, 31.

**Điểm chưa rõ:**

- 5-1: mỗi loại video cần bao nhiêu ảnh, độ dài bao nhiêu. Có nhập câu mô tả cho AI không. Video trình chiếu ảnh cũng dùng Kling hay cách khác. Mất bao lâu thì tạo xong. Đơn giá chưa có.
- 5-3: video bị bỏ có được lưu lại không. Có giới hạn số lần tạo lại không.
- 5-5: Upload-Post có hỗ trợ gắn nhãn AI trên cả 3 mạng xã hội không, chưa kiểm chứng. Video tài năng tự làm bằng công cụ AI khác thì ai chịu trách nhiệm gắn nhãn.

## Module 9. Duyệt bài (6-9 承認機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **7-7** Duyệt bài đăng (高) | Quản lý, tài năng (gửi yêu cầu), xử lý tự động (hết hạn) | Cài đặt dùng duyệt bài cho từng tài năng. Yêu cầu duyệt (chú thích, ảnh hoặc video). Quyết định duyệt hoặc trả lại, kèm lý do khi trả lại | Tài năng được cài dùng duyệt bài và đã chọn gửi duyệt khi 採用 (chỉ với bài cho công việc cần khách hàng cho phép, ⚠ 確認33) | 1) Tài năng gửi yêu cầu; quản lý của nhóm hoặc quản lý phụ trách được báo ([KS] 確認34). 2) Quản lý xem nội dung trên màn hình quản trị (thao tác được cả trên điện thoại, [KS] 前提 UC-10-1). 3) Quản lý nhận yêu cầu bấm trước thì quyết. 4) Duyệt thì bài được đăng đúng giờ đã hẹn. 5) Trả lại thì bắt buộc nhập lý do. Tài năng thấy lý do, tự sửa hoặc nhờ AI sửa rồi gửi duyệt lại (確認35). 6) Hết giờ đăng mà chưa duyệt thì hệ thống hủy lịch, báo cả tài năng và quản lý. Tài năng 採用 lại nếu muốn đăng ⚠ (確認36) | Kết quả duyệt, lý do trả lại, thông báo | Chỉ bài đã duyệt mới được đăng (UC-07) |

Nguồn: [YK2] 6-9 (7-7), 5-3, UC-07, UC-07 前提, 確認33–36, 52.

**Điểm chưa rõ:**

- Gửi lại sau khi bị trả lại thì giờ đăng có giữ nguyên không, có giới hạn số lần không, có kiểm tra từ cấm lại không.
- Quản lý có được sửa nội dung hoặc đổi giờ đăng khi duyệt không, hay chỉ được duyệt hoặc trả lại.
- Có nhắc quản lý khi sắp đến giờ đăng mà bài vẫn chưa duyệt không. Thông báo hiện trên màn hình quản trị (確認45); khách muốn thêm email, chưa chốt.
- Bài chờ duyệt đã được đặt lịch trên Upload-Post hay chưa (確認36 nói "hủy lịch").
- Tài khoản công ty: 確認52 đề xuất không duyệt, nhưng mục 7-4 lại ghi có duyệt.
- Tài năng có rút lại yêu cầu duyệt được không.

## Module 10. Đăng bài hẹn giờ (6-10 予約投稿機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **8-2** Kết nối dịch vụ đăng bài (高) | Xử lý tự động, tài năng, Upload-Post | Thông tin tài năng. Thao tác "kết nối mạng xã hội". Tài năng đăng nhập vào từng mạng xã hội | Tài năng đã có trong hệ thống (⚠ [YK2] vẫn ghi "khi đăng ký tài năng"). Instagram phải là tài khoản doanh nghiệp hoặc nhà sáng tạo | 1) Tự động đăng ký tài năng với Upload-Post. 2) Tài năng bấm kết nối, hệ thống mở màn hình kết nối riêng (hạn 48 giờ, hết hạn thì tạo lại trong ứng dụng). 3) Tài năng tự đăng nhập và kết nối từng mạng ⚠ (確認9). Mỗi mạng chỉ một tài khoản ⚠ (確認10). Không bắt buộc đủ 3 mạng ⚠ (確認11) | Trạng thái kết nối, hiển thị trên ứng dụng và màn hình quản trị | Đăng được lên các mạng đã kết nối |
| **8-3** Đăng lên 3 mạng xã hội (高) | Xử lý tự động, Upload-Post | Bài đã hẹn giờ (ảnh hoặc video, chú thích) | Đến giờ đăng. Bài đã 採用 (đã duyệt nếu cần). Mạng xã hội đã kết nối | 1) Đăng cùng một nội dung lên Instagram, TikTok, YouTube. 2) Bài không có video thì không đăng YouTube. 3) Mạng chưa kết nối thì bỏ qua. 4) Ghi kết quả cho từng mạng | Kết quả đăng trên từng mạng xã hội | Bài xuất hiện trên mạng xã hội mà tài năng không cần thao tác (UC-08) |
| **8-4** Chống bị khóa tài khoản (高) | Xử lý tự động | ⚠ chưa nêu | ⚠ chưa nêu | Giới hạn gì sẽ quyết sau khi xem quy định và ví dụ thực tế của từng mạng. V2 bỏ mức tham khảo 1 bài ảnh và 1 bài video mỗi ngày, và đề xuất không giới hạn số bài vì lý do chi phí ⚠ (確認37) | ⚠ chưa nêu | Giảm nguy cơ bị khóa tài khoản, nhưng không đảm bảo |
| **8-5** Thông báo khi đăng lỗi (高) | Xử lý tự động, tài năng, quản lý | Kết quả đăng bị lỗi | Đăng lỗi trên ít nhất một mạng xã hội | 1) Báo tài năng trong ứng dụng, kèm tên mạng bị lỗi và lý do. 2) Hiện cảnh báo trên màn hình quản trị ⚠ (確認38). 3) Không tự đăng lại. Tài năng hoặc quản lý hẹn giờ lại | Thông báo, cảnh báo | Tài năng và quản lý biết bài chưa được đăng |
| **8-6** Thông báo khi mất kết nối (中) | Xử lý tự động | Trạng thái kết nối từ Upload-Post | Kết nối bị mất | Báo tài năng kết nối lại, đồng thời hiện trên màn hình quản trị | Thông báo | Tài năng kết nối lại trước giờ đăng tiếp theo |
| **7-5** Dừng đăng tự động, toàn bộ hoặc từng tài năng (高) | Quản lý, hệ thống | Lệnh dừng hoặc chạy lại, cho toàn bộ hoặc cho một tài năng | Quản lý xác nhận trên màn hình xác nhận | 1) Dừng: không đặt lịch mới lên Upload-Post và hủy luôn các bài đã đặt lịch. 2) Chạy lại: các bài đã hủy không được đăng. 3) Dừng riêng một tài năng thì xử lý giống vậy, chỉ cho tài năng đó | Trạng thái đăng tự động (toàn bộ và từng tài năng) | Có thể dừng ngay khi có sự cố (UC-08 前提) |
| **7-2** Xem và hủy bài đăng (高) | Quản lý, hệ thống | Tài năng và bộ lọc trạng thái: đã hẹn, chờ duyệt, đã đăng, lỗi. Bài cần hủy | Quản lý đã đăng nhập | 1) Lọc và xem bài theo từng tài năng. 2) Hủy bài đã hẹn ngay trên màn hình quản trị. Hệ thống hủy lịch bên Upload-Post. Tài năng không hủy được trên ứng dụng | Danh sách bài đăng, bài đã hủy | Quản lý nắm được và xử lý được bài đăng của tài năng mà không cần vào Upload-Post |
| **9-1** Đăng bài bằng tài khoản công ty (中) | Quản lý | Thông tin và định hướng đăng bài của công ty (nhập qua ChatGPT như tài năng), ảnh hoặc video, chỉ dẫn đăng bài | Quản lý đã tạo tài khoản công ty trên màn hình quản trị | 1) Tạo tài khoản công ty. 2) Chỉ dẫn, gửi tư liệu, 採用. 3) Đăng theo cùng luồng với tài năng, không duyệt ⚠ (確認52). Có nhiều tài khoản thì đăng nhập lại cho từng tài khoản | Bài đăng của công ty | Bài của công ty được đăng đúng giờ. Phí video được đếm để quyết toán nội bộ |

Nguồn: [YK2] 6-10, UC-03 前提, UC-08, UC-08 前提, UC-12 前提, 確認9–11, 37, 38, 52.

**Điểm chưa rõ:**

- 8-2: đăng ký tài năng với Upload-Post lúc nào (khi duyệt đơn, khi thanh toán xong hay khi tài năng bấm kết nối). Upload-Post tính phí theo số tài năng đã đăng ký (UC-08 前提), nên cũng cần biết khi nào xóa. Kiểm tra loại tài khoản Instagram bằng cách nào. Ai kết nối cho tài khoản công ty.
- 8-4: giới hạn gì, áp dụng ở bước nào, bài vượt giới hạn thì hoãn hay bỏ.
- 8-5: tài năng "hẹn giờ lại" bằng cách nào, khi 確認30 đề xuất tài năng không đổi được giờ. Chỉ một mạng lỗi thì đăng lại riêng mạng đó được không.
- 8-3: tiêu đề YouTube lấy từ đâu. Upload-Post lỗi toàn bộ thì xử lý thế nào.
- 7-5: khi đang dừng, AI có còn nhắn tin và tạo bản nháp không. Bài đã hủy có được 採用 lại sau khi chạy lại không.
- 9-1: quy trình ghi "trên màn hình quản trị", còn UC-12 前提 ghi "đăng nhập ứng dụng tài năng bằng mã của tài khoản công ty". Mục 7-4 lại ghi có duyệt cho tài khoản công ty.

## Module 11. Số liệu (6-11 実績分析機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **8-7** Lấy số liệu (高) | Xử lý tự động, Upload-Post | Số liệu từng bài đăng (lượt xem, lượt thích…) và số người theo dõi trên từng mạng xã hội | Mỗi ngày một lần | 1) Lấy số liệu từ Upload-Post (chỉ những chỉ số dịch vụ này cung cấp). 2) Lấy lỗi thì lấy lại ở lần sau. 3) Bài tài năng tự đăng ngoài hệ thống cũng được tính nếu Upload-Post đọc được (UC-09) | Số liệu đã lấy về | Có số liệu mới nhất cho xử lý buổi sáng |
| **8-8** Ghi số liệu vào file (高) | Xử lý tự động | Số liệu đã lấy về | Sau khi lấy xong (8-7) | Ghi vào file trong thư mục tài năng | File số liệu trên OneDrive | Huấn luyện viên AI dùng số liệu này từ sáng hôm sau |
| **3-10** Hiển thị số người theo dõi (高) | Tài năng, quản lý | Số người theo dõi trên từng mạng xã hội, mục tiêu | — | Hiển thị số người theo dõi và mức đạt so với mục tiêu | Màn hình trên ứng dụng và trên màn hình quản trị | Cả hai bên thấy tiến độ tới mục tiêu |
| **6-7** Số liệu và mức đạt cho tài năng (高) | Tài năng | Số liệu từng bài, số ngày đăng liên tục, lịch sử số người theo dõi, mục tiêu | Tài năng đã đăng nhập | Hiển thị số liệu từng bài, số ngày đăng liên tục, diễn biến số người theo dõi và phần còn thiếu so với mục tiêu. Chỉ số liệu của chính mình, không có xếp hạng giữa các tài năng ⚠ (確認40) | Màn hình số liệu trong ứng dụng | Tài năng tự theo dõi được kết quả của mình |
| **8-1** Phân tích giờ đăng (中) | Xử lý tự động, huấn luyện viên AI | Số liệu theo khung giờ, chỉ dẫn thuật toán của アデッソ | — | 1) Khi chưa đủ số liệu thì dùng giờ theo chỉ dẫn của アデッソ. 2) Đủ số liệu thì chọn giờ theo khung giờ được tương tác tốt của từng tài năng. 3) Upload-Post không cho số liệu theo giờ thì giữ giờ theo chỉ dẫn (UC-08) | Giờ đăng cho từng tài năng. Tài năng không đổi được ⚠ (確認30) | Bài được đăng vào giờ có nhiều tương tác hơn |
| **8-9** Lấy khung giờ tương tác (低) | Xử lý tự động, Upload-Post | Khung giờ bài được xem và được tương tác | Upload-Post có cung cấp số liệu này | Lấy về trong phạm vi Upload-Post cung cấp | Số liệu theo khung giờ | Đầu vào cho 8-1 |

Nguồn: [YK2] 6-11, UC-08, UC-09, UC-09 前提, 確認30, 40.

**Điểm chưa rõ:**

- 8-7: các chỉ số cụ thể chưa có, chỉ biết là "trong phạm vi Upload-Post lấy được" (UC-09 前提). Lấy số liệu lúc mấy giờ. Nếu chạy sau xử lý buổi sáng thì số liệu bị chậm một ngày. Lấy số liệu của bài trong bao nhiêu ngày.
- 8-1: thế nào là "đủ số liệu". 8-1 là 中 (trung bình) nhưng nguồn dữ liệu của nó là 8-9 lại là 低 (thấp), mức ưu tiên không khớp. Quản lý có được đổi giờ đăng không.
- 3-10, 6-7: màn hình quản trị xem tổng hợp nhiều tài năng thế nào, "sẽ quyết khi xem màn hình thật" (UC-10). "Số người theo dõi gộp" (別紙B số 20) là tổng cả 3 mạng hay hiển thị từng mạng.

## Module 12. Thông báo và nền tảng ứng dụng (6-12 通知・アプリ基盤機能)

| Chức năng | Tác nhân | Đầu vào | Điều kiện thực hiện | Luồng xử lý chính | Đầu ra | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- | --- |
| **6-1** Tin nhắn trong ứng dụng và thông báo đẩy (高) | Xử lý tự động, tài năng | Sự kiện cần báo cho tài năng (theo 別紙A – phụ lục A) | Có sự kiện | 1) Hiển thị trên màn hình thông báo trong ứng dụng. 2) Nếu thiết bị đã cho phép thì gửi thêm thông báo đẩy. 3) Bấm vào thông báo thì mở màn hình liên quan | Thông báo | Tài năng nhận được thông tin. Không cho phép thông báo đẩy thì vẫn xem được khi mở ứng dụng (確認12) |
| **7-4** Danh sách thông báo cho quản lý (高) | Quản lý | 8 loại thông báo: có người đăng ký, yêu cầu duyệt, phát hiện từ cấm, đăng lỗi, lâu không đăng, chuyện nghiêm trọng, đạt mục tiêu, thanh toán lỗi | Quản lý đã đăng nhập | 1) Xem danh sách, lọc theo loại và theo đã xử lý hay chưa. 2) Mở thông báo thì đi đến màn hình của tài năng liên quan. 3) Xử lý xong thì đánh dấu 対応済み (đã xử lý), danh sách chỉ còn việc chưa xử lý ⚠ (確認46). Có thể lọc theo nhóm tài năng ⚠ (確認47) | Danh sách thông báo | Quản lý chỉ cần xử lý việc có trong danh sách. Thông báo chỉ hiện trên màn hình quản trị ⚠ (確認45) |
| **6-8** Nền tảng PWA – ứng dụng web cài lên màn hình chính (高) | Tài năng | — | Điện thoại được hỗ trợ (iPhone cần iOS 16.4 trở lên để nhận thông báo đẩy) | 1) Thêm ứng dụng vào màn hình chính từ trình duyệt, không cần tải từ kho ứng dụng. 2) Mở ứng dụng thì màn hình đầu tiên cho thấy ngay việc cần làm hôm nay. V2 bỏ câu hỏi chọn 1 trong 3 bố cục | Ứng dụng trên màn hình chính | Tài năng mở ứng dụng như một ứng dụng thông thường |

Nguồn: [YK2] 6-12, 6-13, 6-14, UC-03 前提, UC-10, 確認12, 45–47.

**Điểm chưa rõ:**

- 6-1: công nghệ gửi thông báo đẩy chưa chọn (mục 8). Nội dung thông báo "sẽ xác nhận trên màn hình thật" (6-13). Email chỉ dùng cho kết quả đăng ký và đặt lại mật khẩu.
- 7-4: không có email hay thông báo điện thoại cho quản lý, kể cả với yêu cầu duyệt có hạn giờ và chuyện nghiêm trọng. Một quản lý đánh dấu đã xử lý thì có áp dụng cho mọi quản lý không. UC-10 chỉ liệt kê 6 loại, thiếu "có người đăng ký" và "thanh toán lỗi". 別紙A nói mất kết nối mạng xã hội "hiện trên màn hình quản trị", nhưng 7-4 không có loại này.
- 6-8: danh sách hệ điều hành và trình duyệt được hỗ trợ chưa có (mục 9-1).

## Các điểm chưa rõ chung

Ngoài các điểm riêng của từng module, có 9 vấn đề ảnh hưởng nhiều module cùng lúc. V2 đã giải quyết một vấn đề của bản v1: việc hủy bài nay làm được trên màn hình quản trị (7-2).

| STT | Vấn đề | Module bị ảnh hưởng | Nguồn |
| --- | --- | --- | --- |
| 1 | **Chưa có 受入基準 (tiêu chí nghiệm thu)** cho bất kỳ chức năng nào. Nhiều chức năng của AI khó đo ("hợp với tài năng", "phát hiện chuyện nghiêm trọng") | Tất cả, nhất là 5 và 6 | [YK2] mục 6 (đoạn mở đầu), 12-1 |
| 2 | **Các trạng thái chưa được định nghĩa:** bài đăng có 6 trạng thái nhưng không liệt kê. Chức năng 7-2 chỉ nêu 4. Thiếu các trạng thái như bị chặn vì từ cấm, bị trả lại, đã hủy, đăng được một phần. Đơn đăng ký cũng chưa có trạng thái | 1, 2, 6, 9, 10 | [YK2] 5-1, 6-10 (7-2) |
| 3 | **Thứ tự xử lý buổi sáng chưa có:** lấy số liệu, ghi vào file, đọc file, tìm tin tức, tạo chủ đề đều phải xong trước giờ nhắn tin. Tin gửi theo khung sáng, trưa, tối ([KS] 確認18); giờ cụ thể của từng khung chưa có | 4, 5, 6, 11 | [YK2] 9-2, 6-4 (2-1), 6-11 (8-7) |
| 4 | **Hẹn giờ lại sau khi đăng lỗi:** 8-5 nói "tài năng hoặc quản lý hẹn giờ lại", nhưng không có chức năng nào làm việc này, và 確認30 đề xuất tài năng không đổi được giờ | 6, 10 | [YK2] 6-10 (8-5), 確認30 |
| 5 | **Có trong tình huống sử dụng nhưng không có trong chức năng:** nhiệm vụ mỗi ngày và chúc mừng (UC-04), チャレンジ (UC-02 前提), tin tức trong ngày (確認16), nhật ký thao tác và xử lý (9-4), tạo ChatGPT project cho tài năng (UC-01 前提), xóa dữ liệu sau khi tài năng rời (7-3) | 2, 4, 5, 6 | [YK2] mục 4, 7-3, 9-4 |
| 6 | **Đề xuất mới chưa có mã chức năng:** màn hình chỉ dẫn cho AI (phạm vi toàn bộ / nhóm / tài năng, chạy thử, lịch sử phiên bản, mẫu câu) và nhóm tài năng. Chưa rõ có trong phạm vi không. Bên phát triển ghi phần chỉ dẫn theo nhóm "cần kiểm chứng kỹ thuật" | 2, 4, 5 | [YK2] UC-02 前提, 確認6, 7, 8, 47. [TK-M] M-10, M-11 |
| 7 | **Chưa có cách xử lý khi dịch vụ ngoài lỗi:** mục 9-3 chỉ nói chung là "chỉ dừng chức năng đó". Chưa có cách xử lý cụ thể khi OneDrive, OpenAI, Upload-Post, fal.ai hay cổng thanh toán lỗi | 3, 4, 5, 8, 10, 11 | [YK2] 9-3 |
| 8 | **Luồng đăng ký mới chưa khớp với các chức năng cũ:** 8-2 vẫn ghi "khi đăng ký tài năng". 1-2, 1-3 vẫn mang tên "phân loại trả phí / miễn phí". 9-1 và UC-12 nói khác nhau về nơi tài khoản công ty thao tác | 1, 3, 4, 10 | [YK2] 6-3, 6-10 (8-2, 9-1), UC-12 前提 |
| 9 | **Các giá trị số đều là giả định:** giới hạn nhập liệu, số lần, thời gian ở mục 6 là giả định của FutureCore, sẽ chốt khi xem màn hình thật. Ví dụ: 1.000 ký tự, khóa 15 phút, hạn 48 giờ | Tất cả | [YK2] mục 6 (đoạn mở đầu) |
