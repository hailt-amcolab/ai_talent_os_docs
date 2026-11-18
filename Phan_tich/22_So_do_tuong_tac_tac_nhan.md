# Sơ đồ tương tác giữa tài năng, quản lý và AIコーチ

Viết ngày 18/11/2026. Mô tả các tác nhân trao đổi với nhau thế nào trong hệ thống, từ lúc đăng ký tới lúc rời đi. Sơ đồ chỉ ghi việc đã có căn cứ; chỗ chưa rõ ghi **⚠** kèm câu hỏi đang mở, không tự quyết thay khách.

**Nguồn:**
- [YK2] = `AI育成OS_概要要件定義書_v2.docx` (bản định nghĩa yêu cầu v2);
- [KS] = bảng xác nhận yêu cầu, quyết định ngày 17/11/2026 (tệp 21);
- Q&A No.x = `AI-Talent-OS_Q&A表.xlsx` bản 17/11 (tệp 19);
- [AG] = `アプリ画面案_AI育成OS.pdf`, mã màn hình T/M là mã chuẩn (Q&A No.30).

**Thuật ngữ:**
- AIコーチ = huấn luyện viên AI của từng tài năng;
- 要確認 = cách đăng xác nhận từng bài; 自動投稿 = đăng tự động trong một khoảng thời gian;
- 採用 = chấp nhận bản nháp; 退会 = rời đi (trạng thái 利用終了, đã ngừng dùng);
- 利用規約 = điều khoản sử dụng.

---

## 1. Tổng quan

### 1.1. Tác nhân và kênh trao đổi

```mermaid
flowchart LR
  T["Tài năng<br/>ứng dụng PWA trên điện thoại"]
  AI["AIコーチ<br/>(OpenAI, mỗi tài năng một ngữ cảnh)"]
  QL["Quản lý (khoảng 5 người)<br/>màn quản trị web, PC là chính"]
  HT["Hệ thống<br/>API + worker + DB"]
  GPT["ChatGPT (MCP)"]
  OD["OneDrive<br/>thư mục từng tài năng + 共通"]
  UP["Upload-Post<br/>Instagram, TikTok, YouTube"]
  FAL["fal.ai (Kling)<br/>video AI"]
  GMO["Cổng thanh toán<br/>(GMO, dự kiến)"]

  T <-->|"trò chuyện, chủ đề, bản nháp,<br/>sửa chữ, nhờ viết lại"| AI
  T -->|"đơn đăng ký, tư liệu, 採用,<br/>gửi duyệt, cài cách đăng"| HT
  HT -->|"thông báo trong ứng dụng + đẩy"| T
  AI -->|"tin theo khung sáng, trưa, tối<br/>nhắc, chúc mừng, thử thách"| T
  QL -->|"chỉ thị cho AI: toàn bộ / nhóm / tài năng<br/>(M-14, M-15 [AG])"| AI
  AI -->|"chuyện nghiêm trọng, lâu không đăng"| HT
  HT -->|"thông báo trên màn quản trị (M-02)"| QL
  QL -->|"duyệt đơn, duyệt bài, sửa bài dính từ cấm,<br/>đổi trạng thái, dừng đăng tự động, hủy bài"| HT
  QL -->|"nhập hồ sơ bằng trò chuyện"| GPT
  GPT -->|"đề xuất ghi, quản lý xác nhận"| HT
  HT <-->|"tạo thư mục, đọc hồ sơ mỗi sáng,<br/>chép tư liệu, xuất số liệu"| OD
  HT <-->|"hẹn giờ, kết quả, số liệu"| UP
  HT <-->|"tạo video"| FAL
  T -->|"đăng ký thanh toán"| GMO
  GMO -->|"kết quả thu tiền"| HT
  QL -.->|"⚠ tin nhắn trực tiếp tới tài năng:<br/>giai đoạn sau ([KS] 確認43)"| T
  HT -.->|"⚠ email cho quản lý: Q&A No.75"| QL
  QL -.->|"⚠ màn nhập thông tin tài năng<br/>trong ứng dụng: Q&A No.74"| HT
  QL -->|"danh sách từ cấm và cài đặt chung<br/>(M-17 [AG])"| HT
  QL -->|"sửa trực tiếp 共通/*.md,<br/>mục 個別の指示"| OD

  classDef actor fill:#e7f0ff,stroke:#3b6fd8
  classDef ext fill:#f4f4f4,stroke:#999
  class T,QL,AI actor
  class GPT,OD,UP,FAL,GMO ext
  linkStyle 15,16,17 stroke:#d9480f,stroke-dasharray:5 5
```

### 1.2. Bản đồ đầy đủ chức năng và điểm chưa rõ

Mỗi ô là một chức năng, ghi theo mã của [YK2] ch.6 (SCD cùng mã), chia khối theo module EP01–EP10 (tệp 16). Để sơ đồ dễ đọc, **không vẽ các chức năng đăng ký, đăng nhập, đăng xuất**: 1-4 (đăng ký, duyệt đơn, đăng nhập), 1-5 (nhận diện tài năng), 1-6 (đăng nhập hai bước, quyền quản lý). Luồng đăng ký ở mục 2; điểm chưa rõ của phần này (hạn mật khẩu tạm Q&A No.65, khôi phục tài khoản quản lý No.67) ở SCD EP01 và `agent_spec/supabase-db-auth-spec`.

