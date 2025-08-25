import { Checkbox } from '@axieinfinity/matcha'
import { walletConfigs } from '@sky-mavis/tanto-widget/configs/walletConfigs'
import { WALLET_IDS } from '@sky-mavis/tanto-widget/constants'
import { isRoninWalletHeadlessConnector, isRoninWalletInjected, isSafeConnector, isWaypointConnector } from '@sky-mavis/tanto-widget/utils/walletDetection'
import { useConnectors } from 'wagmi'
import { useUiConfigStore } from '@/contexts/UiConfigProvider'

const SAME_WALLET_GROUPS: string[][] = [
  [WALLET_IDS.RONIN_WALLET, WALLET_IDS.RONIN_WALLET_INJECTED],
  [WALLET_IDS.WAYPOINT, WALLET_IDS.RONIN_WALLET_HEADLESS],
]

function findWalletGroup(walletId: string) {
  return SAME_WALLET_GROUPS.find(group => group.includes(walletId)) ?? [walletId]
}

export function WalletConfig() {
  const connectors = useConnectors()
  const { excludedWalletIds, setExcludedWalletIds } = useUiConfigStore(state => ({
    excludedWalletIds: state.excludedWalletIds,
    setExcludedWalletIds: state.setExcludedWalletIds,
  }))

  const filteredConnectors = connectors
    .filter(connector => !isWaypointConnector(connector.id) && !isRoninWalletInjected(connector.id) && !isSafeConnector(connector.id))
    .sort((a, b) => (isRoninWalletHeadlessConnector(a.id) ? -1 : isRoninWalletHeadlessConnector(b.id) ? 1 : 0))

  const handleCheckboxChange = (walletId: string, checked: boolean) => {
    const group = findWalletGroup(walletId)
    setExcludedWalletIds(
      checked
        ? excludedWalletIds.filter(id => !group.includes(id))
        : Array.from(new Set([...excludedWalletIds, ...group])),
    )
  }

  return (
    <div className="flex flex-col gap-16">
      {filteredConnectors.map(connector => (
        <Checkbox
          key={connector.id}
          className="items-center gap-4"
          label={(
            <div className="flex items-center gap-8">
              <div className="size-32 overflow-hidden rounded-8 [&>div>div>svg]:size-14 [&_*]:size-32">
                {walletConfigs[connector.id]?.icon ?? (
                  <img src={connector.icon} alt={connector.name} />
                )}
              </div>
              <p>{connector.name}</p>
            </div>
          )}
          checked={!excludedWalletIds.includes(connector.id)}
          onChange={e => handleCheckboxChange(connector.id, e.target.checked)}
        />
      ))}
    </div>
  )
}
