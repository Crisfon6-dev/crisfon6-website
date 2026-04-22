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
    expect(screen.getAllByRole('link', { name: 'Projects' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Automations' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'Blog' }).length).toBeGreaterThan(0);
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

  it('closes the mobile overlay when a link inside it is clicked', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: /open menu|toggle menu/i }));
    const overlay = screen.getByTestId('mobile-menu');
    const link = overlay.querySelectorAll('a')[0] as HTMLElement;
    fireEvent.click(link);
    expect(screen.queryByTestId('mobile-menu')).toBeNull();
  });
});
