/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#366B45"
      },

      fontFamily: {
        primary: ["Kanit"],
        digital: ["DS-Digital"],
        spacemono: ["Space Mono"],
      },
    },
  },
  plugins: [],
};
