# Ma trận tình huống kiểm thử OneDrive

Tổng 117 tình huống. Tất cả chưa chạy trên sản phẩm. Dữ liệu chi tiết máy đọc được ở TEST_CASES.json.

## BINDING

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| BINDING-01 | Chưa cấu hình kho Microsoft → Khởi chạy worker | Blocked, không đoán drive hoặc dùng /me; Không gọi mutation tới drive chưa bind |
| BINDING-02 | App-only có tenant/token đúng → Gọi GET mapped item | Đọc đúng tenant/drive; Token audience Graph, không JWT Supabase |
| BINDING-03 | Consent Selected có nhưng chưa resource grant → Đọc/tạo file | 403 được phân loại permission missing; Không tự nâng lên Files.ReadWrite.All |
| BINDING-04 | Chỉ folder permission, không root delta → Thử delta trong POC | Fallback bounded scan được phép; Không quét hoặc mở quyền ngoài scope |
| BINDING-05 | Một API GET được nhưng upload không được → POC đủ endpoint | Không đánh dấu toàn bộ permission pass; Kiểm tra create/content/upload/list riêng |
| BINDING-06 | Token ứng dụng hết hạn → Graph 401 lần đầu | Acquire token có kiểm soát rồi thử theo policy; Không yêu cầu Talent đăng nhập Microsoft |
| BINDING-07 | 401 kéo dài → Worker chạy | Incident credential, không retry storm; Không phát token ra frontend |
| BINDING-08 | Môi trường staging → Binding trỏ production | Từ chối cấu hình hoặc chặn write; Không upload vào root production |
| BINDING-09 | Manager có app role nhưng không ACL Microsoft → Mở link nguồn trực tiếp | Báo quyền Microsoft thiếu, không share công khai; Không tự cấp quyền tenant |
| BINDING-10 | Runtime không có quyền grant → Agent cố tạo permission | Không cung cấp use case runtime này; Bootstrap admin tách riêng |

## PROVISION

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| PROVISION-01 | TalentStorageRequired hợp lệ → Enqueue provision | Intent/outbox cùng transaction; Một operation/Talent/generation |
| PROVISION-02 | Hai request cùng command → Tạo folder đồng thời | Một mapping canonical; Không rename tự tạo bản sao |
| PROVISION-03 | Graph đã tạo root, response mất → Restart worker | Đối soát đúng parent/evidence rồi nhận receipt; Không tạo root thứ hai |
| PROVISION-04 | Skeleton tạo dở → Worker crash | Resume các bước còn thiếu; Không recursive delete dữ liệu đã có |
| PROVISION-05 | Tên root đã tồn tại không có mapping → Ensure root | Quarantine, cần xác minh ownership; Không chiếm folder theo tên |
| PROVISION-06 | Đổi tên Talent → Update display name | Giữ root item ID; Không di chuyển/xóa folder theo tên người |
| PROVISION-07 | Root bị xóa bên Microsoft → Provision/reconcile | Blocked và incident; Không tạo mới và mất dấu dữ liệu cũ |
| PROVISION-08 | Profile skeleton trống → Build AI context | Missing_information, không fake readiness; Không tạo hồ sơ tưởng tượng |
| PROVISION-09 | Outbox enqueue thất bại → Transaction provision | Rollback intent hoặc outbox cùng nhau; Không có lệnh đã nhận mà mất job |
| PROVISION-10 | Folder role bị đổi tên → Scan | Role vẫn theo mapping hoặc quarantine; Không lấy tên làm quyền |

## ACL

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| ACL-01 | Talent A biết document ID B → GET nội dung | 403/404 không leak text/title; Không gọi Graph cho B |
| ACL-02 | Manager khác tổ chức → Read/write tài liệu | Bị từ chối; Không lộ binding drive ID qua error |
| ACL-03 | AI Coach A nhận prompt đọc B → Retrieval | Chỉ context của A và common được phép; Không search B |
| ACL-04 | Cache có nội dung A → Request của B cùng query | Không cache hit sai scope; Key gồm tenant/Talent/permission version |
| ACL-05 | Manager bị vô hiệu → MCP token chưa hết hạn gọi tool | Bị chặn theo trạng thái hiện hành; Không đợi JWT hết hạn mới revoke |
| ACL-06 | File bị thu hồi ACL → Cache/revision cũ còn | Chặn phục vụ nội dung bị thu hồi; Không dùng last-good để vượt revoke |
| ACL-07 | Item moved A sang B → Sync | Vô hiệu retrieval và quarantine; Không tự đổi owner theo folder name |
| ACL-08 | Shortcut ra ngoài root → Scan knowledge | Không follow như dữ liệu nội bộ; Không fetch ngoài allowlist scope |
| ACL-09 | Talent muốn tải media của mình → GET asset | Chỉ đúng asset scope, URL tải tạm hoặc stream; Không share cả folder kiến thức |
| ACL-10 | File exports nằm chung thư viện editable → Manager sửa file | Ghi drift, không coi README là ACL; Không giả tuyên bố permission chỉ đọc |

