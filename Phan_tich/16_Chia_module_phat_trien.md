# Chia module và chức năng để phát triển

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **7-1** — Danh sách gồm Talent và office; lọc tên/trạng thái/ngày không đăng/category/người phụ trách. M-07 có nút sang M-21 để sửa hồ sơ; không còn mô tả hồ sơ chỉ nhập qua ChatGPT. Còn mở: Loại phân công theo category hay cá nhân vẫn KS 20261120 No.10/QA No.6. Căn cứ: `M19:10,11,13,15,26`.
- **5-1** — T-14 bản 19/11 chỉ mô tả video ngắn từ ảnh; tạo khi Talent yêu cầu và xem giá trước. Còn mở: CONFLICT: QA No.36/CR-04 trước có cả video ngắn và slideshow; nguồn 19/11 chỉ nêu short. Không tự xóa slideshow hoặc suy đã duyệt đổi phạm vi. Căn cứ: `T19:20;BF19:12`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

Nguồn: [YK2] = `AI育成OS_概要要件定義書_v2.docx` (bản định nghĩa yêu cầu tổng quan, bản 2), chương 6. [AG] = `アプリ画面案_AI育成OS.pdf` (phương án màn hình ứng dụng, 12/11/2026).

File này gom 54 chức năng thành module để chia việc phát triển. Phân tích chi tiết từng chức năng (tác nhân, đầu vào, điều kiện, luồng, đầu ra) vẫn nằm ở [04_Yeu_cau_chuc_nang.md](04_Yeu_cau_chuc_nang.md). File đó chia theo 12 nhóm của [YK2].

Ký hiệu trong bảng:
- 優先順位 (mức ưu tiên): 高 (cao), 中 (trung bình), 低 (thấp). Đây là mức FutureCore đề xuất trong [YK2] chương 6, khách chưa chốt.
- Mục [YK2]: nhóm chức năng trong chương 6 của [YK2], ví dụ 6-1 ログイン機能 (chức năng đăng nhập).
- Màn hình: mã màn hình theo [AG]. "—" là chức năng chạy ngầm, không có màn riêng.
- Tên tiếng Anh: giữ lại để đặt tên trong mã nguồn. Mã chức năng (1-4, 6-2…) là từ dùng chung với khách, nên ghi cả vào tên nhánh và PR.

## 1. Kết quả đối chiếu danh sách đề xuất với [YK2]

Danh sách 9 module (EP01–EP09) **khớp đủ 54 chức năng** trong [YK2] chương 6: không thiếu, không trùng. Mỗi module ứng với một hoặc hai nhóm trong [YK2]:

| Module | Nhóm trong [YK2] chương 6 | Số chức năng |
|---|---|---|
| EP01 | 6-1 ログイン機能 (đăng nhập) + 6-2 権限管理機能 (quản lý quyền) | 6 |
| EP02 | 6-4 タレント情報管理機能 (quản lý thông tin tài năng) | 5 |
| EP03 | 6-5 AIコーチ機能 (huấn luyện viên AI) | 9 |
| EP04 | 6-6 投稿案作成機能 (tạo bản nháp bài đăng) | 5 |
| EP05 | 6-7 素材管理機能 (quản lý tư liệu) + 6-8 動画生成機能 (tạo video) | 7 |
| EP06 | 6-9 承認機能 (phê duyệt) + 6-10 予約投稿機能 (đăng hẹn giờ) | 9 |
| EP07 | 6-11 実績分析機能 (phân tích kết quả) | 6 |
| EP08 | 6-3 課金機能 (thu phí) | 4 |
| EP09 | 6-12 通知・アプリ基盤機能 (thông báo và nền tảng ứng dụng) | 3 |

Cách chia này giữ ranh giới nhóm của [YK2], nên dễ đối chiếu với khách. Tuy vậy, có 5 chỗ cần sửa trước khi dùng.

### 1.1. Những chỗ cần sửa

