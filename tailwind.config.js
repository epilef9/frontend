/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'dm': ['DM Sans', 'sans-serif'],
      },
      colors: {
        'barber-red': '#E8362A',
        'barber-blue': '#2AACE8',
        'barber-dark': '#0E0E0E',
      },
      backgroundColor: {
        'barber-red': '#E8362A',
        'dark-input': 'rgba(255,255,255,0.05)',
      },
      keyframes: {
        'slide-up-fade': {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'slide-up-fade': 'slide-up-fade 0.6s ease-out both',
      },
      backdropBlur: {
        'xl': '32px',
      },
    },
  },
  plugins: [],
}