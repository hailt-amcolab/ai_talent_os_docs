# Ca kiểm thử Talent PWA

Tất cả NOT_RUN; đây là test plan, không phải kết quả test ứng dụng. Bản 1.1 (17/11/2026): các ca F01–F20 sinh lại từ dòng "Nghiệm thu" của spec đã đối chiếu với [YK2] v2 và [AG].

## F01-T01 — Đăng nhập đúng

- Feature: F01.
- Tiền điều kiện: Fixture của Đăng nhập và session; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /login và thiết lập trạng thái tương ứng. → Thực hiện: Đăng nhập đúng. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Đến /home (T-07) sau bootstrap; chỉ dữ liệu của mình
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F01-T02 — Đăng nhập bằng mật khẩu tạm

- Feature: F01.
- Tiền điều kiện: Fixture của Đăng nhập và session; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /login và thiết lập trạng thái tương ứng. → Thực hiện: Đăng nhập bằng mật khẩu tạm. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Bắt buộc qua /first-password trước màn khác
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F01-T03 — Sai 5 lần

- Feature: F01.
- Tiền điều kiện: Fixture của Đăng nhập và session; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /login và thiết lập trạng thái tương ứng. → Thực hiện: Sai 5 lần. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Server chặn trong lock window dù reload/đổi tab
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F01-T04 — Tài năng 利用終了

- Feature: F01.
- Tiền điều kiện: Fixture của Đăng nhập và session; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /login và thiết lập trạng thái tương ứng. → Thực hiện: Tài năng 利用終了. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Bị từ chối đăng nhập
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F01-T05 — Hai Talent cùng thiết bị

- Feature: F01.
- Tiền điều kiện: Fixture của Đăng nhập và session; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /login và thiết lập trạng thái tương ứng. → Thực hiện: Hai Talent cùng thiết bị. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Logout A rồi B không thấy dữ liệu A
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F01-T06 — 401 khi mutation đã gửi

- Feature: F01.
- Tiền điều kiện: Fixture của Đăng nhập và session; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /login và thiết lập trạng thái tương ứng. → Thực hiện: 401 khi mutation đã gửi. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Tra command trước gửi lại; không tạo hai lệnh
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F02-T01 — Mật khẩu tạm đúng

- Feature: F02.
- Tiền điều kiện: Fixture của Mật khẩu lần đầu và đặt lại mật khẩu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /first-password; /forgot-password; /reset-password và thiết lập trạng thái tương ứng. → Thực hiện: Mật khẩu tạm đúng. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Bắt buộc đặt mật khẩu mới và tích xác nhận trước khi vào màn khác
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F02-T02 — Mật khẩu tạm quá 7 ngày

- Feature: F02.
- Tiền điều kiện: Fixture của Mật khẩu lần đầu và đặt lại mật khẩu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /first-password; /forgot-password; /reset-password và thiết lập trạng thái tương ứng. → Thực hiện: Mật khẩu tạm quá 7 ngày. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không đăng nhập được, hướng dẫn quên mật khẩu
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F02-T03 — Email không tồn tại

- Feature: F02.
- Tiền điều kiện: Fixture của Mật khẩu lần đầu và đặt lại mật khẩu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /first-password; /forgot-password; /reset-password và thiết lập trạng thái tương ứng. → Thực hiện: Email không tồn tại. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Response không tiết lộ existence
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F02-T04 — Redirect ngoài hệ thống

- Feature: F02.
- Tiền điều kiện: Fixture của Mật khẩu lần đầu và đặt lại mật khẩu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /first-password; /forgot-password; /reset-password và thiết lập trạng thái tương ứng. → Thực hiện: Redirect ngoài hệ thống. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Bị chặn, quay URL an toàn
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F03-T01 — Gửi đơn hợp lệ

- Feature: F03.
- Tiền điều kiện: Fixture của Gửi đơn và hướng dẫn lần đầu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /apply; /onboarding và thiết lập trạng thái tương ứng. → Thực hiện: Gửi đơn hợp lệ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Đơn chờ duyệt, chưa đăng nhập được
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F03-T02 — Email đã từng gửi đơn

