import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "600": "600ms"
      },
      transitionTimingFunction: {
        "standard": "cubic-bezier(0.4, 0, 0.2, 1)",
        "accelerate": "cubic-bezier(0.4, 0, 1, 1)",
        "decelerate": "cubic-bezier(0, 0, 0.2, 1)"
      }
    }
  },
  plugins: []
};

export default config;
