/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050807",
        ink: "#0a0f0c",
        panel: "#0d1512",
        panel2: "#111c17",
        line: "#1a2620",
        phosphor: "#39e07a",
        "phosphor-bright": "#8dffc4",
        signal: "#ffb454",
        wire: "#5ee8ff",
        fault: "#ff6b6b",
        fg: "#c7d4cb",
        muted: "#5c7268",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
        display: ["'Space Grotesk'", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(57,224,122,0.35)",
        "glow-sm": "0 0 18px -4px rgba(57,224,122,0.4)",
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        blink: { "50%": { opacity: 0 } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
