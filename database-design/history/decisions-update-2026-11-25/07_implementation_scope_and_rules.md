# 07. Phạm vi triển khai và quy tắc khi viết mã

> **Review mới 25/11/2026:** Bộ này chưa đủ cho toàn phạm vi nguồn 0.3 và AI Core v2.10; các số đếm/scope bên dưới là snapshot cũ. Xem [báo cáo review đầy đủ](08_full_review_2026-11-25.md) và [coverage](review-2026-11-25-coverage.csv). SQL working tree hiện có13 migration/53 bảng ứng dụng; chưa kiểm DB live.

> **Rà soát 23/11/2026:** Đối chiếu QA/KS hiện hành và bộ `23112026`; xem [kết quả tác động DB](06_extensibility_review.md) và [danh mục nguồn](../TAI_LIEU_NGUON.md). Tách schema trong repository, quyết định nguồn và đề xuất thiết kế. Lần rà này chỉ cập nhật tài liệu, chưa áp migration hoặc kiểm tra database đang chạy; không cấp phê duyệt nghiệp vụ, thương mại hay release.

Bản 2.0 · 18/11/2026 · Bước 7. Dành cho AI agent lập trình. Thay `10_confirmed_scope_and_remediation.md` (bản 17/11/2026): phạm vi đợt 1, bảng đang chặn ghi, cách viết mã truy cập DB và quy tắc migration.

Bộ thiết kế DB:

| Tệp | Nội dung |
|---|---|
| `01_confirmed_requirements.md` | Phân loại yêu cầu, ma trận truy vết R…, quy tắc nghiệp vụ BR…, điểm chưa rõ U… |
| `02_entity_inventory.md` | Ranh giới dữ liệu, danh mục 40 bảng trong 7 migration (chưa kiểm trạng thái áp), những gì không thành bảng |
| `03_erd.md` | ERD, quyết định thiết kế D…, vòng đời trạng thái |
| `04_database_schema.md` | Quy ước, danh sách migration, đề xuất chờ khách P… |
| `05_data_dictionary.md` | Từ điển từng cột (sinh từ catalog bằng `gen_tu_dien.py`) |
| `06_extensibility_review.md` | Khách chốt một điểm chưa rõ thì phải đổi gì |
| `07_implementation_scope_and_rules.md` (tệp này) | Được làm gì, cách viết mã và migration |

**Hai loại căn cứ:** SQL migration là căn cứ cấu trúc được mô tả trong repository; catalog trực tiếp mới xác minh DB đang chạy. Nghiệp vụ theo nguồn gốc trong [TAI_LIEU_NGUON.md](../TAI_LIEU_NGUON.md), quyết định đúng chủ đề và QA/KS hiện hành; migration, code và tài liệu05 không thể thay xác nhận khách. Khi lệch, ghi gap và thiết kế migration sau; không sửa yêu cầu cho khớp code.

Đọc kèm: [apps/api/PRISMA.md](../apps/api/PRISMA.md) (lệnh migration); [HD-Auth](../agent_spec/supabase-db-auth-spec/HUONG_DAN_TICH_HOP_VI.md) (đăng nhập, phiên, cách dùng các bảng `auth_*`); [HD-PWA](../agent_spec/pwa-platform-spec/HUONG_DAN_TICH_HOP_VI.md) (thông báo đẩy).

Ký hiệu: [YK2] = bản định nghĩa yêu cầu v2; [QA] = bảng hỏi đáp với khách; CR = yêu cầu bổ sung đã chốt ở sheet 追加要件 (yêu cầu bổ sung) của [QA]; R…, BR…, U… theo `01`.

---

## 1. Nguyên tắc phạm vi

Quyết định của chủ dự án ngày 17/11/2026: **chỉ làm phần đã chốt**, phần còn lại cập nhật dần.

