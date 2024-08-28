import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx,jsx}",
    "./src/**/*.{ts,tsx,jsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        muteColor: "#6c757d",
        jobBg: "#dceeff",
        bannerText: "#f47920",
        primary: "#F08000", // Example: Add a primary color
        bg: "#DBEDFF", // Example: Add a secondary color
        secondary: "#04157d",
        secondaryHover: "#0a0a45",
        textBlack: "#111",
        searchJobBg: "#f7e2cb",
        widgetBgColor: "#e6f0f9",
        widgetColor: "#17171d",
        borderColor: "#dedede",
        widgetHoverColor: "#c36d0b",
        accent: "#38b2ac", // Example: Add an accent color
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  prefix: "",
  plugins: [require("tailwindcss-animate"), flowbite.plugin()],
};

export default config;
