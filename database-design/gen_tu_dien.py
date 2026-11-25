#!/usr/bin/env python3
"""Sinh 05_data_dictionary.md từ catalog của một Postgres CỤC BỘ đã chạy đủ migration.

Cách chạy (không bao giờ trỏ tới Supabase), ở thư mục gốc repo:
  docker run -d --rm --name talentos-dict -e POSTGRES_PASSWORD=t -p 55434:5432 postgres:17-alpine
  docker exec -i talentos-dict psql -U postgres < apps/api/prisma/local/bootstrap.sql
  for m in apps/api/prisma/migrations/2*/migration.sql; do docker exec -i talentos-dict psql -U postgres -v ON_ERROR_STOP=1 < $m; done
  python3 database-design/gen_tu_dien.py postgresql://postgres:t@localhost:55434/postgres database-design/05_data_dictionary.md > /tmp/05.md
  mv /tmp/05.md database-design/05_data_dictionary.md

Đối số 2 là bản 05 hiện có: cột "Mô tả" và "Yêu cầu" được giữ lại từ đó. Bảng/cột mới thì thêm mô tả vào
MO_TA_BANG / MO_TA_COT / YEU_CAU_BANG dưới đây rồi chạy lại; cột thiếu mô tả được liệt kê ra stderr.
"""
import json, re, subprocess, sys

URL = sys.argv[1]
assert URL.split('@')[1].split(':')[0] in ('localhost', '127.0.0.1'), 'Chỉ chạy với Postgres cục bộ'


def q(sql: str):
    out = subprocess.run(['psql', URL, '-tA', '-c', f"SELECT coalesce(json_agg(x), '[]') FROM ({sql}) x"],
                         check=True, capture_output=True, text=True).stdout
    return json.loads(out)


# Nhóm theo phạm vi (07_implementation_scope_and_rules.md §2). Thêm bảng mới thì xếp vào đúng nhóm.
NHOM = {
    'Danh tính và phiên': ['app_private.auth_principals', 'public.managers', 'public.talent_applications', 'public.talents',
                           'app_private.auth_session_registry', 'app_private.auth_challenges', 'app_private.auth_mfa_enrollments',
                           'app_private.auth_login_identifiers', 'app_private.password_lock_state', 'app_private.auth_rate_buckets'],
    'Nội dung, tư liệu, AI coach': ['public.theme_suggestions', 'public.posts', 'public.post_media', 'public.media_assets',
                                    'public.coach_messages', 'public.ai_usage_events', 'public.ng_words'],
    'Thông báo': ['public.talent_notifications', 'public.push_subscriptions', 'app_private.push_deliveries', 'public.manager_notifications'],
    'Tác vụ bên ngoài (operation, outbox)': ['app_private.domain_operations', 'app_private.outbox_events'],
    'Cài đặt và nhật ký': ['public.system_settings', 'public.manager_view_logs', 'public.activity_logs'],
    'Module còn chặn ghi: có quyết định nghiệp vụ nhưng chưa đủ triển khai': ['public.billing_accounts', 'public.social_accounts', 'public.follower_goals',
                                               'public.follower_snapshots', 'public.post_approval_decisions', 'public.post_deliveries',
                                               'public.post_metric_snapshots', 'public.video_generations', 'public.video_generation_inputs'],
    'Chỉ dùng cho demo công nghệ: không dùng cho tính năng thật': ['app_private.tech_demo_sessions', 'app_private.tech_demo_push_subscriptions',
                                                                   'app_private.demo_auth_deliveries'],
}

# Cập nhật25/11: danh mục SQL hiện có; không suy đã áp lên DB live.
NHOM['AI runtime và dữ liệu nghiệp vụ agent'] = ['app_private.ai_executions', 'app_private.ai_execution_attempts', 'app_private.ai_daily_trends', 'app_private.agent_conversations', 'app_private.agent_entries', 'app_private.agent_talent_profiles', 'app_private.agent_talent_profile_versions', 'app_private.agent_instructions', 'app_private.agent_instruction_versions', 'app_private.agent_profile_exports', 'app_private.agent_steps', 'app_private.agent_change_proposals', 'app_private.agent_commands']
NHOM['Chỉ dùng cho demo công nghệ: không dùng cho tính năng thật'] += ['app_private.tech_demo_onedrive_connections', 'app_private.tech_demo_onedrive_oauth_states']

