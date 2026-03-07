<script setup lang="ts">
import { computed, ref } from 'vue'
import VuePictureCropper, {
  type VuePictureCropperProps,
  type VuePictureCropperRefValue,
  useCropper,
} from '../../src/index'

const sleep = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms))

const createImageDataUrl = (
  color: string,
  width: number,
  height: number,
): string => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('2d context is required to build e2e fixture images')
  }

  canvas.width = width
  canvas.height = height

  context.fillStyle = color
  context.fillRect(0, 0, width, height)
  context.fillStyle = '#ffffff'
  context.fillRect(Math.round(width * 0.15), Math.round(height * 0.2), 24, 18)
  context.fillStyle = '#111827'
  context.fillRect(Math.round(width * 0.55), Math.round(height * 0.45), 30, 24)

  return canvas.toDataURL('image/png')
}

const readImageSize = (dataUrl: string) =>
  new Promise<string>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(`${image.naturalWidth}x${image.naturalHeight}`)
    image.onerror = () => reject(new Error('failed to decode exported image'))
    image.src = dataUrl
  })

async function waitFor<T>(getter: () => T | null | undefined, timeout = 5000) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeout) {
    const value = getter()
    if (value) {
      return value
    }

    await sleep(50)
  }

  throw new Error('timed out waiting for cropper state')
}

const imageFixtures = {
  componentPrimary: createImageDataUrl('#ef4444', 320, 220),
  componentSecondary: createImageDataUrl('#0ea5e9', 260, 200),
  hookPrimary: createImageDataUrl('#16a34a', 300, 210),
  hookSecondary: createImageDataUrl('#f59e0b', 240, 180),
  presetPrimary: createImageDataUrl('#7c3aed', 360, 240),
}

const componentRef = ref<VuePictureCropperRefValue | null>(null)
const componentImg = ref('')
const componentReady = ref('false')
const componentDataUrl = ref('')
const componentBlobType = ref('')
const componentFileName = ref('')

const componentOptions = {
  viewMode: 1,
  autoCropArea: 1,
  ready: () => {
    componentReady.value = 'true'
  },
}

const componentCropper = () => componentRef.value?.cropper ?? null

async function loadComponentImage() {
  componentImg.value = imageFixtures.componentPrimary
  componentReady.value = 'false'
  await waitFor(componentCropper)
}

async function replaceComponentImage() {
  componentImg.value = imageFixtures.componentSecondary
  await waitFor(componentCropper)
}

async function runComponentExport() {
  const cropper = await waitFor(componentCropper)
  componentDataUrl.value = cropper.getDataURL({ width: 120, height: 90 })

  const blob = await cropper.getBlob({ width: 120, height: 90 })
  componentBlobType.value = blob?.type ?? ''

  const file = await cropper.getFile({
    width: 120,
    height: 90,
    fileName: 'component-export',
  })
  componentFileName.value = file?.name ?? ''
}

const fixedSizeRef = ref<VuePictureCropperRefValue | null>(null)
const roundRef = ref<VuePictureCropperRefValue | null>(null)
const presetFixedSize = ref('')
const presetRoundType = ref('')

const fixedSizeCropper = () => fixedSizeRef.value?.cropper ?? null
const roundCropper = () => roundRef.value?.cropper ?? null

async function runPresetExport() {
  const fixedCropper = await waitFor(fixedSizeCropper)
  const fixedDataUrl = fixedCropper.getDataURL()
  presetFixedSize.value = await readImageSize(fixedDataUrl)

  const roundedCropper = await waitFor(roundCropper)
  const roundedBlob = await roundedCropper.getBlob()
  presetRoundType.value = roundedBlob?.type ?? ''
}

const hookImg = ref('')
const hookDataUrl = ref('')
const hookFileName = ref('')
const hookEffectCount = ref(0)
const hookInstanceReady = ref('false')
const hookControlsRan = ref('false')

const hookProps = computed<VuePictureCropperProps>(() => ({
  img: hookImg.value,
  boxStyle: {
    width: '280px',
    height: '210px',
  },
  options: {
    viewMode: 1,
    autoCropArea: 1,
  },
}))

const [HookCropper, hookApi] = useCropper(hookProps)

