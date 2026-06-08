import { test, expect } from '@playwright/test'
import { signInData } from '../fixtures/mock-data'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Settings General — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/settings')
    await page.waitForLoadState('networkidle')
  })

  test('settings heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /^settings$/i })).toBeVisible()
  })

  test('profile section displays current user', async ({ page }) => {
    await expect(page.getByText('Profile')).toBeVisible()
    await expect(page.getByText(signInData.api.user.name)).toBeVisible()
    await expect(page.getByText(signInData.api.user.role)).toBeVisible()
  })

  test('profile form fields are populated', async ({ page }) => {
    await expect(page.getByLabel(/full name/i)).toHaveValue(signInData.api.user.name)
    await expect(page.getByLabel(/email address/i)).toHaveValue(signInData.api.user.email)
    await expect(page.getByLabel(/^role$/i)).toHaveValue(signInData.api.user.role)
  })

  test('save profile button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /save profile/i })).toBeVisible()
  })

  test('settings nav links to integrations', async ({ page }) => {
    await page.getByRole('link', { name: /^integrations$/i }).click()
    await expect(page).toHaveURL(/dashboard\/settings\/integrations/)
    await expect(page.getByRole('heading', { name: /integrations/i })).toBeVisible()
  })
})
