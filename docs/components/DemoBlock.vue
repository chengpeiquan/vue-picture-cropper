<script setup lang="ts">
import { Message, Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue'
import { type Component, computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { pkg } from '../shared/pkg-data'
import CodeFragments from './code-widgets/CodeFragments.vue'
import SourceCode from './code-widgets/SourceCode.vue'
import ExternalLinkIcon from './icons/ExternalLink.vue'
import PictureIcon from './icons/Picture.vue'
import VueIcon from './icons/Vue.vue'

const { t } = useI18n()

const props = defineProps<{
  filename: string
  type?: 'source-code' | 'code-fragments'
}>()

enum TabValue {
  LiveDemo = 'live-demo',
  SourceCode = 'source-code',
}

const filename = computed(() => `${props.filename}.vue`)

const remoteFile = computed(() => {
  return `${pkg.repository.url}/blob/main/docs/examples/${filename.value}`
})

const demoPath = computed(() => {
  return `../examples/${filename.value}`
})

const renderLiveDemo = async () => {
  const mod = await import(demoPath.value)
  return mod.default
}

const renderSourceCode = async () => {
  const mod = await import(`${demoPath.value}?raw`)
  return mod.default
}

const liveDemo = ref<Component | null>(null)
const sourceCode = ref('')

const init = async () => {
  liveDemo.value = await renderLiveDemo()
  sourceCode.value = await renderSourceCode()
}

onMounted(init)
</script>

<template>
  <Tabs :value="TabValue.LiveDemo" class="my-12 overflow-hidden rounded-lg">
    <TabList>
      <Tab :value="TabValue.LiveDemo" class="flex items-center">
        <PictureIcon class="size-6" />
        {{ t('examples.liveDemo') }}
      </Tab>

      <Tab :value="TabValue.SourceCode" class="flex items-center">
        <VueIcon class="size-5" />
        {{ t('examples.sourceCode') }}
      </Tab>
    </TabList>

    <TabPanels class="!p-0">
      <TabPanel :value="TabValue.LiveDemo">
        <div class="box-border w-full p-6">
          <component :is="liveDemo" v-if="liveDemo" />
        </div>
      </TabPanel>

      <TabPanel :value="TabValue.SourceCode">
        <div class="box-border w-full p-4">
          <Message severity="success">
            <I18nT keypath="examples.viewSourceInfo" tag="span">
              <template #filename>
                <a
                  :href="remoteFile"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="!text-primary"
                >
                  <span class="inline-flex items-center gap-1 underline">
                    {{ filename }}
                    <ExternalLinkIcon />
                  </span>
                </a>
              </template>
            </I18nT>
          </Message>
        </div>

        <template v-if="sourceCode">
          <CodeFragments
            v-if="type === 'code-fragments'"
            :code="sourceCode"
            lang="vue"
            class="!m-0 w-full"
          />
          <SourceCode
            v-else
            :code="sourceCode"
            lang="vue"
            class="!m-0 w-full"
          />
        </template>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
