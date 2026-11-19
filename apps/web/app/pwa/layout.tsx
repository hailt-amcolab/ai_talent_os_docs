import { UpdateBanner } from '@/components/pwa/UpdateBanner'
import { InstallBanner } from '@/components/pwa/InstallBanner'
export default function Layout({ children }: { children: React.ReactNode }) { return <><InstallBanner />{children}<UpdateBanner /></> }
