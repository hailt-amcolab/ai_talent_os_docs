# AI Talent OS --- Báo cáo kiến trúc AI Core và kế hoạch tích hợp

**Phiên bản:** 2.0 (điều chỉnh sau review kỹ thuật)\
**Ngày:** 19/11/2026\
**Trạng thái:** Đề xuất kỹ thuật; chưa phải đặc tả được khách hàng phê
duyệt\
**Phạm vi:** AI Orchestrator, MCP, OneDrive, Upload-Post, Supabase,
RBAC, Worker, triển khai và kiểm thử

## 1. Tóm tắt quyết định

Kiến trúc được lựa chọn là **Code-first AI Core + OneDrive-driven
Business Instructions + MCP Tool Gateway + Background Worker**.

-   **Không tự xây dựng toàn bộ Agent Engine:** dùng thư viện AI SDK cho
    tương tác mô hình, tool calling và đầu ra có cấu trúc.
-   **Tự xây dựng lớp điều phối mỏng:** ghép nghiệp vụ AI Talent OS, xác
    thực, phạm vi dữ liệu, theo dõi tác vụ, giới hạn thực thi.
-   **MCP TypeScript SDK:** xây dựng các MCP Tool truy cập dịch vụ
    nghiệp vụ; có thể cung cấp MCP endpoint riêng cho ChatGPT.
-   **OneDrive:** nguồn thông tin Talent, mục tiêu, kiến thức, chỉ dẫn
    nghiệp vụ.
-   **Upload-Post:** nguồn thống kê SNS thông qua **MCP → Backend SNS
    Service → Upload-Post API**, không để mô hình gọi API Upload-Post
    trực tiếp.
-   **Supabase:** dữ liệu ứng dụng, liên kết Talent/SNS, trạng thái, kết
    quả AI, nhật ký; có thể lưu snapshot số liệu.
-   **VPS:** AI Worker, Scheduler, Redis/BullMQ, MCP nội bộ; Backend API
    có thể ở VPS hoặc Vercel tùy hiện trạng.
-   **Không tạo màn hình quản trị Agent/Prompt/Workflow/MCP/Model**
    trong phạm vi AI Core ban đầu. Manager cập nhật hướng dẫn qua
    OneDrive hoặc ChatGPT/MCP theo luồng được xác nhận.

### 1.1. Phân loại nguồn và quyết định

  -----------------------------------------------------------------------
  Nội dung                            Cơ sở / trạng thái
  ----------------------------------- -----------------------------------
  AI Coach đọc thông tin Talent từ    Yêu cầu v2: UC-04, §6-5, §7
  OneDrive mỗi sáng                   

  Manager cung cấp thông tin Talent   Yêu cầu v2: UC-02, §6-2 mục 2-3
  qua ChatGPT, lưu vào OneDrive       

  Thống kê bài đăng và follower từ    Yêu cầu v2: UC-05, §5 và §7
  Upload-Post, nhập một lần/ngày      

  AI chủ động gọi MCP tới Backend để  **Quyết định kiến trúc mới trong
  lấy thống kê Upload-Post trực tiếp  trao đổi**; cần đối chiếu cách vận
                                      hành nhập số liệu một lần/ngày

  MCP cho Manager qua ChatGPT         Có cơ sở từ điều kiện báo giá A4
                                      theo ghi chú Q&A số 45; chi tiết
                                      xác thực/ghi dữ liệu cần kiểm chứng

  Agent, prompt kỹ thuật, tool        **Đề xuất kỹ thuật** nhằm giảm màn
  allowlist cấu hình bằng code        hình

  Redis/BullMQ, AI SDK, MCP SDK, Zod  **Đề xuất thư viện**; cần kiểm tra
                                      phiên bản tương thích trước khi cài

  Màn hình M-11 chỉ dẫn AI            Chưa mặc định thuộc phạm vi: nhóm
                                      thay đổi CR-17--CR-25 đang chờ
                                      quyết định
  -----------------------------------------------------------------------