- Feature: F03.
- Tiền điều kiện: Fixture của Gửi đơn và hướng dẫn lần đầu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /apply; /onboarding và thiết lập trạng thái tương ứng. → Thực hiện: Email đã từng gửi đơn. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không tạo đơn
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F03-T03 — Bỏ qua push

- Feature: F03.
- Tiền điều kiện: Fixture của Gửi đơn và hướng dẫn lần đầu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /apply; /onboarding và thiết lập trạng thái tương ứng. → Thực hiện: Bỏ qua push. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Vẫn đi tiếp
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F03-T04 — Chưa thanh toán

- Feature: F03.
- Tiền điều kiện: Fixture của Gửi đơn và hướng dẫn lần đầu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /apply; /onboarding và thiết lập trạng thái tương ứng. → Thực hiện: Chưa thanh toán. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không dùng được AIコーチ
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F03-T05 — Đóng app giữa wizard

- Feature: F03.
- Tiền điều kiện: Fixture của Gửi đơn và hướng dẫn lần đầu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /apply; /onboarding và thiết lập trạng thái tương ứng. → Thực hiện: Đóng app giữa wizard. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Mở lại ở bước còn lại
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F03-T06 — Provisioning lỗi

- Feature: F03.
- Tiền điều kiện: Fixture của Gửi đơn và hướng dẫn lần đầu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /apply; /onboarding và thiết lập trạng thái tương ứng. → Thực hiện: Provisioning lỗi. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Hiện pending/error và không tạo folder trùng
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F04-T01 — iOS chưa cài

- Feature: F04.
- Tiền điều kiện: Fixture của Cài đặt PWA và cập nhật phiên bản; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /onboarding; /settings/install`. và thiết lập trạng thái tương ứng. → Thực hiện: iOS chưa cài. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Hiện hướng dẫn đúng, không gọi push permission vô ích
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F04-T02 — Bản mới lúc upload

- Feature: F04.
- Tiền điều kiện: Fixture của Cài đặt PWA và cập nhật phiên bản; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /onboarding; /settings/install`. và thiết lập trạng thái tương ứng. → Thực hiện: Bản mới lúc upload. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không reload làm mất upload
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F04-T03 — Offline lần đầu

- Feature: F04.
- Tiền điều kiện: Fixture của Cài đặt PWA và cập nhật phiên bản; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /onboarding; /settings/install`. và thiết lập trạng thái tương ứng. → Thực hiện: Offline lần đầu. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Trang offline generic, không giả dữ liệu
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F04-T04 — Logout rồi offline

- Feature: F04.
- Tiền điều kiện: Fixture của Cài đặt PWA và cập nhật phiên bản; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /onboarding; /settings/install`. và thiết lập trạng thái tương ứng. → Thực hiện: Logout rồi offline. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không mở được HTML chứa profile cũ
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F05-T01 — Mở app khi đã đăng nhập

- Feature: F05.
- Tiền điều kiện: Fixture của Trang chủ (T-07) và trang của tôi (T-06); session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /home; /mypage`. và thiết lập trạng thái tương ứng. → Thực hiện: Mở app khi đã đăng nhập. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Màn đầu là /home
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F05-T02 — Một widget lỗi

- Feature: F05.
- Tiền điều kiện: Fixture của Trang chủ (T-07) và trang của tôi (T-06); session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /home; /mypage`. và thiết lập trạng thái tương ứng. → Thực hiện: Một widget lỗi. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Các phần còn lại vẫn dùng được
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F05-T03 — Chưa metrics

- Feature: F05.
- Tiền điều kiện: Fixture của Trang chủ (T-07) và trang của tôi (T-06); session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /home; /mypage`. và thiết lập trạng thái tương ứng. → Thực hiện: Chưa metrics. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Hiện "—", không 0
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F05-T04 — Goal nhiều SNS

- Feature: F05.
- Tiền điều kiện: Fixture của Trang chủ (T-07) và trang của tôi (T-06); session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /home; /mypage`. và thiết lập trạng thái tương ứng. → Thực hiện: Goal nhiều SNS. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Hiển thị riêng từng mạng kèm tổng
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F05-T05 — Badge stale

