import { isBrowser } from '@bassist/utils'
import Aura from '@primeuix/themes/aura'
import { createVitePressBaiduAnalytics } from '@web-analytics/vue'
import PrimeVue from 'primevue/config'
import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { i18n, updateLocaleByPath } from '../../i18n'
import { ensureRedirect } from './plugins/redirects'
import '../styles/tailwind.css'
import '../styles/vitepress.css'
import '../styles/override.css'

// Ensure vue-i18n install completes in SSR (VitePress build)
if (typeof globalThis !== 'undefined') {
  ;(globalThis as Record<string, unknown>).__VUE_PROD_DEVTOOLS__ = false
}

const { baiduAnalytics, registerBaiduAnalytics } =
  createVitePressBaiduAnalytics()

// https://vitepress.dev/guide/custom-theme
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router }) {
    app.use(i18n)
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
    })

    if (isBrowser) {
      registerBaiduAnalytics(app, {
        websiteIds: [
          '8dca8e2532df48ea7f1b15c714588691', // Main site
          'd6895b6f22616e579e9e6d37936b8dca', // This site
        ],
      })

      window.addEventListener('hashchange', () => {
        baiduAnalytics.trackPageview({
          pageUrl: window.location.href,
        })
      })

      router.onBeforeRouteChange = (to: string) => {
        const target = ensureRedirect(to)
        if (target) {
          setTimeout(() => router.go(target))
          return false
        } else {
          return true
        }
      }

      router.onAfterRouteChange = (to) => {
        updateLocaleByPath(to)

        baiduAnalytics.trackPageview({
          pageUrl: to,
        })
      }
    }
  },
} satisfies Theme
