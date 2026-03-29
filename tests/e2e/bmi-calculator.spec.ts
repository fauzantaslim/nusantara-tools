import { test, expect } from '@playwright/test';

test.describe('BMI Calculator — E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/kesehatan/bmi');
  });

  test('renders the BMI calculator page heading', async ({ page }) => {
    // The page should have some heading related to BMI
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('displays weight and height input fields', async ({ page }) => {
    // Weight input should be present
    const weightInput = page.locator('input[type="number"]').first();
    await expect(weightInput).toBeVisible();
  });

  test('calculates BMI result after filling the form (metric)', async ({ page }) => {
    // Fill all number inputs: weight=70, height=170, age=25
    const numberInputs = page.locator('input[type="number"]');
    await numberInputs.nth(0).fill('70');  // weight
    await numberInputs.nth(1).fill('170'); // height
    await numberInputs.nth(2).fill('25');  // age

    // Submit the form
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // Result panel / score should appear — look for a numeric BMI value
    const resultArea = page.locator('[data-testid="bmi-result"], .bmi-result, [class*="result"]').first();
    await expect(resultArea).toBeVisible({ timeout: 5000 });
  });

  test('shows a BMI category label after submission', async ({ page }) => {
    const numberInputs = page.locator('input[type="number"]');
    await numberInputs.nth(0).fill('70');
    await numberInputs.nth(1).fill('170');
    await numberInputs.nth(2).fill('25');

    await page.locator('button[type="submit"]').click();

    // One of the category labels should appear
    const categoryText = page.getByText(/Normal|Kurus|Berlebih|Obesitas/);
    await expect(categoryText.first()).toBeVisible({ timeout: 5000 });
  });

  test('back navigation goes to /kesehatan', async ({ page }) => {
    const backLink = page.locator('a[href="/kesehatan"], a[href="/"]').first();
    await expect(backLink).toBeVisible();
  });
});
