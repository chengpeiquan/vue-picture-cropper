import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import VuePictureCropper from '../../src/cropper/index.vue'

async function flush() {
  await nextTick()
  await new Promise((r) => setTimeout(r, 0))
  await nextTick()
}

const mockDestroy = vi.fn()
const mockReplace = vi.fn()
const mockSetCropBoxData = vi.fn()
const mockGetCroppedCanvas = vi.fn()

vi.mock('cropperjs', () => ({
  default: class MockCropper {
    destroy = mockDestroy
    replace = mockReplace
    setCropBoxData = mockSetCropBoxData
    getCroppedCanvas = mockGetCroppedCanvas
    constructor() {
      if (
        typeof globalThis !== 'undefined' &&
        (globalThis as { __cropperThrow?: boolean }).__cropperThrow
      ) {
        throw new Error('mock init error')
      }
    }
  },
}))

describe('VuePictureCropper', () => {
  const defaultImg =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

  beforeEach(() => {
    vi.clearAllMocks()
    mockGetCroppedCanvas.mockReturnValue({
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,mock'),
      toBlob: vi.fn((cb: (b: Blob | null) => void) =>
        cb(new Blob(['x'], { type: 'image/png' })),
      ),
    })
  })

  it('renders root and img and applies boxStyle', async () => {
    const boxStyle = { width: '400px', height: '300px' }
    const wrapper = mount(VuePictureCropper, {
      props: { img: defaultImg, boxStyle },
    })
    await nextTick()

    const root = wrapper.find('.vpc-root')
    expect(root.exists()).toBe(true)
    expect(root.attributes('style')).toContain('width')
    const img = wrapper.find('.vpc-img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(defaultImg)
  })

  it('adds vpc-round-mode class when presetMode is round', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: {
        img: defaultImg,
        presetMode: { mode: 'round', width: 100, height: 100 },
      },
    })
    await nextTick()
    expect(wrapper.find('.vpc-root').classes()).toContain('vpc-round-mode')
  })

  it('exposes cropper via ref, and instance is null when img is empty', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: { img: '' },
    })
    await nextTick()
    const ref = wrapper.vm as unknown as { cropper: { value: unknown } }
    expect(ref.cropper?.value ?? null).toBeNull()
  })

  it('getDataURL returns empty string when instance is null', async () => {
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    const exposed = wrapper.vm as unknown as { cropper: unknown }
    const inst =
      (
        exposed.cropper as {
          value?: { getDataURL?: () => string }
          getDataURL?: () => string
        }
      )?.value ?? (exposed.cropper as { getDataURL?: () => string })
    const getDataURLFn = inst?.getDataURL
    await wrapper.setProps({ img: '' } as never)
    await nextTick()
    expect(getDataURLFn?.()).toBe('')
  })

  it('initializes Cropper and exposes instance when img is set', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: { img: defaultImg },
    })
    await nextTick()
    const ref = wrapper.vm as unknown as { cropper: { value: unknown } }
    expect(ref.cropper?.value).not.toBeNull()
  })

  it('getDataURL is callable and returns toDataURL result when instance exists', async () => {
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    // Component exposes { cropper: shallowRef }; proxy may auto-unwrap, try .cropper first
    const exposed = wrapper.vm as unknown as { cropper: unknown }
    const maybeInstance = exposed.cropper as {
      value?: { getDataURL?: () => string }
      getDataURL?: () => string
    }
    const getDataURL =
      maybeInstance?.getDataURL ??
      (maybeInstance?.value as { getDataURL?: () => string } | undefined)
        ?.getDataURL
    expect(typeof getDataURL).toBe('function')
    expect(getDataURL?.()).toBe('data:image/png;base64,mock')
  })

  it('getDataURL runs getRoundedCanvas path when presetMode is round', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: {
        img: defaultImg,
        presetMode: { mode: 'round', width: 100, height: 100 },
      },
    })
    await flush()
    const exposed = wrapper.vm as unknown as { cropper: unknown }
    const inst =
      (
        exposed.cropper as {
          value?: { getDataURL?: () => string }
          getDataURL?: () => string
        }
      )?.value ?? (exposed.cropper as { getDataURL?: () => string })
    const dataURL = inst?.getDataURL?.()
    expect(typeof dataURL).toBe('string')
  })

  it('getDataURL returns empty string when getCroppedCanvas throws', async () => {
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    mockGetCroppedCanvas.mockImplementationOnce(() => {
      throw new Error('canvas error')
    })
    const exposed = wrapper.vm as unknown as { cropper: unknown }
    const inst =
      (
        exposed.cropper as {
          value?: { getDataURL?: () => string }
          getDataURL?: () => string
        }
      )?.value ?? (exposed.cropper as { getDataURL?: () => string })
    expect(inst?.getDataURL?.()).toBe('')
  })

  it('getBlob returns null when instance was destroyed', async () => {
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    const exposed = wrapper.vm as unknown as { cropper: unknown }
    const inst =
      (
        exposed.cropper as {
          value?: { getBlob?: () => Promise<Blob | null> }
          getBlob?: () => Promise<Blob | null>
        }
      )?.value ?? (exposed.cropper as { getBlob?: () => Promise<Blob | null> })
    const getBlobFn = inst?.getBlob
    await wrapper.setProps({ img: '' } as never)
    await nextTick()
    const blob = await getBlobFn?.()
    expect(blob).toBeNull()
  })

  it('getBlob runs getRoundedCanvas path when presetMode is round', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: {
        img: defaultImg,
        presetMode: { mode: 'round', width: 100, height: 100 },
      },
    })
    await flush()
    const exposed = wrapper.vm as unknown as {
      cropper: {
        value?: { getBlob?: () => Promise<Blob | null> }
        getBlob?: () => Promise<Blob | null>
      }
    }
    const getBlob = exposed.cropper?.getBlob ?? exposed.cropper?.value?.getBlob
    const blob = await getBlob?.()
    expect(blob === null || blob instanceof Blob).toBe(true)
  })

  it('getBlob returns null when toBlob throws', async () => {
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    mockGetCroppedCanvas.mockReturnValue({
      toDataURL: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      toBlob: vi.fn((_cb: (b: Blob | null) => void) => {
        throw new Error('blob error')
      }),
    })
    const exposed = wrapper.vm as unknown as { cropper: unknown }
    const inst =
      (
        exposed.cropper as {
          value?: { getBlob?: () => Promise<Blob | null> }
          getBlob?: () => Promise<Blob | null>
        }
      )?.value ?? (exposed.cropper as { getBlob?: () => Promise<Blob | null> })
    const blob = await inst?.getBlob?.()
    expect(blob).toBeNull()
  })

  it('getBlob is callable and returns Blob when instance exists', async () => {
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    const exposed = wrapper.vm as unknown as {
      cropper: {
        value?: { getBlob?: () => Promise<Blob | null> }
        getBlob?: () => Promise<Blob | null>
      }
    }
    const getBlob = exposed.cropper?.getBlob ?? exposed.cropper?.value?.getBlob
    expect(typeof getBlob).toBe('function')
    const blob = await getBlob?.()
    expect(blob).toBeInstanceOf(Blob)
  })

  it('getFile is callable and returns File when instance exists', async () => {
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    const exposed = wrapper.vm as unknown as {
      cropper: {
        value?: {
          getFile?: (o?: { fileName?: string }) => Promise<File | null>
        }
        getFile?: (o?: { fileName?: string }) => Promise<File | null>
      }
    }
    const getFile = exposed.cropper?.getFile ?? exposed.cropper?.value?.getFile
    expect(typeof getFile).toBe('function')
    const file = await getFile?.()
    expect(file).toBeInstanceOf(File)
    expect(file?.name).toMatch(/^cropped-\d+\.png$/)
  })

  it('getFile returns null when getBlob returns null', async () => {
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    mockGetCroppedCanvas.mockReturnValue({
      toDataURL: vi.fn(),
      toBlob: vi.fn((cb: (b: Blob | null) => void) => cb(null)),
    })
    const exposed = wrapper.vm as unknown as {
      cropper: {
        value?: {
          getFile?: (o?: { fileName?: string }) => Promise<File | null>
        }
        getFile?: (o?: { fileName?: string }) => Promise<File | null>
      }
    }
    const getFile = exposed.cropper?.getFile ?? exposed.cropper?.value?.getFile
    const file = await getFile?.()
    expect(file).toBeNull()
  })

  it('getFile uses custom fileName when passed', async () => {
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    const exposed = wrapper.vm as unknown as {
      cropper: {
        value?: {
          getFile?: (o?: { fileName?: string }) => Promise<File | null>
        }
        getFile?: (o?: { fileName?: string }) => Promise<File | null>
      }
    }
    const getFile = exposed.cropper?.getFile ?? exposed.cropper?.value?.getFile
    const file = await getFile?.({ fileName: 'my-crop' })
    expect(file?.name).toBe('my-crop.png')
  })

  it('destroys Cropper instance when img becomes empty', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: { img: defaultImg },
    })
    await nextTick()
    expect(mockDestroy).not.toHaveBeenCalled()
    await wrapper.setProps({ img: '' } as never)
    await nextTick()
    expect(mockDestroy).toHaveBeenCalled()
  })

  it('calls replace when img changes and instance already exists', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: { img: defaultImg },
    })
    await nextTick()
    const newImg = 'data:image/jpeg;base64,/9j/4AAQ'
    await wrapper.setProps({ img: newImg } as never)
    await nextTick()
    expect(mockReplace).toHaveBeenCalledWith(newImg)
  })

  it('destroys instance on unmount', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: { img: defaultImg },
    })
    await nextTick()
    wrapper.unmount()
    expect(mockDestroy).toHaveBeenCalled()
  })

  it('applyPresetMode does not call setCropBoxData when mode is not fixedSize or round', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: {
        img: defaultImg,
        presetMode: { mode: undefined, width: 100, height: 100 },
      },
    })
    await flush()
    wrapper.find('.vpc-img').element.dispatchEvent(new Event('ready'))
    await nextTick()
    expect(mockSetCropBoxData).not.toHaveBeenCalled()
  })

  it('calls setCropBoxData when ready fires with presetMode fixedSize', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: {
        img: defaultImg,
        presetMode: { mode: 'fixedSize', width: 200, height: 200 },
      },
    })
    await flush()
    const img = wrapper.find('.vpc-img').element
    img.dispatchEvent(new Event('ready'))
    await nextTick()
    expect(mockSetCropBoxData).toHaveBeenCalledWith({ width: 200, height: 200 })
  })

  it('calls setCropBoxData when ready fires with presetMode round', async () => {
    const wrapper = mount(VuePictureCropper, {
      props: {
        img: defaultImg,
        presetMode: { mode: 'round', width: 100, height: 100 },
      },
    })
    await flush()
    wrapper.find('.vpc-img').element.dispatchEvent(new Event('ready'))
    await nextTick()
    expect(mockSetCropBoxData).toHaveBeenCalledWith({ width: 100, height: 100 })
  })

  it('catches init error and logs to console.error', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const g = globalThis as { __cropperThrow?: boolean }
    g.__cropperThrow = true
    mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    expect(errSpy).toHaveBeenCalled()
    g.__cropperThrow = false
    errSpy.mockRestore()
  })

  it('catches replace error in watch and logs to console.error', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const wrapper = mount(VuePictureCropper, { props: { img: defaultImg } })
    await flush()
    mockReplace.mockImplementationOnce(() => {
      throw new Error('replace error')
    })
    await wrapper.setProps({ img: 'data:image/jpeg;base64,/9j/4AAQ' } as never)
    await nextTick()
    expect(errSpy).toHaveBeenCalled()
    errSpy.mockRestore()
  })
})
