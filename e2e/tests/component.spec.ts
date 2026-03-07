import { expect, test } from '@playwright/test'

test('renders component harness', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('component-ready')).toHaveText('false')
})

test('component scenario exports and updates source images', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Load component image' }).click()
  await expect(page.getByTestId('component-ready')).toHaveText('true')

  await page.getByRole('button', { name: 'Run component export' }).click()

  const firstDataUrl = await page
    .getByTestId('component-data-url')
    .textContent()

  expect(firstDataUrl).toContain('data:image/')
  await expect(page.getByTestId('component-blob-type')).toContainText('image/')
  await expect(page.getByTestId('component-file-name')).toContainText(
    'component-export.',
  )

  await page.getByRole('button', { name: 'Replace component image' }).click()
  await page.getByRole('button', { name: 'Run component export' }).click()

  const replacedDataUrl = await page
    .getByTestId('component-data-url')
    .textContent()

  expect(replacedDataUrl).toContain('data:image/')
  expect(replacedDataUrl).not.toBe(firstDataUrl)
})

test('component preset scenarios expose fixed size and round exports', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Run preset export' }).click()

  await expect(page.getByTestId('preset-fixed-size')).toHaveText('160x120')
  await expect(page.getByTestId('preset-round-type')).toHaveText('image/png')
})