- Feature: F05.
- Tiền điều kiện: Fixture của Trang chủ (T-07) và trang của tôi (T-06); session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /home; /mypage`. và thiết lập trạng thái tương ứng. → Thực hiện: Badge stale. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Refetch khi focus, không sửa số âm
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F06-T01 — Mạng ngắt sau ACK

- Feature: F06.
- Tiền điều kiện: Fixture của Chat với AI coach Momo; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /coach`. và thiết lập trạng thái tương ứng. → Thực hiện: Mạng ngắt sau ACK. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Mở lại thấy đúng một user message
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F06-T02 — Text 1001 code points

- Feature: F06.
- Tiền điều kiện: Fixture của Chat với AI coach Momo; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /coach`. và thiết lập trạng thái tương ứng. → Thực hiện: Text 1001 code points. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Cả client/server chặn với field error
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F06-T03 — IME đang ghép chữ

- Feature: F06.
- Tiền điều kiện: Fixture của Chat với AI coach Momo; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /coach`. và thiết lập trạng thái tương ứng. → Thực hiện: IME đang ghép chữ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Enter không gửi sớm
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F06-T04 — Response của Talent khác

- Feature: F06.
- Tiền điều kiện: Fixture của Chat với AI coach Momo; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /coach`. và thiết lập trạng thái tương ứng. → Thực hiện: Response của Talent khác. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Server trả 404, không stream dữ liệu
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F06-T05 — User đọc lịch sử

- Feature: F06.
- Tiền điều kiện: Fixture của Chat với AI coach Momo; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /coach`. và thiết lập trạng thái tương ứng. → Thực hiện: User đọc lịch sử. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Tin mới có indicator, không giật scroll
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F07-T01 — 100 Talent mở cùng giờ

- Feature: F07.
- Tiền điều kiện: Fixture của Ba chủ đề hằng ngày và kế hoạch riêng; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /suggestions`. và thiết lập trạng thái tương ứng. → Thực hiện: 100 Talent mở cùng giờ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: GET không tạo 100 job trùng mỗi refresh
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F07-T02 — Chọn topic cũ

- Feature: F07.
- Tiền điều kiện: Fixture của Ba chủ đề hằng ngày và kế hoạch riêng; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /suggestions`. và thiết lập trạng thái tương ứng. → Thực hiện: Chọn topic cũ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: 409 và hiển thị bộ mới
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F07-T03 — AI batch thất bại

- Feature: F07.
- Tiền điều kiện: Fixture của Ba chủ đề hằng ngày và kế hoạch riêng; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /suggestions`. và thiết lập trạng thái tương ứng. → Thực hiện: AI batch thất bại. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Có trạng thái lỗi, không topic mẫu giả
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F07-T04 — Double tap chọn

- Feature: F07.
- Tiền điều kiện: Fixture của Ba chủ đề hằng ngày và kế hoạch riêng; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /suggestions`. và thiết lập trạng thái tương ứng. → Thực hiện: Double tap chọn. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Một draft/commandId
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F08-T01 — Hai tab sửa

- Feature: F08.
- Tiền điều kiện: Fixture của Chi tiết draft và sửa qua AI; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /drafts/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Hai tab sửa. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Tab sau nhận conflict, không mất bản trước
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F08-T02 — AI revision lỗi

- Feature: F08.
- Tiền điều kiện: Fixture của Chi tiết draft và sửa qua AI; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /drafts/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: AI revision lỗi. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Bản đang dùng còn nguyên
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F08-T03 — Manual edit bị tắt

- Feature: F08.
- Tiền điều kiện: Fixture của Chi tiết draft và sửa qua AI; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /drafts/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Manual edit bị tắt. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Server từ chối dù gọi API trực tiếp
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F08-T04 — Caption quá giới hạn SNS

