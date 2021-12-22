const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      grid: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMElEQVQ4T2N89uzZfwY8QFJSEp80A+OoAcMiDP7//483HTx//hx/Ohg1gIFx6IcBALl+VXknOCvFAAAAAElFTkSuQmCC")',
    },
    colors: {
      transparent: "transparent",
      white: "#fff",
      black: "#000",
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
      blue: colors.blue,
      red: colors.red,
    },
    extend: {
      spacing: {
        1.875: "1.875rem",
        5.5: "1.375rem",
        8.75: "2.1875rem",
        12.5: "3.125rem",
        30: "7.5rem",
        62.5: "15.625rem",
      },
      textColor: {
        titlebar: "rgb(204, 204, 204)",
      },
      backgroundColor: {
        "dialog-overlay": "rgba(0, 0, 0, 0.48)",
      },
      padding: {
        1.25: "0.3125rem",
        "10px": "10px",
      },
      margin: {
        "7px": "7px",
        0.25: "0.1875rem",
      },
      width: {
        0.25: "0.0625rem",
        4.5: "1.125rem",
        "remote-icon": "34px",
      },
      maxWidth: {
        48: "12rem",
      },
      minWidth: {
        9: "2.25rem",
        10: "2.5rem",
      },
      height: {
        0.25: "0.0625rem",
        4.5: "1.125rem",
        content: "calc(100% - 52px)",
      },
      minHeight: {
        9: "2.25rem",
        56: "17rem",
        96: "24rem",
        24: "24px",
      },
      lineHeight: {
        5.5: "1.375rem",
      },
      fontSize: {
        "11px": "11px",
        "13px": "13px",
        titlebar: "13px",
        variable: "14px",
        sideBarTitle: "11px",
        badge: "10px",
      },
      transitionProperty: {
        input: "border 0.2s ease 0s, color 0.2s ease 0s",
      },
      boxShadow: {
        variable: "0 4px 4px rgba(0, 0, 0, .25)",
        saturation:
          "rgb(255 255 255) 0px 0px 0px 1.5px, rgb(0 0 0 / 30%) 0px 0px 1px 1px inset, rgb(0 0 0 / 40%) 0px 0px 1px 2px",
      },
      inset: {
        badge: "9px",
        "-4.5": "-1.125",
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
    },
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents }) {
      const newUtilities = {
        ".transform-50": {
          transform: "translate(-50%, -50%)",
        },
        ".divider-end": {
          transform: "translateY(-50%)",
          left: "auto",
          right: "7%",
        },
        ".divider-start": {
          transform: "translateY(-50%)",
          left: "7%",
        },
        ".picker-pointer": {
          transform: "translate(-4px, -4px)",
        },
      };

      const sizes = [0, 1, 2, 3, 4, 5, 6];

      sizes.forEach((size) => {
        newUtilities[`.treeindent-${size}`] = {
          left: `calc(-1.875rem * ${size + 1} + 0.75rem)`,
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1px",
          height: "100%",
          backgroundColor: "red",
          marginLeft: "-1px",
        };
      });

      addUtilities(newUtilities);
    }),
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          ".scrollbar-hide": {
            /* IE and Edge */
            "-ms-overflow-style": "none",

            /* Firefox */
            "scrollbar-width": "none",

            /* Safari and Chrome */
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },

          ".scrollbar-default": {
            /* IE and Edge */
            "-ms-overflow-style": "auto",

            /* Firefox */
            "scrollbar-width": "auto",

            /* Safari and Chrome */
            "&::-webkit-scrollbar": {
              display: "block",
            },
          },
        },
        ["responsive"]
      );
    }),
  ],
};
