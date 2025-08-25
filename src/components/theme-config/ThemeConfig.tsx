import type { TantoWidgetThemeMode } from '@sky-mavis/tanto-widget'
import { Radio } from '@axieinfinity/matcha'
import { useUiConfigStore } from '@/contexts/UiConfigProvider'

export function ThemeConfig() {
  const { theme, setTheme } = useUiConfigStore(state => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }))

  return (
    <Radio.Group
      className="flex items-center gap-16"
      value={theme}
      onChange={e => setTheme(e.target.value as TantoWidgetThemeMode)}
    >
      <Radio value="dark" label="Dark" />
      <Radio value="light" label="Light" />
    </Radio.Group>
  )
}
