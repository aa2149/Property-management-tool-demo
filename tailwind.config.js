// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,jsx}'],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
//         display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
//       },
//       colors: {
//         brand: {
//           50:  '#EFF6FF',
//           100: '#DBEAFE',
//           200: '#BFDBFE',
//           400: '#60A5FA',
//           500: '#3B82F6',
//           600: '#2563EB',
//           700: '#1D4ED8',
//           800: '#1E3A8A',
//           900: '#0F172A',
//         },
//       },
//       boxShadow: {
//         card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
//         elevated: '0 4px 16px 0 rgb(15 23 42 / 0.10)',
//         glow: '0 0 0 3px rgb(37 99 235 / 0.15)',
//       },
//       animation: {
//         'fade-up': 'fadeUp 0.4s ease both',
//         'fade-in': 'fadeIn 0.3s ease both',
//       },
//       keyframes: {
//         fadeUp: {
//           '0%': { opacity: '0', transform: 'translateY(12px)' },
//           '100%': { opacity: '1', transform: 'translateY(0)' },
//         },
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//       },
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#EEF4FF',
          100: '#D6E6FF',
          200: '#AED0FF',
          400: '#4DA3E8',
          500: '#0093C4',
          600: '#007FAD',
          700: '#006A91',
          800: '#1A2D6E',
          900: '#0F1B45',
        },
        dhh: {
          navy:  '#1A2D6E',
          cyan:  '#00B3D7',
          light: '#E8F7FC',
        },
      },
      boxShadow: {
        card:     '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        elevated: '0 4px 16px 0 rgb(26 45 110 / 0.12)',
        glow:     '0 0 0 3px rgb(0 179 215 / 0.20)',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease both',
        'fade-in': 'fadeIn 0.3s ease both',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}