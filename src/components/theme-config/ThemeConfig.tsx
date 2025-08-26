import type { TantoWidgetThemeMode } from '@sky-mavis/tanto-widget'
import { Radio } from '@axieinfinity/matcha'
import { ShootingStarIcon, SparkleIcon, StarFourIcon } from '@axieinfinity/matcha-icons'
import Link from 'next/link'
import { ghibliCustomThemeTokens } from '@/configs/themeTokens'
import { useUiConfigStore } from '@/contexts/UiConfigProvider'

export function ThemeConfig() {
  const { theme, setTheme, setCustomThemeTokens } = useUiConfigStore(state => ({
    theme: state.theme,
    setTheme: state.setTheme,
    setCustomThemeTokens: state.setCustomThemeTokens,
  }))

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'custom') {
      setCustomThemeTokens(ghibliCustomThemeTokens)
    }
    else {
      setCustomThemeTokens({})
    }
    setTheme(e.target.value as TantoWidgetThemeMode)
  }

  return (
    <div className="flex flex-col gap-16">
      <Radio.Group
        className="flex items-center gap-16"
        value={theme}
        onChange={handleThemeChange}
      >
        <Radio value="dark" label="Dark" />
        <Radio value="light" label="Light" />
        <Radio value="custom" label="Custom" />
      </Radio.Group>
      <div>
        <SparkleIcon className="inline-block" />
        {' '}
        Style your way with
        {' '}
        <Link
          target="_blank"
          className="underline hover:cursor-pointer"
          href="https://github.com/skymavis/tanto-kit/tree/main/packages/widget#custom-themes"
        >
          CSS variables
        </Link>
        .
      </div>
    </div>
  )
}
