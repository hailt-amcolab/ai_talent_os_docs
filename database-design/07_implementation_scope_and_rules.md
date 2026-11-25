# 07. Phạm vi triển khai và quy tắc khi viết mã

> **Cập nhật quyết định 25/11/2026:** Đã đồng bộ nhóm quyết định đã rõ vào nội dung tài liệu. Phân biệt yêu cầu nguồn, SQL hiện có và thiết kế đích chưa có migration. Cấu trúc repository: 13 migration/53 bảng ứng dụng; chưa kiểm DB live. Các ghi chú ngày 18/11 và 23/11 giữ vai trò lịch sử ở phần đã được thay. [Hồ sơ thay đổi](decisions-update-2026-11-25.json); [review và phần còn thiếu](08_full_review_2026-11-25.md).

> **Rà soát 23/11/2026:** Đối chiếu QA/KS hiện hành và bộ `23112026`; xem [kết quả tác động DB](06_extensibility_review.md) và [danh mục nguồn](../TAI_LIEU_NGUON.md). Tách schema trong repository, quyết định nguồn và đề xuất thiết kế. Lần rà này chỉ cập nhật tài liệu, chưa áp migration hoặc kiểm tra database đang chạy; không cấp phê duyệt nghiệp vụ, thương mại hay release.

Bản 2.0 · 18/11/2026 · Bước 7. Dành cho AI agent lập trình. Thay `10_confirmed_scope_and_remediation.md` (bản 17/11/2026): phạm vi đợt 1, bảng đang chặn ghi, cách viết mã truy cập DB và quy tắc migration.

Bộ thiết kế DB:

| Tệp | Nội dung |
|---|---|
| `01_confirmed_requirements.md` | Phân loại yêu cầu, ma trận truy vết R…, quy tắc nghiệp vụ BR…, điểm chưa rõ U… |
| `02_entity_inventory.md` | Ranh giới dữ liệu, danh mục 53 bảng trong 13 migration (chưa kiểm trạng thái áp), những gì không thành bảng |
| `03_erd.md` | ERD, quyết định thiết kế D…, vòng đời trạng thái |
| `04_database_schema.md` | Quy ước, danh sách migration, đề xuất chờ khách P… |
| `05_data_dictionary.md` | Từ điển từng cột (sinh từ catalog bằng `gen_tu_dien.py`) |
| `06_extensibility_review.md` | Khách chốt một điểm chưa rõ thì phải đổi gì |
| `07_implementation_scope_and_rules.md` (tệp này) | Được làm gì, cách viết mã và migration |

**Hai loại căn cứ:** SQL migration là căn cứ cấu trúc được mô tả trong repository; catalog trực tiếp mới xác minh DB đang chạy. Nghiệp vụ theo nguồn gốc trong [TAI_LIEU_NGUON.md](../TAI_LIEU_NGUON.md), quyết định đúng chủ đề và QA/KS hiện hành; migration, code và tài liệu 05 không thể thay xác nhận khách. Khi lệch, ghi gap và thiết kế migration sau; không sửa yêu cầu cho khớp code.

Đọc kèm: [apps/api/PRISMA.md](../apps/api/PRISMA.md) (lệnh migration); [HD-Auth](../agent_spec/supabase-db-auth-spec/HUONG_DAN_TICH_HOP_VI.md) (đăng nhập, phiên, cách dùng các bảng `auth_*`); [HD-PWA](../agent_spec/pwa-platform-spec/HUONG_DAN_TICH_HOP_VI.md) (thông báo đẩy).

Ký hiệu: [YK2] = bản định nghĩa yêu cầu v 2; [QA] = bảng hỏi đáp với khách; CR = mã yêu cầu bổ sung ở sheet追加要件 của QA; bản hiện hành CR01–14, từng mục có trạng thái riêng, không mặc định tất cả đã chốt; R…, BR…, U… theo `01`.

---

## 1. Nguyên tắc phạm vi

