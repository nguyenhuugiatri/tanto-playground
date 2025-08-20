import { Button, Input, TextArea } from '@axieinfinity/matcha'
import { useState } from 'react'
import { parseSignature, serializeSignature, verifyMessage } from 'viem'
import { useAccount, useSignMessage } from 'wagmi'
import { useToast } from '@/hooks/useToast'

export function PersonalSign() {
  const { address, isConnected } = useAccount()
  const { toastSuccess, toastError } = useToast()

  const [message, setMessage] = useState<string>(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ullam impedit nemo fugiat sed laudantium placeat.',
  )
  const [result, setResult] = useState<string>()
  const { signMessageAsync, isPending } = useSignMessage()

  const handleSign = async () => {
    try {
      const signature = await signMessageAsync({ message })
      const isValid = await verifyMessage({
        address: address!,
        message,
        signature: serializeSignature(parseSignature(signature)),
      })

      if (!isValid)
        throw new Error('Invalid signature')

      setResult(signature)
      toastSuccess('Sign message successfully!')
    }
    catch (error) {
      toastError(`Sign message failed: ${error instanceof Error ? error.message : 'Unknown error'}.`)
    }
  }

  return (
    <div className="flex flex-col gap-12 rounded-12 border p-16">
      <h3 className="text-h5">Personal Sign</h3>
      <div className="grid grid-cols-2 gap-24">
        <div className="flex flex-col gap-12">
          <TextArea value={message} onChange={e => setMessage(e.target.value)} />
          <Button text="Sign" loading={isPending} disabled={!isConnected} onClick={handleSign} />
        </div>
        <div className="rounded-12 border p-12 text-text-default"><pre className="whitespace-pre-wrap break-words text-body-m">{result}</pre></div>
      </div>
    </div>
  )
}
