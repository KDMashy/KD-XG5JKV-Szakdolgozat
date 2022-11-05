/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          100: "#f9fafe",
          200: "#d8edf7",
          300: "#979eb8",
          400: "#565580",
        },
        dark: {
          100: "#e9e7e7",
          200: "#b5b7ce",
          300: "#525252",
          400: "#4b4b4b",
          500: "#1f1f1f",
          600: "#74737a",
          700: "#6a6c73",
          800: "#31312e",
        },
        card: {
          100: "#2e7aae",
          200: "#14174a",
        },
        success: {
          100: "#dcf8eb",
          200: "#11cd76",
          300: "#0ba25c",
          400: "#77a06e",
          500: "#2b7239",
          600: "#13500f",
        },
        warning: {
          100: "#fffbf0",
          200: "#e8d71a",
          300: "#e4b531",
        },
        error: {
          100: "#fdf3f6",
          200: "#ffd8db",
          300: "#ff3f4e",
          400: "#d73334",
          500: "#cf1b25",
          600: "#b21827"
        },
        fade: {
          white: "rgba(255, 255, 255, .8)",
          gray: "rgba(255,255,255.9)",
        },
        customBlue: "#72b5fd",
      },
      fontFamily: {
        mukta: ["'Mukta', sans-serif"],
        rubik: ["'Rubik', sans-serif"],
        noto: ["'Noto Sans', sans-serif"],
      },
      borderWidth: {
        3: "3px",
      },
      borderColor: {
        primary: {
          400: "#565580",
        },
        secondary: {
          200: "#b5b7ce",
        },
      },
      borderRadius: {
        "3px": "3px",
      },
      fontSize: {
        "11px": "11px",
        "13px": "13px",
        "14px": "14px",
      },
      boxShadow: {
        custom: "0 1px 4px 0 rgba(0, 0, 0, 0.13)",
        avatar: "0 0 8px 1px rgba(0, 0, 0, 0.08)",
        menu: "0 0 25px 6px rgba(0, 0, 0, 0.05)",
        welcomeCard: "0 0 51px 0 rgba(0, 0, 0, 0.1)",
        pitchCard: "0 0 2px 0 rgba(0, 0, 0, 0.5)",
        videoCard: "0 0 4px 0 rgba(0, 0, 0, 0.2)",
        blogCard: "0 0 30px 0 rgba(0, 0, 0, 0.05)",
        modal: "0 0 30px 0 rgba(0, 0, 0, 0.05)",
        box: "0 20px 25px 6px rgba(0, 0, 0, 0.05)",
        form: "0 0 30px 0 rgba(0, 0, 0, 0.07)",
        floatingButton: "0 0 40px 0 rgba(0, 0, 0, 0.05)",
        mask: "0 13px 15px 6px rgba(0, 0, 0, 0.05)",
        mobileMenu: "inset 0px 20px 20px -15px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        rotate: "rotating 2.5s linear infinite",
      },
      keyframes: {
        rotating: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumnStart: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
      },
      gridColumnEnd: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
      },
      zIndex: {
        100: "100",
      },
      backdropBlur: {
        xs: "2px",
      },
      padding: {
        4.5: "18px",
      },
      margin: {
        4.5: "18px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "90%",
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        },
      });
    },
  ],
}
