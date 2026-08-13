/** @type {import('tailwindcss').Config} */
// DriveFlow — Cinematic Dark Automotive Design System
// Deep black foundation with restrained warm gold accent.
// Editorial typography hierarchy for premium visual identity.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ─── Core Surfaces ───────────────────────────────────────────────
        background: "#0a0a0a",
        surface: "#111111",
        "surface-dim": "#0d0d0d",
        "surface-bright": "#1a1a1a",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#141414",
        "surface-container": "#1a1a1a",
        "surface-container-high": "#222222",
        "surface-container-highest": "#2a2a2a",
        "surface-variant": "#1e1e1e",
        "surface-tint": "#c9a96e",

        // ─── On-Surface (Typography) ─────────────────────────────────────
        "on-background": "#e8e6e3",
        "on-surface": "#e8e6e3",
        "on-surface-variant": "#6b6b6b",

        // ─── Primary (Warm Gold) ─────────────────────────────────────────
        primary: "#c9a96e",
        "primary-container": "#1a1508",
        "primary-fixed": "#e8d5a8",
        "primary-fixed-dim": "#b89a5a",
        "primary-fixed-variant": "#a8894e",
        "on-primary": "#0a0a0a",
        "on-primary-container": "#c9a96e",
        "on-primary-fixed": "#1a1508",
        "on-primary-fixed-variant": "#2a2010",

        // ─── Secondary (Neutral Gray) ────────────────────────────────────
        secondary: "#888888",
        "secondary-container": "#2a2a2a",
        "secondary-fixed": "#cccccc",
        "secondary-fixed-dim": "#999999",
        "on-secondary": "#0a0a0a",
        "on-secondary-container": "#aaaaaa",
        "on-secondary-fixed": "#1a1a1a",
        "on-secondary-fixed-variant": "#333333",

        // ─── Tertiary (Warm Copper) ──────────────────────────────────────
        tertiary: "#b87333",
        "tertiary-container": "#2a1a0a",
        "tertiary-fixed": "#d4a574",
        "tertiary-fixed-dim": "#a66528",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#d4a574",
        "on-tertiary-fixed": "#2a1a0a",
        "on-tertiary-fixed-variant": "#3a2510",

        // ─── Outline ────────────────────────────────────────────────────
        outline: "#3a3a3a",
        "outline-variant": "#252525",

        // ─── Inverse ────────────────────────────────────────────────────
        "inverse-surface": "#e8e6e3",
        "inverse-on-surface": "#0a0a0a",
        "inverse-primary": "#8a6d35",

        // ─── Error ──────────────────────────────────────────────────────
        error: "#ff4444",
        "error-container": "#2a0a0a",
        "on-error": "#ffffff",
        "on-error-container": "#ff6666",

        // ─── Success ────────────────────────────────────────────────────
        success: "#4ade80",
        "success-container": "#0a2a14",
        "on-success-container": "#6bee9a",

        // ─── Warning ────────────────────────────────────────────────────
        warning: "#f59e0b",
        "warning-container": "#2a1a05",
        "on-warning-container": "#fbbf24",
      },

      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px",
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        base: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        gutter: "24px",
        margin: "32px",
        section: "120px",
        cinematic: "200px",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'DM Serif Display'", "Georgia", "serif"],
      },

      fontSize: {
        // ─── Cinematic Display ──────────────────────────────────────────
        "display-hero": ["8rem", { lineHeight: "0.9", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-hero-mobile": ["3.5rem", { lineHeight: "0.92", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-xl": ["6rem", { lineHeight: "0.92", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["4rem", { lineHeight: "1.0", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],

        // ─── Headlines ─────────────────────────────────────────────────
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "title-lg": ["18px", { lineHeight: "28px", fontWeight: "600" }],
        "title-md": ["16px", { lineHeight: "24px", fontWeight: "600" }],

        // ─── Body ───────────────────────────────────────────────────────
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],

        // ─── Labels & Micro ─────────────────────────────────────────────
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.01em", fontWeight: "500" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.05em", fontWeight: "600" }],
        micro: ["10px", { lineHeight: "12px", letterSpacing: "0.1em", fontWeight: "600" }],
      },

      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 20px 0 rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.1)",
        modal: "0 25px 80px -12px rgba(0,0,0,0.8)",
        glow: "0 0 40px rgba(201,169,110,0.15)",
        "glow-sm": "0 0 20px rgba(201,169,110,0.1)",
      },

      animation: {
        grain: "grain 8s steps(10) infinite",
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
        "reveal-up": "reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },

      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "reveal-up": {
          "0%": { transform: "translateY(120%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },

      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        cinematic: "cubic-bezier(0.77, 0, 0.175, 1)",
      },
    },
  },
  plugins: [],
};
