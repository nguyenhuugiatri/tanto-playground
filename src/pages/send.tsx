import type { ReactNode } from 'react'
import { TantoConnectButton } from '@sky-mavis/tanto-widget'
import { useAccount } from 'wagmi'
import { ApproveErc20 } from '@/components/approve-erc20/ApproveErc20'
import Layout from '@/components/layout/Layout'
import { PageHeader } from '@/components/page-header/PageHeader'
import { StakeAxs } from '@/components/stake-axs/StakeAxs'
import { WalletCard } from '@/components/wallet-card/WalletCard'
import { UnwrapRon, WrapRon } from '@/components/wrap-ron/WrapRon'

export default function Send() {
  const { isConnected } = useAccount()

  return (
    <div>
      <PageHeader
        title="Send Transaction"
        description="Interact with smart contracts or transfer assets by sending transactions. This allows you to execute contract methods, update on-chain state, and move value securely across the network."
      />

      <div className="relative h-full">
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
          <ApproveErc20 />
          <StakeAxs />
          <WrapRon />
          <UnwrapRon />
        </div>
      </div>
    </div>
  )
}

Send.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
