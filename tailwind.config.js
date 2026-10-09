/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bazar: {
          primary: "#15803d",
          "primary-content": "#ffffff",
          secondary: "#f59e0b",
          accent: "#0ea5e9",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f6f7f4",
          "base-300": "#e5e7e0",
          success: "#16a34a",
          error: "#dc2626",
        },
      },
    ],
  },
};
