import { test, expect } from '@playwright/test'
import { portfolioData } from '../fixtures/mock-data'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Dashboard Overview — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/portfolio/summary', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify(portfolioData.valid) }),
    )
    await page.goto(BASE_URL + '/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test('portfolio overview heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /portfolio overview/i })).toBeVisible()
  })

  test('sidebar navigation links are visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /^overview$/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /^projects$/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /^defects$/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /test execution/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /^automation$/i })).toBeVisible()
  })

  test('navigating to projects page works', async ({ page }) => {
    await page.getByRole('link', { name: /^projects$/i }).click()
    await expect(page).toHaveURL(/dashboard\/projects/)
    await expect(page.getByRole('heading', { name: /project management/i })).toBeVisible()
  })
})
