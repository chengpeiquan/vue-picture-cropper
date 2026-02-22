import { defineConfig } from 'vitepress'
import { description, head, title } from './modules/seo'
import { locales, themeConfig } from './modules/theme'
import { vite } from './modules/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'contents',
  cleanUrls: true,

  // SEO
  title,
  description,
  head,

  // Theme
  themeConfig,
  locales,

  // Vite
  vite,
})
