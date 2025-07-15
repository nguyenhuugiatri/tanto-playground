import type { Config } from 'tailwindcss'
import tailwindScrollbar from 'tailwind-scrollbar'
import tailwindcssAnimate from 'tailwindcss-animate'
import { fontFamily } from 'tailwindcss/defaultTheme'

function toMatchaToken(token: string): string {
  return `var(--mc-${token})`
}

function generatePreset(
  from: number,
  to: number,
  cb: (i: number) => string,
): Record<number, string> {
  return Object.fromEntries(
    Array.from({ length: to - from + 1 }, (_, i) => [i + from, cb(i + from)]),
  )
}

const MATCHA_COLORS = {
  black: {
    'DEFAULT': toMatchaToken('color-black'),
    'opacity-60': toMatchaToken('color-black-opacity-60'),
    'opacity-70': toMatchaToken('color-black-opacity-70'),
    ...generatePreset(1, 10, i => toMatchaToken(`color-black-${i}`)),
  },
  white: {
    'DEFAULT': toMatchaToken('color-white'),
    'opacity-7': toMatchaToken('color-white-opacity-7'),
    'opacity-10': toMatchaToken('color-white-opacity-10'),
    'opacity-30': toMatchaToken('color-white-opacity-30'),
    'opacity-70': toMatchaToken('color-white-opacity-70'),
    'opacity-75': toMatchaToken('color-white-opacity-75'),
    ...generatePreset(1, 9, i => toMatchaToken(`color-white-${i}`)),
  },
  blue: generatePreset(0, 9, i => toMatchaToken(`color-blue-${i}`)),
  cyan: generatePreset(0, 4, i => toMatchaToken(`color-cyan-${i}`)),
  green: generatePreset(0, 9, i => toMatchaToken(`color-green-${i}`)),
  orange: generatePreset(0, 6, i => toMatchaToken(`color-orange-${i}`)),
  pink: generatePreset(0, 4, i => toMatchaToken(`color-pink-${i}`)),
  purple: generatePreset(0, 4, i => toMatchaToken(`color-purple-${i}`)),
  red: generatePreset(1, 9, i => toMatchaToken(`color-red-${i}`)),
  yellow: generatePreset(0, 10, i => toMatchaToken(`color-yellow-${i}`)),
}

const MATCHA_TOKENS = Object.fromEntries(
  [
    'text-disabled',
    'text-critical',
    'text-secondary-plain',
    'text-secondary',
    'text-primary',
    'text-highlight',
    'text-success',
    'text-warning',
    'text-subdued',
    'text-default',
    'border-highlight-subdued',
    'border-highlight',
    'border-success-subdued',
    'border-success',
    'border-warning-subdued',
    'border-warning',
    'border-critical-subdued',
    'border-critical',
    'border-critical-pressing',
    'border-critical-hover',
    'border-critical-disabled',
    'border-default-subdued',
    'border-default',
    'border-outline-disabled',
    'border-outline-pressing',
    'border-outline-hover',
    'border-outline-default',
    'border-secondary-disabled',
    'border-secondary-pressing',
    'border-secondary-hover',
    'border-secondary-default',
    'border-secondary-critical',
    'surface-skeleton',
    'surface-highlight-subdued',
    'surface-highlight',
    'surface-success-subdued',
    'surface-success',
    'surface-success-opacity',
    'surface-warning-subdued',
    'surface-warning',
    'surface-warning-opacity',
    'surface-critical-subdued',
    'surface-critical-default',
    'surface-critical',
    'surface-critical-opacity',
    'surface-critical-disabled',
    'surface-critical-pressing',
    'surface-critical-hover',
    'surface-default-subdued',
    'surface-default',
    'surface-default-pressing',
    'surface-default-hover',
    'surface-neutral-opacity',
    'surface-neutral',
    'surface-neutral-subdued',
    'surface-secondary-disabled',
    'surface-secondary-pressing',
    'surface-secondary-hover',
    'surface-secondary-default',
    'surface-primary-disabled',
    'surface-primary-pressing',
    'surface-primary-hover',
    'surface-primary-default',
    'surface-accent-disabled',
    'surface-accent-pressing',
    'surface-accent-hover',
    'surface-accent-default',
    'background-default',
    'background-overlay',
    'black-opacity',
    'white-opacity',
  ].map(token => [token, toMatchaToken(token)]),
)

const LINK_AND_ICON_TOKENS = Object.fromEntries(
  [
    'link-mono-disabled',
    'link-mono-pressing',
    'link-mono-hover',
    'link-mono-subdued',
    'link-mono-default',
    'link-blue-disabled',
    'link-blue-pressing',
    'link-blue-hover',
    'link-blue-default',
    'icon-mono-disabled',
    'icon-mono-pressing',
    'icon-mono-hover',
    'icon-mono-subdued',
    'icon-mono-default',
    'icon-color-blue-disabled',
    'icon-color-blue-pressing',
    'icon-color-blue-hover',
    'icon-color-blue-default',
  ].map(token => [token, toMatchaToken(token)]),
)

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:not(.light, .light *) }',
      '&:is(.dark, .dark *)',
    ],
  ],
  theme: {
    container: {
      center: true,
      padding: '24px',
    },
    fontFamily: {
      sans: ['var(--font-work-sans)', ...fontFamily.sans],
      serif: fontFamily.serif,
      mono: fontFamily.mono,
    },
    spacing: generatePreset(0, 100, i => `${i}px`),
    lineHeight: generatePreset(0, 100, i => `${i}px`),
    extend: {
      colors: {
        ...MATCHA_COLORS,
        ...MATCHA_TOKENS,
        ...LINK_AND_ICON_TOKENS,
      },
      borderRadius: {
        none: '0px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        32: '32px',
        circle: '50%',
      },
      fontSize: {
        'h1': ['56px', { lineHeight: '64px', fontWeight: '600' }],
        'h2': ['42px', { lineHeight: '52px', fontWeight: '600' }],
        'h3': ['32px', { lineHeight: '36px', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '30px', fontWeight: '600' }],
        'h5': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h6': ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'label-m': ['13px', { lineHeight: '16px', fontWeight: '600' }],
        'label-s': ['11px', { lineHeight: '14px', fontWeight: '500' }],
        'body-m': ['16px', { lineHeight: '22px', fontWeight: '400' }],
        'body-m-strong': ['16px', { lineHeight: '22px', fontWeight: '500' }],
        'body-s': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-s-strong': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'body-xs': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindScrollbar],
}

export default config
