import type { ReactNode } from 'react'
import { useToast } from '@axieinfinity/matcha'
import React, { createContext, useMemo } from 'react'

export interface ToastContextProps {
  openToast: ReturnType<typeof useToast>['openToast']
}

export const ToastContext = createContext<ToastContextProps>({
  openToast: () => {},
})

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { openToast, contextHolder } = useToast({
    closable: true,
    maxCount: 1,
    style: () => ({
      zIndex: 10_000,
    }),
  })

  const value = useMemo(
    () => ({
      openToast,
    }),
    [openToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {contextHolder}
    </ToastContext.Provider>
  )
}
