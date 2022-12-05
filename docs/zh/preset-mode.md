---
outline: deep
---

# 预设模式

本插件提供了一些常用的预设模式，方便在日常的业务场景里快速使用。

## 类型声明

```ts
/**
 * 组件 Props 的预设选项
 * @since 0.4.0
 */
export interface PresetModeOptions {
  mode?: SupportedPresetMode
  width?: number
  height?: number
}

/**
 * 组件支持的预设模式
 */
export type SupportedPresetMode =
  // 指定裁剪结果的大小
  | 'fixedSize'
  // 生成圆形裁剪结果
  | 'round'
```

## 注意事项

1. 预设模式只提供了一些简化的配置，例如获取圆形裁剪结果原本需要繁琐的操作，使用预设模式则开箱即用，但是一些该传入的选项还是需要在 `options` 传入，可参考在线 demo 的源代码。
2. 使用预设模式时， “裁剪区域” 和 “裁剪结果” 会保持一样的尺寸大小，也就是说，在预设模式里指定的 `presetMode.width` 和 `presetMode.height` ，会覆盖 `getDataURL` 等获取结果 API 传入的 `width` 和 `height` 。
3. 在指定 `presetMode.width` 和 `presetMode.height` 的时候，请留意宽高比例是否与 `options.aspectRatio` 一致，如果不一致可能得不到想要的结果。
4. `presetMode.mode` 只接收 `SupportedPresetMode` 类型里提及到的值，传入其它将不起作用。

## 固定尺寸模式

可以固定裁剪区域的大小，并且获得和裁剪区域一样大的裁剪结果（这种情况下可以禁止用户修改裁剪区域大小）。

点击查看：[在线演示](./preset-mode-fixed-size.md)

- 使用方法：

1. 将 `presetMode` 的 `mode` 指定为 `fixedSize`
2. 将 `presetMode` 的 `width` 和 `height` 指定为想要的尺寸
3. 将 `options` 的 `dragMode` 设置为 `move` 可以防止裁剪框被取消
4. 将 `options` 的 `cropBoxResizable` 设置为 `false` 可以关闭裁剪区的大小调整功能
5. 将 `options` 的 `aspectRatio` 比例指定为 `width / height` 的比例

- 例子：

```html
<template>
  <vue-picture-cropper
    :boxStyle="{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f8f8',
      margin: 'auto',
    }"
    :img="pic"
    :options="{
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxResizable: false,
    }"
    :presetMode="{
      mode: 'fixedSize',
      width: 100,
      height: 100,
    }"
  />
</template>
```

## 圆形模式

如果在用户上传头像等业务场景需要裁剪为圆形图片，可以使用该模式获取一个圆形的 PNG 图片（在这个模式下裁剪结果固定是 `.png` 图片）。

该模式也是固定裁剪区域的大小，并且获得和裁剪区域一样大的裁剪结果（这种情况下可以禁止用户修改裁剪区域大小）。

点击查看：[在线演示](./preset-mode-round.md)

使用方法：

- 将 `presetMode` 的 `mode` 指定为 `round`
- 将 `presetMode` 的 `width` 和 `height` 指定为想要的尺寸，两个值需要一样
- 将 `options` 的 `dragMode` 设置为 `move` 可以防止裁剪框被取消
- 将 `options` 的 `cropBoxResizable` 设置为 `false` 可以关闭裁剪区的大小调整功能
- 将 `options` 的 `aspectRatio` 比例指定为 `1`

```html
<template>
  <vue-picture-cropper
    :boxStyle="{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f8f8',
      margin: 'auto',
    }"
    :img="pic"
    :options="{
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxResizable: false,
    }"
    :presetMode="{
      mode: 'round',
      width: 100,
      height: 100,
    }"
  />
</template>
```