hookApi.onInstanceEffect(() => {
  hookEffectCount.value += 1
  hookInstanceReady.value = 'true'
})

async function loadHookImage() {
  hookImg.value = imageFixtures.hookPrimary
  hookInstanceReady.value = 'false'
  await waitFor(() => hookApi.getInstance())
}

async function replaceHookImage() {
  hookImg.value = imageFixtures.hookSecondary
  await waitFor(() => hookApi.getInstance())
}

async function runHookExport() {
  await waitFor(() => hookApi.getInstance())
  hookDataUrl.value = hookApi.getDataURL({ width: 120, height: 90 })
  const file = await hookApi.getFile({
    width: 120,
    height: 90,
    fileName: 'hook-export',
  })
  hookFileName.value = file?.name ?? ''
}

async function runHookControls() {
  await waitFor(() => hookApi.getInstance())
  hookApi.clear()
  hookApi.reset()
  hookControlsRan.value = 'true'
}
</script>

<template>
  <main class="app-shell">
    <h1>vue-picture-cropper e2e harness</h1>

    <section class="panel">
      <h2>Component scenario</h2>
      <div class="controls">
        <button type="button" @click="loadComponentImage">
          Load component image
        </button>
        <button type="button" @click="replaceComponentImage">
          Replace component image
        </button>
        <button type="button" @click="runComponentExport">
          Run component export
        </button>
      </div>

      <p data-testid="component-ready">
        {{ componentReady }}
      </p>
      <p data-testid="component-data-url">
        {{ componentDataUrl }}
      </p>
      <p data-testid="component-blob-type">
        {{ componentBlobType }}
      </p>
      <p data-testid="component-file-name">
        {{ componentFileName }}
      </p>

      <VuePictureCropper
        ref="componentRef"
        :img="componentImg"
        :box-style="{ width: '300px', height: '220px' }"
        :options="componentOptions"
      />
    </section>

    <section class="panel">
      <h2>Preset scenarios</h2>
      <div class="controls">
        <button type="button" @click="runPresetExport">
          Run preset export
        </button>
      </div>

      <p data-testid="preset-fixed-size">
        {{ presetFixedSize }}
      </p>
      <p data-testid="preset-round-type">
        {{ presetRoundType }}
      </p>

      <div class="preset-grid">
        <VuePictureCropper
          ref="fixedSizeRef"
          :img="imageFixtures.presetPrimary"
          :box-style="{ width: '260px', height: '180px' }"
          :options="{ viewMode: 1, autoCropArea: 1 }"
          :preset-mode="{ mode: 'fixedSize', width: 160, height: 120 }"
        />

        <VuePictureCropper
          ref="roundRef"
          :img="imageFixtures.presetPrimary"
          :box-style="{ width: '260px', height: '180px' }"
          :options="{ viewMode: 1, autoCropArea: 1 }"
          :preset-mode="{ mode: 'round', width: 100, height: 100 }"
        />
      </div>
    </section>

    <section class="panel">
      <h2>Hook scenario</h2>
      <div class="controls">
        <button type="button" @click="loadHookImage">Load hook image</button>
        <button type="button" @click="replaceHookImage">
          Replace hook image
        </button>
        <button type="button" @click="runHookExport">Run hook export</button>
        <button type="button" @click="runHookControls">
          Run hook controls
        </button>
      </div>

      <p data-testid="hook-instance-ready">
        {{ hookInstanceReady }}
      </p>
      <p data-testid="hook-effect-count">
        {{ hookEffectCount }}
      </p>
      <p data-testid="hook-data-url">
        {{ hookDataUrl }}
      </p>
      <p data-testid="hook-file-name">
        {{ hookFileName }}
      </p>
      <p data-testid="hook-controls-ran">
        {{ hookControlsRan }}
      </p>

      <HookCropper />
    </section>
  </main>
</template>

<style scoped>
.app-shell {
  display: grid;
  gap: 24px;
  padding: 24px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.panel {
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d4d4d8;
  border-radius: 12px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.controls button {
  border: 1px solid #18181b;
  border-radius: 999px;
  background: #ffffff;
  padding: 8px 12px;
  cursor: pointer;
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
</style>
