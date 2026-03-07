const e=`<script setup lang="ts">
import { computed, ref } from 'vue'

// Like v0.x, v1.x exports components by default, but no longer exports the \`cropper\` variable.
// Please refer to the calculation logic below for details.
import VuePictureCropper, {
  type VuePictureCropperRefValue,
} from 'vue-picture-cropper'

// Demo-only: file selection + preview URLs.
// You need to implement your own business logic.
import ChooseFile from '../components/ChooseFile.vue'
import CropAndPreview from '../components/CropAndPreview.vue'
import { useFileCropState } from '../hooks/useFileCropState'
import { exampleImages } from '../shared/static-resources'

// Import styles once (or at project entry). Shown here as a reminder.
import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'

// The conversion between file selection and preview images is handled by a separate Hook
// to avoid interference from boilerplate code.
const { originalPreview, croppedPreview, onSelectFile } = useFileCropState(
  exampleImages.friedRice,
)

// Reference to the VuePictureCropper instance (exposed via defineExpose).
// Type must be VuePictureCropperRefValue so you get instance, getDataURL, getBlob, getFile.
const vpcRef = ref<VuePictureCropperRefValue | null>(null)

// Since v1.x, the Cropper instance is exposed via the component ref.
// We derive a reactive cropper instance from the component ref
// so that it can be reused safely in other composables or effects.
const cropper = computed(() => vpcRef.value?.cropper ?? null)

// Triggered on every \`crop\` event emitted by the Cropper component.
// Generates a resized preview DataURL in real time.
// This method is only used in this demo; refer to the documentation for additional APIs.
const onCrop = () => {
  // Limit the maximum size of the preview image to avoid lag
  // when dragging a large image.
  // The cropper instance may not be initialized yet,
  // so use optional chaining (\`?.\`) or null checks when calling its methods.
  const dataURI = cropper.value?.getDataURL({
    maxWidth: 800,
    maxHeight: 800,
  })

  croppedPreview.value = dataURI ?? ''
}
<\/script>

<template>
  <div class="flex w-full flex-col gap-6">
    <div class="flex items-center gap-2">
      <ChooseFile @select="onSelectFile" />
    </div>

    <CropAndPreview :cropped-preview="croppedPreview">
      <!-- Required: \`ref="vpcRef"\` to bind the component instance. -->
      <VuePictureCropper
        ref="vpcRef"
        :img="originalPreview"
        :options="{
          viewMode: 2,
          crop: onCrop,
        }"
      />
    </CropAndPreview>
  </div>
</template>
`;export{e as default};
