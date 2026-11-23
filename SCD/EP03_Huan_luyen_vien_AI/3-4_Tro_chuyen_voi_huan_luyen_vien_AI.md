# 3-4 Trò chuyện với huấn luyện viên AI

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**PWA: kiểm tra thông báo và phương án thay thế — PROPOSAL của nguồn:** Đề nghị hướng dẫn mở Safari, thêm màn hình chính, mở từ icon, cho phép và nhận thông báo thử; không cho phép thì báo trong app hoặc email; mở lại vẫn thấy lời nhắn. **Giới hạn:** PWA cơ bản đã có trong phạm vi; email dự phòng cho Talent và bước thử cần đối chiếu. 7:30 là ví dụ, không thay lịch cấu hình sáng/trưa/tối; tài liệu hỗ trợ WebPush không chứng minh thiết bị đã được kiểm thử. Nguồn `ISS22-P PDFtrang4; ADV22 PDFtrang3`; EV `EV-1244;EV-1254`.

**Rải giờ và tối ưu theo chu kỳ 30 ngày — PROPOSAL của nguồn:** Đề nghị rải phút theo Talent/SNS, tránh giờ tròn, thử các khung trong 30 ngày rồi dùng kết quả cho 30 ngày tiếp; mục tiêu hiệu quả, phân tải và có thời gian giao lưu. **Giới hạn:** Không coi ví dụ 19:07/20:23 hoặc chu kỳ 30 ngày là mốc đã chốt. Dữ liệu watch time chưa được kiểm; chỉ thị AI không tự bảo đảm scheduler phân tải hoặc tuân thủ cap. Nguồn `ISS22-P PDFtrang5; ADV22 PDFtrang8; ADV22 PDFtrang11`; EV `EV-1245;EV-1259;EV-1262`.

**Nhắc tương tác sau đăng — PROPOSAL của nguồn:** Đề nghị nhắc xem phản hồi sau 30 phút, trả lời/giao lưu vài giờ sau, phân tích hôm sau và báo cáo/thử thách hằng tuần; nhắc bình luận chưa trả lời. **Giới hạn:** Nhắc chung qua chỉ thị khác chức năng phát hiện từng bình luận chưa trả lời. Không tự mở API comment/auto-like/auto-follow; các mốc nhắc chưa được duyệt. Nguồn `ISS22-P PDFtrang6; ISS22-P PDFtrang8; ADV22 PDFtrang11`; EV `EV-1246;EV-1248;EV-1262`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Đối chiếu nguồn hiện hành — 20/11/2026

Mỗi sáng báo kết quả hôm trước, follower tăng,3 chủ đề và thử thách; nhắc tư liệu trong ngày; kết quả sau đăng; tổng kết tuần. Giờ chung chỉnh tại M-17.

Không chốt giờ 8/12/19 từ hình minh họa; giờ vận hành là cấu hình, số liệu SNS có thể chậm.

