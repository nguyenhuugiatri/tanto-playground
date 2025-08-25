import { Button, Input, Intent, Shape } from '@axieinfinity/matcha'
import { useRnsAddress } from '@sky-mavis/tanto-widget'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { isAddressEqual, zeroAddress } from 'viem'
import { useChainId } from 'wagmi'
import { CodeExample } from '../code/code-example'
import { ResultBox } from '../result-box/ResultBox'

const defaultRnsName: string = 'roninloveyou.ron'

const exampleCode = `
import { useRnsName } from '@sky-mavis/tanto-widget'

function App() {
  const result = useRnsAddress({
    rnsName: '${defaultRnsName}',
  })
}
`

export function RnsAddress() {
  const chainId = useChainId()
  const [rnsName, setRnsName] = useState(defaultRnsName)
  const [debouncedRnsName] = useDebounce(rnsName, 500)
  const { data: address, isFetching, refetch } = useRnsAddress({ name: debouncedRnsName, chainId })

  return (
    <CodeExample
      code={exampleCode}
      header={{
        title: 'RNS Address',
        description:
          'Resolves a Ronin name to its corresponding wallet address.',
      }}
      lang="tsx"
      preview={(
        <div className="flex flex-col gap-16">
          <Input
            label="RNS Name"
            shape={Shape.Default}
            value={rnsName}
            onChange={e => setRnsName(e.target.value)}
          />
          <Button
            text="Resolve"
            shape={Shape.Default}
            intent={Intent.Primary}
            disabled={!rnsName}
            onClick={() => refetch()}
          />
          <ResultBox
            isPending={isFetching}
            label="RNS address"
            value={isFetching
              ? null
              : address && !isAddressEqual(address, zeroAddress)
                ? { address }
                : {
                    code: 404,
                    message: 'No RNS address found',
                  }}
          />
        </div>
      )}
    />
  )
}
