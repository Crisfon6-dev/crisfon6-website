import { test, expect } from '@playwright/test';

test.describe('UX toggles — theme + language', () => {
  test('theme toggle flips the <html> dark class', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initial = await html.getAttribute('class');
    await page
      .getByRole('button', { name: /theme|switch/i })
      .first()
      .click();
    await page.waitForTimeout(120);
    const after = await html.getAttribute('class');
    expect(initial).not.toEqual(after);
  });

  test('language toggle flips hero copy EN <-> ES', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /language|ES|EN/i }).first();
    await expect(page.getByText('AI SYSTEMS ENGINEER · LATAM')).toBeVisible();
    await toggle.click();
    await expect(page.getByText('INGENIERO DE SISTEMAS AI · LATAM')).toBeVisible();
  });

  test('language toggle persists across reload via localStorage', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /language|ES|EN/i }).first();
    await toggle.click();
    await expect(page.getByText('INGENIERO DE SISTEMAS AI · LATAM')).toBeVisible();

    // localStorage should hold cf6.lang=es
    const stored = await page.evaluate(() => localStorage.getItem('cf6.lang'));
    expect(stored).toBe('es');

    await page.reload();
    await expect(page.getByText('INGENIERO DE SISTEMAS AI · LATAM')).toBeVisible();
  });

  test('scrolled nav gains data-scrolled="true" attribute', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation').first();
    await expect(nav).toHaveAttribute('data-scrolled', 'false');
    await page.evaluate(() => window.scrollTo(0, 200));
    await expect(nav).toHaveAttribute('data-scrolled', 'true');
  });

  test('mobile overlay opens on small viewport and closes on link click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    await page.getByRole('button', { name: /open menu|toggle menu/i }).click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();
    await page.getByTestId('mobile-menu').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
  });
});
