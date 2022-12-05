import { reactive } from 'vue'
import { getLang } from '../../.vitepress/theme/plugins/locales'

export const demoLocales = reactive({
  /**
   * English
   */
  en: {
    tips: 'Click the button to select the picture first, and it will enter the cutting process.',
    selectPictureButtonText: 'Select Picture',
    previewTips: {
      dataURL: 'A preview of the cropped Base64 image:',
      blob: 'A preview of the cropped blob image:',
      print: 'Press F12 to see the printed base64 / blob / file results.',
    },
    modal: {
      title: 'Picture Cropping',
      btnCancelText: 'Cancel',
      btnClearText: 'Clear',
      btnResetText: 'Reset',
      btnCropText: 'Crop',
    },
    fileName: 'Test file name, optional',
  },
  /**
   * 简体中文
   */
  zh: {
    tips: '请先点击按钮选择图片，会进入裁剪处理环节。',
    selectPictureButtonText: '选择图片',
    previewTips: {
      dataURL: '裁剪后的 Base64 图片预览：',
      blob: '裁剪后的 Blob 图片预览：',
      print: '可以按 F12 查看打印的 base64 / blob / file 结果。',
    },
    modal: {
      title: '图片裁剪',
      btnCancelText: '取消',
      btnClearText: '清除',
      btnResetText: '重置',
      btnCropText: '裁剪',
    },
    fileName: '测试文件名，可不传',
  },
})

export function getLocales() {
  const lang = getLang()
  return demoLocales[lang]
}
