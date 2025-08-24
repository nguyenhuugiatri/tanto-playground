import type { ReactNode } from 'react'
import { ApproveErc20 } from '@/components/approve-erc20/ApproveErc20'
import { ConnectRequiredPage } from '@/components/connect-required-page/ConnectRequiredPage'
import Layout from '@/components/layout/Layout'
import { StakeAxs } from '@/components/stake-axs/StakeAxs'
import { UnwrapRon, WrapRon } from '@/components/wrap-ron/WrapRon'

export default function Send() {
  return (
    <ConnectRequiredPage
      title="Send Transaction"
      description="Interact with smart contracts or transfer assets by sending transactions. This allows you to execute contract methods, update on-chain state, and move value securely across the network."
    >
      <ApproveErc20 />
      <StakeAxs />
      <WrapRon />
      <UnwrapRon />
    </ConnectRequiredPage>
  )
}

Send.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
