<!-- DELIVERY24112026 -->
## Cập nhật nguồn24/11 — đối chiếu25/11/2026

Phần cập nhật này thay nhận định cũ trên đúng chủ đề bên dưới; giữ nội dung trước để truy vết. [Báo cáo và hash](../docs/requirement-review/corrections-2026-11-19/DELIVERY_24112026_REVIEW.md). Chưa là baseline/AC đã duyệt.

### Dừng hệ thống và lịch ngoài

Sau họp24/11 xác nhận không làm nút hủy toàn bộ lịch; dừng từng Talent vẫn có. Dừng hệ thống phải hủy cả lịch đã gửi Upload-Post, vì tắt OS không tự hủy lịch ngoài.

**Còn mở/giới hạn:** Đội thiết kế trình tự hủy/đối soát trước shutdown và xử lý thất bại, không hứa tắt VPS là dừng được mọi bài. Căn cứ: `KS 20261122!G30:H30;G35:I35 (No.29,34)`; `EV-1321`; QA No.77;QA No.91;TR-7-5.

### YK3: luồng và mã màn

Bản0.3 ngày24/11 có16luồng nghiệp vụ, T-01–T-19 và M-01–M-21; đây là bộ mã của YK3. Ví dụ T-08 My Page, T-10 autopost, T-11 chat, M-08 nhập Talent, M-15 danh sách chỉ thị, M-16 nhập, M-17 chat, M-21 audit.

**Còn mở/giới hạn:** Không đổi mã AG/SD18/SD19 theo số trùng. YK3 dẫn screen/flow20/11 nhưng chưa có bộ độc lập đó trong24112026. Hình nhúng chỉ xem ở mức tổng quan, không đủ ký AC chi tiết. Căn cứ: `YK3 §2-4; w:p96–110; §2-5; phụ lụcA–D`; `EV-1327`; YK3 §2-4.

<!-- /DELIVERY24112026 -->

> **Đợt23112026:** Đã đối chiếu nguồn mới; TikTok nháp/consent, ranking, lưu đồng ý phụ huynh và giọng nói là đề nghị chưa chốt. Không khôi phục Manager sửa, cảnh báo tâm sự hoặc trần phí từ hình/nhận định hồi tố. [Đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md). Mã màn phải kèm UI-M20/ngày20/11/trangPDF; không đổi mã AG/SD18/SD19.

> **Cập nhật nguồn23/11/2026:** QA/KS đã đổi phiên bản; nội dung bên dưới giữ lịch sử, phần mâu thuẫn phải theo [đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md). Talent được hủy lịch/đăng lại bài lỗi; thêm tạm dừng vẫn tính phí; AI tự sửa từ cấm; bỏ dừng đăng toàn hệ thống và thông báo tâm sự nghiêm trọng; chọn media theo chủ đề. Không suy GMO, slideshow hoặc đề xuất đang xem xét đã được duyệt.

# Workflow chính của hệ thống

## Đối chiếu nguồn mới — 20/11/2026

Phần dưới cập nhật hiệu lực theo nguồn mới; các mã [AG]/SD18 trong phân tích trước vẫn là trích dẫn lịch sử. Không suy nguồn FCP hoặc mục cần xác nhận thành khách đã duyệt.

- **6-2** — Bắt buộc đăng ký phương thức thanh toán và mở từ biểu tượng màn hình chính; thêm biểu tượng bằng hướng dẫn thủ công theo máy. SNS và cho phép thông báo có thể làm sau. Thanh toán đăng ký xong tự kích hoạt, tạo folder và báo Manager; sau khởi tạo mở Mypage T-08, không phải Home T-09. Office bỏ bước thanh toán. Còn mở: Cần kiểm thiết bị/PWA quay lại sau kết nối, không coi hình minh họa là kiểm chứng tương thích. Căn cứ: `T19:5,6,8,9,11,26,33;BF19:4`.
- **4-3** — Chấp nhận yêu cầu có ảnh/video; xin duyệt chỉ hiện cho Talent bật tính năng. Đang chờ Manager duyệt thì không sửa; trả lại có lý do thì sửa rồi xin duyệt lại. Còn mở: Thiếu tư liệu trong chế độ kiểm tra còn KS No.8; bài đến muộn còn No.56; không chốt mọi giao điểm duyệt/từ cấm cho tự động. Căn cứ: `T19:17,18,22,30;BF19:7,8`.
- **4-4** — Manager sửa bài bị từ cấm, AI kiểm lại; sạch thì đặt lịch, còn từ cấm thì giữ ở màn xử lý. Không cần trả bản Manager sửa cho Talent xác nhận lại theo GJ19§12. Còn mở: Quyền Talent tự sửa chính bài đã bị chặn chưa được mô tả rõ như quyền sửa bản nháp thường; chỉ giữ phần này ở No.57. Căn cứ: `M19:16,23;BF19:17;GJ19:12`.
- **7-5** — Dừng riêng hoặc toàn bộ ngăn lịch mới và hủy lịch đã có; chạy lại không phục hồi bài đã hủy; tự làm video cũng dừng theo BF19 trang 19. Còn mở: Phần này có mô tả rõ nhưng KS 20261120 No.32 vẫn chưa trả lời; tiếp tục theo dõi tại đó, không tạo câu hỏi trùng. Bài mới trong lúc dừng còn No.60. Căn cứ: `M19:15,21;BF19:19;KS:20261120:32`.
- **9-1** — Office nhập tên/email ở M-12; tạo folder ngay; Manager login app Talent bằng office, tự nối SNS; không thanh toán/không phí tháng/không duyệt; phí video nội bộ. Unit là office, hiện cùng Talent list. Còn mở: Vòng đời kết thúc/xóa office cần No.66; không suy ngoại lệ streak/nhắc ngày không đăng từ việc miễn phí. Căn cứ: `T19:5,9,25,30;M19:10,17;BF19:20`.

Chi tiết từng finding/Q&A và hiệu lực gate: [báo cáo đối chiếu hiện hành](../docs/requirement-review/corrections-2026-11-19/NEW_DELIVERY_IMPACT.md). Không dùng các giả định mâu thuẫn bên dưới làm kết luận hiện hành.

> **Quyết định20/11 — DEC-0001:** người dùng chốt áp dụng H65, không giới hạn số lần nhờ AI viết lại. Thay giới hạn hai lần trong đúng chủ đề; các điều kiện sửa/duyệt và chính sách chi phí khác giữ nguyên. Xem [bản ghi quyết định](../docs/requirement-review/corrections-2026-11-19/REPORT.md).

Có 11 workflow chính, dựng lại từ 13 tình huống sử dụng (UC-01 đến UC-13) ở mục 4 và các chức năng ở mục 6 của [YK2]. Workflow 2 (đăng bài hằng ngày) là luồng cốt lõi, các workflow khác nối vào nó. Tab này đã viết lại theo bản yêu cầu v2. Số 確認 (mục cần xác nhận) theo đánh số của v2.

**Cách đọc sơ đồ:**

