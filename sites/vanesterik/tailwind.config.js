const config = require('config/tailwind')

module.exports = {
  ...config,
  content: {
    relative: true,
    files: ['../../packages/ui/src/**/*.{md,mdx,ts,tsx}'],
  },
}