**Lưu ý:** tài liệu v2 quy định **nhập thống kê Upload-Post một
lần/ngày**. Đề xuất MCP gọi trực tiếp Upload-Post theo nhu cầu AI là một
cách triển khai bổ sung/điều chỉnh, không tự động thay thế yêu cầu nhập
hằng ngày. Nên duy trì **daily snapshot** cho lịch sử và có **live fetch
có kiểm soát** khi nghiệp vụ cần dữ liệu mới hơn.

------------------------------------------------------------------------

## 2. Kiến trúc tổng thể

``` mermaid
flowchart TB
    subgraph CLIENT["Lớp người dùng"]
        PWA["Talent PWA"]
        MAN["Manager Dashboard"]
        GPT["ChatGPT của Manager"]
    end
    subgraph APP["Backend ứng dụng — VPS hoặc Vercel"]
        API["Hono / TypeScript API"]
        AUTH["Auth + RBAC + Resource Authorization"]
        SNS["SNS Analytics Service"]
        UCLIENT["Upload-Post API Client"]
        BIZ["Talent / Posting / OneDrive Services"]
    end
    subgraph VPS["VPS — Docker"]
        SCH["Scheduler"]
        REDIS[("Redis / BullMQ")]
        WORK["AI Worker"]
        ORCH["AI Orchestrator Wrapper"]
        MCP["Internal MCP Tool Server / Adapter"]
        REMOTE["Remote MCP Endpoint (nếu được duyệt)"]
    end
    subgraph EXTERNAL["Dữ liệu và nhà cung cấp"]
        SUPA[("Supabase PostgreSQL / Auth / Storage")]
        DRIVE["Microsoft OneDrive / Graph"]
        POST["Upload-Post API"]
        LLM["OpenAI API"]
    end

    PWA --> API
    MAN --> API
    API --> AUTH
    API --> BIZ
    API -->|Tạo execution| SUPA
    API -->|Gửi job qua kênh bảo mật| REDIS
    SCH --> REDIS
    REDIS --> WORK
    WORK --> ORCH
    ORCH <--> LLM
    ORCH --> MCP
    MCP -->|Tool có kiểm soát| BIZ
    MCP -->|get_talent_sns_metrics| SNS
    SNS --> UCLIENT
    UCLIENT --> POST
    SNS -->|mapping / snapshot| SUPA
    BIZ --> DRIVE
    BIZ --> SUPA
    ORCH -->|logs / output| SUPA
    GPT -->|HTTPS + OAuth, theo khả năng tích hợp| REMOTE
    REMOTE --> AUTH
    REMOTE --> BIZ
```

**Quy tắc kiến trúc:** AI chỉ yêu cầu gọi tool; Backend/MCP kiểm tra
quyền và thực hiện nghiệp vụ. Không cấp cho mô hình khóa quản trị
Supabase, khóa Upload-Post hoặc Microsoft Graph.

**Lưu ý hạ tầng:** Nếu API đặt trên Vercel, Redis nằm trong Docker
network riêng của VPS không thể được gọi trực tiếp theo sơ đồ logic. Cần
một API enqueue bảo mật trên VPS hoặc kết nối mạng riêng phù hợp. Không
công khai Redis lên Internet.

## 3. AI Core: dùng thư viện nào, tự xây phần nào?

  -----------------------------------------------------------------------
  Chức năng               Phương án               Tự xây?
  ----------------------- ----------------------- -----------------------
  Gọi model, tool         Vercel AI SDK (`ai`,    Không xây engine
  calling, structured     provider tương ứng)     
  output                                          

  Giao thức MCP           MCP TypeScript SDK      Không xây protocol
  Server/Client                                   

  Hàng đợi, retry,        BullMQ + Redis          Không xây queue engine
  concurrency, lịch chạy                          

  Kiểm tra schema dữ liệu Zod                     Không xây validator

  Định nghĩa Agent        TypeScript Registry     Có

  Chọn prompt và ghép     Prompt Resolver         Có
  hướng dẫn OneDrive                              

  Xây execution context   Context Builder         Có

  Quyền người dùng,       Authorization Layer     Có
  Agent, dữ liệu                                  

  Kết nối SNS metrics     Backend SNS Service +   Có/tái sử dụng
                          Upload-Post Client      

  Trạng thái, chi phí,    Execution Service       Có
  lịch sử AI                                      

  Quy trình đăng bài, phê Business Services hiện  Tái sử dụng
  duyệt, cảnh báo         có                      
  -----------------------------------------------------------------------

