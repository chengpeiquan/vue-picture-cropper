import { getBrandName } from '../../shared/pkg-data'
import { type MessageStructure } from '../types'

export default {
  home: {
    name: getBrandName(),
    description: '一个简单易用的 Vue 3 图片裁剪组件。',
    start: '快速上手',
  },
  examples: {
    liveDemo: '在线演示',
    sourceCode: '源代码',
    codeFragmentTitle: '{name} 的核心代码',
    choose: '选择文件',
    reset: '重置',
    cropArea: '裁剪区域',
    previewArea: '预览区域',
    viewSourceInfo:
      '若想查看示例使用的本地组件和 hooks ，可访问 {filename} 了解相关上下文。',
    size: '尺寸',
    width: '宽',
    height: '高',
    cropperInstance: 'Cropper 实例',
  },
} satisfies MessageStructure
