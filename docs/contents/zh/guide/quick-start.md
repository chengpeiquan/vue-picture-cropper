---
outline: deep
---

# 快速上手

<NpmVersionBadge class="my-6" />

本包是 Cropper.js v1 版本 的 Vue 组件包装器。

::: tip 提醒
请注意只能在 Vue 3 项目里使用，且 Vue 版本号至少为 `{{ vueVersion }}` ，不支持 Vue 2 。

若想了解为何选用 Cropper.js 1.x 而非 2.x，可参阅 [设计理念](/zh/guide/design)。
:::

## 安装

为确保 Cropper.js 的版本正确，请复制以下命令安装。

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

## 导入样式

请在项目入口文件（如 `main.ts` 或 `main.js` ）中导入样式。

```ts [main.ts]
// 导入 Cropper.js 样式和 VuePictureCropper 样式
import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'
```

## 使用方式

从本包 1.x 版本开始，提供两种渲染方式。

### 使用 VuePictureCropper

这是传统方式，从 0.x 版本便提供了支持，但与 0.x 略有不同，从 1.x 开始弃用了模块级别的 `cropper` 实例变量，如果您是老用户，请参考 [从 v0.x 迁移](/zh/guide/migration) 一文。

推荐使用 script-setup 语法糖：

::: code-group

```vue [JavaScript]
<!-- 这是 Vue 组件的 script 部分 -->
<script setup>
import VuePictureCropper from 'vue-picture-cropper'

// 为组件绑定 ref 变量
const vpcRef = ref(null)

// 从组件 ref 上派生 Cropper 实例，可以操作 getFile 等方法获取裁剪结果
const cropper = computed(() => vpcRef.value?.cropper ?? null)
</script>
```

```vue [Template]
<!-- 这是 Vue 组件的 template 部分 -->
<template>
  <!-- 直接渲染导入的 VuePictureCropper 组件 -->
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

::: details 想使用标准组件？

如果初接触 Vue3 ，也可以使用标准组件写法：

::: code-group

```vue [JavaScript]
<!-- 这是 Vue 组件的 script 部分 -->
<script>
import { useCropper } from 'vue-picture-cropper'

export default defineComponent({
  setup() {
    // 为组件绑定 ref 变量
    const vpcRef = ref(null)

    // 从组件 ref 上派生 Cropper 实例，可以操作 getFile 等方法获取裁剪结果
    const cropper = computed(() => vpcRef.value?.cropper ?? null)

    // 记得 return 出去，才可以在 template 使用
    return {
      vpcRef,
      cropper,
    }
  },
})
</script>
```

```vue [Template]
<!-- 这是 Vue 组件的 template 部分 -->
<template>
  <!-- 直接渲染导入的 VuePictureCropper 组件 -->
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

完整示例：[VuePictureCropper 的基础用法](../examples/basic-component.md)

### 使用 useCropper

这是从 1.x 开始提供的 API ，使用该组合式函数，可以更简单操作 Cropper 实例。对于统一组件渲染多裁剪框的使用场景也更加友好。

推荐使用 script-setup 语法糖：

::: code-group

```vue [JavaScript]
<!-- 这是 Vue 组件的 script 部分 -->
<script setup>
import { useCropper } from 'vue-picture-cropper'

// Props 使用 computed 传入响应式数据
const cropperProps = computed(() => ({
  img: pic.value ?? '',
  options: {
    viewMode: 2,
  },
}))

// CropperComponent 和 cropper 已绑定，可操作裁剪实例
const [CropperComponent, cropper] = useCropper(cropperProps)
</script>
```

```vue [Template]
<!-- 这是 Vue 组件的 template 部分 -->
<template>
  <CropperComponent />
</template>
```

:::

::: details 想使用标准组件？

如果初接触 Vue3 ，也可以使用标准组件写法：

::: code-group

```vue [JavaScript]
<!-- 这是 Vue 组件的 script 部分 -->
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

    // CropperComponent 是运行时生成组件，
    // 需用动态组件 <component :is="CropperComponent" /> 渲染
    const [CropperComponent, cropper] = useCropper(cropperProps)

    // 记得 return 出去，才可以在 template 使用
    return {
      CropperComponent,
      cropper,
    }
  },
})
</script>
```

```vue [Template]
<!-- 这是 Vue 组件的 template 部分 -->
<template>
  <!-- 在标准组件里，需要使用动态组件才可以渲染 CropperComponent -->
  <component :is="CropperComponent" />
</template>
```

:::

完整示例：[useCropper 的基础用法](../examples/basic-hook.md)

## 多个裁剪框

从 1.x 开始，不论是使用 VuePictureCropper 还是 useCropper ，都可以很方便地在一个组件里管理多个实例操作。

可参考示例：

- [在一个组件中使用多个 VuePictureCropper 实例](../examples/multiple-component.md)
- [在一个组件中使用多个 useCropper 实例](../examples/multiple-hook.md)

## License

[MIT License](https://github.com/chengpeiquan/vue-picture-cropper/blob/main/LICENSE) © 2020 [chengpeiquan](https://github.com/chengpeiquan)

<script setup lang="ts">
import { pkg } from '../../../shared/pkg-data'
import NpmVersionBadge from '../../../components/NpmVersionBadge.vue'

const vueVersion = pkg.peerDependencies.vue
</script>
