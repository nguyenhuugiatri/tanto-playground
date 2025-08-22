import { ButtonSize, ButtonVariant, IconButton, Tooltip } from '@axieinfinity/matcha'
import { CheckIcon, CopyIcon } from '@axieinfinity/matcha-icons'
import { useState } from 'react'
import { cn } from '@/utils/cn'

export function CopyButton(props: {
  text: string
  className?: string
  iconClassName?: string
}) {
  const [isCopied, setIsCopied] = useState(false)
  return (
    <Tooltip target={(
      <IconButton
        size={ButtonSize.XSmall}
        aria-label="Copy"
        className={props.className}
        onClick={() => {
          navigator.clipboard.writeText(props.text)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 1000)
        }}
        variant={ButtonVariant.Plain}
        icon={() => isCopied
          ? (
              <CheckIcon
                size={16}
                className={cn('text-green-500', props.iconClassName)}
              />
            )
          : (
              <CopyIcon
                size={16}
                className={props.iconClassName}
              />
            )}
      />
    )}
    >
      Copy
    </Tooltip>
  )
}