## IMPORT

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| IMPORT-01 | Folder có nhiều trang → List children | Đọc hết nextLink, không mất file; Không coi trang đầu là toàn bộ |
| IMPORT-02 | Một trang scan lỗi → Kết thúc lượt | Không tombstone item chưa thấy; Giữ checkpoint chưa hoàn tất |
| IMPORT-03 | File đổi etag → Import | Revision mới, checksum và parser version; Không sửa revision cũ |
| IMPORT-04 | File đổi giữa metadata và download → Read | Phát hiện etag không ổn định, đọc lại; Không gắn bytes B vào etag A |
| IMPORT-05 | Không có thay đổi → Poll | Không parse/build lại vô ích; Đọc metadata phù hợp |
| IMPORT-06 | Tên đổi nhưng ID giữ → Sync | Cập nhật path, giữ history; Không nhân bản document |
| IMPORT-07 | Copy tên giống canonical → Sync | Item mới/quarantine, không thay bản chính; Không match chỉ theo filename |
| IMPORT-08 | Mục 日付 trong プロフィール.md sai định dạng → Import | Quarantine revision, thông báo; không coi mục 日付 rỗng là hợp lệ |
| IMPORT-09 | DOCX chứa external relationship/macro → Parse | Không tải/chạy external code; Parser bị giới hạn quyền/tài nguyên |
| IMPORT-10 | PDF vượt giới hạn parse → Import | Báo unsupported/oversize; Không cắt im lặng hoặc OOM |
| IMPORT-11 | Scan thấy file ngoài role knowledge → Build input | Không nhập thành chỉ dẫn; Không dùng identity/exports làm system prompt |
| IMPORT-12 | Knowledge bị xóa hợp lệ → Sync | Invalidate context eligibility, giữ audit; Không xóa billing/post history |

## DELTA

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| DELTA-01 | Nhiều page delta → Xử lý nextLink | Idempotent staging, cursor cuối chỉ sau commit; Không dựng query token tùy ý |
| DELTA-02 | Crash sau page một → Resume | Không mất page hoặc double revision; Dùng staged checkpoint |
| DELTA-03 | Token invalid/resync required → Reconcile | Full scan scope, giữ last-good đến policy; Không purge DB đầu lượt |
| DELTA-04 | Cùng item nhiều lần delta → Apply | Bản mới nhất đã xác minh thắng; Không tạo write loop |
| DELTA-05 | Delta URL sai host/scheme → Follow continuation | Chặn và incident; Không attach token tới host lạ |
| DELTA-06 | Delete facet của folder cha → Apply nhiều thay đổi | Hoàn tất scope rồi xử lý descendants; Không xóa subtree DB trước khi biết đầy đủ |
| DELTA-07 | 403 khi quét → Reconcile | Permission incident, không mass delete; Không coi 403 là rỗng |
| DELTA-08 | Root delta không được Selected hỗ trợ → Reconcile | Fallback scoped polling; Không tự cấp quyền rộng |

## EXPORT

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| EXPORT-01 | Goal thay DB → Commit | Outbox và mutation cùng transaction; Không có mục tiêu đã đổi nhưng không có export intent |
| EXPORT-02 | Export version 2 đã xong, job v1 chạy muộn → Write | Không ghi đè bản mới; Fencing/CAS trước mutation |
| EXPORT-03 | Metric snapshot export timeout sau Graph nhận → Retry | Read-back/checksum, một file canonical; Không tạo file tên random thứ hai |
| EXPORT-04 | Manager sửa 目標.md → Import | Không sửa mục tiêu DB; drift và phục hồi theo policy |
| EXPORT-05 | AI ghi AIメモ.md khi Manager vừa sửa → Ghi có điều kiện eTag | Phát hiện xung đột, đọc lại rồi ghi; không đè mất phần Manager sửa |
| EXPORT-06 | App vừa xuất file, delta báo lại → Sync | Nhận diện hash/source version; Không phát outbox cùng version vòng lặp |
| EXPORT-07 | Manager sửa knowledge ngay sau app write → Sync | Nhập thay đổi thật; Không bỏ qua mọi event gần timestamp app |
| EXPORT-08 | DB commit rồi OneDrive down → Export | DB đúng, projection pending; Không rollback số liệu thật |
| EXPORT-09 | OneDrive file sensitivity label → App-only write | Xử lý hạn chế và báo rõ; Không bỏ label để ghi |

