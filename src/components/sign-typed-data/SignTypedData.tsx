import { Button, Intent, Shape } from '@axieinfinity/matcha'
import { parseSignature, serializeSignature, verifyTypedData } from 'viem'
import { useAccount, useSignTypedData } from 'wagmi'
import { useToast } from '@/hooks/useToast'
import { CodeExample } from '../code/code-example'
import { ResultBox } from '../result-box/ResultBox'

const exampleCode = `
import { useSignTypedData } from 'wagmi'

function App() {
  const { signTypedData } = useSignTypedData()

  return (
    <button
      onClick={() =>
        signTypedData({
          types: {
            Person: [
              { name: 'name', type: 'string' },
              { name: 'wallet', type: 'address' },
            ],
            Mail: [
              { name: 'from', type: 'Person' },
              { name: 'to', type: 'Person' },
              { name: 'contents', type: 'string' },
            ],
          },
          primaryType: 'Mail',
          message: {
            from: {
              name: 'Cow',
              wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            },
            to: {
              name: 'Bob',
              wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
            },
            contents: 'Hello, Bob!',
          },
        })
      }
    >
      Sign message
    </button>
  )
}
`

const signTypedDataData = {
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
}

export function SignTypedData() {
  const { address, isConnected } = useAccount()
  const toast = useToast()

  const { data: signature, signTypedDataAsync, isPending } = useSignTypedData()

  const handleSign = async () => {
    try {
      if (!address)
        throw new Error('No address found.')

      const signature = await signTypedDataAsync({
        types: signTypedDataData.types,
        message: signTypedDataData.message,
        primaryType: 'Mail',
      })

      const isValid = await verifyTypedData({
        address,
        primaryType: 'Mail',
        types: signTypedDataData.types,
        message: signTypedDataData.message,
        signature: serializeSignature(parseSignature(signature)),
      })

      if (!isValid)
        throw new Error('Invalid signature.')

      toast.success('Sign message successfully', {
        content: 'The message was signed and verified with your wallet.',
      })
    }
    catch (error) {
      toast.error('Sign message failed', {
        content: error instanceof Error ? error.message : 'Unknown error.',
      })
    }
  }

  return (
    <CodeExample
      code={exampleCode}
      header={{
        title: 'Sign Typed Data',
        description:
          'Sign structured EIP-712 typed data, enabling human-readable approvals and off-chain verification.',
      }}
      lang="tsx"
      preview={(
        <div className="flex w-full flex-col gap-16">
          <Button
            text="Sign message"
            shape={Shape.Default}
            intent={Intent.Primary}
            onClick={handleSign}
          />
          <ResultBox isPending={isPending} label="signature" value={signature} />
        </div>
      )}
    />
  )
}