- **Căn cứ phạm vi:** quyết định nguồn có thẩm quyền, đúng chủ đề và còn hiệu lực; trạng thái Close riêng lẻ không cấp quyền triển khai. Đối chiếu xung đột mới, gate và phê duyệt áp dụng trước khi mở luồng. Bảng đợt1 bên dưới là định hướng nội bộ, không phải phê duyệt khách/thương mại/release.
- **Chỉ tra cứu:** nội dung chỉ có trong [YK2] (bản 0.1), chưa có xác nhận riêng. Không coi là khách đã đồng ý.
- **Hoãn:** câu [QA] còn mở, chưa rõ, mâu thuẫn. Không dùng quy tắc tạm để mở chức năng. Chỉ mở lại bằng tài liệu + migration mới (§3).
- Schema có sẵn **không** có nghĩa API, guard, worker hay giao diện đã xong.

---

## 2. Phạm vi đợt 1

| Luồng | Căn cứ | Được làm | Giới hạn |
|---|---|---|---|
| Gửi đơn, quản lý duyệt/từ chối, tạo tài khoản | [QA] No.11, CR-01; trường tên, email, ngày sinh ([YK2] §6-4 2-2) | Dữ liệu + lệnh tạo tài khoản (operation) | Chưa làm: gửi lại đơn bị từ chối, đảo quyết định, hạn mật khẩu tạm (chờ [QA] No.65). Đồng ý điều khoản chờ U-14: không thêm cột/CHECK giả định |
| Một loại quản lý; vô hiệu; nhật ký xem | [QA] No.5, 21; CR-13 | Có | Guard kiểm DB mỗi request; thời hạn phiên là cấu hình (HD-Auth §4), không viết cứng vào CHECK |
| Tài khoản công ty: loại riêng, không thu phí, không duyệt bài | [QA] No.20, 47–48; CR-11 | Dữ liệu + tạo tài khoản | Chưa làm màn đăng bài cho tài khoản công ty (chờ luồng đăng). Chi tiết vận hành chờ [QA] No.66 |
| Trạng thái tài năng, ngừng sử dụng | [QA] No.10 | Lưu trạng thái; `ended` thì chặn quyền | Không cho quay lại từ `ended` theo yêu cầu KS 確認56; P-18 là đề xuất, chưa chứng minh trigger đã có. Bổ sung 一時停止 theo K116/F32 còn cần migration và ma trận hành vi; xóa dữ liệu sau 6 tháng ([KS] 確認55; P-18). Thời điểm `before_use` → `in_use`, tính tiền chờ [QA] No.52, 53, 64 |
| Tư liệu do tài năng/quản lý gửi, hướng lưu Supabase/OneDrive (QA No.8) | CR-09, CR-10 | Metadata, chủ sở hữu, outbox `media.transfer` | Giới hạn tệp, link chia sẻ, dọn bản tạm phải chốt khi tích hợp OneDrive. Không mở link công khai mặc định  Phạm vi Manager gửi thay cần rà KS 確認27 với F20; không tự thêm trigger office-only P-19. |
| Chủ đề, bản nháp; danh sách từ cấm chung | [QA] No.9, 13, 40–41; CR-02, 06, 07 | Lưu và sửa bản nháp, tư liệu | Chưa làm: adopt (chấp nhận bản nháp), duyệt, hẹn giờ, gửi sang Upload-Post. Hạn và giờ đăng chờ [QA] No.55–57  AI viết lại không giới hạn lượt (KS K65/20-11; DEC-0001); P-13 cũ đã rút. Revision được duyệt cần thiết kế P-23. |
| Hội thoại và chi phí AI | [QA] No.17; CR-16 | Lưu tin nhắn, chi phí, outbox | Manager xem hội thoại đã có phản hồi QA No.7 H8; kiểm guard và ghi nhật ký trước triển khai, không còn chờ quyết định riêng tư cũ. Gọi AI phải chống ghi trùng từng lần gọi |
| Thông báo cho tài năng | [QA] No.42; nền tảng PWA | Tin trong ứng dụng, đăng ký push, outbox | Không thêm loại thông báo chưa chốt; thông báo quản lý và "đã xử lý" chờ U-10, U-11 |
| Mục tiêu, số người theo dõi, kết nối mạng xã hội | [QA] No.14 H15; [KS] 確認10; reconnect/disconnect No.95 | **Hoãn** | Đã rõ mục tiêu theo từng SNS và một tài khoản mỗi mạng; còn tích hợp, lịch sử mục tiêu, reconnect và tác động lên lịch đã có (No.95) |
| Tạo video AI có phí | Quy tắc đếm chốt ở [QA] No.1, 3; đơn giá, kỳ chưa chốt | **Hoãn chạy thật** | Không tạo lượt có thể phải tính tiền khi chưa có giá/kỳ |
| Duyệt, adopt, hẹn, đăng, hẹn lại, hủy ở Upload-Post | [QA] No.51, 57–61 mở | **Hoãn** | Không dùng bộ trạng thái tạm hay quy tắc "một mạng lỗi thì cả bài lỗi" |
| Thu phí tháng, giá video, hóa đơn, thanh toán | [QA] No.4, 49, 53, 62–64 mở | **Hoãn** | Không worker thu tiền, không hóa đơn giả  Đã có hướng tháng từ ngày đăng ký và trả trước (KS K104/F24); GMO là ứng viên, chưa chọn provider/contract; công nợ khi ended còn No.98. |
| Nhóm tài năng, quản lý phụ trách theo Talent, chỉ thị AI, thử thách cá nhân hóa | CR-17〜19, CR-22; [KS] 確認5–8, 34, 47 | **Đã chốt, chưa có bảng** | Thiết kế `04` P-15〜P-17 trước khi làm; không thêm bảng tổ chức nhiều bên |
| Cách đăng 自動投稿 / 要確認 | [KS] 確認19, 25 | **Đã chốt, chưa có bảng** | Chi tiết luồng chờ khách (U-16); phải sửa `chk_posts_adopted` (P-12) |
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

