import type { BundledLanguage } from 'shiki'
import { Loader } from '@axieinfinity/matcha'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getCodeHtml } from './getCodeHtml'
import { RenderCode } from './RenderCode'

// Use CodeClient where the code changes based user input
// Using RSC in that scenario feels too slow and unnecessary keep hitting the server

interface CodeProps {
  code: string
  lang: BundledLanguage
  loader: React.ReactNode
  className?: string
}

export function CodeLoading() {
  return (
    <div className="flex min-h-[300px] grow items-center justify-center">
      <Loader.Dot />
    </div>
  )
}

export const CodeClient: React.FC<CodeProps> = ({
  code,
  lang,
  loader,
  className,
}) => {
  const codeQuery = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => getCodeHtml(code, lang),
    queryKey: ['html', code],
  })

  if (!codeQuery.data) {
    return loader
  }

  return (
    <RenderCode
      className={className}
      code={codeQuery.data.formattedCode}
      html={codeQuery.data.html}
    />
  )
}

/** @alias */
export default CodeClient
