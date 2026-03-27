/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0B0B0F",
          secondary: "#111118",
          card: "#16161E",
          border: "#1E1E2A",
        },
        accent: {
          blue: "#3B82F6",
          "blue-dim": "#1D4ED8",
          "blue-glow": "rgba(59,130,246,0.15)",
        },
        text: {
          primary: "#F0F0F5",
          secondary: "#8888A0",
          muted: "#55556A",
        },
        bull: "#22C55E",
        bear: "#EF4444",
      },
      fontFamily: {
        display: ["'DM Serif Display'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        pulse2: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
      },
    },
  },
  plugins: [],
};
