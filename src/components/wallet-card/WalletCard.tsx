import type { FC } from 'react'
import { Button, ButtonSize, Shape } from '@axieinfinity/matcha'
import { SignOutFillIcon } from '@axieinfinity/matcha-icons'
import { useAccountRns, useConnectedWallet } from '@sky-mavis/tanto-widget'
import { formatBalance } from '@sky-mavis/tanto-widget/utils/balance'
import { truncate } from '@sky-mavis/tanto-widget/utils/string'
import Link from 'next/link'
import { useBalance, useDisconnect } from 'wagmi'
import { useChainExplorerUrl } from '@/hooks/useChainExplorerUrl'
import { cn } from '@/utils/cn'
import { PairInfo } from '../pair-info/PairInfo'

interface WalletCardProps {
  className?: string
}

export const WalletCard: FC<WalletCardProps> = ({ className }) => {
  const { address, rns, chain } = useAccountRns()
  const wallet = useConnectedWallet()
  const { data: balanceData } = useBalance({ address })
  const { disconnect } = useDisconnect()
  const explorerUrl = useChainExplorerUrl()

  if (!wallet)
    return null

  const balance = balanceData
    ? `${formatBalance(balanceData.value)} ${balanceData.symbol}`
    : null

  return (
    <div className={cn('overflow-hidden rounded-12 bg-black-8 px-20 py-16', className)}>
      <div className="grid md:grid-cols-12">
        <div className="grid gap-12 md:col-span-10 md:grid-cols-4 md:gap-24">
          <PairInfo
            label="Wallet"
            value={(
              <div className="flex items-center gap-8">
                <span className="text-body-m-strong">{wallet.name}</span>
                <img className="size-20" src={wallet.icon} alt={wallet.name} />
              </div>
            )}
          />

          <PairInfo
            label="Chain"
            value={chain && `${chain.name} (${chain.id})`}
          />

          <PairInfo
            label="Address"
            value={
              address && explorerUrl && (
                <Link
                  className="flex items-center gap-4 hover:underline"
                  href={`${explorerUrl}/address/${address}`}
                  target="_blank"
                >
                  {rns || truncate(address)}
                </Link>
              )
            }
          />

          <PairInfo
            label="Balance"
            value={balance}
          />
        </div>

        <div className="flex items-center justify-end md:col-span-2">
          <Button
            shape={Shape.Default}
            icon={SignOutFillIcon}
            size={ButtonSize.Small}
            text="Disconnect"
            onClick={() => disconnect()}
          />
        </div>
      </div>
    </div>
  )
}
