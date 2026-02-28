/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {},
  plugins: [require("daisyui")],
}