import type { Key } from 'react'
import { Button, Collapse, Intent, Shape, Tabs, TabsVariant } from '@axieinfinity/matcha'
import { BookOpenIcon, GasPumpIcon, GithubLogoIcon, KeyIcon, PaletteIcon, RectangleIcon, WalletIcon } from '@axieinfinity/matcha-icons'
import { TantoConnectButton, TantoEmbeddedWidget } from '@sky-mavis/tanto-widget'
import { useConnectCallback } from '@sky-mavis/tanto-widget/hooks/useConnectCallback'
import Link from 'next/link'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { FadeView } from '@/components/fade-view/FadeView'
import Layout from '@/components/layout/Layout'
import { PersonalSign } from '@/components/personal-sign/PersonalSign'
import { useIsClient } from '@/hooks/useIsClient'

const tabs = {
  embedded: {
    label: 'Embedded',
    key: 'embedded',
  },
  modal: {
    label: 'Modal',
    key: 'modal',
  },
  interaction: {
    label: 'Interaction',
    key: 'interaction',
  },
}

export default function Home() {
  const isClient = useIsClient()
  const { isConnected } = useAccount()
  const [tab, setTab] = useState<typeof tabs[keyof typeof tabs]['key']>(tabs.embedded.key)
  const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>(['wallets'])

  const onChangeTab = (activeKey: string) => {
    setTab(activeKey)
  }

  const onCollapseChange = (activeKeys: Key | Key[]) => {
    const keysArray = Array.isArray(activeKeys) ? activeKeys : [activeKeys]
    setCollapseActiveKeys(keysArray.map(key => String(key)))
  }

  useConnectCallback({
    onConnect: () => {
      setTab(tabs.interaction.key)
    },
  })

  return (
    <div className="container flex h-screen flex-col pb-24">
      <div className="mb-32 flex justify-between gap-24 border-b py-40">
        <div>
          <h1 className="mb-4 text-h3">Tanto Widget</h1>
          <p className="text-balance text-body-m text-text-subdued">
            A React component library designed to provide a seamless Connect Wallet experience for Web3 applications, with a focus on Ronin Wallets and Ethereum-compatible wallets.
          </p>
        </div>
        <div className="flex gap-12">
          <Link href="https://github.com/skymavis/tanto-kit/blob/main/packages/widget/README.md" target="_blank">
            <Button text="Documentation" shape={Shape.Default} intent={Intent.Primary} icon={BookOpenIcon} />
          </Link>
          <Link href="https://github.com/skymavis/tanto-kit" target="_blank">
            <Button text="Repository" shape={Shape.Default} intent={Intent.Secondary} icon={GithubLogoIcon} />
          </Link>
        </div>
      </div>
      <div className="flex min-h-0 grow gap-24">
        <div className="h-full min-h-0 min-w-[400px] border-r pr-24">
          <div className="h-full overflow-auto scrollbar-none">
            {isClient && (
              <Collapse
                activeKey={collapseActiveKeys}
                onChange={onCollapseChange}
                collapseItemList={[
                  {
                    key: 'wallets',
                    title: (
                      <div className="flex items-center gap-8 text-h6">
                        <WalletIcon size={20} />
                        Wallets
                      </div>
                    ),
                    content: (
                      <div>
                        <p>Hello</p>
                        <p>Hello</p>
                        <p>Hello</p>
                        <p>Hello</p>
                        <p>Hello</p>
                        <p>Hello</p>
                        <p>Hello</p>
                        <p>Hello</p>
                        <p>Hello</p>
                        <p>Hello</p>
                        <p>Hello</p>
                      </div>
                    ),
                  },
                  {
                    key: 'appearance',
                    title: (
                      <div className="flex items-center gap-8 text-h6">
                        <PaletteIcon size={20} />
                        Appearance
                      </div>
                    ),
                    content: null,
                  },
                  {
                    key: 'auth',
                    title: (
                      <div className="flex items-center gap-8 text-h6">
                        <KeyIcon size={20} />
                        Auth
                      </div>
                    ),
                    content: null,
                  },
                  {
                    key: 'sponsor',
                    title: (
                      <div className="flex items-center gap-8 text-h6">
                        <GasPumpIcon size={20} />
                        Sponsor gas fees
                      </div>
                    ),
                    content: null,
                  },
                  {
                    key: 'button-options',
                    title: (
                      <div className="flex items-center gap-8 text-h6">
                        <RectangleIcon size={20} />
                        Button Options
                      </div>
                    ),
                    content: null,
                  },
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
            onChange={onChangeTab}
            className="size-full [&_.dango-tabs-content]:size-full [&_.dango-tabs-tabpane]:size-full"
          >
            <Tabs.TabPane
              tab={tabs.embedded.label}
              tabKey={tabs.embedded.key}
              key={tabs.embedded.key}
            >
              <div className="flex h-full justify-center pt-[5%]">
                <FadeView show>
                  <TantoEmbeddedWidget className="h-fit !w-[420px] rounded-20 !pt-12" />
                </FadeView>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={tabs.modal.label}
              tabKey={tabs.modal.key}
              key={tabs.modal.key}
            >
              <div className="flex h-3/5 items-center justify-center">
                <FadeView show><TantoConnectButton /></FadeView>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={tabs.interaction.label}
              tabKey={tabs.interaction.key}
              key={tabs.interaction.key}
            >
              <div className="relative flex size-full flex-col px-4 pt-16">
                {!isConnected && (
                  <div className="absolute left-0 top-0 z-10 size-full cursor-not-allowed backdrop-blur-sm">
                    <div className="flex size-full h-3/5 flex-col items-center justify-center gap-4">
                      <div className="text-h5">Wallet not connected</div>
                      <div className="text-body-s text-text-subdued">
                        Connect your wallet to continue.
                      </div>
                    </div>
                  </div>
                )}
                <PersonalSign />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

Home.getLayout = (page: React.ReactNode) => (
  <Layout>
    {page}
  </Layout>
)
