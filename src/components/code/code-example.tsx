import type { SvgIconProps } from '@axieinfinity/matcha-icons'
import type { FC, JSX } from 'react'
import type { BundledLanguage } from 'shiki'
import { CodeIcon, EyeIcon } from '@axieinfinity/matcha-icons'
import { Code } from './code'

interface CodeExampleProps {
  preview: JSX.Element
  code: string
  lang: BundledLanguage
  header?: {
    title: React.ReactNode
    description?: React.ReactNode
  }
}

export const CodeExample: React.FC<CodeExampleProps> = ({
  code,
  lang,
  preview,
  header,
}) => {
  return (
    <div className="relative z-0">
      {header && (
        <div className="mb-16">
          <h2 className="mb-4 text-h5 capitalize tracking-tight">
            {header.title}
          </h2>
          <p className="max-w-4xl text-balance text-body-m text-text-subdued">
            {header.description}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 overflow-hidden rounded-12 border md:grid-cols-2">
        <div className="flex grow flex-col border-b md:border-b-0 md:border-r">
          <TabName icon={CodeIcon} name="Code" />
          <Code
            className="h-full rounded-none border-none p-16"
            code={code}
            lang={lang}
          />
        </div>
        <div className="flex grow flex-col">
          <TabName icon={EyeIcon} name="Preview" />
          <div className="p-16">{preview}</div>
        </div>
      </div>
    </div>
  )
}

function TabName(props: {
  name: string
  icon: FC<SvgIconProps>
}) {
  return (
    <div className="flex items-center gap-8 border-b p-16 text-sm">
      <props.icon size={16} />
      {props.name}
    </div>
  )
}