**Không cần LangGraph/Mastra ở giai đoạn đầu.** Chỉ xem xét khi có
workflow nhiều Agent, trạng thái dài hạn, nhánh phức tạp hoặc cơ chế tạm
dừng/tiếp tục khó đáp ứng bằng worker và nghiệp vụ hiện tại.

### 3.1. Kiến trúc nội bộ

``` mermaid
flowchart LR
    R["Execution Request"] --> RUN["Agent Runner"]
    REG["Agent Registry<br/>TypeScript"] --> RUN
    RUN --> PR["Prompt Resolver"]
    CODE["System Prompt<br/>Code"] --> PR
    OD["OneDrive<br/>Business Instructions"] --> PR
    PR --> CB["Context Builder"]
    CB --> SDK["AI SDK Agent / Tool Loop"]
    SDK <--> AI["OpenAI"]
    SDK --> TX["Tool Executor"]
    TX --> AZ["RBAC + Scope + Tool Allowlist"]
    AZ --> MCP["MCP Adapter"]
    MCP --> BE["Backend Business Services"]
    SDK --> VAL["Zod Output Validation"]
    VAL --> LOG["Execution Log + Result"]
    LOG --> DB[("Supabase")]
```

### 3.2. Ví dụ Agent cấu hình bằng TypeScript

``` ts
export const dailyCoachAgent = {
  code: "daily_coach",
  promptRevision: "2026-11-19-v1",
  model: process.env.AI_COACH_MODEL ?? "gpt-4.1-mini",
  allowedTools: [
    "get_talent_profile",
    "get_talent_knowledge",
    "get_talent_sns_metrics",
    "get_talent_sns_posts"
  ],
  limits: {
    maxSteps: 5,
    maxToolCalls: 8,
    timeoutMs: 60_000
  }
} as const;
```

Các giá trị model/giới hạn chỉ là ví dụ. Khi triển khai phải đối chiếu
khả năng model, phiên bản SDK, quota và benchmark.

### 3.3. Quy tắc ghép prompt

1.  **System Policy (code):** vai trò, quy tắc an toàn, hạn chế quyền,
    định dạng.
2.  **Agent Instructions (code):** nhiệm vụ AI Coach / Content
    Generator.
3.  **Business Instructions (OneDrive):** định hướng nội dung, văn
    phong, kiến thức chung.
4.  **Talent Context (OneDrive):** hồ sơ, mục tiêu, thông tin riêng.
5.  **SNS Metrics (MCP → Backend → Upload-Post):** số liệu theo nguồn,
    thời gian và phạm vi.
6.  **Output Schema (Zod):** kiểm tra kết quả trước khi lưu.

Dữ liệu OneDrive và kết quả công cụ là dữ liệu đầu vào **không được phép
ghi đè chính sách hệ thống**.

------------------------------------------------------------------------

## 4. Thiết kế MCP

### 4.1. Hai kiểu tích hợp

**MCP nội bộ cho AI Worker:** AI SDK có thể gọi MCP Client tới MCP
Server, hoặc dùng tool adapter cùng registry. Với luồng cố định, gọi
trực tiếp Business Service là lựa chọn đơn giản hơn; chỉ bắt buộc đi qua
MCP ở những chức năng được thiết kế theo MCP.

**Remote MCP cho ChatGPT:** endpoint HTTPS riêng, xác thực theo cơ chế
được ChatGPT và MCP hỗ trợ, ánh xạ người dùng Manager, kiểm tra quyền
trước mọi thao tác. Không sử dụng service role để đại diện quyền của
Manager.

