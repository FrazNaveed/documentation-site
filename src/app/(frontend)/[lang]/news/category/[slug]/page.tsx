import { notFound } from 'next/navigation'
import NewsPage from 'src/app/(frontend)/_components/NewsPage'
import { getNewsTypeBySlug } from 'src/app/(frontend)/_lib/payload/newsQueries'
import buildMetadata from 'src/app/(frontend)/_utils/buildMetadata'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const newsType = await getNewsTypeBySlug(slug)
  const newsTypeData = newsType[0]
  if (!newsTypeData) {
    notFound()
  }

  const metadata = buildMetadata(undefined, newsTypeData.title, slug)
  return metadata
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const newsType = await getNewsTypeBySlug(slug)
  const newsTypeData = newsType[0]
  if (!newsTypeData) {
    notFound()
  }
  return <NewsPage typeSlug={slug} typeId={newsTypeData.id} />
}
