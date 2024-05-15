/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        helveticaNow: ['var(--font-helvetica-now)']
      },
      colors: {
        'primary': '#050914',
        'secondary': '#20e87d',
      },
      aspectRatio: {
        '5/2': "5/2",
        '6/4': "6/4",
        '5/6': "5/6"
      }
    },
  },
  plugins: [],
}