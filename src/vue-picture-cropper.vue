<template>
  <div class="vue--picture-cropper__wrap" :style="boxStyle">
    <img class="vue--picture-cropper__img" :src="img" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

/**
 * 暴露一个实例供组件内操作api
 */
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
    img(newVal, oldVal) {
      // 实例不存在时，执行初始化
      if (!this.cropper) {
        this.init()
        return false
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
    async init() {
      // 必须在视图渲染后再执行
      await this.$nextTick()

      // 执行挂载DOM的检查
      const check: any = setInterval(() => {
        // 获取要挂载的DOM
        const imgDOM: any = document.querySelector('.vue--picture-cropper__img')

        // 只有DOM存在时才允许初始化
        if (imgDOM) {
          // 初始化并挂到Vue上
          try {
            this.cropper = new Cropper(imgDOM, this.options)

            // 移除检查
            clearInterval(check)

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
    updateInstance() {
      cropper = this.cropper
      cropper.getDataURL = this.getDataURL
      cropper.getBlob = this.getBlob
    },

    /**
     * 获取图片后缀
     */
    getImgSuffix() {
      const imgArr: string[] = this.img.split(',')
      const imgInfo: string = imgArr[0]
      const imgMimeType: string = imgInfo.replace(/data:(.*);base64/, '$1')
      this.mimeType = imgMimeType
    },

    /**
     * 获取base64结果
     */
    getDataURL(options: any = {}) {
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
    getBlob(options?: any) {
      // 获取base64结果
      const dataUrl: string = cropper.getDataURL()
      if (!dataUrl) {
        return null
      }

      // 提取图片信息
      const imgArr: string[] = dataUrl.split(',')
      const imgContent: string = imgArr[1].substring(0, imgArr[1].length - 2)

      // 进行base64解码
      const a2b: string = (window as any).atob(imgContent)
      let n: number = a2b.length
      const u8Arr: any = new Uint8Array(n)
      while (n--) {
        u8Arr[n] = a2b.charCodeAt(n)
      }

      // 返回blob
      return new Blob([u8Arr], {
        type: this.mimeType,
      })
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
