import { Input, Shape } from '@axieinfinity/matcha'
import { useUiConfigStore } from '@/contexts/UiConfigProvider'

export function ButtonConfig() {
  const { buttonLabel, setButtonLabel } = useUiConfigStore(state => ({
    buttonLabel: state.buttonLabel,
    setButtonLabel: state.setButtonLabel,
  }))

  return (
    <Input
      label="Button Label"
      shape={Shape.Default}
      value={buttonLabel}
      onChange={e => setButtonLabel(e.target.value)}
    />
  )
}