Căn cứ: `T19:12,13,16,27;M19:22` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0564;EV-0565;EV-0568;EV-0579;EV-0607`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-5, chức năng 3-4; §5-2; §5-5; UC-04, UC-04 前提; 別紙A (phụ lục A) |
| Màn hình [AG] | T-08 (trò chuyện), T-07 (trang chủ), M-09 (quản lý đọc) |
| Tên trong mã nguồn | AI Coach Chat |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Nội dung tin nhắn buổi sáng còn chờ 確認14, 15, 20, 21 nhưng đều là nội dung lời nhắc, không đổi cấu trúc |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ tham số | ⚠ đội đề xuất | ✅ | ✅ OpenAI | ⚠ đội đề xuất | ⚠ 3-1, 4-1, 8-3 |

## Mục đích

Tài năng nhắn tin với AIコーチ trong ứng dụng. Mỗi sáng AIコーチ chủ động gửi kết quả hôm qua và chủ đề hôm nay. Khi đăng bài thành công thì báo đã đăng và số ngày đăng liên tục (§6-5 chức năng 3-4).

## Tác nhân và quyền

- Tài năng: nhắn tin, xem lại hội thoại cũ.
- Quản lý: chỉ đọc hội thoại ở M-09 (7-1).
- Điều kiện dùng: trạng thái 利用中 (đang dùng) và đã đăng ký thanh toán (6-2), trừ tài khoản công ty.

## Luồng chính

**A. Tài năng nhắn tin (T-08)**
1. Tài năng nhập tối đa 1.000 ký tự, bấm 送信 (gửi).
2. Hệ thống lưu tin nhắn, kiểm tra chủ đề và chuyện nghiêm trọng (3-3).
3. Ghép ngữ cảnh (3-1), gọi OpenAI, trả lời theo kiểu chữ chạy dần (stream). Lưu câu trả lời.
4. Nếu tài năng chọn chủ đề (bấm "選ぶ" ở T-07 hoặc trả lời "1にします"), chuyển sang tạo bản nháp (4-1, EP04).

**B. Tin nhắn buổi sáng**
5. Lô trước giờ nhắn (2-1) chuẩn bị nội dung. Tin gửi theo khung sáng (mặc định 8:00, §5-2), trưa, tối ([KS] 確認18; giờ và nội dung từng khung chờ Q&A No.73, AMCOLAB đề xuất sáng 8 giờ: kết quả hôm qua, chủ đề, nhiệm vụ; trưa 12 giờ: nhắc gửi ảnh; tối 20 giờ: hỏi han khi 3 ngày không đăng, báo đạt mục tiêu). Tin của khung sáng gồm:
   - kết quả hôm qua và điểm cải thiện (3-6);
   - 3 chủ đề gợi ý (4-1), khi tài năng dùng cách đăng 要確認 và tới lượt đề xuất theo nhịp ở chỉ thị cho AI ([KS] 確認14, 19);
   - nhiệm vụ hôm nay và tiến độ thử thách (UC-04, T-07 "今日のミッション");
   - thứ Hai thêm tổng kết tuần (3-8, S03-06);
   - ngày thứ 3 không đăng thì thêm lời hỏi han (3-9).
6. Gửi thông báo đẩy loại 毎朝の声かけ (lời chào buổi sáng, 別紙A).

**C. Sau khi đăng bài**
7. Khi 8-3 báo đăng thành công trên ít nhất một mạng, gửi tin "đã đăng" kèm số ngày đăng liên tục, và thông báo 達成のお祝い (chúc mừng, 別紙A).

**D. Xem lại**
8. Cuộn lên để xem hội thoại cũ, tải dần từng trang.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| OpenAI lỗi khi trả lời | Hiện "AIコーチ đang bận, thử lại sau", giữ tin nhắn của tài năng, có nút gửi lại | §6-5 |
| Tin nhắn buổi sáng tạo lỗi | Thử lại trong lô. Đến giờ nhắn mà vẫn lỗi thì gửi muộn khi tạo được, ghi nhật ký xử lý | §9-3; [Đề xuất nội bộ] |
| Quá 1.000 ký tự | Không cho gửi, hiện số ký tự | §6-5 |
| Gửi tin nhắn mới khi câu trả lời trước chưa xong | Khóa nút gửi tới khi xong | [Đề xuất nội bộ] |
| Tài năng gửi ảnh vào hội thoại | Không hỗ trợ; chỉ có chữ (UC-04 前提). Ảnh, video gửi qua T-10 (6-3) | UC-04 前提 |
| Tài năng chưa đăng ký thanh toán, hoặc không ở 利用中 | Chặn, nhắc quay lại T-04 (6-2) | 6-2 |
| Đăng thành công nhiều bài trong ngày | Chỉ tăng số ngày liên tục một lần mỗi ngày; mỗi bài vẫn có tin "đã đăng" | 確認22 (giả định) |
| Tài khoản công ty | Vẫn có tin nhắn buổi sáng | B10 |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Độ dài tối đa mỗi tin | 1.000 ký tự | Tham số | §6-5 |
| Giờ tin nhắn | Khung sáng 8:00; trưa, tối chưa có giờ | Tham số (M-17) | §5-2, [KS] 確認18 |
| Số lần nhắn mỗi ngày | Không giới hạn | Giả định (確認23); khách ghi muốn đặt giới hạn, chưa chốt | — |
| Ngày đăng liên tục | Ngày có ít nhất 1 bài đăng thành công; một ngày không đăng thì tính lại từ 1 | Giả định; quyết khi vận hành ([KS] 確認22) | — |
| Ngày tính theo | Giờ Nhật (JST), từ 0:00 đến 24:00 | [Đề xuất nội bộ] | — |

## Dữ liệu [Đề xuất nội bộ]

- `coach_messages`: `id`, `talent_id`, `role` (`talent`, `coach`), `kind` (`chat`, `morning`, `posted`, `nudge`, `refusal`), `content`, `flags` (kết quả 3-3), `created_at`. RLS theo `talent_id` (1-5). Hội thoại lưu trong hệ thống (§7-2).
- `morning_briefs`: `talent_id`, `date`, `content`, `status` (`prepared`, `sent`, `failed`).

## Màn hình

- T-08: lịch sử hội thoại, ô nhập "メッセージ（1,000文字まで）", nút 送信, các nút trong tin của AI ("投稿案を見る", "写真・動画を送る").
- T-07: nhiệm vụ hôm nay, 3 chủ đề gợi ý, "自分で投稿したいテーマを伝える".
- M-09: hội thoại chỉ đọc (7-1).

## Tích hợp

- OpenAI: trả lời dạng chữ chạy dần.
- Web Push (6-1): 毎朝の声かけ, 達成のお祝い.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng gửi tin 1.001 ký tự, thì không gửi được.
2. Cho tài năng hỏi về cách chụp ảnh, thì nhận câu trả lời và cả hai tin được lưu.
3. Cho OpenAI lỗi, thì hiện thông báo lỗi, tin của tài năng còn nguyên, bấm gửi lại thì nhận được trả lời khi dịch vụ chạy lại.
4. Cho giờ nhắn là 8:00, thì tài năng ở 利用中 nhận tin buổi sáng trong khoảng 8:00 đến 8:10, kèm thông báo đẩy.
5. Cho thứ Hai, thì tin buổi sáng có phần tổng kết tuần.
6. Cho bài đăng thành công, thì tài năng nhận tin "đã đăng" và số ngày liên tục tăng 1 (chỉ một lần mỗi ngày).
7. Cho tài năng chưa đăng ký thanh toán, thì không mở được T-08 để nhắn.

## Ngoài phạm vi của chức năng này

- Gửi ảnh trong hội thoại. Hội thoại bằng giọng nói (§13, xem xét sau).
- Tạo bản nháp (4-1), gửi tư liệu (6-3).

## Phụ thuộc

3-1 (ngữ cảnh), 3-3 (kiểm tra chủ đề), 4-1 (chủ đề gợi ý), 8-3 (sự kiện đăng thành công), 6-1 (thông báo đẩy), 2-1 (lô buổi sáng).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認14, 15, 18, 20, 21, 22, 23.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S03-06 | Thứ Hai gộp tổng kết tuần vào tin buổi sáng | Không | Gộp |
| S03-09 | Chỉ nhắn bằng chữ, không gửi ảnh trong hội thoại | Không | Chỉ chữ |
| A8 | Lô buổi sáng chỉ chuẩn bị chủ đề gợi ý, chưa tạo bản nháp | Không | Như A8 |
| B10 | Tài khoản công ty có tin buổi sáng không | Không | Có |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-2, §5-5, §6-5 (3-4), §7-2, §13, UC-04, UC-04 前提, 別紙A, 確認14, 15, 18, 20–23.
- [AG] trang 3 (T-07, T-08), trang 8 (M-09).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.7 (đóng 17/11): quản lý xem toàn bộ hội thoại, tài năng được báo lần đầu mở ứng dụng (確認13, 42). Không làm hội thoại riêng tư (CR-24).
