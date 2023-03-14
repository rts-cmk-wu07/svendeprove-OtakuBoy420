/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        black: colors.black,
        white: colors.white,
        primary: "#5E2E53",
        secondary: "#E1A1E9",
        dimWhite: "#EAEAEA",
      },
      fontFamily: {
        sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto", "sans-serif"],
        racing: ["Racing Sans One", "sans-serif"],
      },
      boxShadow: {
        primary: "3px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        welcome: "url('./assets/images/splash-image.jpg')",
      },
      fontSize: {
        base: "18px",
        lg: "24px",
        xl: "36px",
        "2xl": "48px",
      },
    },
  },

  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *")
      addVariant("child-hover", "& > *:hover")
    },
    function ({ addBase }) {
      addBase({
        html: { fontSize: "18px" },
      })
    },
  ],
}