MO_TA_BANG = {
    'app_private.auth_principals': 'Danh tính ứng dụng: một dòng cho mỗi người dùng Supabase Auth được cấp quyền. Quyết định là quản lý hay tài năng; buộc đổi mật khẩu; `security_version` tăng thì mọi phiên cũ hết hiệu lực.',
    'public.managers': 'Quản lý (một loại quyền duy nhất, [QA] No.5, No.21). Vô hiệu thì trigger thu hồi mọi phiên.',
    'public.talent_applications': 'Đơn đăng ký tự gửi từ PWA; quản lý duyệt hoặc từ chối ([QA] No.11, CR-01).',
    'public.talents': 'Tài năng và tài khoản công ty (`account_type`). Loại `talent` phải đến từ đơn đã duyệt; `office` do quản lý tạo. Chuyển sang `ended` thì trigger thu hồi mọi phiên.',
    'app_private.auth_session_registry': 'Sổ phiên: một dòng cho mỗi `session_id` trong JWT, do BE tạo lúc đăng nhập. Guard đọc bảng này mỗi request (HD-Auth §6.3).',
    'app_private.auth_challenges': 'Lượt xác minh TOTP do server tạo, gắn đúng phiên, người dùng, factor.',
    'app_private.auth_mfa_enrollments': 'Lượt đăng ký TOTP đang dở của một phiên; chặn hai lượt cùng lúc.',
    'app_private.auth_login_identifiers': 'Băm HMAC của email đăng nhập → người dùng; để đếm sai mật khẩu trước khi gọi Auth.',
    'app_private.password_lock_state': 'Bộ đếm sai mật khẩu và thời điểm hết khóa (5 lần / 15 phút, [QA] No.25).',
    'app_private.auth_rate_buckets': 'Giới hạn tần suất theo khóa đã băm (IP, phiên, người dùng) và cửa sổ thời gian.',
    'public.theme_suggestions': '3 chủ đề AI đề xuất mỗi ngày cho mỗi tài năng.',
    'public.posts': 'Bản nháp bài đăng. Đợt 1 chỉ tạo và sửa bản nháp; trigger chặn adopt, hẹn giờ, đăng.',
    'public.post_media': 'Tư liệu gắn vào bài, có thứ tự.',
    'public.media_assets': 'Ảnh/video có owner; byte media theo adapter Supabase/OneDrive (QA8). Không suy dữ liệu agent trongDB nghĩa byte media trongPostgres.',
    'public.coach_messages': 'Tin nhắn giữa tài năng và AI coach (chỉ thêm, không sửa).',
    'public.ai_usage_events': 'Một dòng cho mỗi lần gọi nhà cung cấp AI: token và chi phí ([QA] No.17, CR-16).',
    'public.ng_words': 'Danh sách từ cấm chung toàn hệ thống.',
    'public.talent_notifications': 'Tin trong ứng dụng của tài năng (T-14 của [AG]). Ghi trước khi đẩy; `event_key` chống tạo trùng.',
    'public.push_subscriptions': 'Đăng ký thông báo đẩy của từng máy, gắn với tài năng và phiên đăng nhập tạo ra nó (HD-PWA §6.3).',
    'app_private.push_deliveries': 'Một dòng cho mỗi lần gửi một sự kiện outbox tới một máy; chống gửi trùng khi worker chạy lại.',
    'public.manager_notifications': 'Thông báo cho quản lý. Đang chặn ghi: loại thông báo và cách "đã xử lý" chưa chốt (U-10, U-11).',
    'app_private.domain_operations': 'Lệnh nghiệp vụ có tác động ra ngoài (tạo tài khoản, chuyển tư liệu…): khóa idempotency, trạng thái, bước, mã tham chiếu bên ngoài.',
    'app_private.outbox_events': 'Ý định gọi dịch vụ ngoài, ghi cùng giao dịch với dữ liệu nghiệp vụ; worker lấy theo lease.',
    'public.system_settings': 'Một dòng cài đặt chung (giờ nhắn sáng, nhắc trước giờ đăng, số ngày không đăng, ngày tổng kết tuần, công tắc dừng đăng toàn bộ).',
    'public.manager_view_logs': 'Nhật ký quản lý xem thông tin tài năng ([YK2] §6-2 7-6). Chỉ thêm; trigger chặn sửa, xóa.',
    'public.activity_logs': 'Nhật ký thao tác và kết quả xử lý. Chỉ thêm; trigger chặn sửa, xóa.',
    'public.billing_accounts': 'Đăng ký thanh toán của tài năng (không chứa thông tin thẻ). Chặn ghi: thu phí chưa chốt ([QA] No.4, 49, 53, 62–64).',
    'public.social_accounts': 'Tài khoản mạng xã hội đã kết nối qua Upload-Post. Chặn ghi: số tài khoản mỗi mạng chưa chốt ([QA] No.23).',
    'public.follower_goals': 'Mục tiêu người theo dõi. Chặn ghi: mục tiêu tổng hay theo từng mạng chưa chốt ([QA] No.14).',
    'public.follower_snapshots': 'Số người theo dõi mỗi ngày. Chặn ghi theo `social_accounts`.',
    'public.post_approval_decisions': 'Quyết định duyệt/trả lại bài. Chặn ghi: luồng duyệt chưa chốt ([QA] No.51, 57–61).',
    'public.post_deliveries': 'Việc đăng một bài lên một mạng. Chặn ghi: trạng thái và luồng đăng chưa chốt.',
    'public.post_metric_snapshots': 'Số liệu bài theo ngày. Chặn ghi theo `post_deliveries`.',
    'public.video_generations': 'Lượt tạo video AI. Chặn ghi: đơn giá, kỳ thu chưa chốt.',
    'public.video_generation_inputs': 'Ảnh đầu vào của lượt tạo video. Chặn ghi theo `video_generations`.',
    'app_private.tech_demo_sessions': 'Sổ phiên của bản demo công nghệ. Tính năng thật dùng `auth_session_registry`.',
    'app_private.tech_demo_push_subscriptions': 'Đăng ký push của bản demo. Tính năng thật dùng `public.push_subscriptions`.',
    'app_private.demo_auth_deliveries': 'Giao mật khẩu tạm của bản demo cũ (đã thu gọn). Không dùng.',
}

