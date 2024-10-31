/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '3rem',
          // sm: '2rem',
          // lg: '4rem',
          // xl: '5rem',
          // '2xl': '6rem',
        },
        // Ensure the max width for all breakpoints is 100%
        screens: {
          DEFAULT: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '100%',
        },
      },
    },
    colors: {
      'white': '#fff',
      'black': '#000',
      'black-500': '#1A1A1A',
      'gray': '#999999',
      'gray-200': '#cccccc',
      'gray-300': '#666666',
      'gray-400': '#e5e5e5',
      'gray-500': '#e9e9e9',
      'gray-300-10': 'rgba(102, 102, 102,0.1)',
      'white-300': '#FAFAFA',
      'white-400':'#D9D9D9',
      'white-500':'#F2F2F2',
      'orange': '#FF6700',
      "green": "#089E86",
      "green-200":"#0DBF8D",
      "green-300":"#D9F4D9",
      "transparent": "transparent",
      "blue-200":"#F0F8FF",
      "blue-300":"#727782",
      "blue-600":"#1C74D0",
      "red":"red",
      "yellow-400":"#FEF0CA",
      "yellow-500":"#FABA0A",
      "yellow-600":"#FFA300",
      "navy-blue":"#002953"

    },
    backgroundImage: {
      'linear-orange': "linear-gradient(90deg, #FF6700 0%, #FF8900 100%)",
    },
    fontSize: {
      xsm: "1rem",
      sm: '1.2rem',
      base: '1.4rem',
      xl: '1.6rem',
      '2xl': '1.8rem',
      '3xl': '2rem',
      '4xl': '2.2rem',
      '5xl': '2.4rem',
    },
  },
  plugins: [],
}
