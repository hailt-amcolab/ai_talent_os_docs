# 3-1 Hiểu tài năng và thuật toán

| Mục | Giá trị |
|---|---|
| Module | EP03 – Huấn luyện viên AI |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-5, chức năng 3-1; §5-5; §7-5; UC-02 前提 (tiền đề) |
| Màn hình [AG] | Không có màn riêng |
| Tên trong mã nguồn | Talent & Algorithm Understanding |
| Mức sẵn sàng | 🟡 Vàng – giao agent được. Nơi đặt chỉ thị giọng văn là đề xuất (S03-01) |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ⚠ giới hạn độ dài là tham số | ⚠ đội đề xuất | ✅ không cần màn | ✅ OpenAI | ⚠ đội đề xuất | ⚠ 2-1 |

## Mục đích

Mỗi lần AIコーチ nhắn tin hoặc tạo bản nháp đều dùng đủ ngữ cảnh: thông tin tài năng, mục tiêu, kiến thức nghề, chỉ dẫn thuật toán, hội thoại trước đó, kết quả. Nếu アデッソ có chỉ dẫn thì chỉ dẫn đó được ưu tiên hơn gợi ý của AI (§6-5 chức năng 3-1).

## Tác nhân

Hệ thống (phần ghép ngữ cảnh, dùng chung cho 3-4, 3-6, 3-8, 3-9, 4-1, 4-2).

## Luồng chính

Ghép lời nhắc (prompt) gửi OpenAI theo thứ tự ưu tiên từ cao xuống thấp:

1. **Quy tắc cố định của hệ thống:** giới hạn chủ đề và cách xử lý chuyện nghiêm trọng (3-3), không dùng thông tin của tài năng khác (1-5).
2. **Chỉ dẫn của アデッソ:** `共通/ノウハウ.md`, `共通/アルゴリズム対策.md`, chỉ thị giọng văn `共通/AIへの指示.md` (S03-01). Ghi rõ trong lời nhắc: "chỉ dẫn này ưu tiên hơn ý của AI".
3. **Riêng tài năng:** `プロフィール.md` (kể cả mục `個別の指示`), `目標.md`.
4. **Điều AI đã học:** `AIメモ.md` (3-2).
5. **Kết quả:** tóm tắt kết quả gần đây do hệ thống tính (8-7).
6. **Hội thoại gần đây:** các tin nhắn gần nhất trong giới hạn độ dài.

Nội dung 2–4 lấy từ bản đọc buổi sáng (2-1). Trong ngày không đọc lại OneDrive cho mỗi tin nhắn.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Tổng ngữ cảnh vượt giới hạn | Cắt theo thứ tự ngược: bớt hội thoại cũ trước, rồi kết quả, rồi `AIメモ.md`. Không bao giờ cắt phần 1 và 2 | [Đề xuất nội bộ] |
| Chưa có hồ sơ | Không tạo bản nháp (UC-01 前提). Vẫn trả lời hội thoại ở mức chung | UC-01 前提; [Đề xuất nội bộ] |
| Chỉ dẫn của アデッソ mâu thuẫn với hồ sơ tài năng | `個別の指示` của tài năng ưu tiên hơn chỉ dẫn chung | UC-02 前提 ("特定のタレントだけに伝えたい内容は…書き足します") |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Chỉ dẫn của アデッソ ưu tiên hơn gợi ý của AI | — | Chốt | §6-5 |
| Giọng văn do chỉ thị cho AI quyết | — | Chốt | §5-5, §7-5 |
| Số tin nhắn hội thoại đưa vào | 30 tin gần nhất | Tham số [Đề xuất nội bộ] | — |
| Mô hình OpenAI | Đội chọn khi thiết kế | Tham số | §8 |

## Dữ liệu

Chỉ đọc: `talent_context_snapshots` (2-1), hội thoại (3-4), tóm tắt kết quả (8-7).

## Tích hợp

OpenAI: tắt việc dùng dữ liệu để huấn luyện (§8, §10-2). Mỗi lần gọi chỉ đưa dữ liệu của một tài năng.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho `共通/ノウハウ.md` ghi "thứ Hai đăng về luyện tập", thì chủ đề gợi ý thứ Hai có ít nhất một chủ đề về luyện tập.
2. Cho `AIへの指示.md` ghi "dùng giọng thân mật", thì tin nhắn dùng giọng thân mật.
3. Cho ngữ cảnh vượt giới hạn, thì phần chỉ dẫn của アデッソ vẫn còn nguyên trong lời nhắc.
4. Cho lời nhắc của tài năng A, thì không chứa nội dung từ thư mục của tài năng khác.

## Ngoài phạm vi của chức năng này

- Màn chỉ thị cho AI theo nhóm (M-14, M-15): chờ 確認6–8.

## Phụ thuộc

2-1 (bản đọc buổi sáng). 8-7 (kết quả, dùng dữ liệu giả tới khi có).

## Câu hỏi mở

Các 確認 liên quan (không xử lý ở đây): 確認6–8.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S03-01 | Chỉ thị giọng văn đặt ở `共通/AIへの指示.md` và mục `個別の指示`; quản lý viết qua ChatGPT (MCP) theo báo giá, Q&A câu 45 | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP03: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-5, §6-5 (3-1), §7-5, §8, §10-2, UC-01 前提, UC-02 前提.
