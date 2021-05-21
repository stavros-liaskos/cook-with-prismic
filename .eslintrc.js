module.exports = {
  extends: ['react-app', 'standard', 'prettier'],
  plugins: ['prettier', 'react-hooks'],
  rules: {
    curly: ['error', 'all'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': 'error',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
  },
  globals: {
    mount: true,
    render: true,
    shallow: true,
    document: true,
    jsdom: true,
  },
  env: {
    browser: true,
  },
};
