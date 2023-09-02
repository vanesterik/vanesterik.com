module.exports = {
  extends: ['eslint-config-custom', 'eslint-config-custom/react'],
  ignorePatterns: [
    '.eslintrc.js',
    'postcss.config.js',
    'tailwind.config.js',
    'vite.config.js',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    'fp/no-mutation': [
      'error',
      {
        exceptions: [
          { property: 'argTypes' },
          { property: 'fillStyle' },
          { property: 'lineWidth' },
          { property: 'strokeStyle' },
        ],
      },
    ],
  },
}
