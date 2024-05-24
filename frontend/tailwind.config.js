/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        colorBluePrimary: '#748CF8',
        colorGreyInput: '#8E8EA9',
        defaultFontColor: '#4B494C',
      },
      textColor: {
        default: '#4B494C',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
