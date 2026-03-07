import { expect, test } from '@playwright/test'

test('renders packed consumer page', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('smoke-page-ready')).toHaveText('true')
  await expect(page.getByTestId('smoke-package-imported')).toHaveText('true')
  await expect(page.getByTestId('smoke-style-loaded')).toHaveText('true')
})

test('packed package renders and exports a data url', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Load smoke image' }).click()
  await expect(page.getByTestId('smoke-instance-ready')).toHaveText('true')

  await page.getByRole('button', { name: 'Run smoke export' }).click()
  await expect(page.getByTestId('smoke-data-url')).toContainText('data:image/')
})
