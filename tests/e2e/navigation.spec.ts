import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads with hero heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('I ship FinTech at scale');
  });

  test('navigates to About page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigates to Projects page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL('/projects');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigates to Blog page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL('/blog');
    await expect(page.locator('h1')).toBeVisible();
  });
});
