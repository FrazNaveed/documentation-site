import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { Locale } from 'src/app/i18n-config'
import PageComponents from 'src/app/(frontend)/_components/PageComponents'
import buildMetadata from 'src/app/(frontend)/_utils/buildMetadata'
import { HOME_PAGE_SLUG } from 'src/app/(frontend)/_constants'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
    lang: Locale
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params
  const page = await getPageBySlug(HOME_PAGE_SLUG, lang)
  const pageData = page[0] || {}
  if (pageData) {
    const metadata = buildMetadata(pageData.meta, pageData.title)
    return metadata
  }

  return null
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const page = await getPageBySlug(HOME_PAGE_SLUG, lang)

  const pageData = page[0] || {}

  return <PageComponents pageData={pageData} lang={lang} />
}
