/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Approximated from offresexclusives.org (navy + gold job-board style).
        // offresexclusives.org is Blogger-hosted; its compiled CSS/theme colors
        // aren't reachable through automated fetch. Swap these for exact hex
        // values here if you pull them from the site's devtools.
        navy: "#0F2A4A",
        "navy-deep": "#091d34",
        ocean: "#2C6FD1",
        "ocean-light": "#5C94E6",
        gold: "#F0A83A",
        "gold-dark": "#D68F22",
        mist: "#F4F7FB",
        ink: "#1C2B3A",
        "ink-soft": "#5A6B7D",
        border: "#E3E9F1",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
