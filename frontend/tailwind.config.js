/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#080f1a',
        'dark-surface': '#0d1f35',
        'dark-border': '#1e3a5f',
        'brand': '#7DD3FC',
        'brand-light': '#BAE6FD',
      },
    },
  },
  plugins: [],
}