Quyết định của chủ dự án ngày 17/11/2026: **chỉ làm phần đã chốt**, phần còn lại cập nhật dần.

- **Căn cứ phạm vi:** quyết định nguồn có thẩm quyền, đúng chủ đề và còn hiệu lực; trạng thái Close riêng lẻ không cấp quyền triển khai. Đối chiếu xung đột mới, gate và phê duyệt áp dụng trước khi mở luồng. Bảng đợt 1 bên dưới là định hướng nội bộ, không phải phê duyệt khách/thương mại/release.
- **Chỉ tra cứu:** nội dung chỉ có trong [YK2] (bản 0.1), chưa có xác nhận riêng. Không coi là khách đã đồng ý.
- **Hoãn:** câu [QA] còn mở, chưa rõ, mâu thuẫn. Không dùng quy tắc tạm để mở chức năng. Chỉ mở lại bằng tài liệu + migration mới (§3).
- Schema có sẵn **không** có nghĩa API, guard, worker hay giao diện đã xong.

---

## 2. Phạm vi đợt 1

| Luồng | Căn cứ | Được làm | Giới hạn |
|---|---|---|---|
| Gửi đơn, quản lý duyệt/từ chối, tạo tài khoản | QA No.11/65; YK3 P116–159 | Dữ liệu + operation; thiết kế consent theoR 01-04 | QA65 đã trả lời đơn/mật khẩu tạm không hết hạn và reset khi mất email. Terms consent là yêu cầu đã rõ, cách hiển thị còn確認57; đăng ký lại sauended vẫn QA69. |
| Một loại quản lý; vô hiệu; nhật ký xem | [QA] No.5, 21; CR-13 | Có | Guard kiểm DB mỗi request; thời hạn phiên là cấu hình (HD-Auth §4), không viết cứng vào CHECK |
| Tài khoản công ty: loại riêng, không thu phí, không duyệt bài | [QA] No.20, 47–48; CR-11 | Dữ liệu + tạo tài khoản | Chưa làm màn đăng bài cho tài khoản công ty (chờ luồng đăng). Chi tiết vận hành chờ [QA] No.66 |
| Trạng thái tài năng, ngừng sử dụng | KS K116; YK3 P159/P660–677 | Thiết kế 4 trạng thái và history; ended chặn quyền | Paused vẫn thu phí, dừng lời nhắc; chuyển in_use khi đăng ký phương thức thanh toán hoàn tất. SQL còn 3 trạng thái; không tự mở writer trước migration. Login/lịch khi paused và purge/công nợ giữ nhánh còn mở. |
| Tư liệu do tài năng/quản lý gửi, hướng lưu Supabase/OneDrive (QA No.8) | CR-09, CR-10 | Metadata, chủ sở hữu, outbox `media.transfer` | Giới hạn tệp, link chia sẻ, dọn bản tạm phải chốt khi tích hợp OneDrive. Không mở link công khai mặc định  Phạm vi Manager gửi thay cần rà KS 確認27 với F20; không tự thêm trigger office-only P-19. |
| Chủ đề, bản nháp; danh sách từ cấm chung | [QA] No.9, 13, 40–41; CR-02, 06, 07 | Lưu và sửa bản nháp, tư liệu | Chưa làm: adopt (chấp nhận bản nháp), duyệt, hẹn giờ, gửi sang Upload-Post. Hạn và giờ đăng chờ [QA] No.55–57  AI viết lại không giới hạn lượt (KS K65/20-11; DEC-0001); P-13 cũ đã rút. Revision được duyệt cần thiết kế P-23. |
| Hội thoại và chi phí AI | [QA] No.17; CR-16 | Lưu tin nhắn, chi phí, outbox | Manager xem hội thoại đã có phản hồi QA No.7 H 8; kiểm guard và ghi nhật ký trước triển khai, không còn chờ quyết định riêng tư cũ. Gọi AI phải chống ghi trùng từng lần gọi |
| Thông báo cho tài năng | [QA] No.42; nền tảng PWA | Tin trong ứng dụng, đăng ký push, outbox | Không thêm loại thông báo chưa chốt; thông báo quản lý và "đã xử lý" chờ U-10, U-11 |
| Mục tiêu, số người theo dõi, kết nối mạng xã hội | [QA] No.14 H 15; [KS] 確認10; reconnect/disconnect No.95 | **Hoãn** | Đã rõ mục tiêu theo từng SNS và một tài khoản mỗi mạng; còn tích hợp, lịch sử mục tiêu, reconnect và tác động lên lịch đã có (No.95) |
| Tạo video AI có phí | Quy tắc đếm chốt ở [QA] No.1, 3; đơn giá, kỳ chưa chốt | **Hoãn chạy thật** | Không tạo lượt có thể phải tính tiền khi chưa có giá/kỳ |
| Duyệt, adopt, hẹn, đăng, hẹn lại, hủy ở Upload-Post | [QA] No.51, 57–61 mở | **Hoãn** | Không dùng bộ trạng thái tạm hay quy tắc "một mạng lỗi thì cả bài lỗi" |
| Thu phí tháng, giá video, hóa đơn, thanh toán | [QA] No.4, 49, 53, 62–64 mở | **Hoãn** | Không worker thu tiền, không hóa đơn giả  Đã có hướng tháng từ ngày đăng ký và trả trước (KS K104/F24); Nguồn KS actionNo.16/G17 thuật lại chọn Square; hợp đồng/capability cần đội/provider kiểm; công nợ khi ended còn No.98. |
| Nhóm tài năng, quản lý phụ trách theo Talent, chỉ thị AI, thử thách cá nhân hóa | QA101; YK3 P679–680/P705/P709–744/P783–797 | Đã rõ nghiệp vụ; đội hoàn thiện thiết kế/triển khai | Instruction global/Talent/history đã có SQL 25/11; category/assignment/Challenge/progress chưa có DDL. Không chờ khách chọn schema. QA99 giữ xung đột giữa category. |
| Cách đăng 自動投稿 / 要確認 | YK3 P247/P436–457/P545 | Thiết kế review preference riêng và autopost period/media | Daily/autopost có thể đồng thời; confirm/no-confirm áp cả hai. Không thêm Manager approval choautopost/office. Chỉ giữ nhánh thiếu media/đổi lịch và QA70/83 còn mở. |
| SMS MFA | SMS chưa bật | **Hoãn** | Không thêm SMS. Không tiếp tục coi quyền Manager xem hội thoại là quyết định đang mở |

