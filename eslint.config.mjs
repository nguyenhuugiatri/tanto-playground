import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  formatters: true,
  react: true,
}, ...compat.config({
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'react-refresh/only-export-components': 'off',
  },
}))
