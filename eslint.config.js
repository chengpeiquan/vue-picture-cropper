// @ts-check
import {
  createGetConfigNameFactory,
  defineFlatConfig,
  javascript,
  jsx,
  typescript,
  vue,
} from '@bassist/eslint-config'

const getConfigName = createGetConfigNameFactory('vue-picture-cropper')

export default defineFlatConfig(
  [
    ...javascript,
    ...jsx,
    ...vue,
    ...typescript,
    {
      name: getConfigName('override'),
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
      ignores: ['dist', 'lib'],
    },
  ],
  { tailwindcssEnabled: false },
)
