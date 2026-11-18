# EP06 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của 9 chức năng EP06 (7-7, 8-2, 8-3, 8-4, 8-5, 8-6, 7-5, 7-2, 9-1) mà **chưa có trong bảng 確認 (mục cần xác nhận) của khách**, kèm **danh sách việc đội phải kiểm chứng trên Upload-Post**. Mỗi câu có đề xuất, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, xem `Phan_tich/21` và bảng cuối tệp này): 確認33–36 (7-7, trong đó 35 và 36 chặn phần trả lại và quá hạn); 確認9–11 (8-2); 確認37 (8-4); 確認30, 38 (8-5); 確認52 (9-1, 7-7).

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx`; [AG] = `アプリ画面案_AI育成OS.pdf`; File 15 = [15_Cau_hoi_lam_ro_luong.csv](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) (các câu mới đã thêm với mã S06-xx).

## 1. Kiểm tra phạm vi

**Những thứ đã cố ý loại khỏi EP06:**

| Không làm | Lý do |
|---|---|
| AI tự đoán bài công việc để bắt duyệt | §5-3, UC-07 前提: tài năng tự chọn |
| Quản lý sửa nội dung hoặc đổi giờ khi duyệt | 7-7 chỉ có duyệt hoặc trả lại; [AG] M-05 cũng vậy (S06-10) |
| Nhắc quản lý khi sắp hết hạn duyệt | Không có trong 別紙A; thay bằng tô màu ở M-04 (S06-09) |
| Tài năng tự hủy hoặc tự hẹn lại bài | 7-2: chỉ quản lý hủy; [AG] chỉ cho quản lý hẹn lại (S06-04) |
| Tự đăng lại khi lỗi | §6-10 chức năng 8-5: không tự đăng lại |
| Chọn tay mạng đăng cho từng bài, chú thích riêng từng mạng | UC-05 前提: cùng nội dung cho mọi mạng đã kết nối |
| Màn hình đăng bài cho tài khoản công ty trong màn hình quản trị | A1: dùng lại ứng dụng tài năng như UC-12 前提 |
| Cam kết tài khoản không bị khóa | §9-5, §11 |

## 2. Câu phải có trả lời trước khi viết mã

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S06-02 | 8-2 | Đăng ký tài năng với Upload-Post lúc nào? (phí tính theo số tài năng đã đăng ký) | Khi tài năng chuyển sang 利用中 (đăng ký thanh toán xong, S01-01); tài khoản công ty khi được tạo. Xóa khi chuyển sang 利用終了 (S01-03) | Trong phạm vi: cách làm của 8-2 |
| S06-03 | 8-4 | Biện pháp chống khóa tài khoản cụ thể là gì? | Tối thiểu: cách nhau 3 giờ; tối đa 3 bài mỗi ngày mỗi tài năng; rải giờ ±10 phút giữa các tài năng. Đội xem quy định từng mạng rồi chỉnh tham số | Trong phạm vi: nội dung của 8-4, §9-5 |
| S06-04 | 8-5 | Ai hẹn lại bài lỗi? [YK2] ghi "tài năng hoặc quản lý", [AG] chỉ cho quản lý | Chỉ quản lý (theo [AG] M-08); tài năng liên hệ quản lý, T-13 ghi rõ | Trong phạm vi: bớt chứ không thêm |
| A1 | 9-1 | Tài khoản công ty thao tác ở ứng dụng tài năng (UC-12) hay màn hình quản trị (9-1)? | Ứng dụng tài năng, như UC-12 前提 và [AG] M-12; sửa câu chữ 9-1 | Trong phạm vi |

## 3. Câu cần trả lời trước kiểm thử chấp nhận (không chặn viết mã)

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S06-01 | 7-7 | Bài chờ duyệt đã hẹn trên Upload-Post chưa? | Chưa; chỉ gửi lịch khi được duyệt. Quá hạn thì chỉ đổi trạng thái | Trong phạm vi |
| S06-05 | 8-5 | Hẹn lại thì đăng lại những mạng nào, lúc nào? | Chỉ mạng lỗi, sau 15 phút | Trong phạm vi |
| S06-06 | 7-5 | Đang dừng đăng tự động thì AIコーチ có tiếp tục không? | Có; bài được chấp nhận thì giữ, chưa hẹn (B6) | Trong phạm vi |
| S06-07 | 9-1 | Nhiều quản lý dùng chung một tài khoản công ty | Cho phép; nhật ký chỉ ghi theo tài khoản công ty, không biết quản lý nào thao tác | Trong phạm vi, cần khách biết hạn chế này |
| S06-08 | 8-6 | Phát hiện mất kết nối lúc nào? | Khi Upload-Post báo, kiểm tra hằng ngày và trước mỗi lần đăng; mỗi lần mất báo một lần | Trong phạm vi |
| S06-09 | 7-7 | Có nhắc quản lý khi sắp hết hạn duyệt không? | Không thêm thông báo; M-04 tô màu bài còn dưới 2 giờ | Trong phạm vi |
| S06-10 | 7-7 | Khi duyệt có sửa được nội dung, đổi giờ không? | Không; chỉ duyệt hoặc trả lại | Trong phạm vi |
| A2 | 7-7, 9-1 | Bài tài khoản công ty có cần duyệt không? (UC-12 nói không, §12-5 nói có) | Không duyệt; sửa §12-5 | Trong phạm vi |
| A5 | 8-4 | "Cơ bản mỗi ngày 1 bài" (別紙B, phụ lục B) là mục tiêu hay giới hạn? | Mục tiêu; giới hạn thuộc 8-4 | Trong phạm vi |

B6 (chấp nhận bài lúc đang dừng đăng tự động) và B10 (nhắc không đăng với tài khoản công ty) đã có bản tiếng Nhật ở file câu hỏi EP04 và EP03.

## 4. Việc đội phải kiểm chứng trên Upload-Post (không hỏi khách)

Làm càng sớm càng tốt; kết quả quyết định mức sẵn sàng của 8-2, 8-3, 8-6, 7-2, 7-5, 5-5, 8-7, 8-9. Cần tài khoản thử của khách (§12-4) và tài khoản mạng xã hội thử.

| STT | Kiểm chứng | Dùng cho |
|---|---|---|
| 1 | Tạo, xóa hồ sơ cho từng tài năng; phí tính thế nào khi xóa giữa tháng | 8-2, 7-3 |
| 2 | Đường dẫn kết nối: hạn 48 giờ, quay về ứng dụng, đọc trạng thái kết nối từng mạng | 8-2, 6-2 |
| 3 | Instagram tài khoản cá nhân: báo lỗi thế nào | 8-2 |
| 4 | Hẹn giờ: tham số giờ, múi giờ, bài nhiều ảnh, video, tiêu đề YouTube, chú thích dài | 8-3, 4-1 |
| 5 | Hủy lịch qua API, kể cả hủy nhiều bài một lúc | 7-2, 7-5 |
| 6 | Kết quả theo từng mạng: có webhook không, mã lỗi, đường dẫn bài | 8-3, 8-5 |
| 7 | Bật nhãn "nội dung do AI tạo" cho từng mạng | 5-5 (C3) |
| 8 | Báo mất kết nối: webhook hay phải hỏi | 8-6 |
| 9 | Chỉ số bài và số người theo dõi lấy được; có số liệu theo khung giờ không | 8-7, 8-9, 8-1 |
| 10 | Giới hạn tốc độ gọi API, dung lượng và định dạng tệp | 6-3, 8-3 |

## 5. Bản tiếng Nhật để gửi khách

| Mã | 確認事項（日本語案） |
|---|---|
| S06-02 | 投稿サービス（Upload-Post）の料金は登録したタレントの人数で決まるため、タレントを投稿サービスに登録するのは、タレントが支払い方法の登録を終えて「利用中」になった時点（事務所アカウントは作成した時点）とし、「利用終了」にした時点で登録を解除する形でよろしいでしょうか。 |
| S06-03 | 凍結対策（6-10「8-4」）として、まず次の制限を設け、各 SNS の規約と事例を確かめたうえで数値を調整する形を提案します。(1) 同じタレントの投稿は3時間以上あける、(2) タレント1人の1日の投稿は3本まで（超えた分は翌日に予約）、(3) 多くのタレントが同じ時刻に投稿しないよう、予約の時刻を前後10分の範囲でずらす。この形でよろしいでしょうか。 |
| S06-04 | 投稿に失敗した投稿の予約し直しは、要件定義書では「タレントまたはマネージャー」としていますが、画面案（M-08）のとおり、マネージャーだけが行う形でよろしいでしょうか。タレントには、予約し直したいときはマネージャーに連絡するよう、アプリで案内します。 |
| A1 | 事務所アカウントの投稿について、6-10「9-1」では管理画面で行うと書いていますが、UC-12 では、マネージャーがタレントのアプリに事務所アカウント用の ID でログインして行うと書いています。画面案（M-12）と同じく、タレントのアプリで行う形とし、「9-1」の記載を直してよろしいでしょうか。 |
| S06-01 | 承認待ちの投稿は、マネージャーが承認した時点で投稿サービスに予約します。承認されないまま投稿の時刻を過ぎた場合は、予約がないため、投稿しない扱いにします。この形でよろしいでしょうか（確認36 の「予約を取り消す」は、この形で実現します）。 |
| S06-05 | 投稿の予約し直しでは、投稿できなかった SNS だけに、予約し直した時刻の15分後に投稿します。この形でよろしいでしょうか。 |
| S06-06 | 自動投稿を止めている間も、AIコーチの声かけと投稿案の作成は続けます。その間に採用された投稿は、予約せずに残します。この形でよろしいでしょうか。 |
| S06-07 | 1つの事務所アカウントを複数のマネージャーが使うことはできますが、操作の記録には事務所アカウントの名前が残り、どのマネージャーが操作したかは残りません。この点をご了承いただけますでしょうか。 |
| S06-08 | SNS の接続切れは、投稿サービスからの連絡に加えて、毎日の実績の取り込みのときと、投稿の予約の直前にも確かめます。タレントへのお知らせは、接続が切れるたびに1回とします。この形でよろしいでしょうか。 |
| S06-09 | 投稿の時刻が近づいても承認されていない投稿について、新しいお知らせは増やさず、承認待ち一覧（M-04）で、投稿の時刻まで2時間を切った投稿を色で目立たせる形でよろしいでしょうか。 |
| S06-10 | 投稿の承認の画面（M-05）では、マネージャーは「承認する」か「差し戻す」を選ぶだけとし、文章や投稿の時刻を直す操作は設けない形でよろしいでしょうか。 |
| A2 | 事務所アカウントの投稿は、UC-12 と確認52 では承認を行わないとしていますが、12-5 の手順書の項目には「事務所アカウントの投稿の指示と承認」と書いています。承認は行わない形とし、12-5 の記載を直してよろしいでしょうか。 |
| A5 | 別紙B の「基本的に1日1投稿を想定する」は、目標として扱い、投稿の本数の制限は凍結対策（6-10「8-4」）で決める形でよろしいでしょうか。 |

## 6. Mức sẵn sàng khi khách trả lời theo đề xuất

| Chức năng | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| 7-7 | 🔴 | 🟡 khi có S06-01 và 確認35, 36; 🟢 khi C-01 chốt |
| 8-2 | 🔴 | 🟢 khi có S06-02 và kiểm chứng xong mục 1–3 |
| 8-3 | 🟡 | 🟢 khi kiểm chứng xong mục 4, 6 |
| 8-4 | 🔴 | 🟡 khi có S06-03; 🟢 khi đội xem xong quy định từng mạng |
| 8-5 | 🔴 | 🟢 khi có S06-04 |
| 8-6 | 🟡 | 🟢 khi kiểm chứng xong mục 8 |
| 7-5 | 🟡 | 🟢 khi kiểm chứng xong mục 5 |
| 7-2 | 🟡 | 🟢 khi C-01 chốt |
| 9-1 | 🔴 | 🟢 khi có A1, A2 |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| A1 | Đăng bài cho tài khoản văn phòng (事務所アカウント) bằng màn hình nào | No.20 | Đã chốt trong Q&A |
| A2 | Bài của tài khoản văn phòng có cần duyệt không | No.20 | Đã chốt trong Q&A |
| B6 | Chấp nhận bài trong lúc đang dừng đăng tự động | No.60 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| B10 | Huấn luyện viên AI với tài khoản văn phòng | No.66 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S06-04 | Ai hẹn lại bài lỗi | No.59 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S06-05 | Hẹn lại đăng mạng nào, lúc nào | No.59 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S06-06 | AIコーチ khi đang dừng đăng tự động | No.60 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S06-07 | Nhiều quản lý dùng chung tài khoản công ty | No.66 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
