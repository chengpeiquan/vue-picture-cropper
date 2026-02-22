import Typography from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
import Animate from 'tailwindcss-animate'
import PrimeUI from 'tailwindcss-primeui'

export default {
  darkMode: 'selector',
  content: [
    './.vitepress/theme/**/*.{js,ts,jsx,tsx,vue}',
    './contents/**/*.{js,ts,jsx,tsx,vue,md}',
    './components/**/*.{js,ts,jsx,tsx,vue}',
    './examples/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {},
  plugins: [Typography(), Animate, PrimeUI],
} satisfies Config
