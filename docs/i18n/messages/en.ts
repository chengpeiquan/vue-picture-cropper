import { getBrandName } from '../../shared/pkg-data'
import { type MessageStructure } from '../types'

export default {
  home: {
    name: getBrandName(),
    description:
      'A simple and easy-to-use picture cropping component for Vue 3.',
    start: 'Get Started',
  },
  examples: {
    liveDemo: 'Live Demo',
    sourceCode: 'Source Code',
    codeFragmentTitle: 'The core code of {name}',
    choose: 'Choose File',
    reset: 'Reset',
    cropArea: 'Crop Area',
    previewArea: 'Preview Area',
    viewSourceInfo:
      'To view the local components and hooks used in this demo, visit {filename} to see their context.',
    size: 'Size',
    width: 'Width',
    height: 'Height',
    cropperInstance: 'Cropper Instance',
    openModal: 'Open Modal',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
} satisfies MessageStructure
