/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#eef2ff',
          200: '#d9e0ff',
          300: '#b4c0ff',
          400: '#7b8eff',
          500: '#3f5bff',
          600: '#2f45ff',
          700: '#1a2de6',
          800: '#1522b8',
          900: '#121d8a',
        },
      },
      boxShadow: {
        soft: '0 24px 70px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
