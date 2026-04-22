import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { StatsSection } from '../StatsSection';
import { messages } from '@/i18n/messages';

const renderStats = () =>
  render(
    <LanguageProvider>
      <StatsSection />
    </LanguageProvider>
  );

describe('StatsSection', () => {
  it('renders 4 stat cells', () => {
    const { container } = renderStats();
    expect(container.querySelectorAll('li').length).toBe(4);
  });

  it('renders labels from i18n', () => {
    renderStats();
    expect(screen.getByText(messages.en.stats.years)).toBeTruthy();
    expect(screen.getByText(messages.en.stats.records)).toBeTruthy();
    expect(screen.getByText(messages.en.stats.aws)).toBeTruthy();
    expect(screen.getByText(messages.en.stats.users)).toBeTruthy();
  });

  it('has an aria-label on the grid container', () => {
    renderStats();
    const region = screen.getByLabelText(/production stats/i);
    expect(region).toBeTruthy();
  });

  it('renders suffix spans inside each stat (the + / M+ accents)', () => {
    const { container } = renderStats();
    // Each CountUp renders a suffix span with class text-accent
    expect(container.querySelectorAll('span.text-accent').length).toBeGreaterThanOrEqual(4);
  });
});
