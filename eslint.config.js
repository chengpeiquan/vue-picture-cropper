// @ts-check
import { defineConfig, prettier, typescript } from '@bassist/eslint'

export default defineConfig([
  ...prettier,
  ...typescript,
  {
    rules: {
      '@typescript-eslint/no-namespace': 'off',
    },
    ignores: ['dist', 'lib'],
  },
])
