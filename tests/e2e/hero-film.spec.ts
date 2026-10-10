import { test, expect } from '@playwright/test';

const videoReady = () => {
  const video = document.querySelector<HTMLVideoElement>('[data-testid="hero-film"] video');
  return !!video && video.readyState >= 2 && video.duration > 0;
};

test.describe('Hero film: desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('the video time follows the scroll across the introduction sections', async ({ page }) => {
    await page.goto('/');
    const film = page.getByTestId('hero-film');
    await expect(film).toHaveAttribute('data-mode', 'film');
    await expect(film.locator('video')).toHaveAttribute('src', /hero-v2-desktop\.mp4/);
    await page.waitForFunction(videoReady);

    // the film plays across the whole page: halfway down, the 28 s clip is at about 14 s
    const travel = await page.evaluate(() => {
      const el = document.querySelector<HTMLElement>('[data-testid="hero-film"]')!;
      return el.offsetHeight - window.innerHeight;
    });
    await page.evaluate((y) => window.scrollTo(0, y), travel / 2);
    await expect
      .poll(() => film.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(13);
    const time = await film.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime);
    expect(time).toBeLessThan(15);

    // and the featured projects, contact and newsletter sections are inside that same stage
    for (const id of [
      'featured-projects',
      'horizontal-cases',
      'contact-panel',
      'newsletter-panel',
    ]) {
      if ((await page.getByTestId(id).count()) === 0) continue;
      expect(await film.locator(`[data-testid="${id}"]`).count(), id).toBe(1);
    }
  });

  test('plays the night footage in dark mode', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('theme', 'dark'));
    await page.goto('/');
    await expect(page.getByTestId('hero-film').locator('video')).toHaveAttribute(
      'src',
      /hero-night-v1-desktop\.mp4/
    );
  });
});

test.describe('Hero film: poster instead of video', () => {
  test('on a small screen there is no video and no MP4 request, and the introduction is there', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const mp4: string[] = [];
    page.on('request', (request) => {
      if (request.url().endsWith('.mp4')) mp4.push(request.url());
    });
    await page.goto('/');
    await expect(page.getByTestId('hero-film')).toHaveAttribute('data-mode', 'stills');
    await expect(page.locator('video')).toHaveCount(0);
    await expect(page.getByTestId('who-i-am')).toBeAttached();
    expect(mp4).toEqual([]);
  });

  test.describe('with reduced motion on a wide screen', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('shows the poster and never requests the MP4', async ({ page }) => {
      const mp4: string[] = [];
      page.on('request', (request) => {
        if (request.url().endsWith('.mp4')) mp4.push(request.url());
      });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      await expect(page.getByTestId('hero-film')).toHaveAttribute('data-mode', 'stills');
      await expect(page.locator('video')).toHaveCount(0);
      expect(mp4).toEqual([]);
    });
  });
});
