---
outline: deep
---

# Design Philosophy {#design-philosophy}

This document explains the design choices and rationale behind vue-picture-cropper’s upgrade from v0.x to v1.x, covering bundling, style loading, and instance management.

## Why Is It Still Cropper.js 1.x? {#why-is-it-still-cropperjs-v1}

Although the Cropper.js main branch has moved to 2.x, v1 and v2 differ significantly in architecture and usage:

| Dimension                   | 1.x                                                                                     | 2.x                                                                                                                                                                                       |
| :-------------------------- | :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Architecture**            | Traditional monolithic JavaScript library; all APIs exposed via constructor and options | Refactored around Web Components (custom elements); capabilities split into composable elements (e.g. `<cropper-image>`, `<cropper-selection>`), with a more "native DOM component" style |
| **API and usage**           | Configuration options and methods; fits Vue or plain JS component wrappers              | Part of the API replaced by DOM events, attributes, and custom element composition; e.g. viewMode, dragMode move to attributes/events on different elements                               |
| **Ecosystem and migration** | API shape is Vue-wrapper friendly, stable, low migration cost                           | Modern Web Components architecture, but adapts to Vue reactivity and lifecycle with extra bridging                                                                                        |
| **Maturity and stability**  | Long-standing, stable maintenance, large user base, clear semantics                     | New architecture, but upgrade still requires API and behavior adaptation; not a drop-in replacement                                                                                       |

Based on these differences, the reasons to stay on v1 are:

- Stable, predictable API that is easy to wrap and call
- Low migration and learning cost, preserving current usage for existing users
- Ecosystem-friendly; issues are easier to look up and fix
- Suited to real-world projects: build, SSR, and multi-instance scenarios remain under control

Therefore, this library continues to depend on Cropper.js 1.x rather than 2.x, for maturity, stability, maintainability, and ecosystem compatibility.

If you want the modern Web Components approach of Cropper.js 2.x, we recommend using the Cropper.js library directly rather than this Vue wrapper.

## Why This Package Exists {#the-history-of-this-package}

Before discussing the v1.x design, it helps to recall the original goals of v0.x.

The first v0.x release was in November 2020. Vue 3 had just been released, the ecosystem was still young, many libraries had not yet adapted, and build practices were not fully settled. As a result, Vue 3 projects often faced delays due to missing or immature tooling.

This package was not intended as a general-purpose component library. It was a small, personal tool to get a Cropper working quickly in a real project. The goals were:

- Provide a usable Cropper wrapper for Vue 3 as quickly as possible
- Keep integration cost low
- Prioritize “works out of the box”

So in v0.x, Cropper.js was bundled inside the library; users only needed to install one package.

From that standpoint, the choice was reasonable: it favored “usability” and “convenience” over strict dependency boundaries and a clean dependency model.

Over time, the project was used in more scenarios, project sizes grew, and dependency graphs became more complex. The early, convenience-oriented design started to show its limits.

The v1.x changes are not a rejection of v0.x; they are an architectural upgrade in response to how the package is used today.

## Why ESM only {#why-esm-only}

As of 1.x, this library is published as ESM (ES Modules) only. CommonJS (CJS) and IIFE builds are no longer provided.

Background and rationale:

- Modern Vue projects use ESM by default
  > The vast majority of Vue 3 projects use Vite or other modern bundlers, which support ESM natively. Shipping CJS or IIFE builds adds maintenance cost with little benefit in these setups.
- IIFE / CDN usage is very low
  > IIFE builds delivered via CDN are rare in practice; our metrics and community feedback show almost no usage. Continuing to ship them would increase bundle size and test surface for limited user value.
- Simpler build and maintenance
  > Dropping CJS/IIFE simplifies the build pipeline, keeps TypeScript types and module exports consistent, and avoids the default + named export quirks that can occur with CJS.

If your project relies on CJS or IIFE, migrate to an ESM-capable setup, for example Vite, Nuxt, or a recent Webpack version.

## Bundle Changes {#bundle-adjustments}

In v0.x, Cropper.js was bundled as an internal dependency of `vue-picture-cropper`, so a single install was enough:

```bash
# v0.x installation
npm i vue-picture-cropper
```