- [YK2] = AI育成OS_概要要件定義書_v2.docx. "前提" (tiền đề) là phần tiền đề mà v2 thêm vào cuối mỗi UC.
- Sơ đồ luồng (flowchart) chia theo tác nhân. Sơ đồ trạng thái (state diagram) ghi điều kiện chuyển trên mũi tên.
- **Ô viền đứt nét màu cam và ký hiệu ⚠** là bước hoặc nhánh tài liệu chưa nói rõ. Mình vẽ ra để thấy chỗ hổng, không phải đề xuất cách làm.
- Khách đã trả lời các 確認 trong bảng xác nhận yêu cầu ngày 17/11/2026 ([KS], `要件定義確認シート_AI育成OS.xlsx`; tổng hợp ở tệp 21). Bước ghi `[KS] 確認N` là quyết định 17/11; bước chỉ ghi số 確認 là giả định khách đã đồng ý.

| STT | Workflow | Tác nhân chính | Nguồn [YK2] |
| --- | --- | --- | --- |
| 1 | Đăng ký và bắt đầu sử dụng | Tài năng, quản lý, hệ thống, cổng thanh toán | UC-01, UC-02, UC-03 |
| 2 | Đăng bài hằng ngày | Huấn luyện viên AI, tài năng, hệ thống | UC-04, UC-05, UC-08 |
| 3 | Trạng thái bài đăng | Hệ thống | 5-1, 6-6, 6-9, 6-10 |
| 4 | Duyệt bài và xử lý từ cấm | Tài năng, quản lý, AI | UC-07, 5-3, 6-6 (4-4), 6-9 (7-7) |
| 5 | Tạo video | Tài năng, hệ thống, fal.ai | UC-06, 6-8 |
| 6 | Thu phí hằng tháng | Hệ thống, cổng thanh toán, quản lý | UC-11, 6-3 |
| 7 | Trạng thái tài năng | Quản lý, hệ thống | UC-13, 6-2 (7-3) |
| 8 | Nhắc nhở và báo quản lý | AI, quản lý | UC-04, UC-10, 6-5 (3-3, 3-9) |
| 9 | Xử lý buổi sáng và số liệu | Hệ thống, Upload-Post, OneDrive, OpenAI | UC-09, 6-4 (2-1), 6-11 |
| 10 | Kết nối mạng xã hội | Tài năng, hệ thống, Upload-Post | UC-03, 6-10 (8-2, 8-6) |
| 11 | Chỉ dẫn cho AI | Quản lý, hệ thống | UC-02 前提, [KS] 確認6, 7, 8 |

**Tài khoản công ty (UC-12)** đi đúng workflow 2, chỉ khác 4 điểm:

- Quản lý tạo tài khoản trên màn hình quản trị, không qua đơn đăng ký. Thư mục OneDrive được tạo ngay lúc đó.
- Quản lý thao tác thay tài năng. ⚠ UC-12 前提 nói quản lý đăng nhập ứng dụng tài năng bằng mã của tài khoản công ty, còn 6-10 (9-1) nói thao tác trên màn hình quản trị.
- Không duyệt bài (確認52). ⚠ Mục 7-4 lại ghi có "duyệt cho tài khoản công ty".
- Không thu phí tháng. Phí tạo video do アデッソ quyết toán nội bộ, hệ thống chỉ đếm số lần (6-3, chức năng 5-4).

## Workflow 1. Đăng ký và bắt đầu sử dụng

Tài năng tự đăng ký trên ứng dụng, quản lý duyệt, rồi tài năng tự cài đặt và thanh toán. Thư mục OneDrive chỉ được tạo sau khi thanh toán xong. Huấn luyện viên AI chỉ đưa bản nháp sau khi quản lý nhập hồ sơ.

```mermaid
flowchart TD
  subgraph TN["Tài năng"]
    D0["Mở ứng dụng từ đường dẫn<br/>Điền tên, email, ngày sinh<br/>Đọc và đồng ý điều khoản"]
    D1["Đăng nhập bằng mật khẩu tạm<br/>Đặt mật khẩu mới"]
    D1b["Xác nhận đã biết quản lý đọc được hội thoại<br/>(確認13)"]
    D2["Thêm ứng dụng vào màn hình chính"]
    D3["Cho phép thông báo<br/>(bỏ qua vẫn dùng được, 確認12)"]
    D5["Đăng ký thanh toán<br/>trên màn hình cổng thanh toán"]
    D6["Kết nối mạng xã hội<br/>(có thể thiếu mạng, 確認11)"]
  end
  subgraph HT["Hệ thống"]
    C0{"Email đã dùng?"}
    C1["Báo mọi quản lý: có người đăng ký"]
    C2["Email mật khẩu tạm"]
    C3["Email mẫu từ chối, không nêu lý do"]
    C4["Tạo thư mục OneDrive"]
    C5["⚠ Đăng ký tài năng với Upload-Post<br/>lúc nào? (8-2)"]
  end
  subgraph QL["Quản lý"]
    B1{"Xem đơn<br/>duyệt hay từ chối?"}
    B1a["Cài có dùng duyệt bài hay không"]
    B2["⚠ Biết lúc nào cần nhập hồ sơ?"]
    B3["Tạo ChatGPT project, gắn thư mục<br/>Nhập hồ sơ qua ChatGPT<br/>Nhập mục tiêu và hạn trên màn hình quản trị"]
    B5["Xác nhận đã kết nối mạng xã hội"]
  end
  D0 --> C0
  C0 -- "Có" --> X0["Không nhận đơn"]
  C0 -- "Chưa" --> C1 --> B1
  B1 -- "Từ chối" --> C3
  B1 -- "Duyệt" --> B1a --> C2 --> D1 --> D1b --> D2 --> D3 --> D5 --> C4
  C4 --> B2 --> B3
  D5 --> D6 --> B5
  B3 --> E1(["Huấn luyện viên AI bắt đầu đưa bản nháp"])
  B5 --> E2(["⚠ Chuyển sang 利用中 – đang dùng<br/>ai chuyển, lúc nào?"])
  C5 -.-> D6
  classDef unclear stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  class C5,B2,E2 unclear
```

Tài khoản công ty không đi luồng này. Quản lý tạo tài khoản trên màn hình quản trị, hệ thống tạo thư mục ngay, không có bước thanh toán (UC-01 前提, 6-4 chức năng 2-2).

| Bước | Tác nhân | Trạng thái tài năng | Điều kiện để đi tiếp | Nguồn [YK2] |
| --- | --- | --- | --- | --- |
| Gửi đơn đăng ký | Tài năng | ⚠ Chưa có tên trạng thái cho đơn chờ duyệt | Email chưa được dùng, đã đồng ý điều khoản | UC-01, 6-4 (2-2), 確認1 |
| Duyệt hoặc từ chối | Quản lý | ⚠ 利用前 (trước khi dùng)? | Từ chối người lạ và người đã rời công ty | UC-01, 6-1 (1-4) |
| Đăng nhập lần đầu | Tài năng | 利用前 | Có mật khẩu tạm trong email | UC-03 前提, 6-1 (1-4) |
| Hướng dẫn lần đầu | Tài năng | 利用前 | Bỏ dở thì lần sau làm tiếp từ bước đang dở | 6-1 (6-2) |
| Tạo thư mục | Hệ thống | 利用前 | Đã đăng ký thanh toán | UC-01 前提, 6-4 (2-2) |
| Nhập hồ sơ, mục tiêu | Quản lý | 利用前 | Đã có thư mục và ChatGPT project | UC-01 前提, UC-02 前提 |
| Dùng huấn luyện viên AI | Tài năng | ⚠ 利用中 (đang dùng) | Đã thanh toán. Bản nháp chỉ có sau khi quản lý nhập hồ sơ | UC-03 前提, UC-01 前提 |

