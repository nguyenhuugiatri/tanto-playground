import type { SvgIconProps } from '@axieinfinity/matcha-icons'
import type { FC, Key, ReactNode } from 'react'
import { Collapse, Tabs, TabsVariant } from '@axieinfinity/matcha'
import { GasPumpIcon, PaletteIcon, RectangleIcon, ShareNetworkIcon, WalletIcon } from '@axieinfinity/matcha-icons'
import { TantoConnectButton, TantoEmbeddedWidget } from '@sky-mavis/tanto-widget'
import { useState } from 'react'
import { AuthConfig } from '@/components/auth-config/AuthConfig'
import { ButtonConfig } from '@/components/button-config/ButtonConfig'
import { FadeView } from '@/components/fade-view/FadeView'
import Layout from '@/components/layout/Layout'
import { PageHeader } from '@/components/page-header/PageHeader'
import { SponsorConfig } from '@/components/sponsor-config/SponsorConfig'
import { ThemeConfig } from '@/components/theme-config/ThemeConfig'
import { WalletConfig } from '@/components/wallet-config/WalletConfig'
import { useUiConfigStore } from '@/contexts/UiConfigProvider'
import { useIsClient } from '@/hooks/useIsClient'

export function HeaderIcon({ title, icon: Icon }: { title: string, icon: FC<SvgIconProps> }) {
  return (
    <div className="flex items-center gap-8 text-h6">
      <Icon size={20} />
      {title}
    </div>
  )
}

const tabs = {
  embedded: { label: 'Embedded', key: 'embedded' },
  modal: { label: 'Modal', key: 'modal' },
}

export default function Connect() {
  const isClient = useIsClient()
  const [tab, setTab] = useState(tabs.embedded.key)
  const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>([
    'wallets',
    'appearance',
    'referral',
    'sponsor',
    'button-options',
  ])
  const buttonLabel = useUiConfigStore(state => state.buttonLabel)

  const onCollapseChange = (activeKeys: Key | Key[]) =>
    setCollapseActiveKeys((Array.isArray(activeKeys) ? activeKeys : [activeKeys]).map(String))

  return (
    <div>
      <PageHeader
        title="Tanto Widget"
        description="A React component library designed to provide a seamless Connect Wallet experience for Web3 applications, with a focus on Ronin Wallets and Ethereum-compatible wallets."
      />
      <div className="flex min-h-0 grow flex-col gap-24 pb-[10vh] lg:flex-row">
        <div className="order-2 h-full min-h-0 lg:order-1 lg:border-r lg:pr-24 xl:min-w-[400px]">
          <div className="-m-8 h-full overflow-auto p-8 scrollbar-none">
            {isClient && (
              <Collapse
                activeKey={collapseActiveKeys}
                onChange={onCollapseChange}
                collapseClassName="[&_.dango-collapse-content-box]:relative [&_.dango-collapse-content-box]:before:absolute [&_.dango-collapse-content-box]:before:left-0 [&_.dango-collapse-content-box]:before:bottom-0 [&_.dango-collapse-content-box]:before:content-[''] [&_.dango-collapse-content-box]:before:bg-black-6  [&_.dango-collapse-content-box]:before:h-[calc(100%-8px)] [&_.dango-collapse-content-box]:before:w-1 [&_.dango-collapse-content-box]:before:z-10 [&_.dango-collapse-content-box]:pl-16 [&_.dango-collapse-content-box]:ml-8"
                collapseItemList={[
                  { key: 'wallets', title: <HeaderIcon title="Wallets" icon={WalletIcon} />, content: <WalletConfig /> },
                  { key: 'appearance', title: <HeaderIcon title="Appearance" icon={PaletteIcon} />, content: <ThemeConfig /> },
                  { key: 'referral', title: <HeaderIcon title="Referral Program" icon={ShareNetworkIcon} />, content: <AuthConfig /> },
                  { key: 'sponsor', title: <HeaderIcon title="Sponsor gas fees" icon={GasPumpIcon} />, content: <SponsorConfig /> },
                  { key: 'button-options', title: <HeaderIcon title="Button Options" icon={RectangleIcon} />, content: <ButtonConfig /> },
                ]}
              />
            )}
          </div>
        </div>

        <div className="order-1 grow lg:order-2">
          <Tabs
            destroyInactiveTabPane
            variant={TabsVariant.Border}
            activeKey={tab}
            onChange={setTab}
            className="size-full [&_.dango-tabs-content]:size-full [&_.dango-tabs-tabpane]:size-full"
          >
            <Tabs.TabPane tab={tabs.embedded.label} tabKey={tabs.embedded.key} key={tabs.embedded.key}>
              <div className="flex h-full justify-center pt-[5%]">
                <FadeView show>
                  <TantoEmbeddedWidget className="h-fit rounded-20 !pt-12 md:!w-[420px]" />
                </FadeView>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={tabs.modal.label} tabKey={tabs.modal.key} key={tabs.modal.key}>
              <div className="flex items-center justify-center pt-[5%] md:h-3/5">
                <FadeView show>
                  <TantoConnectButton label={buttonLabel} />
                </FadeView>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

Connect.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
