<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import VuePictureCropper, {
  type VuePictureCropperRefValue,
} from 'vue-picture-cropper'
import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'

const smokeImage = ref('')
const smokeInstanceReady = ref('false')
const smokeDataUrl = ref('')
const smokeStyleLoaded = ref('false')
const cropperRef = ref<VuePictureCropperRefValue | null>(null)

const createImageDataUrl = (
  color: string,
  width: number,
  height: number,
): string => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('2d context is required to build smoke test images')
  }

  canvas.width = width
  canvas.height = height

  context.fillStyle = color
  context.fillRect(0, 0, width, height)
  context.fillStyle = '#ffffff'
  context.fillRect(20, 20, 32, 24)
  context.fillStyle = '#111827'
  context.fillRect(90, 60, 40, 30)

  return canvas.toDataURL('image/png')
}

const waitForCropper = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const cropper = cropperRef.value?.cropper
    if (cropper) {
      return cropper
    }

    await new Promise((resolve) => window.setTimeout(resolve, 50))
  }

  throw new Error('timed out waiting for the smoke cropper instance')
}

const loadSmokeImage = async () => {
  smokeImage.value = createImageDataUrl('#0f766e', 280, 200)
  smokeInstanceReady.value = 'false'
  await nextTick()
  await waitForCropper()
}

const runSmokeExport = async () => {
  const cropper = await waitForCropper()
  smokeDataUrl.value = cropper.getDataURL({ width: 120, height: 90 })
}

const smokePackageImported = Boolean(VuePictureCropper)
const smokeOptions = {
  viewMode: 1,
  autoCropArea: 1,
  ready: () => {
    smokeInstanceReady.value = 'true'
  },
}

onMounted(async () => {
  await nextTick()
  const rootElement = document.querySelector('.vpc-root')
  if (!rootElement) {
    return
  }

  const styles = getComputedStyle(rootElement)
  smokeStyleLoaded.value = styles.margin === '0px' ? 'true' : 'false'
})
</script>

<template>
  <main class="smoke-shell">
    <p data-testid="smoke-page-ready">true</p>
    <p data-testid="smoke-package-imported">
      {{ smokePackageImported }}
    </p>
    <p data-testid="smoke-style-loaded">
      {{ smokeStyleLoaded }}
    </p>
    <p data-testid="smoke-instance-ready">
      {{ smokeInstanceReady }}
    </p>
    <p data-testid="smoke-data-url">
      {{ smokeDataUrl }}
    </p>

    <div class="smoke-controls">
      <button type="button" @click="loadSmokeImage">Load smoke image</button>
      <button type="button" @click="runSmokeExport">Run smoke export</button>
    </div>

    <VuePictureCropper
      ref="cropperRef"
      :img="smokeImage"
      :box-style="{ width: '300px', height: '220px' }"
      :options="smokeOptions"
    />
  </main>
</template>

<style scoped>
.smoke-shell {
  display: grid;
  gap: 16px;
  padding: 24px;
}

.smoke-controls {
  display: flex;
  gap: 8px;
}
</style>
