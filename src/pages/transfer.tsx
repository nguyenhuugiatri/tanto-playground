import type { ReactNode } from 'react'
import { BookOpenIcon, GithubLogoIcon } from '@axieinfinity/matcha-icons'
import { FeaturePage } from '@/components/feature-page/FeaturePage'
import Layout from '@/components/layout/Layout'
import { TransferErc20 } from '@/components/transfer-erc20/TransferErc20'
import { TransferRon } from '@/components/transfer-ron/TransferRon'
import { DOCS_LINK, REPO_LINK } from '@/configs/constants'

export default function Transfer() {
  return (
    <FeaturePage
      connectRequired
      title="Transfer Tokens"
      description="Transfer RON or ERC20 tokens. This allows you to move value between wallets."
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
      <TransferRon />
      <TransferErc20 />
    </FeaturePage>
  )
}

Transfer.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
