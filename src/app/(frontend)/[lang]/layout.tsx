import type { Viewport } from 'next'
import SiteHeader from '../_components/SiteHeader'
import SiteFooter from '../_components/SiteFooter'
import satoshi from '../_lib/fonts'
import { defaultMetadata } from '../_utils/buildMetadata'
import GoogleTagManager, { GoogleTagManagerNoscript } from '../_components/GoogleTagManager/GoogleTagManager'
import '../_styles/globals.scss'
import CookieYes from '../_components/CookieYes/CookieYes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        <CookieYes />
      </head>
      <body className={satoshi.variable}>
        <GoogleTagManagerNoscript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        <a className='skipToMainContentLink' href='#mainContent'>
          Skip to content
        </a>
        <SiteHeader />
        <div id='mainContent'>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  )
}