**Luồng chưa rõ:**

- Đăng ký tài năng với Upload-Post lúc nào. Mục 8-2 vẫn ghi "khi đăng ký tài năng", nhưng không còn bước quản lý đăng ký. Upload-Post tính phí theo số tài năng đã đăng ký (UC-08 前提), nên thời điểm này ảnh hưởng chi phí.
- Quản lý biết lúc nào cần nhập hồ sơ. Tài năng đã trả phí nhưng chưa có bản nháp cho tới khi quản lý nhập xong.
- Khi nào tài năng chuyển từ 利用前 sang 利用中, và đơn chờ duyệt hoặc bị từ chối có phải là một trạng thái không.
- Đơn bị từ chối giữ bao lâu. Người bị từ chối có đăng ký lại bằng email đó được không. Có chặn đăng ký rác không.
- Người ngoài công ty và người vị thành niên tự đăng ký: ai lấy đồng ý về dữ liệu cá nhân và đồng ý của phụ huynh (2-3, 10-3 chỉ nói tới hợp đồng với người thuộc công ty).
- Đăng ký thanh toán lỗi hoặc bỏ dở thì tài khoản ở trạng thái nào, có bị xóa sau một thời gian không.

## Workflow 2. Đăng bài hằng ngày (luồng cốt lõi)

Tài năng tự chọn một trong hai cách đăng bằng ô đánh dấu ([KS] 確認19, 25):

- **要確認 (xác nhận trước khi đăng):** vòng quen thuộc: tin nhắn, chọn chủ đề, viết bản nháp, gửi tư liệu, 採用 (chấp nhận), đặt lịch, đăng bài, hôm sau nhận xét. Nhịp đề xuất (hằng ngày, vài ngày một lần, hay gộp mỗi tuần) chỉnh qua chỉ thị cho AI ([KS] 確認14, 15).
- **自動投稿 (đăng tự động):** khi bắt đầu, tài năng chọn chủ đề, tải tư liệu lên và đặt khoảng thời gian (ví dụ 1–2 tuần). Trong khoảng đó hệ thống tự soạn và tự đăng, không có bước 採用 từng bài ([KS] 確認25).

Ở cả hai cách, bài chỉ được đặt lịch khi có tư liệu và việc đăng tự động (toàn bộ và của tài năng đó, chức năng 7-5) đang bật. Ở 要確認, bài còn phải được 採用. Nhờ AI soạn lại không giới hạn số lần; tài năng tự sửa chữ được ([KS] 確認28, 29).

```mermaid
flowchart TD
  M0{"Cách đăng tài năng chọn<br/>([KS] 確認19)"}
  M0 -- "自動投稿" --> A1["Bắt đầu khoảng đăng: chọn chủ đề,<br/>tải tư liệu, đặt khoảng (ví dụ 1–2 tuần)<br/>([KS] 確認25)"]
  A1 --> A2["Hệ thống tự soạn bài trong khoảng<br/>theo nhịp ở chỉ thị cho AI"]
  A2 --> A3["⚠ Duyệt, từ cấm, hết tư liệu giữa khoảng:<br/>chưa rõ"]
  A3 --> S12
  M0 -- "要確認" --> S0
  S0["⚠ Xử lý trước giờ nhắn – Workflow 9<br/>giờ bắt đầu chưa có"] --> S1["AI: tin nhắn theo khung sáng (mặc định 8:00),<br/>trưa, tối ([KS] 確認18): kết quả hôm qua,<br/>chủ đề gợi ý theo nhịp ở chỉ thị cho AI (確認14),<br/>tiến độ チャレンジ nếu có"]
  S1 --> S2{"Tài năng phản hồi?"}
  S2 -- "Chọn chủ đề hoặc nói chủ đề muốn đăng" --> S3["AI viết bản nháp<br/>chú thích, hashtag, hướng dẫn chụp, kịch bản"]
  S2 -- "Không phản hồi" --> X1["Không đăng hôm nay<br/>cộng số ngày không đăng – Workflow 8"]
  S3 --> S4["Tài năng tự sửa chữ, hoặc nhờ AI viết lại<br/>không giới hạn số lần (DEC-0001; [KS] 確認28)"]
  S4 --> S5{"Đã có ảnh hoặc video?"}
  S5 -- "Chưa, đến trước giờ đăng 2 tiếng" --> S6["Nhắc một lần"]
  S6 --> S7{"Gửi kịp?"}
  S7 -- Không --> X1
  S7 -- Có --> S8
  S5 -- "Cần video AI" --> V["Tạo video – Workflow 5"] --> S8
  S5 -- Có --> S8["Xem trước bài đăng, bấm 採用"]
  S8 --> S9{"Có từ cấm?"}
  S9 -- Có --> W4["Workflow 4"]
  S9 -- Không --> S10{"Gửi duyệt?"}
  S10 -- Có --> W4
  S10 -- Không --> S12
  W4 -- "Duyệt hoặc đã sửa xong" --> S12{"Đăng tự động đang bật?<br/>(toàn bộ và của tài năng)"}
  S12 -- Không --> X2["Không đặt lịch"]
  S12 -- Có --> S11["Đặt lịch qua Upload-Post<br/>giờ do AI chọn, tài năng không đổi được (確認30)"]
  S11 -.-> S13["⚠ Biện pháp chống khóa tài khoản<br/>chưa quyết (8-4, 確認37)"]
  S11 --> S14["Đến giờ: đăng lên các mạng đã kết nối<br/>YouTube chỉ khi có video"]
  S14 --> S15{"Kết quả từng mạng"}
  S15 -- "Thành công" --> S16["AI báo đã đăng và số ngày đăng liên tục"]
  S15 -- "Lỗi" --> S17["Báo tài năng, cảnh báo quản lý<br/>không tự đăng lại (確認38)"]
  S17 --> X4["⚠ Tài năng hoặc quản lý đặt lịch lại (8-5)<br/>nhưng tài năng không đổi được giờ"]
  S16 --> S18["Sáng hôm sau: lấy số liệu, nhận xét, cải thiện"]
  S18 --> M0
  classDef unclear stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  class S0,S13,X4,A3 unclear
```

**Điều kiện ở các điểm rẽ nhánh:**

