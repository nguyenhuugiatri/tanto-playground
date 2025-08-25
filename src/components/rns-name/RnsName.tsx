import type { Address } from 'viem'
import { Button, Input, Intent, Shape } from '@axieinfinity/matcha'
import { useRnsName } from '@sky-mavis/tanto-widget'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { saigon } from 'viem/chains'
import { CodeExample } from '../code/code-example'
import { ResultBox } from '../result-box/ResultBox'

const defaultAddress: Address = '0x17Ff618150517D784d92af8D54Bb38c9f7B2F6d4'

const exampleCode = `
import { useRnsName } from '@sky-mavis/tanto-widget'

function App() {
  const result = useRnsName({
    address: '${defaultAddress}',
  })
}
`

export function RnsName() {
  const [address, setAddress] = useState(defaultAddress)
  const [debouncedAddress] = useDebounce(address, 500)
  const { data: rnsName, isFetching, refetch } = useRnsName({
    address: debouncedAddress,
    chainId: saigon.id,
  })

  return (
    <CodeExample
      code={exampleCode}
      header={{
        title: 'RNS Name',
        description:
          'Retrieves the primary name associated with a given wallet address. This demo is using the Saigon testnet.',
      }}
      lang="tsx"
      preview={(
        <div className="flex flex-col gap-16">
          <Input
            label="Address"
            shape={Shape.Default}
            value={address}
            onChange={e => setAddress(e.target.value as Address)}
          />
          <Button
            text="Retrieve"
            shape={Shape.Default}
            intent={Intent.Primary}
            disabled={!address}
            onClick={() => refetch()}
          />
          <ResultBox
            isPending={isFetching}
            label="RNS name"
            value={isFetching
              ? null
              : rnsName
                ? { rnsName }
                : {
                    code: 404,
                    message: 'No RNS name found',
                  }}
          />
        </div>
      )}
    />
  )
}
