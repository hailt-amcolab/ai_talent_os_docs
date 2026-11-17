// Giữ sự kiện cài đặt của Android/Chrome để nút 「アプリをインストール」 gọi lại (đặc tả §4.2).
declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
  }
}

let deferred: BeforeInstallPromptEvent | null = null
const listeners = new Set<() => void>()

export function rememberInstallPrompt(e: BeforeInstallPromptEvent) {
  deferred = e
  listeners.forEach((l) => l())
}

export function canPromptInstall() {
  return deferred !== null
}

export function onInstallPromptChange(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export async function promptInstall(): Promise<boolean> {
  if (!deferred) return false
  const e = deferred
  deferred = null
  await e.prompt()
  const { outcome } = await e.userChoice
  listeners.forEach((l) => l())
  return outcome === 'accepted'
}
