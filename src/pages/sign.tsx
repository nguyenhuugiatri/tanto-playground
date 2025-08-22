import type { ReactNode } from 'react'
import { TantoConnectButton } from '@sky-mavis/tanto-widget'
import { useAccount } from 'wagmi'
import Layout from '@/components/layout/Layout'
import { PageHeader } from '@/components/page-header/PageHeader'
import { PersonalSign } from '@/components/personal-sign/PersonalSign'
import { SignTypedData } from '@/components/sign-typed-data/SignTypedData'
import { WalletCard } from '@/components/wallet-card/WalletCard'

export default function Sign() {
  const { isConnected } = useAccount()

  return (
    <div>
      <PageHeader
        title="Sign Message"
        description="Sign plain text (personal sign) to prove account ownership or structured data (EIP-712) for human-readable approvals and secure off-chain verification — without sending on-chain transactions."
      />

      <div className="relative h-full">
        <WalletCard className="mb-32" />

        {!isConnected && (
          <div className="absolute left-0 top-0 z-10 size-full cursor-not-allowed backdrop-blur-md">
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
          <PersonalSign />
          <SignTypedData />
        </div>
      </div>
    </div>
  )
}

Sign.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
