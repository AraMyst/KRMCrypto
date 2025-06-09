/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // onde Tailwind deve procurar classes
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts}',
    './src/contexts/**/*.{js,ts,tsx}',
    './src/utils/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // exemplo, puxando da sua logo
        primary: '#1A73E8',
        secondary: '#34A853',
      },
      // se quiser animações/globals extras:
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
  plugins: [
    require('@tailwindcss/line-clamp'), // para .line-clamp-N
  ],
};
