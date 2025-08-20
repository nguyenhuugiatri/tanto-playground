import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import { Menu } from '@axieinfinity/matcha'
import { ArrowsDownUpIcon, KeyIcon, WalletIcon } from '@axieinfinity/matcha-icons'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { routes } from '@/configs/routes'
import { cn } from '@/utils/cn'

interface Props {
  children: ReactNode
}

const menuItems = [
  { label: 'Connect', path: routes.connect.path, key: 'connect', icon: WalletIcon },
  { label: 'Sign Message', path: routes.signMessage.path, key: 'sign-message', icon: KeyIcon },
  { label: 'Send Transaction', path: routes.sendTransaction.path, key: 'send-transaction', icon: ArrowsDownUpIcon },
]

const Layout: NextPage<Props> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = (item: typeof menuItems[number]) => {
    router.push(item.path)
  }

  return (
    <div className="flex size-full">
      <div className="min-w-[300px] border-r bg-black-9">
        <div className="border-b px-20 py-16">
          <div className="flex w-fit items-center justify-center gap-8">
            <img src="/images/ronin-logo.svg" alt="Ronin Logo" className="size-24" />
            <span className="text-h6 text-text-default">Tanto Widget</span>
          </div>
        </div>
        <Menu className="flex flex-col gap-6 rounded-none border-none bg-black-9 px-4 py-8 font-normal shadow-none">
          {menuItems.map((item) => {
            const isActive = pathname === item.path

            return (
              <Menu.Item active={isActive} data={item} key={item.key} className="group" onClick={() => handleClick(item)}>
                <div className={cn('flex w-full items-center gap-8 transition-colors', { 'text-text-subdued group-hover:text-text-default': !isActive })}>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>
              </Menu.Item>
            )
          })}
        </Menu>
      </div>
      <div className="flex grow flex-col">
        {children}
      </div>
    </div>
  )
}

export default Layout
