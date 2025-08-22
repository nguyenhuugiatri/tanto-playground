import { Menu } from '@axieinfinity/matcha'
import { cn } from '@/utils/cn'

export function SidebarLogo() {
  return (
    <div className="border-b px-20 py-18">
      <div className="flex w-fit items-center justify-center gap-8">
        <img src="/images/ronin-logo.svg" alt="Ronin Logo" className="size-24" />
        <span className="text-h6 text-text-default">Tanto Widget</span>
      </div>
    </div>
  )
}

interface SidebarMenuProps {
  items: { label: string, key: string, icon: any, path?: string, href?: string }[]
  activePath?: string
  onNavigate: (item: any) => void
}

export function SidebarMenu({ items, activePath, onNavigate }: SidebarMenuProps) {
  return (
    <Menu className="flex flex-col gap-6 rounded-none border-none bg-black-9 px-4 py-8 font-normal shadow-none">
      {items.map((item) => {
        const isActive = typeof activePath === 'string' && activePath === item.path
        return (
          <Menu.Item
            key={item.label}
            data={{ key: item.label }}
            className="group"
            active={isActive}
            onClick={() => onNavigate(item)}
          >
            <div
              className={cn(
                'flex w-full items-center gap-8 transition-colors',
                isActive ? 'text-text-default' : 'text-text-subdued group-hover:text-text-default',
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </div>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export function Sidebar({ menuItems, linkItems, pathname, onMenuClick, onLinkClick }: any) {
  return (
    <div className="flex min-w-[280px] flex-col border-r bg-black-9">
      <SidebarLogo />
      <div className="flex grow flex-col justify-between">
        <SidebarMenu items={menuItems} activePath={pathname} onNavigate={onMenuClick} />
        <div className="border-t">
          <SidebarMenu items={linkItems} onNavigate={onLinkClick} />
        </div>
      </div>
    </div>
  )
}
