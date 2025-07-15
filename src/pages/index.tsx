import type { Key } from 'react'
import { Button, Collapse, Intent, Shape, Tabs, TabsVariant } from '@axieinfinity/matcha'
import { BookOpenIcon, GasPumpIcon, GithubLogoIcon, KeyIcon, PaletteIcon, RectangleIcon, WalletIcon } from '@axieinfinity/matcha-icons'
import { TantoConnectButton, TantoEmbeddedWidget } from '@sky-mavis/tanto-widget'
import Link from 'next/link'
import { useState } from 'react'
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
  code: {
    label: 'Code',
    key: 'code',
  },
}

export default function Home() {
  const isClient = useIsClient()
  const [tab, setTab] = useState<typeof tabs[keyof typeof tabs]['key']>(tabs.embedded.key)
  const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>(['1', '2'])

  const onChangeTab = (activeKey: string) => {
    setTab(activeKey)
  }

  const onCollapseChange = (activeKeys: Key | Key[]) => {
    const keysArray = Array.isArray(activeKeys) ? activeKeys : [activeKeys]
    setCollapseActiveKeys(keysArray.map(key => String(key)))
  }

  return (
    <div className="container h-screen flex flex-col pb-24">
      <div className="py-40 mb-32 flex justify-between gap-24 border-b">
        <div>
          <h1 className="text-h3 mb-4">Tanto Widget</h1>
          <p className="text-body-m text-text-subdued text-balance">
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
      <div className="grow flex min-h-0 gap-24">
        <div className="w-[400px] h-full border-r pr-24 min-h-0">
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
              className="flex justify-center items-center"
            >
              <TantoEmbeddedWidget className="!w-[420px] rounded-20 !pt-12" />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={tabs.modal.label}
              tabKey={tabs.modal.key}
              key={tabs.modal.key}
              className="flex justify-center items-center"
            >
              <TantoConnectButton />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={tabs.code.label}
              tabKey={tabs.code.key}
              key={tabs.code.key}
            >
              TODO
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
