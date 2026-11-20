# Cập nhật theo bảng xác nhận yêu cầu (quyết định ngày 17/11/2026)

> **Hồ sơ lịch sử:** đã đối chiếu với bộ nguồn19/11 vàQA/KS20/11. Các kết luận của đợt cũ giữ nguyên; bản hiện hành tra [sổ kiểm chứng](../docs/requirement-review/README.md). Không lấy snapshot9/12nguồn làm danh mục hiện hành16nguồn.

> **Hiệu lực từ20/11 — DEC-0001:** số lần AI viết lại hiện không giới hạn theo chỉ đạo người dùng áp dụng H65. Giới hạn hai lần và vấn đề bộ đếm/RV-01/L23-01 bên dưới là lịch sử; không dùng để chặn lần viết lại thứ ba. Phục hồi lỗi/gửi lặp vẫn cần đội thiết kế. Workbook15 và các dòng xác nhận nguồn được giữ nguyên. [Quyết định](../docs/requirement-review/corrections-2026-11-19/REPORT.md).

Ngày viết: 18/11/2026. Nguồn: `要件定義確認シート_AI育成OS.xlsx` (要件定義確認シート, bảng xác nhận yêu cầu; viết tắt **[KS]**), sheet `確認事項` (các mục cần xác nhận), 118 dòng.

## 1. Tệp này là gì

[KS] là bảng FutureCore gửi アデッソ để xác nhận các 前提 (tiền đề) của từng UC và 確認1–56 (mục cần xác nhận) trong [YK2] v2. Các cột:

| Cột | Nội dung |
|---|---|
| A | OK（このとおりでよい） (đồng ý như vậy): 1 = khách đồng ý, 0 = chưa |
| B | Số: `前提 UC-xx-n` hoặc số 確認 (1.0 … 56.0) |
| F | 弊社の想定・ご提案 (giả định, đề xuất của FutureCore) |
| G | 変更の内容・ご意見 (nội dung muốn đổi, ý kiến của khách) |
| H | お答えで変わること (điều thay đổi theo câu trả lời); khách cũng viết ý kiến vào đây |
| I | 2026/11/17での決定事項 (**quyết định ngày 17/11/2026**), FutureCore ghi sau buổi họp với khách |
| J | Ghi chú thêm của khách |

**Số liệu:**
- 112 dòng khách đánh OK, 6 dòng chưa: 確認4, 5, 22, 32, 49 và `前提 UC-08-6`.
- 42 dòng có ý kiến hoặc quyết định.
- Dòng 確認1 kèm bản thảo 利用規約 (điều khoản sử dụng) do アデッソ viết, đặt ở cột H.

**Thứ bậc:** [KS] mới hơn file Q&A (lựa chọn ngày 13/11) và mới hơn mọi tài liệu phân tích, SCD của đội. Theo [YK2] §1, tài liệu mới hơn thắng, nên **quyết định cột I của [KS] thay các giả định cũ**. Hợp đồng, SOW và báo giá vẫn đứng trên. Các mục khách quyết làm mà nằm ngoài báo giá (mục 3) có ảnh hưởng tới chi phí và lịch: **chưa rõ**, chờ FutureCore xác nhận ([QA] 保留 No.50, khách xếp ưu tiên các chức năng ngoài báo giá).

Cách dẫn nguồn trong các tài liệu khác: `[KS] 確認N, cột I`.

---

## 2. Trạng thái từng 確認

Chú thích cột "Loại":
- **Chốt** = có quyết định ở cột I;
- **Đồng ý** = khách đánh OK, không có ý kiến, nên giả định ở [YK2] giữ nguyên;
- **Ý kiến** = khách viết ở cột G hoặc H nhưng cột I trống, chưa có quyết định;
- **Chưa** = khách chưa đánh OK.

