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
import { defineComponent } from 'vue'
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
      required: false
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
      cropper: null
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
  methods: {

    /** 
     * 初始化实例
     */
    async init () {
      // 必须在视图渲染后再执行
      await this.$nextTick();

      // 获取要挂载的DOM
      const IMG_DOM: any = document.querySelector('.vue--picture-cropper__img');

      // 初始化并挂到Vue上
      try {
        this.cropper = new Cropper(IMG_DOM, this.options);
      } catch (e) {
        console.log(e);
      }

      // 更新要暴露的实例
      cropper = this.cropper;
    }

  }
})

export default VuePictureCropper
</script>

<style>
.vue--picture-cropper__img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>