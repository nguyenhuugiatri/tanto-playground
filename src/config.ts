import type { TantoWidgetCustomThemeTokens } from '@sky-mavis/tanto-widget'

type Wallets = 'keyless' | 'walletconnect' | 'coinbase'

export interface Config {
  appearance: {
    type: 'light' | 'dark'
    darkTokenOverrides?: TantoWidgetCustomThemeTokens
    lightTokenOverrides?: TantoWidgetCustomThemeTokens
  }
  wallets: Wallets[]
  multiInjectedProviderDiscovery?: boolean
  createAccountOnConnect?: boolean
  buttonLabel?: string
}
