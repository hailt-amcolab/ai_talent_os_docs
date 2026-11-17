# EP03 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của 9 chức năng EP03 (3-1 đến 3-9) mà **chưa có trong bảng 確認 (mục cần xác nhận) của khách**. Mỗi điểm có đề xuất của đội, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 không xử lý ở đây, chỉ ghi lại để biết chức năng nào đang chờ: 確認14, 15, 18, 20–23 (3-4); 確認17, 23 (3-3); 確認19, 43 (3-9); 確認5, 39 (3-7); 確認6–8 (chỉ thị cho AI, 3-1). Không câu 確認 nào trong số này chặn việc viết mã, vì chỉ đổi nội dung lời nhắc hoặc giá trị tham số.

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx`; [AG] = `アプリ画面案_AI育成OS.pdf`; File 15 = [15_Cau_hoi_lam_ro_luong.csv](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) (các câu mới đã thêm với mã S03-xx).

## 1. Kiểm tra phạm vi

Cùng nguyên tắc với EP01: đề xuất chỉ được là cách làm của một trong 54 chức năng, hoặc là yêu cầu chung đã có trong [YK2].

**Những thứ đã cố ý loại khỏi EP03:**

| Không làm | Lý do |
|---|---|
| Gửi ảnh trong hội thoại | UC-04 前提: trò chuyện bằng chữ. Ảnh, video gửi ở T-10 (6-3) |
| Hội thoại bằng giọng nói | [YK2] §13: chức năng xem xét sau |
| Gửi thư hoặc gọi điện cho quản lý khi có chuyện nghiêm trọng | 別紙A: thông báo này chỉ hiện ở danh sách thông báo trên màn hình quản trị |
| Thông báo riêng mỗi khi người theo dõi tăng | Đề xuất A7: gộp vào thông báo đạt mục tiêu |
| Màn tổng chi phí AI của cả công ty, mức trần chi phí | 3-5 chỉ yêu cầu tổng theo tài năng và theo tháng; [AG] chỉ có dòng ở M-10 |
| Màn quản lý nhiệm vụ hằng ngày, màn nhập thử thách | Nhiệm vụ do AI viết trong tin buổi sáng (UC-04). Thử thách viết trong hồ sơ (B12) |

**Chi phí cần lưu ý (trong phạm vi nhưng nên báo khách):** không giới hạn số lần nhắn (theo giả định của 確認23) thì phí OpenAI không có trần. 3-5 cho thấy phí theo từng tài năng để khách theo dõi.

## 2. Câu phải có trả lời trước khi viết mã

Cả hai câu đều thuộc 3-3 và liên quan an toàn của tài năng, nhất là người vị thành niên. Phần chặn chủ đề ngoài lề của 3-3 vẫn làm được ngay.

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S03-02 | 3-3 | Tài năng có dấu hiệu tự hại, nguy hiểm tới tính mạng thì AIコーチ làm gì? | Coi là chuyện nghiêm trọng, báo mọi quản lý, và AIコーチ trả lời bằng câu an toàn cố định có thông tin nơi tư vấn. Đội soạn câu, khách duyệt | Trong phạm vi: cách xử lý "深刻な相談" của 3-3; chỉ thêm nội dung câu trả lời, không thêm chức năng |
| S03-04 | 3-3 | Những gì tính là "chuyện nghiêm trọng"? | Sức khỏe (thể chất, tinh thần) và rời công ty như [YK2], thêm dấu hiệu nguy hiểm ở S03-02. Khách muốn thêm loại khác (ví dụ rắc rối, quấy rối) thì chỉ sửa lời nhắc phân loại | Trong phạm vi |

## 3. Câu cần trả lời trước kiểm thử chấp nhận (không chặn viết mã)

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S03-01 | 3-1 | Chỉ thị giọng văn cho AI đặt ở đâu khi chưa có màn chỉ thị (確認6)? | File `共通/AIへの指示.md` cho mọi tài năng, mục `個別の指示` trong hồ sơ cho từng người | Trong phạm vi: §7-5 cho phép đổi cách AI nói bằng file |
| S03-03 | 3-3 | Câu từ chối khi tài năng nhờ việc không liên quan | Đội soạn, khách duyệt | Trong phạm vi |
| S03-05 | 3-9 | Ngày đang bị dừng đăng tự động có tính là ngày không đăng không? | Không tính | Trong phạm vi |
| S03-06 | 3-4, 3-8 | Tổng kết tuần gửi riêng hay gộp? | Gộp vào tin buổi sáng của ngày đã cài | Trong phạm vi |
| S03-07 | 3-6 | Hôm qua không đăng thì tin buổi sáng ghi gì? | Bỏ phần nhận xét, thay bằng một câu khích lệ ngắn | Trong phạm vi |
| S03-08 | 3-5 | Phí AI hiện thế nào? | Ở M-10, theo yên, tháng này, gồm mọi lần gọi AI cho tài năng đó; không có mức trần | Trong phạm vi |
| S03-10 | 3-3 | Một tài năng nói nhiều tin nghiêm trọng liên tiếp thì báo mấy lần? | Khi đã có thông báo 深刻な相談 chưa xử lý của tài năng đó thì không tạo thêm, chỉ đánh dấu tin | Trong phạm vi |
| A7 | 3-7 | 別紙A có cả フォロワーの増加 (tăng người theo dõi, "theo điều kiện đã định") và 目標の達成 (đạt mục tiêu) | Chỉ giữ 目標の達成, mỗi mạng mỗi mục tiêu báo một lần. Tăng thì nói trong tin buổi sáng | Trong phạm vi: bớt chứ không thêm |
| A8 | 3-4 | §9-2 nói buổi sáng phải tạo xong bản nháp; 4-1 nói buổi sáng chỉ có chủ đề | Lô buổi sáng gồm nhận xét hôm qua và 3 chủ đề; sửa §9-2 cho khớp | Trong phạm vi |
| B10 | 3-4, 3-9 | Tài khoản công ty có nhận tin buổi sáng và lời nhắc không đăng không? | Có tin buổi sáng; không nhắc không đăng và không báo quản lý | Trong phạm vi |
| B12 | 3-7 | Thử thách hoàn thành được xác định thế nào? Quá hạn mục tiêu thì sao? | AI đánh giá từ số liệu hệ thống; không làm màn nhập thử thách; quá hạn thì hiện "quá hạn" ở danh sách quản trị | Trong phạm vi |

## 4. Báo cho khách, không cần trả lời

- S03-09: trò chuyện với AIコーチ chỉ bằng chữ. Ảnh và video gửi qua màn 写真・動画を送る (T-10).
- AI có thể bỏ sót chuyện nghiêm trọng ([YK2] §11 không cam kết chất lượng nội dung AI). Quản lý vẫn đọc được mọi hội thoại ở M-09.

## 5. Bản tiếng Nhật để gửi khách

| Mã | 確認事項（日本語案） |
|---|---|
| S03-02 | タレントが AIコーチとの会話で、自分を傷つけることや命に関わる危険をほのめかした場合（特に未成年のタレント）は、深刻な相談としてマネージャーにお知らせするとともに、AIコーチが決まった文面（相談窓口のご案内を含みます）で返答する形を提案します。文面は弊社が案を作り、アデッソ様にご確認いただきます。この形でよろしいでしょうか。 |
| S03-04 | マネージャーにお知らせする「深刻な相談」は、要件定義書の「体調や退所の相談」（心身の不調を含みます）に、S03-02 の危険の兆候を加えた範囲とする想定です。ほかにお知らせしたい相談の種類（例：トラブル、ハラスメント）がありましたらお教えください。 |
| S03-01 | AIコーチの口調（文体）などの AI への指示文は、指示の画面の扱い（確認6）が決まるまでは、共通のフォルダの「AIへの指示.md」と、タレントの情報のファイルの「個別の指示」に書いていただく形でよろしいでしょうか（7-5「ファイルに書いて AI に伝えられる内容」）。 |
| S03-03 | 投稿と関係のない依頼を AIコーチが断るときの決まった文言は、弊社が案を作り、アデッソ様にご確認いただく形でよろしいでしょうか。 |
| S03-05 | マネージャーがタレントの自動投稿を止めている間（すべての自動投稿の停止を含みます）は、「投稿のない日数」に数えない形でよろしいでしょうか。 |
| S03-06 | 週次の振り返りは、決めた曜日の毎朝の声かけにまとめて届ける形でよろしいでしょうか。 |
| S03-07 | 前日に投稿がなかった場合は、翌朝の声かけで前日の振り返りを省き、短い励ましの言葉を入れる形でよろしいでしょうか。 |
| S03-08 | AI の利用料は、そのタレントのために使った AI の料金（会話、毎朝の声かけ、投稿案の作成、使ってはいけない言葉の確認などをすべて含みます）を、今月分を円に換算して、タレントの詳細（設定）の画面（M-10）に表示します。上限は設けません。この形でよろしいでしょうか。 |
| S03-10 | 同じタレントの「深刻な相談」のお知らせが対応済みになっていない間は、新しいお知らせを増やさず、会話に印を付けるだけにする形でよろしいでしょうか。 |
| A7 | 別紙A に「フォロワーの増加（決めた条件で増えたとき）」と「目標の達成」の2つがありますが、「決めた条件」が決まっていません。SNS ごとにフォロワー数が目標に達したときの「目標の達成」のお知らせだけとし、フォロワーが増えたときは、毎朝の声かけで目標までの残りを伝える形でよろしいでしょうか。 |
| A8 | 9-2 では「毎朝、声をかける時刻までに投稿案の作成を終える」と書いていますが、6-6「4-1」では、毎朝はテーマの候補を出し、投稿案はタレントがテーマを選んだ後に作ります。毎朝の処理は「前日の振り返りとテーマの候補3つ」までとし、9-2 をこの内容に直す形でよろしいでしょうか。 |
| B10 | 事務所アカウントにも毎朝の声かけ（テーマの候補）を届けますが、投稿のない日の声かけと、投稿のない日が続いたときのマネージャーへのお知らせは行わない形でよろしいでしょうか。 |
| B12 | チャレンジの達成は、AI育成OS が持っている数字（続けて投稿した日数、投稿の本数、フォロワーの増え方）をもとに AIコーチが判断し、達成したときにお祝いを伝えます。チャレンジを入力する専用の画面は作りません。フォロワー数の目標の期限を過ぎても達成していない場合は、管理画面のタレント一覧に「期限切れ」と表示します。この形でよろしいでしょうか。 |

## 6. Mức sẵn sàng khi khách trả lời theo đề xuất

| Chức năng | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| 3-1 | 🟡 | 🟢 |
| 3-4 | 🟡 | 🟢 (nội dung tin buổi sáng vẫn chỉnh theo 確認14, 20, 21) |
| 3-3 | 🔴 | 🟡 khi có S03-02, S03-04 và câu chữ đã duyệt; bộ câu thử phải đạt mức đã thống nhất |
| 3-9 | 🟡 | 🟢 |
| 3-2 | 🟡 | 🟢 |
| 3-6 | 🟡 | 🟢 khi 8-7 có số liệu thật |
| 3-8 | 🟡 | 🟢 |
| 3-7 | 🟡 | 🟢 |
| 3-5 | 🟡 | 🟢 |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| B10 | Huấn luyện viên AI với tài khoản văn phòng | No.66 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| B12 | Thử thách và hạn mục tiêu | CR-22 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại); màn thử thách chưa làm tới khi khách quyết |
| S03-02 | Dấu hiệu tự hại, nguy hiểm | No.18 | Đã chốt trong Q&A một phần: quy tắc cho tài năng vị thành niên nằm trong file chỉ thị do khách viết |
| S03-03 | Câu từ chối cố định | No.18 | Đã chốt trong Q&A một phần: câu từ chối do khách viết vào file chỉ thị |
| S03-05 | Ngày đang dừng đăng tự động | No.60 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S03-08 | Cách hiện phí AI | No.17 | Đã chốt trong Q&A: tổng hợp theo tài năng và tháng, không trần |
