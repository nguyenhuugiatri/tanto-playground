import { Button, Input, Intent, Shape } from '@axieinfinity/matcha'
import Link from 'next/link'
import { useState } from 'react'
import { isAddress, parseUnits } from 'viem'
import { useWriteContract } from 'wagmi'

import { useChainExplorerUrl } from '@/hooks/useChainExplorerUrl'
import { useToast } from '@/hooks/useToast'
import { CodeExample } from '../code/code-example'
import { ResultBox } from '../result-box/ResultBox'

const axsContractAddress = '0x3c4e17b9056272ce1b49f6900d8cfd6171a1869d'
const defaultToAddress = '0x17Ff618150517D784d92af8D54Bb38c9f7B2F6d4'
const defaultAxsAmount = '0.1'

const exampleCode = `
import { useWriteContract } from 'wagmi'
import { parseUnits } from 'viem'

function App() {
  const { writeContract } = useWriteContract()

  return (
    <button
      onClick={() =>
        writeContract({
          address: '${axsContractAddress}',
          abi: [
            {
              "inputs": [
                { "internalType": "address", "name": "to", "type": "address" },
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
              ],
              "name": "transfer",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ],
          functionName: 'transfer',
          args: ['${defaultToAddress}', parseUnits('${defaultAxsAmount}', 18)],
        })
      }
    >
      Send AXS
    </button>
  )
}
`

export function TransferErc20() {
  const toast = useToast()
  const explorerUrl = useChainExplorerUrl()

  const [axsAmount, setAxsAmount] = useState<string>(defaultAxsAmount)
  const [toAddress, setToAddress] = useState<string>(defaultToAddress)

  const {
    data: txHash,
    isPending,
    writeContractAsync,
  } = useWriteContract()

  const handleTransferAxs = async () => {
    try {
      if (!isAddress(toAddress))
        throw new Error('Invalid address.')

      const hash = await writeContractAsync({
        address: axsContractAddress,
        abi: [
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transfer',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'transfer',
        args: [toAddress, parseUnits(axsAmount, 18)],
      })

      toast.success(`Transfer ${axsAmount} AXS successfully`, {
        content: (
          <Link
            href={`${explorerUrl}/tx/${hash}`}
            target="_blank"
            className="hover:cursor-pointer hover:underline"
          >
            {`${explorerUrl}/tx/${hash}`}
          </Link>
        ),
      })
    }
    catch (error) {
      toast.error('Transfer AXS failed', {
        content: error instanceof Error ? error.message : 'Unknown error.',
      })
    }
  }

  return (
    <CodeExample
      code={exampleCode}
      header={{
        title: 'Transfer ERC-20 Tokens',
        description: 'Send ERC-20 tokens to another address. This example demonstrates sending AXS.',
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
            label="Amount (AXS)"
            type="number"
            min={0}
            max={999999999}
            value={axsAmount}
            onChange={e => setAxsAmount(e.target.value)}
          />

          <Button
            text="Send AXS"
            shape={Shape.Default}
            intent={Intent.Primary}
            disabled={!axsAmount || !toAddress}
            onClick={handleTransferAxs}
          />

          <ResultBox
            isPending={isPending}
            label="transaction hash"
            value={txHash ? { txHash } : null}
          />
        </div>
      )}
    />
  )
}
