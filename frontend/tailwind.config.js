/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode by adding a class
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        lightgray: "#393639",
        dark: "#161618",
        primary: "rgb(167 243 208)",
        secundary: "#7b97aa",
        trd: "#84a59d",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
    plugins: [],
  },
};