---

## 3. Bảng đang chặn ghi và điều kiện mở lại

Trigger `reject_deferred_write` từ chối mọi INSERT/UPDATE/DELETE (SQLSTATE 55000) trên: `billing_accounts`, `social_accounts`, `follower_goals`, `follower_snapshots`, `post_approval_decisions`, `post_deliveries`, `post_metric_snapshots`, `video_generations`, `video_generation_inputs`, `manager_notifications`. Trigger `require_draft_scope` trên `posts` chỉ cho ghi bài ở trạng thái `draft`.

Các bảng này giữ lại để không mất thiết kế, **không** phải thiết kế đã xong. Trước khi gỡ chặn cho một luồng phải có: quyết định của khách → cập nhật tệp này → migration mới (bảng, quyền runtime, chỉ mục) → test. Không gỡ trigger hay bật bằng biến môi trường cho chạy được.

| Luồng | Phải thiết kế thêm trước khi mở |
|---|---|
| Duyệt và đăng (EP06) | Yêu cầu duyệt gắn với phiên bản nội dung; tách lượt gửi / lần thử / kết quả theo từng mạng; chống trùng callback; trạng thái do khách chốt ([QA] No.51); dừng/tiếp tục đăng khi có lượt gửi đang bay. Thử callback trễ, timeout của Upload-Post  Nơi nhận yêu cầu duyệt là Manager phụ trách từng Talent (KS K77/K93; P-16), không phải nhóm như lựa chọn còn mở; cách đăng 自動投稿 (P-12). |
| Thu phí (EP08) | Hợp đồng phí có hiệu lực, giá chụp lại lúc phát sinh, kỳ thu, hóa đơn và dòng hóa đơn, lần thanh toán, điều chỉnh sau khi chốt kỳ, chống thu hai lần. Không sửa lùi `is_counted` của dữ liệu cũ |
| Mạng xã hội, mục tiêu | Số tài khoản mỗi mạng (đã chốt: một, P-01); định danh không đổi khi kết nối lại; version/hiệu lực mục tiêu theo từng SNS và dữ liệu đồng bộ |

