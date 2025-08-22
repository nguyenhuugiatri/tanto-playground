import type { PropsWithChildren } from 'react'
import type { UiConfig, UiConfigState } from '@/stores/uiConfig'
import { createContext, useContext, useRef } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { createUiConfigStore } from '@/stores/uiConfig'

type UiConfigStore = ReturnType<typeof createUiConfigStore>

export const UiConfigContext = createContext<UiConfigStore | undefined>(undefined)

export function UiConfigProvider(
  props: PropsWithChildren<{
    initialConfig?: UiConfig
  }>,
) {
  const storeRef = useRef<UiConfigStore>()

  if (!storeRef.current)
    storeRef.current = createUiConfigStore(props.initialConfig)

  return (
    <UiConfigContext.Provider value={storeRef.current}>
      {props.children}
    </UiConfigContext.Provider>
  )
}

export function useUiConfigStore<T>(
  selector: (state: UiConfigState) => T,
): T {
  const configContext = useContext(UiConfigContext)
  if (!configContext)
    throw new Error('useUiConfigStore must be used within a UiConfigProvider')
  return useStoreWithEqualityFn(configContext, selector)
}
