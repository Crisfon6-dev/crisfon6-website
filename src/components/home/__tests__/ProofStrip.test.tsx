import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { ProofStrip } from '@/components/home/ProofStrip';
import { KEY_FACTS } from '@/data/career';

afterEach(() => window.localStorage.removeItem('cf6.lang'));

const renderStrip = () =>
  render(
    <LanguageProvider>
      <ProofStrip />
    </LanguageProvider>
  );

describe('ProofStrip', () => {
  it('shows every verified key fact with its value, so proof lands before the film', () => {
    renderStrip();
    for (const fact of KEY_FACTS) {
      expect(screen.getByText(fact.value)).toBeTruthy();
      expect(screen.getByText(fact.label.en)).toBeTruthy();
    }
  });

  it('speaks Spanish when the language is ES', () => {
    window.localStorage.setItem('cf6.lang', 'es');
    renderStrip();
    expect(screen.getByText(KEY_FACTS[0].label.es)).toBeTruthy();
  });
});
