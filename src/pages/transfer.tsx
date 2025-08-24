import type { ReactNode } from 'react'
import { TantoConnectButton } from '@sky-mavis/tanto-widget'
import { useAccount } from 'wagmi'
import Layout from '@/components/layout/Layout'
import { PageHeader } from '@/components/page-header/PageHeader'
import { TransferErc20 } from '@/components/transfer-erc20/TransferErc20'
import { TransferRon } from '@/components/transfer-ron/TransferRon'
import { WalletCard } from '@/components/wallet-card/WalletCard'

export default function Transfer() {
  const { isConnected } = useAccount()

  return (
    <div>
      <PageHeader
        title="Transfer Tokens"
        description="Transfer RON or ERC20 tokens. This allows you to move value between wallets."
      />

      <div className="relative pb-[10vh]">
        <WalletCard className="mb-32" />

        {!isConnected && (
          <div className="absolute left-0 top-0 z-10 size-full cursor-not-allowed backdrop-blur-sm">
            <div className="mt-[20vh] flex size-full flex-col items-center gap-4">
              <div className="text-h5">Wallet Not Connected</div>
              <div className="mb-32 text-body-s text-text-subdued">
                Please connect your wallet to continue
              </div>
              <TantoConnectButton />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-32 px-20">
          <TransferRon />
          <TransferErc20 />
        </div>
      </div>
    </div>
  )
}

Transfer.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
