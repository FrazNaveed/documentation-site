import React from 'react'
import Script from 'next/script'

interface GoogleTagManagerProps {
  gtmId: string
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ gtmId }) => {
  if (process.env.NODE_ENV !== 'production') { return null }

  return (
    <Script
      id='gtm-script'
      strategy='beforeInteractive'
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${gtmId}');`,
      }}
    />
  )
}

export const GoogleTagManagerNoscript: React.FC<GoogleTagManagerProps> = ({ gtmId }) => {
  if (process.env.NODE_ENV !== 'production') { return null }

  return (
    <noscript>
      <iframe
        title='Google Tag Manager (noscript)'
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

export default GoogleTagManager