- Feature: F08.
- Tiền điều kiện: Fixture của Chi tiết draft và sửa qua AI; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /drafts/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Caption quá giới hạn SNS. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Báo platform cụ thể trước adopt
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F09-T01 — Cần Manager duyệt

- Feature: F09.
- Tiền điều kiện: Fixture của Adopt, kiểm duyệt và chọn lịch; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /drafts/:id/preview`. và thiết lập trạng thái tương ứng. → Thực hiện: Cần Manager duyệt. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Chỉ pending_approval, chưa đăng
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F09-T02 — NG context bị chặn

- Feature: F09.
- Tiền điều kiện: Fixture của Adopt, kiểm duyệt và chọn lịch; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /drafts/:id/preview`. và thiết lập trạng thái tương ứng. → Thực hiện: NG context bị chặn. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không có publish job
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F09-T03 — Policy đổi lúc preview

- Feature: F09.
- Tiền điều kiện: Fixture của Adopt, kiểm duyệt và chọn lịch; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /drafts/:id/preview`. và thiết lập trạng thái tương ứng. → Thực hiện: Policy đổi lúc preview. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Server áp dụng policy mới
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F09-T04 — Không media ready

- Feature: F09.
- Tiền điều kiện: Fixture của Adopt, kiểm duyệt và chọn lịch; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /drafts/:id/preview`. và thiết lập trạng thái tương ứng. → Thực hiện: Không media ready. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không adopt được
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F09-T05 — Double tap adopt

- Feature: F09.
- Tiền điều kiện: Fixture của Adopt, kiểm duyệt và chọn lịch; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /drafts/:id/preview`. và thiết lập trạng thái tương ứng. → Thực hiện: Double tap adopt. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Chỉ một post snapshot
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F10-T01 — Mạng rớt giữa chừng

- Feature: F10.
- Tiền điều kiện: Fixture của Upload và chụp/chọn media; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /media/upload và thiết lập trạng thái tương ứng. → Thực hiện: Mạng rớt giữa chừng. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Resume từ offset Supabase ghi nhận, không ghép byte trùng
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F10-T02 — File đổi extension

- Feature: F10.
- Tiền điều kiện: Fixture của Upload và chụp/chọn media; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /media/upload và thiết lập trạng thái tương ứng. → Thực hiện: File đổi extension. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Server từ chối magic type sai
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F10-T03 — Camera denied

- Feature: F10.
- Tiền điều kiện: Fixture của Upload và chụp/chọn media; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /media/upload và thiết lập trạng thái tương ứng. → Thực hiện: Camera denied. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: File picker còn dùng được
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F10-T04 — Upload xong chưa kiểm tra

- Feature: F10.
- Tiền điều kiện: Fixture của Upload và chụp/chọn media; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /media/upload và thiết lập trạng thái tương ứng. → Thực hiện: Upload xong chưa kiểm tra. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không chọn asset để publish
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F10-T05 — Video lớn

- Feature: F10.
- Tiền điều kiện: Fixture của Upload và chụp/chọn media; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /media/upload và thiết lập trạng thái tương ứng. → Thực hiện: Video lớn. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không đi qua hàm Vercel
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F11-T01 — Grant hết hạn

- Feature: F11.
- Tiền điều kiện: Fixture của Thư viện và media detail; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /media; /media/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Grant hết hạn. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Xin grant mới sau kiểm quyền
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F11-T02 — Asset thuộc người khác

- Feature: F11.
- Tiền điều kiện: Fixture của Thư viện và media detail; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /media; /media/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Asset thuộc người khác. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không lấy thumbnail hoặc bytes
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F11-T03 — File ngoài OneDrive bị xóa

- Feature: F11.
- Tiền điều kiện: Fixture của Thư viện và media detail; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /media; /media/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: File ngoài OneDrive bị xóa. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Hiện unavailable, chặn adopt
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F11-T04 — Xóa asset đang được post dùng

- Feature: F11.
- Tiền điều kiện: Fixture của Thư viện và media detail; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /media; /media/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Xóa asset đang được post dùng. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Policy bảo vệ snapshot
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F12-T01 — Quote hết hạn

- Feature: F12.
- Tiền điều kiện: Fixture của Tạo video có xác nhận giá; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /video/new; /video/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Quote hết hạn. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không charge; yêu cầu xác nhận mới
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F12-T02 — Double confirm

- Feature: F12.
- Tiền điều kiện: Fixture của Tạo video có xác nhận giá; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /video/new; /video/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Double confirm. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Một generation/ledger command
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F12-T03 — Timeout sau confirm

- Feature: F12.
- Tiền điều kiện: Fixture của Tạo video có xác nhận giá; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /video/new; /video/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Timeout sau confirm. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Tra operation, không sinh lần hai
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F12-T04 — External failure chắc chắn

- Feature: F12.
- Tiền điều kiện: Fixture của Tạo video có xác nhận giá; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /video/new; /video/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: External failure chắc chắn. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Ledger không ghi charge theo policy
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F12-T05 — Regenerate

- Feature: F12.
- Tiền điều kiện: Fixture của Tạo video có xác nhận giá; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /video/new; /video/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Regenerate. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Quote mới và xác nhận mới
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F13-T01 — User cancel consent

- Feature: F13.
- Tiền điều kiện: Fixture của Kết nối TikTok/Instagram/YouTube; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /connections; /connections/return`. và thiết lập trạng thái tương ứng. → Thực hiện: User cancel consent. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không hiện connected
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F13-T02 — Callback báo success giả