**Chú thích màu:**
- ô **xanh lá**: việc mới theo bảng xác nhận 17/11, chưa có mã chức năng;
- ô **viền đứt màu cam**: điểm chưa rõ, kèm số câu hỏi;
- ô **xám**: đã quyết không làm hoặc để giai đoạn sau.

```mermaid
flowchart TB
  T(["Tài năng<br/>ứng dụng PWA"])
  QL(["Quản lý<br/>màn quản trị web"])
  AI(["AIコーチ"])

  subgraph EP01["EP01 Bắt đầu dùng, trạng thái, nhật ký"]
    F62["6-2 Hướng dẫn lần đầu, kết nối mạng<br/>không bắt buộc đủ 3 mạng"]
    F73["7-3 Đổi trạng thái tài năng<br/>利用終了 không quay lại, xóa sau 6 tháng"]
    F76["7-6 Nhật ký xem thông tin"]
    U01["⚠ Xóa những gì sau 6 tháng,<br/>đăng ký lại trong 6 tháng (No.69)"]
  end

  subgraph EP02["EP02 Thông tin tài năng và nguồn cho AI"]
    F21["2-1 Đọc thông tin trước giờ nhắn"]
    F22["2-2 Tạo thư mục OneDrive"]
    F23["2-3 Nhập thông tin qua ChatGPT (MCP)"]
    F24["2-4 Mục tiêu theo từng mạng, có hạn"]
    F71["7-1 Xem thông tin tài năng, lọc theo nhóm"]
    N01["Nhóm tài năng (カテゴリー), quản lý phụ trách<br/>CR-17, M-13 [AG]"]
    U03["⚠ Phạm vi MCP, gói ChatGPT (No.45)"]
    U04["⚠ Màn nhập thông tin trong ứng dụng (No.74)"]
  end

  subgraph EP03["EP03 AIコーチ"]
    F31["3-1 Hiểu tài năng và thuật toán"]
    F32["3-2 Tự cải thiện, ghi AIメモ.md"]
    F33["3-3 Giới hạn chủ đề, báo chuyện nghiêm trọng"]
    F34["3-4 Trò chuyện, tin theo khung sáng, trưa, tối"]
    F35["3-5 Chi phí AI, không trần"]
    F36["3-6 Nhận xét bài hôm trước, gợi ý"]
    F37["3-7 Báo mốc 25/50/75%, đạt mục tiêu"]
    F38["3-8 Tổng kết tuần (thứ Hai)"]
    F39["3-9 Nhắc lâu không đăng (3 / 7 ngày)"]
    N02["Chỉ thị cho AI: toàn bộ / nhóm / tài năng<br/>CR-18, M-14, M-15 [AG]"]
    N03["Thử thách: AI đề xuất, nhận / từ chối<br/>CR-22"]
    U05["⚠ Giờ và nội dung khung trưa, tối (No.73)<br/>số ngày nhắc (確認19)"]
    U06["⚠ Chuyện riêng (No.76),<br/>tiêu chí chuyện nghiêm trọng (S03-02)"]
    U07["⚠ Thử thách: khái niệm, cách tính đạt (No.72)"]
    U08["⚠ Chỉ thị: hiệu lực, nơi lưu,<br/>ưu tiên với OneDrive / ChatGPT (D9, P-17)"]
  end

  subgraph EP04["EP04 Nội dung bài đăng"]
    F41["4-1 Chủ đề và bản nháp<br/>nhịp đề xuất theo chỉ thị"]
    F42["4-2 Nhờ AI viết lại tối đa 2 lần,<br/>tài năng tự sửa chữ"]
    F43["4-3 採用 (cách đăng 要確認)"]
    F44["4-4 Phát hiện từ cấm, quản lý sửa ở M-11"]
    F66["6-6 Xem trước bài đăng"]
    N04["Cách đăng 自動投稿<br/>chủ đề + tư liệu + khoảng 1–2 tuần"]
    U09["⚠ Chi tiết 自動投稿 (No.70, 71),<br/>lựa chọn 1回の投稿"]
    U10["⚠ 採用 sau giờ đăng (No.56), bản nháp cũ (No.55),<br/>không gửi ảnh trong ngày (確認26)"]
    U11["⚠ Tài năng sửa bài dính từ cấm (No.57)"]
  end

  subgraph EP05["EP05 Tư liệu và video AI"]
    F63["6-3 Gửi ảnh, video<br/>quản lý chỉ cho tài khoản công ty"]
    F64["6-4 Lưu tư liệu: bản tạm → OneDrive"]
    F65["6-5 Nhắc gửi tư liệu"]
    F51["5-1 Tạo video (video ngắn qua fal.ai,<br/>trình chiếu ghép ở máy chủ)"]
    F52["5-2 Định dạng video"]
    F53["5-3 Xem và xử lý video đã tạo"]
    F55["5-5 Ghi rõ video do AI tạo"]
    U12["⚠ Video tự làm thành bản nháp<br/>(CR-23, 確認32)"]
    U13["⚠ Dung lượng OneDrive, xóa tư liệu cũ<br/>(No.8, biên bản việc 9)"]
  end

  subgraph EP06["EP06 Duyệt và đăng lên mạng xã hội"]
    F77["7-7 Duyệt bài công việc<br/>gửi theo nhóm / quản lý phụ trách"]
    F82["8-2 Kết nối Upload-Post<br/>một tài khoản mỗi mạng"]
    F83["8-3 Đăng lên 3 mạng"]
    F84["8-4 Chống bị khóa tài khoản"]
    F85["8-5 Báo khi đăng lỗi"]
    F86["8-6 Báo khi mất kết nối"]
    F72["7-2 Xem và hủy bài đã hẹn"]
    F75["7-5 Dừng đăng tự động<br/>toàn bộ / từng tài năng"]
    F91["9-1 Đăng bằng tài khoản công ty"]
    U14["⚠ Duyệt theo nhóm hay phụ trách (No.6),<br/>gửi lại cùng bài hay bài mới (No.58)"]
    U15["⚠ Đặt lịch lại sau lỗi (No.59),<br/>dừng cả khoảng 自動投稿 (No.77)"]
    U16["⚠ Biện pháp chống khóa,<br/>chi tiết tài khoản công ty (No.66)"]
  end

  subgraph EP07["EP07 Kết quả và phân tích"]
    F87["8-7 Lấy số liệu"]
    F88["8-8 Ghi số liệu vào OneDrive"]
    F310["3-10 Hiển thị số người theo dõi"]
    F67["6-7 Số liệu và mức đạt cho tài năng"]
    F81["8-1 Phân tích giờ đăng<br/>AI chọn giờ theo chỉ thị"]
    F89["8-9 Lấy khung giờ tương tác"]
    U17["⚠ Đếm ngày đăng liên tục (確認22, No.72),<br/>chỉ số lấy được từ Upload-Post (U-07)"]
  end

  subgraph EP08["EP08 Thu phí (đang chặn ghi)"]
    F11["1-1 Thu phí thuê bao tháng<br/>chu kỳ từ ngày đăng ký"]
    F12["1-2 Loại tài khoản"]
    F13["1-3 Đổi loại"]
    F54["5-4 Đếm lần tạo video, thu gộp"]
    U18["⚠ GMO thu số tiền thay đổi (確認49),<br/>ngày đăng ký là ngày nào (No.53), đơn giá (No.2)"]
  end

  subgraph EP09["EP09 Thông báo và nền tảng PWA"]
    F61["6-1 Tin trong ứng dụng, thông báo đẩy"]
    F74["7-4 Danh sách thông báo cho quản lý"]
    F68["6-8 Nền tảng PWA"]
    U19["⚠ Email cho quản lý (No.75),<br/>ô 未対応 (No.76)"]
  end

  subgraph EP10["EP10 Nền tảng chung"]
    C01["C-01 Bộ trạng thái"]
    C02["C-02 Cài đặt chung M-17,<br/>danh sách từ cấm"]
    C03["C-03 Nhật ký thao tác và xử lý"]
    C04["C-04 Xử lý khi dịch vụ ngoài lỗi"]
    C05["C-05 Danh mục thông báo"]
    C06["C-06 Quy tắc chung của màn hình"]
    U20["⚠ Trạng thái bài cho 自動投稿 (No.51)"]
  end

  X1["Giai đoạn sau: tin nhắn trực tiếp<br/>quản lý → tài năng (確認43)"]
  X2["Không làm: hội thoại riêng tư (CR-24),<br/>nhiều tài khoản trên một mạng (CR-20)"]

  T -->|"hướng dẫn lần đầu, kết nối mạng"| EP01
  T <-->|"trò chuyện, nhận tin, thử thách"| EP03
  T -->|"chủ đề, bản nháp, sửa, 採用, cách đăng"| EP04
  T -->|"ảnh, video, tạo video"| EP05
  T -->|"xem số liệu, mức đạt"| EP07
  T -->|"đăng ký thanh toán"| EP08
  EP09 -->|"thông báo trong ứng dụng, đẩy"| T

  QL -->|"đổi trạng thái, xem nhật ký"| EP01
  QL -->|"hồ sơ qua ChatGPT, mục tiêu, nhóm"| EP02
  QL -->|"chỉ thị cho AI, đề xuất thử thách"| EP03
  QL -->|"sửa bài dính từ cấm"| EP04
  QL -->|"gửi tư liệu, tạo video cho tài khoản công ty"| EP05
  QL -->|"duyệt, hủy, dừng, tài khoản công ty"| EP06
  QL -->|"cài đặt chung, danh sách từ cấm"| EP10
  EP09 -->|"thông báo M-02"| QL

  AI -->|"đọc ngữ cảnh mỗi sáng"| EP02
  AI -->|"soạn bài, kiểm tra từ cấm"| EP04
  EP07 -->|"số liệu cho nhận xét hôm sau"| AI

  QL -.-> X1
  X1 -.-> T

  classDef actor fill:#e7f0ff,stroke:#3b6fd8,stroke-width:2px
  classDef newf fill:#e3f6e3,stroke:#2f9e44
  classDef unclear fill:#fff4e6,stroke:#d9480f,stroke-width:2px,stroke-dasharray:5 5
  classDef out fill:#eeeeee,stroke:#999,color:#666
  class T,QL,AI actor
  class N01,N02,N03,N04 newf
  class U01,U03,U04,U05,U06,U07,U08,U09,U10,U11,U12,U13,U14,U15,U16,U17,U18,U19,U20 unclear
  class X1,X2 out
```

