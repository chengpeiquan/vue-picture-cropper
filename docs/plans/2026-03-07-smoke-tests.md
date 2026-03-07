# Package Smoke Tests Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a packed-artifact smoke test that verifies `vue-picture-cropper` can be installed into an independent consumer app and used successfully in a real browser.

**Architecture:** Create a minimal consumer app under `smoke/consumer`, install a locally packed `.tgz` of the library into that app, and run a dedicated Playwright smoke spec against the consumer page. Keep this suite intentionally thin so it validates publish/install boundaries without duplicating source-level e2e coverage.

**Tech Stack:** Playwright, Vite, Vue 3, pnpm pack/install, TypeScript

---

### Task 1: Add smoke test scripts and consumer app scaffold

**Files:**
- Modify: `package.json`
- Modify: `pnpm-workspace.yaml`
- Modify: `.gitignore`
- Create: `smoke/consumer/package.json`
- Create: `smoke/consumer/index.html`
- Create: `smoke/consumer/vite.config.ts`
- Create: `smoke/consumer/tsconfig.json`
- Create: `smoke/consumer/src/main.ts`
- Create: `smoke/consumer/src/App.vue`

**Step 1: Write the failing test**

Create a Playwright smoke spec that expects a rendered marker on the consumer page.

```ts
test('renders packed consumer page', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('smoke-page-ready')).toHaveText('true')
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm test:smoke`
Expected: FAIL because the smoke app and scripts do not exist yet.

**Step 3: Write minimal implementation**

Add the consumer app scaffold and root scripts so Playwright can start the app.

**Step 4: Run test to verify it passes**

Run: `pnpm test:smoke`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json pnpm-workspace.yaml .gitignore smoke
git commit -m "test: add smoke consumer scaffold"
```

### Task 2: Add local pack-and-install workflow

**Files:**
- Modify: `package.json`
- Create: `smoke/scripts/prepare-smoke-package.mjs`

**Step 1: Write the failing test**

Extend the smoke test setup to require the package to be installed from a generated tarball before the consumer app starts.

```ts
test('imports the packed package entry', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('smoke-package-imported')).toHaveText('true')
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm test:smoke`
Expected: FAIL because the packed artifact is not being generated or installed yet.

**Step 3: Write minimal implementation**

Add a script that builds the library, runs `pnpm pack`, moves the tarball into a stable temp location, and installs it into `smoke/consumer`.

**Step 4: Run test to verify it passes**

Run: `pnpm test:smoke`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json smoke/scripts
git commit -m "test: install packed artifact for smoke tests"
```

### Task 3: Verify minimal browser usage of the packed package

**Files:**
- Modify: `smoke/consumer/src/App.vue`
- Create: `smoke/tests/package-smoke.spec.ts`

**Step 1: Write the failing test**

Add a real smoke assertion for component usage:

```ts
test('packed package renders and exports a data url', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Load smoke image' }).click()
  await expect(page.getByTestId('smoke-instance-ready')).toHaveText('true')
  await page.getByRole('button', { name: 'Run smoke export' }).click()
  await expect(page.getByTestId('smoke-data-url')).toContainText('data:image/')
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm test:smoke`
Expected: FAIL because the consumer app does not yet wire the package component and export flow.

**Step 3: Write minimal implementation**

Import the package and style entry from the installed tarball, mount the component in the consumer app, and expose minimal status fields and buttons.

**Step 4: Run test to verify it passes**

Run: `pnpm test:smoke`
Expected: PASS

**Step 5: Commit**

```bash
git add smoke/consumer/src/App.vue smoke/tests/package-smoke.spec.ts
git commit -m "test: add packed package smoke coverage"
```

### Task 4: Final verification and cleanup

**Files:**
- Modify: `README.md` only if smoke commands need documenting

**Step 1: Write the failing test**

No new test. Verification task.

**Step 2: Run verification**

Run: `pnpm test:e2e`
Expected: PASS

Run: `pnpm test:smoke`
Expected: PASS

**Step 3: Minimal implementation**

Adjust scripts or isolation details only if verification reveals coupling or install-path issues.

**Step 4: Run verification again**

Run: `pnpm test:e2e && pnpm test:smoke`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json pnpm-workspace.yaml .gitignore smoke README.md
git commit -m "test: add packed artifact smoke tests"
```
