/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redstream: {
          primary: '#E50914',
          neon: '#FF0033',
          dark: '#000000',
          carbon: '#0a0a0a',
          card: '#141414',
          cardHover: '#1f1f1f',
          muted: '#8e8e8e',
          accent: '#FF334B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'red-neon': '0 0 25px rgba(229, 9, 20, 0.4)',
        'red-glow': '0 0 15px rgba(255, 0, 51, 0.6)',
      }
    },
  },
  plugins: [],
}
