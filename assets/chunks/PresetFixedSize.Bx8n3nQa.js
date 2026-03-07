const e=`<script setup lang="ts">
import { Button, Divider, InputGroup, InputNumber } from 'primevue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

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

const { t } = useI18n()

const { originalPreview, croppedPreview, onSelectFile } = useFileCropState(
  exampleImages.friedRice,
)

// @doc-start script:typescript
const presetWidth = ref(300)
const presetHeight = ref(150)

const cropperProps = computed<VuePictureCropperProps>(() => ({
  img: originalPreview.value ?? '',
  options: {
    viewMode: 1,
    dragMode: 'move',
    aspectRatio: presetWidth.value / presetHeight.value,
    cropBoxResizable: false,
  },

  // Specify preset mode
  presetMode: {
    mode: 'fixedSize',
    width: presetWidth.value,
    height: presetHeight.value,
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
<\/script>

<template>
  <div class="flex w-full flex-col gap-6">
    <div class="flex items-center gap-2">
      <ChooseFile @select="onSelectFile" />

      <Divider layout="vertical" />

      <InputGroup class="!w-40">
        <Button :label="t('examples.width')" />
        <InputNumber
          v-model="presetWidth"
          :fluid="false"
          :max="inputRange.max"
          :min="inputRange.min"
        />
      </InputGroup>

      <InputGroup class="!w-40">
        <Button :label="t('examples.height')" />
        <InputNumber
          v-model="presetHeight"
          :max="inputRange.max"
          :min="inputRange.min"
        />
      </InputGroup>
    </div>

    <CropAndPreview
      :key="\`size-\${presetWidth}-\${presetHeight}\`"
      :cropped-preview="croppedPreview"
    >
      <!-- Render the component returned by useCropper; no ref needed. -->
      <CropperComponent />
    </CropAndPreview>
  </div>
</template>
`;export{e as default};
