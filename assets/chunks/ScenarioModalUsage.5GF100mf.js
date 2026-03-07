const e=`<script setup lang="ts">
import { createTemplatePromise } from '@vueuse/core'
import { Button, Dialog } from 'primevue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { type VuePictureCropperProps, useCropper } from 'vue-picture-cropper'

import ChooseFile from '../components/ChooseFile.vue'
import CropAndPreview from '../components/CropAndPreview.vue'
import { useFilePreview } from '../hooks/useFilePreview'
import { cn } from '../utils/class-name'

import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'

const { t } = useI18n()

// ------ Modal State ------

const selectedFile = ref<File | null>(null)
const convertedPreview = useFilePreview(selectedFile)
const croppedResult = ref('')

// Template as Promise. Useful for constructing custom Dialogs, Modals, Toasts, etc.
// https://vueuse.org/core/createtemplatepromise/
const CropperModalPromise = createTemplatePromise<string>({
  singleton: true,
})

const openModal = async (file: File) => {
  // First, save the selected file to a variable.
  selectedFile.value = file

  // Then, open the modal.
  // Wait for the modal to be closed and return the result.
  const result = await CropperModalPromise.start()

  // If the modal is closed and the result is not empty, save the result to the croppedResult variable.
  if (result) {
    croppedResult.value = result
  }
}

// ------ Cropper State ------

const cropperProps = computed<VuePictureCropperProps>(() => ({
  img: convertedPreview.value ?? '',
  options: { viewMode: 2 },
}))

const [CropperComponent, cropper] = useCropper(cropperProps)
<\/script>

<template>
  <div class="flex w-full flex-col gap-6">
    <ChooseFile @select="openModal" />

    <!-- Preview only in this example -->
    <CropAndPreview
      v-if="croppedResult"
      :cropper-area-visible="false"
      :cropped-preview="croppedResult"
    />

    <!-- Cropping within the modal in this example  -->
    <CropperModalPromise v-slot="{ resolve, reject }">
      <Dialog
        visible
        modal
        :closable="false"
        :header="t('examples.cropArea')"
        :content-class="cn('flex w-[600px] max-w-[90vw] flex-col gap-4')"
      >
        <div class="aspect-[4/3] w-full overflow-hidden rounded-md">
          <!-- Render the component returned by useCropper; no ref needed. -->
          <CropperComponent />
        </div>

        <div class="flex justify-end gap-2">
          <Button
            class="min-w-24"
            type="button"
            :label="t('examples.cancel')"
            severity="secondary"
            @click="() => reject('')"
          />

          <Button
            class="min-w-24"
            type="button"
            :label="t('examples.confirm')"
            @click="() => resolve(cropper.getDataURL())"
          />
        </div>
      </Dialog>
    </CropperModalPromise>
  </div>
</template>
`;export{e as default};
