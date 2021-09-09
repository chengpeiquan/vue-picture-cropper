# vue-picture-cropper

一个基于 cropper.js ，支持 Vue 3.0 的图片裁切工具组件（目前仅支持 Vue 3.x ）。

对 Vue 3.0 还不熟悉的同学，可以查阅我之前总结的文档 [《Vue3.0学习教程与实战案例》](http://vue3.chengpeiquan.com/)

## demo

根据平时常见的使用习惯，弄了一个简单的在线 DEMO ，点击按钮选择图片后，弹出裁切框，裁切后生成裁切结果。

点击查看：[vue-picture-cropper-demo](https://chengpeiquan.github.io/vue-picture-cropper-demo/)

![vue-picture-cropper-demo](https://chengpeiquan.github.io/vue-picture-cropper-demo/static/img/preview.jpg)

## 安装

```
npm install --save-dev vue-picture-cropper
```

## 导入

目前仅支持在 Vue 组件里按需引入，模板和实例也仅限在组件内使用，根据 Vue 3.x 的设计思想，官方也不推荐全局导入各类插件。

```js
// xxx.vue
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
```

需要注意的是，如果是基于 [Vite](https://vitejs.dev/) 的项目，由于 Vite 需要使用 ESM 组件，所以导入方式需要改成从 `ESM` 版本导入：

```js
// xxx.vue（注意 from 后面的路径不同）
import VuePictureCropper, { cropper } from 'vue-picture-cropper/dist/esm'
```

导入的模块说明：

模块名称|作用
:--|:--
VuePictureCropper|组件的模板，用于挂载和渲染，可自定义命名
cropper|工具实例，可用于操作相关的api，必须用花括号导入该名称

对 Vue 3.x 还不熟悉的同学，请看下方的用法示范。

## 用法

工具的渲染方法如下，请注意在 Vue 3.x 里，除非你使用 class 风格来编写组件，否则组件都需要通过 `defineComponent` 来定义。

```html
<template>
  <vue-picture-cropper
    :boxStyle="{
      width: '100%',
      height: '100%',
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

可参考 DEMO 里面的用法：

- [Vue 3.0 组合式 API 写法](https://github.com/chengpeiquan/vue-picture-cropper-demo/blob/main/src/components/Dialog.vue)

- [Vue 2.0 选项式 API 写法](https://github.com/chengpeiquan/vue-picture-cropper-demo/blob/main/src/components/DialogWithOptionsAPI.vue)

## Props

简单的说明如下，可参考上方的用法示范自行调整。

props|类型|作用
:--|:--|:--
boxStyle|object|定义裁剪区域的样式，也就是包裹cropper的父级元素样式
img|string|要用来裁切的图片地址
options|object|一些cropper的设定参数，完整可参考 [options - cropperjs](https://github.com/fengyuanchen/cropperjs#options)
events|function|一些cropper的回调函数，完整可参考 [events - cropperjs](https://github.com/fengyuanchen/cropperjs#events)

btw: 远程图片会涉及到跨域问题，要服务端进行配合调整，请尽量使用本地图片来避免一些奇怪的问题出现。

## 常用选项

属性|类型|说明
:--|:--|:--
viewMode|number|可以决定裁切框的活动范围，可选 0、1、2、3，建议选 1 （裁切框只能在图片区域内活动）
aspectRatio|number|可以指定裁剪框的宽高比，不设置则为自由变化（建议按照裁切结果的尺寸设置对应的比例）
preview|element/string|图片预览的容器，一个 DOM 元素。必须可以被 document.querySelectorAll 获取到

## 常用方法

可通过 `cropper` 实例来调取插件的各种 API （也就是在 import 的时候花括号里的那个实例）。

方法名|功能说明|用法示范|备注
:--|:--|:--|:--
getDataURL|获取裁切后的base64结果，可用于本地预览展示|const dataURL = cropper.getDataURL()|
getBlob|获取裁切后的 blob 结果，可用于传给服务端|const blob = cropper.getBlob()|
getFile|获取裁切后的 file 结果，可用于传给服务端|const file = cropper.getFile()|`0.2.0` 版本开始才支持该方法
clear|清除裁切框|cropper.clear()|
reset|重置默认的裁切区域|cropper.reset()|

`getDataURL`、 `getBlob` 和 `getFile` 均属于插件自带的方法，均为同步操作，生成的文件格式都是基于源图片的格式，仅支持处理本地图片，不支持远程图片。

其中均可传入选项来控制获取到的结果变化：

属性|类型|说明|默认值
:--|:--|:--|:--
width|number|设置裁切结果的宽度|原图所截区域的大小
height|number|设置裁切结果的高度|原图所截区域的大小
minWidth|number|设置裁切结果的最小宽度|0
minHeight|number|设置裁切结果的最小高度|0
maxWidth|number|设置裁切结果的最大宽度|无上限
maxHeight|number|设置裁切结果的最大高度|无上限
fillColor|string|设置裁剪结果的背景色，比如你想改变png透明区域的颜色|transparent
imageSmoothingEnabled|boolean|是否让裁剪后的图片显得平滑|true
imageSmoothingQuality|string|图片平滑质量，可选low、medium、high|low
fileName|string|文件名，目前只有 `getFile` 会用到该参数，如果不传的话，默认文件名格式为 “cropped-时间戳.文件后缀”

用法示范：

```js
// 设定裁切后指定尺寸为 400x250 ，通常可以为 banner 图裁切指定尺寸
const opt = {
  width: 400,
  height: 250
};

// 裁切后会按照该尺寸生成结果
const dataURL = cropper.getDataURL(opt);
```

具体在项目工程里的使用可以参考文档前面附的 DEMO 源码。

如果需要转换格式或者处理远程图片，请使用 [getCroppedCanvas](https://github.com/fengyuanchen/cropperjs#getcroppedcanvasoptions) （需注意：这个方法存在部分异步操作，请留意用法说明）

## 其他说明

因为本插件是对做了一层组件化的实现，所以本组件也同步了 cropperjs 的所有 API ，均可通过 `cropper.xxxx` 来使用原来的 API 。

如果你需要更多高级功能，可以戳原文档参考使用 [events - cropperjs](https://github.com/fengyuanchen/cropperjs#events)
