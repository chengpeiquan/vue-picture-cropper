<template>
  <div
    :id="`vpc-wrap-${randomId}`"
    class="vue--picture-cropper__wrap"
    :class="{ 'vue--picture-cropper__wrap-round': presetMode.mode === 'round' }"
    :style="boxStyle"
  >
    <img
      class="vue--picture-cropper__img"
      :src="img"
      :id="`vpc-img-${randomId}`"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import getRandomString from './libs/getRandomString'

/**
 * 暴露一个实例供组件内操作 API
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let cropper: any = null

/**
 * 定义组件
 */
const VuePictureCropper = defineComponent({
  name: 'VuePictureCropper',
  props: {
    // 裁剪框样式
    boxStyle: {
      type: Object,
      required: false,
      default: () => ({}),
    },

    // 要裁切的图片src
    img: String,

    // 裁剪选项
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },

    // 预设模式
    presetMode: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      cropper: null,
      mimeType: '',
      randomId: '',
    }
  },
  watch: {
    /**
     * 监听图片变化
     * 实例存在的时候，不允许多次初始化
     */
    img(): void {
      // 实例不存在时，执行初始化
      if (!this.cropper) {
        this.init()
        return
      }

      // 实例存在时，只执行数据更新
      try {
        this.cropper.replace(this.img)
        this.getImgSuffix()
        this.updateInstance()
      } catch (e) {
        console.log(e)
      }
    },
  },
  beforeUnmount() {
    /**
     * 组件销毁之前，销毁掉实例
     */
    if (this.cropper) {
      this.cropper.destroy()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 初始化实例
     */
    async init(): Promise<void> {
      // 必须在视图渲染后再执行
      await this.$nextTick()

      // 生成随机ID
      this.randomId = getRandomString(10)

      // 执行挂载DOM的检查
      const check: number = window.setInterval(() => {
        // 获取要挂载的DOM
        const imgElement: HTMLImageElement = this.randomId
          ? document.querySelector(`#vpc-img-${this.randomId}`)
          : document.querySelector('.vue--picture-cropper__img')

        // 只有DOM存在时才允许初始化
        if (imgElement) {
          // 初始化并挂到Vue上
          try {
            this.cropper = new Cropper(imgElement, this.options)

            // 移除检查
            window.clearInterval(check)

            // 更新要暴露的实例
            this.updateInstance()

            // 获取文件后缀
            this.getImgSuffix()

            // 检查是否需要启动预设模式
            imgElement.addEventListener('ready', () => {
              this.usePresetMode()
            })
          } catch (e) {
            console.log(e)
          }
        }
      }, 10)
    },

    /**
     * 使用预设模式
     */
    usePresetMode() {
      if (Object.prototype.toString.call(this.presetMode) !== '[object Object]')
        return

      const { mode, width, height } = this.presetMode
      switch (mode) {
        // 固定尺寸和圆形
        case 'fixedSize':
        case 'round': {
          this.cropper.setCropBoxData({
            width,
            height,
          })
          break
        }
      }
    },

    /**
     * 更新实例和绑定方法
     */
    updateInstance(): void {
      cropper = this.cropper
      cropper.getDataURL = this.getDataURL
      cropper.getBlob = this.getBlob
      cropper.getFile = this.getFile
    },

    /**
     * 更新结果选项
     */
    updateResultOptions(options: { [key: string]: unknown } = {}): {
      [key: string]: unknown
    } {
      if (Object.prototype.toString.call(this.presetMode) !== '[object Object]')
        return

      const { mode, width, height } = this.presetMode
      switch (mode) {
        // 固定尺寸和圆形，按照裁切框的大小返回宽高
        case 'fixedSize':
        case 'round': {
          options.width = width
          options.height = height
          break
        }
      }

      return options
    },

    /**
     * 获取图片后缀
     */
    getImgSuffix(): void {
      // 圆形模式只处理为png
      if (this.presetMode.mode === 'round') {
        this.mimeType = 'image/png'
      }
      // 其他按照原图片的类型处理
      else {
        const imgArr: string[] = this.img.split(',')
        const imgInfo: string = imgArr[0]
        const imgMimeType: string = imgInfo.replace(/data:(.*);base64/, '$1')
        this.mimeType = imgMimeType
      }
    },

    /**
     * 获取base64结果
     */
    getDataURL(options: { [key: string]: unknown } = {}): string {
      options = this.updateResultOptions(options)
      try {
        let croppedCanvas = this.cropper.getCroppedCanvas(options)
        if (this.presetMode.mode === 'round') {
          croppedCanvas = this.getRoundedCanvas(croppedCanvas)
        }

        const result: string = croppedCanvas.toDataURL(this.mimeType)
        return result
      } catch (e) {
        return ''
      }
    },

    /**
     * 获取blob结果
     */
    async getBlob(
      options: { [key: string]: unknown } = {}
    ): Promise<Blob | null> {
      options = this.updateResultOptions(options)
      return new Promise((resolve) => {
        try {
          let croppedCanvas = this.cropper.getCroppedCanvas(options)
          if (this.presetMode.mode === 'round') {
            croppedCanvas = this.getRoundedCanvas(croppedCanvas)
          }

          croppedCanvas.toBlob((blob: Blob) => {
            resolve(blob)
          }, this.mimeType)
        } catch (e) {
          resolve(null)
        }
      })
    },

    /**
     * 获取file结果
     */
    async getFile(options: { [key: string]: unknown } = {}): Promise<File> {
      return new Promise((resolve) => {
        ;(async () => {
          // 获取文件名
          const { fileName: optFileName } = options
          const suffix: string = this.mimeType.replace(/image\//, '')
          const fileName: string = optFileName
            ? `${optFileName}.${suffix}`
            : `cropped-${Date.now()}.${suffix}`

          // 获取文件信息
          const blob: Blob = await this.getBlob(options)

          // 生成文件并返回
          const file: File = new File([blob], fileName, {
            type: this.mimeType,
          })
          resolve(file)
        })()
      })
    },

    /**
     * 获取圆形画布
     * @description 取自作者的一个演示方案
     * @see https://fengyuanchen.github.io/cropperjs/examples/crop-a-round-image.html
     */
    getRoundedCanvas(sourceCanvas: HTMLCanvasElement) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
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
    },
  },
})

export default VuePictureCropper
</script>

<style>
.vue--picture-cropper__wrap {
  width: 100%;
  height: 100%;
  margin: 0;
}
.vue--picture-cropper__img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.vue--picture-cropper__wrap-round .cropper-view-box,
.vue--picture-cropper__wrap-round .cropper-face {
  border-radius: 50%;
}
</style>
