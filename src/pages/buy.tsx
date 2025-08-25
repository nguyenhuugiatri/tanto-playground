import type { ReactNode } from 'react'
import { BuyCrypto } from '@/components/buy-crypto/BuyCrypto'
import { ConnectRequiredPage } from '@/components/connect-required-page/ConnectRequiredPage'
import Layout from '@/components/layout/Layout'
import { BUY_CRYPTO_DOCS_LINK } from '@/configs/constants'

export default function Transfer() {
  return (
    <ConnectRequiredPage
      title="Buy Crypto"
      description="Allow users to purchase cryptocurrencies directly using fiat currencies via different payment methods such as card, bank transfer and other local payment methods."
      docsLink={BUY_CRYPTO_DOCS_LINK}
    >
      <BuyCrypto />
    </ConnectRequiredPage>
  )
}

Transfer.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
