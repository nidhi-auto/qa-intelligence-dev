import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Test Execution — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/tests')
    await page.waitForLoadState('networkidle')
  })

  test('test execution heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /test execution/i })).toBeVisible()
  })

  test('recent test runs table is visible', async ({ page }) => {
    await expect(page.getByText('Recent Test Runs')).toBeVisible()
    await expect(page.getByText('TE-9021')).toBeVisible()
  })
})