In v1.x, Cropper.js is **no longer bundled** with this library. Projects must **explicitly install and pin** Cropper.js 1.x:

```bash
# v1.x installation
npm i vue-picture-cropper cropperjs@^1
```

Although v0.x was convenient, it caused issues in real projects:

> With cropperjs bundled inside vue-picture-cropper, if the app (or another dependency) also used cropperjs, you could end up with multiple copies, conflicting instances, and a larger bundle.

In short: v0.x was “a wrapper component with a bundled runtime dependency”; v1.x is “a Vue adapter with Cropper.js as a peer dependency.”

Benefits at runtime:

- Avoid duplicate bundles and multiple Cropper instances (the host project owns the version; only one copy exists)
- Ensure a single source for the Cropper constructor
- Reduce risks around prototype chains and `instanceof` checks

Benefits for the project:

- Version control stays in the project’s hands
- No “phantom” implicit dependency on cropperjs
- Fewer surprises from transitive dependency upgrades
- Aligns with modern packaging (smaller bundles, better tree-shaking)
- Keeps the library’s responsibility clear and narrow

> **Note:** A “phantom dependency” is when code depends on a package at runtime but that package is not declared in the project’s `package.json`. This often happens because Node’s module resolution can see any installed package under `node_modules`, so the dependency is invisible at the project level.

## Style Loading Changes {#load-styles}

Unlike v0.x, v1.x does **not** inject styles automatically.

In v0.x, styles were bundled as strings and injected by creating `<style>` tags when the component loaded, for example:

```ts
// v0.x source design
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

From v1.x onward, you must import the styles explicitly in your app entry:

```ts [main.ts]
// In your app: import Cropper.js and VuePictureCropper styles
import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'
```

Why remove auto-injection?

Auto-injection was convenient at first but had downsides:

- **Low control:** Styles were added when the component loaded, making it hard to manage or override globally
- **No tree-shaking:** Unused styles could not be stripped at build time
- **Duplication and conflicts:** In larger apps or with multiple instances, styles could be injected more than once or overwrite others
- **Inconsistency:** With SSR, CSS Modules, or other build setups, dynamic injection could lead to mismatched rendering

With explicit imports:

- The project owns the style entry point
- Tree-shaking and code-splitting work as expected
- Behavior matches modern build tools and practices

In v1.x, style loading is explicit, predictable, and maintainable.

## Instance Access Changes {#obtain-instance}

In v0.x, the Cropper instance was exposed via a module-level variable:

```ts
// v0.x source design
export let cropper: CropperInstance | null

// Usage in v0.x
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
```

This design had limitations:

- **Multiple instances conflicted:** Using more than one cropper on the same page required wrapping each in a separate component, or instances would overwrite each other.
- **Reuse was awkward:** In multi-instance scenarios, calling methods or sharing logic was less straightforward.

v1.x reworks instance handling:

- **Each component owns its Cropper instance**  
  Each `VuePictureCropper` component has its own state; there is no shared module-level variable, so instances stay independent.
- **Access via component ref**  
  Use a template ref to get the instance and safely call `getDataURL`, `getBlob`, `getFile`, etc., without overwriting or conflicting with others.
- **Multiple instances and reuse are straightforward**  
  You can have several croppers on one page; each instance is isolated and the logic is clearer and easier to reuse.

If you want cropping logic without template refs, v1.x provides the composable [useCropper](./hook-api.md), which gives you a controller bound to an instance and supports reuse and centralised logic in script code.

## In conclusion {#summary}

In summary, 1.x makes consistent choices in three areas: **Bundle**, **styles**, and **instances**. Dependencies and styles are managed explicitly by the app; each component has its own instance. This fits modern builds and SSR, and supports multiple instances and logic reuse.

Although this is a breaking change, the VuePictureCropper component props in 1.x remain the same as in 0.x. The main differences are:

1. [Dependencies](./migration.md#install-deps)
2. [Import styles](./migration.md#load-style)
3. [Cropper instance](./migration.md#cropper-instance)

For step-by-step migration, see [Migrating from v0.x](./migration.md) and the [online examples](../examples/basic-component.md).
