import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider, useLanguage } from '../LanguageProvider';
import { messages } from '../messages';

const STORAGE_KEY = 'cf6.lang';

const wrapper = ({ children }: { children: ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

beforeEach(() => {
  window.localStorage.removeItem(STORAGE_KEY);
});

afterEach(() => {
  window.localStorage.removeItem(STORAGE_KEY);
});

describe('LanguageProvider', () => {
  it('defaults to "en" on first render when no stored value', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.locale).toBe('en');
    expect(result.current.t).toBe(messages.en);
  });

  it('hydrates from localStorage.cf6.lang when a valid value is set', async () => {
    localStorage.setItem(STORAGE_KEY, 'es');
    const { result, rerender } = renderHook(() => useLanguage(), { wrapper });
    // Effect runs after first render; rerender to pick up hydrated state
    await act(async () => {
      rerender();
    });
    expect(result.current.locale).toBe('es');
    expect(result.current.t).toBe(messages.es);
  });

  it('ignores invalid stored locales (falls back to default)', async () => {
    localStorage.setItem(STORAGE_KEY, 'fr');
    const { result, rerender } = renderHook(() => useLanguage(), { wrapper });
    await act(async () => {
      rerender();
    });
    expect(result.current.locale).toBe('en');
  });

  it('toggleLocale flips en <-> es and writes to localStorage', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.locale).toBe('en');
    act(() => {
      result.current.toggleLocale();
    });
    expect(result.current.locale).toBe('es');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('es');
    act(() => {
      result.current.toggleLocale();
    });
    expect(result.current.locale).toBe('en');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('en');
  });

  it('does not crash when localStorage throws (SSR/private-mode guard)', () => {
    const origGet = Storage.prototype.getItem;
    Storage.prototype.getItem = vi.fn(() => {
      throw new Error('no access');
    });
    try {
      expect(() => render(<LanguageProvider>child</LanguageProvider>)).not.toThrow();
    } finally {
      Storage.prototype.getItem = origGet;
    }
  });

  it('does not crash when setItem throws during toggle', () => {
    const origSet = Storage.prototype.setItem;
    Storage.prototype.setItem = vi.fn(() => {
      throw new Error('quota');
    });
    try {
      const { result } = renderHook(() => useLanguage(), { wrapper });
      expect(() => act(() => result.current.toggleLocale())).not.toThrow();
      expect(result.current.locale).toBe('es');
    } finally {
      Storage.prototype.setItem = origSet;
    }
  });
});
