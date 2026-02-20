import { type Cropper } from './library'

/**
 * The Cropper instance provided with the component
 *
 * Use CropperInstance as the unified entry for all cropper types:
 *
 * - CropperInstance (interface) - the instance type
 * - CropperInstance.Options - constructor/component options
 * - CropperInstance.Data - getData() return type
 * - CropperInstance.GetCroppedCanvasOptions - getDataURL/getBlob/getFile options
 */
export interface CropperInstance extends Cropper {
  /**
   * The image element passed to Cropper. Events (crop, ready, zoom, etc.) are
   * dispatched on this element. This component only uses img, not canvas.
   */
  readonly element: HTMLImageElement

  /**
   * Options object for this instance (image element only).
   */
  options: Cropper.Options<HTMLImageElement>

  /**
   * Get the cropped Base64 result
   */
  getDataURL: (options?: Cropper.GetCroppedCanvasOptions) => string

  /**
   * Get the cropped blob result
   */
  getBlob: (options?: Cropper.GetCroppedCanvasOptions) => Promise<Blob | null>

  /**
   * Get the cropped file result
   */
  getFile: (
    options?: Cropper.GetCroppedCanvasOptions & { fileName?: string },
  ) => Promise<File | null>
}

/**
 * Re-export cropper types under CropperInstance for unified API
 */
export namespace CropperInstance {
  export type Options = Cropper.Options
  export type Data = Cropper.Data
  export type GetCroppedCanvasOptions = Cropper.GetCroppedCanvasOptions
  export type SetDataOptions = Cropper.SetDataOptions
  export type SetCropBoxDataOptions = Cropper.SetCropBoxDataOptions
}
