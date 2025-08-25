import type { ReactNode } from 'react'
import { BookOpenIcon, GithubLogoIcon } from '@axieinfinity/matcha-icons'
import { ApproveErc20 } from '@/components/approve-erc20/ApproveErc20'
import { FeaturePage } from '@/components/feature-page/FeaturePage'
import Layout from '@/components/layout/Layout'
import { StakeAxs } from '@/components/stake-axs/StakeAxs'
import { UnwrapRon, WrapRon } from '@/components/wrap-ron/WrapRon'
import { DOCS_LINK, REPO_LINK } from '@/configs/constants'

export default function Send() {
  return (
    <FeaturePage
      connectRequired
      title="Send Transaction"
      description="Interact with smart contracts or transfer assets by sending transactions. This allows you to execute contract methods, update on-chain state, and move value securely across the network."
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
      <ApproveErc20 />
      <StakeAxs />
      <WrapRon />
      <UnwrapRon />
    </FeaturePage>
  )
}

Send.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
