# EP01 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của 6 chức năng EP01 (1-4, 1-5, 6-2, 1-6, 7-3, 7-6) mà **chưa có trong bảng 確認 (mục cần xác nhận) của khách**. Mỗi điểm có đề xuất của đội, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, xem `Phan_tich/21` và bảng cuối tệp này): 確認1, 2, 13 (1-4); 確認11, 12 (6-2); 確認41, 42 (1-5, 1-6); 確認44 (7-6); 確認53–56 (7-3). Trong đó 確認54 và 確認56 chặn việc viết mã 7-3.

Nguồn:
- [YK2] = `AI育成OS_概要要件定義書_v2.docx` (bản định nghĩa yêu cầu tổng quan, bản 2).
- [AG] = `アプリ画面案_AI育成OS.pdf` (phương án màn hình ứng dụng).
- File 15 = [15_Cau_hoi_lam_ro_luong.csv](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv). Các câu mới ở đây đã thêm vào file 15 với mã S01-xx.

## 1. Nguyên tắc kiểm tra phạm vi

Phạm vi là 54 chức năng trong [YK2] chương 6, ứng với 9 hạng mục lớn của SOW (bản mô tả phạm vi công việc) ([YK2] §1-3). Một đề xuất được coi là **trong phạm vi** khi:
1. nó chỉ là cách làm cụ thể của một chức năng đã có, không thêm màn hình, loại thông báo hay chức năng mới; hoặc
2. nó là yêu cầu chung đã có trong [YK2] (bảo mật §10, nhật ký §9-4, lưu dữ liệu §7-3).

Đề xuất nào cần thêm chức năng thì **không đưa vào**. Nếu khách muốn có, sẽ xử lý theo thủ tục thay đổi ở [YK2] §14-3.

**Những thứ đã cố ý loại khỏi EP01** vì không có chức năng tương ứng trong [YK2]:

| Không làm | Lý do |
|---|---|
| Màn sửa email hoặc tên của tài năng | 7-1 là "タレントの情報の表示" (chỉ hiển thị). Không chức năng nào có việc sửa. Sửa đề xuất cũ ở B11 (xem S01-06) |
| Tài năng tự xin ngừng trong ứng dụng | 確認53: tài năng báo quản lý, quản lý đổi trạng thái |
| Thông báo nhắc kết nối mạng xã hội | 17 loại thông báo ở 別紙A (phụ lục A) không có loại này |
| Xác thực hai bước qua tin nhắn SMS | [SM] trang 28 đã loại |
| Trạng thái 一時停止 (tạm dừng) khi thu tiền lỗi | Phải thêm trạng thái. Chỉ làm nếu khách chọn phương án B ở B7 |

## 2. Câu phải có trả lời trước khi viết mã

Thiếu các câu này thì 7-3 vẫn ở mức 🔴 (đỏ, chưa giao agent).

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| A3 | 7-3 | 退会 (rời đi) ở UC-13 và 利用終了 (đã ngừng) ở §6-2 có phải là một không? | Là một. Tài năng có 3 trạng thái: 利用前 (chưa dùng), 利用中 (đang dùng), 利用終了 | Trong phạm vi: chỉ thống nhất tên |
| S01-01 | 7-3 | Lúc nào chuyển từ 利用前 sang 利用中, và ai chuyển? | Hệ thống tự chuyển khi tài năng đăng ký thanh toán xong. Đây cũng là lúc tạo thư mục OneDrive (UC-01 前提). Tài khoản công ty: chuyển ngay khi quản lý tạo | Trong phạm vi: cách làm của 7-3, không thêm thao tác |
| S01-02 | 7-3, 1-1 | Chuyển 利用終了 về 利用中 thì thu phí lại từ khi nào? | **Không cần hỏi nữa:** 退会 không quay lại 利用中 được ([KS] 確認56). Đề xuất cũ: Thu trọn tháng của ngày quay lại, cùng cách tính với 確認48 | Trong phạm vi: luật thu phí của 1-1 |
| B7 | 7-3, 1-1 | Thu tiền lỗi thì "dừng sử dụng" là gì? | Phương án A: quản lý chuyển sang 利用終了, trả tiền xong thì chuyển lại 利用中. Không thêm trạng thái | A trong phạm vi. B (thêm trạng thái tạm dừng) cần khách đồng ý |

## 3. Câu cần trả lời trước kiểm thử chấp nhận (không chặn viết mã)

