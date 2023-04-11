export default {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue2-recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'sort-keys-fix/sort-keys-fix': 'off',
      },
    },
  ],
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['eslint-plugin-sort-keys-fix'],
  root: true,
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    eqeqeq: ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'error',
    'no-unused-vars': 'warn',
    'sort-imports': 'warn',
    'sort-keys-fix/sort-keys-fix': 'error',
    'vue/attributes-order': [
      'error',
      {
        alphabetical: true,
      },
    ],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/order-in-components': 'warn',
    'vue/sort-keys': ['warn', 'asc'],
  },
}