### 4.2. Danh sách công cụ tối thiểu

  ---------------------------------------------------------------------------
  Tool                        Nguồn thực tế           Kiểu
  --------------------------- ----------------------- -----------------------
  `get_talent_profile`        Backend → OneDrive      Đọc

  `get_talent_goals`          Backend → OneDrive      Đọc

  `get_talent_knowledge`      Backend → OneDrive      Đọc

  `get_talent_sns_accounts`   Backend → Supabase /    Đọc
                              Upload-Post mapping     

  `get_talent_sns_posts`      Backend → Upload-Post   Đọc

  `get_talent_sns_metrics`    Backend → Upload-Post   Đọc

  `update_talent_knowledge`   Backend → OneDrive      Ghi, cần xác nhận/kiểm
                                                      tra

  `save_ai_analysis`          Backend → Supabase      Ghi nội bộ
  ---------------------------------------------------------------------------

**Không cung cấp:** `execute_sql`, `read_any_file`,
`call_arbitrary_url`, hoặc tool cho phép AI chỉ định API key.

### 4.3. Tool thống kê SNS --- hợp đồng đề xuất

``` ts
type GetTalentSnsMetricsInput = {
  platform?: "instagram" | "tiktok" | "youtube";
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  freshness?: "latest" | "daily_snapshot";
};
```

`talentId`, `actorId`, `executionId` **không lấy trực tiếp từ tham số do
model quyết định**. Các giá trị này phải đến từ ngữ cảnh thực thi đã xác
thực.

Đầu ra chuẩn hóa (ví dụ):

``` json
{
  "source": "upload-post",
  "retrievedAt": "2026-11-19T01:00:00Z",
  "freshness": "latest",
  "platform": "instagram",
  "metrics": [
    {
      "postId": "example-post",
      "views": 1200,
      "likes": 80,
      "comments": 4
    }
  ],
  "unavailableMetrics": ["shares"]
}
```

Đây là **hợp đồng nội bộ đề xuất**, không phải khẳng định Upload-Post hỗ
trợ mọi trường hoặc bộ lọc. Cần kiểm chứng endpoint, mapping, rate
limit, độ trễ thống kê, phân trang và quyền truy cập từng nền tảng trước
khi code.

### 4.4. Luồng thống kê qua MCP

``` mermaid
sequenceDiagram
    autonumber
    participant O as AI Orchestrator
    participant AI as OpenAI
    participant M as MCP Tool
    participant BE as Backend SNS Service
    participant DB as Supabase
    participant UP as Upload-Post

    O->>AI: Prompt + tools được phép
    AI-->>O: get_talent_sns_metrics(period)
    O->>M: Tool call + execution context
    M->>M: Kiểm tra allowlist / RBAC / scope
    M->>BE: Get metrics cho Talent đã xác thực
    BE->>DB: Tìm mapping SNS và kiểm tra quyền
    DB-->>BE: Mapping hợp lệ
    BE->>UP: Gọi API thống kê
    UP-->>BE: Dữ liệu thực tế
    BE->>BE: Chuẩn hóa + kiểm tra nguồn/thời điểm
    BE-->>M: Metrics chuẩn hóa
    M-->>O: Tool result
    O->>AI: Metrics để phân tích
    AI-->>O: Đánh giá và đề xuất
```

### 4.5. Chiến lược dữ liệu thống kê

-   **Daily ingestion:** tác vụ lấy thống kê một lần/ngày theo tài liệu
    v2; lưu snapshot phục vụ lịch sử.
-   **Live MCP fetch:** chỉ gọi Upload-Post khi AI cần dữ liệu mới nhất
    có sẵn, có giới hạn tần suất và thời gian.
-   **Fallback:** nếu Upload-Post lỗi, có thể trả snapshot kèm
    `retrievedAt` và `isStale=true` nếu nghiệp vụ cho phép; tuyệt đối
    không trình bày snapshot là dữ liệu mới.
-   **Rate limit:** giới hạn theo nhà cung cấp, Talent và execution; sử
    dụng cache TTL có kiểm soát.
-   **Chưa xác nhận:** số liệu nào API Upload-Post thực sự cung cấp, độ
    mới của dữ liệu và quy tắc thay thế khi lỗi.

------------------------------------------------------------------------

