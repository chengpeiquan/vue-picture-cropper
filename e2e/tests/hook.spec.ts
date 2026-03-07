import { expect, test } from '@playwright/test'

test('hook scenario exposes instance effect and export APIs', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Load hook image' }).click()

  await expect(page.getByTestId('hook-instance-ready')).toHaveText('true')
  await expect(page.getByTestId('hook-effect-count')).toHaveText('1')

  await page.getByRole('button', { name: 'Run hook export' }).click()

  const firstDataUrl = await page.getByTestId('hook-data-url').textContent()
  expect(firstDataUrl).toContain('data:image/')
  await expect(page.getByTestId('hook-file-name')).toContainText('hook-export.')

  await page.getByRole('button', { name: 'Replace hook image' }).click()
  await page.getByRole('button', { name: 'Run hook export' }).click()

  const replacedDataUrl = await page.getByTestId('hook-data-url').textContent()
  expect(replacedDataUrl).toContain('data:image/')
  expect(replacedDataUrl).not.toBe(firstDataUrl)

  await page.getByRole('button', { name: 'Run hook controls' }).click()
  await expect(page.getByTestId('hook-controls-ran')).toHaveText('true')
})