Các đề xuất (P-01…P-26; P-13 giới hạn 2 lần đã rút, P-18 cần thiết kế retention, P-19 cần rà lại phạm vi) ở `04_database_schema.md` §4; tác động của từng điểm chưa rõ ở `06_extensibility_review.md` §2.

---

## 4. Cách viết mã truy cập DB

### 4.1. Quy ước schema

Đặt tên, kiểu khóa, thời gian và múi giờ, tiền, liệt kê, xóa: `04_database_schema.md` §1.

### 4.2. Quyền và chủ sở hữu

- BE kết nối bằng `talent_api` (nhóm `talent_runtime`). Policy RLS của runtime là `USING (true)`: **DB không lọc theo người dùng**. Mọi truy vấn của tài năng phải có điều kiện chủ sở hữu lấy từ phiên đã xác minh (`talent_id` tra theo `actor.userId`), không lấy từ body.
- Khóa ngoại kép (`id`, `talent_id`) chặn gắn tư liệu, chủ đề, bài của người khác. Ghi bảng con thì truyền đúng `talent_id` của chủ.
- Quản lý xem dữ liệu riêng của tài năng: ghi `manager_view_logs` trong cùng giao dịch, trước khi trả dữ liệu.

### 4.3. Khóa lạc quan

`talent_applications`, `talents`, `posts`, `domain_operations` có `version`. Trigger bắt mỗi UPDATE tăng **đúng 1**, nhưng không thay được kiểm tra của dịch vụ:

```ts
const n = await db.$executeRaw`UPDATE public.talent_applications
  SET status = 'approved', decided_by_manager_id = ${managerId}::uuid, decided_at = now(), version = version + 1
  WHERE id = ${id}::uuid AND version = ${expectedVersion} AND status = 'pending'`
if (n !== 1) throw new AppError('VERSION_CONFLICT', 409)   // quản lý khác đã quyết trước
```

### 4.4. Tác động ra ngoài: operation + outbox

Mọi việc gọi dịch vụ ngoài (tạo người dùng Auth, chuyển tư liệu sang OneDrive, gửi push…) đi theo giao thức này. Bảng: `app_private.domain_operations`, `app_private.outbox_events`.

1. Server tạo `operation_key` (theo người gọi + use case + lệnh). Cùng khóa mà khác `payload_hash` → 409. Không băm mật khẩu hay mã OTP làm khóa.
2. Thay đổi nghiệp vụ + `domain_operations` + `outbox_events` ghi **trong cùng một giao dịch**.
3. Worker lấy sự kiện `pending` bằng `FOR UPDATE SKIP LOCKED`, ghi `lease_token`, `lease_until` rồi **commit trước** khi gọi HTTP. Không giữ khóa DB trong lúc gọi HTTP.
4. Hoàn tất: `UPDATE … WHERE state = 'leased' AND lease_token = $token`. Worker cũ không hoàn tất được lượt đã bị lấy lại.
5. Hết giờ chờ sau khi đã gửi, hoặc lease hết hạn khi có thể đã gửi → `unknown`, rồi đối soát với dịch vụ ngoài trước khi thử lại. Không đẩy mù về `pending`.
6. Dịch vụ có idempotency thì dùng id của operation; không có thì đối soát hoặc bù trừ. Không hứa "đúng một lần".
7. Payload thật đọc lại từ bảng nghiệp vụ theo tham chiếu; outbox không chứa mật khẩu, token, thông tin cá nhân.
8. Tin trong ứng dụng + operation/outbox của push ghi cùng giao dịch; UNIQUE `event_key` chống trùng.