MO_TA_BANG.update({'app_private.ai_executions': 'Run: task/revision, actor/channel/scope, conversation và lease; mở rộng từ legacy.', 'app_private.ai_execution_attempts': 'Lượt worker sở hữu lease; agent dùng step_ledger, không đồng nhất một attempt với một model call.', 'app_private.ai_daily_trends': 'Cache tin/chủ đề theo ngày; không thay provenance từng bài.', 'app_private.agent_conversations': 'Hội thoại thuộc actor; Talent có subject cố định, Manager chọn đối tượng qua tool.', 'app_private.agent_entries': 'Tin user/assistant theo sequence; attachment/action typed còn cần bổ sung.', 'app_private.agent_talent_profiles': 'Hồ sơ5trường allowlist trong DB, có version và người cập nhật.', 'app_private.agent_talent_profile_versions': 'Snapshot lịch sử profile theo Talent/version, append-only ở quyền runtime.', 'app_private.agent_instructions': 'Chỉ thị scope+situation, enable/version; category hiện bị CHECK chặn.', 'app_private.agent_instruction_versions': 'Lịch sử nội dung/enable theo instruction/version; restore phải tạo revision mới.', 'app_private.agent_profile_exports': 'Version profile đã xuất sang OneDrive; không là nguồn đọc ngược vào DB.', 'app_private.agent_steps': 'Checkpoint model/tool, input/output, usage và kết quả; liên kết execution/attempt.', 'app_private.agent_change_proposals': 'Đề xuất thay profile/instruction với hash/base version/expiry và xác nhận actor.', 'app_private.agent_commands': 'Receipt lệnh đã commit, unique proposal; lát cắt hiện chỉ profile.update/instruction.write.'})

