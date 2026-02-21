import { computed, ref } from 'vue'
import { useFilePreview } from './useFilePreview'

/**
 * Shared hook for the basic examples: file selection + original preview URL +
 * cropped preview URL. Manages local state only;
 */
export function useFileCropState(defaultImage?: string) {
  const selectedFile = ref<File | null>(null)
  const convertedPreview = useFilePreview(selectedFile)

  const originalPreview = computed(
    () => convertedPreview.value || defaultImage || '',
  )

  const croppedPreview = ref('')

  const onSelectFile = (file: File) => {
    selectedFile.value = file
  }

  const reset = () => {
    selectedFile.value = null
    croppedPreview.value = ''
  }

  const hasFile = computed(() => selectedFile.value != null)

  return {
    originalPreview,
    croppedPreview,
    onSelectFile,
    reset,
    hasFile,
  }
}
