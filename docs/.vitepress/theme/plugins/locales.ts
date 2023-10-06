import { inBrowser } from 'vitepress'
import { sidebar } from '../../sidebar'
import type { DefaultTheme } from 'vitepress'

export const locales = <const>['en', 'zh']
export type Locales = (typeof locales)[number]

export function getLang() {
  if (!inBrowser) return 'en'
  const { pathname } = window.location
  const [, langPath] = pathname.split('/')
  return !langPath || langPath.endsWith('.html') ? 'en' : (langPath as Locales)
}

function updateSidebarTitle(
  el: HTMLElement,
  item: DefaultTheme.SidebarGroup | DefaultTheme.SidebarItem,
) {
  if (!el || !item) return
  if (item.text && el.innerText !== item.text) {
    el.innerText = item.text
  }
}

function changeSidebarLocales() {
  if (!inBrowser) return
  const lang = getLang()
  const currentSidebar = sidebar[lang]

  const sidebarGroup = [
    ...document.querySelectorAll('#VPSidebarNav .VPSidebarGroup'),
  ]
  if (!sidebarGroup.length) return
  sidebarGroup.forEach((group, index) => {
    const currentSidebarGroup = currentSidebar[index]

    // Update group title
    const titleElement = group.querySelector(
      '.title .title-text',
    ) as HTMLElement
    updateSidebarTitle(titleElement, currentSidebarGroup)

    // Update link title and `href` attribute
    const sidebarLinks = [...group.querySelectorAll('.items .VPLink')]
    if (!sidebarLinks.length) return
    sidebarLinks.forEach((el, i) => {
      // Update link title
      const linkTitleElement = el.querySelector('.link-text') as HTMLElement
      const linkItem = currentSidebarGroup.items[i]
      if (!linkItem) return
      updateSidebarTitle(linkTitleElement, linkItem)

      // Update link href
      const href = el.getAttribute('href')
      const { link } = linkItem
      if (href !== link) {
        el.setAttribute('href', link)
      }

      // Update active status
      const hrefWithoutExtension = window.location.href.split('.html')[0]
      if (hrefWithoutExtension.endsWith(link)) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
  })
}

function changeTitleLink() {
  if (!inBrowser) return
  const titleElement = document.querySelector('.VPNavBar .VPNavBarTitle .title')
  if (!titleElement) return

  const lang = getLang()
  const rootLink = lang === 'en' ? '/' : '/zh/'
  if (titleElement.getAttribute('href') === rootLink) return
  titleElement.setAttribute('href', rootLink)
}

export function changeLocales() {
  changeSidebarLocales()
  changeTitleLink()
}
