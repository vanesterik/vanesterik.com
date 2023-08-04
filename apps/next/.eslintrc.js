module.exports = {
  extends: ['eslint-config-custom', 'next/core-web-vitals'],
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
}