1. **Ghi chú ở EP01 không đúng.** Danh sách ghi rằng việc tài năng tự gửi đơn (T-01) và quản lý duyệt (M-03) là "thay đổi cần xác nhận so với Requirements v0.1". Thực ra [YK2] §6-1, chức năng 1-4 đã mô tả đủ luồng này: tài năng xin dùng trong ứng dụng, quản lý duyệt hoặc từ chối, hệ thống gửi thư kèm mật khẩu tạm. Trang bìa [YK2] vẫn ghi 0.1版 (bản 0.1), nên "v0.1" chính là tài liệu đã có luồng này. Đây là yêu cầu hiện hành, không phải thay đổi chờ xác nhận.
2. **1-2 và 1-3 ở EP08 bị đặt tên sai nghĩa.** Theo [YK2] §6-3:
   - 1-2: mọi tài năng xin dùng qua ứng dụng đều trả phí. Tài khoản công ty (事務所アカウント) do quản lý tạo và không bị thu phí. **Không có gói miễn phí.** Nên đổi tên thành "Phân loại tài khoản trả phí và tài khoản công ty".
   - 1-3: [YK2] ghi "有償・無償の区分を設けないため、有償から無償への変更は行いません" (vì không có phân loại trả phí và miễn phí, nên không đổi từ trả phí sang miễn phí). Tức là **không phải làm 1-3**. Vẫn giữ mã để khớp số với khách, nhưng khối lượng bằng 0.
3. **8-4 không phải "kiểm soát tần suất đăng".** [YK2] §6-10 gọi chức năng này là 凍結対策 (biện pháp chống khóa tài khoản) và ghi "何を制限するかは、各 SNS の規約と事例を確認して決めます" (giới hạn gì sẽ quyết định sau khi xem quy định và các trường hợp thực tế của từng mạng xã hội). Chưa có nội dung cụ thể nên xếp vào mục 3 "chưa rõ".
4. **Ghi chú ở EP02 nhắc "AI Instructions qua MCP". [YK2] và [AG] không có chữ MCP, nhưng 御見積書 (bản báo giá) 前提条件A4 「マネージャーはChatGPT(MCP)経由でAIを調整」, trích ở file Q&A câu số 45.** Báo giá đứng trên [YK2] khi mâu thuẫn ([YK2] §1), nên MCP có căn cứ hợp đồng. Hai màn liên quan là:
   - Màn AIへの指示 (chỉ thị cho AI), tức M-14 và M-15 trong [AG], chờ 確認6 (mục cần xác nhận số 6). [YK2] ghi rằng chỉ thị theo nhóm cần kiểm tra kỹ thuật.
   - Màn カテゴリーの管理 (quản lý nhóm tài năng), tức M-13 trong [AG]: làm (CR-17, [KS] 確認47).

   Cập nhật 17/11: Q&A No.45 đã đóng. Màn chỉ thị (CR-18) và nhóm tài năng (CR-17) **làm** theo bảng xác nhận 17/11 ([KS] 確認6–8, 47). Ngoài màn này, quản lý vẫn điều chỉnh AI qua ChatGPT (MCP) như báo giá.
5. **6-2 ở EP01 và 8-2 ở EP06 phụ thuộc nhau.** Theo [YK2] §6-1, 6-2 hướng dẫn lần lượt: thêm vào màn hình chính → cho phép thông báo → đăng ký thanh toán → kết nối mạng xã hội. Bước thanh toán gọi 1-1 (EP08), bước kết nối gọi 8-2 (EP06). Có thể làm EP01 trước, nhưng 6-2 chỉ hoàn tất khi đã có 1-1 và 8-2.

### 1.2. Những phần chung chưa thuộc chức năng nào trong 54 chức năng

Các quy định sau có trong [YK2] nhưng nằm ngoài chương 6. Chúng cần có chỗ trong kế hoạch phát triển, nên tôi đề xuất thêm **EP10 – Nền tảng chung và quản trị hệ thống**:

| Mã nội bộ | Nội dung | Nguồn [YK2] | Màn hình [AG] |
|---|---|---|---|
| C-01 | Bộ trạng thái: bài đăng (6 trạng thái, theo dõi riêng từng mạng xã hội), tài năng, video, kết nối mạng xã hội, thanh toán | §5-1 | — |
| C-02 | Các giá trị quản lý tự chỉnh, không cần sửa mã: giờ nhắn buổi sáng, giờ nhắc, số ngày không đăng, danh sách từ cấm, cài đặt từng tài năng | §5-6 | M-17, M-10 |
| C-03 | Nhật ký thao tác (duyệt, đổi trạng thái, dừng đăng) và nhật ký xử lý (đăng bài, lấy kết quả, tạo video, thu phí). 7-6 chỉ ghi lượt xem | §9-4 | M-19 (chỉ phần lượt xem) |
| C-04 | Khi dịch vụ bên ngoài lỗi: chỉ tắt chức năng đó và báo các bài đăng lỗi | §9-3 | — |
| C-05 | Danh mục 17 loại thông báo | §6-13, 別紙A (phụ lục A) | T-14, M-02 |
| C-06 | Quy tắc chung của màn hình: tên, logo, màu của ứng dụng アデッソ hiện có; nhân vật "モモ" | §6-14 | Toàn bộ |

Mã C-xx chỉ dùng nội bộ, **không** gửi cho khách như chức năng mới: tất cả đều là yêu cầu đã có trong [YK2]. Phần lõi kỹ thuật (khung dự án, cơ sở dữ liệu, lịch chạy tác vụ, môi trường thử) không phải chức năng của khách, nhưng cũng nên đặt trong EP10 để có chỗ ghi khối lượng.

## 2. Danh sách module sau khi sửa

### EP01 – Danh tính và quyền truy cập

| Mã | Tên | Tên tiếng Anh | 優先順位 | Mục [YK2] | Màn hình [AG] |
|---|---|---|---|---|---|
| 1-4 | Đăng ký và đăng nhập tài năng: xin dùng, quản lý duyệt, mật khẩu tạm, tự đặt lại mật khẩu, khóa 15 phút sau 5 lần nhập sai, giữ đăng nhập 30 ngày | Talent Sign-up & Login | 高 | 6-1 | T-01, T-02, T-03, M-03 |
| 1-5 | Nhận diện tài năng: AI chỉ dùng thư mục của tài năng đang đăng nhập | Talent Identification & Data Isolation | 高 | 6-1 | — |
| 6-2 | Hướng dẫn lần đầu: thêm vào màn hình chính → cho phép thông báo → thanh toán → kết nối mạng xã hội. Bỏ dở thì lần sau làm tiếp | First-time Onboarding | 高 | 6-1 | T-04, T-05 |
| 1-6 | Đăng nhập quản lý có 2FA (xác thực hai bước), tự đăng xuất sau 30 phút không thao tác, thêm và vô hiệu hóa quản lý, chỉ một loại quyền | Manager Auth & Management | 高 | 6-2 | M-01, M-18 |
| 7-3 | Trạng thái tài năng: 利用前 (chưa dùng), 利用中 (đang dùng), 利用終了 (đã ngừng). Khi chuyển sang ngừng thì dừng nhắc, dừng thu phí, hủy bài hẹn giờ | Talent Status Management | 高 | 6-2 | M-10 |
| 7-6 | Ghi lại mỗi lần quản lý xem thông tin, hội thoại, kết quả của tài năng. Không sửa được | Access Audit Log | 中 | 6-2 | M-19 |

Còn thiếu: [AG] chưa có màn đặt lại mật khẩu, dù 1-4 yêu cầu (xem file 14 §3.2 điểm 11).

### EP02 – Thông tin tài năng và nguồn dữ liệu cho AI

| Mã | Tên | Tên tiếng Anh | 優先順位 | Mục [YK2] | Màn hình [AG] |
|---|---|---|---|---|---|
| 2-2 | Tạo thư mục OneDrive cho từng tài năng | Talent Folder Creation | 高 | 6-4 | — |
| 2-3 | Quản lý nhập thông tin tài năng qua ChatGPT | ChatGPT-based Info Registration | 高 | 6-4 | — (làm trên ChatGPT) |
| 2-4 | Mục tiêu số người theo dõi và thời hạn | Talent Goal Management | 高 | 6-4 | M-10 |
| 2-1 | Đọc dữ liệu tài năng từ OneDrive | Talent Data Loading | 高 | 6-4 | — |
| 7-1 | Hiển thị thông tin và mục tiêu tài năng cho quản lý | Talent Info Dashboard | 高 | 6-4 | M-06, M-07 |

