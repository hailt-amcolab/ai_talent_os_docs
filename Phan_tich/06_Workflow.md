# Workflow chính của hệ thống

Có 11 workflow chính, dựng lại từ 13 tình huống sử dụng (UC-01 đến UC-13) ở mục 4 và các chức năng ở mục 6 của [YK2]. Workflow 2 (đăng bài hằng ngày) là luồng cốt lõi, các workflow khác nối vào nó. Tab này đã viết lại theo bản yêu cầu v2. Số 確認 (mục cần xác nhận) theo đánh số của v2.

**Cách đọc sơ đồ:**

- [YK2] = AI育成OS_概要要件定義書_v2.docx. "前提" (tiền đề) là phần tiền đề mà v2 thêm vào cuối mỗi UC.
- Sơ đồ luồng (flowchart) chia theo tác nhân. Sơ đồ trạng thái (state diagram) ghi điều kiện chuyển trên mũi tên.
- **Ô viền đứt nét màu cam và ký hiệu ⚠** là bước hoặc nhánh tài liệu chưa nói rõ. Mình vẽ ra để thấy chỗ hổng, không phải đề xuất cách làm.
- Bước dựa trên một 確認 là đề xuất của bên phát triển và đang chờ khách trả lời. Sơ đồ vẫn vẽ bước đó, kèm số 確認.

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
| 11 | Chỉ dẫn cho AI (đang hỏi khách) | Quản lý, hệ thống | UC-02 前提, 確認6, 7, 8 |

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

Mỗi ngày đi theo một vòng: tin nhắn buổi sáng, chọn chủ đề, viết bản nháp, gửi tư liệu, 採用 (chấp nhận), đặt lịch, đăng bài, sáng hôm sau nhận xét. Bài chỉ được đặt lịch khi đủ ba điều kiện: đã 採用, có tư liệu, và việc đăng tự động (toàn bộ và của tài năng đó) đang bật. Theo v2, tài năng yêu cầu bao nhiêu bản nháp thì AI tạo bấy nhiêu (5-3).

```mermaid
flowchart TD
  S0["⚠ Xử lý buổi sáng – Workflow 9<br/>giờ bắt đầu chưa có"] --> S1["AI: tin nhắn buổi sáng (mặc định 8:00)<br/>kết quả hôm qua, 3 chủ đề gợi ý,<br/>tiến độ チャレンジ nếu có"]
  S1 --> S2{"Tài năng phản hồi?"}
  S2 -- "Chọn chủ đề hoặc nói chủ đề muốn đăng" --> S3["AI viết bản nháp<br/>chú thích, hashtag, hướng dẫn chụp, kịch bản"]
  S2 -- "Không phản hồi" --> X1["Không đăng hôm nay<br/>cộng số ngày không đăng – Workflow 8"]
  S3 --> S4["Tài năng nhờ AI viết lại<br/>không tự sửa, không giới hạn số lần (確認28, 29)"]
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
  S18 --> S1
  classDef unclear stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  class S0,S13,X4 unclear
```

**Điều kiện ở các điểm rẽ nhánh:**

- Huấn luyện viên AI chỉ đưa bản nháp khi quản lý đã nhập hồ sơ tài năng (UC-01 前提).
- 採用 cần có ảnh hoặc video (6-6, chức năng 4-3). Không có tư liệu thì không đăng (確認26).
- Kiểm tra từ cấm chạy khi bấm 採用 (6-6, chức năng 4-4).
- Chỉ tài năng được cài "dùng duyệt bài" mới thấy lựa chọn gửi duyệt (6-9, chức năng 7-7).
- Đăng tự động bị dừng (toàn bộ hoặc riêng tài năng) thì không đặt lịch mới, và các bài đã đặt lịch bị hủy (6-10, chức năng 7-5).
- Mạng chưa kết nối thì bỏ qua (6-10, chức năng 8-3, 確認11).
- Bài tài năng tự đăng ngoài hệ thống vẫn tính là có đăng nếu Upload-Post đọc được (UC-09).

**Luồng chưa rõ:**

