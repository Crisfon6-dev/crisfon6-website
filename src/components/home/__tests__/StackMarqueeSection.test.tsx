import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { StackMarqueeSection } from '../StackMarqueeSection';
import { messages } from '@/i18n/messages';

const renderMarquee = () =>
  render(
    <LanguageProvider>
      <StackMarqueeSection />
    </LanguageProvider>
  );

describe('StackMarqueeSection', () => {
  it('renders a marquee region', () => {
    renderMarquee();
    expect(screen.getByRole('region', { name: /tech stack/i })).toBeTruthy();
  });

  it('renders every tech chip (duplicated 2x for seamless loop)', () => {
    renderMarquee();
    const aws = screen.getAllByText('AWS');
    expect(aws.length).toBe(2); // original + duplicate
    const claude = screen.getAllByText('Claude API');
    expect(claude.length).toBe(2);
  });

  it('renders all i18n stack items', () => {
    renderMarquee();
    for (const item of messages.en.marquee.items) {
      expect(screen.getAllByText(item).length).toBe(2);
    }
  });
});
