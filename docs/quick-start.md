---
outline: deep
---

# Quick Start

Please note that it can only be used in Vue 3 projects, and the Vue version number is at least `{{ vueVersion }}` . Vue 2 is not supported.

## Installation

With npm ：

```
npm install vue-picture-cropper
```

With yarn ：

```
yarn add vue-picture-cropper
```

With pnpm ：

```
pnpm add vue-picture-cropper
```

## Import on demand

Import on demand in Vue components, the template and instance are only used within components.

```ts
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
```

Imported module description:

| Module            | Description                                                                                           |
| :---------------- | :---------------------------------------------------------------------------------------------------- |
| VuePictureCropper | Component of the plugin                                                                               |
| cropper           | Tool instance, which can be used to operate related APIs, the name must be imported with curly braces |

## Usage

Here is a code snippet introduction for basic usage. For complete usage, please refer to the online demo example, which provides function demo and source code reference.

### With JavaScript

In standard component:

```vue{2,5-7}
<script>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

export default {
  components: {
    VuePictureCropper,
  },
  // ...
}
</script>
```

In script-setup syntactic sugar:

```vue
<script setup>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
</script>
```

### With TypeScript

In standard component:

```vue{3,6-8}
<script lang="ts">
import { defineComponent } from 'vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

export default defineComponent({
  components: {
    VuePictureCropper,
  },
  // ...
})
</script>
```

In script-setup syntactic sugar:

```vue
<script setup lang="ts">
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
</script>
```

### Rendering

The imported `VuePictureCropper` is a component, which can be used as a subcomponent.

```vue
<template>
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
</template>
```

For file selection and cropping results, please obtain them through `<input type="file" >` and the cropper instance API, and refer to the example source code of live demos.

- [With Composition API](./with-composition-api.md) (suitable for developers familiar with the Vue 3 syntaxes)
- [With Options API](./with-options-api.md) (suitable for developers accustomed to Vue 2 syntaxes)

## Multiple Cropper

Since `0.5.0` version, multiple cropper can be used in the same page without additional configuration. You can experience it in [Multiple Cropper demo](./multiple-cropper.md) and refer to the demo source code.

:::tip
When there are multiple cropper, please reset the value of the original cropping target after `<input type="file" />` selects the image, to avoid using the same image that cannot trigger Watch listening and cause instance switching failure.
:::

## License

[MIT License](https://github.com/chengpeiquan/vue-picture-cropper/blob/main/LICENSE) © 2020 [chengpeiquan](https://github.com/chengpeiquan)

<script setup lang="ts">
import pkg from '../package.json'
const vueVersion = String(pkg.peerDependencies.vue).slice(1)
</script>
