/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SGKara', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: "#264A9F",
          azure: "#4272B8",
          green: "#54BA60",
          ink: "#070B1A",
          deep: "#0B1430",
          haze: "#101a3a",
        },
      },

      boxShadow: {
        glow: "0 0 40px rgba(66, 114, 184, 0.45)",
        glowGreen: "0 0 40px rgba(84, 186, 96, 0.45)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
