import type { SvgIconProps } from '@axieinfinity/matcha-icons'
import type { FC, ReactNode } from 'react'
import { Button, ButtonSize, Intent, Shape } from '@axieinfinity/matcha'
import { useIsMobileView } from '@sky-mavis/tanto-widget/hooks/useIsMobileView'
import Link from 'next/link'
import { MOBILE_BREAKPOINT } from '@/configs/constants'

interface PageHeaderProps {
  title: string
  description: ReactNode
  right?: ReactNode
  primaryLink?: {
    icon: FC<SvgIconProps>
    label: string
    url: string
  }
  secondaryLink?: {
    icon: FC<SvgIconProps>
    label: string
    url: string
  }
}

interface DocsLinksProps {
  primaryLink?: {
    icon: FC<SvgIconProps>
    label: string
    url: string
  }
  secondaryLink?: {
    icon: FC<SvgIconProps>
    label: string
    url: string
  }
}

export function DocsLinks({ primaryLink, secondaryLink }: DocsLinksProps) {
  const isMobile = useIsMobileView(MOBILE_BREAKPOINT)

  return (
    <>
      {primaryLink && (
        <Link href={primaryLink.url} target="_blank">
          <Button
            text={primaryLink.label}
            shape={Shape.Default}
            intent={Intent.Primary}
            icon={primaryLink.icon}
            size={isMobile ? ButtonSize.Small : ButtonSize.Default}
          />
        </Link>
      )}
      {secondaryLink && (
        <Link href={secondaryLink.url} target="_blank">
          <Button
            text={secondaryLink.label}
            shape={Shape.Default}
            intent={Intent.Secondary}
            icon={secondaryLink.icon}
            size={isMobile ? ButtonSize.Small : ButtonSize.Default}
          />
        </Link>
      )}
    </>
  )
}

export const PageHeader: FC<PageHeaderProps> = ({ title, description, right, primaryLink, secondaryLink }) => {
  return (
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
}
