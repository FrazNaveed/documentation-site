import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { Locale } from 'src/app/i18n-config'
import PageComponents from 'src/app/(frontend)/_components/PageComponents'
import FastPanel from '../_components/FastPanel'
import DecentralizedPanel from '../_components/DecentralizedPanel'
import SecurePanel from '../_components/SecurePanel'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
    lang: Locale
  }>
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const page = await getPageBySlug('home', lang)

  const pageData = page[0] || {}

  return (
    <>
      <PageComponents pageData={pageData} lang={lang} />
      <FastPanel />
      <DecentralizedPanel />
      <SecurePanel />
    </>
  )
}
