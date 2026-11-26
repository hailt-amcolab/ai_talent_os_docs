> **Căn cứ nghiệp vụ cập nhật26/11:** [Q&A đã trả lời và phần còn mở](../docs/requirement-review/corrections-2026-11-19/QA_KS_UPDATE_2026-11-26.md). Chỉ cập nhật tài liệu; trạng thái triển khai/DDL và các trigger chặn ghi giữ theo bằng chứng kỹ thuật hiện có. Không coi trả lời nghiệp vụ là phê duyệt schema hoặc mở ghi.

# 09. Thiết kế kỹ thuật dữ liệu cho các miền cần hoàn thiện

Phiên bản 1.0 · 25/11/2026 · Tác giả: Codex · **PROPOSAL — chưa review độc lập, chưa migrate**.

## 1. Phạm vi và cách dùng

**Quyết định nội bộ ngày26/11/2026:** Theo chỉ đạo người dùng, trước mắt không sử dụng vector DB, pgvector, embedding hoặc semantic retrieval. Không thêm bảng/vector index, worker embedding, bước embedding câu hỏi hay POC vector vào phạm vi hiện tại. Context lấy bằng SQL theo quyền và phiên bản, gồm profile/chỉ thị/mục tiêu/trạng thái, hội thoại gần đây và memory có cấu trúc; bản tóm tắt nếu dùng phải giữ nguồn. Việc xem xét vector sau này cần quyết định riêng, không tự bật khi có dữ liệu hoặc benchmark. Quyết định này không loại bỏ chức năng memory/Challenge hay thay đổi yêu cầu khách về AI Coach.

[Hồ sơ quyết định](vector-decision-2026-11-26.json).

Chọn phương án cho 12 nhóm được giao: agent, quyền/xác nhận, Challenge, memory/context, category/phân công, posting/autopost, media/OneDrive, video, billing, notifications, metrics và lifecycle/backup. Nền hiện có vẫn là 13 migration/53 bảng trong repository, chưa xác minh live DB. Các bảng đích không tự cộng vào số đã triển khai.

FACT về yêu cầu và quyết định nguồn giữ tại [01](01_confirmed_requirements.md) và [hồ sơ cập nhật](decisions-update-2026-11-25.json). Toàn bộ tên bảng, kiểu cột, trạng thái kỹ thuật và protocol ở 09/10 là **PROPOSAL của đội**. Các mặc định vận hành là **ASSUMPTION** được ghi tại§14. Tech Lead quyết thiết kế; BA phân tuyến quyết định nghiệp vụ; provider kiểm capability; reviewer khác tác giả kiểm đúng phiên bản. Bản này không cấp các phê duyệt đó.

[Từ điển đích 10](10_target_data_dictionary.md) có cột/kiểu/null/FK/index/invariant, được sinh từ [contract JSON](technical-design-contracts-2026-11-25.json). `05` vẫn mô tả snapshot vật lý và SQL nguồn. Các invariant/transaction ở 09 là phần bắt buộc của contract, không thể chỉ triển khai các cột trong 10.

### 1.1. Truy vết

| Miền | Căn cứ gốc | Tracking và kiến trúc | Phần còn mở |
|---|---|---|---|
| Agent/quyền/usage | QA `Q&A!G101:H101`; J 101 là phân vai nội bộ | R02-02/R03-04; AI Core v 2.10 §4–7/10 | OAuth production và capability POC |
| Challenge/memory | QA101; YK3 P296/P397–398/P709–722 | P-17; AI Core §2.7/6 | Tiêu chí đo, streak và partial SNS |
| Category/assignment | YK3 P679–680/P705/P741/P783–797; KS K 77/K 93 | P-15/P-17; R02-10/R06-17 | QA99 và ngoại lệ người nhận QA87/88 |
| Posting/autopost/NG | YK3 P247–250/P318–343/P355–457/P688; KS20261122 G4:I 4/G16:I 16/G20:H 20 | P-12/P-22/P-23/P-26; AI Core §8 | QA58/59/70/83/95/96, deadline và lỗi |
| Media/video | QA8; YK3 P303–305/P350/P462–511; KS20261122 G3:I 10 | P-20/P-24; AI Core §2.8/6 | 確認61/62, thời điểm tính lượt, provider |
| Billing | KS action No.16/G17; YK3 P617–650/P661/P819 | P-03/P-18/P-21 | QA49/53/62/63/98, Square, thương mại |
| Notifications/metrics | YK3 P390–407/P516–612/P1277–1347 | P-16; AI Core §2.10 | QA72/95/97 đã trả lời26/11; fallback/đích tin No.87/88 và metric khả dụng còn cần xử lý |
| Lifecycle/backup | YK3 P660–677/P888/P913/P916–918; QA101 | P-18/P-21; AI Core §11.2 | QA69/94/98, CR08, retention audit/tài chính |

