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
import {
  defineComponent,
  onMounted,
  ref,
  nextTick,
  onBeforeUnmount,
  watch
} from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export const cropper = ref<any>(null);

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
  setup (props) {
    const cropperImg = ref<any>(null);
    setTimeout(() => {
      console.log(props);
      
    }, 5000);

    
    /** 
     * 初始化插件
     * 必须等待视图渲染完毕后再执行
     */
    const initCropper = (): void => {
      nextTick( () => {
        // 初始化实例
        // cropper.value = new Cropper(cropperImg.value, props.options);
        const IMG_DOM: any = document.querySelector('.vue--picture-cropper__img');
        cropper.value = new Cropper(IMG_DOM, props.options);

        // 暴露一个实例，用于在父级组件操作实例的方法
        // VuePictureCropper.cropper = cropper.value;
      });
    };


    /** 
     * 监听图片来源的变化
     */
    watch( () => props.img, () => {
      console.log('watch props.img');
      
      // cropper.value.destroy();
      // initCropper();
    });


    /** 
     * 执行初始化
     */
    // onMounted( () => {
    //   initCropper();
    // });
    nextTick( () => {
      initCropper();
    });


    /** 
     * 组件销毁前记得把插件也销毁
     */
    // onBeforeUnmount( () => {
    //   cropper.value.destroy();
    // });
    

    /** 
     * 定义模板并渲染
     */
    return {
      // 数据
      cropperImg,

      // 方法
      initCropper
    }
  }
})

export default VuePictureCropper
</script>

<style scoped>

</style>