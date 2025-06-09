// frontend-en/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,tsx}',
    './src/contexts/**/*.{js,ts,tsx}',
    './src/utils/**/*.{js,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5691BB',
        'primary-dark': '#4A7FA3',
        secondary: '#34A853',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  // removido '@tailwindcss/line-clamp' para evitar erro de módulo não encontrado
  plugins: [],
};
