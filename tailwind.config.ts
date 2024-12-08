import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      skew: { '10': '10deg' },
      fontFamily: {
        times: ['TimesNewRomanPS-BoldMT', 'TimesNewRomanPS'],
        tic: ['TimesNewRomanPSMT'],
        title: ['STYuanti-SC-Regular', 'STYuanti-SC'],
        word: ['STYuanti-SC-Bold', 'STYuanti-SC'],
        ipa: ['CBIPA']
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            a: {
              'text-decoration': 'none',
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.600'),
              }
            },
            code: {
              color: theme('colors.red.500'),
              backgroundColor: theme('colors.slate.100'),
              padding: '2px 4px',
              'border-radius': '4px',
              fontWeight: 500,
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          }
        }
      })
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
} satisfies Config;