Các đề xuất (P-01…P-26; P-13 giới hạn2lần đã rút, P-18 cần thiết kế retention, P-19 cần rà lại phạm vi) ở `04_database_schema.md` §4; tác động của từng điểm chưa rõ ở `06_extensibility_review.md` §2.

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

Trong một lệnh: đơn đăng ký → quản lý/tài năng → principal → phiên → challenge → bài/tư liệu → operation → outbox; trong cùng loại khóa theo `id` tăng dần. Gặp lỗi 40P01 (deadlock) hay 40001 (xung đột tuần tự) thì thử lại **cả giao dịch** có giới hạn, không lặp tác động ra ngoài.

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

## 7. Điều kiện áp dụng sau rà soát23/11

- Không mở các trigger chặn ghi chỉ vì nguồn mới có thêm màn hoặc tài liệu DB đã cập nhật. G1 đang BLOCKED, G2–G4 STALE ở phạm vi bị ảnh hưởng, G5/G6 BLOCKED; lần sửa này không đổi gate. Chưa có ký độc lập hoặc phê duyệt thương mại/release.
- Trước EP06: thiết kế cancellation cho Talent/Manager (KS K84), bỏ nút global stop (K85), retry do Talent thực hiện (K87), revision/consent và trạng thái từng SNS. KS K59, UI-M20 p18 và ISS22-P p7 chưa thống nhất luồng NG; inbox TikTok mới là đề nghị, không là publish thành công.
- Trước EP08: mô hình kỳ trả trước và snapshot giá; tạm dừng tự nguyện vẫn thu phí (K116), dừng do quá hạn một tháng mới là hướng cân nhắc (K104). Không bật auto-lock hoặc tự quyết xử lý công nợ khi ended (No.98).
- Chưa tạo bảng ranking, đồng ý phụ huynh hoặc so sánh liên Talent để đón đầu đề xuất22/11. Tech Lead thiết kế và kiểm provider; khách quyết định chính sách/phạm vi, không thay bằng dữ liệu demo.
- Từ điển05 giữ nguyên snapshot38bảng và có bổ sung mô tả2bảng demo theo SQL. Khi thực sự regenerate, cập nhật danh mục/mô tả của `gen_tu_dien.py` để đủ40bảng và ghi nguồn catalog, migration thực áp, thời điểm; không chạy script lên DB chỉ để hoàn tất đợt tài liệu này.
