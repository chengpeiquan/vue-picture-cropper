<template>
  <div class="vue--picture-cropper__wrap" :style="boxStyle">
    <img class="vue--picture-cropper__img" :src="img" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Base64 } from 'js-base64'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

/**
 * 暴露一个实例供组件内操作api
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let cropper: any = null

/**
 * 定义组件
 */
const VuePictureCropper = defineComponent({
  name: 'VuePictureCropper',
  props: {
    boxStyle: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    img: String,
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      cropper: null,
      mimeType: '',
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

      // 执行挂载DOM的检查
      const check: number = window.setInterval(() => {
        // 获取要挂载的DOM
        const imgElement: HTMLImageElement = document.querySelector(
          '.vue--picture-cropper__img'
        )

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
          } catch (e) {
            console.log(e)
          }
        }
      }, 10)
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
     * 获取图片后缀
     */
    getImgSuffix(): void {
      const imgArr: string[] = this.img.split(',')
      const imgInfo: string = imgArr[0]
      const imgMimeType: string = imgInfo.replace(/data:(.*);base64/, '$1')
      this.mimeType = imgMimeType
    },

    /**
     * 获取base64结果
     */
    getDataURL(options: { [key: string]: unknown } = {}): string {
      try {
        const result: string = this.cropper
          .getCroppedCanvas(options)
          .toDataURL(this.mimeType)
        return result
      } catch (e) {
        return ''
      }
    },

    /**
     * 获取blob结果
     */
    getBlob(options: { [key: string]: unknown } = {}): Blob | null {
      // 获取base64结果
      const dataURL: string = this.getDataURL(options)
      if (!dataURL) {
        return null
      }

      // 提取图片信息
      const imgArr: string[] = dataURL.split(',')
      const imgContent: string = imgArr[1].substring(0, imgArr[1].length - 2)
      const u8Arr: Uint8Array = Base64.toUint8Array(imgContent)

      // 返回blob
      return new Blob([u8Arr], {
        type: this.mimeType,
      })
    },

    /**
     * 获取file结果
     */
    getFile(options: { [key: string]: unknown } = {}): File {
      // 获取文件名
      const { fileName: optFileName } = options
      const suffix: string = this.mimeType.replace(/image\//, '')
      const fileName: string = optFileName
        ? `${optFileName}.${suffix}`
        : `cropped-${Date.now()}.${suffix}`

      // 获取文件信息
      const blob: Blob = this.getBlob(options)

      // 生成文件并返回
      const file: File = new File([blob], fileName, {
        type: this.mimeType,
      })
      return file
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
</style>
