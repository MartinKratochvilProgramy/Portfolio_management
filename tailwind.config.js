/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueGradient: 'linear-gradient(to right, #373b44, #4286f4)'
      },
      backgroundColor: {
        blueGradient: 'background: #373b44; background: -webkit-linear-gradient(to right, #373b44, #4286f4); background: linear-gradient(to right, #373b44, #4286f4);'
      }
    },
  },
  plugins: [],
}