---
outline: deep
---

# 组合式函数 API

`useCropper` 让你在不使用模板 ref 的情况下使用 VuePictureCropper：传入与 [组件 Props](./component-api.md#props) 相同的参数，得到用于渲染的组件和裁剪控制器，适合在逻辑层封装裁剪能力。

## 用法示例 {#examples}

```ts
// 仅需导入 Hook ，不再需要 VuePictureCropper 组件
import { useCropper } from 'vue-picture-cropper'

// 返回已建立引用关系的组件和操作实例
const [Component, cropper] = useCropper({ img, options })
```

组件简单，但选项复杂，建议直接查看 [示例](../examples/basic-hook.md) 系列及其源代码注释查看用法。

## 入参 {#params}

| 参数  | 类型                               | 说明                                                                              |
| :---- | :--------------------------------- | :-------------------------------------------------------------------------------- |
| props | `MaybeRef<VuePictureCropperProps>` | 与 VuePictureCropper 组件的 Props 相同，见 [组件 API](./component-api.md#props)。 |

## 响应式注意 {#reactive}

在 Vue 中，`setup()` 每个组件只执行一次。若传入**普通对象**，例如 `useCropper({ img: someRef.value })`，只会捕获调用那一刻的值，后续 `someRef` 变化**不会**同步到裁剪组件。

需要与响应式状态联动时（例如 `img` 随用户选择新文件而变化），请传入 **ref 或 computed**：

```ts
// 假设 `imageUrl` 是一个 ref 变量，那么使用 computed 即可得到一个可联动的 Props
const computedProps = computed(() => ({
  img: imageUrl.value,
  options,
}))

// 对应的返回数据也会随之更新
const [Component, cropper] = useCropper(computedProps)
```

这样每次渲染都会读取当前值，裁剪组件才能正确更新。

## 循环依赖注意 {#circular-dependency}

请勿在 Props 处传递需要使用 cropper 实例的方法（例如在 `options.crop` 事件里获取裁剪结果）。

::: tip 什么是依赖循环？
因为 `cropper` 的创建需要依赖 Hook 的调用，Hook 的入参依赖 Props 的声明。

如果在 Props 里又依赖 `cropper` 上的方法，就会造成依赖循环。
:::

如业务场景有需要，请参考下文 [cropper.onInstanceEffect](#instance-effect) 的用法，可以将这些有副作用的行为集中在实例创建后的 Effect 里执行。

## 返回值说明 {#returns}

`useCropper` 返回一个元组 `[Component, cropper]`：

|  返回值   | 说明                                                                                                        |
| :-------: | :---------------------------------------------------------------------------------------------------------- |
| Component | 用于在模板中渲染的 Vue 组件（如 `<Component />`），内部即 VuePictureCropper ，此组件无需再传递任何 Props 。 |
|  cropper  | 裁剪控制器对象，详见下方 [cropper 对象](#the-cropper-object) 的说明。                                       |

有意将返回值设计为数组而非对象，可以降低使用时重命名的心智负担：

```ts
// 在解构时直接命名即可
const [CropperComponent1, cropper1] = useCropper(props1)
const [CropperComponent2, cropper2] = useCropper(props2)
```

## 渲染 Component {#rendering-component}

假设解构时已经将组件命名为 `CropperComponent` ，对于不同语法的 Vue 组件，渲染上有所区别。

使用 script-setup 语法糖编写 Vue 组件时，可直接渲染。

```vue
<CropperComponent />
```

使用 `defineComponent` 标准组件时，需要使用动态组件才可以渲染运行时组件。

```vue
<component :is="CropperComponent" />
```

## cropper 对象 {#the-cropper-object}

请注意此处的 `cropper` 是裁剪控制器对象，它不是 Cropper 实例本身，而是一层薄封装，只暴露兼容用的一部分 API 。

需要完整 Cropper.js 能力时，通过 `getInstance()` 获取真实实例。

|   方法 / 属性    | 说明                                                                                                     |
| :--------------: | :------------------------------------------------------------------------------------------------------- |
|   getInstance    | 获取底层 Cropper 实例（`CropperInstance \| null`）。在非响应式场景下，每次使用前调用一次以拿到最新实例。 |
|    getDataURL    | 获取裁剪后的 Base64，用法同 [组件 API](./component-api.md#methods) 。                                    |
|     getBlob      | 获取裁剪后的 Blob，用法同 [组件 API](./component-api.md#methods) 。                                      |
|     getFile      | 获取裁剪后的 File，用法同 [组件 API](./component-api.md#methods) 。                                      |
|      clear       | 清除裁剪框，对应 Cropper.js 的 `clear()`。                                                               |
|      reset       | 重置裁剪框，对应 Cropper.js 的 `reset()`。                                                               |
| onInstanceEffect | 在底层 Cropper 实例可用时注册并执行副作用，见下方说明。                                                  |

## onInstanceEffect {#instance-effect}

为了避免出现 [循环依赖](#circular-dependency) 影响组件性能，当依赖 Cropper 实例的副作用需要避免响应式依赖环时，可以用 `onInstanceEffect` 在实例就绪时执行逻辑。

- **签名**：`onInstanceEffect(effect, options?)`
  - `effect(instance)`：接收当前 `CropperInstance` 的回调。若实例已存在会立即执行；实例后续变化时也会按需再次执行（除非设置了 `once: true`）。回调可返回一个清理函数，在下次执行前或停止监听时被调用。
  - `options.once`：可选。为 `true` 时仅在实例**首次**可用时执行一次，之后不再监听；默认 `false`，即每次实例变化都会触发。
- **返回值**：一个 stop 函数，调用后取消对该实例的监听。组件卸载时也会自动清理。

示例：

```ts
// 实例首次就绪时执行一次
cropper.onInstanceEffect(
  (instance) => {
    if (!instance) return
    console.log('Cropper 实例已就绪', instance)
  },
  { once: true },
)

// 每次实例变化都执行
// 例如原计划在 `options.crop` 事件里获取裁剪结果
// 则应该如例子一样改成通过 addEventListener 监听
cropper.onInstanceEffect((instance) => {
  if (!instance) return

  const handler = () => {
    const dataURI = instance.getDataURL({ maxWidth: 800, maxHeight: 800 })
    croppedPreview.value = dataURI || ''
  }

  const el = instance.element
  el.addEventListener('crop', handler)

  return () => {
    el.removeEventListener('crop', handler)
  }
})
```

## 类型声明 {#types}

```ts
function useCropper(props: MaybeRef<VuePictureCropperProps>): readonly [
  Component,
  {
    getInstance: () => CropperInstance | null
    getDataURL: CropperInstance['getDataURL']
    getBlob: CropperInstance['getBlob']
    getFile: CropperInstance['getFile']
    clear: CropperInstance['clear']
    reset: CropperInstance['reset']
    onInstanceEffect: (
      effect: (instance: CropperInstance) => undefined | (() => void),
      options?: { once?: boolean },
    ) => () => void
  },
]
```