- Xử lý buổi sáng chưa có giờ bắt đầu. Giờ nhắn tin cho mọi người cùng lúc hay không sẽ quyết sau khi thử tải (確認18).
- Biện pháp chống khóa tài khoản chưa có (8-4). Con số 1 ảnh + 1 video mỗi ngày đã bị bỏ (確認37).
- Đăng lỗi thì 8-5 cho "tài năng hoặc quản lý đặt lịch lại", nhưng 確認30 đề xuất tài năng không đổi được giờ đăng. Chỉ một mạng lỗi thì có đăng lại riêng mạng đó không?
- Tài năng 採用 sau giờ đăng dự kiến thì bài đăng lúc nào.
- Nhiều bản nháp được 採用 trong một ngày thì mỗi bài đăng giờ nào.
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
  H -- Có --> I["Chờ duyệt<br/>báo mọi quản lý"]
  I --> J{"Quản lý bấm trước thì quyết (確認34)"}
  J -- "Duyệt" --> S
  J -- "Trả lại, nhập lý do" --> K["Tài năng đọc lý do<br/>nhờ AI sửa bản nháp"]
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
| Duyệt hoặc trả lại | Quản lý bấm trước | Trước giờ đăng. Trả lại thì bắt buộc có lý do | 6-9 (7-7), 確認34, 確認35 |
| Quá giờ chưa duyệt | Hệ thống | Hủy lịch. Tài năng 採用 lại nếu muốn đăng | 5-3, 確認36 |

**Luồng chưa rõ:**

- Sau khi quản lý sửa bài dính từ cấm, ai đặt lịch. Nếu bài đó cũng cần duyệt thì có phải duyệt tiếp không.
- Có nhắc quản lý khi bài chờ duyệt sắp đến giờ không. Thông báo chỉ hiện trên màn hình quản trị (確認45).
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
  Ended --> Active : Quản lý cho dùng lại (確認56)
  Before --> Ended : ⚠ Có được không?
  note right of Ended
    Dừng nhắn tin, dừng thu phí, hủy bài đã hẹn,
    chặn đăng nhập (確認54).
    Thời gian giữ dữ liệu: đang hỏi khách (確認55)
  end note
```

| Chuyển | Điều kiện | Tác nhân | Việc hệ thống tự làm | Nguồn [YK2] |
| --- | --- | --- | --- | --- |
| Đơn → 利用前 | Quản lý duyệt, cài có dùng duyệt bài hay không | Quản lý | Gửi email mật khẩu tạm | UC-01, 6-1 (1-4) |
| Đơn → bị từ chối | Quản lý từ chối | Quản lý | Gửi email mẫu, không nêu lý do | UC-01 前提 |
| Tạo tài khoản công ty | — | Quản lý | Tạo thư mục OneDrive | UC-01 前提, 6-4 (2-2) |
| 利用前 → 利用中 | ⚠ chưa nêu | ⚠ | — | 6-2 (7-3) |
| 利用中 → 利用終了 | Tài năng xin ngừng với quản lý. Quản lý xác nhận | Quản lý | Dừng nhắn tin, dừng thu phí, hủy bài đã hẹn, chặn đăng nhập | 6-2 (7-3), UC-13, 確認53, 確認54 |
| 利用終了 → 利用中 | Quản lý xác nhận | Quản lý | ⚠ Có thu phí lại, bật lại nhắn tin, cần kết nối lại mạng xã hội không? | 6-2 (7-3), 確認56 |

**Luồng chưa rõ:** đơn chờ duyệt và đơn bị từ chối chưa được [YK2] gọi là trạng thái. Mình vẽ ra vì hệ thống phải lưu đơn. Chưa có bảng chuyển trạng thái đầy đủ (5-1 nói "sẽ viết ở bản cuối"). Chưa có trạng thái tạm khóa, dù thanh toán lỗi có thể cần. Tên 利用終了 và 退会 chưa thống nhất.

## Workflow 8. Nhắc nhở và báo quản lý

Hai loại tình huống được chuyển cho con người: tài năng lâu không đăng bài, và tài năng kể chuyện nghiêm trọng. Thông báo cho quản lý chỉ hiện trên màn hình quản trị (確認45). V2 đổi cách góp ý: quản lý ghi vào chỉ dẫn cho AI để huấn luyện viên AI chuyển lời, chỉ liên hệ trực tiếp khi nghiêm trọng hoặc gấp (確認43).

```mermaid
flowchart TD
  subgraph N1["Lâu không đăng bài"]
    A["Mỗi ngày đếm số ngày liên tục không đăng<br/>tính cả bài tự đăng ngoài hệ thống nếu Upload-Post đọc được"]
    A --> B{"Đủ ngưỡng thứ nhất?<br/>(mặc định 3 ngày, 確認19)"}
    B -- Có --> C["AI nhắn hỏi han tài năng"]
    C --> D{"Đủ ngưỡng thứ hai?<br/>(mặc định 7 ngày)"}
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

Nguồn: [YK2] UC-04, UC-10, 5-2, 6-5 (chức năng 3-3, 3-9), 6-12 (chức năng 7-4), 確認17, 19, 43, 45, 46.

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

