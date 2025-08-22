import type { ToastConfig } from '@axieinfinity/matcha'
import type { ReactNode } from 'react'
import { Intent } from '@axieinfinity/matcha'
import { useContext } from 'react'
import { ToastContext } from '@/contexts/ToastProvider'

export type TToastOptions = Omit<ToastConfig, 'title' | 'duration'>

const defaultToastOptions: ToastConfig = {
  duration: 5,
  placement: 'bottomRight',
}

function ContentWrapper({ children }: { children: ReactNode }) {
  return <div className="min-w-[300px] max-w-[440px] break-words">{children}</div>
}

export function useToast() {
  const { openToast } = useContext(ToastContext)

  const showToast = (title: string, intent?: Intent, options?: TToastOptions) => {
    openToast({
      ...defaultToastOptions,
      ...options,
      title,
      intent,
      content: options?.content ? <ContentWrapper>{options.content}</ContentWrapper> : null,
    })
  }

  return {
    toast: (title: string, options?: TToastOptions) => showToast(title, undefined, options),
    info: (title: string, options?: TToastOptions) => showToast(title, Intent.Info, options),
    success: (title: string, options?: TToastOptions) => showToast(title, Intent.Success, options),
    error: (title: string, options?: TToastOptions) => showToast(title, Intent.Danger, options),
  }
}