# Mô tả cột mới (sau `05` cũ) hoặc cần ghi đè. Khóa: "schema.bảng.cột"
MO_TA_COT = {
    'public.managers.principal_kind': 'Luôn `manager`; cùng `auth_user_id` tạo khóa ngoại kép tới `auth_principals`',
    'public.talents.principal_kind': 'Luôn `talent` (kể cả tài khoản công ty)',
    'public.talents.application_status': 'Bản sao trạng thái đơn để khóa ngoại kép bảo đảm đơn đã `approved`',
    'public.billing_accounts.account_type': 'Luôn `talent`: khóa ngoại kép chặn thu phí tài khoản công ty',
    'public.post_media.talent_id': 'Chủ của bài và tư liệu; khóa ngoại kép chặn gắn tư liệu của người khác',
    'public.video_generation_inputs.talent_id': 'Chủ của lượt tạo và ảnh đầu vào',
    'public.post_deliveries.talent_id': 'Chủ của bài và tài khoản mạng xã hội',
    'public.managers.auth_user_id': 'Người dùng Supabase Auth (khóa ngoại tới `auth.users`)',
    'public.talents.auth_user_id': 'Người dùng Supabase Auth (khóa ngoại tới `auth.users`)',
    'public.push_subscriptions.owner_session_id': 'Phiên đăng nhập đã tạo đăng ký; thu hồi phiên thì đăng ký bị tắt (trigger)',
    'public.push_subscriptions.owner_auth_user_id': 'Người dùng Auth của phiên chủ; khớp với tài năng (khóa ngoại kép)',
    'app_private.auth_principals.auth_user_id': 'Người dùng Supabase Auth (khóa ngoại tới `auth.users`)',
    'app_private.auth_principals.principal_kind': '`manager` hoặc `talent`; một người dùng chỉ một vai trò',
    'app_private.auth_principals.must_change_password': 'true: phiên mở ra chỉ được đổi mật khẩu (mật khẩu tạm)',
    'app_private.auth_principals.security_version': 'Tăng khi đổi mật khẩu, đổi MFA, vô hiệu: mọi phiên có version cũ bị từ chối',
    'app_private.auth_principals.mfa_enrollment_allowed': 'Cho phép đăng ký TOTP (dùng khi đặt lại MFA cho quản lý)',
    'app_private.auth_session_registry.session_id': '`session_id` trong JWT đã xác minh chữ ký',
    'app_private.auth_session_registry.auth_user_id': 'Chủ phiên',
    'app_private.auth_session_registry.purpose': '`full` dùng được nghiệp vụ; `first_password`/`recovery` chỉ đổi mật khẩu; `mfa_setup` chỉ đăng ký TOTP',
    'app_private.auth_session_registry.security_version_at_issue': 'Bản sao `security_version` lúc mở phiên',
    'app_private.auth_session_registry.auth_time': 'Lúc đăng nhập bằng mật khẩu (bất biến)',
    'app_private.auth_session_registry.absolute_expires_at': 'Hạn tuyệt đối của phiên (bất biến; tài năng 30 ngày)',
    'app_private.auth_session_registry.admin_last_activity_at': 'Thao tác gần nhất của quản lý; quá 30 phút thì phải đăng nhập lại',
    'app_private.auth_session_registry.password_verified_at': 'Lúc xác minh mật khẩu gần nhất trong phiên',
    'app_private.auth_session_registry.mfa_factor_id': 'Factor TOTP đã xác minh trong phiên',
    'app_private.auth_session_registry.mfa_verified_at': 'Lúc xác minh TOTP',
    'app_private.auth_session_registry.mfa_policy_version': 'Phiên bản chính sách MFA lúc xác minh; đổi chính sách thì phải xác minh lại',
    'app_private.auth_session_registry.revoked_at': 'Lúc thu hồi; đã đặt thì không bỏ được',
    'app_private.auth_challenges.session_id': 'Phiên tạo challenge',
    'app_private.auth_challenges.auth_user_id': 'Chủ phiên',
    'app_private.auth_challenges.provider_challenge_id': 'Mã challenge do Supabase Auth trả',
    'app_private.auth_challenges.factor_id': 'Factor TOTP được challenge',
    'app_private.auth_challenges.purpose': '`login`, `enrollment`, `factor_change`',
    'app_private.auth_challenges.state': '`pending` → `verified` / `expired` / `failed`',
    'app_private.auth_challenges.attempts_used': 'Số lần đã thử mã',
    'app_private.auth_challenges.expires_at': 'Hạn của challenge (theo Supabase)',
    'app_private.auth_challenges.verified_at': 'Lúc xác minh thành công',
    'app_private.auth_mfa_enrollments.session_id': 'Phiên đang đăng ký',
    'app_private.auth_mfa_enrollments.auth_user_id': 'Người đăng ký (mỗi người một lượt dở)',
    'app_private.auth_mfa_enrollments.factor_id': 'Factor chưa xác minh do Supabase tạo',
    'app_private.auth_mfa_enrollments.state': '`creating`, `pending`, `unknown` (lỗi giữa chừng, cần đối soát)',
    'app_private.auth_mfa_enrollments.expires_at': 'Hết hạn lượt đăng ký dở',
    'app_private.auth_login_identifiers.email_hash': 'HMAC-SHA256 hex của email đã chuẩn hóa (khóa `LOGIN_HMAC_KEY`)',
    'app_private.auth_login_identifiers.auth_user_id': 'Người dùng ứng với email',
    'app_private.password_lock_state.auth_user_id': 'Người dùng bị đếm',
    'app_private.password_lock_state.consecutive_failures': 'Số lần sai liên tiếp',
    'app_private.password_lock_state.blocked_until': 'Hết khóa lúc này; NULL là không khóa',
    'app_private.password_lock_state.last_failed_at': 'Lần sai gần nhất',
    'app_private.auth_rate_buckets.bucket_key': 'Băm SHA-256 của khóa (mục đích + IP/phiên…); không chứa email thô',
    'app_private.auth_rate_buckets.count': 'Số lần trong cửa sổ hiện tại',
    'app_private.auth_rate_buckets.window_started_at': 'Đầu cửa sổ đếm',
    'app_private.domain_operations.operation_key': 'Khóa idempotency do server tạo; cùng khóa khác `payload_hash` là xung đột',
    'app_private.domain_operations.kind': 'Loại lệnh (danh sách cho phép trong CHECK)',
    'app_private.domain_operations.payload_hash': 'Băm của dữ liệu lệnh không bí mật',
    'app_private.domain_operations.state': '`accepted` → `running` → `completed` / `failed` / `unknown` (cần đối soát)',
    'app_private.domain_operations.step': 'Bước hiện tại của lệnh nhiều bước',
    'app_private.domain_operations.provider_ref': 'Mã tham chiếu ở dịch vụ ngoài (ví dụ id người dùng Auth vừa tạo)',
    'app_private.domain_operations.notification_id': 'Tin trong ứng dụng mà lệnh gửi push thuộc về',
    'app_private.domain_operations.version': 'Khóa lạc quan; mỗi UPDATE phải tăng đúng 1',
    'app_private.outbox_events.operation_id': 'Lệnh sinh ra sự kiện',
    'app_private.outbox_events.event_type': 'Loại sự kiện (danh sách cho phép trong CHECK)',
    'app_private.outbox_events.generation': 'Lần phát hành của cùng loại sự kiện cho một operation',
    'app_private.outbox_events.state': '`pending` → `leased` → `done` / `failed` / `unknown`',
    'app_private.outbox_events.available_at': 'Sớm nhất được lấy (giãn cách thử lại)',
    'app_private.outbox_events.attempts': 'Số lần đã thử',
    'app_private.outbox_events.lease_token': 'Token của worker đang giữ; hoàn tất phải khớp token',
    'app_private.outbox_events.lease_until': 'Hết hạn giữ',
    'app_private.push_deliveries.event_id': 'Sự kiện outbox',
    'app_private.push_deliveries.subscription_id': 'Máy nhận',
    'app_private.push_deliveries.state': '`pending`, `sent`, `gone`, `failed`',
    'app_private.push_deliveries.attempts': 'Số lần thử (tối đa 3)',
    'app_private.push_deliveries.last_error_code': 'Mã lỗi gần nhất (không chứa nội dung)',
    'public.talents.status': '`before_use` 利用前 (chưa dùng), `in_use` 利用中 (đang dùng), `ended` 利用終了 (ngừng dùng) ([QA] No.10)',
    'public.posts.status': '`draft` 投稿案 (bản nháp), `awaiting_approval` 承認待ち (chờ duyệt), `scheduled` 予約済み (đã hẹn), `published` 投稿済み (đã đăng), `failed` 失敗 (lỗi), `cancelled` 取り消し (đã hủy). Đợt 1 runtime chỉ ghi được `draft`',
    'public.talent_notifications.kind': 'Loại thông báo theo 別紙A (phụ lục A của [YK2]); không có CHECK vì danh sách chưa chốt (U-11)',
    'public.talent_applications.decided_at': 'Lúc quản lý duyệt hoặc từ chối; NULL khi còn `pending`',
    'public.talents.onedrive_folder_created_at': 'Lúc tạo thư mục OneDrive',
    'public.posts.cancelled_at': 'Lúc hủy; có khi và chỉ khi `status = cancelled`',
    'public.media_assets.kind': '`photo` hoặc `video`',
    'public.media_assets.mime_type': 'Kiểu tệp (image/jpeg, video/mp4…)',
    'public.media_assets.size_bytes': 'Dung lượng (byte), > 0',
    'public.ai_usage_events.input_tokens': 'Token đầu vào của lần gọi',
    'public.ai_usage_events.output_tokens': 'Token đầu ra của lần gọi',
    'public.push_subscriptions.deactivated_at': 'Lúc tắt; có khi và chỉ khi `is_active = false`',
    'app_private.domain_operations.last_error_code': 'Mã lỗi gần nhất (không chứa nội dung, bí mật)',
    'app_private.outbox_events.last_error_code': 'Mã lỗi gần nhất (không chứa nội dung, bí mật)',
    'public.activity_logs.occurred_at': 'Lúc xảy ra',
    'public.social_accounts.platform': '`instagram`, `tiktok`, `youtube`',
    'public.social_accounts.connected_at': 'Lúc kết nối',
    'public.follower_goals.platform': '`instagram`, `tiktok`, `youtube`',
    'public.follower_snapshots.follower_count': 'Số người theo dõi, ≥ 0',
    'public.follower_snapshots.captured_at': 'Lúc lấy số liệu',
    'public.post_approval_decisions.decided_at': 'Lúc quyết định',
    'public.post_deliveries.platform': '`instagram`, `tiktok`, `youtube`',
    'public.post_metric_snapshots.captured_on': 'Ngày của số liệu (giờ Nhật)',
    'public.post_metric_snapshots.captured_at': 'Lúc lấy số liệu',
    'public.video_generations.video_type': '`short` (video ngắn AI) hoặc `slide` (trình chiếu)',
    'public.video_generations.status': '`requested` → `processing` → `succeeded` / `failed`',
    'public.video_generations.completed_at': 'Lúc xong; có khi `succeeded`/`failed`',
    'app_private.tech_demo_sessions.session_id': 'Demo: `session_id` trong JWT',
    'app_private.tech_demo_sessions.revoked_at': 'Demo: lúc đăng xuất',
    'app_private.tech_demo_push_subscriptions.auth_user_id': 'Demo: chủ đăng ký',
    'app_private.tech_demo_push_subscriptions.session_id': 'Demo: phiên tạo đăng ký',
    'app_private.tech_demo_push_subscriptions.endpoint': 'Demo: địa chỉ máy chủ đẩy',
    'app_private.tech_demo_push_subscriptions.p256dh_key': 'Demo: khóa mã hóa nội dung',
    'app_private.tech_demo_push_subscriptions.auth_secret': 'Demo: khóa bí mật của đăng ký',
    'app_private.tech_demo_push_subscriptions.label': 'Demo: tên máy hiển thị',
    'app_private.tech_demo_push_subscriptions.is_active': 'Demo: còn bật',
    'app_private.demo_auth_deliveries.receipt_hash': 'Demo cũ: băm biên nhận',
    'app_private.demo_auth_deliveries.credential_ciphertext': 'Demo cũ: mật khẩu tạm đã mã hóa',
    'app_private.demo_auth_deliveries.state': 'Demo cũ: trạng thái giao',
    'app_private.demo_auth_deliveries.expires_at': 'Demo cũ: hạn',
    'app_private.demo_auth_deliveries.claimed_at': 'Demo cũ: lúc nhận',
}


