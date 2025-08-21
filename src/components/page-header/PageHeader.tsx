import type { FC, ReactNode } from 'react'
import { Button, Intent, Shape } from '@axieinfinity/matcha'
import { BookOpenIcon, GithubLogoIcon } from '@axieinfinity/matcha-icons'
import Link from 'next/link'

interface PageHeaderProps {
  title: string
  description: ReactNode
  right?: ReactNode
}

export function DocsLinks() {
  return (
    <>
      <Link href="https://github.com/skymavis/tanto-kit/blob/main/packages/widget/README.md" target="_blank">
        <Button text="Documentation" shape={Shape.Default} intent={Intent.Primary} icon={BookOpenIcon} />
      </Link>
      <Link href="https://github.com/skymavis/tanto-kit" target="_blank">
        <Button text="Repository" shape={Shape.Default} intent={Intent.Secondary} icon={GithubLogoIcon} />
      </Link>
    </>
  )
}

export const PageHeader: FC<PageHeaderProps> = ({ title, description, right }) => {
  return (
    <div className="mb-32 flex justify-between gap-24 border-b py-40">
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
