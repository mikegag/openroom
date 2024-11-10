/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}', '/public/index.html'],
  theme: {
    extend: {
      colors : {
          'main-purple': '#6534a7',
          'dark-purple': '#3f295e',
          'light purple': '#8762b4',
          'light grey': '#F4F4F4'
    }
  },
    plugins: [],
  }
}
