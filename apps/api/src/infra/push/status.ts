// Phân loại mã trả về của máy chủ đẩy (đặc tả PWA §6.5).
export type SendOutcome = 'sent' | 'gone' | 'retry' | 'payload-too-large' | 'config-error'

export function classifyStatus(status: number): SendOutcome {
  if (status >= 200 && status < 300) return 'sent'
  if (status === 404 || status === 410) return 'gone' // đăng ký đã hết: tắt bản ghi
  if (status === 413) return 'payload-too-large' // sửa nội dung, không thử lại
  if (status === 429 || status >= 500) return 'retry' // thử lại có giới hạn trong TTL
  return 'config-error' // 400, 403: khóa VAPID hoặc cấu hình
}
