import { describe, expect, it, vi } from 'vitest'
import {
  applyPresetModeToCanvasOptions,
  getImgMIMEType,
  getMimeType,
  getRoundedCanvas,
  isObject,
} from '../../src/cropper/utils'

describe('isObject', () => {
  it('returns true for plain object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('returns false for null', () => {
    expect(isObject(null)).toBe(false)
  })

  it('returns false for array', () => {
    expect(isObject([])).toBe(false)
  })

  it('returns false for primitives', () => {
    expect(isObject(1)).toBe(false)
    expect(isObject('')).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
})

describe('getMimeType', () => {
  it('extracts mime type from data URI', () => {
    expect(
      getMimeType(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      ),
    ).toBe('image/png')
    expect(getMimeType('data:image/jpeg;base64,/9j/4AAQ')).toBe('image/jpeg')
    expect(getMimeType('data:image/webp;base64,UklGRg')).toBe('image/webp')
  })

  it('returns default when data URI has no valid mime match (branch coverage)', () => {
    expect(getMimeType('data:invalid,base64content')).toBe('image/png')
  })

  it('returns image/png for blob URL', () => {
    expect(getMimeType('blob:http://localhost/abc-123')).toBe('image/png')
  })

  it('returns mime type from file extension', () => {
    expect(getMimeType('/path/to/image.jpg')).toBe('image/jpeg')
    expect(getMimeType('photo.png')).toBe('image/png')
    expect(getMimeType('file.gif')).toBe('image/gif')
    expect(getMimeType('img.webp')).toBe('image/webp')
  })

  it('ignores query string when using extension', () => {
    expect(getMimeType('https://example.com/photo.jpg?size=large')).toBe(
      'image/jpeg',
    )
  })

  it('returns image/png as default for unknown extension', () => {
    expect(getMimeType('file.xyz')).toBe('image/png')
  })

  it('returns image/png when parsing throws (catch branch)', () => {
    expect(getMimeType(null as unknown as string)).toBe('image/png')
  })
})

describe('getImgMIMEType', () => {
  it('returns getMimeType result when mode is not round', () => {
    expect(
      getImgMIMEType({
        mode: undefined,
        dataURI: 'data:image/jpeg;base64,abc',
      }),
    ).toBe('image/jpeg')
    expect(
      getImgMIMEType({
        mode: 'fixedSize',
        dataURI: 'https://example.com/a.png',
      }),
    ).toBe('image/png')
  })

  it('returns image/png when mode is round', () => {
    expect(
      getImgMIMEType({
        mode: 'round',
        dataURI: 'data:image/jpeg;base64,abc',
      }),
    ).toBe('image/png')
  })
})

describe('getRoundedCanvas', () => {
  it('returns a new canvas with same dimensions', () => {
    const source = document.createElement('canvas')
    source.width = 100
    source.height = 100
    const mockCtx = {
      imageSmoothingEnabled: false,
      globalCompositeOperation: '',
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      drawImage: vi.fn(),
    }
    // getRoundedCanvas creates a new canvas via document.createElement; mock getContext for it
    const originalCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName: string) => {
        const el = originalCreateElement(tagName) as HTMLCanvasElement
        if (tagName === 'canvas' && el !== source) {
          vi.spyOn(el, 'getContext').mockReturnValue(
            mockCtx as unknown as ReturnType<
              HTMLCanvasElement['getContext']
            > as never,
          )
        }
        return el
      },
    )

    const result = getRoundedCanvas(source)
    expect(result).toBeInstanceOf(HTMLCanvasElement)
    expect(result.width).toBe(100)
    expect(result.height).toBe(100)
    expect(mockCtx.drawImage).toHaveBeenCalledWith(source, 0, 0, 100, 100)
    expect(mockCtx.arc).toHaveBeenCalledWith(50, 50, 50, 0, 2 * Math.PI, true)
  })

  it('returns canvas when getContext returns null (mock env)', () => {
    const source = document.createElement('canvas')
    source.width = 10
    source.height = 10
    const getContextSpy = vi.spyOn(source, 'getContext').mockReturnValue(null)
    const result = getRoundedCanvas(source)
    expect(result).toBeInstanceOf(HTMLCanvasElement)
    getContextSpy.mockRestore()
  })
})

describe('applyPresetModeToCanvasOptions', () => {
  it('returns original options when presetMode is not an object', () => {
    const options = { maxWidth: 800 }
    expect(applyPresetModeToCanvasOptions(undefined as any, options)).toBe(
      options,
    )
    expect(applyPresetModeToCanvasOptions(null as any, options)).toBe(options)
  })

  it('sets width/height for fixedSize mode', () => {
    const options = {}
    const result = applyPresetModeToCanvasOptions(
      { mode: 'fixedSize', width: 200, height: 200 },
      options,
    )
    expect(result.width).toBe(200)
    expect(result.height).toBe(200)
  })

  it('sets width/height for round mode', () => {
    const options = { fillColor: '#fff' }
    const result = applyPresetModeToCanvasOptions(
      { mode: 'round', width: 100, height: 100 },
      options,
    )
    expect(result.width).toBe(100)
    expect(result.height).toBe(100)
    expect(result.fillColor).toBe('#fff')
  })

  it('does not override when mode is undefined or other', () => {
    const options = { maxWidth: 500 }
    expect(
      applyPresetModeToCanvasOptions(
        { mode: undefined, width: 1, height: 1 },
        options,
      ),
    ).toBe(options)
    expect(applyPresetModeToCanvasOptions({} as any, options)).toBe(options)
  })
})
