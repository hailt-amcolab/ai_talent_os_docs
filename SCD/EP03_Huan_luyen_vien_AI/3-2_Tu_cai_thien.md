<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### AI agent và dữ liệu

G/H ghi xác nhận24/11: AI Coach là agent đọc/ghi Supabase; nhận chỉ thị, khen, đề xuất và ghi tiến độ Challenge, nhập chỉ thị qua hội thoại M-17 trong phạm vi; dữ liệu trong DB có backup; Adesso trả token và chỉnh prompt; không bảo đảm phán đoán đúng. J101 là phân vai NỘI BỘ25/11: OS nhập dữ liệu dịch vụ ngoài; agent quyết định giờ rồi ghi lịch để OS thực thi.

**Còn mở/giới hạn:** YK3 §2-5/3-3/3-8/AC chưa đồng bộ. Không suy agent được SQL tùy ý hoặc bỏ kiểm quyền. Vị trí byte media và vai trò OneDrive chưa chốt lại toàn bộ. Căn cứ: `QA Q&A!G101:J101 (No.101)`; `EV-1311`; QA No.101;TR-2-1;TR-2-2;TR-2-3;TR-2-4;TR-3-1;TR-3-2;TR-3-5;TR-8-8.

<!-- /DELIVERY24112026 -->

# 3-2 Tự cải thiện

## Đợt23112026 — đề nghị và điểm cần đối chiếu

**Không tự thay quyết định20/11 bằng đề nghị/hình minh họa mới.** Các mục dưới ghi nội dung nguồn mới và phần còn mở; chưa là AC hoặc phạm vi được phê duyệt.

**Chống giống nhau và phân tích chéo Talent — PROPOSAL của nguồn:** Đề nghị cá nhân hóa giọng/chủ đề và so nội dung/ý tưởng video của 200 Talent trước khi đăng, đề xuất khác khi giống nhau. **Giới hạn:** Cá nhân hóa đã có hướng; so chéo 200 người là phần dữ liệu/chi phí khác, không bảo đảm bằng một prompt. Không đưa dữ liệu Talent khác vào hội thoại/output hoặc tự nới quyền truy cập. Nguồn `ISS22-P PDFtrang5; ADV22 PDFtrang3; ADV22 PDFtrang11`; EV `EV-1245;EV-1254;EV-1262`.

**Tăng trưởng, dashboard và KPI kinh doanh — PROPOSAL của nguồn:** Đề nghị Momo phân tích điểm yếu, tạo chiến lược/thử thách cá nhân; dashboard ưu tiên vấn đề; KPI gồm tăng follower, engagement, số hợp đồng doanh nghiệp và doanh thu mỗi Talent. **Giới hạn:** Coaching/thử thách/số liệu đã có ngữ cảnh cũ; ghép nhãn hiệu, hợp đồng và doanh thu cần phạm vi/định nghĩa/nguồn mới. Không coi toàn bộ dữ liệu lấy được qua Upload-Post hoặc được duyệt giai đoạn 1. Nguồn `ISS22-P PDFtrang8; ISS22-P PDFtrang9; ISS22-P PDFtrang10`; EV `EV-1248;EV-1249;EV-1250`.

[Đối chiếu và phân tuyến](../../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md).


## Đối chiếu nguồn hiện hành — 20/11/2026

Chỉ thị công ty và nội dung Manager nhập được ưu tiên trước đề xuất AI; nguồn mới không thay thuật toán tự học hoặc thiết kế lưu bộ nhớ.

Không nâng thiết kế file/bộ nhớ của đội thành quyết định khách.

Căn cứ: `M19:27;T19:16;BF19:18` (T19=SD-T19, M19=SD-M19; số sau dấu hai chấm là trang PDF thực tế; KS là sheet/mục). Bằng chứng: `EV-0612;EV-0568;EV-0630`. Nội dung mới là mô tả/đề xuất nguồn trong phạm vi nêu trên, chỉ DEC-0001 là quyết định trực tiếp của người dùng. Các mã màn gắn [AG] và các mục nguồn bên dưới giữ để tra lịch sử; chưa có G5/G8 cho bản sửa.

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-5, chức năng 3-2; §5-5; §7-5 |
| Màn hình [AG] | Không có |
| Tên trong mã nguồn | AI Self-improvement |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Cấu trúc file bộ nhớ do đội quyết |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ tham số | ⚠ đội đề xuất | ✅ không cần màn | ⚠ ghi OneDrive (2-2) | ⚠ đội đề xuất | ⚠ 2-1, 8-7 |

## Mục đích

Kết quả và hội thoại đến hôm qua được dùng cho tin nhắn, chủ đề và bản nháp sáng nay. Điều AI hiểu ra (sở thích của tài năng, bài được tương tác tốt) được ghi thêm vào file trong thư mục tài năng (§6-5 chức năng 3-2).

## Luồng chính

1. Trong lô buổi sáng, trước khi tạo tin nhắn: với mỗi tài năng có hội thoại hoặc kết quả mới từ hôm qua, gọi AI để rút ra điều mới học được.
2. Cập nhật `AIメモ.md` theo mẫu cố định: `## 好み` (sở thích), `## 反応が良かった投稿` (bài được tương tác tốt), `## 避けること` (nên tránh), `## 更新履歴` (lịch sử cập nhật, ghi ngày).
3. Ghi file có kiểm tra phiên bản (eTag).
4. Dùng bản mới ngay cho tin nhắn sáng nay (3-1).

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| File vượt giới hạn độ dài | AI viết lại thành bản tóm tắt gọn hơn, giữ các mục | [Đề xuất nội bộ] |
| Quản lý sửa file cùng lúc (eTag khác) | Đọc lại rồi cập nhật lại; không đè mất phần quản lý sửa | [Đề xuất nội bộ] |
| Ghi OneDrive lỗi | Giữ bản mới trong cơ sở dữ liệu, ghi lại vào lần sau | §9-3 |
| Không có gì mới | Không ghi | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Dùng dữ liệu đến hôm qua cho sáng nay | — | Chốt | §6-5, §5-5 |
| Giới hạn độ dài `AIメモ.md` | 10.000 ký tự | Tham số [Đề xuất nội bộ] | — |
| Chỉ ghi vào `AIメモ.md`, không sửa file khác | — | [Đề xuất nội bộ] | — |

## Dữ liệu

`AIメモ.md` trong thư mục tài năng (2-2). Bản đọc lưu trong `talent_context_snapshots` (2-1).

## Tích hợp

OpenAI (rút ra điều học được). Microsoft Graph (ghi file).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng nói hôm qua "ダンスの投稿が好き", thì sáng nay `AIメモ.md` có ý đó ở mục 好み.
2. Cho bài hôm qua có lượt thích cao nhất tuần, thì mục 反応が良かった投稿 có bài đó.
3. Cho quản lý sửa `AIメモ.md` lúc lô đang chạy, thì phần quản lý sửa vẫn còn sau khi AI ghi.
4. Cho file dài quá giới hạn, thì sau khi ghi độ dài nằm trong giới hạn và còn đủ 4 mục.

## Phụ thuộc

2-1, 2-2, 3-4 (hội thoại), 8-7 (kết quả).

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-5, §6-5 (3-2), §7-5, §9-3.
