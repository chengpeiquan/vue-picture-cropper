import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import type { PluginOption } from 'vite'

export default defineConfig({
  plugins: [vue() as PluginOption],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['test/**/*.{spec,test}.{ts,js}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,vue}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/types/**',
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
      ],
    },
  },
})
