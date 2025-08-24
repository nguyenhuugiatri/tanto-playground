import type { PropsWithChildren } from 'react'
import { getDefaultConfig, TantoProvider } from '@sky-mavis/tanto-widget'
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
  const { createAccountOnConnect, excludedWalletIds } = useUiConfigStore(state => ({
    createAccountOnConnect: state.createAccountOnConnect,
    excludedWalletIds: state.excludedWalletIds,
  }))

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TantoProvider
          theme={theme}
          config={{
            initialChainId,
            createAccountOnConnect,
            excludedWalletIds,
            clientId: 'dbe1e3ff-e145-422f-84c4-e0beb4972f69',
            __internal_waypointBaseUrl: 'https://waypoint-api.skymavis.one/v1/rpc/public',
            __internal_mpcBaseUrl:
            'https://growing-narwhal-infinitely.ngrok-free.app/v1/public/rpc',
            __internal_mpcSocketUrl: 'wss://project-x.skymavis.one',
            showConfirmationModal: true,
          }}
        >
          <LazyMotion features={domAnimation}>{props.children}</LazyMotion>
        </TantoProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
