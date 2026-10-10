import { test, expect } from '@playwright/test';

test.describe('Home page (hi-fi)', () => {
  test('renders brand wordmark in the hero h1', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/crisfon6/);
  });

  test('states the promise in the hero headline', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('hero-headline')).toHaveText(
      'I build AI systems that run in production.'
    );
  });

  test('bridges into the film and no longer repeats the figures', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('hero-bridge')).toContainText('Six chapters');
    await expect(page.getByTestId('stats')).toHaveCount(0);
    await expect(page.getByTestId('stack-marquee')).toHaveCount(0);
  });

  test('hands off to the case studies after the film', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 900 });
    await page.goto('/');
    await expect(page.getByTestId('featured-projects')).toBeVisible();
    await expect(
      page.getByTestId('featured-projects').getByText('Read the case').first()
    ).toBeVisible();
  });

  test('the primary hero action is the hiring email, the newsletter is a quiet link', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByTestId('hero-cta-primary')).toHaveAttribute(
      'href',
      'mailto:crisfon6@crisfon6.com'
    );
    await page.getByTestId('hero-cta-newsletter').click();
    await expect(page).toHaveURL('/newsletter');
  });
});
