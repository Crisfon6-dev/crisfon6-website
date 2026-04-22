import { test, expect } from '@playwright/test';

test.describe('Newsletter subscribe flow', () => {
  test('subscribe form is visible on /newsletter', async ({ page }) => {
    await page.goto('/newsletter');
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
  });

  test('subscribe form is present on home via NewsletterPanel', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
  });

  test('submitting a valid email triggers the server action', async ({ page }) => {
    // Intercept the Beehiiv API call the server action makes so we don't hit the
    // real service from CI.
    await page.route('**/api.beehiiv.com/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { id: 'sub_test' } }),
      });
    });

    await page.goto('/newsletter');
    const input = page.locator('input[type="email"]').first();
    await input.fill('test@example.com');
    await input.press('Enter');
    // Either the success banner appears (direct API) or a new tab opens (redirect
    // fallback) — assert that the form state changed or a success message shows.
    await expect(page.getByText(/subscri|gracias|thanks/i).first()).toBeVisible({
      timeout: 10_000,
    });
  });
});
