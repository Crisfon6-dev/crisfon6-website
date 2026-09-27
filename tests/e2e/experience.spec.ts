import { test, expect } from '@playwright/test';

test.describe('Experience', () => {
  test('/experience responds 200 and renders the CV header', async ({ page }) => {
    const response = await page.goto('/experience');
    expect(response?.status()).toBe(200);
    await expect(page.getByText(/CV · EXPERIENCE/)).toBeVisible();
  });

  test('sitemap.xml includes /experience', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('/experience');
  });

  test('toggle to ES, follow a case study to /projects, then back to /experience', async ({
    page,
  }) => {
    await page.goto('/experience');
    await page.getByRole('button', { name: 'Toggle language' }).click();
    await expect(page.getByText(/CV · EXPERIENCIA/)).toBeVisible();

    const prosperasRole = page.locator('#prosperas[data-testid="role"]');
    const caseStudyLink = prosperasRole.getByRole('link', { name: 'Ver caso →' }).first();
    const href = await caseStudyLink.getAttribute('href');
    expect(href).toMatch(/^\/projects#[\w-]+$/);
    const caseId = href!.split('#')[1];

    await caseStudyLink.click();
    await expect(page).toHaveURL(`/projects#${caseId}`);
    const card = page.locator(`[data-testid="project-card"]#${caseId}`);
    await expect(card).toBeVisible();

    await card.getByRole('link', { name: 'Ver cargo en experiencia →' }).click();
    await expect(page).toHaveURL('/experience#prosperas');
    await expect(prosperasRole).toBeVisible();
  });
});
