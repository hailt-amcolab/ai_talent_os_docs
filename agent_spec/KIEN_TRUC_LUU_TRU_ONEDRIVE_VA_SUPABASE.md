# Kiến trúc lưu trữ file: OneDrive và Supabase

**Bản:** 1.0 · 23/11/2026 · Tác giả: Codex.  
**Trạng thái:** thiết kế nội bộ để review, chưa triển khai hoặc kiểm chứng trên tenant/project thật.  
**Phạm vi:** file nghiệp vụ, nguồn dữ liệu AI, media, metadata và vòng đời lưu trữ trên phương án một VPS dùng chung BE.

## 1. Cách phân chia đề xuất

**OneDrive giữ tài liệu nội dung cho AI; Supabase Storage giữ media phục vụ ứng dụng và provider; Supabase Postgres giữ trạng thái, quyền và tham chiếu.** Không bắt buộc chép mọi file sang cả hai nơi.

Đây là phương án kỹ thuật đề xuất, không phải khách đã chốt nơi lưu cho từng loại file. Quyết định nguồn hiện có cho phép ảnh/video lưu Supabase hoặc OneDrive; chưa chỉ định tất cả media phải nằm ở đâu. Tài liệu chọn Supabase Storage làm mặc định cho media mới để đội có phương án triển khai cụ thể; cần review chi phí, dung lượng, tenant và hợp đồng provider trước khi áp dụng.

| Nhãn | Cách đọc |
|---|---|
| Nguồn | Nội dung truy được tới tài liệu khách/QA; không thay phê duyệt triển khai hoặc release |
| Hiện có | Hành vi đọc được trong code/schema repository; không chứng minh đã deploy hoặc được khách duyệt |
| Đề xuất | Quyết định kỹ thuật trong tài liệu này, chưa là code/migration/cấu hình thật |
| Còn mở | Quyết định nghiệp vụ hoặc khả năng provider/tenant cần xác nhận; tiếp tục QA/finding hiện có |

Phân biệt **Supabase Storage** (byte của file), **Supabase Postgres** (dữ liệu có cấu trúc) và **Supabase Auth** (danh tính/xác thực). Không coi ba thành phần là cùng một nơi chứa file.

## 2. Căn cứ và giới hạn thẩm quyền

| Mã nguồn/phiên bản | Locator | Kết luận áp dụng |
|---|---|---|
| QA hiện hành tiếp nhận23/11 | `Q&A!G9/H9`, No.8, phản hồi19/11 | Ảnh/video có thể lưu ở Supabase và OneDrive. Không suy ra phải lưu kép hoặc Supabase chỉ là nơi tạm |
| YK2, bản0.1 trong tên file v2 | §7-1/§7-2/§7-5; chức năng2-1…2-4,8-8 | Hồ sơ/know-how/chỉ thị/điều AI học dùng tệp OneDrive; số liệu hệ thống xuất cho AI đọc. Tên file, template và đồng bộ cụ thể là thiết kế nội bộ |
| BF19, lập19/11 | PDF p18 | Nhập/sửa thông tin, chỉ thị qua quản trị hoặc ChatGPT; không hướng dẫn sửa trực tiếp file OneDrive làm luồng chuẩn |
| GJ19, biên bản FCP–AMCOLAB19/11 | §14 ảnh/video | OneDrive không phải nơi lưu media bắt buộc; đây là biên bản đối chiếu, không tự chứng minh chấp thuận thương mại hoặc dịch vụ miễn phí |
| UI-M20, lập20/11 | PDF p27 M-21; p20/p25 | Đề nghị ảnh chân dung/URL Adesso; chưa chốt bắt buộc hoặc nơi lưu. Đa category và phạm vi chỉ thị còn No.99; không coi folder category là hàng rào quyền Manager |
| KS hiện hành | `確認事項!K73`; `20261120!F18/F19` | Autopost chọn media theo chủ đề, không FIFO hoặc tự sinh media AI. Lưu media không đồng nghĩa cho phép tạo video có phí |
| KS hiện hành; QA | `確認事項!F38`; ISS22-P p6; QA No.69/94/98 | Đồng ý phụ huynh: KS không lưu trong app, báo cáo22/11 đề nghị khác; chưa tạo kho file. Retention/office/công nợ còn phần mở |

