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
        azul_mais_escuro: '#2C4F75',
        azul_claro: '#9EB5CB',
        branco_suave: '#F4F4F4',
        azul_bebe: '#DDE5ED',
        bege_claro: '#D1C6B1',
        verde_menta_claro: '#A8D5BA',
        verde_menta_escuro: '#70DC9B',

      }
    },
  },
  plugins: [],
}