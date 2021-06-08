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
      width: {
        "2/14": "14.28571%",
        "3/14": "21.42858%",
        "9/14": "64.28571%",
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        left: "0px 2px 11px 0px #ccc",
        right: "2px 4px 6px 0px #ccc",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-debug-screens")],
};
