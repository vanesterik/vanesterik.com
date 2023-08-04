const withTM = require('next-transpile-modules')([
  '@vanesterik/data',
  '@vanesterik/ui',
])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
})
