import type { ReactNode } from 'react'
import { BookOpenIcon, GithubLogoIcon } from '@axieinfinity/matcha-icons'
import { BuyCrypto } from '@/components/buy-crypto/BuyCrypto'
import { FeaturePage } from '@/components/feature-page/FeaturePage'
import Layout from '@/components/layout/Layout'
import { BUY_CRYPTO_DOCS_LINK, BUY_CRYPTO_REPO_LINK } from '@/configs/constants'

export default function Transfer() {
  return (
    <FeaturePage
      title="Buy Crypto"
      description="Allow users to purchase cryptocurrencies directly using fiat currencies via different payment methods such as card, bank transfer and other local payment methods."
      primaryLink={{
        icon: BookOpenIcon,
        label: 'Deposit Docs',
        url: BUY_CRYPTO_DOCS_LINK,
      }}
      secondaryLink={{
        icon: GithubLogoIcon,
        label: 'Deposit Repo',
        url: BUY_CRYPTO_REPO_LINK,
      }}
    >
      <BuyCrypto />
    </FeaturePage>
  )
}

Transfer.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
