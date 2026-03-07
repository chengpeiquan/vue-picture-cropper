# Src E2E Tests Design

**Context**

The repository currently uses `vitest` with `happy-dom` for unit tests under `test/`. That is suitable for mocked coverage around `src`, but not for validating the real browser behavior of `cropperjs` integration in the library source.

**Goal**

Add professional e2e coverage that validates the core behaviors of the `src` library directly, without routing tests through the `docs` site.

**Decision**

Use `Playwright` with a minimal local Vite harness page that imports the source code from `src/` directly.

**Why This Approach**

1. `happy-dom` is not a reliable substitute for browser behavior around image loading, canvas export, blob/file generation, and cropper event flow.
2. `Playwright` provides a stable, real-browser execution model and a mature DX/CI story for e2e work.
3. A dedicated harness keeps the test scope focused on library behavior instead of documentation/demo behavior.

**Alternatives Considered**

1. Continue with `Vitest + happy-dom`
   This is the lowest-friction option, but it would remain closer to integration tests with mocks than real e2e coverage.
2. Use Vitest Browser Mode
   This would improve browser fidelity, but Playwright remains the more established fit for source-level end-to-end testing with local server orchestration and browser tooling.

**Scope**

The e2e suite will validate the connection layer owned by this package:

1. Component-based usage from `src/cropper/index.vue`
2. Hook-based usage from `src/hooks/useCropper.ts`
3. Real browser export behaviors:
   - `getDataURL()`
   - `getBlob()`
   - `getFile()`
4. Source-level behaviors:
   - instance creation after image load
   - source replacement with a new image
   - `presetMode` impact for `round` and `fixedSize`
   - `onInstanceEffect()` firing in hook usage
   - wrapper methods such as `clear()` and `reset()` remaining callable

**Out of Scope**

1. Full validation of cropperjs geometry or drag math
2. Documentation site example behavior
3. Pixel-perfect crop-box positioning assertions

**Test Strategy**

Create a minimal test app under `e2e/` with two scenarios:

1. Component scenario
   Mount the component directly from `src`, expose stable UI controls, and render machine-readable status fields.
2. Hook scenario
   Mount a wrapper component using `useCropper()` and expose effect state and export results through the DOM.

Playwright tests will interact with those controls and assert stable outputs through `data-testid` hooks.

**Stability Rules**

1. Prefer semantic assertions over exact rendering internals.
2. Assert result shape and type first: non-empty data URL, blob/file metadata, effect counter changes.
3. Only assert dimensions where this package is responsible for them, such as fixed-size and round preset exports.
