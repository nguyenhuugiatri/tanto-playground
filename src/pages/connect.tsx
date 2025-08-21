import type { Key, ReactNode } from 'react'
import { Collapse, Tabs, TabsVariant } from '@axieinfinity/matcha'
import { GasPumpIcon, KeyIcon, PaletteIcon, RectangleIcon, WalletIcon } from '@axieinfinity/matcha-icons'
import { TantoConnectButton, TantoEmbeddedWidget } from '@sky-mavis/tanto-widget'
import { useConnectCallback } from '@sky-mavis/tanto-widget/hooks/useConnectCallback'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FadeView } from '@/components/fade-view/FadeView'
import Layout from '@/components/layout/Layout'
import { PageHeader } from '@/components/page-header/PageHeader'
import { routes } from '@/configs/routes'
import { useIsClient } from '@/hooks/useIsClient'

const tabs = {
  embedded: { label: 'Embedded', key: 'embedded' },
  modal: { label: 'Modal', key: 'modal' },
}

export default function Connect() {
  const isClient = useIsClient()
  const router = useRouter()
  const [tab, setTab] = useState(tabs.embedded.key)
  const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>(['wallets'])

  const onCollapseChange = (activeKeys: Key | Key[]) =>
    setCollapseActiveKeys((Array.isArray(activeKeys) ? activeKeys : [activeKeys]).map(String))

  useConnectCallback({
    onConnect: () => router.push(routes.signMessage.path),
  })

  return (
    <div>
      <PageHeader
        title="Tanto Widget"
        description="A React component library designed to provide a seamless Connect Wallet experience for Web3 applications, with a focus on Ronin Wallets and Ethereum-compatible wallets."
      />

      <div className="flex min-h-0 grow gap-24">
        <div className="h-full min-h-0 min-w-[400px] border-r pr-24">
          <div className="h-full overflow-auto scrollbar-none">
            {isClient && (
              <Collapse
                activeKey={collapseActiveKeys}
                onChange={onCollapseChange}
                collapseItemList={[
                  { key: 'wallets', title: <HeaderIcon title="Wallets" icon={WalletIcon} />, content: null },
                  { key: 'appearance', title: <HeaderIcon title="Appearance" icon={PaletteIcon} />, content: null },
                  { key: 'auth', title: <HeaderIcon title="Auth" icon={KeyIcon} />, content: null },
                  { key: 'sponsor', title: <HeaderIcon title="Sponsor gas fees" icon={GasPumpIcon} />, content: null },
                  { key: 'button-options', title: <HeaderIcon title="Button Options" icon={RectangleIcon} />, content: null },
                ]}
              />
            )}
          </div>
        </div>

        <div className="grow">
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
                  <TantoEmbeddedWidget className="h-fit !w-[420px] rounded-20 !pt-12" />
                </FadeView>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={tabs.modal.label} tabKey={tabs.modal.key} key={tabs.modal.key}>
              <div className="flex h-3/5 items-center justify-center">
                <FadeView show><TantoConnectButton /></FadeView>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

Connect.getLayout = (page: ReactNode) => <Layout>{page}</Layout>

function HeaderIcon({ title, icon: Icon }: { title: string, icon: any }) {
  return (
    <div className="flex items-center gap-8 text-h6">
      <Icon size={20} />
      {' '}
      {title}
    </div>
  )
}
