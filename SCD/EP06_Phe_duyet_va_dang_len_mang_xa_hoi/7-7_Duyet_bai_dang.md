# 7-7 Duyệt bài đăng

| Mục | Giá trị |
|---|---|
| Module | EP06 – Phê duyệt và đăng lên mạng xã hội |
| 優先順位 (ưu tiên) | 高 (cao) |
| Mục [YK2] | §6-9, chức năng 7-7; §5-3; UC-07, UC-07 前提 (tiền đề) |
| Màn hình [AG] | T-09 (ô xin duyệt), T-13 (承認待ち, 差し戻し); M-02, M-04 (danh sách chờ duyệt), M-05 (duyệt), M-10 (bật duyệt bài) |
| Tên trong mã nguồn | Post Approval |
| Mức sẵn sàng | 🔴 Đỏ – nơi nhận yêu cầu đã chốt theo nhóm hoặc quản lý phụ trách ([KS] 確認34), trả lại và quá hạn khách đồng ý giả định (確認35, 36); bộ trạng thái bài chưa có (C-01). Phần cài đặt, gửi yêu cầu, danh sách và duyệt làm được ngay |

## Đánh giá

| R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 |
|---|---|---|---|---|---|---|---|---|
| ✅ | ⚠ 確認35, 36 | ⚠ đội đề xuất | ✅ | ❌ C-01 | ✅ | ⚠ S06-01 | ⚠ đội đề xuất | ⚠ 4-3, 8-3, 7-4 |

## Mục đích

Bài công việc cần khách hàng của tài năng cho phép thì tài năng xin quản lý duyệt. Quản lý duyệt thì bài được đăng đúng giờ; trả lại thì phải ghi lý do. Đến giờ đăng mà chưa duyệt thì không đăng, báo cả hai bên (§6-9 chức năng 7-7).

## Tác nhân và quyền

- Quản lý: bật hoặc tắt duyệt bài cho từng tài năng (M-10, hoặc khi duyệt đơn ở M-03); duyệt hoặc trả lại (M-05). Mọi quản lý đều nhận yêu cầu (§3-3).
- Tài năng: chọn xin duyệt khi chấp nhận (4-3). AI không tự đoán bài công việc (§5-3).
- Tài khoản công ty: không duyệt (A2).

## Luồng chính

1. Tài năng chấp nhận bài có tích xin duyệt (4-3). Bài sang "chờ duyệt". **Chưa gửi sang Upload-Post** (S06-01).
2. Tạo thông báo 承認の依頼 (yêu cầu duyệt) cho quản lý của nhóm (カテゴリー) của tài năng hoặc quản lý phụ trách tài năng (7-4, [KS] 確認34). M-04 liệt kê bài chờ duyệt, xếp theo giờ đăng gần nhất, kèm kết quả kiểm tra từ cấm.
3. Quản lý mở M-05: ảnh, video, chú thích, mạng sẽ đăng, giờ đăng (cũng là hạn duyệt).
4. Bấm 承認する (duyệt): bài sang "đã hẹn giờ", gửi lịch sang Upload-Post (8-3). Báo tài năng 承認の結果 (kết quả duyệt).
5. Bấm 差し戻す (trả lại): bắt buộc nhập lý do. Bài sang "bị trả lại". Tài năng thấy lý do ở T-13, nhờ AI sửa (4-2) rồi chấp nhận và xin duyệt lại (4-3) (giả định 確認35).
6. Đến giờ đăng mà vẫn "chờ duyệt": bài sang "quá hạn duyệt" (không đăng). Báo tài năng và quản lý (giả định 確認36). Muốn đăng thì tài năng chấp nhận lại.

## Luồng lỗi và trường hợp biên

| Tình huống | Xử lý | Nguồn |
|---|---|---|
| Hai quản lý cùng bấm | Người bấm trước quyết; người sau thấy "đã được xử lý bởi …" | [KS] 確認34 |
| Duyệt đúng lúc vừa quá hạn | Kiểm tra lại trạng thái trong cùng giao dịch; đã quá hạn thì báo không duyệt được | [Đề xuất nội bộ] |
| Duyệt nhưng Upload-Post hẹn giờ lỗi | Như 4-3: "hẹn giờ lỗi", thử lại, rồi báo như 8-5 | §9-3 |
| Quản lý tắt duyệt bài khi tài năng còn bài chờ | Bài đang chờ vẫn phải xử lý; chỉ áp dụng cho lần chấp nhận sau | [Đề xuất nội bộ] |
| Đăng tự động đang dừng khi duyệt | Bài sang "đã chấp nhận, chưa hẹn giờ" (B6) | B6 |
| Quản lý muốn sửa chú thích hay đổi giờ khi duyệt | Không có; chỉ duyệt hoặc trả lại | S06-10, [AG] M-05 |
| Sắp tới hạn mà chưa ai duyệt | Không thêm thông báo; M-04 tô màu bài còn dưới 2 giờ | S06-09 |

