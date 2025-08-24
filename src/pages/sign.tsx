import type { ReactNode } from 'react'
import { ConnectRequiredPage } from '@/components/connect-required-page/ConnectRequiredPage'
import Layout from '@/components/layout/Layout'
import { PersonalSign } from '@/components/personal-sign/PersonalSign'
import { SignTypedData } from '@/components/sign-typed-data/SignTypedData'

export default function Sign() {
  return (
    <ConnectRequiredPage
      title="Sign Message"
      description="Sign plain text (personal sign) to prove account ownership or structured data (EIP-712) for human-readable approvals and secure off-chain verification — without sending on-chain transactions."
    >
      <PersonalSign />
      <SignTypedData />
    </ConnectRequiredPage>
  )
}

Sign.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
