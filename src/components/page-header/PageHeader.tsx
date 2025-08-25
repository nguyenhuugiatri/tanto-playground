import type { FC, ReactNode } from 'react'
import { Button, ButtonSize, Intent, Shape } from '@axieinfinity/matcha'
import { BookOpenIcon, GithubLogoIcon } from '@axieinfinity/matcha-icons'
import { useIsMobileView } from '@sky-mavis/tanto-widget/hooks/useIsMobileView'
import Link from 'next/link'
import { DOCS_LINK, MOBILE_BREAKPOINT, REPO_LINK } from '@/configs/constants'

interface PageHeaderProps {
  title: string
  description: ReactNode
  right?: ReactNode
  docsLink?: string
  repoLink?: string
}

interface DocsLinksProps {
  docsLink?: string
  repoLink?: string
}

export function DocsLinks({ docsLink = DOCS_LINK, repoLink = REPO_LINK }: DocsLinksProps) {
  const isMobile = useIsMobileView(MOBILE_BREAKPOINT)

  return (
    <>
      <Link href={docsLink} target="_blank">
        <Button
          text="SDK Docs"
          shape={Shape.Default}
          intent={Intent.Primary}
          icon={BookOpenIcon}
          size={isMobile ? ButtonSize.Small : ButtonSize.Default}
        />
      </Link>
      <Link href={repoLink} target="_blank">
        <Button
          text="SDK Repo"
          shape={Shape.Default}
          intent={Intent.Secondary}
          icon={GithubLogoIcon}
          size={isMobile ? ButtonSize.Small : ButtonSize.Default}
        />
      </Link>
    </>
  )
}

export const PageHeader: FC<PageHeaderProps> = ({ title, description, right, docsLink, repoLink }) => {
  return (
    <div className="mb-32 flex flex-col justify-between gap-24 border-b py-24 lg:flex-row lg:py-40">
      <div>
        <h1 className="mb-4 text-h3">{title}</h1>
        <p className="text-balance text-body-m text-text-subdued">{description}</p>
      </div>
      <div className="flex gap-12">
        {right ?? <DocsLinks docsLink={docsLink} repoLink={repoLink} />}
      </div>
    </div>
  )
}
