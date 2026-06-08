import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Integrations — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/settings/integrations')
    await page.waitForLoadState('networkidle')
  })

  test('integrations heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /integrations/i })).toBeVisible()
  })

  test('integration cards render', async ({ page }) => {
    await expect(page.getByText('Jira')).toBeVisible()
    await expect(page.getByText('GitHub')).toBeVisible()
  })

  test('search integrations filters results', async ({ page }) => {
    await page.getByPlaceholder(/search integrations/i).fill('Jira')
    await expect(page.getByText('Jira')).toBeVisible()
    await expect(page.getByText('GitHub')).not.toBeVisible()
  })
})
