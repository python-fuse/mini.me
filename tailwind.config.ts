import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#edf2fb",
          100: "#122850",
          200: "#234fa1",
          300: "#4e7ed8",
          400: "#9eb8ea",
          500: "#edf2fb",
          600: "#f2f5fc",
          700: "#f5f8fd",
          800: "#f8fafe",
          900: "#fcfdfe",
        },
        primary: {
          DEFAULT: "#d7e3fc",
          100: "#072057",
          200: "#0d40af",
          300: "#2b69ef",
          400: "#82a6f6",
          500: "#d7e3fc",
          600: "#e1eafd",
          700: "#e8effd",
          800: "#f0f4fe",
          900: "#f7fafe",
        },
        secondary: {
          DEFAULT: "#c1d3fe",
          100: "#011b58",
          200: "#0337b1",
          300: "#1258fb",
          400: "#6a96fd",
          500: "#c1d3fe",
          600: "#cfddfe",
          700: "#dbe6fe",
          800: "#e7eeff",
          900: "#f3f7ff",
        },
        tertiary: {
          DEFAULT: "#abc4ff",
          100: "#001a56",
          200: "#0033ab",
          300: "#024eff",
          400: "#588aff",
          500: "#abc4ff",
          600: "#bed1ff",
          700: "#ceddff",
          800: "#dee8ff",
          900: "#eff4ff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
