import { test, expect } from '@playwright/test'
import { signInData } from '../fixtures/mock-data'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Sign In — Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/sign-in')
    await page.waitForLoadState('networkidle')
  })

  test('submit empty form shows HTML5 required validation', async ({ page }) => {
    await page.getByRole('button', { name: /sign in/i }).click()
    const emailInput = page.getByLabel(/email address/i)
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBeTruthy()
  })

  test('valid form submission navigates to dashboard', async ({ page }) => {
    await page.route('**/auth/sign-in', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: signInData.api.token, user: signInData.api.user }),
      }),
    )
    await page.getByLabel(/email address/i).fill(signInData.valid.email)
    await page.getByLabel(/^password$/i).fill(signInData.valid.password)
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page).toHaveURL(/dashboard/)
  })

  test('whitespace-only password treated as empty by browser', async ({ page }) => {
    await page.getByLabel(/email address/i).fill(signInData.valid.email)
    await page.getByLabel(/^password$/i).fill(signInData.edge.whitespacePassword)
    await page.getByRole('button', { name: /sign in/i }).click()
    const passwordInput = page.getByLabel(/^password$/i)
    const isInvalid = await passwordInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBeTruthy()
  })
})
