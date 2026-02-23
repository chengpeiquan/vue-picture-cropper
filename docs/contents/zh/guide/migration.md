---
outline: deep
---

# 从 v0.x 迁移 {#migration-from-v0.x}

本文说明从 vue-picture-cropper v0.x 升级到 v1.x 时需要做的修改。

## 核心改动一览 {#core-changes}

虽然是一个 Breaking Change ，但 1.x 的 VuePictureCropper 组件 Props 仍然保持和 0.x 一致，主要有以下不同点：

1. [仅提供 ESM 版本](#esm-only)
2. [依赖与版本变化](#install-deps)
3. [组件内置样式的载入方式变化](#load-style)
4. [获取 Cropper 实例的方式变化](#cropper-instance)

## 仅提供 ESM 版本 {#esm-only}

从 1.x 开始，本库仅以 ESM（ES Modules）形式发布，不再提供 CommonJS (CJS) 或 IIFE 构建版本。

如果你的项目依赖 CJS / IIFE，请迁移到支持 ESM 的环境，例如使用 Vite、Nuxt 或现代 Webpack 版本。

## 依赖与版本变化 {#install-deps}

对比 0.x 仅需安装 `vue-picture-cropper` （外部依赖一起打包进 Bundle ）。

使用 1.x 时，需要同时安装并锁定 **cropperjs@^1**（表示仅安装 Cropper.js 1.x）。

```diff
-npm i vue-picture-cropper
+npm i vue-picture-cropper cropperjs@^1
```

这样做的原因与好处见 [设计理念：关于 Bundle 的调整](./design.md#bundle-adjustments) 。

## 样式改为手动导入 {#load-style}

1.x 不再自动注入样式，需要在项目入口文件中**主动导入** Cropper.js 与 VuePictureCropper 组件的样式。

在 `main.ts`（或 `main.js`）中添加：

```ts
// 导入 Cropper.js 样式和 VuePictureCropper 样式
import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'
```

这样做的原因与好处见 [设计理念：关于样式加载方式的变更](./design.md#load-styles) 。

## 获取 Cropper 实例 {#cropper-instance}

0.x 曾通过模块级变量 `cropper` 暴露裁剪实例；v1.x 已移除该方式，需通过 **组件 ref** 获取实例。

```diff
# 不再导出 cropper 变量
-import VuePictureCropper, { cropper } from 'vue-picture-cropper'
+import VuePictureCropper from 'vue-picture-cropper'
```

在 1.x ，需要为组件绑定 `ref`，从 ref 上获取 `cropper`：

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

之后通过 `cropper.value` 调用 `getDataURL()`、`getBlob()`、`getFile()` 等（详见 [组件 API](./component-api.md) 一文）。

:::tip 提示

注意 `cropper` 是一个计算属性，在 `<script />` 中需用 `cropper.value` ；

在模板中则会自动解包（了解：[在模板中解包的注意事项](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates)）。

:::

若希望不依赖模板 ref，可用组合式 API `useCropper` （1.x 新增），直接拿到与实例绑定的控制器（详见 [组合式函数 API](./hook-api.md) 一文）：

```vue
<script setup>
import { useCropper } from 'vue-picture-cropper'

const cropperProps = computed(() => ({
  img: pic.value ?? '',
  options: { viewMode: 2 },
}))

const [CropperComponent, cropper] = useCropper(cropperProps) // [!code focus:3]
// cropper.getDataURL()、cropper.getBlob()、cropper.getFile()
// 这些 API 用法与 v0.x 一致（无需 .value.cropper）
</script>

<template>
  <CropperComponent />
</template>
```

这样做的原因与好处见 [设计理念：关于实例的获取方式调整](./design.md#obtain-instance) 。

## 小结 {#summary}

按上述步骤修改后即可从 v0.x 平滑迁移到 v1.x。

若遇未覆盖的用法，可结合 [组件 API](./component-api.md)、[组合式函数 API](./hook-api.md) 与 [Cropper.js API](./cropperjs-api.md) 查阅。
