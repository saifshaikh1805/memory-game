const plugin = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ubuntu-mono': ["Ubuntu Mono"],
      }
    },
  },
  plugins: [
    require('ps-scrollbar-tailwind')
  ],
  darkMode: 'class'
}
