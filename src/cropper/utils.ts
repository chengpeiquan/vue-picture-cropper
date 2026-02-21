import type { PresetModeOptions, SupportedPresetMode } from './types'

export const isObject = (value: unknown): value is Record<string, any> => {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
}

/**
 * Image MIME types only (for picture cropper).
 *
 * Referenced from https://github.com/broofa/mime/blob/main/types/standard.ts
 */
const mimeTypeMapping = {
  'image/aces': ['exr'],
  'image/apng': ['apng'],
  'image/avci': ['avci'],
  'image/avcs': ['avcs'],
  'image/avif': ['avif'],
  'image/bmp': ['bmp', 'dib'],
  'image/cgm': ['cgm'],
  'image/dicom-rle': ['drle'],
  'image/dpx': ['dpx'],
  'image/emf': ['emf'],
  'image/fits': ['fits'],
  'image/g3fax': ['g3'],
  'image/gif': ['gif'],
  'image/heic': ['heic'],
  'image/heic-sequence': ['heics'],
  'image/heif': ['heif'],
  'image/heif-sequence': ['heifs'],
  'image/hej2k': ['hej2'],
  'image/ief': ['ief'],
  'image/jaii': ['jaii'],
  'image/jais': ['jais'],
  'image/jls': ['jls'],
  'image/jp2': ['jp2', 'jpg2'],
  'image/jpeg': ['jpg', 'jpeg', 'jpe'],
  'image/jph': ['jph'],
  'image/jphc': ['jhc'],
  'image/jpm': ['jpm', 'jpgm'],
  'image/jpx': ['jpx', 'jpf'],
  'image/jxl': ['jxl'],
  'image/jxr': ['jxr'],
  'image/jxra': ['jxra'],
  'image/jxrs': ['jxrs'],
  'image/jxs': ['jxs'],
  'image/jxsc': ['jxsc'],
  'image/jxsi': ['jxsi'],
  'image/jxss': ['jxss'],
  'image/ktx': ['ktx'],
  'image/ktx2': ['ktx2'],
  'image/pjpeg': ['jfif'],
  'image/png': ['png'],
  'image/sgi': ['sgi'],
  'image/svg+xml': ['svg', 'svgz'],
  'image/t38': ['t38'],
  'image/tiff': ['tif', 'tiff'],
  'image/tiff-fx': ['tfx'],
  'image/webp': ['webp'],
  'image/wmf': ['wmf'],
} as const satisfies Readonly<{ [key: string]: string[] }>

/**
 * Extension -> mime type, built from mimeTypeMapping
 */
const extensionToMime = (() => {
  const map: Record<string, string> = {}
  for (const [mimeType, exts] of Object.entries(mimeTypeMapping)) {
    for (const ext of exts) {
      const key = ext.startsWith('*') ? ext.slice(1) : ext
      if (!(key in map)) {
        map[key] = mimeType
      }
    }
  }
  return map
})()

const DEFAULT_MIME_TYPE = 'image/png'

export const getMimeType = (path: string): string => {
  try {
    if (path.startsWith('data') && path.includes('base64')) {
      const match = path.split(',')[0].match(/data:(.*);base64/)
      return match ? match[1].trim() : DEFAULT_MIME_TYPE
    }

    if (path.startsWith('blob:')) {
      return DEFAULT_MIME_TYPE
    }

    const base = path.split('?')[0]
    const ext = base.split('.').pop()?.toLowerCase() ?? ''
    return extensionToMime[ext] ?? DEFAULT_MIME_TYPE
  } catch {
    return DEFAULT_MIME_TYPE
  }
}

/**
 * Options to get image mime type
 */
export interface GetImgMIMETypeOptions {
  mode: SupportedPresetMode | undefined
  dataURI: string
}

/**
 * Extract the mime type of the original image
 */
export const getImgMIMEType = ({ mode, dataURI }: GetImgMIMETypeOptions) => {
  return mode === 'round' ? DEFAULT_MIME_TYPE : getMimeType(dataURI)
}

/**
 * Generate a circular canvas
 *
 * Excerpted from the Cropperjs author's demo
 *
 * @see https://fengyuanchen.github.io/cropperjs/v1/examples/crop-a-round-image.html
 */
export const getRoundedCanvas = (sourceCanvas: HTMLCanvasElement) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return canvas

  const { width, height } = sourceCanvas
  canvas.width = width
  canvas.height = height
  context.imageSmoothingEnabled = true
  context.drawImage(sourceCanvas, 0, 0, width, height)
  context.globalCompositeOperation = 'destination-in'
  context.beginPath()
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true,
  )
  context.fill()

  return canvas
}

/**
 * Apply preset mode (e.g. fixedSize, round) to getCroppedCanvas options. When
 * preset is active, overrides width/height so output matches crop box size.
 *
 * @param presetMode - Props.presetMode
 * @param options - Options for getCroppedCanvas()
 */
export const applyPresetModeToCanvasOptions = (
  presetMode: PresetModeOptions,
  options: Cropper.GetCroppedCanvasOptions = {},
): Cropper.GetCroppedCanvasOptions => {
  if (!isObject(presetMode)) {
    return options
  }

  const { mode, width, height } = presetMode
  switch (mode) {
    // Keep the same size as the crop box
    case 'fixedSize':
    case 'round': {
      options.width = width
      options.height = height
      break
    }
  }

  return options
}
