/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados de barbería
        'barber-red': '#DC143C',
        'barber-blue': '#1E3A8A',
        'barber-black': '#0A0A0A',
      },
    },
  },
  plugins: [],
}