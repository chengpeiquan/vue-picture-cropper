import { getBundleBanner } from '@bassist/build-config/tsup'
import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  entry: {
    index: './src/index.ts',
  },
  platform: 'browser',
  exports: true,
  fixedExtension: true,
  banner: getBundleBanner(pkg),
  minify: true,
  dts: {
    vue: true,
  },
  css: {
    splitting: false,
  },
  plugins: [
    Vue({
      isProduction: true,
    }),
  ],
})
