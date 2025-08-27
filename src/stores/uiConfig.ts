import type { TantoWidgetCustomThemeTokens, TantoWidgetThemeMode } from '@sky-mavis/tanto-widget'
import type { SocialProvider } from '@sky-mavis/tanto-widget/types/social'
import type { WalletId } from '@sky-mavis/tanto-widget/types/wallet'
import type { StateCreator } from 'zustand'
import { createStore } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UiConfig {
  excludedWalletIds: WalletId[]
  excludedSocialProviders: SocialProvider[]
  theme: TantoWidgetThemeMode | 'custom'
  customThemeTokens: TantoWidgetCustomThemeTokens
  buttonLabel: string
  createAccountOnConnect: boolean
  showConfirmationModal: boolean
}

export const DEFAULT_CONFIG: UiConfig = {
  excludedWalletIds: [],
  excludedSocialProviders: [],
  theme: 'dark',
  customThemeTokens: {} as TantoWidgetCustomThemeTokens,
  buttonLabel: 'Connect Wallet',
  createAccountOnConnect: false,
  showConfirmationModal: true,
}

export type UiConfigState = UiConfig & {
  setExcludedWalletIds: (excludedWalletIds: WalletId[]) => void
  setExcludedSocialProviders: (excludedSocialProviders: SocialProvider[]) => void
  setTheme: (theme: UiConfig['theme']) => void
  setCustomThemeTokens: (customThemeTokens: TantoWidgetCustomThemeTokens) => void
  setButtonLabel: (buttonLabel: string) => void
  setCreateAccountOnConnect: (createAccountOnConnect: boolean) => void
  setShowConfirmationModal: (showConfirmationModal: boolean) => void
}

function createInitialState(initialConfig?: UiConfig): StateCreator<UiConfigState> {
  return set => ({
    ...DEFAULT_CONFIG,
    ...initialConfig,

    setExcludedWalletIds: excludedWalletIds => set({ excludedWalletIds }),
    setExcludedSocialProviders: excludedSocialProviders => set({ excludedSocialProviders }),
    setTheme: theme => set({ theme }),
    setCustomThemeTokens: customThemeTokens => set({ customThemeTokens }),
    setButtonLabel: buttonLabel => set({ buttonLabel }),
    setCreateAccountOnConnect: createAccountOnConnect => set({ createAccountOnConnect }),
    setShowConfirmationModal: showConfirmationModal => set({ showConfirmationModal }),
  })
}

export function createUiConfigStore(initialConfig: UiConfig = DEFAULT_CONFIG) {
  return createStore<UiConfigState>()(
    persist(createInitialState(initialConfig), {
      name: 'tanto.uiConfig',
      version: 1,
      partialize: state => ({
        excludedWalletIds: state.excludedWalletIds,
        excludedSocialProviders: state.excludedSocialProviders,
        theme: state.theme,
        buttonLabel: state.buttonLabel,
        createAccountOnConnect: state.createAccountOnConnect,
        customThemeTokens: state.customThemeTokens,
        showConfirmationModal: state.showConfirmationModal,
      }),
    }),
  )
}
