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
        // cores baseadas na logo
        primary: '#5691BB',
        'primary-dark': '#4A7FA3',
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
