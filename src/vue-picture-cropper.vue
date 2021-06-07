<template>
  <div
    class="vue--picture-cropper__wrap"
    :style="boxStyle"
  >
    <img
      class="vue--picture-cropper__img"
      :src="img"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

/**
 * 暴露一个实例供组件内操作api
 */
export let cropper: any = null;

/**
 * 定义组件
 */
const VuePictureCropper = defineComponent({
  name: 'VuePictureCropper',
  props: {
    boxStyle: {
      type: Object,
      required: false,
      default: () => ({})
    },
    img: String,
    options: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      cropper: null,
      mimeType: ''
    }
  },
  watch: {
    /**
     * 监听图片变化
     * 实例存在的时候，不允许多次初始化
     */
    img (newVal, oldVal) {

      // 实例不存在时，执行初始化
      if ( !this.cropper ) {
        this.init();
        return false;
      }

      // 实例存在时，只执行数据更新
      try {
        this.cropper.replace(this.img);
        this.getImgSuffix();
      } catch (e) {
        console.log(e);
      }

    }
  },
  beforeUnmount () {

    /**
     * 组件销毁之前，销毁掉实例
     */
    if ( this.cropper ) {
      this.cropper.destroy();
    }

  },
  mounted () {
    this.init();
  },
  methods: {

    /**
     * 初始化实例
     */
    async init () {
      // 必须在视图渲染后再执行
      await this.$nextTick();

      // 执行挂载DOM的检查
      const CHECK: any = setInterval( () => {

        // 获取要挂载的DOM
        const IMG_DOM: any = document.querySelector('.vue--picture-cropper__img');

        // 只有DOM存在时才允许初始化
        if ( IMG_DOM ) {

          // 初始化并挂到Vue上
          try {
            this.cropper = new Cropper(IMG_DOM, this.options);

            // 移除检查
            clearInterval(CHECK);

            // 更新要暴露的实例
            // cropper = this.cropper;
            this.updateInstance();

            // 获取文件后缀
            this.getImgSuffix();

          } catch (e) {
            console.log(e);
          }
        }
      }, 10);
    },

    /**
     * 更新实例和绑定方法
     */
    updateInstance () {
      cropper = this.cropper;
      cropper.getDataURL = this.getDataURL;
      cropper.getBlob = this.getBlob;
    },

    /**
     * 获取图片后缀
     */
    getImgSuffix () {
      const IMG_ARR: string[] = this.img.split(',');
      const IMG_INFO: string = IMG_ARR[0];
      const IMG_MIME_TYPE: string = IMG_INFO.replace(/data:(.*);base64/, '$1');
      this.mimeType = IMG_MIME_TYPE;
    },

    /**
     * 获取base64结果
     */
    getDataURL (options: any = {}) {
      try {
        const RESULT: string = this.cropper.getCroppedCanvas(options).toDataURL(this.mimeType);
        return RESULT;
      } catch(e) {
        return '';
      }
    },

    /**
     * 获取blob结果
     */
    getBlob (options?: any) {
      // 获取base64结果
      const DATA_URL: string = cropper.getDataURL();

      // 提取图片信息
      const IMG_ARR: string[] = DATA_URL.split(',');
      const IMG_CONTENT: string = IMG_ARR[1].substring(0, IMG_ARR[1].length - 2);

      // 进行base64解码
      const A2B: string = (window as any).atob(IMG_CONTENT);
      let n: number = A2B.length;
      const U8_ARR: any = new Uint8Array(n);
      while (n--) {
        U8_ARR[n] = A2B.charCodeAt(n);
      }

      // 返回blob
      return new Blob([U8_ARR], {
        type: this.mimeType
      });
    }

  }
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