Agent viết mã theo giả định trong cột "Đề xuất". Các giá trị đều để ở tham số cài đặt, khách trả lời khác thì chỉ đổi giá trị.

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S01-03 | 7-3, 8-2 | Tài năng chuyển sang 利用終了 thì có hủy đăng ký trên Upload-Post không? | Có, để không mất phí. Quay lại 利用中 thì tài năng kết nối lại mạng xã hội | Trong phạm vi: việc đi kèm của 7-3 |
| S01-04 | 7-3, 7-7 | Khi ngừng, bài đang chờ duyệt và bản nháp chưa dùng xử lý thế nào? | Hủy bài chờ duyệt cùng với bài đã hẹn giờ. Giữ bản nháp theo thời hạn ở 確認55 | Trong phạm vi |
| S01-05 | 1-4 | Mật khẩu tạm có hạn bao lâu? | 7 ngày. Quá hạn thì tài năng dùng "quên mật khẩu" | Trong phạm vi: luồng sẵn có của 1-4 |
| S01-06 | 1-4 | Người bị từ chối có gửi lại bằng cùng email được không? Ai sửa email của tài năng? | Theo [YK2] §6-4 chức năng 2-2: email đã dùng (kể cả đơn bị từ chối) thì không gửi đơn được. **Không làm** chức năng sửa email. Từ chối nhầm hoặc tài năng đổi email thì công ty báo bằng văn bản, đội hỗ trợ xử lý. **Thay đề xuất cũ của B11** | Trong phạm vi. Màn sửa email là ngoài phạm vi |
| S01-07 | 1-6 | Quản lý mất điện thoại xác thực thì làm sao? | Một quản lý khác xóa đăng ký xác thực của người đó ở M-18. Lần đăng nhập sau người đó đăng ký lại | Trong phạm vi: thuộc việc quản lý quản lý của 1-6 |
| S01-08 | 1-6 | Quản lý mới nhận mật khẩu thế nào? Ai tạo các quản lý đầu tiên? | Thêm ở M-18 thì hệ thống gửi thư mời đặt mật khẩu. Các quản lý đầu tiên do đội tạo khi triển khai, theo danh sách (tên, email) khách gửi | Trong phạm vi: 1-6 |
| S01-09 | 7-6 | Giữ nhật ký xem bao lâu? | Ít nhất 1 năm (dài hơn thời gian giữ dữ liệu tài năng đã rời, 6 tháng theo [KS] 確認55) | Trong phạm vi: §9-4 |
| S01-11 | 1-6 | Ngoài ứng dụng xác thực 6 số, có cần xác thực hai bước bằng SMS không? | Không làm ở đợt đầu; chỉ dùng ứng dụng xác thực theo [YK2] §6-2 và [AG] M-01. Nếu cần SMS thì có thêm phí add-on của Supabase (75 USD/tháng cho project đầu) và phí từng tin, cần báo giá riêng | Trong phạm vi: 1-6 dùng ứng dụng xác thực. SMS là thay đổi |
| B13 | 1-4, 6-8 | Đăng nhập xong mở màn nào trước? | T-07 ホーム (trang chủ), khớp chức năng 6-8 | Trong phạm vi |

## 4. Thứ khách phải cung cấp

| Mã | Cần gì | Dùng cho | Hạn đề xuất |
|---|---|---|---|
| C1, I2 | Ký hợp đồng dịch vụ gửi thư đứng tên アデッソ; tên miền gửi thư và quyền chỉnh DNS (bản ghi SPF, DKIM) | Thư mật khẩu tạm, thư từ chối, thư đặt lại mật khẩu, thư mời quản lý | Trước khi dựng môi trường thử |
| S01-10 | Nội dung điều khoản sử dụng, kèm đường dẫn hoặc tệp | Màn T-01 (khách quyết nội dung điều khoản, [YK2] §11) | Trước kiểm thử chấp nhận |
| S01-08 | Danh sách quản lý đầu tiên: tên, email | Tạo tài khoản quản lý | Trước kiểm thử chấp nhận |

## 5. Báo cho khách, không cần trả lời

- [AG] chưa có màn đặt lại mật khẩu, dù 1-4 yêu cầu. Đội sẽ thêm một màn đơn giản cùng kiểu với T-02 vào bản định nghĩa màn hình (file 14 §3.2 điểm 11).
- Một tài khoản đăng nhập được trên nhiều thiết bị cùng lúc.
- Giới hạn số đơn từ cùng một địa chỉ trong một khoảng thời gian, để chặn đăng ký rác (§10).

## 6. Bản tiếng Nhật để gửi khách

Các câu mới (S01-xx) và các câu đội đề xuất (A3, B7, B13, C1).

