/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5c6ac4',
        secondary: '#2ecc71',
        secondaryTwo: '#e74c3c',
        neutralBg: '#f5f5f5',
      }
    },

  },
  plugins: [require("daisyui")],
}