import { describe, expect, it } from 'vitest'
import VuePictureCropper, {
  type VuePictureCropperProps,
  useCropper,
} from '../src/index'

describe('package entry (src/index.ts)', () => {
  it('exports default VuePictureCropper component', () => {
    expect(VuePictureCropper).toBeDefined()
    expect(VuePictureCropper.name).toBe('VuePictureCropper')
  })

  it('exports useCropper hook', () => {
    expect(typeof useCropper).toBe('function')
  })

  it('exports VuePictureCropperProps type', () => {
    const props: VuePictureCropperProps = { img: 'data:image/png;base64,' }
    expect(props.img).toBeDefined()
  })
})
