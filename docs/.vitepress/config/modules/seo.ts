import { type HeadConfig } from 'vitepress'
import { getBrandName, pkg } from '../../../shared/pkg-data'

export const title = getBrandName()

export const description = pkg.description

export const head: HeadConfig[] = [
  [
    'link',
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
  [
    'meta',
    {
      name: 'keywords',
      content: [pkg.name, pkg.keywords.join(',')].join(','),
    },
  ],
]
