---
outline: deep
---

# 快速上手

请注意只能在 Vue 3 项目里使用，且 Vue 版本号至少为 `{{ vueVersion }}` ，不支持 Vue 2 。

## 安装插件

使用 npm ：

```
npm install vue-picture-cropper
```

使用 yarn ：

```
yarn add vue-picture-cropper
```

使用 pnpm ：

```
pnpm add vue-picture-cropper
```

## 按需引入

在 Vue 组件里按需引入，模板和实例也仅限在组件内使用。

```ts
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
```

导入的模块说明：

| 模块名称          | 作用                                                    |
| :---------------- | :------------------------------------------------------ |
| VuePictureCropper | 组件的模板                                              |
| cropper           | 工具实例，可用于操作相关的 API ，必须用花括号导入该名称 |

## 基础用法

这里提供一个基础用法的代码片段介绍，完整用法可以参考在线演示的例子，提供了功能演示和源码参考。

### 使用 JavaScript

标准组件写法：

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

使用 script-setup 语法糖：

```vue
<script setup>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
</script>
```

### 使用 TypeScript

标准组件写法：

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

使用 script-setup 语法糖：

```vue
<script setup lang="ts">
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
</script>
```

### 渲染组件

导入的 `VuePictureCropper` 是一个组件，像平时引入子组件那样使用即可。

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

对于文件的选择以及裁剪结果，请通过 `<input type="file" >` 和 cropper 实例的 API 获取，可参考在线演示的例子源码。

- [使用组合式 API](./with-composition-api.md) （适合熟悉 Vue 3 风格的开发者）
- [使用选项式 API](./with-options-api.md) （适合习惯 Vue 2 风格的开发者）

## 多个裁剪框

从 `0.5.0` 版本开始支持在同一个页面里使用多个裁剪框，无需额外配置，可在 [多个裁剪框 demo](./multiple-cropper.md) 体验并参考 demo 源码使用。

:::tip
当存在多个裁剪框时，请在 `<input type="file" />` 选择了图片之后，需要重置掉原先裁剪目标的值，避免使用同一张图片无法触发 Watch 侦听导致实例切换失败。
:::

## License

[MIT License](https://github.com/chengpeiquan/vue-picture-cropper/blob/main/LICENSE) © 2020 [chengpeiquan](https://github.com/chengpeiquan)

<script setup lang="ts">
import pkg from '../../package.json'
const vueVersion = String(pkg.peerDependencies.vue).slice(1)
</script>
