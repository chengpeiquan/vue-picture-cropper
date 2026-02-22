---
outline: deep
---

# 预设模式

本插件提供了一些常用的预设模式，方便在日常的业务场景里快速使用。

## 注意事项

开始使用之前，需要了解一些限制。

### 配置行为相关

1. **裁剪区域和裁剪结果尺寸一致**  
   在使用预设模式时，裁剪区域和裁剪结果会保持相同尺寸。  
   如果在 `presetMode` 中指定了 `width` 和 `height`，这些值会覆盖 `getDataURL` 等 API 中传入的尺寸参数。

2. **宽高比例注意**  
   请确保 `presetMode.width` 与 `presetMode.height` 的宽高比例与 `options.aspectRatio` 一致，否则裁剪结果可能出现拉伸或裁切。

### 类型约束相关

1. **模式值限制**  
   `presetMode.mode` 只接收 `SupportedPresetMode` 类型中定义的值，传入其他值将不会生效。

2. **预设模式简化配置**  
   预设模式只提供了基础配置，必要的 `options` 仍需根据实际需求传递。可参考 [在线示例](#在线示例) 的源代码。

## 在线示例

- [使用固定宽高的裁剪模式](../examples/preset-fixed-size.md)
- [生成圆形裁剪结果](../examples/preset-round.md)

## 类型声明

通过 `VuePictureCropper` 或 `useCropper` 的 `presetMode` Prop 传递给实例控制，以下是该 Prop 的类型定义。

```ts
/**
 * 组件支持的预设模式
 */
export type SupportedPresetMode =
  /**
   * 指定裁剪结果的大小
   */
  | 'fixedSize'

  /**
   * 生成圆形裁剪结果
   */
  | 'round'

/**
 * 组件 Props 上的预设选项
 *
 * @since 0.4.0
 */
export interface PresetModeOptions {
  /**
   * 要使用的预设模式
   */
  mode?: SupportedPresetMode

  /**
   * 裁剪结果的宽度
   */
  width?: number

  /**
   * 裁剪结果的高度
   */
  height?: number
}
```
