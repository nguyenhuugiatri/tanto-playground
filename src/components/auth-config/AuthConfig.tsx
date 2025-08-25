import { Switch } from '@axieinfinity/matcha'
import Link from 'next/link'
import { useUiConfigStore } from '@/contexts/UiConfigProvider'

export function AuthConfig() {
  const { createAccountOnConnect, setCreateAccountOnConnect } = useUiConfigStore(state => ({
    createAccountOnConnect: state.createAccountOnConnect,
    setCreateAccountOnConnect: state.setCreateAccountOnConnect,
  }))

  return (
    <Switch
      trackClassName="min-w-36"
      label={(
        <div className="text-body-s text-text-subdued">
          <p>Auto-creates a Ronin Account on connect</p>
          <p>
            Enable to join the
            {' '}
            <Link
              className="underline hover:cursor-pointer"
              href="https://docs.skymavis.com/en/docs/referral-program/ronin-referral-program"
              target="_blank"
            >
              Ronin Referral Program
            </Link>
            {' '}
            for Studios.
          </p>
          <p>(Earn Up to 10% Revenue Share)</p>
        </div>
      )}
      checked={createAccountOnConnect}
      onChange={e => setCreateAccountOnConnect(e.target.checked)}
    />
  )
}
