import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads with brand wordmark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('h1').first()).toContainText(/crisfon6/);
  });

  test('navigates to About page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('navigates to Projects page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL('/projects');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('navigates to Automations page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: 'Automations' }).click();
    await expect(page).toHaveURL('/automations');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('navigates to Blog page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL('/blog');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('navigates to Work With Me page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: 'Work with me' }).click();
    await expect(page).toHaveURL('/work-with-me');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