Ghi chú: đường "quản lý → tài năng" của tin nhắn trực tiếp vẽ nét đứt vì để giai đoạn sau. Luồng chi tiết từng bước nằm ở mục 2–6.

**Ai làm gì (theo [YK2] §3, [KS]):**
- **Tài năng:** chỉ thấy dữ liệu của mình, không vào màn quản trị.
- **Quản lý:** một loại quyền, thấy mọi tài năng và toàn bộ hội thoại (Q&A No.7); đăng nhập hai bước.
- **AIコーチ:** chỉ đọc dữ liệu của tài năng đang xử lý cùng thư mục 共通 (dùng chung); không tự quyết duyệt bài.

---

## 2. Đăng ký và bắt đầu dùng

```mermaid
sequenceDiagram
  autonumber
  actor T as Tài năng
  participant HT as Hệ thống
  participant AI as AIコーチ
  actor QL as Quản lý
  participant GPT as ChatGPT (MCP)
  participant OD as OneDrive
  participant UP as Upload-Post
  participant GMO as Cổng thanh toán

  T->>HT: Gửi đơn: tên, email, ngày sinh, đồng ý 利用規約
  HT->>QL: Thông báo 利用の申し込み (mọi quản lý)
  QL->>HT: Xem đơn (nhãn dưới 18 tuổi, [KS] 確認2), cài có dùng duyệt bài không
  alt Duyệt
    HT->>T: Email mật khẩu tạm (hạn: Q&A No.65)
  else Từ chối
    HT->>T: Email mẫu, không nêu lý do
  end
  T->>HT: Đăng nhập, đổi mật khẩu
  HT->>T: Lần đầu mở: báo "quản lý xem được hội thoại", tài năng bấm xác nhận (確認13)
  Note over T,HT: Hướng dẫn lần đầu: thêm vào màn hình chính, cho phép thông báo, thanh toán, kết nối mạng xã hội. Không bắt buộc đủ 3 mạng hay cho phép thông báo ([KS] 確認11, 12)
  T->>GMO: Đăng ký thanh toán (cước nhà mạng hoặc thẻ)
  GMO-->>HT: Kết quả đăng ký
  rect rgba(255, 180, 120, 0.25)
    Note over HT,GMO: ⚠ Thu phí (EP08) đang chặn ghi. Chu kỳ một tháng từ ngày đăng ký ([KS] 確認48), "ngày đăng ký" là ngày đăng ký thanh toán? (Q&A No.53). GMO thu được số tiền thay đổi không: chờ (確認49)
  end
  HT->>OD: Tạo thư mục tài năng (tài khoản công ty: khi quản lý tạo)
  T->>UP: Kết nối Instagram, TikTok, YouTube (mỗi mạng một tài khoản, [KS] 確認10)
  QL->>GPT: Tạo project cho tài năng, gắn thư mục, nhập hồ sơ bằng trò chuyện
  GPT->>HT: Đề xuất ghi hồ sơ
  HT->>QL: Xin xác nhận nội dung và đích
  QL->>HT: Xác nhận
  HT->>OD: Ghi プロフィール.md
  rect rgba(255, 180, 120, 0.25)
    Note over QL,GPT: ⚠ Phạm vi MCP và gói ChatGPT của khách (Q&A No.45). Màn nhập thông tin trong ứng dụng là gì (Q&A No.74, đề xuất đợt 1 chưa làm)
  end
  QL->>HT: Mục tiêu theo từng mạng (mặc định 1 vạn, có hạn), nhóm tài năng, quản lý phụ trách
  rect rgba(255, 180, 120, 0.25)
    Note over QL,HT: ⚠ Yêu cầu duyệt gửi theo nhóm hay theo quản lý phụ trách, chưa có người phụ trách thì gửi ai (Q&A No.6)
  end
  QL->>AI: Chỉ thị cho AI: toàn bộ / nhóm / tài năng, bấm 「確認」 để thử, 「指示」 để lưu ([KS] 確認6, 7)
  Note over AI: Chưa có hồ sơ thì không đưa bản nháp (UC-01 前提)
  T->>HT: Chọn cách đăng: 要確認 hay 自動投稿 ([KS] 確認19)
```

