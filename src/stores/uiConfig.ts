import type { TantoWidgetThemeMode } from '@sky-mavis/tanto-widget'
import type { StateCreator } from 'zustand'
import { createStore } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UiConfig {
  createAccountOnConnect: boolean
  theme: TantoWidgetThemeMode
  buttonLabel: string
}

export const DEFAULT_CONFIG: UiConfig = {
  createAccountOnConnect: false,
  theme: 'dark',
  buttonLabel: 'Connect Wallet',
}

export type UiConfigState = UiConfig & {
  setTheme: (theme: UiConfig['theme']) => void
  setButtonLabel: (buttonLabel: string) => void
  setCreateAccountOnConnect: (createAccountOnConnect: boolean) => void
}

function createInitialState(initialConfig?: UiConfig): StateCreator<UiConfigState> {
  return set => ({
    ...DEFAULT_CONFIG,
    ...initialConfig,
    setTheme: (theme: UiConfig['theme']) => {
      set(state => ({
        ...state,
        theme,
      }))
    },
    setButtonLabel: (buttonLabel: string) => {
      set(state => ({
        ...state,
        buttonLabel,
      }))
    },
    setCreateAccountOnConnect: (createAccountOnConnect: boolean) => {
      set(state => ({
        ...state,
        createAccountOnConnect,
      }))
    },
  })
}

export function createUiConfigStore(initialConfig: UiConfig = DEFAULT_CONFIG) {
  return createStore<UiConfigState, [] | [['zustand/persist', UiConfig]]>(
    persist(createInitialState(initialConfig), {
      name: 'tanto.uiConfig',
      version: 1,
    }),
  )
}
