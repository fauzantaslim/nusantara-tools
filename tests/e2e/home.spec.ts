import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/NusantaraTools/i);
  });

  test('renders the hero section with an H1 heading', async ({ page }) => {
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('displays tool category cards in the category section', async ({ page }) => {
    // At least the "Kesehatan" category card should be visible
    await expect(page.getByText('Kesehatan', { exact: false }).first()).toBeVisible();
  });

  test('navigates to /kesehatan when clicking the Kesehatan category', async ({ page }) => {
    // Click the first link that contains "Kesehatan"
    const kesehatanLink = page
      .locator('a[href*="kesehatan"]')
      .first();
    await expect(kesehatanLink).toBeVisible();
    await kesehatanLink.click();
    await expect(page).toHaveURL(/kesehatan/);
  });
});