| 確認 | Loại | Nội dung | Module |
|---|---|---|---|
| 1 | Đồng ý | Đọc 利用規約 trên màn hình và đánh dấu đồng ý rồi mới nộp đơn; người ngoài công ty dùng cùng luồng. Bản thảo điều khoản nằm ở [KS] dòng 確認1, cột H | EP01 |
| 2 | Chốt | Nhãn tham khảo là **dưới 18 tuổi**, không phải 未成年 (vị thành niên). Lý do: livestream TikTok cần 18 tuổi trở lên | EP01, EP02 |
| 3 | Chốt | Quản lý đổi được mục tiêu theo từng tài năng; giá trị đầu 1 vạn mỗi mạng như giả định | EP02 |
| 4 | Chưa | Khách gửi danh sách từ cấm lúc triển khai (導入のとき) | EP04 |
| 5 | Chốt hướng (khách chưa OK) | AIコーチ đề xuất thử thách theo tình hình (người theo dõi đang tăng, đang chững…). Quản lý cũng đề xuất được qua chỉ thị cho AI. Tài năng chọn nhận hoặc từ chối, **không cần quản lý duyệt**. Lúc đề xuất, và lúc đề xuất lại sau khi bị từ chối, do chỉ thị cho AI quyết. アデッソ sẽ viết khái niệm và toàn cảnh vào [KS] | EP02, EP03 |
| 6 | Chốt | Màn 「AIへの指示」 (chỉ thị cho AI): chọn đối tượng toàn bộ / カテゴリー (nhóm) / tài năng, viết chỉ thị, lưu. Cách làm chỉ thị theo nhóm do FutureCore thiết kế | EP03 |
| 7 | Chốt (theo giả định) | Có 「試してみる」 (thử, xem trước) và 「保存」 (lưu). Khách góp ý chữ trên nút: 「試してみる⇒確認」, 「保存⇒指示」 | EP03 |
| 8 | Chốt | **Không** làm các nút 「書き出しの部品」 (mẫu đoạn mở đầu); "部品" khách viết nghĩa là nội dung như giọng văn, chủ đề, định hướng. **Cần một màn riêng để nhập thông tin tài năng cho AI** | EP02, EP03 |
| 9 | Chốt | Tài năng tự kết nối mạng xã hội | EP06 |
| 10 | Chốt | Mỗi mạng **một** tài khoản. Tài khoản của nhóm (ユニット) coi là tài khoản công ty, vì đăng lên đó thì phí tính cho tài năng | EP06 |
| 11 | Chốt | Chưa kết nối đủ 3 mạng vẫn bắt đầu dùng được | EP01, EP06 |
| 12 | Chốt | Không cho phép thông báo vẫn bắt đầu dùng được | EP01, EP09 |
| 13 | Đồng ý | Lần đầu mở ứng dụng, báo "quản lý xem được hội thoại với AIコーチ" và tài năng bấm xác nhận | EP01, EP03 |
| 14 | Chốt | Đề xuất bài **hằng ngày, vài ngày một lần, hay gộp mỗi tuần**: chỉnh được qua chỉ thị cho AI. Cách làm cụ thể FutureCore đề xuất sau | EP03, EP04 |
| 15 | Chốt | Như 確認14 (nhịp đề xuất chủ đề và bản nháp chỉnh qua chỉ thị cho AI) | EP04 |
| 16 | Đồng ý | Chủ đề đề xuất có cả tin tức, chủ đề thời sự | EP04 |
| 17 | Đồng ý | Tài năng nói chuyện sức khỏe hoặc muốn rời công ty thì báo quản lý | EP03 |
| 18 | Chốt | Lời chào gửi theo **khung giờ sáng, trưa, tối**, vì không lấy được giờ tài năng dùng Instagram. Đổi giờ theo từng tài năng: xem xét sau khi vận hành | EP03 |
| 19 | Chốt | Có **hai cách đăng**, tài năng tự chọn bằng ô đánh dấu: 自動投稿 (đăng tự động) và 要確認 (xác nhận trước khi đăng). Số ngày không đăng để AI nhắc và để báo quản lý: **xác nhận sau** | EP03, EP04, EP06 |
| 20 | Đồng ý | Các cách giữ động lực theo giả định (nhiệm vụ hằng ngày, chúc mừng, báo phần còn lại tới mục tiêu…) | EP03 |
| 21 | Đồng ý | Lời chào buổi sáng cả thứ bảy, chủ nhật, ngày lễ | EP03 |
| 22 | Chưa | Cách đếm số ngày đăng liên tiếp: quyết khi vận hành | EP03, EP07 |
| 23 | Ý kiến | Khách ghi 「制限を付ける」 (đặt giới hạn) cho số lần nói chuyện với AIコーチ / chuyện riêng tư . Cách hiểu của AMCOLAB (Q&A No.76): không giới hạn số lần, AI không trả lời chuyện riêng | EP03 |
| 24 | Ý kiến | Khách ghi: AI viết chú thích và hashtag **theo ảnh** | EP04 |
| 25 | Chốt | **自動投稿:** khi bắt đầu, tài năng chọn đăng tự động, chọn chủ đề, tải tư liệu lên, đặt khoảng thời gian (ví dụ 1–2 tuần). Sau đó hệ thống tự soạn và tự đăng các bài trong khoảng đó. **要確認:** tài năng xác nhận nội dung trước mỗi bài | EP04, EP05, EP06 |
| 26 | Chốt | Ảnh do tài năng chuẩn bị; đăng tự động dùng tư liệu tài năng đã tải lên. Ngày tài năng 要確認 không gửi ảnh, video thì xử lý thế nào: **xác nhận sau** | EP04, EP05 |
| 27 | Chốt | Quản lý chỉ đăng thay cho **tài khoản công ty** của アデッソ. Cột G khách ghi "cả hai", nhưng quyết định 17/11 chỉ là tài khoản công ty | EP05, EP06 |
| 28 | Chốt | **Tài năng tự sửa được chữ** của bản nháp, vì AI hay viết quá lịch sự | EP04 |
| 29 | Chốt | Nhờ AI soạn lại **tối đa 2 lần**. 要確認 mà soạn lại 2 lần vẫn không hợp thì hôm đó không đăng; tài năng tự sửa rồi đăng thì được | EP04 |
| 30 | Chốt | Giờ đăng do AI quyết, dựa trên khung giờ hiệu quả アデッソ viết trong chỉ thị cho AI; tài năng không đổi giờ | EP04, EP07 |
| 31 | Đồng ý | Video AI có hai loại: ショート動画 (video ngắn) và スライド動画 (trình chiếu ảnh) | EP05 |
| 32 | Chưa | Lưu video tự làm, mỗi ngày đưa 1 video vào bản nháp: khách chưa trả lời | EP05 |
| 33 | Ý kiến | Khách ghi: bài cần duyệt là bài về công việc tài năng đã tham gia | EP06 |
| 34 | Chốt | Yêu cầu duyệt **gửi theo nhóm (カテゴリー) hoặc theo quản lý phụ trách**. Chọn cách nào và khi chưa có người phụ trách thì gửi ai: Q&A No.6 (đề xuất lấy quản lý phụ trách từng tài năng làm cơ bản, có trong báo giá No.42 / 前提条件A9) | EP06, EP09 |
| 35, 36 | Đồng ý | Từ chối có lý do, tài năng sửa rồi gửi lại; tới giờ đăng chưa duyệt thì hủy hẹn | EP06 |
| 37 | Chốt | **Không** giới hạn số bài mỗi ngày | EP06 |
| 38 | Đồng ý | Đăng lỗi: báo tài năng trong ứng dụng, báo quản lý bằng cảnh báo ở màn quản trị | EP06, EP09 |
| 39 | Ý kiến | Khách ghi: làm thông báo cho quản lý khi tài năng đạt mục tiêu | EP03, EP09 |
| 40 | Đồng ý | Tài năng chỉ xem thành tích của mình, không có bảng xếp hạng | EP07 |
| 41 | Ý kiến | Khách ghi: mọi quản lý thấy mọi tài năng; yêu cầu duyệt chia theo người phụ trách; cần đăng ký người phụ trách và chia nơi nhận thông báo. Phần duyệt đã chốt ở 確認34 | EP01, EP09 |
| 42 | Đồng ý | Quản lý xem được toàn bộ hội thoại | EP03 |
| 43 | Chốt | Quản lý chỉ thị cho AI, AIコーチ truyền lại cho tài năng. Tin nhắn trực tiếp quản lý → tài năng (ví dụ báo việc) **để giai đoạn sau** | EP03, EP09 |
| 44 | Đồng ý | Ghi nhật ký khi quản lý mở thông tin, hội thoại, thành tích của tài năng | EP10 |
| 45 | Ý kiến | Khách ghi: báo quản lý **cả qua email** | EP09 |
| 46 | Ý kiến | Khách ghi: có ô 「未対応」 (chưa xử lý), lọc ra danh sách chưa xử lý giống "chưa đọc" | EP09 |
| 47 | Chốt | Chức năng カテゴリー (nhóm tài năng) **làm trong đợt này**, thêm và sửa được | EP01, EP02, EP09 |
| 48 | Chốt hướng | Thu phí theo chu kỳ **một tháng từ ngày đăng ký** (ví dụ đăng ký 17/11 thì kỳ đầu đến 16/12). アデッソ hỏi đơn vị thanh toán | EP08 |
| 49 | Chưa | アデッソ hỏi đơn vị thanh toán có thu được số tiền thay đổi theo tháng không (phí tháng + phí tạo video) | EP08 |
| 50 | Ý kiến | Khách ghi: rời giữa tháng vẫn thu đủ phí một tháng | EP08 |
| 51–54 | Đồng ý | Tài năng xem số lần tạo video và tổng tiền; bài của tài khoản công ty không cần duyệt; muốn rời thì báo quản lý, quản lý đổi trạng thái 退会; đổi sang 退会 thì không đăng nhập được và hủy bài đã hẹn | EP05, EP06, EP08, EP01 |
| 55 | Chốt | Dữ liệu của tài năng 退会 (thành tích đăng bài, ảnh…) **giữ 6 tháng sau khi rời rồi tự xóa**; xóa xong không khôi phục được | EP01, EP02, EP05, EP10 |
| 56 | Chốt | Trạng thái 退会 **không** chuyển lại 利用中 (đang dùng) được | EP01, EP10 |

