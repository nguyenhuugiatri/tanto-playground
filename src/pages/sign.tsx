import type { ReactNode } from 'react'
import { TantoConnectButton } from '@sky-mavis/tanto-widget'
import { useConnectCallback } from '@sky-mavis/tanto-widget/hooks/useConnectCallback'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import Layout from '@/components/layout/Layout'
import { PageHeader } from '@/components/page-header/PageHeader'
import { PersonalSign } from '@/components/personal-sign/PersonalSign'
import { WalletCard } from '@/components/wallet-card/WalletCard'
import { routes } from '@/configs/routes'

export default function Sign() {
  const { isConnected } = useAccount()
  const router = useRouter()

  useConnectCallback({
    onConnect: () => router.push(routes.signMessage.path),
  })

  return (
    <div>
      <PageHeader
        title="Sign Message"
        description="Sign plain text (personal sign) to prove account ownership or structured data (EIP-712) for human-readable approvals and secure off-chain verification — without sending on-chain transactions."
      />

      <div className="relative h-full">
        <WalletCard className="mb-32" />

        {!isConnected && (
          <div className="absolute left-0 top-0 z-10 size-full cursor-not-allowed backdrop-blur-sm">
            <div className="flex size-full h-4/5 flex-col items-center justify-center gap-4">
              <div className="text-h5">Wallet Not Connected</div>
              <div className="mb-32 text-body-s text-text-subdued">
                Please connect your wallet to continue
              </div>
              <TantoConnectButton />
            </div>
          </div>
        )}

        <PersonalSign />
      </div>
    </div>
  )
}

Sign.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
