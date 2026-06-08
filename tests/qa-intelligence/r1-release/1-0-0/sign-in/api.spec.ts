import { test, expect } from '@playwright/test'
import { signInData } from '../fixtures/mock-data'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Sign In — API Mock Tests', () => {
  test('shows error UI on unauthorized (401)', async ({ page }) => {
    await page.route('**/auth/sign-in', (route) =>
      route.fulfill({ status: 401, body: JSON.stringify({ message: 'Unauthorized' }) }),
    )
    await page.goto(BASE_URL + '/sign-in')
    await page.getByLabel(/email address/i).fill(signInData.valid.email)
    await page.getByLabel(/^password$/i).fill(signInData.valid.password)
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page).toHaveURL(/dashboard/)
  })

  test('shows error UI on network failure', async ({ page }) => {
    await page.route('**/auth/sign-in', (route) => route.abort('failed'))
    await page.goto(BASE_URL + '/sign-in')
    await page.getByLabel(/email address/i).fill(signInData.valid.email)
    await page.getByLabel(/^password$/i).fill(signInData.valid.password)
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page).toHaveURL(/dashboard/)
  })
})
