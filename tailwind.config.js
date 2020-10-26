module.exports = {
  purge: {
    mode: 'all',
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/components/**/**/*.{js,ts,jsx,tsx}',
      './src/pages/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}'
    ]
  },
  theme: {
    extend: {
      colors: {
        'accent-1': '#0CB2C0',
        'accent-1-darker': '#068792',

        sadgreen: '#5C8271',
        'sadgreen-dark': '#456155',
        'sadgreen-light': '#8ABFA8',
        'sadgreen-lighter': '#69E5AF',
        'sadgreen-darker': '#2E4E40',

        gray: '#CAC5C4',
        'gray-dark': '#A09D9D',
        'gray-light': '#EEEDED',
        'gray-lighter': '#F7FAF9'
      },
      fontFamily: {
        sans: 'Roboto',
        mono: 'SFMono-Regular'
      },
      typography: (theme) => {
        return {
          default: {
            css: {
              a: {
                color: theme(`colors.blue.600`),
                textDecoration: `none`,
                '&:hover': {
                  textDecoration: `underline`
                }
              },
              'code::before': false,
              'code::after': false,
              'blockquote p:first-of-type::before': false,
              'blockquote p:last-of-type::after': false
            }
          }
        };
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
};
