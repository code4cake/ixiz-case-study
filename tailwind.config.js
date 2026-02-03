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
        colors: {
          primary: 'var(--primary-color)',
          secondary: 'var(--secondary-color)',
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'status-success': 'var(--status-success)',
          'status-warning': 'var(--status-warning)',
          'status-disable': 'var(--status-disable)',
        },
      },
    },
  };
  