// frontend-en/postcss.config.js
module.exports = {
  plugins: {
    // IMPORT deve vir antes do tailwindcss
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