Nguồn gốc và hash: [catalog hiện hành](../TAI_LIEU_NGUON.md), [kiểm kê20tệp](../docs/requirement-review/source-inventory-current.json). Đối chiếu [QA/KS23/11](../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-23.md), [bộ23112026](../docs/requirement-review/corrections-2026-11-19/DELIVERY_23112026_REVIEW.md) và [tác động DB](../database-design/06_extensibility_review.md). Không mở gate hoặc tạo Q&A mới từ tài liệu này.

## 3. Bảng phân loại file và dữ liệu

Cột nơi lưu là **phương án đích đề xuất**. Dấu “không mặc định” nghĩa là không tự sinh bản sao; chuyển nơi lưu cần operation có kiểm chứng.

| File/dữ liệu | Nơi lưu chính đề xuất | Bản sao hoặc bản xuất | Quyền ghi và căn cứ |
|---|---|---|---|
| `プロフィール.md`: hồ sơ, định hướng, sở thích/sở trường, mục tiêu tương lai | OneDrive theo Talent | Cache/context snapshot có version ở backend; không làm nguồn gốc thứ hai | Manager qua quản trị/MCP đã kiểm quyền/version; YK2 §7-2, BF19 p18 |
| `共通/ノウハウ.md` | OneDrive dùng chung | AI đọc đúng phiên bản | Manager qua service; template nội bộ dựa trên YK2 §7-1/§7-5 |
| `共通/アルゴリズム対策.md` | OneDrive dùng chung | Không lưu secret/API key trong nội dung | Manager qua service; lịch/mẹo là dữ liệu chỉ thị, không thay policy code |
| `共通/AIへの指示.md`, chỉ thị theo Talent/category | OneDrive | DB chỉ giữ metadata/version/phạm vi khi được thiết kế | Màn chỉ thị/MCP; thứ tự Talent > category > toàn bộ; No.92/99 còn phần xung đột |
| `AIメモ.md`: điều AI học được | OneDrive theo Talent | Context dùng đúng revision | Worker được phép, kiểm xung đột; không tự ghi nguyên hội thoại hoặc suy đoán thành fact |
| `目標.md` | Bản xuất ở OneDrive | **Bản gốc có cấu trúc là Postgres** `follower_goals` | Worker xuất sau khi luồng được mở; sửa file không nhập ngược DB. Mục tiêu follower khác mục tiêu tương lai trong profile |
| `実績/サマリー.md`, `<YYYY-MM>.csv` | Bản xuất ở OneDrive | **Bản gốc là Postgres** snapshots/kết quả bài | Worker xuất, có thời điểm/account/source; không dựng số0 cho metric thiếu. Bảng nguồn còn chặn ghi thì chưa bật luồng thật |
| Ảnh/video Talent hoặc Manager tải lên để tạo/đăng bài | **Supabase Storage private**, bản gốc media | OneDrive chỉ khi chọn chính sách archive hoặc có tài sản cũ tại đó | Backend kiểm owner, kiểu/dung lượng; QA No.8 cho phép cả hai. Phạm vi Manager gửi thay đối chiếu KS F20, không tự áp quy tắc office-only cũ |
| Video AI đã được người dùng chọn lưu | **Supabase Storage private** sau khi tải từ provider và kiểm tra | Không mặc định chép OneDrive | Kết quả thuộc Talent, gắn generation/asset; tạo video/thu phí còn phạm vi riêng. Không dùng URL provider làm bản gốc lâu dài |
| Kết quả AI chưa chọn hoặc lần tạo lỗi | Staging có vòng đời riêng nếu thực sự cần giữ byte | Không tự archive | Phải giữ bằng chứng usage/provider cần thiết; xóa byte không đồng nghĩa hoàn tiền hoặc xóa lượt đã tính |
| Thumbnail/preview, ảnh tối ưu, bản encode dành cho SNS | Supabase Storage private nếu tác vụ này được triển khai | Dẫn xuất từ asset/version gốc; không mặc định OneDrive | Worker có phép; lưu quan hệ nguồn, không sửa byte của bản đã được xác nhận |
| Ảnh chân dung M-21 | Supabase Storage private **nếu chốt chức năng** | OneDrive không mặc định | UI-M20 p27 mới là đề nghị; chưa tự bắt buộc upload hoặc công khai ảnh |
| URL profile Adesso | Trường tham chiếu trong metadata/hồ sơ theo thiết kế | Không tải web/PDF/ảnh từ URL về kho tự động | URL là liên kết, không là file hoặc quyền crawl. Không để model tự fetch URL người dùng nhập |
| `添付/`: tài liệu Manager cung cấp | OneDrive **khi có use case/định dạng được duyệt** | Không tự sao Storage | Folder lịch sử không chứng minh ứng dụng chấp nhận mọi PDF/Office/ZIP. Không quét cả drive vào context |
| Hội thoại, chủ đề, caption/hashtag, lịch, duyệt, thông báo, hóa đơn/usage/audit | Supabase Postgres, theo schema/phạm vi | Chỉ xuất mục được chỉ định như mục tiêu/số liệu; không tự xuất toàn bộ OneDrive | Dữ liệu nghiệp vụ, không lưu như file JSON thay thiết kế DB. Bảng có sẵn không đồng nghĩa đã được mở dùng |
| Mật khẩu, token, secret, credential Microsoft/SNS | Auth/kho bí mật; token delegated demo mã hóa trong `app_private` hiện có | Không OneDrive hoặc Storage | Không đưa vào file context, job, log hoặc FE; bản demo không tự quyết cơ chế token production |
| Icon PWA, font, ảnh tĩnh giao diện, source code và tài liệu repository | Git/build artifact/web static theo dự án | Không tự upload OneDrive/Storage | Không nhầm `source_requiments/` hoặc `agent_spec/` với nội dung khách cần đưa vào runtime |
| Bản sao lưu DB, log vận hành, Redis AOF | Hạ tầng backup/log riêng, ngoài vòng đời asset Talent | Không dùng cây OneDrive nghiệp vụ thay backup | Có quyền và retention vận hành riêng; không tự xuất dữ liệu nhạy cảm vào drive dùng chung |

