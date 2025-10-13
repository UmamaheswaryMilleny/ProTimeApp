// eslint.config.cjs
const parser = require('@typescript-eslint/parser');
const plugin = require('@typescript-eslint/eslint-plugin');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: ['node_modules', 'dist'], // ignore build output
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': plugin,
    },
    rules: {
      ...plugin.configs.recommended.rules, // include recommended rules
      // ✅ add your own overrides here
    },
  },
];