## Workflow 11. Chỉ dẫn cho AI (đề xuất, đang hỏi khách)

Hiện tại quản lý chỉ dẫn cho huấn luyện viên AI qua ChatGPT project và file OneDrive (UC-02 前提). Bản thiết kế của khách có thêm màn hình "AIへの指示" (chỉ dẫn cho AI). [YK2] mô tả cách hiểu của bên phát triển trong 確認6, 7, 8 và ghi rõ phần theo nhóm tài năng "cần kiểm chứng kỹ thuật". Cả luồng này chưa được chốt và chưa có mã chức năng ở mục 6.

```mermaid
flowchart TD
  A["Quản lý mở màn hình chỉ dẫn cho AI"] --> B{"Chọn phạm vi"}
  B -- "Toàn bộ" --> C
  B -- "Nhóm tài năng (確認47)" --> C
  B -- "Một tài năng" --> C
  C["Viết chỉ dẫn<br/>có thể chèn mẫu câu: giọng điệu, chủ đề,<br/>giờ đăng, điều cần tránh, số lần nhắn (確認8)"] --> D["Bấm 試してみる (chạy thử) với một tài năng<br/>xem trước lời nhắn và bản nháp (確認7)"]
  D --> E{"Ổn không?"}
  E -- "Chưa" --> C
  E -- "Ổn" --> F["Lưu. Giữ lịch sử, quay lại bản cũ được"]
  F --> G["Sáng hôm sau AI dùng chỉ dẫn<br/>ưu tiên: tài năng, rồi nhóm, rồi toàn bộ<br/>luôn kiểm tra từ cấm (確認6)"]
  B -.-> U["⚠ Chỉ dẫn theo nhóm cần kiểm chứng kỹ thuật"]
  G -.-> V["⚠ Quan hệ với ChatGPT project và file OneDrive:<br/>nguồn nào được ưu tiên?"]
  classDef unclear stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  class U,V unclear
```

**Luồng chưa rõ:**

- Chức năng này có nằm trong phạm vi không. Nó chưa có mã chức năng hay mức ưu tiên ở mục 6.
- Chỉ dẫn trên màn hình này và chỉ dẫn trong ChatGPT, OneDrive cùng tồn tại thì nguồn nào được ưu tiên.
- Mẫu câu có cố định không, hay quản lý tự thêm được (確認8).
- Góp ý của quản lý cho tài năng cũng đi qua đây (確認43). Vậy có cần lần chạy ngay, không chờ sáng hôm sau không.

## Tổng hợp các luồng chưa rõ

Có 15 luồng chưa rõ, xếp theo mức ảnh hưởng. So với bản theo v1, v2 đã làm rõ 4 luồng: hủy bài (hủy từ màn hình quản trị), giới hạn số bài (đã bỏ con số), tài năng miễn phí (đã bỏ), và bước kiểm tra huấn luyện viên AI (đã bỏ). Duyệt bài, gửi lại và quá giờ đã có đề xuất nhưng còn chờ khách trả lời. Nhóm **Cao** làm sơ đồ trạng thái hoặc luồng cốt lõi chưa chốt được, nên cần hỏi khách trước khi thiết kế dữ liệu.

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
| 9 | Màn hình chỉ dẫn cho AI và nhóm tài năng có trong phạm vi không | 11 | Cao (phạm vi, chi phí) | 確認6, 7, 8, 47 |
| 10 | Khoảng trống giữa thanh toán và lúc quản lý nhập hồ sơ. Phí tháng đầu tính từ lúc nào | 1, 6 | Trung bình | UC-01 前提, 確認48 |
| 11 | Tài khoản công ty đăng bài từ ứng dụng hay từ màn hình quản trị, có duyệt không | 2 | Trung bình | UC-12, 6-10 (9-1), 7-4, 確認52 |
| 12 | Tiêu chí nhận biết chuyện nghiêm trọng và cách xử lý khẩn cấp | 8 | Trung bình (nhưng rủi ro về an toàn con người cao) | 6-5 (3-3), 確認17 |
| 13 | Quản lý biết có thông báo bằng cách nào khi không mở màn hình quản trị | 4, 8 | Trung bình | 6-12 (7-4), 確認45 |
| 14 | Đơn bị từ chối: giữ bao lâu, đăng ký lại được không, chặn đăng ký rác | 1 | Trung bình | UC-01, 6-4 (2-2) |
| 15 | Bản nháp không 採用 trong ngày, giờ đăng khi có nhiều bài, video tự làm so với bản nháp từ chủ đề, video bị bỏ | 2, 5 | Thấp | 5-3, 6-7 (6-4), 6-8 (5-3) |