### EP03 – Huấn luyện viên AI

| Mã | Tên | Tên tiếng Anh | 優先順位 | Mục [YK2] | Màn hình [AG] |
|---|---|---|---|---|---|
| 3-1 | AI hiểu tài năng và thuật toán mạng xã hội | Talent & Algorithm Understanding | 高 | 6-5 | — |
| 3-4 | Trò chuyện với huấn luyện viên AI | AI Coach Chat | 高 | 6-5 | T-08, M-09 |
| 3-3 | Giới hạn chủ đề hội thoại; chuyện sức khỏe hoặc ý định nghỉ thì báo quản lý | Topic Restriction & Escalation | 高 | 6-5 | — |
| 3-9 | Nhắc tài năng lâu không đăng | Inactive Talent Reminder | 中 | 6-5 | T-14, M-02 |
| 3-2 | Tự cải thiện đề xuất dựa trên dữ liệu | AI Self-improvement | 高 | 6-5 | — |
| 3-6 | Tổng kết hôm qua và đề xuất cải thiện (khung sáng, mặc định 8:00) | Daily Review | 高 | 6-5 | T-07, T-08 |
| 3-8 | Tổng kết hằng tuần (thứ Hai) | Weekly Review | 中 | 6-5 | T-08 |
| 3-7 | Báo số người theo dõi tăng và báo đạt mục tiêu | Follower Growth Notification | 中 | 6-5 | T-14, M-02 |
| 3-5 | Theo dõi chi phí AI, tách riêng phí tháng ChatGPT và phí AI mà huấn luyện viên dùng | AI Cost Tracking | 中 | 6-5 | Chưa thấy màn trong [AG] |

### EP04 – Tạo nội dung bài đăng

| Mã | Tên | Tên tiếng Anh | 優先順位 | Mục [YK2] | Màn hình [AG] |
|---|---|---|---|---|---|
| 4-1 | Tự tạo bản nháp: chủ đề, chú thích, hashtag, danh sách cảnh quay, kịch bản video | AI Draft Generation | 高 | 6-6 | T-07, T-09 |
| 4-2 | Yêu cầu sửa và tạo lại bản nháp | Draft Revision | 高 | 6-6 | T-09 |
| 4-3 | Tài năng chấp nhận bản nháp, có thể xin quản lý duyệt. Bản nháp chưa có ảnh hoặc video thì không chấp nhận được | Draft Adoption | 高 | 6-6 | T-09 |
| 4-4 | AI kiểm tra từ cấm theo ngữ cảnh. Một danh sách chung cho mọi tài năng, quản lý thêm, sửa, xóa | Forbidden Words Check | 高 | 6-6 | M-11, M-17 |
| 6-6 | Xem trước bài đăng | Post Preview | 中 | 6-6 | T-09 |

### EP05 – Tư liệu và video AI

| Mã | Tên | Tên tiếng Anh | 優先順位 | Mục [YK2] | Màn hình [AG] |
|---|---|---|---|---|---|
| 6-3 | Gửi ảnh và video | Media Upload | 高 | 6-7 | T-10 (nút gửi thay ở M-08 chỉ cho tài khoản công ty, [KS] 確認27) |
| 6-4 | Lưu tư liệu để dùng lại | Media Storage & Reuse | 高 | 6-7 | T-10 |
| 6-5 | Nhắc gửi tư liệu | Media Reminder | 中 | 6-7 | T-14 |
| 5-1 | Tạo video bằng AI (Kling qua fal.ai) | AI Video Generation | 高 | 6-8 | T-11 |
| 5-2 | Định dạng video | Video Format | 高 | 6-8 | — |
| 5-3 | Xem video đã tạo, chọn dùng hoặc tạo lại | Video Review | 高 | 6-8 | T-12 |
| 5-5 | Ghi rõ video do AI tạo | AI Content Labeling | 高 | 6-8 | — |

### EP06 – Phê duyệt và đăng lên mạng xã hội

