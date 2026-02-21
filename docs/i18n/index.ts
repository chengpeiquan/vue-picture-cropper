import { isBrowser } from '@bassist/utils'
import { createI18n } from 'vue-i18n'
import en from './messages/en'
import zh from './messages/zh'
import { type SupportedLocale } from './types'

export * from './types'

const defaultLocale = 'en' satisfies SupportedLocale

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLocale,
  messages: {
    en,
    zh,
  },
})

export const updateLocaleByPath = (to: string) => {
  if (!isBrowser) return
  const lang = to.split('/')[1] || defaultLocale
  i18n.global.locale.value = lang as SupportedLocale
}

export const withLocaleBase = (path: string) => {
  if (!isBrowser || !path) return ''
  const lang = i18n.global.locale.value as SupportedLocale
  const prefix = lang === defaultLocale ? '' : `/${lang}`
  const separator = path.startsWith('/') ? '' : '/'
  return `${prefix}${separator}${path}`
}
