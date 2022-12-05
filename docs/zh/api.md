---
outline: deep
---

# API 参考

因为本插件是 Cropper.js 的 Vue 组件包装器，因此同步了 Cropper.js 的所有 API 。

本文档只记录组件扩展的属性和方法，如果需要更多高级功能，可以通过 cropper 实例使用 Cropper.js 原来的 API ，点击阅读 [Cropper.js API 文档](https://github.com/fengyuanchen/cropperjs#cropperjs) 。

## Props

可参考在线演示的 demo 代码自行调整。

| Props      | 类型     | 作用                                                  |
| :--------- | :------- | :---------------------------------------------------- |
| boxStyle   | object   | 定义裁剪区域的样式，也就是包裹 Cropper 的父级元素样式 |
| img        | string   | 用于裁剪的图片地址                                    |
| options    | object   | 见 [选项部分](#选项) 的说明                           |
| events     | function | 见 [事件部分](#事件) 的说明                           |
| presetMode | object   | 见 [预设模式](./preset-mode.md) 的说明                |

:::tip
远程图片会涉及到 [跨域问题](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS) ，需要服务端进行配合调整，请尽量使用本地图片避免遇到问题。
:::

- 例子：

```vue
<template>
  <VuePictureCropper
    :boxStyle="{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f8f8',
      margin: 'auto',
    }"
    :img="pic"
    :options="{
      viewMode: 1,
      dragMode: 'crop',
      aspectRatio: 16 / 9,
    }"
    @ready="ready"
  />
</template>
```

## 选项

传递给 Cropper.js 的选项参数，完整选项列表可参考 [Cropper.js 的选项文档](https://github.com/fengyuanchen/cropperjs#options) 。

常用选项如下：

| 属性        | 类型   | 说明                                                                                             |
| :---------- | :----- | :----------------------------------------------------------------------------------------------- |
| viewMode    | number | 可以决定裁剪框的活动范围，可选 `0` / `1` / `2` / `3` ，建议选 `1` （裁剪框只能在图片区域内活动） |
| aspectRatio | number | 可以指定裁剪框的宽高比，不设置则为自由变化（建议按照裁剪结果的尺寸设置对应的比例）               |

- 例子：

```vue
<template>
  <VuePictureCropper
    :options="{
      viewMode: 1,
      dragMode: 'crop',
      aspectRatio: 16 / 9,
    }"
  />
</template>
```

## 事件

传递给 Cropper.js 的事件，每个事件都使用 `v-on:` 或 `@` 进行绑定，与组件 Emits 类似，完整事件列表可参考 [Cropper.js 的事件文档](https://github.com/fengyuanchen/cropperjs#events) 。

- 例子：

```vue
<template>
  <VuePictureCropper @ready="ready" />
</template>
```

## 方法

组件在 Cropper.js 的基础上扩展了几个常用方法，可通过 `cropper` 实例调取插件的各种 API 。

### 类型声明

```ts
export interface CropperInstance extends Cropper {
  /**
   * 获取裁剪后的 Base64 结果
   * @description 可用于本地预览展示
   */
  getDataURL: (options?: Record<string, any>) => string

  /**
   * 获取裁剪后的 Blob 结果
   * @description 可用于传给服务端
   */
  getBlob: (options?: Record<string, any>) => Promise<Blob | null>

  /**
   * 获取裁剪后的 File 结果
   * @description 可用于传给服务端
   * @since 0.2.0
   */
  getFile: (options?: Record<string, any>) => Promise<File | null>
}
```

需要注意的是：

1. `getDataURL` 是同步方法，可以直接拿到结果
2. `getBlob` 和 `getFile` 自 `0.3.0` 版本开始是异步方法，需配合 `Promise` 或 `async / await` 等方式获取结果

三者均属于插件自带的方法，生成的文件格式都是基于源图片的格式，仅支持处理本地图片，不支持远程图片。

另外基于 Cropper.js 还有两个常用方法，可以通过实例操作：

1. 清除裁剪框 `cropper.clear()`
2. 重置裁剪框 `cropper.reset()`

### 入参选项

组件扩展的三个方法均可传入入参选项，用于控制获取到的结果变化。

| 属性                  | 类型    | 说明                                                | 默认值                                  |
| :-------------------- | :------ | :-------------------------------------------------- | :-------------------------------------- |
| width                 | number  | 设置裁剪结果的宽度                                  | 原图所截区域的大小                      |
| height                | number  | 设置裁剪结果的高度                                  | 原图所截区域的大小                      |
| minWidth              | number  | 设置裁剪结果的最小宽度                              | 0                                       |
| minHeight             | number  | 设置裁剪结果的最小高度                              | 0                                       |
| maxWidth              | number  | 设置裁剪结果的最大宽度                              | Infinity                                |
| maxHeight             | number  | 设置裁剪结果的最大高度                              | Infinity                                |
| fillColor             | string  | 设置裁剪结果的背景色，比如想改变 png 透明区域的颜色 | transparent                             |
| imageSmoothingEnabled | boolean | 是否让裁剪后的图片显得平滑                          | true                                    |
| imageSmoothingQuality | string  | 图片平滑质量，可选 `low` / `medium` / `high`        | low                                     |
| fileName              | string  | 文件名，目前只有 `getFile` 会用到该参数，可不传     | `cropped-${当前时间戳}.${原文件扩展名}` |

### 用法示范

使用 `getDataURL` 获取 Base64 图像，这是一个同步方法：

```js
// 设定裁剪后指定尺寸为 `400 x 250`
const opt = {
  width: 400,
  height: 250,
}

// 裁剪后会按照该尺寸生成结果
const dataURL = cropper.getDataURL(opt)
```

如果是要获取 Blob 和 File 格式，请记得用异步方法：

```js
cropper.getBlob().then((blob) => {
  console.log('Blob', blob)
})
// 或者是 `await cropper.getBlob()`

cropper.getFile().then((file) => {
  console.log('File', file)
})
// 或者是 `await cropper.getFile()`
```

如果需要转换格式或者处理远程图片，请使用 Cropper.js 提供的 [getCroppedCanvas](https://github.com/fengyuanchen/cropperjs#getcroppedcanvasoptions) 方法，这个方法存在部分异步操作，请留意用法说明。
