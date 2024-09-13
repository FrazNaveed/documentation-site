import localFont from 'next/font/local'

const satoshi = localFont({
  src: [
    {
      path: '../_fonts/Satoshi-Variable.woff2',
    },
  ],
  weight: '500 700',
  fallback: ['sans-serif'],
  variable: '--satoshi',
})

export default satoshi