# Mã yêu cầu mặc định cho cột mới chưa có trong 05 (theo 01 §3). KT = kỹ thuật.
YEU_CAU_BANG = {
    'app_private.auth_principals': 'R01-07, R01-09', 'app_private.auth_session_registry': 'R01-08, R01-10',
    'app_private.auth_challenges': 'R01-10', 'app_private.auth_mfa_enrollments': 'R01-10',
    'app_private.auth_login_identifiers': 'R01-08', 'app_private.password_lock_state': 'R01-08',
    'app_private.auth_rate_buckets': 'R01-08', 'app_private.push_deliveries': 'R09-01, R09-06',
    'app_private.tech_demo_sessions': 'Demo', 'app_private.tech_demo_push_subscriptions': 'Demo',
    'app_private.demo_auth_deliveries': 'Demo',
}


def mo_ta_cu(path):
    """Đọc (mô tả, yêu cầu) của từng cột từ bản 05 hiện có."""
    out, table = {}, None
    try:
        lines = open(path, encoding='utf-8').read().splitlines()
    except (FileNotFoundError, TypeError):
        return out
    for line in lines:
        if line.startswith('## '):
            name = line[3:].strip()
            table = name if '.' in name else ('public.' + name if re.fullmatch(r'[a-z_]+', name) else None)
        elif table and line.startswith('| ') and not line.startswith('| Cột') and not line.startswith('|---'):
            cells = [c.strip() for c in re.split(r'(?<!\\)\|', line.strip().strip('|'))]
            if len(cells) >= 7:
                for col in cells[0].split(','):
                    out[f'{table}.{col.strip()}'] = (cells[5], cells[6])
    return out