---

## 3. Vòng hằng ngày: hai cách đăng

```mermaid
sequenceDiagram
  autonumber
  actor T as Tài năng
  participant HT as Hệ thống
  participant AI as AIコーチ
  participant OD as OneDrive
  participant FAL as fal.ai

  HT->>OD: Trước giờ nhắn: đọc hồ sơ, AIメモ.md, 共通, số liệu hôm qua
  HT->>AI: Bản chụp ngữ cảnh của tài năng
  alt Cách đăng 要確認 (xác nhận từng bài)
    AI->>T: Khung sáng (mặc định 8:00): kết quả hôm qua, 3 chủ đề gợi ý, nhiệm vụ, tiến độ thử thách
    rect rgba(255, 180, 120, 0.25)
      Note over T,AI: ⚠ Nhịp đề xuất hằng ngày / vài ngày / mỗi tuần theo chỉ thị AI ([KS] 確認14), cách làm FutureCore đề xuất. Giờ và nội dung khung trưa, tối: Q&A No.73 (đề xuất 12 giờ, 20 giờ)
    end
    T->>AI: Chọn chủ đề hoặc tự nói chủ đề
    AI->>T: Bản nháp: chú thích, hashtag, hướng dẫn chụp (kịch bản nếu là video)
    opt Chưa hợp
      T->>AI: Nhờ viết lại (tối đa 2 lần, [KS] 確認29)
      T->>T: Hoặc tự sửa chữ ([KS] 確認28)
    end
    T->>HT: Gửi ảnh, video (tải lên bản tạm, worker chép sang OneDrive)
    opt Cần video AI
      T->>HT: Yêu cầu tạo video (video ngắn hoặc trình chiếu ảnh)
      HT->>FAL: Tạo video ngắn (trình chiếu ảnh ghép ở máy chủ)
      FAL-->>HT: Video xong, đếm một lượt tính phí
    end
    HT->>T: Nhắc gửi ảnh nếu chưa có ([YK2]: 2 giờ trước giờ đăng, Q&A No.73 đề xuất khung trưa)
    T->>HT: 採用, chọn gửi duyệt nếu được cài (sang mục 4)
    rect rgba(255, 180, 120, 0.25)
      Note over T,HT: ⚠ 2 lần viết lại vẫn không hợp: hôm đó không đăng, trừ khi tự sửa ([KS] 確認29). Không gửi ảnh trong ngày: xác nhận sau ([KS] 確認26). 採用 sau giờ đăng dự kiến (Q&A No.56). Bản nháp không dùng giữ bao lâu (Q&A No.55)
    end
  else Cách đăng 自動投稿 (đăng tự động trong một khoảng)
    T->>HT: Bắt đầu khoảng: chọn chủ đề, tải nhiều tư liệu, đặt thời gian (ví dụ 1–2 tuần)
    loop Mỗi ngày trong khoảng
      AI->>HT: Soạn bài từ tư liệu (AI đọc ảnh để viết chú thích, 確認24)
      HT->>HT: Kiểm tra từ cấm, hẹn giờ (sang mục 4)
    end
    rect rgba(255, 180, 120, 0.25)
      Note over T,AI: ⚠ Q&A No.70: ảnh nào cho bài nào, dừng hoặc đổi giữa khoảng, soạn trước hay từng ngày, hết khoảng thì sao. No.71: lựa chọn "自動投稿 hay 1回の投稿" khi bắt đầu có phải chính ô cài đặt không, bài công việc có qua duyệt không, kiểm từ cấm lúc nào
    end
  end
```

