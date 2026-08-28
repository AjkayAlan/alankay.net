// ESLint flat config for the Astro + TypeScript project.
// Reference for the Astro plugin's flat-config API:
// https://ota-meshi.github.io/eslint-plugin-astro/user-guide/#flat-config
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,

  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'public/**',
      'scripts/**',
    ],
  },
);