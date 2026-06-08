import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'

test.describe('QAlytics > Projects — Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/dashboard/projects')
    await page.waitForLoadState('networkidle')
  })

  test('project management heading is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /project management/i })).toBeVisible()
  })

  test('project and sprint filters are visible', async ({ page }) => {
    await expect(page.getByLabel(/select project/i)).toBeVisible()
    await expect(page.getByLabel(/filter by sprint/i)).toBeVisible()
  })

  test('pie chart sections render', async ({ page }) => {
    await expect(page.getByText('Defects')).toBeVisible()
    await expect(page.getByText('Test Cases')).toBeVisible()
  })

  test('avg quality score chart renders', async ({ page }) => {
    await expect(page.getByText(/avg\. quality score/i)).toBeVisible()
  })
})
