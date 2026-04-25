/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        chalk: "rgb(var(--chalk-rgb) / <alpha-value>)",
        bone: "rgb(var(--bone-rgb) / <alpha-value>)",
        clay: "rgb(var(--clay-rgb) / <alpha-value>)",
        rust: "rgb(var(--rust-rgb) / <alpha-value>)",
        sage: "rgb(var(--sage-rgb) / <alpha-value>)",
      },
      fontFamily: {
        body: ["'DM Sans'", "sans-serif"],
        display: ["'Cormorant Garamond'", "serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      animation: {
        "fade-up": "fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "fade-down": "fadeInDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "bounce-in": "bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "glow": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInDown: {
          from: {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInLeft: {
          from: {
            opacity: "0",
            transform: "translateX(-40px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          from: {
            opacity: "0",
            transform: "translateX(40px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        scaleIn: {
          from: {
            opacity: "0",
            transform: "scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-12px)",
          },
        },
        "float-slow": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(155, 74, 42, 0.7)",
          },
          "50%": {
            boxShadow: "0 0 0 15px rgba(155, 74, 42, 0)",
          },
        },
        "rotate-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        "bounce-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.3) translateY(30px)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "scale(1) translateY(0)",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            textShadow: "0 0 5px rgba(181, 147, 107, 0.3)",
          },
          "50%": {
            textShadow: "0 0 20px rgba(181, 147, 107, 0.8)",
          },
        },
      },
      transitionTimingFunction: {
        "bounce-custom": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};
