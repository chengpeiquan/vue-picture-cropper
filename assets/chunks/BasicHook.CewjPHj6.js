const e=`<script setup lang="ts">
import { computed } from 'vue'

// Use the hook instead of the \`VuePictureCropper\` component + template ref.
import { type VuePictureCropperProps, useCropper } from 'vue-picture-cropper'

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

// Pass a computed so that \`img\` updates when the user selects a new file.
const cropperProps = computed<VuePictureCropperProps>(() => ({
  img: originalPreview.value ?? '',

  // Note: Do not pass methods that require a cropper instance here.
  // Please refer to the usage of \`cropper.onInstanceEffect\` below.
  options: {
    viewMode: 2,
  },
}))

// Returns [Component, cropper]. The second value is a thin wrapper, not the raw instance.
// Same usage as v0.x: call \`cropper.getDataURL()\` etc. directly (no \`.value.cropper\` chain).
const [CropperComponent, cropper] = useCropper(cropperProps)

// Please bind the event logic to \`element.addEventListener\` through \`cropper.onInstanceEffect\`.
cropper.onInstanceEffect((instance) => {
  if (!instance) return

  const handler = () => {
    const dataURI = instance.getDataURL({ maxWidth: 800, maxHeight: 800 })
    croppedPreview.value = dataURI || ''
  }

  // Bind the event to the element of the cropper instance.
  const el = instance.element
  el.addEventListener('crop', handler)

  // Return a cleanup function to remove the event listener.
  return () => {
    el.removeEventListener('crop', handler)
  }
})
<\/script>

<template>
  <div class="flex w-full flex-col gap-6">
    <ChooseFile @select="onSelectFile" />

    <CropAndPreview :cropped-preview="croppedPreview">
      <!-- Render the component returned by useCropper; no ref needed. -->
      <CropperComponent />
    </CropAndPreview>
  </div>
</template>
`;export{e as default};