- Feature: F13.
- Tiền điều kiện: Fixture của Kết nối TikTok/Instagram/YouTube; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /connections; /connections/return`. và thiết lập trạng thái tương ứng. → Thực hiện: Callback báo success giả. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Backend từ chối hoặc tiếp tục verifying
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F13-T03 — Return bằng user B

- Feature: F13.
- Tiền điều kiện: Fixture của Kết nối TikTok/Instagram/YouTube; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /connections; /connections/return`. và thiết lập trạng thái tương ứng. → Thực hiện: Return bằng user B. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không bind account vào B
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F13-T04 — Expired attempt

- Feature: F13.
- Tiền điều kiện: Fixture của Kết nối TikTok/Instagram/YouTube; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /connections; /connections/return`. và thiết lập trạng thái tương ứng. → Thực hiện: Expired attempt. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Hiện hết hạn, tạo lại theo lệnh người dùng
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F13-T05 — Đổi account có lịch chưa rõ

- Feature: F13.
- Tiền điều kiện: Fixture của Kết nối TikTok/Instagram/YouTube; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /connections; /connections/return`. và thiết lập trạng thái tương ứng. → Thực hiện: Đổi account có lịch chưa rõ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không âm thầm thay đích
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F14-T01 — IG success TT fail

- Feature: F14.
- Tiền điều kiện: Fixture của Lịch và chi tiết bài đăng; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /schedule; /posts/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: IG success TT fail. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Hiện partial và từng kết quả
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F14-T02 — Chưa duyệt đã đến giờ

- Feature: F14.
- Tiền điều kiện: Fixture của Lịch và chi tiết bài đăng; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /schedule; /posts/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Chưa duyệt đã đến giờ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không xuất bản
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F14-T03 — YouTube không video

- Feature: F14.
- Tiền điều kiện: Fixture của Lịch và chi tiết bài đăng; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /schedule; /posts/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: YouTube không video. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Skipped đúng reason
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F14-T04 — Mở lại global stop

- Feature: F14.
- Tiền điều kiện: Fixture của Lịch và chi tiết bài đăng; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /schedule; /posts/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Mở lại global stop. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không tự đăng bù
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F14-T05 — Webhook cũ

