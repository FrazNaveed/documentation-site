const PlayButton = (): React.JSX.Element => (
  <svg width='79' height='79' viewBox='0 0 79 79' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_d_471_601)'>
      <circle cx='39.5' cy='35.5' r='35.5' fill='white' />
    </g>
    <path d='M35 46V27L48 36.5L35 46Z' fill='#8A113E' />
    <defs>
      <filter id='filter0_d_471_601' x='0' y='0' width='79' height='79' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='2' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_471_601' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_471_601' result='shape' />
      </filter>
    </defs>
  </svg>
)

export default PlayButton