---

## 4. Kiểm tra, duyệt, đăng bài và kết quả

```mermaid
sequenceDiagram
  autonumber
  actor T as Tài năng
  participant HT as Hệ thống
  participant AI as AIコーチ
  actor QL as Quản lý
  participant UP as Upload-Post

  HT->>AI: Kiểm tra từ cấm theo ngữ cảnh (một danh sách chung, khách gửi lúc triển khai)
  alt Dính từ cấm
    HT->>T: Báo lý do và đoạn bị trúng, không hẹn giờ
    HT->>QL: Thông báo phát hiện từ cấm
    QL->>HT: Sửa chữ, hẹn giờ hoặc hủy (màn tối thiểu, CR-06)
    rect rgba(255, 180, 120, 0.25)
      Note over T,QL: ⚠ Tài năng có được tự sửa bài dính từ cấm không (Q&A No.57). Không ai sửa kịp giờ đăng thì sao
    end
  else Bài công việc cần khách hàng cho phép, tài năng chọn gửi duyệt
    HT->>QL: Yêu cầu duyệt tới quản lý của nhóm hoặc quản lý phụ trách ([KS] 確認34)
    alt Duyệt (quản lý bấm trước quyết)
      QL->>HT: Duyệt
    else Trả lại
      QL->>HT: Trả lại kèm lý do (bắt buộc)
      HT->>T: Báo lý do
      T->>HT: Tự sửa hoặc nhờ AI sửa, gửi duyệt lại
      rect rgba(255, 180, 120, 0.25)
        Note over T,QL: ⚠ Gửi lại là cùng bài hay bài mới (Q&A No.58). AI không tự xác định bài công việc (確認33)
      end
    else Tới giờ đăng chưa duyệt
      HT->>T: Hủy lịch, muốn đăng thì 採用 lại
      HT->>QL: Báo đã hủy
    end
  end
  HT->>UP: Hẹn giờ trên các mạng đã kết nối (giờ do AI chọn theo khung giờ アデッソ ghi trong chỉ thị, [KS] 確認30)
  Note over QL,HT: Quản lý dừng đăng tự động toàn bộ hoặc từng tài năng: không hẹn mới, hủy bài đã hẹn (7-5). ⚠ Có dừng cả khoảng 自動投稿 không (Q&A No.77)
  UP->>UP: Đăng lên Instagram, TikTok, YouTube (YouTube chỉ khi có video)
  UP-->>HT: Kết quả từng mạng
  alt Thành công
    AI->>T: Báo đã đăng, số ngày đăng liên tục
    rect rgba(255, 180, 120, 0.25)
      Note over T,AI: ⚠ Cách đếm ngày đăng liên tục: quyết khi vận hành ([KS] 確認22), đề xuất ở Q&A No.72
    end
  else Lỗi ở một hoặc nhiều mạng
    HT->>T: Báo bài đăng lỗi (trong ứng dụng)
    HT->>QL: Cảnh báo trên màn quản trị
    rect rgba(255, 180, 120, 0.25)
      Note over T,QL: ⚠ Không tự đăng lại (CR-15). Đặt lịch lại ai bấm, đăng lại riêng mạng lỗi (Q&A No.59)
    end
  end
  UP-->>HT: Số liệu bài và người theo dõi (lấy về cho hôm sau)
```

