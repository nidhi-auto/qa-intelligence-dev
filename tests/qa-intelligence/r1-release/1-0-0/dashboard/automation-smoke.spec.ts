import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Automation — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/automation')
    await page.waitForLoadState('networkidle')
  })

  test('automation health heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /automation health/i })).toBeVisible()
  })

  test('flaky tests section is visible', async ({ page }) => {
    await expect(page.getByText(/flaky tests/i)).toBeVisible()
  })
})
