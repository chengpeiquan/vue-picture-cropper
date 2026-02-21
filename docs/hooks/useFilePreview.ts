import { type Ref, onBeforeUnmount, ref, watch } from 'vue'

/**
 * UseFilePreview automatically manages local file preview URLs
 *
 * @param file Optional File object
 * @param enableObjectUrl Whether to use URL.createObjectURL (default true)
 */
export const useFilePreview = (
  fileRef: Ref<File | null>,
  enableObjectUrl = true,
) => {
  const preview = ref<string>('')

  const currentObjectUrl = ref<string | null>(null)

  const updatePreview = (file: File | null) => {
    // Revoke old object URL
    if (currentObjectUrl.value) {
      URL.revokeObjectURL(currentObjectUrl.value)
      currentObjectUrl.value = null
    }

    if (!file) {
      preview.value = ''
      return
    }

    if (enableObjectUrl) {
      const url = URL.createObjectURL(file)
      currentObjectUrl.value = url
      preview.value = url
    } else {
      // FileReader -> Data URL
      const reader = new FileReader()
      reader.onload = () => {
        preview.value = String(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  watch(fileRef, updatePreview, { immediate: true })

  onBeforeUnmount(() => {
    if (currentObjectUrl.value) {
      URL.revokeObjectURL(currentObjectUrl.value)
    }
  })

  return preview
}
