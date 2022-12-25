import { defineComponent, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Cropper from 'cropperjs'
import { isObject, loadRes, randomString } from '@bassist/utils'
import { getImgMIMEType, getRoundedCanvas, updateResultOptions } from './utils'
import { props } from './props'
import cropperStyle from 'cropperjs/dist/cropper.css'
import vpcStyle from './style.css'
import type { CropperInstance } from './types'

loadRes({
  type: 'style',
  id: 'cropperjs',
  resource: cropperStyle,
}).catch((e) => {
  console.log(e)
})

loadRes({
  type: 'style',
  id: 'vue-picture-cropper',
  resource: vpcStyle,
}).catch((e) => {
  console.log(e)
})

export let cropper: CropperInstance | null

export default defineComponent({
  name: 'VuePictureCropper',
  props,
  setup(props) {
    const mimeType = ref<string>('')
    const randomId = ref<string>('')

    async function init() {
      await nextTick()
      randomId.value = randomString()

      const check = window.setInterval(() => {
        const imgElement: HTMLImageElement | null = randomId.value
          ? document.querySelector(`#vpc-img-${randomId.value}`)
          : document.querySelector('.vue--picture-cropper__img')

        if (imgElement) {
          try {
            cropper = new Cropper(imgElement, props.options) as CropperInstance
            window.clearInterval(check)

            updateInstance()

            mimeType.value = getImgMIMEType({
              mode: props.presetMode.mode,
              dataURI: props.img,
            })

            // Check if preset mode needs to be activated
            imgElement.addEventListener('ready', () => {
              usePresetMode()
            })
          } catch (e) {
            console.log(e)
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

    function getDataURL(options: Record<string, any> = {}) {
      options = updateResultOptions(props.presetMode, options)
      try {
        let croppedCanvas = cropper!.getCroppedCanvas(options)
        if (props.presetMode.mode === 'round') {
          croppedCanvas = getRoundedCanvas(croppedCanvas)
        }

        const result: string = croppedCanvas.toDataURL(mimeType.value)
        return result
      } catch (e) {
        return ''
      }
    }

    async function getBlob(
      options: Record<string, any> = {}
    ): Promise<Blob | null> {
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
        } catch (e) {
          resolve(null)
        }
      })
    }

    async function getFile(
      options: Record<string, any> = {}
    ): Promise<File | null> {
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
          console.log(e)
        }
      },
      { immediate: true }
    )

    onBeforeUnmount(() => {
      if (cropper) {
        cropper.destroy()
        cropper = null
      }
    })

    return () => {
      return (
        <div
          id={`vpc-wrap-${randomId.value}`}
          class={`vue--picture-cropper__wrap ${
            props.presetMode.mode === 'round'
              ? 'vue--picture-cropper__wrap-round'
              : ''
          }`}
          style={props.boxStyle}
        >
          <img
            id={`vpc-img-${randomId.value}`}
            class="vue--picture-cropper__img"
            src={props.img}
          />
        </div>
      )
    }
  },
})
