import type { SocialProvider } from '@sky-mavis/tanto-widget/types/social'
import { Checkbox } from '@axieinfinity/matcha'
import { SOCIAL_PROVIDERS } from '@sky-mavis/tanto-widget/types/social'
import { useUiConfigStore } from '@/contexts/UiConfigProvider'
import { capitalize } from '@/utils/string'

export function SocialConfig() {
  const { excludedSocialProviders, setExcludedSocialProviders } = useUiConfigStore(state => ({
    excludedSocialProviders: state.excludedSocialProviders,
    setExcludedSocialProviders: state.setExcludedSocialProviders,
  }))

  const handleCheckboxChange = (social: SocialProvider, checked: boolean) => {
    setExcludedSocialProviders
    (
      checked
        ? excludedSocialProviders
            .filter(id => id !== social)
        : Array.from(new Set([...excludedSocialProviders, social])),
    )
  }

  const socials = Object.entries(SOCIAL_PROVIDERS).map(([id, provider]) => ({
    name: id as SocialProvider,
    label: capitalize(id),
    icon: provider.icon,
  }))

  return (
    <div className="flex flex-col gap-16">
      {socials.map(social => (
        <Checkbox
          key={social.name}
          className="items-center gap-4"
          label={(
            <div className="flex items-center gap-8">
              <div className="size-32 overflow-hidden rounded-8 [&>div>div>svg]:size-14 [&_*]:size-32">
                <social.icon />
              </div>
              <p>{social.label}</p>
            </div>
          )}
          checked={!excludedSocialProviders
            .includes(social.name)}
          onChange={e => handleCheckboxChange(social.name, e.target.checked)}
        />
      ))}
    </div>
  )
}
