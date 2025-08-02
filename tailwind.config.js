/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#2563eb",
        "error" : "#ffdce0"
      }
    },
  },
  plugins: [],
}