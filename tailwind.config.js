const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        variable: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMElEQVQ4T2N89uzZfwY8QFJSEp80A+OoAcMiDP7//483HTx//hx/Ohg1gIFx6IcBALl+VXknOCvFAAAAAElFTkSuQmCC")`,
      },
      textColor: {
        titlebar: "rgb(204, 204, 204)",
      },
      width: {
        4.5: "1.125rem",
        "remote-icon": "34px",
        activitybar: "50px",
        activityicon: "50px",
        sidebar: "250px",
      },
      minWidth: {
        10: "2.5rem",
      },
      height: {
        4.5: "1.125rem",
        titlebar: "30px",
        statusbar: "22px",
        activityicon: "50px",
        content: "calc(100% - 52px)",
      },
      minHeight: {
        56: "17rem",
        24: "24px",
      },
      fontSize: {
        titlebar: "13px",
        variable: "14px",
        badge: "10px",
      },
      boxShadow: {
        variable: "0 4px 4px rgba(0, 0, 0, .25)",
        saturation:
          "rgb(255 255 255) 0px 0px 0px 1.5px, rgb(0 0 0 / 30%) 0px 0px 1px 1px inset, rgb(0 0 0 / 40%) 0px 0px 1px 2px",
      },
      inset: {
        badge: "9px",
      },
      transform: {
        saturation: "translate(-3px, -3px)",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
      },
      animation: {
        loader: "loader 0.75s 0s infinite linear",
      },
      keyframes: {
        loader: {
          "0%": {
            transform: "rotate(0deg) scale(1)",
          },
          "50%": {
            transform: "rotate(180deg) scale(0.8)",
          },
          "100%": {
            transform: "rotate(360deg) scale(1)",
          },
        },
      },
      colors: {
        gray: {
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f3f5",
        },
      },
      cursor: {
        crosshair: "crosshair",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".border-b-transparent": {
          borderBottomColor: "transparent",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
