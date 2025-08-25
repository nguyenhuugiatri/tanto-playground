import type { SvgIconProps } from '@axieinfinity/matcha-icons'
import type { FC, ReactNode } from 'react'
import { Button, ButtonSize, Intent, Shape } from '@axieinfinity/matcha'
import { useIsMobileView } from '@sky-mavis/tanto-widget/hooks/useIsMobileView'
import Link from 'next/link'

import { MOBILE_BREAKPOINT } from '@/configs/constants'

export interface LinkConfig {
  icon: FC<SvgIconProps>
  label: string
  url: string
}

interface PageHeaderProps {
  title: string
  description: ReactNode
  right?: ReactNode
  primaryLink?: LinkConfig
  secondaryLink?: LinkConfig
}

const LinkButton: FC<{ link: LinkConfig, intent: Intent }> = ({ link, intent }) => {
  const isMobile = useIsMobileView(MOBILE_BREAKPOINT)
  return (
    <Link href={link.url} target="_blank">
      <Button
        text={link.label}
        shape={Shape.Default}
        intent={intent}
        icon={link.icon}
        size={isMobile ? ButtonSize.Small : ButtonSize.Default}
      />
    </Link>
  )
}

const DocsLinks: FC<{ primaryLink?: LinkConfig, secondaryLink?: LinkConfig }> = ({
  primaryLink,
  secondaryLink,
}) => (
  <>
    {primaryLink && <LinkButton link={primaryLink} intent={Intent.Primary} />}
    {secondaryLink && <LinkButton link={secondaryLink} intent={Intent.Secondary} />}
  </>
)

export const PageHeader: FC<PageHeaderProps> = ({ title, description, right, primaryLink, secondaryLink }) => (
  <div className="mb-32 flex flex-col justify-between gap-24 border-b py-24 lg:flex-row lg:py-40">
    <div>
      <h1 className="mb-4 text-h3">{title}</h1>
      <p className="text-balance text-body-m text-text-subdued">{description}</p>
    </div>
    <div className="flex gap-12">
      {right ?? <DocsLinks primaryLink={primaryLink} secondaryLink={secondaryLink} />}
    </div>
  </div>
)
