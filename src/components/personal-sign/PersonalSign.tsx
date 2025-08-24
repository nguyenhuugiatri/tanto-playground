import { Button, Intent, Shape, TextArea } from '@axieinfinity/matcha'
import { useState } from 'react'
import { parseSignature, serializeSignature, verifyMessage } from 'viem'
import { useAccount, useSignMessage } from 'wagmi'
import { useToast } from '@/hooks/useToast'
import { CodeExample } from '../code/code-example'
import { ResultBox } from '../result-box/ResultBox'

const defaultMessage = 'Welcome to Tanto Widget'

const exampleCode = `
import { useSignMessage } from 'wagmi'

function App() {
  const { signMessage } = useSignMessage()

  return (
    <button onClick={() => signMessage({
      message: '${defaultMessage}',
    })}
    >
      Sign message
    </button>
  )
}
`

export function PersonalSign() {
  const { isConnected, address } = useAccount()
  const toast = useToast()

  const [message, setMessage] = useState(defaultMessage)
  const { data: signature, signMessageAsync, isPending } = useSignMessage()

  const handleSign = async () => {
    try {
      const signature = await signMessageAsync({ message })

      const isValid = await verifyMessage({
        address: address!,
        message,
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
        title: 'Personal Sign',
        description:
          'Sign plain text, useful for authentication flows and verifying wallet ownership.',
      }}
      lang="tsx"
      preview={(
        <div className="flex flex-col gap-16">
          <TextArea
            label="Message"
            shape={Shape.Default}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button
            text="Sign message"
            shape={Shape.Default}
            intent={isConnected ? Intent.Primary : Intent.Default}
            disabled={!message}
            onClick={handleSign}
          />
          <ResultBox isPending={isPending} label="signature" value={signature} />
        </div>
      )}
    />
  )
}
