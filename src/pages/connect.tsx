import type { TantoWidgetThemeMode, Wallet } from '@sky-mavis/tanto-widget'
import type { Key, ReactNode } from 'react'
import { Checkbox, Collapse, Input, Radio, Shape, Switch, Tabs, TabsVariant } from '@axieinfinity/matcha'
import { GasPumpIcon, PaletteIcon, RectangleIcon, ShareNetworkIcon, WalletIcon } from '@axieinfinity/matcha-icons'
import { TantoConnectButton, TantoEmbeddedWidget } from '@sky-mavis/tanto-widget'
import { useWallets } from '@sky-mavis/tanto-widget/hooks/useWallets'
import Link from 'next/link'
import { useState } from 'react'
import { FadeView } from '@/components/fade-view/FadeView'
import Layout from '@/components/layout/Layout'
import { PageHeader } from '@/components/page-header/PageHeader'
import { useUiConfigStore } from '@/contexts/UiConfigProvider'
import { useIsClient } from '@/hooks/useIsClient'

const tabs = {
  embedded: { label: 'Embedded', key: 'embedded' },
  modal: { label: 'Modal', key: 'modal' },
}

export function WalletConfig() {
  const { primaryWallets, secondaryWallets } = useWallets()
  const wallets = [...primaryWallets, ...secondaryWallets]

  return (
    <div className="flex flex-col gap-16">
      {wallets.map((wallet) => {
        return (
          <Checkbox
            className="items-center gap-4"
            key={wallet.id}
            label={(
              <div key={wallet.id} className="flex items-center gap-8">
                <div className="size-32 overflow-hidden rounded-8 [&_*]:size-32 [&_div[class*='RoninBadgeWrapper']_svg]:size-12">
                  {wallet.icon}
                </div>
                <p>{wallet.name}</p>
              </div>
            )}
          />
        )
      })}
    </div>
  )
}

export function ButtonConfig() {
  const { buttonLabel, setButtonLabel } = useUiConfigStore(state => ({
    buttonLabel: state.buttonLabel,
    setButtonLabel: state.setButtonLabel,
  }))

  return (
    <Input
      label="Button Label"
      shape={Shape.Default}
      value={buttonLabel}
      onChange={e => setButtonLabel(e.target.value)}
    />
  )
}

export function ThemeConfig() {
  const { theme, setTheme } = useUiConfigStore(state => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }))

  return (
    <Radio.Group className="flex items-center gap-16" value={theme} onChange={e => setTheme(e.target.value as TantoWidgetThemeMode)}>
      <Radio value="dark" label="Dark" />
      <Radio value="light" label="Light" />
    </Radio.Group>
  )
}

export function AuthConfig() {
  const { createAccountOnConnect, setCreateAccountOnConnect } = useUiConfigStore(state => ({
    createAccountOnConnect: state.createAccountOnConnect,
    setCreateAccountOnConnect: state.setCreateAccountOnConnect,
  }))

  return (
    <Switch
      label={(
        <div className="text-body-s text-text-subdued">
          <p>Auto-creates a Ronin Account on connect</p>
          <p>
            Enable to join the
            {' '}
            <Link className="underline hover:cursor-pointer" href="https://docs.skymavis.com/en/docs/referral-program/ronin-referral-program" target="_blank">Ronin Referral Program</Link>
            {' '}
            for Studios.
          </p>
          <p>(Earn Up to 10% Revenue Share)</p>
        </div>
      )}
      checked={createAccountOnConnect}
      onChange={e => setCreateAccountOnConnect(e.target.checked)}
    />
  )
}

export function SponsorConfig() {
  return (
    <div className="text-body-s text-text-subdued">
      <p>Want to sponsor gas on Ronin and improve UX?</p>
      <p>
        <Link className="underline hover:cursor-pointer" href="https://docs.skymavis.com/en/docs/referral-program/ronin-referral-program" target="_blank">Check out the docs</Link>
      </p>
    </div>
  )
}

export default function Connect() {
  const isClient = useIsClient()
  const [tab, setTab] = useState(tabs.embedded.key)
  const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>(['wallets', 'appearance', 'referral', 'sponsor', 'button-options'])
  const buttonLabel = useUiConfigStore(state => state.buttonLabel)

  const onCollapseChange = (activeKeys: Key | Key[]) =>
    setCollapseActiveKeys((Array.isArray(activeKeys) ? activeKeys : [activeKeys]).map(String))

  return (
    <div>
      <PageHeader
        title="Tanto Widget"
        description="A React component library designed to provide a seamless Connect Wallet experience for Web3 applications, with a focus on Ronin Wallets and Ethereum-compatible wallets."
      />
      <div className="flex min-h-0 grow gap-24">
        <div className="h-full min-h-0 min-w-[400px] border-r pr-24">
          <div className="-m-8 h-full overflow-auto p-8 scrollbar-none">
            {isClient && (
              <Collapse
                collapseClassName="[&_.dango-collapse-content-box]:relative [&_.dango-collapse-content-box]:before:absolute [&_.dango-collapse-content-box]:before:left-0 [&_.dango-collapse-content-box]:before:bottom-0 [&_.dango-collapse-content-box]:before:content-[''] [&_.dango-collapse-content-box]:before:bg-black-6  [&_.dango-collapse-content-box]:before:h-[calc(100%-8px)] [&_.dango-collapse-content-box]:before:w-1 [&_.dango-collapse-content-box]:before:z-10 [&_.dango-collapse-content-box]:pl-16 [&_.dango-collapse-content-box]:ml-8"
                activeKey={collapseActiveKeys}
                onChange={onCollapseChange}
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

function HeaderIcon({ title, icon: Icon }: { title: string, icon: any }) {
  return (
    <div className="flex items-center gap-8 text-h6">
      <Icon size={20} />
      {' '}
      {title}
    </div>
  )
}
