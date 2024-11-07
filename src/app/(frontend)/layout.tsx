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
