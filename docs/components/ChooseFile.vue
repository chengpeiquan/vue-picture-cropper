<script setup lang="ts">
import { FileUpload } from 'primevue'

defineProps<{
  onSelect: (file: File) => void
}>()
</script>

<template>
  <FileUpload
    mode="basic"
    custom-upload
    auto
    :choose-label="$t('examples.choose')"
    accept="image/*"
    severity="secondary"
    @select="
      (e) => {
        const selectedFile = e.files[0]
        onSelect(selectedFile)
      }
    "
  />
</template>
