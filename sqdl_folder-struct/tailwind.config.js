/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': "400px",
        'md-1/2': '880px',
        'xl-3/2': '1400px',
        'xl-1/4': '1200px',
        'max-md-1/2': {'max': '880px'}
      },
      colors: {
        'dark-gray': '#222831',
        'semidark-gray': '#393E46',
        'greenish-blue': '#00ADB5',
        'lightesh-gray': '#EEEEEE'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'redHatMono': ['Red Hat Mono', 'monospace'],
      },
      fontWeight: {
        'montserratWeight': '900',
        'redHatMonoWeight': '500'
      },
      keyframes: {
        line: {
          '100%': { width: '90%'}
        },
        'moveRight' : {
          '0%': {right: '72.6%'}, 
          '100%': { right: '0'}
        },
        'moveLeft': {
          '0%': {right: '0'},
          '100%': {right: '72.6%'}
        },
        fadeOut : {
          '0%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0)'
          }
        },
        zoomIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        }
      },
      animation: {
        'line': 'line .9s ease-out forwards',
        'move-right' : 'moveRight .5s ease-out forwards',
        'move-left' : 'moveLeft .5s ease-out forwards',
        'fade-out': 'fadeOut .5s ease-in-out forwards',
        'zoom-in': 'zoomIn .5s ease-in-out forwards',
      }
    },
  },
  plugins: [require("flowbite/plugin")],
});
