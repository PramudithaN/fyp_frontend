/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* ── Page / surface backgrounds ── */
        "pc-black":    "#09090E",
        "pc-surface":  "#111118",
        "pc-elevated": "#18181F",
        "pc-overlay":  "#1E1E28",

        /* ── Legacy oil-* aliases so existing JSX doesn't break ── */
        "oil-black":   "#09090E",
        "oil-dark":    "#111118",
        "oil-card":    "#18181F",
        "oil-surface": "#1E1E28",
        "oil-slate":   "#2A2A36",

        /* ── Brand accent ── */
        "pc-gold":        "#F59E0B",
        "pc-gold-light":  "#FCD34D",
        "oil-gold":       "#F59E0B",
        "oil-amber":      "#D97706",
        "oil-light-gold": "#FCD34D",

        /* ── Semantic: Positive / Negative (CORRECTED) ── */
        "pc-green":  "#22C55E",
        "pc-red":    "#EF4444",
        "oil-green": "#22C55E",  /* Fixed: was #F59E0B */
        "oil-red":   "#EF4444",  /* Fixed: was #9ca3af */

        /* ── Data visualization ── */
        "pc-sky":     "#38BDF8",  /* Actual price data line */
        "pc-violet":  "#A78BFA",  /* Explainability / AI */
        "pc-emerald": "#34D399",  /* Analytics comparison */
        "oil-blue":   "#38BDF8",  /* Fixed: was #3B82F6 */
        "oil-cyan":   "#38BDF8",  /* Fixed: was #F59E0B (wrong!) */

        /* ── Text scale ── */
        "text-primary":   "#F1F5F9",
        "text-secondary": "#94A3B8",
        "text-muted":     "#475569",
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "Cascadia Code", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-18px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245, 158, 11, 0.12)" },
          "50%":      { boxShadow: "0 0 40px rgba(245, 158, 11, 0.28)" },
        },
        "gradient-shift": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn:          "fadeIn 0.5s ease-out forwards",
        shimmer:         "shimmer 2.2s infinite linear",
        float:           "float 7s ease-in-out infinite",
        "pulse-glow":    "pulse-glow 2.5s ease-in-out infinite",
        "gradient-shift":"gradient-shift 8s ease infinite",
        "slide-up":      "slide-up 0.4s ease-out forwards",
        "spin-slow":     "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
