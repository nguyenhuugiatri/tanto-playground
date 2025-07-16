import type { PropsWithChildren } from 'react'
import { getDefaultConfig, TantoProvider } from '@sky-mavis/tanto-widget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { domAnimation, LazyMotion } from 'motion/react'
import { WagmiProvider } from 'wagmi'

const config = getDefaultConfig({
  ssr: true,
  keylessWalletConfig: {
    clientId: '44d9c0c3-840b-4bf5-9b72-b2260724c47b',
  },
  coinbaseWalletConfig: {
    enable: true,
  },
})

const queryClient = new QueryClient()

export function Providers(props: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TantoProvider>
          <LazyMotion features={domAnimation}>{props.children}</LazyMotion>
        </TantoProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
