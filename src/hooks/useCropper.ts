import {
  type MaybeRef,
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  ref,
  unref,
  watch,
} from 'vue'
import VuePictureCropper from '../cropper/index.vue'
import type {
  CropperInstance,
  VuePictureCropperProps,
  VuePictureCropperRefValue,
} from '../cropper/types'

/**
 * Use VuePictureCropper without template ref.
 *
 * **Important:** In Vue, `setup()` runs only once per component. If you pass a
 * plain object, e.g. `useCropper({ img: someRef.value })`, that value is
 * captured at call time and will **not** update when `someRef` changes. For
 * reactive props (e.g. `img` that changes when the user picks a new file), pass
 * a **ref or computed**: `useCropper(computed(() => ({ img: someRef.value,
 * options })))`, so the current value is read on each render.
 *
 * @since 1.0.0
 * @example
 *   const [Component, cropper] = useCropper({ img, options })
 *   // Template: <Component />
 *   // Same as v0.x: cropper.getDataURL(), cropper.getBlob(), cropper.getFile()
 *   // Full API: cropper.getInstance()?.getData(), cropper.getInstance()?.rotate(90)
 *
 * @param props - Same as VuePictureCropper component props (img, options,
 *   etc.). Pass a **ref or computed** when props must stay in sync with
 *   reactive state (e.g. dynamic `img`); a plain object is a one-time
 *   snapshot.
 * @returns A tuple `[Component, cropper]`:
 *
 *   - `Component`: Vue component to render in template (e.g. `<Component />`).
 *   - `cropper`: An object that **is not** the same as the v0.x cropper instance.
 *       It is a thin wrapper that only exposes a subset of APIs for
 *       compatibility: `getDataURL`, `getBlob`, `getFile` (same usage as v0.x),
 *       and `getInstance()` to access the real Cropper instance when you need
 *       full cropperjs API (e.g. `getData()`, `rotate()`, `setData()`).
 */
export const useCropper = (props: MaybeRef<VuePictureCropperProps>) => {
  const vpcRef = ref<VuePictureCropperRefValue | null>(null)

  const Component = defineComponent({
    name: 'UseCropperComponent',
    setup() {
      onBeforeUnmount(() => {
        vpcRef.value?.cropper?.destroy()
        vpcRef.value = null
      })

      return () =>
        h(VuePictureCropper, {
          ...unref(props),
          ref: vpcRef,
        })
    },
  })

  const cropper = computed<CropperInstance | null>(
    () => vpcRef.value?.cropper ?? null,
  )

  /**
   * Get the underlying Cropper instance.
   *
   * For non-reactive instances, ensure that you call this function once before
   * each use to get the latest instance.
   *
   * @returns CropperInstance | null
   */
  const getInstance = () => {
    return cropper.value
  }

  const getDataURL: CropperInstance['getDataURL'] = (options) => {
    return cropper.value?.getDataURL(options) ?? ''
  }

  const getBlob: CropperInstance['getBlob'] = (options) => {
    return cropper.value?.getBlob(options) ?? Promise.resolve(null)
  }

  const getFile: CropperInstance['getFile'] = (options) => {
    return cropper.value?.getFile(options) ?? Promise.resolve(null)
  }

  const clear: CropperInstance['clear'] = () => {
    return cropper.value?.clear() as ReturnType<CropperInstance['clear']>
  }

  const reset: CropperInstance['reset'] = () => {
    return cropper.value?.reset() as ReturnType<CropperInstance['reset']>
  }

  /**
   * Register an effect to be executed when the underlying Cropper instance is
   * available.
   *
   * This function allows you to run side effects that depend on the Cropper
   * instance without introducing reactive dependency loops. The effect receives
   * the current Cropper instance as its argument.
   *
   * @example
   *   // Execute once when the instance is first ready
   *   cropper.onInstanceEffect(
   *     (instance) => {
   *       console.log('Cropper instance ready', instance)
   *     },
   *     { once: true },
   *   )
   *
   * @example
   *   // Execute every time the instance changes (dynamic effect)
   *   cropper.onInstanceEffect((instance) => {
   *     instance.options.crop = () => {
   *       const dataURI = instance.getDataURL({
   *         maxWidth: 800,
   *         maxHeight: 800,
   *       })
   *       croppedPreview.value = dataURI || ''
   *     }
   *   })
   *
   * @param effect - A callback function that receives the CropperInstance. This
   *   function will be called immediately if the instance already exists, and
   *   on subsequent instance changes if applicable.
   * @param options.once - Optional. If true, the effect will be executed only
   *   once when the instance becomes available for the first time. Defaults to
   *   false, meaning the effect will be triggered every time the instance
   *   changes.
   * @returns A stop handle function to cancel the watcher. Also automatically
   *   cleaned up on component unmount.
   */
  const onInstanceEffect = (
    effect: (instance: CropperInstance) => undefined | (() => void),
    options?: { once?: boolean },
  ) => {
    let cleanup: (() => void) | undefined
    let called = false

    const stop = watch(
      cropper,
      (instance) => {
        cleanup?.()
        cleanup = undefined

        if (!instance) return
        if (options?.once && called) return

        called = true
        cleanup = effect(instance)

        if (options?.once) {
          stop()
        }
      },
      { immediate: true },
    )

    onBeforeUnmount(() => {
      cleanup?.()
      stop()
    })

    return () => {
      cleanup?.()
      stop()
    }
  }

  return [
    Component,

    {
      getInstance,
      getDataURL,
      getBlob,
      getFile,
      clear,
      reset,
      onInstanceEffect,
    },
  ] as const
}
