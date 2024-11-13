import { notFound } from 'next/navigation'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { Locale } from 'src/app/i18n-config'
import PageComponents from 'src/app/(frontend)/_components/PageComponents'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
    lang: Locale
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug, lang } = await params

  // Using page with 'home' slug for home page
  if (slug === 'home') {
    notFound()
  }

  const page = await getPageBySlug(slug, lang)

  const pageData = page[0]
  if (!pageData) {
    notFound()
  }

  return <PageComponents pageData={pageData} lang={lang} />
}