Các 前提 (tiền đề) có quyết định:

| Dòng [KS] | Loại | Nội dung |
|---|---|---|
| 前提 UC-06-3 | Chốt | Video AI tạo hoặc AI chỉnh **phải ghi nhãn** theo điều khoản mạng xã hội |
| 前提 UC-10-1 | Chốt | Màn quản trị là web, ưu tiên PC. Trên điện thoại hiển thị không vỡ; **màn duyệt và màn chỉnh chỉ thị cho AI thao tác được trên điện thoại**. Không cam kết giống hệt từng chi tiết giữa các máy |
| 前提 UC-08-6 | Chưa | Nút dừng toàn bộ đăng tự động và hủy bài đã hẹn: khách chưa đánh OK, chưa có ý kiến |

---

## 3. Thay đổi so với danh sách CR (`19_Doi_chieu_QA_bao_gia.md` §3)

Trước đây CR-17〜25 "chưa làm tới khi khách quyết". Theo [KS]:

| CR | Nội dung | Trạng thái mới | Căn cứ |
|---|---|---|---|
| CR-17 | Nhóm tài năng (カテゴリー): M-10 theo thiết kế khách = M-13 theo [AG] | **Làm** trong đợt này | 確認47, cột I |
| CR-18 | Màn chỉ thị cho AI (M-11 theo thiết kế khách = M-14, M-15 theo [AG]): đối tượng toàn bộ/nhóm/tài năng, thử, lưu | **Làm**: nội dung màn đã chốt. Không có nút 「書き出しの部品」 | 確認6, 7, 8, cột I |
| CR-19 | Yêu cầu duyệt gửi theo nhóm hoặc người phụ trách | **Làm** | 確認34, cột I |
| CR-20 | Nhiều tài khoản trên một mạng | **Không làm** | 確認10, cột I |
| CR-21 | Tài năng sửa chữ trực tiếp | **Làm** | 確認28, cột I |
| CR-22 | Thử thách | **Hướng đã chốt** (AI đề xuất, tài năng nhận/từ chối, không duyệt). Màn và yếu tố trò chơi: chờ khái niệm アデッソ viết | 確認5, cột I (khách chưa OK) |
| CR-23 | Video tự làm, mỗi ngày 1 video thành bản nháp | **Vẫn chờ** | 確認32 chưa trả lời |
| CR-24 | Hội thoại riêng tư | **Không làm** | Q&A No.7 đóng 17/11: quản lý xem toàn bộ hội thoại (確認13, 42) |
| CR-25 | 画面定義書 (tài liệu định nghĩa màn hình) | **Không cần** | Q&A No.68 đóng 17/11: FutureCore làm, gửi sáng 20/11 |

