/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Be Vietnam Pro', 'Arial', 'Helvetica', 'sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'main': {
          50 : '#0000EE',
          100: '#0000DD',
          200: '#0000CC',
          300: '#0000BB',
          400: '#0000AA',
          500: '#000099',
          600: '#000088',
          700: '#000077',
          800: '#000055',
          900: '#000044',
        },
        'primary': {
         600: '#ff5252',
        },
        'second': {
          700: 'gray',
         }
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {from: { opacity: '0' }, to: {opacity: '1'},
        }
      },
      animation: {
        slideDown: 'slideDown .5s ease-in-out',
        fadeIn: 'fadeIn .5s ease-in-out',
      },
      backgroundImage: {
        'slider-bg': 'url("/img/banner1.jpg")',
      }
    },
  },
  plugins: [],
}

