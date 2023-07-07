/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: `wiggle 1.2s ease-in-out infinite`,
      },
      keyframes: {
        wiggle: {
          '0%' : { transform: 'rotate(0deg)', scale: '4' },
          '70%' : { transform: 'rotate(0deg)' },
          '80%' : { transform: 'rotate(5deg)' },
         '90%' : { transform: 'rotate(-5deg)' },
         '100%' : { transform: 'rotate(0deg)', scale: '4' },
        }
      },
    },
  },
  plugins: [],
}

