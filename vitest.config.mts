import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      // Baseline (2026-04-15): lines 78%, funcs 71%, branches 63%, stmts 75%
      // Thresholds set at baseline - 5% to prevent regression without blocking growth
      thresholds: {
        lines: 73,
        functions: 65,
        branches: 58,
        statements: 70,
      },
      // No `include` here — counts only files actually imported by tests (organic coverage).
      // Adding `include: ["src/**/*.{ts,tsx}"]` would count ALL source files, making baseline ~23%.
      exclude: ['src/**/*.test.*', 'src/**/*.stories.*'],
    },
  },
});
