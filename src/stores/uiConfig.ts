import type { TantoWidgetThemeMode } from '@sky-mavis/tanto-widget'
import type { WalletId } from '@sky-mavis/tanto-widget/types/wallet'
import type { StateCreator } from 'zustand'
import { createStore } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UiConfig {
  excludedWalletIds: WalletId[]
  createAccountOnConnect: boolean
  theme: TantoWidgetThemeMode
  buttonLabel: string
}

export const DEFAULT_CONFIG: UiConfig = {
  excludedWalletIds: [],
  theme: 'dark',
  buttonLabel: 'Connect Wallet',
  createAccountOnConnect: false,
}

export type UiConfigState = UiConfig & {
  setExcludedWalletIds: (excludedWalletIds: WalletId[]) => void
  setTheme: (theme: UiConfig['theme']) => void
  setButtonLabel: (buttonLabel: string) => void
  setCreateAccountOnConnect: (createAccountOnConnect: boolean) => void
}

function createInitialState(initialConfig?: UiConfig): StateCreator<UiConfigState> {
  return set => ({
    ...DEFAULT_CONFIG,
    ...initialConfig,

    setExcludedWalletIds: excludedWalletIds => set({ excludedWalletIds }),
    setTheme: theme => set({ theme }),
    setButtonLabel: buttonLabel => set({ buttonLabel }),
    setCreateAccountOnConnect: createAccountOnConnect => set({ createAccountOnConnect }),
  })
}

export function createUiConfigStore(initialConfig: UiConfig = DEFAULT_CONFIG) {
  return createStore<UiConfigState>()(
    persist(createInitialState(initialConfig), {
      name: 'tanto.uiConfig',
      version: 1,
      partialize: state => ({
        excludedWalletIds: state.excludedWalletIds,
        theme: state.theme,
        buttonLabel: state.buttonLabel,
        createAccountOnConnect: state.createAccountOnConnect,
      }),
    }),
  )
}
