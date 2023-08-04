module.exports = {
  extends: ['eslint-config-custom', 'eslint-config-custom/react'],
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
}
