# EP04 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của 5 chức năng EP04 (4-1, 4-2, 4-3, 4-4, 6-6) mà **chưa có trong bảng 確認 (mục cần xác nhận) của khách**. Mỗi điểm có đề xuất của đội, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 không xử lý ở đây, chỉ ghi lại để biết chức năng nào đang chờ: 確認15, 16, 24 (4-1); 確認28, 29 (4-2); 確認25, 26, 30, 33 (4-3); 確認4 (4-4). Trong đó 確認16 (tin tức trong ngày) quyết định 4-1 có cần nguồn tin tức không.

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx`; [AG] = `アプリ画面案_AI育成OS.pdf`; File 15 = [15_Cau_hoi_lam_ro_luong.csv](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) (các câu mới đã thêm với mã S04-xx); File 13 = [13_Qua_gio_dang_chua_chap_nhan.md](../../Phan_tich/13_Qua_gio_dang_chua_chap_nhan.md).

## 1. Kiểm tra phạm vi

Đề xuất chỉ được là cách làm của một trong 54 chức năng, hoặc là yêu cầu chung đã có trong [YK2].

**Những thứ đã cố ý loại khỏi EP04:**

| Không làm | Lý do |
|---|---|
| Danh sách từ cấm riêng cho từng tài năng | §6-6 chức năng 4-4, UC-02 前提: một danh sách chung |
| Kiểm tra từ cấm trong ảnh, video | 4-4 chỉ nói chú thích và hashtag |
| Chú thích riêng cho từng mạng | UC-05 前提: cùng ảnh, video và cùng chú thích cho cả 3 mạng. Riêng tiêu đề YouTube là trường bắt buộc của YouTube (B3) |
| Tài năng tự hủy hoặc sửa bài đã chấp nhận | 7-2: chỉ quản lý hủy được (S04-09) |
| Màn quản lý mẫu bản nháp, mẫu hashtag | Không có chức năng tương ứng; mẫu nằm trong file kiến thức nghề (§7-5) |

## 2. Câu phải có trả lời trước khi viết mã

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| B1 | 4-1, 4-3, 6-5 | Giờ đăng có từ lúc nào? Lời nhắc "2 giờ trước giờ đăng" cần giờ đăng có trước khi tài năng chấp nhận | Mỗi sáng hệ thống chốt giờ đăng dự kiến cho từng tài năng, ghi vào tin buổi sáng và T-07 ([AG] T-07, T-09 đã hiện 19:00) | Trong phạm vi: cách làm của 8-1, 4-3 |
| S04-01 | 4-3 | Tài năng chấp nhận **sau** giờ đăng dự kiến thì sao? (file 13, Q1) | Hẹn sau 15 phút; sau 22:00 thì sang giờ dự kiến hôm sau. Cả hai mốc là tham số | Trong phạm vi: hệ thống quyết giờ (§5-2) |
| B2 | 4-1, 5-1 | Ai chọn bài ảnh hay video, lúc nào? | Tài năng chọn khi chọn chủ đề, mặc định là ảnh; chọn video thì bản nháp có kịch bản; video AI tạo xong tự gắn vào bản nháp đang mở | Trong phạm vi: cách làm của 4-1 |

## 3. Câu cần trả lời trước kiểm thử chấp nhận (không chặn viết mã)

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| B3 | 4-1 | YouTube Shorts bắt buộc có tiêu đề | AI tạo tiêu đề ngắn (tối đa 100 ký tự), chỉ dùng cho YouTube | Trong phạm vi |
| B5 | 4-4 | Quản lý sửa bài dính từ cấm xong thì sao? | Kiểm tra lại, sạch thì tự hẹn giờ, báo tài năng kèm nội dung mới | Trong phạm vi. Bắt tài năng chấp nhận lại là thêm bước, cần khách đồng ý |
| B6 | 4-3 | Chấp nhận trong lúc đang dừng đăng tự động | Giữ "đã chấp nhận, chưa hẹn giờ"; mở lại thì hẹn nếu chưa qua giờ, quá giờ thì hủy và báo | Trong phạm vi |
| S04-02 | 4-1 | Bản nháp không ai chấp nhận giữ bao lâu? (file 13, Q2) | 7 ngày, trong thời gian đó chấp nhận được | Trong phạm vi |
| S04-03 | 4-3, 6-5 | Đã gửi ảnh, video nhưng chưa chấp nhận thì có nhắc không? (file 13, Q3) | Gộp vào lời nhắc 2 giờ trước giờ đăng của 6-5, cùng loại thông báo 写真・動画の催促 | Trong phạm vi: mở rộng điều kiện nhắc của 6-5, không thêm loại thông báo. Cần khách đồng ý |
| S04-04 | 4-1, 4-3 | Nhiều bài được chấp nhận trong một ngày thì giờ đăng thế nào? | Bài sau cách bài trước ít nhất 3 giờ. Số bài tối đa mỗi ngày quyết ở 8-4 | Trong phạm vi |
| S04-05 | 4-1 | Giới hạn chú thích, hashtag chung cho 3 mạng | Tạm 2.200 ký tự, 10 hashtag; đội kiểm chứng giới hạn hiện hành và ghi vào bản cuối | Trong phạm vi |
| S04-06 | 4-4 | AI kiểm tra từ cấm bị lỗi thì sao? | Không hẹn giờ, coi như dính từ cấm để quản lý xem, tránh đăng nhầm | Trong phạm vi: §9-3 |
| S04-07 | 4-4 | Tài năng thấy lý do gì khi bị chặn? | Đoạn bị trúng và câu "quản lý sẽ xem và sửa" | Trong phạm vi |
| S04-08 | 4-4 | Nút 予約しない (không đăng) ở [AG] M-11 không có trong [YK2]; sửa sau giờ đăng thì sao? | Giữ nút, bấm thì báo tài năng. Sửa sau giờ đăng thì hẹn theo S04-01 | Trong phạm vi: cách xử lý của quản lý trong 4-4 |
| S04-09 | 4-2, 4-3 | Sau khi chấp nhận có sửa được không? | Không. Muốn đổi thì quản lý hủy (7-2), tài năng tạo bản nháp mới | Trong phạm vi |

## 4. Bản tiếng Nhật để gửi khách

| Mã | 確認事項（日本語案） |
|---|---|
| B1 | 写真・動画の催促（投稿の時刻の2時間前）と予約のために、AI育成OS が毎朝、その日の投稿予定の時刻をタレントごとに決め、毎朝の声かけとホームの画面に表示する形でよろしいでしょうか（画面案の T-07・T-09 と同じです）。 |
| S04-01 | タレントが投稿予定の時刻を過ぎてから投稿案を採用した場合は、採用から15分後に予約します。22時を過ぎて採用した場合は、翌日の投稿予定の時刻に予約します。この形でよろしいでしょうか（15分と22時は設定で変えられます）。 |
| B2 | 投稿を写真にするか動画にするかは、タレントがテーマを選ぶときに選び、最初は写真とします。動画を選んだ場合は、投稿案に台本を付けます。AI で作った動画は、開いている投稿案に自動で付けます。この形でよろしいでしょうか。 |
| B3 | YouTube（ショート）の投稿にはタイトルが必要なため、AI が100文字以内の短いタイトルを作り、YouTube だけに使う形でよろしいでしょうか。 |
| B5 | 使ってはいけない言葉が見つかった投稿をマネージャーが直したときは、AI育成OS がもう一度確かめ、問題がなければ自動で予約し、直した内容をタレントにお知らせする形でよろしいでしょうか。 |
| B6 | 自動投稿を止めている間に採用された投稿は、「採用済み・未予約」として残し、再開したときに投稿予定の時刻がまだであれば予約し、過ぎていれば取り消してタレントにお知らせする形でよろしいでしょうか。 |
| S04-02 | 採用されなかった投稿案は、作った日から7日間、未使用の投稿案として残し、その間は採用できる形でよろしいでしょうか。7日を過ぎた投稿案は使えなくなります。 |
| S04-03 | 写真・動画は届いているものの、まだ採用されていない投稿案がある場合も、投稿の時刻の2時間前の催促（6-7「6-5」）の対象にする形でよろしいでしょうか。お知らせの種類は増やさず、「写真・動画の催促」の文面で採用もお願いします。 |
| S04-04 | 同じ日に複数の投稿案を採用した場合は、2本目以降を、前の投稿から3時間以上あけた時刻に予約する形でよろしいでしょうか。1日の投稿本数の上限は、凍結対策（6-10「8-4」）で決めます。 |
| S04-05 | 3つの SNS のすべてに投稿できるよう、投稿の文章は2,200文字まで、ハッシュタグは10個までとする想定です。各 SNS と投稿サービスの最新の上限は弊社で確かめ、最終版に書きます。 |
| S04-06 | 使ってはいけない言葉の確認で AI が使えなかった場合は、誤って投稿されることを防ぐため、投稿を予約せず、使ってはいけない言葉が見つかったときと同じようにマネージャーに確認をお願いする形でよろしいでしょうか。 |
| S04-07 | 使ってはいけない言葉が見つかったときは、タレントのアプリに、見つかった表現と「マネージャーが確認して直します」という案内を表示する形でよろしいでしょうか。 |
| S04-08 | 画面案（M-11）の「予約しない」のボタンは、要件定義書には書かれていませんが、マネージャーが投稿を止める手段として残し、押した場合はタレントにお知らせする形でよろしいでしょうか。また、投稿予定の時刻を過ぎてから直した場合は、S04-01 と同じ決まりで予約します。 |
| S04-09 | 採用した後の投稿案は、タレントが直すことはできません。変えたい場合は、マネージャーが予約を取り消し（6-10「7-2」）、タレントが改めて投稿案を作って採用します。この形でよろしいでしょうか。 |

## 5. Mức sẵn sàng khi khách trả lời theo đề xuất

| Chức năng | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| 4-1 | 🔴 | 🟡 khi có B1, B2; 🟢 khi có thêm 確認16 (có hay không tin tức) |
| 4-2 | 🟡 | 🟢 |
| 4-3 | 🔴 | 🟡 khi có B1, S04-01; 🟢 khi C-01 (bộ trạng thái bài đăng) chốt |
| 4-4 | 🟡 | 🟢; bộ câu thử phải đạt mức đã thống nhất |
| 6-6 | 🟢 | 🟢 |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| B1 | Giờ đăng được quyết định lúc nào | No.56 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| B5 | Quản lý sửa bài dính từ cấm | No.40, No.57, CR-06 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại); màn sửa tối thiểu đã chốt |
| S04-01 | Chấp nhận sau giờ đăng dự kiến | No.56 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S04-02 | Bản nháp chưa dùng giữ bao lâu | No.55 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S04-04 | Nhiều bài chấp nhận trong ngày | No.56 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S04-08 | Nút 予約しない ở M-11 | No.57, CR-06 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S04-09 | Không sửa sau khi chấp nhận | No.39, CR-21 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại); sửa chữ trực tiếp chưa làm |
