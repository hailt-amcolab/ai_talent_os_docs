// Màn đang tải ảnh, video, đang gõ tin nhắn hoặc đang thanh toán thì đánh dấu bận, để không tải lại trang khi cập nhật (§5.4).
// Dùng: const done = markBusy(); ... done()
let count = 0
export function markBusy() {
  count++
  let released = false
  return () => {
    if (!released) { released = true; count-- }
  }
}
export function isBusy() {
  return count > 0
}
