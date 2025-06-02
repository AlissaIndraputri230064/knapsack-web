/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        TheMinion: ['TheMinion']
      },
      colors: {
        hitam: '#231F20',
        biruMuda: '#CFE4F2',
        biru: '#0A75BC',
        kuning: '#FCE029',
        abu: '#E8EBEE',
        putih: '#FFFFFF'
      },
      borderRadius: {
        DEFAULT : '18px'
      }
    }
  },
  plugins: [require('tailwindcss-motion')],
};
