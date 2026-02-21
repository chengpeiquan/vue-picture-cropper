<script setup lang="ts">
import { capitalize } from '@bassist/utils'
import { Fieldset } from 'primevue'
import { codeToHtml } from 'shiki'
import { onMounted, ref } from 'vue'
import { normalizeHtml, themes } from '../../utils/shiki-format'
import CodeTemplate from './CodeTemplate.vue'
import { type SourceCodeProps } from './types'

const props = defineProps<SourceCodeProps>()

interface HtmlFragment {
  name: string
  lang: string
  html: string
}

const htmlFragments = ref<HtmlFragment[]>([])

const tsRegex =
  /\/\/\s*@doc-start\s+([^\r\n]+)\r?\n([\s\S]*?)\/\/\s*@doc-end\s+\1/g
const htmlRegex =
  /<!--\s*@doc-start\s+([^\r\n]+)\s*-->\s*([\s\S]*?)\s*<!--\s*@doc-end\s+\1\s*-->/g

interface CodeSection {
  name: string
  lang: string
  content: string
}

const extractCodeSections = (code: string): CodeSection[] => {
  const sections: CodeSection[] = []
  let match: RegExpExecArray | null

  const addMatches = (regex: RegExp, defaultLang: string) => {
    while ((match = regex.exec(code)) !== null) {
      const header = match[1].trim() // 形如 "multiple-component:typescript"
      const content = match[2].trim()
      const [name, lang] = header.split(':').map((s) => s.trim())
      sections.push({
        name,
        lang: lang ?? defaultLang,
        content,
      })
    }
  }

  addMatches(tsRegex, 'ts')
  addMatches(htmlRegex, 'html')

  return sections
}

const render = async () => {
  try {
    const sections = extractCodeSections(props.code)

    // 如果没有片段，就用全部源码作为一个默认片段
    const sectionsToRender =
      sections.length > 0
        ? sections
        : [{ name: 'full', lang: props.lang, content: props.code }]

    const htmlList: HtmlFragment[] = []

    for (const section of sectionsToRender) {
      const rawHtml = await codeToHtml(section.content, {
        lang: section.lang,
        themes,
      })

      htmlList.push({
        name: section.name,
        lang: section.lang,
        html: normalizeHtml(rawHtml),
      })
    }

    htmlFragments.value = htmlList
  } catch (e) {
    console.error(e)
  }
}

onMounted(render)
</script>

<template>
  <div v-if="htmlFragments.length" class="flex flex-col">
    <div
      v-for="section in htmlFragments"
      :key="section.name"
      class="box-border p-4"
    >
      <Fieldset
        :legend="
          $t('examples.codeFragmentTitle', { name: capitalize(section.name) })
        "
        :toggleable="true"
      >
        <CodeTemplate
          :lang="section.lang"
          :code="section.html"
          :class-name="className"
        />
      </Fieldset>
    </div>
  </div>
</template>
