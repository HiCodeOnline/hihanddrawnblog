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
        paper: {
          50: "#fdfcf8",
          100: "#faf6ec",
          200: "#f3ecda",
          300: "#e8ddc0",
          400: "#d9c79c",
          500: "#c9b078",
          600: "#b59560",
        },
        ink: {
          50: "#f7f5f2",
          100: "#ece8e1",
          200: "#d4cdc0",
          300: "#b3a894",
          400: "#8a7e68",
          500: "#6b5f4a",
          600: "#4f4635",
          700: "#3a3326",
          800: "#2a2519",
          900: "#1a1710",
        },
        sage: {
          50: "#f4f7f3",
          100: "#e6ede2",
          200: "#cddcc5",
          300: "#a8c29b",
          400: "#7fa46d",
          500: "#5f874e",
          600: "#4a6b3d",
        },
        rose: {
          50: "#fcf5f4",
          100: "#fbe8e5",
          200: "#f6cfc8",
          300: "#ecaca1",
          400: "#dd7d6d",
          500: "#c75a4a",
          600: "#a84436",
        },
        sky: {
          50: "#f4f8fb",
          100: "#e4eef5",
          200: "#c7dcec",
          300: "#9bc0dd",
          400: "#6a9cc6",
          500: "#4a7eac",
          600: "#3a658d",
        },
        butter: {
          50: "#fefcf3",
          100: "#fdf6df",
          200: "#fbe9b4",
          300: "#f7d77c",
          400: "#f0c149",
          500: "#e0a82a",
          600: "#bd881f",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Songti SC",
          "SimSun",
          "serif",
        ],
        hand: [
          "var(--font-hand)",
          "KaiTi",
          "STKaiti",
          "cursive",
        ],
      },
      boxShadow: {
        paper: "0 1px 3px rgba(74, 70, 53, 0.06), 0 8px 24px rgba(74, 70, 53, 0.08)",
        "paper-hover":
          "0 4px 12px rgba(74, 70, 53, 0.1), 0 16px 40px rgba(74, 70, 53, 0.12)",
        "paper-sticky": "2px 4px 12px rgba(74, 70, 53, 0.15)",
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(circle at 1px 1px, rgba(74,70,53,0.05) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "wobble": {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "float-soft": "float-soft 4s ease-in-out infinite",
        "wobble": "wobble 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
