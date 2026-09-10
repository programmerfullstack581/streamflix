/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#F9FEEB', // Very light tint
          100: '#EBFDC2',
          200: '#DDFB99',
          300: '#D0FA70',
          400: '#BAFF39', // Accent
          500: '#BAFF39', // Accent (Amarillo-verde)
          600: '#9AE01F',
          700: '#6E6E6E', // requested faint gray
          800: '#505050',
          900: '#333333',
        },
        blue: {
          400: '#BAFF39',
          500: '#BAFF39',
          600: '#9AE01F',
        },
        slate: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6E6E6E', // requested faint gray
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      screens: {
        'xs': '420px',
      }
    },
  },
  plugins: [],
}