## Quy tắc và giá trị

| Quy tắc | Loại | Nguồn |
|---|---|---|
| Có duyệt hay không: cài cho từng tài năng | Chốt | §6-9, UC-07 前提 |
| Trả lại phải có lý do | Chốt | §6-9 |
| Hạn duyệt = giờ đăng; quá hạn thì không đăng | Chốt | §6-9, §5-3 |
| Quản lý của nhóm hoặc quản lý phụ trách nhận yêu cầu, người bấm trước quyết | Chốt ([KS] 確認34) | §3-3 |
| Cách gửi và khi chưa có người phụ trách | cách nào (theo nhóm hay theo quản lý phụ trách từng tài năng) và khi chưa có người phụ trách thì gửi ai: chờ Q&A No.6; AMCOLAB đề xuất lấy quản lý phụ trách từng tài năng làm cơ bản (có trong báo giá No.42, 前提条件A9) | Chưa rõ | Q&A No.6 |
| Tài khoản công ty không duyệt | Đề xuất | A2 |

## Dữ liệu [Đề xuất nội bộ]

`approval_requests`: `post_id`, `requested_at`, `deadline` (giờ đăng), `decision` (`approved`, `returned`, `expired`), `reason`, `decided_by`, `decided_at`. `talents.approval_required` (1-4). Trạng thái bài theo C-01.

## Màn hình

M-04 (danh sách: tài năng, giờ yêu cầu, giờ đăng = hạn, mạng, kết quả từ cấm, nút 確認する); M-05 (nội dung, ô lý do, 承認する, 差し戻す); M-10 (công tắc 投稿の承認を使う); T-13 (承認待ち, 差し戻し kèm lý do).

## Tiêu chí chấp nhận [Đề xuất nội bộ]

1. Cho tài năng xin duyệt, thì quản lý của nhóm hoặc quản lý phụ trách thấy bài ở M-04 và có thông báo 承認の依頼; Upload-Post chưa có lịch.
2. Cho quản lý duyệt trước hạn, thì bài được hẹn đúng giờ đăng và tài năng nhận 承認の結果.
3. Cho trả lại không ghi lý do, thì không lưu được.
4. Cho trả lại có lý do, thì T-13 hiện 差し戻し và lý do.
5. Cho quá giờ đăng chưa duyệt, thì bài không đăng, tài năng và quản lý được báo.
6. Cho hai quản lý bấm gần như cùng lúc, thì chỉ một quyết định được lưu.

## Ngoài phạm vi của chức năng này

- AI tự đoán bài công việc (§5-3 không làm). Quản lý sửa bài hoặc đổi giờ khi duyệt (S06-10).

## Phụ thuộc

4-3, 4-2, 8-3, 7-4, 6-1, C-01 (🔴).

## Câu hỏi mở

Các 確認 liên quan (trạng thái theo bảng xác nhận 17/11/2026, `Phan_tich/21`): 確認33, 34, 35, 36, 52.

| Mã | Nội dung | Chặn? | Giả định tạm dùng |
|---|---|---|---|
| S06-01 | Bài chờ duyệt chưa gửi sang Upload-Post | Không | Như đề xuất |
| S06-09 | Không thêm nhắc khi sắp tới hạn | Không | M-04 tô màu |
| S06-10 | Duyệt không sửa nội dung, không đổi giờ | Không | Như [AG] M-05 |
| A2 | Tài khoản công ty không duyệt | Không | Như A2 |
| A6 | Thông báo "quá hạn duyệt" chưa có trong 別紙A | Không | Dùng thông báo kết quả duyệt |

Câu hỏi gửi khách, danh sách kiểm chứng Upload-Post, đề xuất và kiểm tra phạm vi của cả EP06: [00_Cau_hoi_cho_khach.md](00_Cau_hoi_cho_khach.md).

## Nguồn

- [YK2] §3-3, §5-3, §6-9 (7-7), UC-07, UC-07 前提, 確認33–36, 52.
- [AG] trang 4 (T-09), trang 5 (T-13), trang 6 (M-04), trang 7 (M-05), trang 8 (M-10).

## Quyết định từ Q&A (bản ngày 15/11/2026)

- Q&A No.35, CR-03 (đã chốt): có trả lại kèm lý do, tài năng sửa và xin duyệt lại.
- Q&A No.58 (đang hỏi): đề xuất trong Q&A là **bài xin duyệt lại vẫn là cùng một bài**, giữ lịch sử duyệt và giữ giờ cũ nếu còn kịp. Đặc tả này và C-01 đang cho bài bị trả lại sang 取り消し và tạo bài mới. Phải thống nhất trước khi làm.
- Q&A No.6, CR-19: **làm** ([KS] 確認34): yêu cầu duyệt gửi theo nhóm hoặc theo quản lý phụ trách.
