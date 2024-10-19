import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        100: '#566cff',
        200: '#465efd',
        300: '#0021ff',
      },
      secondary: '#222',
      bg: {
        secondary: {
          1: 'rgba(0, 16, 61, 0.06)',
          2: '#fbfbfb',
          3: '#edefff',
        },
      },
      error: '#ed0a34',
      success: '#0dc268',
      notify: '#ff9e00',
      warning: '#fffce0',
      rating: '#ffd400',
      link: {
        primary: '#005bd1',
        visited: '#528fdf',
      },
      text: {
        primary: '#2c2d2e',
        secondary: '#919399',
      },
      icon: {
        primary: '#2c2d2e',
        secondary: '#bfc1c7',
      },
      overlay: 'rgba(0, 16, 61, 0.48)',
      border: {
        primary: 'rgba(0, 16, 61, 0.12)',
        hover: 'rgba(0, 16, 61, 0.24)',
        active: 'rgba(0, 16, 61, 0.48)',
        focus: 'rgba(0, 16, 61, 0.24)',
      },
      black: '#000000',
      white: '#ffffff',
    },

    extend: {
      fontSize: {
        h1: '64px',
        h2: '48px',
        h3: '24px',
        h4: '18px',
        h5: '11px',
      },
      boxShadow: {
        shape:
          '0 8px 24px -4px rgba(24, 39, 75, 0.02), 0 6px 12px -6px rgba(24, 39, 75, 0.03)',
        depth: '0 16px 48px 0 rgba(0, 16, 61, 0.48)',
      },
    },
  },
  plugins: [],
}
export default config
