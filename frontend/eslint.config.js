module.exports = {
  extends: 'eslint:recommended',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    quotes: ['error', 'double'],
    'no-unused-vars': ['error', { args: 'all', ignoreRestSiblings: true }],
    'no-underscore-dangle': 'off',
    // Add more rules as needed
  },
};
