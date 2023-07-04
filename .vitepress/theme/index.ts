import { inBrowser } from 'vitepress'
import defaultTheme from 'vitepress/theme'
import { createVitePressBaiduAnalytics } from '@web-analytics/vue'
import { changeLocales } from './plugins/locales'
import { isInvalidRoute, redirect } from './plugins/redirect'
import './styles/custom.css'
import type { Theme } from 'vitepress'

const { baiduAnalytics, registerBaiduAnalytics } =
  createVitePressBaiduAnalytics()

const theme: Theme = {
  ...defaultTheme,
  enhanceApp({ app, router }) {
    if (inBrowser) {
      if (isInvalidRoute()) {
        redirect()
      }

      registerBaiduAnalytics(app, {
        websiteIds: [
          '8dca8e2532df48ea7f1b15c714588691', // Main site
          'd6895b6f22616e579e9e6d37936b8dca', // This site
        ],
      })

      window.addEventListener('load', () => {
        changeLocales()
      })

      window.addEventListener('hashchange', () => {
        baiduAnalytics.trackPageview({
          pageUrl: window.location.href,
        })
      })

      router.onAfterRouteChanged = (to) => {
        changeLocales()
        baiduAnalytics.trackPageview({
          pageUrl: to,
        })
      }
    }
  },
}

export default theme
