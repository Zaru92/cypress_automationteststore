import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginCypress from 'eslint-plugin-cypress';
import pluginMocha from 'eslint-plugin-mocha';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'reports/**',
      'coverage/**',
      'dist/**',
      'cypress/downloads/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },

  {
    files: ['cypress/**/*.ts'],
    extends: [pluginCypress.configs.recommended],
    plugins: {
      mocha: pluginMocha,
    },
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
    rules: {
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/no-force': 'warn',
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-pending-tests': 'error',
    },
  },

  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-namespace': 'off',
    },
  },

  eslintConfigPrettier,
);
