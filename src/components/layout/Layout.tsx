import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import {
  ArrowsDownUpIcon,
  BookOpenIcon,
  GithubLogoIcon,
  GridFourIcon,
  KeyIcon,
  SidebarIcon,
  WalletIcon,
} from '@axieinfinity/matcha-icons'
import { usePathname, useRouter } from 'next/navigation'
import { routes } from '@/configs/routes'
import { Sidebar } from './Sidebar'

interface Props {
  children: ReactNode
}

const menuItems = [
  { label: 'Connect', path: routes.connect.path, key: 'connect', icon: GridFourIcon },
  { label: 'Sign Message', path: routes.signMessage.path, key: 'sign-message', icon: KeyIcon },
  { label: 'Transfer Tokens', path: routes.transferTokens.path, key: 'transfer-tokens', icon: WalletIcon },
  { label: 'Send Transaction', path: routes.sendTransaction.path, key: 'send-transaction', icon: ArrowsDownUpIcon },
] as const

const linkItems = [
  { label: 'Dashboard', href: 'https://developers.roninchain.com/console', key: 'dashboard', icon: SidebarIcon },
  { label: 'Documentation', href: 'https://github.com/skymavis/tanto-kit/blob/main/packages/widget/README.md', key: 'documentation', icon: BookOpenIcon },
  { label: 'Repository', href: 'https://github.com/skymavis/tanto-kit', key: 'repository', icon: GithubLogoIcon },
] as const

const Layout: NextPage<Props> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleMenuClick = (item: any) => router.push(item.path)
  const handleLinkClick = (item: any) => window.open(item.href, '_blank')

  return (
    <div className="flex size-full">
      <Sidebar
        menuItems={menuItems}
        linkItems={linkItems}
        pathname={pathname}
        onMenuClick={handleMenuClick}
        onLinkClick={handleLinkClick}
      />
      <div className="flex grow flex-col overflow-auto">
        <div className="container flex h-screen flex-col pb-24">{children}</div>
      </div>
    </div>
  )
}

export default Layout
