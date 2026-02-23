---
outline: deep
---

# 设计理念 {#design-philosophy}

本文说明 vue-picture-cropper 从 v0.x 升级到 v1.x 时，在打包方式、样式加载和实例管理上的设计取舍与原因。

## 为什么会有这个包 {#the-history-of-this-package}

<!-- 先说一下 0.x 的设计初衷，0.x 的第一个版本是发布于 2020 年 11 月，彼时 Vue 3.x 才处于发布之初，很多生态尚未稳定和适配。

最早作为一个快速在业务项目里使用的个人小工具，非常快速的适配了一层 Vue3 的 API ，自用为主，并未过多考虑它作为一个通用工程项目的很多场景。 -->

在谈 1.x 的设计之前，有必要先回顾一下 0.x 的初衷。

0.x 的第一个版本发布于 2020 年 11 月。当时 Vue 3.x 刚刚发布，整体生态尚处于早期阶段，许多常用库还未完成适配，工程实践也尚未完全稳定。这导致当时的 Vue 3 业务项目很容易因为生态不足而延误工期。

因此，这个包最初并不是面向通用场景的组件库，而是一个为业务项目快速适配的个人小工具。那个时候我的设计目标非常明确：

- 快速为 Vue 3 提供一层可用的 Cropper 封装
- 尽可能降低接入成本
- 以 “开箱即用” 为优先原则

因此在 0.x 中选择将 cropperjs 内置打包，用户只需安装一个包即可使用。

这个处理方式从当时的设计目标来看，是合理的取舍 —— 它优先解决了 “可用性” 和 “便捷性” 的问题，而不是工程边界与依赖模型的完备性。

但这几年随着项目逐步被更多场景使用，工程规模扩大、依赖关系复杂化，这种早期的便捷型设计也逐渐暴露出局限性。

1.x 的调整，并不是对 0.x 的否定，而是在使用场景变化之后的一次架构升级。

## 为什么仍然是 Cropper.js 1.x {#why-is-it-still-cropperjs-v1}

虽然 Cropper.js 主分支已经切换到 2.x，但 v1 与 v2 在架构和使用方式上存在显著差异：

|         对比维度         | 1.x 特点                                                  | 2.x 特点                                                                                                                                           |
| :----------------------: | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
|         **架构**         | 传统单体 JavaScript 库，所有 API 通过构造函数和配置项提供 | 基于 Web Components（自定义元素）重构，将不同能力拆分成可组合的元素（如 `<cropper-image>`、`<cropper-selection>`），表达方式更偏 “原生 DOM 组件化” |
|    **API 与使用模式**    | 以配置项/方法为主，适合 Vue 或纯 JS 组件封装              | 一部分 API 通过 DOM 事件、属性和自定义元素组合替代原配置项，如 viewMode、dragMode 等迁移到不同元素的属性/事件                                      |
| **生态兼容性和迁移成本** | API 形态对 Vue 封装友好，稳定且迁移成本低                 | Web Components 架构现代，但与 Vue 响应式和生命周期体系存在适配成本，需要额外桥接层                                                                 |
|    **成熟度与稳定性**    | 已长期稳定维护，用户基础大，语义明确                      | 引入现代架构思路，但升级仍需用户适配 API 和行为，版本替换不够直接                                                                                  |

基于以上差异，选择 v1 的工程考量如下：

- 稳定可预测的 API，方便组件封装与调用
- 低迁移成本与低学习成本，保持本库用户现有使用习惯
- 生态友好，遇到问题更容易查找和解决
- 面向现状工程使用，确保构建、SSR 和多实例场景可控

因此，本库依然选择依赖 Cropper.js 1.x ，而非 2.x ，以保证成熟稳定、可维护和生态兼容性。

如果希望使用 Cropper.js 2.x 的现代 Web Components 架构，建议直接使用 Cropper.js 原生库，而非本库的 Vue 封装层。

## 关于 Bundle 的调整 {#bundle-adjustments}

在 0.x 中，Cropper.js 作为内部依赖被打包进 `vue-picture-cropper` 的产物中，用户只需安装一个包即可使用：

```bash
# 0.x 时的安装方式
npm i vue-picture-cropper
```

而在 1.x ，Cropper.js 不再被打包进本库的 Bundle ，需要由使用方在项目中**显式安装并锁定** Cropper.js 1.x：

```bash
# 1.x 需要这么安装
npm i vue-picture-cropper cropperjs@^1
```

虽然 0.x 看起来方便，但在工程项目里存在这样的问题：

> cropperjs 被打包进 vue-picture-cropper ，如果用户项目中也单独使用了 cropperjs ，或其他库也依赖 cropperjs ，就可能出现：多份 cropperjs 、多个实例冲突、工程产物体积变大

