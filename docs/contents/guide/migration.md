---
outline: deep
---

# Migration from v0.x {#migration-from-v0.x}

This page describes the changes required when upgrading from vue-picture-cropper v0.x to v1.x.

## Core changes {#core-changes}

Although this is a breaking change, the VuePictureCropper component props in 1.x remain the same as in 0.x. The main differences are:

1. [ESM only](#esm-only)
2. [Dependencies](#install-deps)
3. [Import styles](#load-style)
4. [Cropper instance](#cropper-instance)

## ESM only {#esm-only}

As of 1.x, this library is published as ESM (ES Modules) only. CommonJS (CJS) and IIFE builds are no longer provided.

If your project relies on CJS or IIFE, migrate to an ESM-capable setup, for example Vite, Nuxt, or a recent Webpack version.

## Dependencies {#install-deps}

Unlike 0.x, where you only needed to install `vue-picture-cropper` (external dependencies were bundled), with 1.x you must install and pin **cropperjs@^1** (i.e. Cropper.js 1.x only).

```diff
-npm i vue-picture-cropper
+npm i vue-picture-cropper cropperjs@^1
```

For the rationale and benefits, see [Design Philosophy: Bundle adjustments](./design.md#bundle-adjustments).

## Import styles {#load-style}

1.x no longer injects styles automatically. You must **import** Cropper.js and VuePictureCropper component styles in your project entry file.

Add the following to `main.ts` (or `main.js`):

```ts
// Import Cropper.js styles and VuePictureCropper styles
import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'
```

For the rationale and benefits, see [Design Philosophy: Style loading](./design.md#load-styles).

## Cropper instance {#cropper-instance}

0.x exposed the cropper instance via a module-level `cropper` variable; v1.x removes this. You must get the instance from a **component ref**.

```diff
# cropper is no longer exported
-import VuePictureCropper, { cropper } from 'vue-picture-cropper'
+import VuePictureCropper from 'vue-picture-cropper'
```

In 1.x, bind a `ref` to the component and read `cropper` from it:

```vue
<script setup>
import VuePictureCropper from 'vue-picture-cropper'

const vpcRef = ref(null) // [!code focus:2]
const cropper = computed(() => vpcRef.value?.cropper ?? null)
</script>

<template>
  <!-- [!code focus] -->
  <VuePictureCropper ref="vpcRef" />
</template>
```

Then use `cropper.value` to call `getDataURL()`, `getBlob()`, `getFile()`, etc. (see [Component API](./component-api.md)).

:::tip

`cropper` is a computed ref: in `<script>` you must use `cropper.value`; in the template it is [automatically unwrapped](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates).

:::

If you prefer not to rely on a template ref, you can use the **useCropper** composable (new in 1.x) to get a controller bound to the instance (see [Composable API](./hook-api.md)):

```vue
<script setup>
import { useCropper } from 'vue-picture-cropper'

const cropperProps = computed(() => ({
  img: pic.value ?? '',
  options: { viewMode: 2 },
}))

const [CropperComponent, cropper] = useCropper(cropperProps) // [!code focus:3]
// cropper.getDataURL(), cropper.getBlob(), cropper.getFile()
// — same usage as v0.x (no .value.cropper)
</script>

<template>
  <CropperComponent />
</template>
```

For the rationale and benefits, see [Design Philosophy: Obtaining the instance](./design.md#obtain-instance).

## Summary {#summary}

After applying the steps above, you can migrate from v0.x to v1.x.

For usage not covered here, refer to [Component API](./component-api.md), [Composable API](./hook-api.md), and [Cropper.js API](./cropperjs-api.md).
