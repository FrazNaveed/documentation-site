import SiteHeader from './_components/SiteHeader'
import SiteFooter from './_components/SiteFooter'
import satoshi from './_lib/fonts'
import './_styles/globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/png' href='/en/favicon/favicon-96x96.png' sizes='96x96' />
        <link rel='icon' type='image/svg+xml' href='/en/favicon/favicon.svg' />
        <link rel='shortcut icon' href='/en/favicon/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/en/favicon/apple-touch-icon.png' />
        <meta name='apple-mobile-web-app-title' content='Flare' />
        <link rel='manifest' href='/en/favicon/site.webmanifest' />
      </head>
      <body className={satoshi.variable}>
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