def rang_buoc(col, cons):
    """Tóm tắt ràng buộc của một cột từ pg_constraint (đã lấy kèm danh sách cột)."""
    out = []
    for c in cons:
        cols = c['cols'] or []
        if col not in cols:
            continue
        if c['type'] == 'p':
            out.append('PK' if len(cols) == 1 else f"PK ({', '.join(cols)})")
        elif c['type'] == 'u':
            out.append('UQ' if len(cols) == 1 else f"UQ ({', '.join(cols)})")
        elif c['type'] == 'f':
            out.append(f"FK `{c['ref']}`" if len(cols) == 1 else f"FK kép ({', '.join(cols)}) `{c['ref']}`")
        elif c['type'] == 'c':
            out.append(f"CK `{c['name']}`")
    return '; '.join(dict.fromkeys(out))


def main():
    old = mo_ta_cu(sys.argv[2] if len(sys.argv) > 2 else None)
    tables = q("""SELECT n.nspname||'.'||c.relname AS t, c.oid::int AS oid FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
                  WHERE c.relkind='r' AND n.nspname IN ('public','app_private') AND c.relname<>'_prisma_migrations'""")
    oid = {r['t']: r['oid'] for r in tables}
    listed = {t for ts in NHOM.values() for t in ts}
    assert listed == set(oid), f'NHOM lệch catalog: thiếu {set(oid) - listed}, thừa {listed - set(oid)}'
    missing = []
    print('# 05. Từ điển dữ liệu\n')
    print('Bản 2.0 · 18/11/2026 · Bước 5. **Sinh tự động** từ catalog sau khi chạy đủ 6 migration tới `20261118000100_technology_demo` '
          '(script `gen_tu_dien.py`; đừng sửa tay phần bảng, sửa mô tả trong script hoặc trong tệp này rồi chạy lại). '
          'Nguồn đúng nhất là SQL migration ở `apps/api/prisma/migrations/`. Cột "Yêu cầu" dùng mã ở `01_confirmed_requirements.md`; '
          '"KT" là cột kỹ thuật, không có yêu cầu nghiệp vụ riêng. Phạm vi được làm: `07_implementation_scope_and_rules.md`.\n')
    print('Viết tắt: PK khóa chính, FK khóa ngoại (mọi khóa ngoại là ON DELETE RESTRICT trừ khi DDL ghi khác), FK kép = khóa ngoại nhiều cột '
          '(thường là `id` + `talent_id` để bảo đảm cùng chủ), UQ duy nhất, CK CHECK. "Quyền runtime" là quyền của nhóm `talent_runtime` '
          '(LOGIN `talent_api` của BE). "**Chặn ghi**" = trigger `reject_deferred_write` từ chối INSERT/UPDATE/DELETE (SQLSTATE 55000). '
          'Mọi bảng bật RLS; `anon`, `authenticated` không có quyền.\n')
    print('## Mục lục\n')
    for nhom, ts in NHOM.items():
        print(f'- **{nhom}**: ' + ', '.join(f'[`{t}`]({anchor(t)})' for t in ts))
    for nhom, ts in NHOM.items():
        print(f'\n---\n\n**{nhom}**')
        for t in ts:
            o = oid[t]
            cols = q(f"""SELECT a.attname AS name, format_type(a.atttypid,a.atttypmod) AS type, NOT a.attnotnull AS nullable,
                         pg_get_expr(d.adbin,d.adrelid) AS def, a.attidentity AS ident
                         FROM pg_attribute a LEFT JOIN pg_attrdef d ON d.adrelid=a.attrelid AND d.adnum=a.attnum
                         WHERE a.attrelid={o} AND a.attnum>0 AND NOT a.attisdropped ORDER BY a.attnum""")
            cons = q(f"""SELECT c.conname AS name, c.contype AS type, pg_get_constraintdef(c.oid) AS def,
                         c.confrelid::regclass::text AS ref,
                         (SELECT array_agg(a.attname ORDER BY k.i) FROM unnest(c.conkey) WITH ORDINALITY k(n, i)
                            JOIN pg_attribute a ON a.attrelid=c.conrelid AND a.attnum=k.n) AS cols
                         FROM pg_constraint c WHERE c.conrelid={o} ORDER BY c.contype, c.conname""")
            # CHECK nhiều cột: gắn vào mọi cột được nhắc trong biểu thức
            idx = q(f"""SELECT pg_get_indexdef(indexrelid) AS def FROM pg_index
                        WHERE indrelid={o} AND NOT EXISTS (SELECT 1 FROM pg_constraint c WHERE c.conindid=pg_index.indexrelid) ORDER BY 1""")
            trg = q(f"""SELECT t.tgname AS name, p.proname AS fn FROM pg_trigger t JOIN pg_proc p ON p.oid=t.tgfoid
                        WHERE t.tgrelid={o} AND NOT t.tgisinternal ORDER BY 1""")
            privs = [p for p in ('SELECT', 'INSERT', 'UPDATE', 'DELETE')
                     if q(f"SELECT has_table_privilege('talent_runtime',{o},'{p}') AS v")[0]['v']]
            gated = any(x['fn'] == 'reject_deferred_write' for x in trg)
            name = t.removeprefix('public.')
            print(f'\n## {name}\n')
            print(MO_TA_BANG.get(t, '') + '\n')
            print(f'Quyền runtime: {", ".join(privs) or "không"}' + (' · **Chặn ghi**' if gated else '') + '\n')
            print('| Cột | Kiểu | Null | Mặc định | Ràng buộc | Mô tả | Yêu cầu |\n|---|---|---|---|---|---|---|')
            for c in cols:
                key = f"{t}.{c['name']}"
                d_old, r_old = old.get(key, ('', ''))
                fk = [cc['ref'] for cc in cons if cc['type'] == 'f' and cc['cols'] == [c['name']]]
                desc = MO_TA_COT.get(key) or d_old or (f"Tham chiếu `{fk[0]}`" if fk else '')
                req = r_old or YEU_CAU_BANG.get(t, 'KT')
                default = 'identity' if c['ident'] else (c['def'] or '')
                for cc in cons:
                    if cc['type'] == 'c' and (cc['cols'] is None or len(cc['cols']) > 1) and re.search(rf"\b{c['name']}\b", cc['def']):
                        cc.setdefault('extra', set()).add(c['name'])
                rb = rang_buoc(c['name'], [dict(cc, cols=(cc['cols'] or []) + sorted(cc.get('extra', set()))) for cc in cons])
                if not desc and c['name'] not in ('id', 'created_at', 'updated_at'):
                    missing.append(key)
                esc = lambda s: s.replace('|', '\\|')
                print(f"| {c['name']} | {c['type']} | {'Có' if c['nullable'] else 'Không'} | {esc(default)} | {esc(rb)} | {desc} | {req} |")
            if cons or idx or trg:
                print('\n<details><summary>Ràng buộc, chỉ mục, trigger (định nghĩa đầy đủ)</summary>\n\n```sql')
                for c in cons:
                    print(f"{c['name']}: {c['def']}")
                for i in idx:
                    print(i['def'].replace('CREATE INDEX ', 'INDEX ').replace('CREATE UNIQUE INDEX ', 'UNIQUE INDEX '))
                for x in trg:
                    print(f"TRIGGER {x['name']} → {x['fn']}()")
                print('```\n\n</details>')
    if missing:
        print('Thiếu mô tả: ' + ', '.join(missing), file=sys.stderr)


def anchor(t: str) -> str:
    return '#' + t.removeprefix('public.').replace('.', '')


main()
