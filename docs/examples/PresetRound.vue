<script setup lang="ts">
import { Button, Divider, InputGroup, InputNumber } from 'primevue'
import { computed, ref } from 'vue'

import { type VuePictureCropperProps, useCropper } from 'vue-picture-cropper'

import ChooseFile from '../components/ChooseFile.vue'
import CropAndPreview from '../components/CropAndPreview.vue'
import { useFileCropState } from '../hooks/useFileCropState'
import {
  exampleImages,
  controllableCropperSizeRange as inputRange,
} from '../shared/static-resources'

import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'

const { originalPreview, croppedPreview, onSelectFile } = useFileCropState(
  exampleImages.friedRice,
)

// @doc-start script:typescript
const presetSize = ref(200)

const cropperProps = computed<VuePictureCropperProps>(() => ({
  img: originalPreview.value ?? '',
  options: {
    viewMode: 1,
    dragMode: 'move',
    aspectRatio: 1,
    cropBoxResizable: false,
  },

  // Specify preset mode
  presetMode: {
    mode: 'round',
    width: presetSize.value, // height is the same as width
  },
}))

const [CropperComponent, cropper] = useCropper(cropperProps)
// @doc-end script:typescript

cropper.onInstanceEffect((instance) => {
  if (!instance) return

  const handler = () => {
    const dataURI = instance.getDataURL()
    croppedPreview.value = dataURI || ''
  }

  const el = instance.element
  el.addEventListener('crop', handler)
  return () => {
    el.removeEventListener('crop', handler)
  }
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <div class="flex items-center gap-2">
      <ChooseFile @select="onSelectFile" />

      <Divider layout="vertical" />

      <InputGroup class="!w-40">
        <Button :label="$t('examples.size')" />
        <InputNumber
          v-model="presetSize"
          :fluid="false"
          :max="inputRange.max"
          :min="inputRange.min"
        />
      </InputGroup>
    </div>

    <CropAndPreview
      :key="`size-${presetSize}`"
      :cropped-preview="croppedPreview"
    >
      <!-- Render the component returned by useCropper; no ref needed. -->
      <CropperComponent />
    </CropAndPreview>
  </div>
</template>
