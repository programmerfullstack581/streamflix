/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050507',
        surface: {
          DEFAULT: '#121217',
          glass: 'rgba(18, 18, 23, 0.65)',
        },
        onda: {
          cyan: '#00F0FF',
          violet: '#8A2BE2',
          purple: '#B026FF',
        }
      },
      backgroundImage: {
        'onda-gradient': 'linear-gradient(135deg, #00F0FF 0%, #8A2BE2 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(0, 240, 255, 0.4)',
        'glow-violet': '0 0 40px -10px rgba(138, 43, 226, 0.4)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