| Mã | Tên | Tên tiếng Anh | 優先順位 | Mục [YK2] | Màn hình [AG] |
|---|---|---|---|---|---|
| 7-7 | Duyệt bài: bật hoặc tắt theo từng tài năng, trả lại kèm lý do, quá giờ đăng mà chưa duyệt thì không đăng | Post Approval | 高 | 6-9 | M-04, M-05, M-10 |
| 8-2 | Kết nối dịch vụ đăng bài: đăng ký tài năng lên Upload-Post, đường dẫn kết nối có hạn 48 giờ, mỗi mạng một tài khoản | Posting Service Connection | 高 | 6-10 | T-05 |
| 8-3 | Đăng lên cả 3 mạng, ghi thành công hay lỗi theo từng mạng. Không có video thì không đăng YouTube | Multi-platform Publishing | 高 | 6-10 | — |
| 8-4 | Chống khóa tài khoản (chưa rõ nội dung, xem mục 3) | Anti-ban Measures | 高 | 6-10 | — |
| 8-5 | Báo đăng lỗi. Không tự đăng lại; tài năng hoặc quản lý đặt lịch lại | Publish Failure Notification | 高 | 6-10 | T-13, T-14, M-08 |
| 8-6 | Báo mất kết nối mạng xã hội | SNS Disconnection Notification | 中 | 6-10 | T-05, T-14, M-02 |
| 7-5 | Dừng hoặc chạy lại đăng tự động, cho toàn hệ thống hoặc từng tài năng. Khi dừng thì hủy cả các bài đã hẹn giờ | Auto-posting Stop/Resume | 高 | 6-10 | M-16, M-10 |
| 7-2 | Danh sách bài đăng theo trạng thái; quản lý hủy bài đã hẹn giờ | Post List & Cancellation | 高 | 6-10 | M-08 |
| 9-1 | Đăng bài cho tài khoản công ty | Office Account Posting | 中 | 6-10 | M-12 |

### EP07 – Kết quả và phân tích

| Mã | Tên | Tên tiếng Anh | 優先順位 | Mục [YK2] | Màn hình [AG] |
|---|---|---|---|---|---|
| 8-7 | Mỗi ngày lấy kết quả từng bài và số người theo dõi. Lấy lỗi thì thử lại lần sau | Metrics Collection | 高 | 6-11 | — |
| 8-8 | Ghi kết quả vào thư mục OneDrive để AI đọc sáng hôm sau | Metrics Write-back | 高 | 6-11 | — |
| 3-10 | Số người theo dõi và tiến độ so với mục tiêu | Follower Tracking | 高 | 6-11 | T-06, M-06, M-07 |
| 6-7 | Cho tài năng xem kết quả, số ngày đăng liên tục, mức đạt mục tiêu | Talent Performance View | 高 | 6-11 | T-06, T-13 |
| 8-1 | Chọn giờ đăng: lúc đầu theo chỉ dẫn thuật toán của công ty, đủ dữ liệu thì theo khung giờ phản hồi tốt | Posting Time Analysis | 中 | 6-11 | — |
| 8-9 | Lấy khung giờ bài được xem và được tương tác | Engagement Time Collection | 低 | 6-11 | — |

### EP08 – Thu phí

| Mã | Tên | Tên tiếng Anh | 優先順位 | Mục [YK2] | Màn hình [AG] |
|---|---|---|---|---|---|
| 1-1 | Thu phí hằng tháng qua GMO. Thu lỗi thì báo, không tự khóa. Tài năng đổi được cách thanh toán; lịch sử xem ở trang của bên thanh toán | Monthly Subscription Billing | 高 | 6-3 | T-04, T-15 |
| 1-2 | **Phân loại tài khoản trả phí và tài khoản công ty** (không có miễn phí) | Account Type (Paid / Office) | 高 | 6-3 | M-12 |
| 1-3 | **Không làm**: [YK2] ghi rõ không đổi từ trả phí sang miễn phí | (không có) | 中 | 6-3 | — |
| 5-4 | Đếm số lần tạo video (tính cả tạo lại, không tính lần dịch vụ tạo lỗi) và cộng vào phí tháng | Video Usage Billing | 高 | 6-3 | T-11, T-15, M-10 |