## 5. OneDrive: dữ liệu và hướng dẫn nghiệp vụ

Cấu trúc thư mục **minh họa**, cần đối chiếu với cấu trúc OneDrive thực
tế:

``` text
AI-Talent-OS/
├── shared/
│   ├── ai-guidelines.md
│   └── sns-knowledge.md
└── talents/
    └── {talentId}/
        ├── profile.md
        ├── goals.md
        ├── instructions.md
        ├── knowledge/
        └── media/
```

-   Manager chỉnh sửa **hướng dẫn nghiệp vụ** và thông tin Talent qua
    OneDrive hoặc ChatGPT/MCP theo quyền.
-   System prompt, RBAC, tool allowlist, API key và execution limits
    **không** đặt trong tài liệu OneDrive.
-   Nên dùng OneDrive `eTag`/metadata và cache để tránh tải lặp; ghi
    nhận phiên bản tài liệu được dùng cho mỗi execution.
-   Cần xác định loại tài khoản Microsoft 365, cơ chế OAuth/Graph, phạm
    vi quyền và khả năng ghi file. Không mặc định tài khoản Microsoft cá
    nhân dùng được client credentials.
-   Luồng ghi từ ChatGPT cần hiển thị **Talent đích + nội dung thay
    đổi** để Manager xác nhận trước khi ghi, phù hợp yêu cầu v2 §6-2 mục
    2-3.

------------------------------------------------------------------------

## 6. RBAC và kiểm soát dữ liệu

Ba lớp quyền độc lập:

1.  **User Permission:** vai trò Manager/Talent/System Admin có được
    thực hiện hành động?
2.  **Agent Tool Permission:** Agent có quyền gọi tool tương ứng?
3.  **Resource Authorization:** người dùng/execution có quyền với
    Talent, SNS account, file OneDrive cụ thể?

``` mermaid
flowchart TB
    CALL["AI đề xuất Tool Call"] --> ROLE{"User permission?"}
    ROLE -->|Không| DENY["Từ chối + audit"]
    ROLE -->|Có| TOOL{"Tool nằm trong allowlist?"}
    TOOL -->|Không| DENY
    TOOL -->|Có| SCOPE{"Talent / file / account hợp lệ?"}
    SCOPE -->|Không| DENY
    SCOPE -->|Có| EXEC["Thực thi Business Service"]
```

**Đề xuất:** quyền tĩnh bằng TypeScript, vai trò người dùng trong
Supabase, chính sách truy cập dữ liệu kiểm tra tại Backend và RLS khi
phù hợp. Không cần màn hình cấu hình RBAC riêng.

------------------------------------------------------------------------

## 7. Workflow và luồng thực thi

### 7.1. Daily AI Coach

``` mermaid
sequenceDiagram
    autonumber
    participant S as Scheduler
    participant Q as BullMQ
    participant W as Worker
    participant O as Orchestrator
    participant D as OneDrive
    participant M as MCP
    participant B as Backend
    participant U as Upload-Post
    participant AI as OpenAI
    participant DB as Supabase

    S->>Q: Lập job 08:00 theo múi giờ nghiệp vụ
    Q->>W: Nhận job Talent
    W->>DB: Tạo execution / chống trùng
    W->>O: Chạy daily_coach
    O->>D: Đọc profile + goals + instructions
    O->>AI: Gửi prompt / tools
    AI-->>O: Yêu cầu metrics
    O->>M: get_talent_sns_metrics
    M->>B: Gọi SNS Analytics Service
    B->>U: Lấy thống kê
    U-->>B: Metrics
    B-->>M: Metrics chuẩn hóa
    M-->>O: Kết quả tool
    O->>AI: Tiếp tục phân tích
    AI-->>O: 3 chủ đề đề xuất
    O->>O: Kiểm tra schema
    O->>DB: Lưu đề xuất + execution
    W-->>Q: Hoàn tất
```

**Trạng thái execution:**
`PENDING → QUEUED → RUNNING → COMPLETED | FAILED | TIMED_OUT | CANCELLED`.