---

## 5. Theo dõi, nhắc nhở, thử thách, trò chuyện và rời đi

```mermaid
sequenceDiagram
  autonumber
  actor T as Tài năng
  participant HT as Hệ thống
  participant AI as AIコーチ
  actor QL as Quản lý
  participant GMO as Cổng thanh toán
  participant OD as OneDrive

  par Mục tiêu người theo dõi
    HT->>AI: Số người theo dõi đạt 25%, 50%, 75% mục tiêu (Q&A No.14)
    AI->>T: Chúc mừng, báo phần còn lại tới mục tiêu
    HT->>QL: Đạt mục tiêu: báo cả tài năng và quản lý (Q&A No.42)
  and Lâu không đăng (cách 要確認)
    AI->>T: Đủ 3 ngày không đăng: hỏi han
    HT->>QL: Đủ 7 ngày: thông báo tài năng lâu không đăng
    rect rgba(255, 180, 120, 0.25)
      Note over T,QL: ⚠ Số ngày xác nhận lại ([KS] 確認19). 自動投稿 chỉ nhắc khi đang dừng hoặc hết ảnh (đề xuất Q&A No.73)
    end
  and Tổng kết tuần
    AI->>T: Thứ Hai: tổng kết tuần và tiến độ mục tiêu
  end

  AI->>T: Đề xuất thử thách theo tình hình (người theo dõi đang tăng, đang chững…)
  QL->>AI: Cũng có thể đề xuất thử thách qua chỉ thị cho AI
  alt Tài năng nhận
    T->>AI: Nhận (không cần quản lý duyệt, [KS] 確認5)
  else Tài năng từ chối
    T->>AI: Từ chối, lúc đề xuất lại theo chỉ thị cho AI
  end
  rect rgba(255, 180, 120, 0.25)
    Note over T,AI: ⚠ Khái niệm và loại thử thách アデッソ sẽ viết. Cách xác định đạt, trạng thái, mỗi lúc mấy thử thách (Q&A No.72)
  end

  T->>AI: Nhắn tin bất cứ lúc nào (tối đa 1.000 ký tự)
  AI->>T: Trả lời chuyện đăng bài, mạng xã hội, hoạt động nghệ thuật
  rect rgba(255, 180, 120, 0.25)
    Note over T,AI: ⚠ Chuyện riêng: khách ghi "đặt giới hạn" ([KS] 確認23), AMCOLAB hiểu là không giới hạn số lần nhưng AI không trả lời chuyện riêng (Q&A No.76)
  end
  opt Chuyện sức khỏe hoặc muốn rời công ty
    AI->>T: Vẫn trò chuyện, có cảm thông
    AI->>HT: Gắn nhãn chuyện nghiêm trọng
    HT->>QL: Thông báo 深刻な相談 (chuyện nghiêm trọng)
    rect rgba(255, 180, 120, 0.25)
      Note over AI,QL: ⚠ Tiêu chí nhận biết, xử lý khẩn cấp khi có dấu hiệu tự hại (S03-02). Báo ngoài giờ qua email (Q&A No.75)
    end
  end
  QL->>HT: Xem hồ sơ, hội thoại, số liệu (ghi nhật ký xem, 確認44)
  QL->>AI: Góp ý: ghi vào chỉ thị cho AI, AIコーチ chuyển lời ([KS] 確認43)
  QL->>HT: Đánh dấu thông báo 対応済み (đã xử lý)

  GMO-->>HT: Thu phí tháng (phí tháng + phí tạo video)
  opt Thu lỗi
    HT->>T: Báo chưa thu được tiền
    HT->>QL: Báo, quản lý quyết có dừng không (không tự dừng)
  end

  T->>QL: Xin rời đi (ngoài hệ thống)
  QL->>HT: Đổi trạng thái sang 利用終了 (có màn xác nhận)
  HT->>T: Chặn đăng nhập, dừng nhắn tin
  HT->>HT: Hủy bài đã hẹn, dừng thu phí (tháng đó vẫn thu đủ, 確認50)
  Note over QL,HT: Không quay lại 利用中 được ([KS] 確認56)
  HT->>OD: Đủ 6 tháng: tự xóa dữ liệu, không khôi phục ([KS] 確認55)
  rect rgba(255, 180, 120, 0.25)
    Note over T,OD: ⚠ Xóa những gì, đăng ký lại bằng email cũ trong 6 tháng (Q&A No.69)
  end
```

