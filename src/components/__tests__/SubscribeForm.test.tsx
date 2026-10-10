import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { SubscribeForm } from '@/components/SubscribeForm';
import { messages } from '@/i18n/messages';

vi.mock('@/app/actions/subscribe', () => ({ subscribe: vi.fn() }));

afterEach(() => window.localStorage.removeItem('cf6.lang'));

const renderForm = () =>
  render(
    <LanguageProvider>
      <SubscribeForm />
    </LanguageProvider>
  );

describe('SubscribeForm', () => {
  it('speaks English by default', () => {
    renderForm();
    expect(screen.getByRole('button').textContent).toBe(messages.en.newsletter.startGetting);
    expect(screen.getByText(messages.en.newsletter.noSpam)).toBeTruthy();
  });

  it('speaks Spanish when the language is ES, including the fine print', () => {
    window.localStorage.setItem('cf6.lang', 'es');
    renderForm();
    expect(screen.getByRole('button').textContent).toBe(messages.es.newsletter.startGetting);
    expect(screen.getByText(messages.es.newsletter.noSpam)).toBeTruthy();
  });

  it('draws the field as an obvious, enabled input: white fill, visible border, dark text', () => {
    renderForm();
    const input = screen.getByPlaceholderText('you@company.com');
    expect(input.className).toMatch(/bg-warm-bg-elev/);
    expect(input.className).toMatch(/border-warm-border-strong/);
    expect(input.className).toMatch(/text-warm-fg\b/);
    expect(input.className).not.toMatch(/bg-surface-2|placeholder-text-muted/);
  });
});
