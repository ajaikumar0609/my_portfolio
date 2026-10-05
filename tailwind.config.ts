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
        bg: "#050505",
        surface: "#0d0d0d",
        "text-primary": "#F4F1EA",
        muted: "rgba(244,241,234,0.4)",
        border: "rgba(244,241,234,0.08)",
        lime: "#B8FF3D",
        cyan: "#4DE8FF",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "Space Grotesk", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "monospace"],
      },
      animation: {
        "blink": "blink 1.2s step-end infinite",
        "orbit-1": "orbit 12s linear infinite",
        "orbit-2": "orbit 20s linear infinite reverse",
        "orbit-3": "orbit 30s linear infinite",
        "pulse-gps": "pulse-gps 2s ease-in-out infinite",
        "dash": "dash 3s linear infinite",
        "vehicle-move": "vehicle-move 4s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-gps": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        dash: {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
        "vehicle-move": {
          "0%": { offsetDistance: "0%" },
          "100%": { offsetDistance: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
