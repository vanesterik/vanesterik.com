const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.resolve('./src/**/*.{md,mdx,ts,tsx}')],
  darkMode: 'class',
  theme: {
    colors: {
      black: colors.black,
      red: colors.red,
      stone: colors.stone,
      white: colors.white,
    },
    fontFamily: {
      sans: ['Lausanne', ...defaultTheme.fontFamily.sans],
      mono: ['NB International Pro Mono', ...defaultTheme.fontFamily.mono],
    },
  },
}
