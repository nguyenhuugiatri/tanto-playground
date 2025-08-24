import { Button, Input, Intent, Shape } from '@axieinfinity/matcha'
import Link from 'next/link'
import { useState } from 'react'
import { parseUnits } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

import { useChainExplorerUrl } from '@/hooks/useChainExplorerUrl'
import { useToast } from '@/hooks/useToast'
import { CodeExample } from '../code/code-example'
import { ResultBox } from '../result-box/ResultBox'

const stakingPoolAddress = '0x271fe61bf3b771c87b803a5d0f522587249e0028'
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
          address: '${stakingPoolAddress}',
          abi: [
            {
              "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }],
              "name": "stake",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ],
          functionName: 'stake',
          args: [parseUnits('${defaultAxsAmount}', 18)],
        })
      }
    >
      Stake AXS
    </button>
  )
}
`

export function StakeAxs() {
  const { isConnected, address } = useAccount()
  const toast = useToast()
  const explorerUrl = useChainExplorerUrl()

  const [axsAmount, setAxsAmount] = useState<string>(defaultAxsAmount)

  const {
    data: txHash,
    isPending,
    writeContractAsync,
  } = useWriteContract()

  const handleStakeAxs = async () => {
    try {
      if (!address)
        throw new Error('Please connect your wallet first!')

      const hash = await writeContractAsync({
        address: stakingPoolAddress,
        abi: [
          {
            inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
            name: 'stake',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'stake',
        args: [parseUnits(axsAmount, 18)],
      })

      toast.success(`Stake ${axsAmount} AXS successfully!`, {
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
      toast.error('Stake AXS failed', {
        content: error instanceof Error ? error.message : 'Unknown error.',
      })
    }
  }

  return (
    <CodeExample
      code={exampleCode}
      header={{
        title: 'Stake AXS',
        description: 'This example demonstrates staking AXS tokens into the staking pool to earn rewards.',
      }}
      lang="tsx"
      preview={(
        <div className="flex flex-col gap-16">
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
            text="Stake AXS"
            shape={Shape.Default}
            intent={isConnected ? Intent.Primary : Intent.Default}
            disabled={!axsAmount || !address}
            onClick={handleStakeAxs}
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
