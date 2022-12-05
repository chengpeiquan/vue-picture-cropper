import { reactive } from 'vue'
import { getLang } from '../../.vitepress/theme/plugins/locales'

export const homeLocales = reactive({
  /**
   * English
   */
  en: {
    name: 'vue-picture-cropper',
    description:
      'A simple and easy-to-use picture cropping component for Vue 3.',
    action: {
      text: 'Get Started',
      link: '/quick-start',
    },
  },
  /**
   * 简体中文
   */
  zh: {
    name: 'vue-picture-cropper',
    description: '一个简单易用的 Vue 3 图片裁剪组件。',
    action: {
      text: '快速上手',
      link: '/zh/quick-start',
    },
  },
})

export function getLocales() {
  const lang = getLang()
  return homeLocales[lang]
}
