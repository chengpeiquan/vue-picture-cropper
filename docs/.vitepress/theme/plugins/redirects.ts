const redirects = {
  // English
  '/api': '/guide/component-api',
  '/quick-start': '/guide/quick-start',
  '/preset-mode': '/guide/preset-mode',
  '/with-composition-api': '/examples/basic-component',
  '/with-options-api': '/examples/basic-component',
  '/multiple-cropper': '/examples/multiple-component',
  '/preset-mode-fixed-size': '/examples/preset-fixed-size',
  '/preset-mode-round': '/examples/preset-round',

  // 简体中文
  '/zh/api': '/zh/guide/component-api',
  '/zh/quick-start': '/zh/guide/quick-start',
  '/zh/preset-mode': '/zh/guide/preset-mode',
  '/zh/with-composition-api': '/zh/examples/basic-component',
  '/zh/with-options-api': '/zh/examples/basic-component',
  '/zh/multiple-cropper': '/zh/examples/multiple-component',
  '/zh/preset-mode-fixed-size': '/zh/examples/preset-fixed-size',
  '/zh/preset-mode-round': '/zh/examples/preset-round',
} as const satisfies Record<string, string>

export const ensureRedirect = (to: string) => {
  const path = to.replace(/\.html$/i, '')
  const target = redirects[path as keyof typeof redirects]
  return target
}
