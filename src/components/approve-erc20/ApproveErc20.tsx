import { Button, Input, Intent, Shape } from '@axieinfinity/matcha'
import Link from 'next/link'
import { useState } from 'react'
import { isAddress, parseUnits } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

import { useChainExplorerUrl } from '@/hooks/useChainExplorerUrl'
import { useToast } from '@/hooks/useToast'
import { CodeExample } from '../code/code-example'
import { ResultBox } from '../result-box/ResultBox'

const axsContractAddress = '0x3c4e17b9056272ce1b49f6900d8cfd6171a1869d'
const defaultSpender = '0x17Ff618150517D784d92af8D54Bb38c9f7B2F6d4'
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
                { "internalType": "address", "name": "spender", "type": "address" },
                { "internalType": "uint256", "name": "amount", "type": "uint256" }
              ],
              "name": "approve",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ],
          functionName: 'approve',
          args: ['${defaultSpender}', parseUnits('${defaultAxsAmount}', 18)],
        })
      }
    >
      Approve AXS
    </button>
  )
}
`

export function ApproveErc20() {
  const toast = useToast()
  const explorerUrl = useChainExplorerUrl()
  const { isConnected } = useAccount()
  const [axsAmount, setAxsAmount] = useState<string>(defaultAxsAmount)
  const [spender, setSpender] = useState<string>(defaultSpender)

  const {
    data: txHash,
    isPending,
    writeContractAsync,
  } = useWriteContract()

  const handleApproveAxs = async () => {
    try {
      if (!isAddress(spender))
        throw new Error('Invalid spender address.')

      const hash = await writeContractAsync({
        address: axsContractAddress,
        abi: [
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'approve',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'approve',
        args: [spender, parseUnits(axsAmount, 18)],
      })

      toast.success(`Approve ${axsAmount} AXS successfully`, {
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
      toast.error('Approve AXS failed', {
        content: error instanceof Error ? error.message : 'Unknown error.',
      })
    }
  }

  return (
    <CodeExample
      code={exampleCode}
      header={{
        title: 'Approve ERC-20 Tokens',
        description: 'Allow another address (spender) to spend your ERC-20 tokens on your behalf. This example demonstrates approving AXS.',
      }}
      lang="tsx"
      preview={(
        <div className="flex flex-col gap-16">
          <Input
            shape={Shape.Default}
            label="Spender"
            value={spender}
            onChange={e => setSpender(e.target.value)}
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
            text="Approve AXS"
            shape={Shape.Default}
            intent={isConnected ? Intent.Primary : Intent.Default}
            disabled={!axsAmount || !spender}
            onClick={handleApproveAxs}
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