- Feature: F14.
- Tiền điều kiện: Fixture của Lịch và chi tiết bài đăng; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /schedule; /posts/:id`. và thiết lập trạng thái tương ứng. → Thực hiện: Webhook cũ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: UI không lùi published sang failed
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F15-T01 — Bị trả lại

- Feature: F15.
- Tiền điều kiện: Fixture của Gửi lại bài bị trả và đặt lại bài lỗi; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /posts/:id và thiết lập trạng thái tương ứng. → Thực hiện: Bị trả lại. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Bài cũ là 取り消し, tạo được bản nháp mới để xin duyệt lại
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F15-T02 — Cờ talentRescheduleFailed tắt

- Feature: F15.
- Tiền điều kiện: Fixture của Gửi lại bài bị trả và đặt lại bài lỗi; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /posts/:id và thiết lập trạng thái tương ứng. → Thực hiện: Cờ talentRescheduleFailed tắt. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Server từ chối lệnh đặt lại từ tài năng
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F15-T03 — Đặt lại khi được phép

- Feature: F15.
- Tiền điều kiện: Fixture của Gửi lại bài bị trả và đặt lại bài lỗi; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /posts/:id và thiết lập trạng thái tương ứng. → Thực hiện: Đặt lại khi được phép. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Chỉ delivery failed có generation mới
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F15-T04 — Unknown delivery

- Feature: F15.
- Tiền điều kiện: Fixture của Gửi lại bài bị trả và đặt lại bài lỗi; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /posts/:id và thiết lập trạng thái tương ứng. → Thực hiện: Unknown delivery. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Chặn đặt lại tới khi đối soát
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F16-T01 — Metric unavailable

- Feature: F16.
- Tiền điều kiện: Fixture của Thống kê và mục tiêu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /analytics; /mypage/goals`. và thiết lập trạng thái tương ứng. → Thực hiện: Metric unavailable. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Null+reason trong UI/chart
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F16-T02 — Stale snapshot

- Feature: F16.
- Tiền điều kiện: Fixture của Thống kê và mục tiêu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /analytics; /mypage/goals`. và thiết lập trạng thái tương ứng. → Thực hiện: Stale snapshot. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Có ngày và cảnh báo stale
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F16-T03 — Range sai

- Feature: F16.
- Tiền điều kiện: Fixture của Thống kê và mục tiêu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /analytics; /mypage/goals`. và thiết lập trạng thái tương ứng. → Thực hiện: Range sai. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: 422 không gọi provider
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F16-T04 — Talent sửa goal trực tiếp

- Feature: F16.
- Tiền điều kiện: Fixture của Thống kê và mục tiêu; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /analytics; /mypage/goals`. và thiết lập trạng thái tương ứng. → Thực hiện: Talent sửa goal trực tiếp. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: 403 trong baseline
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F17-T01 — Event lặp

- Feature: F17.
- Tiền điều kiện: Fixture của Inbox thông báo và deep link; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /notifications`. và thiết lập trạng thái tương ứng. → Thực hiện: Event lặp. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Một inbox entry/actor-event
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F17-T02 — Deep link khác chủ

- Feature: F17.
- Tiền điều kiện: Fixture của Inbox thông báo và deep link; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /notifications`. và thiết lập trạng thái tương ứng. → Thực hiện: Deep link khác chủ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không lộ resource
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F17-T03 — Nhiều trang unread

- Feature: F17.
- Tiền điều kiện: Fixture của Inbox thông báo và deep link; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /notifications`. và thiết lập trạng thái tương ứng. → Thực hiện: Nhiều trang unread. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Badge dùng aggregate server
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F17-T04 — Target đã xóa

- Feature: F17.
- Tiền điều kiện: Fixture của Inbox thông báo và deep link; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /notifications`. và thiết lập trạng thái tương ứng. → Thực hiện: Target đã xóa. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Có fallback, đọc thông báo được
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F18-T01 — Permission denied

- Feature: F18.
- Tiền điều kiện: Fixture của Web Push và quyền thiết bị; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /settings/notifications`. và thiết lập trạng thái tương ứng. → Thực hiện: Permission denied. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: App vẫn dùng được; không xin lặp
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F18-T02 — Granted nhưng bind API lỗi

