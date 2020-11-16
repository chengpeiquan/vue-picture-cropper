<script lang="ts">
import { defineComponent } from 'vue';
import VueImageCropper from '@/vue-image-cropper.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueImageCropper
  }
});
</script>

<template>
  <div id="app">
    <vue-image-cropper />
  </div>
</template>
