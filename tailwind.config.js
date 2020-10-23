module.exports = {
  purge: {
    mode: 'all',
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/pages/*.{js,ts,jsx,tsx}'
    ]
  },
  theme: {
    extend: {
      colors: {
        primary: '#7B5BFB',
        secondary: '#FFBC00',

        'accent-1': '#0CB2C0',
        'accent-1-darker': '#068792',
        'accent-2': '#F725A0',

        purple: '#383193',
        'purple-light-1': '#635DB6',
        'purple-light': '#A7A3DB',
        'purple-dark': '#201C57',
        'purple-darker': '#100C3C',

        gray: '#CAC5C4',
        'gray-dark': '#A09D9D',
        'gray-light': '#EEEDED'
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
