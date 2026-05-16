/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cube: {
          U: '#FDD835', // yellow
          D: '#FAFAFA', // white
          F: '#43A047', // green
          B: '#1E88E5', // blue
          R: '#E53935', // red
          L: '#FB8C00', // orange
        },
        ink: {
          950: '#0b1020',
          900: '#11172e',
          800: '#1a2240',
          700: '#2a3358',
          500: '#7c89b5',
          200: '#dfe4f3',
        },
      },
    },
  },
  plugins: [],
};
