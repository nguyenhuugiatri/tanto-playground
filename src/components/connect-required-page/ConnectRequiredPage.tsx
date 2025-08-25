import type { ReactNode } from 'react'
import { TantoConnectButton } from '@sky-mavis/tanto-widget'
import { useAccount } from 'wagmi'
import { PageHeader } from '@/components/page-header/PageHeader'
import { WalletCard } from '@/components/wallet-card/WalletCard'

interface ConnectRequiredPageProps {
  title: string
  description: string
  children: ReactNode
  docsLink?: string
  repoLink?: string
}

export function ConnectRequiredPage({ title, description, children, docsLink, repoLink }: ConnectRequiredPageProps) {
  const { isConnected } = useAccount()

  return (
    <div>
      <PageHeader title={title} description={description} docsLink={docsLink} repoLink={repoLink} />

      <div className="relative pb-[10vh]">
        <WalletCard className="mb-32" />

        {!isConnected && (
          <div className="absolute inset-0 z-10 flex justify-center rounded-xl backdrop-blur-sm">
            <div className="sticky mt-[20vh] flex flex-col items-center">
              <p className="mb-8 text-h5">Wallet Not Connected</p>
              <p className="mb-32 text-body-s text-text-subdued">
                Please connect your wallet to continue
              </p>
              <TantoConnectButton />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-32 px-8 md:px-20">{children}</div>
      </div>
    </div>
  )
}