- Huấn luyện viên AI chỉ đưa bản nháp khi quản lý đã nhập hồ sơ tài năng (UC-01 前提).
- 採用 cần có ảnh hoặc video (6-6, chức năng 4-3). Ảnh do tài năng chuẩn bị; 自動投稿 dùng tư liệu đã tải lên lúc bắt đầu khoảng ([KS] 確認26).
- Kiểm tra từ cấm chạy khi bấm 採用 (6-6, chức năng 4-4).
- Chỉ tài năng được cài "dùng duyệt bài" mới thấy lựa chọn gửi duyệt (6-9, chức năng 7-7).
- Đăng tự động bị dừng (toàn bộ hoặc riêng tài năng) thì không đặt lịch mới, và các bài đã đặt lịch bị hủy (6-10, chức năng 7-5).
- Mạng chưa kết nối thì bỏ qua (6-10, chức năng 8-3, 確認11).
- Bài tài năng tự đăng ngoài hệ thống vẫn tính là có đăng nếu Upload-Post đọc được (UC-09).

**Luồng chưa rõ:**

- Xử lý trước giờ nhắn chưa có giờ bắt đầu. Tin gửi theo khung sáng, trưa, tối ([KS] 確認18); số lần gửi mỗi ngày và giờ cụ thể của từng khung chưa rõ. Đổi giờ theo từng tài năng: xem xét sau khi vận hành.
- 自動投稿: đang hỏi ở Q&A No.70 (ảnh nào cho bài nào, dừng và đổi giữa khoảng, soạn trước hay soạn từng ngày, hết khoảng), No.71 (ô 自動投稿 / 要確認 có cùng là lựa chọn "自動投稿 hay 1回の投稿" khi bắt đầu đăng theo biên bản 17/11 không; bài công việc có qua duyệt không; kiểm tra từ cấm lúc nào; 要確認 chưa xác nhận tới giờ đăng thì sao) và No.77 (nút dừng toàn bộ có dừng cả khoảng 自動投稿 không). AMCOLAB đề xuất: ảnh dùng theo thứ tự tải lên, mỗi bài một ảnh, hết ảnh thì không đăng và báo tài năng; soạn trước một ngày.
- 要確認 mà tài năng không gửi ảnh, video trong ngày thì xử lý thế nào: xác nhận sau ([KS] 確認26).
- Talent có thể tiếp tục nhờ AI viết lại không giới hạn số lần; không dừng đăng vì hết hai lượt (DEC-0001). Điều kiện chấp nhận/duyệt bài vẫn áp dụng.
- Biện pháp chống khóa tài khoản chưa có (8-4). Con số 1 ảnh + 1 video mỗi ngày đã bị bỏ (確認37).
- Đăng lỗi thì 8-5 cho "tài năng hoặc quản lý đặt lịch lại", nhưng 確認30 đề xuất tài năng không đổi được giờ đăng. Chỉ một mạng lỗi thì có đăng lại riêng mạng đó không?
- Tài năng 採用 sau giờ đăng dự kiến thì bài đăng lúc nào.
- Nhiều bản nháp được 採用 trong một ngày thì mỗi bài đăng giờ nào (không giới hạn số bài mỗi ngày, [KS] 確認37).
- Bản nháp không 採用 trong ngày thì hết hiệu lực hay giữ sang hôm sau.
- Tài năng có biết trước giờ đăng để gửi tư liệu kịp không.

## Workflow 3. Trạng thái bài đăng

[YK2] vẫn nói bài đăng có 6 trạng thái nhưng không liệt kê (5-1). Chức năng 7-2 nêu 4 trạng thái: đã hẹn, chờ duyệt, đã đăng, lỗi. Ghép mô tả các chức năng và các 確認 của v2 thì ra 8 trạng thái. So với v1, bỏ "Hết hạn chưa duyệt" và "Bỏ qua vì đang dừng": cả hai nay đều thành "Đã hủy". Những trạng thái không nằm trong 4 trạng thái của 7-2 được ghi ⚠.

```mermaid
stateDiagram-v2
  state "Bản nháp ⚠" as Draft
  state "Bị chặn vì từ cấm ⚠" as Blocked
  state "Chờ duyệt" as Pending
  state "Bị trả lại ⚠" as Rejected
  state "Đã hẹn giờ" as Scheduled
  state "Đã đăng" as Posted
  state "Lỗi" as Failed
  state "Đã hủy ⚠" as Cancelled
  [*] --> Draft : AI tạo bản nháp
  Draft --> Draft : Tài năng nhờ AI viết lại
  Draft --> Blocked : 採用, có từ cấm
  Draft --> Pending : 採用 và gửi duyệt
  Draft --> Scheduled : 採用, không gửi duyệt
  Draft --> [*] : ⚠ Không 採用 trong ngày
  Blocked --> Scheduled : Quản lý sửa xong (⚠ ai hẹn giờ)
  Pending --> Scheduled : Quản lý đầu tiên bấm duyệt (確認34)
  Pending --> Rejected : Quản lý trả lại, có lý do
  Pending --> Cancelled : Đến giờ đăng chưa duyệt (確認36)
  Rejected --> Pending : Tài năng sửa rồi gửi lại (確認35)
  Scheduled --> Posted : Đến giờ, đăng thành công
  Scheduled --> Failed : Đến giờ, đăng lỗi
  Scheduled --> Cancelled : Quản lý hủy, dừng đăng tự động, hoặc tài năng 退会
  Cancelled --> Draft : Tài năng 採用 lại (確認36)
  Failed --> Scheduled : ⚠ Đặt lịch lại (8-5)
  Posted --> [*]
  Cancelled --> [*]
```

| Từ trạng thái | Sang trạng thái | Điều kiện | Tác nhân | Nguồn [YK2] |
| --- | --- | --- | --- | --- |
| Bản nháp | Bị chặn vì từ cấm | 採用, AI phát hiện từ cấm. Báo quản lý | Tài năng, AI | 6-6 (4-4), UC-05 前提 |
| Bản nháp | Chờ duyệt | 採用, tài năng được cài dùng duyệt bài và chọn gửi duyệt | Tài năng | 6-6 (4-3), 確認33 |
| Bản nháp | Đã hẹn giờ | 採用, có tư liệu, không có từ cấm, không gửi duyệt, đăng tự động đang bật | Tài năng | 6-6 (4-3), 6-10 (7-5) |
| Chờ duyệt | Đã hẹn giờ / Bị trả lại | Quản lý bấm trước thì quyết. Trả lại kèm lý do | Quản lý | 6-9 (7-7), 確認34, 確認35 |
| Chờ duyệt | Đã hủy | Đến giờ đăng chưa duyệt. Hệ thống hủy lịch, báo tài năng và quản lý | Hệ thống | 5-3, 確認36 |
| Bị trả lại | Chờ duyệt | Tài năng đọc lý do, nhờ AI sửa, gửi duyệt lại | Tài năng | 確認35 |
| Đã hẹn giờ | Đã đăng / Lỗi | Kết quả đăng, ghi riêng cho từng mạng | Hệ thống | 6-10 (8-3, 8-5) |
| Đã hẹn giờ | Đã hủy | Quản lý hủy trên màn hình quản trị, dừng đăng tự động (toàn bộ hoặc từng tài năng), hoặc tài năng chuyển sang 退会 (rời đi). Hệ thống hủy bên Upload-Post. Chạy lại đăng tự động cũng không đăng các bài đã hủy | Quản lý, hệ thống | 6-10 (7-2, 7-5), UC-08 前提, UC-13 |
| Đã hủy | Bản nháp | Muốn đăng thì tài năng 採用 lại | Tài năng | 確認36 |

