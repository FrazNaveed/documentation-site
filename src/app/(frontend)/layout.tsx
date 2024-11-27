import type { Metadata } from 'next'
import SiteHeader from './_components/SiteHeader'
import SiteFooter from './_components/SiteFooter'
import satoshi from './_lib/fonts'
import './_styles/globals.scss'

export const metadata: Metadata = {
  title: {
    template: '%s | Flare',
    default: 'Flare',
  },
  description: 'Flare is the blockchain for data: an EVM-based layer 1 that gives developers secure decentralized access to high-integrity data from other chains and the internet.',
  manifest: '/en/site.webmanifest',
  themeColor: '#ffffff',
}

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
