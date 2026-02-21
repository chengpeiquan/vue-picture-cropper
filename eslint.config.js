// @ts-check
import {
  createGetConfigNameFactory,
  defineFlatConfig,
  imports,
  javascript,
  jsx,
  markdown,
  typescript,
  vue,
} from '@bassist/eslint-config'
import { globalIgnores } from 'eslint/config'

const getConfigName = createGetConfigNameFactory('vue-picture-cropper')

export default defineFlatConfig(
  // Rules
  [
    globalIgnores(['**/__test__/**', '**/types/**/*.d.ts', '**/dist/**']),

    ...imports,
    ...javascript,
    ...jsx,
    ...vue,
    ...typescript,
    ...markdown,

    {
      name: getConfigName('override'),
      rules: {
        '@typescript-eslint/no-namespace': 'off',
        'vue/singleline-html-element-content-newline': 'off',
      },
    },

    {
      name: getConfigName('tailwindcss'),
      rules: {
        'tailwindcss/no-custom-classname': [
          'warn',
          {
            whitelist: [
              // Library
              'vpc-root',
              'vpc-img',
              'vpc-round-mode',

              // Documentation
              'text-primary',

              // VitePress
              'lang',
              'copy',
              'shiki',
              'shiki-themes',
              'github-light',
              'github-dark',
              'language-',
            ],
          },
        ],
      },
    },
  ],

  // Options
  {
    tailwindcssSettings: {
      config: 'docs/tailwind.config.ts',
    },
  },
)
