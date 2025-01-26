/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      violet: "#985ACE",
      white: "#ffffff",
      purple: "F8F1FF",
    },
    spacing: {
      width: {
        a4: "80vw",
      },
      height: {
        a4: "297mm",
      },
    },
  },
  plugins: [],
};
