import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "stage-bg": "#07070B",
        "stage-purple": "#7C3AED",
        "stage-purple-soft": "#A855F7",
        "stage-pink": "#F43F5E",
        "stage-gold": "#F59E0B",
        "text-main": "#F9FAFB",
        "card-bg": "#0B0B12",
      },
    },
  },
  plugins: [],
};

export default config;
