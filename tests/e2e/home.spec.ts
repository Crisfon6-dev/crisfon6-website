import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders tech stack bar", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("AWS", { exact: true }).first()).toBeVisible();
    await expect(
      page.getByText("Next.js", { exact: true }).first(),
    ).toBeVisible();
  });

  test("renders stats section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Years shipping products")).toBeVisible();
  });

  test("newsletter CTA links to newsletter page", async ({ page }) => {
    await page.goto("/");
    const ctaLink = page.getByRole("link", {
      name: "Subscribe to The Builder's Blueprint",
    });
    await expect(ctaLink).toBeVisible();
    await ctaLink.click();
    await expect(page).toHaveURL("/newsletter");
  });
});
