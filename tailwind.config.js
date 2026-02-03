/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Roboto", "sans-serif"],
        },
        animation: {
          "progress-pulse":
            "progress-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        },
        // keyframes: {
        //   "progress-pulse": {
        //     "0%, 100%": { opacity: 1 },
        //     "50%": { opacity: 0.5 },
        //   },
        // },
      },
    },
    // plugins: [
    //   require("tailwindcss-animate"),
    //   require("tailwind-scrollbar"),
    //   require("@tailwindcss/typography"),
    // ],
  };
  