**Giới hạn bắt buộc:** timeout, max steps, max tool calls, giới hạn
token/chi phí, retry theo loại lỗi, idempotency key, nhật ký kiểm toán.

### 7.2. Phân biệt AI với nghiệp vụ

AI có thể đề xuất chủ đề, caption, hashtag, thời gian đăng. Việc lưu bản
nháp, duyệt, đặt lịch, hủy lịch và đăng SNS phải đi qua **Business
Services** và trạng thái nghiệp vụ hiện có. Không cho AI trực tiếp vượt
qua bước duyệt hoặc quy tắc ngừng đăng.

------------------------------------------------------------------------

## 8. Cơ sở dữ liệu tối giản

Không tạo các bảng cấu hình động `ai_agents`, `ai_prompts`,
`ai_model_configs`, `ai_workflows` ở V1.

Đề xuất ba bảng:

``` mermaid
erDiagram
    AI_EXECUTIONS ||--o{ AI_TOOL_CALLS : has
    AI_EXECUTIONS ||--o| AI_RESULTS : produces

    AI_EXECUTIONS {
      uuid id PK
      text agent_code
      uuid talent_id
      text status
      text prompt_revision
      text model
      text instruction_etag
      int input_tokens
      int output_tokens
      timestamp started_at
      timestamp finished_at
    }
    AI_TOOL_CALLS {
      uuid id PK
      uuid execution_id FK
      text tool_name
      text status
      int duration_ms
      timestamp created_at
    }
    AI_RESULTS {
      uuid id PK
      uuid execution_id FK
      jsonb output
      timestamp created_at
    }
```

Các trường ở trên là **khung logic**, không phải DDL cuối cùng. Khi
thiết kế database cần bổ sung:

-   Khóa ngoại tới Talent/User hiện có.
-   Chỉ mục theo `talent_id`, `status`, `created_at`.
-   Ràng buộc chống chạy trùng cho job theo lịch.
-   `request_id`, `actor_id`, lỗi và thời gian xử lý.
-   RLS hoặc giới hạn truy cập server-side.
-   Chính sách lưu log, ẩn dữ liệu nhạy cảm, thời gian lưu giữ.
-   Snapshot SNS theo nhu cầu của nghiệp vụ thống kê, không bắt buộc đặt
    trong schema AI Core.

------------------------------------------------------------------------

## 9. API và hợp đồng tích hợp

### 9.1. API tối thiểu

``` http
POST /api/v1/ai/executions
GET  /api/v1/ai/executions/:id
POST /api/v1/ai/executions/:id/cancel
```

Các endpoint quản trị Agent/Prompt/Workflow **không cần**.

### 9.2. Backend SNS Service

Có thể triển khai qua lời gọi service nội bộ hoặc API có xác thực:

``` http
GET /internal/sns/analytics?startDate=...&endDate=...
```

Talent đích được xác định từ execution context đáng tin cậy. Nếu truyền
Talent ID qua API nội bộ, phải xác minh nó thuộc scope đã được cấp
quyền. Endpoint này không công khai cho client thông thường.

### 9.3. Luồng xử lý yêu cầu

-   Client gửi yêu cầu tới Backend.
-   Backend xác thực và tạo execution.
-   Worker chạy Agent theo cấu hình code.
-   Agent dùng tool đã cấp quyền.
-   Tool gọi Backend Service.
-   Backend Service gọi Upload-Post hoặc OneDrive.
-   Kết quả được kiểm tra và lưu vào Supabase.
-   Client đọc kết quả qua API hiện có.

------------------------------------------------------------------------

## 10. Triển khai trên VPS

### 10.1. Thành phần Docker

``` text
VPS
├── reverse-proxy
├── ai-worker
├── ai-scheduler
├── redis
├── internal-mcp       # Có thể gộp vào worker
└── remote-mcp         # Chỉ khi tích hợp ChatGPT được chốt
```

Không bắt buộc tách MCP nội bộ thành container riêng; ưu tiên dùng chung
Business Service để tránh nhân đôi logic.

### 10.2. Biến môi trường ví dụ

