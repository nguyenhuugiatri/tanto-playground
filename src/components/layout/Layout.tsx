import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import type { SidebarItem } from '../sidebar/Sidebar'
import {
  ArrowsLeftRightIcon,
  BookOpenIcon,
  FileImageIcon,
  GasPumpIcon,
  GridFourIcon,
  KeyIcon,
  PaperPlaneTiltIcon,
  PlusIcon,
  SidebarIcon,
  UserSquareIcon,
} from '@axieinfinity/matcha-icons'
import { useIsMobileView } from '@sky-mavis/tanto-widget/hooks/useIsMobileView'
import { usePathname, useRouter } from 'next/navigation'
import { MOBILE_BREAKPOINT } from '@/configs/constants'
import { routes } from '@/configs/routes'
import { MobileSidebar, Sidebar } from '../sidebar/Sidebar'

interface Props {
  children: ReactNode
}

const menuItems: SidebarItem[] = [
  { label: 'Connect', path: routes.connect.path, key: 'connect', icon: GridFourIcon },
  { label: 'Sign Message', path: routes.signMessage.path, key: 'sign-message', icon: KeyIcon },
  { label: 'Transfer Tokens', path: routes.transferTokens.path, key: 'transfer-tokens', icon: PaperPlaneTiltIcon },
  { label: 'Send Transaction', path: routes.sendTransaction.path, key: 'send-transaction', icon: ArrowsLeftRightIcon },
  { label: 'Buy Crypto', path: routes.buyCrypto.path, key: 'buy-crypto', icon: PlusIcon },
  { label: 'Ronin Name Service', path: routes.rns.path, key: 'rns', icon: UserSquareIcon },
]

const linkItems: SidebarItem[] = [
  { label: 'Developer Console', href: 'https://developers.roninchain.com/console', key: 'dashboard', icon: SidebarIcon },
  { label: 'Mavis Documentation', href: 'https://docs.skymavis.com/', key: 'documentation', icon: BookOpenIcon },
  // { label: 'Ronin Assets', href: 'https://github.com/ronin-chain/ronin-assets', key: 'ronin-assets', icon: FileImageIcon },
  { label: 'Get Testnet Token', href: 'https://faucet.roninchain.com/', key: 'ronin-faucet', icon: GasPumpIcon },
]

const Layout: NextPage<Props> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()
  const isMobileView = useIsMobileView(MOBILE_BREAKPOINT)

  const handleMenuClick = (item: SidebarItem) => {
    if (item.path)
      router.push(item.path)
  }

  const handleLinkClick = (item: SidebarItem) => {
    if (item.href)
      window.open(item.href, '_blank')
  }

  return (
    <div className="flex size-full flex-col md:flex-row">
      {isMobileView
        ? (
            <MobileSidebar
              menuItems={menuItems}
              linkItems={linkItems}
              pathname={pathname ?? undefined}
              onMenuClick={handleMenuClick}
              onLinkClick={handleLinkClick}
            />
          )
        : (
            <Sidebar
              menuItems={menuItems}
              linkItems={linkItems}
              pathname={pathname ?? undefined}
              onMenuClick={handleMenuClick}
              onLinkClick={handleLinkClick}
            />
          )}
      <div className="flex grow flex-col overflow-auto">
        <div className="container flex max-w-screen-xl flex-col pb-24 md:h-screen">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
