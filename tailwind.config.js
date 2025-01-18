/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xl: { max: '1279px' },
      lg: { max: '1110px' },
      md: { max: '1010px' },
      sm: { max: '428px' }
    },
    extend: {
      colors: {
        mainTextColor: 'rgba(255, 255, 245, 0.86)',
        mainBgColor: '#1b1b1f',
        dialogBgColor: '#272730'
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(0.9)' },
          '75%': { transform: 'scale(1.1)' }
        }
      },
      animation: {
        bounce: 'bounce 0.5s ease-in-out'
      }
    }
  },
  plugins: []
}
