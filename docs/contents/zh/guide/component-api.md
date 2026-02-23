---
outline: deep
---

# 组件 API

VuePictureCropper 组件是为 Cropper.js 提供了一层 Vue 适配的薄封装，它支持 Cropper.js 的所有 API 。

当前文档只记录组件扩展的属性和方法，如果需要更多高级功能，可以通过 `cropper` 实例使用 [Cropper.js API](./cropperjs-api.md) 。

## 用法示例 {#examples}

组件简单，但选项复杂，建议直接查看 [示例](../examples/basic-component.md) 系列及其源代码注释查看用法。

## Props {#props}

组件的 Props 类型除了适用于组件本身，同时也是 [useCropper](./hook-api.md) 组合式函数的入参类型。

| 选项       | 作用                                                  |
| :--------- | :---------------------------------------------------- |
| boxStyle   | 定义裁剪区域的样式，也就是包裹 Cropper 的父级元素样式 |
| img        | 用于裁剪的图片地址                                    |
| options    | 见 [Cropper.js API](./cropperjs-api.md#options)       |
| events     | 见 [Cropper.js API](./cropperjs-api.md#events)        |
| presetMode | 见 [预设模式](./preset-mode.md) 的说明                |

:::tip
远程图片会涉及到 [跨域问题](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)，需要服务端进行配合调整，请尽量使用本地图片避免遇到问题。
:::

- 类型声明

```ts
import type { CSSProperties } from 'vue'

export interface VuePictureCropperProps {
  /**
   * 待裁剪图片的地址
   */
  img: string

  /**
   * 裁剪框容器的样式
   */
  boxStyle?: CSSProperties

  /**
   * Cropper.js 的选项，详见 Cropper.js 文档
   */
  options?: CropperInstance.Options

  /**
   * 预设模式，见 [预设模式](./preset-mode.md)
   */
  presetMode?: PresetModeOptions
}
```

## 常用方法 {#methods}

组件在 Cropper.js 的基础上扩展了几个常用方法，可通过 `cropper` 实例调取插件的各种 API 。

- 类型声明

```ts
export interface CropperInstance extends Cropper {
  /**
   * 获取裁剪后的 Base64 结果
   *
   * 可用于本地预览展示
   */
  getDataURL: (options?: CropperInstance.GetCroppedCanvasOptions) => string

  /**
   * 获取裁剪后的 Blob 结果
   *
   * 可用于传给服务端
   */
  getBlob: (
    options?: CropperInstance.GetCroppedCanvasOptions,
  ) => Promise<Blob | null>

  /**
   * 获取裁剪后的 File 结果
   *
   * 可用于传给服务端
   *
   * @since 0.2.0
   */
  getFile: (
    options?: CropperInstance.GetCroppedCanvasOptions,
  ) => Promise<File | null>
}
```

::: tip 注意事项

三者均属于插件自带的方法，生成的文件格式都是基于源图片的格式，仅支持处理本地图片，不支持远程图片。

另外基于 Cropper.js 还有两个常用方法，可以通过实例操作：

- 清除裁剪框 `clear()`
- 重置裁剪框 `reset()`

:::

- 入参选项

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

若需转换格式或处理远程图片，请使用 Cropper.js 的 [getCroppedCanvas](./cropperjs-api.md)。
