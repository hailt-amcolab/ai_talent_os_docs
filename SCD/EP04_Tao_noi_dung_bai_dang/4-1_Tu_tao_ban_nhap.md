# 4-1 Tự tạo bản nháp

| Mục | Giá trị |
|---|---|
| Module | EP04 – Tạo nội dung bài đăng |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-6, chức năng 4-1; §5-3; UC-05, UC-05 前提 (tiền đề) |
| Màn hình [AG] | T-07 (chủ đề gợi ý, bản nháp hôm nay), T-08 (chọn chủ đề trong hội thoại), T-09 (chi tiết bản nháp) |
| Tên trong mã nguồn | AI Draft Generation |
| Mức sẵn sàng | 🔴 Đỏ – chưa rõ lúc nào có giờ đăng (B1), ai chọn ảnh hay video (B2), nguồn tin tức (確認16). Phần tạo chủ đề và chú thích làm được ngay |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ B1, B2 | ⚠ đội đề xuất | ⚠ S04-05 | ⚠ B2, B3 | ⚠ thiếu chỗ chọn ảnh hay video | ⚠ nguồn tin tức | ⚠ đội đề xuất | ⚠ 3-1, 8-1 |

## Mục đích

Theo nhịp đề xuất trong chỉ thị cho AI (hằng ngày, vài ngày một lần hay mỗi tuần, [KS] 確認14, 15), tạo 3 chủ đề gợi ý cho tài năng dùng cách đăng 要確認. Với cách 自動投稿, tài năng chọn chủ đề một lần khi bắt đầu khoảng đăng, hệ thống tự viết các bài trong khoảng ([KS] 確認25). Tài năng chọn chủ đề (hoặc tự nói chủ đề), AI viết bản nháp: chú thích, hashtag, hướng dẫn chụp; nếu là video thì thêm kịch bản. Tài năng cần bao nhiêu bản nháp thì tạo bấy nhiêu (§6-6 chức năng 4-1, §5-3).

## Tác nhân và quyền

- Hệ thống: tạo chủ đề mỗi sáng, tạo bản nháp khi tài năng yêu cầu.
- Tài năng: chọn chủ đề hoặc nói chủ đề của mình. Chỉ thấy bản nháp của mình (1-5).
- Tài khoản công ty: quản lý thao tác thay (9-1).

## Luồng chính

**A. Chủ đề gợi ý (lô buổi sáng)**
1. Lô buổi sáng (2-1) ghép ngữ cảnh (3-1) và tạo 3 chủ đề từ: định hướng, sở thích, sở trường; bài được tương tác tốt; ngày riêng trong hồ sơ (sinh nhật, lịch diễn); tin tức trong ngày nếu 確認16 được đồng ý (§5-3).
2. Chỉ dẫn của アデッソ (ví dụ chủ đề theo thứ trong tuần) được ưu tiên hơn ý của AI (§5-3).
3. Chốt **giờ đăng dự kiến** của ngày cho tài năng, theo 8-1 (đề xuất B1). Ghi giờ này vào tin buổi sáng.
4. Lưu 3 chủ đề; tin buổi sáng hiện chúng (3-4); T-07 hiện danh sách 今日のテーマの候補.

