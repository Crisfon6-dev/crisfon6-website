import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { messages } from '@/i18n/messages';

test('renders brand name', () => {
  render(<Footer />);
  // brand mark (Logo) + mega watermark
  expect(screen.getAllByText('crisfon6').length).toBeGreaterThanOrEqual(1);
});

test('renders social links including email', () => {
  render(<Footer />);
  expect(screen.getByText('LinkedIn')).toBeDefined();
  expect(screen.getByText('GitHub')).toBeDefined();
  expect(screen.getByText('crisfon6@crisfon6.com')).toBeDefined();
});

test('renders navigation links', () => {
  render(<Footer />);
  expect(screen.getByText('About')).toBeDefined();
  expect(screen.getByText('Experience')).toBeDefined();
  expect(screen.getByText('Projects')).toBeDefined();
  expect(screen.getByText('PowerAI')).toBeDefined();
});

test('links Experience to /experience', () => {
  render(<Footer />);
  expect(screen.getByText('Experience').closest('a')?.getAttribute('href')).toBe('/experience');
});

test('renders copyright', () => {
  render(<Footer />);
  expect(screen.getByText(/Cristhian Fonseca/)).toBeDefined();
});

test('discloses in English that the hero film and imagery are AI-generated', () => {
  render(<Footer />);
  const note = screen.getByTestId('ai-media-note');
  expect(note.textContent).toBe(messages.en.footer.aiMedia);
  expect(note.textContent).toMatch(/AI/);
});

test('discloses the same in Spanish when the language is ES', () => {
  window.localStorage.setItem('cf6.lang', 'es');
  render(
    <LanguageProvider>
      <Footer />
    </LanguageProvider>
  );
  expect(screen.getByTestId('ai-media-note').textContent).toBe(messages.es.footer.aiMedia);
  expect(messages.es.footer.aiMedia).toMatch(/IA/);
  window.localStorage.removeItem('cf6.lang');
});
