// To create a redirect, just add the source and destination to the array, comma separated string
const redirectList = [
  '/flare-101/,/',
  '/flaredrops/,/',
  '/songbird/,/',
  '/education-videos/,/',
  '/faqs/,/',
  '/tokenomics-flr-updated/,/',
  '/ftso/,/products/flare-time-series-oracle',
  '/dataconnector/,/products/flare-data-connector',
  '/fassets/,/products/fassets',
  '/whitepapers/,/',
  '/start-building/,/resources/developer-hub',
  '/grants/,/resources/grants',
  '/start-building/#bugbounty,/resources/developer-hub',
  '/delegate/,/delegate-and-stake',
  '/staking-flr/,/delegate-and-stake',
  '/ecosystem/,/', // remove in V3
  '/node-set-up/,https://dev.flare.network/category/run-a-node',
  '/become-a-data-provider,https://dev.flare.network/run-node/ftso-data-provider',
  '/sign-up/,/news',
  '/contact/,/resources/developer-support',
]

const manualRedirects = redirectList.map((redirect) => {
  const [source, destination] = redirect.split(',')
  return {
    source,
    destination,
    permanent: false,
  }
})

export default manualRedirects
