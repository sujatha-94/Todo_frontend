/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Look for Tailwind classes in these files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo-600 custom primary color
        secondary: "#9333EA", // Purple-600 secondary color
        accent: "#FBBF24", // Amber-400 accent color
        background: "#F3F4F6", // Light gray background
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        "soft-lg": "0 10px 15px -3px rgba(79, 70, 229, 0.3), 0 4px 6px -2px rgba(79, 70, 229, 0.1)",
      },
      borderRadius: {
        "xl": "1rem",
      },
    },
  },
  plugins: [],
};
