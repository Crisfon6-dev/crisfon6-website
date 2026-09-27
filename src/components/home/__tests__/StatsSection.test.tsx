import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { StatsSection } from '../StatsSection';
import { KEY_FACTS } from '@/data/career';

const renderStats = () =>
  render(
    <LanguageProvider>
      <StatsSection />
    </LanguageProvider>
  );

describe('StatsSection', () => {
  it('renders one cell per key fact', () => {
    const { container } = renderStats();
    expect(container.querySelectorAll('li').length).toBe(KEY_FACTS.length);
  });

  it('renders values and labels from career.ts', () => {
    renderStats();
    for (const fact of KEY_FACTS) {
      expect(screen.getByText(fact.value)).toBeTruthy();
      expect(screen.getByText(fact.label.en)).toBeTruthy();
    }
  });

  it('has an aria-label on the grid container', () => {
    renderStats();
    const region = screen.getByLabelText(/production stats/i);
    expect(region).toBeTruthy();
  });
});
