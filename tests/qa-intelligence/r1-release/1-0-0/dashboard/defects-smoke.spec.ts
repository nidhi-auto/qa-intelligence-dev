import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Defects — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/defects')
    await page.waitForLoadState('networkidle')
  })

  test('defect intelligence heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /defect intelligence/i })).toBeVisible()
  })

  test('search bar is visible', async ({ page }) => {
    await expect(page.getByPlaceholder(/search defects/i)).toBeVisible()
  })

  test('defect table shows bug rows', async ({ page }) => {
    await expect(page.getByText('BUG-4821')).toBeVisible()
  })
})
