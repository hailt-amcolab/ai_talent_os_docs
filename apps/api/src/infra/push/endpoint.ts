// Chỉ gửi tới máy chủ đẩy thật của trình duyệt. Không có danh sách này thì API sẽ POST tới bất kỳ URL nào client đưa vào (SSRF).
// ponytail: danh sách theo các trình duyệt hỗ trợ (S09-04); thêm tên miền khi hỗ trợ trình duyệt khác.
const ALLOWED_HOSTS = [
  /^web\.push\.apple\.com$/, // Safari (iPhone, Mac)
  /\.push\.apple\.com$/,
  /^fcm\.googleapis\.com$/, // Chrome, Android
  /^updates\.push\.services\.mozilla\.com$/, // Firefox
  /\.notify\.windows\.com$/, // Edge
]

export function isAllowedPushEndpoint(endpoint: string): boolean {
  let url: URL
  try {
    url = new URL(endpoint)
  } catch {
    return false
  }
  return url.protocol === 'https:' && url.port === '' && ALLOWED_HOSTS.some((re) => re.test(url.hostname))
}
