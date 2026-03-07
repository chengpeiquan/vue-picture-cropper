const e=`<script setup lang="ts">
import { type ComputedRef, type Ref, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import VuePictureCropper, {
  type CropperInstance,
  type VuePictureCropperRefValue,
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

// Each component owns its own Cropper instance (no shared state in v1.x)
const vpcRef1 = ref<VuePictureCropperRefValue | null>(null)
const vpcRef2 = ref<VuePictureCropperRefValue | null>(null)

const cropper1 = computed(() => vpcRef1.value?.cropper ?? null)
const cropper2 = computed(() => vpcRef2.value?.cropper ?? null)

// Shared preview logic (demo only)
const onCropBase = (
  cropper: ComputedRef<CropperInstance | null>,
  preview: Ref<string>,
) => {
  preview.value =
    cropper.value?.getDataURL({ maxWidth: 800, maxHeight: 800 }) ?? ''
}

const onCrop1 = () => onCropBase(cropper1, croppedPreview1)
const onCrop2 = () => onCropBase(cropper2, croppedPreview2)

// @doc-end script:typescript

const titleClassName = cn('!m-0 text-lg font-bold')
<\/script>

<template>
  <!-- @doc-start template:html -->
  <div class="flex w-full flex-col gap-6">
    <p :class="titleClassName">{{ t('examples.cropperInstance') }} 1</p>

    <CropAndPreview :cropped-preview="croppedPreview1">
      <!-- Cropper for the first image -->
      <VuePictureCropper
        ref="vpcRef1"
        :img="originalPreview1"
        :options="{
          viewMode: 2,
          crop: onCrop1,
        }"
      />
    </CropAndPreview>

    <p :class="titleClassName">{{ t('examples.cropperInstance') }} 2</p>

    <CropAndPreview :cropped-preview="croppedPreview2">
      <!-- Cropper for the second image -->
      <VuePictureCropper
        ref="vpcRef2"
        :img="originalPreview2"
        :options="{
          viewMode: 2,
          crop: onCrop2,
        }"
      />
    </CropAndPreview>
  </div>
  <!-- @doc-end template:html -->
</template>
`;export{e as default};
