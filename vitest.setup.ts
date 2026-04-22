import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Mock IntersectionObserver for Framer Motion's whileInView
global.IntersectionObserver = class IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as unknown as typeof IntersectionObserver;

// Polyfill a full Storage API on window.localStorage — Node 25's experimental
// localStorage is an incomplete implementation missing removeItem/clear/key.
const createMemoryStorage = (): Storage => {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
    removeItem(key: string) {
      store.delete(key);
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
  };
};

Object.defineProperty(window, 'localStorage', {
  value: createMemoryStorage(),
  writable: true,
  configurable: true,
});

afterEach(() => {
  cleanup();
});
