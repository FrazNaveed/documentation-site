import { notFound } from 'next/navigation'
import NewsPage from 'src/app/(frontend)/_components/NewsPage'
import { getNewsTypeBySlug } from 'src/app/(frontend)/_lib/payload/newsQueries'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug: string
  }>
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
