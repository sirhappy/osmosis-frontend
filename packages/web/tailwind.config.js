// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modals/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: {
        full: "#FFFFFF",
        high: "rgba(255, 255, 255, 0.95)",
        emphasis: "rgba(255, 255, 255, 0.87)",
        mid: "rgba(255, 255, 255, 0.6)",
        disabled: "rgba(255, 255, 255, 0.38)",
        faint: "rgba(255, 255, 255, 0.12)",
      },
      transparent: "transparent",
      primary: {
        50: "#8A86FF",
        100: "#4540D8",
        200: "#322DC2",
        300: "#2722BB",
        400: "#1D18A8",
        500: "#16119E",
        600: "#110D8B",
        700: "#0A0674",
        800: "#080559",
        900: "#02003F",
      },
      primaryVariant: "#0A0674",
      secondary: {
        50: "#F4CC82",
        100: "#D9B575",
        200: "#C4A46A",
        300: "#BC9856",
        400: "#B88E42",
        500: "#AA7E2D",
        600: "#9C701D",
        700: "#92630B",
        800: "#875903",
        900: "#734B00",
      },
      wireframes: {
        darkGrey: "#282828",
        grey: "#818181",
        lightGrey: "#B7B7B7",
      },
      background: "#170F34",
      modalOverlay: "rgba(23, 15, 52, 0.8)",
      surface: "#231D4B",
      card: "#2D2755",
      cardInner: "#3C356D",
      cardInfoPlaceholder: "#3E3866",
      iconDefault: "#8E83AA",
      error: "#CF6679",
      enabledGold: "#C4A46A",
      pass: "#34EF52",
      missionError: "#EF3456",
      black: "#000000",
      backdrop: "rgba(0, 0, 0, 0.3)",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2.25rem",
      "3xl": "3rem",
      "4xl": "3.75rem",
      "5xl": "6rem",
      h1: ["6rem", { lineHeight: "7rem", letterSpacing: "-1.5px" }],
      h2: ["3.75rem", { lineHeight: "4.5rem", letterSpacing: "-0.5px" }],
      h3: ["3rem", { lineHeight: "3.5rem", letterSpacing: "0" }],
      h4: ["2.25rem", { lineHeight: "2.25rem", letterSpacing: "0" }],
      h5: ["1.5rem", { lineHeight: "2rem", letterSpacing: "0.18px" }],
      h6: ["1.25rem", { lineHeight: "1.5rem", letterSpacing: "0.15px" }],
      subtitle1: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.15px" }],
      subtitle2: ["0.875rem", { lineHeight: "1.5rem", letterSpacing: "0.1px" }],
      body1: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.5px" }],
      body2: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.25px" }],
      button: ["0.875rem", { lineHeight: "1rem", letterSpacing: "0" }],
      caption: ["0.75rem", { lineHeight: "0.875rem", letterSpacing: "0.4px" }],
      overline: ["0.625rem", { lineHeight: "1rem", letterSpacing: "2.5px" }],
    },
    fontFamily: {
      h1: ["Poppins", "ui-sans-serif", "system-ui"],
      h2: ["Poppins", "ui-sans-serif", "system-ui"],
      h3: ["Poppins", "ui-sans-serif", "system-ui"],
      h4: ["Poppins", "ui-sans-serif", "system-ui"],
      h5: ["Poppins", "ui-sans-serif", "system-ui"],
      h6: ["Poppins", "ui-sans-serif", "system-ui"],
      subtitle1: ["Inter", "ui-sans-serif", "system-ui"],
      subtitle2: ["Inter", "ui-sans-serif", "system-ui"],
      body1: ["Inter", "ui-sans-serif", "system-ui"],
      body2: ["Inter", "ui-sans-serif", "system-ui"],
      button: ["Inter", "ui-sans-serif", "system-ui"],
      caption: ["Poppins", "ui-sans-serif", "system-ui"],
      overline: ["Poppins", "ui-sans-serif", "system-ui"],
    },
    fontWeight: {
      ...defaultTheme.fontWeight,
      h1: 600,
      h2: 600,
      h3: 600,
      h4: 600,
      h5: 600,
      h6: 600,
      subtitle1: 600,
      subtitle2: 600,
      body1: 500,
      body2: 500,
      button: 500,
      caption: 400,
      overline: 400,
    },
    backgroundImage: {
      "gradients-socialLive":
        "linear-gradient(180deg, #89EAFB 0%, #1377B0 100%)",
      "gradients-greenBeach":
        "linear-gradient(180deg, #00CEBA 0%, #008A7D 100%)",
      "gradients-kashmir": "linear-gradient(180deg, #6976FE 0%, #3339FF 100%)",
      "gradients-frost": "linear-gradient(180deg, #0069C4 0%, #00396A 100%)",
      "gradients-cherry": "linear-gradient(180deg, #FF652D 0%, #FF0000 100%)",
      "gradients-sunset": "linear-gradient(180deg, #FFBC00 0%, #FF8E00 100%)",
      "gradients-orangeCoral":
        "linear-gradient(180deg, #FF8200 0%, #FF2C00 100%)",
      "gradients-pinky": "linear-gradient(180deg, #FF7A45 0%, #FF00A7 100%)",
      "gradients-clip": "linear-gradient(180deg, #3A3369 0%, #231D4B 100%)",
      "gradients-clipInner":
        "linear-gradient(180deg, #332C61 0%, #312A5D 10.94%, #2D2755 100%)",
      "home-bg-pattern": "url('/images/osmosis-home-bg-pattern.svg')",
    },
    extend: {
      spacing: {
        sidebar: "12.875rem",
      },
      maxWidth: {
        container: "90rem",
        clipboard: "32.5rem",
      },
      boxShadow: {
        separator: "0px -1px 0px 0px rgba(255, 255, 255, 0.12)",
      },
      borderRadius: {
        lginset: "0.438rem", // 1px smaller than rounded-lg
      },
    },
  },
  plugins: [],
};
