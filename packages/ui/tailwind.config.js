const config = require('@vanesterik/config/tailwind')
const path = require('path')

module.exports = {
  ...config,
  content: [path.resolve('./**/*.{md,mdx,ts,tsx}')],
}
