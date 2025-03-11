import { defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Cropper from 'cropperjs'
import { isObject, loadRes } from '@bassist/utils'
import { getImgMIMEType, getRoundedCanvas, updateResultOptions } from './utils'
import { props } from './props'
import cropperStyle from 'cropperjs/dist/cropper.css?inline'
import vpcStyle from './style.css?inline'
import type { CropperInstance } from './types'

loadRes({
  type: 'style',
  id: 'cropperjs',
  resource: cropperStyle,
}).catch((e) => {
  console.error(e)
})

loadRes({
  type: 'style',
  id: 'vue-picture-cropper',
  resource: vpcStyle,
}).catch((e) => {
  console.error(e)
})

export let cropper: CropperInstance | null

type Options = Record<string, any>

export default defineComponent({
  name: 'VuePictureCropper',
  props,
  setup(props) {
    const imgElement = ref<HTMLImageElement>()
    const mimeType = ref<string>('')

    async function init() {
      await nextTick()

      const check = window.setInterval(() => {
        if (imgElement.value) {
          try {
            cropper = new Cropper(
              imgElement.value,
              props.options,
            ) as CropperInstance
            window.clearInterval(check)

            updateInstance()

            mimeType.value = getImgMIMEType({
              mode: props.presetMode.mode,
              dataURI: props.img,
            })

            // Check if preset mode needs to be activated
            imgElement.value.addEventListener('ready', () => {
              usePresetMode()
            })
          } catch (e) {
            console.error(e)
          }
        }
      }, 10)
    }

    function usePresetMode() {
      if (!isObject(props.presetMode)) return

      const { mode, width, height } = props.presetMode
      switch (mode) {
        case 'fixedSize':
        case 'round': {
          cropper!.setCropBoxData({
            width,
            height,
          })
          break
        }
      }
    }

    function updateInstance() {
      cropper!.getDataURL = getDataURL
      cropper!.getBlob = getBlob
      cropper!.getFile = getFile
    }

    function getDataURL(options: Options = {}) {
      options = updateResultOptions(props.presetMode, options)
      try {
        let croppedCanvas = cropper!.getCroppedCanvas(options)
        if (props.presetMode.mode === 'round') {
          croppedCanvas = getRoundedCanvas(croppedCanvas)
        }

        const result: string = croppedCanvas.toDataURL(mimeType.value)
        return result
      } catch {
        return ''
      }
    }

    function getBlob(options: Options = {}): Promise<Blob | null> {
      options = updateResultOptions(props.presetMode, options)
      return new Promise((resolve) => {
        try {
          let croppedCanvas = cropper!.getCroppedCanvas(options)
          if (props.presetMode.mode === 'round') {
            croppedCanvas = getRoundedCanvas(croppedCanvas)
          }

          croppedCanvas.toBlob((blob: Blob | null) => {
            resolve(blob)
          }, mimeType.value)
        } catch {
          resolve(null)
        }
      })
    }

    async function getFile(options: Options = {}): Promise<File | null> {
      const { fileName: optFileName } = options
      const suffix: string = mimeType.value.replace(/image\//, '')
      const fileName: string = optFileName
        ? `${optFileName}.${suffix}`
        : `cropped-${Date.now()}.${suffix}`

      const blob: Blob | null = await getBlob(options)
      if (!blob) return null

      const file: File = new File([blob], fileName, {
        type: mimeType.value,
      })
      return file
    }

    watch(
      () => props.img,
      async () => {
        if (!cropper) {
          await init()
          return
        }

        try {
          cropper.replace(props.img)
          mimeType.value = getImgMIMEType({
            mode: props.presetMode.mode,
            dataURI: props.img,
          })
          updateInstance()
        } catch (e) {
          console.error(e)
        }
      },
      { immediate: true },
    )

    onBeforeUnmount(() => {
      if (cropper) {
        cropper.destroy()
        cropper = null
      }
    })

    return () => (
      <div
        class={`vue--picture-cropper__wrap ${
          props.presetMode.mode === 'round'
            ? 'vue--picture-cropper__wrap-round'
            : ''
        }`}
        style={props.boxStyle}
      >
        <img
          ref={imgElement}
          class="vue--picture-cropper__img"
          src={props.img}
        />
      </div>
    )
  },
})
