/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#0075F2',
        color1F1F1F: '#1F1F1F',
        textColor: '#333333',
        color666666: '#666666',
        color030637: '#030637',
        color242428: '#242428',
        colorA6A6A6: '#A6A6A6',
        color2B2B31: '#2B2B31',
        colorE9E9EC: '#E9E9EC',
        color30394A: '#30394A',
        color6FBCD6: '#6FBCD6',
        color6644EA: '#6644EA',
      },
      height: {
        800: '1280px'
      }
    }
  },
  plugins: []
}