---

## 6. Quản lý chỉnh chỉ thị cho AI và danh sách từ cấm

### 6.1. Chỉnh ở đâu

| Nội dung | Chỉnh ở đâu | Có hiệu lực khi nào | Nguồn |
|---|---|---|---|
| Chỉ thị cho AI theo **toàn bộ / nhóm / tài năng**: giọng văn, nhịp đề xuất, khung giờ đăng hiệu quả, cách đề xuất thử thách, quy tắc với tài năng dưới 18 tuổi, cách xử lý chuyện riêng | Màn **M-14** AIへの指示（一覧） (danh sách: phạm vi, người sửa cuối, ngày sửa, bật/tắt) và **M-15** AIへの指示（入力） (soạn: chọn phạm vi, viết chỉ thị, thử 「試してみる」 trên một tài năng, lưu 「保存」, xem lịch sử, quay lại bản cũ) [AG]. Khách muốn đổi chữ trên nút thành 「確認」 và 「指示」. Không có nút mẫu câu 「書き出しの部品」. Thao tác được trên điện thoại | ⚠ Ngay khi lưu hay từ đợt sáng hôm sau: chưa nói | [KS] 確認6, 7, 8, 14, 30, 前提 UC-10-1; CR-18 |
| Kiến thức nghề, chỉ dẫn thuật toán, giọng văn chung | OneDrive `共通/ノウハウ.md`, `共通/アルゴリズム対策.md`, `共通/AIへの指示.md`: quản lý sửa thẳng trên OneDrive | Từ đợt sáng hôm sau | [YK2] UC-02 前提, §7-5 |
| Chỉ dẫn riêng cho một tài năng | Mục `## 個別の指示` trong `プロフィール.md`: qua ChatGPT (MCP, có xác nhận) hoặc sửa thẳng trên OneDrive | Từ đợt sáng hôm sau | [YK2] UC-02 前提, §7-5 |
| Hồ sơ tài năng | ChatGPT project (MCP). ⚠ Màn nhập trong ứng dụng: Q&A No.74 | Từ đợt sáng hôm sau | [YK2] §6-4 2-3; Q&A No.45, 74 |
| **Danh sách từ cấm** (một danh sách chung cho mọi tài năng) | Màn **M-17** 全体の設定 (cài đặt chung) [AG]. FutureCore đưa mẫu; アデッソ gửi danh sách lúc triển khai. Không có danh sách riêng cho từng tài năng; không lưu trên OneDrive | ⚠ Áp cho các lần kiểm tra sau khi lưu; bài đã hẹn giờ có kiểm lại không: chưa nói | [YK2] §6-6 4-4, UC-02 前提; [KS] 確認4; Q&A No.41, CR-07 |
| Giá trị cài đặt khác: giờ các khung, mốc nhắc gửi ảnh, số ngày không đăng, ngày tổng kết tuần, đơn giá video | Màn M-17 | Từ lần chạy sau | [YK2] §5-2, §5-6; Q&A No.41, 62 |
| Sửa bài đã dính từ cấm | Màn **M-11** [AG]: sửa chữ rồi 直して予約する (sửa và hẹn giờ, có kiểm tra lại) hoặc 予約しない (không đăng). ⚠ Tài năng có được tự sửa không: Q&A No.57 | Ngay | [YK2] §6-6 4-4; CR-06 |

**Thứ tự ưu tiên khi trùng** (M-14 [AG], SCD 3-1): chỉ thị theo tài năng > theo nhóm > toàn bộ; `個別の指示` của tài năng ưu tiên hơn chỉ dẫn chung; chỉ dẫn của アデッソ ưu tiên hơn gợi ý của AI. Mọi nội dung AI tạo ra vẫn qua kiểm tra từ cấm.

### 6.2. Luồng

