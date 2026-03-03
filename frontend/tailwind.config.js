/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      black: "#000000",
      gray: "#EFEFEF",
      white: "#FFFFFF",
      primary: "#0D9488", // Teal profundo
      secondary: "#10B981", // Esmeralda
      dark: "#3A4147", // Dark Gray
      light: "#F6F6EF", // Off White
      accent: "#10B981", // Matching Secondary
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      display: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
