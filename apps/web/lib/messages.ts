const demoErrors: Record<string, string> = {
  REGISTRATION_FAILED: '登録できませんでした。メールアドレスとパスワード、Supabaseのメール設定を確認してください。',
  NO_PUSH_DEVICES: '相手の受信端末がありません。相手の端末で通知を許可してからお試しください。',
  DEMO_DEVICE_LIMIT: 'デモの端末数上限を超えています。', PUSH_KEY_INVALID: '端末の通知登録をやり直してください。',

  AUTH_INVALID: 'メールアドレスまたはパスワードを確認してください。利用できない場合も同じ表示になります。',
  AUTH_REQUIRED: 'ログインしてください。', SESSION_REVOKED: 'セッションが終了しました。もう一度ログインしてください。',
  REAUTH_REQUIRED: '操作の間隔が空いたため、もう一度ログインしてください。', ACCOUNT_DISABLED: 'このアカウントは利用できません。',
  MFA_INVALID_CODE: '認証アプリの最新の6桁コードを確認してください。',
  MFA_REQUIRED: '認証アプリで確認してください。', AUTH_NOT_CONFIGURED: '接続設定を確認できません。デモの準備手順をご確認ください。',
  AUTH_PROVIDER_UNAVAILABLE: '認証サービスに接続できません。しばらくしてからお試しください。', NETWORK_ERROR: 'ネットワークに接続して、もう一度お試しください。',
  RATE_LIMITED: '操作回数が多いため、少し待ってからお試しください。', INPUT_INVALID: '入力内容を確認してください。',
  MFA_SETUP_PENDING: '設定が途中です。画面を閉じた場合は、未登録の設定を取り消してからやり直してください。',
  CHALLENGE_EXPIRED: '認証の有効期限が切れました。新しい確認を開始してください。', CHALLENGE_CONSUMED: 'この確認はすでに完了しています。',
  VERSION_CONFLICT: 'ほかの操作で内容が変わりました。一覧を更新してください。', DEVICE_ALREADY_BOUND: 'この端末は別のログインに登録されています。通知を解除してから登録してください。',
  PUSH_NOT_CONFIGURED: 'この環境ではプッシュ通知の設定が完了していません。', NOT_FOUND: 'デモが有効になっているか確認してください。',
}
// Toàn bộ chữ hiển thị cho tài năng (tiếng Nhật, theo [AG] và đặc tả PWA). Component không viết chữ cứng.
// Câu chữ chính thức của thông báo và thư do khách duyệt (§6-13).
export const t = {
  demo: {
    errors: demoErrors, eyebrow: 'AI TALENT OS / TECHNOLOGY DEMO', notice: 'Supabase Auth・TOTP・PWA の接続を確認するデモです。',
    login: 'ログイン', register: 'アカウントを作成', email: 'メールアドレス', password: 'パスワード', confirmation: 'パスワードを再入力',
    loginHelp: 'メールアドレスとパスワードで利用できます。承認手続きはありません。', passwordHelp: '英字と数字を含む8文字以上で設定してください。', passwordMismatch: 'パスワードが一致しません。', confirmEmail: '確認メールのリンクを開いてからログインしてください。',
    mfaTitle: '認証アプリで確認', mfaHelp: 'TOTPを登録すると、次のログインから確認コードが必要です。', enroll: '認証アプリを登録する', qrAlt: '認証アプリ登録用のQRコード', qrHelp: '認証アプリで読み取り、6桁のコードを入力してください。',
    showSecret: '手動入力用のキーを表示', hideSecret: 'キーを隠す', code: '6桁の確認コード', verify: '確認する', resetSetup: '未登録の設定を取り消す', restartChallenge: '新しい確認を開始する', startChallenge: '確認を開始する', noFactor: '登録を確認して、やり直してください。',
    dashboard: 'ホーム', logout: 'ログアウト', receiverCode: 'あなたの受信コード', shareReceiver: '通知を送る相手に、このコードを共有してください。',
    refreshDevices: '受信端末を更新', thisDevice: '（この端末）', testPush: '通知をテスト', recipient: '相手の受信コード', sendPush: '通知を送る',
    crossDeviceHelp: '相手の端末でログインして通知を許可し、受信コードをここに入力してください。同じアカウントの別端末にも送れます。',
    pushResult: 'プッシュサービスの受付数', pushFailed: '送信失敗', pushGone: '期限切れ端末', providerAccepted: '受付は端末への表示を保証しません。受信側の通知設定と通信状態も確認してください。',
  },
  common: { retry: 'もう一度お試しください。', loading: '読み込み中…' },
  home: { title: 'ホーム', installHeading: 'ホーム画面に追加', pushHeading: '通知' },
  offline: { title: 'オフラインです', body: '通信できる場所で、もう一度お試しください。' },
  install: {
    installed: 'ホーム画面から起動しています。',
    inApp: 'このままではアプリとして追加できません。右上のメニューから「ブラウザで開く」を選ぶか、リンクをコピーして Safari（Android は Chrome）で開いてください。',
    copyLink: 'リンクをコピー',
    copied: 'コピーしました',
    iosOther: 'iPhone では Safari で開いてから、ホーム画面に追加してください。',
    iosSteps: [
      '画面下の共有ボタン（四角から矢印が出ているアイコン）をタップ',
      '「ホーム画面に追加」を選ぶ',
      '「追加」をタップし、ホーム画面のアイコンから開く',
      'アイコンから開いたら、もう一度ログインしてください', // 4.4: ホーム画面のアプリと Safari はログインが別（PW-03 で確認）
    ],
    androidButton: 'アプリをインストール',
    androidMenu: 'ブラウザのメニュー（︙）から「アプリをインストール」または「ホーム画面に追加」を選んでください。',
  },
  push: {
    needsInstall: 'ホーム画面に追加すると、通知を受け取れます。',
    tooOld: 'iOS 16.4 以降で通知を受け取れます。別の対応端末でお試しください。',
    unsupported: 'このブラウザは通知に対応していません。別の対応端末でお試しください。',
    denied: '通知がオフになっています。端末の「設定」からこのアプリの通知をオンにしてください。',
    why: 'アプリのお知らせを、この端末でも受け取れます。',
    on: 'この端末で通知を受け取れます。',
    enable: '通知を許可',
    disable: '通知をオフにする',
    saving: '設定中…',
  },
  update: { available: '新しいバージョンがあります', button: '更新', busy: '送信中のため、完了後に更新してください。' },
} as const