**Luồng chưa rõ:**

- 6 trạng thái chính thức là những trạng thái nào.
- Bài chờ duyệt đã được đặt lịch trên Upload-Post hay chưa. 確認36 nói "hủy lịch", tức là có thể đã đặt lịch.
- Đăng thành công trên một mạng nhưng lỗi trên mạng khác thì cả bài ở trạng thái nào.
- Đặt lịch lại sau khi lỗi: tài năng có được làm không, khi 確認30 đề xuất tài năng không đổi được giờ.

## Workflow 4. Duyệt bài và xử lý từ cấm

Hai nhánh đều bắt đầu khi tài năng bấm 採用. Kiểm tra từ cấm chạy trước, theo danh sách chung do quản lý đăng ký trên màn hình quản trị (UC-02 前提). Duyệt bài chỉ dành cho bài công việc cần khách hàng cho phép (確認33). V2 đề xuất thêm: quản lý bấm trước thì quyết, bài bị trả lại được gửi lại, quá giờ thì hủy lịch.

```mermaid
flowchart TD
  A["Tài năng bấm 採用"] --> B{"AI kiểm tra từ cấm<br/>xét cả ngữ cảnh"}
  B -- "Có từ cấm" --> C["Không đặt lịch<br/>Báo lý do cho tài năng"]
  C --> D["Quản lý nhận thông báo<br/>trên màn hình quản trị"]
  D --> E["Quản lý sửa chú thích"]
  E --> F["⚠ Ai đặt lịch? Tài năng có xác nhận lại không?<br/>Có phải kiểm tra từ cấm lại không?"]
  D -. "Không sửa kịp giờ đăng" .-> G["⚠ Chưa có quy tắc"]
  B -- "Không có" --> H{"Tài năng được cài dùng duyệt bài<br/>và chọn gửi duyệt?"}
  H -- Không --> S["Đã hẹn giờ"]
  H -- Có --> I["Chờ duyệt<br/>báo quản lý của nhóm hoặc quản lý phụ trách<br/>([KS] 確認34)"]
  I --> J{"Quản lý nhận yêu cầu bấm trước thì quyết"}
  J -- "Duyệt" --> S
  J -- "Trả lại, nhập lý do" --> K["Tài năng đọc lý do<br/>tự sửa hoặc nhờ AI sửa bản nháp"]
  K --> I
  I -- "Đến giờ đăng chưa duyệt" --> M["Hủy lịch, báo tài năng và quản lý<br/>muốn đăng thì 採用 lại (確認36)"]
  F --> S
  classDef unclear stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  class F,G unclear
```

| Bước | Tác nhân | Điều kiện | Nguồn [YK2] |
| --- | --- | --- | --- |
| Kiểm tra từ cấm | AI | Mọi lần 採用. Xét chú thích và hashtag theo danh sách từ cấm chung. Có thể bỏ sót | 6-6 (4-4), UC-02 前提 |
| Sửa bài dính từ cấm | Quản lý | Sau khi nhận thông báo, sửa trên màn hình quản trị | 5-3, UC-05 前提 |
| Gửi duyệt | Tài năng | Chỉ bài công việc cần khách hàng cho phép. AI không tự xác định | 5-3, UC-07 前提, 確認33 |
| Duyệt hoặc trả lại | Quản lý của nhóm (カテゴリー) hoặc quản lý phụ trách; ai bấm trước thì quyết | Trước giờ đăng. Trả lại thì bắt buộc có lý do | 6-9 (7-7), [KS] 確認34, 確認35 |
| Quá giờ chưa duyệt | Hệ thống | Hủy lịch. Tài năng 採用 lại nếu muốn đăng | 5-3, 確認36 |

**Luồng chưa rõ:**

- Sau khi quản lý sửa bài dính từ cấm, ai đặt lịch. Nếu bài đó cũng cần duyệt thì có phải duyệt tiếp không.
- Có nhắc quản lý khi bài chờ duyệt sắp đến giờ không. Thông báo hiện trên màn hình quản trị (確認45); khách muốn thêm email nhưng chưa chốt.
- Yêu cầu duyệt: cách nào (theo nhóm hay theo quản lý phụ trách từng tài năng) và khi chưa có người phụ trách thì gửi ai: chờ Q&A No.6; AMCOLAB đề xuất lấy quản lý phụ trách từng tài năng làm cơ bản (có trong báo giá No.42, 前提条件A9).
- Quản lý có được sửa nội dung khi duyệt, hay chỉ được duyệt hoặc trả lại.
- Gửi lại sau khi bị trả lại có giới hạn số lần không, và có kiểm tra từ cấm lại không.

## Workflow 5. Tạo video

Video có hai nguồn: AI tạo từ ảnh (tính phí ngay từ lần đầu), hoặc tài năng tự làm (miễn phí). Lần tạo video được tính khi tài năng xác nhận giá, kể cả khi tạo lại. Trong lúc AI đang tạo, tài năng có thể đóng ứng dụng, xong thì được báo (UC-06 前提).

```mermaid
flowchart TD
  A{"Tài năng cần video"} -- "AI tạo" --> B["Chọn loại: video ngắn hoặc video trình chiếu ảnh (確認31)<br/>Chọn ảnh gốc"]
  A -- "Tự làm" --> Q["Lưu video vào ứng dụng (確認32)"]
  Q --> R["Mỗi ngày AI dùng một video theo thứ tự lưu<br/>và thêm chú thích, hashtag thành bản nháp"]
  R --> Z["Workflow 2: 採用"]
  B --> C["Hiển thị độ dài dự kiến và đơn giá tham khảo<br/>kèm ghi chú số tiền thực thu có thể khác"]
  C --> D{"Tài năng xác nhận?"}
  D -- Không --> X["Không tạo"]
  D -- Có --> E["Đếm 1 lần tạo video<br/>Gửi yêu cầu tới fal.ai (Kling)"]
  E --> F{"Kết quả"}
  F -- "Lỗi" --> G["Báo lý do<br/>bỏ đếm lần này"]
  F -- "Xong" --> H["Báo tài năng"]
  H --> I{"Tài năng xem video"}
  I -- "Dùng" --> J["Gắn nhãn do AI tạo<br/>đưa vào bản nháp"]
  J --> Z
  I -- "Tạo lại" --> C
  I -- "Bỏ" --> K["⚠ Video bị bỏ có được lưu không?"]
  classDef unclear stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  class K unclear
```

**Ai trả phí tạo video:**

- Tài năng: cộng vào hóa đơn tháng (6-3, chức năng 5-4). Đơn giá do アデッソ quyết (UC-06 前提).
- Tài khoản công ty: không thu qua cổng thanh toán. Hệ thống đếm số lần, hiện trên màn hình quản trị, アデッソ quyết toán nội bộ (UC-12 前提).
- Không còn tài năng miễn phí (5-4).

**Luồng chưa rõ:**

