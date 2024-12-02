import React from 'react'
import Script from 'next/script'

const CookieYes: React.FC = () => (
  <>
    {/* Start cookieyes banner */}
    <Script
      id='cookieyes'
      type='text/javascript'
      src='https://cdn-cookieyes.com/client_data/dedcd40fe7e8316d7512b294/script.js'
      strategy='beforeInteractive'
    />
    {/* End cookieyes banner */}
  </>
)

export default CookieYes
