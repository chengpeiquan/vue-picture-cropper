# vue-picture-cropper

一个基于cropper.js，支持Vue 3.0的图片裁切工具组件（目前仅支持Vue 3.x）。

## Install

`npm install --save-dev vue-picture-cropper`

## Import

在vue组件里引入，然后在组件里使用模板：

```html
<script lang="ts">
import { defineComponent } from 'vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

export default defineComponent({
  components: {
    VuePictureCropper
  },
  // …
})
</script>
```

其中 `VuePictureCropper` 组件模板，`{ cropper }` 是方便我们操作api的实例。

如果不导出实例，则需要通过 `VuePictureCropper.cropper` 才能操作，会比较繁琐。

## Used

template部分：

```html
<template>
  <VuePictureCropper
    :boxStyle="{
      width: '360px',
      height: '360px',
      backgroundColor: '#f8f8f8',
      margin: 'auto'
    }"
    :img="pic"
    :options="{
      viewMode: 1,
      dragMode: 'crop',
      aspectRatio: 16 / 9,
      preview: preview,
    }"
    @ready="ready"
  />
</template>
```

上面是设定了一个裁剪区域，对于文件的选择/传入，以及裁切结果，请通过input或button绑定实例的events来获取。

比如可以通过 `cropper.getCroppedCanvas().toDataURL('image/png')` 来获取一个base64结果。

稍后会附上一个详细的demo。

## Props

props|作用
:--|:--
boxStyle|定义裁剪区域的样式，也就是包裹cropper的父级元素样式
img|图片地址，请require本地图片，或者传入一个base64的图片地址
options|一些cropper的设定参数，完整可参考 [options - cropperjs](https://github.com/fengyuanchen/cropperjs#options)
events|一些cropper的回调函数，完整可参考 [events - cropperjs](https://github.com/fengyuanchen/cropperjs#events)

## Api

可通过`cropper`实例来调取插件的各种api，同步cropperjs的各种事件，完整可参考 [events - cropperjs](https://github.com/fengyuanchen/cropperjs#events)

