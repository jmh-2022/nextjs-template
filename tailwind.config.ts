import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'ro-title1': ['18px', '26px'],
        'ro-title2': ['16px', '24px'],
        'ro-body1': ['14px', '22px'],
        'ro-body2': ['13px', '20px'],
        'ro-caption1': ['12px', '18px'],
        'ro-label1': ['11px', '16px'],
      },
      colors: {
        //hy 학연 축약 z
        ro: {
          main: '#ff9100',
          error: '#FF4B4B',
          success: '#4194F3',
          gray: {
            25: '#F8F8F8;',
            50: '#F3F3F3',
            100: '#EEEEEE',
            200: '#E2E2E2',
            300: '#B9B9B9',
            400: '#7B7C7B',
            500: '#4E4E4E',
            600: '#161A18',
          },
        },
      },
    },

    keyframes: {
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      'fade-out': {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      'fade-in-out': {
        '0%': { background: 'white' },
        '50%': { background: '#F8F8F8' },
        '100%': { background: 'white' },
      },
      'fade-in-up': {
        '0%': {
          opacity: '.9',
          transform: 'translate3d(0, 100%, 0)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateZ(0)',
        },
      },
      'fade-out-down': {
        '100%': {
          opacity: '0',
          transform: 'translate3d(0, 100%, 0)',
        },
        '0%': {
          opacity: '1',
          transform: 'translateZ(0)',
        },
      },
      spin: {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
    animation: {
      'fade-in': 'fade-in .1s',
      'fade-out': 'fade-out .3s',
      'fade-in-out': 'fade-in-out .5s',
      'fade-in-up': 'fade-in-up .5s',
      'fade-out-down': 'fade-out-down .3s',
      'fade-in-up-toast': 'fade-in-up .5s',
      'fade-out-down-toast': 'fade-out-down .8s',
      spin: 'spin 1s linear infinite',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
