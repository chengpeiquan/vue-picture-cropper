import { type UserConfig } from 'vitepress'
import { pkg } from '../../../shared/pkg-data'

// https://vitepress.dev/reference/default-theme-config
export const themeConfig: UserConfig['themeConfig'] = {
  logo: '/logo.svg',

  socialLinks: [
    {
      icon: 'github',
      link: pkg.repository.url,
    },
  ],

  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2020-PRESENT chengpeiquan',
  },
}

type LocaleConfig = NonNullable<UserConfig['locales']>['root']

/**
 * English
 */
const root = {
  label: 'English',
  lang: 'en-US',
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Design Concept', link: '/guide/design' },
          ],
        },
        {
          text: 'API Reference',
          items: [
            { text: 'Component API', link: '/guide/component-api' },
            { text: 'Hook API', link: '/guide/hook-api' },
            { text: 'Preset Mode', link: '/guide/preset-mode' },
          ],
        },
        {
          text: 'Migration',
          items: [{ text: 'Migration from v0.x', link: '/guide/migration' }],
        },
      ],

      '/examples/': [
        {
          text: 'Basic Usage',
          items: [
            {
              text: 'Using VuePictureCropper',
              link: '/examples/basic-component',
            },
            { text: 'Using useCropper', link: '/examples/basic-hook' },
          ],
        },
        {
          text: 'Multiple Cropper',
          items: [
            {
              text: 'Using VuePictureCropper',
              link: '/examples/multiple-component',
            },
            { text: 'Using useCropper', link: '/examples/multiple-hook' },
          ],
        },
        {
          text: 'Preset Mode',
          items: [
            { text: 'Fixed Size', link: '/examples/preset-fixed-size' },
            { text: 'Round', link: '/examples/preset-round' },
          ],
        },
      ],
    },

    nav: [
      {
        text: 'Guide',
        link: '/guide/quick-start',
      },
      {
        text: 'Examples',
        link: '/examples/basic-component',
      },
      {
        text: 'Resources',
        items: [
          {
            text: 'Cropper.js API',
            link: 'https://github.com/fengyuanchen/cropperjs/tree/v1.6.2',
          },
          {
            text: 'Learning Vue3',
            link: 'https://github.com/chengpeiquan/learning-vue3',
          },
        ],
      },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: 'Release Notes',
            link: `${pkg.repository.url}/releases`,
          },
          {
            text: 'Legacy Versions',
            items: [
              {
                text: 'v0.7.0 Docs',
                link: `${pkg.repository.url}/tree/v0.7.0/docs`,
              },
            ],
          },
        ],
      },
    ],
  },
} as const satisfies LocaleConfig

/**
 * 简体中文
 */
const zh = {
  label: '简体中文',
  lang: 'zh-CN',
  link: '/zh/',
  themeConfig: {
    sidebar: {
      '/zh/guide/': [
        {
          text: '开始',
          items: [
            { text: '快速上手', link: '/zh/guide/quick-start' },
            { text: '设计理念', link: '/zh/guide/design' },
          ],
        },
        {
          text: 'API 参考',
          items: [
            { text: '组件 API', link: '/zh/guide/component-api' },
            { text: '组合式函数 API', link: '/zh/guide/hook-api' },
            { text: '预设模式', link: '/zh/guide/preset-mode' },
          ],
        },
        {
          text: '迁移',
          items: [{ text: '从 v0.x 迁移', link: '/zh/guide/migration' }],
        },
      ],

      '/zh/examples/': [
        {
          text: '基础用法',
          items: [
            {
              text: '使用 VuePictureCropper',
              link: '/zh/examples/basic-component',
            },
            { text: '使用 useCropper', link: '/zh/examples/basic-hook' },
          ],
        },
        {
          text: '多个裁剪框',
          items: [
            {
              text: '使用 VuePictureCropper',
              link: '/zh/examples/multiple-component',
            },
            { text: '使用 useCropper', link: '/zh/examples/multiple-hook' },
          ],
        },
        {
          text: '预设模式',
          items: [
            { text: '固定尺寸', link: '/zh/examples/preset-fixed-size' },
            { text: '圆形', link: '/zh/examples/preset-round' },
          ],
        },
      ],
    },

    nav: [
      {
        text: '指南',
        link: '/zh/guide/quick-start',
      },
      {
        text: '示例',
        link: '/zh/examples/basic-component',
      },
      {
        text: '相关链接',
        items: [
          {
            text: 'Cropper.js API',
            link: 'https://github.com/fengyuanchen/cropperjs/tree/v1.6.2',
          },
          {
            text: '工程化与 Vue3 入门',
            link: 'https://vue3.chengpeiquan.com',
          },
        ],
      },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: '发行记录',
            link: `${pkg.repository.url}/releases`,
          },
          {
            text: '旧版本',
            items: [
              {
                text: 'v0.7.0 文档',
                link: `${pkg.repository.url}/tree/v0.7.0/docs`,
              },
            ],
          },
        ],
      },
    ],
  },
} as const satisfies LocaleConfig

export const locales: UserConfig['locales'] = {
  root,
  zh,
}
