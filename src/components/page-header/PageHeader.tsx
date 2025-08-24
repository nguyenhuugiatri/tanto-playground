import type { FC, ReactNode } from 'react'
import { Button, ButtonSize, Intent, Shape } from '@axieinfinity/matcha'
import { BookOpenIcon, GithubLogoIcon } from '@axieinfinity/matcha-icons'
import { useIsMobileView } from '@sky-mavis/tanto-widget/hooks/useIsMobileView'
import Link from 'next/link'

interface PageHeaderProps {
  title: string
  description: ReactNode
  right?: ReactNode
}

export function DocsLinks() {
  const isMobile = useIsMobileView()

  return (
    <>
      <Link href="https://github.com/skymavis/tanto-kit/blob/main/packages/widget/README.md" target="_blank">
        <Button
          text="Documentation"
          shape={Shape.Default}
          intent={Intent.Primary}
          icon={BookOpenIcon}
          size={isMobile ? ButtonSize.Small : ButtonSize.Default}
        />
      </Link>
      <Link href="https://github.com/skymavis/tanto-kit" target="_blank">
        <Button
          text="Repository"
          shape={Shape.Default}
          intent={Intent.Secondary}
          icon={GithubLogoIcon}
          size={isMobile ? ButtonSize.Small : ButtonSize.Default}
        />
      </Link>
    </>
  )
}

export const PageHeader: FC<PageHeaderProps> = ({ title, description, right }) => {
  return (
    <div className="mb-32 flex flex-col justify-between gap-24 border-b py-24 sm:flex-row sm:py-40">
      <div>
        <h1 className="mb-4 text-h3">{title}</h1>
        <p className="text-balance text-body-m text-text-subdued">{description}</p>
      </div>
      <div className="flex gap-12">
        {right ?? <DocsLinks />}
      </div>
    </div>
  )
}