**B. Bản nháp**
5. Tài năng bấm 選ぶ (chọn) ở T-07, trả lời trong T-08, hoặc nói chủ đề của mình (自分で投稿したいテーマを伝える).
6. Tài năng chọn loại bài: ảnh hoặc video (đề xuất B2). Mặc định là ảnh.
7. Gọi AI tạo bản nháp gồm: chú thích, hashtag, hướng dẫn chụp ("何を撮るか"), tiêu đề ngắn cho YouTube (B3); nếu là video thì thêm kịch bản. Danh sách từ cấm được đưa vào lời nhắc để AI tránh ngay từ đầu (UC-05).
8. Kiểm tra độ dài: chú thích và số hashtag nằm trong giới hạn chung của cả 3 mạng (S04-05). Vượt thì yêu cầu AI rút gọn.
9. Lưu bản nháp, gửi vào hội thoại kèm nút 投稿案を見る (xem bản nháp) và 写真・動画を送る (gửi ảnh, video) như [AG] T-08.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Chưa có hồ sơ tài năng | Không tạo chủ đề và bản nháp; tin buổi sáng nhắc là đang chuẩn bị | UC-01 前提 |
| OpenAI lỗi khi tạo bản nháp | Báo trong hội thoại, cho thử lại | §9-3; 3-4 |
| Tạo chủ đề buổi sáng lỗi | Thử lại trong lô; vẫn lỗi thì tin buổi sáng không có chủ đề, tài năng vẫn tự nói chủ đề được | [Đề xuất nội bộ] |
| AI trả về quá giới hạn sau 2 lần rút gọn | Cắt hashtag cuối, cắt chú thích ở câu trọn vẹn gần nhất | [Đề xuất nội bộ] |
| Tài năng tạo nhiều bản nháp trong ngày | Cho phép, không giới hạn | §6-6, UC-05 前提 |
| Nhiều bản nháp được chấp nhận trong ngày | Bài sau đăng ở khung giờ kế tiếp, cách bài trước ít nhất 3 giờ | S04-04 |
| Bản nháp không ai chấp nhận | Giữ 7 ngày ở danh sách "chưa dùng", sau đó hết hạn | S04-02 |
| Tài năng đổi loại bài sau khi đã có bản nháp | Tạo lại bản nháp (tính như 4-2) | [Đề xuất nội bộ] |

## Quy tắc và giá trị

| Quy tắc | Giá trị | Loại | Nguồn |
|---|---|---|---|
| Số chủ đề mỗi lần đề xuất | 3 | Chốt | §6-6 |
| Nhịp đề xuất | Hằng ngày, vài ngày một lần hoặc mỗi tuần, theo chỉ thị cho AI | Chốt ([KS] 確認14, 15); cách làm FutureCore đề xuất sau | — |
| Nhờ AI viết lại | Tối đa 2 lần mỗi bản nháp (4-2) | Chốt ([KS] 確認29) | — |
| Nội dung bản nháp | Chú thích, hashtag, hướng dẫn chụp; video thêm kịch bản | Chốt (chờ 確認24) | §6-6, §5-3 |
| Một nội dung cho cả 3 mạng | — | Chốt | UC-05 前提 |
| Tiêu đề cho YouTube | Tối đa 100 ký tự | Đề xuất | B3 |
| Giới hạn chú thích, hashtag | Chú thích 2.200 ký tự, 10 hashtag; không dùng hashtag bị Instagram cấm; tiêu đề YouTube ≤ 100 ký tự. Đã kiểm chứng với tài liệu Upload-Post 17/11 | Tham số | S04-05, B3; bộ Upload-Post §8.4a |
| Số bản nháp | Không giới hạn | Chốt | §6-6 |
| Thời gian giữ bản nháp chưa dùng | 7 ngày | Tham số | S04-02 |

## Dữ liệu [Đề xuất nội bộ]

- `theme_suggestions`: `talent_id`, `date`, `rank` (1–3), `title`, `reason`, `source` (`profile`, `metrics`, `date_event`, `news`, `agency_rule`).
- `drafts`: `id`, `talent_id`, `theme`, `post_type` (`photo`, `video`), `caption`, `hashtags[]`, `youtube_title`, `shot_guide`, `video_script`, `version`, `status` (theo C-01; tạm: `draft`, `adopted`, `expired`), `planned_post_at`, `created_at`.
- `daily_post_plans`: `talent_id`, `date`, `planned_post_at` (B1).

## Màn hình

