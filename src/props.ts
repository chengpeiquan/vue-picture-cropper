import type { PropType } from 'vue'
import type { PresetModeOptions } from './types'

/**
 * Props for Vue Component
 */
export const props = {
  /**
   * The source of the image to be cropped
   * @description The value of the `src` attribute of `<img src="" />`
   */
  img: {
    type: String,
    required: true,
    default: '',
  },

  /**
   * Style Sheet for Crop Box
   */
  boxStyle: {
    type: Object,
    required: false,
    default: () => ({}),
  },

  /**
   * Options for cropperjs
   * @see https://github.com/fengyuanchen/cropperjs#options
   */
  options: {
    type: Object,
    required: false,
    default: () => ({}),
  },

  /**
   * Some preset modes provided by this plugin
   */
  presetMode: {
    type: Object as PropType<PresetModeOptions>,
    required: false,
    default: () => ({}),
  },
}
