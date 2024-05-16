/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        "montserrat":['montserrat','sans-serif'],
        "poppins":['poppins','sans-serif'],
        "mukta":['mukta','sans-serif']
      }
    },
    
  },
  plugins: [],
};
