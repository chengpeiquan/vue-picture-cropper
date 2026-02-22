<script setup lang="ts">
import { cn } from '../utils/class-name'

defineProps<{
  croppedPreview: string
}>()

const blockClassName = cn(
  'flex min-w-0 flex-1 flex-col gap-4',
  'border border-[var(--p-tabs-tablist-border-color)]',
  'box-border rounded-md p-4',
)

const titleClassName = cn('!m-0 text-sm font-bold text-primary')

const contentClassName = cn('aspect-[4/3] w-full overflow-hidden rounded-md')
</script>

<template>
  <div class="flex w-full flex-col gap-4 sm:flex-row">
    <div :class="blockClassName">
      <p :class="titleClassName">
        {{ $t('examples.cropArea') }}
      </p>

      <div :class="contentClassName">
        <slot />
      </div>
    </div>

    <div :class="blockClassName">
      <p :class="titleClassName">
        {{ $t('examples.previewArea') }}
      </p>

      <div
        :class="
          cn(
            contentClassName,
            'flex items-center justify-center',
            'bg-zinc-100 dark:bg-zinc-800',
          )
        "
      >
        <img
          v-if="croppedPreview"
          :src="croppedPreview"
          alt="Crop preview"
          class="size-auto max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  </div>
</template>
x
