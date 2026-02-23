---
outline: deep
---

# Design Philosophy {#design-philosophy}

This document explains the design choices and rationale behind vue-picture-cropper’s upgrade from v0.x to v1.x, covering bundling, style loading, and instance management.

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