**Tóm tắt quyết định kỹ thuật:** tài liệu AI ở OneDrive; media mới ở Supabase Storage; metadata và giao dịch ở Postgres. Media cũ trên OneDrive vẫn dùng được qua adapter theo asset registry, chưa có lệnh tự chuyển toàn bộ kho. Với mỗi asset/version phải biết nơi lưu chính; bản archive/delivery copy có vai trò riêng, không có hai nguồn gốc cùng ghi.

## 4. Kiến trúc và trách nhiệm thành phần

PWA/Manager gọi Hono BE để kiểm danh tính, quyền và asset/Talent đích. BE gọi service lưu trữ chung; worker xử lý chuyển file, tạo preview, xuất tài liệu và đối soát. API và worker dùng cùng adapter nhưng có entrypoint/credential theo vai trò, theo [AI Core bản2.2](AI_Talent_OS_AI_Core_Architecture_Report_v2.md).

| Thành phần | Trách nhiệm | Không được mặc định |
|---|---|---|
| OneDrive adapter/Graph | Đọc/ghi tài liệu; thao tác media tại drive được cấu hình; kiểm eTag/version | Model trực tiếp gọi Graph hoặc chọn drive/item tùy ý |
| Supabase Storage adapter | Byte media private, upload/download và cấp quyền URL có hạn | Public bucket hoặc service key trên trình duyệt |
| Asset/document registry trong DB | Owner, mục đích, location/version, trạng thái và quan hệ với bài/job | Đường dẫn tự chứng minh chủ sở hữu; URL là khóa chính |
| Outbox/BullMQ worker | Thực hiện tác động ngoài, replay/đối soát và cleanup | Redis/job payload giữ byte/token hoặc chứng minh file đã lưu xong |
| AI context builder | Đọc tập tài liệu được phép, đúng Talent/revision, giới hạn dung lượng | Đọc toàn bộ OneDrive; nội dung file ghi đè quyền/policy hệ thống |

Không thêm backend lưu trữ riêng hoặc giữ kho media lâu dài trên VPS. Luồng file lớn phải stream/chia phần, không nạp cả video vào RAM. Cách upload qua BE hay trực tiếp bằng quyền upload có hạn được review theo §6; chưa sửa quy ước API/frontend bằng tài liệu này.

## 5. Cấu trúc định danh và thư mục

### 5.1. OneDrive

