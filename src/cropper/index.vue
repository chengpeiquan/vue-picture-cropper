<script setup lang="ts">
import Cropper from 'cropperjs'
import { nextTick, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import {
  type CropperInstance,
  type VuePictureCropperProps,
  type VuePictureCropperRefValue,
} from './types'
import {
  applyPresetModeToCanvasOptions,
  getImgMIMEType,
  getRoundedCanvas,
  isObject,
} from './utils'
import './style.css'

defineOptions({
  name: 'VuePictureCropper',
})

const props = withDefaults(defineProps<VuePictureCropperProps>(), {
  boxStyle: () => ({}),
  options: () => ({}),
  presetMode: () => ({}),
})

const cropperInstance = shallowRef<CropperInstance | null>(null)
const imgElement = shallowRef<HTMLImageElement | null>(null)
const mimeType = ref('')

const getDataURL: CropperInstance['getDataURL'] = (options = {}) => {
  if (!cropperInstance.value) {
    return ''
  }

  options = applyPresetModeToCanvasOptions(props.presetMode, options)

  try {
    let croppedCanvas = cropperInstance.value.getCroppedCanvas(options)

    if (props.presetMode.mode === 'round') {
      croppedCanvas = getRoundedCanvas(croppedCanvas)
    }

    return croppedCanvas.toDataURL(mimeType.value)
  } catch {
    return ''
  }
}

const getBlob: CropperInstance['getBlob'] = (options = {}) => {
  if (!cropperInstance.value) {
    return Promise.resolve(null)
  }

  options = applyPresetModeToCanvasOptions(props.presetMode, options)

  return new Promise((resolve) => {
    try {
      let croppedCanvas = cropperInstance.value!.getCroppedCanvas(options)

      if (props.presetMode.mode === 'round') {
        croppedCanvas = getRoundedCanvas(croppedCanvas)
      }

      croppedCanvas.toBlob((blob: Blob | null) => resolve(blob), mimeType.value)
    } catch {
      resolve(null)
    }
  })
}

const getFile: CropperInstance['getFile'] = async (options = {}) => {
  const { fileName: customFileName } = options
  const extension = mimeType.value.replace(/image\//, '')
  const fileName = customFileName
    ? `${customFileName}.${extension}`
    : `cropped-${Date.now()}.${extension}`

  const blob = await getBlob(options)
  if (!blob) return null

  return new File([blob], fileName, {
    type: mimeType.value,
  })
}

const bindInstanceExtensions = () => {
  if (!cropperInstance.value) return
  cropperInstance.value.getDataURL = getDataURL
  cropperInstance.value.getBlob = getBlob
  cropperInstance.value.getFile = getFile
}

const applyPresetMode = () => {
  if (!isObject(props.presetMode) || !cropperInstance.value) return

  const { mode, width, height } = props.presetMode

  if (mode === 'fixedSize' || mode === 'round') {
    cropperInstance.value.setCropBoxData({ width, height })
  }
}

const init = async () => {
  await nextTick()

  if (!imgElement.value) return

  try {
    cropperInstance.value = new Cropper(
      imgElement.value,
      props.options as Cropper.Options<HTMLImageElement>,
    ) as CropperInstance

    bindInstanceExtensions()

    mimeType.value = getImgMIMEType({
      mode: props.presetMode.mode,
      dataURI: props.img,
    })

    imgElement.value.addEventListener('ready', applyPresetMode)
  } catch (e) {
    console.error(e)
  }
}

watch(
  () => props.img,
  (val) => {
    if (!val) {
      cropperInstance.value?.destroy()
      cropperInstance.value = null
      return
    }

    if (!cropperInstance.value) {
      init()
      return
    }

    try {
      cropperInstance.value.replace(props.img)

      mimeType.value = getImgMIMEType({
        mode: props.presetMode.mode,
        dataURI: props.img,
      })

      bindInstanceExtensions()
    } catch (e) {
      console.error(e)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  imgElement.value?.removeEventListener('ready', applyPresetMode)
  cropperInstance.value?.destroy()
  cropperInstance.value = null
})

defineExpose<VuePictureCropperRefValue>({
  cropper: cropperInstance,
})
</script>

<template>
  <div
    :class="['vpc-root', presetMode.mode === 'round' && 'vpc-round-mode']"
    :style="boxStyle"
  >
    <img ref="imgElement" class="vpc-img" :src="img" />
  </div>
</template>
