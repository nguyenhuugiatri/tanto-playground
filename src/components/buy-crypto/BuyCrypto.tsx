import { Button, Dropdown, Input, Intent, Shape } from '@axieinfinity/matcha'
import { createDeposit } from '@sky-mavis/tanto-widget'
import { useState } from 'react'

import { useAccount } from 'wagmi'
import { SUPPORTED_CRYPTOCURRENCIES, SUPPORTED_FIAT_CURRENCIES } from '@/configs/constants'
import { useToast } from '@/hooks/useToast'
import { CodeExample } from '../code/code-example'

const defaultToAddress = '0x17Ff618150517D784d92af8D54Bb38c9f7B2F6d4'
const defaultCryptoCurrency = SUPPORTED_CRYPTOCURRENCIES[0].value
const defaultFiatCurrency = SUPPORTED_FIAT_CURRENCIES[0].value
const defaultAmount = '100'

const exampleCode = `
import { createDeposit } from '@sky-mavis/tanto-widget'

function App() {
  const deposit = createDeposit()

  return (
    <button
      onClick={() =>
        deposit.start({
          walletAddress: '${defaultToAddress}',
          cryptoCurrency: '${defaultCryptoCurrency}',
          fiatCurrency: '${defaultFiatCurrency}',
          fiatAmount: ${defaultAmount},
        })}
    >
      Buy crypto
    </button>
  )
}
`

export function BuyCrypto() {
  const toast = useToast()
  const { address } = useAccount()
  const [cryptoCurrency, setCryptoCurrency] = useState(SUPPORTED_CRYPTOCURRENCIES[0])
  const [fiatCurrency, setFiatCurrency] = useState(SUPPORTED_FIAT_CURRENCIES[0])
  const [fiatAmount, setFiatAmount] = useState<string>(defaultAmount)

  const deposit = createDeposit()

  const handleTransferRon = async () => {
    try {
      await deposit.start({
        walletAddress: address,
        cryptoCurrency: cryptoCurrency.value,
        fiatCurrency: fiatCurrency.value,
        fiatAmount: Number(fiatAmount),
      })

      toast.success(
        `Buy successfully`,
        {
          content: `Bought ${cryptoCurrency.label} for ${fiatAmount} ${fiatCurrency.label}`,
        },
      )
    }
    catch {}
  }

  return (
    <CodeExample
      code={exampleCode}
      header={{
        title: 'Buy Crypto',
        description: 'A function that allows users to buy crypto using fiat currencies via different payment methods.',
      }}
      lang="tsx"
      preview={(
        <div className="flex flex-col gap-16">
          <Dropdown
            label="Select Crypto Currency"
            shape={Shape.Default}
            selectedOption={cryptoCurrency}
            onChange={(e) => {
              const { value } = e.option
              const selectedCryptoCurrency = SUPPORTED_CRYPTOCURRENCIES.find(
                cryptoCurrency => cryptoCurrency.value === value,
              )
              if (!selectedCryptoCurrency)
                return
              setCryptoCurrency(selectedCryptoCurrency)
            }}
          >
            {SUPPORTED_CRYPTOCURRENCIES.map(({ key, value, label }) => {
              return (
                <Dropdown.Item
                  key={key}
                  data={{ key, value, label }}
                >
                  {label}
                </Dropdown.Item>
              )
            })}
          </Dropdown>

          <Dropdown
            menuClassName="[&>ul]:max-h-[405px] [&>ul]:overflow-y-scroll"
            label="Select Fiat Currency"
            shape={Shape.Default}
            selectedOption={fiatCurrency}
            onChange={(e) => {
              const { value } = e.option
              const selectedFiatCurrency = SUPPORTED_FIAT_CURRENCIES.find(
                fiatCurrency => fiatCurrency.value === value,
              )
              if (!selectedFiatCurrency)
                return
              setFiatCurrency(selectedFiatCurrency)
            }}
          >
            {SUPPORTED_FIAT_CURRENCIES.map(({ key, value, label }) => {
              return (
                <Dropdown.Item
                  key={key}
                  data={{ key, value, label }}
                >
                  {label}
                </Dropdown.Item>
              )
            })}
          </Dropdown>

          <Input
            shape={Shape.Default}
            label={`Amount (${fiatCurrency.label})`}
            type="number"
            min={0}
            max={999999999}
            value={fiatAmount}
            onChange={e => setFiatAmount(e.target.value)}
          />

          <Button
            text="Buy crypto"
            intent={Intent.Primary}
            shape={Shape.Default}
            onClick={handleTransferRon}
          />
        </div>
      )}
    />
  )
}
