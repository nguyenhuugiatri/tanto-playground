import type { ReactNode } from 'react'
import { useAccount } from 'wagmi'
import Layout from '@/components/layout/Layout'
import { PersonalSign } from '@/components/personal-sign/PersonalSign'

export default function Sign() {
  const { isConnected } = useAccount()

  return (
    <div>
      <div className="relative flex size-full flex-col px-4 pt-16">
        {!isConnected && (
          <div className="absolute left-0 top-0 z-10 size-full cursor-not-allowed backdrop-blur-sm">
            <div className="flex size-full h-3/5 flex-col items-center justify-center gap-4">
              <div className="text-h5">Wallet not connected</div>
              <div className="text-body-s text-text-subdued">
                Connect your wallet to continue.
              </div>
            </div>
          </div>
        )}
        <PersonalSign />
      </div>
    </div>
  )
}

Sign.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
