import type { Viewport } from 'next'
import type { Locale } from 'src/app/i18n-config'
import SiteHeader from '../_components/SiteHeader'
import SiteFooter from '../_components/SiteFooter'
import satoshi from '../_lib/fonts'
import { defaultMetadata } from '../_utils/buildMetadata'
import GoogleTagManager, { GoogleTagManagerNoscript } from '../_components/GoogleTagManager/GoogleTagManager'
import '../_styles/globals.scss'
import CookieYes from '../_components/CookieYes/CookieYes'

type LayoutProps = {
  children: React.ReactNode
  params: {
    lang: Locale
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata = defaultMetadata

export default function RootLayout({ children, params }: LayoutProps) {
  const { lang } = params
  return (
    <html lang={lang}>
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