| Mã | 確認事項（日本語案） |
|---|---|
| A3 | 6-2「7-3 タレントのステータスの切り替え」ではステータスを「利用前・利用中・利用終了」と書き、UC-13 と確認53〜56 では「退会」と書いています。「退会」は「利用終了」と同じものとして扱い、ステータスは3つとする想定でよろしいでしょうか。 |
| S01-01 | タレントのステータスは、タレントが支払い方法の登録を終えた時点で、AI育成OS が自動で「利用前」から「利用中」に切り替える想定でよろしいでしょうか。タレント別フォルダを作る時点と同じです。事務所アカウントは、作成した時点で「利用中」にします。 |
| S01-02 | 「利用終了」のタレントを「利用中」に戻した場合、月額使用料は、戻した日の月から1か月分を請求する想定でよろしいでしょうか（確認48 と同じ考え方です）。 |
| B7 | 月額使用料の請求が失敗し、利用を止める場合は、マネージャーがステータスを「利用終了」に切り替え、お支払いの後に「利用中」に戻す運用を想定しています。新しいステータス（一時停止など）は設けません。この想定でよろしいでしょうか。 |
| S01-03 | ステータスを「利用終了」にしたタレントは、投稿サービス（Upload-Post）の登録を解除し、利用料の対象から外す想定でよろしいでしょうか。「利用中」に戻した場合は、タレントに SNS をつなぎ直していただきます。 |
| S01-04 | ステータスを「利用終了」にしたときは、予約済みの投稿に加えて、承認待ちの投稿も取り消します。投稿案は、確認55 で決める期間、残します。この想定でよろしいでしょうか。 |
| S01-05 | 承認のメールでお送りする仮のパスワードの有効期限は、7日間とする想定でよろしいでしょうか。期限が切れた場合は、タレントが「パスワードを忘れたとき」から設定し直します。 |
| S01-06 | 要件定義書 6-4「2-2」のとおり、一度申し込みに使ったメールアドレス（拒否した申し込みを含みます）では、もう一度申し込めません。また、タレントのメールアドレスを変える機能は、要件定義書にないため、今回は作りません。誤って拒否した場合や、メールアドレスの変更が必要な場合は、書面でご依頼いただき、弊社が個別に対応する想定でよろしいでしょうか。 |
| S01-07 | マネージャーが認証アプリの入ったスマートフォンをなくした場合は、ほかのマネージャーが、マネージャーの管理の画面で、そのマネージャーの二段階認証の登録を解除し、次のログインで登録し直す想定でよろしいでしょうか。 |
| S01-08 | マネージャーを追加すると、AI育成OS が、パスワードを設定するための案内のメールを送ります。最初のマネージャーは、アデッソ様からいただく一覧（お名前・メールアドレス）をもとに、弊社が登録します。この想定でよろしいでしょうか。 |
| S01-09 | 閲覧の記録は、少なくとも1年間とする想定でよろしいでしょうか。 |
| S01-10 | タレントのアプリの申し込み画面に表示する利用規約の本文（またはリンク先）を、受入テストの開始前にご提供いただけますでしょうか。 |
| S01-11 | マネージャーの二段階認証は、要件定義書 6-2「1-6」のとおり、認証アプリ（6桁の番号、初回はQRコードで登録）で作ります。SMS で番号を受け取る方式も必要でしょうか。必要な場合は、Supabase の追加料金（最初のプロジェクトで月75米ドル）と SMS の送信料金が別にかかるため、別途お見積りとなります。 |
| B13 | タレントがアプリを開いたときに最初に表示する画面は、「ホーム」（今日やることが分かる画面）とする想定でよろしいでしょうか（6-12「6-8」）。画面案では「マイページ」になっています。 |
| C1 | 承認・拒否・パスワードの再設定などのメールを送るため、メール送信サービスのご契約（アデッソ様のご名義）と、送信に使うドメインの DNS の設定をお願いできますでしょうか。要件定義書8章の外部サービスの一覧には含まれていません。 |

## 7. Mức sẵn sàng khi khách trả lời theo đề xuất

| Chức năng | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| 1-4 | 🟡 | 🟢 khi có C1 và nội dung điều khoản |
| 1-5 | 🟢 | 🟢 |
| 6-2 | 🟡 | 🟡, vẫn chờ 1-1 và 8-2 thuộc module khác |
| 1-6 | 🟡 | 🟢 |
| 7-3 | 🔴 | 🟡 khi có A3, S01-01 (S01-02 không cần nữa vì 退会 không quay lại, [KS] 確認56); 確認55 đã có ([KS]: 6 tháng) |
| 7-6 | 🟡 | 🟢 |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| A3 | Tên và số lượng trạng thái của tài năng | No.10 | Đã chốt trong Q&A |
| B7 | Thu tiền thất bại thì "dừng sử dụng" là gì | No.46, No.63 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| B11 | Đơn bị từ chối và đổi thông tin cơ bản | No.65 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S01-01 | Lúc nào chuyển 利用前 sang 利用中 | No.52 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S01-02 | Quay lại 利用中 thì thu phí từ khi nào | No.64 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S01-05 | Hạn mật khẩu tạm | No.65, No.25 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S01-06 | Gửi lại đơn và đổi email | No.65 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S01-07 | Mất điện thoại xác thực | No.67 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S01-09 | Thời gian giữ nhật ký xem | No.29 | Việc nội bộ (theo Q&A) |
