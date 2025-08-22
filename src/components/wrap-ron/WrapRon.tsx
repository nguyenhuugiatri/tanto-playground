import { Button, Input, Intent, Shape } from '@axieinfinity/matcha'
import Link from 'next/link'
import { useState } from 'react'
import { parseUnits } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

import { useChainExplorerUrl } from '@/hooks/useChainExplorerUrl'
import { useToast } from '@/hooks/useToast'
import { CodeExample } from '../code/code-example'
import { ResultBox } from '../result-box/ResultBox'

const wRonAddress = '0xa959726154953bae111746e265e6d754f48570e6'
const defaultRonAmount = '0.1'

// ---------------------- Wrap RON ----------------------

const wrapExampleCode = `
import { useWriteContract } from 'wagmi'
import { parseUnits } from 'viem'

function App() {
  const { writeContract } = useWriteContract()

  return (
    <button
      onClick={() =>
        writeContract({
          address: '${wRonAddress}',
          abi: [
            {
              "inputs": [],
              "name": "deposit",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            }
          ],
          functionName: 'deposit',
          value: parseUnits('${defaultRonAmount}', 18),
        })
      }
    >
      Wrap RON
    </button>
  )
}
`

export function WrapRon() {
  const { address } = useAccount()
  const toast = useToast()
  const explorerUrl = useChainExplorerUrl()

  const [ronAmount, setRonAmount] = useState(defaultRonAmount)

  const {
    data: txHash,
    isPending,
    writeContractAsync,
  } = useWriteContract()

  const handleWrap = async () => {
    try {
      if (!address)
        throw new Error('Please connect your wallet first!')

      const hash = await writeContractAsync({
        address: wRonAddress,
        abi: [
          {
            inputs: [],
            name: 'deposit',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
          },
        ],
        functionName: 'deposit',
        value: parseUnits(ronAmount, 18),
      })

      toast.success(`Wrapped ${ronAmount} RON successfully!`, {
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
    catch (err) {
      toast.error('Wrap RON failed', {
        content: err instanceof Error ? err.message : 'Unknown error',
      })
    }
  }

  return (
    <CodeExample
      code={wrapExampleCode}
      header={{
        title: 'Wrap RON',
        description: 'This example demonstrates wrapping native RON into wRON ERC20 token.',
      }}
      lang="tsx"
      preview={(
        <div className="flex flex-col gap-16">
          <Input
            shape={Shape.Default}
            label="Amount (RON)"
            type="number"
            min={0}
            value={ronAmount}
            onChange={e => setRonAmount(e.target.value)}
          />

          <Button
            text="Wrap RON"
            shape={Shape.Default}
            intent={Intent.Primary}
            disabled={!ronAmount || !address}
            onClick={handleWrap}
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

// ---------------------- Unwrap RON ----------------------

const unwrapExampleCode = `
import { useWriteContract } from 'wagmi'
import { parseUnits } from 'viem'

function App() {
  const { writeContract } = useWriteContract()

  return (
    <button
      onClick={() =>
        writeContract({
          address: '${wRonAddress}',
          abi: [
            {
              "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }],
              "name": "withdraw",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ],
          functionName: 'withdraw',
          args: [parseUnits('${defaultRonAmount}', 18)],
        })
      }
    >
      Unwrap RON
    </button>
  )
}
`

export function UnwrapRon() {
  const { address } = useAccount()
  const toast = useToast()
  const explorerUrl = useChainExplorerUrl()

  const [ronAmount, setRonAmount] = useState(defaultRonAmount)

  const {
    data: txHash,
    isPending,
    writeContractAsync,
  } = useWriteContract()

  const handleUnwrap = async () => {
    try {
      if (!address)
        throw new Error('Please connect your wallet first!')

      const hash = await writeContractAsync({
        address: wRonAddress,
        abi: [
          {
            inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
            name: 'withdraw',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'withdraw',
        args: [parseUnits(ronAmount, 18)],
      })

      toast.success(`Unwrapped ${ronAmount} RON successfully!`, {
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
    catch (err) {
      toast.error('Unwrap RON failed', {
        content: err instanceof Error ? err.message : 'Unknown error',
      })
    }
  }

  return (
    <CodeExample
      code={unwrapExampleCode}
      header={{
        title: 'Unwrap RON',
        description: 'This example demonstrates unwrapping wRON back to native RON.',
      }}
      lang="tsx"
      preview={(
        <div className="flex flex-col gap-16">
          <Input
            shape={Shape.Default}
            label="Amount (wRON)"
            type="number"
            min={0}
            value={ronAmount}
            onChange={e => setRonAmount(e.target.value)}
          />

          <Button
            text="Unwrap RON"
            shape={Shape.Default}
            intent={Intent.Primary}
            disabled={!ronAmount || !address}
            onClick={handleUnwrap}
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