## CONFLICT

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| CONFLICT-01 | Expected etag hiện hành → Confirmed write | Chỉ bytes đã xác nhận được ghi; Conditional write theo POC |
| CONFLICT-02 | Etag đổi trước write → Graph 412 | Conflict, cần đề xuất/approval mới; Không overwrite retry |
| CONFLICT-03 | Edit cạnh tranh trong lúc upload → POC race | Không mất thay đổi hoặc write feature blocked; Không giả DB lease bảo vệ remote edit |
| CONFLICT-04 | Write thành công, response mất → Read back | Receipt theo hash và evidence; Không nhầm remote edit mới là write của mình |
| CONFLICT-05 | Read-back không khớp hash → Finalize | Unknown/conflict, không báo đã lưu; Không công bố projection sai |
| CONFLICT-06 | Cùng commandId khác payload → Commit | 409 idempotency conflict; Không tạo operation mới bằng cùng ID |
| CONFLICT-07 | Worker crash sau remote write trước DB → Resume | Đối soát trước mutation; Không blind replay |
| CONFLICT-08 | Hai Manager sửa cùng tài liệu → Commit đồng thời | Một CAS hoặc conflict rõ; Không last-write-wins vô điều kiện |

## MEDIA

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| MEDIA-01 | Upload request từ Talent hợp lệ → Start upload | Đích do server map đúng Talent; Không nhận parent/drive tùy ý từ client |
| MEDIA-02 | Client gọi complete giả → Verify | Asset không ready nếu bytes chưa tồn tại; GET item xác minh |
| MEDIA-03 | Size/hash/MIME không đúng → Verify | Quarantine, không đăng bài; Không tin metadata client |
| MEDIA-04 | Mất mạng giữa chunk → Resume | Đọc nextExpectedRanges; Không đoán offset làm hỏng file |
| MEDIA-05 | Chunk không đúng bội số → Adapter validation | Bị chặn trước HTTP nếu không chunk cuối; Theo contract 320 KiB |
| MEDIA-06 | Upload session hết hạn → Khôi phục | Đối soát item rồi tạo session mới nếu cần; Không sinh asset mới tùy ý |
| MEDIA-07 | Streaming video lớn → Upload/verify | Bộ nhớ bị giới hạn, lease heartbeat; Không buffer toàn file |
| MEDIA-08 | Browser PUT có Graph Authorization → Contract test | Không gửi header này tới uploadUrl; Không leak bearer |
| MEDIA-09 | PWA không đạt CORS upload → POC iOS/Android | Fallback worker/staging được duyệt; Không proxy video lớn vô hạn qua Vercel |
| MEDIA-10 | Media đổi sau khi bài được duyệt → Resolve publish media | Hash conflict, chặn gửi; Không đăng bytes chưa duyệt |
| MEDIA-11 | Download redirect sang host không hợp lệ → Fetch | Chặn theo chính sách host/protocol; Không forward Graph token |
| MEDIA-12 | OneDrive media bị xóa sau provider đã nhận lịch → Reconcile | Asset unavailable; lịch là nghiệp vụ riêng; Không giả đã hủy Upload-Post |

## WEBHOOK

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| WEBHOOK-01 | Microsoft challenge → Nhận validationToken | Trả plain text đúng token; Không JSON serialize token |
| WEBHOOK-02 | ClientState sai → Nhận notification | Từ chối theo policy, không enqueue tin tưởng; Không đọc body thành tài liệu |
| WEBHOOK-03 | Subscription đúng, notification trùng → Nhận burst | Debounce dirty scope; Không full scan một lần mỗi event |
| WEBHOOK-04 | Notification sai thứ tự → Worker reconcile | GET/delta xác minh trạng thái; Không áp payload thành dữ liệu chính |
| WEBHOOK-05 | DB enqueue lỗi → Webhook | Không ACK mất dữ liệu; Retry/polling bù |
| WEBHOOK-06 | Subscription sắp hết hạn → Renew job | Gia hạn theo expiry trả về; Không hardcode vĩnh viễn |
| WEBHOOK-07 | Subscription hết hạn, mất event → Phục hồi | Resubscribe + reconciliation; Không coi không event là không thay đổi |
| WEBHOOK-08 | Muốn subscribe folder Talent trong Business → Config | Chặn giả định unsupported; POC root scope và quyền |

