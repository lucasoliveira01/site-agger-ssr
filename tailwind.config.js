/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aggerBlue: "#005B87",
        aggerBlueSecondary: "#003050",
        aggerYellow: "#FFD526",
      },
      screens:{
        '3xl': '1920px'
      }
      
    },
  },
  plugins: [],
};
