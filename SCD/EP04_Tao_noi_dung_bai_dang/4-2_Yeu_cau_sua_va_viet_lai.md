# 4-2 Yêu cầu sửa và viết lại

| Mục | Giá trị |
|---|---|
| Module | EP04 – Tạo nội dung bài đăng |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-6, chức năng 4-2; UC-05 |
| Màn hình [AG] | T-09 (nút 直しを依頼), T-08 |
| Tên trong mã nguồn | Draft Revision |
| Mức sẵn sàng | 🟡 Vàng – giao agent được |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ✅ | ⚠ đội đề xuất | ✅ | ⚠ đội đề xuất | ✅ | ✅ OpenAI | ⚠ đội đề xuất | ⚠ 4-1 |

## Mục đích

Tài năng nói điểm muốn sửa trong hội thoại, AI viết lại bản nháp. Tài năng cũng có thể đưa câu chữ muốn dùng để AI viết lại theo (§6-6 chức năng 4-2).

## Tác nhân và quyền

- Tài năng: yêu cầu sửa bản nháp của mình. Sửa chữ trực tiếp được ([KS] 確認28), hoặc nhờ AI viết lại tối đa 2 lần ([KS] 確認29).

## Luồng chính

1. Ở T-09 bấm 直しを依頼 (nhờ sửa), mở T-08 với bản nháp đang xem làm ngữ cảnh. Hoặc tài năng nói thẳng trong T-08 về bản nháp gần nhất.
2. Tài năng nói điểm muốn sửa, hoặc dán câu chữ muốn dùng.
3. AI viết lại theo yêu cầu, giữ loại bài, giữ giới hạn độ dài (4-1), tránh từ cấm.
4. Lưu thành **phiên bản mới** của cùng bản nháp. T-09 luôn hiện phiên bản mới nhất.
5. Tin trả lời trong T-08 có nút 投稿案を見る.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Bản nháp đã được chấp nhận (đã hẹn giờ hoặc chờ duyệt) | Không sửa được. Báo "bài đã chấp nhận; muốn đổi thì liên hệ quản lý để hủy" | S04-09; 7-2 (chỉ quản lý hủy được) |
| Yêu cầu không rõ là sửa bản nháp nào (có nhiều bản nháp) | AI hỏi lại, hoặc dùng bản nháp tài năng mở gần nhất | [Đề xuất nội bộ] |
| Câu chữ tài năng đưa vào có từ cấm | Vẫn viết lại; việc chặn xảy ra ở bước chấp nhận (4-4) | §6-6 chức năng 4-4 |
| OpenAI lỗi | Như 3-4: báo lỗi, cho gửi lại | §6-5 |
| Muốn quay về phiên bản cũ | Tài năng nói trong hội thoại, AI lấy lại phiên bản đó thành phiên bản mới | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Số lần nhờ AI viết lại | Tối đa 2 lần mỗi bản nháp. 要確認 mà 2 lần vẫn không hợp thì hôm đó không đăng, trừ khi tài năng tự sửa rồi đăng | Chốt ([KS] 確認29) | — |
| Chi phí mỗi lần | Khoảng 0,2–3 yên | Tham khảo | 確認29 |
| Tài năng sửa chữ trực tiếp | Được, ở màn bản nháp (T-09) | Chốt ([KS] 確認28) | — |

## Dữ liệu [Đề xuất nội bộ]

`draft_versions`: `draft_id`, `version`, `caption`, `hashtags[]`, `youtube_title`, `shot_guide`, `video_script`, `instruction` (yêu cầu sửa của tài năng), `created_at`. `drafts` trỏ tới phiên bản mới nhất.

## Màn hình

T-09: nút 直しを依頼. T-08: hội thoại sửa.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng nói "もっと短く", thì phiên bản mới ngắn hơn phiên bản trước và T-09 hiện phiên bản mới.
2. Cho tài năng dán câu "今日も頑張りました", thì chú thích mới có câu đó.
3. Cho bản nháp đã chấp nhận, khi tài năng nhờ sửa, thì không có phiên bản mới và có câu giải thích.
4. Cho bản nháp đã có 2 lần AI viết lại được tính hợp lệ, khi yêu cầu AI viết lại lần thứ3, thì không gọi tạo bản viết lại mới và báo đã hết lượt; tài năng vẫn được tự sửa chữ theo quyết định17/11. Cách tính lượt khi lỗi/thử lại đang chờ làm rõ ở L23-01 (sheet Chi_tiet: câu về cách đếm rewrite), không dùng AC này để tự quyết cách đếm.
5. Cho tài năng tự sửa chữ, thì lưu bản sửa và không coi thao tác sửa tay đó là một lần AI viết lại.

## Phụ thuộc

4-1, 3-4, 3-1.

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認28, 29.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S04-09 | Sau khi chấp nhận thì không sửa được | Không | Như đề xuất |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP04: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §6-6 (4-2), §6-10 (7-2), UC-05, 確認28, 29. [AG] trang 4 (T-09).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.39, CR-21: tài năng sửa chữ trực tiếp **làm** ([KS] 確認28).
