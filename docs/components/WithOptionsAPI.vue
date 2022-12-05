<template>
  <div class="live-demo">
    <!-- Select a picture for cropping -->
    <section class="section">
      <p>{{ locales.tips }}</p>

      <!-- Set a button that invokes selecting an image -->
      <button class="select-picture">
        <span>{{ locales.selectPictureButtonText }}</span>
        <input
          ref="uploadInput"
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          @change="selectFile"
        />
      </button>
    </section>

    <!-- Crop result preview -->
    <section class="section" v-if="result.dataURL && result.blobURL">
      <p>{{ locales.previewTips.dataURL }}</p>
      <div class="preview">
        <img :src="result.dataURL" />
      </div>
      <p>{{ locales.previewTips.blob }}</p>
      <div class="preview">
        <img :src="result.blobURL" />
      </div>
      <p>{{ locales.previewTips.print }}</p>
    </section>

    <!-- A Popup for cropping -->
    <!-- You can replace it with the framework's Modal component -->
    <div class="modal-wrap" v-if="isShowModal">
      <div class="modal-mask"></div>
      <div class="modal-scroll-view">
        <div class="modal">
          <div class="modal-title">
            <span class="title">{{ locales.modal.title }}</span>
            <div class="tools">
              <button class="btn" @click="isShowModal = false">
                {{ locales.modal.btnCancelText }}
              </button>
              <button class="btn" @click="clear">
                {{ locales.modal.btnClearText }}
              </button>
              <button class="btn" @click="reset">
                {{ locales.modal.btnResetText }}
              </button>
              <button class="btn primary" @click="getResult">
                {{ locales.modal.btnCropText }}
              </button>
            </div>
          </div>

          <div class="modal-content">
            <!-- The component imported from `vue-picture-cropper` plugin -->
            <VuePictureCropper
              :boxStyle="{
                width: '100%',
                height: '100%',
                backgroundColor: '#f8f8f8',
                margin: 'auto',
              }"
              :img="pic"
              :options="{
                viewMode: 1,
                dragMode: 'crop',
                aspectRatio: 16 / 9,
              }"
              @ready="ready"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// Replace `../../lib` with `vue-picture-cropper`
import VuePictureCropper, { cropper } from '../../lib'
// Only used in demo
import { getLocales } from '../locales/live-demo'

export default defineComponent({
  components: {
    VuePictureCropper,
  },
  data() {
    return {
      locales: getLocales(),
      isShowModal: false,
      pic: '',
      result: {
        dataURL: '',
        blobURL: '',
      },
    }
  },
  methods: {
    /**
     * Select the picture to be cropped
     */
    selectFile(e: Event) {
      // Reset last selection and results
      this.pic = ''
      this.result.dataURL = ''
      this.result.blobURL = ''

      // Get selected files
      const { files } = e.target as HTMLInputElement
      if (!files || !files.length) return

      // Convert to dataURL and pass to the cropper component
      const file = files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Update the picture source of the `img` prop
        this.pic = String(reader.result)

        // Show the modal
        this.isShowModal = true

        // Clear selected files of input element
        if (!this.$refs.uploadInput) return
        this.$refs.uploadInput.value = ''
      }
    },

    /**
     * Get cropping results
     */
    async getResult() {
      if (!cropper) return
      const base64 = cropper.getDataURL()
      const blob: Blob | null = await cropper.getBlob()
      if (!blob) return

      const file = await cropper.getFile({
        fileName: this.locales.fileName,
      })

      console.log({ base64, blob, file })
      this.result.dataURL = base64
      this.result.blobURL = URL.createObjectURL(blob)
      this.isShowModal = false
    },

    /**
     * Clear the crop box
     */
    clear() {
      if (!cropper) return
      cropper.clear()
    },

    /**
     * Reset the default cropping area
     */
    reset() {
      if (!cropper) return
      cropper.reset()
    },

    /**
     * The ready event passed to Cropper.js
     */
    ready() {
      console.log('Cropper is ready.')
    },
  },
})
</script>

<style lang="less" scoped>
@import '../styles/live-demo.less';
</style>
