# EP10 – Câu hỏi cho khách để triển khai được

File này gom các điểm còn mở của EP10 (C-01 đến C-06) và **8 câu về hạ tầng (I1–I8)** từ [file 18](../../Phan_tich/18_Ha_tang_he_thong.md) mục 10. Các câu này chưa có trong bảng 確認 (mục cần xác nhận) của khách. Mỗi câu có đề xuất, kết quả kiểm tra phạm vi và bản tiếng Nhật để gửi.

Các 確認 liên quan, chỉ ghi lại: 確認45 (C-05), 確認55 (C-03: thời gian giữ dữ liệu).

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx`; [AG] = `アプリ画面案_AI育成OS.pdf`; File 15 = [15_Cau_hoi_lam_ro_luong.xlsx](../../Phan_tich/15_Cau_hoi_lam_ro_luong.xlsx) (mã S10-xx, I1–I8).

## 1. Kiểm tra phạm vi

C-01 đến C-06 không phải chức năng mới; đều là yêu cầu chung đã có trong [YK2] (§5-1, §5-6, §9-3, §9-4, §6-13, §6-14).

| Không làm | Lý do |
|---|---|
| Màn xem nhật ký thao tác và xử lý | [AG] chỉ có M-19 (lượt xem); §9-4 chỉ yêu cầu ghi (S10-02) |
| Cho chọn nhân vật khác ngoài モモ | §6-14 chỉ ghi "sẽ xem xét" (S10-03) |
| Màn tổng hợp tình trạng dịch vụ ngoài cho quản lý | Không có trong [YK2]; đội vận hành theo dõi (C-04) |

## 2. Câu phải có trả lời trước khi dựng hạ tầng

| Mã | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|
| I1 | Ứng dụng tin nhắn Instagram đang chạy trên tài khoản Vercel, Supabase, VPS nào? Đội có được cấp tài khoản thành viên không? | Tạo dự án riêng cho AI育成OS, không dùng chung với ứng dụng tin nhắn (§9-1) | Trong phạm vi: §8, §9-1 |
| I2 | Dùng tên miền nào, ai quản lý DNS? | Tên miền con của アデッソ | Khách cung cấp |
| I3 | Thư mục OneDrive đặt ở đâu; quyền Microsoft Graph | Cùng nội dung với S02-02 (bản tiếng Nhật ở file câu hỏi EP02) | Trong phạm vi |
| I4 | Cấu hình VPS hiện tại, còn dư sức chạy thêm không? | Nếu không dư thì thuê thêm VPS | Khách cung cấp |

## 3. Câu cần trả lời trước kiểm thử chấp nhận

| Mã | Câu hỏi | Đề xuất | Phạm vi |
|---|---|---|---|
| S10-01 | Cách ghép các tình huống vào 6 trạng thái của hình 5-1 | Trả lại, quá hạn duyệt, quản lý hủy, dừng đăng tự động: 取り消し. Dính từ cấm: giữ 投稿案. Lỗi một phần mạng: 失敗, hiện kết quả từng mạng | Trong phạm vi: §5-1 |
| S10-02 | Có cần màn xem nhật ký thao tác và xử lý không? | Không làm màn; đội trích xuất khi khách yêu cầu | Trong phạm vi |
| S10-03 | Có cho chọn nhân vật khác không? | Lần này chỉ モモ | Trong phạm vi |
| A10 | Bộ mã màn hình chính thức | Dùng bộ [AG], kèm bảng đối chiếu với thiết kế của khách | Trong phạm vi |
| I5 | GMO gửi kết quả về đâu, có đòi IP cố định không? | Khách hỏi GMO | Khách cung cấp |
| I6 | Môi trường thử có hợp đồng riêng không (GMO thử, gói Upload-Post, khóa fal.ai và OpenAI)? | Có, tách khỏi môi trường thật | Trong phạm vi: §9-1, §12-4 |
| I7 | Đặt dữ liệu ở Tokyo được không? | Tokyo | Trong phạm vi: §10-3 |
| I8 | Sao lưu thế nào? | Sao lưu hằng ngày, giữ 7 ngày; không dùng khôi phục về đúng thời điểm (tốn thêm phí) | Trong phạm vi: §9-3 |

## 4. Thứ khách phải cung cấp

| Cần gì | Dùng cho |
|---|---|
| Ảnh logo và mã màu của ứng dụng アデッソ hiện có (§6-14) | C-06, 6-8 |
| Thông tin ở I1, I2, I4, I5 | Dựng hạ tầng (file 18 mục 11) |

## 5. Bản tiếng Nhật để gửi khách

| Mã | 確認事項（日本語案） |
|---|---|
| I1 | 現在稼働中の InstagramDM 自動化アプリは、Vercel・Supabase・Xserver の VPS のどのアカウントで動いていますか。AI育成OS は、DM 自動化アプリに影響を出さないよう、別のプロジェクトとして作る想定です。弊社の開発者がそれぞれのアカウントにメンバーとして参加できるよう、ご手配をお願いできますでしょうか。 |
| I2 | AI育成OS で使うドメイン（例：アデッソ様のドメインのサブドメイン）と、DNS を管理されている方をお教えください。 |
| I4 | Xserver の VPS の現在の構成（CPU、メモリ、OS）と、AI育成OS の処理を追加で動かす余裕があるかをお教えください。余裕がない場合は、VPS の追加のご契約をご相談させてください。 |
| S10-01 | 図5-1 の6つの状態に、次のように当てはめます。差し戻し・承認の期限切れ・マネージャーの取り消し・自動投稿の停止による取り消しは「取り消し」、使ってはいけない言葉で止まった投稿は「投稿案」のまま、一部の SNS だけ失敗した投稿は「失敗」（SNS ごとの結果を表示します）とします。この形でよろしいでしょうか。 |
| S10-02 | 操作と処理の記録（9-4）は AI育成OS に残しますが、管理画面で見る画面は作らず、必要なときにアデッソ様のご依頼で弊社が取り出す形でよろしいでしょうか（閲覧の記録は M-19 で見られます）。 |
| S10-03 | 6-14 の「キャラクターを選べる形も検討します」は、今回は「モモ」だけとし、選べる形は作らない想定でよろしいでしょうか。 |
| A10 | 画面ID は、最新の画面案（アプリ画面案、2026年11月12日）の T-01〜T-15、M-01〜M-19 を正式なものとし、アデッソ様のデザイン案の画面との対応表を添える形でよろしいでしょうか。 |
| I5 | 決済代行会社からの結果の通知を受け取る先について、IP アドレスの固定などの条件があるかを、決済代行会社にご確認いただけますでしょうか。 |
| I6 | テスト用の環境で使う外部サービス（決済代行会社のテスト環境、投稿サービスのテスト用のプラン、動画生成と AI のテスト用のキー）を、本番とは別にご用意いただけますでしょうか。 |
| I7 | AI育成OS のデータの保存場所は、日本（東京）の地域にする想定です。個人情報の保存場所について、ご社内の決まりがあればお教えください。 |
| I8 | データのバックアップは、毎日のバックアップ（7日間保存）を標準とし、任意の時点に戻せる機能（追加の料金がかかります）は付けない想定です。この形でよろしいでしょうか。 |

## 6. Mức sẵn sàng khi khách trả lời theo đề xuất

| Mục | Hiện tại | Sau khi khách trả lời |
|---|---|---|
| C-01 | 🟡 | 🟢 khi có S10-01, A3, S01-01 |
| C-02 | 🟢 | 🟢 |
| C-03 | 🟡 | 🟢 khi có S10-02 và thời gian giữ |
| C-04 | 🟡 | 🟢 |
| C-05 | 🟡 | 🟢 khi có A6, A7 |
| C-06 | 🟡 | 🟢 khi có logo, mã màu, A10 |

## Đối chiếu với file Q&A (bản ngày 15/11/2026)

Các câu dưới đây đã có trong `AI-Talent-OS_Q&A表.xlsx`. Câu đã gửi thì **không gửi lại**; câu đã chốt thì làm theo. Chi tiết ở `Phan_tich/19_Doi_chieu_QA_bao_gia.md`.

| Mã | Tiêu đề | Q&A | Tình trạng |
|---|---|---|---|
| A3 | Tên và số lượng trạng thái của tài năng | No.10 | Đã chốt trong Q&A |
| A6 | Danh sách thông báo thiếu so với các chức năng | No.61 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| A10 | Ba bộ mã màn hình trùng nhau | No.30, No.68 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| S10-01 | Ghép tình huống vào 6 trạng thái bài đăng | No.51 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại); hình 5-1 đã có trong tệp v2 |
| I1 | Tài khoản Vercel, Supabase, VPS đang dùng | No.24 | Đã có trong Q&A, chờ khách trả lời (không hỏi lại) |
| I8 | Sao lưu | No.29 | Việc nội bộ (theo Q&A) |
