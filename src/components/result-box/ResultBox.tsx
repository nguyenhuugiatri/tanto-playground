import { Intent, Loader, Size } from '@axieinfinity/matcha'
import { Code } from '../code/code'

interface ResultBoxProps {
  isPending: boolean
  label?: string
  value?: string | object | null
}

export function ResultBox({ isPending, label, value }: ResultBoxProps) {
  if (!isPending && !value)
    return null

  return (
    <div className="w-full rounded-12 bg-black-8 p-20">
      {isPending && (
        <div className="flex items-center justify-center gap-8">
          <Loader.Circle intent={Intent.Secondary} size={Size.Small} />
          <span className="text-body-s">
            {label ? `Waiting for ${label}` : 'Please wait'}
          </span>
        </div>
      )}

      {value && (
        <Code
          className="[&_pre]:whitespace-pre-wrap"
          showCopyButton={false}
          code={JSON.stringify(
            typeof value === 'string' ? { [label ?? 'result']: value } : value,
            null,
            2,
          )}
          lang="json"
        />
      )}
    </div>
  )
}