Nhóm `talent_dispatcher` hiện chỉ quản lý lease của outbox và đọc operation. Worker cụ thể cần quyền nào thì cấp tối thiểu trong migration riêng, có test.

### 4.5. Thứ tự khóa

Trong một lệnh: đơn đăng ký → quản lý/tài năng → principal → phiên → challenge → bài/tư liệu → operation → outbox; trong cùng loại khóa theo `id` tăng dần. Gặp lỗi 40 P01 (deadlock) hay 40001 (xung đột tuần tự) thì thử lại **cả giao dịch** có giới hạn, không lặp tác động ra ngoài.

---

## 5. Thay đổi schema

Lệnh và quy trình: [apps/api/PRISMA.md](../apps/api/PRISMA.md). Quy tắc:

1. Chỉ thay đổi bằng migration mới. **Không sửa migration đã áp**; sai thì sửa tiến bằng migration sau. Không `prisma db push`, không `migrate reset` trên Supabase.
2. Dùng `npm run db:dev` / `db:diff` / `db:pull` (bọc qua `tools/prisma-safe.ts` để Prisma coi các bảng `auth.*` là bảng bên ngoài). Migration không được CREATE/ALTER/DROP gì trong schema `auth`.
3. Thêm tay vào SQL: CHECK, trigger `updated_at`, chỉ mục theo biểu thức, **GRANT + POLICY cho `talent_runtime`** đúng các lệnh cần (bảng nhật ký chỉ SELECT/INSERT); mẫu ở HD-Auth §5.2.
4. Migration có dữ liệu thật: `SET LOCAL lock_timeout = '5s'`; kiểm dữ liệu sai trước khi thêm ràng buộc, không tự xóa hay sửa dữ liệu theo phỏng đoán; thay đổi lớn chia thành mở rộng → điền dữ liệu → kiểm.
5. Trước khi áp lên Supabase: chạy lại toàn bộ migration trên Postgres cục bộ (`apps/api/prisma/local/bootstrap.sql` rồi `migrate deploy`); chạy thử trong giao dịch rồi ROLLBACK trên Supabase dev; kiểm không bảng nào tắt RLS và `anon`/`authenticated` không có quyền.
6. Sau migration: sinh lại `05_data_dictionary.md` bằng `gen_tu_dien.py` (thêm mô tả cho bảng/cột mới trong script); cập nhật `01` (truy vết), `02`–`04`, `06` và §2–§3 của tệp này nếu phạm vi đổi.

---

## 6. Nguồn

[YK2] §2, §5-1, §6-1, §6-2, §6-4, §6-6, §6-7, §6-9, §6-11, §7-3, UC-01; [QA] No.1–5, 7, 9–11, 13, 14, 17, 20, 21, 23, 40–42, 47–49, 51–53, 55–66; CR-01, 02, 06, 07, 09–11, 13, 16–19, 24; quyết định của chủ dự án ngày 17/11/2026 (chỉ làm phần đã chốt). Tệp này thay `10_confirmed_scope_and_remediation.md`; các báo cáo review và triển khai `07`–`12` cũ (bản 17/11/2026) xem trong lịch sử Git.

## 7. Điều kiện áp dụng sau rà soát 23/11

