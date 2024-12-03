import { notFound } from 'next/navigation'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { Locale } from 'src/app/i18n-config'
import PageComponents from 'src/app/(frontend)/_components/PageComponents'
import buildMetadata from 'src/app/(frontend)/_utils/buildMetadata'
import { homePageSlug } from '../page'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string[]
    lang: Locale
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, lang } = await params
  const slugString = slug.join('/')

  // Using page with 'home' slug for home page
  if (slugString === homePageSlug) {
    notFound()
  }

  const page = await getPageBySlug(slugString, lang)

  const pageData = page[0]
  if (!pageData) {
    notFound()
  }

  const metadata = buildMetadata(pageData.meta, pageData.title, slugString)
  return metadata
}

export default async function Page({ params }: PageProps) {
  const { slug, lang } = await params
  const slugString = slug.join('/')

  // Using page with 'home' slug for home page
  if (slugString === homePageSlug) {
    notFound()
  }

  const page = await getPageBySlug(slugString, lang)

  const pageData = page[0]
  if (!pageData) {
    notFound()
  }

  return <PageComponents pageData={pageData} lang={lang} />
}