- Quy tắc khi video chưa xong trước giờ đăng.
- Video tự làm có thay cho bản nháp từ chủ đề gợi ý không, hay thành thêm một bài trong ngày (v2 cho tạo bao nhiêu bản nháp cũng được).
- Quản lý tạo video thay cho tài năng hay chỉ cho tài khoản công ty (確認27). Nếu thay tài năng thì phí tính vào hóa đơn của ai.
- Vì sao số tiền thực thu có thể khác đơn giá hiển thị (mâu thuẫn M5 ở tab "Quy tắc nghiệp vụ").

## Workflow 6. Thu phí hằng tháng

Hệ thống chỉ tính số tiền và gửi đi. Cổng thanh toán mới là bên thu tiền. Theo v2, mọi tài năng đều trả phí. Chỉ tài khoản công ty không bị thu. Thu lỗi thì hệ thống không tự dừng, quản lý quyết.

```mermaid
flowchart TD
  A["⚠ Ngày chốt sổ (sẽ quyết khi chọn cổng thanh toán)"] --> B{"Loại tài khoản và trạng thái"}
  B -- "Tài khoản công ty" --> X["Không thu<br/>đếm số lần tạo video, hiện trên màn hình quản trị"]
  B -- "Tài năng đã 退会 trong tháng" --> Y["Thu trọn tháng đó (確認50)<br/>từ tháng sau dừng thu"]
  B -- "Tài năng đang dùng" --> C["Tính: phí tháng + số lần tạo video × đơn giá<br/>tháng đầu thu trọn tháng (確認48)"]
  Y --> C
  C --> D["Gửi số tiền cho cổng thanh toán<br/>⚠ cổng có thu được số tiền đổi theo tháng? (確認49)"]
  D --> E{"Kết quả"}
  E -- "Thành công" --> F["Tài năng xem số lần và tổng tiền trong ứng dụng (確認51)<br/>xem lịch sử hóa đơn qua trang cổng thanh toán"]
  E -- "Lỗi" --> G["Báo tài năng và quản lý<br/>không tự dừng sử dụng"]
  G --> H{"Quản lý quyết"}
  H -- "Cho dùng tiếp" --> I["⚠ Có thu lại không? Hạn chót?"]
  H -- "Dừng" --> J["⚠ Dừng bằng cách nào?<br/>chuyển sang 退会 hay trạng thái khác?"]
  classDef unclear stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  class A,D,I,J unclear
```

Nguồn: [YK2] UC-11, UC-12 前提, 5-4, 6-3 (chức năng 1-1, 1-2, 5-4), 確認48–51.

**Luồng chưa rõ:** phí tháng đầu tính từ lúc đăng ký thanh toán hay từ lúc huấn luyện viên AI bắt đầu đưa bản nháp (hai mốc này cách nhau vì quản lý còn phải nhập hồ sơ). Dùng lại sau 退会 thì thu phí thế nào.

## Workflow 7. Trạng thái tài năng

Tài năng có 3 trạng thái (利用前, 利用中, 利用終了). Quản lý đổi trạng thái, và mỗi lần đổi đều phải qua màn hình xác nhận. V2 bỏ phân loại trả phí / miễn phí. Thay vào đó có hai thuộc tính riêng, không phải trạng thái: loại tài khoản (tài năng hoặc tài khoản công ty, không đổi được), và cờ dừng đăng tự động của từng tài năng.

```mermaid
stateDiagram-v2
  state "⚠ Đơn chờ duyệt" as Applied
  state "⚠ Bị từ chối" as Rejected
  state "利用前 – trước khi dùng" as Before
  state "利用中 – đang dùng" as Active
  state "利用終了 – đã kết thúc (UC-13 gọi là 退会)" as Ended
  [*] --> Applied : Tài năng gửi đơn trên ứng dụng
  Applied --> Before : Quản lý duyệt
  Applied --> Rejected : Quản lý từ chối
  [*] --> Before : Quản lý tạo tài khoản công ty
  Before --> Active : ⚠ Ai chuyển, lúc nào?
  Active --> Ended : Tài năng xin ngừng, quản lý chuyển
  Before --> Ended : ⚠ Có được không?
  note right of Ended
    Dừng nhắn tin, dừng thu phí, hủy bài đã hẹn,
    chặn đăng nhập (確認54).
    Không quay lại 利用中 được ([KS] 確認56).
    Dữ liệu giữ 6 tháng rồi tự xóa,
    không khôi phục ([KS] 確認55)
  end note
```

| Chuyển | Điều kiện | Tác nhân | Việc hệ thống tự làm | Nguồn [YK2] |
| --- | --- | --- | --- | --- |
| Đơn → 利用前 | Quản lý duyệt, cài có dùng duyệt bài hay không | Quản lý | Gửi email mật khẩu tạm | UC-01, 6-1 (1-4) |
| Đơn → bị từ chối | Quản lý từ chối | Quản lý | Gửi email mẫu, không nêu lý do | UC-01 前提 |
| Tạo tài khoản công ty | — | Quản lý | Tạo thư mục OneDrive | UC-01 前提, 6-4 (2-2) |
| 利用前 → 利用中 | ⚠ chưa nêu | ⚠ | — | 6-2 (7-3) |
| 利用中 → 利用終了 | Tài năng xin ngừng với quản lý. Quản lý xác nhận | Quản lý | Dừng nhắn tin, dừng thu phí, hủy bài đã hẹn, chặn đăng nhập | 6-2 (7-3), UC-13, 確認53, 確認54 |
| 利用終了 → 利用中 | **Không cho phép** | — | — | [KS] 確認56 |
| 利用終了 + 6 tháng | Đủ 6 tháng kể từ lúc chuyển sang 利用終了 | Hệ thống | Tự xóa dữ liệu của tài năng; xóa xong không khôi phục. Xóa gì và có cho đăng ký lại trong 6 tháng không: chờ Q&A No.69 (AMCOLAB đề xuất: không cho đăng ký lại bằng email cũ trong 6 tháng; xóa bài đăng, hội thoại, số liệu trong DB, thư mục OneDrive, kết nối mạng xã hội) | [KS] 確認55 |

**Luồng chưa rõ:** đơn chờ duyệt và đơn bị từ chối chưa được [YK2] gọi là trạng thái. Mình vẽ ra vì hệ thống phải lưu đơn. Chưa có bảng chuyển trạng thái đầy đủ (5-1 nói "sẽ viết ở bản cuối"). Chưa có trạng thái tạm khóa, dù thanh toán lỗi có thể cần. Tên 利用終了 và 退会 chưa thống nhất.

## Workflow 8. Nhắc nhở và báo quản lý

Hai loại tình huống được chuyển cho con người: tài năng lâu không đăng bài, và tài năng kể chuyện nghiêm trọng. Thông báo cho quản lý hiện trên màn hình quản trị (確認45; khách muốn thêm email, chưa chốt). Góp ý của quản lý ghi vào chỉ dẫn cho AI để huấn luyện viên AI chuyển lời; tin nhắn trực tiếp từ quản lý tới tài năng trong hệ thống để giai đoạn sau, chỉ liên hệ ngoài hệ thống khi nghiêm trọng hoặc gấp ([KS] 確認43).

