import { getPageBySlug } from 'src/app/(frontend)/_lib/payload/pageQueries'
import type { Locale } from 'src/app/i18n-config'
import PageComponents from 'src/app/(frontend)/_components/PageComponents'
import buildMetadata from 'src/app/(frontend)/_utils/buildMetadata'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
    lang: Locale
  }>
}

export const homePageSlug = 'home'

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params
  const page = await getPageBySlug(homePageSlug, lang)
  const pageData = page[0] || {}
  if (pageData) {
    const metadata = buildMetadata(pageData.meta, pageData.title)
    return metadata
  }

  return null
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const page = await getPageBySlug(homePageSlug, lang)

  const pageData = page[0] || {}

  return <PageComponents pageData={pageData} lang={lang} />
}