简单来说，0.x 是 “内置运行时依赖的封装组件” ，而 1.x 是 “对等依赖（peer dependency）模式下的 Vue 适配层” 。

这样做带来的好处，体现在在运行时层面是：

- 避免重复打包与多实例问题（由宿主项目统一管理版本，只会存在一份依赖）
- 保证运行时构造函数来源唯一
- 降低原型链与 instanceof 判断异常的风险

体现在工程层面是：

- 将版本控制权交还给项目本身
- 避免 “幽灵依赖” 式的隐式依赖关系
- 消除因传递依赖升级带来的不可预测风险
- 更符合现代包管理最佳实践（更小的 Bundle 、更好的 Tree-Shaking ）
- 让库职责更加单一清晰

> 注：“幽灵依赖（phantom dependency）”指代码运行时依赖某个包，但该包未在当前项目的 package.json 中显式声明。这种情况通常源于 Node.js 的模块解析机制能够访问 node_modules 中的任意已安装包，从而导致依赖关系在项目层面不可见。

## 关于样式加载方式的变更 {#load-styles}

和 v0.x 不同，从 1.x 开始不再自动注入样式。

在 v0.x 中，样式会被打包为字符串，并在组件加载时动态创建 `<style>` 标签插入到页面中，例如：

```ts
// v0.x 时的源代码设计
import { loadRes } from '@bassist/utils'
import cropperStyle from 'cropperjs/dist/cropper.css?inline'
import vpcStyle from './style.css?inline'

loadRes({
  type: 'style',
  id: 'cropperjs',
  resource: cropperStyle,
})

loadRes({
  type: 'style',
  id: 'vue-picture-cropper',
  resource: vpcStyle,
})
```

从 1.x 开始，需要主动在项目的入口文件导入组件样式：

```ts [main.ts]
// 此处是业务项目，需要主动导入 Cropper.js 样式和 VuePictureCropper 样式
import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'
```

为什么移除自动注入？

自动注入样式在早期虽然方便，但也带来一些问题：

- 可控性低：样式在组件加载时才插入，难以统一管理和覆盖全局主题
- Tree-Shaking 无效：打包时无法有效剔除未使用的样式
- 冲突与重复：在大型工程或多实例场景下，可能会重复注入或覆盖其他样式
- 一致性问题：SSR、CSS Modules 或其他构建工具环境中，动态注入样式可能导致渲染不一致

改为显式导入后：

- 项目可以统一管理样式入口
- 支持 Tree-Shaking 和按需加载
- 与现代前端构建工具和工程实践高度兼容

在 1.x ，样式加载更透明、可控、可维护，符合现代前端工程化最佳实践。

## 关于实例的获取方式调整 {#obtain-instance}

在 v0.x 版本中，`cropper` 实例是通过模块级变量管理的：

```ts
// 0.x 源码设计
export let cropper: CropperInstance | null

// 使用 0.x 业务
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
```

这种设计带来了一些限制：

- 多实例冲突：同一页面同时使用多个裁剪框时，必须额外包一层子组件，否则实例会互相覆盖。
- 逻辑复用不直观：开发者在多实例场景下调用方法或复用逻辑时不够方便，使用体验受限。

因此 1.x 完全重构了实例管理方式：

- 组件实例独立管理 Cropper
  > 每个 VuePictureCropper 组件拥有自己的状态，不再依赖模块级变量，保证实例相互独立。
- 通过组件 ref 直接获取实例
  > 开发者可以安全地调用 getDataURL、getBlob、getFile 等方法，无需担心覆盖或冲突。
- 支持多实例和逻辑复用更简单
  > 在同一页面中同时存在多个裁剪框，各实例互不干扰，操作逻辑更清晰、可复用性更高。

如果希望在纯逻辑中使用裁剪能力，而不依赖模板 ref，可以使用 1.x 提供的组合式函数 [useCropper](./hook-api.md)￼，直接获得与实例绑定的控制器，实现逻辑层面的复用和集中管理。

## 写在最后 {#summary}

总的来说，1.x 在 Bundle、样式和实例三方面做了统一取舍：**依赖与样式由使用方显式管理，实例与组件一一对应**。这样既便于构建与 SSR，又支持多实例与逻辑复用。

虽然是一个 Breaking Change ，但 1.x 的 VuePictureCropper 组件 Props 仍然保持和 0.x 一致，主要有以下不同点：

1. [依赖与版本变化](./migration.md#install-deps)
2. [组件内置样式的载入方式变化](./migration.md#load-style)
3. [获取 Cropper 实例的方式变化](./migration.md#cropper-instance)

具体迁移步骤请参考 [从 v0.x 迁移](./migration.md) 以及 [在线示例](../examples/basic-component.md) 。
