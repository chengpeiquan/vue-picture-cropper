# Package Smoke Tests Design

**Context**

The repository now has source-level e2e coverage that validates `src/` directly in a real browser. That closes the runtime gap for source code, but it does not yet verify the installable npm package boundary.

**Goal**

Add a smoke test that validates the packed npm artifact can be installed by an independent consumer app and can render the component successfully in a browser.

**Decision**

Use a dedicated consumer app under `smoke/consumer`, install the local packed `.tgz` artifact into that app, and run a thin Playwright smoke test against the consumer page.

**Why This Approach**

1. It matches the real user path more closely than importing `dist/` directly.
2. It validates package publishing boundaries:
   - `files`
   - `exports`
   - style entry
   - runtime installability
3. It complements the existing source-level e2e suite without duplicating its scope.

**Alternatives Considered**

1. Import `dist/` directly in a browser harness
   Faster, but does not validate the packed artifact or consumer install path.
2. Use runtime import tests without a browser
   Lower coverage and misses browser integration issues.

**Scope**

The smoke test will verify:

1. The package can be built and packed locally.
2. The packed artifact can be installed in an isolated consumer app.
3. The consumer app can import:
   - `vue-picture-cropper`
   - `vue-picture-cropper/style.css`
4. The component renders in a real browser and can export a non-empty data URL after image load.

**Out of Scope**

1. Full behavior parity with source-level e2e
2. Hook-specific coverage
3. Preset-mode coverage
4. Precise cropperjs geometry validation

**Test Strategy**

1. Create a minimal consumer app under `smoke/consumer`.
2. Add a script that:
   - builds the library
   - creates a local package tarball
   - installs that tarball into the consumer app
3. Use a dedicated Playwright spec to open the consumer app and validate the minimal flow.

**Stability Rules**

1. Keep the consumer app thin and purpose-built.
2. Assert minimal but meaningful signals:
   - page rendered
   - component instance ready
   - export result starts with `data:image/`
3. Avoid duplicating detailed source-level behavior already covered elsewhere.
