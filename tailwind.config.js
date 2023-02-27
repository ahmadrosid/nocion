// @ts-check
/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#F7F6F3",
          300: "#E8E7E4",
          600: "#A1A09C",
          700: "#747474",
          800: "#3d3d3d",
          900: "#37352F"
        }
      }
    },
  },
};
