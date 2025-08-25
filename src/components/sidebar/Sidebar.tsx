import type { SvgIconProps } from '@axieinfinity/matcha-icons'
import type { FC } from 'react'
import { ButtonVariant, Drawer, IconButton, Menu } from '@axieinfinity/matcha'
import { ListIcon, XIcon } from '@axieinfinity/matcha-icons'
import Link from 'next/link'
import { useState } from 'react'
import { routes } from '@/configs/routes'
import { useIsClient } from '@/hooks/useIsClient'
import { cn } from '@/utils/cn'

export interface SidebarItem {
  label: string
  key: string
  icon: FC<SvgIconProps>
  path?: string
  href?: string
}

interface SidebarMenuProps {
  items: SidebarItem[]
  activePath?: string
  onNavigate: (item: SidebarItem) => void
}

export function SidebarLogo() {
  return (
    <Link
      href={routes.connect.resolvePath()}
      className="px-8 py-18 md:border-b md:px-20"
    >
      <div className="flex w-fit items-center justify-center gap-8">
        <img
          src="/images/ronin-logo.svg"
          alt="Ronin Logo"
          className="size-24"
        />
        <span className="text-h6 text-text-default">Tanto Widget</span>
      </div>
    </Link>
  )
}

export function SidebarMenu({
  items,
  activePath,
  onNavigate,
}: SidebarMenuProps) {
  return (
    <Menu className="flex flex-col gap-6 rounded-none border-none bg-black-9 px-4 py-8 font-normal shadow-none">
      {items.map((item) => {
        const isActive
          = typeof activePath === 'string' && activePath === item.path
        return (
          <Menu.Item
            key={item.key}
            data={{ key: item.key }}
            className="group"
            active={isActive}
            onClick={() => onNavigate(item)}
          >
            <div
              className={cn(
                'flex w-full items-center gap-8 transition-colors',
                isActive
                  ? 'text-text-default'
                  : 'text-text-subdued group-hover:text-text-default',
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

interface SidebarProps {
  menuItems: SidebarItem[]
  linkItems: SidebarItem[]
  pathname?: string
  onMenuClick: (item: SidebarItem) => void
  onLinkClick: (item: SidebarItem) => void
}

export function Sidebar({
  menuItems,
  linkItems,
  pathname,
  onMenuClick,
  onLinkClick,
}: SidebarProps) {
  return (
    <div className="flex min-w-[280px] flex-col border-r bg-black-9">
      <SidebarLogo />
      <div className="flex grow flex-col justify-between">
        <SidebarMenu
          items={menuItems}
          activePath={pathname}
          onNavigate={onMenuClick}
        />
        <div className="border-t">
          <SidebarMenu items={linkItems} onNavigate={onLinkClick} />
        </div>
      </div>
    </div>
  )
}

export function MobileSidebar({
  menuItems,
  linkItems,
  pathname,
  onMenuClick,
  onLinkClick,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isClient = useIsClient()

  const handleMenuClick = (item: SidebarItem) => {
    setIsOpen(false)
    onMenuClick(item)
  }

  if (!isClient)
    return null

  return (
    <div className="sticky top-0 z-[100] bg-black-9">
      <div className="flex w-full items-center gap-2 border-b pl-8 pr-24">
        <IconButton
          icon={ListIcon}
          variant={ButtonVariant.Plain}
          onClick={() => setIsOpen(true)}
        />
        <SidebarLogo />
      </div>
      <Drawer
        placement="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        bodyClassName="p-0 bg-black-9"
        header={(
          <div className="flex w-full items-center justify-between border-b border-r bg-black-9 py-9 pl-20 pr-8">
            <h1 className="text-h6">Menu</h1>
            <IconButton
              icon={XIcon}
              variant={ButtonVariant.Plain}
              onClick={() => setIsOpen(false)}
            />
          </div>
        )}
      >
        <div className="flex h-full min-w-[280px] flex-col border-r">
          <div className="flex grow flex-col justify-between">
            <SidebarMenu
              items={menuItems}
              activePath={pathname}
              onNavigate={handleMenuClick}
            />
            <div className="border-t">
              <SidebarMenu items={linkItems} onNavigate={onLinkClick} />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