**Việc mới, chưa có CR:**
1. Hai cách đăng 自動投稿 / 要確認, có khoảng thời gian đăng tự động (確認19, 25, 26).
2. Nhịp đề xuất chỉnh được: hằng ngày, vài ngày, mỗi tuần (確認14, 15).
3. Màn nhập thông tin tài năng cho AI trong ứng dụng (確認8): màn là gì đang hỏi ở Q&A No.74, AMCOLAB đề xuất đợt 1 chưa làm.
4. Gửi lời chào theo khung sáng, trưa, tối (確認18).
5. Tự xóa dữ liệu tài năng 退会 sau 6 tháng (確認55).
6. Chu kỳ thu phí theo ngày đăng ký (確認48).

Mục 1, 2, 3 thay đổi lớn vòng lặp hằng ngày đang mô tả ở [YK2] ch.4 (mỗi sáng 3 chủ đề → chọn → soạn → tải ảnh → chấp nhận). Ảnh hưởng tới báo giá: **chưa rõ**.

---

## 4. Tài liệu đã sửa theo bảng này (18/11/2026)

Các quyết định ở mục 2 và 3 được **sửa thẳng vào đúng chỗ** trong từng tài liệu (câu, bảng quy tắc, sơ đồ), kèm nguồn `[KS] 確認N`; không có mục "cập nhật" nối thêm ở cuối tệp. Tệp này là nơi duy nhất giữ lịch sử thay đổi.

