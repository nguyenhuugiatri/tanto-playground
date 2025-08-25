import type { ReactNode } from 'react'
import { BookOpenIcon, GithubLogoIcon } from '@axieinfinity/matcha-icons'
import { FeaturePage } from '@/components/feature-page/FeaturePage'
import Layout from '@/components/layout/Layout'
import { PersonalSign } from '@/components/personal-sign/PersonalSign'
import { SignTypedData } from '@/components/sign-typed-data/SignTypedData'
import { DOCS_LINK, REPO_LINK } from '@/configs/constants'

export default function Sign() {
  return (
    <FeaturePage
      connectRequired
      title="Sign Message"
      description="Sign plain text (personal sign) to prove account ownership or structured data (EIP-712) for human-readable approvals and secure off-chain verification — without sending on-chain transactions."
      primaryLink={{
        icon: BookOpenIcon,
        label: 'Tanto Docs',
        url: DOCS_LINK,
      }}
      secondaryLink={{
        icon: GithubLogoIcon,
        label: 'Tanto Repo',
        url: REPO_LINK,
      }}
    >
      <PersonalSign />
      <SignTypedData />
    </FeaturePage>
  )
}

Sign.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
