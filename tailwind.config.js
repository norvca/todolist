module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.ejs", "./src/**/*.css"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    debugScreens: {
      position: ["top", "right"],
    },
    extend: {
      colors: {
        green: "#58b4ab",
        "green-light": "#8fb4aa",
        purple: "#66638b",
        red: "#da635d",
        "red-light": "#da9798",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-debug-screens")],
};
