# 7-5 Dừng đăng tự động, toàn bộ hoặc từng tài năng

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Dừng hệ thống và lịch bên dịch vụ — FACT của nguồn:** Nguồn giữ quyết định không có nút dừng toàn bộ, yêu cầu kiểm lịch đã gửi có dừng khi hệ thống ngừng không; bảng kỹ thuật vẫn liệt kê dừng toàn bộ/từng người/SNS. **Giới hạn:** Không khôi phục nút global từ bảng khái quát. Tắt API/worker không chứng minh lịch bên dịch vụ đã hủy; chưa cam kết dừng khi provider không truy cập được hoặc bài đang publish. Nguồn `ISS22-P PDFtrang2; ISS22-P PDFtrang7; ADV22 PDFtrang8; ADV22 PDFtrang10`; EV `EV-1242;EV-1247;EV-1259;EV-1261`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Cập nhật nguồn tiếp nhận23/11/2026

**FACT về nội dung nguồn; bản tác giả chưa qua G5/G8.** Phần này thay mô tả cũ bên dưới cho đúng chủ đề có căn cứ; không kế thừa màu sẵn sàng/AC cũ hoặc xác nhận thương mại.

- **Bỏ dừng đăng toàn hệ thống:** Không có chức năng dừng tự động toàn hệ thống; vẫn dừng theo từng Talent. Khi cần dừng toàn bộ thì vận hành dừng hệ thống. **Còn mở/giới hạn:** Thay đề xuất giữ nút toàn bộ ở QA No.77/91; không suy người thao tác, cơ chế hạ tầng hay SLA dừng. Cách xử lý lịch đã gửi còn cần thiết kế/provider. Nguồn `KS 確認事項!K85;20261120!F33`; bằng chứng `EV-0981`.

Đối chiếu/hash và khác biệt nguồn: [báo cáo23/11](../../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md).

<details>
<summary>Đặc tả trước tiếp nhận23/11 — giữ để truy vết; không dùng phần mâu thuẫn làm hành vi hiện hành</summary>


## Đối chiếu nguồn hiện hành — 20/11/2026

Dừng riêng hoặc toàn bộ ngăn lịch mới và hủy lịch đã có; chạy lại không phục hồi bài đã hủy; tự làm video cũng dừng theo BF19 trang 19.

Phần này có mô tả rõ nhưng KS 20261120 No.32 vẫn chưa trả lời; tiếp tục theo dõi tại đó, không tạo câu hỏi trùng. Bài mới trong lúc dừng còn No.60.

Căn cứ: `M19:15,21;BF19:19;KS:20261120:32` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0600;EV-0606;EV-0631`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-10, chức năng 7-5; §5-6; UC-08 前提 |
| Màn hình [AG] | M-16 (toàn bộ), M-10 (từng tài năng: 自動投稿 動作中, nút 止める) |
| Tên trong mã nguồn | Auto-posting Stop/Resume |
| Mức sẵn sàng | 🟡 Vàng – giao agent được; hủy hàng loạt trên Upload-Post phải kiểm chứng |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ C-01 | ✅ | ⚠ kiểm chứng | ⚠ đội đề xuất | ⚠ 7-2 |

## Mục đích

Quản lý dừng hoặc chạy lại toàn bộ việc đăng tự động, hoặc riêng cho một tài năng. Khi dừng, không hẹn bài mới và hủy cả bài đã hẹn; bài đã hủy không đăng lại sau khi chạy lại (§6-10 chức năng 7-5, UC-08 前提).

## Tác nhân và quyền

Mọi quản lý (một loại quyền, 1-6).

## Luồng chính

1. **Toàn bộ (M-16):** bấm すべての自動投稿を止める, xác nhận ở hộp thoại ghi rõ hậu quả.
2. Ghi cờ dừng toàn bộ. Hủy mọi bài "đã hẹn giờ" trên Upload-Post (qua 7-2), bài sang "đã hủy".
3. M-16 hiện "đang dừng" và nút 再開する (chạy lại); bảng "lịch sử dừng và chạy lại" (ngày giờ, thao tác, người làm).
4. **Từng tài năng (M-10):** nút 止める, 再開する; hậu quả như trên nhưng chỉ cho tài năng đó.
5. Trong lúc dừng: AIコーチ vẫn nhắn và tạo bản nháp (S06-06); bài được chấp nhận giữ ở "đã chấp nhận, chưa hẹn giờ" (B6).
6. Chạy lại: bài "đã chấp nhận, chưa hẹn giờ" mà chưa quá giờ thì hẹn; quá giờ thì hủy và báo tài năng (B6). Bài đã hủy lúc dừng không đăng lại.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Hủy trên Upload-Post lỗi với một số bài | Đánh dấu "hủy lỗi", thử lại; M-16 hiện số bài chưa hủy được. Không gửi bài mới trong lúc đó | [Đề xuất nội bộ] |
| Một bài đang được Upload-Post đăng đúng lúc dừng | Có thể đã đăng; ghi theo kết quả thật | [Đề xuất nội bộ] |
| Dừng toàn bộ trong khi một tài năng cũng đang dừng riêng | Chạy lại toàn bộ không chạy lại tài năng đó | [Đề xuất nội bộ] |
| Đếm ngày không đăng (3-9) | Không tính ngày đang dừng | S03-05 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Có màn xác nhận | Chốt | §6-10 |
| Dừng thì hủy cả bài đã hẹn; bài đã hủy không đăng lại | Chốt | §6-10, UC-08 前提 |
| Dừng toàn bộ và dừng từng tài năng là cài đặt quản lý chỉnh | Chốt | §5-6 |

## Dữ liệu [Đề xuất nội bộ]

`autopost_switches`: `scope` (`global`, `talent`), `talent_id`, `enabled`, `changed_by`, `changed_at`. Lịch sử thao tác ghi nhật ký (C-03) và hiện ở M-16.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho 10 bài đã hẹn, khi dừng toàn bộ, thì cả 10 bài "đã hủy" và Upload-Post không còn lịch.
2. Cho đang dừng, khi tài năng chấp nhận bài, thì bài không được hẹn.
3. Cho chạy lại, thì 10 bài đã hủy không đăng.
4. Cho dừng riêng tài năng A, thì bài của B vẫn đăng bình thường.
5. M-16 có một dòng lịch sử cho mỗi lần dừng và chạy lại, ghi người làm.

## Phụ thuộc

7-2 (hủy), 4-3, 8-3, C-03.

## Câu hỏi mở

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-06 | Khi dừng, AIコーチ vẫn nhắn và tạo bản nháp | Không | Như đề xuất |
| B6 | Bài chấp nhận trong lúc dừng | Không | Như B6 |
| A6 | Báo tài năng khi bài bị hủy do dừng | Không | Chờ A6 |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-6, §6-10 (7-5), UC-08 前提. [AG] trang 8 (M-10), trang 9 (M-16).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.60 (đang hỏi): khi đang dừng, AI vẫn chạy, tài năng vẫn chấp nhận được, bài ở trạng thái giữ lại; mở lại thì hẹn giờ nếu còn kịp.
- Q&A No.61 (đang hỏi): báo tài năng khi bài bị hủy; bài bị hủy về lại bản nháp.


</details>
