// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      orange: {
        50: "#ffe6cc",
        100: "#ea7626",
        200: "#e66e1f",
        300: "#e16518",
      },
      yellow: {
        50: "#fff3d9",
        100: "#f8b21c",
        200: "#f5a718",
        300: "#f29f14",
      },
      blue: {
        50: "#c2e0f9",
        100: "#039f9b",
        200: "#02928c",
        300: "#02847d",
      },
      sky: {
        50: "#d9f2ff",
        100: "#25bbed",
        200: "#1faee3",
        300: "#1aa1d9",
      },
      purple: {
        50: "#ca93d5",
        100: "#763382",
        200: "#6b2e78",
        300: "#602a6e",
      },
      white: {
        100: "#ffffff",
        200: "#f9f9fa",
        300: "#d4d8dd",
        400: "#677487",
      },
      black: {
        100: "#000000",
        200: "#333333",
        300: "#666666",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