Tái sử dụng cây ở [hướng dẫn OneDrive §2](onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md#2-cấu-trúc-thư-mục), không tạo cây chuẩn thứ hai:

```text
AI育成OS_<environment>/
  共通/
    ノウハウ.md
    アルゴリズム対策.md
    AIへの指示.md
  タレント/
    <talent_uuid>_<display_name>/
      プロフィール.md
      AIメモ.md
      目標.md
      実績/
        サマリー.md
        <YYYY-MM>.csv
      素材/
        originals/<YYYY>/<MM>/<asset_uuid>.<ext>
        AI生成/<YYYY>/<MM>/<asset_uuid>.<ext>
      添付/
```

`素材/` chỉ có byte khi asset chọn OneDrive hoặc cần archive; không bắt mọi media Supabase có bản sao tại đây. UUID là định danh ổn định, tên hiển thị chỉ để đọc; Graph sử dụng cặp `drive_id + item_id`. Folder mới không thay ownership trong DB. Category instruction cần mapping category UUID tới document, đường dẫn mở rộng cây phải thiết kế trong cùng bộ OneDrive; chưa coi là folder đã tồn tại hoặc tự tạo thêm tenant/organization model.

Profile template cũ là ví dụ nội bộ, không phải hợp đồng file khách đã duyệt. Manifest/context revision là metadata kỹ thuật theo AI Core §6, không mặc định thêm một file nghiệp vụ phải hiện cho Manager.

### 5.2. Supabase Storage

Tên bucket/key dưới đây là **đề xuất**, chưa có bucket thật:

```text
<project của đúng môi trường>
  talent-media/                            # private, media được dùng
    talents/<talent_uuid>/assets/<asset_uuid>/v<version>/original.<ext>
    talents/<talent_uuid>/assets/<asset_uuid>/v<version>/preview.<ext>
  talent-staging/                          # private, upload/kết quả chưa hoàn tất
    operations/<operation_uuid>/<upload_uuid>.<ext>
```

Ưu tiên project demo/prod tách riêng; prefix môi trường hoặc UUID không phải cơ chế phân quyền. Không đưa email/tên/ngày sinh vào object key. Không overwrite object của version đã dùng để duyệt/đăng: thay đổi tạo version/key mới, còn việc có cho sửa bài hay không theo nghiệp vụ. Mỗi object staging phải gắn upload intent có owner trước khi cấp quyền ghi; bucket staging không tự là vùng đã kiểm an toàn.

## 6. Luồng upload, sử dụng và chuyển nơi lưu

### 6.1. Nhận ảnh/video mới vào Supabase

1. BE xác minh phiên, Talent đích và quyền thao tác; tạo upload intent/operation idempotent, sinh object key ở server. Không nhận bucket/path/owner tùy ý từ FE hoặc model.
2. Demo có thể stream qua BE để giữ cùng điểm kiểm quyền. Khi dùng direct/resumable upload để giảm tải VPS, BE chỉ cấp quyền ghi đúng path cho upload intent; phải thiết kế Storage policy/ticket, expiry, CORS và kiểm sử dụng lại. Không cho FE truy cập DB hoặc nhận secret key. TUS là khả năng của Supabase, chưa phải tích hợp đã có trong dự án. [Resumable uploads](https://supabase.com/docs/guides/storage/uploads/resumable-uploads).
3. Upload vào staging; BE/worker kiểm file thực tế: size, MIME/magic bytes, hash, định dạng cho use case, nguy cơ tệp nguy hiểm theo chính sách triển khai. Không tin Content-Type/client báo hoàn tất. Giới hạn300MB trong demo OneDrive không tự là giới hạn khách đã chốt.
4. Lưu byte vào key/version đích, kiểm tồn tại/size và checksum do hệ thống tính. Commit asset ready và operation trong DB sau khi xác minh; không suy tính nguyên tử giữa Storage và DB.
5. Nếu Storage thành công mà DB lỗi, reconciler đối chiếu intent/key/hash rồi hoàn tất hoặc dọn orphan sau khoảng chờ có chính sách. Không xóa ngay để tránh đua với request/job chưa commit.

Cơ chế copy/promote và kiểm hash phải được thiết kế cho cả file lớn; không đồng nhất Graph eTag với SHA-256. Asset chưa ready không dùng cho AI/provider hoặc hiển thị như file hợp lệ.

### 6.2. OneDrive và cập nhật hồ sơ

Manager cập nhật qua màn quản trị/MCP → service kiểm quyền và revision → ghi OneDrive có điều kiện phù hợp API → ghi metadata/audit, làm mất hiệu lực cache theo revision. Nếu Graph đã ghi nhưng DB chưa ghi nhận, operation giữ nhánh cần đối soát theo item/version/hash, không ghi đè lại mù. Xung đột phải trả Manager kiểm lại.

Một eTag mỗi file không bảo đảm nhiều file nhất quán. Context builder dùng revision/manifest đã công bố chứa đủ phiên bản; thiếu file hoặc revision đổi thì đọc lại có giới hạn/hoãn. Demo một tài liệu có version được chấp nhận ở mức kỹ thuật, không giả lập hoàn tất đồng bộ nhiều file. [Microsoft upload session và điều kiện If-Match](https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession?view=graph-rest-1.0).

Không khuyến khích Manager sửa file trực tiếp trên OneDrive. Nếu xảy ra thay đổi ngoài ứng dụng: phát hiện drift, đối soát và review trước dùng; không tự coi phiên bản ngoài là đã được duyệt. Bản xuất mục tiêu/số liệu chỉ có chiều DB → OneDrive.

### 6.3. Đưa media cho Upload-Post hoặc dịch vụ tạo video

Worker kiểm lại quyền, trạng thái, asset version và mục đích dùng trước khi cấp URL. Supabase private có thể cung cấp signed URL có thời hạn; thời hạn phải bao phủ lúc provider thực sự tải, kể cả queue wait và retry tải, không chỉ lúc gửi request. Provider giữ URL tới ngày hẹn hay tải ngay là điều phải kiểm thực tế; chưa đặt cố định5phút/7ngày. [Supabase signed URL](https://supabase.com/docs/reference/javascript/storage-from-createsignedurl).

Signed URL là quyền truy cập có thể chuyển tiếp: không log hoặc lưu vào context; không hứa đổi quyền DB sẽ thu hồi ngay URL đã cấp hoặc byte provider đã tải. Không cấp URL quá sớm cho lịch xa; cấp tại bước provider ingest khi hợp đồng cho phép. Nếu provider cần URL tồn tại dài hơn chính sách, phải giải quyết hợp đồng delivery trước mở luồng, không tự public bucket.

Media chỉ trên OneDrive: BE đọc qua Graph sau kiểm quyền; nếu provider không thể dùng cách truy cập đó, tạo delivery copy private trên Supabase có owner/version/hash và vòng đời tham chiếu riêng. Copy không đổi nguồn chính của asset. Graph `/content` chuyển hướng tới URL đã được cấp quyền, tồn tại ngắn; không lưu URL đó làm tham chiếu ổn định hoặc gửi trước cho một lịch xa. [Microsoft tải nội dung](https://learn.microsoft.com/en-us/graph/api/driveitem-get-content?view=graph-rest-1.0).

### 6.4. Archive hoặc chuyển OneDrive ↔ Supabase

Đây là operation có chủ đích, không đồng bộ hai chiều mặc định: khóa asset/version cần chuyển → đọc/ghi byte → kiểm nội dung → ghi location/copy đã xác minh → chỉ đổi nơi lưu chính khi đủ điều kiện. Nguồn cũ chỉ dọn khi không còn lịch/job/preview/đối soát cần nó và chính sách cho phép. Retry dùng cùng operation/key, không tạo thêm file theo tên ngẫu nhiên mỗi lần.

OneDrive hoặc Supabase lỗi không làm hệ thống âm thầm chuyển nơi lưu và lộ file qua đường khác. Có thể tiếp tục chức năng không phụ thuộc kho lỗi; tác vụ thiếu dữ liệu phải hiện trạng thái chờ/lỗi.

## 7. Metadata và ranh giới database

Hiện schema có `talents.onedrive_folder_id`, `media_assets.onedrive_item_id`, `media_assets.temp_object_path`; mô hình còn thiên OneDrive. `temp_object_path` không tự thành tham chiếu Storage lâu dài đúng nghĩa. Chưa có đủ registry version/copy/integrity/lifecycle và quyền cho luồng đích. Xem [DB P-24 và các đề xuất](../database-design/04_database_schema.md).

Thiết kế cần biểu diễn về mặt logic: asset/document ID, owner/purpose, nơi lưu và ref chính xác, version/hash/size/MIME, trạng thái xác minh, nguồn/các dẫn xuất, bản copy, operation/provider reference và các tham chiếu đang giữ file. Đây là nhu cầu dữ liệu, **không phải tên cột/bảng hoặc DDL đã quyết định**. Không tự thêm `app_private.onedrive_items` hoặc bỏ trigger chặn ghi từ ví dụ cũ. Thiết kế/migration/quyền phải được giao và review riêng.

Postgres là nguồn sự thật cho quyền và trạng thái; OneDrive là nguồn byte tài liệu AI; Supabase Storage là nguồn byte media theo phương án này. Redis không phải asset registry. Không chép hội thoại/caption đầy đủ vào nhiều file/bảng để né thiết kế dữ liệu; không tạo kho vector hoặc lưu embedding mọi tài liệu khi chưa có use case.

## 8. Quyền truy cập và xác thực kho

- Talent chỉ lấy file của mình qua quyết định quyền từ BE. Manager có quyền nghiệp vụ theo nguồn; assignment thông báo không tự khóa quyền xem mọi Talent. Worker/AI chỉ đọc đúng tập file cho tác vụ, không chấp nhận đường dẫn/URL tùy ý.
- Bucket private, kiểm ownership ở service trước thao tác. Nếu có truy cập Storage trực tiếp bằng JWT thì phải có policy `storage.objects` đúng owner/intent; quyền Postgres `talent_runtime` hiện có không tự trở thành quyền Storage. Backend dùng secret Storage sẽ có khả năng vượt RLS: phải giữ kiểm quyền ứng dụng và credential riêng, không đưa xuống FE. [Storage access control](https://supabase.com/docs/guides/storage/security/access-control), [private/public bucket](https://supabase.com/docs/guides/storage/buckets/fundamentals).
- Tài liệu nguồn AI có thể chứa prompt injection: coi là dữ liệu, không là quyền gọi tool. Không tự mở attachment/URL ngoài allowlist hoặc cho nội dung file yêu cầu đọc Talent khác.
- Demo OneDrive hiện dùng delegated OAuth/PKCE, token mã hóa trong `app_private.tech_demo_onedrive_connections`; đây là FACT code, không tự quyết auth production. Production ưu tiên đánh giá application permissions giới hạn tài nguyên khi tenant đáp ứng; Selected permissions còn cần consent và cấp quyền đúng tài nguyên, không chỉ khai scope. [Selected permissions](https://learn.microsoft.com/en-us/graph/permissions-selected-overview).
- Hướng dẫn cũ chọn ROPC nội bộ. Tài liệu này không tái xác nhận ROPC hoặc yêu cầu tắt MFA: Microsoft không khuyến nghị ROPC vì không tương thích MFA. Chọn auth phải kiểm tenant, license và vận hành; không tự đổi mode hoặc drive. [Microsoft ROPC](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth-ropc).

## 9. Vòng đời, retention và chi phí

| Loại | Nguyên tắc dọn |
|---|---|
| Upload dở, file staging/orphan | Dọn khi intent hết hạn và đã đối soát không còn tác vụ dùng; thời hạn cấu hình nội bộ còn cần thiết kế, không coi7ngày là quyết định khách |
| Media gốc ở Supabase | Là tài sản lâu dài theo chính sách sử dụng, **không xóa chỉ vì bài cuối đã đăng**; có thể được tái sử dụng ở khoảng đăng khác |
| Delivery copy/preview | Chỉ dọn khi không còn tham chiếu đang chạy, lịch/provider chưa tải hoặc nhánh cần đối soát; có thể cần tạo lại từ nguồn |
| File tài liệu AI/version | Giữ theo chính sách lịch sử và context cần truy vết; không dọn revision mà execution/chứng cứ còn tham chiếu |
| Talent ended | KS 確認55/56 có hướng giữ6tháng rồi xóa, không khôi phục ended; phạm vi xóa No.69, office No.94, công nợ No.98 còn mở. Không tự bật purge hoặc thay xóa bằng ẩn danh |
| OneDrive recycle bin, bản sao/backup và provider | Xóa file ứng dụng không chứng minh mọi bản sao đã biến mất; phải đối chiếu chính sách kho/tenant và hợp đồng provider trước cam kết không thể khôi phục |

Một deletion operation ghi từng bước và kết quả để chạy lại an toàn; thu hồi quyền cấp URL mới trước dọn, bảo toàn log/chứng cứ theo chính sách. Một thao tác xóa không được bỏ qua FK/log append-only hoặc tự xóa thư mục gốc.

Đo riêng dung lượng tài liệu/media/copy, storage egress, request, Redis/log/VPS và giới hạn Microsoft. GJ19 nói ưu tiên không phát sinh phí không chứng minh Supabase hoặc OneDrive miễn phí. Không lưu kép mặc định để tránh nhân dung lượng và làm phức tạp retention. Archive không thay backup đã thử khôi phục.

## 10. Hiện trạng, triển khai demo và điểm cần review

**Hiện có:** Graph adapter và demo OneDrive; route upload stream thẳng tới Graph, bỏ qua Supabase Storage; thư mục demo chưa gắn Talent nghiệp vụ trong DB. Demo có giới hạn media300MB và item scoping riêng. `routes.ts` còn comment mô tả pipeline chuyển tất cả sang OneDrive; đó không phải chính sách mới đã triển khai. Chưa có luồng Storage media, registry/location và worker đồng bộ theo tài liệu này.

**Demo đề xuất:** giữ nguyên demo OneDrive để kiểm đọc/ghi một hồ sơ có version; bổ sung media private Supabase theo tác vụ riêng sau review auth/registry; hiển thị rõ nguồn dữ liệu. Chưa tự migrate file demo hoặc mở video trả phí, autopost/MCP write. Một VPS chỉ điều phối/stream, không giữ file trong RAM hoặc ổ local làm nguồn chính. Build/deploy và phục hồi theo AI Core §11.

| Việc cần review trước triển khai | Chủ xử lý |
|---|---|
| Chấp nhận phương án media mới mặc định Supabase; nhu cầu archive OneDrive, quota và chi phí | Tech Lead/ops đề xuất; bên có thẩm quyền duyệt phạm vi/chi phí, không suy từ nguồn cho phép cả hai |
| Auth Graph, tenant/drive/root, quyền và token rotation | Team với IT/tenant admin; không yêu cầu khách tự thiết kế API |
| Registry/version/ACL, upload intent, outbox/reconcile | Team thiết kế DB/service; không dùng schema cũ như bằng chứng đã đủ |
| Provider tải URL khi nào, signed URL còn hiệu lực bao lâu, lưu kết quả bao lâu | Team/provider kiểm tài khoản thật |
| Retention, phạm vi xóa và dữ liệu nhạy cảm | Tiếp tục QA No.69/94/98 và finding hiện có; không tạo câu hỏi trùng hoặc lưu consent phụ huynh trước quyết định |

Trước báo hoàn tất: kiểm truy cập chéo Talent, URL/ticket hết hạn, upload dở/file giả, Graph412/429, Storage đầy, file bị sửa/xóa ngoài app, copy thành công nhưng DB lỗi, worker chết, replay trùng, dọn file đang có lịch, context nhiều revision và xóa dang dở. Đây là tiêu chí chưa chạy, không là kết quả test hoặc independent review.

## 11. Quan hệ với tài liệu khác và hồ sơ lần soạn

[Hướng dẫn OneDrive cũ](onedrive-agent-spec/HUONG_DAN_TICH_HOP_VI.md) và [ca kiểm thử](onedrive-agent-spec/CA_KIEM_THU_VI.md) giữ làm tham chiếu adapter/lịch sử. Các phần Supabase chỉ tạm, bắt chuyển toàn bộ media, xóa sau7ngày, sửa trực tiếp OneDrive và ROPC mặc định không được sao chép vào triển khai mới khi chưa đối chiếu tài liệu này và nguồn hiện hành. Tài liệu mới không tự phê duyệt thiết kế, migration hoặc thay mọi nội dung kỹ thuật cũ.

Đọc kèm [AI Core](AI_Talent_OS_AI_Core_Architecture_Report_v2.md), [tech stack](TECH_STACK_VA_CAU_TRUC_DU_AN.md), [DB scope](../database-design/07_implementation_scope_and_rules.md), [MCP](chatgpt-mcp-spec/README.md). Không tạo một bộ biến môi trường/cây thư mục/schema cạnh tranh với các bộ này.

Soạn23/11/2026 bởi Codex theo yêu cầu người dùng; dùng skill requirement-review và supabase. Đã đọc QA No.8 G9/H9, bộ OneDrive/code và các căn cứ liên kết; tham chiếu chính thức Microsoft/Supabase kiểm23/11. Đã đọc [changelog Supabase](https://supabase.com/changelog.md) để đối chiếu thay đổi gần đây; không kết luận tương thích mọi phiên bản hoặc đã kiểm cấu hình project. Không truy cập tenant/project live, tạo bucket, chạy migration hoặc đổi code. Chưa có reviewer độc lập/VERIFIED, không đổi G1–G8 hoặc phê duyệt thương mại/release. Các đề xuất còn mở được nêu ở §10.
