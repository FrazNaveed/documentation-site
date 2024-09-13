import satoshi from './_lib/fonts'
import './_styles/globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={satoshi.variable}>{children}</body>
    </html>
  )
}
