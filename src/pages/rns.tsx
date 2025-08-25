import type { ReactNode } from 'react'
import { BookOpenIcon, HouseIcon } from '@axieinfinity/matcha-icons'
import { FeaturePage } from '@/components/feature-page/FeaturePage'
import Layout from '@/components/layout/Layout'
import { RnsAddress } from '@/components/rns-address/RnsAddress'
import { RnsName } from '@/components/rns-name/RnsName'
import { RNS_DOCS_LINK, RNS_HOMEPAGE_LINK } from '@/configs/constants'

export default function Rns() {
  return (
    <FeaturePage
      title="Ronin Name Service"
      description='Distributed naming system based on the Ronin blockchain that lets you assign a human-readable ".ron" domain name to your long Ronin address'
      primaryLink={{
        icon: BookOpenIcon,
        label: 'RNS Docs',
        url: RNS_DOCS_LINK,
      }}
      secondaryLink={{
        icon: HouseIcon,
        label: 'RNS Homepage',
        url: RNS_HOMEPAGE_LINK,
      }}
    >
      <RnsName />
      <RnsAddress />
    </FeaturePage>
  )
}

Rns.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
