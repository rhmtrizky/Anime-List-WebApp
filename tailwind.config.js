/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      color: {
        primary: '#eeeeee',
        primary2: '#A5A5A5',
        accent: '#ffc639',
        accent2: '#FFD66D',
        secondary: '#393e46',
        dark: '#222831',
        red: '#F80000',
        cover: '#222831',
        blue: '#484BFE',
        blue2: '#262AF7',
      },
    },
  },
  plugins: [require('daisyui')],
};