P là số đoạn XML của DOCX 0.3, không là số trang. Hash nguồn và giới hạn đọc hình tại [manifest](technical-design-review-2026-11-25.json). Không tuyên bố VERIFIED toàn bộ nguồn hoặc giao diện.

## 2. Quyết định chung

1. Dùng tiếp operation/outbox; Redis/BullMQ chỉ vận chuyển ID. Giữ execution/attempt/step, profile/instruction/history, posts/media/deliveries và inbox/push. Không tạo queue nghiệp vụ hay authentication authority thứ hai.
2. Bảng mới ở `app_private`, bao gồm dữ liệu nghiệp vụ cần bảo vệ. Frontend gọi Hono API qua client chuẩn; model gọi tool allowlist, không nhận SQL hoặc credential tùy ý.
3. Bảng mới dùng UUID; timestamps UTC `timestamptz`; ngày nghiệp vụ có timezone rõ. Asia/Tokyo là mặc định kỹ thuật đề xuất. Aggregate sửa được có version/CAS và trigger tăng đúng 1. History/receipt bất biến; sửa sai bằng revision hoặc compensating event.
4. FK kiểm tồn tại; FK kép kiểm đúng owner khi có candidate key. Scope đa hình, JSON typed refs và loại actor cần service/constraint trigger trong transaction. Không CHECK bằng subquery hoặc hàm đọc bảng khác. CHECK phải xử lý NULL tường minh, không để UNKNOWN được coi như dữ liệu hợp lệ.
5. JSONB chỉ dùng cho nội dung có schema kiểm soát: manifest, evidence, scenario và payload chuẩn hóa. State, uniqueness, quyền và quan hệ cần FK không giao cho JSON/model tự chứng minh.
6. Capability provider khác quyết định nghiệp vụ. Thiếu quyết định trả `DECISION_REQUIRED` cùng tracking ID; không dùng cấu hình để hợp thức hóa hành vi chưa chốt.
7. Mọi bảng mới bật RLS; PUBLIC/anon/authenticated không có DML trực tiếp. Grant tối thiểu cho backend. Runtime hiện không tự lọc JWT theo Talent: service vẫn kiểm actor/owner mỗi query. Không dùng owner/BYPASSRLS/SECURITY DEFINER để né thiếu grant.

