/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Redefinimos los colores "sky" que usa toda la App para que coincidan con la paleta de Drone.io
        sky: {
          50: '#F4F9FD',
          100: '#E9F1FA', // Azul claro (Fondo/Detalles)
          200: '#CBE0F5',
          300: '#A0CAEE',
          400: '#4DBEF0', // Azul transicin
          500: '#00ABE4', // Azul brillante (CTA / Brand Principal)
          600: '#008EBD',
          700: '#007198',
          800: '#005F7C',
          900: '#004F69',
        },
        blue: {
          400: '#4DBEF0',
          500: '#00ABE4',
          600: '#008EBD',
        },
        brand: {
          light: '#E9F1FA',
          primary: '#00ABE4',
          white: '#FFFFFF'
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
