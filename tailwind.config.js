/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#121212",
        second: "rgba(18,18,18,0.40)",
        third: "#1212120d",
        fourth: "rgba(18, 18, 18, 0.60)",
        warn: "#F2994A",
        warning: "#F2994A",
        error: "#F31C54",
        success: "#2BBA81",
        delete: "#ED4A47",
        bgGray: "rgba(255, 255, 255, 0.12)",
        whiteHalf: "rgba(255, 255, 255, 0.5)",
        white6: "rgba(255, 255, 255, 0.60)",
        bgGray2: "#F9F9F9",
        bgPurple: '#F7F1FF',
        purple: "#882FFA",
        blue: "#2563EB",
        border: "#F2F2F2",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
