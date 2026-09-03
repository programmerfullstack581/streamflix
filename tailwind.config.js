/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          dark: '#141414',
          card: '#181818',
          hover: '#282828',
          gray: '#808080'
        }
      },
      fontFamily: {
        sans: ['Netflix Sans', 'Helvetica Neue', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