### EP09 – Thông báo và nền tảng PWA

| Mã | Tên | Tên tiếng Anh | 優先順位 | Mục [YK2] | Màn hình [AG] |
|---|---|---|---|---|---|
| 6-1 | Thông báo trong ứng dụng và đẩy về điện thoại. Mở thông báo thì vào đúng màn liên quan | In-app & Push Notifications | 高 | 6-12 | T-14 |
| 7-4 | Danh sách thông báo cho quản lý, lọc theo loại và theo đã xử lý hay chưa | Manager Notification Center | 高 | 6-12 | M-02 |
| 6-8 | Nền tảng PWA (ứng dụng web cài lên màn hình chính). Màn mở đầu cho thấy ngay hôm nay cần làm gì | PWA Foundation | 高 | 6-12 | T-04, T-07 (xem B13: [AG] lại mở T-06 đầu tiên) |

### EP10 – Nền tảng chung và quản trị hệ thống (đề xuất thêm)

Gồm C-01〜C-06 ở mục 1.2 và phần lõi kỹ thuật.

## 3. Chưa rõ, chưa đưa vào module nào

| Nội dung | Màn hình [AG] | Lý do |
|---|---|---|
| Quản lý nhóm tài năng (カテゴリー) và lọc danh sách theo nhóm | M-13 | CR-17, làm ([KS] 確認47) |
| Chỉ thị cho AI theo toàn bộ, theo nhóm, theo từng tài năng | M-14, M-15 | CR-18, làm ([KS] 確認6–8). [YK2] ghi chỉ thị theo nhóm cần kiểm tra kỹ thuật |
| Duyệt theo nhóm hoặc quản lý phụ trách; sửa chữ trực tiếp | — | CR-19, CR-21: làm ([KS] 確認34, 28) |
| Thử thách | — | CR-22: hướng đã chốt ([KS] 確認5), chờ khái niệm アデッソ viết |
| Video tự làm thành bản nháp mỗi ngày; hội thoại riêng tư | — | CR-23: chờ khách (Q&A No.50). CR-24: không làm, quản lý xem toàn bộ hội thoại (Q&A No.7 đóng 17/11). Nhiều tài khoản trên một mạng (CR-20): không làm ([KS] 確認10) |
| Nội dung cụ thể của 8-4 (chống khóa tài khoản) | — | [YK2] §6-10, §9-5: quyết định sau khi xem quy định từng mạng |

Nếu khách đồng ý, nhóm tài năng và chỉ thị cho AI nên vào EP02, cùng chỗ với dữ liệu cho AI.

Cập nhật 17/11: quản lý gửi ảnh và tạo video thay tài năng **đã chốt làm ở đợt đầu** (CR-09), thuộc EP05 (6-3, 5-1); phí video tính cho tài năng đó.

## 4. Thứ tự phát triển đề xuất

Thứ tự dưới đây dựa trên phụ thuộc giữa các chức năng, không phải lịch đã chốt:

1. EP10 (khung dự án, bộ trạng thái, cài đặt) và EP01 (đăng nhập, phân quyền). Mọi module khác đều cần hai phần này.
2. EP02 (thư mục, dữ liệu tài năng). EP03 và EP04 cần dữ liệu này.
3. EP09 (PWA, thông báo). Phần lớn các module sau đều gửi thông báo.
4. EP03 và EP04, làm song song: vòng 要確認 (đề xuất theo khung giờ và nhịp ở chỉ thị cho AI, rồi tạo bản nháp) và khoảng 自動投稿 (tự soạn, tự đăng trong khoảng tài năng đặt) ([KS] 確認14, 18, 25).
5. EP05 và EP06 (tư liệu, duyệt, đăng bài). EP06 cần kết nối Upload-Post (8-2).
6. EP07 (lấy kết quả, ghi ngược vào thư mục). Chỉ có dữ liệu thật sau khi EP06 chạy.
7. EP08 (thu phí qua GMO). Có thể làm song song từ bước 3. Riêng 6-2 (EP01) chỉ hoàn tất khi 1-1 xong.