- T-07: 今日のミッション, 今日のテーマの候補 (3 dòng, nút 選ぶ), "自分で投稿したいテーマを伝える", 今日の投稿案 (giờ đăng dự kiến, nút 開く).
- T-08: tin của AI có nút 投稿案を見る, 写真・動画を送る.
- T-09: chi tiết bản nháp (6-6).
- **Thiếu trong [AG]:** chỗ chọn ảnh hay video khi chọn chủ đề (B2). Tạm: hai nút "写真で投稿" và "動画で投稿" khi chọn chủ đề.

## Tích hợp

- OpenAI (qua lớp gọi chung của 3-5).
- Tin tức trong ngày: chỉ làm nếu 確認16 được đồng ý; nguồn (tìm kiếm web của OpenAI hay API tin tức) đội kiểm chứng.

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng ở 利用中 có hồ sơ, dùng cách đăng 要確認, thì tới lượt đề xuất (khung sáng, mặc định 8:00) có đúng 3 chủ đề ở T-07.
2. Cho `共通/ノウハウ.md` ghi "thứ Hai đăng về luyện tập", thì thứ Hai có ít nhất một chủ đề về luyện tập.
3. Cho tài năng chọn chủ đề 1, loại ảnh, thì bản nháp có chú thích, hashtag, hướng dẫn chụp, tiêu đề YouTube, không có kịch bản.
4. Cho loại video, thì bản nháp có thêm kịch bản.
5. Cho mọi bản nháp, thì chú thích và số hashtag nằm trong giới hạn đã cài.
6. Cho tài năng yêu cầu bản nháp thứ 5 trong ngày, thì vẫn tạo được.
7. Cho tài năng chưa có hồ sơ, thì không có chủ đề và không tạo được bản nháp.

## Ngoài phạm vi của chức năng này

- Gửi ảnh, video (6-3), tạo video AI (5-1), chấp nhận (4-3), chọn giờ đăng (8-1).
- Tài năng tự sửa chữ trực tiếp: có (4-2, [KS] 確認28).

## Phụ thuộc

3-1 (ngữ cảnh), 2-1 (lô buổi sáng), 3-4 (hội thoại), 8-1 (giờ đăng; tạm dùng giờ trong chỉ dẫn thuật toán), C-01 (trạng thái bài).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認15, 16, 24, 28, 29, 30.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| B1 | Giờ đăng chốt lúc nào | Có | Chốt mỗi sáng |
| B2 | Ai chọn ảnh hay video, lúc nào | Có (cấu trúc bản nháp) | Tài năng chọn khi chọn chủ đề |
| B3 | Tiêu đề YouTube | Không | AI tạo, tối đa 100 ký tự |
| A8 | Lô buổi sáng chỉ tạo chủ đề | Không | Như A8 |
| S04-02 | Bản nháp chưa dùng giữ bao lâu | Không | 7 ngày |
| S04-04 | Nhiều bài được chấp nhận trong ngày | Không | Cách nhau ít nhất 3 giờ |
| S04-05 | Giới hạn chú thích, hashtag | Không | Tạm như bảng trên |

Câu hỏi gửi khách, đề xuất và kiểm tra phạm vi của cả EP04: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §5-3, §6-6 (4-1), §9-3, UC-01 前提, UC-05, UC-05 前提, 確認15, 16, 24, 28–30.
- [AG] trang 3 (T-07, T-08), trang 4 (T-09). [File 13](../../Phan_tich/13_Qua_gio_dang_chua_chap_nhan.md). [File 15](../../Phan_tich/15_Cau_hoi_lam_ro_luong.csv) A8, B1, B2, B3.

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.38, CR-05 (đã chốt làm ở SP1): chủ đề buổi sáng có tính tới tin tức và chuyện xã hội trong ngày. **Dùng chức năng tìm web của AI, tìm 1 lần mỗi ngày** (chung cho mọi tài năng, hoặc theo nhóm khi có nhóm), rồi dùng kết quả cho mọi tài năng để giảm phí. Phí tìm web đưa vào ước tính phí AI hằng tháng.
- Q&A No.55 (đang hỏi): chủ đề hết hạn khi có 3 chủ đề mới ở lượt đề xuất sau.
