import { test, expect } from '@playwright/test';

test.describe('Home page (hi-fi)', () => {
  test('renders brand wordmark in the hero h1', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/crisfon6/);
  });

  test('renders hero typewriter text block', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('I build AI systems that', { exact: false }).first()).toBeVisible();
  });

  test('renders the stack marquee with AWS chip', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('AWS', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Claude API', { exact: true }).first()).toBeVisible();
  });

  test('stats section shows year label', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Years shipping products')).toBeVisible();
  });

  test('automation section renders with pipeline', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('AUTOMATION OF THE WEEK')).toBeVisible();
    await expect(page.getByLabel('pipeline')).toBeVisible();
  });

  test('primary hero CTA routes to /newsletter', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('hero-cta-primary').click();
    await expect(page).toHaveURL('/newsletter');
  });
});
