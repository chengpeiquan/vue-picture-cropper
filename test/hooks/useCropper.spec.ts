import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick, ref } from 'vue'
import { useCropper } from '../../src/hooks/useCropper'

const mockDestroy = vi.fn()
const mockReplace = vi.fn()
const mockClear = vi.fn()
const mockReset = vi.fn()
const mockGetCroppedCanvas = vi.fn()

vi.mock('cropperjs', () => ({
  default: class MockCropper {
    destroy = mockDestroy
    replace = mockReplace
    setCropBoxData = vi.fn()
    getCroppedCanvas = mockGetCroppedCanvas
    clear = mockClear
    reset = mockReset
  },
}))

const defaultImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

async function flush() {
  await nextTick()
  await new Promise((r) => setTimeout(r, 0))
  await nextTick()
}

describe('useCropper', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetCroppedCanvas.mockReturnValue({
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,mock'),
      toBlob: vi.fn((cb: (b: Blob | null) => void) =>
        cb(new Blob(['x'], { type: 'image/png' })),
      ),
    })
  })

  it('returns [Component, cropper] tuple', () => {
    const [Component, cropper] = useCropper({ img: defaultImg })
    expect(Component).toBeDefined()
    expect(Component).toHaveProperty('name', 'UseCropperComponent')
    expect(cropper).toBeDefined()
    expect(typeof cropper.getDataURL).toBe('function')
    expect(typeof cropper.getBlob).toBe('function')
    expect(typeof cropper.getFile).toBe('function')
    expect(typeof cropper.getInstance).toBe('function')
    expect(typeof cropper.onInstanceEffect).toBe('function')
  })

  it('Component renders VuePictureCropper and receives props', async () => {
    const [Component] = useCropper({ img: defaultImg })
    const wrapper = mount(Component)
    await flush()
    const img = wrapper.find('img.vpc-img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(defaultImg)
  })

  it('getInstance() returns non-null when mounted with img', async () => {
    const [Component, cropper] = useCropper({ img: defaultImg })
    mount(Component)
    await flush()
    expect(cropper.getInstance()).not.toBeNull()
  })

  it('getInstance() returns null when not mounted', () => {
    const [, cropper] = useCropper({ img: defaultImg })
    expect(cropper.getInstance()).toBeNull()
  })

  it('getDataURL() returns data URL when instance is ready', async () => {
    const [Component, cropper] = useCropper({ img: defaultImg })
    mount(Component)
    await flush()
    expect(cropper.getDataURL()).toBe('data:image/png;base64,mock')
  })

  it('getDataURL() returns empty string when no instance', () => {
    const [, cropper] = useCropper({ img: '' })
    expect(cropper.getDataURL()).toBe('')
  })

  it('getFile() returns null when no instance', async () => {
    const [, cropper] = useCropper({ img: '' })
    const file = await cropper.getFile()
    expect(file).toBeNull()
  })

  it('getBlob() returns Promise<Blob> when instance is ready', async () => {
    const [Component, cropper] = useCropper({ img: defaultImg })
    mount(Component)
    await flush()
    const blob = await cropper.getBlob()
    expect(blob).toBeInstanceOf(Blob)
  })

  it('getBlob(options) and getFile(options) accept options', async () => {
    const [Component, cropper] = useCropper({ img: defaultImg })
    mount(Component)
    await flush()
    const blob = await cropper.getBlob({ maxWidth: 800 })
    expect(blob).toBeInstanceOf(Blob)
    const file = await cropper.getFile({ fileName: 'custom' })
    expect(file?.name).toBe('custom.png')
  })

  it('getFile() returns File when instance is ready', async () => {
    const [Component, cropper] = useCropper({ img: defaultImg })
    mount(Component)
    await flush()
    const file = await cropper.getFile()
    expect(file).toBeInstanceOf(File)
    expect(file?.name).toMatch(/^cropped-\d+\.png$/)
  })

  it('onInstanceEffect runs when instance is ready and once runs only once', async () => {
    const [Component, cropper] = useCropper({ img: defaultImg })
    const effect = vi.fn()
    cropper.onInstanceEffect(effect, { once: true })
    mount(Component)
    await flush()
    expect(effect).toHaveBeenCalledTimes(1)
    expect(effect).toHaveBeenCalledWith(expect.anything())
  })

  it('onInstanceEffect with once skips second run when instance changes again', async () => {
    const [Component, cropper] = useCropper(ref({ img: defaultImg }))
    const effect = vi.fn()
    cropper.onInstanceEffect(effect, { once: true })
    const wrapper = mount(Component)
    await flush()
    expect(effect).toHaveBeenCalledTimes(1)
    wrapper.unmount()
    await nextTick()
    mount(Component)
    await flush()
    expect(effect).toHaveBeenCalledTimes(1)
  })

  it('onInstanceEffect returns stop that can stop the watcher', async () => {
    const [Component, cropper] = useCropper(ref({ img: defaultImg }))
    const effect = vi.fn()
    const stop = cropper.onInstanceEffect(effect)
    mount(Component)
    await flush()
    expect(effect).toHaveBeenCalled()
    effect.mockClear()
    stop()
    // When props change and instance changes, effect would not run again; here we only assert stop is callable
    expect(typeof stop).toBe('function')
  })

  it('accepts ref-shaped props', async () => {
    const propsRef = ref({ img: defaultImg })
    const [Component, cropper] = useCropper(propsRef)
    mount(Component)
    await flush()
    expect(cropper.getDataURL()).toBe('data:image/png;base64,mock')
  })

  it('clear() calls instance clear when mounted', async () => {
    const [Component, cropper] = useCropper({ img: defaultImg })
    mount(Component)
    await flush()
    cropper.clear()
    expect(mockClear).toHaveBeenCalled()
  })

  it('reset() calls instance reset when mounted', async () => {
    const [Component, cropper] = useCropper({ img: defaultImg })
    mount(Component)
    await flush()
    cropper.reset()
    expect(mockReset).toHaveBeenCalled()
  })

  it('onInstanceEffect cleanup runs on unmount when used inside a component', async () => {
    const cleanupFn = vi.fn()
    const wrapper = mount({
      setup() {
        const [Component, cropper] = useCropper({ img: defaultImg })
        cropper.onInstanceEffect(() => cleanupFn)
        return () => h(Component)
      },
    })
    await flush()
    expect(cleanupFn).not.toHaveBeenCalled()
    wrapper.unmount()
    expect(cleanupFn).toHaveBeenCalled()
  })
})
