import type { ReactNode } from 'react'
import { ConnectRequiredPage } from '@/components/connect-required-page/ConnectRequiredPage'
import Layout from '@/components/layout/Layout'
import { TransferErc20 } from '@/components/transfer-erc20/TransferErc20'
import { TransferRon } from '@/components/transfer-ron/TransferRon'

export default function Transfer() {
  return (
    <ConnectRequiredPage
      title="Transfer Tokens"
      description="Transfer RON or ERC20 tokens. This allows you to move value between wallets."
    >
      <TransferRon />
      <TransferErc20 />
    </ConnectRequiredPage>
  )
}

Transfer.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
