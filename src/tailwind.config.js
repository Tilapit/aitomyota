/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terra': {
          wash: '#f4ece4', // Tämä on se Myötä-brändin vaalea taustaväri
        },
        'myota': {
          brown: '#4a3728', // Esimerkki, muuta jos Claude antoi eri koodit
        }
      },
    },
  },
  plugins: [],
}