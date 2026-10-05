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
        bg: "#F7F7F5",
        surface: "#FFFFFF",
        "text-primary": "#111111",
        muted: "#686868",
        border: "#D9D9D4",
        accent: "#15B87A",
        "accent-dark": "#087A55",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(3rem,8vw,5.75rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "hero-sm": ["clamp(2.5rem,6vw,4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section": ["clamp(2rem,3.5vw,3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      spacing: {
        "section": "7rem",
        "section-sm": "4rem",
      },
      borderRadius: {
        "pill": "9999px",
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.9)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
