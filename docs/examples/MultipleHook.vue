<script setup lang="ts">
import { type Ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  type CropperInstance,
  type VuePictureCropperProps,
  useCropper,
} from 'vue-picture-cropper'

import CropAndPreview from '../components/CropAndPreview.vue'
import { useFileCropState } from '../hooks/useFileCropState'
import { exampleImages } from '../shared/static-resources'
import { cn } from '../utils/class-name'

import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'

const { t } = useI18n()

// @doc-start script:typescript

// Two independent file states
const { croppedPreview: croppedPreview1, originalPreview: originalPreview1 } =
  useFileCropState(exampleImages.friedRice)

const { croppedPreview: croppedPreview2, originalPreview: originalPreview2 } =
  useFileCropState(exampleImages.riceNoodles)

// Props are reactive; image updates automatically
const cropperProps1 = computed<VuePictureCropperProps>(() => ({
  img: originalPreview1.value ?? '',
  options: { viewMode: 2 },
}))

const cropperProps2 = computed<VuePictureCropperProps>(() => ({
  img: originalPreview2.value ?? '',
  options: { viewMode: 2 },
}))

// Each hook call returns an independent component + instance wrapper
const [CropperComponent1, cropper1] = useCropper(cropperProps1)
const [CropperComponent2, cropper2] = useCropper(cropperProps2)

// Bind crop event after instance is ready
const bindPreview = (
  instance: CropperInstance | null,
  preview: Ref<string>,
) => {
  if (!instance) return

  const handler = () => {
    preview.value = instance.getDataURL({ maxWidth: 800, maxHeight: 800 }) ?? ''
  }

  const el = instance.element
  el.addEventListener('crop', handler)

  return () => {
    el.removeEventListener('crop', handler)
  }
}

cropper1.onInstanceEffect((i) => bindPreview(i, croppedPreview1))
cropper2.onInstanceEffect((i) => bindPreview(i, croppedPreview2))

// @doc-end script:typescript

const titleClassName = cn('!m-0 text-lg font-bold')
</script>

<template>
  <!-- @doc-start template:html -->
  <div class="flex w-full flex-col gap-6">
    <p :class="titleClassName">{{ t('examples.cropperInstance') }} 1</p>

    <CropAndPreview :cropped-preview="croppedPreview1">
      <!-- Render the component returned by useCropper; no ref needed. -->
      <CropperComponent1 />
    </CropAndPreview>

    <p :class="titleClassName">{{ t('examples.cropperInstance') }} 2</p>

    <CropAndPreview :cropped-preview="croppedPreview2">
      <!-- Render the component returned by useCropper; no ref needed. -->
      <CropperComponent2 />
    </CropAndPreview>
  </div>
  <!-- @doc-end template:html -->
</template>
