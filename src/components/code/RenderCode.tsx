import { cn } from '@/utils/cn'
import { CopyButton } from '../copy-button/CopyButton'

export function RenderCode(props: {
  code: string
  html: string
  className?: string
  showCopyButton?: boolean
}) {
  return (
    <div
      className={cn(
        'group relative max-w-full overflow-hidden',
        props.className,
      )}
    >
      <div
        dangerouslySetInnerHTML={{ __html: props.html }}
      />
      {props.showCopyButton && (
        <CopyButton
          className="absolute right-16 top-16 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          text={props.code}
        />
      )}
    </div>
  )
}