``` dotenv
OPENAI_API_KEY=
AI_COACH_MODEL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
REDIS_URL=
UPLOAD_POST_API_KEY=
ONEDRIVE_TENANT_ID=
ONEDRIVE_CLIENT_ID=
ONEDRIVE_CLIENT_SECRET=
AI_MAX_STEPS=5
AI_MAX_TOOL_CALLS=8
AI_TIMEOUT_MS=60000
```

Các biến OneDrive ở trên là **ví dụ cho một kiểu xác thực**; phải lựa
chọn theo tenant, tài khoản và luồng OAuth thực tế. Không commit secret
lên Git.

### 10.3. Quan sát và vận hành

-   Ghi execution ID xuyên suốt Backend → Worker → MCP → Upload-Post.
-   Theo dõi số job thành công/thất bại, latency, token và chi phí.
-   Ghi nguồn dữ liệu, thời điểm lấy và trạng thái cache của metrics.
-   Phân biệt lỗi xác thực, lỗi rate limit, lỗi nhà cung cấp và lỗi dữ
    liệu.
-   Cảnh báo job hằng ngày thất bại, không tạo màn hình riêng nếu hệ
    thống log hiện có đáp ứng.

------------------------------------------------------------------------

## 11. Kế hoạch tích hợp theo giai đoạn

  -----------------------------------------------------------------------
  Giai đoạn               Nội dung                Điều kiện hoàn tất
  ----------------------- ----------------------- -----------------------
  P0 --- Kiểm tra hiện    Kiểm tra Backend,       Chốt ranh giới service
  trạng                   Supabase, OneDrive,     và quyền
                          Upload-Post và hạ tầng  
                          VPS                     

  P1 --- Nền tảng AI      AI SDK, Agent Registry, Chạy Agent đơn giản có
                          Prompt Resolver,        log
                          Execution Service       

  P2 --- MCP và dữ liệu   MCP Tool OneDrive +     Tool đọc đúng Talent,
                          Backend SNS Service →   không vượt quyền
                          Upload-Post             

  P3 --- AI Coach         Daily Coach tạo ba chủ  Kết quả hợp lệ, hiển
                          đề từ dữ liệu thực      thị đúng Talent

  P4 --- Tác vụ nền       Scheduler, BullMQ,      Chạy ổn định theo lịch
                          retry, idempotency      

  P5 --- Bảo mật/vận hành Test phân quyền, tải,   Đủ điều kiện UAT
                          chi phí, lỗi            

  P6 --- ChatGPT MCP      Remote MCP, OAuth, cập  Được khách hàng xác
                          nhật OneDrive có xác    nhận và kiểm chứng
                          nhận                    
  -----------------------------------------------------------------------

Không đưa estimate ngày công trước khi kiểm tra codebase và danh sách
chức năng đã được duyệt.

------------------------------------------------------------------------

## 12. Kịch bản kiểm thử bắt buộc

### 12.1. Chức năng

-   Daily Coach lấy đúng profile và mục tiêu Talent.
-   MCP gọi Backend để lấy metrics Upload-Post, không lấy nhầm tài
    khoản.
-   AI trả đúng ba chủ đề với lý do dựa trên dữ liệu.
-   Nếu thiếu metrics, kết quả phải thể hiện thiếu dữ liệu, không bịa
    số.
-   Manager sửa hướng dẫn OneDrive; execution sau dùng phiên bản mới
    theo chính sách cache.

### 12.2. Bảo mật

-   Talent A không đọc được dữ liệu Talent B.
-   Manager không được tự mở rộng quyền MCP bằng nội dung OneDrive.
-   Agent không gọi tool ngoài allowlist.
-   Prompt injection trong tài liệu hoặc metrics không thể thay đổi
    chính sách.
-   Các thao tác ghi OneDrive từ ChatGPT phải được xác thực, kiểm tra
    phạm vi và có bước xác nhận theo yêu cầu.

### 12.3. Độ ổn định

-   Upload-Post trả 429, timeout hoặc dữ liệu thiếu.
-   OneDrive trả 401/403, hết hạn token hoặc không tìm thấy file.
-   OpenAI timeout hoặc trả JSON không hợp lệ.
-   Worker khởi động lại giữa execution.
-   Scheduler kích hoạt trùng.
-   Dữ liệu metrics đã cũ hoặc chưa đồng bộ.

