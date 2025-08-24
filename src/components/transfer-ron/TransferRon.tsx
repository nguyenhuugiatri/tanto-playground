import { Button, Input, Intent, Shape } from '@axieinfinity/matcha'
import Link from 'next/link'
import { useState } from 'react'
import { isAddress, parseEther } from 'viem'

import { useAccount, useSendTransaction } from 'wagmi'
import { useChainExplorerUrl } from '@/hooks/useChainExplorerUrl'
import { useToast } from '@/hooks/useToast'
import { CodeExample } from '../code/code-example'
import { ResultBox } from '../result-box/ResultBox'

const defaultToAddress = '0x17Ff618150517D784d92af8D54Bb38c9f7B2F6d4'
const defaultRonAmount = '0.1'

const exampleCode = `
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

function App() {
  const { sendTransaction } = useSendTransaction()

  return (
    <button
      onClick={() =>
        sendTransaction({
          to: '${defaultToAddress}',
          value: parseEther('${defaultRonAmount}'),
        })
      }
    >
      Send RON
    </button>
  )
}
`

export function TransferRon() {
  const toast = useToast()
  const explorerUrl = useChainExplorerUrl()
  const { isConnected } = useAccount()
  const [ronAmount, setRonAmount] = useState<string>(defaultRonAmount)
  const [toAddress, setToAddress] = useState<string>(defaultToAddress)

  const {
    data: txHash,
    isPending,
    sendTransactionAsync,
  } = useSendTransaction()

  const handleTransferRon = async () => {
    try {
      if (!isAddress(toAddress))
        throw new Error('Invalid address.')

      const hash = await sendTransactionAsync({
        to: toAddress,
        value: parseEther(ronAmount),
      })

      toast.success(
        `Transfer ${ronAmount} RON successfully`,
        {
          content: (
            <Link href={`${explorerUrl}/tx/${hash}`} target="_blank" className="break-before-all hover:cursor-pointer hover:underline">
              {`${explorerUrl}/tx/${hash}`}
            </Link>
          ),
        },
      )
    }
    catch (error) {
      toast.error(
        'Transfer RON failed',
        { content: error instanceof Error ? error.message : 'Unknown error.' },
      )
    }
  }

  return (
    <CodeExample
      code={exampleCode}
      header={{
        title: 'Transfer RON',
        description: 'Send native RON tokens to another address.',
      }}
      lang="tsx"
      preview={(
        <div className="flex flex-col gap-16">
          <Input
            shape={Shape.Default}
            label="To"
            value={toAddress}
            onChange={e => setToAddress(e.target.value)}
          />

          <Input
            shape={Shape.Default}
            label="Amount (RON)"
            type="number"
            min={0}
            max={999999999}
            value={ronAmount}
            onChange={e => setRonAmount(e.target.value)}
          />

          <Button
            text="Send RON"
            shape={Shape.Default}
            intent={isConnected ? Intent.Primary : Intent.Default}
            disabled={!ronAmount || !toAddress}
            onClick={handleTransferRon}
          />

          <ResultBox isPending={isPending} label="transaction hash" value={txHash ? { txHash } : null} />
        </div>
      )}
    />
  )
}
