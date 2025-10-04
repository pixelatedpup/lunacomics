import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
          "modal-in":{
            "0%":{transform: "translateY(100%)", opacity: "0"},
            "100%": {transform: "translateY(0)", opacity: "1"}
          },
          "modal-out":{
            "0%":{transform: "translateY(0)", opacity: "1"},
            "100%": {transform: "translateY(100%)", opacity: "0"}
          }
      },
      animation:{
          "modal-in": "modal-in 0.5s ease-out forwards",
          "modal-out": "modal-out 0.5s ease-in forwards",
      }
    }
    ,


    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
    },

  },
  plugins: [],
}

