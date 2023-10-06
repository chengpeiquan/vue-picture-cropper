import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitepress'
import banner from 'vite-plugin-banner'
import { head } from './head'
import { nav } from './nav'
import { sidebar } from './sidebar'
import pkg from '../../package.json'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '../../dist')

export default defineConfig({
  outDir,
  lang: 'zh-CN',
  title: pkg.name,
  description: pkg.description,
  head,
  markdown: {
    lineNumbers: false,
  },
  // https://github.com/vuejs/vitepress/pull/1339
  locales: {
    root: {
      lang: 'en',
      label: 'English',
    },
    zh: {
      lang: 'zh-CN',
      label: '简体中文',
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    nav,
    sidebar: sidebar.en,
    outlineTitle: 'Navigation',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/chengpeiquan/vue-picture-cropper',
      },
    ],
    localeLinks: {
      text: 'Language',
      items: [
        {
          text: 'English',
          link: '/',
        },
        {
          text: '简体中文',
          link: '/zh/',
        },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2020-PRESENT chengpeiquan',
    },
  },
  vite: {
    server: {
      port: 5050,
    },
    plugins: [
      banner({
        content: [
          `/**`,
          ` * name: ${pkg.name}`,
          ` * version: v${pkg.version}`,
          ` * description: ${pkg.description}`,
          ` * author: ${pkg.author}`,
          ` * homepage: ${pkg.homepage}`,
          ` * license: ${pkg.license}`,
          ` */`,
        ].join('\n'),
        outDir,
      }),
    ],
  },
})
