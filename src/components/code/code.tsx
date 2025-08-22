import type { BundledLanguage } from 'shiki'
import { useEffect, useState } from 'react'
import { getCodeHtml } from './getCodeHtml'
import { RenderCode } from './RenderCode'

interface CodeProps {
  code: string
  lang: BundledLanguage
  className?: string
  showCopyButton?: boolean
}

export const Code: React.FC<CodeProps> = ({
  code,
  lang,
  className,
  showCopyButton = true,
}) => {
  const [html, setHtml] = useState<string>('')
  const [formattedCode, setFormattedCode] = useState<string>('')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const { html, formattedCode } = await getCodeHtml(code, lang)
      if (!cancelled) {
        setHtml(html)
        setFormattedCode(formattedCode)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [code, lang])

  if (!html) {
    return <div className={className}>Loading...</div>
  }

  return (
    <RenderCode
      className={className}
      code={formattedCode}
      html={html}
      showCopyButton={showCopyButton}
    />
  )
}