- `15_Cau_hoi_lam_ro_luong.xlsx`: cột "Trạng thái" của 56 dòng 確認 và các dòng gắn CR-21, CR-22, CR-23.
- `19_Doi_chieu_QA_bao_gia.md`: ghi chú ở đầu mục 3 (danh sách CR).
- `Phan_tich/00`–`11`, `13`, `14`, `16`, `17`, `18`, `20`: sửa tại chỗ. Ví dụ: tệp 06 vẽ lại Workflow 2 với hai nhánh 自動投稿 / 要確認, bỏ cạnh 利用終了 → 利用中 ở Workflow 7; tệp 07 thêm entity `KHOANG_DANG_TU_DONG`. `12` (lịch sử v1→v2) giữ nguyên. Từ 18/11/2026, bản cục bộ của 00–12 là bản chính, không đồng bộ với Claude Doc nữa.
- SCD: sửa tại chỗ trong các tệp chức năng bị ảnh hưởng và cột trạng thái trong `00_Cau_hoi_cho_khach.md` (chỉ trạng thái, không đề xuất câu trả lời).
- `agent_spec/onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md` và `CA_KIEM_THU_VI.md`.
- `CLAUDE.md`.

- `database-design/01`, `02`, `04`, `06`, `07`: trạng thái yêu cầu (R01-06, R02-06, R04-04, R06-10, R10-03, R10-05; thêm R01-17, R01-18, R02-09〜11, R04-11, R04-12, R06-17), câu hỏi U-01, U-05, U-09, U-12, U-15, thêm U-16; đề xuất bảng/cột mới P-12〜P-20. Khối "Q&A 15/11" ở đầu `Phan_tich/00`–`14` đã gộp vào thân và xóa.