```mermaid
sequenceDiagram
  autonumber
  actor QL as Quản lý
  participant HT as Màn quản trị + hệ thống
  participant AI as AIコーチ
  participant GPT as ChatGPT (MCP)
  participant OD as OneDrive
  actor T as Tài năng

  rect rgba(120, 170, 255, 0.15)
    Note over QL,AI: Chỉnh chỉ thị cho AI trên màn quản trị (M-14, M-15)
    QL->>HT: Mở M-14, chọn phạm vi: toàn bộ / một nhóm / một tài năng
    QL->>HT: Viết hoặc sửa chỉ thị ở M-15
    QL->>HT: Bấm 「試してみる」 (khách muốn ghi 「確認」), chọn một tài năng để thử
    HT->>AI: Chạy thử với chỉ thị mới, không gửi cho tài năng
    AI-->>QL: Xem trước lời nhắn và bản nháp
    alt Chưa ổn
      QL->>HT: Sửa tiếp
    else Ổn
      QL->>HT: Bấm 「保存」 (khách muốn ghi 「指示」): lưu phiên bản mới, giữ lịch sử
    end
    opt Muốn quay lại
      QL->>HT: Chọn phiên bản cũ trong lịch sử
    end
    HT->>AI: Lần chạy sau dùng chỉ thị mới (ưu tiên: tài năng > nhóm > toàn bộ)
    AI->>T: Lời nhắn, chủ đề, bản nháp theo chỉ thị mới
    rect rgba(255, 180, 120, 0.25)
      Note over QL,AI: ⚠ Có hiệu lực ngay hay từ đợt sáng hôm sau. Chỉ thị lưu ở DB hay ghi ra OneDrive (DB P-17). Cách làm chỉ thị theo nhóm: FutureCore thiết kế ([KS] 確認6, biên bản việc số 8). Chỉ thị ở màn này khác với tệp OneDrive hoặc ChatGPT thì bên nào thắng (rủi ro D9)
    end
  end

  rect rgba(120, 170, 255, 0.15)
    Note over QL,OD: Chỉnh qua OneDrive hoặc ChatGPT
    alt Sửa thẳng trên OneDrive
      QL->>OD: Sửa 共通/ノウハウ.md, アルゴリズム対策.md, AIへの指示.md hoặc mục 個別の指示
    else Qua ChatGPT
      QL->>GPT: Trò chuyện trong project của tài năng
      GPT->>HT: Đề xuất ghi
      HT->>QL: Xin xác nhận nội dung và đích
      QL->>HT: Xác nhận
      HT->>OD: Ghi tệp (kiểm tra eTag, không ghi đè bản vừa bị sửa)
    end
    HT->>OD: Đợt sáng hôm sau: đọc bản mới
    HT->>AI: Dùng trong bản chụp ngữ cảnh
  end

  rect rgba(120, 170, 255, 0.15)
    Note over QL,T: Chỉnh danh sách từ cấm (M-17)
    QL->>HT: Mở M-17 全体の設定, thêm, sửa, xóa từ cấm
    HT->>HT: Lưu danh sách chung (một danh sách cho mọi tài năng)
    T->>HT: 採用 bản nháp (hoặc hệ thống tự soạn bài 自動投稿)
    HT->>AI: Kiểm tra chú thích, hashtag theo danh sách hiện hành, xét ngữ cảnh
    alt Có từ cấm
      HT->>T: Báo lý do, không hẹn giờ
      HT->>QL: Thông báo phát hiện từ cấm
      QL->>HT: Sửa ở M-11, 直して予約する (kiểm tra lại) hoặc 予約しない
    else Không có
      HT->>HT: Hẹn giờ
    end
    rect rgba(255, 180, 120, 0.25)
      Note over QL,T: ⚠ Đổi danh sách thì bài đã hẹn giờ có kiểm lại không. Bài 自動投稿 kiểm lúc nào (Q&A No.71). Tài năng có tự sửa bài dính từ cấm không (Q&A No.57). Danh sách ban đầu アデッソ gửi lúc triển khai ([KS] 確認4)
    end
  end
```

---

## 7. Các điểm chưa rõ trong sơ đồ

| Điểm | Mục | Câu hỏi đang mở |
|---|---|---|
| Chi tiết đăng tự động (ảnh cho bài, dừng, hết ảnh, duyệt, từ cấm, "1回の投稿") | 3, 4 | Q&A No.70, 71, 77 |
| Nhịp đề xuất; giờ và nội dung khung trưa, tối | 3, 5 | [KS] 確認14 (cách làm), Q&A No.73 |
| Không gửi ảnh trong ngày (要確認); 採用 sau giờ đăng; bản nháp không dùng | 3 | [KS] 確認26, Q&A No.55, 56 |
| Gửi duyệt theo nhóm hay theo quản lý phụ trách | 2, 4 | Q&A No.6 |
| Gửi duyệt lại; tài năng sửa bài dính từ cấm | 4 | Q&A No.57, 58 |
| Đặt lịch lại sau khi đăng lỗi | 4 | Q&A No.59 |
| Thử thách: khái niệm, cách xác định đạt; đếm ngày đăng liên tục | 4, 5 | [KS] 確認5, 22, Q&A No.72 |
| Chuyện riêng; tiêu chí chuyện nghiêm trọng; email cho quản lý | 5 | Q&A No.75, 76, S03-02 |
| Màn nhập thông tin tài năng; phạm vi MCP | 1, 2 | Q&A No.45, 74 |
| Thu phí: chu kỳ, số tiền thay đổi | 2, 5 | [KS] 確認48, 49, Q&A No.53 |
| Xóa sau 6 tháng và đăng ký lại | 5 | Q&A No.69 |
| Tin nhắn trực tiếp quản lý → tài năng | 1 | Giai đoạn sau ([KS] 確認43) |
| Chỉ thị cho AI: có hiệu lực ngay hay sáng hôm sau; lưu ở DB hay OneDrive; ưu tiên giữa màn M-15, ChatGPT và tệp OneDrive; cách làm chỉ thị theo nhóm | 6 | [KS] 確認6 (FutureCore thiết kế), rủi ro D9, DB P-17 |
| Danh sách từ cấm: đổi danh sách thì bài đã hẹn giờ có kiểm lại không; bài 自動投稿 kiểm lúc nào | 6 | Q&A No.57, 71; [KS] 確認4 |
