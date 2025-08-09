const withTM = require('next-transpile-modules')([
  '@vanesterik/data',
  '@vanesterik/ui',
  '@vanesterik/utils',
])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  output: 'export',
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
})