**Chưa làm:** migration cho P-12〜P-20 (chưa có bảng nào trong DB cho nhóm tài năng, quản lý phụ trách, chỉ thị AI, thử thách, cách đăng; P-13, P-18 trigger, P-19 làm được ngay); SCD riêng cho luồng 自動投稿; ma trận sẵn sàng `SCD/README.md`.

---

## 5. Biên bản họp 17/11 và Q&A cập nhật 17/11

**Biên bản** `20261117_アデッソ様定例会_確認シートの読み合わせ_議事録.md` (viết tắt [GJ]) ghi buổi họp định kỳ trực tuyến ngày 17/11/2026, 16:00–17:10, giữa アデッソ và FutureCore, đọc lại bảng xác nhận. Quyết định trong [GJ] **trùng** với cột I của [KS]. [GJ] thêm các điểm sau:

- **Bắt đầu đăng:** "khi tài năng bắt đầu đăng thì chọn 自動投稿 hay 1回の投稿 (đăng một lần)". Lựa chọn này có cùng là ô cài đặt 自動投稿 / 要確認 hay không: Q&A No.71.
- **Nguyên tắc thiết kế:** nhịp đăng và khung giờ nên chỉnh qua chỉ thị cho AI, hạn chế viết cứng trong chương trình (ví dụ "mỗi ngày gửi lúc mấy giờ"), vì phần viết cứng khó đổi về sau.
- **Dung lượng OneDrive:** phía アデッソ lo lưu mãi sẽ đầy, muốn tự xóa ảnh, video cũ. FutureCore xem xét, tách khỏi chức năng ứng dụng (việc số 9; Q&A No.8).
- **Việc phải làm và mốc thời gian:**
  - アデッソ hỏi đơn vị thanh toán về chu kỳ từ ngày đăng ký và số tiền thay đổi theo tháng (việc số 1);
  - アデッソ viết khái niệm thử thách (việc số 2);
  - アデッソ gửi email Google để FutureCore giới hạn quyền xem tệp chia sẻ (việc số 3, 4);
  - FutureCore gửi 画面定義書 sáng 20/11 (việc số 5);
  - chốt yêu cầu trong tuần 23/11 (việc số 6);
  - FutureCore đề xuất cách chỉnh nhịp đề xuất và đăng tự động qua chỉ thị cho AI (việc số 7), cách làm chỉ thị theo nhóm (việc số 8).
- **Họp tiếp:** 20/11/2026, 11:00 (xem 画面定義書).

**Q&A bản 17/11:** 43 câu đóng, 33 câu mở; thêm No.69–77 (tệp 19 §4.3). Thay đổi so với mục 2 và 3 ở trên:

- **CR-24** không làm (No.7); **CR-25** không cần (No.68).
- **Mã màn hình** chuẩn là T/M của [AG] (No.30).
- **確認8:** "màn nhập thông tin tài năng" là gì còn hỏi (No.74).
- **確認34:** gửi theo nhóm hay theo quản lý phụ trách, và khi chưa có người phụ trách thì sao, còn hỏi (No.6).
- **Còn hỏi:** chi tiết 自動投稿 (No.70, 71, 77), thử thách và ngày đăng liên tục (No.72), giờ các khung (No.73), email cho quản lý (No.75), phạm vi xóa và đăng ký lại sau 退会 (No.69).

Các tài liệu đã sửa thẳng theo các điểm này: CSV 15, tệp 06, 10, 16, 17, 19, 20, SCD 2-3, 3-4, 4-3, 7-7, C-01, C-02, `database-design/01`, `04`, tài liệu OneDrive, CLAUDE.md.

