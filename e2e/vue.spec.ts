import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/531-calc');
  await expect(page.locator('h1')).toHaveText('531 Calculator');
})