- Feature: F18.
- Tiền điều kiện: Fixture của Web Push và quyền thiết bị; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /settings/notifications`. và thiết lập trạng thái tương ứng. → Thực hiện: Granted nhưng bind API lỗi. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Hiện chưa bật, không success giả
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F18-T03 — Logout A login B

- Feature: F18.
- Tiền điều kiện: Fixture của Web Push và quyền thiết bị; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /settings/notifications`. và thiết lập trạng thái tương ứng. → Thực hiện: Logout A login B. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: A binding bị revoke/không reassign im lặng
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F18-T04 — Endpoint410

- Feature: F18.
- Tiền điều kiện: Fixture của Web Push và quyền thiết bị; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /settings/notifications`. và thiết lập trạng thái tương ứng. → Thực hiện: Endpoint410. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Server vô hiệu endpoint
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F18-T05 — Push bị OS chặn

- Feature: F18.
- Tiền điều kiện: Fixture của Web Push và quyền thiết bị; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /settings/notifications`. và thiết lập trạng thái tương ứng. → Thực hiện: Push bị OS chặn. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Inbox vẫn có thông báo
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F19-T01 — Return query success giả

- Feature: F19.
- Tiền điều kiện: Fixture của Thanh toán và ご利用とお支払い; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /billing; /billing/return và thiết lập trạng thái tương ứng. → Thực hiện: Return query success giả. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không mark paid
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F19-T02 — Paymentfailed

- Feature: F19.
- Tiền điều kiện: Fixture của Thanh toán và ご利用とお支払い; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /billing; /billing/return và thiết lập trạng thái tương ứng. → Thực hiện: Paymentfailed. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Thông báo, không tự disable Talent
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F19-T03 — Company account

- Feature: F19.
- Tiền điều kiện: Fixture của Thanh toán và ご利用とお支払い; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /billing; /billing/return và thiết lập trạng thái tương ứng. → Thực hiện: Company account. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không có bước thanh toán
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F19-T04 — Xem lịch sử

- Feature: F19.
- Tiền điều kiện: Fixture của Thanh toán và ご利用とお支払い; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /billing; /billing/return và thiết lập trạng thái tương ứng. → Thực hiện: Xem lịch sử. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Mở trang GMO, app không lưu lịch sử thẻ
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F20-T01 — Đổi locale

- Feature: F20.
- Tiền điều kiện: Fixture của Profile, cài đặt và trợ giúp; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /settings; /help`. và thiết lập trạng thái tương ứng. → Thực hiện: Đổi locale. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không đổi lịch UTC của bài
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F20-T02 — Yêu cầu sửa hồ sơ

- Feature: F20.
- Tiền điều kiện: Fixture của Profile, cài đặt và trợ giúp; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /settings; /help`. và thiết lập trạng thái tương ứng. → Thực hiện: Yêu cầu sửa hồ sơ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không ghi OneDrive trực tiếp từ browser
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F20-T03 — Logout

- Feature: F20.
- Tiền điều kiện: Fixture của Profile, cài đặt và trợ giúp; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /settings; /help`. và thiết lập trạng thái tương ứng. → Thực hiện: Logout. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Memory/cache profile được xóa
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## F20-T04 — Báo lỗi hỗ trợ

- Feature: F20.
- Tiền điều kiện: Fixture của Profile, cài đặt và trợ giúp; session Talent A/B khi có ownership; adapter có thể điều khiển response; policy theo spec.
- Các bước: Mở /settings; /help`. và thiết lập trạng thái tương ứng. → Thực hiện: Báo lỗi hỗ trợ. → Quan sát UI, network và dữ liệu server/mock adapter sau thao tác.
- Mong đợi: Không gửi secret hoặc chat tự động
- Bằng chứng: UI state/screenshot đã redacted; API/status và assertion invariant server hoặc adapter call log.
- Trạng thái: NOT_RUN.