------------------------------------------------------------------------

## 13. Quyết định còn mở

  -----------------------------------------------------------------------
  Mã                      Câu hỏi cần chốt        Ảnh hưởng
  ----------------------- ----------------------- -----------------------
  AIC-01                  Backend API thực tế     Kết nối queue,
                          chạy ở VPS hay Vercel?  deployment

  AIC-02                  Dùng MCP protocol trong Độ phức tạp runtime
                          toàn bộ tool nội bộ hay 
                          adapter cho các tool cố 
                          định?                   

  AIC-03                  Metrics luôn live từ    Tải API, độ mới, nghiệp
                          Upload-Post hay ưu tiên vụ
                          snapshot một lần/ngày   
                          theo v2?                

  AIC-04                  Upload-Post hỗ trợ      Tool contract
                          những endpoint, trường  
                          thống kê và quota nào?  

  AIC-05                  OneDrive dùng Microsoft Xác thực và phân quyền
                          365 tenant nào và       
                          phương thức OAuth nào?  

  AIC-06                  Manager điều chỉnh AI   Remote MCP
                          qua ChatGPT/MCP ở mức   
                          nào; thao tác ghi nào   
                          được phép?              

  AIC-07                  Có yêu cầu quản trị     Phạm vi UI
                          prompt bằng màn hình    
                          hay chỉ qua OneDrive?   

  AIC-08                  Quota token/chi phí,    Worker sizing
                          concurrency và thời     
                          gian hoàn tất AI Coach? 

  AIC-09                  Quy tắc cache/fallback  Tính đúng của phân tích
                          khi Upload-Post không   
                          sẵn sàng?               
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 14. Kết luận

**Phương án khuyến nghị:**

> **AI SDK + MCP TypeScript SDK + BullMQ + Zod + Custom Orchestrator
> Wrapper (TypeScript)**

Kết hợp: - **Code:** Agent, system prompt, RBAC, MCP allowlist,
workflow. - **OneDrive:** hướng dẫn nghiệp vụ, hồ sơ, mục tiêu và kiến
thức Talent. - **MCP → Backend → Upload-Post:** lấy thống kê SNS trực
tiếp khi cần. - **Supabase:** dữ liệu ứng dụng, snapshot, execution và
kết quả. - **VPS:** worker, scheduler, queue và MCP nội bộ.

Phương án này giảm tối đa màn hình cấu hình mới, tận dụng các thư viện
hiện có, giữ nguyên ranh giới nghiệp vụ Backend và có khả năng mở rộng
sau này mà không xây dựng sớm một nền tảng multi-agent phức tạp.

------------------------------------------------------------------------

## 15. Tài liệu đối chiếu

1.  `AI育成OS_概要要件定義書_v2.docx`: UC-02, UC-04, §5-5, §6-2 (2-3),
    §6-5, §7; các đoạn về OneDrive, ChatGPT, Upload-Post và nhập thống
    kê một lần/ngày.
2.  `CLAUDE.md`: ghi chú ưu tiên tài liệu v2, điều kiện báo giá A4/MCP,
    phạm vi CR-17--CR-25, kiến trúc dự kiến.
3.  `TIEP_TUC.md`: tình trạng kiểm chứng Upload-Post, OneDrive,
    ChatGPT/MCP và phương án VPS/Vercel.
4.  Các quyết định kỹ thuật bổ sung trong cuộc trao đổi ngày 19/11/2026:
    cấu hình code/OneDrive, hạn chế màn hình, MCP lấy thống kê qua
    Backend và lựa chọn thư viện Hybrid.

**Ghi chú:** Phần hợp đồng API Upload-Post, phiên bản thư viện và cơ chế
OAuth/MCP phải được xác minh theo tài liệu nhà cung cấp tại thời điểm
triển khai; các ví dụ trong báo cáo chưa phải hợp đồng tích hợp đã kiểm
chứng.
