import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { Navbar } from '@/components/Navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const renderNav = () =>
  render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>
  );

beforeEach(() => {
  // reset scroll between tests
  window.scrollY = 0;
});

describe('Navbar', () => {
  it('renders the brand link back to /', () => {
    renderNav();
    const brandLinks = screen.getAllByRole('link', { name: /crisfon6/i });
    expect(brandLinks.length).toBeGreaterThan(0);
    expect(brandLinks[0].getAttribute('href')).toBe('/');
  });

  it('renders the primary nav links', () => {
    renderNav();
    expect(screen.getAllByRole('link', { name: 'About' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Experience' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Projects' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Automations' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Blog' }).length).toBeGreaterThan(0);
  });

  it('links Experience to /experience', () => {
    renderNav();
    const links = screen.getAllByRole('link', { name: 'Experience' });
    expect(links.some((l) => l.getAttribute('href') === '/experience')).toBe(true);
  });

  it('renders the subscribe CTA', () => {
    renderNav();
    expect(screen.getAllByRole('link', { name: /poweraí|powerai/i }).length).toBeGreaterThan(0);
  });

  it('sets data-scrolled="true" once scrollY exceeds 8px', async () => {
    renderNav();
    const nav = screen.getByRole('navigation');
    expect(nav.getAttribute('data-scrolled')).toBe('false');
    await act(async () => {
      window.scrollY = 20;
      window.dispatchEvent(new Event('scroll'));
      await new Promise((r) => setTimeout(r, 20));
    });
    expect(nav.getAttribute('data-scrolled')).toBe('true');
  });

  it('keeps data-scrolled="false" at top of page', async () => {
    renderNav();
    const nav = screen.getByRole('navigation');
    await act(async () => {
      window.scrollY = 4;
      window.dispatchEvent(new Event('scroll'));
      await new Promise((r) => setTimeout(r, 20));
    });
    expect(nav.getAttribute('data-scrolled')).toBe('false');
  });

  it('opens the mobile overlay when the hamburger is clicked', () => {
    renderNav();
    const toggle = screen.getByRole('button', { name: /open menu|toggle menu/i });
    fireEvent.click(toggle);
    expect(screen.getByTestId('mobile-menu')).toBeTruthy();
  });

  it('collapses to the hamburger below lg: the full nav does not fit a 768px tablet', () => {
    renderNav();
    const toggle = screen.getByRole('button', { name: /open menu|toggle menu/i });
    expect(toggle.className).toContain('lg:hidden');
    expect(toggle.className).not.toMatch(/(^|\s)md:hidden/);
    const desktopGroup = document.querySelector('div.hidden.items-center')!;
    expect(desktopGroup.className).toContain('lg:flex');
    expect(desktopGroup.className).not.toMatch(/(^|\s)md:flex/);
    fireEvent.click(toggle);
    expect(screen.getByTestId('mobile-menu').className).toContain('lg:hidden');
    expect(screen.getByTestId('mobile-menu').className).not.toMatch(/(^|\s)md:hidden/);
  });

  it('closes the mobile overlay when a link inside it is clicked', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: /open menu|toggle menu/i }));
    const overlay = screen.getByTestId('mobile-menu');
    const link = overlay.querySelectorAll('a')[0] as HTMLElement;
    fireEvent.click(link);
    expect(screen.queryByTestId('mobile-menu')).toBeNull();
  });

  it('makes Work with me the filled button and PowerAI a plain link: hiring outranks the newsletter', () => {
    renderNav();
    const work = screen.getAllByRole('link', { name: 'Work with me' })[0];
    const powerai = screen.getAllByRole('link', { name: /poweraí|powerai/i })[0];
    expect(work.getAttribute('data-variant')).toBe('default');
    expect(powerai.getAttribute('data-variant')).toBe('ghost');
  });

  it('does not repeat the certification badge in the header: it lives once on the hero', () => {
    renderNav();
    expect(screen.queryByText('Anthropic Certified')).toBeNull();
  });

  it('puts a direct email action at the top of the mobile menu', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: /open menu|toggle menu/i }));
    const email = screen.getByTestId('mobile-menu-email');
    expect(email.getAttribute('href')).toBe('mailto:crisfon6@crisfon6.com');
    expect(email.textContent).toContain('Email me');
  });

  it('moves focus into the mobile dialog, closes on Escape and returns focus to the opener', () => {
    renderNav();
    const opener = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(opener);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close menu' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('mobile-menu')).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it('wraps Tab inside the open mobile dialog so focus cannot reach the page behind it', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = screen.getByTestId('mobile-menu');
    const items = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    items[items.length - 1].focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(items[0]);
  });

  it('offers a skip link to the main landmark as the first focusable element', () => {
    renderNav();
    const skip = screen.getByRole('link', { name: 'Skip to content' });
    expect(skip.getAttribute('href')).toBe('#main');
  });

  it('labels the toggles with the action they perform', () => {
    renderNav();
    expect(screen.getAllByRole('button', { name: 'Switch to Spanish' }).length).toBeGreaterThan(0);
  });
});
