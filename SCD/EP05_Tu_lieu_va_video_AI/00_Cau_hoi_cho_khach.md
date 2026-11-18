# EP05 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của 7 chức năng EP05 (6-3, 6-4, 6-5, 5-1, 5-2, 5-3, 5-5) mà **chưa có trong bảng 確認 (mục cần xác nhận) của khách**. Mỗi điểm có đề xuất của đội, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, xem `Phan_tich/21` và bảng cuối tệp này): 確認26, 27 (6-3, 5-1: quản lý gửi và tạo video thay); 確認31 (5-1: hai loại video); 確認32 (6-4: video tự làm); 確認55 (6-4: giữ tư liệu sau khi ngừng).

Lưu ý: việc quản lý gửi ảnh, video thay tài năng **đã có trong [YK2]** §6-7 chức năng 6-3. [KS] 確認27 đã trả lời: quản lý chỉ làm thay cho tài khoản công ty.

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx`; [AG] = `アプリ画面案_AI育成OS.pdf`; File 15 = [15_Cau_hoi_lam_ro_luong.csv](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) (các câu mới đã thêm với mã S05-xx).

## 1. Kiểm tra phạm vi

**Những thứ đã cố ý loại khỏi EP05:**

| Không làm | Lý do |
|---|---|
| Tài năng xóa tư liệu trong ứng dụng | [YK2] không có chức năng xóa (S05-02) |
| Chỉnh sửa ảnh, video (cắt, lọc màu) trong ứng dụng | Không có chức năng tương ứng |
| Tài năng tự viết câu mô tả cho AI tạo video | [AG] T-11 không có ô nhập; hệ thống tự viết từ bản nháp (S05-06) |
| Thêm nhạc nền vào video | [YK2] không có; còn vướng bản quyền |
| Lượt tạo video miễn phí, trần chi phí tháng | v2 đã bỏ ([AG] T-11, M-10) |
| Tự phát hiện video tài năng làm bằng công cụ AI khác | Không làm được; chỉ nhắc tài năng tự ghi (S05-10) |

## 2. Câu phải có trả lời trước khi viết mã

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| S05-05 | 5-1 | Video trình chiếu ảnh (スライド動画) làm bằng cách nào, có tính phí không? | Hai cách: (1) dùng Kling như video ngắn; (2) hệ thống tự ghép ảnh, rẻ và nhanh hơn. Cả hai đều tính một lần tạo theo 5-4, trừ khi khách muốn miễn phí loại này | Trong phạm vi: cách làm của 5-1 |
| — | 5-1, 5-4 | Đơn giá mỗi lần tạo video | アデッソ quyết (UC-06 前提). Chưa có thì màn hiện "¥—" | Khách cung cấp |
| B4 | 6-4 | Video tự làm có thay chủ đề hằng ngày không, có phải chấp nhận không? | Hiện thêm một bản nháp cạnh 3 chủ đề; vẫn phải chấp nhận mới đăng | Trong phạm vi |
| C3 | 5-5 | Upload-Post có bật được nhãn "nội dung do AI tạo" của từng mạng không? | Đội kiểm chứng; mạng nào không hỗ trợ thì thêm một dòng ghi chú cuối chú thích | Trong phạm vi |

## 3. Câu cần trả lời trước kiểm thử chấp nhận (không chặn viết mã)

| Mã | Chức năng | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|---|
| C2 | 6-3, 6-4 | Ảnh, video đi qua đâu trước khi vào OneDrive? | Điện thoại tải thẳng lên Supabase Storage, hệ thống chép sang OneDrive và gửi sang Upload-Post | Trong phạm vi; phí lưu trữ Supabase có thể tăng |
| S05-01 | 6-3 | Định dạng, dung lượng, độ dài, số ảnh | Ảnh JPEG, PNG, HEIC đến 20 MB; video MP4, MOV đến 300 MB, dài 3 giây đến 3 phút; tối đa 10 ảnh mỗi bài. Đã kiểm chứng giới hạn Instagram, TikTok ngày 17/11 (Reels tối đa 300 MB, ít nhất 3 giây); hệ thống tự đổi định dạng trước khi đăng | Trong phạm vi: §6-7 để đội quyết |
| S05-02 | 6-4 | Tài năng có xóa tư liệu trong ứng dụng không? | Không; quản lý xóa trong OneDrive nếu cần | Trong phạm vi |
| S05-03 | 6-4 | Giữ bản tạm trên Supabase bao lâu? | 7 ngày sau khi bài dùng nó đã đăng; cần thì lấy lại từ OneDrive | Trong phạm vi |
| S05-04 | 6-5 | Nhắc gửi tư liệu cho ai? | Không nhắc tài khoản công ty và tài năng đang bị dừng đăng tự động | Trong phạm vi |
| S05-06 | 5-1 | Ai viết câu mô tả chuyển động cho AI? | Hệ thống tự viết từ bản nháp, không có ô nhập | Trong phạm vi |
| S05-07 | 5-1 | Mỗi loại video dùng mấy ảnh? | Video ngắn 1 ảnh; trình chiếu 2–10 ảnh | Trong phạm vi |
| S05-08 | 5-1 | Tạo quá lâu thì sao? | Quá 15 phút coi là lỗi, không tính lần | Trong phạm vi |
| S05-09 | 5-3 | Video bấm "không dùng" có giữ không? | Giữ trong danh sách tư liệu, dùng lại không tốn thêm | Trong phạm vi |
| S05-10 | 5-5 | Video tài năng tự làm bằng công cụ AI khác | Màn lưu video tự làm nhắc tài năng tự ghi rõ trong chú thích | Trong phạm vi |
| B8 | 5-1, 5-4 | Quản lý tạo video thay thì ai trả phí? | Tính vào tài năng đó, ghi người bấm tạo | Trong phạm vi |

## 4. Bản tiếng Nhật để gửi khách

| Mã | 確認事項（日本語案） |
|---|---|
| S05-05 | スライド動画（写真を順に見せる動画）の作り方について、(1) ショート動画と同じく AI の動画生成サービス（Kling）を使う方法と、(2) AI育成OS が写真をつなげて作る方法（費用が安く、早くでき上がります）が考えられます。どちらの方法でも動画生成1回として数え、料金をいただく想定ですが、よろしいでしょうか。スライド動画を料金の対象外にする場合はお知らせください。 |
| B4 | 自分で作った動画を保存した場合は、毎朝のテーマの候補3つに加えて、保存した動画の投稿案を1つ出します。投稿するには、ほかの投稿案と同じように採用が必要です。この形でよろしいでしょうか。 |
| C3 | AI で作った動画の表示（6-8「5-5」）は、投稿サービスが各 SNS の「AI で作った」の設定に対応しているかを弊社で確かめます。対応していない SNS では、投稿の文章の最後に「この動画は AI で作成しています」という一文を入れる形でよろしいでしょうか。 |
| C2 | アプリから送る写真・動画は、サーバーの容量の制限のため、いったん AI育成OS のデータの保存場所（Supabase）に直接送り、そこから OneDrive のタレント別フォルダに保存し、投稿サービスにも送ります。保存場所の利用料が増える場合があります。この形でよろしいでしょうか。 |
| S05-01 | 送れる形式は、写真が JPEG・PNG・HEIC、動画が MP4・MOV とし、1件あたりの上限は写真20MB・動画300MB、動画の長さは3秒から3分まで、1つの投稿の写真は10枚までとする想定です。Instagram のリール動画の上限（300MB、3秒以上）に合わせています。各 SNS に合う形式への変換は、システムが投稿の前に行います。 |
| S05-02 | 送った写真・動画をタレントがアプリで削除する機能は、要件定義書にないため作りません。削除が必要な場合は、マネージャーが OneDrive のタレント別フォルダで削除する形でよろしいでしょうか。 |
| S05-03 | Supabase に一時的に置いた写真・動画は、その写真・動画を使った投稿が終わってから7日後に削除します。OneDrive には残るため、後から投稿に使う場合は OneDrive から読み込みます。この形でよろしいでしょうか。 |
| S05-04 | 写真・動画の催促は、事務所アカウントと、自動投稿を止めているタレントには送らない形でよろしいでしょうか。 |
| S05-06 | AI に動画を作らせるときの指示（どう動かすか）は、タレントが入力するのではなく、投稿案の内容をもとに AI育成OS が作ります。画面案（T-11）と同じく、入力欄は設けません。この形でよろしいでしょうか。 |
| S05-07 | もとにする写真は、ショート動画が1枚、スライド動画が2〜10枚とする想定です。この形でよろしいでしょうか。 |
| S05-08 | 動画の作成を依頼してから15分たってもでき上がらない場合は、作れなかったものとして理由を表示し、動画生成回数に数えません。この形でよろしいでしょうか。 |
| S05-09 | 「使わない」を選んだ AI の動画も、送ったものの一覧に残し、後から投稿に使えるようにします（追加の料金はかかりません）。この形でよろしいでしょうか。 |
| S05-10 | タレントがほかの AI のツールで作った動画を「自分で作った動画」として保存する場合、AI育成OS では AI で作ったかどうかを判断できません。保存の画面に、AI で作った動画は投稿の文章でその旨を伝えるよう案内を表示する形でよろしいでしょうか。 |
| B8 | マネージャーがタレントに代わって動画を作った場合も、そのタレントの動画生成回数に数えて請求し、だれが作ったかを記録する形でよろしいでしょうか。 |

## 5. Mức sẵn sàng khi khách trả lời theo đề xuất

| Chức năng | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| 6-3 | 🟡 | 🟢 |
| 6-4 | 🟡 | 🟢 khi có B4 (và 確認32) |
| 6-5 | 🟡 | 🟢 khi B1 (EP04) có trả lời |
| 5-1 | 🔴 | 🟡 khi có S05-05 và đơn giá; 🟢 khi kiểm chứng xong Kling |
| 5-2 | 🟡 | 🟢 khi đăng thử được trên 3 mạng |
| 5-3 | 🟡 | 🟢 |
| 5-5 | 🔴 | 🟢 khi kiểm chứng xong C3 |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| B4 | Video tự làm và chủ đề hằng ngày | No.37, CR-23 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại); chưa làm tới khi khách quyết (No.50); [KS] 確認32 vẫn chưa trả lời |
| B8 | Quản lý tạo video thay cho tài năng thì ai trả tiền | CR-09 | Đã chốt trong Q&A: phí tính vào hóa đơn của tài năng |
| C2 | Nơi lưu tạm ảnh và video | No.8, CR-10 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại); thiết kế dùng Supabase Storage làm nơi lưu tạm (phương án B) |
| S05-03 | Giữ bản tạm trên Supabase | No.8, CR-10 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S05-05 | Cách làm video trình chiếu ảnh | No.36, CR-04 | Đã chốt trong Q&A: ghép ảnh ở máy chủ, không dùng thêm dịch vụ AI |
| S05-10 | Video làm bằng công cụ AI khác | CR-23 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại); chưa làm tới khi khách quyết (No.50) |
