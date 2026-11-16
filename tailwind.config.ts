import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#F1FAF6",
          100: "#E3F4EC",
          500: "#2FA874",
          600: "#1B8A5F",
          700: "#14704E",
          800: "#0F5B3F",
          900: "#0B4A33",
        },
        ink: {
          900: "#0F1F1A",
          600: "#5F6F68",
          400: "#97A59F",
          200: "#E4EAE7",
        },
        accent: {
          orange: "#F59E42",
          blue: "#4C7DF0",
          purple: "#8B5CF6",
          pink: "#EF6A8B",
          red: "#E5484D",
          teal: "#14B8A6",
          yellow: "#F5B83D",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 20px rgba(15,91,63,0.22)",
        soft: "0 4px 16px rgba(15,60,40,0.08)",
        phone: "0 12px 40px rgba(11,74,51,0.18)",
        sheet: "0 -4px 20px rgba(11,74,51,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
