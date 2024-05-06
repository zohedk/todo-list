/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "500px",
        tab: "1000px",
        pc: "1400px",
      },
    },
  },
  plugins: [],
};
