import { Button, Intent, Shape } from '@axieinfinity/matcha'
import { BookOpenIcon, GithubLogoIcon } from '@axieinfinity/matcha-icons'

export default function Home() {
  return (
    <div>
      <div className="py-40 mb-32 flex justify-between gap-24 border-b">
        <div>
          <h1 className="text-h3 mb-4">
            ConnectButton
          </h1>
          <p className="text-body-m text-text-subdued text-balance">A fully featured wallet connection component that allows to Connect to 500+ external wallets, connect via email, phone number, passkey or social logins, Convert any wallet to a ERC4337 smart wallet for gasless transactions and provides SIWE (Sign In With Ethereum)</p>
        </div>
        <div className="flex gap-12">
          <Button text="Documentation" shape={Shape.Default} intent={Intent.Primary} icon={BookOpenIcon} />
          <Button text="Repository" shape={Shape.Default} intent={Intent.Secondary} icon={GithubLogoIcon} />
        </div>
      </div>
      <Button text="Click me" intent={Intent.Secondary} />
    </div>
  )
}
