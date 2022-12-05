import type { GetImgMIMETypeOptions, PresetModeOptions } from './types'

/**
 * Check if a variable is an object
 */
export function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * Generate a random string
 * @param length - The length of the string to be returned
 * @return A random string
 */
export function randomString(length: number = 10) {
  // https://github.com/ai/nanoid
  const dict =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
  let str = ''
  let i = length
  const len = dict.length
  while (i--) str += dict[(Math.random() * len) | 0]
  return str
}

/**
 * Renders the component stylesheet inline
 * @description No need to import CSS files separately
 * @param id - Unique ID to prevent duplicate DOM creation
 * @param css - Stylesheet code of Component
 */
export function injectStyle(id: string, css: string) {
  if (!css || typeof document === 'undefined') return
  const el = document.querySelector(id)
  if (el) return
  const head = document.head || document.querySelector('head')
  const style = document.createElement('style')
  style.id = id
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}

/**
 * Extract the mime type of the original image
 */
export function getImgMIMEType({
  mode,
  dataURI,
}: GetImgMIMETypeOptions): string {
  if (mode === 'round') return 'image/png'
  const uriFragments = dataURI.split(',')
  const info = uriFragments[0]
  const mimeType = info.replace(/data:(.*);base64/, '$1')
  return mimeType
}

/**
 * Generate a circular canvas
 * @description Excerpted from the Cropperjs author's demo
 * @see https://fengyuanchen.github.io/cropperjs/examples/crop-a-round-image.html
 */
export function getRoundedCanvas(sourceCanvas: HTMLCanvasElement) {
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
    true
  )
  context.fill()

  return canvas
}

/**
 * If using preset mode, some options need to be adjusted
 * @param presetMode - props.presetMode
 * @param options - Options for getting cropped result
 */
export function updateResultOptions(
  presetMode: PresetModeOptions,
  options: Record<string, any> = {}
): Record<string, any> {
  if (!isObject(presetMode)) return options

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
