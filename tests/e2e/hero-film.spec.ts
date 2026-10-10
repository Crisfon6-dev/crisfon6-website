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

    // the scroll plays only the opening 35% of the 28 s clip, so halfway through the wrapper's
    // travel the film is at about 0.5 * 0.35 * 28 = 4.9 s, not at the middle of the clip
    const travel = await page.evaluate(() => {
      const el = document.querySelector<HTMLElement>('[data-testid="hero-film"]')!;
      return el.offsetHeight - window.innerHeight;
    });
    await page.evaluate((y) => window.scrollTo(0, y), travel / 2);
    await expect
      .poll(() => film.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(4);
    const time = await film.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime);
    expect(time).toBeLessThan(6);

    // and at the end of the travel it has still not run through the whole clip
    await page.evaluate((y) => window.scrollTo(0, y), travel);
    await expect
      .poll(() => film.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(9);
    expect(
      await film.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime)
    ).toBeLessThan(11);
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
