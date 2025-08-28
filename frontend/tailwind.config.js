/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-black",
    "text-white",
    "bg-white",
    "text-black",
    "border",
    "border-[#046E8F]",
    "placeholder:text-gray-400",
    "focus:ring-2",
    "focus:ring-[#046E8F]",
    "shadow-sm",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
