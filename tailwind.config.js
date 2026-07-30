/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Extracted from the OxMemo logo (deep forest green + gold).
        navy: "#0E3D30",
        "navy-deep": "#082A21",
        ocean: "#1F6E58",
        "ocean-light": "#3D8F73",
        gold: "#C19B55",
        "gold-dark": "#A17F3F",
        mist: "#F7F5F0",
        ink: "#1C2B22",
        "ink-soft": "#5B685F",
        border: "#E4E1D8",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
