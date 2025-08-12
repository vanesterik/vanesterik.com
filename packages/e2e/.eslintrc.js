module.exports = {
  extends: ['eslint-config-custom'],
  ignorePatterns: ['.eslintrc.js', 'playwright.config.ts'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
}
