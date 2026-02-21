import { capitalize } from '@bassist/utils'
import pkg from '../../package.json' with { type: 'json' }

export { pkg }

export const getBrandName = () => {
  return pkg.name.split('-').map(capitalize).join(' ')
}