## CONTEXT

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| CONTEXT-01 | Knowledge hợp lệ Talent A và common → Build snapshot | Manifest có revision IDs đúng scope; Không trộn Talent B |
| CONTEXT-02 | File đổi khi snapshot đã ready → AI run | Tiếp tục dùng revision chốt hoặc rebuild có version mới; Không đọc live latest giữa chừng |
| CONTEXT-03 | Hồ sơ rỗng/không có nguồn → AI run | Needs information, không bịa; Không gọi model với hồ sơ giả |
| CONTEXT-04 | Network lỗi nhưng có last-good trong TTL → AI run | Fallback được ghi freshness nếu policy cho; Không ghi captured_at giả |
| CONTEXT-05 | Nguồn bị revoke/delete → AI run | Không dùng cached context bị thu hồi; Fail closed |
| CONTEXT-06 | Một Talent lỗi trong batch100 → Batch | Talent khác tiếp tục; Không barrier toàn đợt vì một file |
| CONTEXT-07 | Knowledge có prompt injection đọc B → Build/retrieval | Dữ liệu không đổi policy/ACL; Không gọi thêm tool ngoài quyền |
| CONTEXT-08 | Parser version đổi → Reparse | Revision parse mới truy vết nguồn; Không sửa lịch sử snapshot |

## MCP

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| MCP-01 | MCP chưa được chốt → Triển khai mặc định | Không bật server ghi production; Không giả app Microsoft có quyền ghi |
| MCP-02 | OAuth token sai issuer/audience → Tool request | Từ chối trước truy xuất; Không dùng Graph token làm token MCP |
| MCP-03 | Manager revoked token vẫn còn hạn → Tool request | Kiểm tra trạng thái, từ chối; Không chỉ validate chữ ký |
| MCP-04 | Project đặt tên Talent A nhưng input B → Fetch | Server policy quyết định; không tin tên Project; Không lấy project title làm scope |
| MCP-05 | Search trùng từ khóa giữa hai Talent → Search trong scope | Không leak title/snippet/tổng số ngoài quyền; Lọc trước retrieval |
| MCP-06 | Document ID giả/ngoài scope → Fetch | 403/404 không lộ nội dung; Không fallback path lookup |
| MCP-07 | Manager yêu cầu ghi → Prepare | Chỉ proposal/diff, chưa Graph write; Không coi lời model là approval |
| MCP-08 | Model tự gọi commit khi chưa xác nhận → Commit | CONTENT_NOT_APPROVED; Không HTTP mutation Graph |
| MCP-09 | Hash nội dung đổi sau approval → Commit | Conflict/cần duyệt lại; Không ghi nội dung khác diff |
| MCP-10 | Approval hết hạn → Commit | 410, không ghi; Không gia hạn tự động bởi model |
| MCP-11 | Hai lần commit cùng proposal → Commit | Một operation, cùng receipt; Không tạo version trùng |
| MCP-12 | Write trả202 pending → ChatGPT trả lời | Nói đang xử lý, không nói đã lưu; Chờ receipt xác minh |
| MCP-13 | Chỉ bật connector read-only → Kiểm thử chức năng ghi | Không đánh dấu REQ ghi đã hoàn thành; POC write hoặc chọn MCP |
| MCP-14 | Công cụ nhận Graph URL/path tùy ý → Input validation | Không có tool loại này; Không mở proxy Graph tổng quát |

## LIFECYCLE

| Mã | Tiền điều kiện / thao tác | Kết quả bắt buộc |
|---|---|---|
| LIFECYCLE-01 | Manager nghỉ việc → Revoke | App/MCP chặn; tác vụ ACL Microsoft riêng; Không giả revoke app xóa quyền M365 |
| LIFECYCLE-02 | Talent rời hệ thống → Chạy job cũ | Chặn context/write mới theo policy; Không xóa folder tự động |
| LIFECYCLE-03 | Retention chưa quyết định → Cleanup | Không xóa hàng loạt; Có dry-run và phê duyệt |
| LIFECYCLE-04 | Graph DELETE soft delete → Retention report | Không báo đã xóa vĩnh viễn mọi bản sao; Kiểm tra recycle/backup/ChatGPT copies |
| LIFECYCLE-05 | 429 Retry-After → Worker chạy | Backoff theo header, limiter chung; Không retry storm 100 Talent |
| LIFECYCLE-06 | Worker disk đầy → Media jobs | Dừng nhận mới/cleanup theo operation; Không xóa source OneDrive |
| LIFECYCLE-07 | Raw payload chứa URL/token → Logging | Sanitize, giới hạn quyền evidence; Không secret trong zip/log |
| LIFECYCLE-08 | Queue schemaVersion lạ → Consumer | Quarantine, không bỏ message; Không xử lý theo schema cũ mù |