```mermaid
flowchart TD
  subgraph N1["Lâu không đăng bài"]
    A["Mỗi ngày đếm số ngày liên tục không đăng<br/>tính cả bài tự đăng ngoài hệ thống nếu Upload-Post đọc được"]
    A --> B{"Đủ ngưỡng thứ nhất?<br/>(3 ngày theo [YK2]; xác nhận lại, [KS] 確認19)"}
    B -- Có --> C["AI nhắn hỏi han tài năng"]
    C --> D{"Đủ ngưỡng thứ hai?<br/>(7 ngày theo [YK2]; xác nhận lại)"}
    A0["Chỉ áp cho 要確認: 自動投稿 không có ngày trống<br/>(ý kiến khách ở [KS] 確認19)"] -.-> A
    D -- Có --> E["Báo quản lý"]
    D -- "Không, đăng lại" --> R["Đặt lại bộ đếm"]
    C2["⚠ Sau khi đủ 3 ngày, AI có nhắn lại mỗi ngày không?"]
    C -.-> C2
  end
  subgraph N2["Chuyện nghiêm trọng"]
    F["Tài năng nhắn về sức khỏe hoặc muốn rời công ty"] --> G["⚠ AI nhận biết (tiêu chí chưa có)"]
    G --> H["Vẫn tiếp tục trò chuyện"]
    G --> I["Báo quản lý (確認17)"]
    G -.-> J["⚠ Có dấu hiệu tự hại hoặc nguy hiểm thì xử lý khẩn cấp ra sao?"]
  end
  E --> K["Quản lý xem thông báo trên màn hình quản trị<br/>xem hồ sơ, hội thoại, số liệu"]
  I --> K
  K --> L1["Góp ý thường: ghi vào chỉ dẫn cho AI<br/>huấn luyện viên AI chuyển lời (確認43)"]
  K --> L2["Nghiêm trọng hoặc gấp: liên hệ trực tiếp<br/>ngoài hệ thống"]
  L1 --> L["Đánh dấu 対応済み (đã xử lý)<br/>thông báo rời khỏi danh sách (確認46)"]
  L2 --> L
  K -.-> M["⚠ Quản lý biết có thông báo bằng cách nào<br/>khi không mở màn hình quản trị?"]
  classDef unclear stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  class C2,G,J,M unclear
```

Nguồn: [YK2] UC-04, UC-10, 5-2, 6-5 (chức năng 3-3, 3-9), 6-12 (chức năng 7-4), 確認17, 45, 46; [KS] 確認19, 43.

**Luồng chưa rõ:** góp ý ghi vào chỉ dẫn cho AI thì đến sáng hôm sau tài năng mới nhận (AI đọc chỉ dẫn mỗi sáng, 7-5). Có cần chuyển lời ngay trong ngày không?

## Workflow 9. Xử lý buổi sáng và số liệu

Số liệu phải được lấy về và ghi vào OneDrive trước khi AI đọc. Nếu sai thứ tự, nhận xét buổi sáng sẽ dùng số liệu cũ. Tài liệu chưa quy định thứ tự và giờ chạy. V2 nói giờ nhắn tin sáng (mặc định trong khoảng 8 giờ) có gửi cùng lúc cho mọi người hay không sẽ quyết sau khi thử tải (確認18).

```mermaid
sequenceDiagram
  autonumber
  participant HT as Hệ thống (xử lý tự động)
  participant UP as Upload-Post
  participant OD as OneDrive
  participant AI as OpenAI
  participant TN as Tài năng
  Note over HT: ⚠ Giờ bắt đầu và thứ tự chưa có
  HT->>UP: Lấy số liệu bài đăng và số người theo dõi (mỗi ngày 1 lần)
  UP-->>HT: Số liệu (trong phạm vi Upload-Post lấy được)
  alt Lấy lỗi
    HT->>HT: Lấy lại ở lần sau
  end
  HT->>OD: Ghi số liệu vào thư mục tài năng
  HT->>OD: Đọc thư mục tài năng, thư mục chung, file bộ nhớ
  HT->>AI: Gửi ngữ cảnh: hồ sơ, mục tiêu và チャレンジ, chỉ dẫn, số liệu, hội thoại
  Note over AI: Tìm tin tức trong ngày (確認16, nguồn chưa có)
  AI-->>HT: Nhận xét hôm qua, 3 chủ đề gợi ý, tiến độ チャレンジ, giờ đăng đề xuất
  HT->>TN: Tin nhắn sáng và thông báo đẩy (kể cả cuối tuần, ngày lễ – 確認21)
  Note over HT,TN: ⚠ Chưa xong trước giờ nhắn thì sao? Dịch vụ ngoài lỗi thì sao?
  AI->>OD: Ghi thêm điều đã hiểu về tài năng (sau khi trò chuyện)
```

Nguồn: [YK2] 6-4 (chức năng 2-1), 6-5 (3-1, 3-2, 3-6), 6-11 (8-1, 8-7, 8-8), 9-2, UC-04, UC-09 前提, 確認14, 16, 18, 21.

**Luồng chưa rõ:** quy mô mới là khoảng 30 người lúc đầu, thêm 10 người mỗi tháng, sớm lên khoảng 100 (2-2). Chưa rõ xử lý tuần tự hay song song, cần bao lâu, và có bị giới hạn tốc độ của OneDrive và OpenAI không. Quản lý và AI cùng ghi một file thì có thể ghi đè nhau.

## Workflow 10. Kết nối mạng xã hội

Mỗi mạng xã hội của tài năng có trạng thái kết nối riêng, hiển thị trên ứng dụng và màn hình quản trị. Tài năng tự kết nối (確認9), mỗi mạng một tài khoản (確認10), và không bắt buộc kết nối đủ 3 mạng (確認11). Mạng chưa kết nối hoặc mất kết nối thì bài sẽ bỏ qua mạng đó.

```mermaid
stateDiagram-v2
  state "Chưa kết nối" as NotLinked
  state "Đang có đường dẫn kết nối (hạn 48 giờ)" as LinkIssued
  state "Đã kết nối" as Linked
  state "Mất kết nối" as Lost
  [*] --> NotLinked : ⚠ Hệ thống đăng ký tài năng với Upload-Post (lúc nào?)
  NotLinked --> LinkIssued : Tài năng bấm kết nối
  LinkIssued --> Linked : Tài năng đăng nhập mạng xã hội (Instagram phải là tài khoản doanh nghiệp hoặc nhà sáng tạo)
  LinkIssued --> NotLinked : Hết hạn, tạo lại trong ứng dụng
  Linked --> Lost : Kết nối bị mất, báo tài năng và hiện trên màn hình quản trị
  Lost --> LinkIssued : Tài năng kết nối lại
  Linked --> NotLinked : ⚠ Tài năng tự ngắt? Tài năng kết thúc sử dụng?
```

Nguồn: [YK2] UC-03 前提, 6-10 (chức năng 8-2, 8-3, 8-6), 確認9, 10, 11.

