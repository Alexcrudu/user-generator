module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        publicSans: ["Public-Sans", "sans-serif"]
      },
      colors: {
        green: {
          400: "#10AC84",
          500: "#1DD1A1"
        },
        white: {
          100: "#F1F2F6",
          200: "#B9B9B9",
          300: "#9F9F9F"
        },
        red: {
          500: "#FF0018"
        }
      }
    },
  },
  plugins: [],
}
