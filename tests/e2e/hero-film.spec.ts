import { test, expect } from '@playwright/test';

const FILM = '[data-testid="hero-film"]';

test.describe('Hero film: desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('video time follows the scroll and the verified overlay appears', async ({ page }) => {
    await page.goto('/');
    const film = page.getByTestId('hero-film');
    await expect(film).toHaveAttribute('data-mode', 'film');
    await expect(film.locator('video')).toHaveAttribute('src', /hero-v1-desktop\.mp4/);
    await page.waitForFunction(() => {
      const video = document.querySelector<HTMLVideoElement>('[data-testid="hero-film"] video');
      return !!video && video.readyState >= 2 && video.duration > 0;
    });

    // halfway through the pinned travel: shot 4, the 30x fact, around 14 s of a 28 s film
    await page.evaluate((selector) => {
      const el = document.querySelector(selector)!;
      const rect = el.getBoundingClientRect();
      window.scrollTo(0, rect.top + window.scrollY + 0.5 * (rect.height - window.innerHeight));
    }, FILM);

    await expect(page.getByTestId('film-overlay')).toContainText('30×');
    await expect
      .poll(() => film.locator('video').evaluate((video: HTMLVideoElement) => video.currentTime))
      .toBeGreaterThan(13.5);
    const time = await film
      .locator('video')
      .evaluate((video: HTMLVideoElement) => video.currentTime);
    expect(time).toBeLessThan(14.5);
  });
});

test.describe('Hero film: stills instead of video', () => {
  const stillIds = ['compute', 'data', 'delivery', 'reveal'];

  test('on a small screen there is no video and no MP4 request', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const mp4: string[] = [];
    page.on('request', (request) => {
      if (request.url().endsWith('.mp4')) mp4.push(request.url());
    });
    await page.goto('/');
    await expect(page.getByTestId('hero-film')).toHaveAttribute('data-mode', 'stills');
    await expect(page.locator('video')).toHaveCount(0);
    for (const id of stillIds) {
      await expect(page.getByTestId(`still-caption-${id}`)).toBeAttached();
    }
    expect(mp4).toEqual([]);
  });

  test.describe('with reduced motion on a wide screen', () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test('shows the stills and never requests the MP4', async ({ page }) => {
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

test.describe('Hero film: captions are the verified facts', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('in English', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('still-caption-compute')).toContainText('−43%');
    await expect(page.getByTestId('still-caption-data')).toContainText('30×');
    await expect(page.getByTestId('still-caption-delivery')).toContainText('~100K');
    await expect(page.getByTestId('still-caption-reveal')).toContainText('5+');
  });
});
