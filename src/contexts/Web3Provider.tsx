import type { PropsWithChildren } from 'react'
import { getDefaultConfig, lightTheme, TantoProvider } from '@sky-mavis/tanto-widget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { domAnimation, LazyMotion } from 'motion/react'
import { WagmiProvider } from 'wagmi'
import { useUiConfigStore } from './UiConfigProvider'

const initialChainId = 2021

const config = getDefaultConfig({
  ssr: true,
  keylessWalletConfig: {
    headless: true,
    clientId: 'dbe1e3ff-e145-422f-84c4-e0beb4972f69',
    waypointOrigin: 'https://id.skymavis.one',
    chainId: initialChainId,
  },
  coinbaseWalletConfig: {
    enable: true,
  },
})

const queryClient = new QueryClient()

export function Web3Provider(props: PropsWithChildren) {
  const theme = useUiConfigStore(state => state.theme)
  const { createAccountOnConnect, excludedWalletIds, customThemeTokens, showConfirmationModal } = useUiConfigStore(state => ({
    createAccountOnConnect: state.createAccountOnConnect,
    excludedWalletIds: state.excludedWalletIds,
    customThemeTokens: state.customThemeTokens,
    showConfirmationModal: state.showConfirmationModal,
  }))

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TantoProvider
          // TODO: demo custom dark theme
          theme={theme === 'custom' ? lightTheme(customThemeTokens) : theme}
          config={{
            initialChainId,
            excludedWalletIds,
            createAccountOnConnect,
            showConfirmationModal,
            clientId: 'dbe1e3ff-e145-422f-84c4-e0beb4972f69',
            __internal_waypointBaseUrl: 'https://waypoint-api.skymavis.one/v1/rpc/public',
            __internal_mpcBaseUrlV1: 'https://project-x.skymavis.one/v1/public',
            __internal_mpcBaseUrl:
            'https://growing-narwhal-infinitely.ngrok-free.app/v1/public/rpc',
            __internal_mpcSocketUrl: 'wss://project-x.skymavis.one',
          }}
        >
          <LazyMotion features={domAnimation}>{props.children}</LazyMotion>
        </TantoProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
