export const themes = {
  light: 'github-light',
  dark: 'github-dark',
} as const

// Because the rawHtml always contains the pre tag, we need to extract the pre text
// and replace the style color with the shiki variables to support dark mode.
export const normalizeHtml = (rawHtml: string) => {
  try {
    const div = document.createElement('div')
    div.innerHTML = rawHtml
    const result = div.querySelector('code')?.outerHTML ?? rawHtml
    return result.replace(/style="color:/g, 'style="--shiki-light:')
  } catch {
    return rawHtml
  }
}
