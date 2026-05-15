/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // disabled — single dark theme via :root
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 748px)" },
      },
      spacing: {
        inset: "var(--inset)",
        sides: "var(--sides)",
        "footer-safe-area": "var(--footer-safe-area)",
      },
      maxWidth: {
        page: "var(--max-page)",
        prose: "68ch",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0px)",
        sm: "calc(var(--radius) - 0px)",
      },
      transitionProperty: {
        "colors-and-shadows":
          "color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow",
      },
      animation: {
        shine: "shine 2s ease-in-out infinite",
        blink: "blink 1.1s steps(2, start) infinite",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Cormorant Garamond", "Georgia", "serif"],
        serif: ["var(--font-fraunces)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-geist)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Madureira DS scale
        xs: ["11px", { lineHeight: "1.4" }],
        sm: ["13px", { lineHeight: "1.45" }],
        base: ["15px", { lineHeight: "1.55" }],
        md: ["18px", { lineHeight: "1.6" }],
        lg: ["22px", { lineHeight: "1.4" }],
        xl: ["28px", { lineHeight: "1.2" }],
        "2xl": ["38px", { lineHeight: "1.1" }],
        "3xl": ["52px", { lineHeight: "1.05" }],
        "4xl": ["72px", { lineHeight: "1" }],
        "5xl": ["104px", { lineHeight: "0.95" }],
        "6xl": ["144px", { lineHeight: "0.9" }],
      },
      boxShadow: {
        button:
          "inset 0 0 1px 1px rgba(244,241,234,0.05), inset 0 0 2px 1px rgba(244,241,234,0.15)",
        "button-hover":
          "inset 0 0 4px 1px rgba(244,241,234,0.15), 0 0 0 1px rgba(230,58,31,0.1)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Direct Madureira tokens (use sparingly, prefer semantic)
        ink: {
          0: "hsl(var(--ink-0))",
          10: "hsl(var(--ink-10))",
          15: "hsl(var(--ink-15))",
          20: "hsl(var(--ink-20))",
          30: "hsl(var(--ink-30))",
          50: "hsl(var(--ink-50))",
          70: "hsl(var(--ink-70))",
          85: "hsl(var(--ink-85))",
          95: "hsl(var(--ink-95))",
          100: "hsl(var(--ink-100))",
        },
        vermilion: {
          DEFAULT: "hsl(var(--accent-h))",
          soft: "hsl(var(--accent-soft-h))",
          deep: "hsl(var(--accent-deep-h))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
