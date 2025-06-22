/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
    './src/hooks/**/*.{js,ts,tsx}',
    './src/contexts/**/*.{js,ts,tsx}',
    './src/utils/**/*.{js,ts,tsx}',
    './src/styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',       // roxo da marca
        'primary-dark': '#5B21B6',
        'nav-primary': '#672FAA',
        'nav-primary-dark': '#522588',
        'footer-bg': '#431464',
        'footer-link': '#9b6bd4',
        // secundária se precisar…
      },
      keyframes: { /* …mesmo do marquee… */ },
      animation: { /* …mesmo do marquee… */ },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
