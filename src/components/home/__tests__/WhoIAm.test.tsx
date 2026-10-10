import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { messages } from '@/i18n/messages';
import {
  CREDENTIALS,
  PROFILE,
  ROLES,
  STACK_GROUPS,
  formatRolePeriod,
  sortRoles,
} from '@/data/career';
import { WhoIAm, WHO_CREDENTIALS_MAX, WHO_STACK_GROUPS, WHO_STACK_ITEMS } from '../WhoIAm';
import { PORTRAIT } from '../whoIAmAssets';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

afterEach(() => window.localStorage.removeItem('cf6.lang'));

const renderSection = () =>
  render(
    <LanguageProvider>
      <WhoIAm />
    </LanguageProvider>
  );

const current = sortRoles(ROLES).find((r) => r.kind === 'employment' && r.end === null)!;

describe('WhoIAm', () => {
  it('leads with the About intro and the business angle, read from the messages', () => {
    renderSection();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(messages.en.about.intro1);
    expect(screen.getByText(messages.en.about.businessAngle)).toBeTruthy();
  });

  it('shows the current role from career data', () => {
    renderSection();
    const text = screen.getByTestId('who-i-am').textContent!;
    expect(text).toContain(current.title.en);
    expect(text).toContain(current.employer.en);
    expect(text).toContain(formatRolePeriod(current, 'en', messages.en.experience.present));
    expect(text).toContain(current.clientLine.en);
  });

  it('shows the location from the profile', () => {
    renderSection();
    expect(screen.getByTestId('who-i-am').textContent).toContain(PROFILE.location.en);
  });

  it('shows at most three credentials, in the data order', () => {
    renderSection();
    const shown = CREDENTIALS.slice(0, WHO_CREDENTIALS_MAX);
    expect(WHO_CREDENTIALS_MAX).toBe(3);
    const chips = screen.getAllByTestId('who-credential').map((el) => el.textContent!);
    expect(chips).toHaveLength(shown.length);
    shown.forEach((c, i) => expect(chips[i]).toContain(c.name.en));
    for (const c of CREDENTIALS.slice(WHO_CREDENTIALS_MAX)) {
      expect(chips.join('|'), c.name.en).not.toContain(c.name.en);
    }
  });

  it('shows four stack groups with the first three items of each, in the data order', () => {
    renderSection();
    expect([WHO_STACK_GROUPS, WHO_STACK_ITEMS]).toEqual([4, 3]);
    const rows = screen.getAllByTestId('who-stack-group');
    expect(rows).toHaveLength(WHO_STACK_GROUPS);
    STACK_GROUPS.slice(0, WHO_STACK_GROUPS).forEach((g, i) => {
      expect(rows[i].textContent).toContain(g.group);
      for (const item of g.items.slice(0, WHO_STACK_ITEMS)) {
        expect(rows[i].textContent).toContain(item);
      }
      for (const item of g.items.slice(WHO_STACK_ITEMS)) {
        expect(rows[i].textContent, item).not.toContain(item);
      }
    });
  });

  it('links to the full story and the work history', () => {
    renderSection();
    expect(
      screen
        .getByRole('link', { name: new RegExp(messages.en.whoIAm.fullStory) })
        .getAttribute('href')
    ).toBe('/about');
    expect(
      screen
        .getByRole('link', { name: new RegExp(messages.en.whoIAm.workHistory) })
        .getAttribute('href')
    ).toBe('/experience');
  });

  it('shows the portrait with localized alt text and the reserved size', () => {
    renderSection();
    const img = screen.getByAltText(messages.en.whoIAm.photoAlt);
    expect(img.getAttribute('src')).toBe(PORTRAIT.src);
    expect(img.getAttribute('width')).toBe(String(PORTRAIT.width));
    expect(img.getAttribute('height')).toBe(String(PORTRAIT.height));
  });

  it('stands the portrait on the card bottom edge on desktop instead of floating it mid-card', () => {
    renderSection();
    const column = screen.getByAltText(messages.en.whoIAm.photoAlt).parentElement!;
    expect(column.className).toContain('md:self-end');
    expect(column.className).toMatch(/md:-mb-sp-6/);
  });

  it('writes credentials in sentence case with a readable line height, not as tiny caps', () => {
    renderSection();
    for (const pill of screen.getAllByTestId('who-credential')) {
      expect(pill.className).not.toContain('uppercase');
      expect(pill.className).toMatch(/leading-(snug|normal|relaxed)/);
      expect(pill.className).not.toContain('leading-none');
    }
  });

  it('sits in a slab, so text contrast does not depend on the footage behind it', () => {
    renderSection();
    expect(screen.getByTestId('who-i-am').querySelector('.slab')).toBeTruthy();
  });

  it('speaks Spanish with no English leak in the labels or the facts', () => {
    window.localStorage.setItem('cf6.lang', 'es');
    renderSection();
    const text = screen.getByTestId('who-i-am').textContent!;
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(messages.es.about.intro1);
    expect(text).toContain(PROFILE.location.es);
    expect(text).toContain(current.clientLine.es);
    for (const key of Object.keys(messages.en.whoIAm) as (keyof typeof messages.en.whoIAm)[]) {
      // photoAlt is an attribute, not text; labels identical in both languages cannot leak
      if (key === 'photoAlt' || messages.en.whoIAm[key] === messages.es.whoIAm[key]) continue;
      expect(text, key).not.toContain(messages.en.whoIAm[key]);
      expect(text, key).toContain(messages.es.whoIAm[key]);
    }
    expect(screen.getByAltText(messages.es.whoIAm.photoAlt)).toBeTruthy();
  });
});
