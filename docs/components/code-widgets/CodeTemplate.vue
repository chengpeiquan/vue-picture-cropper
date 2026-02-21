<script setup lang="ts">
import { cn } from '../../utils/class-name'
import { type SourceCodeProps } from './types'

defineProps<SourceCodeProps>()
</script>

<template>
  <!-- VitePress code block style -->
  <div v-if="code" :class="cn(`language-${lang}`, className)">
    <button title="Copy Code" class="copy" />
    <span class="lang">{{ lang }}</span>
    <pre
      class="shiki shiki-themes github-light github-dark"
      style="
        --shiki-light: #24292e;
        --shiki-dark: #e1e4e8;
        --shiki-light-bg: #fff;
        --shiki-dark-bg: #24292e;
      "
      tabindex="0"
      dir="ltr"
      v-html="code"
    />
  </div>
</template>
