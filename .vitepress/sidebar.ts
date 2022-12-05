import type { DefaultTheme } from 'vitepress'
import type { Locales } from './theme/plugins/locales'

export const sidebar: Record<Locales, DefaultTheme.Sidebar> = {
  /**
   * English
   */
  en: [
    {
      text: 'Getting Started',
      items: [
        { text: 'Quick Start', link: '/quick-start' },
        { text: 'API Reference', link: '/api' },
        { text: 'Preset Mode', link: '/preset-mode' },
      ],
    },
    {
      text: 'Live Demos',
      items: [
        { text: 'With Composition API', link: '/with-composition-api' },
        { text: 'With Options API', link: '/with-options-api' },
        { text: 'Multiple Cropper', link: '/multiple-cropper' },
        { text: 'Preset Mode: Fixed Size', link: '/preset-mode-fixed-size' },
        { text: 'Preset Mode: Round', link: '/preset-mode-round' },
      ],
    },
  ],
  /**
   * 简体中文
   */
  zh: [
    {
      text: '开始',
      items: [
        { text: '快速上手', link: '/zh/quick-start' },
        { text: 'API 参考', link: '/zh/api' },
        { text: '预设模式', link: '/zh/preset-mode' },
      ],
    },
    {
      text: '在线演示',
      items: [
        { text: '使用组合式 API', link: '/zh/with-composition-api' },
        { text: '使用选项式 API', link: '/zh/with-options-api' },
        { text: '多个裁剪框', link: '/zh/multiple-cropper' },
        { text: '预设模式：固定尺寸', link: '/zh/preset-mode-fixed-size' },
        { text: '预设模式：圆形', link: '/zh/preset-mode-round' },
      ],
    },
  ],
}
