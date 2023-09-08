module.exports = {
  extends: ['eslint-config-custom', 'next/core-web-vitals'],
  ignorePatterns: ['.eslintrc.js', 'postcss.config.js', 'tailwind.config.js'],
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
          { property: 'current' /* Property within `useRef` hook */ },
        ],
      },
    ],
  },
}