Cơ sở cơ chế: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [PostgreSQL 17 constraints](https://www.postgresql.org/docs/17/ddl-constraints.html). Đã đọc changelog 25/11; không nâng thư viện/CLI hoặc thực thi hosted operations.

## 3. Agent, quyền và tác động provider

### 3.1. Mapping

| Khái niệm | Chọn phương án |
|---|---|
| Conversation |1:Nentries,1:Nruns; tối đa 1 active run/conversation |
| Run và lease | Execution 1:Nattempts; attempt là quyền xử lý một lượt, không là một model call |
| Checkpoint | Execution 1:Nsteps; tool nối đúng source model step và call ID |
| Proposal/command | Proposal có thể không thuộc run khi MCP trực tiếp; command có thể không có proposal khi không cần Manager approval; mỗi proposal consume tối đa 1 lần |
| Context | Immutable context_manifest; execution lưu manifest ID/hash trong trường context hiện có |
| External effect | Operation 1:Neffects; effect 1:Ntransport observations và 0:Ncallbacks; bảng miền nối effect cụ thể |

Mở task profile riêng cho Talent, Manager global/category và system batch. Legacy dùng coach_messages; conversation agent dùng entries; batch không bị ép có user conversation hoặc Talent giả. Cột mới nullable lúc expand, nhưng shape mới phải được siết theo task revision trước bật writer.

### 3.2. State và phục hồi

| Đối tượng | Đường chuyển đích | Invariant |
|---|---|---|
| Run | pending→running→waiting_confirmation→pending; running→succeeded/failed/unknown/cancelled | Chỉ running có lease; unknown chặn replay mù; output terminal theo task profile |
| Attempt | executing→waiting/succeeded/failed/unknown/cancelled | Agent dùng step_ledger; metadata call ở step, không cấp attempt |
| Model step | prepared→calling→succeeded/failed/unknown | Commit calling trước HTTP; persist đầy đủ output/usage trước tool |
| Tool step | prepared→waiting/succeeded/denied/failed/unknown | Result và DB mutation nguyên tử; chờ người giải phóng compute |
| Proposal | prepared→confirmed/rejected/expired; confirmed→consumed/conflicted/expired | Payload bất biến; kiểm lại actor/grant/client/expiry/policy/version |
| Effect | planned→sending→acknowledged→succeeded/failed; sending/acknowledged→unknown | Provider nhận request khác thành công nghiệp vụ; chỉ adapter xác minh kết quả |
| Callback | pending→applied/ignored/quarantined/failed | Dedupe theo provider account/event; hash khác cùng key bị quarantine |

State này là thiết kế đích, cần migration CHECK/task profile. Timeout/5xx hoặc lease mất sau khi có thể gửi phải vào unknown và đối soát, không đổi về pending để thử mù. Cancel là effect mới, không đảo ngược một effect đã xảy ra.

### 3.3. Transaction

**Submit:** kiểm session/actor, khóa conversation, tra operation key/hash, ghi entry+operation+pending run+wake outbox cùng transaction. Cùng key/payload trả run cũ, khác payload 409. Conversation bận không tạo entry rời.

**Prepare/confirm:** service tạo proposal bất biến và tool waiting checkpoint. Người dùng xác nhận đúng hash/client/grant/expiry/base version. Confirm chỉ ghi decision+wake; resume gọi commit service trước model. Câu model “đã lưu” không thay receipt.

**Commit:** kiểm authority hiện tại, CAS resource và run fence; mutation+history+command receipt+consume proposal+tool result+audit/outbox cùng transaction. Crash sau commit đọc lại receipt. Hết model budget không làm mất quyết định đã nhận. Chỉ ghi intent ở đây; HTTP chạy ngoài transaction.

**Effect send:** claim ngắn bằng `FOR UPDATE SKIP LOCKED`, token/attempt/lease theo DB clock; commit sending trước HTTP. Response cập nhật bằng CAS token và append transport observation. Worker cũ không mở bước sau. Reconciler kiểm account/provider ref trước projection; không hứa exactly-once nếu provider chưa có proof.

**Callback:** xác minh chữ ký trên raw body → map provider account/resource → insert dedupe → khóa resource → apply transition → projection/audit/domain outbox+processed marker → commit. Mapping không rõ thì quarantine, không đoán Talent bằng email hoặc model. Timestamp bên ngoài không đủ để cho phép lùi trạng thái.

### 3.4. Ma trận backend

| Role đích | Quyền | Không cấp |
|---|---|---|
| API/command writer | DML aggregate allowlist; INSERT history/receipt/audit/outbox | DELETE history; nhận lệnh user/model sửa provider success |
| AI worker | Read context qua service; execution/attempt/steps; domain command qua cùng service | DML tùy ý vào profile/instruction/payment/publication |
| Effect worker | Claim effect, adapter projections, callback/audit kết quả | Sửa consent/chỉ thị; tự quyết khoản thu |
| Dispatcher | Lease outbox, read operation | Mutation nghiệp vụ hoặc consume proposal |
| Policy publisher | Xuất bản/thu hồi policy theo artifact được duyệt; audit và CAS | Model/API tự phê duyệt hoặc đổi nội dung policy cũ |
| Retention worker | Quyền theo purge plan cụ thể và receipt | DELETE toàn cục, owner bypass |
| Reporting | SELECT read model đã redact | DML, token/raw prompt |

Tên role chi tiết theo 10/manifest khi viết migration; role hiện tại talent_runtime chưa chứng minh đã tách quyền. Dispatcher không được thừa kế command writer. Manager active/MFA/session phải kiểm mỗi request. MCP grant kiểm revocation và scope ở query/prepare/confirm/commit; không dùng user_metadata làm quyền, không lưu bearer/refresh token trong proposal. OAuth issuer/client và token lifecycle cần POC, không tạo authorization server giả từ một bảng grant.

### 3.5. Policy registry và thẩm quyền

`policy_revisions` lưu revision bất biến, schema/hash, loại thẩm quyền và đường dẫn bằng chứng phê duyệt. Các policy refs ở bảng đích dùng FK tới revision này. Chỉ role xuất bản policy từ quy trình kiểm soát được INSERT; API/agent/worker không có quyền tự đổi proposed thành approved. Bản sửa tạo revision mới; thu hồi có revoked_at/revoked_by và CAS riêng, content/approval cũ vẫn bất biến. Service kiểm effective/not-revoked ở mỗi commit/send.

Một hàng ghi approved không tự là bằng chứng khách đồng ý. Policy publisher phải kiểm người có thẩm quyền, nguồn/hash/locator và artifact duyệt đúng phạm vi; quy tắc kỹ thuật không cấp quyền cho quyết định nghiệp vụ/thương mại còn mở. Service chỉ thực thi revision đúng loại và còn hiệu lực, unresolved business policy giữ proposed và trả DECISION_REQUIRED. Runtime không fallback từ policy thiếu sang setting mặc định.

## 4. Category, assignment và instruction

Category có tên/màu/order; membershipN:N và assignment có khoảng hiệu lực. Một người phụ trách hiện tại mỗi Talent, có history. Exclusion constraint `[valid_from,valid_to)` chặn overlap; btree_gist cần kiểm. Nếu chưa có extension thì serialized transaction theo Talent+constraint trigger phải giữ cùng invariant.

Đề xuất thao tác xóa category ở UI là retire catalog và đóng membership, giữ historical refs. Review UX trước bật vì “xóa” trong nguồn chưa tự xác nhận cách lưu vật lý. Instruction category thêm FK và scope shape; chỉ bỏ category_not_ready khi catalog/adapter đủ.

Talent > category > global đã rõ. Xung đột giữa nhiều category chưa QA99: trả conflict refs cho Manager, không tự ưu tiên theo tên/order. Resolver cần contract phát hiện xung đột; LLM chỉ đề nghị, không tự đóng quyết định. Test instruction chạy candidate hash/context manifest với read-only allowlist; không save live hoặc tạo paid effect. Usage model là phí thật Adesso. Restore tạo revision mới, không sửa lịch sử.

## 5. Challenge và memory/context

### 5.1. Challenge

Dùng challenges aggregate và challenge_events. Specification có schemaRevision, objective, unit, target, period/timezone, evidenceTypes và assessmentPolicyRef. Trường chưa quyết không điền giả. Tách mô tả đọc được với dữ liệu đánh giá máy.

Nhận/từ chối qua chat thành structured command gắn actor Talent/entry/expectedVersion/key, không cần Manager approval. Proposed→accepted/declined; accepted→assessment_pending/completed/cancelled. Chỉ completed khi có policy đủ căn cứ và assessment/evidence. Schema cho phép nhiều instances, không invent cap 1 Challenge.

Progress phân loại provider evidence và self-report. Key theo challenge+source ID+sourceRevision+ruleRevision chặn cộng trùng; correction append retraction/assessment mới. Praise dùng assessment ID làm key và entry receipt cùng transaction. Không đủ luật streak/partial SNS thì assessment_pending, không suy completed từ lời model.

### 5.2. Memory và manifest

Observation phân biệt manager_fact/explicit_user/ai_inference, có source refs/confidence/revision. AI inference không sửa 5 trường profile/chỉ thị Manager. Content/source bất biến; invalidation có actor/audit. Context không dùng observation đã mất nguồn/quyền; purge đi theo source graph.

Manifest ghi ID/version/hash/asOf cho profile/readiness/instruction/category/goal/metrics/memory/persona và post/media liên quan. Typed ref kiểm owner/scope khi build và consumption; manifest private. Missing/stale metrics có nhãn trước model. Public news cache chỉ dữ liệu công khai; personalization không đặt shared cache. News giữ URL/publishedAt/fetchedAt/hash trong manifest. Trước mắt không dùng vector/embedding theo quyết định26/11; memory vẫn lưu và đọc bằng SQL. Finetune không thuộc thiết kế này.

## 6. Media, chat và OneDrive

Logical asset giữ ở media_assets; immutable byte version ở media_asset_versions. Upload intent chọn server key theo Talent/operation và cap size/type/expiry; complete kiểm bytes/MIME/hash/owner. Không tin client success. Chỉ validated version mới ready; signed URL không là canonical ref. Không fetch URL hồ sơ tùy ý.

agent_entry_resources dùng typed FK cho media/post/Challenge/video/command và position. Body không chứa byte/token/signed URL bền. Reload/đổi thiết bị qua cùng API; mỗi lần ký read URL kiểm quyền lại. Model không chọn local path/bucket. Media analysis gắn asset version/pipeline/model, có unsupported/failed/unknown; video cần POC preprocessing, không ghi“đã xem video” từ metadata.

Document export dùng logical key Talent/kind/sourceRevision, render DB version→hash→provider write→receipt. Nếu hỗ trợ ETag thì ghi có precondition; không cho version cũ overwrite mới. Unknown đối soát item/hash trước retry. agent_profile_exports vẫn latest profile projection; document_exports lưu history và loại khác. Không đọc file edit ngược ghi đè DB. Nơi lưu byte media theo adapter Supabase/OneDrive đã kiểm, không buộc byte vào Postgres từ QA101.

## 7. Posting/autopost và kế hoạch từng SNS

### 7.1. Revision/review

Giữ post logical, thêm immutable revision: caption/hashtags/mediaVersionSet/targetPlatforms/hash. Topic tự nêu có entry ref, không bắt buộc theme_suggestion. post_media là projection bản hiện tại, không nguồn duy nhất cho history duyệt.

Review giữ snapshot/revision/hash/media/đích/mode policy/actor, round/deadline và return reason. Legacy decisions được giữ, map qua adapter trong expand/contract. QA58 ngày26/11 chấp thuận gửi duyệt lại trên cùng bài, giữ lịch sử; giữ giờ nếu kịp, quá giờ dời khung tiếp theo. Logical post/revision phục vụ quy tắc này; không giữ câu hỏi đã trả lời làm blocker UX. Pending Manager approval không sửa qua agent để né QA85.

Work flag do Talent chọn, PR do Talent thêm. Không Manager approval cho autopost/office. AI rewrite NG không thêm Talent re-confirm; nếu tương tác với Manager approval đã có chưa rõ thì block đúng nhánh, không giả approval còn hiệu lực hoặc hỏi lại ai sửa NG.

### 7.2. Hai trục

Preference confirm/no_confirm độc lập với source daily/autopost/office. Period có local dates/themeRevision/mediaSet/context refs; không FIFO/1 bài-ngày. Logical generation key chống trùng draft do job retry. Daily và period có thể cùng dùng; overlap period policy không tự gộp.

Chủ đề kỳ đổi qua hội thoại theo QA70 ngày26/11; thao tác dùng CAS. QA83: đổi cài đặt xác nhận giữ lịch đã có, áp bài chưa đặt lịch; không suy đổi chủ đề buộc sửa lại mọi plan cũ. Thiếu media không tự tạo AI photo/video; producer ghi blocked reason và thông báo theo approved policy. Kết thúc kỳ có event key+chat receipt; autopost không voice từng bài.

### 7.3. Plan/effect

Delivery giữ 1 logical destination/post/platform; plan revision giữ plannedAt riêng SNS, content revision và connection revision. Không drop UNIQUE(post,platform) để nhét attempt; attempts ở effect ledger. Scheduled khác published; API trả từng SNS và partial khi phù hợp, không“một SNS lỗi→cả bài lỗi”. Mapping aggregate enum cũ cần DDL/reader mới.

Trước schedule và send kiểm owner/status/posting gate/readiness/review/NG/account/capability. Photo IG/TikTok, video 3 SNS đã kết nối. Agent quyết giờ trong khung chỉ thị, OS thực thi. Giá trị jitter là thuật toán kỹ thuật cần load test, không SLA.

Cancel command→intent+effect outbox; chỉ cancel ack mới cancelled. Nếu đã publish trước cancel, giữ kết quả thật và receipt, không tuyên bố hủy ngược. Late callback không phục hồi plan đã hủy cancelled/superseded plan. User retry failed tạo command/plan revision mới; không auto repost hoặc gửi lại SNS đã thành công. QA59 ngày26/11: đăng lại chỉ SNS lỗi, AI chọn khung tiếp theo; QA95: chặn đổi/ngắt đúng SNS còn lịch, hiện để Talent huỷ trước, không tự chọn lại cả3mạng.

### 7.4. NG

Save ng_words xuất ruleset revision cùng transaction. Check gắn input revision/ruleset/execution/result; rewrite tạo revision mới và check lại. Failed/unknown không schedule. Giới hạn loop kỹ thuật trả blocked/error, không tự NG pass. QA96 ngày26/11 chọn A: NG mới chỉ áp từ lần kiểm sau thay đổi, không quét lại hoặc huỷ lịch đã kiểm. Manager muốn dừng thì huỷ lịch. Số vòng lỗi kỹ thuật không tự biến thành giới hạn nghiệp vụ.

## 8. Video, usage và billing

Video idea/scenario sửa tự do không generation effect. Consent chụp scenario/media/model/price estimate/disclosure/hash/actor/beneficiary/expiry. Request unique consent; remake là request mới nối gốc. Manager làm thay giữ actor khác Talent thụ hưởng. Chọn use tạo asset ready+draft, không publish; discard khác failed job. Provider từ chối trẻ em trả lỗi mẫu/hướng dẫn tự quay, không đổi provider để né restriction.

Tách request count, provider/model cost và lượt/giá thu Talent. Usage entries bất biến có fact/billable/adjustment; is_counted là legacy projection. Failed video không billable theo nguồn, nhưng QA62 ngày26/11 chấp thuận ghi lượt tại依頼, giá tại thời điểm đó; lỗi dịch vụ trừ ngay, phát hiện sau tổng hợp trừ kỳ sau. Số tiền cụ thể/ngày chốt còn No.2/4/49. Không lấy provider success thay mọi billing policy.

Model usage hợp nhất legacy call với agent steps, không cộng attempt tổng lần 2. cached tokens là subset input: uncached=input-cached; giá revision cố định, decimal numeric. Provider hosted fee theo receipt riêng, không bịa từ token. Giá chưa biết là NULL, khác 0. Manager global không gán Talent giả; Adesso trả token, không thu Talent hoặc phí ChatGPT.

Invoice dùng integer minor units+currency+exponent; quantity/rate là numeric, rounding policy rõ. Estimate khác actual price. Agreement trỏ price và cycle policy đã duyệt; paused vẫn phí tháng, office không billed Talent agreement. Cycle `[start,end)` theo anchor/timezone; month end/leapday/allocation video giữ QA49/53 trước bật.

Finalize khóa cycle, kiểm owner/currency/price/exact sum, freeze line IDs/hash, invoice effect+outbox cùng transaction. Một cycle không hai invoice payable. Giá đổi không tính lại quá khứ; sửa bằng approved adjustment line sau khóa.

payment_attempts là request, payment_settlements là tiền đã dịch chuyển thật theo provider transaction unique. Net settled và currency quyết paid theo approved policy; partial/multiple/reversal giữ từng record, không latest callback hoặc browser redirect. Unknown phải reconcile trước send lại. Không auto lock/quá hạn/recollect/refund khi thiếu policy. Square là adapter đích theo nguồn, capability/contract cần [checklist](technical-provider-checks-2026-11-25.csv); không âm thầm đổi sang chỉ thẻ.

## 9. Metrics/goals

Ingest run theo account/connectionRevision/local day. Observations immutable mỗi fetch; canonical metric map và available/missing/unsupported/error. Chỉ available có value, zero là số đo. Stale tính theo observed/fetched/freshness policy, không ghi đè 0. UI/agent cùng read model; legacy snapshots là compatibility projection, không cộng hai nguồn.

Account switch không gộp history cũ vào mới. Không suy hourly/watchtime/completion khi chỉ daily. Fetch retry là read, khác auto repost bị cấm. Goal change tạo revision/update projection ngay; achievement unique goal revision nối đúng metric owner/platform/value, outbox chống notify trùng. Ngưỡng25/50/75% chưa tự bật. QA72 ngày26/11 đã chấp thuận streak: ngày có ít nhất1bài thành công trên mộtSNS đã nối; sau ngày trống, lần đăng tiếp vềngày1. Autopost tính inactivity không tự định nghĩa mọi streak.

## 10. Notifications/audit

Canonical notification event có key/type/subject/cause/resource refs. Inbox Talent và push hiện có dùng tiếp; Manager recipient giữ snapshot assignment/read/handled. Event/recipient/channel uniqueness chặn fanout lặp; inbox commit dù push/email lỗi. Approval request vào queue, period end vào chat. Lỗi SNS/mạng không báo Manager theo đúng cause policy.

Đơn chưa assignee/Manager disabled/đổi người thiếu policy thì routing pending; không fallback toàn bộ Manager. Disable suppress delivery mới, giữ nguyên history. QA97: lưu được read/handled riêng; record open không tự đồng nghĩa handled khi chưa approved policy. Đây là contract lưu dữ liệu, chưa duyệt UX khác nguồn. Email accepted/delivered khác read; không thêm nút complete mặc định.

View audit dùng manager_view_logs; action/process dùng activity_logs thêm operation/run/command/effect/resource version. Chỉ metadata trong allowlist, không raw prompt/token/URL secret/carddata. Manager đọc agent entries phải audit trong transaction trước trả dữ liệu, không chỉ legacy chat. Outbox không PII/secret.

## 11. Lifecycle/purge/backup

Giữ SQL token ended, thêm paused bằng migration. API label terminated không là lý do đổi token ended cả hệ thống. Status event+Talent CAS+audit/outbox nguyên tử; ended không quay lại, thu hồi phiên theo Auth. Saga actions giữ stop reminders/cancel plan/end billing/purge riêng với receipt. Payment failed không auto ended/paused.

Paused vẫn thu phí; phần lời nhắc đã rõ thực thi được. Login/quyền tạo video/lịch đã có cần matrix review, không ẩn thành block toàn bộ. Resume không đăng bù. Dừng OS không là provider-cancel ack.

Retention case đề xuất eligibleAt=endedAt+6 calendar months theo giờ nghiệp vụ; BA review nghĩa“tháng”, không hard code 180 ngày. Scope financial/audit/shared assets/office và công nợ cần QA69/94/98/CR08. Không giữ vô thời hạn hoặc ẩn danh thay xóa như mặc định.

Thứ tự purge: chặn new writes→revoke identity→hủy/đối soát effect→freeze manifest→kiểm policy shared/financial/audit→xóa byte/provider→xóa row con theo FK→detach minimal receipt→xóa Talent cuối→kiểm không re create. Purge worker có quyền tường minh, không tắt audit trigger toàn DB. Global instructions/Manager chung không cascade vì Talent.

FK RESTRICT bảo vệ ordinary delete; purge cần redaction/detach field được duyệt. Minimal receipt không tên/email/raw path; HMAC digest vẫn cần retention, không tuyên bố anonymous hoàn toàn. Case/effect nullable ở receipt phục vụ detach khi xóa row gốc đúng scope. Không tự chọn thời hạn tài chính pháp lý.

Backup giữ DB snapshot ref+object version manifest+consistency cutoff+deletion watermark; secrets/keys theo quy trình riêng. Restore isolated với outbound OFF; áp lại deletion markers, invalidate credentials/sessions, đối soát provider/outbox trước bật. Backup cũ hết hạn theo provider contract, không hứa xóa ngay mọi bản sao. Restore drill lưu artifact và thời gian đo; pass không tự cấp G8/SLA.

## 12. Lock, index và migration

Global order đề xuất: conversation→principal/security→resource theo(kind,id)→proposal→operation/run→attempt/step→command/history/audit→outbox. Handler không có conversation bỏ qua bước đó, không quay lại khóa conversation từ resource. Callback không khóa resource rồi khóa conversation; notify/wake qua outbox. Dispatcher chỉ khóa outbox rồi commit. Cần review service cũ trước đổi khóa, không mix order 07 cũ và protocol mới.

Retry 40001/40P01 theo cùng key có giới hạn, không HTTP trong DB retry. Claim ngắn SKIP LOCKED, expiry DB clock. Index owner/time/state, partial active và history(parent,revision); keyset(timestamp,id). Không partition/GIN mọi JSON trước đo query. FK source cần index đúng query, không tạo lặp PK/unique. GiST exclusion cần extension check; UNIQUE có NULL dùng NULLS NOT DISTINCT hoặc expression key rõ.

| Wave | Đầu ra | Điều kiện mở writer |
|---|---|---|
| A | Context/capability/effect/callback/grant/proposal/command | Legacy replay, ACL, fencing/receipt |
| B | Category/assignment/memory/Challenge/media | Owner proof, sandbox; unknown assessment không completed |
| C | Revision/review/NG/period/plan/account revision | Cancel race, callback, per SNS schedule, policy đủ |
| D | Video consent/metrics/goals/notification/email | Provider POC, consent/routing/freshness |
| E | Price/agreement/cycle/usage/charge/invoice/payment | Approved billing policy, Square POC, rounding/reconcile |
| F | Status events/actions/retention/backup | Scope quyết định đủ, purge/restore proof |

Không sửa migration đã áp, không db push/reset. Tạo bảng→candidate keys→FK kể cả các vòng step-price/post-revision/command-proposal. Expand nullable/backfill/validate rồi mới NOT NULL/constraint; không sửa dữ liệu thật theo đoán. Post↔revision dùng deferrable FK hoặc tạo Post NULL→revision→update trong transaction có check commit.

Reader phải đọc cả legacy/new trước writer; dual projection có chủ, không hai writer độc lập; cutoff theo task/module version. Không replay outbox cũ như generation mới. Trước sinh DDL kiểm clean catalog và grant/constraint; sau replay mới regenerate 05. Không thêm bảng đích vào generator vật lý khi chưa có migration.

## 13. Ca kiểm chứng contract

Các ca dưới là kế hoạch, chưa chạy DB/provider. QA cần fixture/actor/thao tác/assertion DB-provider-receipt/oracle và artifact.

| ID | Tình huống | Assertion |
|---|---|---|
| TD-T01 | ID resource của Talent khác | Deny, không row/output/effect lọt owner |
| TD-T02 | Grant/client/actor/policy bị thu hồi sau prepare | Deny confirm/commit, không consume |
| TD-T03 | Submit cùng key đồng thời | Cùng receipt hoặc 409, không orphan |
| TD-T04 | Mất lease ở model/provider | Worker cũ không commit, unknown không replay mù |
| TD-T05 | Crash sau commit | Receipt đọc lại, không history/mutation/outbox trùng |
| TD-T06 | Wait/reject/expire | Không lease/transaction giữ lâu; wake idempotent |
| TD-T07 | Callback trùng/collision/wrong account | No-op/quarantine, không update chéo owner |
| TD-T08 | Timeout đã có external resource | Reconcile trước retry |
| TD-T09 | Category không tồn tại/retired | FK/service từ chối |
| TD-T10 | Category xung đột QA99 | Conflict refs, không ưu tiên suy đoán |
| TD-T11 | Sandbox gọi paid tool | Deny, không effect; usage vẫn ghi |
| TD-T12 | Challenge accept/progress lặp | CAS/dedupe, self-report có label |
| TD-T13 | Unknown streak/partial SNS | assessment_pending, không completed |
| TD-T14 | Upload fake/over size/expired/wrong owner | Reject, không ready/public URL |
| TD-T15 | Media/content đổi sau review | Approval cũ không áp cho snapshot mới |
| TD-T16 | NG rewrite | No reconfirm Talent; check lineage; failure block |
| TD-T17 | Mode/period/office | Hai trục độc lập, không Manager approval giả |
| TD-T18 | Per SNS/photo/video | Đúng plannedAt/platform, không YouTube photo |
| TD-T19 | Cancel vs Publish/late callback | Outcome thật, không phục hồi plan đã hủy |
| TD-T20 | User retry failed | Command mới, không auto repost đích thành công |
| TD-T21 | Cost consent cũ/đổi ảnh-giá-model | Require consent mới; no early effect |
| TD-T22 | Video failure/remake/late adjustment | Usage history đúng; chưa approved policy không billable |
| TD-T23 | Concurrent invoice/price change | Một payable invoice, frozen sum/lines/price |
| TD-T24 | Partial payment/trùng/late failure | Settlement dedupe/net settled |
| TD-T25 | Multi call/cached tokens/no price | Không đếm đôi; NULL khác 0 |
| TD-T26 | Metrics missing/stale/reconnect | UI/agent cùng snapshot, không zero/map chéo |
| TD-T27 | Goal đổi/ingest lặp | Achievement đúng revision, không notify trùng |
| TD-T28 | Manager disabled/assignee change | Suppress/routing pending, history giữ |
| TD-T29 | QA97 open | Read/handled/transport tách |
| TD-T30 | Paused/ended/payment failed | Đúng matrix; không auto ended |
| TD-T31 | Purge FK/shared/debt | Đúng scope, có receipt, không cascade global |
| TD-T32 | Restore old DB/outbox | Outbound OFF, áp lại deletion markers, no replay effects |
| TD-T33 | Grants/logs/secret | Không DML ngoài quyền, không secret output |
| TD-T34 | Replay/backfill/mixed task | Legacy hợp lệ, non NULL CHECK shape, owner FK |

## 14. Mặc định đề xuất và phần chưa kiểm

| Đề xuất staging | Owner/giới hạn |
|---|---|
| Lease 60 s, heartbeat 5 s, call timeout 45 s theo AI Core | Tech Lead/QA đo; không SLA; chờ người không giữ lease |
| Proposal/cost consent TTL 15 phút | Review UX trước production; không gia hạn proposal cũ để vượt price/version |
| Backup DB hằng ngày; mục tiêu RPO 24 h/RTO 8 h, retention 35 ngày | Budget/provider verify/restore measurement; DB-media phải đồng bộ; không khẳng định gói Supabase đã có PITR |
| Technical logs 30 ngày, normalized callback payload 7 ngày, sandbox result 7 ngày | Chỉ đề xuất staging; production privacy/retention review; không áp cho history finance/consent/audit |
| Currency exponent/rounding version | Team chốt thuật toán/POC; thuế/giá thực/nợ đúng thẩm quyền |

[Checklist provider](technical-provider-checks-2026-11-25.csv) giữ NOT_TESTED cho đến có artifact. Không khẳng định Square/Upload-Post/fal.ai/Microsoft/OAuth đã pass. Giữ QA99/95/96/97/98 và nhánh video/kỳ thu/purge; không soạn/gửi Q&A mới. G5 BLOCKED vì thiếu reviewer độc lập; chưa có G8/release. Đầu ra là contract có thể review/chuyển sang DDL, không bằng chứng hệ thống đã đạt.
