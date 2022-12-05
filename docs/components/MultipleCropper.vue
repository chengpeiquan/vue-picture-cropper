<template>
  <div class="multiple-wrap">
    <div class="item">
      <Cropper />
    </div>
    <div class="item">
      <Cropper />
    </div>
  </div>
</template>

<script setup lang="ts">
import Cropper from './WithCompositionAPI.vue'
</script>

<style lang="less" scoped>
.multiple-wrap {
  display: flex;
  .item {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    margin-right: 48px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
