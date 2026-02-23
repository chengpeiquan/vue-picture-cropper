<script setup lang="ts">
import { Button } from 'primevue'
import { useRouter } from 'vitepress'
import { useI18n } from 'vue-i18n'
import { withLocaleBase } from '../i18n'
import { cn } from '../utils/class-name'
import NpmVersionBadge from './NpmVersionBadge.vue'

const { go } = useRouter()
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center pt-[60px]">
    <div class="mb-6 w-[200px] max-w-full md:w-[400px]">
      <img src="/logo.svg" :alt="t('home.name')" />
    </div>

    <h1
      :class="
        cn(
          'mb-2 whitespace-pre-wrap text-center !font-bold text-primary',
          '!text-[32px] !leading-[40px]',
          'md:!text-[56px] md:!leading-[64px]',
        )
      "
    >
      {{ t('home.name') }}
    </h1>

    <p
      :class="
        cn(
          'mb-6 whitespace-pre-wrap text-center',
          'max-w-[300px] md:max-w-full',
          'text-[var(--vp-c-text-2)]',
          'text-lg leading-7',
          'md:text-2xl md:leading-9',
        )
      "
    >
      {{ t('home.description') }}
    </p>

    <NpmVersionBadge class="mb-16" />

    <div class="flex shrink-0 p-1.5">
      <Button rounded @click="go(withLocaleBase('/guide/quick-start'))">
        <div class="mx-2 flex items-center gap-2">
          <span class="font-bold">{{ t('home.start') }}</span>
          <svg
            class="fill-[var(--p-button-primary-color)]"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
          >
            <path
              d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
            />
          </svg>
        </div>
      </Button>
    </div>
  </div>
</template>
