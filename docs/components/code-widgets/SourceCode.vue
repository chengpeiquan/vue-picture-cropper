<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { onMounted, ref } from 'vue'
import { normalizeHtml, themes } from '../../utils/shiki-format'
import CodeTemplate from './CodeTemplate.vue'
import { type SourceCodeProps } from './types'

const props = defineProps<SourceCodeProps>()

const html = ref('')

const render = async () => {
  try {
    const rawHtml = await codeToHtml(props.code, {
      lang: props.lang,
      themes,
    })

    html.value = normalizeHtml(rawHtml)
  } catch {}
}

onMounted(render)
</script>

<template>
  <CodeTemplate :lang="lang" :code="html" :class-name="className" />
</template>