**Luồng chưa rõ:** thời điểm đăng ký tài năng với Upload-Post (8-2 còn ghi theo luồng cũ). Tài năng kết thúc sử dụng thì có ngắt kết nối và xóa khỏi Upload-Post không (Upload-Post tính phí theo số tài năng đã đăng ký). Ai kết nối cho tài khoản công ty. Kiểm tra loại tài khoản Instagram ở bước nào.

## Workflow 11. Chỉ dẫn cho AI

Quản lý chỉ dẫn cho huấn luyện viên AI qua màn hình "AIへの指示" (chỉ dẫn cho AI; M-11 thiết kế khách = M-14, M-15 [AG]), qua ChatGPT project (MCP) và file OneDrive (UC-02 前提). Màn hình này **làm** theo bảng xác nhận 17/11 (CR-18; [KS] 確認6, 7, 8). Cách làm chỉ dẫn theo nhóm do FutureCore thiết kế ([KS] 確認6). Chức năng chưa có mã ở mục 6 của [YK2]. Ngoài ra [KS] 確認8 ghi cần **một màn riêng để nhập thông tin tài năng cho AI**; màn đó là gì đang hỏi ở Q&A No.74 (AMCOLAB đề xuất đợt 1 giữ cách nhập qua ChatGPT).

```mermaid
flowchart TD
  A["Quản lý mở màn hình chỉ dẫn cho AI"] --> B{"Chọn phạm vi"}
  B -- "Toàn bộ" --> C
  B -- "Nhóm tài năng (確認47)" --> C
  B -- "Một tài năng" --> C
  C["Viết chỉ dẫn<br/>không có nút mẫu câu 「書き出しの部品」 ([KS] 確認8)"] --> D["Bấm 「試してみる」 (chạy thử; khách muốn ghi là 「確認」, [KS] 確認7) với một tài năng<br/>xem trước lời nhắn và bản nháp (確認7)"]
  D --> E{"Ổn không?"}
  E -- "Chưa" --> C
  E -- "Ổn" --> F["Bấm 「保存」 (khách muốn ghi là 「指示」). Giữ lịch sử, quay lại bản cũ được"]
  F --> G["Sáng hôm sau AI dùng chỉ dẫn<br/>ưu tiên: tài năng, rồi nhóm, rồi toàn bộ<br/>luôn kiểm tra từ cấm (確認6)"]
  B -.-> U["⚠ Cách làm chỉ dẫn theo nhóm: FutureCore thiết kế ([KS] 確認6)"]
  G -.-> V["⚠ Quan hệ với ChatGPT project và file OneDrive:<br/>nguồn nào được ưu tiên?"]
  classDef unclear stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  class U,V unclear
```

**Luồng chưa rõ:**

- Chỉ dẫn trên màn hình này và chỉ dẫn trong ChatGPT, OneDrive cùng tồn tại thì nguồn nào được ưu tiên.
- Góp ý của quản lý cho tài năng cũng đi qua đây (確認43). Vậy có cần lần chạy ngay, không chờ sáng hôm sau không.

## Tổng hợp các luồng chưa rõ

Có 16 luồng chưa rõ, xếp theo mức ảnh hưởng (luồng 16 thêm theo bảng xác nhận 17/11). So với bản theo v1, v2 đã làm rõ 4 luồng: hủy bài (hủy từ màn hình quản trị), giới hạn số bài (đã bỏ con số), tài năng miễn phí (đã bỏ), và bước kiểm tra huấn luyện viên AI (đã bỏ). Duyệt bài, gửi lại và quá giờ đã có đề xuất nhưng còn chờ khách trả lời. Nhóm **Cao** làm sơ đồ trạng thái hoặc luồng cốt lõi chưa chốt được, nên cần hỏi khách trước khi thiết kế dữ liệu.

| STT | Luồng chưa rõ | Workflow | Mức ảnh hưởng | Nguồn [YK2] |
| --- | --- | --- | --- | --- |
| 1 | Thời điểm đăng ký tài năng với Upload-Post (ảnh hưởng chi phí) | 1, 10 | Cao | 6-10 (8-2), UC-08 前提 |
| 2 | Đồng ý về dữ liệu và đồng ý của phụ huynh với người ngoài công ty tự đăng ký | 1 | Cao (pháp lý) | 2-3, 10-3, 確認1 |
| 3 | 6 trạng thái chính thức của bài đăng. Bài chờ duyệt đã đặt lịch trên Upload-Post chưa | 3 | Cao | 5-1, 確認36 |
| 4 | Đặt lịch lại sau khi đăng lỗi, khi tài năng không đổi được giờ. Trạng thái khi chỉ một mạng lỗi | 2, 3 | Cao | 6-10 (8-5), 確認30 |
| 5 | Giờ bắt đầu, thứ tự và cách xử lý khi trễ của xử lý buổi sáng | 2, 9 | Cao | 9-2, 6-4 (2-1), 確認18 |
| 6 | Bài bị chặn vì từ cấm: ai đặt lịch sau khi sửa, tài năng có xác nhận lại không, không sửa kịp thì sao | 3, 4 | Cao | 5-3, 6-6 (4-4) |
| 7 | Ai chuyển tài năng từ 利用前 sang 利用中, và đơn chờ duyệt có phải trạng thái không | 1, 7 | Cao | 6-2 (7-3) |
| 8 | Thanh toán lỗi: có thu lại không, hạn chót, dừng sử dụng bằng cách nào | 6, 7 | Cao | 6-3 (1-1), 確認48 |
| 9 | Màn hình chỉ dẫn cho AI và nhóm tài năng: đã chốt làm ([KS]); còn chưa rõ ảnh hưởng báo giá và cách làm chỉ dẫn theo nhóm | 11 | Trung bình (chi phí) | [KS] 確認6, 7, 8, 47 |
| 10 | Khoảng trống giữa thanh toán và lúc quản lý nhập hồ sơ. Phí tháng đầu tính từ lúc nào | 1, 6 | Trung bình | UC-01 前提, 確認48 |
| 11 | Tài khoản công ty đăng bài từ ứng dụng hay từ màn hình quản trị, có duyệt không | 2 | Trung bình | UC-12, 6-10 (9-1), 7-4, 確認52 |
| 12 | Tiêu chí nhận biết chuyện nghiêm trọng và cách xử lý khẩn cấp | 8 | Trung bình (nhưng rủi ro về an toàn con người cao) | 6-5 (3-3), 確認17 |
| 13 | Quản lý biết có thông báo bằng cách nào khi không mở màn hình quản trị | 4, 8 | Trung bình | 6-12 (7-4), 確認45 |
| 14 | Đơn bị từ chối: giữ bao lâu, đăng ký lại được không, chặn đăng ký rác | 1 | Trung bình | UC-01, 6-4 (2-2) |
| 15 | Bản nháp không 採用 trong ngày, giờ đăng khi có nhiều bài, video tự làm so với bản nháp từ chủ đề, video bị bỏ | 2, 5 | Thấp | 5-3, 6-7 (6-4), 6-8 (5-3) |
| 16 | 自動投稿: duyệt, từ cấm, hết tư liệu giữa khoảng, hết khoảng; 要確認 không gửi ảnh trong ngày | 2 | Cao | [KS] 確認25, 26 |
