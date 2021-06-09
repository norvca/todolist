module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.ejs", "./src/**/*.css"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    debugScreens: {
      position: ["top", "right"],
    },
    extend: {
      colors: {
        green: {
          light: "#8fb4aa",
          DEFAULT: "#58b4ab",
          dark: "#43968E",
        },
        purple: {
          DEFAULT: "#66638b",
          dark: "#504E6D",
        },
        red: {
          light: "#da9798",
          DEFAULT: "#da635d",
          dark: "#B1534E",
        },
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
        detail: "0px 2px 11px 0px #ccc",
        nav: "2px 4px 6px 0px #ccc",
        header: "0px 2px 11px 0px #ccc",
        task: "2px 2px 6px 0px #888",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: "dark",
      borderWidth: "dark",
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};
