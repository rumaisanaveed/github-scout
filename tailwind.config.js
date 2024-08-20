/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "blue-dark": "#141c2f", // Dark blue
        "blue-light": "#1f2a48", // Light blue
        "blue-sky": "#0079fe", // Sky blue
        "gray-light": "#576076",
      },
    },
  },
  plugins: [],
};
