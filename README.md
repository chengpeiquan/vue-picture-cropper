# vue-picture-cropper

一个基于cropper.js，支持Vue 3.0的图片裁切工具组件（目前仅支持Vue 3.x）。

## 安装

```
npm install --save-dev vue-picture-cropper
```

## 导入

目前仅支持在Vue组件里按需引入，模板和实例也仅限在组件内使用，根据Vue 3.x的设计思想，官方也不推荐全局导入各类插件。

```js
// xxx.vue
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
```

导入的模块说明：

模块名称|作用
:--|:--
VuePictureCropper|组件的模板，用于挂载和渲染，可自定义命名
cropper|工具实例，可用于操作相关的api，必须用花括号导入该名称

对 Vue 3.x 还不熟悉的同学，请看下方的用法示范。

## 用法

工具的渲染方法如下，请注意在Vue 3.x里，除非你使用class风格来编写组件，否则组件都需要通过 `defineComponent` 来定义。

```html
<template>
  <vue-picture-cropper
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

上面是设定了一个裁剪区域，对于文件的选择/传入，以及裁切结果，请通过 `<input type="file" >` 或 `button` 绑定实例的api来获取。

稍后会附上一个详细的demo（很抱歉最近很忙还没来得及搞）。

## Props

简单的说明如下，可参考上方的用法示范自行调整。

props|类型|作用
:--|:--|:--
boxStyle|object|定义裁剪区域的样式，也就是包裹cropper的父级元素样式
img|string|要用来裁切的图片地址
options|object|一些cropper的设定参数，完整可参考 [options - cropperjs](https://github.com/fengyuanchen/cropperjs#options)
events|function|一些cropper的回调函数，完整可参考 [events - cropperjs](https://github.com/fengyuanchen/cropperjs#events)

btw: 远程图片会涉及到跨域问题，要服务端进行配合调整，请尽量使用本地图片来避免一些奇怪的问题出现。

## Api

可通过 `cropper` 实例来调取插件的各种api（也就是在import的时候花括号里的那个实例）。

比如：

1. 可以通过 `cropper.getCroppedCanvas().toDataURL('image/png')` 来获取一个base64结果。

2. 可以通过 `cropper.clear()` 来清除裁切框。

3. 可以通过 `cropper.reset()` 来重置默认的裁切区域。

还有很多功能，等稍后demo出来了会更详细的进行说明。

本组件也同步了cropperjs的所有api，使用的时候可先参考 [events - cropperjs](https://github.com/fengyuanchen/cropperjs#events)

