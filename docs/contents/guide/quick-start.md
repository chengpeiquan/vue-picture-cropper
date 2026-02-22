---
outline: deep
---

# Quick Start

<NpmVersionBadge class="my-6" />

This package is a Vue component wrapper for Cropper.js v1.

::: tip Note
It can only be used in Vue 3 projects, and the Vue version must be at least `{{ vueVersion }}`. Vue 2 is not supported.

To learn why we use Cropper.js 1.x instead of 2.x, see [Design Concept](/guide/design).
:::

## Installation

To ensure the correct version of Cropper.js is installed, copy and run the following command.

::: code-group

```sh [npm]
$ npm add vue-picture-cropper cropperjs@^1
```

```sh [pnpm]
$ pnpm add vue-picture-cropper cropperjs@^1
```

```sh [yarn]
$ yarn add vue-picture-cropper cropperjs@^1
```

```sh [bun]
$ bun add vue-picture-cropper cropperjs@^1
```

:::

## Import styles

Import the styles in your project entry file (e.g. `main.ts` or `main.js`).

```ts [main.ts]
// Import Cropper.js styles and VuePictureCropper styles
import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'
```

## Usage

Starting from 1.x, this package provides two ways to render the cropper.

### Using VuePictureCropper

This is the traditional approach, supported since 0.x, with some differences from 0.x. As of 1.x, the module-level `cropper` instance variable is deprecated. If you are upgrading, see [Migration from v0.x](/guide/migration).

We recommend using the script-setup syntax:

::: code-group

```vue [JavaScript]
<!-- This is the script section of the Vue component -->
<script setup>
import VuePictureCropper from 'vue-picture-cropper'

// Bind a ref to the component
const vpcRef = ref(null)

// Derive the Cropper instance from the component ref
// to use getFile() etc. for the crop result
const cropper = computed(() => vpcRef.value?.cropper ?? null)
</script>
```

```vue [Template]
<!-- This is the template section of the Vue component -->
<template>
  <!-- Render the imported VuePictureCropper component -->
  <VuePictureCropper
    ref="vpcRef"
    :img="pic"
    :options="{
      viewMode: 2,
    }"
  />
</template>
```

:::

::: details Prefer the standard component format?

If you are new to Vue 3, you can also use the standard component format (without script-setup):

::: code-group

```vue [JavaScript]
<!-- This is the script section of the Vue component -->
<script>
import { useCropper } from 'vue-picture-cropper'

export default defineComponent({
  setup() {
    // Bind a ref to the component
    const vpcRef = ref(null)

    // Derive the Cropper instance from the component ref to use getFile() etc. for the crop result
    const cropper = computed(() => vpcRef.value?.cropper ?? null)

    // Return them so they can be used in the template
    return {
      vpcRef,
      cropper,
    }
  },
})
</script>
```

```vue [Template]
<!-- This is the template section of the Vue component -->
<template>
  <!-- Render the imported VuePictureCropper component -->
  <VuePictureCropper
    ref="vpcRef"
    :img="pic"
    :options="{
      viewMode: 2,
    }"
  />
</template>
```

:::

Full example: [Basic usage of VuePictureCropper](../examples/basic-component.md)

### Using useCropper

This API is available from 1.x. The composable makes it easier to work with the Cropper instance and is well-suited for managing multiple croppers in one component.

We recommend using the script-setup syntax:

::: code-group

```vue [JavaScript]
<!-- This is the script section of the Vue component -->
<script setup>
import { useCropper } from 'vue-picture-cropper'

// Pass reactive data via computed props
const cropperProps = computed(() => ({
  img: pic.value ?? '',
  options: {
    viewMode: 2,
  },
}))

// CropperComponent and cropper are bound; you can use the cropper instance
const [CropperComponent, cropper] = useCropper(cropperProps)
</script>
```

```vue [Template]
<!-- This is the template section of the Vue component -->
<template>
  <CropperComponent />
</template>
```

:::

::: details Prefer the standard component format?

If you are new to Vue 3, you can also use the standard component format (without script-setup):

::: code-group

```vue [JavaScript]
<!-- This is the script section of the Vue component -->
<script>
import { useCropper } from 'vue-picture-cropper'

export default defineComponent({
  setup() {
    const cropperProps = computed(() => ({
      img: pic.value ?? '',
      options: {
        viewMode: 2,
      },
    }))

    // CropperComponent is a runtime component;
    // render it with <component :is="CropperComponent" />
    const [CropperComponent, cropper] = useCropper(cropperProps)

    // Return them so they can be used in the template
    return {
      CropperComponent,
      cropper,
    }
  },
})
</script>
```

```vue [Template]
<!-- This is the template section of the Vue component -->
<template>
  <!-- With the standard component format, use a dynamic component to render CropperComponent -->
  <component :is="CropperComponent" />
</template>
```

:::

Full example: [Basic usage of useCropper](../examples/basic-hook.md)

## Multiple Croppers

From 1.x, whether you use VuePictureCropper or useCropper, you can easily manage multiple instances in a single component.

See the examples:

- [Multiple VuePictureCropper instances in one component](../examples/multiple-component.md)
- [Multiple useCropper instances in one component](../examples/multiple-hook.md)

## License

[MIT License](https://github.com/chengpeiquan/vue-picture-cropper/blob/main/LICENSE) © 2020 [chengpeiquan](https://github.com/chengpeiquan)

<script setup lang="ts">
import { pkg } from '../../shared/pkg-data'
import NpmVersionBadge from '../../components/NpmVersionBadge.vue'

const vueVersion = pkg.peerDependencies.vue
</script>
