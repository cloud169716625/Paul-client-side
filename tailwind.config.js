module.exports = {
  impotant: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: '#1E1E2D',
          light: '#323248',
        },
        custom: {
          secondary: '#1E1E2D',
          info: '#3699FF',
          dark: '#171723',
          grey: '#474761',
          red: {
            DEFAULT: '#F64E60',
            dark: '#3A2434',
          },
          green: {
            DEFAULT: '#0BB783',
            dark: '#1C3238',
          },
          purple: {
            DEFAULT: '#8950FC',
            dark: '#2F264F',
          },
          blue: {
            DEFAULT: '#3699FF',
            dark: '#212E48',
          },
        },
      },
      fontSize: {
        normal: ['14px', { lineHeight: '1.5' }],
      },
      spacing: {
        'custom-4': '16px !important',
        'custom-5': '20px !important',
      },
      boxShadow: {
        custom: '1rem 0rem 5rem 1px rgba(0, 0, 0,0.8) !important',
      },
    },
  },
  plugins: [],
};
