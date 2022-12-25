import { getMimeType, isObject } from '@bassist/utils'
import type { GetImgMIMETypeOptions, PresetModeOptions } from './types'

/**
 * Extract the mime type of the original image
 */
export function getImgMIMEType({
  mode,
  dataURI,
}: GetImgMIMETypeOptions): string {
  return mode === 'round' ? 'image/png' : getMimeType(dataURI)
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
