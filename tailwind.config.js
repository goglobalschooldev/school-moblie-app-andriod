/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./screens//*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bayon':'Bayon-Regular',
        'kantunruy-regular':'Kantumruy-Regular',
        'kantunruy-bold':'Kantumruy-Bold',
        'kantunruy-light':'Kantumruy-Light'
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'blue': '#6795C0',
      'blue-thin': '#DCEEFF',
      'orange':'#D17821',
      'orange-thin':'#FFEEDB',      
      'purple': '#A64B9A',
      'yellow': '#D6A400',
      'yellow-thin' : '#FFECAC',
      'red': '#D7242A',
      'gray': '#6E6E6E',
      'pink': '#D73275',
      'background':'#F1F0F5',
      'main':'#3C6EFB'
    },
  },
  plugins: [],
}

