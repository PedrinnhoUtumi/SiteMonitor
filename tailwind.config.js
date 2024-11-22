/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        branco: '#ffffff',
        cinza_escuro: '#131E29',
        cinza: '#253746',
        azul_escuro: '#4E769B',
        azul_claro: '#9EB5CB',
        azul_bebê: '#DDE5ED',
        bege_claro: '#D1C6B1',
        verde_menta_claro: '#A8D5BA',

      }
    },
  },
  plugins: [],
}