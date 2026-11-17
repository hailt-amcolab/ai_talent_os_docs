// Toàn bộ chữ hiển thị cho tài năng (tiếng Nhật, theo [AG] và đặc tả PWA). Component không viết chữ cứng.
// Câu chữ chính thức của thông báo và thư do khách duyệt (§6-13).
export const t = {
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
    tooOld: 'iOS 16.4 以降で通知を受け取れます。お知らせはアプリ内で確認できます。',
    unsupported: 'このブラウザは通知に対応していません。お知らせはアプリ内で確認できます。',
    denied: '通知がオフになっています。端末の「設定」からこのアプリの通知をオンにしてください。',
    why: '毎朝8時にモモから今日のテーマが届きます。',
    on: 'この端末で通知を受け取れます。',
    enable: '通知を許可',
    disable: '通知をオフにする',
    saving: '設定中…',
  },
  update: { available: '新しいバージョンがあります', button: '更新', busy: '送信中のため、完了後に更新してください。' },
} as const
