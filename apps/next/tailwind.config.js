const config = require('@vanesterik/config/tailwind')
const path = require('path')

module.exports = {
  ...config,
  content: [
    path.resolve('./src/**/*.{ts,tsx}'),
    path.join(path.dirname(require.resolve('@vanesterik/ui')), '**/*.ts'),
  ],
}
