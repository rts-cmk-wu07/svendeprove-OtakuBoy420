/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        black: colors.black,
        white: colors.white,
        background: "#121212",
        primary: "#f1f1f1",
        secondary: "#1E1E1E",
        dimWhite: "rgba(255, 255, 255, 0.8)",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "450px",
        "2xl": "1440px",
      },
    },
  },

  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
