import { Switch } from '@axieinfinity/matcha'
import { useUiConfigStore } from '@/contexts/UiConfigProvider'

export function HeadlessConfig() {
  const { showConfirmationModal, setShowConfirmationModal } = useUiConfigStore(state => ({
    showConfirmationModal: state.showConfirmationModal,
    setShowConfirmationModal: state.setShowConfirmationModal,
  }))

  return (
    <Switch
      trackClassName="min-w-36"
      label={(
        <div className="text-balance text-body-s text-text-subdued">
          <p>Enable confirmation popup.</p>
          <p>
            Whenever you sign or send using Headless Wallet, you’ll see an in-app confirmation popup.
          </p>
        </div>
      )}
      checked={showConfirmationModal}
      onChange={e => setShowConfirmationModal(e.target.checked)}
    />
  )
}