## S01 — Truy cập trực tiếp ID Talent B

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Dùng session A gọi GET/mutation/media grant resource B → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: 404 hoặc403 theo policy, không bytes/metadata B
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S02 — Mass assignment

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Thêm role,paid,talentId vào command → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Schema từ chối extra fields, không thay đổi quyền
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S03 — CSRF command

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: POST từ origin khác với cookie session → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Bị từ chối trước side effect
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S04 — Payload Markdown XSS

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: AI/user text có script,event-handler,javascript URL → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Render text an toàn; không chạy script
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S05 — Cache auth CDN

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Hai cookie session gọi cùng URL authenticated navigation/RSC → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Không trả response A cho B; private/no-store thực tế
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S06 — Cache private SW

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Đọc transcript/media, logout, offline, Back → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Không lấy private data từ CacheStorage/HTTP shared cache
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S07 — Key trong bundle

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Build client rồi scan source map/artifacts → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Không có service-role,Graph,Upload-Post,payment,private VAPID
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S08 — Retry command đổi payload

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Gửi cùng commandId với payload khác → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: 409, một side effect
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S09 — Atomic command/outbox

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Crash sau DB commit trước enqueue ACK → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Outbox phục hồi đúng một domain operation
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S10 — Job ownership

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: A đọc statusUrl operation B → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: 404 và không job result B
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S11 — Queue burst100

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: 100 Talent yêu cầu AI/video đồng thời qua API mock → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: ACK nhanh theo SLO đã chọn, bounded worker concurrency, không duplicate
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S12 — Update SW giữa charge

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Waiting SW lúc video confirm đang unknown → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Không auto reload/reconfirm hoặc charge trùng
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S13 — Safari OAuth callback mất session

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Return consent vào browser context khác → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Reauth đúng actor rồi resume, không rebind account
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S14 — Push payload cũ sau logout

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Gửi push đã in-flight lúc user switch → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Payload generic, click qua auth/ownership; không lộ nội dung cũ
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S15 — Capability đổi giữa thao tác

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Tắt publish/billing sau mở màn hình → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Server từ chối command dù UI cũ còn nút
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S16 — Auth bypass SDK

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Gọi Supabase Auth trực tiếp ngoài BFF sau lockout → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: POC xác minh policy không bypass; không đạt thì chặn release Auth
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S17 — Offline click liên tiếp

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Offline bấm adopt/video/payment và reconnect → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Không queued command nền, không tự gửi khi online
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S18 — Unicode IME và accessibility

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Nhập Nhật/Việt/emoji; dùng keyboard/screen reader → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Đếm code points đúng; focus/labels/live status hợp lý
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S19 — Timezones và businessDate

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Thiết bị ở UTC/Việt nhưng lịch tổ chức Nhật → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Schedule và suggestion dùng timezone server, không lệch ngày
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S20 — Upload auth expire

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Session hết hạn giữa lúc tải tiếp (TUS) lên Supabase Storage → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Phần tải sau bị chặn; tải tiếp cần xác thực lại đúng chủ sở hữu, không cấp quyền tải vô thời hạn
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S21 — Rollback app/API

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Client cũ còn mở khi deploy API mới → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Contract tương thích hoặc yêu cầu update an toàn, không mất side effect
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S22 — Log privacy

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Mô phỏng auth/AI/payment/provider failure → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Log chỉ mã lỗi/requestId, không password/token/transcript/privateURL
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S23 — Provider mock khác thực tế

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: Chạy real-account staging matrix theo Q/POC → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Ghi evidence thật; không chuyển Passed dựa mock
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.

## S24 — Dashboard data hydration

- Feature: CROSS.
- Tiền điều kiện: Staging/mock kiểm soát được session, provider và sự cố theo tình huống; không dùng data khách chưa được phép.
- Các bước: SSR và client hydrate trong lúc session revoked → Kiểm chứng UI/network/database và log đã redacted.
- Mong đợi: Không flash data user trước, server kiểm lại session
- Bằng chứng: Assertion test hoặc manual evidence; RequestId/log redacted.
- Trạng thái: NOT_RUN.
