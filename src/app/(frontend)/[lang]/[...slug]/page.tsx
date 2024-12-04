import { notFound } from 'next/navigation'
import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { Locale } from 'src/app/i18n-config'
import PageComponents from 'src/app/(frontend)/_components/PageComponents'
import buildMetadata from 'src/app/(frontend)/_utils/buildMetadata'
import { HOME_PAGE_SLUG } from 'src/app/(frontend)/_constants'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string[]
    lang: Locale
  }>
}

async function getPageData(slug: string[], lang: Locale) {
  const slugString = slug.join('/')
  // Using page with 'home' slug for home page
  if (slugString === HOME_PAGE_SLUG) {
    notFound()
  }
  const page = await getPageBySlug(slugString, lang)
  const pageData = page[0]
  if (!pageData) {
    notFound()
  }
  return { pageData, slugString }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, lang } = await params
  const { pageData, slugString } = await getPageData(slug, lang)

  const metadata = buildMetadata(pageData.meta, pageData.title, slugString)
  return metadata
}

export default async function Page({ params }: PageProps) {
  const { slug, lang } = await params
  const { pageData } = await getPageData(slug, lang)

  return <PageComponents pageData={pageData} lang={lang} />
}
