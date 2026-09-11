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
          50: '#F4F4F5',
          100: '#E4E4E7',
          200: '#D4D4D8',
          300: '#A1A1AA',
          400: '#71717A',
          500: '#18181B', // Zinc 900 (Casi Negro)
          600: '#09090B', // Zinc 950
          700: '#000000', // Negro puro
          800: '#000000',
          900: '#000000',
        },
        blue: {
          50: '#F4F4F5',
          100: '#E4E4E7',
          200: '#D4D4D8',
          300: '#A1A1AA',
          400: '#71717A',
          500: '#18181B', // Zinc 900
          600: '#09090B',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        red: {
          500: '#27272A', // Zinc 800
          600: '#18181B', // Zinc 900
          700: '#09090B', // Zinc 950
        },
        rose: {
          500: '#27272A', 
          600: '#18181B', 
          700: '#09090B', 
        }
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
