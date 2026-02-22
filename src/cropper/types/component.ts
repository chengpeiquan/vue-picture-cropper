import { type CSSProperties, type ShallowRef } from 'vue'
import { type CropperInstance } from './instance'

/**
 * Preset Modes Supported by Components
 */
export type SupportedPresetMode =
  /**
   * Specifies the size of the cropped result
   */
  | 'fixedSize'

  /**
   * Generate a round cropping result
   */
  | 'round'

/**
 * Preset options for component props
 *
 * @since 0.4.0
 */
export interface PresetModeOptions {
  /**
   * The preset mode to use
   */
  mode?: SupportedPresetMode

  /**
   * The width of the cropped result
   */
  width?: number

  /**
   * The height of the cropped result
   */
  height?: number
}

/**
 * Props type for VuePictureCropper / useCropper
 *
 * Single source of truth for both runtime props and TypeScript types
 */
export interface VuePictureCropperProps {
  /**
   * The source of the image to be cropped
   *
   * The value of the `src` attribute of `<img src="" />`
   */
  img: string

  /**
   * Style Sheet for Crop Box
   */
  boxStyle?: CSSProperties

  /**
   * Options for cropperjs
   *
   * @see https://github.com/fengyuanchen/cropperjs/tree/v1.6.2#options
   */
  options?: CropperInstance.Options

  /**
   * Some preset modes provided by this plugin
   */
  presetMode?: PresetModeOptions
}

/**
 * Exposed APIs in the `ref` of the VuePictureCropper component.
 *
 * Note: `cropper` is implemented as a Ref, but when you read it via the
 * component ref (e.g. `vpcRef.value?.cropper`), Vue's reactive proxy
 * auto-unwraps it, so you get `CropperInstance | null` directly. Do not use
 * `.cropper.value` — use `.cropper` only.
 */
export interface VuePictureCropperRefValue {
  cropper: ShallowRef<CropperInstance | null>
}
