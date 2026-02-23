import { type UserConfig } from 'vitepress'

export const vite: UserConfig['vite'] = {
  define: {
    __VUE_PROD_DEVTOOLS__: false,
  },
  server: {
    port: 5050,
  },
}
