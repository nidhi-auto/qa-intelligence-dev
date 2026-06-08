import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Landing — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/')
    await page.waitForLoadState('networkidle')
  })

  test('page loads without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto(BASE_URL + '/')
    expect(errors).toHaveLength(0)
  })

  test('primary heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('sign in link is visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible()
  })

  test('get started CTA navigates to sign-in', async ({ page }) => {
    await page.getByRole('link', { name: /get started/i }).click()
    await expect(page).toHaveURL(/sign-in/)
  })
})
