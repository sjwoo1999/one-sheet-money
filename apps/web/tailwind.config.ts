
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        action: "var(--ll-action)",
        surface: "var(--ll-surface)",
        border: "var(--ll-border)",
        text: "var(--ll-text)",
        muted: "var(--ll-text-muted)",
        positive: "var(--ll-positive)",
        warning: "var(--ll-warning)",
        critical: "var(--ll-critical)"
      },
      boxShadow: { 1: "var(--ll-shadow-1)", 2: "var(--ll-shadow-2)" },
      borderRadius: { "2xl": "var(--ll-radius-2xl)" },
      fontFamily: { sans: ["var(--ll-font-sans)"] }
    }
  },
  plugins: []
};
export default config;
