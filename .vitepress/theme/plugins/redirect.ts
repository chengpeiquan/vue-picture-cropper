import { inBrowser } from 'vitepress'

export const redirectMap = {
  // update: 'upgrade',
}

export function getRouteName() {
  if (!inBrowser) return ''
  const { pathname } = window.location
  const routeName = pathname.slice(1).replace('.html', '')
  return routeName
}

export function isInvalidRoute() {
  if (!inBrowser) return false
  const routeName = getRouteName()
  const keys = Object.keys(redirectMap)
  return keys.includes(routeName)
}

export function redirectTarget() {
  if (!inBrowser) return '/'
  const routeName = getRouteName()
  return `/${redirectMap[routeName]}.html` || '/'
}

export function redirect() {
  if (!inBrowser) return
  window.location.replace(redirectTarget())
}
