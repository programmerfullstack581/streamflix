/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          'green-bright': '#1ed760',
          black: '#121212',
          dark: '#000000',
          base: '#121212',
          card: '#181818',
          hover: '#282828',
          subdued: '#a7a7a7',
          highlight: '#333333'
        }
      },
      fontFamily: {
        sans: ['CircularSp', 'Circular', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
