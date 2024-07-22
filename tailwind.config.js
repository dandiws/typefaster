/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--color-background)",
        typingBackground: "var(--color-typingBackground)",
        typingText: "var(--color-typingText)",
        untypedLetter: "var(--color-untypedLetter)",
        correctLetter: "var(--color-correctLetter)",
        incorrectLetter: "var(--color-incorrectLetter)",
        extraLetter: "var(--color-extraLetter)",
        caret: "var(--color-caret)",
      },
      keyframes: {
        opacityBreath: {
          "50%": {
            opacity: 0,
          },
        },
      },
      animation: {
        caret: "opacityBreath 1s steps(1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
