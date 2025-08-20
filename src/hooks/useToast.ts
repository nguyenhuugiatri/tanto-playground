import type { ToastConfig } from '@axieinfinity/matcha'
import type { ReactNode } from 'react'
import { Intent } from '@axieinfinity/matcha'
import { useContext } from 'react'
import { ToastContext } from '@/contexts/ToastProvider'

export type TToastOptions = Omit<ToastConfig, 'content'>

const defaultToastOptions: ToastConfig = {
  duration: 5,
}

export function useToast() {
  const { openToast } = useContext(ToastContext)

  const toast = (content: ReactNode, options?: TToastOptions) => {
    openToast({
      ...defaultToastOptions,
      ...options,
      content,
      placement: 'bottomRight',
    })
  }

  const toastInfo = (content: ReactNode, options?: TToastOptions) => {
    openToast({
      ...defaultToastOptions,
      ...options,
      content,
      intent: Intent.Info,
      placement: 'bottomRight',
    })
  }

  const toastSuccess = (content: ReactNode, options?: TToastOptions) => {
    openToast({
      ...defaultToastOptions,
      ...options,
      content,
      intent: Intent.Success,
      placement: 'bottomRight',
    })
  }

  const toastError = (content: ReactNode, options?: TToastOptions) => {
    openToast({
      ...defaultToastOptions,
      ...options,
      content,
      intent: Intent.Danger,
      placement: 'bottomRight',
    })
  }

  return {
    toast,
    toastInfo,
    toastSuccess,
    toastError,
  }
}
