import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Generated artifacts
    'coverage/**',
    'playwright-report/**',
    // Design reference bundle (Babel-inline React prototype) — not production code
    'design_handoff_crisfon6_redesign/**',
  ]),
  // Respect the TypeScript convention of prefixing intentionally unused params with _.
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  // Must be last — disables ESLint rules that conflict with Prettier formatting.
  eslintConfigPrettier,
]);

export default eslintConfig;
