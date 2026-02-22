---
outline: deep
---

# Hook API

`useCropper` lets you use VuePictureCropper without a template ref: pass the same arguments as [Component Props](./component-api.md#props), and get back a component to render and a cropper controller. It’s suited for encapsulating cropping in your logic layer.

## Usage examples {#examples}

```ts
// Only the Hook is needed; VuePictureCropper component is not required
import { useCropper } from 'vue-picture-cropper'

// Returns the component and controller with the ref already wired
const [Component, cropper] = useCropper({ img, options })
```

The API is simple but the options are not; it’s best to check the [Examples](../examples/basic-hook.md) and their source comments for usage.

## Parameters {#params}

| Parameter | Type                               | Description                                                                               |
| :-------- | :--------------------------------- | :---------------------------------------------------------------------------------------- |
| props     | `MaybeRef<VuePictureCropperProps>` | Same as VuePictureCropper component props. See [Component API](./component-api.md#props). |

## Reactivity {#reactive}

In Vue, `setup()` runs only once per component. If you pass a **plain object**, e.g. `useCropper({ img: someRef.value })`, only the value at call time is captured; later changes to `someRef` will **not** reach the cropper.

When props must stay in sync with reactive state (e.g. `img` changes when the user picks a new file), pass a **ref or computed**:

```ts
// If `imageUrl` is a ref, use computed to get reactive props
const computedProps = computed(() => ({
  img: imageUrl.value,
  options,
}))

// The returned component and cropper will update accordingly
const [Component, cropper] = useCropper(computedProps)
```

This way each render reads the current value and the cropper updates correctly.

## Circular dependency {#circular-dependency}

Do not pass in props any logic that needs the cropper instance (e.g. reading the crop result inside `options.crop`).

::: tip What is a circular dependency?
The cropper is created when the Hook runs, and the Hook’s input is the props.

If the props then depend on methods on the cropper, you get a circular dependency.
:::

When your flow really needs that kind of logic, use [cropper.onInstanceEffect](#instance-effect) below and run those side effects inside the effect after the instance is created.

## Return value {#returns}

`useCropper` returns a tuple `[Component, cropper]`:

| Return value | Description                                                                                                                                    |
| :----------: | :--------------------------------------------------------------------------------------------------------------------------------------------- |
|  Component   | A Vue component to render in the template (e.g. `<Component />`). It is VuePictureCropper internally and does not need any props passed to it. |
|   cropper    | The cropper controller object. See [The cropper object](#the-cropper-object) below.                                                            |

The return value is an array on purpose so you can name things easily when destructuring:

```ts
// Name as you destructure
const [CropperComponent1, cropper1] = useCropper(props1)
const [CropperComponent2, cropper2] = useCropper(props2)
```

## Rendering the Component {#rendering-component}

Assuming you named the component `CropperComponent` when destructuring, rendering differs by Vue style.

With `<script setup>`, you can render it directly:

```vue
<CropperComponent />
```

With `defineComponent`, you need a dynamic component to render the runtime component:

```vue
<component :is="CropperComponent" />
```

## The cropper object {#the-cropper-object}

The `cropper` here is the controller object, not the Cropper instance itself. It’s a thin wrapper that only exposes a subset of APIs for compatibility.

Use `getInstance()` when you need the full Cropper.js API.

| Method / property | Description                                                                                  |
| :---------------: | :------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
|    getInstance    | Get the underlying Cropper instance (`CropperInstance                                        | null`). In non-reactive usage, call once before each use to get the latest instance. |
|    getDataURL     | Get the cropped result as Base64. Same usage as [Component API](./component-api.md#methods). |
|      getBlob      | Get the cropped result as Blob. Same usage as [Component API](./component-api.md#methods).   |
|      getFile      | Get the cropped result as File. Same usage as [Component API](./component-api.md#methods).   |
|       clear       | Clear the crop box; maps to Cropper.js `clear()`.                                            |
|       reset       | Reset the crop box; maps to Cropper.js `reset()`.                                            |
| onInstanceEffect  | Register and run side effects when the underlying Cropper instance is available. See below.  |

## onInstanceEffect {#instance-effect}

To avoid [circular dependency](#circular-dependency) and keep the component efficient, use `onInstanceEffect` when you have side effects that depend on the Cropper instance and want to avoid a reactive dependency loop. It runs your logic when the instance is ready.

- **Signature**: `onInstanceEffect(effect, options?)`
  - `effect(instance)`: Callback that receives the current `CropperInstance`. It runs immediately if the instance already exists, and again when the instance changes unless `once: true` is set. The callback may return a cleanup function, which is called before the next run or when the watcher is stopped.
  - `options.once`: Optional. When `true`, the effect runs only the **first** time the instance is available, then the watcher is removed. Default is `false` (runs on every instance change).
- **Returns**: A stop function that cancels the watcher. It is also cleaned up automatically on component unmount.

Example:

```ts
// Run once when the instance is first ready
cropper.onInstanceEffect(
  (instance) => {
    if (!instance) return
    console.log('Cropper instance ready', instance)
  },
  { once: true },
)

// Run on every instance change
// If you would have used options.crop to get the crop result,
// do it here with addEventListener instead
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

## Type declarations {#types}

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