- Không mở các trigger chặn ghi chỉ vì nguồn mới có thêm màn hoặc tài liệu DB đã cập nhật. G1 đang BLOCKED, G2–G4 STALE ở phạm vi bị ảnh hưởng, G5/G6 BLOCKED; lần sửa này không đổi gate. Chưa có ký độc lập hoặc phê duyệt thương mại/release.
- Trước EP06: thiết kế cancellation cho Talent/Manager (KS K84), bỏ nút global stop (K85), retry do Talent thực hiện (K87), revision/consent và trạng thái từng SNS. KS20261122 G4:I 4 đã chốt AI sửa NG rồi đặt lịch, không Manager sửa/không Talent xác nhận lại; G20:H 20 giữ TikTok direct. Không giữ các đề nghị 22/11 như blocker nghiệp vụ; QA96 và nhánh lỗi riêng vẫn còn.
- Trước EP08: mô hình kỳ trả trước và snapshot giá; tạm dừng tự nguyện vẫn thu phí (K116), dừng do quá hạn một tháng mới là hướng cân nhắc (K104). Không bật auto-lock hoặc tự quyết xử lý công nợ khi ended (No.98).
- Không tạo bảng đồng ý phụ huynh theoKS 20261122 G18:H 18; ranking/voice ngoài phase theoYK 3 P62–65. So sánh liên Talent vẫn đề nghị riêng. Tech Lead thiết kế và kiểm provider; khách quyết định chính sách/phạm vi, không thay bằng dữ liệu demo.
- Từ điển 05 giữ nguyên snapshot 38 bảng và có bổ sung mô tả 2 bảng demo theo SQL. Khi thực sự regenerate từ catalog, dùng danh mục/mô tả cập nhật của `gen_tu_dien.py` để đủ 53 bảng và ghi nguồn catalog, migration thực áp, thời điểm; không chạy script lên DB chỉ để hoàn tất đợt tài liệu này.

## 8. Hợp đồng triển khai nhóm đã rõ 25/11

1. Agent chỉ gọi tool/domain service allowlist có actor thật; không cấp SQL tùy ý. Profile/instruction trong DB, OneDrive export có version. SQL 25/11 là lát cắt hiện có, chưa chứng minh đủ production. Xem 02 §8,03 §8 và 04 §5.
2. Dùng operation/outbox hiện có; run/attempt/step/proposal/command giữ checkpoint và receipt. Một attempt có nhiều model call; báo cáo hợp nhất legacy usage với model steps, không tính đôi. Adesso chịu token; không tự đưa vào hóa đơn Talent.
3. NG rewrite không yêu cầu Talent duyệt lại. Duyệt bài công việc vẫn theo source; autopost/office không thêm Manager approval. Lưu revision/ruleset; không cho model ghi provider success/paid.
4. Giờ đăng nằm ở plan từng SNS; agent quyết trong policy, OS thực thi. Dedupe/cancel/unknown/reconciliation là việc đội thiết kế, không chờ khách duyệt kỹ thuật. Không tự retry bài đã failed.
5. Paused vẫn có phí tháng và dừng lời nhắc; trạng thái login/lịch đang có giữ đúng phần chưa quyết. Không gộp posting pause/ended/payment delinquency. Square là hướng chọn hiện hành, provider check không là thủ tục hỏi lại chọn cổng.
6. Điều kiện gỡ chặn là quyết định nguồn đủ cho đúng nhánh + contract/DDL/ACL được review + migration/kiểm thử; không đòi mọi QA đóng mới thiết kế phần đã rõ. Không gỡ trigger trong lần cập nhật tài liệu này.

Các CR được dẫn trong bảng lịch sử phải tra theo snapshot tương ứng; CR hiện hành 01–14 không cùng nghĩa với CR17–25 cũ. Không dùng nhãn Close, schema demo hoặc lần cập nhật này thay phê duyệt thương mại/release.

## 9. Điều kiện dùng thiết kế kỹ thuật mới

Dùng [09](09_technical_design.md) và [10](10_target_data_dictionary.md) làm contract đề xuất để viết DDL theo wave; các bảng vẫn chưa có migration. Thứ tự khóa đích tại09 §12 phải được review và áp đồng bộ các handler liên quan trước writer mới, không trộn thứ tự khóa cũ. Providerchecks theo [CSV](technical-provider-checks-2026-11-25.csv); test theo34ca tại09 §13. Không tự gỡ trigger hoãn hoặc bật payment/publish/purge từ việc tài liệu đã có thiết kế.
