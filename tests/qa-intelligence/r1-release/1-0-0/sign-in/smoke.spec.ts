import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Sign In — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/sign-in')
    await page.waitForLoadState('networkidle')
  })

  test('welcome heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
  })

  test('email and password fields are visible', async ({ page }) => {
    await expect(page.getByLabel(/email address/i)).toBeVisible()
    await expect(page.getByLabel(/^password$/i)).toBeVisible()
  })

  test('sign in button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: /sign in/i })).toBeEnabled()
  })
})
