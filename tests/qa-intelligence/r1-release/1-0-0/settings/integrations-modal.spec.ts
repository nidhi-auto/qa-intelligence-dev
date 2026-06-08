import { test, expect, type Page } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

function integrationCard(page: Page, name: string) {
  return page.locator('div.rounded-xl').filter({
    has: page.getByRole('heading', { name, exact: true }),
  })
}

test.describe('QAlytics > Integrations — Modal Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/settings/integrations')
    await page.waitForLoadState('networkidle')
  })

  test('connect modal opens for disconnected integration', async ({ page }) => {
    await integrationCard(page, 'Confluence').getByRole('button', { name: /^connect$/i }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { name: /connect confluence/i })).toBeVisible()
  })

  test('connect integration succeeds and shows confirmation', async ({ page }) => {
    await integrationCard(page, 'Confluence').getByRole('button', { name: /^connect$/i }).click()
    await page.getByRole('button', { name: /connect integration/i }).click()
    await expect(page.getByText(/integration connected successfully/i)).toBeVisible()
  })

  test('configure modal opens for connected integration', async ({ page }) => {
    await integrationCard(page, 'GitHub').getByRole('button', { name: /configure/i }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { name: /configure github/i })).toBeVisible()
  })

  test('escape closes integration modal', async ({ page }) => {
    await integrationCard(page, 'Confluence').getByRole('button', { name: /^connect$/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('status filter shows only connected integrations', async ({ page }) => {
    await page.getByLabel(/filter integrations/i).selectOption('connected')
    await expect(page.getByRole('heading', { name: 'Jira', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'GitHub', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Confluence', exact: true })).not.toBeVisible()
  })
})
